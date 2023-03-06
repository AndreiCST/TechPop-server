| method | URI path                                                              | description                                                    |
|--------|-----------------------------------------------------------------------|----------------------------------------------------------------|
| GET    | /products/get-products?category=AAA&subcategory=BBB&location=CCC etc. | Busca productos, establece condiciones a traves de las queries |
| POST   | /products/create-product                                              | Crea un nuevo producto a la base de datos                      |
| GET    | /products/:id                                                         | Trae un producto en especifico                                 |
| POST   | /products/:id/edit                                                    | Edita un producto en especifico                                |
| POST   | /products/:id/delete                                                  | Borra un producto en especifico                                |
| GET    | /user/:id                                                             | Trae un usuario en especifico                                  |
| POST   | /user/edit/:id                                                        | Edita un usuario en especifico                                 |
| POST   | /user/delete/:id                                                      | Borra un usuario en especifico                                 |
| POST   | /signup                                                               | crea nuevo usuario                                             |
| POST   | /login                                                                | conecta al usuario                                             |
| GET    | /verify                                                               | verifica la cuenta                                             |