const role = require("./../../db/modules/role");
const roleModel = require("./../../db/modules/role");

const authorization = async (req, res, next) => {
  try {
    // console.log(req.addedToken);
    const roleId = req.addedToken.role;

    const result = await roleModel.findById(roleId);

    if (result.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "forbidden" });
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

module.exports = authorization;
