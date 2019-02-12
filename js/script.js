
//global variables
let currentTotal = 0;
const paymentDivs = $('fieldset:last div p').parent();
const paypalP = paymentDivs[0];
const bitcoinP = paymentDivs[1];
const defaultPayment = $('option[value="credit card"]');
const activitiesText = $('legend');

let checkboxDateAndTime = [];
    let checkboxCount = (document.querySelectorAll('input[type="checkbox"]'))
    for (let a = 0; a < checkboxCount.length; a++) {
      checkboxDateAndTime.push(checkboxCount[a]);
     } checkboxDateAndTime.shift();
let checkedInput = 0;

//http://www.jquerybyexample.net/2011/04/validate-email-address-using-jquery.html
//regex checks
let emailfilter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/gmi;
let mailValue = $('#mail').value;

const creditCardMatch = /^[0-9]{13,16}$/gmi;
const zip = /^[0-9]{5}$/gmi;
const cvv = /^[0-9]{3}$/gmi;

//invalid function
function inValidField(prop, propId) {
  let propLabel = 'label[for=' + prop + ']';
  $(propId).css({'outline': 'solid', 'outline-color': 'red'});
  $(propLabel).css('color', 'red');
}

//if valid
function inValidFieldReset(prop, propId) {
  let propLabel = 'label[for=' + prop + ']';
  $(propId).css('outline', 'none');
  $(propLabel).css('color', 'black');
}

//function to check to see if an input is checked
function findCheckedInput() {
for (let v = 0; v < checkboxCount.length; v++) {
  if ($(checkboxCount[v]).is(':checked')) {
    checkedInput = checkedInput + 1;
  } else {
    checkedInput = checkedInput + 0;
  }
  } return checkedInput;
}

//to see if credit card field is selected
function cardSelected() {
  if (($('#payment').val() != 'credit card')) {
    return true;
  } else {
    return false;
  }
}

//check if credit card number is valid
function cardValid(cardNumber) {
  creditCardMatch.lastIndex = 0;
  let cc = creditCardMatch.test(cardNumber);
    if ( cc ) {
      return true;
    } else {
      return false;
    }
}

function zipValid(zipNumber) {
  zip.lastIndex = 0;
  let zip5 = zip.test(zipNumber);
    if ( zip5 ) {
      return true;
    } else {
      return false;
    }
}

function ccvValid(cvvNumber) {
  cvv.lastIndex = 0;
  let cvv3 = cvv.test(cvvNumber);
    if ( cvv3 ) {
      return true;
    } else {
      return false;
    }
}

//Focus Name Field when Page Loads
$("#name").focus();

function getMailValue() {
  return $('#mail').val();
}

//Email Real Time Message & conditional
$('label[for=mail]').append('<span class="ErrorText"> </span>');
$('.ErrorText').css('color', 'red');

//When Clicked
$('#mail').on("click", function() {
  if ($('#mail').val().length === 0) {
    $('.ErrorText').text(' Please Enter Valid Email');
  }
});

//When Clicking Out
$('#mail').blur(function(e) {
  let mailValue = getMailValue();
  emailfilter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/gmi;
  let mailValueBoolen = emailfilter.test(mailValue);

      if (mailValueBoolen === true) {
        $('.ErrorText').html('');
      } else if (mailValue === '') {
        $('.ErrorText').text(' Please Enter Valid Email');
      } else if (mailValueBoolen === false) {
        $('.ErrorText').text(' Invalid Email');
      }

});


//Real Time Error message during Input
$('#mail').on("input", function() {
  let mailValue = this.value;
  emailfilter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/gmi;
  let mailValueBoolen = emailfilter.test(mailValue);

      if (mailValueBoolen === true) {
        $('.ErrorText').html('');
      } else if (mailValueBoolen === false) {
        $('.ErrorText').text(' Invalid Email');
      }

})

//If 'other' is clicked from drop down display a text field to accomodate option
$('#other-title').hide();

//Hide unless other is selected
$("#title").on('change', function() {
  if ($(this).val() === 'other') {
    $("#other-title").show();
  } else {
    $('#other-title').hide();
  }
})

//hide other T-shirt colors when page opens & Add a no option
$("#colors-js-puns").hide();

//Color options for T-shirt Designer
$("#design").on('change', function() {
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
          $("#colors-js-puns").show();
          $(optionColorArray[0]).attr('selected', false);
          $(heartArray[0]).attr('selected', false);
          $(punArray[0]).attr('selected', true);
          $(punArray).show();
          $(heartArray).hide();
        } else if ($(this).val() === 'heart js') {
          $("#colors-js-puns").show();
          $(optionColorArray[0]).attr('selected', false);
          $(punArray[0]).attr('selected', false);
          $(heartArray[0]).attr('selected', true);
          $(heartArray).show();
          $(punArray).hide();
        }
          else {
          $("#colors-js-puns").hide();
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
    for (let j = 0; j <= listValues.length; j++) {



       if ($(this).is(':checked') && checkedValue[0] === listValues[j]) {
           $(checkboxDateAndTime[j]).attr('disabled', true);
           $(this).attr('disabled', false);
       }  else if ($(this).is(':not(:checked)') && checkedValue[0] === listValues[j]) {
            $(this).attr('disabled', false);
            $(checkboxDateAndTime[j]).attr('disabled', false)
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
$("#payment").on('change', function() {
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



//Validation
//Is name feel blank
//Is email address Valid
//Is at least one checkbox marked
//is the credit card number and information valid


//https://stackoverflow.com/questions/17865148/using-jquery-to-prevent-form-submission-when-input-fields-are-empty
$('form').submit(function(e) {

    //any checkboxes checked?
    checkedInput = 0;
    findCheckedInput();

    //creditCardNumber;
    //https://stackoverflow.com/questions/5963182/how-to-remove-spaces-from-a-string-using-javascript
    //getting values from credit card w/o spaces
    let creditCardNumber = $('#cc-num').val().replace(/\s+/g, '');
    let zipCode = $('#zip').val().replace(/\s+/g, '');
    let cvv = $('#cvv').val().replace(/\s+/g, '');

    let isCardSelected = cardSelected();
    let isCardValid = cardValid(creditCardNumber);
    let isZipValid = zipValid(zipCode);
    let isCvvValid = ccvValid(cvv);

    let submitMailValue = getMailValue();
    emailfilter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/gmi;
    let mailValueBoolen = emailfilter.test(submitMailValue);

//name field validation
 if ($.trim($("#name").val()) === "") {
    inValidField('name', "#name");
    e.preventDefault();
  } else {
    inValidFieldReset('name', "#name");
  }

//email Validation
if ($('#mail').val().length === 0) {
  $('.ErrorText').text(' Please Enter Valid Email');
}

if ( mailValueBoolen === false || $.trim($("#mail").val()) === "") {
    inValidField('mail', "#mail");
    e.preventDefault();
  }  else {
    inValidFieldReset('mail', "#mail");
  }

//checklist Validation
if (checkedInput === 0) {
    $(activitiesText[2]).css('color', 'red');
    e.preventDefault();
  }  else {
    $(activitiesText[2]).css('color', '#184f68');
  }


//credit card/payment validation
if (isCardSelected === false) {
if (isCardValid === false || $.trim($("#cc-num").val()) === "") {
  inValidField('cc-num', '#cc-num');
  e.preventDefault();
} else {
  inValidFieldReset('cc-num', "#cc-num");
}

if (isZipValid === false || $.trim($("#zip").val()) === "") {
  inValidField('zip', '#zip');
  e.preventDefault();
} else {
  inValidFieldReset('zip', "#zip");
}

if (isCvvValid === false || $.trim($("#cvv").val()) === "") {
  inValidField('cvv', '#cvv');
  e.preventDefault();
} else {
  inValidFieldReset('cvv', "#cvv");
}
}

});
