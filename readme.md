# Service Platform

* [Execução com Docker](#execução-com-docker)
* [Configuração do ambiente de desenvolvimento](#configuração-do-ambiente-de-desenvolvimento)
* [Como Contribuir](#como-contribuir)
	* [Regras para o Pull Request ser aceito](#Regras-para-o-pull-request-ser-aceito)

# Execução com Docker

#### Pré-requisitos: 
1. <a href="https://docs.docker.com/engine/install/ubuntu/" target="_blank">Instale o Docker Engine</a>
2. <a href="https://docs.docker.com/engine/install/linux-postinstall/">Atribua seu usuário ao grupo do Docker</a>

#

1. Entre no diretório da aplicação.
	```bash
		cd customer-base
	```

1. Crie um arquivo ```.env``` com as variáveis de ambiente e altere os valores.
	```bash
		echo -e "DB_USER=username\nDB_PASSWORD=password" > .env
	```

2. Execute a aplicação com o comando: 
	```bash
		docker compose up
	```

	Se preferir deixar executando em segundo plano use a flag `-d`.

	Para parar a execução e remover os containers, execute:

	```bash
		docker compose down
	```

# Configuração do ambiente de desenvolvimento

#### Pré-requisitos:
1. <a href="https://adoptium.net/pt-BR/temurin/releases?version=17" target="_blank">JDK 17</a>
2. <a href="https://www.postgresql.org/download/" target="_blank">PostgreSQL</a>
3. <a href="https://www.pgadmin.org/download/" target="_blank">pgAdmin</a>
4. <a href="https://www.postman.com/downloads/" target="_blank">Postman</a>
#

 1. Instale o PostgreSQL
 2. Crie um novo banco de dados no pgAdmin
		<img src="./prints/cria-db-ex1.png">
		<img src="./prints/cria-db-ex2.png">
 3. Adicione as variáveis de ambiente no IntelliJ. Vá até o menu Run > Edit Configurations:
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


# Como Contribuir:



### Regras para o pull request ser aceito

#### 1. Não utilize um mesmo commit para trechos de código que não tenham uma relação direta
- Evite mexer em funcionalidades de contextos diferentes em um mesmo commit. Essa prática dificulta muito na hora de identificar em qual commit um bug foi adicionado por exemplo.
- Caso necessário faça em commits separados.