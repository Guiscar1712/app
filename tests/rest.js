const axios = require('axios').create({ timeout: 1000000 })

module.exports = class Rest {
    static async sleep (ms)  {
        console.log("\x1b[36m%s\x1b[0m", "sleep", ms)
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    
    static async invoke(method, url, body, headers, sleep){
        try{
            if(sleep){
                await this.sleep(sleep);
            }
        
            console.log("\x1b[33m%s\x1b[0m", "method", method);
            console.log("\x1b[33m%s\x1b[0m", "url", url);
            console.log("\x1b[33m%s\x1b[0m", "body", body);
            console.log("\x1b[33m%s\x1b[0m", "headers", headers);
            //const headers = { "Authorization": "Bearer KPN1uVK0c8U.yW6mnPlMpk0pXhiSNaK2XdWzMMidwE22B5R9xEbibmU" };
            let response = null;
            if (method == "get") {
                response = (await axios.get(url, { headers })).data;
            }
            else if (method == "delete") {
                response = (await axios.delete(url, { headers })).data;
            } 
            else {
                response = (await axios.post(url, body, { headers })).data;
            }
            //console.log("\x1b[34m%s\x1b[0m", "response", response);
            return response;
        }catch(error){
            console.log("\x1b[41m%s\x1b[0m","error:",url )
        }
        
    }
    
    static resultTest(result) {
        if (result) {
            console.log("\x1b[42m%s\x1b[0m", "SUCCESS!");
        } else {
            console.log("\x1b[41m%s\x1b[0m", "FAIL!");
        }
    
        return result;
    }
    
    static async end () {
        console.log("\x1b[44m%s\x1b[0m", "Fim!");
        return true;
    }

    static async error (err) {
        console.log("\x1b[41m%s\x1b[0m", "Erro:", err);
        return true;
    }
}
