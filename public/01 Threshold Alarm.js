[{
	"id": "70ddccfb.8174c4",
	"type": "ibmiot in",
	"z": "f9073dd1.a935",
	"authentication": "boundService",
	"apiKey": "",
	"inputType": "evt",
	"deviceId": "s5mini",
	"applicationId": "",
	"deviceType": "+",
	"eventType": "+",
	"commandType": "",
	"format": "json",
	"name": "From phone",
	"service": "registered",
	"allDevices": true,
	"allApplications": "",
	"allDeviceTypes": true,
	"allEvents": true,
	"allCommands": "",
	"allFormats": "",
	"qos": 0,
	"x": 79,
	"y": 83,
	"wires": [["533e6620.83b228"]]
},
{
	"id": "533e6620.83b228",
	"type": "function",
	"z": "f9073dd1.a935",
	"name": "Retrieve and normalize Y-Acceleration",
	"func": "var dy=Math.abs(msg.payload.d.acceleration_y);\nif (msg.deviceId==\"iPhone\") dy=dy*10;\ndy=Math.floor(dy*100)/100;\nvar ts=new Date().toString().substr(0, 21);\nreturn {payload: dy, deviceId:msg.deviceId, deviceType:msg.deviceType, ts:ts};",
	"outputs": 1,
	"noerr": 0,
	"x": 349.99998474121094,
	"y": 84,
	"wires": [["d91dcd0d.05adc"]]
},
{
	"id": "d91dcd0d.05adc",
	"type": "switch",
	"z": "f9073dd1.a935",
	"name": "Check Acceleration Threshold on Y Axis",
	"property": "payload",
	"propertyType": "msg",
	"rules": [{
		"t": "gte",
		"v": "0.5",
		"vt": "str"
	}],
	"checkall": "false",
	"outputs": 1,
	"x": 743.9999694824219,
	"y": 83,
	"wires": [["d75750f.f1726b"]]
},
{
	"id": "d75750f.f1726b",
	"type": "template",
	"z": "f9073dd1.a935",
	"name": "Wow! Falling",
	"field": "payload",
	"fieldType": "msg",
	"format": "handlebars",
	"syntax": "mustache",
	"template": "A message from #NodeRed as of {{ts}}. \nAttention: {{deviceType}} {{deviceId}} acceleration threshold crossed!\n",
	"x": 113,
	"y": 149,
	"wires": [["13073a3e.088cd6"]]
},
{
	"id": "13073a3e.088cd6",
	"type": "delay",
	"z": "f9073dd1.a935",
	"name": "Do not Spam",
	"pauseType": "rate",
	"timeout": "5",
	"timeoutUnits": "seconds",
	"rate": "1",
	"nbRateUnits": "1",
	"rateUnits": "minute",
	"randomFirst": "1",
	"randomLast": "5",
	"randomUnits": "seconds",
	"drop": true,
	"x": 422.99998474121094,
	"y": 157,
	"wires": [["82fc4304.09462",
	"51741ba6.f53e54"]]
},
{
	"id": "82fc4304.09462",
	"type": "twitter out",
	"z": "f9073dd1.a935",
	"twitter": "",
	"name": "Tweet",
	"x": 810.9999847412109,
	"y": 151,
	"wires": []
},
{
	"id": "51741ba6.f53e54",
	"type": "link out",
	"z": "f9073dd1.a935",
	"name": "Tweets-Out",
	"links": ["652259d.05727a8"],
	"x": 792.9999847412109,
	"y": 204,
	"wires": []
}]