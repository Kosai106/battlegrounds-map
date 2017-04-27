/* global google */

/* PS_Bramus.GoogleMapsTileCutter Config */
var repeatOnXAxis = true; // Do we need to repeat the image on the X-axis? Most likely you'll want to set this to false

/* Helper function which normalizes the coords so that tiles can repeat across the X-axis (horizontally) like the standard Google map tiles. */
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


/* Main Core */
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
		minZoom: 2,
		maxZoom: 5,
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
		var locations = [
			['vehicle', 'a', 8.146242825034385, 61.69921875, 125],
			['vehicle', 'a', -0.5712795966325395, -14.326171875, 124],
			['vehicle', 'a', 30.562260950499443, -13.1396484375, 123],
			['vehicle', 'a', 28.265682390146477, 1.3623046875, 122],
			['vehicle', 'a', 28.613459424004418, 10.5908203125, 121],
			['vehicle', 'a', 24.487148563173424, 16.3037109375, 120],
			['vehicle', 'a', 41.244772343082076, 32.958984375, 119],
			['vehicle', 'a', 34.88593094075317, 64.0283203125, 118],
			['vehicle', 'a', 20.756113874762082, 85.95703125, 117],
			['vehicle', 'a', -20.427012814257385, 55.5908203125, 116],
			['vehicle', 'a', -49.29647160265807, 55.810546875, 115],
			['vehicle', 'a', -50.2612538275847, 56.6015625, 114],
			['vehicle', 'a', -47.04018214480665, 47.8564453125, 113],
			['vehicle', 'a', 17.97873309555617, -66.4453125, 112],
			['vehicle', 'a', 33.43144133557529, -45.1318359375, 111],
			['vehicle', 'a', 40.413496049701955, -49.5703125, 110],

			['vehicle', 'b', 16.97274101999902, 24.609375, 109],
			['vehicle', 'b', 8.233237111274565, 27.158203125, 108],
			['vehicle', 'b', 10.83330598364249, 55.458984375, 107],
			['vehicle', 'b', 18.895892559415024, 67.060546875, 106],
			['vehicle', 'b', 53.4357192066942, 71.54296875, 105],
			['vehicle', 'b', 67.30597574414466, 71.630859375, 104],
			['vehicle', 'b', 59.265880628258095, 45.966796875, 103],
			['vehicle', 'b', 65.6582745198266, 17.05078125, 102],
			['vehicle', 'b', 70.08056215839737, 41.396484375, 101],
			['vehicle', 'b', 45.76752296214988, -19.423828125, 100],
			['vehicle', 'b', 40.91351257612757, 19.8193359375, 99],
			['vehicle', 'b', 29.34387539941801, 23.0712890625, 98],
			['vehicle', 'b', 29.80251790576445, 19.599609375, 97],
			['vehicle', 'b', 21.53484700204879, 6.0205078125, 96],
			['vehicle', 'b', 15.580710739162123, -1.0107421875, 95],
			['vehicle', 'b', -16.088042220148807, -14.677734375, 94],
			['vehicle', 'b', -18.396230138028812, -6.416015625, 93],
			['vehicle', 'b', -17.26672782352052, 13.447265625, 92],
			['vehicle', 'b', -13.453737213419249, 22.587890625, 91],
			['vehicle', 'b', -29.496987596535746, 40.166015625, 90],
			['vehicle', 'b', -60.973107109199404, 48.4716796875, 89],
			['vehicle', 'b', -62.552856958572896, 28.3447265625, 88],
			['vehicle', 'b', -64.60503753178524, 10.01953125, 87],
			['vehicle', 'b', -60.99442310845613, -14.1064453125, 86],
			['vehicle', 'b', -54.59752785211386, -10.4150390625, 85],
			['vehicle', 'b', -60.45721779774395, -3.427734375, 84],
			['vehicle', 'b', -46.61926103617151, 35.771484375, 83],
			['vehicle', 'b', -44.08758502824516, 28.125, 82],
			['vehicle', 'b', -44.33956524809714, 16.962890625, 81],
			['vehicle', 'b', -41.244772343082076, 10.634765625, 80],
			['vehicle', 'b', -41.96765920367816, 1.40625, 79],
			['vehicle', 'b', -44.96479793033101, -9.755859375, 78],
			['vehicle', 'b', -34.16181816123038, -20.654296875, 77],
			['vehicle', 'b', -34.63320791137958, -31.640625, 76],
			['vehicle', 'b', -38.685509760012, -52.2509765625, 75],
			['vehicle', 'b', -18.437924653474393, -52.9541015625, 74],
			['vehicle', 'b', -12.425847783029134, -85.95703125, 73],
			['vehicle', 'b', 1.8893059628373186, -69.2138671875, 72],
			['vehicle', 'b', -0.04394530819134536, -63.4130859375, 71],
			['vehicle', 'b', 3.337953961416485, -9.7119140625, 70],
			['vehicle', 'b', 1.845383988573187, -19.423828125, 69],
			['vehicle', 'b', -6.795535025719517, -8.173828125, 68],
			['vehicle', 'b', 27.68352808378776, -11.0302734375, 67],
			['vehicle', 'b', 27.877928333679495, 5.3173828125, 66],
			['vehicle', 'b', 38.03078569382294, 28.4765625, 65],
			['vehicle', 'b', 45.920587344733654, 43.9013671875, 64],
			['vehicle', 'b', 38.71980474264237, 49.04296875, 63],
			['vehicle', 'b', 24.607069137709683, 79.3212890625, 62],
			['vehicle', 'b', 12.683214911818665, 78.3984375, 61],
			['vehicle', 'b', -3.337953961416472, 84.9462890625, 60],
			['vehicle', 'b', -13.966054081318301, 85.2099609375, 59],
			['vehicle', 'b', -15.24178985596171, 49.9658203125, 58],
			['vehicle', 'b', -22.55314747840318, 61.3037109375, 57],
			['vehicle', 'b', -22.55314747840318, 61.3037109375, 56],
			['vehicle', 'b', -54.26522407860566, 58.359375, 55],
			['vehicle', 'b', -45.49094569262731, 53.525390625, 54],
			['vehicle', 'b', -49.32512199104001, 42.978515625, 53],
			['vehicle', 'b', -58.14751859907357, 10.8544921875, 52],
	    ['vehicle', 'b', -48.34164617237459, -65.7861328125, 51],
	    ['vehicle', 'b', -45.49094569262731, -76.2451171875, 50],
	    ['vehicle', 'b', 30.486550842588482, -78.0908203125, 49],
			['vehicle', 'b', 29.76437737516313, -63.8525390625, 48],
			['vehicle', 'b', 34.05265942137599, -50.2294921875, 47],
			['vehicle', 'b', 42.65012181368023, -54.052734375, 46],
			['vehicle', 'b', 63.64625919492172, -4.6142578125, 45],
	    ['vehicle', 'b', 58.49369382056807, -90.263671875, 44],
	    ['vehicle', 'b', 60.71619779357714, -73.2568359375, 43],
	    ['vehicle', 'b', 47.694974341862824, -72.24609375, 42],
	    ['vehicle', 'b', 62.32920841458002, -15.99609375, 41],
	    ['vehicle', 'b', 58.42472975375912, -4.74609375, 40],

			['boat', 'b', -68.02402198693447, 1.3623046875, 39],
			['boat', 'b', -67.23806155909904, 21.181640625, 38],
			['boat', 'b', -64.1297836764257, 36.03515625, 37],
			['boat', 'b', -54.39335222384587, 65.2587890625, 36],
			['boat', 'b', -49.72447918871298, 64.951171875, 35],
			['boat', 'b', -44.30812668488612, 56.9091796875, 34],
			['boat', 'b', 46.195042108660154, 24.9609375, 33],
			['boat', 'b', 39.605688178320804, 16.5673828125, 32],
			['boat', 'b', 36.38591277287651, -0.52734375, 31],
			['boat', 'b', 30.44867367928756, -16.0400390625, 30],
			['boat', 'b', 27.137368359795584, -18.896484375, 29],
			['boat', 'b', 36.421282443649496, -37.177734375, 28],
			['boat', 'b', 37.1252862849668, -45.791015625, 27],
			['boat', 'b', -20.179723502765153, -101.953125, 26],
			['boat', 'b', -54.826007999094955, -73.6083984375, 25],
			['boat', 'b', -50.764259357116465, -60.4248046875, 24],
			['boat', 'b', -46.92025531537451, -56.337890625, 23],
			['boat', 'b', -45.429298732573756, -48.33984375, 22],
			['boat', 'b', -43.7710938177565, -33.486328125, 21],
			['boat', 'b', -50.95842672335992, -28.037109375, 20],
			['boat', 'b', -42.19596877629178, -17.841796875, 19],
			['boat', 'b', -41.013065787006305, -12.1728515625, 18],
			['boat', 'b', -36.42128244364948, 1.054687, 17],
			['boat', 'b', -34.41597338448186, 18.544921875, 16],
			['boat', 'b', -40.51379915504413, 38.3203125, 15],
			['boat', 'b', -24.966140159912964, 14.501953125, 14],
			['boat', 'b', -27.17646913189887, 25.5322265625, 13],
			['boat', 'b', -27.293689224852393, 51.15234375, 12],
			['boat', 'b', -29.61167011519739, 62.314453125, 11],
			['boat', 'b', 21.453068633086783, 90.615234375, 10],
			['boat', 'b', 31.39115752282472, 82.7490234375, 9],
			['boat', 'b', 49.75287993415023, 80.859375, 8],
			['boat', 'b', 55.27911529201562, 82.265625, 7],
			['boat', 'b', 56.292156685076456, 75.9814453125, 6],
			['boat', 'b', 64.73664139557683, 80.859375, 5],
			['boat', 'b', 70.80136623397624, 61.3916015625, 4],
			['boat', 'b', 72.27569349919632, 44.912109375, 3],
			['boat', 'b', 63.95667333648767, -10.2392578125, 2],
			['boat', 'b', 63.25341156651705, -77.431640625, 1]
	  ];
		 for (var i = 0; i < locations.length; i++) {
	     spot = locations[i];
	     var marker = new google.maps.Marker({
	       position: {
					 lat: spot[2],
					 lng: spot[3]
				 },
	       map: map,
				 icon: {
					 url: 'img/' + spot[0] + '-' + spot[1] + '-pin.png',
					 // This marker is 30 pixels wide by 34 pixels high.
		       scaledSize: new google.maps.Size(30, 34),
		       // The origin for this image is (0, 0).
		       origin: new google.maps.Point(0, 0),
		       // The anchor for this image is the tip of the triangle at (15, 31).
		       anchor: new google.maps.Point(15, 31)
				 },
	       title: spot[0],
				 //label: '' + spot[4],
	       zIndex: spot[4]
	     });
			 google.maps.event.addListener(marker, 'click', function(e) {
	 			map.setCenter(e.latLng);
	 			map.setZoom(6);
	 		});
	   }
 	};

	function createZone(shape, colour, radius, lat, lng) {
		if (shape === 'circle') {
			var circle = new google.maps.Circle({
				map: map,
				center: new google.maps.LatLng(lat, lng),
				radius: radius,
				fillColor: colour,
				strokeColor: colour,
				fillOpacity: 0.35,
				strokeOpacity: 1,
				strokeWeight: 2,
				draggable: true,
				editable: false,
				geodesic: true
			});
		}
		if (shape === 'polygon') {
			var polygon = new google.maps.Polygon({
				map: map,
				fillColor: colour,
				strokeColor: colour,
				fillOpacity: 0.35,
				strokeOpacity: 1,
				strokeWeight: 2,
				draggable: false,
				editable: false,
				paths: [
					{lat: -31.20340495091738, lng: 8.61328125},
					{lat: -33.578014746143985, lng: 30.9375},
					{lat: -37.996162679728116, lng: 45.87890625},
					{lat: -41.44272637767212, lng: 58.974609375},
					{lat: -48.69096039092549, lng: 68.02734375},
					{lat: -55.727110085045986, lng: 68.02734375},
					{lat: -61.77312286453145, lng: 63.544921875},
					{lat: -67.57571741708055, lng: 54.052734375},
					{lat: -68.46379955520322, lng: 36.298828125},
					{lat: -69.8396219406746, lng: 19.248046875},
					{lat: -70.05059634999756, lng: -1.23046875},
					{lat: -67.84241647327927, lng: -16.962890625},
					{lat: -63.97596090918336, lng: -28.125},
					{lat: -57.51582286553883, lng: -38.14453125},
					{lat: -50.95842672335992, lng: -35.595703125},
					{lat: -44.777935896316215, lng: -21.533203125},
					{lat: -36.3151251474805, lng: -10.01953125},
					{lat: -31.877557643340015, lng: 1.494140625}
				]
			});
		}
	}

	function setZones(x, shape, lat, lng) {
		switch(x) {
			case 'a':
				return createZone(shape, '#00BFFF', 500000, lat, lng);
				break;
			case 'b':
				return createZone(shape, '#FED112', 750000, lat, lng);
				break;
			case 'c':
				return createZone(shape, '#FF4747', 1500000, lat, lng);
				break;
		};
	};

	/*setZones('a', 'circle', 73.02259157147301, 106.875);
	setZones('b', 'circle', 61.037012232401864, 45.791015625);
	setZones('c', 'circle', 1.7575368113083254, -42.5390625);
	setZones('c', 'polygon', 1.7575368113083254, -42.5390625);*/

	function circlePath(circleObj) {
		var numPts = 32;
		var path = [];
		for (var i = 0; i < numPts; i++) {
			path.push(google.maps.geometry.spherical.computeOffset(
				circleObj.getCenter(),
				circleObj.getRadius(),
				i * 360 / numPts
			));
		}
		return path;
	}



	setMarkers(map);
	// Development functionality
	var marker = new google.maps.Marker({
		map: map
	});
	// /*
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
	// */

	$("#reset").click(function() {
  	map.setCenter(new google.maps.LatLng(0, 0));
		map.setZoom(2);
	});
	$("#hide").click(function() {
		marker.setVisible(false);
	});

}


$(document).ready(function() {
	var viewportHeight = $(document).height();
	var viewportWidth = $(document).width();
	function mapHeightDevice() {
		$('#map-container')
			.css('height', viewportHeight)
			.css('width', viewportWidth);
	}
	$(window).resize(function() {
		mapHeightDevice();
	});
	$(window).trigger('resize');
})
