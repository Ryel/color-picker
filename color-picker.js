'use strict';

var json = require('./colors.json');

var colorPicker = {

  config : {
    debug : false
  },

  normalize : function(dirtyColorName){
    var name = dirtyColorName
                .toLowerCase()
                // remove numbers, special characters, and spaces
                .replace(/[^A-Za-z]+/g, '');
    return name;
  },

  textToHex : function(colorName){
    var name = colorPicker.normalize(colorName);
    var hex = '';
    for(var key in json.colors){
      if (json.colors[key].title === name) {
        hex = json.colors[key].hex;
        return hex;
      }
    }
  },

  rgbToHex : function(r, g, b){
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },

  // http://stackoverflow.com/a/5624139
  // colorPicker.hexToRgb('#FFFFFF')
  hexToRgb : function(hex){
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  },

  // https://gist.github.com/mjackson/5311256
  rgbToHsl : function(r, g, b){
    r /= 255, g /= 255, b /= 255;

      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if (max == min) {
        h = s = 0; // achromatic
      } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
      }

      return [ h, s, l ];
  }

}
