// This is preparation done on the page startup to setup the initial page start
  $().ready(function(){

    hideErrorAlerts();

    $("#personalLink a").click(function(){
      showPersonalDetails(); 
      return false;
    });

    $("#carLink a").click(function(){
      showCarDetails(); 
      return false;
    });

    $("#quoteLink a").click(function(){
      showQuoteDetails(); 
      return false;
    });
  });

  function showCarDetails() {

    var emptyFields = validateFields("dvPersonalDetails");

    if(emptyFields > 0) {
      $("dvPersonalDetailsAlert").show();
    }
    else {
      $("#dvPersonalDetails").hide();
      $("#dvQuoteDetails").hide();
      $("#dvCarDetails").show();

      setActiveNavigation("carLink");
    }
  }

  function showPersonalDetails() {
      // Hide the car details section (dvCarDetails)
      // Hide the quote section (dvQuoteDetails)
      // Show the personal details section (dvPersonalDetails)
  }

  function showQuoteDetails() {
      // Hide the car details section (dvCarDetails)
      // Hide the personal details section (dvQuoteDetails)
      // Show the quote section (dvPersonalDetails)
  }

  function getQuote() {

  }

    //##################### HELPERS ##########################

  function hideErrorAlerts()
  {
    $("#dvPersonalDetailsAlert").hide();
    $("#dvCarDetailsAlert").hide();
    $("#dvQuoteDetailsAlert").hide();
  }

  function setActiveNavigation(activeTab) {
    $(".nav li").removeClass("active");

    $("#" + activeTab).addClass("active");
  }

  //##################### VALIDATION ##########################

  function compareValueAgainstRegex(regex, value)
  {
    if (regex.test(value))
    {
      return false;
    }
    return true;
  }

  function isFieldAlphaNumeric(value) {
    return compareValueAgainstRegex(/^[a-z0-9]+$/i, value);
  }

  function isFieldNumeric(value) {
    return compareValueAgainstRegex(/^[0-9]+$/i, value);
  }

  function validateSection(section, isContentsCorrect)
  {
    var errors = 0;
    $(section).each(function(){

      var fieldValue = $(this).val();

      if (fieldValue === "")
        errors++;

      if (isContentsCorrect(fieldValue))
        errors++;

    });
    return errors;
  }

  function validateFields(sectionToValidate) {

    var errors = 0

    errors = errors + validateSection("#" + sectionToValidate + " input:text", isFieldAlphaNumeric); 
                    + validateSection('#' + sectionToValidate + ' input[type="number"]', isFieldNumeric);

    // Check radio buttons for content: use length tester to ensure that radio button exists
  /*
    if ($("#" + sectionToValidate + " input:radio").length && $("#" + sectionToValidate + " input:radio").is(':checked') != true)
      errors++;
    alert('radio');
*/
    // Check dropdowns have been set
    $("#" + sectionToValidate + " option:selected").each(function(){
      if (this.value === "Select"){
        errors++;
      }
    });

    $("#" + sectionToValidate + " .emailVal").each(function() {
      if (compareValueAgainstRegex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, $(this).val()))
        errors++;
    });

    return errors;
  }

  