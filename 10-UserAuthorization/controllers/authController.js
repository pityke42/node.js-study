const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  //Checking for erros
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({
      message: "Username or password are required.",
    });

  //Findig user that sent in
  const foundUser = usersDB.users.find((person) => person.username === user);

  if (!foundUser) return res.sendStatus(401); //Unatuhorized
  //Evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    //Create JWTs
    res.json({ success: `User ${user} is logged in` });
  } else {
    res.sendStatus(401);
  }
};
module.exports = { handleLogin };
