$(function(){
	touch();/*点赞*/
	backtop();/*返回顶部*/ 
	getNumber();//获取点赞数量
	mask();/*点击查看大图*/
})

/*点赞*/
function touch() {
	$(".like").on("click",function(){
		if($(this).hasClass('like-onclick')) {
	        return;
	    }else {
	    	$(this).addClass("like-onclick");
	    	addPraise();
	    	return false;
	    }
	});
}

/*返回顶部*/ 
function backtop() {
	$(".backtop").on("click",function(){
		$(document).scrollTop(0);
	});
}

/*点击查看大图*/
function mask() {
	$(".product").on("click",function(){
		var src = $(this).find("img").attr("src");
		$(".mask").show().find("img").attr("src",src);
		$(".mask").on("click",function(){	
			$(this).hide();
		})
	})
}

//获取点赞数量
function getNumber() {
	var href = document.location.href;
	var id = $("#code").val();
	$.ajax({
		url: "/promotions/getDpProductIntroductionForUrl",
		type: "GET",
		data: {
			url: href,
			id: id,
		},
		success: function(data) {
			$(".number").html(data);
		},
	});
}

//点赞
function addPraise() {
	var href = document.location.href;
	var id=$("#code").val();
	$.ajax({
		url: "/promotions/saveDpProductIntroduction",
		type: "GET",
		data: {
			url: href,
			id: id,
		},
		success: function(data) {
			$(".number").text(data);
		},
	});
} 



