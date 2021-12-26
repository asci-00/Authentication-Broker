export const createButton = ({ h, label, className, onClick }) =>
  h('input', {
    attrs: { type: 'button', value: label, class: className },
    on: { click: onClick },
  });

export const createDiv = ({ h, className, children }) => h('div', { attrs: { class: className } }, [...children]);
