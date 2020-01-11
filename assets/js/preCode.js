$(() => {
  $('pre').each((index, ele) => {
    const lang = $(ele).children('code').data('lang');
    $(document.createElement('span'))
      .html(lang) // .toUpperCase())
      .appendTo(
        $(document.createElement('div'))
        .prependTo($(ele))
        .addClass('code-lang')
      );
  });
})
