const AdminSchema = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

// fazer auth

const getToken = (req, res) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    return res.status(401).json("Missing authorization!");
  }
  const token = authHeader.split(" ")[1];
  return token;
};

// criar admin

const createAdmin = (req, res) => {
  const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = encryptedPassword;

  const newAdmin = new AdminSchema(req.body);
  newAdmin.save((error) => {
    if (error) {
      return res.status(424).json({ message: error.message });
    }
    res.status(201).json({
      message: "Admin has been registered",
      admin: newAdmin,
    });
  });
};

// listar admins

const getAllAdmins = (req, res) => {
  const token = getToken(req, res);
  jwt.verify(token, SECRET, (error) => {
    if (error) {
      return res.status(403).json("Invalid Token!");
    }

    AdminSchema.find((error, admins) => {
      if (error) {
        res.status(500).json({ message: error.message });
      }
    
      res.status(200).json(admins);
    });
  });
};

// fazer login

const loginAdmin = (req, res) => {
  AdminSchema.findOne({ email: req.body.email }, (error, admin) => {
    if (error) {
      return res.status(500).json({ message: error.message });
    }

    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }

    const password = bcrypt.compareSync(req.body.password, admin.password);
    if (!password) {
      return res
        .status(403)
        .json({ message: "Access denied: incorrect password." });
    }

    const token = jwt.sign({ email: admin.email }, SECRET);
    return res.status(200).json({ token: token });
  });
};

// atualizar admin

const updateAdmin = (req, res) => {
  const token = getToken(req, res);
  jwt.verify(token, SECRET, (error) => {
    if (error) {
      return res.status(403).json("Invalid Token!");
    }

    const { id } = req.params;
    const updatedAdmin = req.body;

    AdminSchema.findByIdAndUpdate(id, updatedAdmin, (error, admin) => {
      if (error) {
        return res.status(424).json({ message: error.message });
      } else if (admin) {
        return res.status(200).json(`Admin ${admin.name} successfully updated`);
      }
      res.status(404).json("Admin not found!");
    });
  });
};

// deletar admin

const deleteAdmin = (req, res) => {
  const token = getToken(req, res);
  jwt.verify(token, SECRET, (error) => {
    if (error) {
      return res.status(403).json("Invalid Token!");
    }

    const { id } = req.params;

    AdminSchema.findByIdAndDelete(id, (error, admin) => {
      if (error) {
        return res.status(424).json({ message: error.message });
      } else if (admin) {
        return res.status(200).json(`Admin ${admin.name} deleted!`);
      }
      res.status(404).json("Admin not found!");
    });
  });
};

module.exports = {
  createAdmin,
  getAllAdmins,
  loginAdmin,
  updateAdmin,
  deleteAdmin,
};
