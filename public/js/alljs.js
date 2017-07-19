$(document).ready(function () {

  // Getting jQuery references to the post body, title, form, and category select
  var hostInput = $("#host");
  var titleInput = $("#title");
  var locationInput = $("#location");
  var dateInput = $("#date");
  var descriptionInput = $("#description");

// Adding an event listener for when the form is submitted
  $("#add-btn").on("click", function handleFormSubmit(event) {

    event.preventDefault();

// Wont submit the post if we are missing a body or a title
    if (!titleInput.val().trim() || !locationInput.val().trim() || !dateInput.val().trim()) {
      return;
    }

// Constructing a newEvent object to hand to the database
    var newEvent = {
      host: hostInput.val().trim(),
      title: titleInput.val().trim(),
      location: locationInput.val().trim(),
      date: dateInput.val().trim(),
      description: descriptionInput.val().trim(), 
      tags: descriptionInput.val().trim()
    };

    // // Submits a new post and brings user to event page upon completion
    $.post("/api/events", newEvent, function() {
      window.location.href = "/event"
    })
  });

});

// EDITEVENT JS
$(document).ready(function () {
  console.log('ready');
  // Gets an optional query string from our url 
  var url = window.location.search;
  var postId;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var hostInput = $("#host");
  var titleInput = $("#title");
  var locationInput = $("#location");
  var dateInput = $("#date");
  var descriptionInput = $("#description");

  // Adding an event listener for when the form is submitted
  $("#add-btn").on("click", function handleFormSubmit(event) {

    event.preventDefault();

    // Wont submit the post if we are missing a body or a title
    if (!titleInput.val().trim() || !locationInput.val().trim() || !dateInput.val().trim()) {
      return;
    }

       // Constructing a newPost object to hand to the database
    var newPost = {
      host: hostInput.val().trim(),
      title: titleInput.val().trim(),
      location: locationInput.val().trim(),
      date: dateInput.val().trim(),
      description: descriptionInput.val().trim()
    };

    newPost.id = postId;
    updatePost(newPost);
  });

  // Gets post data for a post if we're editing
  function getPostData(id) {
    $.get(`/api/events/${id}`, function (data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        hostInput.val(data.host);
        titleInput.val(data.title);
        locationInput.val(data.location);
        dateInput.val(data.date);
        descriptionInput.val(data.description);
      }
    });
  }
  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
        method: "PUT",
        url: "/api/events",
        data: post
      })
      .done(function () {
        window.location.href = "/home";
      });
  }
});


// LOGIN JS

$(document).ready(function () {

  // Getting jQuery references to the post body, title, form, and category select
  var emailInput = $("#email");
  var passwordInput = $("#password");

  // Adding an event listener for when the form is submitted
  $("#add-btn").on("click", function handleFormSubmit(event) {

    event.preventDefault();

    // Wont submit the post if we are missing a body or a title
    if (!emailInput.val().trim() || !passwordInput.val().trim()) {
      return;
    }
    // Constructing a newEvent object to hand to the database
    var userLogin = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    

    axios.post('/api/login', userLogin)
    .then(function (res) {
      console.log(res)
      if (res.data) {
        localStorage.setItem('userId', res.data);
        window.location.href = '/newsfeed';
      } 
    })
    .catch(function (err) {
      console.log(err)
    })

  });

});


/// POLITICAL JS
$(document).ready(function(){

	$.ajax({
      url: "/political",
      method: "GET",
    })
    .done(function(response) {
      console.log(response);
      // console.log(JSON.stringify(JSON.parse(response),null,2));
  });
});


/// REGISTER JS

$(document).ready(function () {

  // Getting jQuery references to the post body, title, form, and category select
  var usernameInput = $("#username");
  var emailInput = $("#email");
  var passwordInput = $("#password");
  
  // Adding an event listener for when the form is submitted
  $("#add-btn").on("click", function handleFormSubmit(event) {

    event.preventDefault();

    // Wont submit the post if we are missing a body or a title
    if (!emailInput.val().trim() || !passwordInput.val().trim()) {
      return;
    }
    // Constructing a newEvent object to hand to the database
    var newUser = {
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    // // Submits a new post and brings user to newsfeed upon completion
    // $.post("/register", newUser, function() {
    //   window.location.href = "/newsfeed"
    // })

    axios.post('/api/register', newUser)
    .then(function (resp) {
      window.location.href = '/newsfeed'
    })
    .catch(function (err) {
      console.log(err)
    })
  });

});