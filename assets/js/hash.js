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
$(function () {
  $(window).bind("hashchange", hashChange);
  // hacking shoud be taken over by js
  $("main :header").each((index, header) => header.id += "-nofocus");
  // do scrolling if is linked by hash
  hashChange(true);
});
