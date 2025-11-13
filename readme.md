# Service Platform

* [Como configurar](#como-configurar)
* [Regras](#regras)
	* [Commits](#commits)

# Como configurar:

 1. Java SDK 17
 2. PostgreSQL
 3. pgAdmin
 4. Postman

#### usando IntelliJ:

 1. Instale o PostgreSQL
 2. Crie um novo banco de dados no pgAdmin
		<img src="./prints/cria-db-ex1.png">
		<img src="./prints/cria-db-ex2.png">
 3. Crie as variáveis de ambiente. Vá até o menu Rum > Edit Configurations:
		<img src="./prints/environment-var1.png">
 4. Vá até Environment variables e clique no botão na direita para editar:
		<img src="./prints/environment-var2.png">
 5. Coloque o nome das variáveis de ambiente de acordo com os nomes em application.properties
		<img src="./prints/environment-var3.png">
 6. Os valores devem corresponder ao banco de dados:
		<img src="./prints/pgadmin-properties.png">
		<img src="./prints/env-config.png">
 7. Importe as collections para o Postman:
		<img src="./prints/postman-import-ex1.png">
        <img src="./prints/postman-import-ex2.png">
 8. Todas as queries estão nos collections
        <img src="./prints/queries-ex1.png">
        <img src="./prints/queries-ex2.png">


# Regras:

### Commits

- Seja o commit pra incrementar algo ou para corrigir um trecho de código, não mexa em outros trechos de código que não tenham relação direta em um mesmo commit. Casa necessário faça em commits separados.
- Evite mexer em funcionalidades de contextos diferentes em um mesmo commit. (Essa pratica dificulta muito na hora de identificar em qual commit um bug foi adicionado por exemplo.)

