<?php

function toptext() {
    return 'Configure your eyeOS';
}

function getContent() {
    if(isset($_POST['mysqlhost'])) {
        $link = mysql_connect($_POST['mysqlhost'], $_POST['mysqluser'], $_POST['mysqlpass']);
        if(!$link) {
            echo '<p>Unable to connect to databse: '.mysql_error().'</p>';
            echo '<p><a href="index.php?step=configuration">Click here to go back</a></p>';
			return;
        }

        if(!mysql_select_db($_POST['mysqldb'], $link)) {
            echo '<p>Unable to select databse: '.mysql_error().'</p>';
            echo '<p><a href="index.php?step=configuration">Click here to go back</a></p>';
			return;
        }

        set_time_limit(0);
        $files = array(
            '../eyeos/extras/EyeosUMSQL/EyeosUMSQL.sql',
            '../eyeos/extras/EyeosTagsSQL/EyeosTags.sql',
            '../eyeos/extras/EyeosMetaSQL/EyeosMetaSQL.sql',
            '../eyeos/extras/EyeosPeopleSQL/EyeosPeopleSQL.sql',
            '../eyeos/extras/EyeosPeopleSQL/EyeosPeopleUpdateSQL.sql',
            '../eyeos/extras/PresenceSQL/Presence.sql',
            '../eyeos/extras/rMailApplicationSQL/rMailApplication.sql',
            '../eyeos/extras/CalendarSQL/Calendar.sql',
            '../eyeos/extras/GroupCalendarSQL/GroupCalendar.sql',
            '../eyeos/extras/EyeosEventsNotificationSQL/EyeosEventNotification.sql',
            '../eyeos/extras/LanguageAdminSQL/languageAdmin.sql',
            '../eyeos/extras/netSyncSQL/netSync.sql',
            '../eyeos/extras/UrlShareSQL/UrlShareSQL.sql'
        );

        foreach($files as $file) {
            $content = file_get_contents($file);
            $content = explode("\n", $content);
            $buffer = "";
            foreach($content as $line) {
                $line = str_replace("\r", "", $line);
                $line = trim($line);
                $buffer .= $line."\r\n";
                if(substr($line, -1, 1) == ';') {
                    mysql_query($buffer, $link);
                    //echo "executing: ".$buffer;
                    $buffer = "";
                } 
            }
        }

        $rootpass = sha1($_POST['eyerootpass'] . sha1($_POST['eyerootpass']));

	$sql = 'UPDATE eyeosuser set password = \''.$rootpass.'\' where id = \'eyeID_EyeosUser_root\'';

	mysql_query($sql, $link);

	$settingstext = getSettingsText($_POST['mysqlhost'], $_POST['mysqldb'], $_POST['mysqluser'], $_POST['mysqlpass']);

	file_put_contents('../settings-local.php', $settingstext);
        
        /**
         * the content has passwords, if we are executed on a system that can change permisions... just do it.
         * this file never must be changed.
         */
        if (function_exists('chmod'))
        {
            chmod('../settings-local.php', 0440);
            
        }


	header('Location: index.php?step=end');
    } else {
        echo '<center><h2 class="bigtitle">eyeOS 2 configuration</h2></center>';
        ?>
<script>
function checkandsend() {
    if(document.getElementById('eyerootpass').value != "") {
        document.getElementById('forminfo').submit();
	document.getElementById('configcontent').innerHTML = '<center><p>Installing eyeOS...</p><img style="margin-top:40px" src="ajax-loader.gif" /></center>';
    } else {
        alert('eyeOS root password cannot be empty');
    }
}
</script>
<div id="configcontent">
    <center>Database configuration</center>
    <form id="forminfo" action="index.php?step=configuration" method="post">
    <table style="margin-top:20px;width:600px;">
        <tr>
            <td style="padding-right:10px;" align="right">MySQL Host:</td>
            <td><input name="mysqlhost" type="text" class="box" value="localhost" /></td>
        </tr>
        <tr>
            <td style="padding-right:10px;" align="right">MySQL Database:</td>
            <td><input name="mysqldb" type="text" class="box" value="eyeos" /></td>
        </tr>
        <tr>
            <td style="padding-right:10px;" align="right">MySQL Username:</td>
            <td><input name="mysqluser" type="text" class="box" value="" /></td>
        </tr>
        <tr>
            <td style="padding-right:10px;" align="right">MySQL Password:</td>
            <td><input name="mysqlpass" type="password" class="box" value="" /></td>
        </tr>
    </table>
    <br />
    <center>EyeOS configuration</center>
    <table style="margin-top:20px;width:600px;">
        <tr>
            <td style="padding-right:10px;" align="right">eyeOS root password:</td>
            <td><input id="eyerootpass" name="eyerootpass" type="text" class="box" value="" /></td>
        </tr>
    </table>
    <br />
    <p id="sendbtn"><center><a href="javascript:checkandsend();"><div><img src="next.png" border="0" /></div><div style="margin-top:20px;">Continue with the installation</div></a></center></p>
    </form>
</div>
<?php
    }
}

function getSettingsText($mysqlhost, $mysqldb, $mysqluser, $mysqlpass) {
    return "<?php
define('SQL_HOST', '".$mysqlhost."');
define('SQL_CONNECTIONSTRING', 'mysql:dbname=".$mysqldb.";host='.SQL_HOST);
define('SQL_USERNAME', '".$mysqluser."');
define('SQL_PASSWORD', '".$mysqlpass."');
// NETSYNC 
define('SQL_NETSYNC_DBNAME', '".$mysqldb."');
?>";
}
?>