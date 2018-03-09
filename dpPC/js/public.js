$(function(){
	getCity();
	hoverPopup(".DP_group",".DP_group_list");//顶部东鹏集团下拉框
	wechat();//底部二维码效果
	tabNav();//左侧菜单hover效果
})

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
			$("#location span").html(city);
		}
	});
}

//hover弹出窗口
function hoverPopup(obj,pup) {
	//移上去弹窗出现
	$(obj).mouseenter(function(){
		$(pup).show();
	});
	//离开弹窗关闭
	$(obj).mouseleave(function(){
		$(pup).hide();
	});
}

/*底部二维码效果*/
function wechat() {
	$(".foot-dd").hover(function(){
		$(this).find("img").stop(true).show(200);
	},function(){
		$(this).find("img").stop(true).hide(200);
	})
}

//左侧菜单hover效果
function tabNav(){
	$(".category-type").mouseenter(function(){
		$(".tab-content").show();
	})
	var thisTime;
    //鼠标离开左侧内容栏
    $('.normal-nav li').mouseleave(function(even){
        thisTime = setTimeout(thisMouseOut,500);
    });
    //鼠标进入左侧内容栏   滑动出弹层
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
    $(".tab-content").mouseleave(function(){
    	$(".tab-content").hide();
    })
    $("#main-nav,#header").mouseenter(function(){
		$(".tab-content").hide();
	})
}