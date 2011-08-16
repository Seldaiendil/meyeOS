qx.Class.define('eye.ui.window.Dialog', {
	
	extend: eye.ui.window.Window,


	construct: function(parent, caption, icon) {
		this.base(arguments, caption, icon);

		if (parent) {
			this.setParent(parent);
		}
	},


	properties: {
		
		attach: {
			check: [ 'screen', 'desktop', 'parent' ],
			init: 'screen'
		},

		block: {
			check: 'Boolean',
			themeable: true,
			init: true
		},

		parent: {
			check: "qx.Class.hasMixin(value, eye.ui.core.MBlockable)",
			nullable: true,
			init: null
		}

	},


	members: {

		show: function() {
			var parent = this.getParent() || this.self(arguments).SCREEN;
			parent.block();

			this.visible();
			this.centerTo(parent);
		},



		/**
		 * Centers the window to argument.
		 *
		 * This call works with the size of the parent widget and the size of
		 * the window as calculated in the last layout flush. It is best to call
		 * this method just after rendering the window in the "resize" event:
		 * <pre class='javascript'>
		 *   win.addListenerOnce("resize", this.center, this);
		 * </pre>
		 */
		centerTo: function(parent) {
			if (qx.core.Environment.get("qx.debug")) {
				eye.core.Param.instanceOf(arguments, parent, 'parent', qx.ui.core.LayoutItem)
			}

			var bounds = parent.getBounds();
			if (bounds) {
				var hint = this.getSizeHint();

				var left = Math.round((bounds.width - hint.width) / 2);
				var top = Math.round((bounds.height - hint.height) / 2);

				if (top < 0) {
					top = 0;
				}

				this.moveTo(left, top);
			}
		}
		
	}

});
