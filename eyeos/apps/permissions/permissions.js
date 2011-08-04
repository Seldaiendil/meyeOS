/*
*                 eyeos - The Open Source Cloud's Web Desktop
*                               Version 2.0
*                   Copyright (C) 2007 - 2010 eyeos Team
*
* This program is free software; you can redistribute it and/or modify it under
* the terms of the GNU Affero General Public License version 3 as published by the
* Free Software Foundation.
*
* This program is distributed in the hope that it will be useful, but WITHOUT
* ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
* FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
* details.
*
* You should have received a copy of the GNU Affero General Public License
* version 3 along with this program in the file "LICENSE".  If not, see
* <http://www.gnu.org/licenses/agpl-3.0.txt>.
*
* See www.eyeos.org for more details. All requests should be sent to licensing@eyeos.org
*
* The interactive user interfaces in modified source and object code versions
* of this program must display Appropriate Legal Notices, as required under
* Section 5 of the GNU Affero General Public License version 3.
*
* In accordance with Section 7(b) of the GNU Affero General Public License version 3,
* these Appropriate Legal Notices must retain the display of the "Powered by
* eyeos" logo and retain the original copyright notice. If the display of the
* logo is not reasonably feasible for technical reasons, the Appropriate Legal Notices
* must display the words "Powered by eyeos" and retain the original copyright notice.
*/

function permissions_application(checknum, pid, args) {
	var myApp = new eyeos.application.Permissions(checknum, pid, args);
	myApp.init();
}

qx.Class.define('eyeos.application.Permissions', {

    extend: eyeos.system.EyeApplication,

    construct: function(checknum, pid, args) {
		
	    arguments.callee.base.call(this, 'Permissions', checknum, pid);
		this._checknum = checknum;
		this.setFilesSelected(args[0]['files']);
		this.setCwd(args[0]['cwd']);
	},

	properties: {
		window: {
			check: 'Object',
			init: null
		},

		filesSelected:{
			init: null
		},
		cwd:{
			init: null
		},
		currentUserPermission:{
			init: null
		}

		
	},
	members: {
		_checknum: null,
		_users: null,
		_fileRoles: null,
		_searchField: null,
		_userPermissionC: null, //the container that has the users list and its roles
		
		ROLE_OWNER : 0,
		ROLE_ADMIN : 1,
		ROLE_EDITOR : 2,
		ROLE_VIEWER : 3,
		
		init: function () {
			this.setWindow(new eyeos.ui.Window(this, tr('Permissions'), 'index.php?extern=/images/16x16/apps/system-file-manager.png').set({
				width: 490,
				height: 300,
				contentPadding: 0,
				layout: new qx.ui.layout.VBox(),
				decorator: new qx.ui.decoration.Single(1,'solid','#999999')
			}));
			
			//getting all necessari data to load the application
			var params = {
				cwd : this.getCwd(),
				filesSelected : this.getFilesSelected()
			};
			//getting the file roles
			eyeos.callMessage(this._checknum, 'getFileRoles', params, function (fileRoles) {
				this._fileRoles = fileRoles;
				//getting the users list
				eyeos.callMessage(this._checknum, 'getAllMembersFromWorkgroupsByPath', {path: this.getCwd()}, function (workgroupMembers) {
					if (!workgroupMembers) {
						return;
					}
					eyeos.callMessage(this._checknum, 'checkPermissionsOfCurrentUser', params, function (hasPermissions) {
						this.setCurrentUserPermission(hasPermissions);
						this._users = workgroupMembers;
						this._drawUpContainer(); //info of the file and users permissions
						this._drawBottomContainer(); //buttons cancel and done
					}, this, {
                            onException: function(e) {
//								console.log('hasPermissions ERROR');
                            }
					 });
				}, this);				
			}, this);
			

			this.getWindow().open();
		},

		_drawUpContainer: function(){
			var generalC = 	this.createContainer('HBox');
			this.getWindow().add(generalC,{flex:1});

			var leftC = this._drawLeftContainer();
			generalC.add(leftC);
			
			var rightC = this._drawRightContainer();
			generalC.add(rightC,{flex:1});

		},
		_drawBottomContainer: function(){
			//centering vertically the buttons
			var generalVerticalC = 	this.createContainer('VBox');
			generalVerticalC.set({
				width:490,
				height:42,
				backgroundColor: '#e6e6e6'
			});
			

			this.addSpacerToContainer(generalVerticalC);


			var buttonsC = 	this.createContainer('HBox');
			buttonsC.set({
				width:100
			});
			generalVerticalC.add(buttonsC);
			this.addSpacerToContainer(generalVerticalC);
			this.getWindow().add(generalVerticalC);

			var layout = buttonsC.getLayout();
			layout.setSpacing(5);

			this.addSpacerToContainer(buttonsC);

			//CANCEL button
				var cancelB =  new qx.ui.form.Button(tr('Cancel'));
				cancelB.addListener('execute', function(){
					this.getWindow().close();
				},this);
				cancelB.set({
					maxHeight: 20,
					minWidth: 70
				});
				buttonsC.add(cancelB);

			//DONE button
				var doneB =  new qx.ui.form.Button(tr("Done"));
				doneB.set({
					maxHeight: 20,
					minWidth: 70
				});
				if(this.getCurrentUserPermission() == 'false'){
					doneB.setEnabled(false);
				}
				doneB.addListener('execute', function(){
					eyeos.callMessage(this._checknum, 'setRolesToFile', this._fileRoles, function (callback) {
						this.getWindow().close();
					}, this);
				},this);
				buttonsC.add(doneB);
			
			var spacerRight = new qx.ui.core.Spacer(10);
			buttonsC.add(spacerRight);


		},

		_drawLeftContainer: function(){
			var border = new qx.ui.decoration.Single(1,'solid','#999999');

			var leftC = this.createContainer('VBox');
			leftC.set({
				width: 200,
				backgroundColor: '#ecf0f2',
				decorator: border
			});

			var filesSelected = this._fileRoles;
			var nameOfFile = '';
			var pathOfImage = 'eyeos/extern/images/48x48/mimetypes/application-x-zerosize.png';
			var size = "-";
			var created = "-";
			var modified = "-";
			var imageC = null;
			var lbNameOfFile =  new qx.ui.basic.Label('');
			if (filesSelected.length > 1){ //there's more than one file selected

				nameOfFile = filesSelected.length +' '+ tr("items");
				imageC = this.getFileProperties(pathOfImage,size,created,modified);

				//name of file
				lbNameOfFile.set({
					value: nameOfFile,
					margin: 10,
					font: new qx.bom.Font(14, ['Helvetica', 'Arial']).set({
						//					bold: true
						})
				});
				
				leftC.add(lbNameOfFile);
				leftC.add(imageC);
			}else{ //there's only one file selected
				var vNameOfFile = filesSelected[0]['filename'].split("/");
				nameOfFile = vNameOfFile[vNameOfFile.length -1];
				
				pathOfImage = this.getFileIcon(nameOfFile);
				
				var params = {
					path : filesSelected[0]['filename']
				};
				eyeos.callMessage(this._checknum, 'getFileProperties', params, function (result) {
					imageC = this.getFileProperties(pathOfImage,result['size'],result['created'],result['modified']);

					//name of file
					
					lbNameOfFile.set({
						value: nameOfFile,
						margin: 10,
						font: new qx.bom.Font(14, ['Helvetica', 'Arial']).set({
							//					bold: true
							})
					});

					leftC.add(lbNameOfFile);
					leftC.add(imageC);
				}, this);
			}

		

			
			


			return  leftC;
		},

		getFileProperties: function(pathOfImage,size,created,modified){
			var border = new qx.ui.decoration.Single(1,'solid','#999999');

			//image Container : contains de image and the file properties
			
			var imageC = this.createContainer('HBox');
			imageC.set({
				width: 180,
				height: 95
			});

			//image
			var image = new qx.ui.basic.Image(pathOfImage);
			image.set({
				margin: 10,
				scale: true,
				minWidth: 94,
				minHeight: 94,
				decorator: border
			});
			imageC.add(image);
			


			//properties
			var propertiesC = this.createContainer('VBox');
			propertiesC.set({
				maxWidth: 80
			});

			var lbSize =  this.createBlueLabel(tr("Size:"));
			lbSize.set({
				marginTop: 10
			});
			propertiesC.add(lbSize);

			var lbAux =  this.createBlackLabel(tr(size));
			propertiesC.add(lbAux);

			var lbCreated = this.createBlueLabel(tr('Created:'));
			propertiesC.add(lbCreated);

			var lbAux =  this.createBlackLabel(tr(created));
			propertiesC.add(lbAux);

			var lbModified = this.createBlueLabel(tr('Modified:'));
			propertiesC.add(lbModified);

			var lbAux =  this.createBlackLabel(tr(modified));
			propertiesC.add(lbAux);
			
			imageC.add(propertiesC);
			return imageC;
		},

		_drawRightContainer: function(){
			var border = new qx.ui.decoration.Single(1,'solid','#999999');
			border.setRight(0,'solid','#999999');
			border.setTop(1,'solid','#999999');
			border.setBottom(1,'solid','#999999');
			border.setLeft(0,'solid','#999999');

			var rightC = this.createContainer('VBox');
			rightC.set({
//				backgroundColor: '#b8b8b8',
				minWidth: 320,
//				maxHeight: 215,
				decorator: border
			});

			var filterC = this._createFilterAndSelect();
			filterC.set({
				minHeight: 30,
				maxHeight: 30,
				backgroundColor: '#b8b8b8',
				decorator: this.getBottomBorder()
			});

			rightC.add(filterC);
			
			var permisionsContainer = this._createPermisionsContainer();
			rightC.add(permisionsContainer,{flex: 1});
			return  rightC;
		},

		_createFilterAndSelect:function(){
			var filterC = this.createContainer('HBox');
			this._searchField = new qx.ui.form.TextField().set({
				backgroundColor: 'white',
				decorator: new qx.ui.decoration.RoundBorderBeveled(null, 'white', 0, 5, 5, 5, 5, "0 0px 0px 0px black"),
				margin: 5,
				width: 136,
				height: 20,
				placeholder: tr('Filter People')
			});

			filterC.add(this._searchField);

			//selector of roles
			var roleSelector = this.createSelectBox();
			roleSelector.set({
				marginLeft: 43
			});

			if(this.getCurrentUserPermission() == 'false'){
				roleSelector.setEnabled(false);
			}

			filterC.add(roleSelector);

			//LISTENERS
			//filter's placeholder listener
			this._searchField.addListener('focusin', function (e){
				this._searchField.setPlaceholder('');
			},this);
			this._searchField.addListener('focusout', function (e){
				this._searchField.setPlaceholder(tr('Filter People'));
			},this);

			//Name filter listener
			this._searchField.addListener('keyinput', function (e){
				this._filterUsers(e);
			},this);

			//Name filter listener
			this._searchField.addListener('keyup', function(e) {
				if((e.getKeyIdentifier() == 'Backspace') || (e.getKeyIdentifier() == 'Enter')) {
					this._filterUsers();
				}
			}, this);

			//role seleccion listener
			roleSelector.addListener('changeSelection', function (e){
				var item = e.getData()[0];
				var roleSelected = item.getUserData('role');
				this._setAllSelectBoxToVal(roleSelected);
			},this);

			return filterC;
			
		},
		_setAllSelectBoxToVal: function(val){ //val is the new role to aply to all selectBox
			var childs = this._userPermissionC.getChildren();
			for (var i = 0; i<childs.length; i++){
				var childs2 = childs[i].getChildren();
				for (var j = 0; j < childs2.length; j++){
					if(childs2[j] instanceof qx.ui.form.SelectBox){
						for(var k=0; k < childs2[j].getSelectables(true).length; k++){
							var option = childs2[j].getSelectables(true)[k];
							var possibleSelectedValue = option.getUserData('role');
							if(possibleSelectedValue == val){
								childs2[j].setSelection([option]);
							}
						}
					}					
				}
			}

		},

		//Filtering list function
		_filterUsers: function(e){
				var keys = this._searchField.getValue();
				var count = 0;
				if (keys) {
					count = keys.length;
				}
				var value = null;
				if (e){
					if(this._searchField.getValue()) {
						value = this._searchField.getValue() + e.getChar();
					}
					else {
						value = e.getChar();
					}
				}else{
					value = this._searchField.getValue();
				}
				var vals = {
					'value' : value,
					'length' : count
				};

				//If no text entered, all users are visibles, else must filter
				if (vals['value']){
					var params = {
						'text' : vals['value']
					};
					this._filterUsersByText (params)
				}else{
					var childs = this._userPermissionC.getChildren();
					for (var i = 0; i<childs.length; i++){
						childs[i].setVisibility('visible');
					}
				}
				
		},
		
		//Filter users by text
		_filterUsersByText : function (params) {
			var text = params['text'].toLowerCase();
			var childs = this._userPermissionC.getChildren();
			for (var i = 0; i<childs.length; i++){
				var childs2 = childs[i].getChildren();
				for (var j = 0; j < childs2.length; j++){
					if(childs2[j] instanceof qx.ui.basic.Label){
						var label = childs2[j].getValue().toLowerCase();

						if ((label.indexOf(text) < 0 )){
							childs[i].setVisibility('excluded');
						}else{
							childs[i].setVisibility('visible');
						}
					}					
				}
			}
		},
		
		//draw the container that has the users list and its roles
		_createPermisionsContainer: function(){
			var scroll = new qx.ui.container.Scroll();
			this._userPermissionC = this.createContainer('VBox');
			this._userPermissionC.set({
				backgroundColor: '#FFFFFF',
				maxHeight: 215,
//				maxWidth: 280,
				minWidth: 280
			});
			scroll.add(this._userPermissionC);
			
			//we create a select box with the role for each member of the workgroup
			for(var i=0;i<this._users.length;i++){
				var userLine = this.createContainer('HBox');
				userLine.set({
					maxHeight: 33,
//					padding: 5,
					backgroundColor: '#FFFFFF',
					decorator: this.getBottomBorder()
				});

				this._userPermissionC.add(userLine);

				var nameOfUser = this._users[i]['metadata']['eyeos.user.firstname'] + ' ' + this._users[i]['metadata']['eyeos.user.lastname'];
				var idOfUser = this._users[i]['id'];
				var lblUser = new qx.ui.basic.Label(nameOfUser);
				lblUser.set({
					margin: 10,
					minWidth: 165,
					maxWidth: 165,
					userData: idOfUser
				});
				userLine.add(lblUser);
				var userPermision = this._getUserPermission(idOfUser);
				var isOwner = (userPermision == this.ROLE_OWNER)? true : false
				var roleSelector = this.createSelectBox(isOwner);
				
				if(this.getCurrentUserPermission() == 'false'){
					roleSelector.setEnabled(false);
				}
				roleSelector.setUserData('user', idOfUser);
				userLine.add(roleSelector);
				//assigning the select value 
				for(var k=0; k < roleSelector.getSelectables(true).length; k++){
					var option = roleSelector.getSelectables(true)[k];
					var possibleSelectedValue = option.getUserData('role');
					if(possibleSelectedValue == userPermision){
						roleSelector.setSelection([option]);
						if(userPermision == this.ROLE_OWNER) roleSelector.setEnabled(false);
					}
				}

				roleSelector.addListener('changeSelection', function(e){
					var newRoleOfUser = e.getTarget().getSelection()[0].getUserData('role');
					var user = e.getTarget().getUserData('user');

					this._modifyFileRoles(user,newRoleOfUser);
				},this);

			}

			return scroll;
		},

		_getUserPermission: function(idUser){

			var permission = -1;
			var lastPermission = -1;
			if (this._fileRoles){
				var roleFound = false;
				//looking inside each file for the role modification of this user
				for(var i=0; i < this._fileRoles.length; i++){
					var roles4File = Array();
					var owner = this._fileRoles[i]['owner'];
					if (idUser == owner){
						roles4File[idUser] = this.ROLE_OWNER;
					}else{
						roles4File = this._fileRoles[i]['roles'];
					}
					//searching for a role modification
					for(var vIdUser in roles4File){
						if(vIdUser == idUser){
							permission = roles4File[idUser];
							if(permission != -1 && roleFound && lastPermission != permission)permission = -1; //the role is found in multiple files, so we don't assign him anything
							roleFound = true;
						}
					}
					lastPermission = permission;
				}
			}
			
			return permission;
		},

		_modifyFileRoles:function(idUser,newRole){ //adding or modifying the roles of the metafile
			for(var i=0; i < this._fileRoles.length; i++){
				if(this._fileRoles[i]['roles'][idUser]){ //if the user exists in the metaFile we have to update it
					if(newRole == -1){ //if the new role is the same role that the user has in the workgroup we need to delete the user from the metaFile. That's why we delete it from the array
						delete this._fileRoles[i]['roles'][idUser];
					}else{
						this._fileRoles[i]['roles'][idUser] = newRole;
					}
				}else if(newRole != -1){ //if the user is not in the meta, we need to add it (only if he has a diference between the new role and the role of the workgroup)
					if(this._fileRoles[i]['roles'].length == 0 ){
						this._fileRoles[i]['roles'] = new Object();
					}
					this._fileRoles[i]['roles'][idUser] = newRole;
				}
			}
		},

		createSelectBox: function(isOwner){
			var selectBox = new qx.ui.form.SelectBox();
			selectBox.set({
				maxHeight: 19,
				margin: 5,
				minWidth: 70
			});
			if(!isOwner){
				var item1 = new qx.ui.form.ListItem(tr('Viewer'));
				item1.setUserData('role', this.ROLE_VIEWER);
				var item2 = new qx.ui.form.ListItem(tr('Editor'));
				item2.setUserData('role', this.ROLE_EDITOR);
				var item4 = new qx.ui.form.ListItem(tr('-'));
				item4.setUserData('role', -1);
				var item5 = new qx.ui.form.ListItem(tr('Admin'));
				item5.setUserData('role', this.ROLE_ADMIN);

				selectBox.add(item4);
				selectBox.add(item1);
				selectBox.add(item2);
				selectBox.add(item5);
				
			}else{
				var item3 = new qx.ui.form.ListItem(tr('Owner'));
				item3.setUserData('role', this.ROLE_OWNER);
				selectBox.add(item3);
			}



			
			return selectBox;
		},

		createContainer: function(layoutType){
			var composite = new qx.ui.container.Composite();
			
			switch(layoutType){
				case 'canvas':
					composite.setLayout(qx.ui.layout.Canvas());
					break;
				case 'HBox':
					composite.setLayout(new qx.ui.layout.HBox());
					break;
				default:
					composite.setLayout(new qx.ui.layout.VBox());
					break;
			}

			return composite;
		},

		createBlueLabel: function(val){
			var lb =  new qx.ui.basic.Label(tr(val));
			lb.set({
				marginLeft: 10,
				minWidth: 165,
				maxWidth: 165,
				textColor: '#8497a5',
				font: new qx.bom.Font(12, ['Helvetica', 'Arial']).set({
					//					bold: true
					})
			});
			return lb;
		},

		createBlackLabel: function(val){
			var lb =  new qx.ui.basic.Label(tr(val));
			lb.set({
				marginLeft: 10,
				minWidth: 165,
				maxWidth: 165,
				textColor: '#555656',
				font: new qx.bom.Font(12, ['Helvetica', 'Arial']).set({
					//					bold: true
					})
			});
			return lb;
		},
		addSpacerToContainer: function(cont){
			//SPACER
			var spacer = new qx.ui.core.Spacer(5);
			cont.add(spacer,{flex: 1});
		},
		getBottomBorder: function(){
			var bottomBorder = new qx.ui.decoration.Single(1,'solid','#999999');
			bottomBorder.setRight(0,'solid','#999999');
			bottomBorder.setTop(0,'solid','#999999');
			bottomBorder.setBottom(1,'solid','#999999');
			bottomBorder.setLeft(0,'solid','#999999');
			return bottomBorder;
		},


		getFileIcon: function(nameOfFile){
			var vParts = nameOfFile.split(".");
			var isFolder = false;
			var extension = '';
			if (vParts.length == 1){
				isFolder = true;
			}else{
				extension = vParts[1];
			}

            var imageExtensions = ['JPG', 'JPEG', 'PNG', 'GIF'];
            var videoExtensions = ['FLV'];
            var musicExtensions = ['MP3', 'M4A'];
            var docExtensions = ['EDOC', 'DOC', 'TXT', 'XLS', 'ODS'];
            var zipExtensions = ['ZIP'];
            var image = null;
            if (isFolder) {
                image = 'eyeos/extern/images/48x48/places/folder.png';
            } else if (this.inArray(docExtensions,extension)) {
                image = 'eyeos/extern/images/48x48/mimetypes/application-msword.png';
            } else if (this.inArray(imageExtensions,extension)) {
                image = 'eyeos/extern/images/48x48/mimetypes/image-x-generic.png';
            } else if (this.inArray(musicExtensions,extension)) {
                image = 'eyeos/extern/images/48x48/mimetypes/audio-x-generic.png';
            } else if (this.inArray(videoExtensions,extension)) {
                image = 'eyeos/extern/images/48x48/mimetypes/audio-vnd.rn-realvideo.png';
            }else if (this.inArray(zipExtensions,extension)) {
                image = 'eyeos/extern/images/48x48/mimetypes/application-x-gzip.png';
//            } else if(file.extension == 'LNK') {
//                var info = qx.util.Json.parse(file.content);
//                image = info.icon;
            }else {
                image = 'eyeos/extern/images/48x48/mimetypes/application-x-zerosize.png';
            }

			return image;
		},
		
		inArray: function(arr,val){ //search a value into an array
				var i;
				for (i=0; i < arr.length; i++) {
					if (arr[i].toLowerCase() == val.toLowerCase()) {
						return true;
					}
				}
				return false;
		}
	}

});