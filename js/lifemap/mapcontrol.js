var map = L.map('map', {zoomControl: false, attributionControl: false});
function setmaplayer(tolUrl) {
	if (map.hasLayer(tol)) map.removeLayer(tol)
	if (map.hasLayer(SPfocus)) map.removeLayer(SPfocus)
	$("#searchinput").val(''); //remove what was in the search box when changing tree. 
	var tol = new L.TileLayer(tolUrl, {minZoom: 2, maxZoom: 42, detectRetina:false, attribution: '<span id="attrib"><b>Lifemap</b> pour l\'exposition \" Espèces de climat\" (2021) || Auteur : Damien de Vienne, CNRS, Univ-Lyon 1, LBBE | Données : NCBI | Contributeurs : Simon Penel, Bruno Spataro, Stéphane Delmotte | Leaflet.js</span>'});
	map.addControl(L.control.attribution({
        position: 'bottomright',
        prefix: ''
    }));
	map.addLayer(tol);
	map.setView([-5,0], 5);
}
//setmaplayer('http://lifemap.univ-lyon1.fr/retina_tiles/{z}/{x}/{y}.png');
map.on("moveend", function() {
	CreatePopUps();
})
/*map.on("click", function() {
	$("#searchinput").blur();
	$("#searchinput2").blur();
	$("#searchinput3").blur();
	//we also decide to toggle route information with a simple click. 
	if (whichpage===1) {
		$("#route-top").toggle();
		if (map.hasLayer(polyline))	$("#route-bottom").toggle();
			//and also the itinerary button;				
		$("#route").toggle();
		$("#logohelp").toggle();
	}
	else {
		$("#mainsearch").toggle();
		$("#route").toggle();
		$("#logohelp").toggle();
	}
})
*/

var SPfocus = L.marker([0,0]);
var pointA = new L.LatLng(0,0);
var pointB = new L.LatLng(1,1);
var pointList = [pointA, pointB];
var polyline = L.polyline(pointList);
var markersRoute = new L.FeatureGroup();
var markers = new L.FeatureGroup();
//VISUAL ELEMENTS (LOGOS, IMAGES, etc...)
var circl = L.icon({
	iconUrl: 'img/circl.png',
	iconSize:     [10, 10], // size of the icon
	iconAnchor:   [5, 5], // point of the icon which will correspond to marker's location
});
var mark = L.icon({
	iconUrl: 'img/mark.png',
	iconSize:     [40, 40], // size of the icon
	iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
});
var pin1 = L.icon({
	iconUrl: 'img/pin1.png',
	iconSize:     [18, 25], // size of the icon
	iconAnchor:   [9, 30], // point of the icon which will correspond to marker's location
});
var pin2 = L.icon({
	iconUrl: 'img/pin2.png',
	iconSize:     [18, 25], // size of the icon
	iconAnchor:   [9, 30], // point of the icon which will correspond to marker's location
});
var pin3 = L.icon({
	iconUrl: 'img/pin3.png',
	iconSize:     [18, 25], // size of the icon
	iconAnchor:   [9, 30], // point of the icon which will correspond to marker's location
});
