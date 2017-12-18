;var sf=sf || {};

sf.myOrder=function(){
    //我的订单查询
    $(".sf_order").hover(function(){
        $(this).find("a").addClass("hover");
        $(this).find(".sf_order_search").show();
    },function(){
        $(this).find(".sf_order_search").hide();
        $(this).find("a").removeClass("hover");
    });
};




$(document).ready(function(){
    sf.myOrder();

});