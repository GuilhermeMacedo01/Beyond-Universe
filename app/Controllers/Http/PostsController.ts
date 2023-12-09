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

  public async destroy({ params, response }: HttpContextContract) {

    const postId = params.id

    const post = await Post.query().where('id', postId).firstOrFail()

    // Remove os likes relacionados a este post
    await post.related('likedUsers').detach()

    // Agora, exclui o post
    await post.delete()

    // Redireciona após a exclusão bem-sucedida
    return response.redirect().toRoute('posts.index')

  }
  

  public async index({ view }: HttpContextContract) {
    const posts = await Post.all()
   
    return view.render('posts/index', {posts: posts})
  }

  public async like({ auth, params }: HttpContextContract) {
  
    const post = await Post.findOrFail(params.id)
    
    const user = auth.user as User | null;
    if (!user) {
      // Trate o caso em que o usuário não está autenticado
      return "Não achei";
    }

    console.log("chamei")

 
    const service = new PostService()
    
  
    const liked = await service.like(user, post)
    console.log(liked)

    return { id: post.id, liked: liked }
  }

  public async indexByUser({ auth, view }: HttpContextContract) {
    
    const user = auth.user as User | null;
    if (!user) {
      // Trate o caso em que o usuário não está autenticado
      return "Não achei";
    }


    // Carrega os posts associados a este usuário
    await user.load('posts')

    return view.render('posts.index', { user, posts: user.posts })
  }
  

  public async userLiked({ auth, view, response }: HttpContextContract) {

    const user = auth.user as User | null

    if (!user) {
      // Trate o caso em que o usuário não está autenticado
      return response.status(401).send('Usuário não autenticado')
    }
  
    await user.load('likedPosts', (query) => {
      query.preload('user') // Carrega os usuários que criaram os posts
      query.preload('likedUsers') // Carrega os usuários que curtiram esses posts
    })
    //console.log('Posts curtidos pelo usuário:', user.likedPosts)
  
    return view.render('posts.index', { user, posts: user.likedPosts })
  }
  
}
