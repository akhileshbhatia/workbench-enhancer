// a directive to auto-collapse long text
// in elements with the "dd-text-collapse" attribute
app.directive('ddTextCollapse', ['$compile', function ($compile) {
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, element, attrs) {
      // start collapsed
      scope.collapsed = true;

      scope.toggleQueryView = function () {
        scope.collapsed = !scope.collapsed;
        scope.readMoreLessBtn.clicked = true;
      }

      // wait for changes on the text
      attrs.$observe('ddTextCollapseText', function (text) {
        // get the length from the attributes
        const maxLength = scope.$eval(attrs.ddTextCollapseMaxLength);
        // remove the current contents of the element
        element.empty();

        if (text.length > maxLength) {
          // split the text in two parts, the first always showing
          scope.firstPart = String(text).substring(0, maxLength);
          scope.secondPart = String(text).substring(maxLength, text.length);

          // create some new html elements to hold the separate info
          const firstSpan = $compile('<span ng-bind="firstPart"></span>')(scope);
          const secondSpan = $compile('<span ng-if="!collapsed" ng-bind="secondPart"></span>')(scope);
          const moreIndicatorSpan = $compile('<span ng-if="collapsed">... </span>')(scope);
          const lineBreak = $compile('<br ng-if="!collapsed">')(scope);
          const toggleButton = $compile('<span class="collapse-text-toggle" ng-click="toggleQueryView()">({ { collapsed ? "more" : "less" } })</span>')(scope);

          // and add the new ones we created
          element.append(firstSpan);
          element.append(secondSpan);
          element.append(moreIndicatorSpan);
          element.append(lineBreak);
          element.append(toggleButton);
        }
        else {
          element.text(text);
        }
      });
    }
  };
}]);
