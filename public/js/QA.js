$(document).ready(function() {
     
    var newQuestionForm = $("#new-question");
    var title = $("#title");
    var body = $("#body");
    var location = $("#location");

    newQuestionForm.on("submit",handlenewQuestionFormSubmit);
    function handlenewQuestionFormSubmit(event){
        event.preventDefault();
        // Wont submit the post 
        if(!title.val().trim() || !body.val().trim() || !location.val().trim()){
            return;
        }

        var newQuestion = {
            title : title.val().trim(),
            body : body.val().trim(),
            location : location.val().trim()
        };          
        submitQuestion(newQuestion);  
    }
    
    function submitQuestion(newQuestion){
        console.log(newQuestion);
        $.post("api/questions/",newQuestion)
          .then(function(data){
              console.log(data);
             window.location.href="/view-question?question_id="+data.id;
        })
  }
  
});