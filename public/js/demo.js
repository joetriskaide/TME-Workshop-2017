/*globals DevChart DevLocation DevList DeviceLocation TroubleTicket*/
/*eslint-env browser, jquery*/
var demo;
var myDev=null, myDevType=null;
function Demo() {
	var devlist, devchart, devlocation, troubleticket, actuator;
	
	
	function getDataOK(data) {
		var mydata=null;
		if (myDev !== null && data[myDev] !== undefined) {
				var myData=data[myDev].data;
				// devlist.update(myData);
				devchart.draw(myDev, myData);
				devlocation.show(myDev, myData);
		}
        window.setTimeout(getData, 2000);
    }
    
    function getData() {
        $.ajax({
            url:"/tmelab/sensor",
            success:getDataOK,
            error:ajaxErr
        });
    }
 
	function deviceChanged(newdev) {
		myDev=myDevType=null;
		try {
			var d=JSON.parse(newdev);
			myDev=d.i;
			myDevType=d.t;
		} catch(e) {
			msg('Demo::deviceChanged', JSON.stringify(e, null, 4));
		}
	}

	devlist=new DevList('device-panel', deviceChanged);
	devchart=new DevChart('chart-panel');
	devlocation=new DeviceLocation('device-location-map');
	troubleticket=new TroubleTicket('ticket');
	actuator=new Actuator('remote-control');
	getData();	
}
function start() {
	demo=new Demo();
	msg("Demo", "Demo started");
}
	//
	// display message window with log/error
	//
	function msg(title, text) {
		console.log('['+title+'] '+text);
		$('#msg-title').html(title);
		$('#msg-text').html(text);
		$('#msg').fadeIn();
		window.setTimeout(function(){
			$('#msg').fadeOut();
		}, 10000);
	}
	function ajaxErr(err) {
	    msg("Network Error", JSON.stringify(err, null, 4));
	};
$(document).ready(start);