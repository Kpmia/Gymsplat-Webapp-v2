(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{470:function(e,t,a){"use strict";a.r(t);var n=a(56),l=a(15),r=a(16),c=a(18),o=a(17),i=a(19),s=a(0),u=a.n(s),m=a(104),d=a(50),h=a(52),E=a.n(h),p=a(10),b=a.n(p),f=a(38),y=a(21),v=a.n(y),j=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(c.a)(this,Object(o.a)(t).call(this,e))).state=Object(n.a)({done:void 0,todos:[]},"done",!1),a.cancel=null,a}return Object(i.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=v.a.auth().currentUser;console.log(t),null!=t&&(t.displayName,t.email,t.photoURL,t.emailVerified,t.uid),setTimeout(function(){fetch("https://jsonplaceholder.typicode.com/posts").then(function(e){return e.json()}).then(function(t){return e.setState({done:!0})})},1200)}},{key:"render",value:function(){return this.state.done?u.a.createElement(d.a,{title:"",breadcrumbs:[{name:"Feedback",active:!0}],className:"Activity"},this.state.done?u.a.createElement(b.a,null,u.a.createElement("div",null,u.a.createElement("br",null),u.a.createElement("h1",{style:{fontFamily:"-apple-system, BlinkMacSystemFont",fontSize:"35px",fontWeight:"bold",color:"#0A0D18"}}," Feedback "),u.a.createElement("br",null))):u.a.createElement(E.a,{type:"bars",color:"#6B7CF7"}),u.a.createElement("div",{class:"tableFixHead"},u.a.createElement(m.a,{striped:!0,bordered:!0,hover:!0,style:{borderRadius:"50px"}},u.a.createElement("tr",null,u.a.createElement("th",null," # "),u.a.createElement("th",null," Date "),u.a.createElement("th",null," Time "),u.a.createElement("th",null," Name "),u.a.createElement("th",null," Location"),u.a.createElement("th",null," Comment ")),u.a.createElement("tbody",{style:{fontFamily:"-apple-system, BlinkMacSystemFont"}},this.state.todos&&this.state.todos.map(function(e){var t=e._id.toString().substring(0,8),a=new Date(1e3*parseInt(t,16)).toDateString();return u.a.createElement("tr",null,u.a.createElement("th",null,"  ",a,"  "),u.a.createElement("th",null,"  ",e.email,"  "),u.a.createElement("th",null,e.firstName),u.a.createElement("th",null,e.lastName),u.a.createElement("th",null,e.role),u.a.createElement("th",null,e.password))}))))):u.a.createElement("div",null,"Loading")}}]),t}(f.default);t.default=j}}]);
//# sourceMappingURL=4.ede9e00e.chunk.js.map