geojson-summary.js: index.js
	browserify -s geojsonSummary index.js > geojson-summary.js
