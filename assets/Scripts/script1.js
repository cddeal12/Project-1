// Declared Global Variables

// Button Variables
var startBtn = $("#main-start-btn");
var foodNextBtn = $("#food-next-btn");
var movieNextBtn = $("#movie-next-btn");

// Page Content Variables
var startCard = $("#start-card")
var foodContent = $(".food-page-content");
var movieContent = $(".movie-page-content");


// Removes content that is not the main card when the page loads
foodContent.attr("style", "display: none;");
movieContent.attr("style", "display: none;");

// !!!
// These buttons will also save the state of the checkboxes in local storage, but the checkboxes are not currently working, to fix tomorrow
// !!!

// Removes the main card and moves on to the foodContent on 'start' button click
startBtn.on("click", function () {
    startCard.attr("style", "display: none;");
    foodContent.attr("style", "display: block;");
});

// Removes the foodContent and moves on to the movieContent on 'next' button click
foodNextBtn.on("click", function () {
    foodContent.attr("style", "display: none;");
    movieContent.attr("style", "display: block;");
});

// Links to the next html page when the movieNext button is clicked
movieNextBtn.on("click", function () {
    // Youtube link for testing purposes, to link to other html page when added
    location.href = "https://youtube.com"
});