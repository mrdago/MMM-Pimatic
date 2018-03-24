/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var config = {
    port: 8080,
    language: 'de',
    timeFormat: 24,
    units: 'metric',
    ipWhitelist: ["192.168.0.1/24", "127.0.0.1", "127.0.1.1","::fff:0.0.0.0/1", "::fff:128.0.0.0/2", "::fff:192.0.0.0/3", "::fff:224.0.0.0/4", "::ffff:127.0.0.1", "::1"],
    modules: [
    {
        module: 'MMM-Pimatic',
        header: 'Pimatic Notification Board',
        position: 'top_center',
        config: {
            host :'pimatic',
            port : 80,
            user : 'YourPimaticUserLoginName',
            passwd : 'YourPimaticUserLoginPassword',
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
                    name: 'GASALARM',
                    icon: 'icon-Systemmeldungen',
                    attributeName: 'gasalarm.Gasalarm',
                    defaultValue: '-',
                    notification : 'ALARM - Hohe Gaskonzentration im @!',
                    soundNotification: 'endless',
                    soundDevice: 'both',
                    soundFile: 'alarm-sirene.mp3'
                },
                {
                    name: 'Heizung',
                    icon: 'icon-Heizung',
                    attributeName: 'dThermiComStatus.Heizungstatus',
                    defaultValue: '@ThermiCom ...',
                    notification: '@'
                },                
                {
                    name: 'Systemmeldungen',
                    icon: 'icon-Systemmeldungen',
                    attributeName: 'dSystemMeldungen.Systemstatus',
                    defaultValue: 'keine Meldungen',
                    notification: '@'
                },                
                {
                    name: 'Garage',
                    icon: 'icon-Garage',
                    attributeName: 'garageDOORstatus.contact',
                    defaultValue: true,
                    notification: 'Geöffnet'
                },                  
                {
                    name: 'Müllabfuhr',
                    icon: 'icon-Muellabfuhr',
                    attributeName: 'dgarbagecollectioninfo.Müllabfuhr',
                    defaultValue: 'heute keine Abfuhr',
                    notification: '@'
                },
                {
                    name: 'Termine',
                    icon: 'icon-Termine',
                    attributeName: 'dTermine.Termine',
                    defaultValue: 'keine',
                    notification: '@'
                },
                {
                    name: 'Geburtstage',
                    icon: 'icon-Geburtstage',
                    attributeName: 'dGeburtstage.Geburtstage',
                    defaultValue: '-',
                    notification: '@'
                },
                {
                    name: 'Wasserverbrauch',
                    icon: 'icon-Wasser',
                    attributeName: 'watercounter-status.info',
                    defaultValue: '-',
                    notification: '@'
                },                
            ],
        },
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
  ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {module.exports = config;}
