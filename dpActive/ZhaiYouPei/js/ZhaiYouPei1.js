//取消省市区默认选项
$("#distpicker1").distpicker({
  autoSelect: false
});
$("#distpicker2").distpicker({
  autoSelect: false
});
$(function(){
	bespeak();//留资
	Anchor(".gotop,.bot2,.bot3",".anchor");//返回留资
	
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
	  	var check =[];
	  	var select = $('.budget option:selected').val();
	  	
		$('input[name="checkbox"]:checked').each(function(){ 
			check.push($(this).val()); 
		}); 
		var remark = "需要的建材："+check+"；"+"预算："+select+"；";
//	    console.log(remark);
	    
		if(name.length == 0){
			alert("请输入您的姓名");
		}else if(!(/^1[34578]\d{9}$/.test(number))){
			alert("手机号码有误，请重填");
		}else if( region==""|| city==""&& district==""){
			alert("请选择地区!");
		}else if(check.length == 0){
			alert("没有选择需要建材");
		}else{
		    $.ajax({
		       url: "/saleasLeads/saveSalesLeads",
		        type: "GET",
			data:{name:name,telephone:number,reservedRegion:region,reservedCity:city,cusDistrict:district,pageSource:pageSource,source:ConsultationSource,urlPath:urlPath,comment:remark},
		        success: function(msg) {
//		       		$(".succbox").show();
					window.location.href = "./ZhaiYouPei1Succ.html";
					$(".succbox").on("click",function(){
						$(this).hide();
						$("input[type=text]").val("");
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
	
	$(".one-sure1").on("click",function(){
		var source = $("#source1").val();
		var name = $("#pname1").val();
	    var number =$("#number1").val();
	    var region = $("#province1").val();
	    var city = $("#city1").val();
	    var district = $("#district1").val();
	    var pageSource= $("title").html();
	    var urlPath=location.href;
	  	var check =[];
	  	var select = $('.budget1 option:selected').val();
	  	
		$('input[name="checkbox"]:checked').each(function(){ 
			check.push($(this).val()); 
		}); 
		var remark = "需要的建材："+check+"；"+"预算："+select+"；";
//	    console.log(remark);
	    
		if(name.length == 0){
			alert("请输入您的姓名");
		}else if(!(/^1[34578]\d{9}$/.test(number))){
			alert("手机号码有误，请重填");
		}else if( region==""|| city==""&& district==""){
			alert("请选择地区!");
		}else if(check.length == 0){
			alert("没有选择需要建材");
		}else{
		    $.ajax({
		        url: "/decrationTeam/saveAppoint",
		        type: "GET",
		        data:{name:name,callNumber:number,source:source,region:region,city:city,district:district,ConsultationSource:ConsultationSource,pageSource:pageSource,urlPath:urlPath,remark:remark},
		        success: function(msg) {
//		       		$(".succbox").show();
					window.location.href = "./ZhaiYouPei1Succ.html";
					$(".succbox").on("click",function(){
						$(this).hide();
						$("input[type=text]").val("");
						$("input[type=checkbox]").removeAttr("checked");
						$('.budget1 option').removeAttr("selected");
					})
		        },
		        error: function() {
		            alert("错误,请刷新页面重试！");
		        }
		    });
		}
	});
}

function Anchor(obj,target){
	$(obj).click(function(){
		$('html,body').stop(true).animate({scrollTop:$(target).offset().top}, 300);
	});
}
