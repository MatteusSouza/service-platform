(instala o nodeenv)
pip install nodeenv

(pra instalar uma versão especifica do node, aqui eu usei a 20.11.0)
nodeenv --node=20.11.0 venv


(entrar na venv do node)
. venv/bin/activate


(Instalar as dependencias do projeto)
npm install


(Para desenvolvimento da interface)
npm run start:dev


(Para testar integração com api, servidor de teste)
npm run test


(Para levantar apenas a api)
npm test/api


(pra sair da venv do node)
deactivate_node


Para windows (Caso precise):

Configurar o python para usar o Virtual Enviromment
https://gist.github.com/MatteusSouza/b46b6f7af089eb1f0be3f322f027abf8


Caso tenha problema de Execution Policies no PowerShell
https://gist.github.com/MatteusSouza/3dc8812552e0727a717c370bda09b736
