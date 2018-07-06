$(document).ready(function() {
     
    var signupForm = $("#signup-form");
    var email = $("#email");
    var password = $("#password");
    var username = $("#username");


    signupForm.on("submit",handleSignupFormSubmit);
    function handleSignupFormSubmit(event){
        event.preventDefault();
        // Wont submit the post 
        if(!email.val().trim() || !password.val().trim() || !username.val().trim()){
            return;
        }

        var signupCredentials = {
            email : email.val().trim(),
            password : password.val().trim(),
            username : username.val().trim()
        };
        submitSignupForm(signupCredentials);            
    }
    
    function submitSignupForm(signupCredentials){
        $.post("/signup",signupCredentials,function(data){
            if(data===true){
                window.location.href = "/?signup=success";  
            }
           else{
               if(data.errors){
                   $("#signup-fail").addClass("alert alert-danger").html(data.errors[0].message);
               } 
           }                        
        })
    }
});