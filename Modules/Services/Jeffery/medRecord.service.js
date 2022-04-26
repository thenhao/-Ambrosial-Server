const FullMedicalRecord = require("../../ORM/fullMedicalRecord.model");
const Person = require("../../ORM/person.model.js");
const Clinic = require("../../ORM/clinic.model.js");
const NextOfKin = require("../../ORM/nextOfKin.model.js");

module.exports = {

  /*
        Argument (data) must contain the following attributes:
        {
            "clinicID": 1,
            "FIN": "F0123100T",
            "medicalHistory": "g6PD",
            "currentDiagnosis": "Pharyngitis",            
            "nextOfKinName": "next of kin",
            "nextOfKinContact": 123123,
        }
        This attribute will be auto generated:
        - "recordID"
        - "visitHistory"
    */
        // createNewPatient: async (data) => {
        //     data.visitHistory = new Date();
            
        //     const person = await Person.findByPk(request.FIN);

        //      try{
        //         return await MedRecord.create(data);  
        //     }catch(error){
        //         throw error;
        //     }              
        // },
        createNewMedRecord: async (clinicID, FIN, medicalHistory, nextOfKinID) => {
                                 
         //   The result object is where we will put the result to be sent to the client
                let result = {
                    message:null,
                    status: null,
                    data: null
                }
    
                //What we want:
                //IF medical record and person is in db, return error message
                //ELSE ok to proceed with create (POST)
    
                // const fullMedicalRecord = await FullMedicalRecord.findByPk(FIN);
    
                // if(!fullMedicalRecord){
                //     result.message = `Medical Record ${recordID} is not found`;
                //     result.status = 404;
                //     return result;
                // }
    
                const person = await Person.findByPk(FIN);
    
                if(!person){
                    result.message = `FIN ${FIN} is not found in the database.`;
                    result.status = 404;
                    return result;
                }

                const clinic = await Clinic.findByPk(clinicID);
    
                if(!clinic){
                    result.message = `Clinic ID ${clinicID} is not found in the database.`;
                    result.status = 404;
                    return result;
                }

                const nok = await NextOfKin.findByPk(nextOfKinID);
    
                if(!nok){
                    result.message = `NOK ID ${nextOfKinID} is not found in the database.`;
                    result.status = 404;
                    return result;
                }

                
                try{
                const fullMedicalRecord = await FullMedicalRecord.create({
                    clinicID : clinicID, 
                    FIN : FIN,
                    medicalHistory : medicalHistory, 
                    nextOfKinID : nextOfKinID

                });
                
                await fullMedicalRecord.save();
                console.log('Medical Record is saved to the database');
                result.data = fullMedicalRecord;
                result.status = 200;
                result.message = "Medical Record is saved to the database";
                return result;
    
            } catch(error) {
                result.message = `Error in creating Medical Record. Data not saved`;
                result.status = 500;
                return result;
        }
    },

        // findMedRecordByID: async (FIN) => {
        //     //The result object is where we will put the result to be sent to the client
        //     let result = {
        //         message:null,
        //         status: null,
        //         data: null
        //     }

        //     //What we want:
        //     //IF medical record and person is in db, return error message
        //     //ELSE ok to proceed with create (POST)

        //     const fullMedicalRecord = await FullMedicalRecord.findByFk(FIN);

        //     if(!fullMedicalRecord){
        //         result.message = `Medical Record ${recordID} is not found`;
        //         result.status = 404;
        //         return result;
        //     }

        //     const person = await Person.findByPk(fullMedicalRecord.FIN);

        //     if(!person){
        //         result.message = `FIN ${fullMedicalRecord.FIN} not in database. OK to proceed`;
        //         result.status = 404;
        //         return result;
        //     }

        //     result.data = findMedRecordByID;
        //     result.status = 200;
        //     result.message = `FIN ${fullMedicalRecord.FIN} exist in database. Proceed to update instead`;
        //     return result;
        //     },

        findAll: async()=>{
            let result = {
                message:null,
                status: null,
                data: null
            }

            const allMedRecord = await FullMedicalRecord.findAll();

        if(!allMedRecord){
            result.message = `No Medical Record found`;
            result.status = 404;
            return result;
        }

        result.data = allMedRecord;
        result.status = 200;
        result.message = `All Medical Records retrieval for successfully `;
        return result;

    }
}