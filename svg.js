/* SVG (c) Robby Kraft, MIT License */
(function(global,factory){typeof exports==='object'&&typeof module!=='undefined'?factory(exports):typeof define==='function'&&define.amd?define(['exports'],factory):(factory((global.SVG={})))}(this,(function(exports){const svgNS="http://www.w3.org/2000/svg";function line(x1,y1,x2,y2,className,id,parent){let shape=document.createElementNS(svgNS,"line");shape.setAttributeNS(null,"x1",x1);shape.setAttributeNS(null,"y1",y1);shape.setAttributeNS(null,"x2",x2);shape.setAttributeNS(null,"y2",y2);if(className!=null){shape.setAttributeNS(null,"class",className)}
if(id!=null){shape.setAttributeNS(null,"id",id)}
if(parent!=null){parent.appendChild(shape)}
return shape}
function circle(x,y,radius,className,id,parent){let shape=document.createElementNS(svgNS,"circle");shape.setAttributeNS(null,"cx",x);shape.setAttributeNS(null,"cy",y);shape.setAttributeNS(null,"r",radius);if(className!=null){shape.setAttributeNS(null,"class",className)}
if(id!=null){shape.setAttributeNS(null,"id",id)}
if(parent!=null){parent.appendChild(shape)}
return shape}
function polygon(pointArray,className,id,parent){let pointsString=pointArray.map((el)=>(el.constructor===Array?el:[el.x,el.y])).reduce((prev,curr)=>prev+curr[0]+","+curr[1]+" ","");let shape=document.createElementNS(svgNS,"polygon");shape.setAttributeNS(null,"points",pointsString);if(className!=null){shape.setAttributeNS(null,"class",className)}
if(id!=null){shape.setAttributeNS(null,"id",id)}
if(parent!=null){parent.appendChild(shape)}
return shape}
function bezier(fromX,fromY,c1X,c1Y,c2X,c2Y,toX,toY,className,id,parent){let d="M "+fromX+","+fromY+" C "+c1X+","+c1Y+" "+c2X+","+c2Y+" "+toX+","+toY;let shape=document.createElementNS(svgNS,"path");shape.setAttributeNS(null,"d",d);if(className!=null){shape.setAttributeNS(null,"class",className)}
if(id!=null){shape.setAttributeNS(null,"id",id)}
if(parent!=null){parent.appendChild(shape)}
return shape}
function group(className,id,parent){let g=document.createElementNS(svgNS,"g");if(className!=null){g.setAttributeNS(null,"class",className)}
if(id!=null){g.setAttributeNS(null,"id",id)}
if(parent!=null){parent.appendChild(g)}
return g}
function svg$1(className,id,parent){let svg=document.createElementNS(svgNS,"svg");if(className!=null){svg.setAttributeNS(null,"class",className)}
if(id!=null){svg.setAttributeNS(null,"id",id)}
if(parent!=null){parent.appendChild(svg)}
return svg}
function addClass(xmlNode,newClass){if(xmlNode==undefined){return}
let currentClass=xmlNode.getAttribute("class");if(currentClass==undefined){currentClass=""}
let classes=currentClass.split(" ").filter((c)=>c!==newClass);classes.push(newClass);xmlNode.setAttributeNS(null,"class",classes.join(" "))}
function removeClass(xmlNode,newClass){if(xmlNode==undefined){return}
let currentClass=xmlNode.getAttribute("class");if(currentClass==undefined){currentClass=""}
let classes=currentClass.split(" ").filter((c)=>c!==newClass);xmlNode.setAttributeNS(null,"class",classes.join(" "))}
function setId(xmlNode,newID){if(xmlNode==undefined){return}
xmlNode.setAttributeNS(null,"id",newID)}
function setAttribute(xmlNode,attribute,value){if(xmlNode==undefined){return}
xmlNode.setAttributeNS(null,attribute,value)}
function removeChildren(group){while(group.lastChild){group.removeChild(group.lastChild)}}
function setViewBox(svg,x,y,width,height,padding=0){let zoom=1.0;let d=(width/zoom)-width;let X=(x-d)-padding;let Y=(y-d)-padding;let W=(width+d*2)+padding*2;let H=(height+d*2)+padding*2;let viewBoxString=[X,Y,W,H].join(" ");svg.setAttribute("viewBox",viewBoxString)}
function convertToViewbox(svg,x,y){let pt=svg.createSVGPoint();pt.x=x;pt.y=y;let svgPoint=pt.matrixTransform(svg.getScreenCTM().inverse());var array=[svgPoint.x,svgPoint.y];array.x=svgPoint.x;array.y=svgPoint.y;return array}
var SVG={line,circle,polygon,bezier,group,svg:svg$1,addClass,removeClass,setId,removeChildren,setAttribute,setViewBox,convertToViewbox};function View(){let svg=SVG.svg();let _padding=0.01;const zoomView=function(scale,origin_x,origin_y){};const translate=function(dx,dy){};const setViewBox=function(x,y,width,height){SVG.setViewBox(svg,x,y,width,height,_padding)};document.addEventListener("DOMContentLoaded",function(){let args=Array.from(arguments);let element=args.filter((arg)=>arg instanceof HTMLElement).shift();let idElement=args.filter((a)=>typeof a==="string"||a instanceof String).map(str=>document.getElementById(str)).shift();let parent=(element!=null?element:(idElement!=null?idElement:document.body));parent.appendChild(svg)});return Object.freeze({svg,zoomView,translate,setViewBox})}
function Interactive(){let{setPadding,zoomView,translate,setViewBox}=View(...arguments);this.event={animate:function(){},onResize:function(){},onMouseMove:function(){},onMouseDown:function(){},onMouseUp:function(){},onMouseDidBeginDrag:function(){},};let mouse={isPressed:!1,position:[0,0],pressed:[0,0],drag:[0,0]};var that=this;svg.onmousedown=function(event){mouse.isPressed=!0;mouse.pressed=SVG.convertToViewbox(svg,event.clientX,event.clientY);that.event.onMouseDown(mouse)};svg.onmouseup=function(event){mouse.isPressed=!1;that.event.onMouseUp(mouse)};svg.onmousemove=function(event){mouse.position=SVG.convertToViewbox(svg,event.clientX,event.clientY);if(mouse.isPressed){mouse.drag=[mouse.position[0]-mouse.pressed[0],mouse.position[1]-mouse.pressed[1]];that.event.onMouseDidBeginDrag(mouse)}
that.event.onMouseMove(mouse)};svg.onResize=function(event){that.event.onResize(event)};animateTimer=setInterval(function(){if(typeof that.event.animate==="function"){that.event.animate({"time":svg.getCurrentTime(),"frame":frameNum})}
frameNum+=1},1000/60);return{zoomView,translate,setViewBox,event:this.event,mouse,}}
let line$1=SVG.line;let circle$1=SVG.circle;let polygon$1=SVG.polygon;let bezier$1=SVG.bezier;let group$1=SVG.group;let svg$2=SVG.svg;let addClass$1=SVG.addClass;let removeClass$1=SVG.removeClass;let setId$1=SVG.setId;let removeChildren$1=SVG.removeChildren;let setAttribute$1=SVG.setAttribute;let setViewBox$1=SVG.setViewBox;let convertToViewbox$1=SVG.convertToViewbox;exports.line=line$1;exports.circle=circle$1;exports.polygon=polygon$1;exports.bezier=bezier$1;exports.group=group$1;exports.svg=svg$2;exports.addClass=addClass$1;exports.removeClass=removeClass$1;exports.setId=setId$1;exports.removeChildren=removeChildren$1;exports.setAttribute=setAttribute$1;exports.setViewBox=setViewBox$1;exports.convertToViewbox=convertToViewbox$1;exports.View=View;exports.interactive=Interactive;Object.defineProperty(exports,'__esModule',{value:!0})})))