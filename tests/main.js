const Rest = require('./rest')

const register = async ()=>{
    const users = await Rest.invoke("get", "http://localhost:3000/api/user/");
    for (const user of users) {
        if (user.email == "ricardo.sampaio@bluecore.it") {
            await Rest.invoke("delete", "http://localhost:3000/api/user/" + user.id)
        }
    }
  
    Rest.invoke("post", "http://localhost:3000/api/user/register", {
        "name":"Ricardo Sampaio",
        "cpf":"305.250.918-74",
        "email":"ricardo.sampaio@bluecore.it",
        "phone":"(15)981270060",
        "gender":"m",
        "birthday":"1983-06-21"
    });
}

const changePassword=async ()=>{
    const recoveryKey = await Rest.invoke("post", "http://localhost:3000/api/user/getRecoveryKey", {
        "email":"ricardo.sampaio@bluecore.it"
    });

    await Rest.invoke("post", "http://localhost:3000/api/user/changePassword", {
        "code":recoveryKey,
        "email":"ricardo.sampaio@bluecore.it",
        "password":"123456"
    })
}

const run = async () => {
    
    const token = await Rest.invoke("post", "http://localhost:3000/api/user/login", {
        "email":"ricardo.sampaio@bluecore.it",
        "password":"123456"
    })

    const headers = {"token":token}

    const meData = await Rest.invoke("get", "http://localhost:3000/api/user/me", null, headers);
    console.log("meData:", meData)

    //console.log("token:", token);

}

run();