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
 *	Open new window with the sharing option.
 *		Always create a new share link, never try to update a previous sharing.
 *		There's a function for mail the link with maito anchor
 *	@params
 *		args[0]	->	eyeOS path of the file
 *		args[1]	->	Subject of the mail
 *		args[2]	->	Body of the mail
 *
 */
function urlshare_application(checknum, pid, args) {
	var applicationName = 'urlshare';
	var urlshareApp = new eyeosMobileApplication(applicationName, checknum, pid, {
		theme: "b"
	});
	urlshareApp.createPage();

	//Vars of the app
	var filePath = args[0];
	var baseName = filePath.substring(filePath.lastIndexOf('/')+1);
	var fileURL = '';
	var fileURLID = '';
	var mailSubject = args[1];
	var mailBody = args[2];
	var onejan2070 = 2147483647;
	var passInBD = '';
	//By default, shared file expire in 31 days (31 days = 2678400000 milliseconds)
	var d = new Date();
	var dateInBD = new Date(d.getFullYear(),d.getMonth(),d.getDate(),23,59,59).getTime() + 2678400000;


	loadDependencies(function () {
		createContentAndChangePage(args);
	});

	function loadDependencies(callback) {
		//load all js & css files here (and not in php) for prevent to download every time the app its executed
		if(typeof $.fn.datepicker == 'undefined') {
			$.getScript('eyeos/extern/js/jquery/lib/jquerymobile/jquery.ui.datepicker.js', function() {
				$.getScript('eyeos/extern/js/jquery/lib/jquerymobile/jquery.ui.datepicker.mobile.js', function() {
					$.get('eyeos/extern/js/jquery/lib/jquerymobile/jquery.ui.datepicker.css', function(css) {
						$('head').append('<style>'+css+'</style>');
					});
				});
			});
		}
		eyeosmobile.callMessage(urlshareApp.getChecknum(), '__UrlShare_createURL', {path : filePath}, function (createdURL){
			eyeosmobile.callMessage(urlshareApp.getChecknum(), '__UrlShare_getUrlInfo', {urlId: createdURL.id}, function (urlinfo){
				fileURL = urlinfo.urlInformation.name;
				fileURLID = createdURL.id;
				if(typeof callback == 'function') {
					callback();
				}
			}, this);
		}, this);
	}

	function createContentAndChangePage(args) {
		var mainContainer = $('<form />');

		var infoContainer = $('<center />').appendTo(mainContainer);
		var lblTitle = $('<h3>'+tr('Sharing')+' '+baseName+'</h3>').appendTo(infoContainer);
		var lblYourURL = $('<div>'+tr('Here is your Url')+'</div>').appendTo(infoContainer);
		var lblURL = $('<div>'+fileURL+'</div>').appendTo(infoContainer);
		var lblYouCanCopy = $('<div>'+tr('You can copy this URL in your clipboard to use it wherever you need it.')+'</div>').appendTo(infoContainer);


		//Password Element
		var password = $('<div data-role="fieldcontain">\n\
								<label for="passwordFlip">'+tr('Protect by password?')+'</label>\n\
								<select name="passwordFlip" id="passwordFlip" data-role="slider">\n\
									<option value="yes">'+tr('Yes')+'</option>\n\
									<option value="no" selected="selected">'+tr('No')+'</option>\n\
								</select>\n\
							</div>').appendTo(mainContainer);

		var txtPassword = $('<div data-role="fieldcontain">\n\
								<label for="password">'+tr('Password')+':</label>\n\
								<input type="password" name="password" id="password" value="" />\n\
							</div>').appendTo(mainContainer);

		//Calendar element
		var date = $('<div data-role="fieldcontain">\n\
						<label for="dateFlip">'+tr('Expiration date?')+'</label>\n\
						<select name="dateFlip" id="dateFlip" data-role="slider">\n\
							<option value="yes" selected="selected">'+tr('Yes')+'</option>\n\
							<option value="no">'+tr('No')+'</option>\n\
						</select>\n\
					</div>').appendTo(mainContainer);

		var inDate = $('<div data-role="fieldcontain">\n\
							<input type="date" name="date" id="date" value="" /><br />\n\
						</div>').appendTo(mainContainer);

		//Cancel / Acept

		//INLINE ¿data-inline="true"?
//		var btnContainer = $('<center class="ui-grid-c" />').appendTo(mainContainer);
//		var btnCancel = $('<a class="ui-block-a" data-role="button" data-icon="back" style="margin-left: 12.5%;" data-rel="back">'+tr('Cancel & Delete URL')+'</a>').appendTo(btnContainer).click(function () {
//			deleteURL();
//		});
//		var btnUpdate = $('<a href="#" class="ui-block-b" data-role="button" data-icon="check">'+tr('Update URL')+'</a>').appendTo(btnContainer).click(function () {
//			updateChanges();
//		});
//		var btnSendMail = $('<a href="#" class="ui-block-c" data-role="button" data-icon="forward">'+tr('Send Mail')+'</a>').appendTo(btnContainer).click(function () {
//			confirmChangesAndSave(function() {
//				sendMail();
//			});
//		});

		//ONE LINE EACH
		var btnContainer = $('<center />').appendTo(mainContainer);
		var btnCancel = $('<a data-role="button" data-icon="back" data-rel="back">'+tr('Cancel & Delete URL')+'</a><br />').appendTo(btnContainer).click(function () {
			deleteURL();
		});
		var btnUpdate = $('<a href="#" data-role="button" data-icon="check">'+tr('Update URL')+'</a><br />').appendTo(btnContainer).click(function () {
			updateChanges();
		});
		var btnSendMail = $('<a href="#" data-role="button" data-icon="forward">'+tr('Send Mail')+'</a><br />').appendTo(btnContainer).click(function () {
			confirmChangesAndSave(function() {
				sendMail();
			});
		});

		urlshareApp.getContent().append(mainContainer);

		var pageId = urlshareApp.getPageId();
		$.mobile.changePage('#' + pageId, 'pop', false, true);
		

		function confirmChangesAndSave(callback) {
			try {
				var dateInput = parseDate($("#date").val())
			} catch (e) {}
			
			if((passInBD != $("#password").val() || dateInBD != dateInput) && confirm(tr('Do you want to save your changes?'))) {
				updateChanges(callback);
			} else {
				if(typeof callback == 'function') {
					callback();
				}
			}
		}

		function updateChanges(callback) {
			if(checkInputValues()) {
				var passwordVal = $("#password").val();
				if ($("#passwordFlip").val() == 'no') passwordVal = '';
				var dateVal = parseDate($("#date").val());
				if ($("#dateFlip").val() == 'no') dateVal = onejan2070;

				eyeosmobile.callMessage(urlshareApp.getChecknum(), '__UrlShare_updateURL', {id: fileURLID, password: passwordVal, expirationDate: dateVal, enabled: 'true'}, function (result){
					eyeosmobile.openErrorDialog(tr('Options Saved'));
					passInBD = passwordVal;
					dateInBD = dateVal;
					if(typeof callback == 'function') {
						callback();
					}
				}, this);
			}
		}

		//Based in urlshare (not mobile version)
		function checkInputValues() {
			var error = '';
            var errormsg = '';
			var passwordVal = $("#password").val();
			//Check for the format of the date input
			try {
				var dateVal = new Date(parseDate($("#date").val()));
			} catch (exception) {
				error = tr('Incorrect date');
				errormsg = exception;
			}

			// Checking if password is empty
            if (error == '' && $("#passwordFlip").val() == 'yes') {
                if (passwordVal == '' || passwordVal == null) {
                    error = tr('Empty password');
                    errormsg = tr('The password is empty');
                }
            }
            if (error == '' && $("#dateFlip").val() == 'yes') {
                if (dateVal == null) {
                    error = tr('Undefined date');
                    errormsg = tr('Please select a expiration date.');

                // Checking if selected date is previous to actual date
                } else {
					var todaydate = new Date();
					todaydate = todaydate.getTime();

                    if (dateVal < todaydate) {
						error = tr('Date expired');
						errormsg = tr('The selected expiration date is earlier than current date');
                    }
                }
            }
			if (error != '') {
				eyeosmobile.openErrorDialog(error+':\n'+errormsg);
				return false;
            } else {
				return true;
			}
		}

		function sendMail() {
			var date;
			if(dateInBD == onejan2070) {
				date = '';
			} else {
				var d = new Date(dateInBD);
				date = d.getDate()+"-"+(d.getMonth()+1)+"-"+d.getFullYear();
			}

			mailBody = mailBody.replace(/%%FILENAME%%/g,baseName);
			mailBody = mailBody.replace(/%%URLSTRING%%/g,fileURL);
			mailBody = mailBody.replace(/%%PASSWORD%%/g,passInBD);
			mailBody = mailBody.replace(/%%TIMELIMIT%%/g,date);

			document.location.href = 'mailto: ?subject='+mailSubject+'&body='+mailBody;
		}
		
		function deleteURL() {
			eyeosmobile.callMessage(urlshareApp.getChecknum(), '__UrlShare_deleteURL', fileURLID, function (result){
//				console.log('__UrlShare_deleteURL');
			});
		}

		/**
		 * @param timeString	string with this format dd-mm-yyyy
		 * @return unixTimeStamp at the end of the day
		 */
		function parseDate(timeString) {
			if(typeof timeString != 'string') throw tr('Not a String');

			var time = timeString.match(/(?:\d+)/ig);
			if(typeof time[0] == 'undefined' || typeof time[1] == 'undefined' || typeof time[2] == 'undefined') throw tr('The valid format is day-month-year');
			
			var year = parseInt(time[2],10);
			var month = parseInt(time[1],10); 
			var day = parseInt(time[0],10);
			if(!checkdate(month,day,year)) throw tr('Not a valid date');

			//Minus 1 month (js start in 0)
			d = new Date(year, month-1, day, 23, 59, 59);
			return d.getTime();
		}

		// Returns true(1) if it is a valid date in gregorian calendar
		//
		// version: 1103.1210
		// discuss at: http://phpjs.org/functions/checkdate
		// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   improved by: Pyerre
		// +   improved by: Theriault
		function checkdate (m, d, y) {
			return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
		}
	}
}