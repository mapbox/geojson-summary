var test = require('tape').test,
    summary = require('../');

test('basic geojson', function(t) {

    t.deepEqual(summary([]), {
        sentence: '0 features',
        parts: []
    }, 'empty case');

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
    }, '1 polygon');

    var oneThousandMarkers = [];

    for (var i = 0; i < 1000; i++) {
      oneThousandMarkers.push({
          type: 'Feature',
          properties: {},
          geometry: {
            "type": "Point",
            "coordinates": [100.0, 0.0]
          }
      });
    }

    t.deepEqual(summary({
        type: 'FeatureCollection',
        features: oneThousandMarkers
    }, {
        types: {
            Point: [' marker', ' markers']
        }
    }), {
        sentence: '1,000 markers',
        parts: ['1,000 markers']
    }, '1,000 markers');

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
    }, '1 marker');

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
    }, 'mixed');

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
            geometry: { "type": "MultiPolygon",
              "coordinates": [
                [[ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
                ]]
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
            geometry: { "type": "MultiPoint", "coordinates": [[100.0, 0.0]] }
        },
        {
            type: 'Feature',
            properties: {},
            geometry: { "type": "Point", "coordinates": [100.0, 0.0] }
        },
        {
            type: 'Feature',
            properties: {},
            geometry: { "type": "MultiLineString",
              "coordinates": [[ [100.0, 0.0], [101.0, 1.0] ]]
              }
        },
        {
            type: 'Feature',
            properties: {},
            geometry: { "type": "LineString",
              "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]
              }
        }
    ]), {
        sentence: '1 point, 1 multipoint, 2 polygons, 1 multipolygon, 1 line, and 1 multiline',
        parts: ['1 point', '1 multipoint', '2 polygons', '1 multipolygon', '1 line', '1 multiline']
    });

    t.deepEqual(summary({
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [0, 0]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "MultiPoint",
          "coordinates": [[40, -20], [80, 20]]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "LineString",
          "coordinates": [[40, 20], [80, -20]]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [[[-50, -10], [-40, 10], [-30, -10], [-50, -10]]]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "MultiLineString",
          "coordinates": [
            [[-10, -7.5], [-10, 7.5]],
            [[10, -7.5], [10, 7.5]],
            [[-7.5, -10], [7.5, -10]],
            [[-7.5, 10], [7.5, 10]]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "MultiPolygon",
          "coordinates": [
            [[[-50, 60], [-50, 80], [-30, 80], [-30, 60], [-50, 60]]],
            [[[-20, 60], [-20, 80], [0, 80], [0, 60], [-20, 60]]],
            [[[10, 60], [10, 80], [30, 80], [30, 60], [10, 60]]]
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "GeometryCollection",
          "geometries": [
            {
              "type": "LineString",
              "coordinates": [[-50, -50], [0, -50]]
            },
            {
              "type": "Point",
              "coordinates": [40, -50]
            },
            {
              "type": "Polygon",
              "coordinates": [[[10, -60], [20, -40], [30, -60], [10, -60]]]
            }
          ]
        }
      }
    ]
  }), {
        sentence: '1 point, 1 multipoint, 1 polygon, 1 multipolygon, 1 line, 1 multiline, and 1 geometry collection',
        parts: ['1 point', '1 multipoint', '1 polygon', '1 multipolygon', '1 line', '1 multiline', '1 geometry collection']
    }, 'geometry collection support');

    t.end();
});
