//directive to toggle the button
app.directive('toggleButton', function () {
  return {
    link: (scope, element, attrs) => {
      scope.$watch(attrs.toggleButton, function (show) {
        if (show) {
          element.css('left', '23%');
          element.removeClass('glyphicon-chevron-right');
          element.addClass('glyphicon-chevron-left');
        }
        else {
          element.css('left', '0');
          element.removeClass('glyphicon-chevron-left');
          element.addClass('glyphicon-chevron-right');
        }
      })
    }
  }
});
