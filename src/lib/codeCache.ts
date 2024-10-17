const codeCaches = new Map<string,{
    data:any,
    expires: number
}>()
export const setCodeCache = (key:string,data:any,expires:number) => {
    codeCaches.set(key,{data,expires})
    console.log(codeCaches);
    
    clearExpiredCaches()
}
export const getCodeCache = (key:string) => {
    const cache = codeCaches.get(key)
    if (!cache) return null
    if (cache.expires < Date.now()) {
        codeCaches.delete(key)
        return null
    }
    return cache.data
}
const clearExpiredCaches = () => {
    for (let key of codeCaches.keys()) {
        const cache = codeCaches.get(key)
        if (cache!.expires < Date.now()) {
            codeCaches.delete(key)
        }
      }
}