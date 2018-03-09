var dw = $(window).width() || $("body").width();//屏幕宽度
$(function(){
//	resetIMG(".loadImg","data-srcywc");//初始加载PC图片
	hoverPopup(".DP_group",".DP_group_list");//顶部东鹏集团下拉框
	tabNav();//左侧菜单hover效果
	$(".lubo").lubo({});//调用banner轮播插件
//	imgAdapt(".lubo img");//大图自动调整居中
//	loadimg();//图片懒加载
	accordion();//样板间--手风琴展示效果
//	lazyLoad();//图片延迟加载
	tit_navTab();//样板间
	quick_links();//右栏贴边
	backTop(".return_top,.backTop")//返回顶部
	showFloor(".floor1","#fixed_floor");//滚动显示左侧栏楼层菜单
	//楼层调用插件
	scrollFloor({
		floorClass : '.scroll-floor',       //楼层盒子class;默认为'.scroll-floor'
		navClass : '.scroll-nav',           //导航盒子class;默认为'.scroll-nav'
		activeClass : 'active',             //导航高亮class;默认为'active'
		delayTime:200,                      //点击导航，滚动条滑动到该位置的时间间隔;默认为200
		activeTop:100,                      //楼层到窗口的某个位置时，导航高亮（设置该位置）;默认为100
		scrollTop:0                         //点击导航，楼层滑动到窗口的某位置;默认为100
	});
	getCity();
})

//hover弹出窗口
function hoverPopup(obj,pup){
	//移上去弹窗出现
	$(obj).mouseenter(function(){
		$(pup).show();
	});
	//离开弹窗关闭
	$(obj).mouseleave(function(){
		$(pup).hide();
	});
}

//左侧菜单hover效果
function tabNav(){
	var thisTime;
    //鼠标离开左侧内容栏
    $('.normal-nav li').mouseleave(function(even){
        thisTime = setTimeout(thisMouseOut,500);
    });
    //鼠标j进入左侧内容栏   滑动出弹层
    $('.normal-nav li').mouseenter(function(){
        $(this).addClass("selected").siblings().removeClass("selected");
        clearTimeout(thisTime);
        var thisUB = $('.normal-nav li').index($(this));
        if($.trim($('.content-con .pannel-con').eq(thisUB).html()) != ""){
            $('.content-con').addClass('active');
            $('.pannel-con').hide();
            $('.pannel-con').eq(thisUB).show();
        }else{
            $('.content-con').removeClass('active');
        }
    });
	//函数——执行鼠标离开左侧内容栏的动作
    function thisMouseOut(){
        $('.content-con').removeClass('active');
        $('.normal-nav li').removeClass('selected');
    }
    $('.content-con').mouseenter(function(){
        clearTimeout(thisTime);
        $('.content-con').addClass('active');
    });
    $('.content-con').mouseleave(function(){
        $('.content-con').removeClass('active');
        $('.normal-nav li').removeClass('selected');
    });
}
//屏幕宽度改变触发
//$(window).resize(function(){
//	var dw = $(window).width() || $("body").width();
//	if(dw >= 1200){
//		imgAdapt(".lubo img");
//	}
//});

//大图自动调整居中
//function imgAdapt(obj){
//	if(dw >= 1200){
//		var numL = (1920 - dw) / 2;
//		$(obj).css("left",- numL);
//	}
//}
/*图片初始化加载*/
//function resetIMG(obj,objImg){
//	$(obj).each(function(){
//		$(this).prop("src",$(this).attr(objImg));
//	});
//}
//图片懒加载
//function loadFn(obj) {
//	$(obj).each(function() {
//      var oT = $(this).offset().top;
//      var sT = $(window).scrollTop();
//      var cH = $(window).height();
//      if (sT + cH >= oT) {
//  		$(this).attr('isLoaded', 1).find('img').each(function(){
//      		$(this).prop("src",$(this).attr("data-srcywc"));
//      	})
//      }
//  })
//}
/*当滚轮滑动到图片时，显示图片*/
//function loadimg(){
//	loadFn('.lubo_box[isLoaded != 1]');//当不滚动时，滚动条超过图片高度时也加载图片
//	$(window).scroll(function() {
//	   loadFn('.lubo_box[isLoaded != 1]');//滚动时，超过图片高度时加载图片
//	})
//}

//样板间--手风琴展示效果
function accordion(){
	$.fn.extend({
        SFQDEMO: function(opt) {

            var opt = arguments[0] ? arguments[0] : false;
            var $button = $(this).children("li");			//容器;
            var $sec = 3000; 			//自动播放默认时间;
            var $min = $button.last().width();			//最小宽度;
            var $max = $button.first().width();			//最大宽度;
            var $index = 1;			//轮播开始索引号;

            $default = {//默认参数;
                speed: opt.speed ? opt.speed : "slow",
                by: opt.by ? opt.by : "click",
                auto: opt.auto ? opt.auto : false,
                sec: opt.sec ? opt.sec < 1000 ? 1000 : opt.sec : $sec,
                maxWidth: $max,
                minWidth: $min,
                index: $index
            };
            $button.bind($default.by, this.run).autoPlay();		//绑定事件;
        },
        run: function() {			//运行方法;
            var $obj = $(this);
            if ($obj.width() == $default.minWidth) {
                var timeDo = window.setTimeout(function() {
                    $default.index = $obj.index();
                    $obj.anim();
                }, 100);
                $obj.mouseout(function() {
                    window.clearTimeout(timeDo);
                });
            }
        },
        autoPlay: function() {		//自动播放;
            if ($default.auto) {
                var $this = $(this);
                $this.autoDo();
                $this.mouseover(function() {
                    window.clearInterval(timeL);
                });
                $this.mouseout(function() {
                    $this.autoDo();
                });
            }
        },
        autoDo: function() {	//播放方法;
            var $len = $(this).length - 1;
            var $this = $(this);
            timeL = window.setInterval(function() {
                $this.eq($default.index).anim();
                $default.index < $len ? $default.index++ : $default.index = 0;
            }, $default.sec);
        },
        anim: function() {		//动画方法;
            var $fx = function() {
                $(this).siblings("li").animate({
                    width: $default.minWidth,
                    opacity: 0.5
                }, $default.speed).css("cursor", "pointer");
                $(this).animate({
                    width: $default.maxWidth,
                    opacity: 1
                }, $default.speed).css("cursor", "default");

                $(this).siblings("li").children("div").fadeOut();
                $(this).children("div").fadeTo($default.speed, 0.7);
                $(this).dequeue();
            };
            $(this).queue($fx);
        }
    });
	var opt = {
        "speed": "normal", //变换速度,三速度可选 slow,normal,fast;
        "by": "mouseover", //触发事件,click或者mouseover;
        "auto": false, //是否自动播放;
//      "sec": 5000	 		//自动播放间隔;
    };
    $(".kt").SFQDEMO(opt);
    $(".ws").SFQDEMO(opt);
    $(".ct").SFQDEMO(opt);
    $(".cf").SFQDEMO(opt);
    $(".wsj").SFQDEMO(opt);
    $(".yt").SFQDEMO(opt);
    $(".xg").SFQDEMO(opt);
    $(".zl").SFQDEMO(opt);
    $(".sf").SFQDEMO(opt);
}
//图片延迟加载
function lazyLoad(){
	$(".DP_Floor img").lazyload({
		placeholder: "./img/HomePageImgA/loading400x400.jpg",
		effect: "fadeIn",
		threshold : 400
	});
}
//样板间
function tit_navTab(){
	$(".pt_tags .pt_tags_item").click(function(){
		var navIndex = $(this).index();
		$(".pt_tags .pt_tags_item").removeClass("active").eq(navIndex).addClass("active");
		$(".nav_con .ybj_box").hide().eq(navIndex).show();
	})
}
//右栏贴边
function quick_links(){
	$(".quick_links_panel li").mouseenter(function(){
		$(this).children(".mp_tooltip").animate({left:-92,queue:true});
		$(this).children(".mp_tooltip").css("visibility","visible");
		$(this).children(".ibar_login_box").css("display","block");
	});
	$(".quick_links_panel li").mouseleave(function(){
		$(this).children(".mp_tooltip").css("visibility","hidden");
		$(this).children(".mp_tooltip").animate({left:-121,queue:true});
		$(this).children(".ibar_login_box").css("display","none");
	});
	$(".quick_toggle li").mouseover(function(){
		$(this).children(".mp_qrcode").show();
	});
	$(".quick_toggle li").mouseleave(function(){
		$(this).children(".mp_qrcode").hide();
	});
}
//返回顶部
function backTop(target){
	$(target).on("click",function(){
		$('html,body').animate({ scrollTop:0});
	})
}
//滚动显示左侧栏楼层菜单
function showFloor(target1,target2){
	$(window).scroll(function () {
		var scrollHeight = $(document).height();
		var scrollTop = $(window).scrollTop();
		var $windowHeight = $(window).innerHeight();
		var target1H = $(target1).height();//获取滚动楼层上面的盒子高度
		scrollTop > target1H ? $(target2).fadeIn(350) : $(target2).fadeOut(350);
	});
}
//小能客服系统
//function Wopen(){
//
//  var script = document.createElement('script');
//  script.setAttribute('src', 'http://dl.ntalker.com/js/b2b/ntkfstat.js?siteid=kf_10058');
//  script.onload = function() {}
//  document.body.appendChild(script);
//}

//小能客服系统
$.ajax({
	url: "https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_10058",
	dataType: 'script',
	method:'get',
	cache: true, // 必须
	success: function() { 
		console.log('success....');
//		NTKF.im_openInPageChat('kf_10058_1508982217322');
	}
}) 
//获取当前城市
function getCity(){
	 //获取城市
    $.ajax({
		url:"https://api.map.baidu.com/location/ip?ak=rxGR5onLmC1lLOtOsxG9zfrI6rwuHYlT&coor=bd09ll",
		type:'GET',
		dataType:'JSONP',
		success:function (data) {
			//console.log(data);
			//var province = data.content.address_detail.province;
			var city = data.content.address_detail.city;
			$("#location").html(city);
		}
	});
}
