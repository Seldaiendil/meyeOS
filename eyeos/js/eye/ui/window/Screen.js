qx.Class.define('eye.ui.window.Screen', {
	extend: qx.ui.core.Widget,


	construct: function() {
		this._setLayout(new qx.ui.layout.Dock);
	},


	members: {
		
		_createChildControlImpl: function(id) {
			if (id === 'desktop') {
				return new eye.ui.window.Desktop();
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
