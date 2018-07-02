$(document).ready(function() {
    var aboutDiv = $(".about-div");
    var postContainer = $(".post-container");
   
    getLoggedUser();
    

    function getLoggedUser(){
        $.get("/user",function(data){
            // $(".logged-username").html(data.username);   
            getUserInfo(data.id);
            getPostData(data.id);
        });
    }

    
    function getUserInfo(id){
        var queryUrl = "/user/" + id;
        $.get(queryUrl, function(data) {
            showAboutSection(data);
        });
    }
    

    function showAboutSection(user){
        $(".edit-about").data("user",user);
        // image
        $(".profile-image").attr("src","/images/upload_images/"+user.image);
        
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
            var text = "Lives in : "+user.location;
            var locationP = $("<p>").append(img,text); 
            aboutDiv.append(locationP);
        }
        
        // email
        var img = $("<img>").attr("src","/images/email.png");
        var text = "Email : "+user.email;
        var emailP = $("<p>").append(img,text);
        aboutDiv.append(emailP);

        // membership data
        var img = $("<img>").attr("src","/images/member.png");
        var randomDate = user.createdAt;
        var text = "Member Since : "+dateFormat(randomDate,"MM/DD/YYYY");
        var memberP = $("<p>").append(img,text);
        aboutDiv.append(memberP);
        //total posts
        // var img = $("<img>").attr("src","/images/post.png");
        // var text = "Total Posts: 0";
        // var postCount = $("<p>").append(img,text);
        $(".edit-about").on("click",populateData);
    };

    function dateFormat(randomDate,form){
        var randomFormat = "YYYY-MM-DDThh:mm.sssZ";
        var convertedDate = moment(randomDate, randomFormat);
        var modifiedDate = moment(convertedDate).format(form);
        return modifiedDate;
    }

    function populateData(){
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
    var singlePostDiv = $("<div>").addClass("single-post");
    var postTitle = $("<div>").addClass("post-title");
   
     if (data.length<1) {
        console.log("no posts");
        postTitle.html("No posts to display.");
        postContainer.append(postDiv.append(singlePostDiv.append(postTitle)));
       
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
     var singlePostDiv = $("<div>").addClass("single-post");
     var postTitle = $("<div>").addClass("post-title");
     postTitle.html(post.title);
     var additionalDiv = $("<div>").addClass("additional-div");
     var text = "Posted in "+post.Category.name+" | Created at "+dateFormat(post.createdAt,"MM/DD/YYYY hh:mm:ss");
     additionalDiv.html(text);
     postDiv.append(singlePostDiv.append(postTitle,additionalDiv));
     return postDiv;
  }

  $("#post-search-btn").on("click",function(){
    $.get("/user",function(data){
        var id = data.id;
        getPostsByTitleAndId(id);
    });

  });

  function getPostsByTitleAndId(id){
    var title = $("#search-title").val();
    console.log(title);
    var queryUrl = "api/posts/user/" + id+"/title/"+title;
    $.get(queryUrl, function(data) {
        showPosts(data);
    });
}













});

//  <div class="post-div mb-4">
//         <div class="single-post">
//             <div class="post-title">
//                 “A few of my favorites are: blue crab hand roll, baked mussel,
//             oyster, salmon, freshwater eel, tomago, albacore, and scallop.” 
//             </div>
//             <span class="view-edit-btn"><i class="far fa-eye view-btn" data-toggle="tooltip" data-placement="bottom" title="View post"></i>
//                                     <i class="far fa-edit edit-btn" data-toggle="tooltip" data-placement="bottom" title="Edit post"></i></span>
        
//             <div class="additional-div">Posted in Genereal | 0 comments | Created at 23 March,2018</div>
//     </div>      
//     </div> 
// </div> 