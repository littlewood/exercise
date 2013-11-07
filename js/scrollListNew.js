(function($){
	$.fn.scrollList.default = {
		list:,
		wrapLength:,
		listLength:,
		btn:{
			left:"#left",
			right:"",
			top:"",
			bottom:""
		},
		disClass:"dis"
	};
	$.extend($.fn.scrollList.default,setting);
})(jQuery);
function scrollList(config,type){
	var $list = config.$list;
	var wrapLength = config.wrapLength;
	var listLength = config.listLength;
	var btn = config.btn;
	var disClass = config.disClass;
	switch (type) {
		case "left" :
			var left = parseInt($list.css("left"));
			var scrollLeft;
			if(left+wrapLength>=0){
				scrollLeft = 0;
				btn.left.addClass(disClass.left);
			} else {
				scrollLeft = left+wrapLength;
				btn.right.removeClass(disClass.right);
			}
			$list.animate({left :scrollLeft});
			break;
		case "right" : 
			var left = parseInt($list.css("left"));
			var scrollLeft;
			if(listLength+left-wrapLength<wrapLength){
				scrollLeft = -(listLength-wrapLength);
				btn.right.addClass(disClass.right);
			} else {
				scrollLeft = left-wrapLength;
				btn.left.removeClass(disClass.left);
			}
			$list.animate({left :scrollLeft});
			break;
		case "top" :
			var top = parseInt($list.css("top"));
			var scrollTop;
			if(top+wrapLength>=0){
				scrollTop = 0;
				btn.top.addClass(disClass.top);
			} else {
				scrollTop = top+wrapLength;
				btn.bot.removeClass(disClass.bot);
			}
			$list.animate({top :scrollTop});
			break;
		case "bot" :
			var top = parseInt($list.css("top"));
			var scrollTop;
			if(listLength+top-wrapLength<wrapLength){
				scrollTop = -(listLength-wrapLength);
				btn.bot.addClass(disClass.bot);
			} else {
				scrollTop = top-wrapLength;
				btn.top.removeClass(disClass.top);
			}
			$list.animate({top :scrollTop});
			break;
		default:
		return;
	}
};