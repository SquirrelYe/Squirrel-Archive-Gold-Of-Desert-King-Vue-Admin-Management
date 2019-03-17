const ses=window.sessionStorage;

module.exports={
        
    //设置sessionStorage
    setSes(key,value) {
        ses.setItem(key,value);
    },
    //读取sessionStorage
    getSes(key) {
        return ses.getItem(key);
    },
    //清除sessionStorage
    clearOneSes(key) {
        ses.removeItem(key)
    },
    //清除所有sessionStorage
    clearAllSes() {
        ses.clear()
    }
}