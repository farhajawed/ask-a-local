
//for logged in username and signout functionality of every page

$(document).ready(function() {

    $(".sign-out").on("click", handleLogout);

    getLoggedUser();
    function handleLogout(){
        $.get("/logout",function(data){
<<<<<<< HEAD
            console.log("data"+data);
=======
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
            if(data){
                window.location.href = "/?msg="+data;     
            }
            
        })
    }

    function getLoggedUser(){
        $.get("/user",function(data){
            $(".logged-username").html(data.username);  
<<<<<<< HEAD
            $(".logged-username").attr("data-userId",data.id);
=======
            
>>>>>>> 4af2e6a2fd5f78a03a0d86ad40d8dce97d50f561
        })
    }

});