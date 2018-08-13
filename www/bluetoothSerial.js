/* global cordova */
function createConnection(pluginName) {
  return {
    connect: function(macAddress, portId, success, failure) {
      cordova.exec(success, failure, pluginName, 'connect', [macAddress, portId])
    },

    // Android only - see http://goo.gl/1mFjZY
    connectInsecure: function(macAddress, portId, success, failure) {
      cordova.exec(success, failure, pluginName, 'connectInsecure', [macAddress, portId])
    },

    disconnect: function(success, failure) {
      cordova.exec(success, failure, pluginName, 'disconnect', [])
    },

    // list bound devices
    list: function(success, failure) {
      cordova.exec(success, failure, pluginName, 'list', [])
    },

    isEnabled: function(success, failure) {
      cordova.exec(success, failure, pluginName, 'isEnabled', [])
    },

    isConnected: function(success, failure) {
      cordova.exec(success, failure, pluginName, 'isConnected', [])
    },

    // the number of bytes of data available to read is passed to the success function
    available: function(success, failure) {
      cordova.exec(success, failure, pluginName, 'available', [])
    },

    // read all the data in the buffer
    read: function(success, failure) {
      cordova.exec(success, failure, pluginName, 'read', [])
    },

    // reads the data in the buffer up to and including the delimiter
    readUntil: function(delimiter, success, failure) {
      cordova.exec(success, failure, pluginName, 'readUntil', [delimiter])
    },

    // writes data to the bluetooth serial port
    // data can be an ArrayBuffer, string, integer array, or Uint8Array
    write: function(data, success, failure) {
      // convert to ArrayBuffer
      if (typeof data === 'string') {
        data = stringToArrayBuffer(data)
      } else if (data instanceof Array) {
        // assuming array of interger
        data = new Uint8Array(data).buffer
      } else if (data instanceof Uint8Array) {
        data = data.buffer
      }

      cordova.exec(success, failure, pluginName, 'write', [data])
    },

    // calls the success callback when new data is available
    subscribe: function(delimiter, success, failure) {
      cordova.exec(success, failure, pluginName, 'subscribe', [delimiter])
    },

    // removes data subscription
    unsubscribe: function(success, failure) {
      cordova.exec(success, failure, pluginName, 'unsubscribe', [])
    },

    // calls the success callback when new data is available with an ArrayBuffer
    subscribeRawData: function(success, failure) {
      successWrapper = function(data) {
        // Windows Phone flattens an array of one into a number which
        // breaks the API. Stuff it back into an ArrayBuffer.
        if (typeof data === 'number') {
          const a = new Uint8Array(1)
          a[0] = data
          data = a.buffer
        }
        success(data)
      }
      cordova.exec(successWrapper, failure, pluginName, 'subscribeRaw', [])
    },

    // removes data subscription
    unsubscribeRawData: function(success, failure) {
      cordova.exec(success, failure, pluginName, 'unsubscribeRaw', [])
    },

    // clears the data buffer
    clear: function(success, failure) {
      cordova.exec(success, failure, pluginName, 'clear', [])
    },

    // reads the RSSI of the *connected* peripherial
    readRSSI: function(success, failure) {
      cordova.exec(success, failure, pluginName, 'readRSSI', [])
    },

    showBluetoothSettings: function(success, failure) {
      cordova.exec(success, failure, pluginName, 'showBluetoothSettings', [])
    },

    enable: function(success, failure) {
      cordova.exec(success, failure, pluginName, 'enable', [])
    },

    discoverUnpaired: function(success, failure) {
      cordova.exec(success, failure, pluginName, 'discoverUnpaired', [])
    },

    setDeviceDiscoveredListener: function(notify) {
      if (typeof notify !== 'function') throw 'BluetoothSerial.setDeviceDiscoveredListener: Callback not a function'

      cordova.exec(notify, null, pluginName, 'setDeviceDiscoveredListener', [])
    },

    clearDeviceDiscoveredListener: function() {
      cordova.exec(null, null, pluginName, 'clearDeviceDiscoveredListener', [])
    },

    setName: function(newName) {
      cordova.exec(null, null, pluginName, 'setName', [newName])
    },

    setDiscoverable: function(discoverableDuration) {
      cordova.exec(null, null, pluginName, 'setDiscoverable', [discoverableDuration])
    },

    pair: function(macAddress, pin, success, failure) {
      cordova.exec(success, failure, pluginName, 'pair', [macAddress, pin])
    },

    unpair: function(macAddress, success, failure) {
      cordova.exec(success, failure, pluginName, 'unpair', [macAddress])
    },
  }
}

module.exports = {
  connection1: createConnection('BluetoothSerial1'),
  connection2: createConnection('BluetoothSerial2'),
}

const stringToArrayBuffer = function(str) {
  const ret = new Uint8Array(str.length)
  for (let i = 0; i < str.length; i++) {
    ret[i] = str.charCodeAt(i)
  }
  return ret.buffer
}
