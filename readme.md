# Service Platform

#### Necessário para rodar:

 1. Java SDK 17 - (Eu recomendo o [Amazon Corretto](https://aws.amazon.com/pt/corretto))
 2. PostgreSQL - [PostgreSQL Version 14.2](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
 3. pgAdmin - [pgAdmin 4](https://www.pgadmin.org/download/)
 4. Postman - [Postman](https://www.postman.com/downloads/)

Baixe tudo por aqui - [Google Drive](https://drive.google.com/drive/folders/1yLczmXNYp7ogYl5ozSot4wauF0vo5m1q?usp=sharing)
#### Como configurar: 

 1. Instale o PostgreSQL
 2. Crie dois Bancos de dados no pgAdmin (um para o customer-base e outro para records):
		<img src="./prints/cria-db-ex1.png">
		<img src="./prints/cria-db-ex2.png">
 3. Para cada projeto, crie as variáveis de ambiente. Vá até o menu Rum > Edit Configurations:
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
 8. Agora pode rodar ambos os projetos, as requisições podem ser feitas no Postman todas as queries estão nos collections importados.
        <img src="./prints/queries-ex1.png">
        <img src="./prints/queries-ex2.png">

