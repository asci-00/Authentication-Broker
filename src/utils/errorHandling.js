export function setError(error) {
  console.error(error);
  this.$alert('관리자에게 문의해주세요', 'Error');
}
/// / const message = err.rt === 403 ? '세션이 유효하지 않습니다.' : '관리자에게 문의해주세요';
