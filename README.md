# Backend MEG (MongoDB, Express, GraphQl)

I create a Backend using MEG (Apollo) where you can register users and login with them.
Each user creates it's own token for other propouses.

## Install

```bash
    git clone https://github.com/EricGut/MEG-backend
    cd MEG-backend
    npm install
```

## Setup

- You will need to remove the .dist from config.js

```bash
    config.js.dist <------
```

- Then write your uri from MongoDb and write any secret key (it can be whatever)

```javascript
{
    MONGOURI: 'here your URI from mongo',
    SECRET_KEY: 'here your key'
}
```

- We start the server :)

```bash
    npm start
    http://localhost:5000/
```

## How it works

- To register or login a user you need to go to http://localhost:5500/
- If it shows nothing, you need to grant access on chrome localhost cookies

### Register

```javascript
mutation{
  register(registerUser:{
    name:"name"
    lastName:"last name"
    username:"username"
    email:"user@gmail.com"
    password:"123456"
    repeatPassword:"123456"
  }){
    id
    name
    lastName
    username
    email
    createdAt
  }
}
```

### Login

```javascript
mutation{
  login(username:"username" password:"123456"){
    id
    name
    lastName
    username
    email
    createdAt
    token
  }
}
```

### We can also see all the users

```javascript
{
  getUsers{
    id
    name
    lastName
    username
    email
    createdAt
  }
}
```
