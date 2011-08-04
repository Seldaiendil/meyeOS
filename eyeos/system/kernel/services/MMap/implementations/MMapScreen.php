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

/**
 * 
 * @package kernel-services
 * @subpackage MMap
 */
class MMapScreen extends Kernel implements IMMap {
	private static $scripts = null;
	public static function getInstance() {
		return parent::getInstance(__CLASS__);
	}
	 
	public function checkRequest(MMapRequest $request) {
		return true;
	}
	
	public function processRequest(MMapRequest $request, MMapResponse $response) {
	    ob_start();
		// header
		$expires = 60*60*24*90;
		$response->getHeaders()->append("Pragma: public");
		$response->getHeaders()->append("Cache-Control: max-age=".$expires.", must-revalidate");
		$response->getHeaders()->append('Expires: ' . gmdate('D, d M Y H:i:s', time()+$expires) . ' GMT');

		$response->setBody('

<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<link rel="icon" type="image/png" href="eyeos/extern/images/favicon.png" />
		<script type="text/javascript" src="eyeos/extern/eyeos.js"></script>
		<script type="text/javascript">
			function init() {
				alert("Start");
			}
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", init, false);
			} else if (document.attachEvent) {
				document.attachEvent("onreadystatechange", function () {
					if (document.readyState == "complete") {
						init();
					}
				});
			} else {
				window.onload = init;
			}
		</script>
		<title>Welcome to eyeOS '. EYE_VERSION .'</title>
	</head>
	<body></body>
</html>

		');
	}
}
?>