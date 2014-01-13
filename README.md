[![Build Status](https://travis-ci.org/mapbox/geojson-summary.png)](https://travis-ci.org/mapbox/geojson-summary)

# geojson-summary

Generate a plain-english summary of what is in a GeoJSON file.

## install

    npm install geojson-summary

## api

### `summary(geojson, options)`

Given a GeoJSON object, return an object with `sentence` (string) and
`parts` (array of strings) members describing the object.

Options:

* `types`: an object of type to name mappings like the default:

```js
{
    Point: [' point', ' points'],
    Polygon: [' polygon', ' polygons'],
    LineString: [' line', ' lines']
}
```

## example

```js
summary([{
    type: 'Feature',
    properties: {},
    geometry: { "type": "Polygon",
      "coordinates": [
        [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
        ]
     }
}])

// Returns:
/*
{
    sentence: '1 polygon',
    parts: ['1 polygon']
}
*/
```
