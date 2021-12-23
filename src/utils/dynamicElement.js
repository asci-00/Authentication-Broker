export const createButton = ({ h, label, className, onClick }) =>
  h('input', {
    attrs: { type: 'button', value: label, class: className },
    on: { click: onClick },
  });
