qx.Class.define('eye.ui.desktop.Desktop', {
	
	extend: qx.ui.window.Desktop,


	construct: function() {
		this.base(arguments);

		this.setWallpaper(new eye.ui.desktop.Wallpaper)
	},


	properties: {

		wallpaper: {
			check: 'eye.ui.desktop.IWallpaper',
			nullable: false,
			deferredInit: true
		}
		
	}

});
