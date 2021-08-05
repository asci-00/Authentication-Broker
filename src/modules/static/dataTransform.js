const list_key = ['ID', 'Password', 'key_MAC', 'token_MAC']

const getTreeLeafNode = (obj) => {
    const { customerIp, protocol } = obj
    const { model, host, equip, ...list} = obj['data']

    console.log()
    return {
        "text" : protocol ? `${protocol}:${customerIp}` : customerIp,
        "icon": "fa fa-file" ,
        "info" : {
            customerIp, protocol, model, host, equip,
            list : list_key.filter(key => list[key]).map(key => ({
                key, value : list[key]
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
    console.log(obj)
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