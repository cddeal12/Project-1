// Declared Global Variables

var omdbAPI = "b22163a3"
var spoonacularAPI = "8e22a5e31dcc4d959a0190eca3ccff29"

// Page variables
var pageOne = $("#page-one");
var pageTwo = $("#page-two");
var pageThree = $("#page-three");
var intolerancesList = $("#intolerances-list");
var intolerancesArray = [];
var movieGenreArray = [];
var familyMode = false;

// Button Variables
var startBtn = $("#main-start-btn");
var foodNextBtn = $("#food-next-btn");
var movieNextBtn = $("#movie-next-btn");

// Page Content Variables
var startCard = $("#start-card")
var foodContent = $(".food-page-content");
var movieContent = $(".movie-page-content");


//---------------------------------------------------------------------------------------------------------------------
// Page One

// Removes content that is not the main card when the page loads
foodContent.attr("style", "display: none;");
movieContent.attr("style", "display: none;");

// !!!
// These buttons will also save the state of the checkboxes in local storage, but the checkboxes are not currently working, to fix today
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

// Links to pageTwo when the movieNext button is clicked
movieNextBtn.on("click", function () {
    pageOne.attr("style", "display: none;");
    pageTwo.attr("style", "display: block;");
});

intolerancesList.on("click", ".form-check-input", function (){
    if($(this).is(":checked")){
        intolerancesArray.push($(this).val());
        console.log(intolerancesArray);
    }
    else if($(this).is(":not(:checked)")){
        var position = intolerancesArray.indexOf($(this).val());
        intolerancesArray.splice(position, 1);
        console.log(intolerancesArray);
    }
})