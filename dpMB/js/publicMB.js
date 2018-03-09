$(function() {
	backTop();
})

function backTop() {
	//返回顶部
	$(window).scroll(function() {
		var scrollHeight = $(document).height();
		var scrollTop = $(window).scrollTop();
		var $windowHeight = $(window).innerHeight();
		scrollTop > 200 ? $(".gotop").fadeIn(200).css("display", "block") : $(".gotop").fadeOut(200).css({
			"background": "background: url(../img/mbHomeImgA/backTop.png) center no-repeat #d21e2f"
		});
	});
	$('.gotop').click(function(e) {
		$('html,body').animate({
			scrollTop: 0
		});
	});
}
