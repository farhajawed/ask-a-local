$(document).ready(function() {
    var aboutDiv = $(".about-div");

    $("#profile-form").on("submit",handleLogin);

    function handleLogin(){
        console.log($('input[type=file]').val());
    }
 
    
    getLoggedUser();
    function getLoggedUser(){
        $.get("/user",function(data){
            $(".logged-username").html(data.username);   
            showAboutSection(data);
        });
    }
    
    function showAboutSection(user){

        // image
        $(".profile-image").attr("src","/images/upload_images/"+user.image);
        
        if(user.firstName && user.lastName){
        var p = $("<p>").addClass("text-center name-style");
        var fullName = p.html(user.firstName+" "+user.lastName);
        aboutDiv.append(fullName);
        }
        //    //location
        //    var img = $("<img>").attr("src","/images/location.png");
        //    var text = "Lives in : Boston, MA";
        //    var location = $("<p>").append(img,text); 

        // email
        var img = $("<img>").attr("src","/images/email.png");
        var text = "Email: "+user.email;
        var emailP = $("<p>").append(img,text);
        aboutDiv.append(emailP);

        // membership data
        var img = $("<img>").attr("src","/images/member.png");
        var randomDate = user.createdAt;
        var randomFormat = "YYYY-MM-DDThh:mm.sssZ";
        var convertedDate = moment(randomDate, randomFormat);
        var modifiedDate = moment(convertedDate).format("MM/DD/YYYY");
        var text = "Member Since: "+modifiedDate;
        var memberP = $("<p>").append(img,text);
        aboutDiv.append(memberP);
        //total posts
        // var img = $("<img>").attr("src","/images/post.png");
        // var text = "Total Posts: 0";
        // var postCount = $("<p>").append(img,text);
        
           

    };

});