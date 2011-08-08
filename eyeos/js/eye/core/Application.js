qx.Class.define('eye.core.Application', {
	extend: qx.application.Standalone,


	properties: {
		view: {
			check: 'eye.ui.window.Screen'
			//init: null
		}
	},


	members: {
		main: function() {
			this.base(arguments);

			var view = new eye.ui.window.Screen;
			this.setView(view);
			this.getRoot().add(view);
			// qx.core.Init.getApplication()
		}
	}
});
