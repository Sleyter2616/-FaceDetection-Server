const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const db = knex({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		user: "postgres",
		password: "Retyels2616",
		database: "face",
	},
});
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("success");
});
app.post("/signin", (req, res) => {
	signIn.handleSignIn(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
	profile.handleProfileGet(req, res, db);
});
app.put("/image", (req, res) => {
	image.handleImage(req, res, db);
});
app.post("/imageurl", (req, res) => {
	image.handleApiCall(req, res);
});

// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});
