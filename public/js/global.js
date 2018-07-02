$(document).ready(function() {
    
    function getPostsbyCat(cat) {
        var queryUrl = "/api/categories";
        $.get(queryUrl,function(data){
            var categories = $(".categories");
            for(var i = 0; i < data.length; i++){
                var catbutton = ("<button class ='cat'>" + data[i].name + "</button>")
                categories.append(catbutton);
            }
        })
    }
    getPostsbyCat();
    
    $(".cat").on("click", (result)=>{

    
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
                            "<h5 class='card-title'>" + username + "</h5>" +
                            "<h6 class='card-subtitle mb-2 text-muted'>" + cardtitle + "</h6>" +
                            "<p class='card-text'>" + body + "</p>" +
                        "</div>" + 
                    "</div>")
                    $.get("api/posts/" + + "/comments", function(data){
                        console.log(data);

                    });
                }
            })
        }

    });
});