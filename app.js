var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var out = '';


app.set('views', './views');
app.locals.basedir = '.';
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

var pdpObject = {
            type: "someType",
            brand: "someBrand",
            productId: "ABCDEFGHIJKL",
            bvProduct: "RatingsAndReviews",
            categoryId: 'some category',
            rootCategoryId: 'root down'
        };

var jsOutputFirst ='$( document ).ready(function() { ';
var jsOutput ='';

// READ THE TAGS.JSON FILE
fs.readFile('tags.json', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    var obj = JSON.parse(data);

//###########################
// FEATURE USE EVENTS
//###########################
    Object.keys(obj.FeatureUsed[0]).forEach(function(k) {
      //console.log(k);

      var action = 'click';
      if (k =='hover'){
        action='hover';
      }

      for (var i = 0, len = obj.FeatureUsed[0][k].length; i < len; i++) {
      //access the PDP object to get general data.
      jsOutput += '$( \'' + obj.FeatureUsed[0][k][i] + '\' ).' + action + '(function() {' + '\n' +    //TO DO - change out the click to hover on that event
        'BV.pixel.trackEvent(\'Feature\', { '+ '\n' +
          'type: \'Used\',' + '\n' +
          'name: \'' + k + '\',\n' +
          'brand: \'' + pdpObject.brand + '\',' + '\n' +
          'productId: \'' + pdpObject.productId + '\',' + '\n' +
          'bvProduct: \'' + pdpObject.bvProduct + '\',' + '\n' +
          'categoryId: \'' + pdpObject.categoryId + '\',' + '\n' +
          'detail1: \'\',' + '\n' +  //TO DO get the detail1 of the click event.. is this on the HTML?
          'detail2: \'\'' + '\n' +   //TO DO get the detail2 of the click event.. is this on the HTML?
        '});' + '\n' +
      '});';

      //console.log(jsOutput);

      }

    });

//###########################
// PAGE VIEW
//###########################

//###########################
// UGC CONTAINER
//###########################
          var trackUGC = 'BV.pixel.trackViewedCGC({' + '\n' +
           'productId: \'' + pdpObject.productId + '\',' + '\n' +
           'bvProduct: \'' + pdpObject.bvProduct + '\',' + '\n' +
           'brand: \'' + pdpObject.brand + '\',' + '\n' +
           'categoryId: \'' + pdpObject.categoryId + '\',' + '\n' +
           'rootCategoryId: \'' + pdpObject.rootCategoryId + '\',' + '\n' +
           '}, {' + '\n' +
              'minPixels: 100,' + '\n' +
              'minTime: 5000,' + '\n' +
              'containerId: \'' + obj.UCG_container + '\'' + '\n' +
      '});';

//out = jsOutputFirst + trackUGC + jsOutput + '});';
out = jsOutputFirst + jsOutput + '});';

});

app.get('/', function (req, res) {
  //res.send('Hello World!');  //to do render a different template
  res.render('index', { title: '~Auto-generated API Analytics', scripts: out});

});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});