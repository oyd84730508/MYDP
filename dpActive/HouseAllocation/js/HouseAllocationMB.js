//取消省市区默认选项
$("#distpicker1").distpicker({
  autoSelect: false
});
var dw = $(window).width() || $("body").width();
//window.expectedSelectionArr = [];
$(function(){
	loadimg();//图片懒加载
	bespeak();//免费预约
	Anchor(".btnHref","#Anchor");
	Anchor(".introduce","#introduce");
	Anchor(".prd","#prd");
	
	/*返回顶部*/
	$(".goTop").click(function(){
		$('html,body').stop(true).animate({scrollTop:0}, 300);
	});

	$("#mbfoot a").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	})
	
	//期望选材--复选框
	
});


/*图片懒加载*/	
function loadimg() {
	document.onscroll = function(){
	    $('#Years_box img[isLoaded != 1]').each(function() {
			var cH = document.getElementsByTagName("html")[0].clientHeight;
			var sT = document.body.scrollTop || document.documentElement.scrollTop;
	    	var oT = $(this).offset().top;
	        if (sT + cH + 400 >= oT) {
	            var s = $(this).attr('data-srcywc');
	            $(this).attr('src', s);
	            $(this).attr('isLoaded', 1);
	        }
	    });
	};
}


//iframe获取父类url 参数值
getUrlValue();
var ConsultationSource;
function getUrlValue() { 
	var url =location.search; // 获取url中"?"符后的字串
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
	    var otherClass = $("#otherClass").val();
	    var YourStory = $("#YourStory").val();//获取你的故事
	    var YourBudget = $("#YourBudget option:selected").text();//获取您的预算
	    var UnitArea = $("#UnitArea").val();//获取户型面积
		$('.ExpectedSelection input[name="checkbox"]:checked').each(function(){ 
			chk_value.push($(this).val()); 
		}); 
	    var remark = '期望选材：'+chk_value+' , '+otherClass+' ； '+'您的预算：'+YourBudget+' ； '+'您的故事：'+YourStory+' ； '+'户型面积：'+UnitArea+' ；';//获取到的值拼接起来
	    	    console.log(remark);
		if(name.length == 0){
			alert("请输入姓名");
		}else if(!(/^1[34578]\d{9}$/.test(number))){
			alert("手机号码有误，请重填");
		}else if( region==""|| city==""&& district==""){
			alert("请选择地区!");
		}else if(chk_value.length == 0 && otherClass.length == 0){
			alert("请选择或填写期望选材~~~");
		}else{
		    $.ajax({
		         url: "/saleasLeads/saveSalesLeads",
		        type: "GET",
		        data:{name:name,telephone:number,reservedRegion:region,reservedCity:city,cusDistrict:district,pageSource:pageSource,source:ConsultationSource,urlPath:urlPath,comment:remark},
		        success: function(msg) {
					$("#succBox").show();
					$("#succBox").click(function(){
						$("#succBox").hide();
						$("input[type=text]").val("");
						$("textarea").val("");
						$("input[type=checkbox]").removeAttr("checked");
						$("#YourBudget option").removeAttr("selected");
					})	
		        },
		        error: function() {
		            alert("错误,请刷新页面重试！");
		        }
		    });
		}
	});
	
}

/*scrollIntoView点击滚动*/
function Anchor(obj,target){
	$(obj).click(function(){
		document.querySelector(target).scrollIntoView(true);  
	});
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