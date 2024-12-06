const Customer=require('../models/Customer');
const mongoose = require('mongoose');

//GET - Home
exports.homepage = async (req, res) => {
    // Remove
    // const messages = await req.consumeFlash('info');
    // Use this instead
    const messages = await req.flash("info");
        const locals = {
        title: "NodeJs",
        description: "Free NodeJs User Management System",
        };

        let perPage = 10;
        let page = req.query.page || 1;

        try {
        const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
        // const count = await Customer.count();
        const count = await Customer.countDocuments({});
    
        res.render("index", {
            locals,
            customers,
            current: page,
            pages: Math.ceil(count / perPage),
            messages,
        });
        } catch (error) {
        console.log(error);
        }
    };
///=======Only-view-data==========///
// exports.homepage = async (req, res) => {
//     const messages = await req.flash("info");

//     const locals = {
//         title: 'NodeJS',
//         description: 'Free NodeJs User Management System'
//     };
//     try {
//         const customers = await Customer.find({}).limit(22); // Fetch customers from MongoDB
//         res.render('index', { locals, messages, customers }); // Pass `customers` to the EJS template
//     } catch (error) {
//         console.error(error);
//         res.render('index', { locals, messages, customers: [] }); // Pass an empty array if an error occurs
//     }
// };
/**
 * 
 * Get New User/Customer
 */
exports.addCustomer = async (req, res)=>{

    const locals = {
        title: 'Add New Customer - NodeJS',
        description:'Free NodeJs User Management System'
    }
    res.render('customer/add', locals);

}

/**
 * post
 */
exports.postCustomer = async (req, res) => {
    console.log(req.body);

    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        details: req.body.details,
        tel: req.body.tel,
        email: req.body.email,
    });

    try {
        await newCustomer.save(); // Save the new customer
        await req.flash('info', 'New customer has been added.'); // Add Message show in dashboard
        console.log('Customer added successfully');
        req.flash('success', 'New customer has been added.'); // Set a success flash message
        res.redirect('/'); // Redirect to the homepage
    } catch (error) {
        console.log(error);
        console.error('Error adding customer:', error);
        req.flash('error', 'Something went wrong.'); // Set an error flash message
        res.redirect('/'); // Redirect to the homepage
    }
};

/** 
 * Get
 * Customer Data
*/
exports.view = async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.id });

        const locals = {
        title: "View Customer Data",
        description: "Free NodeJs User Management System",
        };

        res.render("customer/view", {
        locals,
        customer,
        });
    } catch (error) {
        console.log(error);
    }
    };
    /**
     * Edit
     * data
     */
    exports.edit = async (req, res) => {
        try {
            const customer = await Customer.findOne({ _id: req.params.id });
    
            const locals = {
            title: "Edit Customer Data",
            description: "Free NodeJs User Management System",
            };
    
            res.render("customer/edit", {
            locals,
            customer,
            });
        } catch (error) {
            console.log(error);
        }
        };

/**
 * Udate customer data
 * Edit Post 
 */
exports.editPost = async (req, res) => {
    try {
        await Customer.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.details,
        updatedAt: Date.now(),
        });
        await res.redirect(`/edit/${req.params.id}`);
        console.log("redirected");
    } catch (error) {
        console.log(error);
    }
    };

    /**
     * Delete
     * Delete Customer data
     */

    exports.deleteCustomer = async (req, res) => {
        try {
            await Customer.deleteOne({ _id: req.params.id });
            res.redirect("/");
        } catch (error) {
            console.log(error);
        }
        };

    /**
     * search
     * Search Customer Data
     */
    
    exports.searchCustomers = async (req, res) => {
        const locals = {
            title: "Search Customer Data",
            description: "Free NodeJs User Management System",
        };
        
        try {
            let searchTerm = req.body.searchTerm;
            const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");                    
            const customers = await Customer.find({
            $or: [
                { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
                { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
            ],
            });
                    
            res.render("search", {
            customers,
            locals,
            });
        } catch (error) {
            console.log(error);
        }
        };