$(document).ready(function() {
    
    function getCat(cat) {
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
    getCat();

    function mostrecentPosts(){
        var queryUrl = "api/posts/";
        $.get(queryUrl, function(data){
            console.log(data);
            var username;
            var userimage;
            var card;
            
            for(let i = 0; i < data.length; i++){
                var spot = $("<div class='globalposts'>");
                $.get("/user/" + data[i].UserId, function(result){
                    username = result.username;
                    userimage = result.image;
                    console.log(result);
                

                    card = 
                    "<div class='card'>" +
                        "<div class='card-header'>" + 
                            "<img class='thumbnail' src='/images/upload_images/" + userimage + "' alt = 'user image'>" + 
                            "<h5 class='username card-title'>" + username + "</h5>" + 
                        "</div>" +
                        "<img class='card-img-top' src='/images/upload_images/" + data[i].image + "' alt='Card image'>" +
                        "<div class='card-body'>" +
                            "<h6 class='card-subtitle mb-2 text-muted'>" + data[i].title + "</h6>" +
                            "<p class='card-text'>" + data[i].body + "</p>" +
                        "</div>" + 
                    "</div>";
                    spot.append(card);

                })

                $.get("api/posts/" + data[i].id + "/comments", function(result1){
                    spot.append(JSON.stringify(result1));
                });

                $(".catPosts").append(spot);
            }
        })
    };

    mostrecentPosts();

    // function writeCatPosts(){
    //     var cat = $(".cat").val();
    //     console.log(cat)
    //     var queryUrl = "api/post/categories/" + cat;
    //     $.get(queryUrl, function(data){
    //         console.log(data);
    //         for(var i = 0; i < data.length; i++){
    //             var card = 
    //             "<div class='card'>" +
    //                 "<img class='card-img-top' src='#' alt='Card image'>" +
    //                 "<div class='card-body'>" +
    //                     "<h5 class='card-title'>" + data[i].UserId + "</h5>" +
    //                     "<h6 class='card-subtitle mb-2 text-muted'>" + data[i].title + "</h6>" +
    //                     "<p class='card-text'>" + data[i].body + "</p>" +
    //                 "</div>" + 
    //             "</div>";
    //             // var postId = data[i].id;
    //             // $.get("api/posts/" + postId + "/comments", function(result){
    //             //     console.log(result);
    //             //     // if(){

    //             //     // }else{

    //             //     // }
    //             // });

    //             $(".categories").append(card);

    //         }
    //     })
    // }

    // writeCatPosts();
    
    // $(".cat").on("click", (result)=>{

    //     writeCatPosts();

    // });
});