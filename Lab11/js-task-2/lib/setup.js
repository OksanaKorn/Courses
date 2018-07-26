var __ = "incomplete";

$(function() {
  QUnit.config.reorder = false;
  QUnit.config.hidepassed = true;

  QUnit.done(function(results) {
    var failures = results.failed;
    var total = results.total;
    if (failures > 0) {
      var failed = $('ol#qunit-tests > li.fail');
      failed.hide();

      var $firstFailed = $(failed[0]);

      $firstFailed.find('.qunit-assert-list').addClass('qunit-collapsed');

      $(failed[0]).show();

      if(failures < total) {
        $('.welcome-message').hide();
      }
    }
  });
});
