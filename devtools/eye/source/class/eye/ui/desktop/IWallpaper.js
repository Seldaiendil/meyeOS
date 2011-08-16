qx.Interface.define('eye.ui.desktop.IWallpaper', {
	properties: {
		color: {},
		image: {},
		mode: {
			check: ['mosaic', 'zoom', 'center', 'scale', 'grow', 'expand']
		}
	}
});
