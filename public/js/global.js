$(document).ready(function() {
    
    function getPostsbyCat(cat) {
        var queryUrl = "/api/categories";
        $.get(queryUrl,function(data){
            console.log(data);
            var categories = $(".categories");
            for(var i = 0; i < data.length; i++){
                var catbutton = ("<button class ='cat'>" + data[i].name + "</button>")
                categories.append(catbutton);
            }
        })
    }
    getPostsbyCat();

    function writeCatPosts(){
        var category = $(".cat")
        var queryUrl = "api/post/categories/" + category;
        $.get(queryUrl, function(data){
            console.log(data);
            for(var i = 0; i < data.length; i++){
                var card = (
                "<div class='card'>" +
                    "<img class='card-img-top' src='#' alt='Card image'>" +
                    "<div class='card-body'>" +
                        "<h5 class='card-title'>" + data[i].UserId + "</h5>" +
                        "<h6 class='card-subtitle mb-2 text-muted'>" + data[i].title + "</h6>" +
                        "<p class='card-text'>" + data[i].body + "</p>" +
                    "</div>" + 
                "</div>")
                var postId = data[i].id;
                $.get("api/posts/" + postId + "/comments", function(result){
                    console.log(result);
                    // if(){

                    // }else{

                    // }
                });

                $(".categories").html("<div class='card'>" +
                "<img class='card-img-top' src='#' alt='Card image'>" +
                "<div class='card-body'>" +
                    "<h5 class='card-title'>" + data[i].UserId + "</h5>" +
                    "<h6 class='card-subtitle mb-2 text-muted'>" + data[i].title + "</h6>" +
                    "<p class='card-text'>" + data[i].body + "</p>" +
                "</div>" + 
                "</div>");

            }
        })
    }
    
    $(".cat").on("click", (result)=>{

        writeCatPosts();

    });
});