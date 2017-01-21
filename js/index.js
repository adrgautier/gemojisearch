$(document).ready(function(){

  emojione.imageType = 'svg';
  toastr.options.preventDuplicates = true;

  $.getJSON("https://rawgit.com/wooorm/gemoji/master/index.json",function(data){
   
    var values = [];
    Object.keys(data).map(function(symbol, index) {
      var tmp = data[symbol];
      
      var category = tmp.category,
        tags = tmp.tags,
        names = [];
        
      tmp.names.forEach(function(name){
        names.push(':'+name+':');
      })

      values.push({
        symbol: emojione.unicodeToImage(symbol),
        category: category,
        names: names,
        tags: tags
      });
    });

    var FJS = FilterJS(values, '#gemoji-list',{
      filter_on_init: true,
      template: '#gemoji-template',
      search: {ele: '#searchbox', fields: ['category','names','tags']},
    });

    new Clipboard('.name', {
        text: function(trigger) {
            var code = $.trim($(trigger).text());
            toastr.success(code+" copied !");
            return code;
        }
    });
  });
});