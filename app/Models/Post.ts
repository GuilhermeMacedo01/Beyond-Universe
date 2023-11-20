import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import File from 'App/Models/File'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public title: string

  @column()
  public userId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User> 

  @column()
  public coverId: number

  @belongsTo(() => File)
  public cover: BelongsTo<typeof File>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}