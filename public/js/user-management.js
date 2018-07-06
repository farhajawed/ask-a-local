$(document).ready(function() {
    // var nameInput = $("#category-name");
     var userList = $("tbody");
     var userContainer = $(".user-container");
     $(document).on("click", ".en-dis-btn", handleButtonPress);
    
    getUsers();
    function getCount(id,newTr) {
        $.get("/api/post_count/user/"+id, function(data) {
            // console.log(data.length);
            if(data.length>0){
                newTr.append("<td>"+data[0].post_count+"</td>");
                newTr.append("<td><a href='view_post_user?user_id="+id+"'>View Posts</a></td>");
            }   
            else{
                newTr.append("<td>0</td>");
                newTr.append("<td>No Posts</td>");
            }
            userList.prepend(newTr);
        });
    }
   
  function createUserRow(userData,callBack) {
      var newTr = $("<tr>");
      newTr.data("user", userData);
      newTr.append("<td class='username'><a href='dashboard?user_id="+userData.id+"'>"+ userData.username + "</a></td>");
      if(userData.enabled==0){
        newTr.append("<td><button class='btn btn-info mr-2 en-dis-btn' data-status=1>Enable</button></td>");
      }
      else{
        newTr.append("<td><button class='btn btn-danger mr-2 en-dis-btn' data-status=0>Disable</button></td>");
      }
      callBack(userData.id,newTr);
    }


    function getUsers() {
      $.get("/api/users", function(data) {
        userList.empty();
        alertDiv.remove();
        if(data.length<=0){
            renderEmpty();
        }
        else{
            for (var i = 0; i < data.length; i++){
                createUserRow(data[i],getCount);     
            }
        } 
      });
    }
    
    var alertDiv = $("<div>");
    function renderEmpty() {
      alertDiv.addClass("alert alert-danger");
      alertDiv.text("No users");
      userContainer.append(alertDiv);
    }
  
  
    function handleButtonPress() {
      var listItemData = $(this).parent("td").parent("tr").data("user");
      var id = listItemData.id;
      var status = $(this).attr("data-status");
      console.log(id,status,$(this).html());
      var newUser={
          enabled: status
      }

      var message = (status == "0") ? "disable" :"enable";
    
      if (confirm("Are you sure you want to "+message+" the user?")) {
        updateUser(id,newUser);
      } else {
         return;
      }
     }
      
     function updateUser(id,newUser){
            $.ajax({
                method: "PUT",
                url: "/en-dis/user/" + id,
                data : newUser
            })
            .then(function(data){
                console.log(data);
                getUsers();    
            });
        } 
        
        
      $("#user-search-btn").on("click",function(event){
            event.preventDefault();
            getUsersByUsername();
      });

      $("#user-reset-btn").on("click",function(event){
        event.preventDefault();
        $("#search-username").val("");
        userList.empty();
        alertDiv.remove();
        getUsers();
    });
    
      function getUsersByUsername(){
        var username = $("#search-user").val().trim();
        var queryUrl = "/api/users/username/"+username;
        userList.empty();
        alertDiv.remove();
        $.get(queryUrl, function(data) {
            if(data.length<=0){
                renderEmpty();
            }
            else{
                for (var i = 0; i < data.length; i++){
                    createUserRow(data[i],getCount);     
                }
            }
           
        });
    }
});
     