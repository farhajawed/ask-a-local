$(document).ready(function() {
    
    function getCat(cat) {
        var queryUrl = "/api/categories";
        $.get(queryUrl,function(data){
            // console.log(data);
            var categories = $("#categories");
            for(var i = 0; i < data.length; i++){
                var catbutton = ("<li>" + data[i].name + "<br><button id ='C" + data[i].id + "'class ='cat' name='" + data[i].name + "' value=" + data[i].id + "></button></li>");
                categories.append(catbutton);
                var selector = "#C"+ data[i].id
                // $(selector).html("<img src='/images/icons8-" + data[i].name + "-64.png'>");
                
                //as an admin can create category..if cat image not found, replace it with replacement.png
                var img = $( "<img>" )
                    .error(function() {
                     $( this ).attr( "src", "/images/replacement.png" );
                    })
                     .attr( "src", "/images/icons8-" + data[i].name + "-64.png" );
                     
                $(selector).append(img);
            }
        })          
    }
    getCat();

    function mostrecentPosts(){
        var queryUrl = "api/posts/";
        $.get(queryUrl, function(data){
            // console.log(data);
            var username;
            var userimage;
            var card;
            
            for(let i = 0; i < data.length; i++){
                var spot = $("<div class='globalposts'>");
                $.get("/user/" + data[i].UserId, function(result){
                    username = result.username;
                    userimage = result.image;
                    // console.log(result);
                    card = 
                    "<div class='card'>" +
                        "<div class='card-header'>" + 
                            "<a href='/dashboard?user_id="+data[i].UserId+"'><img class='thumbnail' src='/images/upload_images/" + userimage + "' alt = 'user image'></a>" + 
                            "<a href='/dashboard?user_id="+data[i].UserId+"'><h5 class='username card-title'>" + username + "</a></h5>" + 
                        "</div>";
                    if(data[i].image){
                        card+=  "<img class='card-img-top' src='/images/upload_images/" + data[i].image + "' alt='Card image'>";
                    }
                       
                    card+= "<div class='card-body'>" +
                                "<h6 class='card-subtitle mb-2 text-muted'><a href='../view-post?post_id=" +data[i].id+"' class='global-title'>"+data[i].title+
                                "</a></h6>" +
                                "<p class='card-text'>" + data[i].body + "</p>" +
                           "</div>" + 
                    "</div>";
                    spot.append(card);

                })

                $(".catPosts").append(spot);
            }
        })
    };

    mostrecentPosts();
    $(document).on("click",".cat", mostrecentPostsbyCat);

    function mostrecentPostsbyCat(){
        $("#categoryPosts").html("");
        var catid = this.value;
        // console.log(catid);
        var queryUrl = "/api/post/category/" + catid;
        $.get(queryUrl, function(data){
            // console.log(data);
            var username;
            var userimage;
            var card;
            
            for(let i = 0; i < data.length; i++){
                var spot = $("<div class='globalposts'>");
                $.get("/user/" + data[i].UserId, function(result){
                    username = result.username;
                    userimage = result.image;
                    // console.log(result);
                

                    card = 
                    "<div class='card'>" +
                        "<div class='card-header'>" + 
                            "<a href='/dashboard?user_id="+data[i].UserId+"'><img class='thumbnail' src='/images/upload_images/" + userimage + "' alt = 'user image'></a>" + 
                            "<a href='/dashboard?user_id="+data[i].UserId+"'><h5 class='username card-title'>" + username + "</a></h5>" + 
                        "</div>";
                    if(data[i].image){
                       card+="<img class='card-img-top' src='/images/upload_images/" + data[i].image + "' alt='Card image'>";
                    }  
                     card+= "<div class='card-body'>" +
                            "<h6 class='card-subtitle mb-2 text-muted'><a href='../view-post?post_id=" +data[i].id+"' class='global-title'>"+data[i].title+
                            "</a></h6>" +
                            "<p class='card-text'>" + data[i].body + "</p>" +
                        "</div>" + 
                    "</div>";
                    spot.append(card);

                })

                $(".catPosts").append(spot);
            }
        })
    };
});