/* eslint-disable */
$(document).ready(() => {
  $('#login').click(() => {
    const email = $('#email').val();
    const password = $('#password').val();
    if (email === '' || password === '') {
      $('input[type="text"], input[type="password"]').css(
        'border',
        '2px solid red'
      );
      $('input[type="text"], input[type="password"]').css(
        'box-shadow',
        '0 0 3px red'
      );
    } else {
      $('input[type="text"], input[type="password"]').css(
        'border',
        ''
      );
      $('input[type="text"], input[type="password"]').css(
        'box-shadow',
        ''
      );
      $.post('http://localhost:3000/login', { email, password })
        .done(() => {
          window.location.replace("http://localhost:8080");
        }).fail((error) => {
          alert("Invalid user or password");
        });
    }
  });
});
