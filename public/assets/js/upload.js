//This will contain our files  
var data = Array();

//Function to check whether or not this will work
var supported = function () {
    
  //All of the stuff we need
  if (window.File && window.FileReader && window.FileList && window.Blob && window.XMLHttpRequest) {   
    return true;  
  } else {
    return false;
  }
};

//The Input File has Been Loaded Into Memory!
var loaded = function(event) {
  //Push the data into our array
  //But don't start uploading just yet        
  data.push(event.target.result);
};

var uploadFile = function(event) {
  //Needs a Better Way to
  //Link Data to Button
  var id = $(this).attr('data');
  $.ajax({
    type: "POST",
    //JSFiddle Echo Server
    url: "/echo/html/",
    
    data: {
      "html": "<li><a target=\"_blank\" href=\"" + data[id] + "\">link</a></li>"
    },
    success: function(data) {
      $("#ajax").append(data);
    },
      dataType: 'html'
    });
};

var processFiles = function(event) {
    
  //If not supported tell them to get a better browser
  if(!supported) {
      alert('upgrade your browser');
      return; 
  }
       
  var i;  
  var files = event.target.files;
  
  //Loop through our files  
  for (i = 0; i < files.length; i += 1) {
    var file = files[i]; 
    
    //A New Reader for Each File  
    var reader = new FileReader();
    
    //Build the File Info HTML  
    var fileInfo = ["<li>",
                     file.name,
                     //Get Size in Kilobytes 
                     "<span>",
                     file.size / 1024,
                     " kb</span>", 
                     //Make Upload Button
                     "<button class=\"upload\" data=\"",
                     i,
                     "\">Upload This File</button>",
                     "</li>"].join(''); 
      
    $("#list").append(fileInfo);

    reader.onload = loaded;
    reader.readAsDataURL(file);
  }
    $(".upload").on("click", uploadFile);    
};
$("#fileInput").on("change", processFiles);