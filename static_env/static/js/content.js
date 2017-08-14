(function (a) {
    a.fn.touchwipe = function (c) {
        var b = {
            min_move_x: 20,
            min_move_y: 20,
            wipeLeft: function () { },
            wipeRight: function () { },
            wipeUp: function () { },
            wipeDown: function () { },
            preventDefaultEvents: true
        };
        if (c) {
            a.extend(b, c)
        }
        this.each(function () {
            var f;
            var d;
            var j = false;
            function i() {
                this.removeEventListener("touchmove", g);
                f = null;
                j = false
            }
            function g(n) {
                if (b.preventDefaultEvents) {
                    n.preventDefault()
                }
                if (j) {
                    var k = n.touches[0].pageX;
                    var o = n.touches[0].pageY;
                    var m = f - k;
                    var l = d - o;
                    if (Math.abs(m) >= b.min_move_x) {
                        i();
                        if (m > 0) {
                            b.wipeLeft()
                        } else {
                            b.wipeRight()
                        }
                    } else {
                        if (Math.abs(l) >= b.min_move_y) {
                            i();
                            if (l > 0) {
                                b.wipeDown()
                            } else {
                                b.wipeUp()
                            }
                        }
                    }
                }
            }
            function h(k) {
                if (k.touches.length == 1) {
                    f = k.touches[0].pageX;
                    d = k.touches[0].pageY;
                    j = true;
                    this.addEventListener("touchmove", g, false)
                }
            }
            if ("ontouchstart" in document.documentElement) {
                this.addEventListener("touchstart", h, false)
            }
        });
        return this
    }
}
)(jQuery);
if (typeof (johnLewis) === undefined || typeof (johnLewis) !== "object") {
    johnLewis = {}
}
if (typeof (johnLewis.CMS) === undefined || typeof (johnLewis.CMS) !== "object") {
    johnLewis.CMS = {}
}
if (typeof (johnLewis.CMS.Widget) === undefined || typeof (johnLewis.CMS.Widget) !== "object") {
    johnLewis.CMS.Widget = {}
}
if (johnLewis.Module === undefined || typeof johnLewis.Module !== "object") {
    johnLewis.Module = {}
}
johnLewis.CMS.Widget.shareBookmark = function (g, d) {
    var a = $(g)
      , h = $(d).parent().parent()
      , b = $(".mod-share-print")
      , f = b.innerHeight()
      , c = $(window);
    h.find("h3 a").click(function (i) {
        i.preventDefault()
    });
    a.mouseenter(function (j) {
        var k = b.offset().top + f + 100 - c.height()
          , i = (c.scrollTop() < k);
        if (i === true && $.browser.version !== 6) {
            $(this).parent().addClass("selected showTop")
        } else {
            $(this).parent().addClass("selected")
        }
        if ($.browser.msie && $.browser.version === 7) {
            h.find("li a").trigger("mouseover")
        }
        j.preventDefault()
    });
    h.mouseleave(function (i) {
        $(this).parents(".selected").removeClass("selected");
        $(this).parent(".showTop").removeClass("showTop");
        i.preventDefault()
    })
}
;
johnLewis.CMS.Widget.accordion = function () {
    function a() {
        var b = $.browser.msie && $.browser.version < 7;
        $(".cms-expandable, .cms-expandable-open", ".parbase").each(function () {
            var d = $(this)
              , g = d.find(".cms-expand-wrapper")
              , c = d.find(".expand-lnk")
              , f = g.height();
            if (b) {
                c.mouseover(function () {
                    $("span", this).css("text-decoration", "underline")
                }).mouseout(function () {
                    $("span", this).css("text-decoration", "none")
                })
            }
            c.bind("click", function (k) {
                var h = $(this), j = j = Math.round(Math.sqrt(f) * 20), l, i;
                k.preventDefault();
                if ($(h).attr("data-jl-more") && $(h).attr("data-jl-less")) {
                    l = h.data("jl-more");
                    i = h.data("jl-less")
                } else {
                    l = c.data("jl-more") || c.text();
                    i = c.data("jl-less") || c.text()
                }
                if (h.hasClass("expand-more")) {
                    $("body,html").animate({
                        scrollTop: $(this).offset().top
                    }, 500);
                    g.slideDown(j);
                    h.attr({
                        title: i
                    }).removeClass("expand-more").addClass("expand-less")
                } else {
                    if (h.hasClass("expand-less")) {
                        $("body,html").animate({
                            scrollTop: $(".accordion-container").offset().top - 200
                        }, 500);
                        g.slideUp(j, function () { });
                        h.attr({
                            title: l
                        }).removeClass("expand-less").addClass("expand-more")
                    }
                }
            })
        })
    }
    return {
        init: a
    }
}();
johnLewis.CMS.Widget.shopInfo = function () {
    var f = $("section.info-tab-container > div", ".shop-info-container"), g, h, a, d = $.browser.msie && $.browser.version < 7;
    function j() {
        f.hide().filter(":first").show();
        $(".shop-info-container .shop-tabs li:first").addClass("selected");
        i();
        c()
    }
    function i() {
        var k = window.location.hash;
        $(".shop-info-container .shop-tabs li a").each(function () {
            var o, n, p, m, l;
            if (k === $(this).attr("href")) {
                $("li.selected", $(this).parents("ul")).removeClass("selected");
                $(this).closest("li").addClass("selected");
                f.hide();
                f.filter($(this).attr("href")).show()
            } else {
                o = k.slice(1);
                if (o) {
                    n = $("#" + o).length ? $("#" + o) : $('[name="' + o + '"]');
                    p = n.closest(".info-tab");
                    m = p.index(".info-tab");
                    if (p.length) {
                        f.hide();
                        p.show();
                        l = n.closest(".shop-info-container").find(".shop-tabs");
                        l.find("li.selected").removeClass("selected").end().find("li").eq(m).addClass("selected");
                        johnLewis.smoothScroll.scrollPage(n, 1)
                    }
                }
            }
        })
    }
    function c() {
        $(".shop-tabs").delegate("a", "click", function (k) {
            k.preventDefault();
            f.hide();
            f.filter(this.hash).show();
            if ((this.hash) === "#how-to-find-tab") {
                b()
            }
            $("li.selected", $(this).parents("ul")).removeClass("selected");
            $(this).parent().addClass("selected")
        })
    }
    function b() {
        if (d) {
            return
        }
        g = lat || "";
        h = lng || "";
        a = overlaytitle || "";
        popupString = storeInfo || "";
        var p = new google.maps.LatLng(g, h)
          , l = {
              zoom: 17,
              center: p,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          , n = new google.maps.Map(document.getElementById("jl-map"), l)
          , k = new google.maps.Marker({
              position: p,
              map: n,
              title: a
          })
          , o = storeInfo
          , m = new google.maps.InfoWindow({
              content: o,
              maxWidth: 140
          });
        google.maps.event.addListener(k, "click", function () {
            m.open(n, k)
        })
    }
    return {
        init: j
    }
}();
johnLewis.CMS.Widget.authorProfile = function () {
    function a() {
        b()
    }
    function b() {
        $(".author-info h2 span.popup-trigger", ".author-profile-widget").bind("click", function () {
            var d = $(this).parents(".author-profile-widget")
              , c = $(this).width() + 7;
            $(".author-info .author-popup", d).css("left", c + "px");
            $(".author-popup", d).show()
        });
        $(".author-info .author-popup a.close", ".author-profile-widget").bind("click", function (c) {
            c.preventDefault();
            $(this).parent().hide()
        })
    }
    return {
        init: a
    }
}();
johnLewis.CMS.Widget.heroCarousel = function () {
    var l, g, i, z, o, q, h, a = 5000;
    function y() {
        l = $(".carousel-container");
        i = $(".carousel-slide-indicator", l);
        g = $(".carousel-control-bar-next, .carousel-control-bar-prev", l);
        x();
        j(false);
        c(false)
    }
    function x() {
        z = $(".hero-right-container", l);
        p();
        u();
        r();
        d()
    }
    function u(A) {
        o = A || 0;
        $("ul li", i).eq(o).addClass("active");
        $(z).eq(o).fadeIn(300, function () {
            i.fadeIn(500);
            h = setTimeout(function () {
                b()
            }, a)
        })
    }
    function p() {
        var A = "";
        $(z).each(function (B) {
            A += '<li data-jl-indicator="' + B + '"';
            if (B === z.length - 1) {
                A += ' class="last"'
            }
            A += '><a href="#"></a></li>'
        });
        $("<ul></ul>").html(A).appendTo(i)
    }
    function b() {
        q = o;
        o++;
        if (o === z.length) {
            o = 0
        }
        s();
        v(o)
    }
    function v(A) {
        $(z).eq(q).fadeOut(200);
        o = A || 0;
        $("ul li", i).removeClass("active");
        $("ul li", i).eq(o).addClass("active");
        $(z).eq(o).fadeIn(400, function () {
            j(false);
            if (!w()) {
                h = setTimeout(function () {
                    b()
                }, a)
            }
        })
    }
    function f() {
        h = setTimeout(function () {
            b()
        }, a)
    }
    function s() {
        clearTimeout(h)
    }
    function r() {
        var A = 0;
        $(".hero-right-container").bind("mousemove", function (B) {
            A++;
            if (A === 1) {
                B.preventDefault();
                c(true);
                s();
                g.fadeIn(500)
            } else {
                $(".hero-inner").unbind("mousemove")
            }
        })
    }
    function d() {
        l.bind("mouseenter", function (A) {
            A.preventDefault();
            c(true);
            s();
            g.fadeIn(500)
        });
        l.bind("mouseleave", function (A) {
            A.preventDefault();
            c(false);
            f();
            g.fadeOut(500)
        });
        i.delegate("li a", "click", function (B) {
            B.preventDefault();
            if (!n()) {
                j(true);
                var A = Number($(this).parent().attr("data-jl-indicator"));
                s();
                q = o;
                v(A)
            }
        });
        $(".carousel-control-bar-next", l).bind("click", function (B) {
            B.preventDefault();
            var A;
            if (!n()) {
                j(true);
                q = o;
                if (o === z.length - 1) {
                    A = 0
                } else {
                    A = o + 1
                }
                v(A);
                s()
            }
        });
        $(".carousel-control-bar-prev", l).bind("click", function (B) {
            B.preventDefault();
            var A;
            if (!n()) {
                j(true);
                q = o;
                if (o === 0) {
                    A = z.length - 1
                } else {
                    A = o - 1
                }
                v(A);
                s()
            }
        })
    }
    function n() {
        return l.data("animating")
    }
    function j(A) {
        l.data("animating", A)
    }
    function w() {
        return l.data("hovering")
    }
    function c(A) {
        l.data("hovering", A)
    }
    function k() {
        var A;
        if (!n()) {
            j(true);
            q = o;
            if (o === 0) {
                A = z.length - 1
            } else {
                A = o - 1
            }
            v(A);
            s()
        }
        e.preventDefault()
    }
    function m() {
        var A;
        if (!n()) {
            j(true);
            q = o;
            if (o === z.length - 1) {
                A = 0
            } else {
                A = o + 1
            }
            v(A);
            s()
        }
        e.preventDefault()
    }
    if (!$.browser.msie) {
        $(".hero-right-container").touchwipe({
            wipeLeft: function () {
                m()
            },
            wipeRight: function () {
                k()
            },
            preventDefaultEvents: false
        })
    }
    return {
        init: y
    }
}();
johnLewis.CMS.Widget.fourGridCarousel = function () {
    $(".four-grid-carousel-widget").each(function () {
        var a = $(this)
          , m = a.find(".grid-items-wrapper")
          , k = m.find("ul")
          , p = k.find("li")
          , j = 700
          , l = p.width()
          , n = l * 4 + 52
          , d = Math.ceil(p.length / 4)
          , i = 1
          , o = a.find(".cms-btn-prev")
          , b = a.find(".cms-btn-next")
          , g = "";
        function h(q) {
            if (q === "left") {
                k.animate({
                    left: "-=" + n
                }, j, function () { })
            } else {
                k.animate({
                    left: "+=" + n
                }, j, function () { })
            }
        }
        function f() {
            if (i !== 1 && o.hasClass("prev-disabled")) {
                o.removeClass("prev-disabled")
            } else {
                if (i !== d && b.hasClass("next-disabled")) {
                    b.removeClass("next-disabled")
                }
            }
        }
        function c() {
            if (i === d) {
                b.addClass("next-disabled")
            } else {
                if (i === 1) {
                    o.addClass("prev-disabled")
                }
            }
        }
        b.bind("click", function (q) {
            q.preventDefault();
            if (i < d) {
                if (!k.is(":animated")) {
                    h("left");
                    i++;
                    f();
                    c()
                }
            }
        });
        o.bind("click", function (q) {
            q.preventDefault();
            if (i > 1) {
                if (!k.is(":animated")) {
                    h("right");
                    i--;
                    f();
                    c()
                }
            }
        })
    })
}
;
johnLewis.CMS.Widget.socialBookmark = function () {
    var h, c, a, d, f, b, g;
    h = document.title;
    c = document.location.href;
    a = "http://www.stumbleupon.com/submit?url=" + c + "&title=" + h;
    d = "http://twitter.com/home?status=" + h + " at " + c;
    f = "http://www.facebook.com/sharer.php?u=" + c + "&t=" + h;
    b = "http://myweb.yahoo.com/myresults/bookmarklet?u=" + c + "&t=" + h + "&ei=UTF";
    g = "http://www.myspace.com/Modules/PostTo/Pages/?u=" + c;
    $(".heading-socialbookmark-widget #share .stumbleupon").bind("click", function () {
        $(this).attr("href", a)
    });
    $(".heading-socialbookmark-widget #share .twitter").bind("click", function () {
        $(this).attr("href", d)
    });
    $(".heading-socialbookmark-widget #share .facebook").bind("click", function () {
        $(this).attr("href", f)
    });
    $(".heading-socialbookmark-widget #share .yahoo").bind("click", function () {
        $(this).attr("href", b)
    });
    $(".heading-socialbookmark-widget #share .myspace").bind("click", function () {
        $(this).attr("href", g)
    })
}
;
johnLewis.CMS.Widget.ie6FirstChild = function () {
    if ($.browser.msie && $.browser.version < 7) {
        $(".col-12-box > *, .col-12-box-sides >*, .col-12-box-divider >*, .col-12-center >section, .col-13 >*, .col-6 >*, .col-3 >*, .col-10 >*, .col-16 >*, .split >*").addClass("child")
    }
}
;
if ($(".cq-hide-h1").length) {
    $("h1.cat-main-title").addClass("cq-h1-hidden")
}
$(function () {
    var b = 1;
    var a = false;
    $(".gallery_list a").click(function () {
        var c = $(this).attr("data-id");
        if (c != b && !a) {
            a = true;
            $(".gallery_container_image_" + b).fadeOut("slow", function () {
                $(".gallery_container_image_" + c).fadeIn("slow");
                b = c;
                a = false
            })
        }
        return false
    })
});
$("select#cq-int-delivery-sel").change(function () {
    var b = $(this).val();
    var a = 500;
    if (b) {
        $(".cq-int-delivery-country:visible").fadeOut(a, function () {
            $("#cq-int-delivery-" + b).fadeIn(a)
        })
    } else {
        $(".cq-int-delivery-country").fadeOut(a)
    }
});
function openContent() {
    var a = window.location.hash.substring(1);
    if (/^[a-zA-Z\d\-_]+$/.test(a)) {
        var b = $('a[name="' + a + '"]');
        b.closest(".expand-lnk").click()
    }
}
(function (h) {
    function a(o) {
        var r = false
          , q = ["Webkit", "Moz", "O", "ms"];
        var u = document.createElement("div");
        if (typeof u.style[o] === "string") {
            r = o
        } else {
            var n = o.charAt(0).toUpperCase() + o.substr(1);
            for (var s in q) {
                if (typeof u.style[q[s] + n] === "string") {
                    r = q[s] + n;
                    break
                }
            }
        }
        u = null;
        return r
    }
    function l() {
        var n = {
            WebkitTransition: "-webkit-",
            MozTransition: "-moz-",
            msTransition: "-ms-",
            OTransition: "-o-",
            transition: ""
        };
        if (/(Safari|Chrome)/.test(navigator.userAgent)) {
            return n.WebkitTransition
        }
        return n[a("transition")]
    }
    function j() {
        var o = false
          , p = document.createElement("div");
        var n = a("transform");
        p.style[n] = "rotateY(45deg)";
        if (p.style[n] !== "") {
            o = true
        }
        p = null;
        return o
    }
    function m(r, p) {
        var q = a("transform");
        var n = {
            left: 0,
            top: 0
        };
        if (q && p) {
            var o = r.css(q);
            if (o.indexOf("matrix") === 0) {
                o = o.split("(")[1].split(")")[0].split(/,\s*/);
                n.left = parseInt(o[4], 10);
                n.top = parseInt(o[5], 10)
            }
        } else {
            n = r.position()
        }
        return n
    }
    var i = a("transition");
    var b = a("transform");
    var c = l();
    var k = j();
    function d(o, q, n) {
        if (typeof n === "object") {
            var p = c + "transform";
            g(o, p, n.duration, n.easing, n.delay, n.complete);
            if (q === m(o, true).left) {
                n.complete.call(o, p)
            }
        }
        if (k) {
            o.css(b, "translate3d(" + parseInt(q, 10) + "px, 0px, 0px)")
        } else {
            o.css(b, "translate(" + parseInt(q, 10) + "px, 0px)")
        }
    }
    function g(u, y, r, x, v, o) {
        var z = {
            linear: "linear",
            swing: "cubic-bezier(.02,.01,.47,1)",
            easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
            easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
            easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
            easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
            easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
            easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
            easeOutExpo: "cubic-bezier(.19,1,.22,1)",
            easeInOutExpo: "cubic-bezier(1,0,0,1)",
            easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
            easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
            easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
            easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
            easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
            easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
            easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
            easeOutQuint: "cubic-bezier(.23,1,.32,1)",
            easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
            easeInSine: "cubic-bezier(.47,0,.745,.715)",
            easeOutSine: "cubic-bezier(.39,.575,.565,1)",
            easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
            easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
            easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
            easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
        };
        var s = {
            transition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend"
        };
        y = y.split(/\s+/);
        r = (parseInt(r, 10) / 1000 || 0) + "s";
        x = z[x] || z.swing;
        if (typeof v === "function") {
            o = v;
            v = 0
        }
        v = (parseInt(v, 10) / 1000 || 0) + "s";
        o = o || h.noop;
        var q = u.css(i);
        u.bind(s[i], function (A) {
            var n = A.originalEvent;
            if (n.target === this) {
                o.call(u, n.propertyName);
                h(this).css(i, q).unbind(A)
            }
            A.stopPropagation()
        });
        var w = "";
        for (var p = 0; p < y.length; p++) {
            w += y[p] + " " + r + " " + x + " " + v + ", "
        }
        u.css(i, w.slice(0, -2))
    }
    function f(o, r) {
        this.offset = 0;
        this.visible = 0;
        this.lock = false;
        this.timer = 0;
        this.api = {};
        this.settings = r;
        this.container = h(o);
        this.list = this.container.find("ul");
        this.total = this.list.children("li").length;
        this.slide = this.list.children("li:first-child");
        this.cssok = a("transition") && this.settings.useCSS;
        var q = this;
        if (this.total === 0) {
            return null
        }
        if (this.settings.moveSlides === "auto") {
            this.settings.moveSlides = 9999
        } else {
            this.settings.moveSlides = parseInt(this.settings.moveSlides, 10) || 1
        }
        this.settings.itemWidth = parseInt(this.settings.itemWidth, 10) || 0;
        if (this.settings.itemWidth > 0) {
            this.list.children().css("width", this.settings.itemWidth)
        }
        this.settings.itemHeight = parseInt(this.settings.itemHeight, 10) || 0;
        if (this.settings.itemHeight > 0) {
            this.list.children().css("height", this.settings.itemHeight)
        }
        if (this.settings.itemMargin !== false) {
            this.list.children().css("margin-right", parseInt(this.settings.itemMargin, 10) || 0)
        }
        if (!this.settings.itemKeepRatio) {
            this.list.children().css({
                height: "auto"
            })
        }
        this.slide_width = this.slide.width();
        this.slide_margin = parseInt(this.slide.css("margin-right"), 10) || 0;
        this.slide_ratio = this.slide.height() / this.slide.width();
        if (this.settings.maxVisible > 0) {
            var s = this.settings.maxVisible * (this.slide_width + this.slide_margin) - this.slide_margin;
            this.container.css("max-width", s)
        } else {
            this.container.css("max-width", this.settings.maxWidth)
        }
        if (this.settings.mode === "carousel") {
            var n = this.list.children().clone(true)
              , v = this.list.children().clone(true);
            this.list.prepend(document.createComment(" END CLONED ")).prepend(n).prepend(document.createComment(" BEGIN CLONED "));
            this.list.append(document.createComment(" BEGIN CLONED ")).append(v).append(document.createComment(" END CLONED "));
            this.offset = this.total;
            this.total = this.total * 3;
            var u = this.offset * (this.slide_width + this.slide_margin);
            if (this.cssok) {
                d(this.list, -u)
            } else {
                this.list.css("left", -u)
            }
        }
        if (this.settings.ticker && this.settings.mode !== "normal") {
            this.enableTicker()
        }
        if (this.settings.navigation) {
            this.container.append(['<div class="cq-sushi__navigation">', '<a href="" class="cq-sushi__prev">' + this.settings.prevNav + "</a>", '<a href="" class="cq-sushi__next">' + this.settings.nextNav + "</a>", "</div>"].join("\n"));
            this.updateNavigation(this.offset);
            this.container.find(".cq-sushi__prev").click(function (p) {
                q.slidePrevious();
                p.preventDefault()
            }).end().find(".cq-sushi__next").click(function (p) {
                q.slideNext();
                p.preventDefault()
            }).end()
        }
        if (this.settings.pagination && this.settings.mode !== "carousel") {
            this.container.append('<div class="cq-sushi__pagination"></div>')
        }
        if (this.settings.touchSwipe) {
            this.enableTouchSwipe()
        }
        if (this.settings.mouseWheel) {
            this.enableMouseWheel()
        }
        if (this.settings.keyboard) {
            this.enableKeyboard()
        }
        h(window).bind("resize", function () {
            window.clearTimeout(q.timer);
            q.timer = window.setTimeout(function () {
                q.resizeSlides()
            }, q.settings.fitDelay)
        }).trigger("resize");
        h.extend(this.api, {
            slideNext: function () {
                q.slideNext()
            },
            slidePrevious: function () {
                q.slidePrevious()
            },
            slideTo: function (w) {
                q.slideTo(w)
            },
            isSliding: function () {
                return q.isSliding()
            },
            getVisibleSlides: function () {
                return q.getVisibleSlides()
            },
            tickerPause: function () {
                if ("tickerPause" in q) {
                    q.tickerPause()
                }
            },
            tickerPlay: function () {
                if ("tickerPlay" in q) {
                    q.tickerPlay()
                }
            }
        });
        this.container.data("cqSushi", this.api);
        this.container.bind("cqSushi", function (p, x, w) {
            if (x in q.api) {
                q.api[x](w)
            }
            return false
        });
        window.setTimeout(function () {
            q.container.addClass("cq-sushi__slides--ready");
            q.getVisibleSlides().addClass("cq-sushi--after-slide");
            if (typeof q.settings.slidesReady === "function") {
                q.settings.slidesReady.call(q.container.get(0), q.api)
            }
        }, parseInt(this.settings.fitDelay, 10) + parseInt(this.settings.fitDuration, 10))
    }
    f.prototype.slideNext = function () {
        if (!this.lock) {
            this.slideOffset(this.getOffset("next"))
        }
    }
    ;
    f.prototype.slidePrevious = function () {
        if (!this.lock) {
            this.slideOffset(this.getOffset("prev"))
        }
    }
    ;
    f.prototype.slideTo = function (r) {
        if (this.settings.mode === "carousel") {
            r = this.total / 3 + Math.min(r, this.total / 3 - this.visible)
        }
        var u = r - this.offset;
        var q = u > 0 ? "next" : "prev";
        var o = this.offset;
        for (var v = 0; v < Math.abs(u) ; v++) {
            this.offset = this.getOffset(q)
        }
        var s = this.offset;
        this.offset = o;
        this.slideOffset(s)
    }
    ;
    f.prototype.isSliding = function () {
        return this.lock
    }
    ;
    f.prototype.getVisibleSlides = function () {
        return this.list.children().slice(this.offset, this.offset + this.visible)
    }
    ;
    f.prototype.getOffset = function (r) {
        var n = Math.min(this.settings.moveSlides, this.visible);
        if (r === "prev") {
            if (this.settings.mode === "carousel" && this.offset === 0) {
                var q = this.total / 3 * (this.slide.width() + this.slide_margin);
                if (this.cssok) {
                    if (this.settings.effect !== "fade") {
                        d(this.list, -q)
                    }
                } else {
                    if (this.settings.effect !== "fade") {
                        this.list.css("left", -q)
                    }
                }
                return this.total / 3 - n
            } else {
                if (this.settings.mode === "circular" && this.offset === 0) {
                    return this.total - this.visible
                } else {
                    return this.offset - (this.offset > n ? n : this.offset)
                }
            }
        }
        if (r === "next") {
            var o = this.total - (this.offset + this.visible);
            if (this.settings.mode === "carousel" && o === 0) {
                var q = (this.offset - this.total / 3) * (this.slide.width() + this.slide_margin);
                if (this.cssok) {
                    if (this.settings.effect !== "fade") {
                        d(this.list, -q)
                    }
                } else {
                    if (this.settings.effect !== "fade") {
                        this.list.css("left", -q)
                    }
                }
                return this.offset - this.total / 3 + n
            } else {
                if (this.settings.mode === "circular" && o === 0) {
                    return 0
                } else {
                    return this.offset + (o > n ? n : o)
                }
            }
        }
    }
    ;
    f.prototype.slideOffset = function (r, n) {
        if (!n && r === this.offset) {
            return
        }
        var v = this;
        var o = function () {
            v.lock = false;
            v.offset = r;
            if (!n) {
                v.syncContainerHeight();
                v.list.children(".cq-sushi--after-slide").removeClass("cq-sushi--after-slide");
                v.getVisibleSlides().removeClass("cq-sushi--before-slide").addClass("cq-sushi--after-slide").trigger("cq-sushi--after-slide");
                if (typeof v.settings.afterSlide === "function") {
                    v.settings.afterSlide.call(v.container.get(0), v.getVisibleSlides())
                }
            }
        };
        this.lock = true;
        if (!n) {
            this.list.children().slice(r, r + this.visible).not(".cq-sushi--after-slide").addClass("cq-sushi--before-slide").trigger("cq-sushi--before-slide");
            if (typeof this.settings.beforeSlide === "function") {
                this.settings.beforeSlide.call(this.container.get(0), this.getVisibleSlides())
            }
        }
        if (this.settings.pagination && this.settings.mode !== "carousel") {
            var u = Math.min(this.settings.moveSlides, this.visible);
            var w = Math.ceil(r / u);
            this.container.find(".cq-sushi__pagination a:eq(" + w + ")").addClass("cq-sushi--active").siblings().removeClass("cq-sushi--active")
        }
        this.updateNavigation(r);
        var p = r * (this.slide.width() + this.slide_margin);
        if (this.cssok) {
            if (this.settings.effect === "fade") {
                var q = this.getVisibleSlides();
                var s = this.list.children().slice(r, r + this.visible);
                if (this.settings.fadeDirection * r > this.offset * this.settings.fadeDirection) {
                    s = Array.prototype.reverse.call(s);
                    q = Array.prototype.reverse.call(q)
                }
                h.each(q, function (x) {
                    g(h(this), "opacity", v.settings.fadeDuration, v.settings.fadeEasing, v.settings.fadeDelay * x, function () {
                        if (x < v.visible - 1) {
                            return
                        }
                        s.css("opacity", 0);
                        d(v.list, -p, {
                            duration: 0,
                            easing: "linear",
                            delay: 15,
                            complete: function () {
                                h.each(s, function (y) {
                                    g(h(this), "opacity", v.settings.fadeDuration, v.settings.fadeEasing, v.settings.fadeDelay * y, function () {
                                        if (y < v.visible - 1) {
                                            return
                                        }
                                        q.add(s).css("opacity", "");
                                        o()
                                    });
                                    h(this).css("opacity", 1)
                                })
                            }
                        })
                    });
                    h(this).css("opacity", 0)
                })
            } else {
                d(this.list, -p, {
                    duration: this.settings.slideDuration,
                    easing: this.settings.slideEasing,
                    delay: this.settings.slideDelay,
                    complete: o
                })
            }
        } else {
            if (this.settings.effect === "fade") {
                var q = this.getVisibleSlides();
                var s = this.list.children().slice(r, r + this.visible);
                if (this.settings.fadeDirection * r > this.offset * this.settings.fadeDirection) {
                    s = Array.prototype.reverse.call(s);
                    q = Array.prototype.reverse.call(q)
                }
                h.each(q, function (x) {
                    h(this).stop().delay(v.settings.fadeDelay * x).animate({
                        opacity: 0
                    }, v.settings.fadeDuration, v.settings.fadeEasing, function () {
                        if (x < v.visible - 1) {
                            return
                        }
                        s.css("opacity", 0);
                        v.list.delay(10).queue(function () {
                            h(this).css("left", -p).dequeue();
                            h.each(s, function (y) {
                                h(this).stop().delay(v.settings.fadeDelay * y).animate({
                                    opacity: 1
                                }, v.settings.fadeDuration, v.settings.fadeEasing, function () {
                                    if (y < v.visible - 1) {
                                        return
                                    }
                                    q.add(s).css("opacity", "");
                                    o()
                                })
                            })
                        })
                    })
                })
            } else {
                this.list.stop().delay(this.settings.slideDelay).animate({
                    left: -p
                }, this.settings.slideDuration, this.settings.slideEasing, o)
            }
        }
    }
    ;
    f.prototype.resizeSlides = function () {
        this.lock = true;
        this.visible = this.container.width() / (this.slide_width + this.slide_margin);
        if (this.visible % 1 === 0 || this.visible % 1 < 0.5) {
            this.visible = Math.floor(this.visible) > 0 ? Math.floor(this.visible) : 1
        } else {
            this.visible = Math.ceil(this.visible)
        }
        var q = (this.container.width() + this.slide_margin) / this.visible - this.slide_margin;
        var n = this.slide_ratio * q;
        var p = {
            width: Math.round(q)
        };
        if (this.settings.itemKeepRatio) {
            p.height = Math.round(n)
        }
        if (this.offset > 0) {
            if (this.offset + this.visible > this.total) {
                this.offset = this.total - this.visible
            }
            var v = this.offset * (q + this.slide_margin);
            if (this.cssok) {
                d(this.list, -v)
            } else {
                this.list.css("left", -v)
            }
        }
        var o = this;
        var r = this.settings.fitDuration;
        var u = this.settings.fitEasing;
        var s = function () {
            o.lock = false;
            o.syncContainerHeight()
        };
        this.list.children().each(function () {
            if (o.cssok) {
                if (h(this).width() === Math.round(q)) {
                    s()
                } else {
                    g(h(this), "width height", r, u, s);
                    h(this).css(p)
                }
            } else {
                h(this).stop().animate(p, r, u, s)
            }
        });
        this.updatePagination()
    }
    ;
    f.prototype.syncContainerHeight = function () {
        if (this.settings.syncHeight && !this.settings.itemKeepRatio) {
            var n = 0;
            h.each(this.getVisibleSlides(), function () {
                if (h(this).height() > n) {
                    n = h(this).height()
                }
            });
            var o = this.settings.syncHeightDuration
              , p = this.settings.syncHeightEasing;
            if (this.cssok) {
                g(this.container, "height", o, p);
                this.container.css("height", n)
            } else {
                this.container.stop().animate({
                    height: n
                }, o, p)
            }
        }
    }
    ;
    f.prototype.updatePagination = function () {
        if (!this.settings.pagination || this.settings.mode === "carousel") {
            return
        }
        var p = this;
        var r = Math.min(this.settings.moveSlides, this.visible);
        var n = Math.ceil(this.total * 2 / (r + this.visible));
        var o = this.container.find(".cq-sushi__pagination").empty();
        for (var q = 0; q < n; q++) {
            h('<a href="#">' + q + "</a>").click((function (u) {
                return function (v) {
                    if (p.lock) {
                        return
                    }
                    var w = Math.min(u * r, p.total - p.visible);
                    p.slideOffset(w);
                    v.preventDefault()
                }
            }
            )(q)).appendTo(o)
        }
        var s = Math.ceil(this.offset / r);
        o.find("a:eq(" + s + ")").addClass("cq-sushi--active").siblings().removeClass("cq-sushi--active")
    }
    ;
    f.prototype.updateNavigation = function (o) {
        if (this.settings.navigation && this.settings.mode === "normal") {
            var n = this.container.find(".cq-sushi__navigation a");
            n.removeClass("cq-suhsi--first cq-sushi--last");
            if (o === 0) {
                n.filter(".cq-sushi__prev").addClass("cq-suhsi--first")
            }
            if (o === this.total - this.visible) {
                n.filter(".cq-sushi__next").addClass("cq-sushi--last")
            }
        }
    }
    ;
    f.prototype.enableTouchSwipe = function () {
        var q = this
          , p = false;
        var o = 0
          , n = 0
          , v = 0;
        var u = function (x) {
            var w = x;
            if (x.type.indexOf("touch") === 0) {
                w = x.originalEvent.changedTouches[0]
            }
            if (!q.lock) {
                p = true;
                o = w.pageX;
                n = w.pageY;
                v = m(q.list, q.cssok).left;
                q.container.bind("mousemove touchmove", s);
                q.container.addClass("cq-sushi--swipe-grab")
            }
        };
        var s = function (z) {
            var y = z;
            if (z.type.indexOf("touch") === 0) {
                y = z.originalEvent.changedTouches[0]
            }
            var x = y.pageX - o;
            var w = y.pageY - n;
            if (Math.abs(x) < q.settings.swipeThreshold) {
                if (q.settings.effect === "slide") {
                    if (q.cssok) {
                        d(q.list, v + x)
                    } else {
                        q.list.css("left", v + x)
                    }
                }
            } else {
                var B = (x > 0) ? "prev" : "next";
                var A = q.getOffset(B);
                q.slideOffset(A);
                q.container.unbind("mousemove touchmove", s)
            }
            if (!q.settings.swipePage) {
                z.preventDefault()
            }
        };
        var r = function () {
            if (p) {
                if (!q.lock && v !== m(q.list, q.cssok).left) {
                    q.slideOffset(q.offset, true)
                }
                q.container.unbind("mousemove touchmove", s);
                p = false;
                q.container.removeClass("cq-sushi--swipe-grab")
            }
        };
        this.container.bind("mousedown touchstart", u);
        h("body").bind("mouseup touchend touchcancel", r);
        this.container.bind("dragstart", function (w) {
            w.preventDefault()
        })
    }
    ;
    f.prototype.enableMouseWheel = function () {
        if (typeof h.fn.mousewheel !== "function") {
            return
        }
        var n = this;
        this.container.bind("mousewheel", function (o, p) {
            if (p > 0) {
                n.slidePrevious()
            } else {
                n.slideNext()
            }
            o.preventDefault()
        })
    }
    ;
    f.prototype.enableKeyboard = function () {
        var n = this;
        h(document).bind("keydown", function (o) {
            if (o.which === 39) {
                n.slideNext()
            } else {
                if (o.which === 37) {
                    n.slidePrevious()
                }
            }
        })
    }
    ;
    f.prototype.enableTicker = function () {
        var o = this, q = true, n, u;
        var p = 0
          , v = 0
          , s = parseInt(this.settings.tickerTimeout, 10);
        if (this.settings.effect === "fade") {
            p = parseInt(this.settings.fadeDelay, 10);
            v = parseInt(this.settings.fadeDuration, 10)
        } else {
            p = parseInt(this.settings.slideDelay, 10);
            v = parseInt(this.settings.slideDuration, 10)
        }
        this.tickerPlay = function () {
            this.container.find(".cq-sushi__ticker a").hide().filter(".cq-sushi--pause").show();
            if (q) {
                u = s
            } else {
                if (o.settings.effect === "fade") {
                    u = ((o.visible - 1) * p + o.visible * v) + s
                } else {
                    u = (p + v) + s
                }
            }
            window.clearInterval(n);
            n = window.setInterval(function () {
                o.slideNext();
                if (q) {
                    q = false;
                    o.tickerPlay()
                }
            }, u)
        }
        ;
        this.tickerPause = function () {
            this.container.find(".cq-sushi__ticker a").hide().filter(".cq-sushi--play").show();
            window.clearInterval(n);
            q = true
        }
        ;
        this.container.append('<div class="cq-sushi__ticker"></div>');
        h('<a href="#" class="cq-sushi--play">' + this.settings.tickerPlay + "</a>").click(function (w) {
            o.tickerPlay();
            w.preventDefault()
        }).appendTo(this.container.find(".cq-sushi__ticker"));
        h('<a href="#" class="cq-sushi--pause">' + this.settings.tickerPause + "</a>").click(function (w) {
            o.tickerPause();
            w.preventDefault()
        }).appendTo(this.container.find(".cq-sushi__ticker"));
        if (this.settings.tickerHover) {
            var r = 0;
            this.container.hover(function () {
                window.clearTimeout(r);
                r = window.setTimeout(function () {
                    o.tickerPause()
                }, o.settings.tickerHoverDelay)
            }, function () {
                window.clearTimeout(r);
                r = window.setTimeout(function () {
                    o.tickerPlay()
                }, o.settings.tickerHoverDelay)
            })
        }
        this.tickerPause();
        if (this.settings.tickerAutoStart) {
            this.tickerPlay()
        }
    }
    ;
    h.fn.cqSushi = function (o) {
        var n = h.extend({
            mode: "normal",
            effect: "slide",
            useCSS: true,
            itemWidth: false,
            itemHeight: false,
            itemMargin: false,
            itemKeepRatio: true,
            maxWidth: "100%",
            maxVisible: 0,
            moveSlides: 1,
            slideDelay: 0,
            slideDuration: 500,
            slideEasing: "swing",
            fadeDelay: 200,
            fadeDuration: 500,
            fadeEasing: "swing",
            fadeDirection: 1,
            fitDelay: 300,
            fitDuration: 200,
            fitEasing: "swing",
            syncHeight: false,
            syncHeightDuration: 200,
            syncHeightEasing: "swing",
            navigation: true,
            nextNav: "<span>Next</span>",
            prevNav: "<span>Previous</span>",
            pagination: true,
            touchSwipe: true,
            swipeThreshold: 50,
            swipePage: false,
            mouseWheel: false,
            keyboard: false,
            ticker: false,
            tickerTimeout: 2000,
            tickerAutoStart: true,
            tickerPlay: "<span>Play</span>",
            tickerPause: "<span>Pause</span>",
            tickerHover: false,
            tickerHoverDelay: 300,
            slidesReady: function () { },
            beforeSlide: function () { },
            afterSlide: function () { }
        }, o);
        return this.each(function () {
            new f(this, n)
        })
    }
}
)(jQuery);
function sushiCarouselInit() {
    if ($(".cq-sushi").length > 0) {
        $(".cq-sushi").each(function (a) {
            t = $(this);
            slideWidth = t.data("slide-width");
            if (!slideWidth) {
                slideWidth = 174
            }
            slideMove = t.data("slide-move");
            if (!slideMove) {
                slideMove = 1
            }
            slideSpeed = t.data("slide-speed");
            if (!slideSpeed) {
                slideSpeed = 800
            }
            timeout = t.data("timeout");
            if (!timeout) {
                timeout = 2000
            }
            t.cqSushi({
                mode: "carousel",
                moveSlides: slideMove,
                itemWidth: slideWidth,
                slideEasing: "swing",
                slideDuration: slideSpeed,
                navigation: true,
                nextNav: '<span class="cq-sushi__alt-arrow">Next</span>',
                prevNav: '<span class="cq-sushi__alt-arrow">Previous</span>',
                ticker: true,
                tickerAutoStart: true,
                tickerHover: true,
                tickerTimeout: timeout,
                fitDelay: 0,
                fitDuration: 1,
                touchSwipe: (($("html").hasClass("touch")) ? true : false),
                swipeThreshold: slideWidth + parseInt($(".cq-sushi ul li").css("margin-right")),
                slidesReady: function () {
                    $(".cq-sushi > ul > li a .cq-sushi__slide__desc span").each(function () {
                        $(this).css("margin-top", "-" + $(this).height() / 2 + "px")
                    })
                }
            })
        })
    }
}
johnLewis.Module.content = (function () {
    initialiseContent = function () {
        johnLewis.CMS.Widget.accordion.init();
        johnLewis.CMS.Widget.shopInfo.init();
        johnLewis.CMS.Widget.authorProfile.init();
        johnLewis.CMS.Widget.heroCarousel.init();
        johnLewis.CMS.Widget.fourGridCarousel();
        johnLewis.CMS.Widget.socialBookmark();
        johnLewis.CMS.Widget.ie6FirstChild();
        johnLewis.CMS.Widget.shareBookmark(".share-bookmark .handle", "h3 .close-tab");
        $(".int-del-table tr:odd").addClass("odd");
        if ($("html").hasClass("touch")) {
            $(".cq-blk").bind("click", function (b) {
                b.preventDefault();
                $(".cq-blk").not(this).children(".cq-blk-cont-overlay").removeClass("cq-blk-touch");
                var a = $(this);
                if ($(a).children(".cq-blk-cont-overlay").hasClass("cq-blk-touch")) {
                    location.href = $(a).attr("href")
                }
                $(a).children(".cq-blk-cont-overlay").addClass("cq-blk-touch");
                return false
            })
        }
        openContent();
        sushiCarouselInit()
    }
    ;
    return {
        initialiseContent: initialiseContent
    }
}());
$(document).ready(johnLewis.Module.content.initialiseContent);
