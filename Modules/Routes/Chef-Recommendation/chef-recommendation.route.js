const express = require("express");
//to bring in the controller for supervisor under my folder
const ChefsRecommendationController = require("../../Controller/Chef-Recommendation/chef-recommendation.controller.js");
const chefsRecommendationController = new ChefsRecommendationController();
const router = express.Router();

//user story: as an admin, I will be able to link certain menu items as the chefs recommendations

router.get("/ChefsRecommendations", chefsRecommendationController.ChefsRecommendedItems);
//router.get("/ChefsRecommendations/MenuFoodItem", ChefsRecommendationController.MenuFoodItem);

module.exports = router;