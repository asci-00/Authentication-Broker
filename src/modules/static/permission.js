export const category = [
  { label: '권한명', field: 'name' },
]

export const columns = [
  { key: '1', field: 'name', title: '권한', align: 'left' },
  { key: '4', field: 'actions', title: '동작', width: 100 }
]
export const permColumns = [
  { key: '1', field: 'path', title: '경로', align: 'left', width: 100,
  renderBodyCell: ({ row, column, rowIndex }, h) => (<div class="content-small">{row['path']}</div>) }
]

//develop code

const createData = () => {
  const data = []
  for (let i = 1; i <= 100; i++) {
    data.push({
      'name': '권한' + i,
    })
  }
  return data
}
export const data = createData()
export const permission_data = [

]
export const tree_data_example = [
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

export const tree_data_example2 = [
  {
     "text":"external",
     "opened":true,
     "folder":true,
     "children":[
        {
           "text":"kt/",
           "opened":false,
           "folder":true,
           "children":[
              {
                 "text":"ssh:111.123.11.113",
                 "icon":"fa fa-file",
                 "info":{
                    "customerIp":"111.123.11.113",
                    "protocol":"ssh",
                    "list":[
                       {
                          "key":"id",
                          "value":"aaa"
                       },
                       {
                          "key":"ip",
                          "value":"111.123.11.113"
                       },
                       {
                          "key":"password",
                          "value":"adfasdf"
                       },
                       {
                          "key":"port",
                          "value":"22"
                       },
                       {
                          "key":"recentCertification",
                          "value":"2021-08-04T13:55:18.6718995+09:00"
                       },
                       {
                          "key":"recentCretificatrion",
                          "value":"2021-07-31"
                       }
                    ]
                 }
              }
           ]
        }
     ]
  },
  {
     "text":"internal",
     "opened":true,
     "folder":true,
     "children":[
        {
           "text":"BD1",
           "opened":false,
           "folder":true,
           "children":[
              {
                 "text":"1.1.1.1",
                 "icon":"fa fa-file",
                 "info":{
                    "customerIp":"1.1.1.1",
                    "protocol":"",
                    "list":[
                       {
                          "key":"ip",
                          "value":"1.1.1.1"
                       },
                       {
                          "key":"recentCertification",
                          "value":"2021-08-04T20:51:23.152372046+09:00"
                       },
                       {
                          "key":"sex",
                          "value":"sex"
                       },
                       {
                          "key":"건욱이",
                          "value":"뭐해"
                       },
                       {
                          "key":"뭐여",
                          "value":"시발"
                       }
                    ]
                 }
              }
           ]
        },
        {
           "text":"PRS",
           "opened":false,
           "folder":true,
           "children":[
              {
                 "text":"123.4.125.22",
                 "icon":"fa fa-file",
                 "info":{
                    "customerIp":"123.4.125.22",
                    "protocol":"",
                    "equip":"PRS",
                    "list":[
                       {
                          "key":"ID",
                          "value":"123"
                       },
                       {
                          "key":"Password",
                          "value":"123"
                       },
                       {
                          "key":"ip",
                          "value":"123.4.125.22"
                       },
                       {
                          "key":"recentCertification",
                          "value":"2021-08-04T20:48:20.201326027+09:00"
                       }
                    ]
                 }
              }
           ]
        },
        {
           "text":"rms",
           "opened":false,
           "folder":true,
           "children":[
              {
                 "text":"111.12.154.123",
                 "icon":"fa fa-file",
                 "info":{
                    "customerIp":"111.12.154.123",
                    "protocol":"",
                    "list":[
                       {
                          "key":"api",
                          "value":"asdfasdfasdfasdfasdfasdf"
                       },
                       {
                          "key":"id",
                          "value":"aaaaaa"
                       },
                       {
                          "key":"ip",
                          "value":"111.12.154.123"
                       },
                       {
                          "key":"password",
                          "value":"aasdfasdf"
                       },
                       {
                          "key":"port",
                          "value":"43"
                       },
                       {
                          "key":"recentCertification",
                          "value":"2021-08-01T20:43:08.0402139+09:00"
                       },
                       {
                          "key":"recentCretificatrion",
                          "value":"2021-08-01"
                       }
                    ]
                 }
              }
           ]
        }
     ]
  }
]