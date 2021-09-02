//export const connect_keys = ['ID', 'Password', 'Session_Key', 'Token', 'Api_Key', 'Port']
export const connect_keys = {
    ssh : ['ID', 'Password', 'Port'],
    api : ['Api_Key', 'Port'],
    hmac : ['Session_Key', 'Token', 'Port'],
    gui : ['ID', 'Password', 'Port']
}
