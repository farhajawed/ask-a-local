$(document).ready(function() {
     
    var loginForm = $("#login-form");
    var username = $("#username");
    var password = $("#password");

    loginForm.on("submit",handleLoginFormSubmit);

    var url = window.location.search;
    if (url.indexOf("?msg=success") !== -1) {
        $("#success-msg").addClass("alert alert-success").append("You are successfully logged out!");
    }
    else if (url.indexOf("?msg=false") !== -1) {
        $("#failure-msg").addClass("alert alert-danger").append("Invalid username or password");
    }
    else if(url.indexOf("?msg=unauthorized") !== -1) {
        $("#failure-msg").addClass("alert alert-danger").append("Please log in or sign up first.");
    }
    else if(url.indexOf("?signup=success") !== -1) {
        $("#success-msg").addClass("alert alert-success").append("Registration successful! Please log in.");
    }
    else if(url.indexOf("?msg=disabled") !== -1) {
        $("#failure-msg").addClass("alert alert-danger").append("Your account has been disabled by admin.");
    }
   ; 
    
    function handleLoginFormSubmit(event){
        event.preventDefault();
        // Wont submit the post 
        if(!username.val().trim() || !password.val().trim()){
            return;
        }

        var loginCredentials = {
            username : username.val().trim(),
            password : password.val().trim()
        };
        submitLoginForm(loginCredentials);            
    }
    
    function submitLoginForm(loginCredentials){
        $.post("/",loginCredentials,function(data){
            console.log(data);
            if(data==="invalid"){
                window.location.href = "/?msg=false";  
            }
            else if(data==="disabled"){
                window.location.href = "/?msg=disabled";  
            }
            else{
                console.log(data);
                updateToken(data);
            }
           
        })
    }

   function updateToken(post) {
     $.ajax({
        method: "PUT",
        url: "/",
        data: post
        })
        .then(function() {
            window.location.href = "/dashboard";
           
        });
    }
    
});