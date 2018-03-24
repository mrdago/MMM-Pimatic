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
        module: 'alert',
        config: {
            effect: 'exploader',
            alert_effect: 'genie',
        }
    },
    {
        module: 'clock',
        position: 'top_left'
    },
    {
        module: 'MMM-AdminInterface',
        position: 'bottom_bar',
        config: {
            helperScript: '/home/pi/mmhelper.sh',
            speechLogTimeout: 8000,
            nshPort: 5577,
            mmPort:  5588,
            smtp_notifications: true,          // react on SMTP camera alarm notifications 
            smtp:{
                timeToDisplay: 180,             // display video stream for 180 seconds
                port: 2525,
                host: false,
                user: 'pimatic',
                pwd: 'ipCAM2pi',      
            },        
        }
    },
    {
        module: 'MMM-PostIt',
        position: 'bottom_right',
        header: 'Mitteilungen',
        config: {
            maxWidth: "300px",          // See provided .css file for full customization options
            header: "",
        }
    },
    {
        module: 'MMM-SpotifyConnectUI',
        position: 'bottom_center',
        config: {
            // No further configuration needed unless you run another version of spotify-connect-web on another box.
            // See MMM-SpotifyConnectUI.js for these settings.
        }
    },
    {
        module: 'MMM-Pimatic',
        header: 'Pimatic Notification Board',
        position: 'top_center',
        config: {
            host :'pimatic',
            port : 80,
            user : 'admin',
            passwd : 'lxyp612',
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
            user : 'admin',
            passwd : 'lxyp612',
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
/*
    {
        module: 'newsfeed',
        position: 'bottom_bar',
        config: {
            feeds: [
                {
                    title: "Tagesschau",
                    url: "http://www.tagesschau.de/xml/rss2",
                    encoding: "UTF-8" //ISO-8859-1
                },           
            ],
            showSourceTitle: true,
            showPublishDate: true
        }
    },
*/    
    {
        module: 'calendar',
        header: 'Feier- und Ferientage',
        position: 'top_left',
        config: {
            calendars: [
                {
                    symbol: 'caret-right',                      
                    url: 'webcal://www.ifeiertage.de/nw-s.ics'
                },
                {
                    symbol: 'caret-right',
                    url: 'https://calendar.google.com/calendar/ical/pva2e2so4dcf0vdqi12brfbn58%40group.calendar.google.com/private-6ec2b237a2a9c261804b30da618509f7/basic.ics'
                },                    
            ],
            maximumNumberOfDays : '61',
            maximumEntries : 8,
            timeFormat : 'absolute',
            urgency : 2,
            fetchInterval : '5400000',
        }
    },
    {
        module: 'calendar',
        header: 'Geburtstage',
        position: 'top_left',
        config: {
            calendars: [
                {
                    symbol: 'caret-right',                      
                    url: 'https://calendar.google.com/calendar/ical/gv8811lcjc3qfbft4jkh1u55s4%40group.calendar.google.com/private-3b2f79b50be4cc44439bcd3333903c86/basic.ics'
                }
            ],
            maximumEntries : 8,
            fetchInterval : '5400000',
            timeFormat : 'absolute'
        }
    },       
    {
        module: 'currentweather',
        position: 'top_right',
        header: "Leichlingen", 
        config: {
            location: "Leichlingen, DE",
            locationID: "2879315",                          //ID from http://www.openweathermap.org
            appid: "2005660fb4ddd9be23da0ef0b9884a2d",      // account: paul.kanthak/hanibal@home
            showHumidity: true,
        }
    },
    {
        module: 'weatherforecast',
        position: 'top_right',
        header: 'Wetter Vorhersage',
        config: {
            location: "Leichlingen, DE",
            locationID: "2879315",                          //ID from http://www.openweathermap.org
            appid: "2005660fb4ddd9be23da0ef0b9884a2d",      // account: paul.kanthak/hanibal@home
            initialLoadDelay: 500,
        }            
    },
    {
        module: 'MMM-DWD-WarnWeather',
        position: 'top_right',
        /* header: 'Wetterwarnungen', */
        config: {
            region: 'Leichling./Rhld',
            changeColor: true,
            interval: 15 * 60 * 1000,                       // every 15 minutes
            loadingText: 'Warnungen werden geladen...',
            noWarningText: 'Keine Warnungen'
        }
    },
    {
        module: 'MMM-Wunderlist',
        position: 'bottom_right',     // This can be any of the regions. Best results in left or right regions.
        header: 'Zu erledigen',       // This is optional
        interval : 90,
        config: {
            accessToken : 'a8356fdc0be54177bdfc3a258ca55531b639e61c0ee6fdaad67e17242792',
            clientID : '99aa70b3b67bbc8b7774',
            lists : ["Erinnerung"]
        }
    },  
    {
        module: 'MMM-syslog',
        position: 'bottom_left',
        config: {
            title : 'Statusmeldungen',
            format : '  HH:mm ... DD:MMM',
            max : '5'
        }
    },
    {
        module: 'MMM-Photoshow',
        position: 'fullscreen_above',
        config: {
            animationSpeed: 50,
            updateInterval: 8000,
            useFeh: true,
        }
    },
    {
        module: "MMM-RTSPStream",
        position: "middle_center",
        config: {
            autoStart: false,
            moduleWidth: 736,                   // Width = (Stream Width + 30px margin + 2px border) * # of Streams Wide
            moduleHeight: 512,                  // Height = (Stream Height + 30px margin + 2px border) * # of Streams Tall
            moduleOffset: 0,                    // Offset to align OMX player windows
            animationSpeed: 500,
            modulesToHide: ["MMM-SpotifyConnectUI"],
            stream1: {
                name: 'Camera1',
                url: 'rtsp://admin:lx2348@ipcam01:554/2',       // ..:554/2 - 640x352,   ..:554/1 - 1280x720
                frameRate: '25',
                width: undefined,
                height: undefined,
            },
            stream2: {
                name: 'Camera2',
                url: 'rtsp://admin:lx2348@ipcam02:554/2',       // ..:554/2 - 640x352,   ..:554/1 - 1280x720
                frameRate: '25',
                width: undefined,
                height: undefined,
            },
        }
    },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== 'undefined') {module.exports = config;}
