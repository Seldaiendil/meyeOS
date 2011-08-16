/**
 * @licstart The following is the entire license notice for the Javascript code
 *		in this page.
 * ----------------------------------------------------------------------------
 *
 * Copyright (c) 2011 Seldaiendil
 *
 * GNU General Public License Usage
 * This file may be used under the terms of the GNU General Public License
 *		version 3.0 as published by the Free Software Foundation and appearing
 *		in the file LICENSE included in the packaging of this file, if not see
 *		http://www.gnu.org/licenses/gpl-3.0.txt
 *
 *	Please review the following information to ensure the GNU General Public
 *		License version 3.0 requirements will be met:
 *		http://www.gnu.org/copyleft/gpl.html.
 *
 *	If you are unsure which license is appropriate for your use, please do not
 *		use this code :D
 *
 * ----------------------------------------------------------------------------
 * @licend The above is the entire license notice for the Javascript code in
 *		this page.
 */

qx.Class.define('eye.EyeOS', {

	extend: qx.application.Standalone,


	construct: function() {
		if (eye.EyeOS.$$instance) {
			throw new Error('Only one eye.EyeOS can be instanciated')
		}
		eye.EyeOS.$$instance = this;
	},


	properties: {
	
		view: {
			check: 'eye.ui.desktop.Screen',
			nullable: true,
			init: null
		},

		desktop: {
			check: 'eye.ui.desktop.IDesktop',
			nullable: true,
			init: null
		}
		
	},


	members: {
		/**
		 * This method contains the initial application code and gets called
		 * during startup of the application
		 *
		 * @lint ignoreDeprecated(alert)
		 */
		main: function() {
			this.base(arguments);

			if (qx.core.Environment.get("qx.debug")) {
				// support native logging capabilities, e.g. Firebug for Firefox
				qx.log.appender.Native;
				// support additional cross-browser console. Press F7 to toggle visibility
				qx.log.appender.Console;
			}

			/*
			-------------------------------------------------------------------------
			  Below is your actual application code...
			-------------------------------------------------------------------------
			*/

			var view = new eye.ui.desktop.Screen;
			this.setView(view);
			this.setDesktop(view.getDesktop());
			this.getRoot().add(view, { width: '100%', height: '100%' });
			// qx.core.Init.getApplication()
		}
	},


	statics: {
		
		get: function() {
			return eye.EyeOS.$$instance;
		}

	}
});
