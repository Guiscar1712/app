const Rest = require('./rest')

const register = async () => {
    const users = await Rest.invoke("get", "http://localhost:3000/api/user/");
    for (const user of users) {
        if (user.email == "ricardo.sampaio@bluecore.it") {
            await Rest.invoke("delete", "http://localhost:3000/api/user/" + user.id)
        }
    }

    await Rest.invoke("post", "http://localhost:3000/api/user/register", {
        "name": "Ricardo Sampaio",
        "cpf": "30525091870",
        "email": "ricardo.sampaio2@gmail.com",
        "phone": "",
        "gender": "m",
        "birthday": "1983-06-21"
    });
}





const run = async () => {
    await register();
}

run();