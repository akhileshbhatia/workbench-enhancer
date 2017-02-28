//initialize angular application
var app = angular.module("workbenchEnhancerApp",["ngAnimate","ui.bootstrap"]);

app.directive("mainExtension",function($sce){
  var mainExtension ={};
  mainExtension.restrict="A";
  mainExtension.templateUrl = $sce.trustAsResourceUrl(chrome.extension.getURL("templates/main-extension.html"));
  //mainExtension.templateUrl = $sce.trustAsResourceUrl(chrome.extension.getURL("templates/angular-panel.html"));
  return mainExtension;
});

// a directive to auto-collapse long text
// in elements with the "dd-text-collapse" attribute
app.directive('ddTextCollapse', ['$compile', function($compile) {
  return {
    restrict: 'A',
    scope: true,
    link: function(scope, element, attrs) {
      // start collapsed
      scope.collapsed = true;

      // wait for changes on the text
      attrs.$observe('ddTextCollapseText', function(text) {
        // get the length from the attributes
        var maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);
        // remove the current contents of the element
        element.empty();

        if (text.length > maxLength) {
          // split the text in two parts, the first always showing
          var firstPart = String(text).substring(0, maxLength);
          var secondPart = String(text).substring(maxLength, text.length);

          // create some new html elements to hold the separate info
          var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
          var secondSpan = $compile('<span ng-if="!collapsed">' + secondPart + '</span>')(scope);
          var moreIndicatorSpan = $compile('<span ng-if="collapsed">... </span>')(scope);
          var lineBreak = $compile('<br ng-if="!collapsed">')(scope);
          var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="collapsed = !collapsed">({{collapsed ? "more" : "less"}})</span>')(scope);

          // and add the new ones we created
          element.append(firstSpan);
          element.append(secondSpan);
          element.append(moreIndicatorSpan);
          element.append(lineBreak);
          element.append(toggleButton);
        }
        else {
          element.append(text);
        }
      });
    }
  };
}]);

app.filter("isEmpty",function(){
  return function(data) {
    return angular.equals({},data) || data == undefined || data == null;
  }
})
