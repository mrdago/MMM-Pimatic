/* Magic Mirror
 * Module: MMM-Pimatic node helper
 *
 * By Mr.Sponti
 *  Created:       08.02.2017
 *  Last modified: 08.02.2017
 *
 * MIT Licensed.
 */

var NodeHelper = require('node_helper');
var io = require('socket.io-client');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;

module.exports = NodeHelper.create({
	start: function () {
        console.log(this.name + ' helper started ...');
	},
    
    // connect to pimatic home automation server and listen on device attribute changes
    connectToPimatic: function (config) {
        var self = this;
        var deviceValues = [];

        // connect to Pimatic server

		var url = 'http://' + config.host + ':' + config.port + '/?username=' + config.user + '&password=' + config.passwd;
        var socket = io(url, {
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 3000,
          timeout: 20000,
          forceNew: true
        });
        
        // get actual values of pimatic variables
        socket.on('variables', function(variables){         
            self.sendSocketNotification('PIMATIC_VARIABLES', variables);
        });

        // receive and forward pimatic device attribute changes   
        socket.on('deviceAttributeChanged', function(attrEvent) { 
            //console.log(attrEvent)
            self.sendSocketNotification('PIMATIC_ATTRIBUTE_CHANGED', attrEvent);
        })              
	},    

    // notifications from main modul
	socketNotificationReceived: function (notification, payload) {
        if (notification == 'CONNECT') {
            this.connectToPimatic(payload);             // Connect and listen to pimatic host
		}
        if (notification == 'PLAY_SOUND_NOTIFICATION') {
            
            if( typeof payload.device === 'undefined'){
                payload.device = ''
            } else {
                payload.device = '-o ' + payload.device
            }
            if( typeof payload.loop === 'undefined' || payload.loop === 'once'){
                payload.loop = ''
            } else {
                if( payload.loop === 'endless' ) {payload.loop = '--loop'}
            }

            //console.log("/usr/bin/omxplayer" + payload.device + ' ' + payload.loop + ' ' + this.path +'/'+ payload.file)
            exec("/usr/bin/omxplayer " + payload.device + ' ' + payload.loop + ' ' + this.path +'/'+payload.file);
        }
        if (notification == 'STOP_SOUND_NOTIFICATION') {
            try {
                execSync('sudo kill -15 $(pgrep -f omxplayer)');
            } 
            catch (error) {
                //console.log('execSync error ');
                //console.log(error);
                //error.status;  // Might be 127 in your example.
                //error.message; // Holds the message you typically want.
                //error.stderr;  // Holds the stderr output. Use `.toString()`.
                //error.stdout;  // Holds the stdout output. Use `.toString()`.    
            }
        }    
    },
})

