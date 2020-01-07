'use strict'
let toc = null;
let mgr;
let prevWidth = null;
// Directly bind `mgr.doScroll` will make `this` become window
let doScroll = () => mgr.doScroll();
const turningWidth = 950;
const posibleElements = [".article-meta h1", ".article-meta h3", ".article-meta p"];

class ToggleMgr {
  constructor() {
    this.toggleFlag = null;
    for(let i=0; i < posibleElements.length; i++) {
      let tmp = $(posibleElements[i]).offset();
      if (tmp) {
        this.turningHeight = tmp.top;
        break;
      }
    }
  }
  doScroll() {
    let flag = $(window).scrollTop() > this.turningHeight;
    if (flag == this.toggleFlag) return;
    if (flag) this.toggleDown();
    else this.toggleUp();
    this.toggleFlag = flag;
  }
  toggleUp() {
    $('#to-top').css({bottom: "-3%", opacity: 0});
  }
  toggleDown() {
    $('#to-top').css({bottom: "3%", opacity: 1});
  }
}
class MobileToggleMgr extends ToggleMgr {
  constructor() {
    super();
    this.originalHeight = $(".article-meta").outerHeight();
    this.doScroll();
  }
  toggleUp() {
    super.toggleUp();
    $(".article-meta").removeClass("meta-stick");
    $("main").css("padding-top", 0);
    toc.css("max-height", 0);
  }
  toggleDown() {
    super.toggleDown();
    $("main").css("padding-top", this.originalHeight + "px");
    $(".article-meta").addClass("meta-stick");
  }
  exit() {
    $(".article-meta").removeClass("meta-stick");
    $("main").css("padding-top", 0);
  }
}
class PCToggleMgr extends ToggleMgr {
  constructor() {
    super();
    toc.css("top", this.turningHeight);
    this.doScroll();
  }
  toggleUp() {
    super.toggleUp();
    toc.removeClass();
    toc.addClass("toc-abs");
  }
  toggleDown() {
    super.toggleDown();
    toc.removeClass();
    toc.addClass("toc-stick");
  }
  exit() {
  }
}
function changeMgr() {
  const width = window.innerWidth;
  if (width <= turningWidth && prevWidth > turningWidth) {
    if (mgr) mgr.exit();
    mgr = new MobileToggleMgr();
  }
  if (width > turningWidth && prevWidth <= turningWidth) {
    if (mgr) mgr.exit();
    mgr = new PCToggleMgr();
  }
  prevWidth = width;
}
function initMgr() {
  prevWidth = window.innerWidth;
  if (prevWidth <= turningWidth)
    mgr = new MobileToggleMgr();
  else mgr = new PCToggleMgr();
}
function showMenu(ele) {
  if (toc[0].className != "toc-mobile") {
    toc.css("top", $(".article-meta").outerHeight());
    toc.removeClass();
    toc.addClass("toc-mobile");
  }
  if (toc.css("max-height") == "0px")
    toc.css("max-height", "100%");
  else
    toc.css("max-height", 0);
}
function scrollToHeader(ele) {
  if (window.innerWidth <= 950) {
    showMenu();
  }
  let pos = $(ele).offset().top - 50;
  $("html, body").animate({ scrollTop: pos });
  return false;
}
$(function() {
  // toggleUp();
  // // Wait DOM ready
  // setTimeout(doScroll, 100);
  toc = $("#TableOfContents");
  initMgr();
  doScroll();
  if (ISPAGE) {
    $(window).scroll(doScroll);
    $(window).resize(changeMgr);
  }

  $("#to-top").click(function(event) {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
});
