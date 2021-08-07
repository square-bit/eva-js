window.addEventListener('load', function () {

  var evainput = document.getElementsByClassName('eva-validator');

  // add eventlistener to all forms that have an email that needs validation
  Array.prototype.forEach.call(evainput, function (element, index, array) {
    getFormFor(element).addEventListener('submit', formSubmitHandler)
  });

  // add the onBlur event listener for all the email inputs
  Array.prototype.forEach.call(evainput, function (element, index, array) {
    element.addEventListener('blur', textInputBlurHandler);
  });

  function textInputBlurHandler() {
    var email = this;
    var frm = getFormFor(this);

    // disable form submit until we validate
    frm.eva = frm.eva || {}; // get or create the 'eva' parameter
    frm.eva.valid = false;

    // validate
    message = makeRequest(email.value, function (result, messageInfo) {
      // enable, if valid, the form submission
      frm.eva.valid = result;

      // Remove eva-errors span
      var errors = this.getElementsByClassName('eva-errors');
      Array.prototype.forEach.call(errors, function (element, index, array) {
        element.remove();
      });

      // invalid add class 'error' to input
      if (result) {
        this.classList.remove('eva-error');
      } else {
        this.classList.add('eva-error');
        var errorMessage = document.createElement('span');
        errorMessage.setAttribute('class', 'eva-errors');
        errorMessage.innerHTML = "Result: " + messageInfo;
        email.before(errorMessage);
      }

    }.bind(frm));
  }

  function formSubmitHandler(event) {
    var frm = this;

    if (frm.eva && frm.eva.valid == false) {
      event.preventDefault();
    }
  }

  function makeRequest(email, callback) {
    if (email) {
      var url = 'https://e-va.io/api/email/validate/' + email;
      var EVA_TIMEOUT_SECONDS = EVA_TIMEOUT_SECONDS || 3;

      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.setRequestHeader("api-key", EVA_API_KEY);
      xhr.setRequestHeader("Accept", 'application/json');
      xhr.responseType = 'json';
      xhr.timeout = EVA_TIMEOUT_SECONDS * 1000; // time in milliseconds
      xhr.send();

      // // 4. This will be called after the response is received
      xhr.onload = function () {
        if (xhr.status != 200) { // analyze HTTP status of the response
          callback(false, xhr.response.message);
        } else { // show the result
          callback(xhr.response.state != undefined && xhr.response.state == 'Safe', xhr.response.message);
        }
      };
      xhr.ontimeout = function (e) {
        callback(false, 'EVA API call failed.');
      };
      xhr.onerror = function () {
        if (xhr.response) {
          callback(false, xhr.response.message);
        }
        else {
          var domain = location.protocol + "://" + window.location.hostname;
          console.log("WARNING ============");
          console.log("Make sure the API key('" + EVA_API_KEY + "') is correct and that '" + domain + "' is in the list of allowed domains for this key");
          console.log("You can do that at https://e-va.io")
          console.log("Allowing email through..");
          console.log("====================");
          callback(true);
        }
      }
    }
  }
});

// get the form that owns this element
function getFormFor(element) {
  return element.form || element.closest('form');
}
