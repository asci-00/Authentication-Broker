export const category = [
    {label : "고객사명", field : "customer"}, 
    {label : "장비명", field : "equipment"}, 
    {label : "인증 상태", field : "auth-state"},
]
export const columns = [
    { key:'1', field : 'permission', title : '구분', align:'center' },
    { key:'2', field : 'customer', title : '고객사', align:'center' },
    { key:'3', field : 'ip-addr', title : 'IP Address', align:'center' },
    { key:'7', field : 'change-cycle', title : '변경주기(월)', align:'center' },
    { key:'8', field : 'last-change', title : '최근 변경일', align:'center' },
    { key:'9', field : 'last-auth', title : '최근 인증 시간', align:'center' },
    { key:'10', field : 'auth-state', title : '인증 상태', },
]
export const buttons = [
    { label : '신규등록', onClick : () => undefined, className : 'ac-button' },
]

//debug code

const createData = () => {
    const data = []
    for(let i = 1; i <= 100; i++) {
        data.push({
            'permission' : '내/외부' + i, 
            'customer' : '고객사' + i,
            'ip-addr' : '000.000.000.000',
            'change-cycle' : 3,
            'last-change' : '2017-09-12 12:11',
            'last-auth' : '2017-09-12 12:11',
            'auth-state' : false
        })
    }
    return data
}
export const data = createData()

