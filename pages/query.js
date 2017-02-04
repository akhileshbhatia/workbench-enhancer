$.get(chrome.extension.getURL("templates/sidebar-view.html"),function(data){
    $("body").prepend(data);
});

//use to clear storage completely
// chrome.storage.local.clear(function() {
//   console.log("Cleared storage");
// });

$("[name='querySubmit']").on("click",function(event){
  event.preventDefault();
  var date = new Date();
  var month = parseInt(date.getMonth(),10) + 1;
  var todaysDate = date.getDate() + "-" + month + "-" + date.getFullYear();
  var queriesArray = [];
  var newKey = "_" + Math.round(new Date()/1000);
  var newValue = $("#soql_query_textarea").val().trim();

  chrome.storage.local.get(todaysDate,function(data){
      if($.isEmptyObject(data)){//empty object means a new entry for that key will be made
        var objTemp = {};
        objTemp[newKey] = newValue;
        data[todaysDate] = objTemp;
      }
      else {
        var value = data[todaysDate];
        value[newKey] = newValue;
      }
      chrome.storage.local.set(data,function(){
        console.log("Data added to storage");
        angular.element("#myController").scope().getData(); //call to angular controller getData function to update data on view
      });
  });
});
