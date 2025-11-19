export const getFullTime = (value: number | string) => {
    const date = new Date(value)  
    return `${date.getDate() < 10 ? '0'+date.getDate() : date.getDate()}.${date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1}.${date.getFullYear()} ${date.getHours() < 10 ? '0'+date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()}`
}