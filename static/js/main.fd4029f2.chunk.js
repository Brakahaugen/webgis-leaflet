(window.webpackJsonpleafletapp=window.webpackJsonpleafletapp||[]).push([[0],{272:function(e,t,a){e.exports=a(550)},277:function(e,t,a){},286:function(e,t,a){},287:function(e,t,a){},288:function(e,t,a){},544:function(e,t,a){},550:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),l=a.n(o),i=(a(277),a(29)),s=a(17),c=a(13),u=a(19),d=a(20),p=a(26),y=a(21),m=a(595),g=a(607),h=a(598),f=a(597),b=a(594),v=a(596),E=a(36),k=a(582),C=a(608),w=a(589),O=a(584),P=a(604),L=Object(k.a)((function(e){return{button:{display:"block",marginTop:e.spacing(2)},formControl:{margin:e.spacing(1),minWidth:120}}}));function S(e){var t=e.initialParam,a=e.type,n=e.layers,o=e.tools,l=e.setParentValue,i=L(),s=r.a.useState(t),c=Object(E.a)(s,2),u=c[0],d=c[1],p=r.a.useState(!1),y=Object(E.a)(p,2),m=y[0],g=y[1];return r.a.createElement("div",null,r.a.createElement("form",{autoComplete:"off"},r.a.createElement(O.a,{className:i.formControl},r.a.createElement(C.a,{htmlFor:"selector"},a),r.a.createElement(P.a,{open:m,onClose:function(){g(!1)},onOpen:function(){g(!0)},value:u,onChange:function(e){d(e.target.value),l(e.target.value)},inputProps:{name:"value"}},r.a.createElement(w.a,{value:"-1"},r.a.createElement("em",null,"None")),"tools"==a?o?o.map((function(e,t){return r.a.createElement(w.a,{value:t},r.a.createElement("em",null,e))})):alert("Something went horribly wrong"):n?n.map((function(e,t){return r.a.createElement(w.a,{value:t},r.a.createElement("em",null,e.layer.name?e.layer.name:e.layer._leaflet_id))})):alert("No "+{layers:n}+" to process... Add a layer by dragging it into the left column.")))))}var j=a(16),x=a(34),T=a.n(x);function I(e,t){var a=[],n=[];console.log(e);try{var r=[];e[0].layer.eachLayer((function(e){if("Polygon"==e.feature.geometry.type)a.push(e.feature);else{if("MultiPolygon"!=e.feature.geometry.type)return t("...Invalid geometry-types!","error"),null;r.push(e.feature.geometry.coordinates.map((function(e){return j.polygon(e)})))}})),r.forEach((function(e){console.log(e[0]),a.push(e[0])})),r=[],e[1].layer.eachLayer((function(e){if("Polygon"==e.feature.geometry.type||"MultiPolygon"==e.feature.geometry.type)n.push(e.feature);else{if("MultiPolygon"!=e.feature.geometry.type)return t("...Invalid geometry-types!","error"),null;r.push(e.feature.geometry.coordinates.map((function(e){return j.polygon(e)})))}})),r.forEach((function(e){console.log(e[0]),n.push(e[0])}))}catch(s){t("something went wrong while loading the layers. Check your inputs before trying again...","error")}var o=[];console.log(n),console.log(a);try{a.forEach((function(e){n.forEach((function(t){var a=null;try{console.log(e),console.log(t),a=j.intersect(e,t)}catch(n){console.log("WTF why you no work")}null!==a&&o.push(a)}))})),console.log(o)}catch(c){console.log("did not intersect properly");try{a.forEach((function(e){n.forEach((function(t){var a=null;try{a=j.difference(e,j.difference(e,t))}catch(n){}null!==a&&o.push(a)}))}))}catch(u){return t("Could not generate the intersection. Contact your highest superior","error"),null}}var l="new_";e[0].layer.name&&(l=e[0].layer.name);var i={type:"FeatureCollection",name:l+" intersection",features:o};return console.log(i),console.log(JSON.stringify(i)),i}var N=a(586),M=a(142),_=a.n(M),F=(a(114),a(2)),D=a(593),z=a(4),V=a(234),B=a.n(V),R=a(236),H=a.n(R),W=a(237),A=a.n(W),Z=a(99),U=a.n(Z),J=a(590),Y=a(591),G=a(592),$=a(556),q=a(235),K=a.n(q),Q={success:B.a,warning:K.a,error:H.a,info:A.a},X=Object(k.a)((function(e){return{success:{backgroundColor:J.a[600]},error:{backgroundColor:e.palette.error.dark},info:{backgroundColor:e.palette.primary.main},warning:{backgroundColor:Y.a[700]},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:e.spacing(1)},message:{display:"flex",alignItems:"center"}}}));function ee(e){var t=X(),a=e.className,n=e.message,o=e.onClose,l=e.variant,i=Object(F.a)(e,["className","message","onClose","variant"]),s=Q[l];return r.a.createElement($.a,Object.assign({className:Object(z.a)(t[l],a),"aria-describedby":"client-snackbar",message:r.a.createElement("span",{id:"client-snackbar",className:t.message},r.a.createElement(s,{className:Object(z.a)(t.icon,t.iconVariant)}),n),action:[r.a.createElement(G.a,{key:"close","aria-label":"close",color:"inherit",onClick:o},r.a.createElement(U.a,{className:t.icon}))]},i))}var te=function(e){function t(e){return Object(s.a)(this,t),Object(u.a)(this,Object(d.a)(t).call(this,e))}return Object(y.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(D.a,{anchorOrigin:{vertical:"bottom",horizontal:"left"},autoHideDuration:8e3,open:this.props.open,onClose:this.props.toggleSnackbar},r.a.createElement(ee,{onClose:this.props.toggleSnackbar,variant:this.props.msgType,message:this.props.msg})))}}]),t}(r.a.Component);var ae=a(238);var ne=Object(k.a)((function(e){return{button:{display:"block",marginTop:e.spacing(2),color:"white",floodColor:"black"},formControl:{margin:e.spacing(1),minWidth:120},input:{margin:e.spacing(1)}}})),re=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleClickOpen=function(){a.setState({open:!0})},a.toggleSnackbar=function(e,t){("string"===typeof e||e instanceof String)&&("string"===typeof t||t instanceof String)?(console.log(e),console.log(t),a.setState({snackbar:!0,snackbarMsg:e,snackbarType:t})):"clickaway"!==t&&a.setState({snackbar:!1,snackbarMsg:"",snackbarType:""})},a.handleClose=function(){console.log(a.state.selectedTool),console.log(a.props.layers),a.setState({open:!1})},a.setTool=function(e){a.setState({selectedToolIndex:e})},a.setParam=function(e){a.state.param1!=e?(a.state.param2==e&&a.toggleSnackbar("You must choose two differen't layers","warning"),a.setState({param1:e})):console.log("samesies")},a.setParam2=function(e){a.state.param2!=e?(a.state.param1==e&&a.toggleSnackbar("You must choose two differen't layers","warning"),a.setState({param2:e})):console.log("samesies")},a.setNumberParam=function(e){a.setState({numberParameter:e.target.value}),console.log(e.target.value)},a.displaySnackbar=function(){var e=r.a.createElement(te,{open:a.state.snackbar,toggleSnackbar:a.toggleSnackbar,msgType:a.state.snackbarType?a.state.snackbarType:"success",msg:a.state.snackbarMsg?a.state.snackbarMsg:"hello"});return console.log(e),e},a.doProcess=function(){var e=a.state.tools[a.state.selectedToolIndex],t=a.props.layers[a.state.param1],n=a.props.layers[a.state.param2],r=a.state.numberParameter,o=null;switch(e){case"UNION":o=function(e,t,a){console.log(e);try{var n=[];e.forEach((function(e){console.log(e),e.layer.eachLayer((function(e){n.push(e.feature)}))}))}catch(r){return void a("Inputs are not valid...","error")}try{return j.union.apply(j,n)}catch(o){return a("something went wrong while loading the layers. Check your inputs before trying again...","error"),null}}([t,n],0,a.toggleSnackbar);break;case"BUFFER":o=function(e,t,a){a("Validating input...","info");try{var n={type:"FeatureCollection",features:[]};console.log(e),console.log(e.layer),e.layer.eachLayer((function(e){console.log(e),console.log(e.feature),n.features.push(e.feature)})),a("Validation complete. Continuing with buffer-operation...","info")}catch(o){return a("something went wrong while loading the layers. Check your inputs before trying again...","error"),null}try{var r=j.buffer(n,t,{units:"kilometers"});return console.log(r),r}catch(l){return a("Could not generate the buffer. Contact your highest superior","error"),null}}(t,r,a.toggleSnackbar);break;case"INTERSECT":o=I([t,n],a.toggleSnackbar);break;case"SIMPLIFY":o=function(e,t,a){try{var n={type:"FeatureCollection",features:[]};e.layer.eachLayer((function(e){n.features.push(e.feature)}))}catch(l){a("something went wrong while loading the layers. Check your inputs before trying again...","error")}try{var r={tolerance:t,highQuality:!1},o=j.simplify(n,r);return console.log(o),o}catch(i){return a("Could not generate the simplified layer. Contact your highest superior","error"),null}}(t,r,a.toggleSnackbar);break;case"CLIP":o=function(e,t,a){a("Validating input...","info");try{var n,r={type:"FeatureCollection",features:[]};console.log(e),console.log(e.layer),e.layer.eachLayer((function(e){n=e.feature.geometry.type,console.log(e),console.log(e.feature.geometry.type),console.log(r),r.features.push(e.feature),console.log(r)})),console.log("Done with the inputs");var o=null;console.log(o),t.layer.eachLayer((function(e){var t=e.feature.geometry.type;console.log(e),console.log(e.feature.geometry.type),"Polygon"!=t&&Object(ae.fail)(),o=e.feature})),a("Validation complete. Continuing with buffer-operation...","info")}catch(i){return a("something went wrong while loading the layers. Check your inputs before trying again...","error"),null}if("Point"==n)return j.pointsWithinPolygon(r,o);if("Polygon"==n)return I([e,t],a);if("LineString"==n){var l=[];return r.features.forEach((function(e){j.lineSplit(e,o).features.forEach((function(e){var t,a=e.geometry.coordinates;t=2==a.length?j.center(e):j.point(a[1]),j.pointsWithinPolygon(t,o).features.length>0&&l.push(e)}))})),r.features=l,r}}(t,n,a.toggleSnackbar)}null!=o&&(a.props.handleNewFile(o),a.toggleSnackbar("...Success!","success")),a.setState({open:!1,param1:null,param2:null,numberParameter:.001})},a.state={layers:a.props.layers,selectedToolIndex:-1,open:!1,tools:["UNION","BUFFER","INTERSECT","SIMPLIFY","CLIP"],parameters:[],param1:null,param2:null,numberParameter:.001,snackbar:!1,snackbarMsg:"",snackbarType:""},a}return Object(y.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e,t,a;switch(this.state.selectedToolIndex){case-1:break;case 0:e=r.a.createElement("div",null,r.a.createElement(b.a,null,"Choose the layers you want to find the union of."),r.a.createElement("div",{style:{display:"flex"}},r.a.createElement(S,{setParentValue:this.setParam,initialParam:-1,tools:this.state.tools,layers:this.props.layers,type:"1st Input layer"}),r.a.createElement(S,{setParentValue:this.setParam2,initialParam:-1,tools:this.state.tools,layers:this.props.layers,type:"2nd Input layer"})));break;case 1:e=r.a.createElement(S,{setParentValue:this.setParam,initialParam:-1,tools:this.state.tools,layers:this.props.layers,type:"Input",typeText:"Choose the layer you want to make a buffer around."}),t=r.a.createElement(N.a,{onChange:this.setNumberParam,placeholder:"Buffer distance (km)",inputProps:{"aria-label":"description"}}),a=r.a.createElement(b.a,null,"Insert the buffer distance. In kilometres");break;case 2:e=r.a.createElement("div",null,r.a.createElement(b.a,null,"Choose the layers you want to find the intersection of."),r.a.createElement("div",{style:{display:"flex"}},r.a.createElement(S,{setParentValue:this.setParam,initialParam:-1,tools:this.state.tools,layers:this.props.layers,type:"1st Input layer"}),r.a.createElement(S,{setParentValue:this.setParam2,initialParam:-1,tools:this.state.tools,layers:this.props.layers,type:"2nd Input layer"})));break;case 3:e=r.a.createElement("div",null,r.a.createElement(b.a,null,"Choose the layer you want to simplify."),r.a.createElement("div",{style:{display:"flex"}},r.a.createElement(S,{setParentValue:this.setParam,initialParam:-1,tools:this.state.tools,layers:this.props.layers,type:"Input layer"}))),t=r.a.createElement(N.a,{onChange:this.setNumberParam,placeholder:"Default 0.001",inputProps:{"aria-label":"description"}}),a=r.a.createElement(b.a,null,"Insert tolerance factor. Must be higher than 0.");break;case 4:e=r.a.createElement("div",null,r.a.createElement(b.a,null,"Choose the layer you want to clip."),r.a.createElement("div",{style:{display:"flex"}},r.a.createElement(S,{setParentValue:this.setParam,initialParam:-1,tools:this.state.tools,layers:this.props.layers,type:"Input line-layer"}),r.a.createElement(S,{setParentValue:this.setParam2,initialParam:-1,tools:this.state.tools,layers:this.props.layers,type:"clip on polygon:"})))}return r.a.createElement("div",null,r.a.createElement(m.a,{variant:"contained",color:"primary",className:ne.button,onClick:this.handleClickOpen},r.a.createElement(_.a,null),"Geoprocess"),r.a.createElement(g.a,{open:this.state.open,onClose:this.handleClose,"aria-labelledby":"form-dialog-title"},r.a.createElement(v.a,{id:"form-dialog-title"},"Processing Tools"),r.a.createElement(f.a,null,r.a.createElement(b.a,null,"Choose the tool you want to use"),r.a.createElement(S,{initialParam:this.state.selectedToolIndex,setParentValue:this.setTool,tools:this.state.tools,type:"tools"}),e,a,t),r.a.createElement(h.a,null,r.a.createElement(m.a,{onClick:this.handleClose,color:"primary"},"Cancel"),r.a.createElement(m.a,{onClick:this.doProcess,color:"primary"},"Process"))),this.state.snackbar?this.displaySnackbar():"")}}]),t}(r.a.Component),oe=(a(286),function(e){return r.a.createElement("button",{className:"toggle-button",onClick:e.click},r.a.createElement("div",{className:"toggle-button__line"}),r.a.createElement("div",{className:"toggle-button__line"}),r.a.createElement("div",{className:"toggle-button__line"}))}),le=a(144),ie=a.n(le),se=a(239),ce=a.n(se),ue=Object(k.a)((function(e){return{button:{display:"block",marginTop:e.spacing(2),color:"white",floodColor:"black"},formControl:{margin:e.spacing(1),minWidth:120},input:{margin:e.spacing(1)}}})),de=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).handleClick=function(){a.state.open?a.handleClose():a.handleOpen()},a.handleOpen=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Polygon";a.setState({open:!0,icon:r.a.createElement(ce.a,null),text:"Save layer",color:"default"}),a.props.toggleCreateMode(e)},a.handleClose=function(){a.setState({open:!1,icon:r.a.createElement(ie.a,null),text:"create new layer",color:"primary"}),a.props.toggleCreateMode(!1)},a.handleSelect=function(e){console.log(e.target.value),a.props.toggleCreateMode(e.target.value),a.setState({type:e.target.value})},a.state={open:!1,icon:r.a.createElement(ie.a,null,"kj\xf8asdf"),text:"create new layer",color:"primary",type:"Polygon"},a}return Object(y.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{style:{spacing:50}},this.state.open?r.a.createElement(P.a,{value:this.state.type,onChange:this.handleSelect},r.a.createElement(w.a,{value:"LineString"},"LineString"),r.a.createElement(w.a,{value:"Polygon"},"Polygon"),r.a.createElement(w.a,{value:"B"},"BBox")):"",r.a.createElement(m.a,{variant:"contained",color:this.state.color,className:ue.button,onClick:this.handleClick},this.state.icon,this.state.text))}}]),t}(r.a.Component),pe=(a(287),function(e){return r.a.createElement("header",{className:"toolbar"},r.a.createElement("nav",{className:"toolbar__navigation"},r.a.createElement("div",{className:"toolbar__toggle-button"},r.a.createElement(oe,{click:e.drawerClickHandler})),r.a.createElement("div",{className:"spacer"}),r.a.createElement("div",{className:"toolbar_navigation-items"},r.a.createElement(de,{createLayerMode:e.createLayerMode,toggleCreateMode:e.toggleCreateMode})),r.a.createElement("div",{className:"minispacer"}),r.a.createElement("div",{className:"toolbar_navigation-items"},r.a.createElement(re,{layers:e.layers,handleNewFile:e.handleNewFile}))))}),ye=(a(288),a(554)),me=a(555),ge=a(599),he=a(600);a(240),a(605),Object(k.a)((function(e){return{root:{width:"100%",height:"200px",maxWidth:360,backgroundColor:e.palette.background.paper}}}));var fe=a(10),be=a(603),ve=a(602),Ee=a(75),ke=a(243),Ce=a.n(ke),we=a(244),Oe=a.n(we),Pe=a(249),Le=a.n(Pe),Se=(a(557),a(551),a(553),a(601),a(588),a(104)),je=a.n(Se),xe=a(609),Te=a(241),Ie=(a(446),function(e){for(var t=r.a.useState(!1),a=Object(E.a)(t,2),n=a[0],o=a[1],l=r.a.useState(),i=Object(E.a)(l,2),s=i[0],c=i[1],u=r.a.useState(),d=Object(E.a)(u,2),p=d[0],y=d[1],k=r.a.useState(),C=Object(E.a)(k,2),w=(C[0],C[1],function(){e.onClose(),o(!1)}),O=function(e){y(e.target.value)},P=[],L=0;L<e.subTexts.length;L++)P.push(r.a.createElement("div",null,r.a.createElement(b.a,null,e.subTexts[L]),r.a.createElement(xe.a,{autoFocus:!0,margin:"dense",id:L,onChange:0==L?function(e){return O(e)}:"",fullWidth:!0})));return r.a.createElement("div",null,r.a.createElement(m.a,{onClick:function(){e.onClick(),o(!0)}},r.a.createElement(je.a,null)),r.a.createElement(g.a,{open:n,"aria-labelledby":"form-dialog-title",fullWidth:"sm",maxWidth:"sm",onClose:w},r.a.createElement(v.a,{id:"form-dialog-title"},e.item.layer.name?e.item.layer.name:e.item.layer._leaflet_id),r.a.createElement(f.a,null,P),r.a.createElement("div",{style:{paddingTop:"4%",marginLeft:"4%",marginRight:"4%"}},r.a.createElement(Te.SliderPicker,{color:s,onChange:function(e){c(e)}})),r.a.createElement(h.a,null,r.a.createElement(m.a,{onClick:w,color:"primary"},"Cancel"),r.a.createElement(m.a,{onClick:function(){console.log(p),""!=p&&void 0!=p&&(e.item.layer.name=p),console.log(s),console.log(e.item.layer.options.style.color),void 0!=s&&s.hex!=e.item.layer.options.style.color&&e.item.layer.setStyle({weight:2,dashArray:"",fillOpacity:.9,fillColor:s.hex,color:s.hex}),w()},color:"primary"},"Confirm"))))});Object(k.a)((function(e){return{root:{display:"flex"},paper:{marginRight:e.spacing(2)}}}));function Ne(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}var Me=function(e,t){return function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?Ne(a,!0).forEach((function(t){Object(fe.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):Ne(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},t,{},e&&{background:"rgb(235,235,235)"})},_e=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).onZoomToLayer=function(e){console.log("yiagkdaj\xf8gaskdg\xf8asdk")},a.changeDisplay=function(e){},a.changeName=function(e){},a.state={items:e.layers,selectedIndex:null,displayDialog:null,disableDrag:!1},a.onDragEnd=a.onDragEnd.bind(Object(p.a)(a)),a}return Object(y.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(e){this.props.layers!==e.layers&&this.setState({items:this.props.layers})}},{key:"onDragEnd",value:function(e){if(e.destination){var t=function(e,t,a){var n=Array.from(e),r=n.splice(t,1),o=Object(E.a)(r,1)[0];return n.splice(a,0,o),n}(this.state.items,e.source.index,e.destination.index);this.props.orderLayers(t),this.setState({items:t})}}},{key:"rightClick",value:function(e){console.log("RIGHT CLICK BABY ")}},{key:"render",value:function(){var e=this,t=r.a.createElement(Ce.a,null),a=r.a.createElement(Oe.a,null);return r.a.createElement(Ee.a,{onDragEnd:this.onDragEnd},r.a.createElement(Ee.c,{droppableId:"droppable"},(function(n,o){return r.a.createElement(ve.a,{rootRef:n.innerRef},r.a.createElement(ye.a,null,e.props.layers.map((function(n,l){return r.a.createElement("li",{key:n.layer._,style:(i=o.isDraggingOver,{border:i?"":"solid",margin:"0 0 5px 0"})},r.a.createElement(Ee.b,{key:n.layer._leaflet_id,draggableId:n.layer._leaflet_id,index:l},(function(o,i){return r.a.createElement(me.a,Object.assign({selected:e.props.selectedIndex===l,onClick:function(t){return e.props.handleListItemClick(t,l)},onContextMenu:e.rightClick,ContainerComponent:"li",ContainerProps:{ref:o.innerRef}},o.draggableProps,o.dragHandleProps,{style:e.state.disableDrag?console.log():Me(i.isDragging,o.draggableProps.style)}),r.a.createElement(he.a,{primary:n.layer.name?n.layer.name:n.layer._leaflet_id}),r.a.createElement(ge.a,null,r.a.createElement(G.a,{id:n.layer._leaflet_id,onClick:function(){return e.props.toggleVisibility(n.layer)}},n.layer.visibility?t:a)),r.a.createElement(G.a,{id:n.layer._leaflet_id,onClick:function(){return e.props.onDelete(n.layer._leaflet_id)}},r.a.createElement(Le.a,null)),r.a.createElement("div",{style:{zIndex:"800"}},r.a.createElement(Ie,{onClick:function(){return e.state.disableDrag=!0},onClose:function(){return e.state.disableDrag=!1},item:n,heading:"Change display",subTexts:["Change layer name"]})),r.a.createElement(be.a,null))})));var i})),n.placeholder))})))}}]),t}(n.Component),Fe=(a(544),function(e){return r.a.createElement("div",{className:"backdrop",onClick:e.click})}),De=a(250);a(545);function ze(){var e=Object(De.a)(["\n    width: ",";\n    height: ","; \n"]);return ze=function(){return e},e}var Ve=a(251).a.div(ze(),(function(e){return e.width}),(function(e){return e.height}));var Be=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={file:a.props.file,createLayerMode:a.props.createLayerMode,createdLayer:null},a.componentDidMount=function(){a.map=T.a.map("map",{center:[40.7292369,-73.996565],zoom:13,zoomControl:!1,layers:T.a.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",{detectRetina:!0,maxZoom:20,maxNativeZoom:17})}),a.map.on("layeradd",a.props.addLayer),a.map.on("click",a.props.clickCreateLayer)},a.componentDidUpdate=function(e){try{if(0!=e.createLayerMode&&0==a.props.createLayerMode||0!=e.clickedPoints.length&&0==a.props.clickedPoints.length){a.map.removeLayer(a.state.layer);var t=e.clickedPoints;return t.forEach((function(e){e.reverse()})),"Polygon"==e.createLayerMode&&(console.log("change the rules"),t=[t=[].concat(Object(i.a)(t),[t[0]])]),a.createLayer({type:"Feature",name:"Created "+e.createLayerMode,geometry:{type:e.createLayerMode,coordinates:t}}),void a.setState({layer:null})}}catch(r){console.log("nevermind")}var n;a.props.clickedPoints.length==e.clickedPoints.length&&a.props.createLayerMode==e.createLayerMode||(null!=a.state.layer&&a.map.removeLayer(a.state.layer),"LineString"==a.props.createLayerMode?n=T.a.polyline(a.props.clickedPoints,{color:"green"}).addTo(a.map):"Polygon"==a.props.createLayerMode&&(n=T.a.polygon(a.props.clickedPoints,{color:"green"}).addTo(a.map)),a.setState({layer:n}));if(a.props.file)a.createLayer(a.props.file),a.props.resetFile();else if(a.props.deletedLayer)console.log(a.props.deletedLayer),a.map.removeLayer(a.props.deletedLayer),a.props.resetFile();else if(a.props.hide)console.log(a.props.hide),a.map.removeLayer(a.props.hide),a.props.resetFile();else if(a.props.unhide)a.props.unhide.addTo(a.map),a.map.addLayer(a.props.unhide),a.props.resetFile();else if(0!=a.props.zoomTo.length)return console.log(a.props.zoomTo[0]),a.props.resetZoom(),a.map.fitBounds(a.props.zoomTo[0].layer.getBounds())},a.zoomToFeature=function(e){try{return console.log(e),e.layer?a.map.fitBounds(e.target.getBounds()):"$10.00"}catch(t){}},a.onEachFeature=function(e){a.map.on({click:a.props.hideLayer})},a.createLayer=function(e){console.log("creating a geojsonlayer");var t=T.a.geoJSON(e,{pointToLayer:function(e,t){return T.a.circleMarker(t,{radius:5,fillColor:"#ff7800",color:"#000",weight:1,opacity:1,fillOpacity:.9})},style:{color:"#"+Math.floor(16777215*Math.random()).toString(16),fillOpacity:.9},onEachFeature:a.onEachFeature}).addTo(a.map);t.name=e.name,t.type=e.type,t.visibility=!0,t.setZIndex(-800),t.bindPopup("part of: "+e.name),t.on({click:a.zoomToFeature})},a}return Object(y.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(Ve,{width:"100%",height:"100%",id:"map"})}}]),t}(r.a.Component),Re=(n.Component,a(143)),He=(a(546),a(148)),We=a.n(He);var Ae=function(e){var t=Object(n.useCallback)((function(t){t.forEach((function(t){var a=new FileReader;a.onabort=function(){return console.log("file reading was aborted")},a.onerror=function(){return console.log("file reading has failed")},a.onload=function(){var t=a.result,n=JSON.parse(t);e.handleNewFile(n),console.log(n)},a.readAsBinaryString(t)}))}),[]),a=Object(Re.a)({onDrop:t}),o=a.getRootProps,l=a.getInputProps,i=a.isDragActive;return r.a.createElement("div",o(),r.a.createElement("input",l()),i?r.a.createElement("p",{style:{height:"75px",position:"flex",textAlign:"center",border:"dashed",boxShadow:"10",background:"lightgreen"}},r.a.createElement(We.a,null)):r.a.createElement("div",null,r.a.createElement("p",{style:{height:"75px",position:"flex",textAlign:"center",border:"dashed"}},r.a.createElement(We.a,null),r.a.createElement("p",null,"Click or drag to add files!"))))},Ze=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={sideDrawerOpen:!0,layers:[],selectedIndex:null,file:null,deletedLayers:[],deletedLayer:null,hide:null,unhide:null,zoomTo:[],createLayerMode:!1,clickedPoints:[]},a.componentDidUpdate=function(){},a.drawerToggleClickHandler=function(){a.setState((function(e){return{sideDrawerOpen:!e.sideDrawerOpen}}))},a.toggleCreateMode=function(e){0==e||"quit"==e?a.setState({createLayerMode:e,clickedPoints:[]}):"reset"==e?a.setState({clickedPoints:[]}):a.setState({createLayerMode:e})},a.openGeoProcess=function(){},a.backdropClickHandler=function(){a.setState({sideDrawerOpen:!1})},a.handleNewFile=function(e){a.setState({file:e})},a.handleListItemClick=function(e,t){a.setState({selectedIndex:t,zoomTo:[a.state.layers[t]]});try{console.log(a.state.layers[t].layer.name)}catch(n){console.log("could not find name")}},a.handleDelete=function(e){try{var t=a.state.layers.filter((function(t){return t.layer._leaflet_id==e}))[0];a.state.deletedLayers.push(t),console.log(t.layer._leaflet_id),a.setState({deletedLayer:t.layer,layers:a.state.layers.filter((function(t){return t.layer._leaflet_id!==e}))})}catch(n){alert("could not remove the layer")}},a.addLayer=function(e){var t=a.state.layers.find((function(t){return t.layer._leaflet_id==e.layer._leaflet_id}));e.layer._layers&&!e.layer._svgSize&&void 0==t&&(a.setState({layers:[].concat(Object(i.a)(a.state.layers),[e])}),e.key=e.layer._leaflet_id)},a.clickCreateLayer=function(e){0!=a.state.createLayerMode&&(a.setState({clickedPoints:[].concat(Object(i.a)(a.state.clickedPoints),[[e.latlng.lat,e.latlng.lng]])}),console.log(a.state.clickedPoints))},a.resetHighlight=function(e){e.target.setStyle({weight:1,dashArray:"",fillOpacity:.4})},a.zoomToLayer=function(e){a.setState({zoomTo:e})},a.resetZoom=function(){a.setState({zoomTo:[]})},a.toggleVisibility=function(e){console.log(e),e.visibility?a.setState({hide:e}):a.setState({unhide:e}),e.visibility=!e.visibility},a.resetFile=function(){a.setState({file:null,deletedLayer:null,hide:null,unhide:null})},a.highlightFeature=function(e){console.log(e),e.target.setStyle({weight:2,dashArray:"",fillOpacity:.6})},a.selectLayer=function(e){},a.orderLayers=a.orderLayers.bind(Object(p.a)(a)),a.addLayer=a.addLayer.bind(Object(p.a)(a)),a.handleNewFile=a.handleNewFile.bind(Object(p.a)(a)),a}return Object(y.a)(t,e),Object(c.a)(t,[{key:"orderLayers",value:function(e){this.setState({layers:e});for(var t=0;t<this.state.layers.length;t++);}},{key:"render",value:function(){return this.state.sideDrawerOpen&&r.a.createElement(Fe,{click:this.backdropClickHandler}),r.a.createElement("div",{style:{height:"100%",width:"100%"}},r.a.createElement("div",{style:{height:"100vh - 46px",width:"19.5vw",position:"absolute",marginTop:"46px",marginLeft:"0.1vw"}},r.a.createElement(Ae,{handleNewFile:this.handleNewFile}),r.a.createElement(_e,{handleListItemClick:this.handleListItemClick,selectedIndex:this.state.selectedIndex,layers:this.state.layers,orderLayers:this.orderLayers,onDelete:this.handleDelete,toggleVisibility:this.toggleVisibility,zoomTo:this.state.zoomTo})),r.a.createElement(pe,{drawerClickHandler:this.drawerToggleClickHandler,layers:this.state.layers,handleNewFile:this.handleNewFile,toggleCreateMode:this.toggleCreateMode,createLayerMode:this.state.createLayerMode}),r.a.createElement("main",{style:{marginLeft:"20vw",height:"100vh",width:"80vw",overflow:"auto",zIndex:"-1999"}},r.a.createElement(Be,{addLayer:this.addLayer,highlightFeature:this.highlightFeature,resetHighlight:this.resetHighlight,selectLayer:this.selectLayer,file:this.state.file,resetFile:this.resetFile,layers:this.state.layers,deletedLayers:this.state.deletedLayers,deletedLayer:this.state.deletedLayer,toggleVisibility:this.toggleVisibility,hide:this.state.hide,unhide:this.state.unhide,zoomTo:this.state.zoomTo,resetZoom:this.resetZoom,createLayerMode:this.state.createLayerMode,clickCreateLayer:this.clickCreateLayer,clickedPoints:this.state.clickedPoints})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(Ze,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[272,1,2]]]);
//# sourceMappingURL=main.fd4029f2.chunk.js.map