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
      scrollTop: header.offset().top - 70
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
      console.log(heading);
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
$(function() {
  if (HAS_TOC) createToC();
  $(window).bind("hashchange", hashChange);
  // hacking shoud be taken over by js
  $("main :header").each((index, header) => header.id += "-nofocus");
  // do scrolling if is linked by hash
  hashChange(true);
});
