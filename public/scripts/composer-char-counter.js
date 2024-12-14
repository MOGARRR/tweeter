$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let text = $(this).val().length;
    let counter = $(this).parents().find('.counter').val(() => 140 - text); // goes up to parent and then goes down to find counter
    counter.val() < 0 ? $(counter).addClass('negative') : $(counter).removeClass('negative');
  });
});