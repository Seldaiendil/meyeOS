qx.Class.define('eye.ui.desktop.Wallpaper', {
	
	extend: qx.ui.core.Widget,


	construct: function() {
		this.base(arguments);

		this._setLayout(new qx.ui.layout.Grow);

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
			check: ['mosaic', 'zoom', 'center', 'scale', 'grow', 'expand'],
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
				this._removeAll()
				this.__mosaic.setBackgroundImage(this.getImage());
				this.setDecorator(this.__mosaic);
				return;
			}
			if (oldValue === 'mosaic') {
				this.setDecorator(null);
				image.setBackgroundImage(this.getImage());
				this._add(image);
			}

			var data = this.__imageInfoCache[this.getImage()];
			var bound = this.getBounds();

			if (value === 'center') {
				image.setWidth(data.width);
				image.setHeight(data.height);
				this._centerImage();
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
				var minRel = xRelation < yRelation ? xRelation : yRelation;
				image.setWidth(Math.round(data.width * minRel);
				image.setHeight(Math.round(data.height * minRel);
				this._centerImage();
			} else if (value === 'scale') {
				var maxRel = xRelation > yRelation ? xRelation : yRelation;
				image.setWidth(Math.round(data.width * maxRel);
				image.setHeight(Math.round(data.height * maxRel);
				this._centerImage();
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
					break;
			}

			return control || this.base(arguments, id);
		}
	}

});
