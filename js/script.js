
//global variables
let currentTotal = 0;
const paymentDivs = $('fieldset:last div p').parent();
const paypalP = paymentDivs[0];
const bitcoinP = paymentDivs[1];
const defaultPayment = $('option[value="credit card"]');

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

//hide other T-shirt colors when page opens
$("#colors-js-puns").hide();

//Color options for T-shirt Designer
$("#design").on('click', function() {
  const optionColorArray = $('#color').children();
  const punArray = [];
  const heartArray = [];

      for (let i = 0; i < optionColorArray.length; i++) {
        let text = optionColorArray[i].text;
        let regex = new RegExp('Puns*');
            if (regex.test(text)) {
              punArray.push(optionColorArray[i]);
            } else {
              heartArray.push(optionColorArray[i]);
            }
          }

//updating the dropdown when new option is selected
      if ($(this).val() === 'js puns') {
          $(optionColorArray[0]).attr('selected', false);
          $(heartArray[0]).attr('selected', false);
          $(punArray[0]).attr('selected', true);
          $(punArray).show();
          $(heartArray).hide();
        } else if ($(this).val() === 'heart js') {
          $(optionColorArray[0]).attr('selected', false);
          $(punArray[0]).attr('selected', false);
          $(heartArray[0]).attr('selected', true);
          $(heartArray).show();
          $(punArray).hide();
        }
          else {
          $(optionColorArray).show();
          $(optionColorArray[0]).attr('selected', true);
        }

      if ($(this).val() === 'js puns' || $(this).val() === 'heart js') {
        $("#colors-js-puns").show();
      }
})

//create space for total amount
const totalCost = $("<legend></legend>").addClass('total').hide();
$('.activities').append(totalCost);

//totaling cost
$('input[type=checkbox]').on('click', function(event) {
  let checked = [];
  let count = (document.querySelectorAll('input[type="checkbox"]:checked').length);

    const mainConference = $("input[name='all']");
      if (mainConference.prop('checked')){
        count = count + 1;
      }

      if (count > 0){
        totalCost.show();
        currentTotal = count * 100;
      } else {
        totalCost.hide();
      } totalCost.text('Total: $' + currentTotal);
});

//find times and days on selected checkbox
function matchTime(checkedTime) {
  return /[a-z]+\s\d[a|p][m][-]\d+[a|p][m]/igm.exec(checkedTime);
}

//disable checkboxes with conflicting times
$('input[type=checkbox]').change(function(){
    let checkboxCount = (document.querySelectorAll('input[type="checkbox"]'))
    let values = [];
    let listValues = [];

//Array of all text in checkboxes
      for(let i = 1; i < (checkboxCount).length; i++){
          values.push($(checkboxCount[i]).parent('label').text());
      }

//Dates & Times of Checklist Items
      for(let h = 0; h < values.length; h++) {
          let dateAndTime = matchTime(values[h]);
          listValues.push(dateAndTime[0]);
     }


//Disable Boxes when one with same date and time is checked
   let checkedValue = matchTime($(this).parent('label').text());

   for (let j = 1; j <= listValues.length; j++) {
     let m = j + 2;
         if ($(checkboxCount[j]).is(':checked')
            && checkedValue[0] === listValues[j-1]) {
               $(this).attr('disabled', false);
               $(checkboxCount[m]).attr('disabled', true);
         } else if ($(checkboxCount[j]).is(':not(:checked)')) {
               $(checkboxCount[m]).attr('disabled', false)
               $(this).attr('disabled', false);
         }
}
});


//Correct Payment options
//Grabbing sections of payment fieldset
//Default
defaultPayment.attr('selected', true);
if($('defaultPayment[attr="selected"]')){
    $('div p').hide();
}

//dropdown change
$("#payment").on('click', function() {
//paypal
  if ($(this).val() === 'paypal') {
      defaultPayment.attr('selected', false);
      $('option[value="bitcoin"]').attr('selected', false);
      $('option[value="paypal"]').attr('selected', true);

      $('#credit-card').hide();
      $('div p').show();
        $(bitcoinP).hide();
        $(paypalP).show();
//bitcoin
  } else if ($(this).val() === 'bitcoin') {
      defaultPayment.attr('selected', false);
      $('option[value="bitcoin"]').attr('selected', true);
      $('option[value="paypal"]').attr('selected', false);

      $('#credit-card').hide();
      $(bitcoinP).show();
      $(paypalP).hide();
//default / credit card
  } else {
    defaultPayment.attr('selected', true);
    $('option[value="bitcoin"]').attr('selected', false);
    $('option[value="paypal"]').attr('selected', false);

    $('#credit-card').show();
    $(bitcoinP).hide();
    $(paypalP).hide();

  }
});
