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

/**
 * Standard window structure
 * 
 * @state active Whether the window is activated
 * @state maximized Whether the window is maximized
 *
 * @childControl statusbar {qx.ui.container.Composite} statusbar container which shows the statusbar text
 * @childControl statusbar-text {qx.ui.basic.Label} text of the statusbar
 * @childControl menubar {qx.ui.menubar.MenuBar} container of all application menus
 * @childControl toolbar {qx.ui.toolbar.ToolBar} toolbar to contain all application buttons
 * @childControl sidebar {qx.ui.container.Composite} top left panel to show lists or trees
 * @childControl topbar {qx.ui.container.Composite} top bar used to contain breadcrumb and searchfield
 * @childControl breadcrumb {qx.ui.toolbar.ToolBar} the current path breadcrumb container
 * @childControl searchfield {qx.ui.form.TextField} field to search on content
 * @childControl preferences-button {qx.ui.menubar.Button} preferences button to be at the start of menubar
 * @childControl pane {qx.ui.container.Composite} window pane which holds the content
 * @childControl captionbar {qx.ui.container.Composite} Container for all widgets inside the captionbar
 * @childControl icon {qx.ui.basic.Image} icon at the left of the captionbar
 * @childControl title {qx.ui.basic.Label} caption of the window
 * @childControl minimize-button {qx.ui.form.Button} button to minimize the window
 * @childControl restore-button {qx.ui.form.Button} button to restore the window
 * @childControl maximize-button {qx.ui.form.Button} button to maximize the window
 * @childControl close-button {qx.ui.form.Button} button to close the window
 */
qx.Class.define("eyeos.ui.window.Standard", {
	extend: eyeos.ui.Window,

	/**
	 * @param application {eyeos.system.EyeApplication}
	 * @param caption {String}
	 * @param icon {String}
	 * @param fakeMinimize {Boolean ? false}
	 * @param fakeClose {Boolean ? false}
	 */
	construct: function(application, caption, icon, fakeMinimize, fakeClose) {
		// inherit sentence
		arguments.callee.base.call(this, application, caption, icon, fakeMinimize, fakeClose);

		// configure layout
		this.setLayout(new qx.ui.layout.VBox);
		
		// create menu and toolbar and insert them
		this._createChildControl("menubar");
		this._createChildControl("toolbar");
		
		// create the topbar and join it with the content pane
		var topbarContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox);
		topbarContainer.add(this._createChildControl("topbar-container"));
		topbarContainer.add(this.getChildControl("pane"), { flex: 1 });

		// create sidebar and add to it the topbar container
		var sidebarContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox);
		sidebarContainer.add(this._createChildControl("sidebar"));
		sidebarContainer.add(topbarContainer, { flex: 1 });
		
		// add to layout sidebar, topbar and content pane
		this._add(sidebarContainer, { flex: 1 });

		this._add(this.getChildControl('statusbar'));
		this.setShowStatusbar(true);
	},
	
	/*
	*****************************************************************************
		PROPERTIES
	*****************************************************************************
	*/
	properties: {
		appearance: {
			refine: true,
			init: "standard-window"
		},

		/*
		---------------------------------------------------------------------------
			HIDE FEATURES
		---------------------------------------------------------------------------
		*/
		/** Should the menubar be shown */
		showMenubar: {
			check: "Boolean",
			apply: "_applyShow",
			init: true,
			themeable: true,
			event : "changeShowMenubar"
		},
		/** Should the preferences button be shown */
		showPreferencesButton: {
			check: "Boolean",
			apply: "_applyPreferencesButton",
			init: true,
			themeable: true,
			event : "changeShowPreferencesButton"
		},
		/** Should the toolbar be shown */
		showToolbar: {
			check: "Boolean",
			apply: "_applyShow",
			init: true,
			themeable: true,
			event : "changeShowToolbar"
		},
		/** Should the sidebar be shown */
		showSidebar: {
			check: "Boolean",
			apply: "_applyShow",
			init: true,
			themeable: true,
			event : "changeShowSidebar"
		},
		/** Should the topbar be shown */
		showTopbar: {
			check: "Boolean",
			apply: "_applyShow",
			init: true,
			themeable: true,
			event : "changeShowTopbar"
		},
		/** Should the topbar breadcrumb be shown */
		showBreadcrumb: {
			check: "Boolean",
			apply: "_applyShow",
			init: true,
			themeable: true,
			event : "changeShowBreadcrumb"
		},
		/** Should the topbar searchfield be shown */
		showSearchField: {
			check: "Boolean",
			apply: "_applyShow",
			init: true,
			themeable: true,
			event : "changeShowSearchField"
		},
	},
	
	/*
	*****************************************************************************
		MEMBERS
	*****************************************************************************
	*/
	members: {
		/*
		---------------------------------------------------------------------------
			PROPERTY APPLY ROUTINES
		---------------------------------------------------------------------------
		*/
		
		/** {Map} The relation between the show properties and child controls */
		__propertyToChild: {
			'showMenubar': 'menubar',
			'showToolbar': 'toolbar',
			'showSidebar': 'sidebar',
			'showTopbar': 'topbar-container',
			'showBreadcrumb': 'breadcrumb',
			'showSearchField': 'searchfield'
		},
		
		// property apply
		_applyPreferencesButton: function(show, oldValue) {
			if (show === oldValue)
				return;
			var method = show ? 'show' : 'exclude';
			this.getChildControl("preferences-button")[method]();
			this.getChildControl("preferences-separator")[method]();
		},
		
		// property apply
		_applyShow: function(show, oldValue, propertyName) {
			if (show === oldValue)
				return;
			var childID = this.__propertyToChild[propertyName];
			this.getChildControl(childID)[show ? 'show' : 'exclude']();
		},
		
		// overridden
		_createChildControlImpl: function(id, hash)
		{
			var control;

			switch(id) {
				case "menubar":
					control = new qx.ui.menubar.MenuBar;
					control.add(this.getChildControl("preferences-button"));
					control.add(this.getChildControl("preferences-separator"));
					this._add(control);
					break;
				
				case "preferences-button":
					control = new qx.ui.menubar.Button(tr("Preferences"), null);
					break;
				
				case "preferences-separator":
					control = new qx.ui.toolbar.Separator;
					break;
				
				case "toolbar":
					control = new qx.ui.toolbar.ToolBar;
					this._add(control);
					break;
				
				case "sidebar":
					control = new qx.ui.container.Scroll;
					break;
				
				case "topbar-container":
					control = new qx.ui.container.Composite(new qx.ui.layout.HBox);
					control.add(this.getChildControl("topbar"), { flex: 1 });
					control.add(this.getChildControl("searchfield"));
					break;
				
				case "topbar":
					control = new qx.ui.container.Composite(new qx.ui.layout.HBox);
					break;
				
				case "breadcrumb":
					control = new qx.ui.toolbar.ToolBar;
					break;
				
				case "searchfield":
					control = new eyeos.ui.form.SearchField().set({
						placeholder: tr("Type here to search..."),
						width: 190
					});
					break;
			}

			return control || this.base(arguments, id);
		},
	}
});
