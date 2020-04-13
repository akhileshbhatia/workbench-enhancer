$('#loginBtn').parent().prepend(`<button id='dev' type='button' class='btn btn-sm btn-primary'>Dev</button>`);
$('#loginBtn').parent().prepend(`<button id='prod' type='button' class='btn btn-sm btn-primary'>Prod</button>`);

$('#prod').click(() => {
  $('#oauth_env').val('login.salesforce.com');
  $('#termsAccepted').prop('checked', true);
  $('#loginBtn').click();
});

$('#dev').click(() => {
  $('#oauth_env').val('test.salesforce.com');
  $('#termsAccepted').prop('checked', true);
  $('#loginBtn').click();
});
