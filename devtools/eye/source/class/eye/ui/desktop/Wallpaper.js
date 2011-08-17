qx.Class.define('eye.ui.desktop.Wallpaper', {
	
	extend: qx.ui.core.Widget,


	construct: function() {
		this.base(arguments);

		this.__imageInfoCache = {};
	}


	properties: {
		
		color: {
			event: 'changeColor',
			apply: '_applyColor',
			check : 'Color',
			nullable: false,
			init: 'black'
		},

		image: {
			event: 'changeImage',
			apply: '_applyImage',
			check: 'String|qx.ui.basic.Image',
			nullable: true,
			init: null
		},

		mode: {
			event: 'changeMode',
			apply: '_applyMode',
			check: ['mosaic', 'zoom', 'center', 'scale', 'grow', 'expand'],
			nullable: false,
			init: 'center',
		}

	},


	members: {

		__imageInfoCache: null,


		__cacheImage: function(url, data) {
			if (data.failed) {
				eye.log.Console.warn('Fail to load image: ' + url);
			}

			this.__imageInfoCache[url] = data;
		},


		//--------------
		// PROPERTIES
		//--------------
				
		__applyColor: function(value) {
			this.setBackgroundColor(value);
		},

		// property overriden
		getColor: function() {
			return this.getBackgroundColor();
		},


		__applyImage: function(value) {
			if (!this.__imageInfoCache[value]) {
				qx.io.ImageLoader.load(value, this.__cacheImage, this);
			}
			this.getChildControl('image').setSource(value);
		},


		__applyMode: function(value) {
			var image = this.getChildControl('image');

			switch (value) {
				case 'mosaic':
					image.set
					break;

				case 'zoom':
					break;

				case 'center':
					break;

				case 'scale':
					break;

				case 'grow':
					break;

				case 'expand':
					
			}	
		},

	}

});
