//初始化省市区
$("#distpicker1").distpicker({
	autoSelect: false
});

$(function() {
	objClick(".address_defalut",".step1",".step2");//点击进入收货地址列表
	objClick(".step2 .head_back",".step2",".step1");//点击收货地址的列表返回箭头
	objClick(".addBtn",".step2",".step3");//点击新增地址
	objClick(".step3 .head_back",".step3",".step2");//点击新增地址的返回箭头
	objClick(".editAddr",".step2",".step4");//点击编辑收货地址
	objClick(".step4 .head_back",".step4",".step2");//点击编辑收货地址的返回箭头
})
//点击各模块，其它模块显示与隐藏
function objClick(a,b,c){
	$(a).click(function(){
		$(b).hide();
		$(c).show();
	})
}
