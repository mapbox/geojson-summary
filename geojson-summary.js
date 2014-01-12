!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.geojsonSummary=e():"undefined"!=typeof global?global.geojsonSummary=e():"undefined"!=typeof self&&(self.geojsonSummary=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(gj) {
    var features = gj.features || gj;

    var types = {
        Point: [' point', ' points'],
        Polygon: [' polygon', ' polygons'],
        LineString: [' line', ' lines']
    };

    var counts = {
        Point: 0,
        Polygon: 0,
        LineString: 0
    };

    for (var i = 0; i < features.length; i++) {
        if (typeof counts[features[i].geometry.type] == 'number') {
            counts[features[i].geometry.type]++;
        }
    }

    var parts = [];

    for (var k in counts) {
        if (counts[k]) {
            parts.push(counts[k] + ((counts[k] > 1) ? types[k][1] : types[k][0]));
        }
    }

    var sentence = '';

    switch (parts.length) {
        case 3:
            sentence = parts[0] + ', ' + parts[1] + ', and ' + parts[2];
            break;
        case 2:
            sentence = parts[0] + ' and ' + parts[1];
            break;
        case 1:
            sentence = parts[0];
            break;
    }

    return {
        parts: parts,
        sentence: sentence
    };
};

},{}]},{},[1])
(1)
});
;