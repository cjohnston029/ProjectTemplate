// This is preparation done on the page startup to setup the initial page start
  $().ready(function(){

    hideErrorAlerts();
    $("#dvQuoteDetails").hide();

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

      $("#dvCarDetails").hide();
      $("#dvQuoteDetails").hide();
      $("#dvPersonalDetails").show();
  }

  function showQuoteDetails() {

    var emptyFields = validateFields("dvCarDetails");

    if(emptyFields > 0) {
      $("dvCarDetailsAlert").show();
    }
    else {
      $("#dvPersonalDetails").hide();
      $("#dvCarDetails").hide();
      $("#dvQuoteDetails").show();

      setActiveNavigation("quoteLink");

      // call getquote function to call service
      getQuote(emptyFields);
    }
      // Hide the car details section (dvCarDetails)
      // Hide the personal details section (dvQuoteDetails)
      // Show the quote section (dvPersonalDetails)
  }

  function getQuote(emptyFields) {

    if(emptyFields === 0) {
    
      // setup variables for ajax call
      var gender = "m"; //$("#dvPersonalDetails input:radio[name=rdoGender]:checked").val();
      var age = $ ("#txtNumber").val();
      var yearsNoClaims = $ ("#ddlncb option:selected").val();
      var costOfCar = $ ("#value").val();
      var carStorage = $ ("#storage option:selected").val();

      // log out values to the browser
      console.log(gender);
      console.log(age);
      console.log(yearsNoClaims);
      console.log(costOfCar);
      console.log(carStorage);

      $.ajax({
        type: "GET",
        url: "http://lit-wrkexp-01.lit.lmig.com:8080/api/calculateRates",
        data: {gender:gender, age:age, noClaimsBonus:yearsNoClaims, costOfCar:costOfCar, carStorage:carStorage}
      }).done(function(msg) {
        $("#txtQuote").text(msg.result.toFixed(2));
        showQuoteDetails();
    });
    }

    else
    {
      $("#dvCarDetails").show();
    }

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

  