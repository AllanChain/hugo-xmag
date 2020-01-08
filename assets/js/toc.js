let scrollLine = 0;
let prevHeadingIndex = null;

function hashChange(event, inited) {
  let hash = decodeURI(location.hash);
  // Do nothing if is the symbol of done
  // unless is the first call;
  if (hash.charAt(hash.length-1) == "~"){
    if (inited) return;
    else hash = hash.slice(0, -1);
  }
  let header = $(hash + "-nofocus");
  if (header.length) {
    $('html, body').animate({
      scrollTop: header.offset().top - scrollLine + 1
    }, "slow");
    mgr.mobileHideMenu();
    // Setting hash to `#` will automatically collapse menu?
    // No, the browser will first jump to top,
    // but the js animation will drag it down again.
    // But this will introduce some flashing bug.
    // So we will try adding a `~` suffix
    location.hash = hash + "~";
  }
}

function getScrollLine() {
  scrollLine = $($("main :header")[0]).offset().top - 1;
  const maxLine = window.innerHeight * 0.3;
  if (scrollLine > maxLine) scrollLine = maxLine;
}

function createToC() {
  let primaryHeading = 6;
  let headings = [];
  $("main :header").each(
    (index, header) => {
      let level = header.tagName.slice(-1);
      if(level < primaryHeading) primaryHeading = level;
      headings.push({
        level: level,
        id: header.id,
        title: header.innerHTML
      });
    }
  );
  let root = $(document.createElement('ul'))
    .appendTo($("#toc"));
  let parents = [root];
  let prevLevel = primaryHeading;
  let parentIndex = 0;
  headings.forEach(
    (heading, index) => {
      if (heading.level < prevLevel)
        parentIndex -= prevLevel - heading.level;
      else
        for (let i=prevLevel; i < heading.level; i++, parentIndex++)
          parents[parentIndex + 1] = $(document.createElement('ul'))
            .appendTo(parents[parentIndex]);
      prevLevel = heading.level;
      $(document.createElement('a'))
        .attr("href", "#" + heading.id)
        .html(heading.title)
        .appendTo($(document.createElement('li'))
          .appendTo(parents[parentIndex]));
    }
  );
}
function currentHeading() {
  // const recordLine = window.innerHeight * 0.6;
  const scrollTop = $(window).scrollTop();
  let current = $("main :header").length - 1;
  // find the first one below the line
  // and return the previous one
  // if all above, the last will be used, see `let`
  // if all below, the first will be used, see `if`
  $("main :header").each(
    (index, heading) => {
      if ($(heading).offset().top - scrollTop > scrollLine) {
        current = index-1;
        return false;
      }
    }
  );
  if (current == -1) current = 0;

  if (current == prevHeadingIndex) return;
  $("#toc li a").removeClass("toc-focus");
  let currentToC = $("#toc li a").eq(current);
  currentToC.addClass("toc-focus");
  $("#menu-toc").animate({
    scrollTop: currentToC.offset().top - $("#menu-toc").offset().top
    + $("#menu-toc").scrollTop() - window.innerHeight * 0.4
  }, 100, "linear");
  prevHeadingIndex = current;
}
$(function() {
  if (HAS_TOC) {
    createToC();
    $(window).resize(getScrollLine);
    getScrollLine();
    $(window).scroll(currentHeading);
    currentHeading();
  }
  $(window).bind("hashchange", hashChange);
  // hacking shoud be taken over by js
  $("main :header").each((index, header) => header.id += "-nofocus");
  // do scrolling if is linked by hash
  hashChange(true);
});
