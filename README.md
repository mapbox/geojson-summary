# geojson-summary

Generate a plain-english summary of what is in a GeoJSON file.

## install

    npm install geojson-summary

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
