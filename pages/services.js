app.service("dataService",function($q){
  var pathname = window.location.pathname.replace("/","").replace(".php","");
  return{
    GetData: function(){
      var defferdObj = $q.defer();
      chrome.storage.local.get(pathname,function(data){
        defferdObj.resolve(data);
      })
      return defferdObj.promise;
    },
    GetPathName: function(){
      return pathname;
    },
    GetExtensionStates: function(){
      var defferdObj = $q.defer();
      chrome.storage.local.get("extension_states",function(data){
          defferdObj.resolve(data);
      });
      return defferdObj.promise;
    }
  }
})
