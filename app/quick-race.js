var m = require('mithril');
var DefaultSettings = require('./models/default-settings');

var raceSettings = {
  raceType: m.prop('distance'),
  distance: m.prop(200),
  distanceUnits: 'm',
  time: m.prop(),
  visualizer: m.prop('clock')
};

// TODO: Add distance units
// TODO: Add data bindings
// TODO: Add data validation
var distanceTimeView = function(raceSettings) {
  var label;
  if(raceSettings.raceType() === 'distance') {
    label = 'Distance';
  } else if (raceSettings.raceType() === 'time') {
    label = 'Duration';
  }
  return m('.row', [
    m('.col-xs-12', [
      m('label.group-heading', label)
    ]),
    m('.col-xs-12', [
      m('input[type=text]')
    ])
  ]);
};

// TODO: Get the roster of people for the quick selects
var QuickRace = {
  controller: function() {
    this.defaultSettings = DefaultSettings.get();
    this.raceSettings = raceSettings;
    this.visualizerOptions = [
      {label: 'Clock', value: 'clock'},
      {label: 'Vertical Bars', value: 'vertical-bars'},
      {label: 'Horizontal Bars', value: 'horizontal-bars'}
    ];
    this.raceTypes = [
      {label: 'Distance Race', value: 'distance'},
      {label: 'Time Trial', value: 'time'}
    ];
    // for(var bikeIndex = 0; bikeIndex < this.defaultSettings.bikes; bikeIndex++) {
    //
    // }
    this.bikes = [
      {color: '#881212', racer: {name: 'John Guy'}},
      {color: '#2521C2', racer: {name: 'Raptor IV'}},
      {color: '#7C2B9A', racer: {name: 'Mel Blanc'}},
      {color: '#1F7C46', racer: {name: 'Bruce Wayne'}}
    ];
  },
  view: function(ctrl) {
    return m('.row', [
      m('.row', [
        m('.col-xs-offset-2.col-xs-8', [
          m('h4', 'Race Settings'),
          m('hr'),
          m('.row', [
            m('.col-xs-offset-1.col-xs-5', [
              m('label.group-heading', [
                'Race Type'
              ]),
              ctrl.raceTypes.map(function(raceType) {
                return m('label.radio.changeable', {
                  onclick: function() { ctrl.raceSettings.raceType(raceType.value); }
                }, [
                  m('i.material-icons.md-36',
                    ctrl.raceSettings.raceType() === raceType.value ? 'check_circle' : 'radio_button_unchecked'
                  ),
                  raceType.label
                ]);
              })
            ]),
            m('.col-xs-5', [
              distanceTimeView(ctrl.raceSettings),
              m('.row', [
                m('.col-xs-12', [
                  m('label.group-heading', [
                    'Visual'
                  ])
                ]),
                m('.col-xs-12', [
                  ctrl.visualizerOptions.map(function(option) {
                    return m('.radio.changeable', {
                      onclick: function() { ctrl.raceSettings.visualizer(option.value); }
                    }, [
                      m('label', [
                        m('i.material-icons',
                          ctrl.raceSettings.visualizer() === option.value ? 'radio_button_checked' : 'radio_button_unchecked'
                        ),
                        option.label
                      ])
                    ]);
                  })
                ])
              ])
            ])
          ])
        ])
      ]),
      m('.row', [
        m('.col-xs-offset-2.col-xs-8', [
          ctrl.bikes.map(function(bike, index) {
            return m('.racer-select.col-xs-3', [
              m('.bike-indicator', {
                style: {
                  'background-color': bike.color
                }
              }, [
                index+1
              ]),
              m('.racer-select-container', [
                m('label', bike.racer.name)
              ])
            ]);
          })
        ])
      ])
    ]);
  }
};

module.exports = QuickRace;