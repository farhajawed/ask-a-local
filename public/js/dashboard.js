$(document).ready(function() {
    var url = window.location.href;

      $.get("/user",function(data){
        if (url.indexOf("?user_id=") !== -1) {
            var id = url.split("=")[1];
            if(id === data.id){
                logged = true;
<<<<<<< HEAD
                getDashboard(data.id);
            }
            else{
                logged = false;
                getDashboard(id);
=======
                userId = data.id;            
            }
            else{
                logged = false;
                userId = id;
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
            }
        }
        else{
            logged = true;
<<<<<<< HEAD
            getDashboard(data.id);
        }
=======
            userId = data.id;
        }
        getDashboard(userId);
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
    });

    var aboutDiv = $(".about-div");
    var postContainer = $(".post-container");
   
   
    function getDashboard(id){
        getUserInfo(id);
        getPostData(id); 
    }

    
    function getUserInfo(id){
        var queryUrl = "/user/" + id;
        $.get(queryUrl, function(data) {
            showAboutSection(data);
        });
    }
<<<<<<< HEAD
    
=======

    $("#profileForm").on("submit", function handleUpdate(event) {
        event.preventDefault();
        var updatedUser ={
            firstName : $("#firstName").val().trim(),
            lastName : $("#lastName").val().trim(),
            location : $("#location").val().trim(),
            bio : $("#bio").val().trim()
        }
        updateProfile(updatedUser);
    });
    
    function updateProfile(updatedUser) {
        $.ajax({
          method: "PUT",
          url: "/update/user/"+userId,
          data: updatedUser
        })
          .then(function() {
            window.location.href = "/dashboard";
          });
      }

>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561

    function showAboutSection(user){
      
        // image
        $(".profile-image").attr("src","/images/upload_images/"+user.image);
<<<<<<< HEAD
      
        //show edit button only if logged in user visits her own dashboard
        if(logged === true){ 
            console.log(user);
            var editIcon = $("<i>").addClass("far fa-edit edit-about");
            editIcon.attr("data-toggle","modal");
            editIcon.attr("data-target","#exampleModal");
            editIcon.data("user",user);
            $(".div-header").append(editIcon);    
=======
          
        //show edit button only if logged in user visits her own dashboard
        if(logged === true){ 
            //show upload icon on hover
            $(".wrapper").attr({
                "data-toggle":"modal",
                "data-target":"#imageModal"
            });
            $(".wrapper").on("mouseover",function(){
                $(".small-img").show();
            })
            $(".wrapper").on("mouseout",function(){
                $(".small-img").hide();
            })

            var editButton = $("<button>").addClass("btn btn-info edit-about ml-2");
            var editIcon = $("<i>").addClass("far fa-edit");
            editButton.append(editIcon);
            editButton.attr("data-toggle","modal");
            editButton.attr("data-target","#exampleModal");
            editButton.data("user",user);
            $(".div-header").append(editButton);    
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
        }
      
        if(user.firstName && user.lastName){
            var p = $("<p>").addClass("text-center name-style");
            var fullName = p.html(user.firstName+" "+user.lastName);
            aboutDiv.append(fullName);
        }
        //bio
        if(user.bio){
            var text = '"'+user.bio+'"';
            var bioP = $("<p>").append(img,text).addClass("text-center bio"); 
            aboutDiv.append(bioP);
        }
        //location
        if(user.location){ 
            var img = $("<img>").attr("src","/images/location.png");
            var text = " Lives in : "+user.location;
            var locationP = $("<p>").append(img,text); 
            aboutDiv.append(locationP);
        }
        
        // email
        var img = $("<img>").attr("src","/images/email.png");
        var text = " "+user.email;
        var emailP = $("<p>").append(img,text);
        aboutDiv.append(emailP);

        // membership data
        var img = $("<img>").attr("src","/images/member.png");
        var randomDate = user.createdAt;
        var text = " Member Since : "+dateFormat(randomDate,"MM/DD/YYYY");
        var memberP = $("<p>").append(img,text);
        aboutDiv.append(memberP);
       
        if(logged === true){
             $(".edit-about").on("click",populateData);
        }
    };

    function dateFormat(randomDate,form){
        var randomFormat = "YYYY-MM-DDThh:mm.sssZ";
        var convertedDate = moment(randomDate, randomFormat);
        var modifiedDate = moment(convertedDate).format(form);
        return modifiedDate;
    }

    function populateData(){
<<<<<<< HEAD
        console.log($(this).data("user").firstName);
=======
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
        $("#firstName").val($(this).data("user").firstName);
        $("#lastName").val($(this).data("user").lastName);
        $("#location").val($(this).data("user").location);
        $("#bio").val($(this).data("user").bio);
<<<<<<< HEAD
        // $('input[type=file]#profile-image').val($(this).data("user").image);
=======
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
    }

    
  function getPostData(id) {
    var queryUrl = "/api/posts/user/" + id;
    $.get(queryUrl, function(data) {
    
        showPosts(data);
     
    });
  }

  function showPosts(data){
    postContainer.empty();
    var postDiv =$("<div>").addClass("post-div mb-4");
    var postTitle = $("<div>").addClass("post-title-anchor");
   
     if (data.length<1) {
<<<<<<< HEAD
        console.log("no posts");
=======
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
        postTitle.html("No posts to display.");
        postContainer.append(postDiv.append(postTitle));
       
     }
     else{
<<<<<<< HEAD
         console.log(data);
=======
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
         var postsToAdd = [];
         for(var i=0; i<data.length;i++){
           postsToAdd.push(createNewRow(data[i]));
         }
         postContainer.append(postsToAdd);        
     }
  }

  function createNewRow(post){
     var postDiv =$("<div>").addClass("post-div mb-4");
<<<<<<< HEAD
=======
     if(logged===true){
        var iconLink = $("<a>").attr("href","../view-post?post_id="+post.id);
        iconLink.append($("<i>").addClass("far fa-edit mr-3 text-success"));
        postDiv.append(iconLink);
     }
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
     var postTitle = $("<div>").addClass("post-title");
     var anchor = $("<a>").attr("href","../view-post?post_id="+post.id);
     anchor.addClass("post-title-anchor")
     anchor.html(post.title);
     postTitle.html(anchor);
     var additionalDiv = $("<div>").addClass("additional-div");
<<<<<<< HEAD
     var text = "Posted in "+post.Category.name+" | Created at "+dateFormat(post.createdAt,"MM/DD/YYYY hh:mm:ss");
     additionalDiv.html(text);
=======
     if(post.Category!==null){
          var text = "Posted in "+post.Category.name+" | ";
          additionalDiv.append(text);
     }
     var textCreation = "Created at "+dateFormat(post.createdAt,"MM/DD/YYYY hh:mm:ss");
     additionalDiv.append(textCreation);
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
     postDiv.append(anchor,additionalDiv);
     return postDiv;
  }

<<<<<<< HEAD
  $("#post-search-btn").on("click",function(){
    $.get("/user",function(data){
        var id = data.id;
        getPostsByTitleAndId(id);
    });
  });

=======
  $("#post-search-btn").on("click",function(event){
        event.preventDefault();
        getPostsByTitleAndId(userId);
  });

  $("#post-reset-btn").on("click",function(event){
    event.preventDefault();
    $("#search-title").val("");
    getPostData(userId);
});

>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
  function getPostsByTitleAndId(id){
    var title = $("#search-title").val();
    var queryUrl = "api/posts/user/" + id+"/title/"+title;
    $.get(queryUrl, function(data) {
        showPosts(data);
    });
}
});
