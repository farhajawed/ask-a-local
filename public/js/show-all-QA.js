$(document).ready(function() {

    function recentQuestions(){
        var queryUrl = "api/questions/";
        $.get(queryUrl, function(data){
            console.log(data);
            var username;
            var userimage;
            var card;
            
            for(let i = 0; i < data.length; i++){

                $.get("/user/" + data[i].UserId, function(result){
                    username = result.username;
                    userimage = result.image;
                    userquestion=result.Question;
                    Answer=result.Answer;
                    console.log(result);
                

                    card = 
                    "<div class='card'>" +
                        "<div class='card-header'>" + 
                            "<img class='thumbnail' src='/images/upload_images/" + userimage + "' alt = 'user image'>" + 
                            "<h5 class='username card-title'>" + username + "</h5>" + 
                        "</div>" +
                        // "<img class='card-img-top' src='/images/upload_images/" + data[i].image + "' alt='Card image'>" +
                        "<div class='card-body'>" +
                            "<h6 class='card-subtitle mb-2 text-muted'>" + data[i].title + "</h6>" +
                            "<p class='card-text'>" + data[i].Question + "</p>" +
                        "</div>" + 
                        "<div class='card-body'>";
                        if(data[i].Answer){
                            card+= "<h6 class='card-subtitle mb-2 text-muted'>" + data[i].Answer + "</h6>";
                        }
                       
                       
                    "</div>" + 
                "</div>";
                

                    $(".questions").append(card);
                })
            }
        })
    };

    recentQuestions();

   
    //   
});