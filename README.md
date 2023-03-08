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
| GET   x| /user/profile/:user_id                                                | Informacion basica del usuario                                 |
<<<<<<< HEAD
| GET   x| /user/conversations/:user_id                                          | Conversaciones del usuario                                     |
=======
| GET   x| /user/conversations/conversation/:user_id                             | Conversaciones del usuario                                     |
>>>>>>> miguel
| GET   x| /user/valorations/:user_id                                            | Valoraciones del usuario                                       |
| GET   x| /user/traded/selling/:user_id                                         | Productos en venta del usuario                                 |
| GET   x| /user/traded/sold/:user_id                                            | Productos vendidos del usuario                                 |
| GET   x| /user/traded/purchased/:user_id                                       | Productos comprados por el usuario                             |
| GET    | /user/valorations/:user_id                                            | Valoraciones del usuario                                       |
| GET   x| /user/favourites/favouriteproducts/:user_id                           | Productos favoritos del usuario                                |
| GET   x| /user/favourites/favouritesellers/:user_id                            | Vendedores favoritos del usuario                               |
| GET    | /user/traded/selling/:user_id                                         | Productos en venta del usuario                                 |
| GET    | /user/traded/sold/:user_id                                            | Productos vendidos del usuario                                 |
| GET    | /user/traded/purchased/:user_id                                       | Productos comprados por el usuario                             |
| GET   x| /user/wallet/:user_id                                                 | Cartera del usuario                                            |
| GET    | /user/wallet/transactions/:user_id                                    | Cartera del usuario                                            |
| POST  x| /user/favourites/favouriteproducts/delete/:user_id/:product_id        | Borra el producto de favoritos                                 |
| POST  x| /user/favourites/favouriteproducts/add/:user_id/:product_id           | Añade producto a favoritos                                     |
| POST  x| /user/favourites/favouritesellers/delete/:user_id                     | Elimina vendedor favorito                                      |
| POST  x| /user/favourites/favouritesellers/add/:user_id                        | Añade vendedor favorito                                        |
| POST  x| /user/conversations/create/:buyer_id/:seller_id                       | Crea conversacion                                              |
<<<<<<< HEAD
| POST  x| /user/conversations/add-message/:user_id/:conversation_id             | Añade mensaje a conversacion                                   |
=======
| POST  x| /user/conversations/add-message/:conversation_id/:user_id             | Añade mensaje a conversacion                                   |
>>>>>>> miguel
| POST  x| /user/conversations/delete/:conversation_id                           | Elimina conversacion                                           |
| POST  x| /user/valorations/create/:product_id/:user_id                         | Crea valoracion                                                |
| PUT   x| /user/traded/selling/add/:user_id/:product_id                         | Añade un producto en venta                                     |
| PUT   x| /user/traded/sold/add/:user_id/:product_id                            | Añade un producto vendido                                      |
| POST  x| /user/traded/purchased/add/:user_id/:product_id                       | Añade un producto comprado                                     |
| POST   | /user/wallet/add-founds/:user_id                                      | Suma fondos a la cuenta y crea la transacion                   |
| POST   | /user/wallet/rest-founds/:user_id                                     | Resta fondos a la cuenta  y crea la transacion                 |
| POST  x| /user/profile/edit/:id                                                | Edita un usuario en especifico                                 |
| POST  x| /user/profile/delete/:id                                              | Borra un usuario en especifico                                 |
|--------|-----------------------------------------------------------------------|----------------------------------------------------------------|
| GET    | /verify                                                               | verifica la cuenta                                             |
| POST   | /signup                                                               | crea nuevo usuario                                             |
| POST   | /login                                                                | conecta al usuario                                             |