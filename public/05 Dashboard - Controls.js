[{
	"id": "7389836f.81aa0c",
	"type": "ui_text_input",
	"z": "a06c68fe.1bfb28",
	"name": "Send Text to Phone",
	"label": "Send Text To Phone",
	"group": "f65c264f.740e88",
	"order": 4,
	"width": 0,
	"height": 0,
	"passthru": true,
	"mode": "text",
	"delay": "0",
	"topic": "text",
	"x": 105.66665649414062,
	"y": 43.666664123535156,
	"wires": [["1a5bdd65.1c5103"]]
},
{
	"id": "1a5bdd65.1c5103",
	"type": "function",
	"z": "a06c68fe.1bfb28",
	"name": "Format Message",
	"func": "msg.eventOrCommandType = msg.topic;\nmsg.payload = JSON.stringify({\"d\":{\"text\":msg.payload}});\nreturn msg;",
	"outputs": 1,
	"noerr": 0,
	"x": 335.6666564941406,
	"y": 43.666664123535156,
	"wires": [["a6d0d3f5.7f054"]]
},
{
	"id": "a6d0d3f5.7f054",
	"type": "function",
	"z": "a06c68fe.1bfb28",
	"name": "Set deviceType/deviceID",
	"func": "var dev=global.get('device');\nmsg.deviceId=dev.deviceId;\nmsg.deviceType=dev.deviceType;\nreturn msg;",
	"outputs": 1,
	"noerr": 0,
	"x": 630.6666870117188,
	"y": 99.66666412353516,
	"wires": [["2254c9e.cdacd36",
	"6fb757f6.d04298"]]
},
{
	"id": "2254c9e.cdacd36",
	"type": "ibmiot out",
	"z": "a06c68fe.1bfb28",
	"authentication": "boundService",
	"apiKey": "",
	"outputType": "cmd",
	"deviceId": "Android",
	"deviceType": "s5mini",
	"eventCommandType": "color",
	"format": "json",
	"data": "{\"d\":{\"r\":128, \"g\":128, \"b\":128, \"a\":255}}",
	"qos": "",
	"name": "IoT App Out",
	"service": "registered",
	"x": 834.6666870117188,
	"y": 57.666664123535156,
	"wires": []
},
{
	"id": "9b59dd87.4c697",
	"type": "function",
	"z": "a06c68fe.1bfb28",
	"name": "Format Message",
	"func": "msg.eventOrCommandType = \"color\";\nmsg.payload.alpha=msg.payload.a;\nmsg.payload = JSON.stringify({d:msg.payload});\nreturn msg;",
	"outputs": 1,
	"noerr": 0,
	"x": 329.6666564941406,
	"y": 191.66665649414062,
	"wires": [["a6d0d3f5.7f054"]]
},
{
	"id": "6fb757f6.d04298",
	"type": "debug",
	"z": "a06c68fe.1bfb28",
	"name": "",
	"active": false,
	"console": "false",
	"complete": "true",
	"x": 826.6666717529297,
	"y": 152.66666412353516,
	"wires": []
},
{
	"id": "cefd3419.f48138",
	"type": "function",
	"z": "a06c68fe.1bfb28",
	"name": "Format Message",
	"func": "msg.eventOrCommandType = \"light\";\nreturn msg;",
	"outputs": 1,
	"noerr": 0,
	"x": 331.6666564941406,
	"y": 149.66665649414062,
	"wires": [["a6d0d3f5.7f054"]]
},
{
	"id": "5674ce12.905d2",
	"type": "function",
	"z": "a06c68fe.1bfb28",
	"name": "Format Message",
	"func": "msg.eventOrCommandType = \"alert\";\nmsg.payload = JSON.stringify({\"d\":{\"text\":msg.payload}});\nreturn msg;",
	"outputs": 1,
	"noerr": 0,
	"x": 331.6666564941406,
	"y": 101.66666412353516,
	"wires": [["a6d0d3f5.7f054"]]
},
{
	"id": "4f77b384.2eef8c",
	"type": "ui_colour_picker",
	"z": "a06c68fe.1bfb28",
	"name": "Select a Color",
	"label": "Color Picker",
	"group": "3ebef29b.78723e",
	"format": "rgb",
	"outformat": "object",
	"showSwatch": true,
	"showPicker": false,
	"showValue": false,
	"showAlpha": true,
	"order": 2,
	"width": "6",
	"height": "1",
	"passthru": true,
	"topic": "",
	"x": 100.66665649414062,
	"y": 193.66666412353516,
	"wires": [["9b59dd87.4c697"]]
},
{
	"id": "53b20652.5a9658",
	"type": "ui_switch",
	"z": "a06c68fe.1bfb28",
	"name": "Light Switch",
	"label": "Switch Light on or off",
	"group": "3ebef29b.78723e",
	"order": 4,
	"width": 0,
	"height": 0,
	"passthru": true,
	"topic": "",
	"style": "",
	"onvalue": "{\"d\":{\"light\":\"on\"}}",
	"onvalueType": "json",
	"onicon": "",
	"oncolor": "",
	"offvalue": "{\"d\":{\"light\":\"off\"}}",
	"offvalueType": "json",
	"officon": "",
	"offcolor": "",
	"x": 106.66665649414062,
	"y": 149.66665649414062,
	"wires": [["cefd3419.f48138"]]
},
{
	"id": "f0ec615.77996a",
	"type": "ui_text_input",
	"z": "a06c68fe.1bfb28",
	"name": "Send Alert to Phone",
	"label": "Send Alert To Phone",
	"group": "f65c264f.740e88",
	"order": 5,
	"width": 0,
	"height": 0,
	"passthru": true,
	"mode": "text",
	"delay": "0",
	"topic": "text",
	"x": 116.66665649414062,
	"y": 102.66666412353516,
	"wires": [["5674ce12.905d2"]]
},
{
	"id": "d61fd0c1.8953e",
	"type": "ui_text_input",
	"z": "a06c68fe.1bfb28",
	"name": "",
	"label": "Set Twitter Term",
	"group": "f65c264f.740e88",
	"order": 0,
	"width": 0,
	"height": 0,
	"passthru": true,
	"mode": "text",
	"delay": "0",
	"topic": "",
	"x": 97.84028625488281,
	"y": 295.638916015625,
	"wires": [["11cbfc55.bc93a4"]]
},
{
	"id": "11cbfc55.bc93a4",
	"type": "link out",
	"z": "a06c68fe.1bfb28",
	"name": "Set Twitter Term",
	"links": ["1ed353a7.5b228c"],
	"x": 267.8957977294922,
	"y": 294.8888854980469,
	"wires": []
},
{
	"id": "e4b03ffc.a09d3",
	"type": "ui_button",
	"z": "a06c68fe.1bfb28",
	"name": "",
	"group": "3ebef29b.78723e",
	"order": 5,
	"width": 0,
	"height": 0,
	"label": "Clear Device Data",
	"color": "",
	"bgcolor": "",
	"icon": "",
	"payload": "",
	"payloadType": "str",
	"topic": "",
	"x": 105.89582824707031,
	"y": 381.8888854980469,
	"wires": [["8da43563.89bab8"]]
},
{
	"id": "8da43563.89bab8",
	"type": "function",
	"z": "a06c68fe.1bfb28",
	"name": "Clear Device Data",
	"func": "var d=global.get('device');\nvar s=global.get('sensors', {});\ndelete s[d.deviceId];\nglobal.set('sensors', s);\nreturn msg;",
	"outputs": 1,
	"noerr": 0,
	"x": 328.8957977294922,
	"y": 382.8888854980469,
	"wires": [[]]
},
{
	"id": "f65c264f.740e88",
	"type": "ui_group",
	"z": "",
	"name": "Text Messages",
	"tab": "42e26214.ef271c",
	"order": 4,
	"disp": true,
	"width": "6"
},
{
	"id": "3ebef29b.78723e",
	"type": "ui_group",
	"z": "",
	"name": "Controls",
	"tab": "42e26214.ef271c",
	"order": 5,
	"disp": true,
	"width": "6"
},
{
	"id": "42e26214.ef271c",
	"type": "ui_tab",
	"z": "",
	"name": "Home",
	"icon": "dashboard"
}]