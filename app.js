var express = require('express');
var app = express();
var fs = require('fs');


app.set('views', './views');
app.locals.basedir = './views';
app.set('view engine', 'pug');

var pdpObject = {
            type: "some type",
            brand: "some Brand",
            productId: "ABCDEFGHIJKL",
            bvProduct: "RatingsAndReviews",
            categoryId: 'some category'
        };

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
  //res.send('Hello World!');  //to do render a different template
});

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
      console.log('$( "' + obj.FeatureUsed[0][k][i] + '" ).' + action + '(function() {' + '\n' +    //TO DO - change out the click to hover on that event
        'BV.pixel.trackEvent(\'Feature\', { '+ '\n' +
          'type: \'Used\',' + '\n' +
          'name: \'' + k + '\'\n' +
          'brand: \'' + pdpObject.brand + '\',' + '\n' +
          'productId: \'' + pdpObject.productId + '\',' + '\n' +
          'bvProduct: \'' + pdpObject.bvProduct + '\',' + '\n' +
          'categoryId: \'' + pdpObject.categoryId + '\',' + '\n' +
          'detail1: \'\',' + '\n' +  //TO DO get the detail1 of the click event.. is this on the HTML?
          'detail2: \'\'' + '\n' +   //TO DO get the detail2 of the click event.. is this on the HTML?
        '});' + '\n' +
      '});' );

      }

    });

//###########################
// PAGE VIEW
//###########################

//###########################
// UGC CONTAINER
//###########################


    // var clicksFeature = obj.FeatureUsed[0].click;
    // var sortFeature = obj.FeatureUsed[0].sort;
    // var filterFeature = obj.FeatureUsed[0].filter;
    // var searchFeature = obj.FeatureUsed[0].search;
    // var submissionFeature = obj.FeatureUsed[0].submission;
    // var askFeature = obj.FeatureUsed[0].ask;
    // var closeFeature = obj.FeatureUsed[0].close;
    // var writeFeature = obj.FeatureUsed[0].write;
    // var hoverFeature = obj.FeatureUsed[0].hover;
    // var paginateFeature = obj.FeatureUsed[0].paginate;

//###########################
//CLICK FEATURE
//###########################
    // for (var i = 0, len = clicksFeature.length; i < len; i++) {
    //   console.log(clicksFeature[i]);
    //   //access the PDP object to get general data. 
    //   console.log('$( "' + clicksFeature[i]+ '" ).click(function() {' + '\n' +
    //     'BV.pixel.trackEvent(\'Feature\', { '+ '\n' +
    //       'type: \'Used\',' + '\n' +
    //       'name: \'Click\', ' + '\n' +
    //       'brand: \'' + pdpObject.brand + '\',' + '\n' +
    //       'productId: \'' + pdpObject.productId + '\',' + '\n' +
    //       'bvProduct: \'' + pdpObject.bvProduct + '\',' + '\n' +
    //       'categoryId: \'' + pdpObject.categoryId + '\',' + '\n' +
    //       'detail1: \'\',' + '\n' +  //TO DO get the detail1 of the click event.. is this on the HTML?
    //       'detail2: \'\'' + '\n' +   //TO DO get the detail2 of the click event.. is this on the HTML?
    //     '});' + '\n' +
    //   '});' );

    //} //end for loop

//###########################
//SORT FEATURE
//###########################
  // for (var i = 0, len = sortFeature.length; i < len; i++) {
  //       console.log(sortFeature[i]);
  //       console.log('$( "' + sortFeature[i]+ '" ).click(function() {' + '\n' +
  //         'BV.pixel.trackEvent(\'Feature\', { '+ '\n' +
  //           'type: \'Used\',' + '\n' +
  //           'name: \'Sort\', ' + '\n' +
  //           'brand: \'' + pdpObject.brand + '\',' + '\n' +
  //           'productId: \'' + pdpObject.productId + '\',' + '\n' +
  //           'bvProduct: \'' + pdpObject.bvProduct + '\',' + '\n' +
  //           'categoryId: \'' + pdpObject.categoryId + '\',' + '\n' +
  //           'detail1: \'Profile\',' + '\n' +
  //           'detail2: \'\'' + '\n' +
  //         '});' + '\n' +
  //       '});' );

  //     } //end for loop

//###########################
//FILTER FEATURE
//###########################
  // for (var i = 0, len = filterFeature.length; i < len; i++) {
  //       console.log(filterFeature[i]);
  //       console.log('$( "' + sortFeature[i]+ '" ).click(function() {' + '\n' +
  //         'BV.pixel.trackEvent(\'Feature\', { '+ '\n' +
  //           'type: \'Used\',' + '\n' +
  //           'name: \'Filter\', ' + '\n' +
  //           'brand: \'' + pdpObject.brand + '\',' + '\n' +
  //           'productId: \'' + pdpObject.productId + '\',' + '\n' +
  //           'bvProduct: \'' + pdpObject.bvProduct + '\',' + '\n' +
  //           'categoryId: \'' + pdpObject.categoryId + '\',' + '\n' +
  //           'detail1: \'Profile\',' + '\n' +
  //           'detail2: \'\'' + '\n' +
  //         '});' + '\n' +
  //       '});' );

  //     } //end for loop




});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});