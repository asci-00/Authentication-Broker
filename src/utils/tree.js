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

export const $ = () => 0;
