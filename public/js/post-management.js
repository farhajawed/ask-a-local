$(document).ready(function() {
    var postList = $("tbody");
    var url = window.location.href;
  
    if (url.indexOf("?user_id=") !== -1) {
      userId = url.split("=")[1];
      getPosts(userId);
    }
    else{
       window.location.href = "/user-management";
    }
  
   
    function createPostRow(postData) {
        var newTr = $("<tr>");
        newTr.data("category", postData);
        newTr.append("<td><a href='/view-post?post_id="+postData.id+"'>" + 
        "<i class='far fa-edit mr-3 text-success'></i>"+postData.title + "</a></td>");
        newTr.append("<td>" + dateFormat(postData.createdAt,"MM/DD/YYYY hh:mm:ss") + "</td>");
        newTr.append("<td>" + dateFormat(postData.updatedAt,"MM/DD/YYYY hh:mm:ss") + "</td>");
        if(postData.Category){
            newTr.append("<td>" + postData.Category.name + "</td>");
        }
        return newTr;
    }
  
    function getPosts(userId) {
      $.get("/user/"+userId, function(result) {
        $("#post-creator").html(result.username);
        $.get("/api/posts/user/"+userId, function(data) {
        if(data.length>0){
            var rowsToAdd = [];
            for (var i = 0; i < data.length; i++) {
             rowsToAdd.push(createPostRow(data[i]));
         }
         renderPostList(rowsToAdd);
        }
        else{
            window.location.href = "/user-management";
        }
    });
   });
 }

    function dateFormat(randomDate,form){
        var randomFormat = "YYYY-MM-DDThh:mm.sssZ";
        var convertedDate = moment(randomDate, randomFormat);
        var modifiedDate = moment(convertedDate).format(form);
        return modifiedDate;
    }
  
    function renderPostList(rows) {
      postList.prepend(rows);
    }
    
  
});
     