# Module: MMM-Pimatic
This [MagicMirror](https://github.com/MichMich/MagicMirror) module connects to a [pimatic](https://pimatic.org/) home automation server to listen on device attribute changes. Received values are compared to a default value and differing values are displayed as notifications on the MagicMirror screen in a **Notification Board**. Optional an audio alarm can be triggered. As example, in case of an received emergency alarm a sirene (mp3) can be played in endless loop by omxplayer (see example in config.json).<br>

**Notification Board:**

![Magic-Mirror Module MMM-M1-Pimatic - Notification Board](https://github.com/mrdago/MMM-Pimatic/blob/master/NotificationBoard.PNG?raw=true)

The same modul can also be used to monitor pimatic temperature values displayed in a separate table (Temperature Board).

**Temperature Board:**

![Magic-Mirror Module MMM-M1-Pimatic - Notification Board](https://github.com/mrdago/MMM-Pimatic/blob/master/Temperatures.JPG?raw=true)
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

Configure the module in your MagicMirror configuration file `config.js` . You can find an example configuration for the Pimatic module in file `config.js-Pimatic`.

## Using the module

Pimatic devices of interest for the notification board need to be defined in the MagicMirror config file``config.js``. The following example include three devices.
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
    }
},    
{
    module: 'MMM-Pimatic',
    header: 'Temperaturen',
    position: 'bottom_center',
    config: {
        host :'pimatic',
        port : 80,
        user : 'YourPimaticUserLoginName',
        passwd : 'YourPimaticUserLoginPassword',
        style: 'temperatures',
        unit: '&deg',
        devices: [
            {
              name: 'Wohnzimmer',
              attributeName: 'Temperaturen.Wohnzimmer',
            },
            { 
              name: 'Aussen',
              attributeName: 'ThermiComPuffer.T7',
            },                     
            {
              name: 'Puffer',
              attributeName: 'ThermiComPuffer.T6',
            },
            {
              name: 'Gaskessel',
              attributeName: 'ThermiComKessel.T9',
            },                    
            { 
              name: 'Kollektor',
              attributeName: 'ThermiComPuffer.T1',
            },
        ]
    }
},
```

## Configuration options

The following properties needs to be configured:

|Option|Description|
|---|---|
|`host`|Hostname/IP of your pimatic home automation server.|
|`port`|Port to connect to your pimatic server, configured in ``config.json`` of your **pimatic installation**|
|`user`|User login name configured in ``config.json`` of your **pimatic installation**|
|`passwd`|Passwd of your specified pimatic user login name|
|`style`|The style to use for displaying values<br>**Possible values:**  ``notifications`` for the Notification Board or  ``temperatures`` for the Temperature Board|
|`devices`| List of devices and related device attributes to monitor by the modul. Each device specification consists of:<br><br>**name:**  `type: string` to display as the first line of the message placed in the notification board. You can choose a name independent from the pimatic device definition.<br><br>**notification:**  text to show as the second line of the message placed in the Notification Board<br>Possible values:  `static text` or place holder `@`. The place holder `@` is replaced by the the received value of the device attribute and displayed in the notification board.<br><br>**icon:**  icon to show in front of the notification. Icon names are defined in style sheet file `MMM-Pimatc.css`. Check the style sheet file for use of blinking icons for important notifications. You can design your own icons by editing the `icon-pimatic.png` file under directory icons with a bit map editor.<br><br>**attributeName:**  pimatic device attributeName. The `attributeName` consist of a pimatic device-id and a related attribute. Go to the pimatic GUI and find the valid device attribute names for your devices under `Menu - Variables - Device Attributes`.<br><br>**defaultValue:**  default device attribute value. Every received device attribute value is compared to the `defaultValue`. In case that the new value differ from the default value, the message defined in `notification` is shown in the Notification Board.In case that a attribute change back to his default value a previous displayed notification will be removed from the Notification Board<br>|
## Special Thanks
- [Michael Teeuw](https://github.com/MichMich) for creating the awesome [MagicMirror2](https://github.com/MichMich/MagicMirror/tree/develop) project that made this module possible.
- [Lukas Scheffler](https://github.com/LukeSkywalker92) for creating the [MMM-DWD-WarnWeather](https://github.com/LukeSkywalker92/MMM-DWD-WarnWeather) module that I used as guidance in creating this module.
