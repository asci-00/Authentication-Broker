import { policyEx, policys } from '@/test/data';
import Api, { delayReturn } from './Api';

// export const getPolicyList = () => Api.get('/policy/list');
// export const getPolicyInfo = (name) => Api.get(`/policy/${name}`);

export const getPolicyList = () => delayReturn({ res: 200, data: policys });

export const getPolicyInfo = (name) => delayReturn({ res: 200, data: policyEx });
export const updatePolicyInfo = (name, info, isNew) => Api.post(`/policy/${name}`, { policy: info, isNew });
export const deletePolicy = (name) => Api.delete(`/policy/${name}`);
