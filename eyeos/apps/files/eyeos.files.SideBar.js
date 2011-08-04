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

qx.Class.define('eyeos.files.Sidebar', {
	extend: qx.ui.container.Composite,


	events: {
		navigate: "qx.event.type.Data",
		dropdata: "qx.event.type.Data"
	},


	construct: function(checknum) {
		arguments.callee.base.call(this, new qx.ui.layout.VBox);

		this._checknum = checknum;

		this._createChildControl('places');
		this._createChildControl('groups');
		this._createChildControl('fileinfo');
		this._createChildControl('shared');
	},


	properties: {
		appearance: {
			refine: true,
			init: "files-sidebar"
		}
	},


	members: {
		update: function(type, data) {
			var fileInfo = this.getChildControl('fileinfo');
			var shared = this.getChildControl('shared');

			if (type === 'selectedFile') {
				var selected = data.selected;

				if (selected.length === 1 && selected[0].getType() !== 'folder') {
					shared.loadData(data.checknum, selected[0]);
				} else {
					shared.clear();
				}

				fileInfo.loadData(data.checknum, selected);
			} else if (type === 'directoryChanged') {
				fileInfo.clear();
				shared.clear();
			}
		},

		_fillWorkgroups: function(groups) {
			var id = eyeos.getCurrentUserData()['id'];
			eyeos.callMessage(this._checknum, '__Workgroups_getAllWorkgroupsByUser', [ id ], function (results) {
				var workgroupName;
				for(var i = 0, len = results.length; i < len; i++){
					workgroupName = results[i]['workgroup']['name'];
					groups.add(
						workgroupName,
						'index.php?extern=images/16x16/places/folder.png',
						'workgroup://~' + workgroupName + '/'
					);
				}
			}, this);
		},

		/*
		 * Build methods
		 */
		_buildPlaces: function() {
			var placesContainer = new eyeos.ui.container.DropDown('PLACES', new qx.ui.layout.Dock);
			var places = new eyeos.files.sidebar.List;
			var list = eyeos.files.sidebar.List.PLACES;
			if (eyeos.checkObjectPermission('desktop', 'update')) {				
				list.splice(1, 0, eyeos.files.sidebar.List.PLACES_DESKTOP);
			}
			places.addJson(list);
			
			places.addListener('itemClick', this._onPathClick, this);
			places.addListener('dropdata', this._onPathDropdata, this);
			placesContainer.add(places);
			placesContainer.open();
			
			this.add(placesContainer);
			return places;
		},

		_buildGroups: function() {
			var groupsContainer = new eyeos.ui.container.DropDown('GROUPS', new qx.ui.layout.Dock);
			var groups = new eyeos.files.sidebar.List;
			
			this._fillWorkgroups(groups);
			groups.addListener('itemClick', this._onPathClick, this);
			groups.addListener('dropdata', this._onPathDropdata, this);
			groupsContainer.add(groups);
	
			this.add(groupsContainer);
			return groups;
		},

		_buildFileInfo: function() {
			var fileInfoContainer = new eyeos.ui.container.DropDown('FILE INFO', new qx.ui.layout.Dock);
			var fileInfo = new eyeos.files.sidebar.FileInfo;
			fileInfoContainer.add(fileInfo);
			this.add(fileInfoContainer);
			return fileInfo;
		},

		_buildShared: function() {
			var sharedContainer = new eyeos.ui.container.DropDown('SHARED VIA URL', new qx.ui.layout.Dock);
			var shared = new eyeos.files.sidebar.SharedURL;
			sharedContainer.add(shared);
			this.add(sharedContainer);
			return shared;
		},


		/*
		 * Event methods
		 */
		_onPathClick: function(e) {
			this.fireDataEvent('navigate', e.getData());
		},

		_onPathDropdata: function(e) {
			this.fireDataEvent('dropdata', e.getData());
		},


		/* 
		 * Child control mehtod
		 */
		_createChildControlImpl: function(id) {
			var control;

			switch(id) {
				case 'places':
					control = this._buildPlaces();
					break;
				
				case 'groups':
					control = this._buildGroups();
					break;
				
				case 'fileinfo':
					control = this._buildFileInfo();
					break;
				
				case 'shared':
					control = this._buildShared();
					break;
			}

			return control || this.base(arguments);
		}
	}
});
