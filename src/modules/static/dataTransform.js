const getTreeLeafNode = (obj) => {
    const { customerIp, protocol } = obj
    const { model, host, equip, ...list} = obj['data']

    return {
        "text" : protocol ? `${protocol}:${customerIp}` : customerIp,
        "icon": "fa fa-file" ,
        "info" : {
            customerIp, protocol, model, host, equip,
            list : Object.keys(list).map(item_key => ({
                key : item_key,
                value : list[item_key]    
            }))
        }
    }
}
const getTreeSubNode = (parent) => {
    return Object.keys(parent).map(subNode => ({
        "text" : subNode,
        "opened" : false,
        "folder" : true,
        "children" : parent[subNode].length ? parent[subNode].map(child => getTreeLeafNode(child)) : []
    }))
}

export const objectToTree = (obj) => {
    return [
        {
            "text" : "external",
            "opened" : true,
            "folder" : true,
            "children" : getTreeSubNode(obj['external'])
        },
        {
            "text" : "internal",
            "opened" : true,
            "folder" : true,
            "children" : getTreeSubNode(obj['internal'])
        }
    ]
}