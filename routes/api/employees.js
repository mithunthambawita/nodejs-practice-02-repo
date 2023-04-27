const express = require("express");
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require("../../middleware/verifyRoles");
// const path = require("path");


router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeesController.createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),employeesController.updateEmpolyee)
  .delete(verifyRoles(ROLES_LIST.Admin),employeesController.deleteEmpolyee);

router.route('/:id')
  .get(employeesController.getEmployee);

module.exports = router;
