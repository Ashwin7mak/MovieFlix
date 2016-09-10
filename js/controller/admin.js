

(function() {
  'use strict';

  var app = angular.module('admin', ['ui.bootstrap', 'service']);
  app.controller('adminCtrl', function($scope, $http, $location, CatalogService) {
    var imdbID = $location.search().imdbID;

    $scope.movie = [];

    if(imdbID) {
      // Client side search for demo, temporary until API is available
      CatalogService.getMovieList()
        .then(function (movielist) {

          for (var i = 0; i < movieList.length; i++) {
            var movie = movieList[i];
            if (movie.imdbID === imdbID) {
              $scope.movie = movie;
              break;
            }
          }

        }, function(err) {
          console.log(err);
        });
    }
  });
})();
