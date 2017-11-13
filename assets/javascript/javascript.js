var movies = ["Thor", "ironman", "Ghost in the Shell", "Geostorm", "Pacific Rim", "Shrek"]; //random list of movies to start button creation.
var buttonCounter = 0;
for (var i = 0; i < movies.length; i++) { //list out buttons on page load
    buttonMaker(movies[i]);
}

function buttonMaker(argument) { // makes a button with the argument as the text for the button.
    var button = $("<button>"); //create button element, modify appropriate attributes
    button.attr("class", "btn-primary btn-lg");
    button.attr("value", argument);
    button.html(argument);
    button.attr("type", "button");
    $("#buttonsGoHere").append(button); //places button to end of button list.
    buttonCounter++
    if (buttonCounter === 7) { //if there are 7 buttons, start a new row.
        $("#buttonsGoHere").append('<br>');
        buttonCounter = 0;
    }
}

$(".btn-success").on("click", function() {
    var newMovie = $("#searchText").val();
    buttonMaker(newMovie);
})


$('#searchText').keypress(function(event) { //runs buttonMaker if the user hits enter while focusing the input field
    if (event.which == 13) {
        var newMovie = $("#searchText").val()
        buttonMaker(newMovie);
    }
})

$(document).on("click", ".gifImage", function() { // change between gif and still photo.
    var state = $(this).attr('data-state');
    var animate = $(this).attr("data-animate");
    var still = $(this).attr("data-still");
    if (state === 'still') {
        $(this).attr('src', animate);
        $(this).attr('data-state', 'animate');
    }
    if (state === 'animate') {
        $(this).attr('data-state', 'still');
        $(this).attr('src', still);
    }
})
//event listener of btn-primary classes, ie when someone changes the gif search
$(document).on("click", ".btn-primary", function() {
    $("#gifsGoHere").html(""); //clear out old images if needed
    var search = $(this).val(); //grabs search term out of the button to be used in our URL
    search = encodeURIComponent(search); //properly fixes any whitespace or weird characters.
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        search + "&api_key=dc6zaTOxFJmzC&limit=10"; //Ten images and our search string
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) { //loops through data set and displays still images and displays rating.
                var gifDiv = $("<div class='item'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var personImage = $("<img class='gifImage'>");
                personImage.attr("src", results[i].images.fixed_height_still.url);
                personImage.attr("data-still", results[i].images.fixed_height_still.url);
                personImage.attr("data-animate", results[i].images.fixed_height.url);
                personImage.attr("data-state", "still");
                gifDiv.append(personImage);
                gifDiv.append(p);
                $("#gifsGoHere").prepend(gifDiv);
            }
        });
})
