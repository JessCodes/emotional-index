$( document ).on('turbolinks:load', function() {
  $(".new-favorite-link").on("click",function(e){
    e.preventDefault()
    $(".new-favorite-form").show()
    $(".new-favorite-link").hide()
  });
});
