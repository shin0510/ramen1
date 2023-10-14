;(function (window) {
  "use strict";

  /**
   * DOMツリーの構築が完了したら実行する
   */
  $(function(){
    var elemBody    = $("body"),
        elemArticle = elemBody.find("#article");

    // ページングの値を設定する
    var pagingform = elemArticle.find("#pagingform").eq(0),
        action     = pagingform.attr("action");
    elemArticle.on("click", ".js-action-pagination", function() {
      var elem = system.parse_url($(this).attr("href"));
      pagingform.find("input[name=search_page]").val(elem.queries["page"]);
      pagingform.attr("action", action).submit();

      return false;
    });

    // 言語を変更
    elemBody.on("change", ".js-action-lang", function() {
      var self = $(this),
          lang_url = self.find(':selected').data("lang-url");

      // redirect to index
      location.href= "/" + lang_url;
    });

  });

})(window);
