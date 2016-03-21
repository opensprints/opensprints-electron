var m = require('mithril');

var DropDown = {
  controller: function() {
    this.visible = m.prop(false);
  },
  view: function(ctrl, label, listContent) {
    return m('.drop-down-container', {
      onclick: ctrl.visible.bind(ctrl, true)
    }, [
      label,
      ctrl.visible() ?
        m('.drop-down', {
          onmouseleave: ctrl.visible.bind(ctrl, false)
        }, [
          m('.list', listContent)
        ]) : ''
    ]);
  }
};

module.exports = DropDown;