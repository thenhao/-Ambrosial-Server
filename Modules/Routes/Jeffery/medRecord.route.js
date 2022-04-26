const express = require("express");
const MedicalRecordModel = require("../../ORM/fullMedicalRecord.model");
const MedRecordController = require('../../Controller/Jeffery/medRecord.controller');//Ensure same as export in other file
const router = express.Router();
const {authClinic} = require('../../Authorization/auth'); // this is for JWT role auth, please do not remove this!

//Instantiate a new instance of the class

const medRecordController = new MedRecordController();

//Create new medical record's identity
// POST /createnewrecord
/*
{
    clinicID:integer (FK),
    FIN:string (FK),
    issueMC: boolean,
    medicalHistory:string,
    nextOfKinContact: integer (FK)
    visitHistory: date (today's date auto-generated),
}
}
    "clinicID": "",
    "FIN": "",
    "issueMC": "",
    "medicalHistory": "",
    "nextOfKinContact": ""
}
*/
// router.post('/createnewrecord', createNewMedRecord);
router.post("/newrecord", authClinic, medRecordController.createNewMedRecord);

router.get("/findrecords", authClinic, medRecordController.findAll);

// router.get('/findrecord/:FIN', MedRecordController.findMedRecordByID);


// router.get('/newrecord', async (req, res) => {
//     const list = await medicalRecordModel.findAll();
//     res.send(list);
// })

module.exports = router;