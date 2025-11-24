export const makeReq = async (address:string, method: string, body?: any, auth?: { token: string, id:string }, isFile: boolean = false) => {
    
    const authHeaders: { id?: string, token?: string } = {}
    if(auth){
        if(auth.id) authHeaders.id = auth.id
        if(auth.token) authHeaders.token = auth.token
    }    

    if(body && method == "POST"){
        const req = await fetch(address, {
            method,
            body: isFile ? body : JSON.stringify(body),
            cache: 'no-store',
            headers: isFile ? {
                ...authHeaders
            } : {
                "Cache-Control": 'no-cache',
                "Pragma": 'no-cache',
                "Content-Type": "application/json",
                ...authHeaders
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
                ...authHeaders
            },
            referrerPolicy: "unsafe-url" 
        })
        return await req.json()
    }

}