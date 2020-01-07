'use strict'

let toc = null;
let mgr;
let prevWidth = null;

// Directly bind `mgr.doScroll` will make `this` become window
let doScroll = () => mgr.doScroll();

const turningWidth = 950;
const posibleElements = [".article-meta p", ".article-meta h3", ".article-meta h1"];


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
    $('#to-top').removeClass("visible");
  }
  toggleDown() {
    $('#to-top').addClass("visible");
  }
  mobileHideMenu() {
    // just let PCToggleMgr not BB
  }
}
class MobileToggleMgr extends ToggleMgr {
  constructor() {
    super();
    this.state = 'mobile';
    this.originalHeight = $(".article-meta").outerHeight();
    toc.css("top", $(".article-meta").outerHeight());
    toc.addClass("toc-mobile");
    // do corresponding toggle to initiate
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
    // for the css, see comment below
    toc.css("top", $(".article-meta").outerHeight());
  }
  toggleMenu() {
    if (toc.css("max-height") == "0px") this.mobileShowMenu();
    else this.mobileHideMenu();
  }
  mobileShowMenu() {
    // the height will change if you resize..
    // so it's safer to check again
    // if you only set `top` here, the first time
    // to open menu will have the animation for the `top` too
    toc.css("top", $(".article-meta").outerHeight());
    toc.css("max-height", "100%");
  }
  mobileHideMenu() {
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
$(function() {
  toc = $("#menu-toc");
  initMgr();
  doScroll();
  $(window).scroll(doScroll);
  $(window).resize(changeMgr);
  // if use click the animation will prevent the mouse up
  // event to happen on the rocket
  $("#to-top").mousedown(function(event) {
    $("html, body").animate({ scrollTop: 0 }, 500)
    // if just use css :active, the time for active is
    // not under control, so just do js stuff
    $('#to-top').addClass("active");
    // make sure remove active after `visible` removed
    setTimeout(function() {
      $('#to-top').removeClass("active");
    }, 600);
  });
  $(".menu-btn").click(() => mgr.toggleMenu());
  $("main").click(() => mgr.mobileHideMenu());
});
