const express = require("express");
const protect = require("../middleWare/authMiddleware");

const {
    registerUser,
    loginUser,
    verifyUser,
    logout,
    changePassword,
    forgotPassword,
    resetPassword,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:id/", verifyUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.patch("/changepassword", protect, changePassword);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);

module.exports = router;
