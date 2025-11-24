export const makeReq = async (address:string, method: string, body?: any, isFile: boolean = false) => {
    
    if(body && method == "POST"){
        const req = await fetch(address, {
            method,
            body: isFile ? body : JSON.stringify(body),
            cache: 'no-store',
            headers: isFile ? {} : {
                "Cache-Control": 'no-cache',
                "Pragma": 'no-cache',
                "Content-Type": "application/json"
            },
            referrerPolicy: "unsafe-url" 
        })
        return await req.json()
    } else if(method == "GET"){        
        const req = await fetch(address, {
            method,
            cache: 'no-store',
            headers: {
                "Cache-Control": 'no-cache',
                "Pragma": 'no-cache',
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            referrerPolicy: "unsafe-url" 
        })
        return await req.json()
    }

}