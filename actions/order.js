var task = function(request, response) {
	var params = request.body;
	response(null,{"msg":"soon"});	
};

exports.action = task;