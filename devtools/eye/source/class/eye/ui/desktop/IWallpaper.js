/**
 * Interface to define basic caracteristics of a wallpaper class
 */
qx.Interface.define('eye.ui.desktop.IWallpaper', {
	properties: {

		/** The background color of the wallpaper */
		color: {},

		/** The image will be used as background, use null to not display a image */
		image: {},

		/** The mode the image must be shown */
		mode: {
			check: ['mosaic', 'zoom', 'center', 'scale', 'grow', 'expand']
		}
	}
});
