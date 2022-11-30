const express = require('express');

const Product = require('./product.models');

const router = express.Router();

// send home page
router.get('/', (req, res) => {
  res.render('index');
});

// send add user page
router.get('/add', (req, res) => {
  res.render('addUser');
});

// add user POST
router.post('/add', (req, res) => {
  console.log(req.body);
  let u1 = new Product({
    name: req.body.name,
    email: req.body.email,
  });

  u1.save().then((result) => {
    console.log('User Added');
    res.redirect('/all');
  });
});

// send all user
router.get('/all', (req, res) => {
  Product.find({}).then((result) => {
    res.render('userList', { users: result });
  });
});

// send a user
router.get('/:id', (req, res) => {
  console.log(req.params);
  Product.find({ _id: req.params.id })
    .then((result) => {
      res.render('user', { user: result[0] });
    })
    .catch((err) => {
      res.status(404).send('Error in the Request');
    });
});

// update a user GET
router.get('/update/:id', (req, res) => {
  Product.find({ _id: req.params.id })
    .then((result) => {
      res.render('update', { user: result[0] });
    })
    .catch((err) => {
      res.status(404).send('Error in the Request');
    });
});

// update a user POST
router.post('/update/:id', (req, res) => {
  console.log(req.body);
  let { name, email } = req.body;
  Product.findByIdAndUpdate(req.params.id, { name, email }, { new: true }).then(
    (result) => {
      res.redirect('/all');
    }
  );
});

// delete a user
router.get('/delete/:id', (req, res) => {
  console.log(req.params.id);
  Product.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result);
      res.redirect('/all');
    })
    .catch((err) => {
      res.send('Error the Request');
    });
});

module.exports = router;
