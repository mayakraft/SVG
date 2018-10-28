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
function addClass(xmlNode,newClass){if(xmlNode==undefined){return}
let currentClass=xmlNode.getAttribute("class");if(currentClass==undefined){currentClass=""}
let classes=currentClass.split(" ").filter((c)=>c!==newClass);classes.push(newClass);xmlNode.setAttributeNS(null,"class",classes.join(" "))}
function removeClass(xmlNode,newClass){if(xmlNode==undefined){return}
let currentClass=xmlNode.getAttribute("class");if(currentClass==undefined){currentClass=""}
let classes=currentClass.split(" ").filter((c)=>c!==newClass);xmlNode.setAttributeNS(null,"class",classes.join(" "))}
function setId(xmlNode,newID){if(xmlNode==undefined){return}
xmlNode.setAttributeNS(null,"id",newID)}
function removeChildren(group){while(group.lastChild){group.removeChild(group.lastChild)}}
function setViewBox(svg,x,y,width,height,padding=0){let zoom=1.0;let d=(width/zoom)-width;let X=(x-d)-padding;let Y=(y-d)-padding;let W=(width+d*2)+padding*2;let H=(height+d*2)+padding*2;let viewBoxString=[X,Y,W,H].join(" ");svg.setAttribute("viewBox",viewBoxString)}
function convertToViewbox(svg,x,y){let pt=svg.createSVGPoint();pt.x=x;pt.y=y;let svgPoint=pt.matrixTransform(svg.getScreenCTM().inverse());var array=[svgPoint.x,svgPoint.y];array.x=svgPoint.x;array.y=svgPoint.y;return array}
var SVG$1={line,circle,polygon,bezier,group,SVG,addClass,removeClass,setId,removeChildren,setViewBox,convertToViewbox};function View(){let _svg=SVG$1.svg();let _padding=0.01;const zoomView=function(scale,origin_x,origin_y){};const translate=function(dx,dy){};const setViewBox=function(x,y,width,height){SVG$1.setViewBox(_svg,x,y,width,height,_padding)};document.addEventListener("DOMContentLoaded",function(){let args=Array.from(arguments);let element=args.filter((arg)=>arg instanceof HTMLElement).shift();let idElement=args.filter((a)=>typeof a==="string"||a instanceof String).map(str=>document.getElementById(str)).shift();let parent=(element!=null?element:(idElement!=null?idElement:document.body));parent.appendChild(svg)});return Object.freeze({zoomView,translate,setViewBox})}
function Interactive(){let{setPadding,zoomView,translate,setViewBox}=View(...arguments);this.event={animate:function(){},onResize:function(){},onMouseMove:function(){},onMouseDown:function(){},onMouseUp:function(){},onMouseDidBeginDrag:function(){},};let mouse={isPressed:!1,position:[0,0],pressed:[0,0],drag:[0,0]};var that=this;svg.onmousedown=function(event){mouse.isPressed=!0;mouse.pressed=SVG$1.convertToViewbox(svg,event.clientX,event.clientY);that.event.onMouseDown(mouse)};svg.onmouseup=function(event){mouse.isPressed=!1;that.event.onMouseUp(mouse)};svg.onmousemove=function(event){mouse.position=SVG$1.convertToViewbox(svg,event.clientX,event.clientY);if(mouse.isPressed){mouse.drag=[mouse.position[0]-mouse.pressed[0],mouse.position[1]-mouse.pressed[1]];that.event.onMouseDidBeginDrag(mouse)}
that.event.onMouseMove(mouse)};svg.onResize=function(event){that.event.onResize(event)};animateTimer=setInterval(function(){if(typeof that.event.animate==="function"){that.event.animate({"time":svg.getCurrentTime(),"frame":frameNum})}
frameNum+=1},1000/60);return{zoomView,translate,setViewBox,event:this.event,mouse,}}
exports.svg=SVG$1;exports.view=View;exports.interactive=Interactive;Object.defineProperty(exports,'__esModule',{value:!0})})))