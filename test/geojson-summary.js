var test = require('tape').test,
    summary = require('../');

test('basic geojson', function(t) {

    t.deepEqual(summary([{
        type: 'Feature',
        properties: {},
        geometry: { "type": "Polygon",
          "coordinates": [
            [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
            ]
         }
    }]), {
        sentence: '1 polygon',
        parts: ['1 polygon']
    });

    t.deepEqual(summary([{
        type: 'Feature',
        properties: {},
        geometry: { "type": "Point",
          "coordinates": [100.0, 0.0]
        }
    }], {
        types: {
            Point: [' marker', ' markers']
        }
    }), {
        sentence: '1 marker',
        parts: ['1 marker']
    });

    t.deepEqual(summary([
        {
            type: 'Feature',
            properties: {},
            geometry: { "type": "Polygon",
              "coordinates": [
                [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
                ]
             }
        },
        {
            type: 'Feature',
            properties: {},
            geometry: { "type": "Polygon",
              "coordinates": [
                [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
                ]
             }
        },
        {
            type: 'Feature',
            properties: {},
            geometry: { "type": "Point", "coordinates": [100.0, 0.0] }
        }
    ]), {
        sentence: '1 point and 2 polygons',
        parts: ['1 point', '2 polygons']
    });

    t.deepEqual(summary([
        {
            type: 'Feature',
            properties: {},
            geometry: { "type": "Polygon",
              "coordinates": [
                [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
                ]
             }
        },
        {
            type: 'Feature',
            properties: {},
            geometry: { "type": "Polygon",
              "coordinates": [
                [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
                ]
             }
        }
    ]), {
        sentence: '2 polygons',
        parts: ['2 polygons']
    });

    t.deepEqual(summary([
        {
            type: 'Feature',
            properties: {},
            geometry: { "type": "Polygon",
              "coordinates": [
                [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
                ]
             }
        },
        {
            type: 'Feature',
            properties: {},
            geometry: { "type": "Polygon",
              "coordinates": [
                [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
                ]
             }
        },
        {
            type: 'Feature',
            properties: {},
            geometry: { "type": "Point", "coordinates": [100.0, 0.0] }
        },
        {
            type: 'Feature',
            properties: {},
            geometry: { "type": "LineString",
              "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]
              }
        }
    ]), {
        sentence: '1 point, 2 polygons, and 1 line',
        parts: ['1 point', '2 polygons', '1 line']
    });

    t.end();
});
