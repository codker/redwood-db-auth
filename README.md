# Local authentication example

I started a discussion about adding simple email and password authentication to RedwoodJS in the [community](https://community.redwoodjs.com/t/simple-email-password-authentication/945).

I want to thank everyone in the community, you are amazing!

## Dependencies

- jsonwebtoken
- secure-password (thanks to @flybayer!)

## Prerequisite

To make this work, you need to generate a key pair in the project root:

```bash
# no passphrase!
ssh-keygen -t rsa -b 4096 -m PEM -f jwt.key
openssl rsa -in jwt.key -pubout -outform PEM -out jwt.key.pub
```

## What to look for in the code

### api

- prisma/schema.prisma
  - User model
- graphql/users.sdl.js
  - User type
- graphql/signup.sdl.js
  - SignupInput input
  - login query
  - signup mutation
- lib/auth.js
  - authenticateUser: check if the email is registered, verify the password and sign the jwt
  - getCurrentUser: verify jwt and return the user data
- services/signup/signup.js
  - login: just calls authenticateUser method and returns the jwt
  - signup: signup logic
- services/users/users.js
  - createUser: call hashPassword and save the user in the db
  - findUserByEmail: easy
  - hashPassword: hash the password using secure-password
  - updatePassword: hash the new password and save it in the db
  - verifyPassword: verify if an hashed password matches with a plain text one

### web

- lib/db-client.js: the custom local auth client
- index.js: AuthProvider that use the custom auth client
- pages/HomePage/HomePage.js: signup / login / logout example

That's it!
