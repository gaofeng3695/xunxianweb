!function(t){"use strict";function e(){var e=this,s=setTimeout(function(){e.$element.off(t.support.transition.end),i.call(e)},500);this.$element.one(t.support.transition.end,function(){clearTimeout(s),i.call(e)})}function i(t){this.$element.hide().trigger("hidden"),s.call(this)}function s(e){var i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var s=t.support.transition&&i;this.$backdrop=t('<div class="modal-backdrop '+i+'" />').appendTo(document.body),"static"!=this.options.backdrop&&this.$backdrop.click(t.proxy(this.hide,this)),s&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),s?this.$backdrop.one(t.support.transition.end,e):e()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(t.support.transition.end,t.proxy(o,this)):o.call(this)):e&&e()}function o(){this.$backdrop.remove(),this.$backdrop=null}function n(){var e=this;this.isShown&&this.options.keyboard?t(document).on("keyup.dismiss.modal",function(t){27==t.which&&e.hide()}):this.isShown||t(document).off("keyup.dismiss.modal")}var a=function(e,i){this.options=i,this.$element=t(e).delegate('[data-dismiss="modal"]',"click.dismiss.modal",t.proxy(this.hide,this))};a.prototype={constructor:a,toggle:function(){return this[this.isShown?"hide":"show"]()},show:function(){var e=this;this.isShown||(t("body").addClass("modal-open"),this.isShown=!0,this.$element.trigger("show"),n.call(this),s.call(this,function(){var i=t.support.transition&&e.$element.hasClass("fade");!e.$element.parent().length&&e.$element.appendTo(document.body),e.$element.show(),i&&e.$element[0].offsetWidth,e.$element.addClass("in"),i?e.$element.one(t.support.transition.end,function(){e.$element.trigger("shown")}):e.$element.trigger("shown")}))},hide:function(s){if(s&&s.preventDefault(),this.isShown){this.isShown=!1,t("body").removeClass("modal-open"),n.call(this),this.$element.trigger("hide").removeClass("in"),t.support.transition&&this.$element.hasClass("fade")?e.call(this):i.call(this)}}},t.fn.modal=function(e){return this.each(function(){var i=t(this),s=i.data("modal"),o=t.extend({},t.fn.modal.defaults,i.data(),"object"==typeof e&&e);s||i.data("modal",s=new a(this,o)),"string"==typeof e?s[e]():o.show&&s.show()})},t.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0},t.fn.modal.Constructor=a,t(function(){t("body").on("click.modal.data-api",'[data-toggle="modal"]',function(e){var i,s=t(this),o=t(s.attr("data-target")||(i=s.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"")),n=o.data("modal")?"toggle":t.extend({},o.data(),s.data());e.preventDefault(),o.modal(n)})})}(window.jQuery);