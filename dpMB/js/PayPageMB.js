$(function(){

	//判断微信端隐藏支付宝支付，web端浏览器隐藏微信支付
	var ua = navigator.userAgent.toLowerCase();

    if(ua.match(/MicroMessenger/i)=="micromessenger") { 
    	$("#PayZfb").hide();
    	$("#PayWx").show();
    } else{
    	$("#PayWx").hide(); 
	    $("#PayZfb").show();
    }
})