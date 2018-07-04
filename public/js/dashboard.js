$(document).ready(function() {
    var url = window.location.href;

      $.get("/user",function(data){
        if (url.indexOf("?user_id=") !== -1) {
            var id = url.split("=")[1];
            if(id === data.id){
                logged = true;
                userId = data.id;
               
            }
            else{
                logged = false;
                userId = id;
            }
        }
        else{
            logged = true;
            userId = data.id;
        }
        getDashboard(userId);
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
    

    function showAboutSection(user){
      
        // image
        $(".profile-image").attr("src","/images/upload_images/"+user.image);
      
        //show edit button only if logged in user visits her own dashboard
        if(logged === true){ 
            console.log(user);
            var editButton = $("<button>").addClass("btn btn-info edit-about");
            var editIcon = $("<i>").addClass("far fa-edit");
            editButton.append(editIcon);
            editButton.attr("data-toggle","modal");
            editButton.attr("data-target","#exampleModal");
            editButton.data("user",user);
            $(".div-header").append(editButton);    
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
        console.log($(this).data("user").firstName);
        $("#firstName").val($(this).data("user").firstName);
        $("#lastName").val($(this).data("user").lastName);
        $("#location").val($(this).data("user").location);
        $("#bio").val($(this).data("user").bio);
        // $('input[type=file]#profile-image').val($(this).data("user").image);
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
        console.log("no posts");
        postTitle.html("No posts to display.");
        postContainer.append(postDiv.append(postTitle));
       
     }
     else{
         console.log(data);
         var postsToAdd = [];
         for(var i=0; i<data.length;i++){
           postsToAdd.push(createNewRow(data[i]));
         }
         postContainer.append(postsToAdd);        
     }
  }

  function createNewRow(post){
     var postDiv =$("<div>").addClass("post-div mb-4");
     var postTitle = $("<div>").addClass("post-title");
     var anchor = $("<a>").attr("href","../view-post?post_id="+post.id);
     anchor.addClass("post-title-anchor")
     anchor.html(post.title);
     postTitle.html(anchor);
     var additionalDiv = $("<div>").addClass("additional-div");
     var text = "Posted in "+post.Category.name+" | Created at "+dateFormat(post.createdAt,"MM/DD/YYYY hh:mm:ss");
     additionalDiv.html(text);
     postDiv.append(anchor,additionalDiv);
     return postDiv;
  }

  $("#post-search-btn").on("click",function(){
        getPostsByTitleAndId(userId);
  });

  function getPostsByTitleAndId(id){
    var title = $("#search-title").val();
    var queryUrl = "api/posts/user/" + id+"/title/"+title;
    $.get(queryUrl, function(data) {
        showPosts(data);
    });
}
});
