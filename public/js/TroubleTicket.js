/*eslint-env jquery, browser*/
/*globals ajaxErr msg*/
function TroubleTicket(_elemName) {
	var list=$('#'+_elemName+"-list-list");
	var detail=$('#'+_elemName+"-detail-list");
	var thiz=this;
	var ws;
	function displayOneTTOK(tt) {
		var k, v;
		try {
			var html="";
			for (k in tt) {
				if (k==="href") continue;
				v=tt[k];
				try { v=JSON.stringify(v, null, 4);}catch(e) {}
				html += "<tr class='tt-border'><td class='tt-border'>"+k+"</td><td class='tt-border'>"+v+"</td></tr>";
			}
			detail.removeClass('tt-High tt-Medium tt-Low').html(html).addClass('tt-'+tt.severity);
		} catch(e) {
			msg("TroubleTicket::displayOneTTOK", JSON.stringify(e, null, 4));
		}
	}
	function displayOneTT(e) {
		var tt=e.currentTarget.id.replace(/^vmtt-/, "");
		   $.ajax({
            url: "/ttickets?id="+tt,
            success: displayOneTTOK,
            error:ajaxErr
        });
	}
	
	function getTroubleTicketsOK(tts) {
		var html="";
		var i,l=Math.min(10, tts.length);
		list.html('');
		tts.sort(function(a, b) {
				if (a.creationDate < b.creationDate) return 1;
				if (a.creationDate > b.creationDate) return -1;
				return 0;
		});
		var tt;
		for (i=0; i<l; i++) {
			tt=tts[i];
			var severity=(tt.severity !== undefined)?tt.severity:""
			html+="<li id='vmtt-"+tt.id+"' class='tt-"+severity+"'>"+tt.creationDate+":"+tt.description+"</li>";
		}
		list.html(html);
		for (i=0; i<l; i++) {
			tt=tts[i];
			$('#vmtt-'+tt.id).on('click', displayOneTT);
		}
	}
	this.getTroubleTickets=function () {
		   $.ajax({
            url: "/ttickets?filter=type=VendingMachineAlert&fields=id,severity,creationDate,description",
            success: getTroubleTicketsOK,
            error:ajaxErr
        });
	};
	//
	// web socket
	function wsopen() {
        msg("TroubleTicket", "Web Socket openened\n");
    }
    function wsclose() {
        msg("TroubleTicket", "Web Socket closed\n");
        window.setTimeout(wsinit, 2000);
    }
    function wserror(err) {
        msg("TroubleTicket", "Web Socket in error "+JSON.stringify(err, null, 4)+"\n");
        window.setTimeout(wsinit, 2000);
    }
    function wsmessage(evt) {
        msg("TroubleTicket", "<hr style='text-align:center; width:50%' />"+evt.data+"\n");
		thiz.getTroubleTickets();
    }

	function wsinit() {
        ws = new WebSocket('wss://'+$(document)[0].location.hostname+'/tmelab/newtt');
        ws.onopen=wsopen;
        ws.onclose=wsclose;
        ws.onerror=wserror;
        ws.onmessage=wsmessage;

    }
    wsinit();
	thiz.getTroubleTickets();
}