const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const doctorSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required:true },
  DOB: { type: Date, required: true , match: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/ },
  phone_number:{type: String ,required: true, match: /^\d{11}$/ },
  email_address: { type: String, required: true, unique: true },
  doc_type: { type: String, required: true},
  status: { type: String, enum: ['Approved', 'Declined'], default: 'Approved' },
},{timestamps:true});

// Apply the auto-increment plugin to the schema
doctorSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
