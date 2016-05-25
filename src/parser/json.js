"use strict";

const chalk = require('chalk');

function comma(element, value) {
    const keys = Object.keys(element);
    return (keys.indexOf(value) == (keys.length - 1)) ? chalk.black('') : chalk.black(',');
}

function pprintJSON(object, pad, skipKeys) {
    const padding = pad || 0;
    let strpad = '';
    
    if (padding > 0) {
        for (let i=0; i<padding * 2; i++) {
            strpad += ' ';
        }
    }
    
    let line = '';
    let lines = [];
    
    for (let key in object) {
        if (skipKeys === true) {
            line = strpad;
        } else {
            line = chalk.black(strpad + key + ': ');
        }
        
        const val = object[key];
        
        switch(typeof val) {
            case "string":
                line += chalk.blue('"' + val + '"' + comma(object, key));
                lines.push(line);
            break;
            case "number":
                line += chalk.red(val + comma(object, key));
                lines.push(line);
            break;
            case "boolean":
                line += chalk.green((val ? 'true' : 'false') + comma(object, key));
                lines.push(line);
            break;
            case "object":
                // console.log(Object.prototype.toString.call(val));
                if (Object.prototype.toString.call(val) === '[object Array]') {
                    lines.push(line + chalk.magenta('['));
                    const l = pprintJSON(val, padding + 1, true);
                    l.forEach(function(line) {
                        lines.push(line);
                    });
                    lines.push(strpad + chalk.magenta(']') + comma(object, key));
                } else if (Object.prototype.toString.call(val) === '[object Null]') {
                    line += chalk.gray('null' + comma(object, key));
                    lines.push(line);
                } else {
                    const l = pprintJSON(val, padding + 1);
                    lines.push(line + chalk.magenta('{'));
                    l.forEach(function(line) {
                        lines.push(line);
                    });
                    lines.push(strpad + chalk.magenta('}') + comma(object, key));
                }
            break;
        }
    }
    
    return lines;
}

module.exports = {
    verify: function(data) {
        try {
            JSON.parse(data);
            return true;
        } catch(e) {
            return false;
        }
    },
    
    prettyprint: function(data) {
        const obj = JSON.parse(data);
        return pprintJSON(obj);
    }
};