# bcrypt_user_management

In order to do token and jwt authentication, the first thing we have to do is install bcrypt using the command:
```
npm install bcrypt
```
## What is JWT (JSON Web Tokens)?
JWT is a JSON object (JavaScript Object Notation), an open standard tool whose purpose is to establish a transmission of information between two or more fields. From these, information can be spread safely and effectively, which is also verified, since it is signed virtually. This set of information takes the web token reference, under the JSON open standard.
## Structure
Is a string composed of three parts separated by a period (.) and is serialized using base number 64. The three parts that make up this token are: header, payload, and signature.

* Header:
    - First component of the token and consists of two parts: the token type, which in this case is JWT, and the algorithm being used, which can be RSA or SHA256.
* Payload:
    -  the token claims are found. These are about an entity (user, object) and other information that goes with it.
* Signature:
    - Sign the encrypted header, the encrypted payload, the secret, and the algorithm that has been set in the header. This is done to verify that there are no changes to the responses or content of the components.

## Token authentication
In the routers folder, there is a file called userRoutes, inside there is an HTTP method that we are going to use for token authentication:
```
router.get('/users', auth, findAll, function (req, res) {
    res.status(200).send({ message: "YOU HAVE ACCESS" })
});
```
This method is used when you enter the token of an existing user, the authentication allows access to this method to be able to view all users.

Before checking to see if it works with the help of a Postman application, we first need to create two things: a function to display users and another for authentication.

code to display users (findAll)

```
const findAll = async (req, res) => {
  const userName = req.query.userName;
  var condition = userName ? { userName: { [Op.iLike]: `%${userName}%` } } : null;

  const result = await User.findAll({ where: condition }).catch(err => {
    res.status(500).send({
      message:
        err.message || "An error occurred while retrieving users."
    });
  });
  res.send(result);

};
```
code for token authentication(auth)
```
function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "NOT AUTHORIZED" })
  }
  try {
    const token = req.headers.authorization.split(" ")[1]
    if(token){
    const payload = jwt.verify(token, process.env.secretKey)
    req.user = payload.sub
    next();
    }else if(!token){
    res.status(401).json({message:"Token not found "})
    }
    
  } catch (err) {
    return res.status(401).json({ status: "fail", message: "Invalid Token,not Authorized" });
  }
}
module.exports = isAuth; 

```
Now we check if it works using postman.

first we get a token from an existing user with the help of a POST method =>

  * http://localhost:4000/api/users/login

In the window that says Headers, we write in the Key: Authorization and in the value: we put the token of the user that we have taken in the GET method =>

 * http://localhost:4000/api/users/users

In order to access that route, if it is correct, it can display all the users in the database, but if it is not correct or if you do not put the token, it does not allow access to that route.

## Token authentication with role
In the routers folder, there is a file called userRoutes, inside there is an HTTP method that we are going to use for token authentication with role:
```
router.delete('/users',authrole,deleteusers);
```
This method is used when you enter the token of an existing user but only that they are administrators, authentication allows access to this method in order to delete some user.

Before testing if it works with the help of a Postman application, we first need to create two things: a function to delete some user and another for role authentication.

Code to delete any user (deleteusers)

```
const deleteusers = async (req,res) => {
  try{
  const userName = req.body;
  await User.destroy({
    where:{
      userName:req.body.userName
    }
  }).then(num =>{
    if (num == 1) {
      res.status(201).json({message: "The department was successfully deleted"});
    } else {
      res.status(409).json({message: "could not be deleted because the user does not exist"});
    }
  })
}catch(err){
  res.status(500).json({ success: false, message: err });
}
};
```
code for token authentication with role only for users who are administrators (authrole)

```
function deteleAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "NOT AUTHORIZED" })
    }
    try {
        let token = req.headers.authorization.split(" ")[1]
        if (token) {
            jwt.verify(token, process.env.secretKey, function (err, decoded) {
                if (decoded.role == "admin") {
                    next()
                } else {
                    res.status(409).json({ message: "access failed, only users who are administrators can access" });
                }
            })

        } else {
            res.status(409).json({ message: "Token not found" })
        }
    } catch (err) {
        return res.status(401).json({ status: "fail", message: "Invalid Token,not Authorized" })
    }

}
module.exports = deteleAuth;
```
Now we check if it works using postman.

first we get a token from an existing user with the help of a POST method =>

* http://localhost:4000/api/users/login

In the window that says Headers, we write in the Key: Authorization and in the value: we put the token of the user that we have taken in the DELETE method =>

* http://localhost:4000/api/users/users

To access that route, if it is correct, you can delete a user, but if it is not correct or if you do not put the token, it does not allow access to that route.