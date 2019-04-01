const STORAGE_KEY = 'tabale-vuejs'//名字随便起
export default{//向外输出，以便于接收数组
    fetch(){
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY)||'[]')        
    },
    save(items){
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
}