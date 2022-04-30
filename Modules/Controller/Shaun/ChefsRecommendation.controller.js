const Joi = require('joi');
const ViewChefsRecommendation = require('../../Services/Shaun/ChefsRecommendation.service.js');
//import the service


class ChefsRecommendationController{


  async ChefsRecommendedItems(req, res, next){

const result = await ViewChefsRecommendation.findChefsRecommendation();
 res.status(result.status);
        return res.json({data:result.data, status: result.status, message:result.message});
      }}
