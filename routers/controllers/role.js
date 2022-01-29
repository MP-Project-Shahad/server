const roleModel = require("./../../db/modules/role");

//creating a role
const create = (req, res) => {
  const { role } = req.body;

  const newRole = new roleModel({
    role,
  });

  newRole
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

//getting roles
const getRoles = (req, res) => {
  roleModel
    .find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { create, getRoles };
