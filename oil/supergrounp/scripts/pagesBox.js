! function(t, s) {
    function i(s, i) {
        return this.options = t.extend({}, r, i), this.ul = t(s), this.pages = this.ul.children(), this.length = this.pages.length, this.axis = this.options.axis, 0 === this.length ? !1 : (this.options.scrollPage && (this.scrollPage = this.ul.find(this.options.scrollPage), this.scrollIndex = this.scrollPage.index()), this.options.unTouchedPages && (this.unTouchedPages = this.ul.find(this.options.unTouchedPages)), this._initPx(), this.page = 0, this.prePage = 0, this.started = !1, this.moved = !1, this.animating = !1, this.startPos = {}, this.movePos = {}, this.endPos = {}, this.trans = {}, this.startTrans = {}, void this.init())
    }
    var h = "PagesBox",
        o = s.document,
        e = ["destroy", "goPage", "goStep", "goNext", "goPrev", "goPresent", "offTouch", "onTouch"],
        r = {
            speed: 500,
            easing: "ease-in-out",
            axis: "y",
            pages: "li",
            scrollPage: !1,
            unTouchedPages: !1,
            threshold: 50,
            fromScrollToOther: !0,
            swipeMaxTime: 500,
            loop: !1,
            gpage: 2
        };
    i.prototype._initPx = function() {
        this.unitHeight = "y" === this.axis ? this.pages.eq(0).height() : this.pages.eq(0).width(), this.scrollHeight = this.options.scrollPage ? "y" === this.axis ? this.scrollPage.height() : this.scrollPage.width() : 0, this.height = this.unitHeight * (this.length - 1) + this.scrollHeight, "y" === this.axis ? (this.pages.css({
            height: this.unitHeight
        }), this.options.scrollPage && this.scrollPage.css({
            height: this.scrollHeight
        }), this.ul.css({
            height: this.height
        })) : (this.pages.css({
            width: this.unitHeight
        }), this.options.scrollPage && this.scrollPage.css({
            width: this.scrollHeight
        }), this.ul.css({
            width: this.height
        })), this._initPageArr()
    }, i.prototype._initPageArr = function() {
        var s, i, h = 0,
            o = 0,
            e = this;
        for (this.pageArr = [], i = 0; i < this.pages.length; i++) o = "y" === this.axis ? this.pages.eq(i).height() : this.pages.eq(i).width(), this.pageArr.push([-h, -h - o + 1]), h += o;
        this.scrollTransArr = [], this.options.scrollPage && (this.scrollTransArr = [this.pageArr[this.scrollIndex][0], this.pageArr[this.scrollIndex][1] + this.unitHeight]), this.unTouchedArr = [], this.options.unTouchedPages && this.unTouchedPages.each(function() {
            s = t(this).index(), e.unTouchedArr.push(e.pageArr[s][0])
        })
    }, i.prototype.init = function() {
        var i = this;
        this._setTransform(0), t(o).on("touchstart", function(t) {
            i._touchstart.call(i, t)
        }), t(o).on("touchmove", function(t) {
            i._touchmove.call(i, t)
        }), t(o).on("touchend", function(t) {
            i._touchend.call(i, t)
        }), this.ul[0].addEventListener("webkitTransitionEnd", function(t) {
            i._transitionend.call(i, t), i.ul.trigger("transend", i.page)
        }, !1), t(s).on("orientationchange", function() {
            var t = i._getTrans()[this.axis],
                s = t - i.pageArr[i.page][0];
            i._initPx(), i._initPageArr(), i.goStep(s + i.pageArr[i.page][0])
        });

    }, i.prototype._touchstart = function(t) {
        var s = t.changedTouches[0];
        return this.started = !1, this.removeTrans(), this.startPos = {
            x: s.pageX,
            y: s.pageY
        }, this.startTrans = this._getTrans(), this.options.unTouchedPages && this.unTouchedArr.indexOf(this.startTrans[this.axis]) > -1 ? !1 : (this.started = !0, this.moved = !1, void(this.startTime = t.timeStamp))
    }, i.prototype._touchmove = function(t) {
        if (this.started) {
            this.moved = !0, t.preventDefault();
            var s = t.changedTouches[0];
            if (this.movePos = {
                    x: s.pageX,
                    y: s.pageY
                }, this.moveTime = t.timeStamp, !this.options.loop) {
                if (this.startTrans[this.axis] === this.pageArr[0][0] && this.movePos[this.axis] > this.startPos[this.axis]) return;
                if (this.scrollPage && this.scrollIndex === this.length - 1 && this.startTrans[this.axis] === this.scrollTransArr[1] && this.movePos[this.axis] < this.startPos[this.axis]) return
            }
            this.startTrans[this.axis] + this.movePos[this.axis] - this.startPos[this.axis] > this.pageArr[this.length - 1][0] && this.goStep(this.startTrans[this.axis] + this.movePos[this.axis] - this.startPos[this.axis])
        }
    }, i.prototype._touchend = function(t) {
        var s, i, h = t.changedTouches[0],
            o = 0,
            e = 0;
        if (this.options.scrollPage && (o = this.scrollTransArr[0], e = this.scrollTransArr[1]), this.endPos = {
                x: h.pageX,
                y: h.pageY
            }, this.started && this.endPos[this.axis] != this.startPos[this.axis])
            if (this.trans = this._getTrans(), this.endTime = t.timeStamp, this.endPos[this.axis] < this.startPos[this.axis])
                if (this.options.scrollPage)
                    if (this.options.fromScrollToOther || this.startTrans[this.axis] !== e)
                        if (this.scrollIndex === this.length - 1 && this.startTrans[this.axis] === e) {
                            if (!this.options.loop) return;
                            this.goNext()
                        } else {
                            if (this.startTrans[this.axis] > o || this.startTrans[this.axis] < e) return void(Math.abs(this.endPos[this.axis] - this.startPos[this.axis]) >= this.options.threshold ? this.goNext() : this.goPresent());
                            this.startTrans[this.axis] === e ? this.goNext() : (s = this.startTrans[this.axis] + this.endPos[this.axis] - this.startPos[this.axis], this.endTime - this.startTime < this.options.swipeMaxTime && (i = Math.max(this.startTrans[this.axis] - this.unitHeight, e), this.ul.css("-webkit-transition", "all " + this.options.speed / 1e3 * Math.abs(i - this.startTrans[this.axis]) / this.unitHeight + "s " + this.options.easing + ";"), s = i), this.goStep(s))
                        } else this.goScrollBot();
        else Math.abs(this.endPos[this.axis] - this.startPos[this.axis]) >= this.options.threshold ? this.goNext() : this.goPresent();
        else if (this.options.scrollPage)
            if (this.options.fromScrollToOther || this.startTrans[this.axis] !== o)
                if (this.scrollIndex < this.length - 1 && this.startTrans[this.axis] === this.pageArr[this.scrollIndex + 1][0]) this.goPage(this.scrollIndex, this.page);
                else {
                    if (this.startTrans[this.axis] > o || this.startTrans[this.axis] < e) return void(Math.abs(this.endPos[this.axis] - this.startPos[this.axis]) >= this.options.threshold ? this.goPrev() : this.goPresent());
                    this.startTrans[this.axis] === o ? this.goPrev() : (s = this.startTrans[this.axis] + this.endPos[this.axis] - this.startPos[this.axis], this.endTime - this.startTime < this.options.swipeMaxTime && (i = Math.min(this.startTrans[this.axis] + this.unitHeight, o), this.ul.css("-webkit-transition", "all " + this.options.speed / 1e3 * Math.abs(i - this.startTrans[this.axis]) / this.unitHeight + "s " + this.options.easing + ";"), s = i), this.goStep(s))
                } else this.goScrollTop();
        else Math.abs(this.endPos[this.axis] - this.startPos[this.axis]) >= this.options.threshold ? this.goPrev() : this.goPresent()
    }, i.prototype._getPageIndex = function(t) {
        if (t < this.pageArr[0]) return -1;
        for (var s = 0; s < this.pageArr.length; s++)
            if (t <= this.pageArr[s][1] && t >= this.pageArr[s][0]) return s;
        return s
    }, i.prototype._getTrans = function() {
        var t, s = this.ul[0].style.webkitTransform || "",
            i = s.match(/translate3d\((.*)\)/);
        return i && 0 != i.length ? t = i[1].split(",") : (this.ul[0].style.webkitTransform = "translate3d(0,0,0)", t = [0, 0, 0]), {
            x: parseInt(t[0], 10),
            y: parseInt(t[1], 10)
        }
    }, i.prototype._transitionend = function() {
        var t = this;
        this.animating = !1, this.options.transEndCb && this.options.transEndCb.call(t, t.page)
    }, i.prototype.getAxis = function() {
        return this.options.axis
    }, i.prototype.goStep = function(t) {
        this.trans[this.axis] = t, this._setTransform(t)
    }, i.prototype._setTransform = function(t) {
        this.ul[0].style.webkitTransform = "y" === this.axis ? "translate3d(0," + t + "px,0)" : "translate3d(" + t + "px,0,0)"
    }, i.prototype.goPage = function(t, s) {
        if (this.page = t, this.options.scrollPage && t === this.scrollIndex && s === this.scrollIndex + 1) return this.goScrollBot(), void this.ul.trigger("gopage", [t, s]);
        this.addTrans();
        var i = 0;
        t >= this.pageArr.length ? t = s : 0 > t && (t = 0), i = this.pageArr[t][0], this._setTransform(i), this.animating = !0, this.ul.trigger("gopage", [t, s])
    }, i.prototype.goNext = function() {
        var t = this.page;
        t === this.pageArr.length - 1 ? this.options.loop && (t = 0) : t++, this.goPage(t, this.page)
    }, i.prototype.goPresent = function() {
        this.goPage(this.page, this.page)
    }, i.prototype.offTouch = function() {
        t(o).off("touchstart"), t(o).off("touchmove"), t(o).off("touchend")
    }, i.prototype.onTouch = function() {
        var s = this;
        t(o).on("touchstart", function(t) {
            s._touchstart.call(s, t)
        }), t(o).on("touchmove", function(t) {
            s._touchmove.call(s, t)
        }), t(o).on("touchend", function(t) {
            s._touchend.call(s, t)
        })
    }, i.prototype.goScrollBot = function() {
        this.addTrans();
        var t = 0;
        this.page = this.scrollIndex, t = this.scrollTransArr[1], this._setTransform(t)
    }, i.prototype.goScrollTop = function() {
        this.addTrans();
        var t = this.scrollTransArr[0];
        this._setTransform(t)
    }, i.prototype.goPrev = function() {
        var t = this.page;
        0 !== t && t--, this.goPage(t, this.page)
    }, i.prototype.addTrans = function() {
        this.ul.css("-webkit-transition", "all " + this.options.speed / 1e3 + "s " + this.options.easing + ";")
    }, i.prototype.removeTrans = function() {
        this.ul.css("-webkit-transition", "all 0 linear")
    }, t.fn[h] = function(s) {
        if ("string" == typeof s) {
            var o = arguments,
                r = s,
                a = function() {
                    for (var t = 0; t < e.length; t++)
                        if (e[t] === r) return !0;
                    return !1
                };
            if (Array.prototype.shift.call(o), "check" == r) return !!this.data("plugin_" + h);
            if (a()) return this.each(function() {
                var s = t(this).data("plugin_" + h);
                s && s[r] && s[r].apply(s, o)
            });
            throw new TypeError(h + ' has no method "' + r + '"')
        }
        return this.each(function() {
            var o = t(this).data("plugin_" + h);
            o || t(this).data("plugin_" + h, new i(this, s))
        })
    }
}($, window);
