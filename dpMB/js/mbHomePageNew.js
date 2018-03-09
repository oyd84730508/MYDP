$(function() {
	setInterval('AutoScroll("#scroll-news")', 2000);
//	titleScrollNews();
	swiperImg("#swp1", "#pag1");
	swp2();
	swiperProduct();
	swiperProduct1();
	lazyLoad();
	backTop();
	schClick(".search_in,.search_in1", "#mbBox", "#mHeader-Search", "#index_newkeyword", "#dp-search");
	getCity();
	setInterval(count_Down, 50); //秒杀倒计时
	boxHeight(); //搜索动画
	
})
function browserRedirect() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	//document.writeln("您的浏览设备为：");
	if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		// document.writeln("phone");
		//根据手机屏幕的大小调整页面的大小
		$(function(){
			$(".mb-footer").css("zoom", $(window).width() / 640);
			$(".mb-footer").css("display", "block");
		});
		/*$(window).bind('load', function() {
			$("body").css("zoom", $(window).width() / 640);
			$("body").css("display", "block");
		});*/
	} else {
		//document.writeln("pc");
	}
}
browserRedirect();

//头条滚动新闻
function titleScrollNews() {
	setInterval(function() {
		$("#scroll-news").find(".news-list").animate({
			"-webkit-transform": "translate3d(0,-0.68rem,0)",
			transform: "translate3d(0,-0.68rem,0)",
		}, 500, function() {
			$(this).css({
				"-webkit-transform": "translate3d(0,0,0)",
				transform: "translate3d(0,0,0)",
			}).find("li:first").appendTo(this)
		})
	}, 2500)
}

//轮播
function swiperImg(swp, pag) {
	var mySwiper = new Swiper(swp, {
		lazyLoading: true,
		lazyLoadingInPrevNext: true,
		lazyLoadingInPrevNextAmount: 1,
		pagination: pag,
		loop: true,
		grabCursor: true,
		speed: 600,
		autoplay: 3000,
		paginationClickable: true,
		autoplayDisableOnInteraction: false //对轮播图操作后,切换是否停止。
	})
}
//
function swp2() {
	var swiper = new Swiper('#swp2', {
		lazyLoading: true,
		lazyLoadingInPrevNext: true,
		lazyLoadingInPrevNextAmount: 1,
		loop: true,
		pagination: '#pag2',
		effect: 'coverflow',
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: 'auto',
		coverflow: {
			rotate: 0, // 旋转的角度  
			stretch: 100, // 拉伸   图片间左右的间距和密集度  
			depth: 65, // 深度   切换图片间上下的间距和密集度  
			modifier: 1.5, // 修正值 该值越大前面的效果越明显  
			slideShadows: false // 页面阴影效果  
		}
	});
}
$(".HotSell-Nav li").click(function() {
	$(this).addClass("active").siblings().removeClass("active");
	$(".HotSell-Con li").siblings().removeClass("show").eq($(this).index()).addClass("show");
})
//产品左滑
function swiperProduct() {
	var swiper = new Swiper('.swp-cont', {
		lazyLoading: true,
		lazyLoadingOnTransitionStart : true,
		slidesPerView: 3.3,
		paginationClickable: true,
		freeMode: true,
		observer: true, //修改swiper自己或子元素时，自动初始化swiper  
		observeParents: true, //修改swiper的父元素时，自动初始化swiper  
	});
	$(".swp-cont").show();
}

function swiperProduct1() {
	var swiper = new Swiper('.swp-cont1', {
		lazyLoading: true,
		//		lazyLoadingOnTransitionStart : true,
		slidesPerView: 4.2,
		paginationClickable: true,
		freeMode: true,
		observer: true, //修改swiper自己或子元素时，自动初始化swiper  
		observeParents: true, //修改swiper的父元素时，自动初始化swiper  
	});
	$(".swp-cont1").show();
}
//图片延迟加载
function lazyLoad() {
	$(".box-b img").lazyload({
		effect: "fadeIn"
	});
	$(".dp-promotion-ads img").lazyload({
		effect: "fadeIn"
	});
	$(".Seckill img").lazyload({
		effect: "fadeIn"
	});
	$(".SampleCases img").lazyload({
		effect: "fadeIn"
	});
	$(".bannerAd img").lazyload({
		effect: "fadeIn"
	});
	$(".fitment img").lazyload({
		effect: "fadeIn"
	});
	$(".brand img").lazyload({
		effect: "fadeIn"
	});
	$(".TopTitle img").lazyload({
		effect: "fadeIn"
	});
}

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

//点击首页搜索框进入搜索二级页面，点击X取消搜索
function schClick(a, b, c, d, e) {
	$(a).click(function() {
		$(b).hide();
		$(c).show();
		$(d).focus();
	})
	$(e).click(function() {
		$(c).hide();
		$(b).show();
		$(d).val("");
	})
}

//获取当前城市
function getCity() {
	//获取城市
	$.ajax({
		url: "https://api.map.baidu.com/location/ip?ak=rxGR5onLmC1lLOtOsxG9zfrI6rwuHYlT&coor=bd09ll",
		type: 'GET',
		dataType: 'JSONP',
		success: function(data) {
			//console.log(data);
			//var province = data.content.address_detail.province;
			var city = data.content.address_detail.city;
			$(".location i").html(city);
		}
	});
}

function boxHeight() {
	var or_h = $("#mHeader1").outerHeight(true);
	var la_h = $("#mHeader").outerHeight(true);
	var fs = true;
	//	console.log(or_h,la_h);

	$("#mbBox").css("paddingTop", or_h);
	$("#mHeader").css("top", -la_h);

	$(window).scroll(function() {

		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollTop > 0) {
			if(fs) {

				$("#mbBox").stop(true).animate({
					"paddingTop": la_h
				}, 300);

				$("#mHeader1").stop(true).animate({
					"top": -or_h
				}, 300);

				$("#mHeader").stop(true).animate({
					"top": 0
				}, 300);

				fs = false;
			}
		} else {
			if(!fs) {

				$("#mHeader1").stop(true).animate({
					"top": 0
				}, 250);

				$("#mHeader").stop(true).animate({
					"top": -la_h
				}, 100);

				$("#mbBox").stop(true).animate({
					"paddingTop": or_h
				}, 300);

				fs = true;
			}
		}
	});
}

//秒杀倒计时检查时间补零
function checkTime(i) {
	if(i < 10) {
		i = "0" + i;
	}
	return i;
};

//秒杀倒计时
function count_Down() {
	var d = 0;
	var h = 0;
	var m = 0;
	var s = 0;

	var newTime = new Date().getTime(); //当前时间毫秒数
	var endTime = new Date("2019/1/30").getTime(); //活动结束时间毫秒数
	var time = endTime - newTime; //倒计时总时间：结束时间-当前时间

	d = Math.floor(time / 1000 / 86400); //天
	h = Math.floor((time / 1000 - d * 86400) / 3600); //时
	m = Math.floor((time / 1000 - d * 86400 - h * 3600) / 60); //分
	s = Math.floor((time / 1000 - d * 86400 - h * 3600 - m * 60)); //秒

	//	d = checkTime(d);
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	//	console.log(h,m,s)
	//将获得的“时分秒”赋值
	//	$(".count_day").text(d);
	$(".time_hour").text(h);
	$(".time_minute").text(m);
	$(".time_second").text(s);

}
//alertTips()

function alertTips() {
	alert("此供暂未开发，请敬请期待哦！");
}

//小能客服系统
$.ajax({
	url: "https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_10058",
	dataType: 'script',
	method:'get',
	cache: true, // 必须
	success: function() { 
//		NTKF.im_openInPageChat('kf_10058_1508982217322');
	}
});

function AutoScroll(obj) {
	$(obj).find("ul:first").animate({
		marginTop: "-0.36rem"
	}, 500, function() {
		$(this).css({
			marginTop: "0"
		}).find("li:first").appendTo(this);
	});
}
