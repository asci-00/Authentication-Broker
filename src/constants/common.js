export const OPTION_ATTR_COUNT = 3;

export const connectKeyOptions = Object.freeze({
  ssh: ['ID', 'Password', 'Port'],
  api: ['Api_Key', 'Port'],
  api_key: ['ID', 'Password', 'Port'],
  hmac: ['Session_Key', 'Token', 'Port'],
  gui: ['ID', 'Password', 'Port'],
});

export const connectKey = Object.freeze(Object.keys(connectKeyOptions));

export const attributes = Object.freeze([
  { key: 'ip', label: 'IP 주소' },
  { key: 'equip', label: '장비 이름' },
  { key: 'host', label: '호스트 이름' },
  { key: 'model', label: '모델 이름' },
]);

export const defaultValues = {
  type: 'internal',
  connectType: 'ssh',
  customerName: '',
  path: '',
};

export const NOT_FOUND_MESSAGE = '정상적인 접근이 아닙니다. Sniper Automation을 통해 재접속하시기 바랍니다.';
