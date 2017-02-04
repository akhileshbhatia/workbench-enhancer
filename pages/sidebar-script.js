var app = angular.module("myApp",[]);

app.controller("myController",function($scope,dataService){
  $scope.glyphClass =[];
  $scope.getData = function(){
    var askForPromise = dataService.getData();
    askForPromise.then(
      //success callback
      function(data){
        $scope.sortedData = reverseSort(data);
        //$scope.sortedData = data;
      },
      //error callback
      function(data){
        console.log("Error in receiving data");
      }
    )
  };

  $scope.getData(); //call on page load

  $scope.initializeGlyphClass = function(index){
    $scope.glyphClass[index] = "glyphicon glyphicon-chevron-down";
  };

  $scope.toggleGlyphClass  = function(index){
    $scope.glyphClass[index] = $scope.glyphClass[index] == "glyphicon glyphicon-chevron-down"? "glyphicon glyphicon-chevron-up":"glyphicon glyphicon-chevron-down";
  };

  var reverseSort = function(datafromStorage){
    var sortedData = {};
    if(!angular.equals({},datafromStorage)){  //proceed only when data found. If no data, return empty object
      var dates = Object.keys(datafromStorage);
      dates.forEach(function(date){
        var queries = datafromStorage[date];//get query object for each day
        var sortedQueryKeys = Object.keys(queries).sort().reverse();//reverse sort so we get latest query first
        if(sortedQueryKeys.length == 1){//if only single query,no need of sorting,store data as it is
          sortedData[date] = datafromStorage[date];
        }
        else{
          sortedData[date] = {};
          sortedQueryKeys.forEach(function(key){
            var temp ={};
            temp[key] = queries[key];//making a reverse json as we have sorted keys in reverse order
            sortedData[date] = angular.extend(sortedData[date],temp);
          });
        }
      });
    }
    return sortedData;
  }
});

app.service("dataService",function($q){
  return{
    getData: function(){
      var deferredObj = $q.defer();
      chrome.storage.local.get(null,function(data){
        deferredObj.resolve(data);
      })
      return deferredObj.promise;
    },
  }
});

app.filter("isEmpty",function(){
  return function(obj){
    return angular.equals({},obj);
  }
})
