/*globals L */
/*eslint-env jquery */
function DeviceLocation(_elemName) {
	var elemName=_elemName;
	var elemmap=$('#'+_elemName);
	var elemtxt=$('#'+_elemName.replace(/-map$/, '-txt'));

	var thiz=this;
	var map, marker, haveData, hadData=false;
	this.show=function(name, data) {
		var l = data.length-1;
		var d=data[l].d;
		haveData=d.lat !== undefined && d.lon !== undefined && d.lat !== 0 && d.lon !== 0;
		if (haveData) {
			marker.setLatLng([d.lat, d.lon]);
			map.panTo([d.lat, d.lon]);
		}
	
		if (!hadData && haveData) {
			elemtxt.hide();
			elemmap.show();
		} else if (hadData && !haveData) {
			elemtxt.show();
			elemmap.hide();
		}
		hadData=haveData;

	};

	map = L.map(elemName).setView([51.505, -0.09], 13);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
	
	marker=L.marker([51.5, -0.09]);
	marker.addTo(map);
}