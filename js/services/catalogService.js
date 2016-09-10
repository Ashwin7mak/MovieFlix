(function() {


  angular.module('service', [])
    .service('CatalogService', CatalogService);


  function CatalogService($http, $q) {
    var service = this;
    service.getMovieList = getMovieList;
    service.getComments = getComments;

    function getMovieList() {
      var deferred = $q.defer();

      $http.get("Data_MoviesList&Comments/movielist.json")
        .then(function(res) {
          deferred.resolve(res.data)
        })
        .catch(function(e) {
          deferred.reject(e.data)
        });

      return deferred.promise;
    }

    function getComments(imdbID) {
      var deferred = $q.defer();

      $http.get("data/comments.json")
        .then(function(res) {
          deferred.resolve(res.data)
        })
        .catch(function(e) {
          deferred.reject(e.data)
        });

      return deferred.promise;
    }

  }

})();
