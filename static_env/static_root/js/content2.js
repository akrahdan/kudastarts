(function (a) {

}
)(jQuery);

if (typeof (kudaWorld) === undefined || typeof (kudaWorld) !== "object") {
    kudaWorld = {}
}

if (kudaWorld.Module === undefined || typeof kudaWorld.Module !== "object") {
    kudaWorld.Module = {}
}

if (typeof (kudaWorld.CMS) === undefined || typeof (kudaWorld.CMS) !== "object") {
    kudaWorld.CMS = {}
}
if (typeof (kudaWorld.CMS.Widget) === undefined || typeof (kudaWorld.CMS.Widget) !== "object") {
    kudaWorld.CMS.Widget = {}
}

kudaWorld.CMS.Widget.heroCarousel = function () {
    var l, g, i, z, o, q, h, a = 5000;
    function init() {
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

    return {
        init: init
    }
}();

kudaWorld.Module.content =(function() {
  initialiseContent = function(){
    kudaWorld.CMS.Widget.heroCarousel.init();
  };
  return {
     initialiseContent: initialiseContent
  }
})();

$(document).ready(kudaWorld.Module.content.initialiseContent);
