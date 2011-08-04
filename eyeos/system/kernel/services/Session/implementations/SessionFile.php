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
 * @subpackage Session
 */
class SessionFile extends Kernel implements ISession {
	private static $Logger = null;
	private $session_id = null;
	private $fp = null;
	private $sessionClosed = false;
	
	/**
	 * Start eyeOS session
	 *
	 */
	public function session_start() {
		$this->sessionClosed = false;
		if(!$this->fp) {
			if(isset($_COOKIE['eyeos'])) {
				$session_id = $_COOKIE['eyeos'];

				if(!file_exists( EYE_ROOT . '/tmp/' . $session_id )) {
					//given session has expired or its fake
					//so, regenerate a new one
					$session_id = md5(uniqid(time(), true));
				}
			} else {
				$session_id = md5(uniqid(time(), true)); //generate a new session id
			}

			$session_id = utf8_basename($session_id); //make sure session filename do not contain '..' or similar

			if(!file_exists( EYE_ROOT . '/tmp/' . $session_id )) {
				//if session file do not exists at this point
				//means that this is a new session
				touch(EYE_ROOT . '/tmp/' . $session_id); //create the session file

				//we need to notify the browser about the current user_id
				setcookie('eyeos', $session_id, 0, null, null, false, true);
			}

			while(!$this->fp) { //wait until session is released from another thread
				$this->fp = fopen(EYE_ROOT . '/tmp/' . $session_id, 'r+'); //try to open the file
				usleep(200); //wait 200 miliseconds to avoid collapsing the server
			}
			
			flock($this->fp, LOCK_EX); //lock the session file, to avoid session collision from different threads
		
			//we are in the lock zone
			$content = stream_get_contents($this->fp); //read the entire file
			$unserializedContent = unserialize(trim($content)); //get the original php data structures
	
			$_SESSION = $unserializedContent; //set the $_SESSION variable to the content of the file
			
			$this->session_id = $session_id;
			register_shutdown_function(array($this, 'session_write_close'));
		}
	}
	
	/**
	 * Write $_SESSION to a file, and end the session
	 *
	 */
	public function session_write_close($cleanvars = true) {
		if($this->fp && !$this->sessionClosed) {
			$this->sessionClosed = true;
			//serialize $_SESSION
			$serializedContent = serialize($_SESSION);
			//truncate the session file to 0
			ftruncate($this->fp, 0);
			//write the new contents
			fwrite($this->fp, $serializedContent);
			//if cleanvars is set to true (by default), set $_SESSION to null
			if($cleanvars) {
				$_SESSION = null;
			}
			//free the session to be able to use it from another threads
			fclose($this->fp);
			$this->fp = false;
		}
	}
	
	/**
	 * Gets the current session_id
	 *
	 */
	public function session_id() {
		return $this->session_id;
	}
	
	/**
	 * Destroy the current session
	 *
	 */
	public function session_destroy() {
		if($this->fp) {
			//close the session handle, to free the session to other users
			fclose($this->fp);
			$this->fp = null;
			//reset the session variables
			$_SESSION = null;
			//remove the session file
			unlink(EYE_ROOT . '/tmp/' . utf8_basename($this->session_id));
		}
	}
}

?>