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
  {
    key: '2',
    field: 'buttons',
    title: '',
    align: 'right',
    width: 20,
  },
];

export const RESOURCE = {
  TITLE: '권한 목록',
  BUTTON: '생성',
  MODAL: 'policy-modal',
  POPUP: {
    NEW: {
      title: '권한 생성',
      guideMessage: 'Authentication Broker에서 사용할 권한을 생성합니다.',
      isNew: true,
    },
    UPDATE: {
      title: '권한 변경',
      guideMessage: 'Authentication Broker에서 사용할 권한을 변경합니다.',
      isNew: false,
    },
    PERMISSION_NAME: '권한명',
    PERMISSION_LIST: '권한 목록',
    TREE: {
      TITLE: '인증디렉토리',
      PERMISSION: '권한',
      BUTTON: { label: 'X', className: 'small secondary' },
    },
    BUTTONS: {
      APPLY: { label: '적용', className: 'primary' },
      SUBMIT: { label: '확인', className: 'primary' },
      CANCEL: { label: '취소', className: 'secondary' },
    },
  },
  BUTTONS: {
    CREATE: { label: '변경', className: 'primary' },
    DELETE: { label: '삭제', className: 'secondary' },
  },
  ALERT_MESSAGE: {
    SUCCESS: '적용되었습니다',
    DELETE_CHECK: '삭제하시겠습니까?',
    CENCEL_CHECK: '취소하시겠습니까?',
    REQUIRE_CHECK: '필수항목을 입력해주십시오.',
  },
};
