export const category = [
    {label : "고객사명", field : "customerName"},
    {label : "장비명", field : "equipment"},
    {label : "모델명", field : "model"},
    {label : "호스트명", field : "host"},
]
export const columns = [
    { key:'2', field : 'customerName', title : '고객사', align:'center' },
    { key:'11', field : 'model', title : '모델이름', align:'center' },
    { key:'1', field : 'equipment', title : '장비이름', align:'center' },
    { key:'12', field : 'host', title : '호스트이름', align:'center' },
    { key:'3', field : 'customerIp', title : 'IP Address', align:'center' },
    { key:'8', field : 'createdTime', title : '등록일', align:'center' },
    { key:'9', field : 'recentCertification', title : '최근 인증 시간', align:'center' },
]
export const buttons = [
    { label : '신규등록', onClick : () => undefined, className : 'ac-button' },
]

//debug code

const createData = () => {
    const data = []
    for(let i = 1; i <= 100; i++) {
        data.push({
            'customer' : '고객사' + i,
            'model' : '모델' + i,
            'host' : '호스트' + i,
            'equipment' : '장비' + i,
            'last-change' : '2017-09-12 12:11',
            'ip-addr' : '000.000.000.000',
            'last-auth' : '2017-09-12 12:11',
        })
    }
    return data
}
export const data = createData()

