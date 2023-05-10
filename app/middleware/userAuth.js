const jwt = require("jsonwebtoken");
/*
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "A token is required for authentication" })
  }
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.secretKey);
    req.user = decoded
    return res.status(201).json({decoded,message: `Congrats! You can now accesss the super secret resource`, });
    next();
  } catch (err) {
    return res.status(401).json({ status: "fail", message: "Invalid Token,not Authorized" });
  }
};
module.exports = verifyToken;
*/
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
