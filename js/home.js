;var sf = sf||{};
$.extend($.easing,{
	easeOutBack:function(x,t,b,c,d,s){
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b;
	}
});
sf.imgScroll=function(box,btnl,btnr,move,w){
	var box = $(box);
	var bp = box.find(btnl);
	var bn = box.find(btnr);
	var list = $(move);
	var item = list.eq(0).find("li");
	var len = item.length;
	var index = 0;
	list.append(list.html());
	bp.click(function(){
		index --;
		if(index < 0){
			list.css("margin-left",-w*len);
			index = len-1;
			list.stop().animate({"margin-left":[-w*index,'easeOutCubic']},500);
		}else{
			list.stop().animate({"margin-left":[-w*index,'easeOutCubic']},500);
		}
	});
	bn.click(function(){
		index ++;
		if(index > len){
			list.css("margin-left",0);
			index = 1;
			list.stop().animate({"margin-left":[-w*index,'easeOutCubic']},500);
		}else{
			list.stop().animate({"margin-left":[-w*index,'easeOutCubic']},500);
		}
	});
};

sf.myorder = function(){	
	$(".sf_order").mouseover(function(){
		$(this).find("a").addClass("hover");
		$(this).find(".sf_order_seach").show();
	}).mouseleave(function(){
		$(this).find("a").removeClass("hover");
		$(this).find(".sf_order_seach").hide();
	});
	$(".sf_order_seach_submit").hover(function(){
		$(this).addClass("sf_order_seach_hover");
	},function(){
		$(this).removeClass("sf_order_seach_hover");
	});	
};

sf.Inputmouse = function(obj){
	$(obj).focus(function(){
		i = $(this)[0].defaultValue;
		if($(this).val() == i || $(this).val() == ''){
			$(this).val('');			
		};
		$(this).addClass("sf_input_hover");		
	});	
	$(obj).blur(function(){
		if($(this).val() == ''){
			$(this).val(i);
			$(this).removeClass("sf_input_hover");	
		};	
	});
};

sf.menu = function(){
	var timer , time ;
	$(".sf_menu").mouseleave(function(){
		var ref = $(this);
		ref.find(".sf_menu_out").hide();
	});
	
	$(".sf_menu dd").hover(function(){
		var ref = $(this);
		timer = setTimeout(function(){
			ref.find(".sf_menu_h3").addClass("sf_menu_hover");
			ref.css("z-index",2).siblings().css("z-index",1);
			ref.find(".sf_menu_out").show();
		},100);
	},function(){
		var ref = $(this);
		clearTimeout(timer);
		ref.find(".sf_menu_h3").removeClass("sf_menu_hover");
	});
	
	$(".sf_menu_out li").hover(function(){
		var that = $(this);
		that.addClass("li_hover");
		time = setTimeout(function(){
			
			$(".sf_out_out").hide();
			that.find(".sf_out_out").show();
		},200);
	},function(){
		clearTimeout(time);
		var ref = $(this);
		ref.removeClass("li_hover");
	});
	$(".sf_menu_out").mouseleave(function(){
		var ref = $(this);
		ref.find(".sf_out_out").hide();
	});	
};

sf.imageSlide = function(opt){
	var _opt = {
		wrap: '.sf_toobar_list',
		imgWrap: '.sf_logo_list',
		triggerWrap: '',
		textWrap: '',
		isLazyLoad: true,
		effect: 'fade',
		isAuto: true,
		HTML5: false,
		random: false
	}
	$.extend(_opt, opt);
	var slideBox = $(_opt.wrap),
		imgBox = slideBox.find(_opt.imgWrap),
		triggerBox = slideBox.find(_opt.triggerWrap),
		imgLi = imgBox.find('li'),
		len = imgBox.find('li').length,
		autoTime = null,
		delayTime = null,
		count = 0,
		triggerLi = triggerBox.find('li');
	
	triggerLi.hover(function(){
		clearInterval(autoTime);
		var _count = $(this).index();
		animate($(this), _count);
		
	}, function(){
		clearInterval(delayTime);
	});
	slideBox.hover(function(){
		clearInterval(autoTime);
		
	}, function(){
		if(!_opt.isAuto){
			return;
		}
		autoTime = setInterval(function(){
			count++;
			if(count >= len){count = 0;}
			animate(triggerLi.eq(count), count);
		},2000);
	});

	slideBox.trigger('mouseleave');
	
	triggerLi.eq(0).addClass('hover');
	
	function animate(_this, _index){
		delayTime = setTimeout(function(){
			count = _index;
			switch (_opt.effect) {
				case 'fade' : 
					imgLi.eq(_index).fadeIn(1000).siblings().fadeOut(1000);
					break;
				default :
					break;
			};				
			if(_opt.textWrap){
				slideBox.find(_opt.textWrap).find('li').eq(_index).show().siblings().hide();
			}
		}, 200);
	}		
};

function inviewAnimation(){
	$(".sf_check_me_h3").one('inview', function(event, visible){
		$(this).addClass('bounceInRight');
	});
	
	$(".sf_friend_title h2").one('inview', function(event, visible){
		$(this).addClass('bounceInRight');
	});
	$(".sf_friend_title p").one('inview', function(event, visible){
		$(this).addClass('bounceInLeft');
	});	
};


$(function(){
	if($(document).scrollTop()>200 && screen.width>=1280 ){
		$(".sf_fixed").show();			
	}else{
		$(".sf_fixed").hide();	
	};
	var wheight = $(window).height();
	var wwidth = $(window).width();
	$(window).scroll(function(){
		topHide = $(document).scrollTop(); //页面上部被卷去高度	
		var backTop = wheight+topHide-200-(wheight-300)/2;		
		//针对IE6不支持fixed的处理start          
		if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
			$(".sf_fixed").stop().animate({'top':backTop},'fast');
		};
		if($(document).scrollTop()>200 && screen.width>=1280 ){
			$(".sf_fixed").show();			
		}else{
			$(".sf_fixed").hide();	
		};
	});
	
	$(".sf_seach_text").focus(function(){
		$(".sf_seach").addClass("sf_seach_hover");
	}).blur(function(){
		$(".sf_seach").removeClass("sf_seach_hover");
	});
	
	$(".sf_seach_submit").hover(function(){
		$(this).addClass("sf_seach_submit_hover");
	},function(){
		$(this).removeClass("sf_seach_submit_hover");
	});
	
	
	$(".sf_seach_h").mouseover(function(){
		var ref = $(this);
		ref.find(".sf_seach_title a").addClass("hover");
		ref.find(".sf_seach_out").show();
		$(".sf_seach_out a").click(function(){
			$(".sf_seach_h").find(".sf_seach_out").hide();
			var text = $(this).text();
			$(".sf_seach_title span").text(text); 
		});
	}).mouseleave(function(){
		$(this).find(".sf_seach_title a").removeClass("hover");
		$(this).find(".sf_seach_out").hide();
	});
	//他们的故事
	sf.imgScroll('.sf_story_list','.prev','.next','.sf_story_tab ul',255);
	//最新上架
	sf.imgScroll('.sf_friend_list','.prev','.next','.sf_friend_tab ul',355);
	//合作伙伴
	sf.imgScroll('.sf_fl_list','.prev','.next','.sf_tab_main ul',200);
	
	
	sf.myorder();
	sf.Inputmouse(".sf_order_seach_text");
	sf.Inputmouse(".sf_seach_text");
	sf.menu();
	sf.imageSlide({
		imgWrap: '.sf_logo_list',
		triggerWrap: ''
	});
	
	inviewAnimation();  //css3运动
});