var m = require('mithril');
var header = require('./header');
var DefaultSettings = require('./models/default-settings');

var defaultSettings = {
  controller: function() {
    var settings = this.settings = DefaultSettings.get();

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
    this.toggleRacerOption = function(value) {
      return function () {
        var index = settings.racerInfo.indexOf(value);
        if (index !== -1) {
          settings.racerInfo.splice(index, 1);
        } else {
          settings.racerInfo.push(value);
        }
      };
    };
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
            ]),

            m('.row', [
              m('label.group-heading', 'Racer Colors')
            ]),
            m('.row', [
              'ye old colors'
            ])

          ]),

          m('.col-xs-12.col-sm-6', [

            m('.row', [
              m('.input-group.inline', [
                m('label.group-heading', [
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

            m('.row', [
              m('.input-group.inline', [
                m('label.group-heading', [
                  'Race Distance ',
                  m('input', {type: 'number'})
                ])
              ])
            ]),

            m('.row', [
              m('label.group-heading', 'Racer Roster Options'),
              ctrl.racerInfo.map(function(option) {
                return m('.checkbox.changeable', {
                  onclick: ctrl.onChange(ctrl.toggleRacerOption(option.value))
                }, [
                  m('i.material-icons.md-24',
                    ctrl.settings.racerInfo.indexOf(option.value) !== -1 ? 'check_box' : 'check_box_outline_blank'
                  ),
                  m('label', option.label)
                ]);
              })
            ])
          ])
        ])
      ])
    ]);
  }
};

module.exports = defaultSettings;