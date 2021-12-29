const userModel = require("./../../db/modules/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const nodemailer = require("nodemailer");

const SALT = Number(process.env.SALT);
const secret = process.env.SECRETKEY;
const EMAIL = process.env.EMAIL; //to send confirmation message
const PASS = process.env.PASS; //to send confirmation message

//registration for all
const registration = async (req, res) => {
  const { userName, email, password, avatar, role } = req.body;

  const savedEmail = email.toLowerCase();
  const savedPassword = await bcrypt.hash(password, SALT);
  try {
    let mailTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: EMAIL,
        pass: PASS,
      },
    });

    console.log(EMAIL, "-", PASS);
    const newUser = new userModel({
      userName,
      email: savedEmail,
      avatar,
      password: savedPassword,
      key: Math.floor(1000 + Math.random() * 9000),
      role,
    });

    newUser
      .save()
      .then((result) => {
        let mailDetails = {
          from: EMAIL,
          to: result.email,
          subject: `hello ${result.userName}`,
          text: `This is a message to confirm your identity please write this code: ${result.key} to confirm your email. `,
        };
        // console.log(mailDetails, "mailDetails");
        mailTransporter.sendMail(mailDetails, (err, data) => {
          if (err) {
            console.log("error:", err.message);
            console.log(data);
            res.status(400).json(err.message);
          } else {
            console.log("Email sent successfully");
            res.json(result);
          }
        });

        // console.log(result);
      })
      .catch((err) => {
        // console.log(err, "email errorrr");
        res.send(err.message);
      });
  } catch (error) {
    res.status(400).json(error);
  }
};

//logging in for all
const login = (req, res) => {
  const { logMethod, password } = req.body;

  userModel
    .findOne({ $or: [{ userName: logMethod }, { email: logMethod }] })
    .then(async (result) => {
      if (result) {
        if (logMethod === result.email || logMethod === result.userName) {
          const savedPassword = await bcrypt.compare(password, result.password);
          const payload = { role: result.role, id: result._id };
          const token = jwt.sign(payload, secret);

          if (savedPassword) {
            if (result.isActive === true) {
              res.status(200).json({ result, token });
            } else {
              res.json("user not confirmed, please check your email");
            }
          } else {
            res.json("invalid email or password");
          }
        } else {
          res.json("invalid email or password");
        }
      } else {
        res.json("user is not registred or incorrect");
      }
    });
};

//getting all users for admins
const getUsers = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
//----------------------------------------

//set user as confirmed
const confirmed = (req, res) => {
  const { id } = req.params;

  userModel
    .findByIdAndUpdate({ _id: id }, { $set: { isActive: true } }, { new: true })
    .then((result) => {
      // console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).send("error message:", err.message);
    });
};
//-----------------------------------------

//soft deleting a user for admins. ps: toggle
const deleteUser = (req, res) => {
  const { id } = req.params;

  userModel.findById({ _id: id }).then((result) => {
    if (result.isDel != true) {
      userModel
        .findByIdAndUpdate(
          { _id: id },
          { $set: { isDel: true } },
          { new: true }
        )
        .then((result) => {
          res.status(200).json(result);
          // console.log(result);
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      userModel
        .findByIdAndUpdate(
          { _id: id },
          { $set: { isDel: false } },
          { new: true }
        )
        .then((result) => {
          res.status(200).json(result);
          // console.log(result);
        })
        .catch((err) => {
          res.send(err);
        });
    }
  });
};

//forgot passowrd mail
const forgotPass = (req, res) => {
  const { email } = req.body;
  try {
    let mailTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: EMAIL,
        pass: PASS,
      },
    });

    let code = Math.floor(1000 + Math.random() * 9000);
    // console.log(code);

    userModel
      .findOneAndUpdate({ email: email }, { $set: { resetCode: code } })
      .then((result) => {
        let mailDetails = {
          from: EMAIL,
          to: result.email,
          subject: `hello ${result.userName}`,
          text: `This is a message to confirm your identity so that you can reset your password. please write this code: ${code} in this page: http://localhost:3000/ResetPass/${result._id} . `,
        };

        mailTransporter.sendMail(mailDetails, (err, data) => {
          if (err) {
            // console.log("error:", err.message);
            // console.log(data);
            res.json(err.message);
          } else {
            // console.log("Email sent successfully");
            res.json(result);
          }
        });
        res.status(200).json("sent successfuly");
        // console.log(mailDetails, "sent successfuly");
      })
      .catch((err) => {
        res.json(err.message);
      });
  } catch (error) {
    res.json("an error had occurred:", error.message);
  }
};

//reset password
const resetPass = async (req, res) => {
  const { id } = req.params;
  const { newPass } = req.body;

  const hashNewPass = await bcrypt.hash(newPass, SALT);

  try {
    userModel
      .findByIdAndUpdate(
        { _id: id },
        { $set: { password: hashNewPass } },
        { new: true }
      )
      .then((result) => {
        // console.log(result);
        res.status(200).json("password updated successfully");
      })
      .catch((err) => {
        res.status(400).json("an error occured:", err.message);
      });
  } catch (error) {
    res.status(404).json("unvalid inputs, error:", error.message);
  }
};

//get one user

const oneUser = (req, res) => {
  const { id } = req.params;

  try {
    userModel
      .findOne({ _id: id })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

//edit user details ... + dont foget to change the user schema role id
const editUser = async (req, res) => {
  const { id } = req.params;
  const { newName, newEmail } = req.body;

  // const hashNewPass = await bcrypt.hash(newPass, SALT);

  try {
    userModel
      .findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            userName: newName,
            // password: hashNewPass,
            email: newEmail,
            // avatar: newAvatar,
          },
        },
        { new: true }
      )
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  registration,
  login,
  confirmed,
  getUsers,
  deleteUser,
  resetPass,
  forgotPass,
  oneUser,
  editUser,
};
