//directive to toggle the extension div
//possible using ng-style as well but did this to learn dom manipulation
app.directive('toggleExtension', function () {
  return {
    link: function (scope, element, attrs) {
      const body = element.parent().parent();
      const mainBlock = body.find('div#mainBlock');
      scope.$watch(attrs.toggleExtension, function (show) {
        if (show) {
          element.css('left', '0');
          mainBlock.css('margin-left', '29%');
        }
        else {
          element.css('left', '-23%');
          mainBlock.css('margin-left', '');
        }
      })
    }
  }
});
