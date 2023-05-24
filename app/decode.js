function decodeJWT(token) {
    console.log(JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()));
}
decodeJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBlZHJvIiwiZW1haWwiOiJwZWRyb0BnbWFpbC5jb20iLCJpYXQiOjE2ODQ4MzU0NjYsImV4cCI6MTY4NDgzNTc2Nn0.s4PeH4ms7jhgK3PMmycRg4FJsrkwQgskVPKxbw_VGOM")