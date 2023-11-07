import User from 'App/Models/User'

export default class UsersController {
  constructor() {}

  public async create(id:string, user_name:string, email: string, password: string) {
    const user = await User.create({
      id,
      user_name,
      password,
      email,
    })

    return user
  }
}