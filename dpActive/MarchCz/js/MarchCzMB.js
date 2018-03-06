$("#distpicker1").distpicker({
	autoSelect: false
});
$(function() {
	bespeak(); //留资
	lazyLoad();
	$(".backTop").click(function(e) {
		$('html,body').animate({
			scrollTop: 0
		});
	});
	Anchor(".w7,.bot2,.jumpLz",".w2"); //返回留资
})

//图片延迟加载
function lazyLoad() {
	$(".w img").lazyload({
		effect: "fadeIn"
	});
}
//锚点
function Anchor(obj, target) {
	$(obj).click(function() {
		$('html,body').stop(true).animate({
			scrollTop: $(target).offset().top
		}, 300);
	});
}
//小能客服系统
$.ajax({
	url: "https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_10058",
	dataType: 'script',
	method: 'get',
	cache: true, // 必须
	success: function() {
		console.log('success....');
		//		NTKF.im_openInPageChat('kf_10058_1508982217322');
	}
})
//iframe获取父类url 参数值
getUrlValue();
var ConsultationSource;

function getUrlValue() {
	var url = parent.location.search; // 获取url中"?"符后的字串
	var theRequest = new Object();
	if(url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
		}
	}
	if(theRequest.w_source != null) {
		ConsultationSource = theRequest.w_source;
	}
}

/*留资预约*/
function bespeak() {
	$(".one-sure1").on("click", function() {
		var name = $("#pname1").val();
		var number = $("#number1").val();
		var region = $("#province1").val();
		var city = $("#city1").val();
		var district = $("#district1").val();
		var pageSource = $("title").html();
		var urlPath = location.href;
		//	    var selTime = $('#contactTime1 option:selected').val();
		//	    var comment = "联系时间："+selTime;
		if(name.length == 0) {
			alert("请输入您的姓名");
		} else if(!(/^1[34578]\d{9}$/.test(number))) {
			alert("手机号码有误，请重填");
		} else if(region == "" || city == "" && district == "") {
			alert("请选择地区!");
		} else {
			$.ajax({
				url: "/saleasLeads/saveSalesLeads",
				type: "GET",
				data: {
					name: name,
					telephone: number,
					reservedRegion: region,
					reservedCity: city,
					cusDistrict: district,
					pageSource: pageSource,
					source: ConsultationSource,
					urlPath: urlPath
				},
				success: function(msg) {
					window.location.href = "./MarchCzSuccMB.html";
					_taq.push({convert_id: "91680605813", event_type: "form"})
				},
				error: function() {
					alert("错误,请刷新页面重试！");
				}
			});
		}
	});
}