'use strict';

/*global $:false */

function openTask (taskId) {
  document.location.href = "/tasks/" + taskId;
}

function selectOption (fieldName, valueToSelect) {
  $("select[name='" + fieldName + "']").val(valueToSelect);
}

function showPopover(el, status, id) {
  $(el).popover({
    html: true,
    placement: 'bottom',
    trigger: 'manual',
    title: 'Description',
    content: function () {
			$.get('/tasks/shortdescript/' + id, function (data) {
				$( $(el).parent().children('.popover')[0] ).find('.popover-content p').html(
					'Status: ' + status + '<br/><br/>' +	data
				);
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

function toggleStatus(el, id) {
	$.post('/tasks/togglestatus/' + id, function () {
		$.get('/tasks/' + id + '.json', function (data) {
				$(el).parent().parent().replaceWith(
					$('#taskTemplate').render( JSON.parse(data) )
				);
		});
	});
}

function getDescription( id, callback ) {
  return $.get('/tasks/shortdescription/' + id, callback);
}

setTimeout(function () {
  $('#tasks').tablesorter();

  $('i').click(function () {
		var self = this;
		if ( $(this).hasClass('icon-chevron-down') ) {
			$(this).addClass('icon-chevron-up')
				.removeClass('icon-chevron-down');
		}

		$('i.icon-chevron-up').each(function (index) {
			if ( self !== this ) {
				if ( $(this).hasClass('icon-chevron-up') ){
					$(this).addClass('icon-chevron-down')
						.removeClass('icon-chevron-up');
				}
			}
		});
  });
}, 1000);