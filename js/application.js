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
      url: 'img/vehicle-pin.svg',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(26, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };
		var locations = [
			['Car spawn', 16.97274101999902, 24.609375, 83],
			['Car spawn', 8.233237111274565, 27.158203125, 82],
			['Car spawn', 10.83330598364249, 55.458984375, 81],
			['Car spawn', 18.895892559415024, 67.060546875, 80],
			['Car spawn', 53.4357192066942, 71.54296875, 79],
			['Car spawn', 67.30597574414466, 71.630859375, 78],
			['Car spawn', 59.265880628258095, 45.966796875, 77],
			['Car spawn', 65.6582745198266, 17.05078125, 76],
			['Car spawn', 70.08056215839737, 41.396484375, 75],
			['Car spawn', 45.76752296214988, -19.423828125, 74],
			['Car spawn', 40.91351257612757, 19.8193359375, 73],
			['Car spawn', 29.34387539941801, 23.0712890625, 72],
			['Car spawn', 29.80251790576445, 19.599609375, 71],
			['Car spawn', 21.53484700204879, 6.0205078125, 70],
			['Car spawn', 15.580710739162123, -1.0107421875, 69],
			['Car spawn', -16.088042220148807, -14.677734375, 68],
			['Car spawn', -18.396230138028812, -6.416015625, 67],
			['Car spawn', -17.26672782352052, 13.447265625, 66],
			['Car spawn', -13.453737213419249, 22.587890625, 65],
			['Car spawn', -29.496987596535746, 40.166015625, 64],
			['Car spawn', -60.973107109199404, 48.4716796875, 63],
			['Car spawn', -62.552856958572896, 28.3447265625, 62],
			['Car spawn', -64.60503753178524, 10.01953125, 61],
			['Car spawn', -60.99442310845613, -14.1064453125, 60],
			['Car spawn', -54.59752785211386, -10.4150390625, 59],
			['Car spawn', -60.45721779774395, -3.427734375, 58],
			['Car spawn', -46.61926103617151, 35.771484375, 57],
			['Car spawn', -44.08758502824516, 28.125, 56],
			['Car spawn', -44.33956524809714, 16.962890625, 57],
			['Car spawn', -41.244772343082076, 10.634765625, 56],
			['Car spawn', -41.96765920367816, 1.40625, 55],
			['Car spawn', -44.96479793033101, -9.755859375, 54],
			['Car spawn', -34.16181816123038, -20.654296875, 53],
			['Car spawn', -34.63320791137958, -31.640625, 52],
			['Car spawn', -38.685509760012, -52.2509765625, 51],
			['Car spawn', -18.437924653474393, -52.9541015625, 50],
			['Car spawn', -12.425847783029134, -85.95703125, 49],
			['Car spawn', 1.8893059628373186, -69.2138671875, 48],
			['Car spawn', -0.04394530819134536, -63.4130859375, 47],
			['Car spawn', 3.337953961416485, -9.7119140625, 46],
			['Car spawn', 1.845383988573187, -19.423828125, 45],
			['Car spawn', -0.5712795966325395, -14.326171875, 44],
			['Car spawn', -6.795535025719517, -8.173828125, 43],
			['Car spawn', 30.562260950499443, -13.1396484375, 42],
			['Car spawn', 27.68352808378776, -11.0302734375, 41],
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
	    ['Car spawn', 17.97873309555617, -66.4453125, 13],
	    ['Car spawn', 30.486550842588482, -78.0908203125, 12],
	    ['Car spawn', 33.43144133557529, -45.1318359375, 11],
			['Car spawn', 29.76437737516313, -63.8525390625, 10],
			['Car spawn', 34.05265942137599, -50.2294921875, 9],
			['Car spawn', 40.413496049701955, -49.5703125, 8],
			['Car spawn', 42.65012181368023, -54.052734375, 7],
			['Car spawn', 63.64625919492172, -4.6142578125, 6],
	    ['Car spawn', 58.49369382056807, -90.263671875, 5],
	    ['Car spawn', 60.71619779357714, -73.2568359375, 4],
	    ['Car spawn', 47.694974341862824, -72.24609375, 3],
	    ['Car spawn', 62.32920841458002, -15.99609375, 2],
	    ['Car spawn', 58.42472975375912, -4.74609375, 1]
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
				 //label: '' + spot[3],
	       zIndex: spot[3]
	     });
			 google.maps.event.addListener(marker, 'click', function(e) {
	 			map.setCenter(e.latLng);
	 			map.setZoom(6);
	 		});
	   }
 	}

	setMarkers(map);


	// Development functionality
	var marker = new google.maps.Marker({
		map: map
	});
	/*
	function mapClick(e) {
		google.maps.event.addListener(map, 'click', function(e) {
			marker.setMap(null);
			placePin(e.latLng);
			console.log('Location: ' + e.latLng);
		});
	};
	function placePin(e) {
		marker = new google.maps.Marker({
			position: e,
			map: map
		})
		return marker;
	};
	mapClick();
	*/

	$("#reset").click(function() {
  	map.setCenter(new google.maps.LatLng(0, 0));
		map.setZoom(2);
	});
	$("#hide").click(function() {
		marker.setVisible(false);
	});

}
