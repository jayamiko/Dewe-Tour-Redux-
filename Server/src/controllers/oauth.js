const {user} = require("../../models");
const {OAuth2Client} = require("google-auth-library");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = new OAuth2Client(process.env.CLIENT_ID);

exports.oauthGoogle = async (req, res) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.CLIENT_ID,
    });

    // const {name, email, password, picture} = ticket.getPayload();
    const dataUser = await user.findOne({
      where: {
        email: req.body.profileObj.email,
      },
    });

    const hashedPass = await bcrypt.hash(req.body.profileObj.email, 10);

    if (dataUser) {
      let data = await user.update(
        {
          name: req.body.profileObj.name,
          status: "user",
        },
        {
          where: {
            id: dataUser.id,
          },
        }
      );

      let token = jwt.sign(
        {id: dataUser.id, status: dataUser.status},
        process.env.TOKEN_KEY
      );

      return res.send({
        status: "success",
        user: {
          name: dataUser.name,
          token,
        },
      });
    }

    let data = await user.create({
      name: req.body.profileObj.name,
      email: req.body.profileObj.email,
      password: hashedPass,
      phone: "",
      status: "user",
      photo: req.body.profileObj.imageUrl,
    });

    let token = jwt.sign(
      {id: data.id, status: data.status},
      process.env.TOKEN_KEY
    );

    res.send({
      status: "success",
      user: {
        data,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  }
};
