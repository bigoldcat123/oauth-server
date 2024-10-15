const codeCaches = new Map<string,{
    code:string,
    expires: number
}>()
export const setCodeCache = (key:string,code:string,expires:number) => {
    codeCaches.set(key,{code,expires})
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
    return cache
}
const clearExpiredCaches = () => {
    for (let key of codeCaches.keys()) {
        const cache = codeCaches.get(key)
        if (cache!.expires < Date.now()) {
            codeCaches.delete(key)
        }
      }
}