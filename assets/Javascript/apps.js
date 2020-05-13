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
$(document).ready() {
    var key = "teJTuCyxCldAJlcKZn3VFRwd9sf00UsT";
    var topics = [
    ]
    var url = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
    topics.done(function (data) { console.log("success got data", data); });
    $(".gif").on("click", function () {
        var state = $(this).data("state");
        var stillImage = $(this).data("still");
        var animatedImage = $(this).data("animate");
        if (state === "still") {
            $(this).data("state", "animate");
            $(this).attr("src", animatedImage);
        } else {
            $(this).data("state", "still");
            $(this).attr("src", stillImage);
        }
    }
)}