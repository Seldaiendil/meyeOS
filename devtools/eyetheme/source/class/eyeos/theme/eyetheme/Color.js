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

/**
 * EyeTheme color theme
 */
qx.Theme.define("eyeos.theme.eyetheme.Color",
{
	colors:
	{
	
		/** Backgrounds **/

		"background-application": "#EDEDED",
		"background-menu": "#FFFFFF",
		"background-hover-menu": "#8497A5",
		"background-hover": "#8497A5",
		"background-toolbar": "#EDEDED",
		"background-light": "#EDEDED",
		"background-submenu": "#FFFFFF",
		"background-field": "#FFFFFF",

		/** Borders */
		
		"border-panel": "#DCDCDC",
		"border-application": "#DEDEDE",
		"border-light": "#d1d1d1",
		"border-medium": "#888888",
		"border-menu": "#DEDEDE",
		"border-bar": "#CCCCCC",
		"border-bar-light": "#DCDCDC",
		"border-bar-double": "#FFFFFF",
		"border-tabview": "#adadad",
		"border-submenu": "#C9CCCA",
		

		/** Font Colors */

		"text-application": "#333333",
		"text-window": "#333333",
		"text-window-inactive": "#999999",
		"text-light": "#555555",
		"text-active": "#FFFFFF",
		"text-disabled": "#A7A7A7",
		"text-inactive": "#333333",
		"text-selected": "#FFFFFF",
		"text-submenu": "#333333",
		"text-menu": "#333333",
		"text-hover-menu": "#FFFFFF",
		"text-inactive-tabview": "#444444",
		"text-inactive-switcher": "#FFFFFF",

		/** Others */
		"field-border": "#A8A8A8",

		/** Aristo old styles  (for compatibility issues) **/

		"text-label": "#333333",
		"text-hovered": "#4f4f4f",
		"text-placeholder": "#999999",
		"text-selected": "#FFFFFF",
		"text-input": "#4f4f4f",
		"text-title": "#2a4d60",
		"text-header": "#8497A5",
		"text-soft": "#666666",

		"invalid": "#c82c2c",

		"border-light": "#d1d1d1",
		"border-main": "#949494",
		"border-input": "#d1d1d1",
		"border-separator": "#808080",

		
		"background-item-selected": "#5f83b9",
		"background-splitpane": "#AFAFAF",
		"background-toolbar": "#d4d4d4",
		"background-dark": "#949494",

		"background-medium": "#c2c2c2",
		"background-tip": "#b8def5",
		"background-pane": "#F3F3F3",
		"background-splitpane": "#AFAFAF",
		"background-odd": "#E4E4E4",
		"background-panel": "#ECF0F2",
		"background-hover": "#8497A5",

		/** Table Color **********************************/

		// equal to "background-pane"
		"table-pane": "#F3F3F3",

		// own table colors
		// "table-row-background-selected" and "table-row-background-focused-selected"
		// are inspired by the colors of the selection decorator
		"table-focus-indicator": "#0880EF",
		"table-row-background-focused-selected": "#5f83b9",
		"table-row-background-focused": "#80B4EF",
		"table-row-background-selected": "#5f83b9",

		// equal to "background-pane" and "background-odd"
		"table-row-background-even": "#F3F3F3",
		"table-row-background-odd": "#E4E4E4",

		// equal to "text-selected" and "text-label"
		"table-row-selected": "#fffefe",
		"table-row": "#1a1a1a",

		// equal to "border-collumn"
		"table-row-line": "#CCCCCC",
		"table-column-line": "#CCCCCC",


		/** Progresive table colors **********************/

		"progressive-table-header": "#AAAAAA",

		"progressive-table-row-background-even": "#F4F4F4",
		"progressive-table-row-background-odd": "#E4E4E4",

		"progressive-progressbar-background": "gray",
		"progressive-progressbar-indicator-done": "#CCCCCC",
		"progressive-progressbar-indicator-undone": "white",
		"progressive-progressbar-percent-background": "gray",
		"progressive-progressbar-percent-text": "white"
	}
});
