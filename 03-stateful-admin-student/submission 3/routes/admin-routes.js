var express = require('express');

// This gives us access to the user "model".
var model = require('../lib/user');

//Enable a repl
var repl = require('repl');

// A list of users who are online:
var online = require('../lib/online').online;

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

router.get('/list', (req, res) => {
  // TODO: Add the admin list route.
  // The admin list route lists the current users in the system and
  // provides a form to add a new user. You must make sure you do
  // the following in this route:
  //
  //   (1) Grab the user session object.
  var sess = req.session.user;
  //   (2) Test that the user session object exists. If not, a redirect
  //       back to the login view is necessary with a proper flash message.
    
  if(!sess) {
    req.flash('Session expired');
    res.redirect('/user/login');
  }
  //   (3) Test if the user session exists and they are not online. If
  //       the user session exists and they are not online it means the
  //       server has been restarted and their session has expired. If
  //       this is the case you will need to redirect back to login with
  //       a proper flash message (e.g., login expired).
  
  else if(sess && (online[sess.name] === undefined)) {
    req.flash('Session expired');
    res.redirect('/user/login');
  }
  
  else{
    
  //   (4) Test if the user is an admin. If they are not you need to
  //       redirect back to main with a proper flash message - indicate
  //       that the user needs admin credentials to access this route.
  
    if(!sess.admin){
      req.flash('main', 'You\'re not an administrator!');
      res.redirect('/user/main');
      return;
    }
  
  //   (5) If the user is logged in, is online, and is an admin then
  //       you want to retrieve the list of users from the `lib/user.js`
  //       library and render the `user-list` view. The `user-list` view
  //       expects an array of users and a message. You should grab the
  //       flash message - if one exists, and pass it to the view template.
  //       A flash message will exist if the user tried to create a new
  //       user that already exists in our mock database.
  //
  //  You will be graded on each of the above items.
  // Replace below with your own implementation.
  
  
    else{
      model.list(function(error, userArray){
        var msg = req.flash('user-list');
        res.render('user-list', {
          message : msg,
          users : userArray
        });   //end render
      }); //end list
    } //end close else
  }//end higher else
});//end entire callback and router.post call

router.post('/user', (req, res) => {
  // TODO: Implement the /user route.
  // This route is similar to the /user/auth route in that it does not
  // have an associated view. Rather, its job is to add a new user and
  // redirect to /admin/list. Its job is to add a new user if the user
  // does not already exist in our model. You must make sure you do
  // the following in this route:
  //
  //   (1) Grab the user session object.
    var sess = req.session.user;
  //   (2) Test that the user session object exists. If not, a redirect
  //       back to the login view is necessary with a proper flash message.
    if(!sess){
      req.flash('main', 'Session expired.');
      res.redirect('user/login/');
      return;
    }
  //   (3) Test if the user session exists and they are not online. If
  //       the user session exists and they are not online it means the
  //       server has been restarted and their session has expired. If
  //       this is the case you will need to redirect back to login with
  //       a proper flash message (e.g., login expired).
  else if(sess && (online[sess.name] == undefined)){
      req.flash('main', 'Login expired.');
      res.redirect('user/login/');
    return;
  }
  //   (4) Test is the user is an admin. If they are not you need to
  //       redirect back to main with a proper flash message - indicate
  //       that the user needs admin credentials to access this route.
  else if(!sess.admin){
    req.flash('main', 'Privileged operation, sorry.');
      res.redirect('/user/main/');
    return;
  }
  //   (5) If the user is logged in, they are online, and they are an
  //       admin then you need to grab the form variables from the
  //       `req.body` object. Test to make sure they all exist. If they
  //       do not then you need to redirect back to the `/list` route
  //       defined above with a proper flash message.
  else{
    var form = req.body;
    if(!form.name || !form.pass || !form.admin){
      req.flash('user-list', 'Error receiving new user information');
      res.redirect('/admin/list');
      return;
    }
    else{
      var u = {
        name: form.name,
        pass: form.pass,
        admin: form.admin === 'yes' ? true : false
      };
      model.add(u, function(error, newUser){
        if(error) {
          req.flash('user-list', error);
          res.redirect('/admin/list');
          return;
        }
        else{
          req.flash('user-list', 'Successfully created new user!');
          res.redirect('/admin/list');
          return;
        }
      });
      
    }
  }
  // ^^^^ (6) If you have received the proper form variables then you must
  //       create a new user using the `model.add` function. If an error
  //       message is returned in the callback you should flash that message
  //       to the `list` route above passing it the error message returned
  //       from the `model.add` function and redirect to `list`.
  //       Otherwise, you should flash to `list` that the user has
  //       been added and redirect back to the `list` route.
});

module.exports = router;