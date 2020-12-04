(this["webpackJsonpaws-gp3"]=this["webpackJsonpaws-gp3"]||[]).push([[0],{25:function(s,i,e){},44:function(s,i,e){"use strict";e.r(i);var t=e(1),n=e(0),c=e.n(n),p=e(8),d=e.n(p),r=(e(25),e(9)),a=e(46),o=e(47),j=e(48),b=e(50),m=e(49),x=e(16),h=e.n(x),l=(e(42),e(10)),M=function(s){var i=s.size,e=s.iops,t=s.mibps,n=Math.max(Math.ceil(i/16e3),Math.ceil(t/250),e/16e3,1),c=i;c<t/250*334&&(c=t/250*334),c<5334*e/16e3&&(c=5334*e/16e3);var p=Math.floor(16e3*c/5334);return{disks:n,size:c,iops:p,mibps:Math.floor(p/4)}},O=function(s){var i=s.size,e=s.iops,t=s.mibps,n=Math.max(Math.ceil(i/16e3),Math.ceil(t/250),Math.ceil(e/3e3),1),c=i;c<t/250*334&&(c=t/250*334),c<e/3e3&&(c=e/3e3);var p=Math.floor(Math.min(16e3*n,Math.max(16e3*c/5334)));return{disks:n,size:c,iops:p,iopsMax:Math.max(p,3e3*n),mibps:Math.floor(p/4)}},u=function(s){return{min:O(s),max:M(s)}},k=Object(l.b)({name:"gp3",initialState:{sizeMax:16e3,size:0,disks:1,iops:0,iopsMax:0,iopsMin:0,mibps:0,mibpsMin:0,mibpsMax:0,gp2:{}},reducers:{setDiskSize:function(s,i){s.size=i.payload,s.size<=0&&(s.size=1),s.size>16e3*s.disks&&(s.disks=1+Math.floor(s.size/16e3)),s.size<s.disks&&(s.disks=s.size),s.iopsMin=Math.min(s.disks*s.size*500,3e3*s.disks),s.iopsMax=Math.min(s.disks*s.size*500,16e3*s.disks),s.iops<s.iopsMin&&(s.iops=s.iopsMin),s.iops>s.iopsMax&&(s.iops=s.iopsMax),s.mibpsMin=Math.min(s.iops/4,125*s.disks),s.mibpsMax=Math.min(s.iops/4,1e3*s.disks),s.mibps<s.mibpsMin&&(s.mibps=s.mibpsMin),s.mibps>s.mibpsMax&&(s.mibps=s.mibpsMax),s.gp2=u(s)},setDiskCount:function(s,i){s.disks=i.payload,s.disks<=0&&(s.disks=1),s.size>16e3*s.disks&&(s.size=16e3*s.disks),s.size<s.disks&&(s.size=s.disks),s.iopsMin=Math.min(s.disks*s.size*500,3e3*s.disks),s.iopsMax=Math.min(s.disks*s.size*500,16e3*s.disks),s.iops<s.iopsMin&&(s.iops=s.iopsMin),s.iops>s.iopsMax&&(s.iops=s.iopsMax),s.mibpsMin=Math.min(s.iops/4,125*s.disks),s.mibpsMax=Math.min(s.iops/4,1e3*s.disks),s.mibps<s.mibpsMin&&(s.mibps=s.mibpsMin),s.mibps>s.mibpsMax&&(s.mibps=s.mibpsMax),s.gp2=u(s)},setIOPS:function(s,i){s.iops=i.payload,s.mibpsMin=Math.min(s.iops/4,125*s.disks),s.mibpsMax=Math.min(s.iops/4,1e3*s.disks),s.mibps<s.mibpsMin&&(s.mibps=s.mibpsMin),s.mibps>s.mibpsMax&&(s.mibps=s.mibpsMax),s.gp2=u(s)},setMIBPS:function(s,i){s.mibps=i.payload,s.gp2=u(s)}}}),g=k.actions,z=g.setDiskSize,f=g.setDiskCount,B=g.setIOPS,S=g.setMIBPS,G=k.reducer;function v(s){return Math.ceil(100*s)/100}function I(s){return Math.round(100*s)/100}var T=Object(r.b)((function(s){return s.gp3}))((function(s){return Object(t.jsx)(a.a,{children:Object(t.jsx)(o.a,{className:"justify-content-md-center",xs:12,md:8,children:Object(t.jsx)(j.a,{style:{width:"100%"},children:Object(t.jsxs)(a.a,{children:[Object(t.jsx)("h1",{children:"AWS/GP3 calculator"}),Object(t.jsxs)(b.a,{children:[Object(t.jsxs)(b.a.Group,{controlId:"formDiskSize",children:[Object(t.jsx)(b.a.Label,{children:"Storage capacity in GB"}),Object(t.jsx)(b.a.Control,{size:"lg",type:"number",placeholder:"100",onChange:function(i){return s.dispatch(z(parseInt(i.target.value)))}}),Object(t.jsxs)(b.a.Text,{className:"text-muted",children:[I(s.size/1e3)," TB or ",s.size," GB, ",.08*s.size,"$ / month"]})]}),Object(t.jsxs)(b.a.Group,{controlId:"formDiskNum",children:[Object(t.jsx)(b.a.Label,{children:"Number of disks"}),Object(t.jsx)(b.a.Control,{size:"lg",type:"number",placeholder:"1",onChange:function(i){return s.dispatch(f(parseInt(i.target.value)))}}),Object(t.jsxs)(b.a.Text,{className:"text-muted",children:[I(s.size/1e3/s.disks)," TB or ",I(s.size/s.disks)," GB per disk, ",v(s.size/s.disks*.08),"$ / disk / month"]})]}),Object(t.jsxs)("strong",{children:["Baseline: ",s.iopsMin," IOPs, ",s.mibpsMin," MiB/s"]}),Object(t.jsxs)(b.a.Group,{children:[Object(t.jsxs)(b.a.Label,{children:["IOPs (",s.iopsMin,"-",s.iopsMax,", ",4e3*s.disks," for max throughput)"]}),Object(t.jsx)("br",{}),Object(t.jsx)(h.a,{value:s.iops,step:100,change:function(i){return s.dispatch(B(i.target.value))},slideStop:function(){},max:s.iopsMax,min:s.iopsMin}),Object(t.jsxs)(b.a.Text,{className:"text-muted",children:[s.iops," IOPs, ",I(s.iops/s.disks)," per disk, ",v(.005*(s.iops-s.iopsMin)),"$ / month"]})]}),Object(t.jsxs)(b.a.Group,{children:[Object(t.jsxs)(b.a.Label,{children:["MiB/s (",s.mibpsMin,"-",s.mibpsMax,")"]}),Object(t.jsx)("br",{}),Object(t.jsx)(h.a,{value:s.mibps,step:1,change:function(i){return s.dispatch(S(i.target.value))},slideStop:function(){},max:s.mibpsMax,min:s.mibpsMin}),Object(t.jsxs)(b.a.Text,{className:"text-muted",children:[s.mibps," MiB/s, ",I(s.mibps/s.disks)," per disk, ",v(.04*(s.mibps-s.mibpsMin)),"$ / month"]})]})]}),!!s.size&&!!s.disks&&Object(t.jsxs)(t.Fragment,{children:[Object(t.jsxs)("h1",{children:["Total cost:  ",v(.08*s.size+.005*(s.iops-s.iopsMin)+.04*(s.mibps-s.mibpsMin)),"$/month"]}),Object(t.jsx)(m.a,{striped:!0,hover:!0,children:Object(t.jsxs)("tbody",{children:[Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{children:"Disks"}),Object(t.jsxs)("td",{children:[s.disks," @ ",I(s.size/s.disks/1e3)," TB or ",I(s.size/s.disks)," GB"]})]}),Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{children:"Size"}),Object(t.jsxs)("td",{children:[I(s.size/1e3)," TB or ",s.size," GB"]})]}),Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{children:"IOPS"}),Object(t.jsx)("td",{children:s.iops})]}),Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{children:"MB/s"}),Object(t.jsx)("td",{children:s.mibps})]})]})})]}),!!s.gp2&&!!s.gp2.min&&Object(t.jsxs)(t.Fragment,{children:[Object(t.jsx)("hr",{}),Object(t.jsxs)("h1",{children:["GP2: ",v(.1*s.gp2.min.size),"$/month - ",v(.1*s.gp2.max.size),"$/month"]}),Object(t.jsx)(m.a,{striped:!0,hover:!0,children:Object(t.jsxs)("tbody",{children:[Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{children:"Disks"}),Object(t.jsxs)("td",{children:[s.gp2.min.disks," @ ",I(s.gp2.min.size/s.gp2.min.disks/1e3)," TB or ",I(s.gp2.min.size/s.gp2.min.disks)," GB"]}),Object(t.jsxs)("td",{children:[s.gp2.max.disks," @ ",I(s.gp2.max.size/s.gp2.max.disks/1e3)," TB or ",I(s.gp2.max.size/s.gp2.max.disks)," GB"]})]}),Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{children:"Size"}),Object(t.jsxs)("td",{children:[I(s.gp2.min.size/1e3)," TB or ",s.gp2.min.size," GB"]}),Object(t.jsxs)("td",{children:[I(s.gp2.max.size/1e3)," TB or ",s.gp2.max.size," GB"]})]}),Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{children:"IOPS"}),Object(t.jsxs)("td",{children:[s.gp2.min.iops," (burst: ",s.gp2.min.iopsMax,")"]}),Object(t.jsx)("td",{children:s.gp2.max.iops})]}),Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{children:"MB/s"}),Object(t.jsx)("td",{children:s.gp2.min.mibps}),Object(t.jsx)("td",{children:s.gp2.max.mibps})]}),Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{children:"Cost"}),Object(t.jsx)("td",{children:Object(t.jsxs)("strong",{children:[v(.1*s.gp2.min.size),"$/month"]})}),Object(t.jsx)("td",{children:Object(t.jsxs)("strong",{children:[v(.1*s.gp2.max.size),"$/month"]})})]})]})})]})]})})})})})),y=Object(l.a)({reducer:{gp3:G}});window&&(window.store=y),d.a.render(Object(t.jsx)(c.a.StrictMode,{children:Object(t.jsx)(r.a,{store:y,children:Object(t.jsx)(T,{})})}),document.getElementById("root"))}},[[44,1,2]]]);
//# sourceMappingURL=main.86728f63.chunk.js.map