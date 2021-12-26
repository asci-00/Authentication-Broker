import { connectKeyOptions } from '@/constants/common';

export const getPath = (treeModel) => {
  let now = treeModel;
  let path = '';

  do {
    path = `/${now.model.text}${path}`;
    now = now.$parent;
  } while (now.model);

  return path;
};

export const searchItem = (now, keyword) => {
  if (now.text.includes(keyword)) now.highlight = true;
  if (now.children?.length) {
    now.children.forEach((child) => {
      if (searchItem(child, keyword)) now.opend = true;
    });
  }
  return now.highlight || now.opend;
};

export const getTreeLeafNode = (obj) => {
  const { customerIp, protocol } = obj;
  const { model, host, equip, ...list } = obj.data;
  const hostName = host || 'default';
  return {
    text: `${protocol}:${customerIp}:${hostName}`,
    icon: 'fa fa-file',
    info: {
      customerIp,
      protocol,
      model,
      host,
      equip,
      list: connectKeyOptions[protocol]
        .filter((key) => list[key])
        .map((key) => ({
          key,
          value: list[key],
        })),
    },
  };
};

export const getTreeSubNode = (parent) =>
  Object.keys(parent).map((subNode) => ({
    text: subNode.slice(0, -1),
    opened: false,
    folder: true,
    children: parent[subNode].length ? parent[subNode].map((child) => getTreeLeafNode(child)) : [],
  }));
// tree data transform function
export const objectToTree = (obj) => [
  {
    text: 'external',
    opened: true,
    folder: true,
    children: getTreeSubNode(obj.external),
  },
  {
    text: 'internal',
    opened: true,
    folder: true,
    children: getTreeSubNode(obj.internal),
  },
];
