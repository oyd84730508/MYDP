//初始化省市区
$("#distpicker1").distpicker({
	autoSelect: false
});
$(function() {
	
	//点击收缩箭头
	$(".invoice_type_tit").click(function(){
		$(this).parents(".invoice_type").find(".invoice_type_ul").toggleClass("toggleHidden");
	})	
	
	//初始化进入页面时，默认页面不可编辑，需要点击时候开发票进行编辑
	 $(".invoice_type input,.invoice_type select").attr("disabled", "true");
	 
	//点击开发票
	$("#on").click(function(){
	    $(".invoice_type").addClass("onbill").removeClass("offbill");
	    $(".invoice_type input,.invoice_type select").removeAttr("disabled", "true");
	});
	//点击不开发票
	$("#off").click(function(){
	    $(".invoice_type").addClass("offbill").removeClass("onbill");
	    $(".invoice_type input,.invoice_type select").attr("disabled", "true");
	    $("input[type=reset]").trigger("click");
	    $(this).attr("checked","checked");
	});
	//点击普通发票
	$("#ptfp").click(function(){
	    $(".zzsfpBox").hide();
	    $(".ptfpBox").show();
	    var txt = $(this).parents("h3").find("em").html();
	    console.log(txt);
	    $(".fp_typeTxt").html(txt);
	});
	//点击增值税发票
	$("#zzsfp").click(function(){
	    $(".zzsfpBox").show();
	    $(".ptfpBox").hide();
	    var txt = $(this).parents("h3").find("em").html();
	    console.log(txt);
	    $(".fp_typeTxt").html(txt);
	});
	//点击个人发票
	$(".personal").click(function(){
	    $(".perInput").show();
	    $(".comInput").hide();
	    $(".TaxInput").hide();
	    var txt = $(this).parents("label").find("em").html();
	    console.log(txt);
	    $(".fp_ttTxt").html(txt);
	});
	//点击公司发票
	$(".company").click(function(){
	    $(".perInput").hide();
	    $(".comInput").show();
	    $(".TaxInput").show();
	    var txt = $(this).parents("label").find("em").html();
	    console.log(txt);
	    $(".fp_ttTxt").html(txt);
	});
});
