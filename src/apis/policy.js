import Api from './Api'

export const getPolicyList = () => Api.get('/policy/list')
export const getPolicyInfo = (name) => Api.get(`/policy/${name}`)
export const updatePolicyInfo = (name, info) => Api.post(`/policy/${name}`, { policy : info })
export const deletePolicy = (name) => Api.delete(`/policy/${name}`)