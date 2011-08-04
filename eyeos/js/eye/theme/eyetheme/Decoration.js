/* ************************************************************************
   Extension of Aristo theme modified by eyeOS

   Authors:
     * A. Matias Quezada (amatiasq AT gmail DOT com)
     * Ramon Lamana (rlamana AT gmail DOT com)

/* ************************************************************************

   Copyright:
     2010 Guilherme R. Aiolfi

   License:
     LGPL: http: //www.gnu.org/licenses/lgpl.html
     EPL: http: //www.eclipse.org/org/documents/epl-v10.php

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
 * The EyeTheme decoration theme.
 */
qx.Theme.define("eye.theme.eyetheme.Decoration",
{


  decorations:
  {
    "main":
    {
      decorator: qx.ui.decoration.Uniform,

      style:
      {
        width: 1,
        color: "border-main"
      }
    },
    /*
    ---------------------------------------------------------------------------
      BUTTON
    ---------------------------------------------------------------------------
    */

    "button":
    {
      decorator: qx.ui.decoration.Grid,

      style:
      {
        baseImage: "eyetheme/decoration/form/button.png",
        insets: 2
      }
    },

    "button-hovered":
    {
      decorator: qx.ui.decoration.Grid,

      style:
      {
        baseImage: "eyetheme/decoration/form/button-hovered.png",
        insets: 2
      }
    },
    "button-pressed":
    {
      decorator: qx.ui.decoration.Grid,

      style:
      {
        baseImage: "eyetheme/decoration/form/button-pressed.png",
        insets: 2
      }
    },

    "button-checked":
    {
      decorator: qx.ui.decoration.Grid,

      style:
      {
        baseImage: "eyetheme/decoration/form/button-checked.png",
        insets: 2
      }
    },

    "button-disabled":
    {
      decorator: qx.ui.decoration.Grid,

      style:
      {
        baseImage: "eyetheme/decoration/form/button-disabled.png",
        insets: 2
      }
    },

    "button-red":
    {
      decorator: qx.ui.decoration.Grid,

      style:
      {
        baseImage: "eyetheme/decoration/form/button-red.png",
        insets: 2
      }
    },

    "button-green":
    {
      decorator: qx.ui.decoration.Grid,

      style:
      {
        baseImage: "eyetheme/decoration/form/button-green.png",
        insets: 2
      }
    },

    /*********************************
     * SHADOW
     * ****************************** */

    "shadow":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/shadow/shadow.png",
        insets: 3
      }
    },

    "shadow-window-inactive":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/shadow/shadow-window.png",
        insets: [ 4, 9, 12, 8 ]
      }
    },

    "shadow-window-active":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/shadow/shadow-window-active.png",
        insets: [ 4, 8, 12, 8 ]
      }
    },

    "shadow-top-bar":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/shadow/shadow-big.png",//"eyetheme/decoration/shadow/shadow-small.png",
        insets: [ 0, 5, 10, 5 ]
      }
    },

    "shadow-big":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/shadow/shadow-big.png",//"eyetheme/decoration/shadow/shadow-window-active.png",
        insets: [ 3, 6, 8, 6 ]//insets: [ 5, 8, 10, 8 ]
      }
    },

    "shadow-strong":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/shadow/shadow-strong.png",
        insets: [ 0, 5, 8, 5 ]
      }
    },

    "red-shadow":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/shadow/red-shadow.png",
        insets: 3
      }
    },

    "green-shadow":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/shadow/green-shadow.png",
        insets: 3
      }
    },

    "gray-shadow":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/shadow/gray-shadow.png",
        insets: 3
      }
    },

    "shadow-popup":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/shadow/shadow-big.png",//"eyetheme/decoration/shadow/shadow-small.png",
        insets: [ 0, 5, 8, 5 ]
      }
    },


    /**********************************
     * INPUT
     * *********************************/

    "input":
    {
      decorator: qx.ui.decoration.Beveled,

      style:
      {
        outerColor: "border-input",
        innerColor: "white",
        innerOpacity: 0.5,
        backgroundImage: "eyetheme/decoration/form/input.png",
        backgroundRepeat: "repeat-x",
        backgroundColor: "white"
      }
    },

    "list":
    {
      decorator: qx.ui.decoration.Single,
      style:
      {
        width: 1,

        color: "#b8b8b8",
        style: "solid"
      }
    },


    "selected":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundColor: "background-hover"
      }
    },


    "scrollbar-horizontal":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: "eyetheme/decoration/scrollbar/scrollbar-bg-horizontal.png",
        backgroundRepeat: "repeat-x"
      }
    },

    "scrollbar-vertical":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: "eyetheme/decoration/scrollbar/scrollbar-bg-vertical.png",
        backgroundRepeat: "repeat-y"
      }
    },

    "scroll-bt-up":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: "eyetheme/decoration/scrollbar/scrollbar-bg-button-t.png"
      }
    },
    "scroll-bt-down":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: "eyetheme/decoration/scrollbar/scrollbar-bg-button-b.png"
      }
    },
    "scroll-bt-up-focused":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: "eyetheme/decoration/scrollbar/scrollbar-bg-button-focused-t.png"
      }
    },

    "scroll-bt-down-focused":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: "eyetheme/decoration/scrollbar/scrollbar-bg-button-focused-b.png"
      }
    },














    "scroll-bt-left":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: "eyetheme/decoration/scrollbar/scrollbar-bg-button-l.png"
      }
    },
    "scroll-bt-right":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: "eyetheme/decoration/scrollbar/scrollbar-bg-button-r.png"
      }
    },
    "scroll-bt-left-focused":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: "eyetheme/decoration/scrollbar/scrollbar-bg-button-focused-l.png"
      }
    },

    "scroll-bt-right-focused":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: "eyetheme/decoration/scrollbar/scrollbar-bg-button-focused-r.png"
      }
    },





    "scrollbar-slider-vertical":
    {
      decorator: qx.ui.decoration.VBox,

      style: {
        baseImage: "eyetheme/decoration/scrollbar/scrollbar-button-bg-vertical.png",
        insets: [8, 0, 8, 0]
      }
    },

    "scrollbar-slider-horizontal":
    {
      decorator: qx.ui.decoration.HBox,

      style: {
        baseImage: "eyetheme/decoration/scrollbar/scrollbar-button-bg-horizontal.png",
        insets: [0, 8, 0, 8]
      }
    },



    /*
     --------------------------------------------------------------------------
       SLIDER
     --------------------------------------------------------------------------
     */

    "slider-vertical":
    {
      decorator: qx.ui.decoration.VBox,

      style: {
        baseImage: "eyetheme/decoration/form/slider-vertical.png",
        insets: [10, 0]
      }
    },
    "slider-horizontal":
    {
      decorator: qx.ui.decoration.HBox,

      style: {
        baseImage: "eyetheme/decoration/form/slider-horizontal.png",
        insets: [0, 10, 0, 10]
      }
    },

    "slider-knob":
    {
      decorator: qx.ui.decoration.Background,

      style: {
        backgroundImage: "eyetheme/decoration/form/radiobutton-checked.png"
      }
    },

    "slider-knob-focused":
    {
      decorator: qx.ui.decoration.Background,

      style: {
        backgroundImage: "eyetheme/decoration/form/radiobutton-checked-focused.png"
      }
    },

    "slider-knob-disabled":
    {
      decorator: qx.ui.decoration.Background,

      style: {
        backgroundImage: "eyetheme/decoration/form/radiobutton-checked-disabled.png"
      }
    },

    /*
    ---------------------------------------------------------------------------
      WINDOW
    ---------------------------------------------------------------------------
    */

    "window":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "white"

        //width: 1,
        //color: "border-main",
        //widthTop: 0
      }
    },

    "window-captionbar":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/window/captionbar.png"
      }
    },

    "window-statusbar":
    {
      decorator: qx.ui.decoration.Double,

      style: {
        backgroundColor: "background-application",
        widthTop: 1,
        colorTop: "border-bar",
        innerWidthTop: 1,
        innerColorTop: "white"
      }
    },

    "table-statusbar":
    {
      decorator: qx.ui.decoration.Single,

      style: {
        backgroundColor: "background-light",
        widthTop: 1,
        colorTop: "border-light",
        styleTop: "solid"
      }
    },



    /*
    ---------------------------------------------------------------------------
      TOOLBAR
    ---------------------------------------------------------------------------
    */

    "toolbar":
    {
      decorator: qx.ui.decoration.Double,

      style:
      {
        backgroundColor: "background-light",
        innerColor: "border-bar-double",
        color: "border-bar-light",
        innerWidthBottom: 1,
        widthBottom: 1
      }
    },

    "toolbar-window":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundImage: "eyetheme/decoration/toolbar/toolbar-gradient.png",
        backgroundRepeat: "scale",
        color: "border-main",
        widthBottom: 1
      }
    },

    "toolbar-button-hovered":
    {
      decorator: qx.ui.decoration.Beveled,

      style:
      {
        outerColor: "border-main",
        innerColor: "#d1d1d1",
        backgroundImage: "eyetheme/decoration/form/button-disabled-c.png",
        backgroundRepeat: "scale"
      }
    },

    "toolbar-button-checked":
    {
      decorator: qx.ui.decoration.Beveled,

      style:
      {
        outerColor: "border-main",
        innerColor: "#d1d1d1",
        backgroundImage: "eyetheme/decoration/form/button-checked-c.png",
        backgroundRepeat: "scale"
      }
    },

    "toolbar-separator":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        widthLeft: 1,
        widthRight: 1,

        colorLeft: "#b8b8b8",
        colorRight: "#f4f4f4",

        styleLeft: "solid",
        styleRight: "solid"
      }
    },

    "toolbar-part":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: "eyetheme/decoration/toolbar/toolbar-part.gif",
        backgroundRepeat: "repeat-y"
      }
    },


    /*
    ---------------------------------------------------------------------------
      MENU
    ---------------------------------------------------------------------------
    */

    "menu":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-menu"
      }
    },

    "menu-big":
    {
      decorator: [
        qx.ui.decoration.MBorderRadius,
          qx.ui.decoration.MSingleBorder,
          qx.ui.decoration.MBackgroundColor
        ],

      style:
      {
        radiusBottomLeft : 5,
        radiusBottomRight : 5,
          width : 1,
          widthTop : 0,
          color : "#AAAAAA",
        backgroundColor: "background-menu"
      }
    },

    "menu-separator":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        widthTop: 1,
        colorTop: "#C5C5C5",

        widthBottom: 1,
        colorBottom: "#FAFAFA"
      }
    },


    /*
    ---------------------------------------------------------------------------
      MENU BAR
    ---------------------------------------------------------------------------
    */

    "menubar":
    {
      decorator: qx.ui.decoration.Double,

      style:
      {
        backgroundColor: '#EDEDED',

        innerColor: "border-bar-light",
        color: "border-bar-double",
        innerWidthBottom: 1,
        widthBottom: 1
      }
    },

    "menu-selected":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundColor: "background-dark"
      }
    },


    "blank":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "white"
      }
    },

    /*
    ---------------------------------------------------------------------------
      TOOLTIP
    ---------------------------------------------------------------------------
    */

    "tooltip-error":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tooltip/tooltip-error.png",
        insets: [ 2, 5, 5, 2 ]
      }
    },


    "tooltip-error-arrow":
    {
      decorator: qx.ui.decoration.Background,

      style: {
        backgroundImage: "eyetheme/decoration/tooltip/tooltip-error-arrow.png",
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
        insets: [0, 0, 0, 10]
      }
    },

    /*
     ------------------------------------------------------------------------
      GROUPBOX
     ------------------------------------------------------------------------
     */
    "group":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/groupbox/groupbox.png"
      }
    },

    /*
    ---------------------------------------------------------------------------
      TABLIST
    ---------------------------------------------------------------------------
    */

    "tablist-page-button-active":
    {
      decorator: qx.ui.decoration.Uniform,

      style: {
        backgroundColor: "background-hover"
      }
    },

    "tablist-page-button-inactive":
    {
      decorator: qx.ui.decoration.Uniform,

      style: {

      }
    },

    "tablist-pane":
    {
      decorator: qx.ui.decoration.Double,

      style:
      {
        /*width: 1,
        color: "border-tabview",
        innerWidthTop: 1,
        innerColorTop: "white"*/

      }
    },

    "tablist-bar-right":
    {
      decorator: qx.ui.decoration.Single,
      style: {
        widthRight: 1,
        colorRight: "border-panel"
      }
    },

    "tablist-bar-left":
    {
      decorator: qx.ui.decoration.Single,
      style: {
        widthLeft: 1,
        colorLeft: "border-panel"
      }
    },

    /*
    ---------------------------------------------------------------------------
      SWITCHER
    ---------------------------------------------------------------------------
    */

     // Inner button
    "switcher-page-button-active":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tabview/switcher-button-active.png"
      }
    },

    "switcher-page-button-inactive":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tabview/switcher-button-inactive.png"
      }
    },

    // First button
    "switcher-page-first-button-active":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tabview/switcher-first-button-active.png"
      }
    },

    "switcher-page-first-button-inactive":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tabview/switcher-first-button-inactive.png"
      }
    },

    // Last button
    "switcher-page-last-button-active":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tabview/switcher-last-button-active.png"
      }
    },

    "switcher-page-last-button-inactive":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tabview/switcher-last-button-inactive.png"
      }
    },

    "switcher-pane":
    {
      decorator: qx.ui.decoration.Double,

      style:
      {
        /*width: 1,
        color: "border-tabview",
        innerWidthTop: 1,
        innerColorTop: "white"*/

      }
    },

    /*
    ---------------------------------------------------------------------------
      TABVIEW
    ---------------------------------------------------------------------------
    */

    "tabview-pane":
    {
      decorator: qx.ui.decoration.Double,

      style:
      {
        width: 1,
        color: "border-tabview",
        innerWidthTop: 1,
        innerColorTop: "white"

      }
    },

    "tabview-bar":
    {
      decorator: qx.ui.decoration.Single,
      style: {
        //widthBottom: 1,
        //colorBottom: "border-tabview"
      }
    },

    "tabview-page":
    {
      decorator: qx.ui.decoration.Double,
      style: {
      }
    },

    "tabview-page-button-top-active":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tabview/tab-button-top-active.png"
      }
    },

    "tabview-page-button-top-inactive":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tabview/tab-button-top-inactive.png"
      }
    },

    "tabview-page-button-bottom-active":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tabview/tab-button-bottom-active.png"
      }
    },

    "tabview-page-button-bottom-inactive":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tabview/tab-button-bottom-inactive.png"
      }
    },

    "tabview-page-button-left-active":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tabview/tab-button-left-active.png"
      }
    },

    "tabview-page-button-left-inactive":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tabview/tab-button-left-inactive.png"
      }
    },

    "tabview-page-button-right-active":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tabview/tab-button-right-active.png"
      }
    },

    "tabview-page-button-right-inactive":
    {
      decorator: qx.ui.decoration.Grid,

      style: {
        baseImage: "eyetheme/decoration/tabview/tab-button-right-inactive.png"
      }
    },
    "keyboard-focus":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        width: 1,
        color: "black",
        style: "dotted"
      }
    },

    "pane":
    {
      decorator: qx.ui.decoration.Grid,

      style:
      {
        baseImage: "eyetheme/decoration/pane/pane.png",
        insets: [0, 2, 3, 0]
      }
    },

    /*
    ---------------------------------------------------------------------------
      SPLITPANE
    ---------------------------------------------------------------------------
    */

    "splitpane":
    {
      decorator: qx.ui.decoration.Uniform,

      style:
      {
        backgroundColor: "background-pane",

        width: 3,
        color: "background-splitpane",
        style: "solid"
      }
    },

    /*
    ---------------------------------------------------------------------------
      TABLE
    ---------------------------------------------------------------------------
    */

    "table":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        width: 1,
        color: "border-main",
        style: "solid"
      }
    },

    "table-scroller-header":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundImage: "eyetheme/decoration/table/header-cell.png",
        backgroundRepeat: "scale",

        widthBottom: 1,
        colorBottom: "border-main",
        style: "solid"
      }
    },

    "table-header-cell":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        widthRight: 1,
        colorRight: "border-separator",
        styleRight: "solid"
      }
    },


    "table-header-cell-hovered":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        widthRight: 1,
        colorRight: "border-separator",
        styleRight: "solid",

        widthBottom: 1,
        colorBottom: "white",
        styleBottom: "solid"
      }
    },

    "table-column-button":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundImage: "eyetheme/decoration/table/header-cell.png",
        backgroundRepeat: "scale",

        widthBottom: 1,
        colorBottom: "border-main",
        style: "solid"
      }
    },

    "table-scroller-focus-indicator":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        width: 2,
        color: "table-focus-indicator",
        style: "solid"
      }
    },


    /*
    ---------------------------------------------------------------------------
      PROGRESSIVE
    ---------------------------------------------------------------------------
    */

    "progressive-table-header":
    {
       decorator: qx.ui.decoration.Single,

       style:
       {
         width: 1,
         color: "border-main",
         style: "solid"
       }
    },

    "progressive-table-header-cell":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundImage: "eyetheme/decoration/table/header-cell.png",
        backgroundRepeat: "scale",

        widthRight: 1,
        colorRight: "#F2F2F2",
        style: "solid"
      }
    },


    /*
    ---------------------------------------------------------------------------
      EyeTheme Decorations
    ---------------------------------------------------------------------------
    */

    "window-sidebar":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-panel",
        color: "#DCDCDC",
        width: [0, 1, 0, 0]
      }
    },

    "window-topbar":
    {
      decorator: qx.ui.decoration.Single,

      style:
      {
        backgroundColor: "background-panel",
        color: "#C5E0EB"
      }
    },

    "searchbar":
    {
      decorator: qx.ui.decoration.Background,
      style:
      {
        backgroundImage: 'eyetheme/decoration/searchbar-background.png',
        backgroundRepeat: 'repeat-x'
      }
    },

    "searchfield":
    {
      decorator : [
        qx.ui.decoration.MBorderRadius,
        qx.ui.decoration.MSingleBorder,
        qx.ui.decoration.MBackgroundColor
      ],

      style:
      {
        backgroundColor: "white",
        color: "field-border",
        radius: 10,
        width: 1
      }
    },

    "breadcrumb-separator":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: "index.php?extern=images/laflecha.png",
        backgroundRepeat: "no-repeat",
        backgroundPositionY: "center"
      }
    },

    "breadcrumb-button-hovered": {
      include: "toolbar-button-hovered"
    },

    "breadcrumb-button-dragover":
    {
      include: "toolbar-button-hovered",

      style:
      {
        outerColor: "#b9d07f",
        innerColor: "#74a100"
      }
    },

    "resize-frame":
    {
      decorator: qx.ui.decoration.Single,
      style:
      {
        color: "border-medium",
        width: 1
      }
    },

    "mini-info-button":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: 'index.php?extern=images/info.png',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center'
      }
    },

    "mini-delete-button":
    {
      decorator: qx.ui.decoration.Background,

      style:
      {
        backgroundImage: 'index.php?extern=images/Remove.png',
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center'
      }
    },

    "debug-red":
    {
      decorator: qx.ui.decoration.Uniform,

      style:
      {
        width: 2,
        color: "red"
      }
    },

    "debug-green":
    {
      decorator: qx.ui.decoration.Double,
      style: {
        width: 2,
        color: "green"
      }
    },

    "debug-blue":
    {
      decorator: qx.ui.decoration.Double,
      style: {
        width: 2,
        color: "blue"
      }
    }
  }
});
