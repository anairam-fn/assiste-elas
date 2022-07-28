const express = require("express");
const controller = require("../controllers/adminController");

const router = express.Router();

router.post("/admin", controller.createAdmin);
router.post("/admin/login", controller.loginAdmin)
router.patch("/admin/:id", controller.updateAdmin)
router.delete("/admin/:id", controller.deleteAdmin)

module.exports = router;
