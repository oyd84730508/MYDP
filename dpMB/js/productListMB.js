$(function() {
	lazyLoad();
})
//图片延迟加载
function lazyLoad(){
	$(".pd-list-ul img").lazyload({
		effect: "fadeIn",
		threshold:50
	});
}

$(".new-search-tab li").click(function(){
	$(this).addClass("active").siblings().removeClass("active");
})
$(".new-search-tab1 li").click(function(){
	$(".mask").show();
	$(this).addClass("act").siblings().removeClass("act");
})
$(".mask").click(function(){
	$(".mask").hide();
	$(".act").removeClass("act");
})

$(".sx").click(function(){
	$(".right-pannel").show();
})
$(".right-pannel").click(function(){
	$(".right-pannel").hide();
//	$(".right-pannel-in").scrollTop(0);
	$('.right-pannel-in').stop(true).animate({scrollTop:0},400);

})
//取消冒泡
$(".right-pannel-in").on("click",function(event){
	if ( event && event.stopPropagation ){
		event.stopPropagation();
	}else{
		window.event.cancelBubble = true;
		return false;
	}
})
$(".index-bnts").on("click",function(event){
	if ( event && event.stopPropagation ){
		event.stopPropagation();
	}else{
		window.event.cancelBubble = true;
		return false;
	}
})
//$(".right-pannel-in").on("touchstart",function(){
//	if ( event && event.stopPropagation ){
//		event.stopPropagation();
//	}else{
//		window.event.cancelBubble = true;
//		return false;
//	}
//})
//$(".right-pannel-in").on("touchend",function(){
//	if ( event && event.stopPropagation ){
//		event.stopPropagation();
//	}else{
//		window.event.cancelBubble = true;
//		return false;
//	}
//})
/*筛选更多按钮*/
$(".pannel-list-w h3").click(function(){
	if($(this).find(".sel-more").attr("data-more") ==0){
		$(this).find(".sel-more").attr("data-more","1");
		$(this).parents(".pannel-list-w").find(".selBox").slideDown();
		$(this).find(".sel-more").css({"transform":"rotateZ(-90deg)"});
	}else{
		$(this).find(".sel-more").attr("data-more","0");
		$(this).parents(".pannel-list-w").find(".selBox").slideUp();
		$(this).find(".sel-more").css({"transform":"rotateZ(90deg)"});
	}
	
})

$(".MB-sel span").click(function(){
	if($(this).hasClass("s_active")){
		$(this).removeClass("s_active");
	}
	else{
		$(this).addClass("s_active");
	}
})
$(".a-con span").click(function(){
	$(this).addClass("sel");
})

//点击加载更多
function setDiv(){
	for(var i = 0;i<3;i++){
		var morehtml = '<li class="pd-list-li">'+
		    			'<a href="" class="clearfix">'+
		    				'<div class="product-img">'+
		    					'<img data-original="img/productListMB/pd-img.jpg"/>'+
			    			'</div>'+
			    			'<div class="product-info-box">'+
			    				'<div class="product-name">商品标题商品标题商品标题商品标题</div>'+
			    				'<div class="product-price-m">'+
			    					'<span class="product-price">&yen;<b>184.00</b></span>'+
			    				'</div>'+
			    				'<div class="product-counter-price"><span>专柜价：&yen;1184.00</span><span><i>折扣券</i></span><span><i>满减</i></span></div>'+
			    				'<div class="gray-pro-info"><b>200+</b>条评价</div>'+
			    			'</div>'+
		    			'</a>'+
		    		'</li>';
		console.log(morehtml);
		$(".pd-list-ul").append($(morehtml));
		lazyLoad();
	}	
}
