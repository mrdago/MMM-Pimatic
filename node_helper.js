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
        /*
        socket.on('connect', function() {
            console.log(self.name + ': listening on messages from pimatic ... ');
            self.sendSocketNotification('PIMATIC_CONNECTION_ACTIVE');
        });
        */
        
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
	},

})
