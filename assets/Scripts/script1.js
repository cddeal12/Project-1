// Declared Global Variables

var omdbAPI = "b22163a3";
var spoonacularAPI = "&apiKey=8e22a5e31dcc4d959a0190eca3ccff29";
var searchInputEl = $("#foodSearchEl");

// xxxxx
// ============== Order Matters for spoonacular query construction ===== ALL QUERY INPUTS MUST BE SEPARATED BY COMMAS==============
var spoonacularBaseURL = "https:api.spoonacular.com/recipes/complexSearch?query=";

// "https://api.spoonacular.com/recipes/complexSearch?query=" + searchInput + "&intolerances=" + intolerancesInput + "&excludeIngredients=" + excludedIngredientsInput + "&cuisine=" + cuisineDataAttributeInput + "&apiKey=" + spoonacularAPI

// Will need to make a separate call to display that recipe by including the recipe ID of the recipe the user clicks
// var spoonacularRecipeURL = "https://api.spoonacular.com/recipes/" + selectedRecipeID + "/information?includeNutrition=true"
// ============ EXAMPLE SPOONACULAR QUERY=====================================
// https://api.spoonacular.com/recipes/complexSearch?query=chicken&intolerances=dairy&excludeIngredients=eggs&cuisine=chinese&apiKey=8e22a5e31dcc4d959a0190eca3ccff29
// xxxxx

// xxxxx
// var omdbBaseURL = 
// Can't query omdb API based on genre. Will research other options


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
var searchBtn = $('#searchBtnEl')

// Page Content Variables
var startCard = $("#start-card");
var foodContent = $(".food-page-content");
var movieContent = $(".movie-page-content");
var recipeResults = $("#recipe-results-container");
var suggestionsContainer = $("#mealSuggestionContainer");


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
    $("body").attr("style", "background-color: white");
});

// Adds checkbox values to intolerancesArray, finds and removes of unchecked
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


// ------------------------------------------------------------------------------------------------------------------------
// Page Two

// Consolidates user inputs into variables and makes FIRST API call

searchBtn.on("click", function(event){
    // prevent reload
    event.preventDefault();
    // create a variable equal to the user's search input
    var searchTerms = searchInputEl.val().toLowerCase();
    console.log(searchTerms);
    // generate a string from the intolerancesArray
    var intoleranceString = intolerancesArray.toString();
    console.log(intoleranceString);
    // generate a query url based on searchTerms and intoleranceString
    var foodSearchURL = spoonacularBaseURL + searchTerms + "&intolerances=" + intoleranceString + spoonacularAPI;
    // make ajax call using foodSearchURL
    $.ajax({
        method:"GET",
        url:foodSearchURL
    }).then(function(response){
        console.log(response);
        suggestionsContainer.attr("style", "display: none;");
        var searchResponse = response.results;

        // Populates the search results container with the query response
        for (i=0; i<searchResponse.length; i++) {

            // New div to be added to the container
            var newSearchResult = $("<div>");
            newSearchResult.addClass("row border rounded my-3 p-3 bg-secondary");
            newSearchResult.attr("RecipeId", searchResponse[i].id);
                // Thumbnail Image
                var newThumbnail = $("<img>");
                newThumbnail.addClass("col-4");
                newThumbnail.attr("src", searchResponse[i].image);
                // Recipe Title  
                var newTitle = $("<h3>");
                newTitle.text(searchResponse[i].title);
                // Appends image and text to result div
                newSearchResult.append(newThumbnail);
                newSearchResult.append(newTitle);
            // Appends search result to results container
            recipeResults.append(newSearchResult);
        }

        // Displays the search results when they are finished populating
        recipeResults.attr("style", "display: block;");
    })
})