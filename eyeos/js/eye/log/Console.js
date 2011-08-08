/**
 * Class to manage logs.
 * Provides many type of logs: error, warning, info, debug and log for generic proposes.
 */
qx.Class.define('eye.log.Console', {
	type: 'static',

	members: {

		/**
		 * Logs debug data
		 *
		 * @param msg {String} Message to show
		 */
		debug: function(msg) {
			console.debug(msg);
		},
		
		/**
		 * Logs a message comunicating when an error happens
		 *
		 * @param msg {String} Message to show
		 */
		error: function(msg) {
			console.error(msg);
		},
		
		/**
		 * Logs a message just to inform events
		 *
		 * @param msg {String} Message to show
		 */
		info: function(msg) {
			console.info(msg);
		},
		
		/**
		 * Log a general message
		 *
		 * @param msg {String} Message to show
		 */
		log: function(msg) {
			console.log(msg);
		},
		
		/**
		 * Logs a message to warn the user
		 *
		 * @param msg {String} Message to show
		 */
		warn: function(msg) {
			console.warn(msg);
		}		

		/*
		consoleGroup: function(msg) {
			console.group(msg);
		},
		
		consoleGroupEnd: function(msg) {
			console.groupEnd(msg);
		}
		*/
	}
});

