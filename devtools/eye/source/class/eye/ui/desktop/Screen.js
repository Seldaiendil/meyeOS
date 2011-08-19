/**
 * Main container of the application
 */
qx.Class.define('eye.ui.desktop.Screen', {

	extend: qx.ui.core.Widget,


	construct: function() {
		this.base(arguments);

		this._setLayout(new qx.ui.layout.Dock);

		this._add(new eye.ui.desktop.Bar(), { edge: 'top' });
		this._add(this._createChildControl('desktop'), { edge: 'center' });;
	},


	properties: {
		
		appearance: {
			refine: true,
			init: 'screen'
		}

	},


	members: {

		getDesktop: function() {
			return this.getChildControl('desktop');
		},

		
		_createChildControlImpl: function(id) {
			var control;

			switch (id) {
				case 'desktop':
					control = new eye.ui.window.Desktop();
			}

			return control || this.base(arguments);
		}

	}
});
