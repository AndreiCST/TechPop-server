| method | Path                                                                  | Description                                                    |
|--------|-----------------------------------------------------------------------|----------------------------------------------------------------|
| GET    | /products/get-products                                                | Busca productos, establece condiciones a traves de las queries |
| GET    | /products/details/:id                                                 | Trae un producto en especifico                                 |
| GET    | /products/category                                                    | Trae las categorias                                            |
| GET    | /products/subcategory                                                 | Trae las subcategorias                                         |
| POST   | /products/create-product                                              | Crea un nuevo producto a la base de datos                      |
| POST   | /products/edit/:id                                                    | Edita un producto en especifico                                |
| POST   | /products/delete/:id                                                  | Borra un producto en especifico                                |
| GET    | /products/category/create                                             | Crea una categoria                                             |
| GET    | /products/subcategory/create                                          | Crea una subcategoria                                          |
|--------|-----------------------------------------------------------------------|----------------------------------------------------------------|
| GET    | /user/profile/:user_id                                                | Informacion basica del usuario                                 |
| GET    | /user/conversations/:user_id                                          | Conversaciones del usuario                                     |
| GET    | /user/valorations/:user_id                                            | Valoraciones del usuario                                       |
| GET    | /user/favourite/products/:user_id                                     | Productos favoritos del usuario                                |
| GET    | /user/favourite/sellers/:user_id                                      | Vendedores favoritos del usuario                               |
| GET    | /user/traded/selling/:user_id                                         | Productos en venta del usuario                                 |
| GET    | /user/traded/sold/:user_id                                            | Productos vendidos del usuario                                 |
| GET    | /user/traded/purchased/:user_id                                       | Productos comprados por el usuario                             |
| GET    | /user/wallet/:user_id                                                 | Cartera del usuario                                            |
| GET    | /user/wallet/transactions/:user_id                                    | Cartera del usuario                                            |
| POST   | /user/favourite/products/delete/:product_id                           | Borra el producto de favoritos                                 |
| POST   | /user/favourite/products/add/:product_id                              | Añade producto a favoritos                                     |
| POST   | /user/favourite/sellers/delete/:user_id                               | Elimina vendedor favorito                                      |
| POST   | /user/favourite/sellers/add/:user_id                                  | Añade vendedor favorito                                        |
| POST   | /user/conversations/create/:user_id                                   | Crea conversacion                                              |
| POST   | /user/conversations/add-message/:user_id                              | Añade mensaje a conversacion                                   |
| POST   | /user/conversations/delete/:conv_id                                   | Elimina conversacion                                           |
| POST   | /user/valorations/create/:user_id                                     | Crea valoracion                                                |
| POST   | /user/traded/sold/add/:product_id                                     | Añade producto vendido                                         |
| POST   | /user/traded/purchased/add/:product_id                                | Añade producto comprado                                        |
| POST   | /user/wallet/add-founds/:user_id                                      | Suma fondos a la cuenta y crea la transacion                   |
| POST   | /user/wallet/rest-founds/:user_id                                     | Resta fondos a la cuenta  y crea la transacion                 |
| POST   | /user/profile/edit/:id                                                | Edita un usuario en especifico                                 |
| POST   | /user/profile/delete/:id                                              | Borra un usuario en especifico                                 |
|--------|-----------------------------------------------------------------------|----------------------------------------------------------------|
| GET    | /verify                                                               | verifica la cuenta                                             |
| POST   | /signup                                                               | crea nuevo usuario                                             |
| POST   | /login                                                                | conecta al usuario                                             |