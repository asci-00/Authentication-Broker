import Api from './Api';

export const checkAuthentication = (hash) => Api.get(`/checkauth/${hash}`);
