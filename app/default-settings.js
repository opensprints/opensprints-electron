var m = require('mithril');
var header = require('./header');
var DefaultSettings = require('./models/default-settings');

// TODO wrap this view in main layout
// TODO test local storage
// TODO abstract storage away from any specific page or component
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
      {label: 'US', value: 'us'},
      {label: 'Metric', value: 'metric'}
    ];
  },
  view: function(ctrl) {
    return m('.container-fluid', [
      m.component(header),
      m('.container', [
        m('h4', 'Default Settings'),

        m('.row', [
          // # of Bikes Select
          m('.col-xs-12 col-sm-6', [
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

          // Distance/Speed Select
          m('.col-xs-12 col-sm-6', [
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
          ])
        ]),

        m('.row', [
          m('.col-xs-12 col-sm-6', [
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
          ]),
          m('.col-xs-12 col-sm-6', [
            m('.input-group.inline', [
              m('label', [
                'Race Distance ',
                m('input', {type: 'number'})
              ])
            ])
          ])
        ]),
        m('.row', [
          m('.col-xs-12 col-sm-6', [
            m('.input-group.inline',
              m('label.control-label', [
                'Circumference ',
                m('span', ctrl.circumference())
              ])
            )
          ]),
          //m('.col-xs-12 col-sm-6', [
          //  m('.input-group.inline',
          //    m('label.control-label', [
          //      'Time Display ',
          //      m('span', '????')
          //    ])
          //  )
          //])
        ]),
        m('.row', [
          m('.col-xs-12', [
            m('.input-group',
              m('label.control-label', [
                'Winner\'s Message (max 25 characters) ',
                m('input', {type: 'text'})
              ])
            )
          ])
        ])
      ])
    ]);
  }
};

module.exports = defaultSettings;