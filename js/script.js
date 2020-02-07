$(document).ready(function() {
  $("button[name='search-film']").click(function() {
    search();
    resetSearch();
  });
});

// ================ FUNCTION =================
function search() {
  var userFilm = $("input[name='title-to-find']").val();
  var urlMovies = "https://api.themoviedb.org/3/search/movie";
  var urlSeries = "https://api.themoviedb.org/3/search/tv";
  var api_key = "7da5370534299b384b1d9988b39b33f8";
  getFilms(urlMovies, api_key, userFilm);
  getFilms(urlSeries, api_key, userFilm);
}

function getFilms(url, api_key, string) {
  var url = url;
  var api_key = api_key;
  $.ajax({
    url: url,
    method: "GET",
    data: {
      api_key: api_key,
      query: string,
      language: "it-IT"
    },
    success: function(data) {
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
    var title = array[i].title;
    if (typeof(title) == "undefined") {
      title = array[i].name;
    }
    var originalTitle = array[i].original_title;
    if (typeof(originalTitle) == "undefined") {
      originalTitle = array[i].original_name;
    }
    // handlebars
    var source = document.getElementById("films-template").innerHTML;
    var template = Handlebars.compile(source);
    var context = {
      title : title,
      original_title : originalTitle,
      original_language : printNationFlag(array[i].original_language),
      vote_average : array[i].vote_average,
      tagStar : printVoteStar(array[i].vote_average),
    };
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
  vote = Math.round(num / 2);
  var tagStar = '';
  for (var i = 0; i < 5; i++) {
    if (i < vote) {
      var tagStar = tagStar + " <i class='fas fa-star'></i>";
    } else {
      var tagStar = tagStar + "<i class='far fa-star'></i>";
    }
  }
  return tagStar;
}

function printNationFlag(string) {

  var arrayFlags = ["de", "en", "es", "fr", "it"];
  if (arrayFlags.includes(string)) {
    var flag = "<img src=flags/"+ string +".svg>";
  } else {
    var flag = string;
  }
  return flag
}
