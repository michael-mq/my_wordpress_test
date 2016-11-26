/* RUI: REA User Interface library - Browser Tools - v4.0.0
   Copyright 2016, REA Group */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-debug-tools',[], factory);
    } else {
        root.RUI = root.RUI || {};
        root.RUI.Debug = factory();
    }
}(this, function () {

    'use strict';

    var logMessages = [];

    var Debug = {
        enabled: window.location.search.indexOf('rui-debug') > -1,

        log: function (moduleName, message, object) {
            recordLogEntry('DEBUG', moduleName, message, object);
        },

        warn: function (moduleName, message, object) {
            recordLogEntry('WARN', moduleName, message, object);
        },

        error: function (moduleName, message, object) {
            recordLogEntry('ERROR', moduleName, message, object);
        },

        getLog: function () {
            return logMessages;
        },

        printLog: function () {
            if (!this.enabled) {
                return;
            }
            for (var i = 0; i < logMessages.length; i++) {
                var logMethod = logMessages[i].level.toLowerCase();
                if (logMessages[i].object) {
                    console[logMethod](formatMessage(logMessages[i]), logMessages[i].object);
                } else {
                    console[logMethod](formatMessage(logMessages[i]));
                }
            }
        },

        clearLog: function () {
            logMessages = [];
        }
    };

    var recordLogEntry = function (level, moduleName, message, object) {
        if (!Debug.enabled) {
            return;
        }
        logMessages.push({
            timestamp: new Date(),
            level: level,
            moduleName: moduleName,
            message: message,
            object: object
        });
    };

    var formatMessage = function (logEntry) {
        return '[{{timestamp}}] - {{level}} - {{moduleName}}: {{message}}'
            .replace(/{{timestamp}}/, formatTime(logEntry.timestamp))
            .replace(/{{level}}/, logEntry.level)
            .replace(/{{moduleName}}/, logEntry.moduleName)
            .replace(/{{message}}/, logEntry.message);
    };

    var formatTime = function (date) {
        return makeItTwoDigits(date.getHours()) + ':' + makeItTwoDigits(date.getMinutes()) + ':' +
               makeItTwoDigits(date.getSeconds()) + '.' + date.getMilliseconds();
    };

    var makeItTwoDigits = function (number) {
        return number < 10 ? '0' + number : number;
    };

    return Debug;

}));
