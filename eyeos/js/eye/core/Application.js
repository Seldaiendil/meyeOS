/* ************************************************************************

   Copyright: Seldaiendil

   License: LGPL

   Authors: Seldaiendil

************************************************************************ */

/* ************************************************************************

// #asset(eye/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "EyeOS"
 */
qx.Class.define('eye.core.Application', {

	extend: qx.application.Standalone,


	properties: {
		view: {
			check: 'eye.ui.desktop.Screen'
			//init: null
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
			this.getRoot().add(view);
			// qx.core.Init.getApplication()
			eye.EyeOS.init();
		}
	}
});
