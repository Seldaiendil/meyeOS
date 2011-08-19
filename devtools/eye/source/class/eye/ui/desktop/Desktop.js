/**
 * Contains first level GUI.
 * Manages the wallpaper, the system bars, the windows and allows to add a desktop view.
 */
qx.Class.define('eye.ui.desktop.Desktop', {
	
	extend: qx.ui.window.Desktop,


	construct: function() {
		this.base(arguments);

		this.setWallpaper(new eye.ui.desktop.Wallpaper)
	},


	properties: {

		/** A eye.ui.desktop.IWallpaper implementation to handle the desktop background */
		wallpaper: {
			check: 'eye.ui.desktop.IWallpaper',
			nullable: false,
			deferredInit: true
		}
		
	}

});
