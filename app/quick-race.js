var m = require('mithril');
var DefaultSettings = require('./models/default-settings');

var raceSettings = {
  raceType: m.prop('distance'),
  distance: 200,
  distanceUnits: 'm',
  time: '',
  visualizer: m.prop('clock')
};

// TODO: Add distance units
// TODO: Add data bindings
// TODO: Add data validation
var distanceTimeView = function(raceSettings) {
  if(raceSettings.raceType() === 'distance'){
    return m('.form-group', [
      m('label', [
        'Distance',
        m('input[type=text]')
      ])
    ]);
  } else {
    return m('.form-group', [
      m('label', [
        'Duration',
        m('input[type=text]')
      ])
    ]);
  }
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
  },
  view: function(ctrl) {
    return m('.row', [
      m('.row', [
        m('.col-sm-offset-3.col-sm-6', [
          m('h4', 'Race Settings'),
          m('.row', [
            m('label.radio-inline.changeable', {
              onclick: function() { ctrl.raceSettings.raceType('distance'); },
              style: 'width: 50%; text-align: right;'
            }, [
              m('i.material-icons.md-36',
                ctrl.raceSettings.raceType() === 'distance' ? 'check_circle' : 'radio_button_unchecked'
              ),
              'Distance Race'
            ]),
            m('label.radio-inline.changeable', {
              onclick: function() { ctrl.raceSettings.raceType('time'); }
            }, [
              m('i.material-icons.md-36',
                ctrl.raceSettings.raceType() === 'time' ? 'check_circle' : 'radio_button_unchecked'
              ),
              'Time Trial'
            ])
          ]),
          m('.row', [
            m('.col-xs-6', [
              distanceTimeView(ctrl.raceSettings)
            ]),
            m('.col-xs-6', [
              m('label.group-heading', [
                'Visual'
              ]),
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
      ]),
      m('.row', [
        m('.col-sm-offset-2.col-sm-8', [
          // Quick racer select goes here.
        ])
      ])
    ]);
  }
};

module.exports = QuickRace;