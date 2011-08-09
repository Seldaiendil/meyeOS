qx.Class.define('eye.ui.desktop.Screen', {

	extend: qx.ui.core.Widget,


	construct: function() {
		this.base(arguments);

		this._setLayout(new qx.ui.layout.Dock);
		this._add(this._createChildControl('desktop'));
	},


	properties: {
		
		appearance: {
			refine: true,
			init: 'screen'
		}

	},


	members: {

		_createBar: function() {
			var bar = eye.ui.desktop.Bar();
			bar.setAppearance('screen-bar');
		},

		
		_createChildControlImpl: function(id) {
			if (id === 'desktop') {
				return new eye.ui.desktop.Desktop();
			} else {
				return this.base(arguments);
			}

			/*
			var control;

			switch (id) {
				case 'desktop':
					control = new eye.ui.window.Desktop();
			}

			return control || this.base(arguments);
			*/
		}

	}
});
