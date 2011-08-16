/**
 * Class dedicated to manage communication with server.
 * Abstracts the programmer from all ajax and eyeos standards.
 */
qx.Class.define('eye.io.Server', {
	type: 'static',

	statics: {
		/**
		 * Used to know when __handleResponse forced the page to refresh or display an error.
		 * 
		 * @lint ignoreReferenceField(__errorFlag)
		 */
		__errorFlag: {},


		/**
		 * Loads an script from the server and executes it.
		 *
		 * @param checknum {Integer} Checknum of the application than executes the call.
		 * @param get {Map} The get data to be added to the url.
		 * @param callback {Function?} The callback to be executed when the script is fully loaded and executed.
		 * @param context {Object?} The context of the callback
		 * @param options {Map?} Other configurable options:
		 *		<p><b>Possible values are:</b>
		 *			<ul>
		 *				<li>onError {Function}: The callback to be executed if the script cannot be loaded</li>
		 *				<li>onErrorContext {Object?} The context of the onError callback,
		 *					if not defined 'context' is used is used</li>
		 *			</ul>
		 *		</p>
		 */
		load: function(checknum, get, callback, context, options) {
			options = options || {};
			get.checknum = checknum;
			var escape = encodeURIComponent;

		 	if (qx.core.Environment.get('eye.debug')) {
		 		eye.core.Param.is(arguments, checknum, 'checknum', 'Number');
		 		eye.core.Param.is(arguments, get, 'get', 'Object');
		 		if (callback) {
			 		eye.core.Param.is(arguments, callback, 'callback', 'Function');
		 		}
		 	}

			var keys = qx.lang.Object.getKeys(get);
			var getParams = [];
			for (var i = 0, len = keys.length; i < len; i++) {
				getParams.push(escape(keys[i]) + '=' + escape(get[keys[i]]));
			}

			var url = 'index.php?' + getParams.join('&');

			var req = new qx.io.ScriptLoader();
			req.load(url, function(e) {
				if (e === 'success') {
					if (typeof callback === 'function') {
						callback.call(context || null);
					}
				} else if (typeof options.onError === 'function') {
					options.onError.call(options.onErrorContext || context || null, e);
				}
			}, this)
		},


		/**
		 * Calls the server to retrieve a JSON and parses it.
		 *
		 * @param checknum {Integer} Checknum of the application than executes the call.
		 * @param message {String} The type of signal to send to the server.
		 * @param post {Map?} The post data to be added to the request.
		 * @param callback {Function?} The callback to be executed when the json is fully loaded and parsed.
		 * @param context {Object?} The context of the callback
		 * @param options {Map?} Other configurable options:
		 *		<p><b>Possible values are:</b>
		 *			<ul>
		 *				<li>onError {Function}: The callback to be executed if the call fails</li>
		 *				<li>onErrorContext {Object?} The context of the onError callback,
		 *					if not defined 'context' is used is used</li>
		 *			</ul>
		 *		</p>
		 */
		call: function(checknum, message, post, callback, context, options) {
			options = options || {};
			var escape = encodeURIComponent;
		 	if (qx.core.Environment.get('eye.debug')) {
		 		eye.core.Param.is(arguments, checknum, 'checknum', 'Number');
		 		eye.core.Param.is(arguments, message, 'message', 'String');
		 		if (callback) {
			 		eye.core.Param.is(arguments, callback, 'callback', 'Function');
		 		}
		 	}

			var url = 'index.php?checknum=' + escape(checknum) + '&message=' + escape(message);
			var req = new qx.io.remote.Request(url, 'POST', 'text/plain');

			if (post){
				req.setData('params=' + escape(qx.lang.Json.stringify(post)));
			}

			if (typeof options.timeout === 'number' && options.timeout > 2000) {
				req.setTimeout(options.timeout);
			}
			if (typeof options.async === 'boolean') {
				req.setAsynchronous(options.async);
			}

			// parseJson depends on server so we disable it
			req.setParseJson(false);

			req.addListener('completed', this.__callResponse, this);
			req.addListener('timeout', this.__callTimeout, this);
			req.addListener('failed', this.__callFailed, this);

			req.setUserData('callback', callback);
			req.setUserData('context', context);
			req.setUserData('error', options.onError);
			req.setUserData('error-context', options.onErrorContext);

			req.send();
		},


		__callResponse: function(response) {
			var content = response.getContent();
			try {
				var json = qx.lang.Json.parse(content)
			} catch (err) {
				this.__logError(
					'malformed_json',
					'The server returned malformed data.',
					'Request response is not JSON:\n\tURL --[' + request.getUrl() +
						']--\n\tPOST --[' + request.getData() +
						']--\n\tRESPONSE --[' + content + ']--'
				);
			}

			this.__handleResponse(json);

			var request = response.getTarget();
			var callback = request.getUserData('callback');
			var context = request.getUserData('context');

			if (typeof callback === 'function') {
				callback.call(context || null, json);
			}
		},

		__callTimeout: function(response) {
			var request = response.getTarget();
			this.__logError(
				'request_timeout',
				'The server is not responding.',
				'Request timeout:\n\tURL --[' + request.getUrl() + ']--\n\tPOST ' + request.getData()
			);
			var error = request.setUserData('error');
			var context = request.setUserData('error-context');
			if (error) {
				error.call(context || null, 'timeout', response);
			}
		},

		__callFailed: function(response) {
			var request = response.getTarget();
			this.__logError(
				'request_failed',
				'The server failed.',
				'Request failed:\n\tURL --[' + request.getUrl() + ']--\n\tPOST: ' + request.getData()
			);
			var error = request.setUserData('error');
			var context = request.setUserData('error-context');
			if (error) {
				error.call(context || null, 'failed', response);
			}
		},


		__logError: function(type, message, log) {
			eye.bus.ErrorBus.send(type);
			eye.log.Console.error(log);
			eye.ui.Dialog.error(tr(message));
		},


		/**
		 * Handle special "control messages".
		 *
		 * @param data {Map} The exception report, as decoded by eyeos._callbackProxy()
		 * @param options {Map} The map of options passed to eyeos.call() or eyeos.callMessage()
		 * @param defaultContext {Object} The default callback context when processing an exception from a control message
		 * @return {var} The (replaced) content to be processed by the callback, or FALSE to stop further processing.
		 */
		__handleResponse: function(response, options, defaultContext, fail) {
			switch (data.__eyeos_specialControlMessage_header) {
				case '__control_exeption':
					var error = response.__eyeos_specialControlMessage_body;
					var callStack = [];

					if (qx.lang.Type.isArray(error.stackTrace)) {
						for (var i = 0, len = error.stackTrace.length; i < len; i++) {
							callStack.push(this.__formatPHPError(error.stackTrace[i]));
						}
					} else {
						callStack.push(error.stackTrace);
					}

					this.__logError(
						'php_error',
						'Error on server',
						'Exeception on server call: ' + qx.lang.Json.stringify(error)
					);
					return this.__errorFlag;

				case '__control_expiration':
					eye.ui.Alert.warn('Your session has expired', function() {
						window.onbeforeunload = null;
						document.location.reload();
					});
					return this.__errorFlag;

				case '__control_enhancedData':
					var data = response.__eyeos_specialControlMessage_body;
					var message;

					if (qx.lang.Type.isArray(data.messages)) {
						for (var i = 0, len = data.messages.length; i < len; i++) {
							message = data.messages[i];
							eye.bus.MessageBus.send(message.type, message.eventName);
						}
					}

					//try {
						return qx.lang.Json.parse(data.data);
					//} catch (err) {
					//	return data.data;
					//}

				case '__control_refresh':
					window.location.reload();
					return this.__errorFlag;

				default:
					eye.log.Console.warn(
						'Unknown control message recived.\nHeader: --[' +
						data.__eyeos_specialControlMessage_header + ']--'
					);
					eye.ui.Alert.error(tr('Unknown message recived from server'));
			}
		},


		/**
		 * Formats a PHP exception encoded into JSON to a single string.
		 * 
		 * @param e {Map} The exception object from JSON.
		 */
		__formatPHPError: function(error) {
			return '[' + error.exception + '] ' +
				(error['class'] ? error['class'] + error.type : '') +
				error['function'] + '(): ' + error.message + ' --- ' + error.file + ' (l.' + error.line + ')';
		}
	}
});
