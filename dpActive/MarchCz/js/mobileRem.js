! function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			clientWidth && (clientWidth >= 640 && (clientWidth = 640), docEl.style.fontSize = 100 * (clientWidth / 640) + "px")
		};
	doc.addEventListener && (win.addEventListener(resizeEvt, recalc, !1), recalc())
}(document, window);