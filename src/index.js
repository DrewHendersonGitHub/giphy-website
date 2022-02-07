import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    //const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?q=cats&api_key=Ilcu6Bgq2HiCCSQsiyZFMrMkm4TYthCV`;
    console.log(url);

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      for (let i = 0; i < 50; i++) {
        $('.result').append(`<a href="${response.data[i].url}"><img src="${response.data[i].images.fixed_height_small.url}"></a>`);
      }
    }
  });
});
