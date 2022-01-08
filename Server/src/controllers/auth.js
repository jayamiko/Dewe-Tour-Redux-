const {user} = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {OAuth2Client} = require("google-auth-library");
const {response} = require("express");
const client = new OAuth2Client(process.env.CLIENT_ID);

exports.register = async (req, res) => {
  // create validation schema

  const schema = Joi.object({
    email: Joi.string().email().min(10).required(),
    password: Joi.string().min(5),
    name: Joi.string().min(5).required(),
    phone: Joi.string().required(),
    address: Joi.string().min(4).required(),
  });

  const {error} = schema.validate(req.body);

  // check if error return response 400
  if (error) {
    return res.status(400).send({
      status: "Failed",
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const userData = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userData) {
      return res.status(400).send({
        status: "Failed",
        message: "Email already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await user.create({
      ...req.body,
      password: hashedPassword,
      photo: null,
      status: "user",
    });

    // generate token
    const token = jwt.sign(
      {id: newUser.id, status: newUser.status},
      process.env.TOKEN_KEY
    );

    res.send({
      status: "Success",
      message: "Your account has succesfully created",
      data: {
        email: newUser.email,
        name: newUser.name,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.login = async (req, res) => {
  // create validation schema

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const {error} = schema.validate(req.body);

  // check if error return response 400
  if (error) {
    return res.status(400).send({
      status: "Failed",
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    let userData = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!userData) {
      return res.status(400).send({
        status: "Failed",
        message: "User not found",
      });
    }

    const isValid = await bcrypt.compare(req.body.password, userData.password);

    if (!isValid) {
      return res.status(400).send({
        status: "Failed",
        message: "Password is incorrect",
      });
    }

    // generate token
    const token = jwt.sign(
      {id: userData.id, status: userData.status},
      process.env.TOKEN_KEY
    );

    userData = JSON.parse(JSON.stringify(userData));

    const photo = userData.photo
      ? "http://localhost:5000/uploads/" + userData.photo
      : null;

    const newDataUser = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      status: userData.status,
      photo: photo,
      token,
    };

    res.send({
      status: "success",
      message: "Login successful",
      data: newDataUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    const id = req.user.id;

    let userData = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!userData) {
      return res.status(404).send({
        status: "failed",
      });
    }

    userData = JSON.parse(JSON.stringify(userData));

    const photo = userData.photo
      ? "http://localhost:5000/uploads/" + userData.photo
      : null;

    const newUserData = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
      status: userData.status,
      photo: photo,
    };

    res.send({
      status: "success",
      data: {
        user: newUserData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.oauthGoogle = async (req, res) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.CLIENT_ID,
    });

    const {name, email, picture} = ticket.getPayload();

    const dataUser = await user.findOne({
      where: {
        email,
      },
    });

    let data;
    let token;

    if (dataUser) {
      data = await user.update(
        {
          name: name,
          status: "user",
        },
        {
          where: {
            id: dataUser.id,
          },
        }
      );

      token = jwt.sign(
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

    // const hashedPassword = await bcrypt.compare(
    //   req.body.password,
    //   user.password
    // );

    data = await user.create({
      name: name,
      email,
      // password,
      phone: "-",
      status: "user",
      photo: picture,
      token,
    });

    token = jwt.sign({id: data.id, status: data.status}, process.env.TOKEN_KEY);

    res.send({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  }
};
