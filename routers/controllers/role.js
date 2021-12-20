const roleModel = require("./../../db/modules/role");

const create = (req, res) => {
  const { role, permissions } = req.body;

  const newRole = new roleModel({
    role,
    permissions,
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
