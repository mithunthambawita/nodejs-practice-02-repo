const data = {
    employees : require("../model/employees.json"),
    setEmployees: function (data) {this.employees = data}
};
data.employees = require("../model/employees.json");

const getAllEmployees = (req, res) => {
    res.json(data.employees);
  }

const createNewEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees[data.employees.length-1].id + 1 || 1,
        firstName: req.body.firstName,
        lastName : req.body.lastName
    }

    if (!newEmployee.firstName || !newEmployee.lastName){
        return res.status(400).json({'message' : 'First and Last names are required'});
    }
    
    data.setEmployees([...data.employees,newEmployee]);
    res.status(201).json(data.employees);
  }

  const updateEmpolyee =(req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({'message': `Employee ID ${req.body.id} not found`});
    }
    if(req.body.firstName) employee.firstName =req.body.firstName;
    if(req.body.lastName) employee.lastName =req.body.lastName;
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray,employee];
    data.setEmployees(unsortedArray.sort((a, b)=> a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);

  }

  const deleteEmpolyee = (req, res) => {
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({'message': `Employee ID ${req.body.id} not found`});
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees); 
  }

  const getEmployee =(req,res)=>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if(!employee){
        return res.status(400).json({'message': `Employee ID ${req.body.id} not found`});
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