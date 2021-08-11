import Api from './Api'

export const checkAuthentication = (token) => Api.get('/checkauth', { token })