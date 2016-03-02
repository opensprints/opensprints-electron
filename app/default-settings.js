var m = require('mithril');
var header = require('./header');
var DefaultSettings = require('./models/default-settings');

var defaultSettings = {
  controller: function() {
    this.settings = DefaultSettings.get();

    this.onChange = function(cb) {
      return function(event) {
        cb(event);
        this.settings.save();
      }.bind(this);
    };

    this.circumference = function() {
      return '42,000,000 KM';
    };

    this.bikeOptions = [2, 4];
    this.unitsOfMeasureOptions = [
      {
        label: 'US',
        value: 'us'
      },
      {
        label: 'Metric',
        value: 'metric'
      }
    ];
    this.racerInfo = [
      {
        label: 'Sex',
        value: 'gender'
      },
      {
        label: 'Racer Level',
        value: 'tier'
      },
      {
        label: 'Phone Number',
        value: 'phoneNumber'
      },
      {
        label: 'Email',
        value: 'email'
      }
    ];
  },
  view: function(ctrl) {
    return m('.container-fluid', [
      m.component(header),
      m('.container', [
        m('h4', 'Default Settings'),

        m('.row', [
          // # of Bikes Select
          m('.col-xs-12.col-sm-6', [

            m('.row', [
              m('.input-group.inline', [
                m('label', [
                  'Number of Bikes ',
                  m('select', {
                    onchange: ctrl.onChange(function(event) {
                      ctrl.settings.bikes = parseInt(event.target.value);
                    })
                  },
                  ctrl.bikeOptions.map(function(option){
                    return m('option', {
                      selected: option === ctrl.settings.bikes,
                      value: option
                    }, option);
                  }))
                ])
              ])
            ]),

            m('.row', [
              m('.input-group.inline', [
                m('label', [
                  'Roller Diameter ',
                  m('input', {type: 'text'})
                ]),
                m('select', [
                  m('option', 'in'),
                  m('option', 'cm')
                ])
              ])
            ])

          ]),

          m('.col-xs-12.col-sm-6', [

            m('.row', [
              m('.input-group.inline', [
                m('label', [
                  'Distance/Speed Units ',
                  m('select', {
                    onchange: ctrl.onChange(function(event) {
                      ctrl.settings.unitsOfMeasure = event.target.value;
                    })
                  },
                  ctrl.unitsOfMeasureOptions.map(function(option) {
                    return m('option', {
                      selected: option.value === ctrl.settings.unitsOfMeasure,
                      value: option.value
                    }, option.label);
                  }))
                ])
              ])
            ]),

            m('.row', m('label', 'Racer Roster Options')),
            m('.row', [
              m('.col-sm-6', [
                ctrl.racerInfo.filter(function(_, index, arr) {
                  return index < arr.length/2;
                }).map(function(option) {
                  return m('.checkbox', [
                    m('label', [
                      m('input[type=checkbox]', {
                        value: option.value
                        // TODO: onclick should toggle the value in an array in the settings being saved
                      }),
                      option.label
                    ])
                  ]);
                })
              ]),
              m('.col-sm-6', [
                ctrl.racerInfo.filter(function(_, index, arr) {
                  return index >= arr.length/2;
                }).map(function(option) {
                  return m('.checkbox', [
                    m('label', [
                      m('input[type=checkbox]', {
                        value: option.value
                        // TODO: onclick should toggle the value in an array in the settings being saved
                      }),
                      option.label
                    ])
                  ]);
                })
              ])
            ]),

            m('.row', [
              m('.input-group.inline', [
                m('label', [
                  'Race Distance ',
                  m('input', {type: 'number'})
                ])
              ])
            ])
          ])
        ])
      ])
    ]);
  }
};

module.exports = defaultSettings;