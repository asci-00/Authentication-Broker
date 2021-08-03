export const category = [
  { label: '권한명', field: 'permission' },
  { label: '경로', field: 'paths' },
  { label: '권한종류', field: 'permission-type' }
]

export const columns = [
  { key: '1', field: 'permission', title: '권한', align: 'center' },
  { key: '2', field: 'paths', title: '경로', align: 'center' },
  { key: '3', field: 'permission-type', title: '권한종류', align: 'center' },
  { key: '4', field: 'actions', title: '동작', width: 100 }
]
export const permColumns = [
  { key: '1', field: 'path', title: '경로', align: 'left' }
]
export const buttons = [
  { label: '신규등록', onClick: () => undefined, className: 'ac-button' }
]

//debug code

const createData = () => {
  const data = []
  for (let i = 1; i <= 100; i++) {
    data.push({
      'permission': '권한' + i,
      'paths': '/etc' + i,
      'permission-type': 'permission type' + i
    })
  }
  return data
}
export const data = createData()
export const permission_data = [

]
export const tree_data = [
  {
    "text": "external",
    "opened": true,
    "folder": true,
    "children": [
      { "text": "KT" },
      { "text": "Hoseo",
        "folder" : true,
        "children" : [
          { "text": "SSH:000.000.000.001", "icon": "fa fa-file", "info" :
          {
            ip : "000.000.000.1",
            equip : "EquipName",
            host : "HostName",
            model : "ModelName",
            connect : "API",
            list  : [
              {key : "Port" ,value : "22"},
              {key : "ID" ,value : "root"},
              {key : "Password" ,value : "123"}
            ]
          }},
        ]
      }
    ]
  },
  {
    'text': 'internal',
    'folder' : true
  }
]

export const example_data = [
  {
    'text': 'Same but with checkboxes',
    'opened': true,
    'folder': true,
    'children': [
      { 'text': 'initially selected', 'selected': true },
      { 'text': 'custom icon', 'icon': 'fa fa-file', 'custom' : {data : 'test', custom:'filter'} },
      {
        'text': 'initially open',
        'icon': 'fa fa-folder icon-state-default',
        'opened': true,
        'children': [
          {
            'text': 'Another node'
          }
        ]
      },
      {
        'text': 'custom icon',
        'icon': 'fa fa-warning icon-state-warning'
      },
      {
        'text': 'disabled node',
        'icon': 'tree-icon tree-themeicon',
        'disabled': true
      }
    ]
  },
  {
    'text': 'And wholerow selection'
  }
]

