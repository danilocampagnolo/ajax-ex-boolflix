$(document).ready(function() {
  $("button[name='search-film']").click(function() {
    var userFilm = $("input[name='title-to-find']").val();
    getMovies(userFilm);
  });
});

// ================ FUNCTION =================
function getMovies(string) {
  var url = "https://api.themoviedb.org/3/search/movie";
  var api_key = "7da5370534299b384b1d9988b39b33f8";
  $.ajax({
    url: url,
    method: "GET",
    data: {
      api_key: api_key,
      query: string,
      language: "it-IT"
    },
    success: function(data) {
      resetSearch();
      var filmsFound = data.results;
      if (filmsFound.length == 0) {
        printNoResult();
      } else {
        printFilmsFound(filmsFound);
      }
    },
    error: function(errors) {
      alert("errore " + errors);
    }
  });
}

function resetSearch() {
  $("input[name='title-to-find']").val("");
  $(".films").text("");
}

function printFilmsFound(array) {
  for (var i = 0; i < array.length; i++) {
    printVoteStar(array[i].vote_average);
    // handlebars
    var source = document.getElementById("films-template").innerHTML;
    var template = Handlebars.compile(source);
    var context = array[i];
    var html = template(context);
    $(".films").append(html);
  }
}

function printNoResult() {
  // handlebars
  var source = document.getElementById("noresult-template").innerHTML;
  var template = Handlebars.compile(source);
  var html = template();
  $(".films").append(html);
}

function printVoteStar(num) {
  var numStarFull = (Math.round(num) / 2);
  var tagStar = '';
  for (var i = 0; i < 5; i++) {
    if (i < num) {
      tagStar = "<i class='fas fa-star star-full'></i>"
    } else {
      tagStar = "<i class='far fa-star star-empty'></i>"
    }
  }
}
