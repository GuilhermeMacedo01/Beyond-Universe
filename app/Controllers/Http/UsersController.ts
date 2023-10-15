import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from   'App/Models/User'

export default class UsersController {

    public async index({ }: HttpContextContract) {
        const users = await User.all()

        return users
    }
    public async create({ view }: HttpContextContract){
        return view.render('users/create')
    }

    public async destroy({ params }: HttpContextContract) {
        const user = await User.findOrFail(params.id)
        await user.delete()

        return null
    }


    public async update({ request, params }: HttpContextContract) {
        const user = await User.findOrFail(params.id)

        const email = request.input('email', undefined)
        const password = request.input('password', undefined)

        user.email = email ? email : user.email
        user.password = password ? password : user.password

        await user.save()

        return user
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

    public async show({ params }: HttpContextContract) {
        const user = await User.findOrFail(params.id)

        return user
    }
}
