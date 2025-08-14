/*! Script by はりを(http://gutyan.jp/) */




(function(UA, ref, d){
//	if (ref.indexOf("http://geemnoiro1.webcrow.jp/") != 0 && ErrorPage != true) {
//		location.href = "/";
//	}
	if (UA.indexOf("Presto") != -1) {
		if (UA.indexOf("Windows NT 6") != -1) {
			d.writeln('<style>*{font-family:"メイリオ";}</style>');
		}
		if (UA.indexOf("Mac OS X") != -1) {
			d.writeln('<style>*{font-family:"ヒラギノ角ゴ ProN W3";}</style>');
		}
	}
})(navigator.userAgent, document.referrer, document);



/*
function clock() {
	function zerofix(num) {
		num = new String(num);
		if (num.length === 1) {
			num = "0" + num;
		}
		return num;
	}
	var day = new Array("日", "月", "火", "水", "木", "金", "土"),
		nd = new Date(),
			YY = nd.getFullYear(),
			nn = zerofix(nd.getMonth() + 1),
			jj = zerofix(nd.getDate()),
			DD = day[nd.getDay()],
			gg = zerofix(nd.getHours()),
			ii = zerofix(nd.getMinutes()),
			ss = zerofix(nd.getSeconds()); 
	if (NowDate) {
		NowDate.innerHTML = YY + "/" + nn + "/" + jj + " " + "(" + DD + ")" + " " + gg + ":" + ii + ":" + ss;
	}
	setTimeout(clock, 1000);
}

	onload = clock;
*/



$(function(){

	$("a[target]:not([target^='_'])")
		.ajaxStart(function(){
			$("#" + $(this).attr("target") + " > .loading_overlay").show();
		})
		.ajaxStop(function(){
			$("#" + $(this).attr("target") + " > .loading_overlay").hide();
		})
		.click(function(){
			var hash = location.hash.replace("#page=", "");
			$("#" + $(this).attr("target") + "-inner").load($(this).attr("href"));
			$("#" + $(this).attr("target"))[0].className = "ajax-html-area page-" + $(this).attr("name");
			if ($(this).attr("name") != hash) {
				var path = location.pathname + "#page=" + $(this).attr("name");
				history.pushState(null, $("title").html(), path);
			}
			$("title").html($(this).attr("title") + " - " + page_title + " - " + site_title);
			return false;
		})
		.each(function(){
			if ($("#" + $(this).attr("target") + "-inner").size() === 0) {
				$("#" + $(this).attr("target")).append('<div id="' + $(this).attr("target") + '-inner"></div>').append('<div class="loading_overlay"></div>');
			}
		});

	$(window).on("load popstate", function(){
		var hash = location.hash.replace("#page=", "");
		if ($("[name=" + hash + "]").size() === 1) {
			$("[name=" + hash + "]")[0].click();
		} else {
			$(".ajax-html-area > [id$='-inner']").empty();
			$(".ajax-html-area")[0].className = "ajax-html-area";
			$("title").html(page_title + " - " + site_title);
		}
	});


	$("li a[data-update]").each(function(){
		var currentTime = new Date(),
		     updateTime = new Date($(this).data("update")),
		    ElapsedDays = (currentTime - updateTime) / (1000 * 60 * 60 * 24);
		if (ElapsedDays <= 14) {
			$(this).after('<label class="update-label">更新！</label>');
		}
	});


//	$("#review-area").each(function(){
//		$(this).css("height", $(document).height() - $("#main").offset().top + "px");
//	});


/*
	$("<a>")
		.attr({
			href: "#bottom",
			id: "scroll-bottom"
		})
		.appendTo("body");

	$("<img>")
		.attr({
			id: "arrow-bottom",
			src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhBAMAAAClyt9cAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYUExURUdwTAAAAeft6H09EWyKnhBWkdetdx1Ke+xgsgMAAAABdFJOUwBA5thmAAAAiElEQVQoz82RQQqAIBBFP95AKNqKQXtvEOIJukHUASK6Pxk6o0607+/m8YSZLwAop1M8cqYMdGcyGYn0RLYX+b8jiLW2vIqDwR4ClaH1FcKMMqYcWAWZS11cmmolX3fKvSonlGpBrr6S/OddLC30gySxEq91QoHahBK3dK2SpMHW5JFOg1YaCNw+eSSAXnlYpQAAAABJRU5ErkJggg"
		})
		appendTo("#scroll-bottom");
*/

	$("<a>")
		.attr({
			href: "#top",
			id: "scroll-top"
		})
		.appendTo("body");

	$("<img>")
		.attr({
			id: "arrow-top",
			src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhBAMAAAClyt9cAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYUExURUdwTAAAAeDy+vbbsBNTi3YzCWyKnrSCRSDpF8IAAAABdFJOUwBA5thmAAAAf0lEQVQoz93QMQqAMAyF4VBP8ECcSx08gbiKg3tvUBy6u3h+JVWbBE9gtv58QxoiHje2ntT0EYtKbgTaYAiwGHIhb4hCTCRqChHoJhU1+1OwlTK9AZ035EaDCIycJIwUYaQJkCiaMtORc41rzolCCHXn6+E/f/GTMujDy9vz3U/k7iXItZEsYgAAAABJRU5ErkJggg"
		})
		.appendTo("#scroll-top");


	$("<div>")
		.attr("id", "overlay")
		.css({
			background : "rgba(0, 0, 0, 0)",
			display    : "none",
			position   : "fixed",
			left       : 0,
			top        : 0,
			width      : "100%",
			height     : "100%",
			zIndex     : 10000
		})
		.appendTo("body");

	var scroll = false;

	$("a[href^='#']:not(a[href='#'])")
		.click(function(){
			var $href = $(this).attr("href");
			if (!scroll /* && !($href == "#bottom") || !($href == "#top") */ ) {
				scroll = true;
				var $target   = $($href == "#top" || $href == "html" ? "body" : $href);
				var $position = $target.offset().top;
				var $speed    = Math.ceil($(window).scrollTop() / 2);
				$("#overlay").css("display", "block");
				$("html, body")
					.animate({
						scrollTop: $position
					},
					{
						duration: $speed,
						complete: function(){
							$("#overlay").css("display", "none");
							scroll = false;
						}
					});
			}
			return false;
		});


	if ($("#menu").size()) {
		$(window).scroll(function(){
			var $menu     = $("#menu"),
			    $position = Math.ceil($menu.height() + $menu.offset().top);
	//		    $bottom   = Math.ceil($(document).height() - $position);

			if ($(this).scrollTop() > $position && !scroll) {
				$("#scroll-top").stop(false, true).fadeIn(250);
			} else {
				$("#scroll-top").stop(true, false).fadeOut(250);
			}

	/*
			if ($(this).scrollTop() < $bottom && !scroll) {
				$("#scroll-bottom").fadeIn(250);
			} else {
				$("#scroll-bottom").stop().fadeOut(250);
			}
	*/

		});
	}


/*
	$("#scroll-bottom")
		.on("click touchend", function(){
			if (!scroll) {
				scroll = true;
				var $position = $(document).height() - $(window).height();
				var $speed    = Math.ceil($(document).height() / 2);
				$("*").on("click mouseover mouseout mouseenter mouseleave touchstart touchend", false);
				$("body,html")
					.animate({
						scrollTop: $position
					},
					{
						duration: $speed,
						complete: function(){
							scroll = false;
							$("*").off("click mouseover mouseout mouseenter mouseleave touchstart touchend", false);
						}
					});
			}
			return false;
		});


	$("#scroll-top")
		.on("click touchend", function(){
			if (!scroll) {
				scroll = true;
				var $speed = Math.ceil($(document).height() / 2);
				$("*").on("click mouseover mouseout mouseenter mouseleave touchstart touchend", false);
				$("body,html")
					.animate({
						scrollTop: 0
					},
					{
						duration: $speed,
						complete: function(){
							scroll = false;
							$("*").off("click mouseover mouseout mouseenter mouseleave touchstart touchend", false);
						}
					});
			}
			return false;
		});
*/


	$("#link-tag-source").click(function(){
		$(this).select();
	});


	$("#main a img").lazyload({
		data_attribute: "src",
		effect: "fadeIn",
		effectspeed: 500
	});


	$("#menu a[href='/profile.html']").fancybox({
		openEffect : "elastic",
		closeEffect: "elastic",

		type: "ajax",
		href: "/profile.txt"
	});


	$("#main a.popup").fancybox({
		openEffect : "elastic",
		closeEffect: "elastic",

		helpers: {
			title: {
				type: "inside"
			}
		}
	});

});