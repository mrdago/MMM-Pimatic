/* global Module */

/* Magic Mirror
 * Module: MMM-Pimatic
 *
 * By Mr.Sponti
 *      based on Luke Scheffler https://github.com/LukeSkywalker92
 *
 *  Created:        08.02.2017
 *  Last modified:  05.12.2017
 *
 * MIT Licensed.
 */

Module.register("MMM-Pimatic", {
	// Default module config.
	defaults: {		
        noNotification: this.name + " connecting to home automation system pimatic ...",
	},

	// Required styles
	getStyles: function () {
		return ["MMM-Pimatic.css"]
	},
	// Define parameters at start
	start: function () {		
        console.log('Starting module: ' + this.name);
		this.loaded = false;
        this.deviceValues = new Array(this.config.devices.length);
        this.deviceValueChange = new Array(this.config.devices.length);
        this.devicePlaySound = new Array(this.config.devices.length);
        this.sendSocketNotification('CONNECT', this.config);
	},
    
    // notifications from node helper
	socketNotificationReceived: function (notification, payload) {   
        //
        // received notification about pimatic variables values
        //
        if (notification === 'PIMATIC_VARIABLES') {       
            var self = this;
            var variables = payload;
            variables.forEach(function(entry) {
                self.config.devices.forEach(function(element, index, array) {
                    if (element.attributeName === entry.name) {
                        self.deviceValues.splice(index, 1, entry.value);
                        self.deviceValueChange[index] = false;
                    }
                });
            });
            //console.log(self.deviceValues);
            self.loaded = true;
            self.updateDom(1000);
		}
        //
        // received a notification about changed pimatic values
        //
        if (notification === 'PIMATIC_ATTRIBUTE_CHANGED') {
            var self = this;
            var attrEvent = payload;
            var receivedDeviceAttribute = attrEvent.deviceId + '.' + attrEvent.attributeName
            self.config.devices.forEach(function(element, index, array) {
                self.deviceValueChange[index] = false;
                if (element.attributeName === receivedDeviceAttribute){
                    self.deviceValues.splice(index, 1, attrEvent.value);
                    self.deviceValueChange[index] = true;
                    self.updateDom();
                }
            });
		}    
    },

	// Override dom generator.
	getDom: function () {
        var self = this;
        // show pimatic temperature values
        if( self.loaded && self.config.style === 'temperatures' ){ 

            var TemperaturesTable = document.createElement("div");
            TemperaturesTable.className = 'temperatures';
        
            var TemperaturesRow = document.createElement("tr");
            //TemperaturesRow.className = 'temperatureCell';
            
            self.config.devices.forEach(function(element, index, array) {
                var deviceCell = document.createElement("div");
                deviceCell.className = 'temperatureCell';
                
                var cellHeaderRow = document.createElement("tr");
                //cellHeaderRow.className = 'temperatureCell table thead th';
                
                var cellNameLabel = document.createElement('th');
                cellNameLabel.className = 'header';
                cellNameLabel.innerHTML = element.name;
                cellHeaderRow.appendChild(cellNameLabel);
                deviceCell.appendChild(cellHeaderRow);
     
                var cellDataRow = document.createElement("tr");
                
                var cellDataValue = document.createElement('td');
                cellDataValue.className = 'measure';
                if (typeof self.deviceValues[index] == 'undefined') {
                    var value = '-';
                }
                else {
                    var value = self.deviceValues[index];  
                }
                cellDataValue.innerHTML = value + self.config.unit;
                cellDataRow.appendChild(cellDataValue);
                deviceCell.appendChild(cellDataRow);
                
                TemperaturesRow.appendChild(deviceCell);
            });
                        
            TemperaturesTable.appendChild(TemperaturesRow);
            
            return TemperaturesTable;
        }
        
        // show pimatic status notifications
        if( self.loaded && self.config.style === 'notifications' ){

            var wrapper = document.createElement("div");
            wrapper.className = 'wrapper';

            // new notification message received
            self.config.devices.forEach(function(element, index, array) {
                var defaultDeviceValue = element.defaultValue;
                if( typeof element.defaultValue === "string" && element.defaultValue.charAt(0) === '@' ) {
                    if ( typeof self.deviceValues[index] === "string" && self.deviceValues[index].indexOf(element.defaultValue.substring(1)) > -1 ) {
                        defaultDeviceValue = self.deviceValues[index];   
                    } 
                }                
                if ( defaultDeviceValue != self.deviceValues[index] && typeof self.deviceValues[index] !== 'undefined' ) {
                    if( typeof element.soundNotification !== "undefined" && !self.devicePlaySound[index] ) {
                        self.sendNotification( 'PLAY_SOUND_NOTIFICATION', {loop: element.soundNotification,
                                                                           device: element.soundDevice,
                                                                           file: element.soundFile} );
                        self.devicePlaySound[index] = true
                    }                    
                    var eventHeader = element.name;
                    if ( element.notification.indexOf('@') !== -1) {
                        var eventText = element.notification.replace('@',self.deviceValues[index]);
                    }
                    else {
                        var eventText = element.notification;
                    }
                    var wpiWrapper = document.createElement("div");                   
                    var icon = document.createElement("div");
                    var iconName = element.icon;
                    icon.classList.add('pimatic', iconName, 'icon-small');
                    var description = document.createElement("div");
                    description.className = 'event';
                    var headline = document.createElement("div");
                    headline.innerHTML = eventHeader;
                    var infoline = document.createElement("div");
                    infoline.className = 'eventinfo';
                    infoline.innerHTML = eventText;
                    
                    var newLine = document.createElement("br");
                    description.appendChild(headline);
                    description.appendChild(infoline);
                    wpiWrapper.appendChild(icon);
                    wpiWrapper.appendChild(description);
                    wrapper.appendChild(wpiWrapper);
                    wrapper.appendChild(newLine);

                } else {
                    if( self.deviceValueChange[index] && self.devicePlaySound[index] ){
                        self.sendNotification('STOP_SOUND_NOTIFICATION');
                        self.devicePlaySound[index] = false;
                    }  
                }
            });
            return wrapper;
        }
        
        if (!self.loaded) {
            var wrapper = document.createElement("div");
            wrapper.className = 'wrapper';
            var noNotificationWrapper = document.createElement("p");
            noNotificationWrapper.className = 'status';
            noNotificationWrapper.innerHTML = this.config.noNotification;
            wrapper.appendChild(noNotificationWrapper);
            return wrapper;
        }
	},
});
