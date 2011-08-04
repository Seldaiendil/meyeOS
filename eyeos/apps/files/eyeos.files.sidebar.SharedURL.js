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

qx.Class.define('eyeos.files.sidebar.SharedURL', {
	extend: qx.ui.core.Widget,


	events: {
		itemInfo: "qx.event.type.Data",
		itemDelete: "qx.event.type.Data"
	},


	construct: function() {
		this.base(arguments);

		this._buildLayout();
	},


	properties: {
		appearance: {
			refine: true,
			init: 'file-sidebar-share'
		},

		selectedFile: {
			check: 'String',
			nullable: true,
			init: null
		}
	},


	members: {
		_checknum: null,


		loadData: function(checknum, file) {
			this._checknum = checknum;
			var container = this.getChildControl('container');
			var fileName = file.getAbsolutePath();

			container.removeAll();
			this.getChildControl('add').show();
			this.setSelectedFile(fileName);

			eyeos.callMessage(this._checknum, '__UrlShare_getShareURLSByFilePath', fileName, function (results){
				if (results == null)
					return;
				
				for (var i = 0; i < results.length; i++) {
					this._createItem(
						results[i].id,
						i + 1,
						tr('Shared') + ': ' + this._parseDate(results[i].publicationDate)
					);
				}
			}, this);
		},

		clear: function() {
			this.setSelectedFile(null);
			this.getChildControl('add').exclude();
			this.getChildControl('container').removeAll();
		},



		_parseDate: function(timestamp) {
			var date = new Date(timestamp * 1000);

			var day = date.getDate();
			if(day < 10)
				day = '0' + day;

			var month = date.getMonth() + 1;
			if(month < 10)
				month = '0' + month;

			return day + '.' + month + '.' + date.getFullYear();
		},

		_buildLayout: function() {
			this._setLayout(new qx.ui.layout.VBox);

			this._add(this._createChildControl('header'));
			this._add(this._createChildControl('separator'));
			this._add(this._createChildControl('container'));
		},

		_createItem: function(id, num, name) {
			var item = new eyeos.files.sidebar.SharedItem(id, num, name);

			item.addListener('infoClick', this._onInfoExecute, this);
			item.addListener('delClick', this._onDelExecute, this);

			this.getChildControl('container').add(item);
		},


		_onAddExecute: function(e) {
			eyeos.execute('urlshare', this._checknum, [ this.getSelectedFile(), true]);
		},

		_onInfoExecute: function(e) {
			var item = e.getData();
			eyeos.execute('urlshare', this._checknum, [ item.getId(), false ]);
		},

		_onDelExecute: function(e) {
			var item = e.getData();
			var optionPane = new eyeos.dialogs.OptionPane(
				'<b>' + tr('Are you sure you want to delete this url?') + '</b>',
				eyeos.dialogs.OptionPane.WARNING_MESSAGE,
				eyeos.dialogs.OptionPane.YES_NO_OPTION);

			var dialog = optionPane.createDialog(this, tr('Warning!'), function(result) {
				if (result === 0){						
					eyeos.callMessage(this._checknum, '__UrlShare_deleteURL', item.getId(), function (results) {
						item.destroy();
					}, this);
				}
			}, this);
			dialog.setHeight(150);
			dialog.show();
			dialog.center();
		},

		
		_createChildControlImpl: function(id) {
			var control;

			switch (id) {
				case 'header':
					control = new qx.ui.container.Composite(new qx.ui.layout.HBox);
					control.add(this._createChildControl('title'));
					control.add(new qx.ui.core.Spacer, { flex: 1 });
					control.add(this._createChildControl('add'));
					break;

				case 'title':
					control = new qx.ui.basic.Label(tr("Active URLs"));
					break;
				
				case 'add':
					control = new qx.ui.form.Button('+' + tr("Add new"));
					control.addListener('execute', this._onAddExecute, this);
					break;
				
				case 'separator':
					control = new qx.ui.core.Widget;
					break;
				
				case 'container':
					control = new qx.ui.container.Composite(new qx.ui.layout.VBox);
					break;
			}

			return control || this.base(arguments);
		}
	}
});
