import User from 'App/Models/User'

export default class UsersController {
  constructor() {}

  public async create(userName:string, email: string, password: string) {
    const user = await User.create({
      userName,
      password,
      email,
    })

    return user
  }
}