/**
 * This class manages how the wallpaper must be show,
 * handles background color and a image with diferents modes:
 *	<ul>
 *		<li>'<b>mosaic:</b>' Will repeat the image at original size from coords { top: 0, left: 0 }</li>
 * 		<li>'<b>center:</b>' Centers the image on the wallpaper at its original size</li>
 * 		<li>'<b>fill:</b>' Resizes the image to fill wallpaper height and width without respecting aspect ratio</li>
 * 		<li>'<b>zoom:</b>' Resizes the image to fill all the wallpaper respecting aspect ratio</li>
 * 		<li>'<b>scale:</b>' Resizes the image to adapt to the wallpaper respecting aspect radio</li>
 * 	</ul>
 */
qx.Class.define('eye.ui.desktop.Wallpaper', {
	
	extend: qx.ui.core.Widget,


	construct: function() {
		this.base(arguments);

		// Configure layout to center cell 1,1
		var layout = new qx.ui.layout.Grid;
		layout.setFlexColumn(0, 1);
		layout.setFlexColumn(2, 1);
		layout.setFlexRow(0, 1);
		layout.setFlexRow(2, 1);

		this._setLayout(layout);
		this._add(new qx.ui.core.Spacer, { row: 2, column: 2 });

		this.__mosaic = new qx.ui.decoration.Background;
		this.__mosaic.setBackgroundRepeat('repeat');

		this.__imageInfoCache = {};
	},


	properties: {
		
		/** The background color of the wallpaper */
		color: {
			event: 'changeColor',
			apply: '_applyColor',
			check : 'Color',
			nullable: false,
			init: 'black'
		},

		/** The image will be used as background, use null to not display a image */
		image: {
			event: 'changeImage',
			apply: '_applyImage',
			check: 'String|qx.ui.basic.Image',
			nullable: true,
			init: null
		},

		/** The mode the image must be shown, see class description for details */
		mode: {
			event: 'changeMode',
			apply: '_applyMode',
			check: ['mosaic', 'center', 'fill', 'zoom', 'scale'],
			nullable: false,
			init: 'center'
		}

	},


	members: {

		__imageInfoCache: null,

		__mosaic: null,


		__cacheImage: function(url, data) {
			if (data.failed) {
				eye.log.Console.warn('Fail to load image: ' + url);
			}

			this.__imageInfoCache[url] = data;
		},


		//---------------
		// PROPERTIES
		//---------------
				
		__applyColor: function(value) {
			this.setBackgroundColor(value);
		},

		// property overriden
		getColor: function() {
			return this.getBackgroundColor();
		},


		__applyImage: function(value, oldValue) {
			if (value !== null && !this.__imageInfoCache[value]) {
				qx.io.ImageLoader.load(value, this.__cacheImage, this);
			}
			if (this.getMode() === 'mosaic') {
				if (value === null) {
					this.setDecorator(null);
				} else if (oldValue === null) {
					this.setDecorator(this.__mosaic);
				} else {
					this.__mosaic.setBackgroundImage(value);
				}
			} else {
				if (value === null) {
					this.getChildControl('image').exclude();
				} else if (oldValue === null) {
					this.getChildControl('image').show();
				} else {
					this.getChildControl('image').setSource(value);
				}
			}
		},


		__applyMode: function(value, oldValue) {
			var image = this.getChildControl('image');

			if (value === 'mosaic') {
				image.exclude();
				this.__mosaic.setBackgroundImage(this.getImage());
				this.setDecorator(this.__mosaic);
				return;
			}
			if (oldValue === 'mosaic') {
				this.setDecorator(null);
				image.setSource(this.getImage());
				image.show();
			}

			var data = this.__imageInfoCache[this.getImage()];
			var bound = this.getBounds();

			if (value === 'center') {
				image.setWidth(data.width);
				image.setHeight(data.height);
				return;
			}

			if (value === 'fill') {
				image.setWidth(bound.width);
				image.setHeight(bound.height);
				return;
			}

			var xRelation = bound.width / data.width;
			var yRelation = bound.height / data.height;

			if (value === 'zoom') {
				var maxRel = xRelation > yRelation ? xRelation : yRelation;
				image.setWidth(data.width * maxRel);
				image.setHeight(data.height * maxRel);
			} else if (value === 'scale') {
				var minRel = xRelation < yRelation ? xRelation : yRelation;
				image.setWidth(data.width * minRel);
				image.setHeight(data.height * minRel);
			}
		},


		//---------------
		// CHILD CONTROLS
		//---------------

		_createChildControlImpl: function(id) {
			var control;

			switch (id) {
				case 'image':
					control = new qx.ui.basic.Image;
					control.setScale(true);
					control.setLayoutProperties({
						row: 1,
						column: 1
					});
					break;
			}

			return control || this.base(arguments, id);
		}
	}

});
