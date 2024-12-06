const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController');

/**
 * Customer Routes
 */
router.get('/',customerController.homepage);
//Add
router.get('/add', customerController.addCustomer);
router.post('/add', customerController.postCustomer);

//View
router.get('/view/:id', customerController.view);

//edit
router.get('/edit/:id', customerController.edit);
router.put('/edit/:id', customerController.editPost);
router.delete('/delete/:id', customerController.deleteCustomer);

//search
router.post('/search', customerController.searchCustomers);

module.exports = router;