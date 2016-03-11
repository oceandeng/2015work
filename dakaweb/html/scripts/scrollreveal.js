window.scrollReveal=function(a){"use strict";function b(b){this.docElem=a.document.documentElement,this.options=this.extend(this.defaults,b),this.styleBank=[],1==this.options.init&&this.init()}return b.prototype={defaults:{after:"0s",enter:"bottom",move:"24px",over:"0.66s",easing:"ease-in-out",viewportFactor:.33,reset:!1,init:!0},init:function(){this.scrolled=!1;var b=this;this.elems=Array.prototype.slice.call(this.docElem.querySelectorAll("[data-scroll-reveal]")),this.elems.forEach(function(a){b.styleBank[a]||(b.styleBank[a]=a.getAttribute("style")),b.update(a)});var c=function(){b.scrolled||(b.scrolled=!0,setTimeout(function(){b._scrollPage()},60))},d=function(){function a(){b._scrollPage(),b.resizeTimeout=null}b.resizeTimeout&&clearTimeout(b.resizeTimeout),b.resizeTimeout=setTimeout(a,200)};a.addEventListener("scroll",c,!1),a.addEventListener("resize",d,!1)},_scrollPage:function(){var a=this;this.elems.forEach(function(b){a.update(b)}),this.scrolled=!1},parseLanguage:function(a){function b(a){var b=[],c=["from","the","and","then","but","with"];return a.forEach(function(a){c.indexOf(a)>-1||b.push(a)}),b}var c=a.getAttribute("data-scroll-reveal").split(/[, ]+/),d={};return c=b(c),c.forEach(function(a,b){switch(a){case"enter":return void(d.enter=c[b+1]);case"after":return void(d.after=c[b+1]);case"wait":return void(d.after=c[b+1]);case"move":return void(d.move=c[b+1]);case"ease":return d.move=c[b+1],void(d.ease="ease");case"ease-in":return d.move=c[b+1],void(d.easing="ease-in");case"ease-in-out":return d.move=c[b+1],void(d.easing="ease-in-out");case"ease-out":return d.move=c[b+1],void(d.easing="ease-out");case"over":return void(d.over=c[b+1]);default:return}}),d},update:function(a){var b=this.genCSS(a),c=this.styleBank[a];return null!=c?c+=";":c="",a.getAttribute("data-scroll-reveal-initialized")||(a.setAttribute("style",c+b.initial),a.setAttribute("data-scroll-reveal-initialized",!0)),this.isElementInViewport(a,this.options.viewportFactor)?a.getAttribute("data-scroll-reveal-complete")?void 0:this.isElementInViewport(a,this.options.viewportFactor)?(a.setAttribute("style",c+b.target+b.transition),void(this.options.reset||setTimeout(function(){""!=c?a.setAttribute("style",c):a.removeAttribute("style"),a.setAttribute("data-scroll-reveal-complete",!0)},b.totalDuration))):void 0:void(this.options.reset&&a.setAttribute("style",c+b.initial+b.reset))},genCSS:function(a){var b,c,d=this.parseLanguage(a);d.enter?(("top"==d.enter||"bottom"==d.enter)&&(b=d.enter,c="y"),("left"==d.enter||"right"==d.enter)&&(b=d.enter,c="x")):(("top"==this.options.enter||"bottom"==this.options.enter)&&(b=this.options.enter,c="y"),("left"==this.options.enter||"right"==this.options.enter)&&(b=this.options.enter,c="x")),("top"==b||"left"==b)&&(d.move=d.move?"-"+d.move:"-"+this.options.move);var e=d.move||this.options.move,f=d.over||this.options.over,g=d.after||this.options.after,h=d.easing||this.options.easing,i="-webkit-transition: -webkit-transform "+f+" "+h+" "+g+",  opacity "+f+" "+h+" "+g+";transition: transform "+f+" "+h+" "+g+", opacity "+f+" "+h+" "+g+";-webkit-perspective: 1000;-webkit-backface-visibility: hidden;",j="-webkit-transition: -webkit-transform "+f+" "+h+" 0s,  opacity "+f+" "+h+" "+g+";transition: transform "+f+" "+h+" 0s,  opacity "+f+" "+h+" "+g+";-webkit-perspective: 1000;-webkit-backface-visibility: hidden;",k="-webkit-transform: translate"+c+"("+e+");transform: translate"+c+"("+e+");opacity: 0;",l="-webkit-transform: translate"+c+"(0);transform: translate"+c+"(0);opacity: 1;";return{transition:i,initial:k,target:l,reset:j,totalDuration:1e3*(parseFloat(f)+parseFloat(g))}},getViewportH:function(){var b=this.docElem.clientHeight,c=a.innerHeight;return c>b?c:b},getOffset:function(a){var b=0,c=0;do isNaN(a.offsetTop)||(b+=a.offsetTop),isNaN(a.offsetLeft)||(c+=a.offsetLeft);while(a=a.offsetParent);return{top:b,left:c}},isElementInViewport:function(b,c){var d=a.pageYOffset,e=d+this.getViewportH(),f=b.offsetHeight,g=this.getOffset(b).top,h=g+f,c=c||0;return e>=g+f*c&&h>=d||"fixed"==(b.currentStyle?b.currentStyle:a.getComputedStyle(b,null)).position},extend:function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a}},b}(window);var config={enter:"top",move:"40px",over:"0.16s",reset:!0,init:!0};window.scrollReveal=new scrollReveal(config);