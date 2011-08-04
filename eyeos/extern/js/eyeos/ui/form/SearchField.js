/*
*                 eyeos - The Open Source Cloud's Web Desktop
*                               Version 2.0
*                   Copyright (C) 2007 - 2010 eyeos Team 
* 
* This program is free software; you can redistribute it and/or modify it under
* the terms of the GNU Affero General Public License version 3 as published by the
* Free Software Foundation.
* 
* This program is distributed in the hope that it will be useful, but WITHOUT
* ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
* FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
* details.
* 
* You should have received a copy of the GNU Affero General Public License
* version 3 along with this program in the file "LICENSE".  If not, see 
* <http://www.gnu.org/licenses/agpl-3.0.txt>.
* 
* See www.eyeos.org for more details. All requests should be sent to licensing@eyeos.org
* 
* The interactive user interfaces in modified source and object code versions
* of this program must display Appropriate Legal Notices, as required under
* Section 5 of the GNU Affero General Public License version 3.
* 
* In accordance with Section 7(b) of the GNU Affero General Public License version 3,
* these Appropriate Legal Notices must retain the display of the "Powered by
* eyeos" logo and retain the original copyright notice. If the display of the 
* logo is not reasonably feasible for technical reasons, the Appropriate Legal Notices
* must display the words "Powered by eyeos" and retain the original copyright notice. 
*/

/* ************************************************************************
/**
 * This is a basic form field with common functionality for
 * {@link TextArea} and {@link TextField}.
 *
 * On every keystroke the value is synchronized with the
 * value of the textfield. Value changes can be monitored by listening to the
 * {@link #input} or {@link #changeValue} events, respectively.
 */
qx.Class.define("eyeos.ui.form.SearchField",
{
	extend : qx.ui.core.Widget,


	/**
	 * @param value {String} initial text value of the input field ({@link #setValue}).
	 */
	construct : function(value, icon)
	{
		arguments.callee.base.call(this, value);
		
		this._timer = new qx.event.Timer(0);
		this._timer.addListener('interval', this.__handleDelayedEvent, this);

		this._setLayout(new qx.ui.layout.HBox);

		// Create childs if they doesn't exist
 		this.getChildControl('input');
		this.getChildControl('button');
	},


	events :
	{
		/**
		 * The event is fired when the user press enter key inside the field
		 *
		 * The method {@link qx.event.type.Data#getData} returns the
		 * current text value of the field.
		 */
		'execute': "qx.event.type.Data",


		/**
		 * The event is fired on every keystroke modifying the value of the field.
		 *
		 * The method {@link qx.event.type.Data#getData} returns the
		 * current value of the text field.
		 */
		'change': "qx.event.type.Data",


		/**
		 * The event is fired after the amount of milliseconds setted in the property timeout.
		 * If the event is fired again before timeout is over the timeout will be restarted.
		 *
		 * The method {@link qx.event.type.Data#getData} returns the
		 * current value of the text field.
		 */
		'delayedChange': "qx.event.type.Data"
	},


	properties :
	{
		appearance: {
			refine: true,
			init: "searchfield"
		},
		value: {
			check: "String",
			apply: "_applyValue",
			nullable: true,
			event: "changeValue"
		},
		placeholder: {
			check: "String",
			apply: "_applyPlaceholder",
			nullable: true,
			event: "changePlaceholder"
		},
		icon: {
			check: "String",
			apply: "_applyIcon",
			nullable: true,
			themeable: true,
			event: "changeIcon"
		},
		showButton: {
			check: "Boolean",
			themeable: true,
			init: true
		},
		timeout: {
			check: "Number",
			apply: "_applyTimeout",
			nullable: false,
			init: 0
		}
	},


	members :
	{
		_timer: null,


		_updateClearButton: function() {
			// If button can be showed and input is empty
			if (this.getShowButton() && !!this.getChildControl('input').getValue()) {
				this.getChildControl('button').show();
			} else {
				this.getChildControl('button').exclude();
			}
		},
		
		_clearField: function() {
			this.getChildControl('input').setValue("")
			this._updateClearButton();
			this._fireExecuteEvent();
		},


		_fireExecuteEvent: function() {
			var value = this.getChildControl('input').getValue();
			this.fireDataEvent('change', value);
			this.fireDataEvent('execute', value);
			this.__scheduleDelayedEvent();
		},

		__inputKeydown: function(e) {
			if (e.getKeyIdentifier() === 'Enter')
				this._fireExecuteEvent();
		},

		__inputChange: function(e) {
			this._updateClearButton();
			this.fireDataEvent('change', e.getData(), e.getOldData());
			this.__scheduleDelayedEvent();
		},

		__scheduleDelayedEvent: function() {
			if (this.getTimeout() === 0)
				return;
			
			this._timer.restart();
		},

		__handleDelayedEvent: function(e) {
			this._timer.stop();

			this.fireDataEvent('delayedChange', this.getChildControl('input').getValue());
		},
	
		// properties
		_applyValue: function(value) {
			this.getChildControl('input').setValue(value);
		},
		_applyPlaceholder: function(value) {
			this.getChildControl('input').setPlaceholder(value);
		},
		_applyIcon: function(value) {
			this.getChildControl('button').setIcon(value);
		},
		_applyTimeout: function(value) {
			this._timer.setInterval(value);
		},
	
		// overridden
		_createChildControlImpl: function(id, hash)
		{
			var control;

			switch(id) {
				case "input":
					control = new qx.ui.form.TextField;
					control.addListener('keydown', this.__inputKeydown, this);
					control.addListener('input', this.__inputChange, this);
					this._add(control, { flex: 1 });
					break;
					
				case "button":
					control = new qx.ui.toolbar.Button;
					control.addListener('execute', this._clearField, this);
					control.exclude();
					this._add(control);
					break;
			}

			return control || this.base(arguments, id);
		}
	}
});

