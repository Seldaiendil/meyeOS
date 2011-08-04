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

qx.Class.define('eyeos.files.sidebar.FileInfo', {
	extend: qx.ui.core.Widget,


	construct: function() {
		this.base(arguments);

		this._buildLayout();
		this.clear();
	},


	properties: {
		appearance: {
			refine: true,
			init: 'files-sidebar-fileinfo'
		}
	},


	members: {
		loadData: function(checknum, selected) {
			var info = new eyeos.io.file.FileInfo(checknum, selected);

			this.getChildControl('title').setValue(info.getName());
			this.getChildControl('type').setValue(info.getMetadata('type'));

			this.getChildControl('image').setSource(info.getImage());

			this.getChildControl('size-value').setValue(info.getMetadata('size') ||  "");
			this.getChildControl('created-value').setValue(info.getMetadata('created') ||  "");
			this.getChildControl('modified-value').setValue(info.getMetadata('modified') ||  "");
		},


		clear: function() {
			this.getChildControl('title').setValue(tr("No file selected"));
			this.getChildControl('type').setValue("");

			this.getChildControl('image').setSource('index.php?extern=images/placeholder.png');

			this.getChildControl('size-value').setValue("");
			this.getChildControl('created-value').setValue("");
			this.getChildControl('modified-value').setValue("");
		},


		_buildLayout: function() {
			this._setLayout(new qx.ui.layout.VBox);

			this._add(this._createChildControl('title'));
			this._add(this._createChildControl('separator'));
			this._add(this._createChildControl('type'));
			this._add(this._createChildControl('image-container'));
		},


		_createChildControlImpl: function(id) {
			var control;

			switch(id) {
				case 'title':
				case 'type':
				case 'size-value':
				case 'modified-value':
				case 'created-value':
					control = new qx.ui.basic.Label;
					break;

				case 'separator':
					control = new qx.ui.core.Widget;
					break;
				
				case 'image':
					control = new qx.ui.basic.Image;
					break;

				case 'size-label':
					control = new qx.ui.basic.Label(tr('Size') + ':');
					break;

				case 'modified-label':
					control = new qx.ui.basic.Label(tr('Modified') + ':');
					break;

				case 'created-label':
					control = new qx.ui.basic.Label(tr('Created') + ':');
					break;

				case 'image-container':
					control = new qx.ui.container.Composite(new qx.ui.layout.HBox);

					control.add(this._createChildControl('center-image'));
					control.add(this._createChildControl('data-container'));
					this._add(control);
					break;
				
				case 'center-image':
					var layout = new qx.ui.layout.Grid;
					layout.setColumnFlex(0, 1);
					layout.setColumnFlex(2, 1);
					layout.setRowFlex(0, 1);
					layout.setRowFlex(2, 1);

					control = new qx.ui.container.Composite(layout);
					control.add(this._createChildControl('image'), { row: 1, column: 1 });
					control.add(new qx.ui.core.Spacer, { row: 2, column: 2 });
					break;
				
				case 'data-container':
					control = new qx.ui.container.Composite(new qx.ui.layout.VBox);
					control.add(this._createChildControl('size-label'));
					control.add(this._createChildControl('size-value'));
					control.add(this._createChildControl('modified-label'));
					control.add(this._createChildControl('modified-value'));
					control.add(this._createChildControl('created-label'));
					control.add(this._createChildControl('created-value'));
					break;
			}

			return control || this.base(arguments);
		}
	}
});
