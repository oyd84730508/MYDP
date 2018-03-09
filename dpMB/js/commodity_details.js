$(function(){
	backTop();//返回顶部
	btnclick();//按钮点击事件
	swiper1();//商品、详情、评价切换
	swiper2();//产品图片轮播
	setInterval(count_Down,50);//秒杀倒计时
	item_mask(".z_item1",".item_mask,.z_close1",".inner1");//弹出层
	item_mask(".z_item2",".item_mask,.z_close2",".inner2");
	Cancelbubble();//取消冒泡及自定义滚动条
	numAddandsub();//数量加减
	proSelect();//商品选择
	lazyLoad();//图片懒加载
	inner3();//商品选择规格、颜色弹窗
	
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


//返回顶部
function backTop() {
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		scrollTop > 200 ? $(".gotop").fadeIn(200).css("display", "block") : $(".gotop").fadeOut(200);
	});
	$('.gotop').click(function(e) {
		$('html,body').animate({
			scrollTop: 0
		});
	});
}

//商品、详情、评价切换
var mySwiper1;
function swiper1() {
	mySwiper1 = new Swiper ('#container1', {
	    direction: 'horizontal',//方向
	    pagination: '#pagination1',//标签目标
		paginationClickable: true,//点击分页控制轮播
		speed:600,
		autoHeight: true,
		initialSlide : 0,
		paginationElement : 'li',
		//自定义分页器
/*		paginationBulletRender: function (swiper, index, className) {
			var arr = ["商品","详情",'评价']; 
		    return '<li class="' + className + '"><i>'+ arr[index] + '</i></li>';
		},*/
		//分页生成时回调
		onPaginationRendered:function(swiper, paginationContainer){
			$(".head_tab li").on("click",function(){
				headevent();
			})
			$("#pagination1").find("li").eq(0).append("<i>商品</i>");
			$("#pagination1").find("li").eq(1).append("<i>详情</i>");
			$("#pagination1").find("li").eq(2).append("<i>评价</i>");
	   	},
	   	
	   	//过渡开始时回调
	   	onTransitionStart: function(swiper){
	   		headevent();
       	},
       	
       	onSlideChangeEnd: function(swiper){
       		
        }
  	})   
  	/*跳到商品详情*/
  	$(".part_details_more").on("click",function(){
		mySwiper1.slideTo(1,600,false);
		headevent();
  	})
  	/*跳到更多评价*/
  	$(".evaluate_num,.part_eval_title,.part_eval_more").on("click",function(){
  		mySwiper1.slideTo(2,600,false);
  		headevent();
  	})
}

//切换滑动顶部和隐藏二级菜单
function headevent(){
	$('html,body').scrollTop(0);
	$(".head_menu").addClass("menu_act");
}
//商品图片轮播
function swiper2() {
	var client=$(document.body)[0].clientWidth;  
  	var mySwiper2 = new Swiper ('#container2', {
    	direction: 'horizontal',
    	pagination: '#pagination2',
    	paginationType : 'fraction',
    	speed:500,
    	autoHeight: true,
    	onTouchMove: function(swiper){
	       	var dis = client*($('.product_show .swiper-slide').length-1)+80; 
	        var TR = swiper.translate;  
	        if(TR+dis < 0){  
				$(".view_the_details i").addClass("view_icon");
	     	}else {
	     		$(".view_the_details i").removeClass("view_icon");
	     	}
	    },
	 	onTouchEnd: function(swiper){  
	        var dis = client*($('.product_show .swiper-slide').length-1)+80; 
	        var TR = swiper.translate;  
	        if(TR < -dis){  
	        	swiper.setWrapperTranslate(TR);  
	        	mySwiper1.slideTo(1,600,false); 
	     	};  
	   	}  
  	})   
}


//图片延迟加载
function lazyLoad(){
	$(".part_eval_content img").lazyload({effect: "fadeIn",threshold: 50});
	$(".evaluation_content img").lazyload({effect: "fadeIn",threshold: 50});
	$(".commodity_infor_box img").lazyload({effect: "fadeIn",threshold: 50});
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
	var endTime = new Date("2018/1/01").getTime();//活动结束时间毫秒数
	var time = endTime - newTime;//倒计时总时间：结束时间-当前时间
	
	d = Math.floor(time/1000/86400);//天
	h = Math.floor((time/1000-d*86400)/3600);//时
	m = Math.floor((time/1000-d*86400-h*3600)/60);//分
	s = Math.floor((time/1000-d*86400-h*3600-m*60));//秒
	
//	d = checkTime(d);
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	//将获得的“时分秒”赋值
//	$(".count_day").text(d);
	$(".count_hour").text(h);
	$(".count_minute").text(m);
	$(".count_second").text(s);
}

/*商品选择-弹出层*/
function item_mask(open,close,show) {
	$(open).on("click",function(){
		$(".item_mask").show().find(show).stop(true).animate({"height":"70%"},400);
	})
	
	$(close).on("click",function(){
		$(show).stop(true).animate({"height":"0"},400,function(){
			$(this).parents(".item_mask").fadeOut("fast");
		});
		
		$('.coupons_ul').stop(true).animate({scrollTop:0},400);//优惠券回顶
		
	})
}

/*商品选择-单独*/
function inner3() {
	$(".z_item3 ").on("click",function(){
		$(".item_mask").show().find(".inner3").stop(true).animate({"height":"73%"},400);
		$(".add_buy").show();
	})
	$(".item_mask,.z_close3").on("click",function(){
		$(".inner3").stop(true).animate({"height":"0"},400,function(){
			$(this).parents(".item_mask").fadeOut("fast");
			$(".add_buy").hide();
		});
		
		$(".selected_p").text($(".sel_seled").text());//产品选择信息同步
	})
}

//领取优惠券取消冒泡
function Cancelbubble(){
	//取消冒泡
	$(".mask_inner").on("click",function(event){
		if ( event && event.stopPropagation ){
			event.stopPropagation();
		}else{
			window.event.cancelBubble = true;
			return false;
		}
	})
	//取消滚动
/*	$(".item_mask").on("touchmove",function(event){
		if(event.prevenDefault) {
			event.prevenDefault();
		}
		return false;
	});*/
	
}

//商品选择
function proSelect() {
	$(".sel_color a").on("click",function(){
		$(this).addClass("z_color").siblings().removeClass("z_color");//选中加样式
		$(".pro_img img").prop("src",$(this).attr("data-img"));//更换图片
		$(".pro_je").text($(this).attr("data-price"));//更换价格
		$(".change_color").text($(this).text());//更换已选内容
	})
	$(".sel_size a").on("click",function(){
		$(this).addClass("z_size").siblings().removeClass("z_size");//选中加样式
		$(".change_size").text($(this).text());
	})
}

//验证输入数量格式
function fixedNum(obj) {
	obj.value = obj.value.replace(/[^\d]/g, ""); //清除"数字"以外的字符
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
		$(".buy_num").prop("value",++buyNum);
		$(".proNum").text(buyNum);
	});
	
	$(".buy_minus").click(function(){
		if(buyNum <= 2){
			buyNum = 2;
			$(".buy_minus").css({
				"opacity":"0.5",
				"filter":"alpha(opacity=50)"
			});
		}
		$(".buy_num").prop("value",--buyNum);
		$(".proNum").text(buyNum);
	});
	
	$(".buy_num").on("input",function(){
		buyNum = $(this).prop("value");
		$(".proNum").text(buyNum);
	});
}

//默认调用省市区
!function () {
	var $target = $('.z_item4');

	$target.citySelect();

	$target.on('click', function (event) {
		event.stopPropagation();
		$target.citySelect('open');
	});

	$target.on('done.ydui.cityselect', function (ret) {
		$(this).find("#J_Address").val(ret.provance + ' ' + ret.city + ' ' + ret.area);
	});
	
}();

//按钮点击事件
function btnclick(){
	//头部二级菜单按钮
	$(".head_icon").on("click",function(){
		$(".head_menu").toggleClass("menu_act");
	})
	
	//好评、中、差评按钮
	$(".evalua_klass span").on("click",function(){
		$(this).addClass("klass_act").siblings().removeClass("klass_act");
	})
	
	//商品介绍、规格、保障按钮
	
	$(".infor_tit span").on("click",function(){
		$(this).addClass("infor_act").siblings().removeClass("infor_act");
		$(".infor_item").eq($(this).index()).addClass("item_act").siblings().removeClass("item_act");
		
		$("#container1 .swiper-wrapper").height($(".commodity_infor_box").height());//设置高度
	})
	
	//收藏按钮
	$(".collect").on("click",function(){
		$(this).find("i").toggleClass("collect_act");
	})
	
	//领取优惠券按钮
	$(".li_value6").on("click",function(){
		$(this).hide().parent("li").find(".li_value4 ").show();
	})

}

