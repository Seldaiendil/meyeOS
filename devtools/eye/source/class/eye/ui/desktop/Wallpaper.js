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
			check: ['mosaic', 'center', 'fill', 'zoom', 'scale'],
			nullable: false,
			init: 'center',
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

		_centerImage: function(bound, width, height) {
			var image = this.getChildControl('image');
			var xOffset = bound.width - width;
			var yOffset = bound.height - height;

			image.setMarginLeft
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


		__applyImage: function(value) {
			if (!this.__imageInfoCache[value]) {
				qx.io.ImageLoader.load(value, this.__cacheImage, this);
			}
			this.getChildControl('image').setSource(value);
		},


		__applyMode: function(value, oldValue) {
			var decorator = this.getDecorator();
			var image = this.getChildControl('image');

			if (value === 'mosaic') {
				image.exclude();
				this.__mosaic.setBackgroundImage(this.getImage());
				this.setDecorator(this.__mosaic);
				return;
			}
			if (oldValue === 'mosaic') {
				this.setDecorator(null);
				image.setBackgroundImage(this.getImage());
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
