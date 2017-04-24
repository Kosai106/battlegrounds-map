/* global google */

/*
 * = PS_Bramus.GoogleMapsTileCutter Config
 * ----------------
 */

var repeatOnXAxis = true; // Do we need to repeat the image on the X-axis? Most likely you'll want to set this to false



/*
 * Helper function which normalizes the coords so that tiles can repeat across the X-axis (horizontally) like the standard Google map tiles.
 * ----------------
 */

function getNormalizedCoord(coord, zoom) {
	if (!repeatOnXAxis) return coord;

	var y = coord.y;
	var x = coord.x;

	// tile range in one direction range is dependent on zoom level
	// 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
	var tileRange = 1 << zoom;

	// don't repeat across Y-axis (vertically)
	if (y < 0 || y >= tileRange) {
		return null;
	}

	// repeat across X-axis
	if (x < 0 || x >= tileRange) {
		x = (x % tileRange + tileRange) % tileRange;
	}

	return {
		x: x,
		y: y
	};

}


/*
 * Main Core
 * ----------------
 */

window.onload = function() {

	// Define our custom map type
	var customMapType = new google.maps.ImageMapType({
		getTileUrl: function(coord, zoom) {
			var normalizedCoord = getNormalizedCoord(coord, zoom);
			if (normalizedCoord && (normalizedCoord.x < Math.pow(2, zoom)) && (normalizedCoord.x > -1) && (normalizedCoord.y < Math.pow(2, zoom)) && (normalizedCoord.y > -1)) {
				return 'img/' + zoom + '_' + normalizedCoord.x + '_' + normalizedCoord.y + '.jpg';
			} else {
				return 'img/empty.jpg';
			}
		},
		tileSize: new google.maps.Size(256, 256),
		maxZoom: 5,
		name: 'PS_Bramus.GoogleMapsTileCutter'
	});

	// Basic options for our map
	var myOptions = {
		center: new google.maps.LatLng(0, 0),
		zoom: 2,
		minZoom: 0,
		fullscreenControl: true,
		streetViewControl: false,
		mapTypeControl: false,
		mapTypeControlOptions: {
			mapTypeIds: ["custom"]
		},
		backgroundColor: '#1d3d4f'
	};

	// Init the map and hook our custom map type to it
	var map = new google.maps.Map(document.getElementById('map'), myOptions);
	map.mapTypes.set('custom', customMapType);
	map.setMapTypeId('custom');

	var spot;
	function setMarkers(map) {
		var image = {
      url: 'https://www.dunelondon.com/mobile/images/core/pin-concession.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };
		var locations = [
			['Car spawn', 3.337953961416485, -9.7119140625, 46],
			['Car spawn', 1.845383988573187, -19.423828125, 45],
			['Car spawn', -0.5712795966325395, -14.326171875, 44],
			['Car spawn', -6.795535025719517, -8.173828125, 43],
			['Car spawn', 30.562260950499443, -13.1396484375, 42],
			['Car spawn', 29.03696064855827, -9.1845703125, 41],
			['Car spawn', 28.265682390146477, 1.3623046875, 40],
			['Car spawn', 27.877928333679495, 5.3173828125, 39],
			['Car spawn', 28.613459424004418, 10.5908203125, 38],
			['Car spawn', 24.487148563173424, 16.3037109375, 37],
			['Car spawn', 38.03078569382294, 28.4765625, 36],
			['Car spawn', 41.244772343082076, 32.958984375, 35],
			['Car spawn', 45.920587344733654, 43.9013671875, 34],
			['Car spawn', 38.71980474264237, 49.04296875, 33],
			['Car spawn', 34.88593094075317, 64.0283203125, 32],
			['Car spawn', 24.607069137709683, 79.3212890625, 31],
			['Car spawn', 20.756113874762082, 85.95703125, 30],
			['Car spawn', 12.683214911818665, 78.3984375, 29],
			['Car spawn', -3.337953961416472, 84.9462890625, 28],
			['Car spawn', -13.966054081318301, 85.2099609375, 27],
			['Car spawn', -15.24178985596171, 49.9658203125, 26],
			['Car spawn', -22.55314747840318, 61.3037109375, 25],
			['Car spawn', -20.427012814257385, 55.5908203125, 24],
			['Car spawn', -22.55314747840318, 61.3037109375, 23],
			['Car spawn', -49.29647160265807, 55.810546875, 22],
			['Car spawn', -50.2612538275847, 56.6015625, 21],
			['Car spawn', -54.26522407860566, 58.359375, 20],
			['Car spawn', -45.49094569262731, 53.525390625, 19],
			['Car spawn', -47.04018214480665, 47.8564453125, 18],
			['Car spawn', -49.32512199104001, 42.978515625, 17],
			['Car spawn', -58.14751859907357, 10.8544921875, 16],
	    ['Car spawn', -48.34164617237459, -65.7861328125, 15],
	    ['Car spawn', -45.49094569262731, -76.2451171875, 14],
	    ['Car spawn', 18.521283325496277, -66.6650390625, 13],
	    ['Car spawn', 31.353636941500987, -77.7392578125, 12],
	    ['Car spawn', 33.43144133557529, -45.1318359375, 11],
			['Car spawn', 29.76437737516313, -63.8525390625, 10],
			['Car spawn', 34.05265942137599, -50.2294921875, 9],
			['Car spawn', 40.413496049701955, -49.5703125, 8],
			['Car spawn', 43.644025847699496, -53.1298828125, 7],
			['Car spawn', 63.43086021267811, -2.7685546875, 6],
	    ['Car spawn', 58.49369382056807, -90.263671875, 5],
	    ['Car spawn', 61.14323525084058, -73.1689453125, 4],
	    ['Car spawn', 48.48748647988415, -72.7734375, 3],
	    ['Car spawn', 62.32920841458002, -15.99609375, 2],
	    ['Car spawn', 58.60833366077633, -3.1201171875, 1]
	  ];
		 for (var i = 0; i < locations.length; i++) {
	     spot = locations[i];
	     var marker = new google.maps.Marker({
	       position: {
					 lat: spot[1],
					 lng: spot[2]
				 },
	       map: map,
				 icon: image,
	       title: spot[0],
	       zIndex: spot[3]
	     });
			 google.maps.event.addListener(marker, 'click', function(e) {
	 			map.setCenter(e.latLng);
	 			map.setZoom(6);
	 		});
	   }
 	}

	setMarkers(map);




	//marker.setVisible(true);

	var circle1;
	var circle2;
	var circleOptions = {
		map: map,
		center: new google.maps.LatLng(0, 0),
		radius: 0,
		fillColor: 'FFFFFF',
		strokeColor: 'FFFFFF',
		fillOpacity: 0,
		strokeOpacity: 0,
		strokeWeight: 0,
		draggable: false,
		editable: false,
		geodesic: false
	}
	var circle1 = new google.maps.Circle(circleOptions);
	var circle2 = new google.maps.Circle(circleOptions);

	mapClick();

	function mapClick(e) {
		google.maps.event.addListener(map, 'click', function(e) {
			circle1.setMap(null);
			circle2.setMap(null);
			placeCircle(e.latLng);
			console.log('Location: ' + e.latLng);
		});
	}

	$("#reset").click(function() {
  	map.setCenter(new google.maps.LatLng(0, 0));
		map.setZoom(2);
	});
	$("#hide").click(function() {
		marker.setVisible(false);
	})

}
