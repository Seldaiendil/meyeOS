/**
 * Used to validate function arguments.
 * If some assert fails it throws a eye.core.ArgumentError
 */
qx.Class.define('eye.core.Param', {
	type: 'static',

	members: {
		/**
		 * Checks if typeof applied to an argument returns expected value.
		 * 
		 * @param args {Arguments} The arguments scope of the function is validating.
		 *		Used to display the function name when constructing the error.
		 * @param value The argument value.
		 * @param name {String} The argument name, to construct the error.
		 * @param expect {String} The value expected to be returned by typeof.
		 */
		typeOf: function(args, value, name, expect) {
			if (typeof value !== expect) {
				throw this.__createError(args, value, name + ' is not a ' + expect);
			}
		},

		/**
		 * Checks if an argument is instance of specified class.
		 * 
		 * @param args {Arguments} The arguments scope of the function is validating.
		 *		Used to display the function name when constructing the error.
		 * @param value The argument value.
		 * @param name {String} The argument name, to construct the error.
		 * @param clazz {Class} The class.
		 */
		instanceOf: function(args, value, name, clazz) {
			if (value instanceof clazz) {
				throw this.__createError(args, value, name + ' is not instance of ' + clazz);
			}
		},

		/**
		 * Checks if Object.prototype.toString applied over argument returns expected type.
		 * 
		 * @param args {Arguments} The arguments scope of the function is validating.
		 *		Used to display the function name when constructing the error.
		 * @param value The argument value.
		 * @param name {String} The argument name, to construct the error.
		 * @param expect {String} The value expected to be returned.
		 */
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
