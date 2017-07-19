var express = require("express");
var router = express.Router();
var db = require("../models");

// WORKING PATHS

//    / = signup
//    /events = events

//Redirect from / to signup page
router.get("/", function(req, res) { 
    res.redirect("/signup"); });

// THE NEXT DOES THE SAME THING

// Renders from signup to register
router.get("/signup", function(req, res) {  
    res.render("register"); });

// NO
router.get("./events/create", function(req, res) {  
    res.redirect("/addevent"); });

    /// NO
router.get("/login", function(req, res) {  
    res.render("/events"); });

    // NO
router.post("/signup/usercreate", function(req, res) {
    return db.Users.create({
        username: req.body.reg_user,
        password: req.body.reg_pass
    }).then(function() {
        res.redirect("/events");
    });
});

// LOADS ALL EVENTS
router.get("/events", function(req, res) {
    db.Events.findAll({
        order: [ ["event_name", "ASC"] ]
    }).then(function(allEvents) {
         console.log(allEvents);
         var events = {"Events" : allEvents}
        res.render("index", events);
       
    });
});

// LOADS ALL EVENTS
router.get("/myfeed", function(req, res) {
    db.Events.findAll({
        order: [ ["event_name", "ASC"] ]
    }).then(function(allEvents) {
         console.log(allEvents);
         var events = {"Events" : allEvents}
        res.render("newsfeed", events);
       
    });
});

// LOADS ALL EVENTS
router.get("/create", function(req, res) {
    db.Events.findAll({
        order: [ ["event_name", "ASC"] ]
    }).then(function(allEvents) {
         console.log(allEvents);
         var events = {"Events" : allEvents}
        res.render("addevent", events);
       
    });
});






/////////////////
router.get("/events/:id", function(req, res) {
    db.Events.findAll({
        
        where: { id: req.params.id }

    }).then(function(oneEvent) {
       //  console.log(allEvents);
         var singleEvent = {"Events" : oneEvent}
        res.render("index", singleEvent);
       
    });
});




// CREATE A NEW EVENT
router.post("/new", function(req, res) {
    return db.Events.create({
        event_name: req.body.in_event,
        event_desc: req.body.in_desc,
        event_location: req.body.in_location,
        event_date: req.body.in_date
    }).then(function() {
        res.redirect("/events");
    });
});

// UPDATE A EVENT AFTER IT IS REMOVED
router.put("/events/update/removed/:id", function(req, res) {
  return db.Events.update({
    removed: req.body.removed,  
        }, { where: { id: req.params.id }
    }).then(function() {
        res.redirect("/events");
    });
});

// UPDATE A EVENT WITH RETURN ID
router.put("/events/update/return/:id", function(req, res) {
    return db.Events.update({
    removed: req.body.removed
    }, { where: { id: req.params.id }
    }).then(function() {
    res.redirect("/events");
    });
});

// DELETE A EVENT
router.delete("/events/delete/:id", function(req, res) {
    return db.Events.destroy({
        where: { id: req.params.id }
    }).then(function() {
        res.redirect("/events");
    });
});




module.exports = router;