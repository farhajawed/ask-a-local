$(document).ready(function() {
     
    var loginForm = $("#login-form");
    var email = $("#email");
    var password = $("#password");

    loginForm.on("submit",handleLoginFormSubmit);

    var url = window.location.search;
    if (url.indexOf("?msg=success") !== -1) {
        $("#logout-msg").addClass("alert alert-success").append("You are successfully logged out!");
    }
    else if (url.indexOf("?msg=false") !== -1) {
        $("#false-msg").addClass("alert alert-danger").append("Invalid username or password");
    }
    else if(url.indexOf("?msg=unauthorized") !== -1) {
        $("#unauthorized-msg").addClass("alert alert-danger").append("Please log in or sign up first.");
    }
    else if(url.indexOf("?signup=success") !== -1) {
        $("#signup-success").addClass("alert alert-success").append("Registration successful! Please log in.");
    }
   ; 
    
    function handleLoginFormSubmit(event){
        event.preventDefault();
        // Wont submit the post 
        if(!email.val().trim() || !password.val().trim()){
            return;
        }

        var loginCredentials = {
            email : email.val().trim(),
            password : password.val().trim()
        };
        submitLoginForm(loginCredentials);            
    }
    
    function submitLoginForm(loginCredentials){
        $.post("/",loginCredentials,function(data){
            console.log(data);
            if(!data){
                window.location.href = "/?msg=false";  
            }
            else{
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