
var dw = $(window).width() || $("body").width();

$(function(){
	$(window).scroll(function () {
		var scrollHeight = $(document).height();
		var scrollTop = $(window).scrollTop();
		var $windowHeight = $(window).innerHeight();
		scrollTop > 150 ? $("#floor").fadeIn(200) : $("#floor").fadeOut(200);
	});
	//返回顶部
	$("#backTop").on("click",function(){
		$('html,body').animate({ scrollTop:0});
	})
	hoverTop();//顶部菜单hover效果
	floorHover();//右侧楼层
	menuNavHover();//头部导航栏hover效果
	/*头部轮播*/
	mySwiper1();
	mySwiper2();
	mySwiper3();
	template();/*精选样板房*/
	cases();/*精选案例*/
	build();/*建材馆*/
	tabbtn(".cases-tab","tab-act",".selected-cases",".cases-contbox",".thecont","cont-act");
	tabbtn(".bui-tab","buiact",".build-cate",".build-showbox",".theshow","showact");
	loadimg();/*图片懒加载*/
	Free();//底部留资
	wechat();
	freeReserva1(".freebox,.DPbox li,.fiveSquare");//免费预约

    $.ajax({
        url:"/appointNumber",
		type:"get",
		success:function(data){
        	$(".addnumber").html(data);
		}
	});
	
})

//顶部菜单hover效果
function hoverTop(){
	$("li.topMenu").hover(function(){
		$(this).addClass("onClass");	
		$(this).find("ul").slideDown(200);
	},function(){
		$(this).removeClass("onClass");
	 	$(this).find("ul").hide();
	})
}

/*头部轮播*/
function mySwiper1(){
	var mySwiper1 = new Swiper('.swiper-container1',{
		pagination: '.pagination1',
		loop:true,
		speed:600,
		autoplay : 3000,  
		paginationClickable: true,
		autoplayDisableOnInteraction:false//对轮播图操作后,切换是否停止。
	  })
	  $('.arrow-prev1').on('click', function(e){
	    e.preventDefault()
	    mySwiper1.swipePrev()
	  })
	  $('.arrow-next1').on('click', function(e){
	    e.preventDefault()
	    mySwiper1.swipeNext()
	  })
}
//每周特惠
function mySwiper2(){
	var mySwiper2 = new Swiper('.swiper-container2',{
		loop:true,
	    grabCursor: true,
	    paginationClickable: true
	  })
	  $('.arrow-prev2').on('click', function(e){
	    e.preventDefault()
	    mySwiper2.swipePrev()
	  })
	  $('.arrow-next2').on('click', function(e){
	    e.preventDefault()
	    mySwiper2.swipeNext()
	  })
}
//限时特惠
function mySwiper3(){
	var mySwiper3 = new Swiper('.swiper-container3',{
		loop:true,
	    grabCursor: true,
	    paginationClickable: true
	  })
	  $('.arrow-prev3').on('click', function(e){
	    e.preventDefault()
	    mySwiper3.swipePrev()
	  })
	  $('.arrow-next3').on('click', function(e){
	    e.preventDefault()
	    mySwiper3.swipeNext()
	  })
}

//右侧楼层


//头部导航栏hover效果
function menuNavHover(){
	$('.allGoods').hover(function () {
		$(".menuNav1").show();
		$('.menuNav1_ul li').siblings().removeClass("N_Li_on");
	},function(){
		$(".menuNav1").hide();
		$('.menuNav2 ul').hide();
	});
	
	$(".menuNav1_ul li").hover(function () {
		var indexLi = $(this).index();
		$('.menuNav1_ul li').eq(indexLi).addClass("N_Li_on").siblings().removeClass("N_Li_on");
		$('.menuNav2 ul').eq(indexLi).show().siblings().hide();
	},function(){
		
	});
}

/*精选样板房*/
function template() {
	/*大图悬浮*/
	$(".model-show").hover(function(){
		$(this).find(".model-mess").stop().fadeIn();
	},function(){
		$(this).find(".model-mess").stop().fadeOut();
	});
	/*样板房悬浮*/
	$(".thelis").on("mouseenter",function(){
		var src = $(this).find("img").attr("data-big");
		var tet = $(this).find("p").text();
		var tname1 = $(this).find("p").find("i:eq(1)").text();
		var tname2 = $(this).find("p").find("i:eq(2)").text();
		var href = $(this).find("a").attr("href");
		$(".model-show").find("img").attr("src",src);
		$(".tag-name,.mess-tag").text(tet);
		$(".tname1").text(tname1);
		$(".tname2").text(tname2);
		$(".model-mess").find("a").attr("href",href);
	})
}

/*精选案例*/
function cases() {
	$(".cont").hover(function(){
		$(this).find(".dils-act").stop(true).animate({"bottom":"0px"},200);
	},function(){
		$(this).find(".dils-act").stop(true).animate({"bottom":"-41px"},200);
	})
}


/*建材馆*/
function build() {
	$(".sbox").hover(function(){
		$(this).find(".sb-img").stop(true).animate({"right":"25px"},300)
	},function(){
		$(this).find(".sb-img").stop(true).animate({"right":"15px"},300)
	})
}

/*tab切换*/
function tabbtn(par,btncla,bigbox,showbox,obj,objcla) {
	$(par).find("span").click(function(){
		$(this).addClass(btncla).siblings().removeClass(btncla);
		$(this).parents(bigbox).find(showbox).find(obj).eq($(this).index()).addClass(objcla).siblings().removeClass(objcla);
		$(this).parents(bigbox).find(showbox).find(obj).eq($(this).index()).find("img").each(function(){
				$(this).prop("src",$(this).attr("data-srcywc"));
		})
	})
}
/*活动块加载图片函数*/
function loadFn(obj) {
	/*除了家装服务模块，所有show-active活动块的图片加载*/
	$(obj).each(function() {
        var oT = $(this).offset().top;
        var sT = $(window).scrollTop();
        var cH = $(window).height();
        if (sT + cH >= oT) {
    		$(this).attr('isLoaded', 1).find('img').each(function(){
        		$(this).prop("src",$(this).attr("data-srcywc"));
        	})
        }
    })
}

/*当滚轮滑动到图片时，显示图片*/
function loadimg(){
	loadFn('.index_floor[isLoaded != 1]');
   	loadFn('.template[isLoaded != 1]');//当不滚动时，滚动条超过图片高度时也加载图片
   	loadFn('.cont-act[isLoaded != 1]');
   	loadFn('.showact[isLoaded != 1]');
   	loadFn('.swiper-container1[isLoaded != 1]');
	$(window).scroll(function() {
    	loadFn('.index_floor[isLoaded != 1]');
	   	loadFn('.template[isLoaded != 1]');//滚动时，超过图片高度时加载图片
	   	loadFn('.cont-act[isLoaded != 1]');
	   	loadFn('.showact[isLoaded != 1]');
	   	loadFn('.swiper-container1[isLoaded != 1]');
	})
}

/*底部二维码效果*/
function wechat(){
	$(".foot-dd").hover(function(){
		$(this).find("img").stop(true).show(200);
	},function(){
		$(this).find("img").stop(true).hide(200);
	})
}

/*底部动画函数*/
function animate(from, to, left) {
	var length = from.outerWidth();
	from.animate({ "left": "-=" + length }, 200, function() {
		to.animate({ "left": left }, 800);
	});
}


/*底部点击*/
function Free(){
	$(".Free-booking .close-btn").click(function(event) {
		animate($(".Free-booking"), $(".Eject-btn"), 0);
	});
	$(".Eject-btn").click(function(event) {
		animate($(".Eject-btn"), $(".Free-booking"), 0);
	});
		
	$(".submit-btn").on("click",function(){
		var source = $("#source").val();
		var name = $("#pname").val();
	    var number =$("#number").val();
	    var region = $("#province3").val();
	    var city = $("#city3").val();
	    var pageSource= "新商城首页";
	    var urlPath=location.href;
	    if(name.length == 0){
			alert("请输入姓名");
		}
		else if(!(/^1[34578]\d{9}$/.test(number))){
			alert("手机号码有误，请重填");
		}
		else{
	    $.ajax({
//	        url:  "/decrationTeam/saveAppoint",
			url: location.protocol+"//"+location.hostname+"/decrationTeam/saveAppoint",
	        type: "GET",
	        data:{name:name,callNumber:number,region:region,city:city,source:source,ConsultationSource:ConsultationSource,pageSource:pageSource,urlPath:urlPath},
	        success: function(msg) {
        		var appointInitNumber = Number($('.addnumber').text());
                $('.addnumber').text(appointInitNumber+1);
	        	$(".Free-reservation").show();
				$(".free-one").hide();
				$(".free-two").show();
    			$("#pname").val("");
	    		$("#number").val("");
	        },
	        error: function() {
	          alert("错误,请刷新页面重试！");
	        }
	    });
		}
	})	
	$(".two-del").click(function() {
		animate($(".Free-booking"), $(".Eject-btn"), 0);
		$(".Free-reservation").hide();
		$(".free-one").hide();
		$(".free-two").hide();
	})
}

/*免费预约弹出框*/
function freeReserva1(obj){
	$(obj).click(function(){
		$(".Free-reservation").show();
		$(".free-one").show();
	})
	$(".one-del").click(function(){
		$(".Free-reservation").hide();
		$(".free-one").hide();
	})
	
	$(".one-sure").on("click",function(){
		var source = $("#source1").val();
		var name = $("#pname1").val();
	    var number =$("#number1").val();
	    var region = $("#province4").val();
	    var city = $("#city4").val();
	    var pageSource= "新商城首页";
	    var urlPath=location.href;
	    if(name.length == 0){
			alert("请输入姓名");
		}
		else if(!(/^1[34578]\d{9}$/.test(number))){
			alert("手机号码有误，请重填");
		}
		else{
	    $.ajax({
//	        url:  "/decrationTeam/saveAppoint",
			url: location.protocol+"//"+location.hostname+"/decrationTeam/saveAppoint",
	        type: "GET",
	        data:{name:name,callNumber:number,region:region,city:city,source:source,ConsultationSource:ConsultationSource,pageSource:pageSource,urlPath:urlPath},
	        success: function(msg) {
	        	var appointInitNumber = Number($('.addnumber').text());
                $('.addnumber').text(appointInitNumber+1);
                
	        	$(".free-two").show();
    			$("#pname1").val("");
	    		$("#number1").val("");
	        },
	        error: function() {
	          alert("错误,请刷新页面重试！");
	        }
	    });
		}
	})	
	
	$(".two-del").click(function(){
		$(".Free-reservation").hide();
		$(".free-two").hide();
	})
	$(".pro-a").click(function(){
		$(".Free-reservation").show();
		$(".free-one").show();
	})
}
/*屏幕宽度改变触发*/
//$(window).resize(function(){
//	dw = $(window).width() || $("body").width();
//	if(dw >= 1200){
//		imgAdapt("#slider-wrap");
//	}
//});
//
///*头部轮播大图自动调整居中*/
//function imgAdapt(obj){
//	var numL = (1920 - dw) / 2;
//	$(obj).css("left",- numL);
//}

//live88聊天窗口居中显示
function Wopen(){
	var openUrl = "https://chat16.live800.com/live800/chatClient/chatbox.jsp?companyID=728834&configID=149755&jid=1778562220&enterurl=https%3A%2F%2Flocalhost%3A9002%2F%3Fclear%3Dtrue%26site%3Ddongpeng&skillId=5782&pagetitle=%E4%B8%9C%E9%B9%8F%E5%95%86%E5%9F%8E-%E4%B8%80%E7%AB%99%E5%BC%8F%E5%AE%B6%E8%A3%85%E5%BB%BA%E6%9D%90%E8%B4%AD%E7%89%A9%E5%B9%B3%E5%8F%B0%EF%BC%8C%E5%93%81%E7%B1%BB%E9%BD%90%E5%85%A8%EF%BC%8C%E6%AD%A3%E5%93%81%E4%BF%9D%E8%AF%81%E3%80%82&pagereferrer=https%3A%2F%2Flocalhost%3A9002%2F%3Fclear%3Dtrue%26site%3Ddongpeng&firstEnterUrl=https%3A%2F%2Flocalhost%3A9002%2F%3Fclear%3Dtrue%26site%3Ddongpeng&lan=zh&s=1";//弹出窗口的url
	var iWidth=800; //弹出窗口的宽度;
	var iHeight=600; //弹出窗口的高度;
	var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
	window.open(openUrl,"","height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft); 
}
//右侧楼层
function floorHover(){
	$("#floor li").mouseover(function(){
		$(this).children(".phoneNum").css({
			visibility: "visible"
		});
		$(this).addClass("f_hover").siblings().removeClass("f_hover");
	});
	$("#floor li").mouseleave(function(){
		$(this).children(".phoneNum").css("visibility","hidden");
		$(this).removeClass("f_hover");
	});
}
