import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, HasMany,beforeSave, column, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Post from 'App/Models/Post'

export default class User extends BaseModel {

  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public user_name: string

  @column()
  public rememberMeToken: string | null

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @manyToMany(() => Post, {
    pivotTable: 'user_post',
    pivotRelatedForeignKey: 'post_id',
    pivotForeignKey: 'user_id',
  })
  public likedPosts: ManyToMany<typeof Post>
 
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}