//
// manage actuator on IoT sarter App
//
/*eslint-env jquery */
/*globals myDeviceType myDevType:true myDev:true ajaxErr*/
function Actuator(elemName) {
	var light=$('#'+elemName+"-switch");	
	var text=$('#'+elemName+"-text");
	var notify=$('#'+elemName+"-notify");
	

	
	function handlelAnyOK() {
	}
	function handleAny(cmd, val) {
		$.ajax({
			url:"/tmelab/set",
			method:"post",
			data:{f:cmd, val:val,deviceId:myDev, deviceType:myDevType },
			success:handlelAnyOK,
			error:ajaxErr
		});
	}
	function handleLight() {
		handleAny('light', {light:$(light).prop('checked')?"off":"on"});
	}
	function handleText() {
		handleAny('text', $(text).val());
	}
	function handleNotify() {
		handleAny('alert', $(notify).val());
	}

	light.on('click', handleLight);
	text.on('click', handleText);
	notify.on('click', handleNotify);
}