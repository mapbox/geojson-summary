module.exports = function(gj, options) {
    var features = gj.features || gj;
    options = options || {};

    var types = options.types || {
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
        if (features[i].geometry && features[i].geometry.type &&
            typeof counts[features[i].geometry.type] == 'number') {
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
