qx.Class.define('eye.io.Server', {
	type: 'static',

	members: {
		/**
		 * @lint ignoreReferenceField(__refreshingFlag)
		 */
		__refreshingFlag: {},

		/**
		 * Sends a request to the server.
		 *
		 * @param data {Map} A map containing the GET and POST parameters with their values (see eyeos.callMessage())
		 * @param callback {Function} The application's function to call on success
		 * @param context {Object} The context of the callback function
		 * @param options {Map} The map of options defining, among others, how to handle errors and control messages
		 */
		 call: function(data, options, callback, context) {
			data = data || {};
			options = options || {};

			var keys = qx.lang.Object.getKeys(data.get);
			var get = [];
			for (var i = 0, len = keys.length; i < len; i++) {
				get.push(encodeURIComponent(keys[i]) + '=' + encodeURIComponent(data.get[keys[i]]));
			}

			var url = 'index.php?' + url.join('&');
			eye.log.Console.debug('Ajax: ' + url)

			var request = new eye.io.remote.Request(url, 'POST', 'text/plain');

			if (options.timeout > 2000 || options.timeout === 0) {
				request.setTimeout(options.timeout);
			}

			if (typeof options.async === 'boolean') {
				request.setAsynchronous(options.async);
			}

			keys = qx.lang.Object.getKeys(data.post);
			for (var i = 0, len = keys.length; i < len; i++) {
				request.setData(encodeURIComponent(keys[i]) + '=' + encodeURIComponent(data.post[keys[i]]));
			}

			request.addListener('completed', function(response) {
				this._handleResponse(response, options, callback, context);
			});
			request.addListener('timeout', function(e) {
				this._handleTimeout(e, request, context, options);
			});
			request.addListener('failed', function(e) {
				this._handleError(e, request, context, options);
			});

			request.send();
			return request.toHashCode();
		},

		/**
		 * Called on response to a request from eyeos.call() or eyeos.callMessage().
		 * This function parses the JSON response, reads possible errors and executes callback
		 *
		 * @param response {qx.io.remote.Response} The response from the server
		 * @param options {Map} The map of options passed to eyeos.call() or eyeos.callMessage()
		 * @param callback {Function} The application's function to call on success
		 * @param context {Object} The context of the callback function
		 */
		 _handleResponse: function(response, options, callback, context) {
			try {
				var content = response.getContent();
				var json = qx.util.Json.parse(content) || {};
				var data = this._handleControlMessage(json, options, context);

				if (data === this.__refreshingFlag) {
					return;
				}

				if (callback) {
					callback.call(context || null, data);
				}
			} catch (err) {
				eye.log.Console.error(err);
			}
		},

		_handleTimeout: function(event, request, context, options) {
			eye.log.Console.error('Request timeout: ' + request.getUrl());
			eye.ui.Alert.error(tr('A request timed out'));

			var context = options.onErrorContext || context || null;
			options.onError.call(context, "timeout");
		},
		_handleError: function(event, request, context, options) {
			// TODO
		},

		/**
		 * Handle special "control messages".
		 *
		 * @param data {Map} The exception report, as decoded by eyeos._callbackProxy()
		 * @param options {Map} The map of options passed to eyeos.call() or eyeos.callMessage()
		 * @param defaultContext {Object} The default callback context when processing an exception from a control message
		 * @return {var} The (replaced) content to be processed by the callback, or FALSE to stop further processing.
		 */
		_handleControlMessage: function(response, options, defaultContext) {
			switch (data.__eyeos_specialControlMessage_header) {
				case '__control_exeption':
					if (!options.silentError) {
						this._handleControlError(response);
					}

					if (typeof options.onError === 'function') {
						var context = options.onErrorContext || defaultContext || null;
						options.onError.call(context, response);
					}

					return this.__refreshingFlag;

				case '__control_expiration':
					eye.ui.Alert.warning('Your session has expired', function() {
						window.onbeforeunload = null;
						document.location.reload();
					});
					return this.__refreshingFlag;

				case '__control_enhancedData':
					var data = response.__eyeos_specialControlMessage_body;
					var message;

					if (qx.lang.Type.isArray(data.messages)) {
						for (var i = 0, len = data.messages.length; i < len; i++) {
							message = data.messages[i];
							eye.bus.MessageBus.send(message.type, message.eventName);
						}
					}

					try {
						return qx.util.Json.parse(data.data);
					} catch (err) {
						return data.data;
					}

				case '__control_refresh':
					window.location.reload();
					return this.__refreshingFlag;

				default:
					eye.log.Console.warning(
						'Unknown control message recived.\nHeader: --[' +
						data.__eyeos_specialControlMessage_header + ']--'
					);
					eye.ui.Alert.error(tr('Unknown message recived from server'));
			}
		},

		/**
		 * Handle error reports returned from the server (PHP exceptions).
		 * Displays an error dialog containing information about the error that was returned by the server.
		 * Reports also the same information in the debug console (Firebug, etc.), in an error message.
		 *
		 * @param controlMessageContent {Map} The map containing the header, body and options of the control message
		 */
		_handleControlError: function(response) {
			var error = response.__eyeos_specialControlMessage_body;
			var callStack = [];

			if (qx.lang.Type.isArray(error.stackTrace)) {
				for (var i = 0, len = error.stackTrace.length; i < len; i++) {
					callStack.push(this._formatPHPError(error.stackTrace[i]));
				}
			} else {
				callStack.push(error.stackTrace);
			}

			eye.log.Console.error('Exeception on server call: {\n\tname: --[' +
				error.name + ']--,\n\tmessage: --[' + error.message +
				']--,\n\tcallStack: [\n\t\t' + callStack.join(',\n\t\t') + '\n\t]\n}');

			eye.ui.Alert.error(tr('Error on server response'));
		}
	},

	/**
	 * Formats a PHP exception encoded into JSON to a single string.
	 * 
	 * @param e {Map} The exception object from JSON.
	 */
	_formatPHPError: function(error) {
		return '[' + error.exception + '] ' +
			(error['class'] ? error['class'] + error.type : '') +
			error['function'] + '(): ' + error.message + ' --- ' + error.file + ' (l.' + error.line + ')';
	}
});