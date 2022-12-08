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
        "cpf": "305.250.918-74",
        "email": "ricardo.sampaio@bluecore.it",
        "phone": "(15)981270060",
        "gender": "m",
        "birthday": "1983-06-21"
    });
}

const changePassword = async () => {
    const recoveryKey = await Rest.invoke("post", "http://localhost:3000/api/user/getRecoveryKey", {
        "email": "ricardo.sampaio@bluecore.it"
    });

    await Rest.invoke("post", "http://localhost:3000/api/user/changePassword", {
        "code": recoveryKey,
        "email": "ricardo.sampaio@bluecore.it",
        "password": "123456"
    })
}

const uploadPhoto = async () => {
    const recoveryKey = await Rest.invoke("post", "http://localhost:3000/api/user/getRecoveryKey", {
        "email": "ricardo.sampaio@bluecore.it"
    });

    const token = await Rest.invoke("post", "http://localhost:3000/api/user/validate", {
        "email": "ricardo.sampaio@bluecore.it",
        "code": recoveryKey
    });
    console.log("token:", token);
    
    const headers = { "token": token }

    await Rest.invoke("POST", "http://localhost:3000/api/user/photo", {
        base64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="
    }, headers);


}

const login = async ()=>{

    const token = await Rest.invoke("post", "http://localhost:3000/api/user/login", {
        "email": "ricardo.sampaio@bluecore.it",
        "password": "123456"
    })

    return token;
}

const update = async (headers)=>{
    let meData = await Rest.invoke("get", "http://localhost:3000/api/user/me", null, headers);
    console.log("meData:", meData);

    meData.city="Sorocaba";
    meData.address="Laurindo Marques";
    meData.number="153";

    await Rest.invoke("put", "http://localhost:3000/api/user/", meData, headers);
}

const run = async () => {
    //await register();
    //await changePassword();
    //await uploadPhoto();

    const token = await login();
    const headers = { "token": token }

    await update(headers);
}

run();