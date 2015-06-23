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
		$('.tab-pane.active:not(#operations) div').fadeOut(function(){
			$(this).empty().fadeIn();
		});
		var bucket = elem.data('bucket');
		var key = elem.data('key');
		$.post('/s3get',{bucket:bucket,key:key},function(data){
			interval.stop();
			$('<img>',{src:data.url}).appendTo($('#preview div').empty());
			var metadataElem = null;
			data = data.data;
			var info = $('<dl>',{class:'dl-horizontal'}).appendTo($('#info  div').empty());
			info.append($('<dt>',{text:'Last modified:'}))
			.append($('<dd>',{text:data.LastModified}))
			.append($('<dt>',{text:'ETag:'}))
			.append($('<dd>',{text:data.ETag}))
			.append($('<dt>',{text:'Size:'}))
			.append($('<dd>',{text:data.ContentLength+' '+data.AcceptRanges}))
			.append($('<dt>',{text:'Metadata:'}))
			.append((metadataElem = $('<dd>',{html:'&nbsp;'})));
			var list = $('<dl>',{class:'dl-horizontal'});
			data.Metadata ? Object.keys(data.Metadata).forEach(function(key){
				list.append($('<dt>',{text:key})).append($('<dd>',{text:data.Metadata[key]}));
			}) : null;
			list.appendTo(metadataElem);
		})
	});
	function serializeForm(formElem){
		var obj = {};
		for(var i=0, l= formElem.length; i < l; i++){
			if(formElem[i].type !== "submit") {
				obj[formElem[i].name] = formElem[i].value;
			}
		}
		return obj;
	}
	$('#do-form').on('submit',function(e){
		e.preventDefault();
		if(!elem)
			return;
		var formData = serializeForm(this);
		formData['bucket'] = elem.data('bucket');
		formData['key'] = elem.data('key');
		console.log(formData);
		$.post(this.action, formData ,function(result){
			console.log(result);
		});
	});
})();