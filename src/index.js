import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';



$(document).ready(function() {
  $('#submit').click(function() {
    $('.result').html("");
    let search = $('#search').val();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=50&offset=0&rating=g&lang=en`;
    if (search.trim() === "") {
      url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.API_KEY}`;
    }
    $('#search').val("");

    let request = new XMLHttpRequest();
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
        // const response = JSON.parse(this.responseText);
        // getUpload(response);
        console.log('omg it worked');
      }
    };

    request.send(upload);

    //function getUpload(response) {
    //  
    //}
  });
});


 // $.post( "test.php", { name: "John", time: "2pm" } );


    // let xhr = $.post(`https://upload.giphy.com/v1/gifs?source_image_url=https://pbs.twimg.com/profile_images/1377812736734859265/-TFg2f2D_400x400.jpg&api_key=${process.env.API_KEY}`);
    // xhr.done(function(data) { console.log("success got data", data); });