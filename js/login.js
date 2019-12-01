$("#loginBtn").parent().prepend(" <button id='dev' type='button' class='btn btn-sm btn-primary'>Dev v37.0</button>");
$("#loginBtn").parent().prepend(" <button id='prod' type='button' class='btn btn-sm btn-primary'>Prod v37.0</button>");

$("#prod").click(function() {
  $("#oauth_env").val("login.salesforce.com");
  $("#termsAccepted").prop("checked", true);
  $("#loginBtn").click();
});

$("#dev").click(function() {
  $("#oauth_env").val("test.salesforce.com");
  $("#termsAccepted").prop("checked", true);
  $("#loginBtn").click();
});
