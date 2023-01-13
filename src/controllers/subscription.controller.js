const IngressoKrotonService = require('../services/ingressoKroton.service')

module.exports = class SubscriptionController {
    static async get(request, response, next) {
        try {
            const cpf=request.params.cpf;
            const token = await IngressoKrotonService.getToken();
            const subscription=await IngressoKrotonService.getSubscription(cpf, token.access_token);
            response.json(subscription)
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                next(error.response.data)
            } else {
                console.log(error)
                next(error);
            }
            //response.status(400).json({ success: false })
        }
    }

    static async post(request, response, next){
        try{
            const token = await IngressoKrotonService.getToken();
            const subscription=await IngressoKrotonService.createSubscription(request.body, token.access_token);
            response.json(subscription)
        }
        catch(error){
            if (error.response) {
                console.log(error.response.data)
                response.status(401).json(error.response.data);
                //next(error.response.data)
            } else {
                console.log(error)
                next(error);
            }
        }
    }

    static async courses(request, response, next){
        try{
            const courses = await IngressoKrotonService.getCourses();
            response.json(courses);
        }catch(error){
            if (error.response) {
                console.log(error.response.data)
                response.status(401).json(error.response.data);
                //next(error.response.data)
            } else {
                console.log(error)
                next(error);
            }
        }
    }
}