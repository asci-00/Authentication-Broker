//tree data set
import { connect_keys } from './common';

const getTreeLeafNode = (obj) => {
    const { customerIp, protocol } = obj;
    const { model, host, equip, ...list } = obj['data'];
    const host_name = host && host !== '' ? host : 'default';
    return {
        text: `${protocol}:${customerIp}:${host_name}`,
        icon: 'fa fa-file',
        info: {
            customerIp,
            protocol,
            model,
            host,
            equip,
            list: connect_keys[protocol]
                .filter((key) => list[key])
                .map((key) => ({
                    key,
                    value: list[key],
                })),
        },
    };
};
const getTreeSubNode = (parent) => {
    return Object.keys(parent).map((subNode) => ({
        text: subNode.slice(0, -1),
        opened: false,
        folder: true,
        children: parent[subNode].length
            ? parent[subNode].map((child) => getTreeLeafNode(child))
            : [],
    }));
};
//tree data transform function
export const objectToTree = (obj) => {
    return [
        {
            text: 'external',
            opened: true,
            folder: true,
            children: getTreeSubNode(obj['external']),
        },
        {
            text: 'internal',
            opened: true,
            folder: true,
            children: getTreeSubNode(obj['internal']),
        },
    ];
};
//policy create function
export const getRequestParam = (obj) => {
    const host = obj.required_info[2];
    const host_name = host && host.value !== '' ? host.value : 'default';
    const path =
        (obj.type === 'internal'
            ? obj.required_info[1]['value']
            : obj.customer_name) +
        `/${obj.connect_type}:${obj.required_info[0]['value']}:${host_name}`;
    //key-value 생성
    const allData = [...obj.required_info, ...obj.connect_info];
    const data = {};
    allData.forEach((item) => {
        if (item['key'] == 'none' || item['value'] == '') return;
        data[item['key']] = item['value'];
    });
    return { type: obj.type, path, data: { data } };
};

export const objectToHCL = (arr) => {
    let hclString = '';
    arr.forEach((role) => {
        hclString += `path "${role.path}" { capabilities = [${role.capabilities
            .map((r) => `"${r}"`)
            .join(',')}] } `;
    });
    return hclString;
};
