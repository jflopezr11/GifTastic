var tags = ["Mordecai", "Rigby", "Regular Show", "Rick and Morty", "South Park"];
  
    function renderButtons() {
        $("#tags").empty();

        for ( var i = 0; i < tags.length; i++) {
        $("#tags").append('<button class="tag-buttons btn btn-primary">' + tags[i] + '</button>');
    }
} 

$(document).on('click', '#theTag', function(event) {
    
    event.preventDefault();

    var newTag = $("#category").val().trim();
    tags.push(newTag);

    $("#tags").append('<button class="tag-buttons btn btn-primary">' + newTag + '</button');
});

$(document).on('click','.tag-buttons', function(event){

    event.preventDefault();

    var type = this.innerText;
    console.log(this.innerText);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="  + window.encodeURI(type) + "&limit=10&api_key=eHi63KgaGn74ULGyjd48m5HcoK5NWIvP";

    $.ajax ({
        url: queryURL,
        method: "GET"
    }).done(function(Response) {
        for(var i = 0; i < Response.data.length; i++) {

            $("#picture").append('<img class="gif" src="' + Response.data[i].images.fixed_height_still.url + '">');

        }
    });

    $("picture").empty();

});

renderButtons();

$('body').on('click','.gif', function() {
    var src = $(this).attr("src");
    if($(this).hasClass('playing')){
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
    } else {
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
});
