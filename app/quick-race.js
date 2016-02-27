var m = require('mithril');

var raceSettings = {
  raceType: m.prop('distance'),
  distance: 200,
  distanceUnits: 'm',
  time: '',
  visualizer: m.prop('clock')
};

var QuickRace = {
  controller: function() {
    this.raceSettings = raceSettings;
  },
  view: function(ctrl) {
    return m('.row', m('.quick-race.col-sm-offset-3.col-sm-6', [
      m('.row', [
        m('label.radio-inline',
          {
            style: 'width: 50%; text-align: right;'
          }, [
            m('input[type=radio]', {
              name: 'raceType',
              value: 'distance',
              onclick: m.withAttr('value', ctrl.raceSettings.raceType)
            }),
            'Distance Race'
          ]
        ),
        m('label.radio-inline', [
          m('input[type=radio]', {
            name: 'raceType',
            value: 'time',
            onclick: m.withAttr('value', ctrl.raceSettings.raceType)
          }),
          'Time Trial'
        ])
      ]),
      m('.solid-box.row', [
        m('.col-xs-6', [
          m('.form-group', [
            m('label', [
              'Distance',
              m('input[type=text]')
            ])
          ])
        ]),
        m('.col-xs-6', [
          m('label', [
            'Visual'
          ]),

          m('.radio', [
            m('label', [
              m('input[type=radio]',
                {
                  name: 'visualizer',
                  value: 'clock',
                  onclick: m.withAttr('value', ctrl.raceSettings.visualizer)
                }
              ),
              'Clock'
            ])
          ]),

          m('.radio', [
            m('label', [
              m('input[type=radio]',
                {
                  name: 'visualizer',
                  value: 'vertical-bars',
                  onclick: m.withAttr('value', ctrl.raceSettings.visualizer)
                }
              ),
              'Vertical Bars'
            ])
          ]),

          m('.radio', [
            m('label', [
              m('input[type=radio]',
                {
                  name: 'visualizer',
                  value: 'horizontal-bars',
                  onclick: m.withAttr('value', ctrl.raceSettings.visualizer)
                }
              ),
              'Horizontal Bars'
            ])
          ])
        ])
      ])
    ]));
  }
};

module.exports = QuickRace;