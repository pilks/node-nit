'use strict';

/*global $:false */

function openTask (taskId) {
  document.location.href = "/tasks/" + taskId;
}

function selectOption (fieldName, valueToSelect) {
  $("select[name='" + fieldName + "']").val(valueToSelect);
}

function showPopover(el, id) {

  $(el).popover({
    html: true,
    placement: 'bottom',
    trigger: 'manual',
    title: 'Description',
    content: function () {
			$.get('/tasks/shortdescript/' + id, function (data) {
				$( $(el).parent().children('.popover')[0] ).find('.popover-content p').html( data );
			});
    }
  });
  
  var action;

  if ( $(el).parent('.edit-cell').children('div.popover').length === 0 ) {
    $('div.popover').hide();
    action = 'show';
  } else {
    action = 'hide';
  }

  $(el).popover(action);
}

function getDescription( id, callback ) {
  return $.get('/tasks/shortdescription/' + id, callback);
}

setTimeout(function () {
  $('#tasks').tablesorter();
}, 1000);