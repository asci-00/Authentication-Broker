export function setError(error) {
  console.error(error);
  this.$alert('관리자에게 문의해주세요', 'Error');
}
