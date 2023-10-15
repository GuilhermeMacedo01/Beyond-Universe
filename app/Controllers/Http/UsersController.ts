import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from   'App/Models/User'

export default class UsersController {
    public async create({ view }: HttpContextContract){
        return view.render('users/create')
    }
    public async store({auth, request, response }: HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')
        const confirm_password = request.input('confirm_password')

        if(password != confirm_password){
            
            return response.redirect().toRoute('users.create')
        }

        const user = await User.create({ email, password })

        await auth.use('web').login(user)

        return response.redirect().toRoute('index')
    }
}