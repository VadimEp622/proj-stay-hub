"use strict";(self.webpackChunkmy_react_starter=self.webpackChunkmy_react_starter||[]).push([[969],{2969:function(e,s,n){n.r(s),n.d(s,{StayDetails:function(){return le}});var t=n(1413),a=n(9439),i=n(7689),c=n(3050),r=n(5849),l=n(8911),o=n(8312),h=n(4282),d=n(6579),u=n(9270),f=n(8696),m=n(4456),x=n(2791),j=n(4936),p=n(4165),g=n(5861),v=n(9387);var y=n(8347);function N(e,s){var n=(0,x.useRef)(!0),t=(0,x.useMemo)((function(){return 864e5}),[]),i=(0,d.C)((function(e){return e.stayModule.filterBy})),c=(0,x.useState)(null),r=(0,a.Z)(c,2),l=r[0],h=r[1];(0,x.useEffect)((function(){if(!s&&Object.keys(e).length>0){var a=function(s){var n=Date.parse((0,y.Z)(Date.now())),a=e?n+t*e.availableDates[0].daysFromToday:n;return{from:new Date(null!==s&&void 0!==s&&s.from?s.from:a),to:new Date(null!==s&&void 0!==s&&s.to?s.to:a+t)}}(i);h(a),n.current=!1}}),[s,e]);var u=l?o.N.getDate(null===l||void 0===l?void 0:l.from):"",f=l?o.N.getDate(null===l||void 0===l?void 0:l.to):"";return[n.current,u,f,l,h]}function b(e,s,n,i,c){var l=(0,x.useRef)(!0),h=(0,x.useMemo)((function(){return{serviceFee:r.Y.getRandomIntInclusive(100,500),cleaningFee:r.Y.getRandomIntInclusive(100,500)}}),[]),d=(0,x.useState)({}),u=(0,a.Z)(d,2),f=u[0],m=u[1];return(0,x.useEffect)((function(){e||(l.current=!1,n&&i&&m((function(e){return(0,t.Z)((0,t.Z)({},e),(0,t.Z)({singleNightPrice:Math.floor(s.price+s.price/8*(c.adults+c.children-1)),guestCount:c.adults+c.children,nightsCount:o.N.calculateHowManyNights(Date.parse(n),Date.parse(i))},h))})))}),[e,n,i,c]),(0,x.useEffect)((function(){l.current||n&&i||m((function(e){return(0,t.Z)((0,t.Z)({},e),{},{nightsCount:null})}))}),[n,i]),[l.current,f]}function w(e){var s=(0,x.useState)(!0),n=(0,a.Z)(s,2),t=n[0],c=n[1],r=(0,d.C)((function(e){return e.stayModule.stay})),l=(0,d.C)((function(e){return e.stayModule.isLoadingStay})),o=(0,x.useRef)();!function(e){var s=(0,i.s0)(),n=(0,d.T)(),t=(0,x.useCallback)((0,g.Z)((0,p.Z)().mark((function t(){return(0,p.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,n((0,v.hR)(e)).unwrap();case 3:t.next=9;break;case 5:t.prev=5,t.t0=t.catch(0),console.log(t.t0),s("/");case 9:case"end":return t.stop()}}),t,null,[[0,5]])}))),[s,n,e]);(0,x.useEffect)((function(){t()}),[t])}(e);var h=N(r,l),u=(0,a.Z)(h,5),f=u[0],m=u[1],y=u[2],w=u[3],k=u[4],C=function(){var e,s=(0,d.C)((function(e){return e.stayModule.filterBy})),n=(null===s||void 0===s||null===(e=s.guests)||void 0===e?void 0:e.adults)>0?s.guests:{adults:1,children:0,infants:0,pets:0},t=(0,x.useState)(n),i=(0,a.Z)(t,2);return[i[0],i[1]]}(),S=(0,a.Z)(C,2),Z=S[0],R=S[1],D=b(f,r,m,y,Z),M=(0,a.Z)(D,2),I=M[0],P=M[1];return(0,x.useEffect)((function(){!l&&Object.keys(r).length>0&&(o.current=j.W.randomHostImg())}),[l,r]),(0,x.useEffect)((function(){I||c(!1)}),[I]),[t,r,o.current,m,y,w,k,Z,R,P]}var k=n(513),C=n(3649),S=n(5668),Z=n(5875),R=n(184);function D(e){var s=e.stay,n=e.selectedRange,t=e.onCheckAvailabilityClick,a=e.onReserveClick,i=e.isMobile,c=s.reviews.length,r=o.N.getStayScore(s.reviews),l=s.price.toLocaleString(),h="".concat(c," ").concat(c>1?"reviews":"review");return(0,R.jsx)("section",{className:"stay-details-nav-reserve-sticky-container details-layout",children:(0,R.jsxs)("section",{className:"stay-details-nav-reserve-sticky flex space-between justify-center",children:[!i&&(0,R.jsxs)("nav",{className:"links-container ff-circular-semibold fs14 lh20 flex align-center",children:[(0,R.jsx)("a",{href:"#photos",children:"Photos"}),(0,R.jsx)("a",{href:"#amenities",children:"Amenities"}),(0,R.jsx)("a",{href:"#reviews",children:"Reviews"}),(0,R.jsx)("a",{href:"#location",children:"Location"})]}),(0,R.jsxs)("section",{className:"reserve-container flex align-center ".concat(i?"space-between":"justify-end"),children:[(0,R.jsxs)("section",{className:"stay-info flex column",children:[(0,R.jsxs)("section",{className:"price flex",children:[(0,R.jsxs)("span",{className:"ff-circular-semibold fs16 lh20",children:["$",l]}),(0,R.jsx)("span",{className:"fs14 lh18",children:"night"})]}),(0,R.jsxs)("section",{className:"score ff-circular-semibold lh16 flex align-baseline",children:[(0,R.jsx)("span",{className:"star fs10",children:(0,R.jsx)(Z.Z,{svgName:C.Js})}),(0,R.jsx)("span",{className:"review-rate fs12",children:r}),(0,R.jsx)("span",{className:"review-count underline fs12",children:h})]})]}),n.from&&n.to?(0,R.jsx)(S.K,{text:"Reserve",onClickButton:function(e){return a(e)}}):(0,R.jsx)(S.K,{text:"Check availability",onClickButton:function(e){return t(e)}})]})]})})}function M(e){var s=e.isMobile,n=e.checkIn;return(0,R.jsxs)("section",{className:"things-to-know",children:[!s&&(0,R.jsx)("h2",{className:"title fs22 lh26",children:"Things to know"}),(0,R.jsxs)("section",{className:"rules-container fs16 lh20",children:[(0,R.jsxs)("section",{children:[(0,R.jsx)("h4",{className:"inner-title ff-circular-semibold",children:"House rules"}),(0,R.jsx)("p",{children:"Check-in after 4:00 PM"}),(0,R.jsx)("p",{children:"Checkout before 10:00 AM"}),(0,R.jsx)("p",{children:"Pets allowed"})]}),(0,R.jsxs)("section",{children:[(0,R.jsx)("h4",{className:"inner-title ff-circular-semibold",children:"Safety & property"}),(0,R.jsx)("p",{children:"No smoke alarm"}),(0,R.jsx)("p",{children:"Pool/hot tub without a gate or lock"}),(0,R.jsx)("p",{children:"Carbon monoxide detector not required"})]}),(0,R.jsxs)("section",{children:[(0,R.jsx)("h4",{className:"inner-title ff-circular-semibold",children:"Cancellation policy"}),n?(0,R.jsxs)(R.Fragment,{children:[(0,R.jsxs)("p",{children:["Free cancellation before ",n]}),(0,R.jsx)("p",{children:"Review the Host's full cancellation policy which applies even if you cancel for illness for disruptions caused by COVID-19"})]}):(0,R.jsx)("p",{children:"Add your trip dates to get the cancellation details for this stay. "})]})]})]})}function I(e){var s,n,t=e.stay,a=e.hostImgUrl,i=e.randomDateJoined,c=t.host.fullname,r=t.host.location,l=t.host.isSuperhost,o=null===(s=t.host)||void 0===s?void 0:s.about,h=t.reviews.length,d=null!==(n=t.host)&&void 0!==n&&n.responseTime?t.host.responseTime:"within a few hours",u="".concat(h," ").concat(h>1?"reviews":"review");return(0,R.jsxs)("section",{className:"host-details-container",children:[(0,R.jsxs)("section",{className:"host-details-header flex align-center gap16",children:[(0,R.jsx)("section",{children:(0,R.jsx)("img",{src:a,alt:"host"})}),(0,R.jsxs)("section",{className:"host-intro-info",children:[(0,R.jsxs)("h3",{className:"host-name fs22",children:["Hosted by ",c]}),(0,R.jsxs)("span",{className:"host-join-date",children:["Joined in ",i]})]})]}),(0,R.jsxs)("section",{className:"host-details-main",children:[(0,R.jsxs)("section",{className:"host-main-info-container",children:[(0,R.jsxs)("section",{className:"host-tags fs16 lh20 flex align-center flex-wrap",children:[(0,R.jsxs)("section",{className:"reviews-count flex align-center",children:[(0,R.jsx)(Z.Z,{svgName:C.Xs}),(0,R.jsx)("span",{children:u})]}),(0,R.jsxs)("section",{className:"identity-verified flex align-center",children:[(0,R.jsx)(Z.Z,{svgName:C.OO}),(0,R.jsx)("span",{children:"identity verified"})]}),l&&(0,R.jsxs)("section",{className:"super-host flex align-center",children:[(0,R.jsx)(Z.Z,{svgName:C.er}),(0,R.jsx)("span",{children:"superhost"})]})]}),(0,R.jsxs)("section",{className:"host-main-info fs16",children:[o&&(0,R.jsx)("section",{className:"host-about",children:(0,R.jsx)("p",{className:"lh24",children:o})}),(0,R.jsxs)("section",{className:"during-stay",children:[(0,R.jsx)("h4",{className:"lh20",children:"During your stay"}),(0,R.jsxs)("p",{className:"lh24",children:["We live permanently in ",r," with our family and are on site to answer any questions our guests have. We cook for our guests once a week and hold a weekly pizza night."]})]}),l&&(0,R.jsxs)("section",{className:"is-super-host",children:[(0,R.jsxs)("h4",{className:"lh20",children:[c," is a Superhost"]}),(0,R.jsx)("p",{className:"lh24",children:"Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests."})]})]})]}),(0,R.jsxs)("section",{className:"contact-host flex column",children:[(0,R.jsxs)("ul",{className:"host-response-info fs16 lh20",children:[(0,R.jsxs)("li",{children:["Language: ",(0,R.jsx)("span",{children:"English"})]}),(0,R.jsxs)("li",{children:["Response rate: ",(0,R.jsx)("span",{children:"100%"})]}),(0,R.jsxs)("li",{children:["Response time: ",(0,R.jsx)("span",{children:d})]})]}),(0,R.jsx)("button",{className:"ff-circular-semibold fs16 lh20",children:"Contact Host"}),(0,R.jsxs)("section",{className:"protection-info flex space-between align-center gap16 fs12",children:[(0,R.jsx)("span",{children:"To protect your payment, never transfer money or communicate outside of the Airbnb website or app."}),(0,R.jsx)("img",{src:"https://res.cloudinary.com/dnhn4zsy0/image/upload/v1685913828/airbnb-orotect_ohgcnp.svg",alt:"airbnb protect"})]})]})]})]})}var P=n(2134),F=n(2040),A=n(7265);var O={getApiKeyGoogleMap:function(){return A.R.get("".concat("secret","/key/google_map"))}},Y=n(1306);function E(){var e=(0,x.useState)({}),s=(0,a.Z)(e,2),n=s[0],t=s[1],i=(0,x.useState)(!0),c=(0,a.Z)(i,2),r=c[0],l=c[1];function o(){return(o=(0,g.Z)((0,p.Z)().mark((function e(){var s;return(0,p.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O.getApiKeyGoogleMap();case 3:s=e.sent,t((function(){return s})),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log("error",e.t0),(0,Y.oc)("Failed Loading Map");case 11:return e.prev=11,l(!1),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[0,7,11,14]])})))).apply(this,arguments)}return(0,x.useEffect)((function(){!function(){o.apply(this,arguments)}()}),[]),[r,n.secret]}function L(e){var s=e.loc,n=E(),t=(0,a.Z)(n,2),i=t[0],c=t[1],r=s.lat,l=s.lan,o=(0,x.useState)({lat:l,lng:r}),h=(0,a.Z)(o,2),d=h[0],u=(h[1],(0,x.useState)(12)),f=(0,a.Z)(u,2),m=f[0],j=(f[1],function(){return(0,R.jsxs)("div",{className:"map-popper",children:[(0,R.jsx)(P.V9Z,{}),(0,R.jsx)("div",{className:"popper-wedge"})]})});return i?(0,R.jsx)(k.a,{}):(0,R.jsx)("section",{className:"map",style:{height:"60vh",width:"100%"},children:(0,R.jsx)(F.ZP,{bootstrapURLKeys:{key:c},defaultCenter:d,center:d,zoom:m,defaultZoom:m,children:(0,R.jsx)(j,{lat:l,lng:r})})})}function W(e){var s=e.stay.loc,n=s.lat,t=s.lan,a=s.city,i=s.country;return(0,R.jsxs)("section",{className:"stay-map-container",id:"location",children:[(0,R.jsx)("h3",{className:"title fs22 lh26",children:"Where you'll be"}),(0,R.jsxs)("p",{className:"location fs16 lh20",children:[a,", ",i]}),(0,R.jsx)(L,{loc:{lat:n,lan:t}})]})}function _(e){var s=e.review,n=j.W.randomHostImg(),t=s.by.fullname,a=r.Y.getFormattedDate(s.at,{month:"long",year:"numeric"});return(0,R.jsxs)("section",{className:"stay-review-preview",children:[(0,R.jsxs)("section",{className:"mini-user flex align-center gap10",children:[(0,R.jsx)("section",{children:(0,R.jsx)("img",{src:n,alt:"host"})}),(0,R.jsxs)("section",{className:"flex column gap2",children:[(0,R.jsx)("h4",{className:"fs16 lh20",children:t}),(0,R.jsx)("span",{className:"fs14 lh20",children:a})]})]}),(0,R.jsx)("section",{className:"review-content fs16",children:(0,R.jsx)("p",{children:s.txt})})]})}function U(e){var s=e.reviewsToDisplay;return(0,R.jsx)("section",{className:"stay-review-list",children:s.map((function(e,s){return(0,R.jsx)(_,{review:e},s)}))})}function G(e){var s=e.stay,n=e.averageReviewScore,t=s.reviews.length,a="".concat(t," ").concat(t>1?"reviews":"review");return(0,R.jsxs)("section",{className:"stay-reviews-header fs22 lh26 flex align-center",children:[(0,R.jsx)(Z.Z,{svgName:C.Xs}),(0,R.jsxs)("section",{className:"stay-score-and-review-count",children:[(0,R.jsx)("span",{className:"ff-circular-semibold",children:n}),(0,R.jsx)("span",{children:" \u2022 "}),(0,R.jsx)("span",{className:"ff-circular-semibold",children:a})]})]})}function T(e){var s=e.category,n=e.avgScore;return(0,R.jsxs)("section",{className:"category-score-preview flex align-center",children:[(0,R.jsx)("div",{className:"category-name fs16 lh20 capitalize",children:s}),(0,R.jsxs)("section",{className:"category-score flex align-center justify-end",children:[(0,R.jsx)("section",{className:"score-bar-container",children:(0,R.jsx)("div",{className:"score-bar",style:{width:"".concat(r.Y.calculatePercentage(n),"%")}})}),(0,R.jsx)("span",{className:"score-average ff-circular-semibold fs12",children:n.toFixed(1)})]})]})}function J(e){var s=e.stayCategoryScores;return(0,R.jsx)("section",{className:"category-score-list",children:Object.entries(s).map((function(e){var s=(0,a.Z)(e,2),n=s[0],t=s[1];return(0,R.jsx)(T,{category:n,avgScore:t},n)}))})}function z(e){var s=e.stay,n=e.stayCategoryScores,t=e.averageReviewScore,a=s.reviews.slice(0,6);return(0,R.jsxs)("section",{className:"stay-reviews-container",id:"reviews",children:[(0,R.jsx)(G,{stay:s,averageReviewScore:t}),(0,R.jsx)(J,{stayCategoryScores:n}),(0,R.jsx)(U,{reviewsToDisplay:a},a.id)]})}function H(e){var s=e.stay,n=e.averageReviewScore,t=e.onLikeClicked,a=e.isStayWishlist,i=e.isMobile,c=s.name,r=s.reviews.length,l=s.loc,o=l.city,h=l.country,d="".concat(r," ").concat(r>1?"reviews":"review");return(0,R.jsx)("section",{className:"details-layout",children:(0,R.jsxs)("section",{className:"stay-title-container flex column",children:[(0,R.jsx)("h1",{className:"ff-circular-regular fs26 lh30",children:c}),(0,R.jsxs)("section",{className:"info-container fs14 flex space-between align-center",children:[(0,R.jsxs)("ul",{className:"info ff-circular-semibold lh20 flex justify-start align-center flex-wrap",children:[(0,R.jsxs)("li",{className:"score-container flex",children:[(0,R.jsxs)("section",{className:"score flex align-center gap4",children:[(0,R.jsx)(Z.Z,{svgName:C.Js}),(0,R.jsx)("span",{children:n})]}),(0,R.jsx)("span",{className:"info-review underline",children:d})]}),(0,R.jsx)("li",{children:(0,R.jsxs)("span",{className:"info-loc underline",children:[o,", ",h]})})]}),!i&&(0,R.jsxs)("section",{className:"action-buttons lh18 flex align-baseline gap20",children:[(0,R.jsxs)("section",{className:"share flex align-center gap8",children:[(0,R.jsx)(Z.Z,{svgName:C.Dp}),(0,R.jsx)("span",{className:"ff-circular-semibold underline capitalize",children:"share"}),(0,R.jsx)("div",{className:"overlay"})]}),(0,R.jsxs)("section",{className:"flex align-center gap8",onClick:function(e){return t(e)},children:[(0,R.jsx)(Z.Z,{svgName:a()?C.rn:C.Jd}),(0,R.jsx)("span",{className:"ff-circular-semibold underline capitalize",children:"save"}),(0,R.jsx)("div",{className:"overlay"})]})]})]})]})})}function $(e){var s=e.highlight,n=s.label,t=s.title,a=s.content;return(0,R.jsxs)("section",{className:"highlight-preview flex gap24",children:[(0,R.jsx)("section",{children:(0,R.jsx)(Z.Z,{svgName:n})}),(0,R.jsxs)("section",{className:"highlight-description",children:[(0,R.jsx)("h3",{className:"title fs16 lh20",children:t}),(0,R.jsx)("p",{className:"content fs14 lh20",children:a})]})]})}function q(){var e=[{label:C.Ct,title:"Great location",content:"100% of recent guests gave the location a 5-star rating."},{label:C.Fn,title:"Self check-in",content:"Check yourself in with the lockbox."},{label:C.FP,title:"Free cancellation for 48 hours.",content:""}];return(0,R.jsx)("section",{className:"highlight-list flex column gap24",children:e.map((function(e){return(0,R.jsx)($,{highlight:e},e.title)}))})}function K(e){var s=e.stay,n=e.hostImgUrl;return(0,R.jsxs)("section",{className:"stay-overview-container flex space-between",children:[(0,R.jsxs)("section",{className:"stay-overview",children:[(0,R.jsxs)("h2",{className:"title fs22 lh26",children:["Entire villa hosted by ",s.host.fullname]}),(0,R.jsxs)("ul",{className:"content-list flex fs16 lh20 flex-wrap",children:[(0,R.jsx)("li",{children:"4 guests"}),(0,R.jsx)("li",{children:"2 bedrooms"}),(0,R.jsx)("li",{children:"2 beds"}),(0,R.jsx)("li",{children:"1 bath"})]})]}),(0,R.jsx)("section",{children:(0,R.jsx)("img",{src:n,alt:"host"})})]})}function B(e){var s=e.amenity;return(0,R.jsxs)("section",{className:"amenity-preview fs16 lh20 flex align-center gap16",children:[(0,R.jsx)("section",{children:(0,R.jsx)(Z.Z,{svgName:s})}),(0,R.jsx)("span",{children:s})]})}function X(e){var s=e.amenities;return(0,R.jsxs)("section",{className:"amenity-list-container",id:"amenities",children:[(0,R.jsx)("h3",{className:"title fs22 lh26",children:"What this place offers"}),(0,R.jsx)("section",{className:"amenity-list",children:s.slice(0,10).map((function(e){return(0,R.jsx)(B,{amenity:e},e)}))})]})}var V=n(8101);function Q(e){var s=e.stay,n=e.selectedRange,t=e.handleRangeSelect,a=(0,m.Z)(1250)?1:2;return(0,R.jsxs)("section",{className:"date-container",children:[(0,R.jsx)("h3",{children:"Select check-in date"}),(0,R.jsx)("p",{children:"Add your travel dates for exact pricing"}),(0,R.jsx)(V.M,{selectedRange:n,handleRangeSelect:t,availableDates:s.availableDates,numberOfMonths:a})]})}function ee(e){var s=e.stay,n=e.orderDetails,t=o.N.getStayScore(s.reviews);return(0,R.jsxs)("section",{className:"cost-and-review-score flex space-between align-center flex-wrap col-gap8",children:[(0,R.jsxs)("article",{className:"cost flex align-end",children:[(0,R.jsxs)("span",{className:"fs22 lh26 ff-circular-semibold",children:["$",r.Y.addCommas(n.singleNightPrice)]}),(0,R.jsx)("span",{className:"fs16 lh20",children:"night"})]}),(0,R.jsxs)("article",{className:"review-score flex align-center",children:[(0,R.jsx)(Z.Z,{svgName:C.Js}),(0,R.jsx)("span",{className:"score fs14 lh18",children:t}),(0,R.jsxs)("span",{className:"amount fs14 lh18",children:[s.reviews.length," reviews"]})]})]})}function se(e){var s=e.checkIn,n=e.checkOut,t=e.guests;e.setGuests;var a=j.W.buildGuestsString(t);return(0,R.jsxs)("section",{className:"dates-and-guests",title:"Change here not implemented yet",children:[(0,R.jsxs)("section",{className:"dates-container",onClick:function(e){return function(e){e.preventDefault(),e.stopPropagation()}(e)},children:[(0,R.jsx)("div",{className:"dates-container-border"}),(0,R.jsxs)("section",{className:"dates flex",children:[(0,R.jsxs)("article",{className:"check-in full",children:[(0,R.jsx)("span",{className:"fs10 lh12 ff-circular-bold uppercase",children:"check-in"}),(0,R.jsx)("span",{className:"fs14 lh18".concat(s?"":" empty"),children:s||"Add date"})]}),(0,R.jsxs)("article",{className:"check-out full",children:[(0,R.jsx)("span",{className:"fs10 lh12 ff-circular-bold uppercase",children:"checkout"}),(0,R.jsx)("span",{className:"fs14 lh18".concat(n?"":" empty"),children:n||"Add date"})]})]})]}),(0,R.jsxs)("section",{className:"guests-container",onClick:function(e){return function(e){e.preventDefault(),e.stopPropagation()}(e)},children:[(0,R.jsx)("div",{className:"guests-container-border"}),(0,R.jsx)("section",{className:"guests",children:(0,R.jsxs)("article",{className:"guest-block full",children:[(0,R.jsx)("span",{className:"fs10 lh12 ff-circular-bold uppercase",children:"guests"}),(0,R.jsx)("span",{className:"fs14 lh18",children:a})]})})]})]})}function ne(e){var s=e.orderDetails,n=s.singleNightPrice,t=s.nightsCount,a=s.serviceFee,i=s.cleaningFee,c=n*t+a+i;return(0,R.jsxs)("section",{className:"pricing",children:[(0,R.jsxs)("section",{className:"individual-fees",children:[(0,R.jsxs)("article",{className:"flex space-between",children:[(0,R.jsxs)("span",{className:"fs16 lh20 underline",children:["$",n.toLocaleString()," x ",t," nights"]}),(0,R.jsxs)("span",{className:"fs16 lh20",children:["$",n*t]})]}),(0,R.jsxs)("article",{className:"flex space-between",children:[(0,R.jsx)("span",{className:"fs16 lh20 underline",children:"Cleaning fee"}),(0,R.jsxs)("span",{className:"fs16 lh20",children:["$",r.Y.addCommas(i)]})]}),(0,R.jsxs)("article",{className:"flex space-between",children:[(0,R.jsx)("span",{className:"fs16 lh20 underline",children:"StayHub service fee"}),(0,R.jsxs)("span",{className:"fs16 lh20",children:["$",a.toLocaleString()]})]})]}),(0,R.jsx)("section",{className:"total",children:(0,R.jsxs)("article",{className:"flex space-between ff-circular-semibold",children:[(0,R.jsx)("span",{className:"fs16 lh20",children:"Total"}),(0,R.jsxs)("span",{className:"fs16 lh20",children:["$",r.Y.addCommas(c)]})]})})]})}function te(e){var s=e.stay;return(0,R.jsxs)("section",{className:"special-info flex",children:[(0,R.jsxs)("article",{className:"info-container",children:[(0,R.jsx)("span",{className:"bold fs16 lh20",children:"Lower price."}),(0,R.jsxs)("span",{className:"fs16 lh20",children:["Your dates are $",(.4*s.price).toFixed(0)," less per night compared to the average nightly rate of the last 60 days."]})]}),(0,R.jsx)(Z.Z,{svgName:C.tp})]})}function ae(e){var s=e.stay,n=e.checkIn,t=e.checkOut,a=e.guests,i=e.setGuests,c=e.orderDetails,r=e.onCheckAvailabilityClick,l=e.onReserveClick;return(0,R.jsxs)("section",{className:"order-sidebar",children:[(0,R.jsxs)("section",{className:"order-block",children:[(0,R.jsxs)("section",{className:"order",children:[(0,R.jsx)(ee,{stay:s,orderDetails:c}),(0,R.jsx)(se,{checkIn:n,checkOut:t,guests:a,setGuests:i}),n&&t?(0,R.jsx)(S.K,{text:"Reserve",onClickButton:function(e){return l(e)}}):(0,R.jsx)(S.K,{text:"Check availability",onClickButton:function(e){return r(e)}})]}),n&&t&&(0,R.jsxs)(R.Fragment,{children:[(0,R.jsx)("article",{className:"assurance flex column align-center",children:(0,R.jsx)("span",{className:"fs14 lh18",children:"You won't be charged yet"})}),(0,R.jsx)(ne,{orderDetails:c})]})]}),(0,R.jsx)(te,{stay:s})]})}function ie(e){var s=e.stay,n=e.hostImgUrl,t=e.checkIn,a=e.checkOut,i=e.selectedRange,c=e.handleRangeSelect,r=e.guests,l=e.setGuests,o=e.orderDetails,h=e.onCheckAvailabilityClick,d=e.onReserveClick,u=e.isMobile;return(0,R.jsxs)("section",{className:"summary-container",children:[(0,R.jsxs)("section",{className:"summary",children:[(0,R.jsx)(K,{stay:s,hostImgUrl:n}),(0,R.jsx)(q,{}),(0,R.jsx)(X,{amenities:s.amenities}),(0,R.jsx)(Q,{stay:s,selectedRange:i,handleRangeSelect:c})]}),!u&&(0,R.jsx)("section",{className:"order-sidebar-container",children:(0,R.jsx)(ae,{stay:s,checkIn:t,checkOut:a,guests:r,setGuests:l,orderDetails:o,onCheckAvailabilityClick:h,onReserveClick:d})})]})}function ce(e){var s=e.photos,n=e.isMobile,t=n?s.slice(0,1):s.slice(0,5);return(0,R.jsx)("section",{className:"".concat(n?"":"details-layout"),children:(0,R.jsx)("section",{className:"stay-photos-container",children:t.map((function(e,s){return(0,R.jsxs)("section",{className:"photo-preview",children:[(0,R.jsx)("img",{src:e,alt:s}),(0,R.jsx)("div",{className:"overlay"})]},s)}))})})}function re(e){var s=e.onLikeClicked,n=e.isStayWishlist,t=e.onReturnClicked;return(0,R.jsxs)("section",{className:"stay-details-mobile-return-header flex space-between align-center",children:[(0,R.jsx)("section",{className:"return",children:(0,R.jsx)("button",{onClick:function(e){return t(e)},children:(0,R.jsxs)("section",{className:"flex align-center gap8",children:[(0,R.jsx)(Z.Z,{svgName:C.pe}),(0,R.jsx)("h2",{className:"capitalize fs14 lh18",children:"homes"})]})})}),(0,R.jsxs)("section",{className:"like-share flex gap20",children:[(0,R.jsx)("button",{className:"share",children:(0,R.jsx)(Z.Z,{svgName:C.Dp})}),(0,R.jsx)("button",{onClick:function(e){return s(e)},children:(0,R.jsx)(Z.Z,{svgName:n()?C.rn:C.Jd})})]})]})}function le(){var e,s,n,j=(0,d.T)(),p=(0,i.s0)(),g=(0,i.UO)().stayId,v=(0,d.C)((function(e){return e.userModule.user})),y=(0,m.Z)(),N=w(g),b=(0,a.Z)(N,10),C=b[0],S=b[1],Z=b[2],P=b[3],F=b[4],A=b[5],O=b[6],Y=b[7],E=b[8],L=b[9];function _(){return!!v&&v.wishlist.some((function(e){return e._id===g}))}function U(e){e.preventDefault(),e.stopPropagation(),console.log("hi from check availability")}function G(e){e.preventDefault(),e.stopPropagation(),j(v?(0,f.nG)({loggedInUser:v,stay:S}):(0,u.Wk)(h.j1))}function T(e){if(e.preventDefault(),e.stopPropagation(),v){var s=function(e){var s=e.guestCount,n=e.singleNightPrice,t=e.nightsCount,a=e.serviceFee,i=e.cleaningFee;return{buyer:{_id:v._id,fullname:v.fullname,img:v.imgUrl,joined:v.joined?v.joined:r.Y.getRandomMonthAndYear()},seller:{_id:S.host._id,fullname:S.host.fullname,img:Z,joined:r.Y.getRandomMonthAndYear()},orderDetails:{checkIn:P,checkOut:F,nightsCount:t,guestCount:s,singleNightPrice:n},orderPrice:{price:n*t,serviceFee:a,cleaningFee:i,total:n*t+a+i},stayDetails:{id:S._id,image:S.imgUrls[0],loc:S.loc,summary:S.summary,type:S.type,rate:S.reviews.rate,reviewsCount:S.reviews.length},explore:l.X.getOrderExploreList(),status:"Pending"}}(L);j((0,f.J7)(s)),p("/stay/book/".concat(S._id))}else j((0,u.Wk)(h.j1))}if(n=C||y,(0,x.useEffect)((function(){if(!n){var e=document.querySelector(".stay-photos-container"),s=document.querySelector(".stay-details-nav-reserve-sticky-container"),t=document.querySelector(".order-sidebar .btn-main-container"),a=document.querySelector(".reserve-container"),i=new IntersectionObserver((function(e){e.forEach((function(e){s.style.display=e.isIntersecting?"none":"grid"}))}),{rootMargin:"-5px 0px 0px"}),c=new IntersectionObserver((function(e){e.forEach((function(e){a.style.display=e.isIntersecting?"none":"flex"}))}),{rootMargin:"-80px 0px 0px 0px"});return i.observe(e),c.observe(t),function(){s.style.removeProperty("display"),a.style.removeProperty("display"),i.disconnect(),c.disconnect()}}}),[n]),C)return(0,R.jsx)(k.a,{});var J=o.N.getStayCategoryScores(S.reviews),$=r.Y.getRandomMonthAndYear(),q=o.N.getStayScore(S.reviews);return(0,R.jsxs)("section",{className:"stay-details full details-layout".concat(y?" mobile":""),id:"photos",children:[(0,R.jsxs)(c.ql,{children:[(null===S||void 0===S?void 0:S.name)&&(0,R.jsx)("title",{children:S.name}),(null===S||void 0===S||null===(e=S.host)||void 0===e?void 0:e.fullname)&&(0,R.jsx)("meta",{name:"description",content:"Entire villa hosted by ".concat(S.host.fullname)})]}),y&&(0,R.jsx)(re,{onLikeClicked:G,isStayWishlist:_,onReturnClicked:function(e){e.preventDefault(),e.stopPropagation(),p("/")}}),(0,R.jsx)(D,{stay:S,selectedRange:A,onReserveClick:T,onCheckAvailabilityClick:U,isMobile:y}),(0,R.jsxs)("section",{className:"stay-photos-title-container full",children:[(0,R.jsx)(ce,{photos:S.imgUrls,isMobile:y}),(0,R.jsx)(H,{stay:S,averageReviewScore:q,onLikeClicked:G,isStayWishlist:_,isMobile:y})]}),(0,R.jsx)(ie,{stay:S,hostImgUrl:Z,checkIn:P,checkOut:F,selectedRange:A,handleRangeSelect:function(e){var s={from:"",to:""};e?(s.from=e.from,s.to=e.to,e.from||(s.from=""),e.to||(s.to=""),e.from&&Date.parse(e.from)===Date.parse(e.to)&&(Date.parse(A.from)===Date.parse(e.from)&&""===A.to&&(s.from=""),s.to="")):A.from&&A.to&&(s.from=A.from),O((function(e){return(0,t.Z)((0,t.Z)({},e),s)}))},guests:Y,setGuests:E,orderDetails:L,onCheckAvailabilityClick:U,onReserveClick:T,isMobile:y}),(null===(s=S.reviews)||void 0===s?void 0:s.length)>0&&(0,R.jsx)(z,{stay:S,stayCategoryScores:J,averageReviewScore:q}),(0,R.jsx)(W,{stay:S}),(0,R.jsx)(I,{stay:S,hostImgUrl:Z,randomDateJoined:$}),(0,R.jsx)(M,{isMobile:y,checkIn:P})]})}}}]);
//# sourceMappingURL=969.7ba1c8f8.chunk.js.map