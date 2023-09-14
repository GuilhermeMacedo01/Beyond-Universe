import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from   'App/Models/User'

export default class UsersController {
    public async create({ view }: HttpContextContract){
        return view.render('user/create')
    }
    public async store({ view }: HttpContextContract){
        return view.render('user/create')
    }
}
