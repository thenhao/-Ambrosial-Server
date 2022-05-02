const express = require("express");
//to bring in the controller for supervisor under my folder
const MenuCategoryController = require("../../Controller/Shaun/MenuCategory.controller.js");
const menuCategoryController = new MenuCategoryController();
const router = express.Router();

//user story: as a user, I will be able to find the listed menu of foods if I key in the category main

///MenuCategory should be a repeat of find all menu items
router.get("/MenuCategory", menuCategoryController.findAll);
router.get("/MenuCategory/:category", menuCategoryController.findSpecificMenuCategory);

module.exports = router;