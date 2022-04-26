//As a Clinic Assistant, I am able to create a MC for the person by using his FIN
const Person = require("../../ORM/person.model.js");
const MC = require("../../ORM/mc.model.js");
const Clinic = require("../../ORM/clinic.model.js");

module.exports = {
    //Create function inside object
    createMC: async(fin, clinicID, mcStartDate, mcEndDate, status) => {
        
        let result = {
            message:null,
            status: null,
            data: null
        }
    
        const person = await Person.findByPk(fin);
        
        if(!person){
            result.message = `Person with fin ${fin} was not found.`;
            result.status = 404;
            return result;
        }

        const clinic = await Clinic.findByPk(clinicID);

        if(!clinic){
            result.message = `Clinic with id ${clinicID} not found`;
            result.status = 404;
            return result;
        }
    
        try{
            //Create mc object
            const Mc = await MC.create({ 
                FIN : fin, 
                clinicID : clinicID, 
                mcStartDate : mcStartDate, 
                mcEndDate : mcEndDate, 
                status : status
            });
    
            await Mc.save();
            console.log('MC is saved to the database');
            result.data = Mc;
            result.status = 200;
            result.message = "Mc creation successful";
            return result;

        } catch(error) {
            result.message = `MC creation unsuccessful`;
            result.status = 500;
            return result;
        }
        
        
    }
}