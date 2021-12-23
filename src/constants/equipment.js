export const category = [
  { label: '고객사명', field: 'customerName' },
  { label: '장비명', field: 'equipment' },
  { label: '모델명', field: 'model' },
  { label: '호스트명', field: 'host' },
];
export const columns = [
  { key: '0', field: 'customerName', title: '고객사', align: 'center' },
  { key: '1', field: 'model', title: '모델이름', align: 'center' },
  { key: '2', field: 'equipment', title: '장비이름', align: 'center' },
  { key: '3', field: 'host', title: '호스트이름', align: 'center' },
  { key: '4', field: 'customerIp', title: 'IP Address', align: 'center' },
  { key: '5', field: 'createdTime', title: '등록일', align: 'center' },
  { key: '6', field: 'recentCertification', title: '최근 인증 시간', align: 'center' },
];
export const button = {
  label: '인증 정보 설정',
  className: 'right-button',
};

export const title = '장비 목록';
