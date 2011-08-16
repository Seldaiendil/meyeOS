qx.Class.define('eye.ui.desktop.Wallpaper', {
	
	extend: qx.ui.core.Widget,


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

		__originalImage


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
			this.getChildControl('image').setSource(value);
		},


		__applyMode: function(value) {
			var image = this.getChildControl('image').set({
			});

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
