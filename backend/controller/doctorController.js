const Doctor = require('../models/doctor');


const handleErrors = (error,res)=>{

  if (error.name === 'ValidationError') {
    // Loop through error messages to find the email validation error
    for (let field in error.errors) {
      if (error.errors[field].path === 'email_address') {
        return res.status(400).json({ error: error.errors[field].message });
        
      }
      if (error.errors[field].path === 'status') {
        return res.status(400).json({error:'Please type Approved or Declined' });
        
      }
      if (error.errors[field].path === 'phone_number') {
        return res.status(400).json({error:'Please Enter a Valid phone number' });
        
      }
      if (error.errors[field].path === 'gender') {
        return res.status(400).json({error:'Please Enter Male or female' });
        
      }
    }
  }
  if (error.code === 11000 ) {
    return res.status(400).json({ error: 'That email is already registered' });
  }
  
  // For other errors, return the full message
  res.status(400).json({ error: error.message });
  console.log(error.message)


}

module.exports.addDoctor = async (req, res) => {
  const { first_name, last_name, gender, DOB, email_address,phone_number,doc_type,status } = req.body;

  try {
    // Validate the required fields before creating a new doctor
    if (!first_name || !last_name || !gender || !DOB || !email_address || !phone_number || !doc_type || !status) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const createDoctor = await Doctor.create({ first_name, last_name, gender, DOB, email_address,phone_number,doc_type,status });
   
    res.status(201).json(createDoctor);
  } catch (error) {
    // Check if the error is a validation error


   handleErrors(error,res)
  
  }
};



module.exports.displayDoctors = async (req, res) => {
  try{
    const count = await Doctor.countDocuments();
    const display = await Doctor.find({});
    res.status(201).json({display,count}); 
    
  }
  catch(error){
    res.status(400).json({error:error.message}); 
  }
}



module.exports.updateDoctors = async (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, email_address, phone_number, doc_type, status } = req.body;

  try {
    // Check that all required fields are present in the request body
    if (!first_name || !last_name || !email_address || !phone_number || !doc_type || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const updateDoctor = {
      first_name,
      last_name,
      email_address,
      phone_number,
      doc_type,
      status,
    };

    // Update the doctor in the database
    const updated = await Doctor.findByIdAndUpdate(id, updateDoctor, { new: true, runValidators: true });

    if (!updated) {
      console.error('Doctor not found with ID:', id);
      return res.status(404).json({ message: "Doctor not found" });
    }

    console.log('Doctor updated successfully:', updated);
    res.status(200).json({ message: "Doctor updated successfully", doctor: updated });
  } catch (error) {
    handleErrors(error,res)
  }
};


module.exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Doctor.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: `Doctor with id ${id} not found` });  // Return 404 if the doctor isn't found
    }

    res.status(200).json({ _id:id});  // Clearer response structure
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete the doctor' });  // Return 500 for server errors
  }
};


