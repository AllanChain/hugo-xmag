/*Scroll to top when arrow up clicked BEGIN*/
let turningHeight = null;
let originalHeight = null;
let toggleFlag = null;
$(window).scroll(doScroll);
function doScroll() {
  let height = $(window).scrollTop();
  let flag = height > turningHeight;
  if (flag == toggleFlag) return;
  if (flag) toggleDown();
  else toggleUp();
}
function toggleUp() {
  let toc = $("#TableOfContents");
  $('#to-top').css({bottom: "-3%", opacity: 0});
  if (window.innerWidth <= 950) {
    $(".article-meta").removeClass("meta-stick");
    $("main").css("padding-top", 0);
    $(".menu-btn").hide();
    toc.hide();
  }
  if (window.innerWidth >= 1200) {
    toc.addClass("toc-abs");
    toc.removeClass("toc-stick");
    $(".toc-abs").css("top", turningHeight);
  }
}
function toggleDown() {
  let toc = $("#TableOfContents");
  $('#to-top').css({bottom: "3%", opacity: 1});

  if (window.innerWidth <= 950) {
    let deltaHeight = originalHeight;
    $("main").css("padding-top", deltaHeight + "px");
    $(".menu-btn").css("display", "inline-block");
    $(".article-meta").addClass("meta-stick");
  }
  if (window.innerWidth >= 1200) {
    toc.addClass("toc-stick");
    toc.removeClass("toc-abs");
    $(".toc-stick").css("top", 0);
  }
}
$(function() {
  toggleUp();
  setTimeout(doScroll, 100);
  let tmp = $(".article-meta h1").offset();
  if (tmp) turningHeight = tmp.top;
  tmp = $(".article-meta h3").offset();
  if (tmp) turningHeight = tmp.top;
  tmp = $(".article-meta p").offset();
  if (tmp) turningHeight = tmp.top;
  let meta = $(".article-meta");
  originalHeight = meta.outerHeight();
  $(".toc-abs").css("top", turningHeight);
  $("#to-top").click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
});
let mobileTocTop = null;
function showMenu(ele) {
  let toc = $("#TableOfContents");
  toc.toggle();
  if (! mobileTocTop) {
    toc.css("top", $(".article-meta").outerHeight());
    toc.removeClass("toc-abs");
    toc.removeClass("toc-stick");
    toc.addClass("toc-mobile");
  }
}
function scrollToHeader(ele) {
  if (window.innerWidth <= 950) {
    $("#TableOfContents").toggle();
  }
  let pos = $(ele).offset().top - 50;
  $("html, body").animate({ scrollTop: pos });
  return false;
}
