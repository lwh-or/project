// 获取
export const getItem = key =>{
    const value = localStorage.getItem(key)
    try{
      return JSON.parse(value)
    }catch(e){
       return value
    }
}

// 设置
export const setItem = (key,value) =>{
    localStorage.setItem(key,JSON.stringify(value))
}

// 删除
export const removeItem = key =>{
    localStorage.removeItem(key)
}