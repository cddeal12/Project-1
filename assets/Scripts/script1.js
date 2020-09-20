// Declared Global Variables

var omdbAPI = "&apikey=5f2c6c86";
var omdbBaseURL = "http://www.omdbapi.com/?t="
var posterBaseURl = "http://img.omdbapi.com/?i="
// var spoonacularAPI = "&apiKey=074bf8b019424ce6945ad1bc2ede2965";
var spoonacularAPI = "&apiKey=8e22a5e31dcc4d959a0190eca3ccff29";
var searchInputEl = $("#foodSearchEl");

// ============== Order Matters for spoonacular query construction ===== ALL QUERY INPUTS MUST BE SEPARATED BY COMMAS==============
var spoonacularBaseURL =
  "https:api.spoonacular.com/recipes/complexSearch/?query=";

var moviePicks = {
  Trending: [
    "Bad Boys for Life",
    "Da 5 Bloods",
    "Hamilton",
    "Weathering with You",
    "The Gentlemen",
    "Birds of Prey",
    "The Rhythm Section",
    "Dolittle",
    "The Lovebirds",
    "The Photograph",
  ],
  Drama: [
    "A Star is Born",
    "A Quiet Place",
    "Lady Bird",
    "The Shape of Water",
    "Baby Driver",
    "La La Land",
    "Gravity",
    "The Irishman",
    "The Peanut Butter Falcon",
    "Once Upon a Time in Hollywood",
  ],
  Romance: [
    "The Lovebirds",
    "The Big Sick",
    "The Princess Bride",
    "Forrest Gump",
    "The Notebook",
    "Remember Me",
    "Titanic",
    "The Curious Case of Benjamin Button",
    "Eternal Sunshine of the Spotless Mind",
    "Silver Linings Playbook",
  ],
  Action: [
    "Avengers:Infinity War",
    "Avengers: Endgame",
    "Dunkirk",
    "Logan",
    "Wonder Woman",
    "Ready Player One",
    "Fury",
    "War of the Planet of the Apes",
    "The Gentlemen",
    "Ford v Ferrari",
  ],
  Scifi: [
    "The Invisible Man",
    "Bloodshot",
    "A quite place part two",
    "The new mutants",
    "Artemis fowl",
    "The six billion dollar man",
    "Ghost busters: Afterlife",
    "Tenet",
    "Ad Astra",
    "Monster hunter",
  ],
  Horror: [
    "Underwater",
    "Horse girl",
    "Swallow",
    "The hunt",
    "The green Knight",
    "A quite place part two",
    "Candyman",
    "In the tall grass",
    "Fractured",
    "Doctor Sleep"
  ],
  Comedy: [
    "Emma",
    "The gentleman",
    "Guns akimbo",
    "Yes, god, yes",
    "The climb",
    "The king of staten island",
    "banana split",
    "Uncorked",
    "An american pickle",
    "I use to go here",
  ],
  Documentary: [
    "A secret Love",
    "Athlete A",
    "After truth: disinformation & the coast of fake news",
    "Cheer",
    "The killer inside: the mind of aaron hernandez",
    "Miss america",
    "McMillion$",
    "The pharmacist",
    "Hillary",
    "Bad Trip",
  ],
};

// Page variables
var pageOne = $("#page-one");
var pageTwo = $("#page-two");
var pageThree = $("#page-three");
var intolerancesList = $("#intolerances-list");
var intolerancesArray = [];
var movieCheckList = $("#movie-genre-list");
var checkedRadioVal;
var randomMovieSelection;
var newMovieID;
var movieGenreArray = [];
var familyMode = false;

// Button Variables
var startBtn = $("#main-start-btn");
var foodNextBtn = $("#food-next-btn");
var movieNextBtn = $("#movie-next-btn");
var searchBtn = $("#searchBtnEl");

// Page Content Variables
var startCard = $("#start-card");
var foodContent = $(".food-page-content");
var movieContent = $(".movie-page-content");
var recipeResults = $("#recipe-results-container");
var suggestionsContainer = $("#mealSuggestionContainer");
var mainMovieInfo = $("#main-movie-info");
var mainMovieImage = $("#main-movie-img");
var mainRecipeInfo = $("#main-recipe-info");
var mainRecipeImage = $("#main-recipe-img");

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
  
  getMovieData(); 
});

//=========== Selects a movie from the moviePicks object based on user input
// Calls function

chooseRandomMovie();
// Function Definition
function chooseRandomMovie(){
  // sets a variable equal to all inputs with a type of radio
  var radios = $('input[type="radio"]');
  // listens for a change on the radio button
  radios.change(function(){
    // if radio button is changed to be checked, it is saved to a variable
    var clickedRadio = radios.filter(':checked');
    // sets GLOBAL checkedRadioVal variable equal to the value of the changed button
    checkedRadioVal=clickedRadio.val();
    // generates a random number between 0 and 9 and sets to a variable of randomIndex
    var randomIndex = Math.floor(Math.random() * 10)
    console.log(moviePicks[checkedRadioVal]);
    // sets the GLOBAL randomMovie Selection variable equal to the key with the same value as the radio button inside the array and picks the index defined by the random number
    randomMovieSelection = moviePicks[checkedRadioVal][randomIndex];
    console.log(randomMovieSelection);
  }) 
}//<---- end of the chooseRandomMovie Function Definition

// ======= Function to get movie data and render to container=============

function getMovieData(){
  var movieSearchURL = omdbBaseURL + randomMovieSelection + "&plot=full" +omdbAPI
  $.ajax({
    method: "GET",
    url: movieSearchURL,
  }).then(function (response){
    console.log(response);
    newMovieID = response.imdbID;
    console.log(newMovieID);
    var newMovieTitle = $("<h1>");
    newMovieTitle.text(response.Title + " (" + response.Year + ")");
    newMovieTitle.attr("class", "text-center");
    var newMovieRating = $("<h3>");
    newMovieRating.text(response.Rated);
    newMovieRating.attr("class", "text-center");
    if(response.Rated === "R" || response.Rated === "TV-MA"){
      newMovieRating.attr("style", "text-shadow: 1px 1px 2px #95170A;");
    }else if(response.Rated === "PG-13"){
      newMovieRating.attr("style", "text-shadow: 1px 1px 2px #F69A2D;");
    }else{
      newMovieRating.attr("style", "text-shadow: 1px 1px 2px #4DE996;");
    }
    var newMoviePlot = $("<p>");
    newMoviePlot.text(response.Plot);
    mainMovieInfo.append(newMovieTitle,newMovieRating,newMoviePlot);
    mainMovieImage.attr("src", response.Poster);
  })
  
}//<----- end of getMovie Data Function Definition


// Adds checkbox values to intolerancesArray, finds and removes of unchecked
intolerancesList.on("click", ".form-check-input", function () {
  if ($(this).is(":checked")) {
    intolerancesArray.push($(this).val());
    console.log(intolerancesArray);
  } else if ($(this).is(":not(:checked)")) {
    var position = intolerancesArray.indexOf($(this).val());
    intolerancesArray.splice(position, 1);
    console.log(intolerancesArray);
  }
});

// ------------------------------------------------------------------------------------------------------------------------
// Page Two

// Consolidates user inputs into variables and makes FIRST API call

searchBtn.on("click", function (event) {
  // prevent reload
  event.preventDefault();
  // create a variable equal to the user's search input
  var searchTerms = searchInputEl.val().toLowerCase();
  console.log(searchTerms);
  // generate a string from the intolerancesArray
  var intoleranceString = intolerancesArray.toString();
  console.log(intoleranceString);
  // generate a query url based on searchTerms and intoleranceString
  var foodSearchURL =
    spoonacularBaseURL +
    searchTerms +
    "&intolerances=" +
    intoleranceString +
    spoonacularAPI;
  // make ajax call using foodSearchURL
  $.ajax({
    method: "GET",
    url: foodSearchURL,
  }).then(function (response) {
    console.log(response);
    suggestionsContainer.attr("style", "display: none;");
    var searchResponse = response.results;

    // Populates the search results container with the query response
    for (i = 0; i < searchResponse.length; i++) {
      // New div to be added to the container
      var newSearchResult = $("<div>");
      newSearchResult.addClass(
        "row border rounded my-3 p-3 bg-secondary search-result"
      );
      newSearchResult.attr("recipeId", searchResponse[i].id);
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
  });
});

// Replicates above IF USER SELECTS PRE-SET CHOICES

// Use Event Delegation to listen to the mealSuggestionContainer
suggestionsContainer.on("click", ".foodSuggestionCard", function () {
  var instaSearchTerm = $(this).attr("id");
  console.log(instaSearchTerm);
  var intoleranceString = intolerancesArray.toString();
  var instaSearchUrl =
    spoonacularBaseURL +
    instaSearchTerm +
    "&intolerances=" +
    intoleranceString +
    spoonacularAPI;

  $.ajax({
    method: "GET",
    url: instaSearchUrl,
  }).then(function (response) {
    console.log(response);
    suggestionsContainer.attr("style", "display: none;");
    var searchResponse = response.results;
    // Populates the search results container with the query response
    for (i = 0; i < searchResponse.length; i++) {
      // Various divs to container
      var newSearchResult = $("<div>");
      newSearchResult.addClass("row search-result");
      newSearchResult.attr("recipeId", searchResponse[i].id);
      var newSearchResultCol = $("<div>");
      newSearchResultCol.addClass("col-12 mb-4");
      var newSearchResultCard = $("<div>");
      newSearchResultCard.addClass("card flex-row");
      // Thumbnail Image
      var newSearchResultPic = $("<div>");
      newSearchResultPic.addClass("col-6 col-md-4 card-header border-0");
      newSearchResultPic.attr("id","recipe-pic");
      newSearchResultPic.css("background-image", "url('searchResponse[i].image')");
      // Recipe Text
      var newSearchResultCardBlock = $("<div>");
      newSearchResultCardBlock.addClass("col-6 col-md-8 card-block p-4");
      var newSearchResultTitle = $("<h4>");
      newSearchResultTitle.addClass("card-title");
      newSearchResultTitle.text(searchResponse[i].title);
      // var newSearchResultPrepTime = $("<h6>");
      // newSearchResultPrepTime.addClass("card-prep-time");
      // newSearchResultTitle.text(searchResponse[i].prep);
      // var newSearchResultSummary = $("<p>");
      // newSearchResultTitle.addClass("card-summary");
      // newSearchResultTitle.text(searchResponse[i].summary);

      // Append city
      newSearchResultCardBlock.append(newSearchResultTitle);
      newSearchResultCard.append(newSearchResultPic, newSearchResultCardBlock);
      newSearchResultCol.append(newSearchResultCard);
      newSearchResult.append(newSearchResultCol);
      recipeResults.append(newSearchResult);
    }
    recipeResults.attr("style", "display: block;");
  });
});


    //  // New div to be added to the container
    //  var newSearchResult = $("<div>");
    //  newSearchResult.addClass(
    //    "row border rounded my-3 p-3 bg-secondary search-result"
    //  );
    //  newSearchResult.attr("recipeId", searchResponse[i].id);
    //  // Thumbnail Image
    //  var newThumbnail = $("<img>");
    //  newThumbnail.addClass("col-4");
    //  newThumbnail.attr("src", searchResponse[i].image);
    //  // Recipe Title
    //  var newTitle = $("<h3>");
    //  newTitle.text(searchResponse[i].title);
    //  // Appends image and text to result div
    //  newSearchResult.append(newThumbnail);
    //  newSearchResult.append(newTitle);
    //  // Appends search result to results container
    //  recipeResults.append(newSearchResult);

// Populates final page
$(recipeResults).on("click", ".search-result", function (event) {
  console.log("Clicked on a result");
  console.log($(this));

  // Remove the search bar and results, show a page of the recipe details
  pageTwo.attr("style", "display: none;");
  pageThree.attr("style", "display: block;");

  $.ajax({
    method: "GET",
    url:
      "https://api.spoonacular.com/recipes/" +
      $(this).attr("recipeId") +
      "/information?includeNutrition=true" +
      spoonacularAPI,
  }).then(function (response) {
    console.log(response);
    // Creates text info from the response
    var finalTitle = $("<h1>");
    finalTitle.text(response.title);
    var finalInfo = $("<p>");
    finalInfo.html(response.summary);

    // Iterates and lists each ingredient
    var finalIngredients = $("<ol>");
    var firstIngredient = $("<h3>");
    firstIngredient.text("Ingredients in This Recipe:");
    finalIngredients.append(firstIngredient);
    var ingredientsList = response.extendedIngredients;
    for (i = 0; i < ingredientsList.length; i++) {
      var newIngredient = $("<li>");
      newIngredient.text(ingredientsList[i].name);
      finalIngredients.append(newIngredient);
    }
    console.log(finalIngredients);
    // Iterates and lists the directions
    var finalDirections = $("<ol>");
    var firstDirection = $("<h3>");
    firstDirection.text("Step-by-Step Instructions:");
    finalDirections.append(firstDirection);

    // IF the directions include substeps, display them properly, IF NOT, display a normal numbered list
    var instructionsList = response.analyzedInstructions;
    for (i = 0; i < instructionsList.length; i++) {
      if (instructionsList[i].name !== "") {
        var newInstruction = $("<li>");
        newInstruction.addClass("my-3");
        newInstruction.text(instructionsList[i].name);
        var newList = $("<ol>");
        newList.attr("style", "list-style-type: lower-alpha;");
        for (q = 0; q < instructionsList[i].steps.length; q++) {
          var newSubIntruction = $("<li>");
          newSubIntruction.text(instructionsList[i].steps[q].step);
          newList.append(newSubIntruction);
        }
        newInstruction.append(newList);
        finalDirections.append(newInstruction);
      } else {
        for (q = 0; q < instructionsList[i].steps.length; q++) {
          var newInstruction = $("<li>");
          newInstruction.addClass("my-3");
          newInstruction.text(instructionsList[i].steps[q].step);
          finalDirections.append(newInstruction);
        }
      }
    }

    // append text info
    mainRecipeInfo.append(finalTitle);
    mainRecipeInfo.append(finalInfo);
    mainRecipeInfo.append(finalIngredients);
    mainRecipeInfo.append(finalDirections);
    // appends image
    $("#recipe-bg-image").css("background-image", "url('response.image')");
  });
});
