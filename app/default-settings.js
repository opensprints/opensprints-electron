var m = require('mithril')

// TODO wrap this view in main layout
// TODO test local storage
// TODO abstract storage away from any specific page or component
var defaultSettings = {
  controller: function() {
    this.circumference = function() {
      return '42,000,000 KM'
    }
  },
  view: function(ctrl) {
    return m('.container', [
      m('h4', 'Default Settings'),
      m('.row', [
        m('.col-xs-12 col-sm-6', [
          m('.input-group inline',
            m('label', [
              'Number of Bikes ',
              m('select', [
                m('option', 2),
                m('option', 4)
              ])
            ])
          )
        ]),
        m('.col-xs-12 col-sm-6', [
          m('.input-group inline',
            m('label', [
              'Distance/Speed Units ',
              m('select', [
                m('option', 'US'),
                m('option', 'Metric')
              ])
            ])
          )
        ])
      ]),
      m('.row', [
        m('.col-xs-12 col-sm-6', [
          m('.input-group inline', [
            m('label', [
              'Roller Diameter ',
              m('input', {type: 'text'})
            ]),
            m('select.input-group-addon', [
              m('option', 'in'),
              m('option', 'cm')
            ])
          ])
        ]),
        m('.col-xs-12 col-sm-6', [
          m('.input-group inline', [
            m('label', [
              'Race Distance ',
              m('input', {type: 'number'})
            ])
          ])
        ])
      ]),
      m('.row', [
        m('.col-xs-12 col-sm-6', [
          m('.input-group inline',
            m('label.control-label', [
              'Circumference ',
              m('span', ctrl.circumference())
            ])
          )
        ]),
        m('.col-xs-12 col-sm-6', [
          m('.input-group inline',
            m('label.control-label', [
              'Time Display ',
              m('span', '????')
            ])
          )
        ])
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
  }
}

m.mount(document.body, defaultSettings)