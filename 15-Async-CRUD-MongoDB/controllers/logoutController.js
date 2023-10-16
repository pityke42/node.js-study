const User = require("../model/User");

const handleLogout = async (req, res) => {
  //On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content to send back
  const refreshToken = cookies.jwt;

  //Is refreshToken in dataBase?
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    //Clearing cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }
  //Delete refreshToken in database
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", {
    httpOnly: true, //secure: true - only servers on https
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};
module.exports = { handleLogout };
