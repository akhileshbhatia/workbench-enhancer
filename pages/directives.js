//initialize angular application
var app = angular.module("workbenchEnhancerApp",["ngAnimate","ui.bootstrap"]);

//directive to show the extension div
app.directive("mainExtension",function($sce){
  var mainExtension ={};
  mainExtension.restrict="A";
  mainExtension.templateUrl = $sce.trustAsResourceUrl(chrome.extension.getURL("templates/extension.html"));
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

      scope.ToggleQueryView = function(){
        scope.collapsed = !scope.collapsed;
        scope.readMoreLessBtn.clicked = true;
      }

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
          var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="ToggleQueryView()">({{collapsed ? "more" : "less"}})</span>')(scope);

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

//directive to toggle the extension div
//possible using ng-style as well but did this to learn dom manipulation
app.directive("toggleExtension",function(){
  return{
    link : function(scope,element,attrs){
      var body = element.parent().parent();
      var mainBlock = body.find("div#mainBlock");
      scope.$watch(attrs.toggleExtension,function(show){
        if(show){
          element.css("left","0");
          mainBlock.css("margin-left","29%");
        }
        else{
          element.css("left","-23%");
          mainBlock.css("margin-left","");
        }
      })
    }
  }
})

//directive to toggle the button
app.directive("toggleButton",function(){
  return{
    link: function(scope,element,attrs){
      scope.$watch(attrs.toggleButton,function(show){
        if(show){
          element.css("left","23%");
          element.removeClass("glyphicon-chevron-right");
          element.addClass("glyphicon-chevron-left");
        }
        else{
          element.css("left","0");
          element.removeClass("glyphicon-chevron-left");
          element.addClass("glyphicon-chevron-right");
        }
      })
    }
  }
})

app.directive("updateModel",function(){
  return{
    link : function(scope,element,attrs){
      var table = element.closest("table");
      element.on("click",function(){
        scope.$apply(function(){
          scope.textAreaVal = table.find("textarea").val().trim();
        })
      })
    }
  }
})
