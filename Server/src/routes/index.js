const express = require("express");
const router = express.Router();
const {
  addUsers,
  getUser,
  getUsers,
  UpdateAvatar,
  UpdateUser,
  UpdateUserById,
  deleteUser,
} = require("../controllers/user");
const {
  addCountry,
  getCountries,
  getCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/country");
const {
  addTrip,
  getTrips,
  getTrip,
  updateTrip,
  deleteTrip,
} = require("../controllers/trip");
const {
  addTransaction,
  updatePay,
  updateTransaction,
  getTransactions,
  getTransaction,
  deleteTransaction,
} = require("../controllers/transaction");
const {register, login, checkAuth} = require("../controllers/auth");

const {oauthGoogle} = require("../controllers/oauth");

// Middleware
const {auth, adminOnly} = require("../middlewares/auth");
const {uploadsFile} = require("../middlewares/uploadsFile");

// Route User
router.get("/users", getUsers);
router.get("/user", auth, getUser);
router.post("/users", addUsers);
router.put("/user/:id", uploadsFile("photo"), UpdateAvatar);
router.patch("/user", auth, uploadsFile("photo"), UpdateUser);
router.patch("/user/specific", auth, UpdateUserById);
router.delete("/user/:id", deleteUser);

// Route Countries
router.get("/countries", getCountries);
router.get("/country/:id", getCountry);
router.post("/countries", auth, adminOnly, addCountry);
router.put("/countries/:id", auth, adminOnly, updateCountry);
router.delete("/countries/:id", auth, adminOnly, deleteCountry);

// Route Trips
router.get("/trips", getTrips);
router.get("/trip/:id", getTrip);
router.post("/trip", uploadsFile("image"), addTrip);
router.put("/trip/:id", auth, updateTrip);
router.delete("/trip/:id", auth, adminOnly, deleteTrip);

// Route Transaction
router.get("/transactions", getTransactions);
router.get("/transaction/:id", getTransaction);
router.post("/transaction", uploadsFile("attachment"), addTransaction);
router.put("/transactions/pay/:id", auth, uploadsFile("attachment"), updatePay);
router.put("/transaction/:id", auth, adminOnly, updateTransaction);
router.delete("/transaction/:id", auth, deleteTransaction);

// Route Auth
router.post("/login", login);
router.post("/register", register);
router.post("/auth/google", oauthGoogle);
router.get("/check-auth", auth, checkAuth);

module.exports = router;
