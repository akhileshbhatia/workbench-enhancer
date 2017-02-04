// $("body").prepend(
//   `<div id="main_sidebar" class="col-md-12 text-left">
//    <div ng-app="myApp">
//       <div ng-controller="myController" id="myController">
//          <div ng-if="(sortedData | isEmpty)">
//             <div class="row">
//                <div class="col-xs-12 text-center">
//                   <h3>No queries found</h3>
//                </div>
//             </div>
//          </div>
//          <div class="panel-group" id="accordion">
//             <div ng-repeat="(date,queriesObj) in sortedData track by date" ng-init="initializeGlyphClass($index)">
//                <div class="panel panel-default">
//                   <div class="panel-heading">
//                      <div class="row">
//                         <div class="col-xs-12 text-left">
//                            <h4 class="panel-title">
//                               <a data-toggle="collapse" data-parent="#accordion" href="#collapse{{$index}}"
//                                  ng-click=toggleGlyphClass($index)>
//                               <span ng-class="glyphClass[$index]"></span>{{date}}
//                               </a>
//                            </h4>
//                         </div>
//                      </div>
//                   </div>
//                </div>
//                <div id="collapse{{$index}}" class="panel-collapse collapse">
//                   <div class="panel-body">
//                      <div ng-repeat="(timestamp,query) in queriesObj track by timestamp">
//                         <div class="row">
//                            <div class="col-xs-12 text-left">
//                               <h4>{{query}}</h4>
//                            </div>
//                         </div>
//                      </div>
//                   </div>
//                </div>
//             </div>
//          </div>
//       </div>
//    </div>
// </div>`
// );
//
// chrome.storage.local.clear(function(){
//   console.log("Cleared the storage one time");
// });

// chrome.storage.local.remove("16-12-2016",function(){
//   console.log("Removed specific key data");
// })

// chrome.storage.local.get(null,function(data){
//   console.log("The data in storage is: "+data);
//   if($.isEmptyObject(data)){
//     chrome.storage.local.clear(function(){
//       console.log("Cleared the storage");
//     });
//   }
// })
