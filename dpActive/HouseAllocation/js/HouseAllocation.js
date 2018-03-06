
var dw = $(window).width() || $("body").width();
//取消省市区默认选项
$("#distpicker1").distpicker({
  autoSelect: false
});
$(function(){
	loadimg();//图片懒加载
	/*返回顶部*/
	bespeak();
	
	Anchor(".customer,.cera6,.liuzi","#seckill");
	Anchor(".nav1","#seckill");
	Anchor(".nav2","#limited");
	Anchor(".nav3","#sanitary");
	Anchor(".nav4","#ceramic");
	Anchor(".nav5","#box6");
	$(".backtop").click(function(){
		$('html,body').stop(true).animate({scrollTop:0}, 300);
	});
	
	/*超过300显示右边悬浮栏*/
	$(window).scroll(function () {
		var scrollHeight = $(document).height();
		var scrollTop = $(window).scrollTop();
		var $windowHeight = $(window).innerHeight();
		scrollTop > 300 ? $(".rightnav").fadeIn(200) : $(".rightnav").fadeOut(200);
	});
	/*去掉input select默认样式*/
	if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
		$("input,select").css({
		    "-webkit-appearance": "none",
    		"-moz-appearance": "none",
    		"appearance": "none"
		})
        
   	}  
});

//iframe获取父类url 参数值
getUrlValue();
var ConsultationSource;
function getUrlValue() { 
	var url = parent.location.search; // 获取url中"?"符后的字串
	var theRequest = new Object(); 
	if (url.indexOf("?") != -1) { 
		var str = url.substr(1); 
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i ++) { 
			theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1]; 
		} 
	} 
	if(theRequest.w_source!=null){
		ConsultationSource=theRequest.w_source;
	}
} 

/*留资预约*/
function bespeak(){
	$(".one-sure").on("click",function(){
		var source = $("#source").val();
		var name = $("#pname").val();
	    var number =$("#number").val();
	    var region = $("#province3").val();
	    var city = $("#city3").val();
	    var district = $("#district3").val();
	    var pageSource= $("title").html();
	    var urlPath=location.href;
	  	var chk_value =[];
	  	var category = $(".category").val();
	  	var select = $('.budget option:selected').val();
	  	var story = $(".story").val();
	  	var area = $(".area").val();
		$('input[name="checkbox"]:checked').each(function(){ 
			chk_value.push($(this).val()); 
		}); 
		var remark = "期望选材："+chk_value+"，"+category+"；"+"你的预算："+select+"；"+"你的故事："+story+"；"+"户型面积："+area+"；";
//	    console.log(remark);
	    
		if(name.length == 0){
			alert("请输入您的姓名");
		}else if(!(/^1[34578]\d{9}$/.test(number))){
			alert("手机号码有误，请重填");
		}else if( region==""|| city==""&& district==""){
			alert("请选择地区!");
		}else if(chk_value.length == 0 && category.length == 0){
			alert("没有选择期望选材");
		}else if(area.length == 0){
			alert("没有填写户型面积");
		}else{
		    $.ajax({
		         url: "/saleasLeads/saveSalesLeads",
		        type: "GET",
		        data:{name:name,telephone:number,reservedRegion:region,reservedCity:city,cusDistrict:district,pageSource:pageSource,source:ConsultationSource,urlPath:urlPath,comment:remark},
		        success: function(msg) {
//		       		$(".succbox").show();
					window.location.href = "./HouseAllocationSucc.html";
					$(".succbox").on("click",function(){
						$(this).hide();
						$("input[type=text]").val("");
						$("textarea").val("");
						$("input[type=checkbox]").removeAttr("checked");
						$('.budget option').removeAttr("selected");
					})
		        },
		        error: function() {
		            alert("错误,请刷新页面重试！");
		        }
		    });
		}
	});
}

/*图片懒加载*/	
function loadFn() {
    $('#years_box img[isLoaded != 1]').each(function() {
		var cH = document.getElementsByTagName("html")[0].clientHeight;
		var sT = document.body.scrollTop || document.documentElement.scrollTop;
    	var oT = $(this).offset().top;
        if (sT + cH >= oT) {
            var s = $(this).attr('data-srcywc');
            $(this).attr('src', s);
            $(this).attr('isLoaded', 1);
        }
    });
}
/*图片懒加载*/	
function loadimg(){
   	loadFn();//当不滚动时，滚动条超过图片高度时也加载图片
	$(window).scroll(function() {
	   loadFn();//滚动时，超过图片高度时加载图片
	})
}


/*右边导航栏*/
function Anchor(obj,target){
	$(obj).click(function(){
		$('html,body').stop(true).animate({scrollTop:$(target).offset().top}, 300);
	});
}

/*客服窗口*/
function Wopen(){
	var openUrl = "https://chat16.live800.com/live800/chatClient/chatbox.jsp?companyID=728834&configID=149755&jid=1778562220&enterurl=https%3A%2F%2Flocalhost%3A9002%2F%3Fclear%3Dtrue%26site%3Ddongpeng&skillId=5782&pagetitle=%E4%B8%9C%E9%B9%8F%E5%95%86%E5%9F%8E-%E4%B8%80%E7%AB%99%E5%BC%8F%E5%AE%B6%E8%A3%85%E5%BB%BA%E6%9D%90%E8%B4%AD%E7%89%A9%E5%B9%B3%E5%8F%B0%EF%BC%8C%E5%93%81%E7%B1%BB%E9%BD%90%E5%85%A8%EF%BC%8C%E6%AD%A3%E5%93%81%E4%BF%9D%E8%AF%81%E3%80%82&pagereferrer=https%3A%2F%2Flocalhost%3A9002%2F%3Fclear%3Dtrue%26site%3Ddongpeng&firstEnterUrl=https%3A%2F%2Flocalhost%3A9002%2F%3Fclear%3Dtrue%26site%3Ddongpeng&lan=zh&s=1";//弹出窗口的url
	
	var iWidth=800; //弹出窗口的宽度;
	var iHeight=600; //弹出窗口的高度;
	var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
	window.open(openUrl,"","height="+iHeight+", width="+iWidth+", top="+iTop+", left="+iLeft); 
}
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