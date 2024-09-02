jQuery(document).ready(function($) {
  "use strict";

  $('form.php-email-form').submit(function(e) {
    e.preventDefault(); // Prevent the default form submission

    var form = $(this);
    var formData = form.serialize(); // Serialize form data for submission

    // Validate form fields
    var ferror = false;
    var emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    form.find('.form-group').each(function() {
      var input = $(this).find('input, textarea');
      var rule = input.attr('data-rule');
      var ierror = false;
      if (rule) {
        var pos = rule.indexOf(':');
        var exp = pos >= 0 ? rule.substr(pos + 1) : null;
        rule = pos >= 0 ? rule.substr(0, pos) : rule;

        switch (rule) {
          case 'required':
            if (input.val() === '') {
              ferror = ierror = true;
            }
            break;
          case 'minlen':
            if (input.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
          case 'email':
            if (!emailExp.test(input.val())) {
              ferror = ierror = true;
            }
            break;
        }
        input.next('.validate').html((ierror ? input.attr('data-msg') : '')).show();
      }
    });

    if (ferror) return false;

    var action = form.attr('action');
    if (!action) {
      form.find('.loading').slideUp();
      form.find('.error-message').slideDown().html('The form action property is not set!');
      return false;
    }

    form.find('.sent-message').slideUp();
    form.find('.error-message').slideUp();
    form.find('.loading').slideDown();

    $.ajax({
      type: "POST",
      url: action,
      data: formData,
      success: function(msg) {
        if (msg === 'OK') {
          form.find('.loading').slideUp();
          form.find('.sent-message').slideDown();
          form.find("input:not(input[type=submit]), textarea").val('');
        } else {
          form.find('.loading').slideUp();
          form.find('.error-message').slideDown().html(msg);
        }
      }
    });

    return false;
  });
});
