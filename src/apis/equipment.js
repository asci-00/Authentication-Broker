import Api from './Api'

export const getEquipList = () => Api.get('/equipment')
export const getTreeEquipList = () => Api.get('/hequipment')
export const getConnectionInfo = (protocol, ip) => Api.get(`/secret/${protocol}/${ip}`)
export const deleteConnectionInfo = (protocol, ip) => Api.delete(`/secret/${protocol}/${ip}`)
export const updateConnectionInfo = (space, path, body) => Api.post(`/secret/${space}/${path}`, { ...body })