export const makeReq = async (address:string, method: string, body?: any, isFile: boolean = false) => {
    
    if(body && method == "POST" || method == "PUT"){
        const req = await fetch(address, {
            method,
            body: isFile ? body : JSON.stringify(body),
            cache: 'no-store',
            headers: isFile ? {} : {
                "Cache-Control": 'no-cache',
                "Pragma": 'no-cache',
                "Content-Type": "application/json"
            }
        })
        return await req.json()
    } else if(method == "GET" || method == "DELETE"){        
        const req = await fetch(address, {
            method,
            cache: 'no-store',
            headers: {
                "Cache-Control": 'no-cache',
                "Pragma": 'no-cache',
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        })
        return await req.json()
    }

}