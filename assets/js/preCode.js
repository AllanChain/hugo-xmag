$(() => {
  $('div.highlight').each((index, ele) => {
    const lang = $(ele)
      .find('pre')
      .eq(-1)
      .children('code')
      .data('lang');
    console.log(lang);
    $(document.createElement('span'))
      .html(lang) // .toUpperCase())
      .appendTo(
        $(document.createElement('div'))
        .prependTo($(ele))
        .addClass('code-lang')
      );
  });
})
