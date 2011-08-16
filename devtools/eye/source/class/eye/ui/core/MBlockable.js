qx.Mixin.define('eye.ui.core.MBlockable', {

	members: {

		/**
		 * Get/create blocker instance
		 *
		 * @return {qx.ui.core.Blocker} A blocker attached to this widget
		 */
		getBlocker: function() {
			var blocker = new qx.ui.core.Blocker(this);
			blocker.setAppearance('blockable');

			this.getBlocker = function() {
				return blocker;
			};
			return blocker;
		},


		block: function() {
			var blocker = this.getBlocker();
			blocker.block();
		},


		unblock: function() {
			var blocker = this.getBlocker();
			blocker.unblock();
		},


		forceUnblock: function() {
			var blocker = this.getBlocker();
			blocker.forceUnblock();
		}

	}
	
});
