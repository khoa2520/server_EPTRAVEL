const Fav = require("../models/Fav");
const User = require("../models/User");
const Tour = require("../models/Tour");

const favController = {
  //Thêm vào yêu thích
  createFav: async (req, res, next) => {
    const tourId = req.body.tourId;
    const userId = req.body.userId;

    const newFav = new Fav({
      UserId: userId,
      TourId: [tourId],
      SubTotal: 1,
    });

    await newFav.save();

    // Ad Fav vào User model (Create)

    res.status(200).send(newFav);
  },

  updateFav: async (req, res, next) => {
    try {
      const userId = req.body.userId;
      const tourList = req.body.tourList;
      const favOfUser = await Fav.findOne({
        UserId: userId,
      });
      await favOfUser.updateOne({
        TourId: tourList,
        SubTotal: tourList.length,
      });

      res.status(200).json("Update Tour Success");
    } catch (err) {
      res.json({ Error: err.message });
    }
  },
  emptyFav: async (req, res, next) => {
    try {
      const userId = req.body.id;

      const favOfUser = await Tour.findOne({
        UserId: userId,
      });
      await favOfUser.updateOne({
        TourId: [],
        SubTotal: 0,
      });
    } catch (err) {
      res.json({ Error: err.message });
    }
  },
  checkFav: async (req, res) => {
    try {
      const userId = req.body.userId;
      const favOfUser = await Fav.findOne({
        UserId: userId,
      });
      if (favOfUser !== null) {
        res.json({
          message: "Đã có",
        });
      } else {
        res.json({
          message: "Chưa có",
        });
      }
      // res.json(favOfUser)
      //  console.log(favItem)
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getTourInFav: async (req, res) => {
    try {
      const userId = req.body.userId;
      const favOfUser = await Fav.findOne({
        UserId: userId,
      });
      res.json(favOfUser.TourId);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllTourInFav: async (req, res) => {
    try {
      const tourArr = req.body.tourArr;
      const allTourInFav = [];
      for (let i = 0; i < tourArr.length; i++) {
        allTourInFav.push(
          await Tour.findOne({
            _id: tourArr[i],
          })
        );
      }
      res.json(allTourInFav);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getFavOfUser: async (req, res) => {
    const user = req.params.user;
    const favOfUser = await Fav.findOne({
      UserId: user,
    });
    res.json(favOfUser.TourId);
  },
};

module.exports = favController;
