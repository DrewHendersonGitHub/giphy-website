import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Giphy from './giphy.js';



$(document).ready(function() {
  $('#submit').click(function() {
    $('.result').html("");
    let search = $('#search').val();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=50&offset=0&rating=g&lang=en`;
    if (search.trim() === "") {
      url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}`;
    }
    $('#search').val("");

    let promise = Giphy.getGifs(url);
    
    promise.then(function(response) {
      const body = JSON.parse(response);
      for (let i = 0; i < 50; i++) {
        $('.result').append(`<a href="${body.data[i].url}"><img src="${body.data[i].images.fixed_height_small.url}"></a>`);
      }
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });

  $('#upload-button').click(function() {
    let upload = $('#upload').val();
    let url = `https://upload.giphy.com/v1/gifs?source_image_url=${upload}&api_key=${process.env.API_KEY}`;
    let request = new XMLHttpRequest();

    request.open("POST", url, true);

    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    request.onreadystatechange = function() {
      if (this.readyState === 3){
        console.log('LOADING');
      } else if (this.readyState === 4 && this.status === 200) {
        console.log('omg it worked');
      }
    };

    request.send(upload);

  });
});