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
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

/*
Route.get('/', async () => {
  return { hello: 'world' }
})
*/

Route.post('/usuarios', 'UsuariosController.store')
Route.post('/forgot-password', 'PasswordsController.forgotPassword')
Route.post('/reset-password', 'PasswordsController.resetPassword')
Route.post('/clientes', 'ClientesController.store') //.middleware('auth')
Route.post('/enderecos', 'EnderecosController.store')
Route.post('/telefones', 'TelefonesController.store')
Route.post('/produtos', 'ProdutosController.store') //.middleware('auth')
Route.post('/vendas', 'VendasController.store') //.middleware('auth')
//Route.post('/sessions', 'SessionsController.store')

Route.get('/clientes', 'ClientesController.index') //.middleware('auth')
Route.get('/produtos', 'ProdutosController.index') //.middleware('auth')
Route.get('/clientes/:id', 'ClientesController.show') //.middleware('auth')
Route.get('/produtos/:id', 'ProdutosController.show') //.middleware('auth')
Route.get('/telefones/:id', 'TelefonesController.show') //.middleware('auth')
Route.get('/telefones/:id', 'TelefonesController.show') //.middleware('auth')

// Route.delete('/sessions', 'SessionsController.destroy')
Route.delete('/clientes/:id', 'ClientesController.destroy') //.middleware('auth')
Route.delete('/produtos/:id', 'ProdutosController.destroy') //.middleware('auth')
Route.delete('/telefones/:id', 'TelefonesController.destroy') //.middleware('auth')

Route.put('/produtos/:id', 'ProdutosController.update') //.middleware('auth')
Route.put('/telefones/:id', 'TelefonesController.update')
Route.put('/usuarios/:id', 'UsuariosController.update') //.middleware('auth')
Route.put('/enderecos/:id', 'EnderecosController.update')
Route.put('/clientes/:id', 'ClientesController.update') //.middleware('auth')
