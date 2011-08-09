/* ************************************************************************
    Extension of eyeTheme modified by Seldaiendil

    Authors:
      * Seldaiendil (seldaiendil2 AT gmail DOT com)

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
 * The EyeTheme font theme.
 */
qx.Theme.define("eye.theme.eyetheme.Font",
{
  fonts:
  {
    "default":
    {
      size: 13,
      lineHeight: 1.3,
      family: [ "Arial", "Tahoma", "Verdana", "Bitstream Vera Sans", "Liberation Sans" ]
    },

    "italic":
    {
      size: 13,
      lineHeight: 1.3,
      family: [ "Arial", "Tahoma", "Verdana", "Bitstream Vera Sans", "Liberation Sans" ],
      italic: true
    },

    "bold":
    {
      size: 13,
      lineHeight: 1.3,
      family: [ "Arial", "Tahoma", "Verdana", "Bitstream Vera Sans", "Liberation Sans" ],
      bold: true
    },

    "small":
    {
      size: 11,
      lineHeight: 1.4,
      family: [ "Arial", "Tahoma", "Verdana", "Bitstream Vera Sans", "Liberation Sans" ]
    },

    "small-italic":
    {
      size: 11,
      lineHeight: 1.4,
      family: [ "Arial", "Tahoma", "Verdana", "Bitstream Vera Sans", "Liberation Sans" ],
      italic: true
    },

    "big":
    {
      size: 14,
      lineHeight: 1.4,
      family: [ "Arial", "Tahoma", "Verdana", "Bitstream Vera Sans", "Liberation Sans" ]
    },

    "monospace":
    {
      size: 12,
      lineHeight: 1.4,
      family: [ "Courier New", "DejaVu Sans Mono", "monospace" ]
    }
  }
});
