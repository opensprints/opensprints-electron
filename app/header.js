var m        = require('mithril');
var DropDown = require('./drop-down');

module.exports = {
  controller: function(){
    this.appNav = [
      {
        href: '/',
        label: 'home'
      },
      {
        href: '/roster',
        label: 'roster'
      },
      {
        href: '/default-settings',
        label: 'default settings'
      }
    ];
  },
  view: function(ctrl) {
    return m('.container', [
      m('img.logo', {src: __dirname + '/styles/logo_with_text.png'}),
      m('.pull-right', [
        m.component(DropDown, [
          m('.nav-icon', [
            m('i.material-icons.md-36', 'menu')
          ])
        ], [
          ctrl.appNav.map(function(navLink) {
            return m('a[href=' + navLink.href + ']', {config: m.route}, navLink.label);
          })
        ])
      ])
    ]);
  }
};