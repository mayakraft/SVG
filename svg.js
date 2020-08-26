!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).SVG=e()}(this,(function(){"use strict";function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(e)}function e(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return n(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}var r={};["number","object","transform","class","style","function","string","undefined","boolean","path","svg","id","viewBox"].forEach((function(t){return r[t]=t}));var o=("undefined"==typeof window?"undefined":t(window))!==r.undefined&&t(window.document)!==r.undefined,i=("undefined"==typeof process?"undefined":t(process))!==r.undefined&&null!=process.versions&&null!=process.versions.node,c=(("undefined"==typeof self?"undefined":t(self))===r.object&&self.constructor&&self.constructor.name,function(){var t={};if(i){var e=require("xmldom"),n=e.DOMParser,r=e.XMLSerializer;t.DOMParser=n,t.XMLSerializer=r,t.document=(new n).parseFromString("<!DOCTYPE html><title>.</title>","text/html")}else o&&(t=window);return t}()),u="http://www.w3.org/2000/svg",a={s:["svg"],d:["defs"],h:["desc","filter","metadata","style","script","title","view"],c:["cdata"],g:["g"],v:["circle","ellipse","line","path","polygon","polyline","rect"],t:["text"],i:["marker","symbol","clipPath","mask"],p:["linearGradient","radialGradient","pattern"],cT:["textPath","tspan"],cG:["stop"],cF:["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]},f=[a.h,a.p,a.i],s=[a.g,a.v,a.t],l={svg:[a.s,a.d].concat(f).concat(s),g:s,text:[a.cT],linearGradient:[a.cG],radialGradient:[a.cG],defs:f,filter:[a.cF],marker:s,symbol:s,clipPath:s,mask:s},d={};Object.keys(l).forEach((function(t){d[t]=l[t].reduce((function(t,e){return t.concat(e)}),[])}));var p=function(t){return t.replace(/([-_][a-z])/gi,(function(t){return t.toUpperCase().replace("-","").replace("_","")}))},h=function(t){return t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").replace(/([A-Z])([A-Z])(?=[a-z])/g,"$1-$2").toLowerCase()},v=function(t){return t.charAt(0).toUpperCase()+t.slice(1)},g=function(e){return null!=e&&t(e[Symbol.iterator])===r.function},m=function t(){switch(arguments.length){case void 0:case 0:return Array.from(arguments);case 1:return g(arguments[0])&&"string"!=typeof arguments[0]?t.apply(void 0,e(arguments[0])):[arguments[0]];default:return Array.from(arguments).map((function(n){return g(n)?e(t(n)):n})).reduce((function(t,e){return t.concat(e)}),[])}},y=function(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];return n.filter((function(e){return t(e)===r.number})).concat(n.filter((function(e){return t(e)===r.object&&null!==e})).map((function(e){return t(e.x)===r.number?[e.x,e.y]:t(e[0])===r.number?[e[0],e[1]]:void 0})).filter((function(t){return void 0!==t})).reduce((function(t,e){return t.concat(e)}),[]))},b={svg:["viewBox"],line:["x1","y1","x2","y2"],rect:["width","height","x","y"],circle:["r","cx","cy"],ellipse:["rx","ry","cx","cy"],polygon:["points"],polyline:["points"],path:["d"],text:["x","y"],mask:["id"],symbol:["id"],clipPath:["id","clip-rule"],marker:["id","markerHeight","markerUnits","markerWidth","orient","refX","refY"],linearGradient:["x1","x2","y1","y2"],radialGradient:["cx","cy","r","fr","fx","fy"],stop:["offset","stop-color","stop-opacity"],pattern:["patternContentUnits","patternTransform","patternUnits"]},A=function(t,e){return Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2)},x=function(t,e){return Math.sqrt(A(t,e))},E=function(t,e){return t.setAttribute(b.circle[0],e),t},C=function(t,n,r){return[,].concat(e(y.apply(void 0,e(m(n,r))).slice(0,2))).forEach((function(e,n){return t.setAttribute(b.circle[n],e)})),t},w=function(t,e,n,r){return[x([t,e],[n,r]),t,e]},j={circle:{args:function(t,n,r,o){var i=y.apply(void 0,e(m(t,n,r,o)));return i.length>3?w.apply(void 0,e(i)):i},methods:{radius:E,setRadius:E,origin:C,setOrigin:C,center:C,setCenter:C,position:C,setPosition:C}}},k=function(t,e,n){return[e,n].forEach((function(e,n){return t.setAttribute(b.ellipse[n],e)})),t},O=function(t,n,r){return[,,].concat(e(y.apply(void 0,e(m(n,r))).slice(0,2))).forEach((function(e,n){return t.setAttribute(b.ellipse[n],e)})),t},P={ellipse:{args:function(t,n,r,o){return y.apply(void 0,e(m(t,n,r,o))).slice(0,4)},methods:{radius:k,setRadius:k,origin:O,setOrigin:O,center:O,setCenter:O,position:O,setPosition:O}}},S=function(t,n,r,o){return y.apply(void 0,e(m(t,n,r,o))).slice(0,4)},M={line:{args:S,methods:{setPoints:function(t,e,n,r,o){return S(e,n,r,o).forEach((function(e,n){return t.setAttribute(b.line[n],e)})),t}}}},T=/[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g,N=/-?[0-9]*\.?\d+/g,L={m:"move",l:"line",v:"vertical",h:"horizontal",a:"ellipse",c:"curve",s:"smoothCurve",q:"quadCurve",t:"smoothQuadCurve",z:"close"};Object.keys(L).forEach((function(t){var e=L[t];L[t.toUpperCase()]=e.charAt(0).toUpperCase()+e.slice(1)}));var z=function(t){var e=t.getAttribute("d");return null==e?"":e},D=function(t,e){for(var n=arguments.length,r=new Array(n>2?n-2:0),o=2;o<n;o++)r[o-2]=arguments[o];return t.setAttribute("d","".concat(z(t)).concat(e).concat(m.apply(void 0,r).join(" "))),t},F=function(t){return function(t){for(var e,n=[];null!==(e=T.exec(t));)n.push(e);return n.map((function(e){return{command:t[e.index],index:e.index}})).reduceRight((function(e,n){var r=t.substring(n.index,e.length?e[e.length-1].index:t.length);return e.concat([{command:n.command,index:n.index,chunk:r.length>0?r.substr(1,r.length-1):r}])}),[]).reverse().map((function(t){var e=t.chunk.match(N);return t.en=L[t.command],t.values=e?e.map(parseFloat):[],delete t.chunk,t}))}(z(t))},B={addCommand:D,appendCommand:D,clear:function(t){return t.removeAttribute("d"),t},getCommands:F,get:F,getD:function(t){return t.getAttribute("d")}};Object.keys(L).forEach((function(t){B[L[t]]=function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return D.apply(void 0,[e,t].concat(r))}}));var G={path:{methods:B}},U=function(t,e,n){return[e,n].forEach((function(e,n){return t.setAttribute(b.rect[n],e)})),t},R=function(t,n,r){return[,,].concat(e(y.apply(void 0,e(m(n,r))).slice(0,2))).forEach((function(e,n){return t.setAttribute(b.rect[n],e)})),t},q={rect:{args:function(t,n,r,o){var i=y.apply(void 0,e(m(t,n,r,o))).slice(0,4);return[0,1].filter((function(t){return i[t]<0})).forEach((function(t){i[2+t]+=i[t],i[t]=-i[t]})),i},methods:{origin:R,setOrigin:R,center:R,setCenter:R,size:U,setSize:U}}},X=function(t){return(new c.DOMParser).parseFromString("<root></root>","text/xml").createCDATASection("".concat(t))},V={style:{methods:{setTextContent:function(t,e){return t.textContent="",t.appendChild(X(e)),t}}}},Y={text:{args:function(t,n,r){return y.apply(void 0,e(m(t,n,r))).slice(0,2)},init:function(e,n,o,i,u){var a=[n,o,i,u].filter((function(e){return t(e)===r.string})).shift();a&&(e.firstChild?e.firstChild.nodeValue=a:e.appendChild(c.document.createTextNode(a)))}}},$=function(t,e,n,r){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,i=1,c=n/i-n,u=t-c-o,a=e-c-o,f=n+2*c+2*o,s=r+2*c+2*o;return[u,a,f,s].join(" ")};function I(){var t=y.apply(void 0,e(m(arguments)));return 2===t.length&&t.unshift(0,0),4===t.length?$.apply(void 0,e(t)):void 0}var Z={removeChildren:function(t){for(;t.lastChild;)t.removeChild(t.lastChild)},appendTo:function(t,e){null!=e&&e.appendChild(t)},setAttributes:function(t,e){return Object.keys(e).forEach((function(n){return t.setAttribute(h(n),e[n])}))}};var H=function(t,e){e=Object.assign({output:r.string,windowStyle:!1,filename:"image.svg"},e);var n,u,a,f,s=function(t,e){for(var n=t.replace(/>\s{0,}</g,"><").replace(/</g,"~::~<").replace(/\s*xmlns\:/g,"~::~xmlns:").split("~::~"),r=n.length,o=!1,i=0,c="",u=null!=e&&"string"==typeof e?e:"\t",a=["\n"],f=0;f<100;f+=1)a.push(a[f]+u);for(var s=0;s<r;s+=1)n[s].search(/<!/)>-1?(c+=a[i]+n[s],o=!0,(n[s].search(/-->/)>-1||n[s].search(/\]>/)>-1||n[s].search(/!DOCTYPE/)>-1)&&(o=!1)):n[s].search(/-->/)>-1||n[s].search(/\]>/)>-1?(c+=n[s],o=!1):/^<\w/.exec(n[s-1])&&/^<\/\w/.exec(n[s])&&/^<[\w:\-\.\,]+/.exec(n[s-1])==/^<\/[\w:\-\.\,]+/.exec(n[s])[0].replace("/","")?(c+=n[s],o||(i-=1)):n[s].search(/<\w/)>-1&&-1===n[s].search(/<\//)&&-1===n[s].search(/\/>/)?c=c+=o?n[s]:a[i++]+n[s]:n[s].search(/<\w/)>-1&&n[s].search(/<\//)>-1?c=c+=o?n[s]:a[i]+n[s]:n[s].search(/<\//)>-1?c=c+=o?n[s]:a[--i]+n[s]:n[s].search(/\/>/)>-1?c=c+=o?n[s]:a[i]+n[s]:n[s].search(/<\?/)>-1||n[s].search(/xmlns\:/)>-1||n[s].search(/xmlns\=/)>-1?c+=a[i]+n[s]:c+=n[s];return"\n"===c[0]?c.slice(1):c}((new c.XMLSerializer).serializeToString(t));return o&&!i&&(n=e.filename,u=s,a=new c.Blob([u],{type:"text/plain"}),(f=c.document.createElement("a")).setAttribute("href",c.URL.createObjectURL(a)),f.setAttribute("download",n),c.document.body.appendChild(f),f.click(),c.document.body.removeChild(f)),"svg"===e.output?t:s},Q=function(t){return(new c.DOMParser).parseFromString(t,"text/xml")},W=function(t){var e=t.getElementsByTagName("parsererror");if(e.length>0)throw new Error(e[0]);return function t(e){if(null===e)return e;for(var n=e.childNodes.length-1;n>=0;n-=1){var r=e.childNodes[n];3===r.nodeType&&r.data.match(/^\s*$/)&&e.removeChild(r),1===r.nodeType&&t(r)}return e}(t.documentElement)},_=function(e){return function(e){return t(e)===r.string&&/^[\w,\s-]+\.[A-Za-z]{3}$/.test(e)&&e.length<1e4}(e)&&o&&t(c.fetch)===r.function?function(e){return new Promise((function(n,o){if(t(e)===r.string||e instanceof String)fetch(e).then((function(t){return t.text()})).then((function(t){return W(Q(t))})).then((function(t){return"svg"===t.nodeName?t:t.getElementsByTagName("svg")[0]})).then((function(t){return null==t?o("valid XML found, but no SVG element"):n(t)})).catch((function(t){return o(t)}));else if(e instanceof c.Document)return asyncDone(e)}))}(e):function(e){if(t(e)===r.string||e instanceof String)try{return W(Q(e))}catch(t){return t}if(null!=e.childNodes)return e}(e)},J=function(t){Array.from(t.attributes).filter((function(t){return"xmlns"!==t})).forEach((function(e){return t.removeAttribute(e.name)})),Z.removeChildren(t)},K=function(t,e){J(t),Array.from(e.childNodes).forEach((function(n){e.removeChild(n),t.appendChild(n)})),Array.from(e.attributes).forEach((function(e){return t.setAttribute(e.name,e.value)}))},tt=function(e,n){var o=_(n);if(null!=o)return t(o.then)===r.function?o.then((function(t){return K(e,t)})):K(e,o)},et=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),o=1;o<e;o++)n[o-1]=arguments[o];var i=1===n.length&&"string"==typeof n[0]?n[0]:I.apply(void 0,n);return i&&t.setAttribute(r.viewBox,i),t},nt=function(e){var n=function(t){var e=t.getAttribute(r.viewBox);return null==e?void 0:e.split(" ").map((function(t){return parseFloat(t)}))}(e);if(void 0!==n)return n;if(t(e.getBoundingClientRect)===r.function){var o=e.getBoundingClientRect();return[o.x,o.y,o.width,o.height]}return[]},rt="svg-background-rectangle",ot=function(t,e){var n=function(t){var e=t.getElementsByTagName(r.style);return 0===e.length?void 0:e[0]}(t);return null==n&&(n=this.Constructor(r.style),t.insertBefore(n,t.firstChild)),n.textContent="",n.appendChild(X(e)),n},it={clear:J,size:et,setViewBox:et,background:function(t,e){var n=Array.from(t.childNodes).filter((function(t){return t.getAttribute(r.class)===rt})).shift();if(null==n){var o=nt(t);(n=this.Constructor("rect",o[2],o[3],o[0],o[1])).setAttribute(r.class,rt),t.insertBefore(n,t.firstChild)}return n.setAttribute("fill",e),n},getWidth:function(t){return nt(t)[2]},getHeight:function(t){return nt(t)[3]},stylesheet:function(t,e){return ot.call(this,t,e)},load:tt,save:H},ct=(new c.DOMParser).parseFromString("<div />","text/xml").documentElement.constructor,ut={svg:{args:function(){return[I(y.apply(void 0,arguments))].filter((function(t){return null!=t}))},methods:it,init:function(e){for(var n=arguments.length,o=new Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];o.filter((function(t){return"string"==typeof t})).forEach((function(t){return tt(e,t)})),o.filter((function(t){return null!=t})).filter((function(t){return t instanceof ct})).filter((function(e){return t(e.appendChild)===r.function})).forEach((function(t){return t.appendChild(e)}))}}},at=function(){return Math.random().toString(36).replace(/[^a-z]+/g,"").concat("aaaaa").substr(0,5)},ft=function(){return Array.from(arguments).filter((function(e){return t(e)===r.string||e instanceof String})).shift()||at()},st=function(){return[ft.apply(void 0,arguments)]},lt={mask:{args:st},clipPath:{args:st},symbol:{args:st},marker:{args:st,methods:{size:et,setViewBox:et}}},dt=function(t){var e=t.getAttribute("points");return null==e?"":e},pt=function(){var t=arguments;return Array.from(Array(Math.floor(arguments.length/2))).map((function(e,n){return"".concat(t[2*n+0],",").concat(t[2*n+1])})).join(" ")},ht=function(){return[pt.apply(void 0,e(y.apply(void 0,e(m.apply(void 0,arguments)))))]},vt=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return t.setAttribute("points",ht.apply(void 0,n)[0]),t},gt=function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];return t.setAttribute("points",[dt(t),ht.apply(void 0,n)[0]].filter((function(t){return""!==t})).join(" ")),t},mt=function(){return 1===arguments.length&&t(arguments.length<=0?void 0:arguments[0])===r.string?[arguments.length<=0?void 0:arguments[0]]:ht.apply(void 0,arguments)},yt={polyline:{args:mt,methods:{setPoints:vt,addPoint:gt}},polygon:{args:mt,methods:{setPoints:vt,addPoint:gt}}},bt=Object.assign({},j,P,M,G,q,V,Y,ut,lt,yt),At={presentation:["color","color-interpolation","cursor","direction","display","fill","fill-opacity","fill-rule","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","image-rendering","letter-spacing","opacity","overflow","paint-order","pointer-events","preserveAspectRatio","shape-rendering","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","tabindex","transform-origin","user-select","vector-effect","visibility"],animation:["accumulate","additive","attributeName","begin","by","calcMode","dur","end","from","keyPoints","keySplines","keyTimes","max","min","repeatCount","repeatDur","restart","to","values"],effects:["azimuth","baseFrequency","bias","color-interpolation-filters","diffuseConstant","divisor","edgeMode","elevation","exponent","filter","filterRes","filterUnits","flood-color","flood-opacity","in","in2","intercept","k1","k2","k3","k4","kernelMatrix","lighting-color","limitingConeAngle","mode","numOctaves","operator","order","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","primitiveUnits","radius","result","seed","specularConstant","specularExponent","stdDeviation","stitchTiles","surfaceScale","targetX","targetY","type","xChannelSelector","yChannelSelector"],text:["dx","dy","alignment-baseline","baseline-shift","dominant-baseline","lengthAdjust","method","overline-position","overline-thickness","rotate","spacing","startOffset","strikethrough-position","strikethrough-thickness","text-anchor","text-decoration","text-rendering","textLength","underline-position","underline-thickness","word-spacing","writing-mode"],gradient:["gradientTransform","gradientUnits","spreadMethod"]};Object.values(a).reduce((function(t,e){return t.concat(e)}),[]).filter((function(t){return void 0===b[t]})).forEach((function(t){b[t]=[]})),[[["svg","defs","g"].concat(a.v,a.t),At.presentation],[["filter"],At.effects],[a.cT.concat("text"),At.text],[a.cF,At.effects],[a.cG,At.gradient]].forEach((function(t){return t[0].forEach((function(e){b[e]=b[e].concat(t[1])}))}));var xt=function(t){if(null==t)return[];var e=t.getAttribute(r.class);return null==e?[]:e.split(" ").filter((function(t){return""!==t}))},Et={addClass:function(t,e){var n=xt(t).filter((function(t){return t!==e}));n.push(e),t.setAttributeNS(null,r.class,n.join(" "))},removeClass:function(t,e){var n=xt(t).filter((function(t){return t!==e}));t.setAttributeNS(null,r.class,n.join(" "))},setClass:function(t,e){t.setAttributeNS(null,r.class,e)},setId:function(t,e){t.setAttributeNS(null,r.id,e)}},Ct=function(t){var e=t.getAttribute(r.transform);return null==e||""===e?void 0:e},wt={clearTransform:function(t){return t.removeAttribute(r.transform),t}};["translate","rotate","scale","matrix"].forEach((function(t){wt[t]=function(e){for(var n=arguments.length,o=new Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];return e.setAttribute(r.transform,[Ct(e),"".concat(t,"(").concat(o.join(" "),")")].filter((function(t){return void 0!==t})).join(" "))}}));var jt={};["clip-path","mask","symbol","marker-end","marker-mid","marker-start"].forEach((function(e){jt[p(e)]=function(n,o){return n.setAttribute(e,function(e){if(null==e)return"";if(t(e)===r.string)return"url"===e.slice(0,3)?e:"url(#".concat(e,")");if(null!=e.getAttribute){var n=e.getAttribute(r.id);return"url(#".concat(n,")")}return""}(o))}}));var kt={};Object.assign(kt,bt),Object.keys(a).forEach((function(t){return a[t].filter((function(t){return void 0===kt[t]})).forEach((function(t){kt[t]={}}))}));var Ot=function(){return Array.from(arguments)};Object.keys(kt).forEach((function(t){kt[t].nodeName||(kt[t].nodeName=t),kt[t].init||(kt[t].init=Ot),kt[t].args||(kt[t].args=Ot),kt[t].methods||(kt[t].methods={}),kt[t].attributes||(kt[t].attributes=b[t]||[])}));var Pt=function(t,e){t.forEach((function(t){return Object.keys(e).forEach((function(n){kt[t].methods[n]=function(){return e[n].apply(e,arguments),arguments[0]}}))}))};Pt(m(a.t,a.v,a.g,a.s,a.p,a.i,a.h,a.d),Et),Pt(m(a.t,a.v,a.g,a.s,a.p,a.i,a.h,a.d),Z),Pt(m(a.v,a.g,a.s),wt),Pt(m(a.t,a.v,a.g),jt);var St={svg:{version:"1.1",xmlns:u},style:{type:"text/css"}},Mt=function(t,e){St[e]&&Object.keys(St[e]).forEach((function(n){return t.setAttribute(n,St[e][n])}))},Tt={},Nt=function t(e){for(var n,r,o=arguments.length,i=new Array(o>1?o-1:0),a=1;a<o;a++)i[a-1]=arguments[a];var f=c.document.createElementNS(u,kt[e].nodeName);return Mt(f,e),(n=kt[e]).init.apply(n,[f].concat(i)),(r=kt[e]).args.apply(r,i).forEach((function(t,n){null!=kt[e].attributes[n]&&f.setAttribute(kt[e].attributes[n],t)})),kt[e].attributes.forEach((function(t){Object.defineProperty(f,p(t),{value:function(){return f.setAttribute.apply(f,[t].concat(Array.prototype.slice.call(arguments))),f}})})),Object.keys(kt[e].methods).forEach((function(t){return Object.defineProperty(f,t,{value:function(){var n;return(n=kt[e].methods[t]).call.apply(n,[Tt,f].concat(Array.prototype.slice.call(arguments)))}})})),d[e]&&d[e].forEach((function(e){Object.defineProperty(f,e,{value:function(){var n=t.apply(void 0,[e].concat(Array.prototype.slice.call(arguments)));return f.appendChild(n),n}})})),f};Tt.Constructor=Nt;var Lt={};Object.keys(a).forEach((function(t){return a[t].forEach((function(t){Lt[t]=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return Nt.apply(void 0,[t].concat(n))}}))}));var zt={move:["mousemove","touchmove"],press:["mousedown","touchstart"],release:["mouseup","touchend"]},Dt=Object.values(zt).reduce((function(t,e){return t.concat(e)}),[]),Ft=function(t,e,n){return Object.defineProperty(t,e,{get:function(){return n},enumerable:!0,configurable:!0})},Bt=function(t){var e=[],n=[];Object.keys(zt).forEach((function(t){zt[t].forEach((function(t){n[t]=[]}))}));var r={press:function(){},release:function(){},move:function(t,n){t.buttons>0&&void 0===e[0]?e=n:0===t.buttons&&void 0!==e[0]&&(e=[]),["startX","startY"].filter((function(e){return!t.hasOwnProperty(e)})).forEach((function(n,r){return Ft(t,n,e[r])}))}};Object.keys(zt).forEach((function(e){var o="on"+v(e);Object.defineProperty(t,o,{set:function(o){return null==o?function(e){return zt[e].forEach((function(e){return n[e].forEach((function(n){return t.removeEventListener(e,n)}))}))}(e):zt[e].forEach((function(i){var c=function(n){var i=null!=n.touches?n.touches[0]:n;if(void 0!==i){var c=function(t,e,n){var r=t.createSVGPoint();r.x=e,r.y=n;var o=r.matrixTransform(t.getScreenCTM().inverse());return[o.x,o.y]}(t,i.clientX,i.clientY).map((function(t){return isNaN(t)?void 0:t}));["x","y"].filter((function(t){return!n.hasOwnProperty(t)})).forEach((function(t,e){return Ft(n,t,c[e])})),r[e](n,c)}o(n)};n[i].push(c),t.addEventListener(i,c)}))},enumerable:!0})})),Object.defineProperty(t,"off",{value:function(){return function(t,e){return Dt.forEach((function(n){e[n].forEach((function(e){return t.removeEventListener(n,e)})),e[n]=[]}))}(t,n)}})},Gt=function(t){var e,n,r={},o=0,i=function(){c.cancelAnimationFrame(n),Object.keys(r).forEach((function(t){return delete r[t]})),e=void 0,o=0};Object.defineProperty(t,"play",{set:function(t){if(i(),null!=t){var u=at();r[u]=function(i){e||(e=i,o=0),t({time:.001*(i-e),frame:o}),o+=1,r[u]&&(n=c.requestAnimationFrame(r[u]))},n=c.requestAnimationFrame(r[u])}},enumerable:!0}),Object.defineProperty(t,"stop",{value:i,enumerable:!0})},Ut=[["cx","cy"],["x","y"]],Rt=function(t){var n=[0,0],r={selected:!1,svg:void 0,updatePosition:function(t){return t}},o=function(){r.svg&&(r.svg.parentNode||t.appendChild(r.svg),Ut.filter((function(t){return null!=r.svg[t[0]]})).forEach((function(t){return t.forEach((function(t,e){r.svg.setAttribute(t,n[e])}))})))},i=new Proxy(n,{set:function(t,e,n){return t[e]=n,o(),!0}}),c=function(){y.apply(void 0,e(m.apply(void 0,arguments))).forEach((function(t,e){n[e]=t})),o(),"function"==typeof n.delegate&&n.delegate.apply(n.pointsContainer,[i,n.pointsContainer])};return n.delegate=void 0,n.setPosition=c,n.onMouseMove=function(t){return r.selected?c(r.updatePosition(t)):void 0},n.onMouseUp=function(){r.selected=!1},n.distance=function(t){return Math.sqrt(A(t,n))},["x","y"].forEach((function(t,e){return Object.defineProperty(n,t,{get:function(){return n[e]},set:function(t){n[e]=t}})})),["svg","updatePosition","selected"].forEach((function(t){return Object.defineProperty(n,t,{get:function(){return r[t]},set:function(e){r[t]=e}})})),Object.defineProperty(n,"remove",{value:function(){!function(t){t&&t.parentNode&&t.parentNode.removeChild(t)}(r.svg),n.delegate=void 0}}),i},qt=function(t,e,n){var r,o,i=Array.from(Array(e)).map((function(){return Rt(t)})),c=function(t){return"function"==typeof o?o.call(i,i,t):void 0};i.forEach((function(t){t.delegate=c,t.pointsContainer=i}));t.onPress=function(t){i.length>0&&(r=i.map((function(e,n){return{i:n,d:A(e,[t.x,t.y])}})).sort((function(t,e){return t.d-e.d})).shift().i,i[r].selected=!0)},t.onMove=function(t){i.forEach((function(e){return e.onMouseMove(t)}))},t.onRelease=function(){i.forEach((function(t){return t.onMouseUp()})),r=void 0},Object.defineProperty(i,"selectedIndex",{get:function(){return r}}),Object.defineProperty(i,"selected",{get:function(){return i[r]}}),Object.defineProperty(i,"add",{value:function(e){i.push(Rt(t))}}),i.removeAll=function(){for(;i.length>0;)i.pop().remove()};var u={onChange:function(t,e){o=t,!0===e&&t.call(i,i,void 0)},position:function(t){return i.forEach((function(e,n){return e.setPosition(t.call(i,n))}))},svg:function(t){return i.forEach((function(e,n){e.svg=t.call(i,n)}))}};return Object.keys(u).forEach((function(t){i[t]=function(){return"function"==typeof arguments[0]&&u[t].apply(u,arguments),i}})),i.parent=function(t){return null!=t&&null!=t.appendChild&&i.forEach((function(e){t.appendChild(e.svg)})),i},i},Xt=function(t){t.controls=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return qt.call.apply(qt,[t,t].concat(n))}},Vt=function(e){for(var n=arguments.length,o=new Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];o.filter((function(e){return t(e)===r.function})).forEach((function(t){return t.call(e,e)}))},Yt=function(){var t=arguments,n=Nt.apply(void 0,[r.svg].concat(Array.prototype.slice.call(arguments)));return Bt(n),Gt(n),Xt(n),"loading"===c.document.readyState?c.document.addEventListener("DOMContentLoaded",(function(){return Vt.apply(void 0,[n].concat(e(t)))})):Vt.apply(void 0,[n].concat(Array.prototype.slice.call(arguments))),n};return Object.assign(Yt,Lt),Yt.load=_,Yt.save=H,Yt.NS=u,Yt.append=function(t){"function"==typeof t.cp&&"function"==typeof t.graph&&"function"==typeof t.origami&&function(t,e){e.svg=t,["segment","circle","ellipse","rect","polygon"].forEach((function(n){e[n].prototype.svg=function(){return t.path(this.svgPath())}}))}(this,t)}.bind(Yt),Yt.core=Object.assign(Object.create(null),{coordinates:y}),Yt}));
