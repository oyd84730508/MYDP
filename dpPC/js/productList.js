$(function() {
	selmore();
	lazyLoad();
})

/*筛选更多按钮*/
function selmore(){
	var scrH = $("#select1").height();
    $(".MB-selbox").each(function(){
        if($(this).height() > scrH){
            $(this).find(".sel-more").show();
        }
    });
    console.log($(".MB-selbox").height());
	$(".sel-more").click(function(){
		if($(this).attr("data-more") ==0){
			$(this).attr("data-more","1");
			$(this).find(".sel-text").text("收起");
			$(this).find(".sel-sub").hide();
			$(this).find(".sel-sup").show();
			$(this).parents(".select-list dl ").animate({"height":"80px"},200);
			$(this).parents(".MB-selbox").prev().animate({"height":"80px","line-height":"80px"},200);
		}else{
			$(this).attr("data-more","0");
			$(this).find(".sel-text").text("更多");
			$(this).find(".sel-sub").show();
			$(this).find(".sel-sup").hide();
			$(this).parents(".select-list dl").animate({"height":"40px"},200);
			$(this).parents(".MB-selbox").prev().animate({"height":"40px","line-height":"40px"},200);
		}
	})
	
}

//分页器调用
var setTotalCount = 301;
$('#pageToolbar').paging({
    initPageNo: 3, // 初始页码
    totalPages: 30, //总页数
    totalCount: setTotalCount + '条数据', // 条目总数
    slideSpeed: 600, // 缓动速度。单位毫秒
    jump: true, //是否支持跳转
    callback: function(page) { // 回调函数
        console.log(page);
    }
})


//图片延迟加载
function lazyLoad(){
	$(".m-aside img").lazyload({effect: "fadeIn"});//左侧图片懒加载
	$(".m-list img").lazyload({effect: "fadeIn"});//列表图片懒加载
}

//小能客服系统
$.ajax({
	url: "https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_10058",
	dataType: 'script',
	method:'get',
	cache: true, // 必须
	success: function() { 
		console.log('success....小能');
	}
})

//hover小图切换大图
$(".ps-main li a").hover(function() {
    $(this).parents('li').find(".bigImg img").hide().attr({"src": $("> img", this).attr("data-bigImg"), "title": $("> img", this).attr("title")});
    $(this).parents('li').find(".ps-main li.current").removeClass("current");
    $(this).parents("li").addClass("current");
    return false;
});
$(".bigImg img").load(function() {
    $(".bigImg img:hidden").show();
});

//小图片左右滚动
var $slider = $('.slider ul');
var $slider_child_l = $('.slider ul li').length;
var $slider_width = $('.slider ul li').width();
$slider.width($slider_child_l * $slider_width);

var slider_count = 0;

if ($slider_child_l < 4) {
    $('.ps-next').css({cursor: 'auto'});
    $('.ps-next').removeClass("dasabled");
}
var next_flag = false;
var pre_flag = false;

$('.ml-wrap .ps-next').click(function(e) {
    /*if ($slider_child_l < 4 || slider_count >= $slider_child_l - 4) {
        return false;
    }
    slider_count++;*/
	if(next_flag) return;
	next_flag = true;

    var $wrap = $(this).parents('.p-scroll').find('.ps-wrap');
    var $ul = $(this).parents('.p-scroll').find('ul');

	if($wrap[0].clientWidth  >=  $ul.find('li').length * $slider_width + $ul[0].offsetLeft) {
        next_flag = false;
		return;

	}

    $ul.animate({left: '-=' + $slider_width + 'px'}, 'fast');

    setTimeout(function () {
        next_flag = false;
    },200)

    // slider_pic();
});

$('.ml-wrap .ps-prev').click(function(e) {
    /*if (slider_count <= 0) {
        return false;
    }*/
    // var $wrap = $(this).parents('.p-scroll').find('.ps-wrap');
    if(pre_flag) return;
    pre_flag = true;
    var $ul = $(this).parents('.p-scroll').find('ul');

    if($ul[0].offsetLeft >= 0){
        $ul.animate({left: '+=' + 0 + 'px'}, 'fast');
        pre_flag = false;
	}else{
        $ul.animate({left: '+=' + $slider_width + 'px'}, 'fast');
	}

    setTimeout(function () {
        pre_flag = false;
    },200)


    // slider_count--;

    // slider_pic();
});

function slider_pic() {
    if (slider_count >= $slider_child_l - 4) {
        $('.ps-next').css({cursor: 'auto'});
        $('.ps-next').addClass("dasabled");
    }
    else if (slider_count > 0 && slider_count <= $slider_child_l - 4) {
        $('.ps-prev').css({cursor: 'pointer'});
        $('.ps-prev').removeClass("dasabled");
        $('.ps-next').css({cursor: 'pointer'});
        $('.ps-next').removeClass("dasabled");
    }
    else if (slider_count <= 0) {
        $('.ps-prev').css({cursor: 'auto'});
        $('.ps-prev').addClass("dasabled");
    }
}
//
$("#D_selectorPrice").hover(function(){
	$(this).addClass("f-price-focus");
},function(){
	$(this).removeClass("f-price-focus");
})
