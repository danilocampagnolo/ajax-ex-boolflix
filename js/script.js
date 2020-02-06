
$(document).ready(function() {
  $("button[name='search']").click(function() {
    var userFilm = $("input[name='title-to-find']").val();
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
        if (filmsFound.length == 0) {
          alert("nessun risultato")
        }
        printFilmsFound(filmsFound);
      },
      error: function(errors) {
        alert("errore " + errors)
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
    var context = array[i];
    var html = template(context);
    $(".films").append(html);
  }
}
