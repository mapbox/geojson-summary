var comma = require('comma-number');

module.exports = function(gj, options) {
    var features = gj.features || gj;
    options = options || {};

    var types = options.types || {
        Point: [' point', ' points'],
        MultiPoint: [' multipoint', ' multipoints'],
        Polygon: [' polygon', ' polygons'],
        MultiPolygon: [' multipolygon', ' multipolygons'],
        LineString: [' line', ' lines'],
        MultiLineString: [' multiline', ' multilines'],
        GeometryCollection: [' geometry collection', ' geometry collections']
    };

    var counts = {
        Point: 0,
        MultiPoint: 0,
        Polygon: 0,
        MultiPolygon: 0,
        LineString: 0,
        MultiLineString: 0,
        GeometryCollection: 0
    };

    for (var i = 0; i < features.length; i++) {
        if (features[i].geometry && features[i].geometry.type &&
            typeof counts[features[i].geometry.type] == 'number') {
            counts[features[i].geometry.type]++;
        }
    }

    var parts = [];

    for (var k in counts) {
        if (counts[k]) {
            parts.push(comma(counts[k]) + ((counts[k] > 1) ? types[k][1] : types[k][0]));
        }
    }

    var sentence = '';
    var oxford = parts.length > 2 ? ',' : '';

    if (parts.length > 1) {
        sentence = parts.slice(0, parts.length - 1).join(', ') +
            oxford +
            ' and ' +
            parts[parts.length - 1];
    } else if (parts.length === 1) {
        sentence = parts[0];
    } else {
        sentence = '0 features';
    }

    return {
        parts: parts,
        sentence: sentence
    };
};
