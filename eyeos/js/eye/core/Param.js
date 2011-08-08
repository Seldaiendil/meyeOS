/**
 * Used to validate function arguments.
 * If some assert fails it throws a eye.core.ArgumentError
 */
qx.Class.define('eye.core.Param', {
	type: 'static',

	members: {
		/**
		 * Checks if typeof applied to an argument returns expected value
		 * 
		 * @param args {Arguments} The arguments scope of the function is validating.
		 *		Used to display the function name when constructing the error.
		 * @param value The argument value
		 * @param name {String} The argument name, to construct the error.
		 * @param expect {String} The value expected to be returned by typeof
		 */
		typeOf: function(args, value, name, expect) {
			if (typeof value !== expect) {
				throw this.__createError(args, value, name + ' is not a ' + expect);
			}
		},

		isArguments: function(args, value, name) {
			if (Object.prototype.toString.call(value) !== '[object Arguments]') {
				throw this.__createError(args, value, name + ' is not Arguments');
			}
		},

		instanceOf: function(args, value, name, clazz) {
			if (value instanceof clazz) {
				throw this.__createError(args, value, name + ' is not instance of ' + clazz);
			}
		},

		is: function(args, value, name, expect) {
			if (this.__getString(value) !== '[object ' + expect + ']') {
				throw this.__createError(args, value, name + ' is not a ' + expect);
			}
		},


		__createError: function(args, value, message) {
			return new eye.core.ArgumentError(
				args.callee.displayName + ' - ' + message + '. Value --[' + value + ']--'
			);
		},

		__getString: Object.prototype.toString.call
	}
});
