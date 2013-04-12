$(document).ready(function() {
  // Hide properties blocks.
  $('div.properties').hide();

  //$('.new-block', '.new-block').hide();
  $('.new-block').each(function () {
    if ($(this.previousSibling).hasClass('property')) {
      $(this).hide();
    }
  });

  $('h2').bind('click', function() {
    $(this).siblings('.properties').toggle(300);
  });

  $('.property').bind('click', function() {
    $(this).next('.new-block').toggle(300);
  });
});