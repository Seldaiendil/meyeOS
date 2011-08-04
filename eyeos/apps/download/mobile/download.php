<?php
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
abstract class DownloadMobileApplication extends EyeosApplicationExecutable {
	public static function __run(AppExecutionContext $context, MMapResponse $response) {
		$args = $context->getArgs();
		$path = $args[0];
		
		//copyed from files.php
		$myFile = FSI::getFile($path);
		$myFile->checkReadPermission();
		if (method_exists ( $myFile , 'getRealFile' )) {
			$fileName = AdvancedPathLib::getPhpLocalHackPath($myFile->getRealFile()->getAbsolutePath());
		} else {
			$fileName = $path;
		}

		$mime = mime_content_type($fileName);
		$size = filesize($fileName);
		header('Content-Type: ' . $mime);
		header('Accept-Ranges: bytes');
		header('Content-Disposition: attachment; filename="' . basename($fileName) . '"');

		if (isset($_SERVER['HTTP_RANGE'])) {
			$ranges = explode(',', substr($_SERVER['HTTP_RANGE'], 6));
			foreach ($ranges as $range) {
				$parts = explode('-', $range);
				$start = intval($parts[0]); // If this is empty, this should be 0.
				$end = intval($parts[1]); // If this is empty or greater than than filelength - 1, this should be filelength - 1.

				if(empty($end)) {	//For avoid problems with Range: bytes=0-
					$end = $size;
				}

				if ($start > $end) {
					header('HTTP/1.1 416 Requested Range Not Satisfiable');
					exit;
				}

				//If you do not specify the 'b' flag when working with binary files,
				//you may experience strange problems with your data, including broken image files and strange problems with \r\n characters.
				$fp = fopen($fileName, 'rb');
				fseek($fp, $start);

				header('Content-Length: ' . $end-$start+1);
				header('Content-Range: bytes '.$start.'-'.$end.'/'.$size);
				echo fread($fp, $end-$start+1);
				exit;
			}
		}
		header('Content-Range: bytes 0/'.$size);
		header('Content-Length: ' . $size);
		readfile($fileName);

		exit;
	}
}
?>