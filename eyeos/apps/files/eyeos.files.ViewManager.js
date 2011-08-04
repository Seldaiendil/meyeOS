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

qx.Class.define('eyeos.files.ViewManager', {

	extend: eyeos.ui.window.Standard,

	construct: function (controller, model, application, caption, icon, fakeMinimize, fakeClose, checknum) {
		arguments.callee.base.call(this, application, caption, icon, fakeMinimize, fakeClose, checknum);
		this.setController(controller);
		this.setModel(model);
		this.setKeyPress(false);
		this._checknum=checknum;

		window.files = this;
		
		this.setShowPreferencesButton(false);

		this._buildSideBar();
		this._buildMenuBar();
		this._buildToolBar();
		this._buildBreadcrumb();
		this._buildContent();
		this._addListeners();

		this.set({
			width: 800,
			height: 450
		});
		this.open();
		this.setShowStatusbar(true);
	},

	properties: {
		controller: {
			check: 'Object'
		},

		model: {
			check: 'Object'
		},

		keyPress: {
			check: 'Boolean'
		}
	},

	members: {
		_checknum: null,
		_content: null,
		_mainView: null,
		_searchBox: null,
		_sideBar: null,
		_top: null,
		_sideBarElements: null,

		close: function () {
			var dBusListeners = this.getController()._dBusListeners
			var dBus = eyeos.messageBus.getInstance();
			for (var i = 0; i < dBusListeners.length; ++i) {
				dBus.removeListenerById(dBusListeners[i]);
			}
			this.base(arguments);
		},

		_buildMenuBar: function () {
			this.__buildDynamicBar(this.getChildControl('menubar'), this.self(arguments).MENUBAR_CONFIG);
		},
		_buildToolBar: function () {
			this.__buildDynamicBar(this.getChildControl('toolbar'), this.self(arguments).TOOLBAR_CONFIG);
		},
		__buildDynamicBar: function (container, configuration) {
			// Handlers for events
			function fileSelectedMenuUpdate_handler(e){
				// this will be a eyeos.ui.menu.Button
				if(e.getData().selected[0].getType() === 'folder'){
					if(this.getUserData('worksOnFolder')){
						this.setEnabled(true);
					}
				}else{
					this.setEnabled(true);
				}
			}
			function directoryChangedMenuUpdate_handler(){
				// this will be a eyeos.ui.menu.Button
				this.setEnabled(false);
			}
			function appear_handler(e) {
				// this will be a eyeos.ui.menu.Button
				//this.setBackgroundColor(null);
				//this.setDecorator(null);
				//this.setTextColor('#4A4A4A');
			}
			function mouseover_handler(e) {
				//this.setBackgroundColor('#D3D3D3');
			}
			function mouseout_handler(e) {
				/*if (!qx.ui.core.Widget.contains(menuItem, e.getRelatedTarget())) {
					this.setDecorator(null);
				}
				this.setBackgroundColor(null);*/
			}

			var controller = this.getController();			
			function execute_handler(e) {
				var method = this.getUserData('controller_method');
				if (typeof controller[method] === 'function')
					controller[method]();
			}
			
			// Bucle vars declarations
			var config, menu, item, items, itemconfig, subitem;
			
			// Class switcher
			var isMenuBar = container instanceof qx.ui.menubar.MenuBar;
			var MenuButtonClass = isMenuBar ? qx.ui.menubar.Button : qx.ui.toolbar.MenuButton;
			var ButtonClass = isMenuBar ? qx.ui.menubar.Button : qx.ui.toolbar.Button;
			
			for (var i = 0, len = configuration.length; i < len; i++) {
				config = configuration[i];

				if (!qx.lang.Type.isArray(config.items)) {
					item = new ButtonClass(tr(config.name), config.image);
				} else {
					menu = new eyeos.ui.menu.Menu;
					items = config.items;
					
					for (var j = 0, jlen = items.length; j < jlen; j++) {
						itemconfig = items[j];
						if (itemconfig === '-') {
							// If it is '-' add a separator
							subitem = new eyeos.ui.menu.Separator;
						} else {
							subitem = new eyeos.ui.menu.Button(tr(itemconfig.name), itemconfig.image);
							subitem.setUserData('worksOnFolder', itemconfig.worksOnFolder);
							subitem.setUserData('controller_method', itemconfig.action);

							//If this menu needds a file it gets enabled on file selected and disabled on change directory
							if(itemconfig.needFile){
								this.addListener('fileSelectedMenuUpdate', fileSelectedMenuUpdate_handler, subitem);
								this.addListener('directoryChangedMenuUpdate', directoryChangedMenuUpdate_handler, subitem);
							}

							subitem.addListener('appear', appear_handler);
							subitem.addListener('mouseover', mouseover_handler);
							subitem.addListener('mouseout', mouseout_handler);
							subitem.addListener('execute', execute_handler);
						}
						menu.add(subitem);
					}
					item = new MenuButtonClass(tr(config.name), config.image, menu);
				}
				if (isMenuBar)
					item.setShow('label');
				else
					item.setShow('icon');
				item.setUserData('controller_method', config.action);
				item.addListener('execute', execute_handler);
				container.add(item);
			}
		},

		updateSideBar: function(event, data){
			this._sideBar.update(event, data);
		},
		
		_buildSideBar: function() {
			var sidebarContainer = this.getChildControl('sidebar');
			this._sideBar = new eyeos.files.Sidebar(this._checknum);
			this._sideBar.addListener('navigate', this.__onNavigate, this);
			this._sideBar.addListener('dropdata', this.__onDropdata, this);
			sidebarContainer.add(this._sideBar);
		},

		_buildContent: function () {
			//if (this.getModel().getDefaultView() == 'iconview') {
				this._view = new eyeos.files.IconView(this);
			//} else {
				//this._view = new eyeos.files.IconView(this._checknum);
			//}
			this.add(this._view, {flex: 1});

			//this._createEyeSyncBottomBar();
		},

		_buildBreadcrumb: function() {
			var that = this;
			var breadcrumb = new eyeos.ui.widgets.Breadcrumb().set({
				useEyeosProtocols: true,
				allowDragDrop: true,
				disableLast: true
			});

			breadcrumb.addListener('navigate', this.__onNavigate, this);
			breadcrumb.addListener('dropdata', this.__onDropdata, this);

			this.getChildControl('topbar').add(breadcrumb, { flex: 1 });
			this._header = breadcrumb;
		},

		__onNavigate: function(e) {
			var controller = this.getController();
			controller.getModel().setCurrentPath(['path', e.getData()]);
			controller._browse(true);
		},
		__onDropdata: function(e) {
			this.getController().specialMove(e.getData());
		},
		
		_createEyeSyncBottomBar: function () {
			
			this._eyeSyncBottomBar = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
				backgroundColor: 'grey',
				paddingTop: 4,
				paddingBottom: 4,
				paddingLeft: 3
			});

			var leftContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox());

			var lblLastSync = new qx.ui.basic.Label('Last Sync 01.01.1970 at 12.00').set({
				textColor: 'white'
			});
			var lblUsing = new qx.ui.basic.Label('Using 41 Kb of 110 Kb (69 Kb left)').set({
				textColor: 'white'
			});

			leftContainer.add(lblLastSync);
			leftContainer.add(lblUsing);

			var imgDownload = new qx.ui.basic.Image('index.php?extern=images/22x22/places/folder-downloads.png').set({
				paddingTop: 3
			});
			var lblDownload = new qx.ui.basic.Label('Download eyeSync?').set({
				textColor: 'white',
				marginLeft: 4,
				paddingTop: 6
			});

			var rightContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
				paddingRight: 4
			});

			rightContainer.add(imgDownload);
			rightContainer.add(lblDownload);

			var statusbar = this.getChildControl('statusbar');
			statusbar.add(leftContainer);
			statusbar.add(new qx.ui.core.Spacer(),{flex:1});
			statusbar.add(rightContainer);

			//this.setShowStatusbar(false);
		},

		showEyeSyncBottomBar: function (visible) {
			//this.setShowStatusbar(visible);
		},
		
		_addListeners: function () {
			this.addListener('keypress', function(e) {
				if (e.isCtrlPressed()) {
					if(e.getKeyIdentifier() == 'C') {
						this.getController().copyFile();
					} else if(e.getKeyIdentifier() == 'V') {
						this.getController().pasteFile();
					}
				}
			}, this);

			eyeos.messageBus.getInstance().addListener('eyeos_upload_uploadFinished', function(e) {
				if (e.getData() != null && e.getData() != undefined) {
					this.getController()._browsePath(this.getModel().getCurrentPath()[1], true);
				}
			}, this);

			//SearchBox listener
			this.getChildControl('searchfield').addListener('execute', function(e) {
				this._view.filterBrowse(e.getData());
			},this);
		},

		fileSelectedMenuUpdate: function(){

		},

		directoryChangedMenuUpdate: function(){

		},

		/**
		 * Common View functions that are linked to the member "_view" which can switch between IconView and the future ListView
		 * TODO: Some functions should be common and implemented directly here, not on every view
		 */

		reorder: function (filesToOrder) {
			return this._view.reorder(filesToOrder);
		},

		showBrowse: function () {
			this._header.update(this.getModel().getCurrentPath()[1]);
			this._view.showBrowse();
		},

		returnSelected: function () { 
			return this._view.returnSelected();
		},

		returnAll: function () { 
			return this._view.returnAll();
		},

		resetAllSelected: function () { 
			this._view.resetAllSelected();
		}
	},

	// function tr() to translate menus and toolbar isn't need here, because apply translate when items is constructing.
	statics: {
		MENUBAR_CONFIG: [{
			name: 'File',
			items: [{
				name: 'Open with eyeRun',
				//image: 'index.php?extern=images/22x22/actions/document-open.png',
				action: 'openFileWithEyeRunner',
				needFile: true,
				worksOnFolder:false
			}, {
				name: 'Open',
				//image: 'index.php?extern=images/22x22/actions/document-open.png',
				action: 'openFileNoEyeRunner',
				needFile: true,
				worksOnFolder: true
			}, {
				name: 'Rename',
				//image: 'index.php?extern=images/22x22/actions/edit-rename.png',
				action: 'editFile',
				needFile: true,
				worksOnFolder:true
			},
			'-', 
			{
				name: 'Share by URL',
				//image: 'index.php?extern=images/16x16/categories/applications-internet.png',
				action: 'shareURLFile',
				needFile: true,
				worksOnFolder:false
			},
			'-', 
			{
				name: 'New folder',
				//image: 'index.php?extern=images/22x22/places/folder.png',
				action: 'newFolder',
				needFile: false,
				worksOnFolder:true
			}]
		}, {
			name: 'Edit',
			items: [{
				name: 'Cut',
				//image: 'index.php?extern=images/22x22/actions/edit-cut.png',
				action: 'cutFile',
				needFile: true,
				worksOnFolder:true
			}, {
				name: 'Copy',
				//image: 'index.php?extern=images/22x22/actions/edit-copy.png',
				action: 'copyFile',
				needFile: true,
				worksOnFolder:true
			}, {
				name: 'Paste',
				//image: 'index.php?extern=images/22x22/actions/edit-paste.png',
				action: 'pasteFile',
				needFile: false,
				worksOnFolder:true
			}]
		}],

		TOOLBAR_CONFIG: [{
			name: 'Back',
			action: 'toolBarBack',
			image: 'index.php?extern=images/16x16/actions/back-arrow.png'
		}, {
			name: 'Forward',
			action: 'toolBarForward',
			image: 'index.php?extern=images/16x16/actions/forward-arrow.png'
		}, {
			name: 'New',
			image: 'index.php?extern=images/new-files.png',
			items: [{
				name: 'Folder',
				image: 'index.php?extern=images/eyefiles/folder.png',
				action: 'newFolder'
			}, {
				name: 'eyeDocs document',
				image: 'index.php?extern=images/eyefiles/document.png',
				action: 'newFileEdoc'
			}]
		}, {
			name: 'Upload',
			action: 'toolBarUpload',
			image: 'index.php?extern=images/16x16/actions/upload.png'
		/*
		}, {
			name: 'View',
			image: '',
			items: [{
				name: 'Icons',
				image: 'index.php?extern=images/eyefiles/view_icon.png'
			}, {
				name: 'List',
				image: 'index.php?extern=images/eyefiles/view_list.png'
			}, {
				name: 'Icon with types',
				image: 'index.php?extern=images/eyefiles/view_icon.png'
			}, {
				name: 'Hide SocialBar',
				image: 'index.php?extern=images/eyefiles/view_icon.png'
			}]
		*/
		}],

		PLACES: [
			{
				label: 'Home',
				icon: 'index.php?extern=images/16x16/places/user-home.png',
				path: 'home://~'+eyeos.getCurrentUserName()+'/'
			}, {
				label: 'Desktop',
				icon: 'index.php?extern=images/16x16/places/user-desktop.png',
				path: 'home://~'+eyeos.getCurrentUserName()+'/Desktop'
			}, {
				label: 'Documents',
				icon: 'index.php?extern=images/16x16/places/folder-txt.png',
				path: 'home://~'+eyeos.getCurrentUserName()+'/Documents'
			}, {
				label: 'Images',
				icon: 'index.php?extern=images/16x16/places/folder-image.png',
				path: 'home://~'+eyeos.getCurrentUserName()+'/Images'
			}, {
				label: 'Music',
				icon: 'index.php?extern=images/16x16/places/folder-sound.png',
				path: 'home://~'+eyeos.getCurrentUserName()+'/Music'
			}
		],

		WORKGROUPS: [
			{
				label: 'All my groups',
				icon: 'index.php?extern=images/16x16/places/folder-development.png',
				path: 'workgroup:///'
			}
		]
	}
});


