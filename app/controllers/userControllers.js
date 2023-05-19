const bcrypt = require("bcrypt");
const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.users;

const signup = async (req, res) => {
  try {
    const username = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });
    if (!username) {
      const { userName, password, email, role } = req.body;
      const data = {
        userName,
        email,
        role,
        password: await bcrypt.hash(password, 10)
      };
      user = await User.create(data);
      const token = jwt.sign({ id: user.id,role:user.role }, process.env.secretKey, { expiresIn: "5m" })
      res.status(201).json({ user, token, message: "the user has been inserted successfully" });
    } else {
      console.log("This user exists");
      res.status(409).json({ message: "The user you entered already exists, please enter again" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};
//login authentication

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({
      where: {
        userName: userName
      }
    });
    if (user) {
      bcrypt.compare(password, user.password, (req, match) => {
        if (match == true) {
          console.log(password, user.password)
          const token = jwt.sign({ id: user.id, role:user.role }, process.env.secretKey, { expiresIn: "5m" })
          res.status(201).json({ user, token, message: "Authentication success" });
        } else if (match == false) {
          console.log(match)
          res.status(409).json({ message: "Authentication failed" });
        }
      });
    } else {
      res.status(409).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};
const findAll = async (req, res) => {
  const userName = req.query.userName;
  var condition = userName ? { userName: { [Op.iLike]: `%${userName}%` } } : null;

  const result = await User.findAll({ where: condition }).catch(err => {
    res.status(500).send({
      message:
        err.message || "An error occurred while retrieving users."
    });
  });
  res.status(201).json({result,status: "success", message: "Authorized success"});

};
const deleteusers = async (req,res) => {
  try{
  const userName = req.query;
  await User.destroy({
    where:{
      userName:req.query.userName
    }
  }).then(num =>{
    if (num == 1) {
      res.status(201).json({message: "The user was successfully deleted"});
    } else {
      res.status(409).json({message: "could not be deleted because the user does not exist"});
    }
  })
}catch(err){
  res.status(500).json({ success: false, message: err });
}
};
module.exports = {
  signup,
  login,
  findAll,
  deleteusers,
};
