var SqsCommand = {
    send: function(queue,url,message,callback){
        var params = {
            MessageBody: message,
            QueueUrl: url,
            DelaySeconds: 0
        };
        queue.sendMessage(params,callback);
    }
};

module.exports = SqsCommand;

