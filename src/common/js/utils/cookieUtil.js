export default {
    setCookie: function (cname, cvalue, exdays) {
        let d = new Date()
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
        let expires = 'expires=' + d.toUTCString()
        document.cookie = cname + '=' + encodeURI(cvalue) + '; ' + expires
    },
    getCookie: function (cname) {
        let name = cname + '='
        let ca = document.cookie.split(';')
        // console.log("获取cookie,现在循环")
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            // console.log(c)
            while (c.charAt(0) === ' ') c = c.substring(1)
            if (c.indexOf(name) !== -1) {
                let value=c.substring(name.length, c.length);
                return decodeURI(value);
            }
        }
        return ''
    },
    clearCookie: function (cname) {
        this.setCookie(cname, '', -1)
    }
}