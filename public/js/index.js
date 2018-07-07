$(document).ready(function() {
     
    var loginForm = $("#login-form");
<<<<<<< HEAD
    var email = $("#email");
=======
    var username = $("#username");
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
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
<<<<<<< HEAD
        if(!email.val().trim() || !password.val().trim()){
=======
        if(!username.val().trim() || !password.val().trim()){
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
            return;
        }

        var loginCredentials = {
<<<<<<< HEAD
            email : email.val().trim(),
=======
            username : username.val().trim(),
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
            password : password.val().trim()
        };
        submitLoginForm(loginCredentials);            
    }
    
    function submitLoginForm(loginCredentials){
        $.post("/",loginCredentials,function(data){
<<<<<<< HEAD
            console.log(data);
=======
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
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