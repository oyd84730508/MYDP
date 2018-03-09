$(function(){
	selmore();
	lazyLoad();
})
$(".add-new-addr").click(function(){
	$(".DPmask").show();
	$(".tc-popup").show();
})
$(".tc-popup-close").click(function(){
	$(".DPmask").hide();
	$(".tc-popup").hide();
	
})

$("#city-picker1").citypicker();

/*筛选更多按钮*/
function selmore(){
	var scrH = $(".dl").height();
    $(".MB-sel").each(function(){
        if($(this).height() > scrH){
            $(this).find(".sel-more").show();
        }
    });
    var selH = $(".MB-sel").height();
    console.log(selH+'px');
	$(".sel-more").click(function(){
		if($(this).attr("data-more") ==0){
			$(this).attr("data-more","1");
			$(this).find(".sel-text").text("收起");
			$(this).find(".sel-sub").hide();
			$(this).find(".sel-sup").show();
			$(this).parents(".Coupon .dl").animate({"height":"180px"},200);
		}else{
			$(this).attr("data-more","0");
			$(this).find(".sel-text").text("更多");
			$(this).find(".sel-sub").show();
			$(this).find(".sel-sup").hide();
			$(this).parents(".Coupon .dl").animate({"height":"80px"},200);
		}
	})
}
//选择是否开发票
$(".order-bill-no").click(function(){
	$(this).addClass("order-billSelect").siblings().removeClass("order-billSelect");
})
$(".order-bill-yes").click(function(){
	$(this).addClass("order-billSelect").siblings().removeClass("order-billSelect");
	$(".DPmask").show();
	$(".tc-fp").show();
	$(".dongpenginvoice").show();
})
$(".tc-fp-close").click(function(){
	$(".DPmask").hide();
	$(".tc-fp").hide();
	document.location.reload();
})

//图片延迟加载
function lazyLoad(){
	$(".order-orderInfo img").lazyload({effect: "fadeIn"});//订单信息图片懒加载
}

//填写并核对订单信息
$(".add-addr-ul li .addr-border").click(function(){
	if($(this).parents("li").hasClass("addr-btn")){
		
	}else{
		$(this).parents("li").addClass("selected-addr").siblings().removeClass("selected-addr");
	}
	
})
//使用现金券
$(".CashCoupon a").click(function(){
	if($(this).hasClass("unable_item")){
		
	}else{
		$(this).addClass("selCop_item").siblings().removeClass("selCop_item");
	}
	
})
//使用满减券
$(".FullCutCoupon a").click(function(){
	
	if($(this).hasClass("unable_item")){
		
	}else{
		$(this).addClass("selCop_item").siblings().removeClass("selCop_item");
	}

})

/**普通发票部分，点击新增单位发票**/
$(".invoice-add-font").click(function() {
    $(this).hide();
    $(".invoice-news-chose").show();
    $("#normalTaxInvoice").show();
    $(".invoice-chose-b").css("border-color", "#CCCCCC"); //改变个人border的color
    $(".personage-chose-img").hide(); //隐藏右下角三角形
    mousedown_newschose();
});

$(".invoice-chose-b").click(function(){
    $(".invoice-news-input").val("");
    $(".personage-chose-img").show();
    $(".invoice-news-chose-img").hide();
    $("#normalTaxInvoice").hide();
    $(this).css("border-color","rgb(215, 0, 15)");
    $(".invoice-news-chose").css("border-color","#CCCCCC");
    $(".invoice-news-chose").hide();
    $(".invoice-add-font").show();
});

 /**点击取消**/
$(".normal-cancel").click(function() {
    $(".invoice").hide();
    $("#seMask").hide();
    document.location.reload();
});
/**点击新增的抬头单位框**/
function mousedown_newschose() {
    if($(".invoice-news-chose").css("display") == "block") {
        $(".invoice-news-chose").click(function() {
            //显示
            $(this).css("border-color", "#D7000F");
            $(".invoice-news-chose-img").show();
            $("#normalTaxInvoice").show();
            //隐藏
            $(".invoice-chose-b").css("border-color", "#CCCCCC");
            $(".personage-chose-img").hide(); //显示新选择框的三角形
        });
    } else {
        $(".invoice-news-chose").click(function() {});
    }
}
/**点击普通发票**/
$(".invoice-normal").click(function() {
    $(".invoice-addedvalue").css("border-color", "#CCCCCC"); //改变border的color
    $(".addedvalue-chose-img").hide(); //隐藏右下角三角形
    $(this).css("border-color", "#D7000F");
    $(".normal-chose-img").show(); //隐藏右下角三角形
    //改内容栏
    $("#invoice-addedvalue").hide();
    $("#icontent").show();
    $($(".detail-chose-b")[0]).show();
    $($(".detail-chose-img")[0]).show();
    $($(".normal-save")[0]).show();
    $($(".normal-cancel")[0]).show();
    $("#invoice-normal").show();
    $("#twoStep").hide();
    $("#threeStep").hide();
    $("#customInfo").show();
});
 /**点击增值税发票**/
$(".invoice-addedvalue").click(function() {
    $(".invoice-normal").css("border-color", "#CCCCCC"); //改变border的color
    $(".normal-chose-img").hide(); //隐藏右下角三角形
    $(this).css("border-color", "#D7000F");
    $(".addedvalue-chose-img").show(); //隐藏右下角三角形
    $("#normalTaxInvoice").hide();
    $("#customInfo").css("display","none");
    //改内容栏
    $("#invoice-normal").hide();
    $("#icontent").hide();
    $($(".detail-chose-b")[0]).hide();
    $($(".detail-chose-img")[0]).hide();
    $($(".normal-save")[0]).hide();
    $($(".normal-cancel")[0]).hide();
    $("#invoice-addedvalue").show();
    $("#oneStep").show();
    $("#customInfo").hide();
});

/**增值税发票确定**/
$("#addedValueConfirm").click(function() {
    $("#content").hide();
    $("#oneStep").hide();
    $("#twoStep").show();
    $("#oneStepBor").removeClass("bor");
    $("#oneStepBor").addClass("bor-gray");
    $("#twoStepBor").removeClass("bor-gray");
    $("#twoStepBor").addClass("bor");
});
/**增值税发票下一步**/
$("#addedValueNext").click(function() {

		$("#twoStep").hide();
	    $("#threeStep").show();
	    $("#twoStepBor").removeClass("bor");
	    $("#twoStepBor").addClass("bor-gray");
	    $("#threeStepBor").removeClass("bor-gray");
	    $("#threeStepBor").addClass("bor");

});
/**增值税发票第二步返回**/
$("#backToOne").click(function() {
    $("#twoStep").hide();
    $("#content").show();
    $("#oneStep").show();
    $("#twoStepBor").removeClass("bor");
    $("#twoStepBor").addClass("bor-gray");
    $("#oneStepBor").removeClass("bor-gray");
    $("#oneStepBor").addClass("bor");
});
/**增值税发票保存**/
$("#addedValueSave").click(function() {
    var id = $.trim($('#invoice_id').val());
    var recipient = $("#name").val();
    var taxpayer = $("#taxpayerCode").val();
    var registerAddress = $("#registerAddress").val();
    var registerPhone = $("#registerPhone").val();
    var registerBank = $("#registerBank").val();
    var registerBankAccount = $("#registerBankAccount").val();
    if (!isMobile){
        var fullname=$("#recieverName").val();
        var cellphone=$("#recieverPhone").val();
        var region=encodeURI($("#province_person_addedvalue").val());
        var city=encodeURI($("#city_person_addedvalue").val());
        var district=encodeURI($("#area_person_addedvalue").val());
        var fileName=encodeURI($("#fileName").val());
        var formattedAddress=$.trim($("#homeAddress").val());
    }else{
        var fullname=$("#custrecieverName").val();
        var cellphone=$("#custrecieverPhone").val();
        var region=encodeURI($("#custprovince_person").val());
        var city=encodeURI($("#custcity_person").val());
        var district=encodeURI($("#custarea_person").val());
        var fileName=encodeURI($("#fileName").val());
        var formattedAddress=$.trim($("#custhomeAddress").val());
    }
    var category = "VAT";
    var invoiceRequired = true;
    //开的是公司发票
    var recipientType = 'UNIT';
    if(recipient==""){
        alert("请填写单位名称");
        return false;
    }
    if(taxpayer==""){
        alert("请填写纳税人识别码");
        return false;
    }
    if(registerAddress==""){
        alert("请填写注册地址");
        return false;
    }
    if(registerPhone==""){
        alert("请填写注册电话");
        return false;
    }
    if(registerBank==""){
        alert("请填写开户银行");
        return false;
    }
    if(registerBankAccount==""){
        alert("请填写银行账户");
        return false;
    }
    if(fullname==""){
        alert("请填写收票人姓名");
        return false;
    }
    if(cellphone==""){
        alert("请填写收票人电话");
        return false;
    }
    var reg=/^\d{11}$/; //正则表达式验证手机号码
    if(!reg.test(cellphone)){
        alert("请填写正确的手机号码");
        return false;
    }
    if(region==""){
        alert("请选择省");
        return false;
    }
    if(city==""){
        alert("请选择市");
        return false;
    }
    if(district==""){
        alert("请选择区");
        return false;
    }
    if(formattedAddress==""){
        alert("请填写详细地址");
        return false;
    }
    if(fileName==""){
        alert("请上传发票图片");
        return false;
    }
    if(dosubmit()) {
        $.ajax({
            url: "checkout/tax-invoice/addAddedValue",
            type: "POST",
            data: {
                id: id,
                recipient: recipient,
                category: category,
                recipientType: recipientType,
                invoiceRequired: invoiceRequired,
                taxpayer: taxpayer,
                registerAddress: registerAddress,
                registerPhone: registerPhone,
                registerBank: registerBank,
                registerBankAccount: registerBankAccount,
                fullname: fullname,
                cellphone: cellphone,
                region: region,
                city: city,
                district: district,
                formattedAddress: formattedAddress,
                fileName:fileName
            },
            dataType: 'json',
            success: function (data) {
                if (!isMobile){
                    $('#invoice_content').show();
                }else{
                    $('#span_invoice').text(data.category === "VAT" ? "增值税发票" : "普通发票");
                }
                $('#invoice_operate').hide();
                $(".order-bill-yesno").hide();
                $(".invoice_category1").text(data.category === "VAT" ? "增值税发票" : "普通发票");
                $('#invoice_id').val(data.id);
                console.log("invoice_id:" + data.id);
                $(".invoice_recipient").text(data.recipient);
                //发票抬头
                $('.invoice_recipientType').text(data.recipientType);

                $(".invoice").hide();
                $("#seMask").hide();
                $("#threeStep").hide();
                $("#content").show();
                $("#oneStep").show();
                $("#threeStepBor").removeClass("bor");
                $("#threeStepBor").addClass("bor-gray");
                $("#oneStepBor").removeClass("bor-gray");
                $("#oneStepBor").addClass("bor");
                //计算运费并返回到前端显示
                writeDeliveryCost();
                isCommitted = false;
                if (isMobile) {
                    submit_invoice();
                }
            },
            error: function (jqXHR) {
                $(".invoice").hide();
                $("#seMask").hide();
                isCommitted = false;
            }
        });
    }
});
/**增值税发票第三步返回**/
$("#backToTwo").click(function() {
    $("#twoStep").show();
    $("#threeStep").hide();
    $("#threeStepBor").removeClass("bor");
    $("#threeStepBor").addClass("bor-gray");
    $("#twoStepBor").removeClass("bor-gray");
    $("#twoStepBor").addClass("bor");
});