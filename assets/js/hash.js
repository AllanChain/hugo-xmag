function hashChange(event) {
  let hash = location.hash;
  // Do nothing if is the symbol of done
  if (hash == "#") return;
  let header = $(hash + "-nofocus");
  if (header.length) {
    $('html, body').animate({
      scrollTop: header.offset().top - 70
    }, "slow");
    // Setting hash to `#` will automatically collapse menu?
    // Interesting...
    location.hash = "#";
  }
}
$(function () {
  $(window).bind("hashchange", hashChange);
  // hacking shoud be taken over by js
  $("main :header").each((index, header) => header.id += "-nofocus");
  // do scrolling if is linked by hash
  hashChange();
});
