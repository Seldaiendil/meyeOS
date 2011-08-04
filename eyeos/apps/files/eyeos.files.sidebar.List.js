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

qx.Class.define('eyeos.files.sidebar.List', {
	extend: qx.ui.container.Composite,

	construct: function() {
		arguments.callee.base.call(this, new qx.ui.layout.VBox);

		this.__cache = {};
	},


	events: {
		itemClick: "qx.event.type.Data",
		dropdata: "qx.event.type.Data"
	},


	members: {
		__cache: null,

		_createItem: function(text, icon, path) {
			if (this.__cache[path])
				return;

			this.__cache[path] = true;
			var item = new qx.ui.form.Button(text, icon);
			item.setUserData('path', path);
			item.setAppearance('files-sidebar-item');
			
			item.addListener('click', this._onItemClick, this);
			item.addListener('dragover', this._onItemDragover, this);
			item.addListener('dragleave', this._onItemDragleave, this);
			item.addListener('drop', this._onItemDrop, this);

			return item;
		},

		_onItemClick: function(e) {
			var item = e.getTarget();
			this.fireDataEvent('itemClick', item.getUserData('path'));
		},
		_onItemDragover: function(e) {
			var item = e.getTarget();
			item.addState('dragover');
		},
		_onItemDragleave: function(e) {
			var item = e.getTarget();
			item.removeState('dragover');
		},
		_onItemDrop: function(e) {
			var item = e.getTarget();
			this.fireDataEvent('dropdata', item.getUserData('path'));
		},

		add: function(text, icon, path) {
			var item = this._createItem(text, icon, path);
			if (item)
				arguments.callee.base.call(this, item);
		},
		addAt: function(text, icon, path, index) {
			var item = this._createItem(text, icon, path);
			if (item)
				arguments.callee.base.call(this, item, index);
		},

		addJson: function(data) {
			var item;
			for (var i = 0; i < data.length; i++) {
				item = data[i];
				this.add(item.label, item.icon, item.path);
			}
		}
	},
	

	statics: {
		PLACES: [{
			label: 'Home',
			icon: 'index.php?extern=images/16x16/places/user-home.png',
			path: 'home://~' + eyeos.getCurrentUserName() + '/'
		}, {
			label: 'Documents',
			icon: 'index.php?extern=images/16x16/places/folder-txt.png',
			path: 'home://~' + eyeos.getCurrentUserName() + '/Documents'
		}, {
			label: 'Images',
			icon: 'index.php?extern=images/16x16/places/folder-image.png',
			path: 'home://~' + eyeos.getCurrentUserName() + '/Images'
		}, {
			label: 'Music',
			icon: 'index.php?extern=images/16x16/places/folder-sound.png',
			path: 'home://~' + eyeos.getCurrentUserName() + '/Music'
		}],
		PLACES_DESKTOP: {
			label: 'Desktop',
			icon: 'index.php?extern=images/16x16/places/user-desktop.png',
			path: 'home://~' + eyeos.getCurrentUserName() + '/Desktop'
		}
	}
});
