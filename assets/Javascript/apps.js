//Web page displays buttons.
//this is an array of topics.
//Buttons are labeled.
//When user presses a button -- 10 still images are displayed with their ratings.
//Program selects only 10 images from url.
//GIPHY API has image template forms to use -- review.
//When user clicks on an image - the image is animated.  When user clicks on image again, it is still.
//Need to add coding default to keep the page from automatically refreshing, until user refreshes manually.
//Bonus: add a form that allows user to create a button topic.
//user types into the input form - "dogs"
//button "dogs" are added (push to the array of topics)
//there is a submit button to the form
//check with bootstrap to add this form -- vertical menu on the right
$(document).ready()
//topics array
var topics = ["cats", "horses", "pigs", "Paris", "asian food", "James Cordon", "007", "exercise",
  "dog walking", "boxer dog", "bullmastiff", "Hawaii", "The Office", "Andy Griffith", "Hawaii five-O",
  "Magnum PI", "Outlander", "hawaiian food", "hula", "Star Trek", "Star Wars", "Grand Canyon",
  "Colorado", "Lipsync Battle", "Forrest Gump", "clydesdales", "sleeping dogs", "giraffes"];
//api key
var key = "r8vfoFb9SvSLxNCssr7kk6NnXjK4RuZf";
//still and animate
function animateThis() {
  var state = $(this).attr("data-state");
  //if image is still
  if (state === "still") {
    //setting url - switch
    $(this).attr("src", $(this).attr("data-animate"));
    //requesting animate
    $(this).attr("data-state", "animate");
  } else {
    //switch to still
    $(this).attr("src", $(this).attr("data-still"));
    //image state
    $(this).attr("data-state", "still");
  }
}
//ajax
function topicGiphy() {
  $("#topicGifs").empty();
  //variable storing data aname from the button clicked on
  var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    topic + "&api_key=" + key + "&limit=10";
  //ajax method
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    //then - promise - run this function
    .then(function (response) {
      //store returned object
      var results = response.data;
      //for array of data
      for (var i = 0; i < results.length; i++) {
        //for div
        var topicDiv = $("<div>");
        //add a giff class
        topicDiv.addClass("gifs card bg-transparent border-light float-left");
        //var rating = results[i].rating;
        //store a p element -- rating
        var p = $('<p class = "blockquote-footer">').text("Rating: " + results[i].rating);
        //for the images - element
        var topicImage = $("<img>");
        //still
        topicImage.attr("src", results[i].images.fixed_height_still.url);
        //animate
        topicImage.attr("data-animate", results[i].images.fixed_height.url);
        //still
        topicImage.attr("data-still", results[i].images.fixed_height_still.url);
        //image state?
        topicImage.attr("data-state", "still");
        topicImage.addClass("gif img-responsive img-thumbnail rounded float-left img-fluid");
        //addition image info - alt
        topicImage.attr("alt", results[i].title);
        topicDiv.append(topicImage);
        topicDiv.append(p);
        //add idv to the topic gif area
        $("#topicGifs").prepend(topicDiv)
      }
    });
}
//buttons - creating the buttons
function createButton() {
  $("#buttons-view").empty();
  //array of topics
  for (var i = 0; i < topics.length; i++) {
    //for button
    var j = $("<button>");
    //for button - adding class
    j.addClass("topic-btn btn btn-info");
    j.attr("type", "button");
    //adding name to button
    j.attr("data-name", topics[i]);
    j.text(topics[i]);
    $("#buttons-view").append(j);
  }
}
//on click or event listener??
$("#add-topic").on("click", function (event) {
    //phil showed this -- prevent form from refreshing automatically
    event.preventDefault();
    //adding the new topic
    var newTopic = $("#topic-input")
        .val()
        .trim();
    if (newTopic === undefined || newTopic.length == 0) {
        return;
    } else {
        topics.push(newTopic);
        createButton();
    }
});
//click on//event listener?? to topic buttons
$(document).on("click", ".topic-btn", topicGiphy);
//animate and still
$(document).on("click", ".gif", animateThis);
createButton();


