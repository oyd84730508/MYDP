
$(function(){
	
	magnifyingG();//图片放大镜
	prev_next();//焦点小图左右点击
	numAddandsub();//数量加减
	lazyLoad();//图片懒加载
	esimgshow();//评价图片
	videoplay();//视频播放
	floor();//楼层导航
	setInterval(count_Down,50);//秒杀倒计时
	Anchor(".navbtn1",".floor1");
	Anchor(".navbtn2",".floor2");
	Anchor(".navbtn3",".floor9");
	Anchor(".navbtn4",".floor10");
	Anchor(".navbtn5",".floor11");
	Anchor(".navbtn6",".floor12");
	
	
	//new three三级联动插件
	$("#city").click(function (e) {
		SelCity(this,e);
	});
	
	//分页器调用
	var setTotalCount = 301;
	$('#pageToolbar').paging({
	    initPageNo: 3, // 初始页码
	    totalPages: 30, //总页数
	    totalCount: setTotalCount + '条数据', // 条目总数
	    slideSpeed: 600, // 缓动速度。单位毫秒
	    jump: true, //是否支持跳转
	    callback: function(page) { // 回调函数
//	        console.log(page);
	    }
	})

	//小能客服系统
	$.ajax({
		url: "https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_10058",
		dataType: 'script',
		method:'get',
		cache: true, // 必须
		success: function() { 
		}
	});
	
})
	
//放大镜效果
function magnifyingG(){
	
	$("#glass_BIG img").prop("src",$(".swiper-slide img").eq(0).attr("data-src"));
	//鼠标进入出现放大镜
	$(".carousel").mouseenter(function(){
		
		$("#glass_BIG").show();
		$(".glass_move").show();
		
		var widthMove = $("#glass_BIG").width() / ($("#glass_BIG img").width() / $(this).find("img").width());
		$(this).find(".glass_move").css({
			"width":widthMove,
			"height":widthMove
		});
	});

	//鼠标离开隐藏放大镜
	$(".carousel").mouseleave(function(){
		$("#glass_BIG").hide();
		$(".glass_move").hide();
	});
	
	//鼠标移动产生放大镜效果
	$(".carousel").mousemove(function(event){
		var event = event || window.event;
		var scaleX = $("#glass_BIG img").outerWidth() / $(".swiper-container img").outerWidth();//等比例系数
		var scaleY = $("#glass_BIG img").outerHeight() / $(".swiper-container img").outerHeight();//等比例系数
		var maxW = $(this).innerWidth() - $(".glass_move").outerWidth();
		var maxH = $(this).innerHeight() - $(".glass_move").outerHeight();
		var l = event.pageX - $(this).offset().left - 1 - ($(".glass_move").outerWidth() / 2);
		var t = event.pageY - $(this).offset().top - 1 - ($(".glass_move").outerHeight() / 2);

		//碰壁检测
		if(l > maxW){
			l = maxW;
		}
		if(l < 0){
			l = 0;
		}
		if(t > maxH){
			t = maxH;
		}
		if(t < 0){
			t = 0;
		}

		$(".glass_move").css({
			"left":l,
			"top":t,
		});
		$("#glass_BIG").scrollLeft(l * scaleX);
		$("#glass_BIG").scrollTop(t * scaleY);
	});

	//切换对应的img
	$(".view-ul li").mouseover(function(){
		var indexG = $(this).index();
		$(".view-ul li").css("border-color","transparent").eq(indexG).css("border-color","#FF0036");
		$(".swiper-slide").css("z-index","0").eq(indexG).css("z-index","3");
		$("#glass_BIG img").prop("src",$(".swiper-slide img").eq(indexG).attr("data-src"));
	});
}

//焦点小图左右点击
function prev_next(){
	var liNum = $(".view-ul li").length;
	var moveLeft = 0;
	var liNumOver = liNum - 5; 
	var Mleft = $(".view-ul>li:eq(0)").outerWidth(true);
	var z = 0;
	//数量不够左右点击时
	if(liNumOver <= 0) {
		$(".sprite-arrow-prev").addClass("arrow-prev-act");
		$(".sprite-arrow-next").addClass("arrow-next-act");
	}
	//初始化按钮
	if(z <= 0) {
		$(".sprite-arrow-prev").addClass("arrow-prev-act");
		$(".sprite-arrow-next").addClass("next-hover");
	}
	//前按钮
	$(".arrow-prev").click(function(){
		z--;
		if(z >= 0){
			moveLeft += Mleft;
			$(".sprite-arrow-next").removeClass("arrow-next-act");
			$(".sprite-arrow-next").addClass("next-hover");
		}else{
			z = 0;
		}
		
		if(z <= 0) {
			$(".sprite-arrow-prev").addClass("arrow-prev-act");
			$(".sprite-arrow-prev").removeClass("prev-hover");
		}
		if(navigator.userAgent.indexOf("MSIE")>-1){
			$(".view-ul").animate({left:moveLeft},200);
		}else{
			$(".view-ul").css("left",moveLeft);
		}
	});
	//后按钮
	$(".arrow-next").click(function(){
		z++;
		if(z <= liNumOver){
			moveLeft -= Mleft;
			$(".sprite-arrow-prev").removeClass("arrow-prev-act");
			$(".sprite-arrow-prev").addClass("prev-hover");
		}else{
			z = liNumOver
		}
		if(z >= liNumOver) {
			$(".sprite-arrow-next").addClass("arrow-next-act");
			$(".sprite-arrow-next").removeClass("next-hover");
		}
		if(navigator.userAgent.indexOf("MSIE")>-1){
			$(".view-ul").animate({left:moveLeft},200);
		}else{
			$(".view-ul").css("left",moveLeft);
		}
	})
}


//验证输入数量格式
function fixedNum(obj) {
	if ($(".CP_buy_num input").hasClass("woFloor")) {
		obj.value = obj.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
		obj.value = obj.value.replace(/^\./g, ""); //验证第一个字符是数字
		obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
		obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
		obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3'); //只能输入两个小数
	} else {
		obj.value = obj.value.replace(/[^\d]/g, ""); //清除"数字"以外的字符
	}
}

//数量加减
function numAddandsub() {
	var buyNum = 1;
	$(".buy_plus").click(function(){
		if(buyNum >=1){
			$(".buy_minus").css({
				"opacity":"1",
				"filter":"alpha(opacity=100)"
			});
		}
		$(".buy_num input").prop("value",++buyNum);
	});
	
	$(".buy_minus").click(function(){
		if(buyNum <= 2){
			buyNum = 2;
			$(".buy_minus").css({
				"opacity":"0.5",
				"filter":"alpha(opacity=50)"
			});
		}
		$(".buy_num input").prop("value",--buyNum);
	});
	
	$(".buy_num input").on("input",function(){
		buyNum = $(this).prop("value");
	});
	
}

//加入购物车动画0113
function shopCatFly(){
	var offset = $("#Dcart").position();  //结束的地方的元素
	var beginSet = $(".shopcart_btn").position();//开始的地方元素
	var img = $(".carousel .swiper-slide img").eq(0).attr('src');
	var flyer = $('<img class="u-flyer" src="'+img+'">');
	flyer.fly({
		start: {
			left: beginSet.left - $(document).scrollLeft() + 10,
			top: beginSet.top - $(document).scrollTop() - 10,
		},
		end: {
			left: offset.left+450,
			top: offset.top+10,
			width: 0,
			height: 0
		},
		onEnd: function(){
			$(".msg").show().stop(true).animate({width: '250px'}, 200).fadeOut(1500).animate({width: '0px'}, 200);
		}
	});
}

//图片延迟加载
function lazyLoad(){
	$(".m-aside img").lazyload({effect: "fadeIn",threshold:50});//左侧图片懒加载
	$(".m-list img").lazyload({effect: "fadeIn",threshold:50});//列表图片懒加载
	$(".main-left img").lazyload({effect: "fadeIn",threshold:50});//列表图片懒加载

}

/*楼层导航*/
function floor() {
   var navBox = $('#fixed_floor');//导航容器
   var navLi = navBox.find('.floor-nav>li');//导航btn
   var floorBox = $('.scroll-floor');//楼层容器
   var show_h= $(".details_nav_tit").offset().top-200;//显示导航时的高度
   
// console.log(navLi.length,floorBox)

	$(window).scroll(function(){
		 var winH = $(window).height();//可视窗口高度
		 var iTop = $(window).scrollTop();//鼠标滚动的距离
		 
		 if(iTop >= show_h){
		 	navBox.fadeIn();
		 	
		 	//鼠标滑动式改变	
			 floorBox.each(function(){
			 	if(winH + iTop - $(this).offset().top > winH/2 + 300){
//			 		navLi.removeClass('out_active');
			 		navLi.eq($(this).index()).addClass('out_active').siblings().removeClass('out_active');
			 	}
			 })
			 
		 }else{
		 	navBox.fadeOut();
		 }
	})
	
	//点击回到当前楼层
	navLi.on("click",function(){
//		console.log($(this).index())
		var t = floorBox.eq($(this).index()).offset().top;
		$('body,html').stop(true).animate({"scrollTop":t},500);
		$(this).addClass('out_active').siblings().removeClass('out_active');
	});
	
}

//评价点击图片放大
function esimgshow() {
	$(".right_smallshow li").on("click",function(){
		$(this).addClass("show_act").siblings().removeClass("show_act");
		$(this).parent(".right_smallshow").siblings(".right_bigshow").find("img").prop("src",$(this).find("img").prop("src"));
	})
}

//产品介绍视屏播放
function videoplay() {
	var vid= $('#vid').get(0);
	//播放
	$(".video_play_btn").on("click",function(){
		$(".video_box").show();
		$("#vid").prop("src",$("#vid").attr("data-url"));
		vid.play();
	})
	//暂停
	$(".close_video").on("click",function(){
		$(".video_box").hide();
		vid.pause();
	})
	//结束状态
	vid.addEventListener("ended", function() {
		$(".video_box").hide();
		this.webkitExitFullScreen();//退出全屏
	});
/*	//播放状态
	vid.addEventListener('play',function(){  
	    $("#vid").click(function(){
	    	vid.pause();
	    })
	})  
	//暂停状态
	vid.addEventListener('pause',function(){  
	    $("#vid").click(function(){
	    	vid.play();
	    })
	}) */
}

//评价锚点
function Anchor(obj,target){
	$(obj).click(function(){
		$('html,body').stop(true).animate({scrollTop:$(target).offset().top}, 500);
		$(this).addClass('nav_active').siblings().removeClass('nav_active');
	});
}

//秒杀倒计时检查时间补零
function checkTime(i) {
  	if (i<10) {
    	i = "0" +i;
  	}
  	return i;
};

//秒杀倒计时
function count_Down(){
	var d = 0;
	var h = 0;
	var m = 0;
	var s = 0;
	
	var newTime = new Date().getTime();//当前时间毫秒数
	var endTime = new Date("2018/1/30").getTime();//活动结束时间毫秒数
	var time = endTime - newTime;//倒计时总时间：结束时间-当前时间
	
	d = Math.floor(time/1000/86400);//天
	h = Math.floor((time/1000-d*86400)/3600);//时
	m = Math.floor((time/1000-d*86400-h*3600)/60);//分
	s = Math.floor((time/1000-d*86400-h*3600-m*60));//秒
	
	d = checkTime(d);
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	//将获得的“时分秒”赋值
	$(".count_day").text(d);
	$(".count_hour").text(h);
	$(".count_minute").text(m);
	$(".count_second").text(s);
	
}

