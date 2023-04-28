const Employee = require('../model/Empoloyee');

const getAllEmployees = async (req, res) => {
    const employees = await Employee.find();
    if(!employees) return res.status(204).json({"message" : "No employee found."});
    res.json(employees)
  }

const createNewEmployee =async (req, res) => {
  if(!req?.body?.firstName || !req?.body?.lastName){
    return res.status(400).json({"message":"First name and Lasst name required"});
  }

  try {
    const result = await Employee.create({
      firstname:req.body.firstName,
      lastname:req.body.lastName
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    }
  
  }

  const updateEmpolyee = async(req, res) => {
    if(!req?.body?.id){
      return res.status(400).json({"message":"ID parameter is required"});
    }

    const employee = await Employee.findOne({_id: req.body.id}).exec();

    if(!employee){
        return res.status(204).json({'message': `No employee maches ID ${req.body.id} `});
    }
    if(req.body?.firstName) employee.firstName =req.body.firstName;
    if(req.body?.lastName) employee.lastName =req.body.lastName;
    const result = await employee.save();
    res.json(result);

  }

  const deleteEmpolyee =async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({"message":"ID parameter is required"});
    

    const employee = await Employee.findOne({_id: req.body.id}).exec();
    if(!employee){
      return res.status(204).json({'message': `No employee maches ID ${req.body.id} `});
  }
    const result = await employee.deleteOne({_id: req.body.id});
    res.json(result); 
  }

  const getEmployee =async(req,res)=>{
    if(!req?.params?.id) return res.status(400).json({"message":"ID parameter is required"});

    const employee = await Employee.findOne({_id: req.params.id}).exec();
    if(!employee){
      return res.status(204).json({'message': `No employee maches ID ${req.body.id} `});
    }
    res.json(employee);  
}

  module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmpolyee,
    deleteEmpolyee,
    getEmployee
}