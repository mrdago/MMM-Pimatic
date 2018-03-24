# Module: MMM-Pimatic
This [MagicMirror](https://github.com/MichMich/MagicMirror) module, connects to a [pimatic](https://pimatic.org/) home automation server to listen on device attribute changes and displays changes as notifications. Temperature values can be displayed in a separate table.

Notification Board:

![Magic-Mirror Module MMM-M1-Pimatic - Notification Board](https://github.com/mrdago/MMM-M1-Pimatic/blob/master/NotificationBoard.PNG?raw=true)

Temperature Board:

![Magic-Mirror Module MMM-M1-Pimatic - Notification Board](https://github.com/mrdago/MMM-M1-Pimatic/blob/master/Temperatures.JPG?raw=true)

## Dependencies
- An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
- [socket.io-client](https://www.npmjs.com/package/socket.io-client)
- A active pimatic home automation server (see also [pimatic websocket-API](https://pimatic.org/guide/api/))


## Installation

Navigate into your MagicMirror's `modules` folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/mrdago/MMM-Pimatic.git
```

Navigate to the new `MMM-Pimatic` folder and install the node dependencies.
```
npm install
```

Configure the module in your `config.js` . You can find an example configuration in file `config.js-Pimatic`.

## Using the module

Pimatic devices of interest for the notification board need to be defined in file`config/config.js`. The following example include three devices.
```javascript
{
	module: 'MMM-Pimatic',
	header: 'Pimatic Notification Board',
	position: 'top_center',
	config: {
		host :'pimatic',
		port : 80,
		user : 'YourPimaticLoginUser',
		passwd : 'YourPimaticLoginUserPassword',
		style: 'notifications',
		devices: [
			{ 
				name: 'Alarmanlage',
				icon: 'icon-Alarmanlage',
				attributeName: 'Alarmanlage.contact',
				defaultValue: false,
				notification : 'Eingeschaltet'
			},
			{
				name: 'Termine',
				icon: 'icon-Termine',
				attributeName: 'dTermine.Termine',
				defaultValue: 'keine',
				notification: '@'
			},
			{
				name: 'Wohnzimmer Steckdose 15 (Test)',
				icon: 'icon-Default',
				attributeName: 'wallplug15.state',
				defaultValue: false,
				notification: 'eingeschaltet'
			},                    
		],
	},
},
```

## Configuration options

The following properties needs to be configured:

|Option|Description|
|---|---|
|`host`| hostname/IP of your pimatic home automation server.|
|`port`| port to connect to your pimatic server.<br><br>Possible values:</b> number configured in <code>config.json</code> of your pimatic installation|
|`user`| user login name configured in <code>config.json</code> of your pimatic installation|
|`passwd`| passwd of your specified pimatic user login name|
|`style`|The style to use for displaying the changes<br><br> Possible values: `notifications` for the notification board or  `temperatures` for the temperature board|
|`devices`| List of devices and related device attributes to display. Each device specification consists of:<br>**name:**  string to display as first line in the notification board. You can choose a name independent from the pimatic device definition.<br>**icon:**  icon name defined in style sheet file `MMM-Pimatc.css`. You can design your own icons by editing the `icon-pimatic.png` file under directory icons.<br>**attributeName** pimatic device attributeName.  The `attributeName` consist of a pimatic deviceId and a related attribute. Go to the pimatic GUI and find valid device attribute names under `Menu - Variables - Device Attributes`.<br>**defaultValue:** default device attribute value. A new received device attribute value is compared to the `defaultValue`. In case that the new value differ from the default value, the message defined in `notification` is shown in the notification board.<br>**notification:**  message to show on the notification board.<br>Possible values: `string` or `@`. In case of `@` the received value of the device attribute is shown in the notification board.<br>|
