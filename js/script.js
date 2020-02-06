
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
        console.log(data.results);
      },
      error: function() {

      }
    });
  });




});
