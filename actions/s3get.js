var AWS = require("aws-sdk");
var AWS_CONFIG_FILE = "config.json";
AWS.config.loadFromPath(AWS_CONFIG_FILE);

var task = function(request,response) {
		var s3 = new AWS.S3();
		var params = {
			Bucket: request.body.bucket,
			Key: request.body.key
		};
		s3.getObject(params,function(err, data){
            response(null,{
                    data: data,
                    url: s3.getSignedUrl('getObject', params)
                });
        });
};

exports.action = task;