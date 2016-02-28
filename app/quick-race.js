var m = require('mithril');

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

// TODO: Pass default settings to set up the race settings: distance units, default visualizer, max bikes configured
// TODO: Get the roster of people for the quick selects
var QuickRace = {
  controller: function() {
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
          m('.row', [
            m('label.radio-inline', {
              style: 'width: 50%; text-align: right;'
            }, [
              m('input[type=radio]', {
                name: 'raceType',
                value: 'distance',
                checked: ctrl.raceSettings.raceType() === 'distance' ? 'checked' : '',
                onclick: m.withAttr('value', ctrl.raceSettings.raceType)
              }),
              'Distance Race'
            ]),
            m('label.radio-inline', [
              m('input[type=radio]', {
                name: 'raceType',
                value: 'time',
                checked: ctrl.raceSettings.raceType() === 'time' ? 'checked' : '',
                onclick: m.withAttr('value', ctrl.raceSettings.raceType)
              }),
              'Time Trial'
            ])
          ]),
          m('.bg-grey-300.row', [
            m('.col-xs-6', [
              distanceTimeView(ctrl.raceSettings)
            ]),
            m('.col-xs-6', [
              m('label', [
                'Visual'
              ]),
              ctrl.visualizerOptions.map(function(option) {
                return m('.radio', [
                  m('label', [
                    m('input[type=radio]',
                      {
                        name: 'visualizer',
                        value: option.value,
                        checked: ctrl.raceSettings.visualizer() === option.value ? 'checked' : '',
                        onclick: m.withAttr('value', ctrl.raceSettings.visualizer)
                      }
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
        m('.col-sm-offset-2.col-sm-8.bg-grey-300', [
          // Quick racer select goes here.
        ])
      ])
    ]);
  }
};

module.exports = QuickRace;