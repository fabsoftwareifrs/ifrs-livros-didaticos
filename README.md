<p align="center">
<img src="src/assets/icons/logo/Assets.xcassets/AppIcon.appiconset/80.png" alt="logo verde com traçado de um livro aberto">
</p>

# LMS Livros Didáticos
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![](https://img.shields.io/badge/node->=%20v12.19.0-green)]()
![](https://img.shields.io/github/last-commit/fabsoftwareifrs/ifrs-livros-didaticos)

Este é um projeto open-source de um LMS (Library Management System - Sistema de Controle Bibliotecário) utilizado para o controle e distribuição de livros didáticos dentro do Instituto Federal do Rio Grande do Sul, Câmpus Bento Gonçalves. O projeto é desenvolvido e mantido pelos professores, bolsistas e voluntários do Projeto Fábrica de Software que fomenta a comunidade interna e externa no desenvolvimento de soluções open-source para o ensino.

Caso deseje contribuir, é importante que antes avise-nos por issue para que possamos atribuir a você a tarefa e evitar esforço duplicado. 

## Como rodar
### Pré-requisitos
É necessário instalar o MySQL e o NodeJS antes de rodar o projeto. Para fazer isso:

### No Windows

No Windows é recomendado utilizar a ferramenta de linha de comando [winget](https://github.com/microsoft/winget-cli) para instalar os pacotes.

```powershell
winget install -e --id OpenJS.Nodejs
winget install -e --id MariaDB.Server
```  

#### No Linux

Tudo o que é necessário pode ser instalado utilizando o gerenciador de pacotes da sua distribuição, para o Debian ou Ubuntu seria:

 ```bash
 sudo apt install nodejs npm mariadb-server
 ```

 ### Configure o MySQL
 Após instalar é muito importante configurar os usuários e configurações iniciais do seu banco de dados, para isso rode o seguinte comando em seu terminal:
  ```
 mysql_secure_installation
 ```
 **Obs**: no Linux esse comando precisa ser executado como administrador (sudo)

 A inicialização irá fazer algumas perguntas em inglês é importante respondê-las com cuidado e propriamente para que não tenha problemas, caso queira se tiver dificuldade com o inglês [esse guia](https://www.redehost.com.br/duvidas/como-fao-uma-instalao-seguro-do-mysql--1437) poderá ajudá-lo!

 ### Iniciando o projeto
 1. Clone o repositório
 ```bash
git clone https://github.com/fabsoftwareifrs/node-quickstart.git meuprojeto
```
2. Entre na pasta do projeto e delete a pasta oculta .git e crie o arquivo .env
```bash
cd meuprojeto
rm -Rf .git
cp .env.example .env
code .env
```
**.env**
```
# API Domínio
URL_API=localhost:4000

# Banco de Dados
DB_HOSTNAME=localhost
DB_NAME=nomedoseubanco
DB_USERNAME=root
DB_PASSWORD=[a senha do seu usuário MySQL]

# JWT
AUTH_SECRET=[Qualquer palavra secreta]

# E-mail
EMAIL_SERVICE=
EMAIL_USER=
EMAIL_PASSWORD=
```
3. Crie seu banco:
```bash 
mysql -u root -p # entre a senha do seu usuário
```
```SQL
MariaDB [(none)]> CREATE DATABASE nomedoseubanco CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
MariaDB [(none)]> exit;
```
4. instale todas as dependências
```bash
npm i
```

5. Migre o banco de dados
```
npx sequelize-cli db:migrate
```

6. inicie o projeto

**Terminal 1**:
```bash
npm run watch:src
```
**Terminal 2**:
```
npm run watch:dist
```
vá para a URL http://localhost:4000/graphql em seu navegador e se ver a ferramenta de queries do GraaphQL tudo funcionou corretamente! Aproveite!

## Autores
- **Thyago Salvá** - [Github](https://github.com/Salvah)
- **Maurício Covolan Rosito** - [Github](https://github.com/mauriciorosito)
- **Camilo Cunha de Azevedo** - [Github](https://github.com/Camilotk)
- **Douglas Rauschkolb** - [Github](https://github.com/DouglasRauschkolb)
- **Eduardo Faggion** - [Github](https://github.com/FaggionEduardo)

## Licença
AGPL