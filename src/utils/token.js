import VueCookies from 'vue-cookies'


export function getToken() {
    return VueCookies.get('token')
}

export function setToken(token) {
    VueCookies.set('token', token,"0")
}

export function removeToken() {
    VueCookies.remove('token')
}