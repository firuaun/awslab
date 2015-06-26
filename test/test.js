var assert = require('assert');
var order = require('../actions/order')

describe("awslab project test",function(){
    it("order should have action",function(){
        assert.equal(order.action instanceof Function, true, "typeof order action: "+ typeof order.action);
    });
});