
//for logged in username and signout functionality of every page

$(document).ready(function() {

    $(".sign-out").on("click", handleLogout);

    getLoggedUser();
    function handleLogout(){
        $.get("/logout",function(data){
            console.log(data);
            if(data){
                window.location.href = "/?msg="+data;     
            }
            
        })
    }

    function getLoggedUser(){
        $.get("/user",function(data){
            $(".logged-username").html(data.username);  
            $("#email").html(data.email); 
        })
    }

});