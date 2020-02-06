
$(document).ready(function() {
  $("button").click(function() {
    var userFilm = $("input").val();
    $.ajax({
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key: "7da5370534299b384b1d9988b39b33f8",
        query: userFilm,
        language: "it-IT"
      },
      success: function(data) {
        var filmsFound = data.results;
        printFilmsFound(filmsFound);
      },
      error: function() {

      }
    });
  });
});

function printFilmsFound(array) {
  $(".films").text("");
  for (var i = 0; i < array.length; i++) {
    array[i]
    // handlebars
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var context = {
      original_title: array[i].original_title,
      original_language: array[i].original_language,
      vote_average: array[i].vote_average
    };
    var html = template(context);
    $(".films").append(html);
  }
}
