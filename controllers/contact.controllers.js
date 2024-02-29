const { Contact } = require("../models/contact.js");

const creatContactMessage = async(req,res)=>{
    try {
        const { name, email, message } = req.body;
        const contact = new Contact({ name, email, message });
        await contact.save();
        res.send('Contact information saved successfully' );
    } catch (error) {
        console.log(error);
    }
}

module.exports = {creatContactMessage}