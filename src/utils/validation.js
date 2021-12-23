export const isValidAuth = (type, info) => {
  const [ip, equip] = this.infos.attributes;
  const name = this.infos.customer_name;

  if (type === 'internal' && (ip.value == '' || equip.value == '')) return false;
  if (type === 'external' && (ip.value == '' || name == '')) return false;
  return true;
};
