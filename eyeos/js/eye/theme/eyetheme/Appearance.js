/* ************************************************************************
    Extension of Aristo theme modified by eyeOS

    Authors:
      * A. Matias Quezada (amatiasq AT gmail DOT com)
      * Ramon Lamana (rlamana AT gmail DOT com)

/* ************************************************************************

    Copyright:
      2010 Guilherme R. Aiolfi

    License:
      LGPL: http://www.gnu.org/licenses/lgpl.html
      EPL: http://www.eclipse.org/org/documents/epl-v10.php

    Authors:
      * Guilherme R. Aiolfi (guilhermeaiolfi)

    ======================================================================

    This class contains code and resources based on the following work:

    * Aristo
      http: //github.com/280north/aristo

      License:
        http: //creativecommons.org/licenses/by-sa/3.0/us/

      Authors:
        * 280 North, Inc., http: //280north.com/
        * Sofa, http: //madebysofa.com/

************************************************************************ */

/* ************************************************************************

#asset(eyetheme/decoration/*)

************************************************************************* */

/**
 * The EyeTheme appearance theme.
 */
qx.Theme.define("eye.theme.eyetheme.Appearance",
{
  appearances:
  {
    "widget": {},

    "root":
    {
      style: function(states)
      {
        return {
          backgroundColor: "background-application",
          textColor: "text-label",
          font: "default"
        };
      }
    },

    "label":
    {
      style: function(states)
      {
        return {
          textColor: states.disabled ? "text-disabled": undefined
        };
      }
    },
    "image":
    {
      style: function(states)
      {
        return {
          opacity: !states.replacement && states.disabled ? 0.3: 1
        };
      }
    },
    "atom": {},
    "atom/label": "label",
    "atom/icon": "image",

    "move-frame":
    {
      style: function(states)
      {
        return {
          decorator: "main"
        };
      }
    },

    "resize-frame": "move-frame",

    "dragdrop-cursor":
    {
      style: function(states)
      {
        var icon = "nodrop";

        if (states.copy) {
          icon = "copy";
        } else if (states.move) {
          icon = "move";
        } else if (states.alias) {
          icon = "alias";
        }

        return {
          source: "eyetheme/decoration/cursors/" + icon + ".gif",
          position: "right-top",
          offset: [ 2, 16, 2, 6 ]
        };
      }
    },

    "popup":
    {
      style: function(states)
      {
        return {
          decorator: "list",
          backgroundColor: "background-light"
        //shadow: "gray-shadow"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      BUTTON
    ---------------------------------------------------------------------------
    */

    "button-frame":
    {
      alias: "atom",

      style: function(states)
      {
        var decorator, textColor, shadow;

        if (states.checked)
        {
          decorator = "button-checked";
          textColor = "text-active";
        }
        else if (states.disabled)
        {
          decorator = "button-disabled";
          textColor = undefined;
        }
        else if (states.pressed)
        {
          decorator = "button-pressed";
          textColor = "text-active";
        }
        else if (states.checked)
        {
          decorator = "button-checked";
          textColor = "text-active";
        }
        else if (states.hovered || states.preselected)
        {
          decorator = "button"
          shadow = "shadow";
        }
        else
        {
          decorator = "button";
          textColor = undefined;
        }

        if (states.focused)
        {
          //shadow = "shadow";
        }

        return {
          decorator: decorator,
          textColor: textColor,
          shadow: shadow ? shadow: states.invalid && !states.disabled ? "button-invalid-shadow": undefined
        };
      }
    },

    "button-frame/image":
    {
      style: function(states)
      {
        return {
          opacity: !states.replacement && states.disabled ? 0.5: 1
        };
      }
    },

    "button/icon":
    {
      include: "atom/icon",
      style: function(states)
      {
        return {
          paddingRight: 10
        };
      }
    },

    "button":
    {
      alias: "button-frame",
      include: "button-frame",

      style: function(states)
      {
        return {
          margin: 3,
          padding: [ 6, 14 ],
          center: true
        };
      }
    },

    "button-red":
    {
      alias: "button",
      include: "button",

      style: function(states)
      {
        var decorator, textColor, shadow;

        textColor = "text-active";

        if (states.checked)
        {
          decorator = "button-checked";
          textColor = "text-active";
        }
        else if (states.disabled)
        {
          decorator = "button-disabled";
          textColor = undefined;
        }
        else if (states.pressed)
        {
          decorator = "button-red";
          textColor = "black";
        }
        else if (states.checked)
        {
          decorator = "button-checked";
          textColor = "text-active";
        }
        else if (states.hovered || states.preselected)
        {
          decorator = "button-red";
          shadow = "red-shadow";
          textColor = "black";
        }
        else
        {
          decorator = "button-red";
        }

        return {
          decorator: decorator,
          textColor: textColor,
          shadow: shadow
        };
      }
    },


    "button-green":
    {
      alias: "button",
      include: "button",

      style: function(states)
      {
        var decorator, textColor, shadow;

        textColor = "text-active";

        if (states.checked)
        {
          decorator = "button-checked";
          textColor = "text-active";
        }
        else if (states.disabled)
        {
          decorator = "button-disabled";
          textColor = undefined;
        }
        else if (states.pressed)
        {
          decorator = "button-green";
          textColor = "black";
        }
        else if (states.checked)
        {
          decorator = "button-checked";
          textColor = "text-active";
        }
        else if (states.hovered || states.preselected)
        {
          decorator = "button-green";
          shadow = "green-shadow";
          textColor = "black";
        }
        else
        {
          decorator = "button-green";
        }

        return {
          decorator: decorator,
          textColor: textColor,
          shadow: shadow
        };
      }
    },

    "hover-button":
    {
      alias: "atom",
      include: "atom",

      style: function(states)
      {
        return {
          decorator: states.hovered ? "selected": undefined,
          textColor: states.hovered ? "text-selected": undefined
        };
      }
    },


    "button-small":
    {
      alias: "button",
      include: "button",

      style: function(states)
      {
        return {
          margin: 0,
          padding: [ 0, 10 ],
          center: true,
          font: "small"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      TYPICAL BUTTONS
    ---------------------------------------------------------------------------
    */

    "button-delete":
    {
      alias: "button-red",
      include: "button-red",

      style: function(states)
      {
        return {
          center: false,
          icon: states.hovered ? "eyetheme/decoration/icons/delete-hovered.png" : "eyetheme/decoration/icons/delete.png"
        };
      }
    },

    "button-add":
    {
      alias: "button-green",
      include: "button-green",

      style: function(states)
      {
        return {
          center: false,
          icon: states.hovered ? "eyetheme/decoration/icons/add-hovered.png" : "eyetheme/decoration/icons/add.png"
        };
      }
    },

    "splitbutton": {
      style: function(states)
      {
        return {
          shadow: states.focused? "shadow": undefined
        }
      }
    },
    "splitbutton/button": {
      include: "button",
      style: function(states)
      {
        return {
          shadow: undefined
        }
      }
    },
    "splitbutton/arrow":
    {
      //alias: "button",
      include: "button",

      style: function(states)
      {
        return {
          icon: "eyetheme/decoration/arrows/arrow-down.png",
          padding: 2,
          marginLeft: -2,
          shadow: undefined
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      LIST
    ---------------------------------------------------------------------------
    */

    "list":
    {
      alias: "scrollarea",

      style: function(states)
      {
        var decorator = "list";
        var shadow = "shadow";

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (focused && invalid && !disabled) {
          shadow = "red-shadow";
        } else if (focused && !invalid && !disabled) {
          shadow = "shadow";
        } else if (disabled) {
          decorator = "input";
        } else if (!focused && invalid && !disabled) {
          shadow = "red-shadow";
        }

        if (!focused)
        {
          shadow = undefined;
        }
        return {
          backgroundColor: "white",
          decorator: decorator,
          shadow: shadow,
          margin: 2
        };
      }
    },

    "list/pane": "widget",

    "listitem":
    {
      alias: "atom",

      style: function(states)
      {
        var decorator;
        if (states.dragover) {
          decorator = states.selected ? "selected-dragover": "dragover";
        } else {
          decorator = states.selected ? "selected": undefined;
        }

        return {
          padding: states.dragover ? [4, 4, 2, 4]: 4,
          textColor: states.selected ? "text-selected": undefined,
          decorator: decorator
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      SCROLLAREA
    ---------------------------------------------------------------------------
    */

    "scrollarea":
    {
      style: function(states)
      {
        return {
          // since the scroll container disregards the min size of the scrollbars
          // we have to set the min size of the scroll area to ensure that the
          // scrollbars always have a usable size.
          minWidth: 50,
          minHeight: 50
        };
      }
    },

    "scrollarea/corner":
    {
      style: function(states)
      {
        return {
          backgroundColor: "background-application"
        };
      }
    },

    "scrollarea/pane": "widget",
    "scrollarea/scrollbar-x": "scrollbar",
    "scrollarea/scrollbar-y": "scrollbar",


    "scrollbar":
    {
      style: function(states)
      {
        if (states["native"]) {
          return {};
        }

        return {
          maxWidth: states.horizontal ? undefined: 17,
          maxHeight: states.horizontal ? 17: undefined,
          decorator: states.horizontal ? "scrollbar-horizontal": "scrollbar-vertical",
          padding: 0
        };
      }
    },

    "scrollbar/slider":
    {
      alias: "slider",

      style: function(states)
      {
        return {
          padding: states.horizontal ? [1, -7, 0, -8]: [-8, 0, -9, 0]
        };
      }
    },

    "scrollbar/slider/knob":
    {
      style: function(states)
      {
        var decorator = states.horizontal ? "scrollbar-slider-horizontal":
        "scrollbar-slider-vertical";
        if (states.disabled) {
          decorator += "-disabled";
        }

        return {
          decorator: decorator,
          //width: states.horizontal? undefined: 16,
          marginLeft: qx.bom.client.Browser.NAME == "ie" && !states.horizontal? 2: 1,
          marginTop: qx.bom.client.Browser.NAME == "ie" && states.horizontal? 1: undefined,
          minHeight: states.horizontal ? undefined: 16,
          minWidth: states.horizontal ? 16: undefined
        };
      }
    },

    "scrollbar/button":
    {
      alias: "button-frame",
      //include: "button-frame",

      style: function(states)
      {
        var icon = "eyetheme/decoration/arrows/arrow-";
        var decorator;
        if (states.left) {
          icon +=  states.pressed? "focused-left.png": "left.png";
          decorator = states.hovered || states.docused? "scroll-bt-left-focused": "scroll-bt-left";
        } else if (states.right) {
          icon += states.pressed? "focused-right.png": "right.png";
          decorator = states.hovered || states.docused? "scroll-bt-right-focused": "scroll-bt-right";
        } else if (states.up) {
          icon += states.pressed? "focused-up.png": "up.png";
          decorator = states.hovered || states.focused? "scroll-bt-up-focused": "scroll-bt-up";
        } else {
          icon += states.pressed? "focused-down.png": "down.png";
          decorator = states.hovered || states.focused? "scroll-bt-down-focused": "scroll-bt-down";
        }

        if (states.left || states.right)
        {
          return {
            padding: [0, 0, 0, states.left? 6: 16],
            icon: icon,
            width: 29,
            height: 17,
            decorator: decorator
          };
        }
        else
        {
          return {
            padding: [states.up? -10: 12, 0, 0, 4],
            icon: icon,
            width: 17,
            height: 29,
            decorator: decorator
          };
        }
      }
    },

    "scrollbar/button-begin": "scrollbar/button",
    "scrollbar/button-end": "scrollbar/button",

    /*
    ---------------------------------------------------------------------------
      SPINNER
    ---------------------------------------------------------------------------
    */

    "spinner":
    {
      style: function(states)
      {
        var decorator, shadow;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (focused && invalid && !disabled) {
          decorator = "input-focused-invalid";
        } else if (focused && !invalid && !disabled) {
          //decorator = "input-focused";
          shadow = "shadow";
          decorator = "input";
        } else if (disabled) {
          decorator = "input";
        } else if (!focused && invalid && !disabled) {
          decorator = "border-invalid";
        } else {
          decorator = "input";
        }

        return {
          decorator: decorator,
          shadow: shadow,
          margin: 2
        };
      }
    },

    "spinner/textfield":
    {
      style: function(states)
      {
        return {
          marginRight: 2,
          padding: [2, 4, 1],
          textColor: states.disabled ? "text-disabled": "text-input"
        };
      }
    },

    "spinner/upbutton":
    {
      alias: "button-frame",
      include: "button-frame",

      style: function(states)
      {
        return {
          icon: "eyetheme/decoration/arrows/up-small.png",
          padding: states.pressed ? [2, 2, 0, 4]: [1, 3, 1, 3],
          shadow: undefined
        };
      }
    },

    "spinner/downbutton":
    {
      alias: "button-frame",
      include: "button-frame",

      style: function(states)
      {
        return {
          icon: "eyetheme/decoration/arrows/down-small.png",
          padding: states.pressed ? [2, 2, 0, 4]: [1, 3, 1, 3],
          shadow: undefined
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      FORM FIELDS
    ---------------------------------------------------------------------------
    */

    "checkbox":
    {
      alias: "atom",

      style: function(states)
      {
        // "disabled" state is not handled here with purpose. The image widget
        // does handle this already by replacing the current image with a
        // disabled version (if available). If no disabled image is found the
        // opacity style is used.
        var icon;
        if (states.checked && states.focused) {
          icon = "checkbox-checked-focused";
        } else if (states.checked && states.disabled) {
          icon = "checkbox-checked-disabled";
        } else if (states.checked && states.pressed) {
          icon = "checkbox-checked-pressed";
        } else if (states.checked && states.hovered) {
          icon = "checkbox-checked-hovered";
        } else if (states.checked) {
          icon = "checkbox-checked";
        } else if (states.focused) {
          icon = "checkbox-focused";
        } else if (states.pressed) {
          icon = "checkbox-pressed";
        } else if (states.hovered && !states.disabled) {
          icon = "checkbox-hovered";
        } else {
          icon = "checkbox";
        }

        var invalid = states.invalid && !states.disabled ? "-invalid": "";

        return {
          icon: "eyetheme/decoration/form/" + icon + invalid + ".png",
          gap: 6
        };
      }
    },
    "radiobutton":
    {
      alias: "atom",

      style: function(states)
      {
        var icon = "radiobutton";

        if (states.checked) {
          icon += "-checked";
        }
        if (states.pressed) {
          icon += "-pressed";
        }
        if (states.focused) {
          icon += "-focused";
        }
        if (states.hovered && !states.pressed) {
          icon += "-hovered";
        }
        if (states.invalid) {
          icon += "-invalid";
        }
        if (states.disabled) {
          icon += "-disabled";
        }

        return {
          icon: "eyetheme/decoration/form/" + icon + ".png",
          gap: 6
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      SELECTBOX
    ---------------------------------------------------------------------------
    */

    "selectbox":
    {
      alias: "button-frame",
      include: "button-frame",

      style: function(states)
      {
        return {
          padding: [ 1, 3 ],
          margin: 2,
          font: "small",
          allowGrowY: false
        };
      }
    },

    "selectbox/atom":
    {
      include: "atom",
      style: function(states)
      {
        return {
          margin: 0,
          padding: 0
        };
      }
    },


    "selectbox/atom/label":
    {
      style: function(states)
      {
        return {
          margin: 0,
          padding: 0
        };
      }
    },

    "selectbox/popup":
    {
      include: "popup",

      style: function(states)
      {
        return {
          shadow: "shadow-popup"
        };
      }
    },

    "selectbox/list": {
      alias: "list",

      style: function(states)
      {
        return {
          backgroundColor: "white"
        };
      }
    },

    "selectbox/arrow":
    {
      include: "image",

      style: function(states)
      {
        return {
          source: "eyetheme/decoration/arrows/arrow-down.png",
          paddingLeft: 5
        };
      }
    },

    "textfield":
    {
      style: function(states)
      {
        var decorator, shadow;

        var focused = !!states.focused;
        var disabled = !!states.disabled;

        decorator = "input";

        if (focused && !disabled) {
          shadow = "shadow";
        } else if (disabled) {
          shadow = undefined;
        } else {
          shadow = undefined;
        }

        var textColor;
        if (states.disabled) {
          textColor = "text-disabled";
        } else if (states.showingPlaceholder) {
          textColor = "text-placeholder";
        } else {
          textColor = "text-input";
        }

        return {
          decorator: "input",
          padding: [ 2, 4, 1 ],
          textColor: textColor,
          shadow: shadow,
          margin: 2
        };
      }
    },

    "textarea":
    {
      include: "textfield",

      style: function(states)
      {
        return {
          padding: 4,
          margin: 2
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      WINDOW
    ---------------------------------------------------------------------------
    */

    "window":
    {
      style: function(states)
      {
        return {
          shadow: "shadow-window-inactive", // states.focused? "shadow-window": "gray-shadow",
          contentPadding: [ 10, 10, 10, 10 ]
        };
      }
    },

    "window/pane":
    {
      style: function(states)
      {
        return {
          decorator: "window"
        };
      }
    },

    "window/captionbar":
    {
      style: function(states)
      {
        return {
          decorator: "window-captionbar",
          textColor: states.active ? "text-window" : "text-window-inactive",
          minHeight: 28,
          maxHeight: 28,
          paddingRight: 2
        };
      }
    },

    "window/title":
    {
      style: function(states)
      {
        return {
          textAlign: "left",
          alignY: "middle",
          font: "bold",
          marginLeft: 6,
          marginRight: 6
        };
      }
    },

    "window/minimize-button":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          icon: states.active ? states.hovered ? "eyetheme/decoration/window/minimize-active-hovered.png":
          "eyetheme/decoration/window/minimize-active.png":
          "eyetheme/decoration/window/minimize-inactive.png",
          margin: [ 2, 3, 2, 0 ]
        };
      }
    },

    "window/restore-button":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          icon: states.active ? states.hovered ? "eyetheme/decoration/window/restore-active-hovered.png":
          "eyetheme/decoration/window/restore-active.png":
          "eyetheme/decoration/window/restore-inactive.png",
          margin: [ 2, 3, 2, 0 ]
        };
      }
    },

    "window/maximize-button":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          icon: states.active ? states.hovered ? "eyetheme/decoration/window/maximize-active-hovered.png":
          "eyetheme/decoration/window/maximize-active.png":
          "eyetheme/decoration/window/maximize-inactive.png",
          margin: [ 2, 3, 2, 0 ]
        };
      }
    },

    "window/close-button":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          icon: states.active ? states.hovered ? "eyetheme/decoration/window/close-active-hovered.png":
          "eyetheme/decoration/window/close-active.png":
          "eyetheme/decoration/window/close-inactive.png",
          margin: [ 2, 3, 2, 0 ]
        };
      }
    },

    "window/close-button/icon": "window/icon",
    "window/maximize-button/icon": "window/icon",
    "window/restore-button/icon": "window/icon",
    "window/minimize-button/icon": "window/icon",
    "window/icon":
    {
      style: function(states)
      {
        return {
          alignY: "middle",
          marginLeft: 5,
          height: 16,
          width: 16
        };
      }
    },


    "window/statusbar":
    {
      style: function(states)
      {
        return {
          padding: [ 2, 2 ],
          decorator: "window-statusbar",
          minHeight: 20
        };
      }
    },

    "window/statusbar-text":
    {
      style: function(states)
      {
        return {
          font: "small"
        };
      }
    },

    "window/statusbar-pane":
    {
      style: function(states)
      {
        return {
          padding: [ 8, 2 ]
        };
      }
    },

    "window/resizehandler":
    {
      style: function(states)
      {
        return {
          source: "eyetheme/decoration/window/resizehandler.png",
          alignY: "bottom",
          alignX: "right",
          marginRight: 2,
          marginBottom: 2
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      TOOLBAR
    ---------------------------------------------------------------------------
    */

    "toolbar":
    {
      style: function(states)
      {
        return {
          decorator: "toolbar",
          spacing: 2,
          paddingLeft: 4
        };
      }
    },

    "toolbar-window":
    {
      include: "toolbar",
      style: function(states)
      {
        return {
          margin: -10,
          decorator: "toolbar-window"
        };
      }
    },

    "toolbar/part":
    {
      style: function(states)
      {
        return {
          decorator: "toolbar-part",
          spacing: 2
        };
      }
    },

    "toolbar/part/container":
    {
      style: function(states)
      {
        return {
          paddingLeft: 2,
          paddingRight: 2
        };
      }
    },

    "toolbar/part/handle":
    {
      style: function(states)
      {
        return {
          source: "eyetheme/decoration/toolbar/toolbar-handle-knob.gif",
          marginLeft: 3,
          marginRight: 3
        };
      }
    },

    "toolbar-button":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          marginTop: 2,
          marginBottom: 2,
          padding: (states.pressed || states.checked || states.hovered) && !states.disabled
          || (states.disabled && states.checked) ? 3: 5,
          decorator: states.pressed || (states.checked && !states.hovered) || (states.checked && states.disabled) ?
          "toolbar-button-checked":
          states.hovered && !states.disabled ?
          "toolbar-button-hovered": undefined
        };
      }
    },

    "toolbar-menubutton":
    {
      alias: "toolbar-button",
      include: "toolbar-button",

      style: function(states)
      {
        return {
          showArrow: true
        };
      }
    },

    "toolbar-menubutton/arrow":
    {
      alias: "image",
      include: "image",

      style: function(states)
      {
        return {
          source: "eyetheme/decoration/arrows/down-small.png"
        };
      }
    },

    "toolbar-splitbutton":
    {
      style: function(states)
      {
        return {
          marginTop: 2,
          marginBottom: 2
        };
      }
    },

    "toolbar-splitbutton/button":
    {
      alias: "toolbar-button",
      include: "toolbar-button",

      style: function(states)
      {
        return {
          icon: "eyetheme/decoration/arrows/down.png",
          marginTop: undefined,
          marginBottom: undefined
        };
      }
    },

    "toolbar-splitbutton/arrow":
    {
      alias: "toolbar-button",
      include: "toolbar-button",

      style: function(states)
      {
        if (states.pressed || states.checked || (states.hovered && !states.disabled)) {
          var padding = 1;
        } else {
          var padding = 3;
        }

        return {
          padding: padding,
          icon: "eyetheme/decoration/arrows/down.png",
          marginTop: undefined,
          marginBottom: undefined
        };
      }
    },

    "toolbar-separator":
    {
      style: function(states)
      {
        return {
          decorator: "toolbar-separator",
          margin: 7
        };
      }
    },



    /*
    ---------------------------------------------------------------------------
      SLIDER
    ---------------------------------------------------------------------------
    */

    "slider":
    {
      style: function(states)
      {
        return {
          decorator: states.horizontal? "slider-horizontal": "slider-vertical",
          maxHeight: states.horizontal? 20: undefined,
          maxWidth: states.horizontal? undefined: 20,
          minHeight: states.horizontal? 20: undefined,
          minWidth: states.horizontal? undefined: 20,
          padding: [states.horizontal? 0: -10, states.horizontal? -10: 0, states.horizontal? 0: -10, states.horizontal? -10: 2]
        };
      }
    },

    "slider/knob":
    {
      alias: "atom",
      include: "atom",

      style: function(states)
      {
        return {
          decorator: states.disabled ? "slider-knob-disabled":
          states.focused? "slider-knob-focused": "slider-knob",
          //shadow: states.focused? "shadow": undefined,
          maxHeight: 18,
          //minHeight: 17,
          //marginTop: -0,
          maxWidth: 18
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
    BIG MENU
    ---------------------------------------------------------------------------
    */
    "menu-big":
    {
      alias: "menu",
      include: "menu",

      style: function(states)
      {
        return {
          decorator: "menu-big",
          shadow: "shadow-big"
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
    MENU
    ---------------------------------------------------------------------------
    */

    "menu":
    {
      style: function(states)
      {
        var result =
        {
          decorator: "menu",
          shadow: "shadow-popup",
          spacingX: 6,
          spacingY: 1,
          /*iconColumnWidth: 16,*/
          arrowColumnWidth: 4,
          placementModeY: states.submenu || states.contextmenu ? "best-fit": "keep-align",
          backgroundColor: "background-menu",
          textColor: "text-light",

          minWidth: 100
        };

        if (states.submenu)
        {
          result.position = "right-top";
          result.offset = [-2, -3];
        }

        return result;
      }
    },

    "menu/slidebar": "menu-slidebar",

    "menu-slidebar": "widget",

    "menu-slidebar-button":
    {
      style: function(states)
      {
        return {
          decorator: states.hovered ? "selected": undefined,
          padding: 7,
          center: true
        };
      }
    },

    "menu-slidebar/button-backward":
    {
      include: "menu-slidebar-button",

      style: function(states)
      {
        return {
          icon: states.hovered ? "eyetheme/decoration/arrows/up-invert.png": "eyetheme/decoration/arrows/up.png"
        };
      }
    },

    "menu-slidebar/button-forward":
    {
      include: "menu-slidebar-button",

      style: function(states)
      {
        return {
          icon: states.hovered ? "eyetheme/decoration/arrows/down-invert.png": "eyetheme/decoration/arrows/down.png"
        };
      }
    },

    "menu-separator":
    {
      style: function(states)
      {
        return {
          height: 0,
          decorator: "menu-separator",
          margin: [ 4, 2 ]
        };
      }
    },

    "menu-button":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          decorator: states.selected ? "selected": undefined,
          textColor: states.selected ? "text-hover-menu": "text-light",
          padding: [ 4, 6 ]
        };
      }
    },

    "menu-button/icon":
    {
      include: "image",

      style: function(states)
      {
        return {
          alignY: "middle"
        };
      }
    },

    "menu-button/label":
    {
      include: "label",

      style: function(states)
      {
        return {
          alignY: "middle",
          alignX: "left",
          textColor: states.disabled ? "text-disabled" : undefined
        };
      }
    },

    "menu-button/shortcut":
    {
      include: "label",

      style: function(states)
      {
        return {
          alignY: "middle",
          marginLeft: 14,
          padding: 1
        };
      }
    },

    "menu-button/arrow":
    {
      include: "image",

      style: function(states)
      {
        return {
          source: states.selected ? "eyetheme/decoration/arrows/right-invert.png": "eyetheme/decoration/arrows/right.png",
          alignY: "middle"
        };
      }
    },

    "menu-checkbox":
    {
      alias: "menu-button",
      include: "menu-button",

      style: function(states)
      {
        return {
          icon: !states.checked ? undefined:
          states.selected ? "eyetheme/decoration/menu/checkbox-invert.gif":
          "eyetheme/decoration/menu/checkbox.gif"
        };
      }
    },

    "menu-radiobutton":
    {
      alias: "menu-button",
      include: "menu-button",

      style: function(states)
      {
        return {
          icon: !states.checked ? undefined:
          states.selected ? "eyetheme/decoration/menu/radiobutton-invert.gif":
          "eyetheme/decoration/menu/radiobutton.gif"
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      MENU BAR
    ---------------------------------------------------------------------------
    */

    "menubar":
    {
      style: function(states)
      {
        return {
          height: 30,
          paddingLeft: 0,
          decorator: "menubar",
          textColor: "text-application"
        };
      }
    },

    "menubar-button":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          decorator: (states.pressed || states.hovered) && !states.disabled ? "selected": undefined,
          textColor: states.pressed || states.hovered ? "text-selected": "text-light",
          padding: [ 3, 8 ]
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      DATEFIELD
    ---------------------------------------------------------------------------
    */

    "datefield": "combobox",

    "datefield/button":
    {
      alias: "combobox/button",
      include: "combobox/button",

      style: function(states)
      {
        return {
          icon: "eyetheme/decoration/icons/16x16/calendar.png",
          padding: [0, 3],
          decorator: "blank",
          marginLeft: -3,
          shadow: undefined
        };
      }
    },

    "datefield/textfield": "combobox/textfield",

    "datefield/list":
    {
      alias: "datechooser",
      include: "datechooser",

      style: function(states)
      {
        return {
          decorator: undefined
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      DATE CHOOSER
    ---------------------------------------------------------------------------
    */

    "datechooser":
    {
      style: function(states)
      {
        var decorator;

        var focused = !!states.focused;
        var invalid = !!states.invalid;
        var disabled = !!states.disabled;

        if (focused && invalid && !disabled) {
          decorator = "input-focused-invalid";
        } else if (focused && !invalid && !disabled) {
          decorator = "input-focused";
        } else if (disabled) {
          decorator = "input-disabled";
        } else if (!focused && invalid && !disabled) {
          decorator = "border-invalid";
        } else {
          decorator = "input";
        }

        return {
          padding: 2,
          decorator: decorator,
          backgroundColor: "background-light"
        };
      }
    },

    "datechooser/navigation-bar": {},

    "datechooser/nav-button":
    {
      include: "button-frame",
      alias: "button-frame",

      style: function(states)
      {
        var result = {
          padding: [ 2, 4 ],
          shadow: undefined
        };

        if (states.lastYear) {
          result.icon = "eyetheme/decoration/arrows/rewind.png";
          result.marginRight = 1;
        } else if (states.lastMonth) {
          result.icon = "eyetheme/decoration/arrows/left.png";
        } else if (states.nextYear) {
          result.icon = "eyetheme/decoration/arrows/forward.png";
          result.marginLeft = 1;
        } else if (states.nextMonth) {
          result.icon = "eyetheme/decoration/arrows/right.png";
        }

        return result;
      }
    },

    "datechooser/last-year-button-tooltip": "tooltip",
    "datechooser/last-month-button-tooltip": "tooltip",
    "datechooser/next-year-button-tooltip": "tooltip",
    "datechooser/next-month-button-tooltip": "tooltip",

    "datechooser/last-year-button": "datechooser/nav-button",
    "datechooser/last-month-button": "datechooser/nav-button",
    "datechooser/next-month-button": "datechooser/nav-button",
    "datechooser/next-year-button": "datechooser/nav-button",

    "datechooser/month-year-label":
    {
      style: function(states)
      {
        return {
          font: "bold",
          textAlign: "center",
          textColor: states.disabled ? "text-disabled": undefined
        };
      }
    },

    "datechooser/date-pane":
    {
      style: function(states)
      {
        return {
          textColor: states.disabled ? "text-disabled": undefined,
          marginTop: 2
        };
      }
    },

    "datechooser/weekday":
    {
      style: function(states)
      {
        return {
          textColor: states.disabled ? "text-disabled": states.weekend ? "text-light": undefined,
          textAlign: "center",
          paddingTop: 2,
          backgroundColor: "background-medium"
        };
      }
    },

    "datechooser/week":
    {
      style: function(states)
      {
        return {
          textAlign: "center",
          padding: [ 2, 4 ],
          backgroundColor: "background-medium"
        };
      }
    },

    "datechooser/day":
    {
      style: function(states)
      {
        return {
          textAlign: "center",
          decorator: states.disabled ? undefined: states.selected ? "selected": undefined,
          textColor: states.disabled ? "text-disabled": states.selected ? "text-selected": states.otherMonth ? "text-light": undefined,
          font: states.today ? "bold": undefined,
          padding: [ 2, 4 ]
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      COMBOBOX
    ---------------------------------------------------------------------------
    */

    "combobox":
    {
      style: function(states)
      {
        //var decorator = "input";

        var focused = !!states.focused;
        var invalid = !!states.invalid;

        return {
          decorator: "input",
          shadow: focused? invalid? "red-shadow": "shadow": undefined
        };
      }
    },

    "combobox/popup": "popup",

    "combobox/list": {
      alias: "list"
    },

    "combobox/button":
    {
      include: "button-frame",
      alias: "button-frame",

      style: function(states)
      {
        var ret = {
          icon: "eyetheme/decoration/arrows/arrow-down.png",
          padding: 2,
          shadow: undefined
        };

        if (states.selected) {
          ret.decorator = "button-focused";
        }

        return ret;
      }
    },

    "combobox/textfield":
    {
      include: "textfield",

      style: function(states)
      {
        return {
          decorator: "blank",
          padding: 3,
          margin: undefined
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      TOOL TIP
    ---------------------------------------------------------------------------
    */

    "tooltip":
    {
      include: "popup",

      style: function(states)
      {
        return {
          backgroundColor: "background-tip",
          padding: [ 1, 3, 2, 3 ],
          offset: [ 15, 5, 5, 5 ]
        };
      }
    },

    "tooltip/atom": "atom",

    "tooltip-error":
    {
      include: "tooltip",

      style: function(states)
      {
        return {
          textColor: "text-selected",
          placeMethod: "widget",
          offset: [0, 0, 0, 14],
          marginTop: -2,
          position: "right-top",
          showTimeout: 100,
          hideTimeout: 10000,
          decorator: "tooltip-error",
          shadow: "tooltip-error-arrow",
          font: "bold"
        };
      }
    },

    "tooltip-error/atom": "atom",


    /*
    ---------------------------------------------------------------------------
      GROUP BOX
    ---------------------------------------------------------------------------
    */

    "groupbox":
    {
      style: function(states)
      {
        return {
          legendPosition: "top"
        };
      }
    },

    "groupbox/legend":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          padding: [1, 0, 1, 4],
          textColor: states.invalid ? "invalid": "text-title",
          font: "bold"
        };
      }
    },

    "groupbox/frame":
    {
      style: function(states)
      {
        return {
          padding: 12,
          decorator: "group"
        };
      }
    },


    "check-groupbox": "groupbox",

    "check-groupbox/legend":
    {
      alias: "checkbox",
      include: "checkbox",

      style: function(states)
      {
        return {
          padding: [1, 0, 1, 4],
          textColor: states.invalid ? "invalid": "text-title",
          font: "bold"
        };
      }
    },

    "radio-groupbox": "groupbox",

    "radio-groupbox/legend":
    {
      alias: "radiobutton",
      include: "radiobutton",

      style: function(states)
      {
        return {
          padding: [1, 0, 1, 4],
          textColor: states.invalid ? "invalid": "text-title",
          font: "bold"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      TABLIST
    ---------------------------------------------------------------------------
    */
    "tablist":
    {
      style: function(states)
      {
        return {
          contentPadding: 0,
          margin: 0
        };
      }
    },


    "tablist/bar":
    {
      alias: "slidebar",

      style: function(states)
      {
        return {
          backgroundColor: "background-panel",
          minWidth: 100,
          margin: 0,
          decorator: "tablist-bar-right"
          //states.barLeft ?  "tablist-bar-left" : "tablist-bar-right"
        };
      }
    },

    "tablist/bar/content":
    {
      alias: "slidebar",

      style: function(states)
      {
        return {
        };
      }
    },

    "tablist/bar/button-forward":
    {
      include: "slidebar/button-forward",
      alias: "slidebar/button-forward",

      style: function(states)
      {
        if (states.barTop || states.barBottom)
        {
          return {
            marginTop: 2,
            marginBottom: 2
          };
        }
        else
        {
          return {
            marginLeft: 2,
            marginRight: 2
          };
        }
      }
    },

    "tablist/bar/button-backward":
    {
      include: "slidebar/button-backward",
      alias: "slidebar/button-backward",

      style: function(states)
      {
        if (states.barTop || states.barBottom)
        {
          return {
            marginTop: 2,
            marginBottom: 2
          };
        }
        else
        {
          return {
            marginLeft: 2,
            marginRight: 2
          };
        }
      }
    },

    "tablist/bar/scrollpane":
    {
      style: function(states)
      {
        return {
          alignX: "center"
        };
      }
    },

    "tablist/pane":
    {
      style: function(states)
      {
        return {
          minHeight: 100,
          margin: 0
        };
      }
    },

    "tablist-page":
    {
      style: function(states)
      {
        return {
          margin: 0,
          padding: 15
        };
      }
    },

    "tablist-page/button":
    {
      alias: "atom",

      style: function(states)
      {
        return {
          alignY: "middle",
          zIndex: states.checked ? 10 : 5,
          decorator: states.checked ? "tablist-page-button-active" : "tablist-page-button-inactive",
          height: 30,
          padding: [ 6, 10, 2 , 10 ],
          margin: 0,
          textColor: !states.checked ? "text-application": "text-inactive-switcher"
        };
      }
    },


    "tablist-page/button/label":
    {
      alias: "label",

      style: function(states)
      {
        return {
          font: "big",
          alignY: "middle",
          alignX: "left"
        };
      }
    },

    "tablist-page/button/close-button":
    {
      alias: "atom",
      style: function(states)
      {
        return {
          icon: "eyetheme/decoration/tabview/close.png"
        };
      }
    },

    "tablist-page/button/icon":
    {
      style: function(states)
      {
        return {
          margin: [0, 8],
          minWidth: 20,
          alignX: "center"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      SWITCHER
    ---------------------------------------------------------------------------
    */

    "switcher":
    {
      style: function(states)
      {
        return {
          contentPadding: 16
        };
      }
    },

    "switcher/bar":
    {
      alias: "slidebar",

      style: function(states)
      {
        return {
          allowGrowX: false,
          alignX: "center"
        };
      }
    },

    "switcher/bar/button-forward":
    {
      include: "slidebar/button-forward",
      alias: "slidebar/button-forward",

      style: function(states)
      {
        if (states.barTop || states.barBottom)
        {
          return {
            marginTop: 2,
            marginBottom: 2
          };
        }
        else
        {
          return {
            marginLeft: 2,
            marginRight: 2
          };
        }
      }
    },

    "switcher/bar/button-backward":
    {
      include: "slidebar/button-backward",
      alias: "slidebar/button-backward",

      style: function(states)
      {
        if (states.barTop || states.barBottom)
        {
          return {
            marginTop: 2,
            marginBottom: 2
          };
        }
        else
        {
          return {
            marginLeft: 2,
            marginRight: 2
          };
        }
      }
    },

    "switcher/bar/scrollpane":
    {
      style: function(states)
      {

        return {
          alignX: "center"
        };
      }
    },

    "switcher/pane":
    {
      style: function(states)
      {
        return {
          decorator: "switcher-pane",
          minHeight: 100
        };
      }
    },

    "switcher-page":
    {
      style: function(states)
      {
        return {
          margin: 0,
          padding: 0
        };
      }
    },

    "switcher-page/button":
    {
      alias: "atom",

      style: function(states)
      {
        var decorator;

        if (states.firstTab) {
          decorator = states.checked ? "switcher-page-first-button-active" : "switcher-page-first-button-inactive";
        } else if (states.lastTab) {
          decorator = states.checked ? "switcher-page-last-button-active" : "switcher-page-last-button-inactive";
        } else {
          decorator = states.checked ? "switcher-page-button-active" : "switcher-page-button-inactive";
        }

        return {
          alignY: "middle",
          zIndex: states.checked ? 10 : 5,
          decorator: decorator,
          height: 21,
          minWidth: 80,
          padding: [ 3, 20, 2 , 20 ],
          paddingTop: states.checked ? 4 : 3,
          //marginLeft: 1,
          textColor: !states.checked ? "text-application": "text-inactive-switcher"
        };
      }
    },


    "switcher-page/button/label":
    {
      alias: "label",

      style: function(states)
      {
        return {
          font: "small",
          alignY: "middle",
          alignX: "center"
        };
      }
    },

    "switcher-page/button/close-button":
    {
      alias: "atom",
      style: function(states)
      {
        return {
          icon: "eyetheme/decoration/tabview/close.png"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      TABVIEW
    ---------------------------------------------------------------------------
    */

    "tabview":
    {
      style: function(states)
      {
        return {
          contentPadding: 16
        };
      }
    },

    "tabview/bar":
    {
      alias: "slidebar",

      style: function(states)
      {
        var result =
        {
          decorator: "tabview-bar",
          marginBottom: states.barTop ? -1: 0,
          marginTop: states.barBottom ? -4: 0,
          marginLeft: states.barRight ? -3: 0,
          marginRight: states.barLeft ? -1: 0,
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0
        };

        if (states.barTop || states.barBottom)
        {
          result.paddingLeft = 0;
          result.paddingRight = 7;
        }
        else
        {
          result.paddingTop = 0;
          result.paddingBottom = 7;
        }

        return result;
      }
    },

    "tabview/bar/button-forward":
    {
      include: "slidebar/button-forward",
      alias: "slidebar/button-forward",

      style: function(states)
      {
        if (states.barTop || states.barBottom)
        {
          return {
            marginTop: 2,
            marginBottom: 2
          };
        }
        else
        {
          return {
            marginLeft: 2,
            marginRight: 2
          };
        }
      }
    },

    "tabview/bar/button-backward":
    {
      include: "slidebar/button-backward",
      alias: "slidebar/button-backward",

      style: function(states)
      {
        if (states.barTop || states.barBottom)
        {
          return {
            marginTop: 2,
            marginBottom: 2
          };
        }
        else
        {
          return {
            marginLeft: 2,
            marginRight: 2
          };
        }
      }
    },

    "tabview/bar/scrollpane": {},

    "tabview/pane":
    {
      style: function(states)
      {
        return {
          decorator: "tabview-pane",
          minHeight: 100,

          marginBottom: states.barBottom ? -1: 0,
          marginTop: states.barTop ? -1: 0,
          marginLeft: states.barLeft ? -1: 0,
          marginRight: states.barRight ? -1: 0
        };
      }
    },

    "tabview-page": "widget",
    /*"tabview-page":
    {
      style: function(states)
      {
        return {
          margin: 0,
          padding: 0,
          decorator: "tabview-page"
        };
      }
    },*/

    "tabview-page/button":
    {
      alias: "atom",

      style: function(states)
      {
        var decorator, padding=0;
        var marginTop=0, marginBottom=0, marginLeft=0, marginRight=0;

        if (states.checked)
        {
          if (states.barTop)
          {
            decorator = "tabview-page-button-top-active";
            padding = [ 6, 14 ];
            marginLeft = states.firstTab ? 0: -5;
            marginRight = states.lastTab ? 0: -5;
          }
          else if (states.barBottom)
          {
            decorator = "tabview-page-button-bottom-active";
            padding = [ 6, 14 ];
            marginLeft = states.firstTab ? 0: -5;
            marginRight = states.lastTab ? 0: -5;
          }
          else if (states.barRight)
          {
            decorator = "tabview-page-button-right-active";
            padding = [ 6, 13 ];
            marginTop = states.firstTab ? 0: -5;
            marginBottom = states.lastTab ? 0: -5;
          }
          else
          {
            decorator = "tabview-page-button-left-active";
            padding = [ 6, 13 ];
            marginTop = states.firstTab ? 0: -5;
            marginBottom = states.lastTab ? 0: -5;
          }
        }
        else
        {
          if (states.barTop)
          {
            decorator = "tabview-page-button-top-inactive";
            padding = [ 4, 10 ];
            marginTop = 4;
            marginLeft = states.firstTab ? 5: 1;
            marginRight = 1;
          }
          else if (states.barBottom)
          {
            decorator = "tabview-page-button-bottom-inactive";
            padding = [ 4, 10 ];
            marginBottom = 4;
            marginLeft = states.firstTab ? 5: 1;
            marginRight = 1;
          }
          else if (states.barRight)
          {
            decorator = "tabview-page-button-right-inactive";
            padding = [ 4, 10 ];
            marginRight = 5;
            marginTop = states.firstTab ? 5: 1;
            marginBottom = 1;
            marginLeft = 1;
          }
          else
          {
            decorator = "tabview-page-button-left-inactive";
            padding = [ 4, 10 ];
            marginLeft = 5;
            marginTop = states.firstTab ? 5: 1;
            marginBottom = 1;
            marginRight = 1;
          }
        }

        return {
          zIndex: states.checked ? 10: 5,
          decorator: decorator,
          padding: padding,
          marginTop: marginTop,
          marginBottom: marginBottom,
          marginLeft: marginLeft,
          marginRight: marginRight,
          textColor: states.checked ? "text-application": "text-inactive-tabview"
        };
      }
    },

    "tabview-page/button/label":
    {
      alias: "label",

      style: function(states)
      {
        return {
          padding: [0, 1, 0, 1],
          margin: states.focused ? 0: 1,
          decorator: states.focused ? "keyboard-focus": undefined
        };
      }
    },

    "tabview-page/button/close-button":
    {
      alias: "atom",
      style: function(states)
      {
        return {
          icon: "eyetheme/decoration/tabview/close.png"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      SLIDEBAR
    ---------------------------------------------------------------------------
    */

    "slidebar": {},
    "slidebar/scrollpane": {},
    "slidebar/content": {},

    "slidebar/button-forward":
    {
      alias: "button-frame",
      include: "button-frame",

      style: function(states)
      {
        return {
          padding: 5,
          center: true,
          icon: states.vertical ?
          "eyetheme/decoration/arrows/down.png":
          "eyetheme/decoration/arrows/right.png"
        };
      }
    },

    "slidebar/button-backward":
    {
      alias: "button-frame",
      include: "button-frame",

      style: function(states)
      {
        return {
          padding: 5,
          center: true,
          icon: states.vertical ?
          "eyetheme/decoration/arrows/up.png":
          "eyetheme/decoration/arrows/left.png"
        };
      }
    },

    /*
    ---------------------------------------------------------------------------
      TREE
    ---------------------------------------------------------------------------
    */

    "tree": "list",

    "tree-item":
    {
      style: function(states)
      {
        return {
          padding: [ 2, 6 ],
          textColor: states.selected ? "text-selected": undefined,
          decorator: states.selected ? "selected": undefined
        };
      }
    },

    "tree-item/icon":
    {
      include: "image",

      style: function(states)
      {
        return {
          paddingRight: 5
        };
      }
    },

    "tree-item/label": "label",

    "tree-item/open":
    {
      include: "image",

      style: function(states)
      {
        var icon;
        if (states.selected && states.opened)
        {
          icon = "eyetheme/decoration/tree/open-selected.png";
        }
        else if (states.selected && !states.opened)
        {
          icon = "eyetheme/decoration/tree/closed-selected.png";
        }
        else if (states.opened)
        {
          icon = "eyetheme/decoration/tree/open.png";
        }
        else
        {
          icon = "eyetheme/decoration/tree/closed.png";
        }

        return {
          padding: [0, 5, 0, 2],
          source: icon
        };
      }
    },

    "tree-folder":
    {
      include: "tree-item",
      alias: "tree-item",

      style: function(states)
      {
        var icon;
        if (states.small) {
          icon = states.opened ? "icon/16/places/folder-open.png": "icon/16/places/folder.png";
        } else if (states.large) {
          icon = states.opened ? "icon/32/places/folder-open.png": "icon/32/places/folder.png";
        } else {
          icon = states.opened ? "icon/22/places/folder-open.png": "icon/22/places/folder.png";
        }

        return {
          icon: icon
        };
      }
    },

    "tree-file":
    {
      include: "tree-item",
      alias: "tree-item",

      style: function(states)
      {
        return {
          icon:
          states.small ? "icon/16/mimetypes/office-document.png":
          states.large ? "icon/32/mimetypes/office-document.png":
          "icon/22/mimetypes/office-document.png"
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      TREEVIRTUAL
    ---------------------------------------------------------------------------
    */

    "treevirtual": "table",

    "treevirtual-folder":
    {
      style: function(states)
      {
        return {
          icon: states.opened ?
          "icon/16/places/folder-open.png":
          "icon/16/places/folder.png"
        };
      }
    },

    "treevirtual-file":
    {
      include: "treevirtual-folder",
      alias: "treevirtual-folder",

      style: function(states)
      {
        return {
          icon: "icon/16/mimetypes/office-document.png"
        };
      }
    },

    "treevirtual-line":
    {
      style: function(states)
      {
        return {
          icon: "qx/static/blank.gif"
        };
      }
    },

    "treevirtual-contract":
    {
      style: function(states)
      {
        return {
          icon: "eyetheme/decoration/tree/open.png",
          paddingLeft: 5,
          paddingTop: 2
        };
      }
    },

    "treevirtual-expand":
    {
      style: function(states)
      {
        return {
          icon: "eyetheme/decoration/tree/closed.png",
          paddingLeft: 5,
          paddingTop: 2
        };
      }
    },

    "treevirtual-only-contract": "treevirtual-contract",
    "treevirtual-only-expand": "treevirtual-expand",
    "treevirtual-start-contract": "treevirtual-contract",
    "treevirtual-start-expand": "treevirtual-expand",
    "treevirtual-end-contract": "treevirtual-contract",
    "treevirtual-end-expand": "treevirtual-expand",
    "treevirtual-cross-contract": "treevirtual-contract",
    "treevirtual-cross-expand": "treevirtual-expand",

    "treevirtual-end":
    {
      style: function(states)
      {
        return {
          icon: "qx/static/blank.gif"
        };
      }
    },

    "treevirtual-cross":
    {
      style: function(states)
      {
        return {
          icon: "qx/static/blank.gif"
        };
      }
    },



    /*
    ---------------------------------------------------------------------------
      IFRAME
    ---------------------------------------------------------------------------
    */

    "iframe":
    {
      style: function(states)
      {
        return {
          decorator: "main"
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      RESIZER
    ---------------------------------------------------------------------------
    */

    "resizer":
    {
      style: function(states)
      {
        return {
          decorator: "pane"
        };
      }
    },



    /*
    ---------------------------------------------------------------------------
      SPLITPANE
    ---------------------------------------------------------------------------
    */

    "splitpane":
    {
      style: function(states)
      {
        return {
          decorator: "splitpane"
        };
      }
    },

    "splitpane/splitter":
    {
      style: function(states)
      {
        return {
          width: states.horizontal ? 3: undefined,
          height: states.vertical ? 3: undefined,
          backgroundColor: "background-splitpane"
        };
      }
    },

    "splitpane/splitter/knob":
    {
      style: function(states)
      {
        return {
          source: states.horizontal ? "eyetheme/decoration/splitpane/knob-horizontal.png": "eyetheme/decoration/splitpane/knob-vertical.png"
        };
      }
    },

    "splitpane/slider":
    {
      style: function(states)
      {
        return {
          width: states.horizontal ? 3: undefined,
          height: states.vertical ? 3: undefined,
          backgroundColor: "background-splitpane"
        };
      }
    },



    /*
    ---------------------------------------------------------------------------
      COLOR SELECTOR
    ---------------------------------------------------------------------------
    */

    "colorselector": "widget",
    "colorselector/control-bar": "widget",
    "colorselector/control-pane": "widget",
    "colorselector/visual-pane": "groupbox",
    "colorselector/preset-grid": "widget",

    "colorselector/colorbucket":
    {
      style: function(states)
      {
        return {
          decorator: "main",
          width: 16,
          height: 16
        };
      }
    },

    "colorselector/preset-field-set": "groupbox",
    "colorselector/input-field-set": "groupbox",
    "colorselector/preview-field-set": "groupbox",

    "colorselector/hex-field-composite": "widget",
    "colorselector/hex-field": "textfield",

    "colorselector/rgb-spinner-composite": "widget",
    "colorselector/rgb-spinner-red": "spinner",
    "colorselector/rgb-spinner-green": "spinner",
    "colorselector/rgb-spinner-blue": "spinner",

    "colorselector/hsb-spinner-composite": "widget",
    "colorselector/hsb-spinner-hue": "spinner",
    "colorselector/hsb-spinner-saturation": "spinner",
    "colorselector/hsb-spinner-brightness": "spinner",

    "colorselector/preview-content-old":
    {
      style: function(states)
      {
        return {
          decorator: "main",
          width: 50,
          height: 10
        };
      }
    },

    "colorselector/preview-content-new":
    {
      style: function(states)
      {
        return {
          decorator: "main",
          backgroundColor: "background-light",
          width: 50,
          height: 10
        };
      }
    },


    "colorselector/hue-saturation-field":
    {
      style: function(states)
      {
        return {
          decorator: "main",
          margin: 5
        };
      }
    },

    "colorselector/brightness-field":
    {
      style: function(states)
      {
        return {
          decorator: "main",
          margin: [5, 7]
        };
      }
    },

    "colorselector/hue-saturation-pane": "widget",
    "colorselector/hue-saturation-handle": "widget",
    "colorselector/brightness-pane": "widget",
    "colorselector/brightness-handle": "widget",


    /*
    ---------------------------------------------------------------------------
      COLOR POPUP
    ---------------------------------------------------------------------------
    */

    "colorpopup":
    {
      alias: "popup",
      include: "popup",

      style: function(states)
      {
        return {
          padding: 5,
          backgroundColor: "background-application"
        };
      }
    },

    "colorpopup/field":
    {
      style: function(states)
      {
        return {
          decorator: "main",
          margin: 2,
          width: 14,
          height: 14,
          backgroundColor: "background-light"
        };
      }
    },

    "colorpopup/selector-button": "button",
    "colorpopup/auto-button": "button",
    "colorpopup/preview-pane": "groupbox",

    "colorpopup/current-preview":
    {
      style: function(state)
      {
        return {
          height: 20,
          padding: 4,
          marginLeft: 4,
          decorator: "main",
          allowGrowX: true
        };
      }
    },

    "colorpopup/selected-preview":
    {
      style: function(state)
      {
        return {
          height: 20,
          padding: 4,
          marginRight: 4,
          decorator: "main",
          allowGrowX: true
        };
      }
    },

    "colorpopup/colorselector-okbutton":
    {
      alias: "button",
      include: "button",

      style: function(states)
      {
        return {
          icon: "icon/16/actions/dialog-ok.png"
        };
      }
    },

    "colorpopup/colorselector-cancelbutton":
    {
      alias: "button",
      include: "button",

      style: function(states)
      {
        return {
          icon: "icon/16/actions/dialog-cancel.png"
        };
      }
    },




    /*
    ---------------------------------------------------------------------------
      TABLE
    ---------------------------------------------------------------------------
    */

    "table":
    {
      alias: "widget",

      style: function(states)
      {
        return {
          decorator: "table"
        };
      }
    },

    "table-header": {},

    "table/statusbar":
    {
      style: function(states)
      {
        return {
          decorator: "table-statusbar",
          padding: [ 0, 2 ]
        };
      }
    },

    "table/column-button":
    {
      alias: "button-frame",

      style: function(states)
      {
        return {
          decorator: "table-column-button",
          padding: 3,
          icon: "eyetheme/decoration/table/select-column-order.png"
        };
      }
    },

    "table-column-reset-button":
    {
      include: "menu-button",
      alias: "menu-button",

      style: function()
      {
        return {
          icon: "icon/16/actions/view-refresh.png"
        };
      }
    },

    "table-scroller": "widget",

    "table-scroller/scrollbar-x": "scrollbar",
    "table-scroller/scrollbar-y": "scrollbar",

    "table-scroller/header":
    {
      style: function(states)
      {
        return {
          decorator: "table-scroller-header"
        };
      }
    },

    "table-scroller/pane":
    {
      style: function(states)
      {
        return {
          backgroundColor: "table-pane"
        };
      }
    },

    "table-scroller/focus-indicator":
    {
      style: function(states)
      {
        return {
          decorator: "table-scroller-focus-indicator"
        };
      }
    },

    "table-scroller/resize-line":
    {
      style: function(states)
      {
        return {
          backgroundColor: "border-separator",
          width: 2
        };
      }
    },

    "table-header-cell":
    {
      alias: "atom",
      style: function(states)
      {
        return {
          minWidth: 13,
          minHeight: 20,
          padding: states.hovered ? [ 3, 4, 2, 4 ]: [ 3, 4 ],
          decorator: states.hovered ? "table-header-cell-hovered": "table-header-cell",
          sortIcon: states.sorted ?
          (states.sortedAscending ? "eyetheme/decoration/table/ascending.png": "eyetheme/decoration/table/descending.png")
          : undefined
        };
      }
    },

    "table-header-cell/label":
    {
      style: function(states)
      {
        return {
          minWidth: 0,
          alignY: "middle",
          paddingRight: 5
        };
      }
    },

    "table-header-cell/sort-icon":
    {
      style: function(states)
      {
        return {
          alignY: "middle",
          alignX: "right"
        };
      }
    },

    "table-header-cell/icon":
    {
      style: function(states)
      {
        return {
          minWidth: 0,
          alignY: "middle",
          paddingRight: 5
        };
      }
    },

    "table-editor-textfield":
    {
      include: "textfield",

      style: function(states)
      {
        return {
          decorator: undefined,
          padding: [ 2, 2 ],
          backgroundColor: "background-light"
        };
      }
    },

    "table-editor-selectbox":
    {
      include: "selectbox",
      alias: "selectbox",

      style: function(states)
      {
        return {
          padding: [ 0, 2 ],
          backgroundColor: "background-light"
        };
      }
    },

    "table-editor-combobox":
    {
      include: "combobox",
      alias: "combobox",

      style: function(states)
      {
        return {
          decorator: undefined,
          backgroundColor: "background-light"
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      PROGRESSIVE
    ---------------------------------------------------------------------------
    */

    "progressive-table-header":
    {
      alias: "widget",

      style: function(states)
      {
        return {
          decorator: "progressive-table-header"
        };
      }
    },

    "progressive-table-header-cell":
    {
      alias: "atom",
      style: function(states)
      {
        return {
          minWidth: 40,
          minHeight: 25,
          paddingLeft: 6,
          decorator: "progressive-table-header-cell"
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      APPLICATION
    ---------------------------------------------------------------------------
    */

    "app-header":
    {
      style: function(states)
      {
        return {
          font: "bold",
          textColor: "text-selected",
          padding: [8, 12],
          decorator: "app-header"
        };
      }
    },


    /*
    ---------------------------------------------------------------------------
      VIRTUAL WIDGETS
    ---------------------------------------------------------------------------
    */

    "virtual-list": "list",
    "virtual-list/row-layer": "row-layer",

    "row-layer":
    {
      style: function(states)
      {
        return {
          colorEven: "white",
          colorOdd: "white"
        };
      }
    },

    "column-layer": "widget",

    "cell":
    {
      style: function(states)
      {
        return {
          textColor: states.selected ? "text-selected": "text-label",
          padding: [3, 6],
          font: "default"
        };
      }
    },

    "cell-string": "cell",
    "cell-number":
    {
      include: "cell",
      style: function(states)
      {
        return {
          textAlign: "right"
        };
      }
    },
    "cell-image": "cell",
    "cell-boolean":
    {
      include: "cell",
      style: function(states)
      {
        return {
          iconTrue: "eyetheme/decoration/table/boolean-true.png",
          iconFalse: "eyetheme/decoration/table/boolean-false.png"
        };
      }
    },
    "cell-atom": "cell",
    "cell-date": "cell",
    "cell-html": "cell",



    /*
    ---------------------------------------------------------------------------
      HTMLAREA
    ---------------------------------------------------------------------------
    */

    "htmlarea":
    {
      "include": "widget",

      style: function(states)
      {
        return {
          backgroundColor: "white"
        };
      }
    },



    /*
    ---------------------------------------------------------------------------
      EyeTheme Appearances
    ---------------------------------------------------------------------------
    */
    /*
      style: function(states)
      {
        var textColor;

        return {
          decorator: "input",
          padding: [ 2, 4, 1 ],
          textColor: textColor,
          shadow: shadow,
          margin: 2
        };
      }
      */
    "searchfield": {
      style: function(states) {
        return {
          decorator: states.disabled ? "searchfield-disabled" : "searchfield",
          allowStretchY: false,
          height: 20,
          margin: [ 5, 4, 5, 5 ],
          padding: [ 1, 2, 1, 6 ]
        };
      }
    },
    "searchfield/input": {
      style: function(states) {
        return {
          textColor: states.showingPlaceholder ? "text-placeholder" : "text-window",
          font: states.showingPlaceholder ? "italic" : "default"
        };
      }
    },
    "searchfield/button": {
      style: function(states) {
        return {
          icon: 'eyetheme/decoration/form/remove.png',
          margin: [ 0, 1, 1, 0 ]
        };
      }
    },

    "standard-window":
    {
      alias: "window",

      style: function(states)
      {
        return {
          width: 700,
          height: 400,
          minWidth: 200,
          minHeight: 100,
          shadow: "shadow-window-inactive"
        };
      }
    },

    //"standard-window/menubar":
    //"standard-window/preferences-button":
    //"standard-window/preferences-separator":
    "standard-window/toolbar": {
      alias: "toolbar",
      include: "toolbar",

      style: function(states) {
        return {
          height: 40
        };
      }
    },
    "standard-window/sidebar": {
      alias: "scrollarea",

      style: function(states) {
        return {
          width: 217,
          decorator: "window-sidebar",
          scrollbarX: false
        };
      }
    },
    "standard-window/topbar-container": {
      style: function(states) {
        return {
          height: 30,
          decorator: "window-topbar"
        };
      }
    },
    "standard-window/breadcomb": {
      style: function(states) {
        return {
        //decorator: "debug-red"
        };
      }
    },
    "standard-window/content": {
      style: function(states) {
        return {
        //decorator: "debug-red"
        };
      }
    },

    "standard-window/searchfield": "searchfield",

    "breadcrumb": {
      alias: "slidebar",
      include: "slidebar",

      style: function(states) {
        return {
          font: 'small'
        };
      }
    },

    "breadcrumb/button-backward": {
      alias: "slidebar/button-backward",
      include: "slidebar/button-backward",

      style: function(states) {
        return {
          margin: [ 5, 0, 5, 5 ]
        };
      }
    },

    "breadcrumb/button-forward": {
      alias: "slidebar/button-forward",
      include: "slidebar/button-forward",

      style: function(states) {
        return {
          margin: [ 5, 0 ]
        };
      }
    },

    "breadcrumb-separator": {
      style: function(states) {
        return {
          decorator: "breadcrumb-separator",
          margin: 7,
          width: 4,
          height: 6
        };
      }
    },

    "breadcrumb-button": {
      alias: "toolbar-button",
      include: "toolbar-button",

      style: function(states) {
        var decorator;

        if (states.hovered && !states.disabled) {
          decorator = states.dragover ? "breadcrumb-button-dragover" : "breadcrumb-button-hovered";
        } else {
          decorator = undefined;
        }

        return {
          decorator: decorator
        }
      }
    },
    "breadcrumb-button/label": {
      alias: "label",
      include: "label",

      style: function(states) {
        return {
          textColor: undefined
        };
      }
    },

    "window-resize-frame": {
      style: function(states) {
        return {
          decorator: "resize-frame"
        };
      }
    },

    "dropdown": {
      style: function(states) {
        return {
          margin: [ 1, 0, 7, 0 ]
        };
      }
    },

    "dropdown/atom": {
      style: function(states) {
        var icon;
        if (states.open) {
          icon = "index.php?extern=images/arrow-down.png";
        } else {
          icon = "index.php?extern=images/arrow-up.png";
        }

        return {
          font: "bold",
          textColor: "text-header",
          icon: icon,
          gap: states.open ? 10 : 11,
          marginLeft: states.open ? 5 : 6,
          marginBottom: states.open ? 7 : 0
        };
      }
    },

    /*
     * FILES SIDEBAR
     */
    "files-sidebar-item": {
      include: "atom",

      style: function(states) {
        return {
          decorator: states.hovered ? "selected" : undefined,
          textColor: states.hovered ? "text-selected" : "text-soft",
          padding: [ 5, 5, 5, 9 ],
          gap: 6
        };
      }
    },


    'files-sidebar-fileinfo': {
      style: function(states) {
        return {
          margin: [ 0, 10 ]
        };
      }
    },

    'files-sidebar-fileinfo/title': {
      style: function(states) {
        return {
          font: 'big'
        };
      }
    },
    'files-sidebar-fileinfo/separator': {
      style: function(states) {
        return {
          decorator: "menu-separator",
          margin: [ 4, 0, 2 ],
          height: 0
        };
      }
    },
    'files-sidebar-fileinfo/type': {
      style: function(states) {
        return {
          font: "small-italic"
        };
      }
    },
    'files-sidebar-fileinfo/center-image': {
      style: function(states) {
        return {
          width: 97,
          height: 97,
          marginTop: 2,
          marginRight: 10
        };
      }
    },

    'files-sidebar-fileinfo/size-label': {
      style: function(states) {
        return {
          textColor: "text-header"
        };
      }
    },
    'files-sidebar-fileinfo/modified-label': "files-sidebar-fileinfo/size-label",
    'files-sidebar-fileinfo/created-label': "files-sidebar-fileinfo/size-label",

    'files-sidebar-fileinfo/size-value': "widget",
    'files-sidebar-fileinfo/modified-value': "widget",
    'files-sidebar-fileinfo/created-value': "widget",

    "file-sidebar-share": {
      style: function(states) {
        return {
          margin: [ 0, 10 ]
        };
      }
    },

    "file-sidebar-share/title": {
      style: function(states) {
        return {
          textColor: "text-header",
          font: 'default'
        };
      }
    },

    "file-sidebar-share/add": {
      style: function(states) {
        return {
          font: 'italic'
        };
      }
    },

    "file-sidebar-share/separator": "files-sidebar-fileinfo/separator",

    "files-sidebar-shareitem": "widget",

    "files-sidebar-shareitem/number": {
      style: function(states) {
        return {
          font: 'bold'
        };
      }
    },

    "files-sidebar-shareitem/title": {
      style: function(states) {
        return {
          margin: [ 0, 10 ]
        };
      }
    },

    "files-sidebar-shareitem/info": {
      style: function(states) {
        return {
          decorator: 'mini-info-button',
          marginRight: 5,
          width: 14,
          height: 14
        };
      }
    },

    "files-sidebar-shareitem/del": {
      style: function(states) {
        return {
          decorator: 'mini-delete-button',
          width: 14,
          height: 14
        };
      }
    },


    "files-sidebar": "widget",
    "files-sidebar/fileinfo": "files-sidebar-fileinfo",
    "files-sidebar/shared": "file-sidebar-share"
    /*
     * END FILES SIDEBAR
     */
  }
});


qx.Mixin.define("aristo.ui.window.MWindow",
{

  members:
  {
    // overridden
    _createChildControlImpl: function(id)
    {
      var control = null;
      if (id == "pane")
      {
        control = new qx.ui.container.Composite();
        control.getContentElement().removeStyle("overflowX", true);
        control.getContentElement().removeStyle("overflowY", true);
        this._add(control, {
          flex: 1
        });

      }
      return control || this.base(arguments, id);
    }
  }
});
qx.util.AliasManager.getInstance().add("decoration/table/boolean-true.png", "eyetheme/decoration/table/boolean-true.png");
qx.util.AliasManager.getInstance().add("decoration/table/boolean-false.png", "eyetheme/decoration/table/boolean-false.png");

