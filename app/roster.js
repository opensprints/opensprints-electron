var m = require('mithril');
var Header = require('./header');

var roster = {
  controller: function() {
    this.racers = [
      {
        fullName: 'John Guy',
        gender: 'M',
        experienceLevel: 'nov'
      },
      {
        fullName: 'John Guy',
        gender: 'M',
        experienceLevel: 'nov'
      },
      {
        fullName: 'John Guy',
        gender: 'M',
        experienceLevel: 'nov'
      },
      {
        fullName: 'John Guy',
        gender: 'M',
        experienceLevel: 'nov'
      },
      {
        fullName: 'John Guy',
        gender: 'M',
        experienceLevel: 'nov'
      },
      {
        fullName: 'John Guy',
        gender: 'M',
        experienceLevel: 'nov'
      },
      {
        fullName: 'John Guy',
        gender: 'M',
        experienceLevel: 'nov'
      },
      {
        fullName: 'John Guy',
        gender: 'M',
        experienceLevel: 'nov'
      },
      {
        fullName: 'John Guy',
        gender: 'M',
        experienceLevel: 'nov'
      },
      {
        fullName: 'John Guy',
        gender: 'M',
        experienceLevel: 'nov'
      },
      {
        fullName: 'John Guy',
        gender: 'M',
        experienceLevel: 'nov'
      },
      {
        fullName: 'John Guy',
        gender: 'M',
        experienceLevel: 'nov'
      }
    ];
    this.placeholder = 'Type a name to enter or search for a racer';
  },
  view: function(ctrl) {
    return m('', [
      m.component(Header),
      m('.container', [
        m('h4', 'Roster'),
        m('.row', [
          // racers
          m('.col-xs-6', [
            m('.col-xs-12', [
              m('.row', [
                m('label.group-heading', [
                  'Racers'
                ])
              ])
            ]),
            m('.col-xs-12', [
              m('.row', [
                m('input.racer-input[type=text][placeholder="' + ctrl.placeholder + '"]')
              ]),
              m('.row', [
                // m('.'),
                m('table.roster-table', [
                  m('tr', [
                    // Checkbox heading
                    m('th'),
                    m('th', 'NAME'),
                    m('th', 'SEX'),
                    m('th', 'LEVEL'),
                    m('th', 'TIME')
                  ]),
                  ctrl.racers.map(function(racer) {
                    return m('tr', [
                      m('td'),
                      m('td', racer.fullName),
                      m('td', racer.gender),
                      m('td', racer.experienceLevel),
                      m('td')
                    ]);
                  })
                ])
              ])
            ])
          ])
        ])
      ])
    ]);
  }
};

module.exports = roster;
