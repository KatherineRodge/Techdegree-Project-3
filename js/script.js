//Focus Name Field when Page Loads
$("#name").focus();

//If 'other' is clicked from drop down display a text field to accomodate option
//Create 'Other' input field
const other = $('<input>')
  .attr('type', 'text')
  .attr("id", "other-title")
  .attr("placeholder", "Your Job Role")
$('fieldset:first').append(other);
$('#other-title').hide();

//Hide unless other is selected
$("#title").on('click', function() {
  if ($(this).val() === 'other') {
    $("#other-title").show();
  } else {
    $('#other-title').hide();
  }
})
