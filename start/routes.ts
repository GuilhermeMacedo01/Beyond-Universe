/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'


Route.get('/', async ({ view }) => {
  return view.render('home')
}).as('index')

Route.get('/login', 'SessionsController.create').as('sessions.create')
Route.post('/login', 'SessionsController.store').as('sessions.store')
Route.get('/logout', 'SessionsController.delete').as('sessions.delete')


Route.get('/user', 'UsersController.index').as('users.create')
Route.get('/user/:id', 'UsersController.show') .as('users.show')
Route.delete('/user/:id', 'UsersController.destroy').as('users.destroy')
Route.patch('/user/:id', 'UsersController.update').as('users.update')
Route.post('/user', 'UsersController.store').as('users.store')


Route.group(() =>{
  Route.get('/', 'DocumentsController.index').as('index')
  Route.get('/:id', 'DocumentsController.show').as('show')
  Route.post('/', 'DocumentsController.store').as('store')
})
  .prefix('/documents')
  .middleware('auth')
  .as('documents')

 
Route.group(() => {
        Route.get('/', 'PostsController.index')
        Route.get('/id', 'PostsController.show') 
        Route.delete('/:id', 'PostsController.destroy')
        Route.patch('/:id', 'PostsController.update')
        Route.post('/', 'PostsController.store').as('posts.store')
    }).prefix('/posts')