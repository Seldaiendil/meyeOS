qx.Mixin.define('eye.ui.core.MView', {

	construct: function() {
		this.__viewWidgets = {};
		this.__viewCache = {};
	},


	members: {
		__viewWidgets: null,
		__viewCache: null,

		/**
		 * @lint ignoreReferenceField(__metaProperties)
		 */
		__metaProperties: [ 'clazz', 'widget', 'id', 'items', 'userData', 'flex' ],
		META_KEY: '@',


		/*
		 * ----------------------------
		 * JSON RENDERING BEHAVIOUR
		 * ----------------------------
		 */

		renderJson: function(config) {
			var id = config[this.META_KEY + 'id'];
			var items = config[this.META_KEY + 'items'];

			delete config[this.META_KEY + 'id'];
			delete config[this.META_KEY + 'items'];

			this.set(config);

			if (id) {
				this.addWidget(id, this);
			}

			for (var i = 0, len = items.length; i < len; i++) {
				this.__renderWidget(items[i], this);
			}

			return this;
		},

		__renderWidget: function(config, parent) {
			if (!((this.META_KEY + 'clazz') in config) &&
				!((this.META_KEY + 'widget') in config)) {
				throw new Error('A item has no "' + this.META_KEY + 'clazz" or "' + this.META_KEY + 'widget" key at JSON --[' + this + ']--');
			}

			var meta = {};
			var props = this.__metaProperties;
			var key;
			for (var i = 0, len = props.length; i < len; i++) {
				key = props[i];
				meta[key] = config[this.META_KEY + key];
				delete config[this.META_KEY + key];
			}

			var instance = meta.widget ? meta.widget : new meta.clazz();
			instance.set(config);

			if (meta.id) {
				this.addWidget(meta.id, instance);
			}

			if (meta.userData) {
				var keys = qx.lang.Object.getKeys(meta.userData);

				for (var i = keys.length; i--; ) {
					instance.setUserData(keys[i], meta.userData[keys[i]]);
				}
			}

			if (meta.items) {
				for (var i = 0, len = meta.items.length; i < len; i++) {
					this.__renderWidget(meta.items[i], instance);
				}
			}

			if (meta.flex) {
				instance.setLayoutProperties({ flex: meta.flex });
			}

			if (!meta.widget) {
				parent.add(instance);
			 }

			return instance;
		},

		renderMenu: function(genericConfig, items) {
			if (!items) {
				items = genericConfig;
				genericConfig = null;
			}

			var config, item, childs;
			
			var menu = new eye.ui.menu.Menu();

			for (var i = 0, len = items.length; i < len; i++) {

				config = items[i];
				if (config === '-') {

					menu.addSeparator();

				} else {

					// Item list must not be parsed by this.__renderWidget
					childs = config['@items'];
					delete config['@items'];

					// Set the class must be used to create widget
					config['@type'] = eye.ui.menu.Button;
					item = this.__renderWidget(config, menu);

					if (childs) {
						item.setMenu(this.renderMenu(genericConfig, childs));
					}

					if (genericConfig) {
						item.set(genericConfig);
					}
					
					item.set(config);
				}
			}

			return menu;
		},

		/*
		 * ----------------------------
		 * LISTENERS BEHAVIOUR
		 * ----------------------------
		 */

		/**
		 * Sets all listeners in the given mapping formated by "id event: (function|alias)"
		 *
		 * @param listeners {Map} the mapping formated by "id event: (function|alias)"
		 */
		setListeners: function(listeners) {
			var keys = qx.lang.Object.getKeys(listeners);
			var handler, events, id, widget;

			for (var i = keys.length; i--; ) {
				handler = listeners[keys[i]];
				if (typeof handler === 'string') {
					handler = listeners[handler];
				}

				events = keys[i].split(' ');
				id = events.shift();
				widget = this.getWidget(id);

				for (var j = events.length; j--; ) {
					widget.addListener(events[j], handler, widget);
				}
			}
		},


		/**
		 * Links a widget with given id to access to it trought listeners map
		 *
		 * @param id {String} The id used by the widget, can use hierarchy with '/' character
		 * @param widget {qx.ui.core.LayoutItem} The widget will be returned with given id
		 */
		addWidget: function(id, widget) {
			if (this.__viewCache[id]) {
				throw new Error('Duplicated widget ID at --[' + id + ']-- --[' + this.toString() + ']--');
			}

			var path = id.split('/');
			var current = this.__viewWidgets;
			var key;

			for (var i = 0, len = path.length; i < len; i++) {
				key = path[i];
				if (current[key]) {
					current = current[key];
				} else {
					current[key] = {};
					current = current[key];
				}
			}

			this.__viewCache[id] = current['_element'] = widget;
		},


		/**
		 * Returns a widget setted before with addWidget. To access a child control of the
		 *  widget is possible to add a '/' character and the child control name to the given id
		 *
		 * @param id {String} The id of the widget. Can have child control ids too.
		 * @return {qx.ui.core.LayoutItem} The widget or child control linked to the id
		 * @throws if there is no item or child control linked to the id
		 */
		getWidget: function(id) {
			if (this.__viewCache[id]) {
				return this.__viewCache[id];
			}
			
			var path = id.split('/');
			var current = this.__viewWidgets;
			var key;

			for (var i = 0, len = path.length; i < len; i++) {
				key = path[i];
				if (current[key]) {
					current = current[key];
				} else if (current["_element"].hasChildControl(key)) {
					return this.__getWidgetFromChildControls(id, path.slice(i), current["_element"]);
				} else {
					throw new Error('Id --[' + id + ']-- not found on --[' + this + ']--');
				}
			}

			return this.__viewCache[id] = current['_element'];
		},


		__getWidgetFromChildControls: function(id, path, widget) {
			var current = widget;

			for (var i = 0, len = path.length; i < len; i++) {
				current = current.getChildControl(path[i]);
			}

			return this.__viewCache[id] = current;
		}
	}
});
