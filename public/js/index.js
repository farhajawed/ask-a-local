$(document).ready(function() {
     
    var loginForm = $("#login-form");
    var email = $("#email");
    var password = $("#password");


    loginForm.on("submit",handleLoginFormSubmit);

    //success message on logout
    $("#logout-msg").hide();  
    $("#unauthorized-msg").hide();
    $("#false-msg").hide();
    $("#signup-success").hide();
    var url = window.location.search;
    if (url.indexOf("?msg=success") !== -1) {
        $("#logout-msg").show();
    }
    else if (url.indexOf("?msg=false") !== -1) {
        $("#false-msg").show();
    }
    else if(url.indexOf("?msg=unauthorized") !== -1) {
        $("#unauthorized-msg").show();
    }
    else if(url.indexOf("?signup=success") !== -1) {
        $("#signup-success").show();
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