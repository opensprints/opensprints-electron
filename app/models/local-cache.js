var moment =    require('moment');

var Cache = {
  reset: function() {
    for(var key in localStorage) {
      if(localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }
  },
  set: function(key, value) {
    if(!key || !value) return;
    var valueToSave = value;
    if(typeof value === 'object') {
      valueToSave = moment.isMoment(value) ? value.format() : JSON.stringify(value);
    }
    localStorage.setItem(key, valueToSave);
    return value;
  },
  remove: function(key) {
    if(!key) return;
    localStorage.removeItem(key);
  },
  get: function(key) {
    var value = localStorage.getItem(key);
    if(value && typeof value === 'string' &&
      (value[0] === '{' || value[0] === '[')) {
      value = JSON.parse(value);
    }
    return value;
  }
};

module.exports = Cache;