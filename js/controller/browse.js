(function() {
  'use strict';

  var app = angular.module('catalog', ['ui.bootstrap', 'service']);
  app.controller('catalogCtrl', function($scope, $http, $location, CatalogService) {
    var pageSize = 12;

    $scope.isAdmin = $location.search().admin ? "enabled": "";
    $scope.data = [];
    $scope.page = 1;
    $scope.enableDetails = "";

    // Enable/Disable Prev nav button
    $scope.allowPrev = function() {
      if ($scope.page > 1) {
        return "";
      }
      return "disabled"
    }

    // Enable/Disable Next nav button
    $scope.allowNext = function() {
      var maxPages = Math.ceil($scope.data.length / pageSize);

      if ($scope.page < maxPages) {
        return "";
      }
      return "disabled"
    }

    // Display movies in current page
    $scope.showPage = function() {
      var movielist = $scope.data;
      var total = movielist.length;
      var page = $scope.page;
      var start = (page-1)*pageSize;
      var end = start + pageSize;

      $scope.movielist = movielist.slice(start,end);
    }

    // Go to previous page
    $scope.gotoPrev = function() {
      if ($scope.page > 1) {
        $scope.page--;
        $scope.showPage();
      }
    }

    // Go to next page
    $scope.gotoNext = function() {
      var maxPages = Math.ceil($scope.data.length / pageSize);
      if ($scope.page < maxPages) {
        $scope.page++;
        $scope.showPage();
      }
    }

    // Show details of the movie in a floating panel
    $scope.showDetails = function(movie) {
      $scope.selectedMovie = movie;
      $scope.enableDetails = "enabled";

    }

    // Hide the details view
    $scope.closeDetails = function() {
      $scope.enableDetails = "";
    }

    // Retrieve a list of movies to be displayed
    CatalogService.getMovieList()
      .then(function (movielist) {
        $scope.data = movielist;
        $scope.showPage();
      }, function(err) {
        console.log(err);
      });
  });
})();
