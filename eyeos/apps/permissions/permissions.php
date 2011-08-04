<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

abstract class PermissionsApplication extends EyeosApplicationExecutable {

	public static function __run(AppExecutionContext $context, MMapResponse $response) {
		$itemsPath = EYE_ROOT . '/' . APPS_DIR . '/permissions/gui';
		$buffer = '';
//		$buffer .= file_get_contents($itemsPath . '/filesList.js');

		$response->appendToBody($buffer);

	}

/**
 * Returns the roles modified for each file selected (only returns the roles of the metadatas file)
 * @param <array> $params =
					 array (
					  'cwd' => 'workgroup://~prova1/', //string with the workgroup path
					  'filesSelected' =>
					  array (
						0 => 'workgroup://~prova1/fitxerEditor2.txt',
						1 => 'workgroup://~prova1/fitxerEditor.txt',
					  ),
					)
 * @return <array>
				  0 =>
				  array (
					'filename' => 'workgroup://~prova1/fitxerEditor1.txt',
					'roles' =>
					array (
					  'eyeID_EyeosUser_3b' => '1',
					  'eyeID_EyeosUser_3d' => '2',
					),
					'owner' => 'eyeID_EyeosUser_root'
				  ),
				  1 =>
				  array (
					'filename' => 'workgroup://~prova1/fitxerEditor.txt',
					'roles' =>
					array (
					  'eyeID_EyeosUser_3b' => '2',
					),
				  ),

 */
	public function getFileRoles($params, &$finalRolesModifiedForFile = null){
		$filesSelected = $params['filesSelected'];
		$cwd = $params['cwd'];
		$workgroup = self::getWorkgroupByPath($cwd);
//		$vRoles = self::getRolesByWorkgroup($workgroup->getId());
		if($finalRolesModifiedForFile == null)$finalRolesModifiedForFile = array();

		//looking for the roles modified in the metadatas of each file
		foreach($filesSelected as $fileName){
			$file = FSI::getFile($fileName);

			if($file->isDirectory()){
				$filesFromFolder = self::getFilesFromFolder($file);
				
				$addedFilesFromFolder = array(
					'filesSelected' => $filesFromFolder,
					'cwd' => $cwd
				);
				$recursiveResults = self::getFileRoles($addedFilesFromFolder,$finalRolesModifiedForFile);
			}

			$rolesModifiedForFile = array();
			$rolesModifiedForFile['filename'] = $fileName;
			
			$rolesModifiedForFile['roles'] = array();

			//if there's a user's role in a file that is diferent from the user's role in that workgroup we get it.
			$meta = $file->getMeta();
			if($meta->exists('owner')) {
				$owner = $meta->get('owner');
				try{
					$owner = UMManager::getInstance()->getUserByName($owner);
					$owner = $owner->getId();
				}catch(EyeUMException $e){ //the owner has been deleted from eyeOS
					//setting the workgroup's owner as the file owner
					$owner = $workgroup->getOwnerId();
					$meta->set('owner', $owner);
					//deleting the role modified of the new owner
					if($meta->get('roleModified') != ''){
						$rolesModified = $meta->get('roleModified');
						//search owner in the modifications
						$rolesModifiedWithoutOwner = Array();
						foreach($rolesModified as $newRole){
							$idUser =  $newRole['idUser'];
							if ($idUser != $owner)$rolesModifiedWithoutOwner[] = $newRole;						
						}
						//overwrite the meta without the owner
						$meta->set('roleModified',$rolesModifiedWithoutOwner);
						$file->setMeta($meta);
					}
				}
			} else {
				$owner = '';
			}
			$rolesModifiedForFile['owner'] = $owner; 
			
			$rolesModified = array();

			if($meta->get('roleModified') != ''){
				$rolesModified = $meta->get('roleModified');
			
				//getting the new roles for a file
				for($cont = 0; $cont < count($rolesModified); $cont++){
					$idUser =  $rolesModified[$cont]['idUser'];
					try{
						$user = UMManager::getInstance()->getUserById($idUser);
						$user = $user->getId();

						$role =  $rolesModified[$cont]['newRole'];
						$rolesModifiedForFile['roles'][$idUser] = $role;
					}catch(EyeUMException $e){ //the user has been deleted from eyeOS.
						//delete its information from the meta file
						unset($rolesModified[$cont]);
					}
				}
				$rolesModified = array_values($rolesModified);
			}
			$finalRolesModifiedForFile[] = $rolesModifiedForFile;
		}

		return $finalRolesModifiedForFile;
	}



/**
 * Function that gets all the files inside a folder
 * @param <string> $folder // absolutePath of the file
 * @return <string> array with absolutePath's of the files inside the folder
 */
	public function getFilesFromFolder($folder){
		$folderName = $folder->getPath();
		$filesInFolder = EyeosApplicationExecutable::__callModule('FileSystem', 'browsePath', array($folderName));
		foreach($filesInFolder['files'] as $fileStuff){
			$file = FSI::getFile($fileStuff['absolutepath']);
			$vFiles[] = $fileStuff['absolutepath'];
		}
		return $vFiles;
	}

/**
 *
 * @param <string> $idWorkgroup
 * @return <array> (
				  'eyeID_EyeosUser_root' => 0,
				  'eyeID_EyeosUser_3b' => 3,
				  'eyeID_EyeosUser_3d' => 2,
			)

 */
	public function getRolesByWorkgroup($idWorkgroup){
		$assignation = UMManager::getInstance()->getNewUserWorkgroupAssignationInstance();
		$assignation->setWorkgroupId($idWorkgroup);
		$vAssignation = UMManager::getInstance()->getAllUserWorkgroupAssignations($assignation);

		$vUsersRole = array();
		foreach($vAssignation as $userRole){
			$idUser = $userRole->getuserId();
			$role = $userRole->getRole();
			$vUsersRole[$idUser] = $role;
		}
		return $vUsersRole;
	}

/**
 * returns the workgroup that corresponds to a path
 * @param <string> $path //string with the workgroup path like "workgroup://~prova1/ "
 * @return <type>
 */
	public function getWorkgroupByPath($path){
		$workgroupName = substr($path, 13); //We want the name of the workgroup so we don't want the part of the string containing "workgroup://~"
		$vWorkgroupName = explode("/", $workgroupName);
		$workgroupName = $vWorkgroupName[0];		
		$workgroup = UMManager::getInstance()->getWorkgroupByName($workgroupName);
		return $workgroup;
	}


	public function getAllMembersFromWorkgroupsByPath($vPaths){
		foreach($vPaths as $path){
			$workgroup = self::getWorkgroupByPath($path);
			$workgroupFormated = array(
				'workgroupId' => $workgroup->getId()
			);

			$users = EyeosApplicationExecutable::__callModule('Workgroups', 'getAllMembersFromWorkgroup', $workgroupFormated);
			return $users;
		}
	}




/**
 * set the roles modified for each file selected
 * @param <array> $params = (
								0 =>
								array (
									'filename' => 'workgroup://~prova1/fitxerEditor1.txt',
									'roles' =>
										array (
										  'eyeID_EyeosUser_root' => '0',
										  'eyeID_EyeosUser_3b' => '1',
										),
								),
								1 =>
								array (
									'filename' => 'workgroup://~prova1/fitxerEditor.txt',
									'roles' =>
										array (
										  'eyeID_EyeosUser_3b' => '2',
										),
								),
							)
 */
	public function setRolesToFile($params){
		$userPermission = Kernel::getInstance('MemorySession');
		$permission = $userPermission->get('permission');

		if($permission != 'false'){ //the user is admin or owner so he can set new roles

			//reading the metafile for each file selected
			foreach($params as $fileRoles){

				$filename = $fileRoles['filename'];
				$users = $fileRoles['roles'];

				$file = FSI::getFile($filename);

	//			// Metadata
				$meta = $file->getMeta();
	//			if ($meta === null) {
	//				$meta = MetaManager::getInstance()->getNewMetaDataInstance();
	//			}
	//			// roleModified node
				if ($meta->exists('roleModified')) {
					$roleModified = $meta->get('roleModified');
					$rolesUpdated = array();
					foreach($users as $idUser => $newRole){
						$isUserFound = false;
						//looking is the user is in the metafile. If true, we update it.
						foreach($roleModified as $roleLine){
							$idUserInMeta = $roleLine['idUser'];
							$roleInMeta = $roleLine['newRole'];

							if(in_array($idUser, $roleLine)){ //if the user is in the meta file we have to update the meta
								
								if($users[$idUserInMeta] == 0) $users[$idUserInMeta] = $roleInMeta; // we don't allow to modify any owner role
								$role = array(
									'newRole' => $users[$idUserInMeta],
									'idUser' => $idUser,
									'dateModified' => time()
								);
								$rolesUpdated[] = $role;
								$isUserFound = true;
								break;
							}
						}
						if(!$isUserFound){ //if the user modification is not in the meta, we need to add it
							$role = array(
								'newRole' => $newRole,
								'idUser' => $idUser,
								'dateModified' => time()
							);
							$rolesUpdated[] = $role;
						}
					}
					$meta->set('roleModified', $rolesUpdated);//destroying the old metaModification and replacing it for the new one.
					$file->setMeta($meta);
				} else { //There's not any meta modification in the meta file (the meta "roleModified" doesn't exists)
					$role = array();
					foreach($users as $idUser => $newRole){
						if($newRole == 0) continue; // we don't allow to modify any owner role
						$role[] = array(
							'newRole' => $newRole,
							'idUser' => $idUser,
							'dateModified' => time()
						);
					}
					if(count($role) != 0){
						$meta->set('roleModified', $role);
						$file->setMeta($meta);
					}
				}
			}
		}
	}


/**
 * Get the role of the current user inside the files. He would have permissions to modify roles only if he is owner or admin of the file
 * @param <type> $params = 
					 array (
					  'cwd' => 'workgroup://~prova1/', //string with the workgroup path
					  'filesSelected' =>
						  array (
							0 => 'workgroup://~prova1/fitxerEditor2.txt',
							1 => 'workgroup://~prova1/fitxerEditor.txt',
						  ),
					 )
 * @return boolean
 */
	public function checkPermissionsOfCurrentUser($params){
		$hasPermission = 'true';
		$userPermission = Kernel::getInstance('MemorySession');
		$userPermission->set('permission',$hasPermission);
        //Getting the current user id
		$myProcManager = ProcManager::getInstance();
        $currentUserId = $myProcManager->getCurrentProcess()->getLoginContext()->getEyeosUser()->getId();

		//Serching if he has the role of admin or owner of the files selected.
		$vFilePermissions = self::getFileRoles($params);
		$userFound = 'false';
		foreach($vFilePermissions as $fileRoles){
			if (array_key_exists($currentUserId, $fileRoles['roles'])) {
				$userFound = 'true';
				$permission = $fileRoles['roles'][$currentUserId];
//				ROLE_OWNER : 0,
//				ROLE_ADMIN : 1,
//				ROLE_EDITOR : 2,
//				ROLE_VIEWER : 3,
				if($permission != 0 && $permission != 1 ){ //if the user is not admin or owner, he doesn't have permissions to modify roles of the files.
					$hasPermission = 'false';
					$userPermission->set('permission',$hasPermission);
					return $hasPermission;
				}
			}
		}
		if($userFound == 'false'){ //it has no role modifications, so we need to see his permissions on the group
			$workgroup = self::getWorkgroupByPath($params['cwd']);
			$vRolesOfWorkgroup = self::getRolesByWorkgroup($workgroup->getId());

			
			if (array_key_exists($currentUserId, $vRolesOfWorkgroup)) {
				$userFound = 'true';
				$permission = $vRolesOfWorkgroup[$currentUserId];
				if($permission != 0 && $permission != 1 ){ //if the user is not admin or owner, he doesn't have permissions to modify roles of the files.
					$hasPermission = 'false';
					$userPermission->set('permission',$hasPermission);
					return $hasPermission;
				}
			}			
		}
		return $hasPermission;
	}



	public function getFileProperties($params){
		$absolutePath = $params['path'];

		$file = FSI::getFile($absolutePath);
		$meta = $file->getMeta();

		if($meta->exists('creationTime')) {
			$created = $meta->get('creationTime');
			$created = date("d.m.y",$created);
		} else {
			$created = 0;
		}

		if($meta->exists('owner')) {
			$owner = $meta->get('owner');
			
		} else {
			$owner = '';
		}

		if($meta->exists('modificationTime')) {
			$modified = $meta->get('modificationTime');
			$modified = date("d.m.y",$modified);
		} else {
			$modified = 0;
		}
		

		$size = null;
		$size = $file->getSize();
		$unim = array("B","KB","MB","GB","TB","PB");
		$c = 0;
		while ($size>=1024) {
			$c++;
			$size = $size/1024;
		}
		$size = number_format($size,($c ? 2 : 0),",",".")." ".$unim[$c];
		
		$myExt = strtolower($file->getExtension());

		$fileProperties = array(
			'size' => $size,
			'extension' => $myExt,
			'created' => $created,
			'modified' => $modified,
			'owner' => $owner
		);

		return $fileProperties;
	}

	/*
	params = array(files)
	return = array({
		array(
			'size' => $size,
			'extension' => $myExt,
			'created' => $created,
			'modified' => $modified,
			'owner' => $owner
		);
	 *
	)*/
	public function getAllFilesProperties($params){
		$result = array();
		foreach($params['fileRoles'] as $fileName){
			$fileProperties = self::getFileProperties($fileName);
			$result[] = $fileProperties;
		}
		return $result;
	}
}

?>
