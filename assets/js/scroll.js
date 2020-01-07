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
    this.state = 'mobile';
    this.originalHeight = $(".article-meta").outerHeight();
    toc.css("top", $(".article-meta").outerHeight());
    toc.addClass("toc-mobile");
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
    toc.css("top", $(".article-meta").outerHeight());
  }
  toggleMenu() {
    if (toc.css("max-height") == "0px") this.showMenu();
    else this.hideMenu();
  }
  showMenu() {
      toc.css("max-height", "100%");
  }
  hideMenu() {
      toc.css("max-height", 0);
  }
  exit() {
    toc.css("max-height", 0);
    $(".article-meta").removeClass("meta-stick");
    $("main").css("padding-top", 0);
    toc.removeClass();
  }
}
class PCToggleMgr extends ToggleMgr {
  constructor() {
    super();
    this.state = 'PC';
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
    toc.removeClass();
  }
}
function changeMgr() {
  const width = window.innerWidth;
  if (width <= turningWidth && prevWidth > turningWidth) {
    mgr.exit();
    mgr = new MobileToggleMgr();
  }
  if (width > turningWidth && prevWidth <= turningWidth) {
    mgr.exit();
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
function scrollToHeader(ele) {
  if (mgr.state == "mobile") mgr.hideMenu();
  let pos = $(ele).offset().top - 50;
  $("html, body").animate({ scrollTop: pos });
}
$(function() {
  if (ISPAGE) {
    toc = $("#TableOfContents");
    initMgr();
    doScroll();
    $(window).scroll(doScroll);
    $(window).resize(changeMgr);
    $("#to-top").click(
      (event) => $("html, body").animate({ scrollTop: 0 }, "slow")
    );
    $(".menu-btn").click(() => mgr.toggleMenu());
  }
});
