const {user} = require("../../models");
const fs = require("fs");

exports.getUsers = async (req, res) => {
  try {
    let data = await user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    data = JSON.parse(JSON.stringify(data));
    const newData = data.map((item) => {
      const photo = item.photo
        ? "http://localhost:5000/uploads/" + item.photo
        : null;

      return {
        id: item.id,
        email: item.email,
        name: item.name,
        phone: item.phone,
        address: item.address,
        photo: photo,
      };
    });

    res.send({
      status: "success",
      data: newData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const idUser = req.user.id;
    const id = idUser;

    const data = await user.findOne({
      where: {
        id,
      },
    });

    if (!data) {
      return res.status(404).send({
        status: "failed",
        message: "User not found",
      });
    }

    if (req.user.status === "admin") {
      return res.send({
        status: "success",
        data,
      });
      // check if token id equals or not with id params
    } else if (req.user.id !== parseInt(id)) {
      // req.user from auth
      return res.status(400).send({
        status: "failed",
        message: "Access Denied!",
      });
    }

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addUsers = async (req, res) => {
  try {
    await user.create(req.body);
    res.send({
      status: "success",
      message: "Add User Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      send({
        status: "Failed",
        message: "Server Error",
      });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const {id} = req.params;
    await user.update(
      {...req.body},
      {
        where: {
          id,
        },
      }
    );

    res.send({
      status: "success",
      message: `Update user id:${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const {id} = req.user;

    await user.update(
      {...req.body},
      {
        where: {
          id,
        },
      }
    );

    res.send({
      status: "success",
      message: "Update user finished",
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  const {id} = req.params;
  try {
    await user.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      message: "Deleted Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      send({
        status: "Failed",
        message: "Deleted is Failed",
      });
  }
};
