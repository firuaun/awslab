(function(){
	var elem = null;
	function progressbarLoading(progress){
		progress.parent().show();
		var load = 0;
		progress.width(load);
		var interval = setInterval(function(){
			load = (load+10)%101;
			progress.width(load+"%");
		},400);
		return {
			stop: function(){
				clearInterval(interval);
				progress.parent().hide();
			}
		};
	}
	$('#bucket-objects').children().click(function(){
		var interval = progressbarLoading($('#progress-bar'));
		if(elem)
			elem.removeClass('active');
		elem = $(this).addClass('active');
		$('.tab-pane').fadeOut(function(){
			$(this).empty().fadeIn();
		});
		var bucket = elem.data('bucket');
		var key = elem.data('key');
		$.post('/s3get',{bucket:bucket,key:key},function(data){
			interval.stop();
			$('<img>',{src:data.url}).appendTo($('#preview').empty());
		})
	});
})();