//directive to update the text area val
app.directive('updateModel', function () {
  return {
    link: function (scope, element) {
      const table = element.closest('table');
      element.on('click', function () {
        scope.$apply(function () {
          scope.allDataObj.textAreaVal = table.find('textarea').val().trim();
        })
      })
    }
  }
});
