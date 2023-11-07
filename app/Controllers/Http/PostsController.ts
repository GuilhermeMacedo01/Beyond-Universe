import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Post from 'App/Models/Post'
import PostService from 'App/Services/PostService'
import CreatePostValidator from 'App/Validators/CreatePostValidator'


export default class PostsController {
  public async create({ view }: HttpContextContract) {
    return view.render('posts/create')
  }

  public async store({ auth,request, response }: HttpContextContract) {
   

    //TODO: Pegar o usuario logado
    const payload = await request.validate(CreatePostValidator)

    // Obtenha o usuário logado usando o middleware 'auth'
    const user = auth.user as User | null;

    if (!user) {
      // Trate o caso em que o usuário não está autenticado
      return response.status(401).send('Usuário não autenticado');
    }

    // Use o usuário para criar o post
    const postService = new PostService();
    const post = await postService.create(user, payload);

    return response.redirect().toRoute('posts.show', { id: post.id });
  }

  public async show({ params, view }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    await post.load('user')

    return view.render('posts/show', { post: post })
  }

  public async update({}: HttpContextContract) {}

  public async patch({}: HttpContextContract) {}

  public async index({ view }: HttpContextContract) {
    const posts = await Post.all()
   
    return view.render('posts/index', {posts: posts})
  }
}
