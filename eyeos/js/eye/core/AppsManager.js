qx.Class.define('eye.core.AppsManager', {
	type: 'static',


	construct: function() {
		this.__apps = {};
	},


	members: {
		__apps: null,


		/**
		 * Registers an application. Only registered applications are called with execute method.
		 *
		 * @param name {String} The name of the application.
		 * @param clazz {eye.core.Application} The main application class.
		 *		Will be instanciated when the application is executed.
		 */
		registerApplication: function(name, clazz) {
			if (qx.core.Environment.get('eye.debug')) {
				eye.core.Param.is(arguments, name, 'name', 'String');
				eye.core.Param.instanceOf(arguments, clazz, 'clazz', eye.Application);
			}

			var key = name.toUpperCase();

			// If the class path is not 'eye.apps.{classname}'
			//if (clazz.classname !== 'eye.apps' + clazz.basename)
			if (clazz === eye.apps[clazz.basename]) {
				throw new Error('To register an application the class must be located at eye.apps.{Class}')	
			}
			
			if (this.__apps[key]) {
				throw new Error('Trying to register app "' + name + '" but already exists');
			}

			this.__apps[key] = clazz;
		},


		/**
		 * Executes an eyeOS application.
		 *
		 * @param checknum {Number} The checknum of the calling application.
		 * @param appName {String} The name of the app than must be executed.
		 * @param args {Array?} The arguments will be passed to the application constructor.
		 * @param callback {Function?} The callback function, the instance of the new
		 *		application will be passed as argument.
		 * @param context {Object?} The callback context.
		 */
		execute: function(checknum, appName, args, callback, context) {
			if (qx.core.Environment.get('eye.debug')) {
				eye.core.Param.is(arguments, checknum, 'checknum', 'Number');
				eye.core.Param.is(arguments, appName, 'appName', 'String');
				if (args) {
					eye.core.Param.is(arguments, args, 'args', 'Array');
				}
				if (callback) {
					eye.core.Param.is(arguments, callback, 'callback', 'Function');
				}
			}

			var loader = new eye.ui.core.AppLoader(appName.toUpperCase());

			var get = {
				checknum: checknum,
				getApp: appName.toLowerCase(),
				args: qx.lang.Json.stringify(args)
			};
			eye.io.Server.load(checknum, get, function() {
				loader.destroy();
				var clazz = this.__apps[appName.toUpperCase()];

				clazz.run();
			}, this);
		}
	}
});
