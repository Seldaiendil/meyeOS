qx.Mixin.define('eye.ui.core.MView', {

	construct: function() {
		this.__listeners = {};
		this.__listCounts = {};
		this.__viewWidgets = {};
		this.__viewCache = {};
	},


	members: {
		__listeners: null,
		__listCounts: null,
		__viewWidgets: null,
		__viewCache: null,


		/*
		 * ----------------------------
		 *	JSON RENDERING BEHAVIOUR
		 * ----------------------------
		 */

		renderJson: function(config) {
			if (!('clazz' in config) && !('widget' in config)) {
				throw new Error('A item has no "clazz" or "widget" key at JSON --[' + this + ']--');
			}

			var instance = config.widget ? config.widget : new config.clazz();

			if (config.flex) {
				instance.setLayoutProperties({ flex: config.flex });
			}

			if (config.id) {
				this.addWidget(config.id, instance);
			}

			if (config.set) {
				instance.set(config.set);
			}

			if (config.userData) {
				var keys = qx.lang.Object.getKeys(config.userData);

				for (var i = keys.length; i--; ) {
					instance.setUserData(keys[i], config.userData[keys[i]]);
				}
			}

			if (config.items) {
				for (var i = 0, len = config.items.length; i < len; i++) {
					instance.add(this.renderJson(config.items[i]));
				}
			}

			var listeners = this.__listeners[config.id];
			if (listeners) {
				for (var i = 0, len = listeners.length; i < len; i++) {
					instance.addListener(listeners[i].event, listeners[i].handler, this);
				}
			}

			return instance;
		},


		renderListItem: function(config, itemNum) {
			var id = config.id;

			if (typeof itemNum === 'undefined') {
				var list = this.__listCounts;
				if (!list[id]) {
					list[id] = 0;
				} else {
					list[id]++;
				}
				itemNum = list[id];
			}

			if (id.indexOf('#') !== -1) {
				config.id = id.replace(/#/, itemNum);
			} else {
				config.id = id + '/' + itemNum;
			}

			var items = config.items;
			delete config.items;

			var instance = this.renderJson(config);
			
			if (items) {
				for (var i = 0, len = items.length; i < len; i++) {
					instance.add(this.renderListItem(items[i], itemNum));
				}
			}

			var listeners = this.__listeners[id];
			if (listeners) {
				for (var i = 0, len = listeners.length; i < len; i++) {
					instance.addListener(listeners[i].event, listeners[i].handler, this);
				}
			}
		},


		/*
		 * ----------------------------
		 *	LISTENERS BEHAVIOUR
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

				if (!this.__listeners[id]) {
					this.__listeners[id] = [];
				}

				for (var j = events.length; j--; ) {
					widget.addListener(events[j], handler, this);
					this.__listeners[id].push({
						event: events[j],
						handler: handler
					});
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
