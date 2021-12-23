export const category = [{ label: '권한명', field: 'name' }];

export const columns = [
  { key: '1', field: 'name', title: '권한', align: 'left' },
  {
    key: '4',
    field: 'actions',
    title: '동작',
    width: 100,
  },
];
export const permColumns = [
  {
    key: '1',
    field: 'path',
    title: '경로',
    align: 'left',
    width: 100,
    renderBodyCell: ({ row }, h) => h('div', { attrs: { class: 'content-small' } }, row.path),
  },
];
