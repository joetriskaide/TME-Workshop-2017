/*eslint-env browser, jquery*/
/*globals google ajaxErr*/
function DevChart(_elemName) {
	var elemName='#'+_elemName;
	var chart=null;
	var thiz=this;
	var activeDev=null;
	var opts={	curveType: 'function',
				legend: { position: 'bottom', textStyle: { color:"lightyellow"}},
				hAxis: { textStyle: { color:"lightyellow"}},
				vAxis: { textStyle: { color:"lightyellow"}},
				animation: {startup:10000, easing:'inAndOut'},
				backgroundColor:'#333333',
				titleTextStyle:{color:"white"},
				width:"100%",
				height:450
				};

    function prepareChart() {
        $('#charts').hide();
 		chart=new google.visualization.LineChart(document.getElementById(elemName.substr(1)+'-chart'));
    }
    
    this.draw=function(dev, mydata) {
        var i, l, s;
        
        if (chart !== null) {
           // draw lines
            var table  = [['Num', 'X', "Y", "Z", "Roll", "Yaw", "Pitch"]];
            l=mydata.length;
            for (i=0; i<l; i++) {
                s=mydata[i].d;
                table.push([i+1, s.acceleration_x, s.acceleration_y, s.acceleration_z, s.roll, s.yaw, s.pitch]);
            }
            opts.title=dev;
            chart.draw(google.visualization.arrayToDataTable(table), opts);
		}
    };
    google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(prepareChart);
}