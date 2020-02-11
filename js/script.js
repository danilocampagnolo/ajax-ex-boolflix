$(document).ready(function() {
  $(".search input").keypress(function() {
    if (event.which == 13) {
      search();
      }
    });
    $(".search i").click(function() {
      $('.transform-input').toggleClass('transform-active-input');
      $(".search > div").toggleClass("border-input");
    });
});

// ================ FUNCTIONS =================
function search() {
  $(".container h2").removeClass("display_none");
  var query = $("input[name='title-to-find']").val();
  resetSearch();
  var urlMovie = "https://api.themoviedb.org/3/search/movie";
  var urlSerie = "https://api.themoviedb.org/3/search/tv";
  var api_key = "7da5370534299b384b1d9988b39b33f8";
  getData(urlMovie, api_key, query, "film", ".films");
  getData(urlSerie, api_key, query, "serie", ".serie");
}

function resetSearch() {
  $("input[name='title-to-find']").val("");
  $(".films").text("");
  $(".serie").text("");
}

function getData(url, api_key, string, type, container) {
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
      if (data.total_results > 0) {
        var results = data.results;
        printResults(type, results)
      } else {
        printNoResult($(container));
      }
    },
    error: function(errors) {
      if (errors.status != "422") {
        alert("errore " + errors);
      }
    }
  });
}

function printResults(type, array) {
  for (var i = 0; i < array.length; i++) {
    if (type == "film") {
      var title = array[i].title;
      var originalTitle = array[i].original_title;
      var container = $(".films");
    } else if (type == "serie") {
      title = array[i].name;
      originalTitle = array[i].original_name;
      container = $(".serie");
    }

    // handlebars
    var source = $('#films-template').html();
    var template = Handlebars.compile(source);
    var context = {
      poster_path : printPoster(array[i].poster_path),
      title : title,
      original_title : originalTitle,
      original_language : printNationFlag(array[i].original_language),
      vote_average : array[i].vote_average,
      tagStar : printVoteStar(array[i].vote_average),
      type : type,
      overview : printOverview(array[i].overview)
    };
    var html = template(context);
    container.append(html);
  }
}

function printVoteStar(num) {
  vote = Math.round(num / 2);
  var tagStar = '';
  for (var i = 0; i < 5; i++) {
    if (i < vote) {
      tagStar += "<i class='fas fa-star'></i>";
    } else {
      tagStar += "<i class='far fa-star'></i>";
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

function printNoResult(container) {

  // handlebars
  var source = document.getElementById("noresult-template").innerHTML;
  var template = Handlebars.compile(source);
  var html = template();
  container.append(html);
}

function printPoster(string) {
  var poster = "https://image.tmdb.org/t/p/w300";
  if (string == null) {
    poster = "img/image-not-available.jpg";
  } else {
    poster += string;
  }
  return poster
}

function printOverview(string) {
  var overview = "";
  if (string.length == 0) {
    overview = "Overview non disponibile.";
  } else {
    overview = string;
  }
  return overview
}
