(function(){function k(r,o){if(!(r instanceof o))throw new TypeError("Cannot call a class as a function")}function K(r,o){for(var t=0;t<o.length;t++){var e=o[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(r,e.key,e)}}function w(r,o,t){return o&&K(r.prototype,o),t&&K(r,t),r}var de="FakeNitro",pe="rosie.fakenitro",me="http://rosies-macbook-air.local:5496/bundle.js",he="1.0.9",ye="ic_nitro_rep_24px",ge="Adds an authentic pseudo-nitro experience to the client, ranging from free emojis to image banners.",ve=[{name:"Rosie<3",id:"588262373488590878"}],T={name:de,id:pe,bundle:me,version:he,icon:ye,description:ge,authors:ve};const{utilities:Q,metro:E,components:be,assets:{getIDByName:P},storage:{useSettingsStore:W,get:_e,set:Ee,on:pt},patcher:{createPatcher:ke}}=window.unbound;E.stores.Users;const L=window.ReactNative,s=window.React,[X,we,F]=E.findByProps({params:["canUseEmojisEverywhere"],lazy:!0},{params:["uploadLocalFiles"],lazy:!0},{params:["sendMessage","receiveMessage"],lazy:!0},{bulk:!0}),{ScrollView:Pe,TouchableOpacity:Z,View:b,LayoutAnimation:{create:G,configureNext:A},FlatList:mt}=L,O=function(r){let o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return _e(T.name,r,o)},Se=function(r,o){return Ee(T.name,r,o)},Re=function(r,o,t){return Object.values(o).map(function(e){let{patches:n}=e;Object.values(n).forEach(function(c){let{key:i}=c;return r.set(`${i}.enabled`,t)})})};function l(r,o,t){return o in r?Object.defineProperty(r,o,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[o]=t,r}function H(r,o){return H=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e},H(r,o)}function R(r,o){if(typeof o!="function"&&o!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(o&&o.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),o&&H(r,o)}function N(r){return N=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},N(r)}function Ie(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Oe(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function je(r){return r&&typeof Symbol<"u"&&r.constructor===Symbol?"symbol":typeof r}function $e(r,o){return o&&(je(o)==="object"||typeof o=="function")?o:Oe(r)}function I(r){var o=Ie();return function(){var e=N(r),n;if(o){var c=N(this).constructor;n=Reflect.construct(e,arguments,c)}else n=e.apply(this,arguments);return $e(this,n)}}let _=function(){function r(){k(this,r)}return w(r,null,[{key:"get",value:function(o,t){var e;return(e=O(`${this.key}.${o}`))!=null?e:t}},{key:"set",value:function(o,t){return Se(`${this.key}.${o}`,t)}},{key:"enabled",get:function(){return this.get("enabled")}},{key:"patch",value:function(o){}},{key:"render",value:function(o){}}]),r}();l(_,"key",void 0),l(_,"title",void 0),l(_,"subtitle",void 0),l(_,"icon",void 0);const{findStore:xe}=E,Te=xe("SelectedGuild");let B=function(r){R(t,r);var o=I(t);function t(){return k(this,t),o.apply(this,arguments)}return w(t,null,[{key:"parseEmojis",value:function(e){!e||!e.validNonShortcutEmojis||!this.enabled||(e.validNonShortcutEmojis.forEach(function(n,c){var i,a;(n.guildId!==Te.getGuildId()||n.animated)&&(e.content=e.content.replace(`<${n.animated?"a":""}:${(i=n.originalName)!=null?i:n.name}:${n.id}>`,n.url.replace("webp","png").replace(/size=\d+/,`size=48&quality=lossless&name=${(a=n.originalName)!=null?a:n.name}`)),delete e.validNonShortcutEmojis[c])}),e.validNonShortcutEmojis=e.validNonShortcutEmojis.filter(function(n){return n}))}},{key:"patch",value:function(e){var n=this;e.before(F,"sendMessage",function(c,i){let[,a]=i;return n.parseEmojis(a)}),e.before(we,"uploadLocalFiles",function(c,i){let[{parsedMessage:a}]=i;return n.parseEmojis(a)})}}]),t}(_);l(B,"key","freeEmojis"),l(B,"title","Free Emojis"),l(B,"subtitle","Allows you to send any custom or animated emoji as an image/gif link."),l(B,"icon","ic_emoji_24px");const{findStore:Be,findByName:Ue}=E,{getCustomEmojiById:Ce}=Be("Emoji"),ee=Ue("RowManager");let j=function(r){R(t,r);var o=I(t);function t(){return k(this,t),o.apply(this,arguments)}return w(t,null,[{key:"patch",value:function(e){var n=this;e.before(ee.prototype,"generate",function(c,i){var a,u,d;let[p]=i;if(p.rowType!==1||!((a=p.message)!=null&&a.content)||!n.enabled)return;let m=p.message.content;const h=n.emojiLinkRegex;if(typeof m!="string"||!m.match(h))return;let f=m.slice((u=m.match(h))==null?void 0:u.index).trim().split(`
`);if(!f.every(function(g){return g.match(h)}))return;m=m.slice(0,(d=m.match(h))==null?void 0:d.index),m=m.replace(/  /g,function(){return` ${f.shift()} `}).trim(),f.length&&(m+=` ${f.join(" ")}`);const y=p.message.embeds.filter(function(g){return!(g.type==="image"&&g.url.match(h))});p.message.content=m,p.message.embeds=y,p.__fakenitro=!0}),e.after(ee.prototype,"generate",function(c,i,a){var u;let[d]=i;if(d.rowType!==1||!d.__fakenitro||!Array.isArray(a.message.content)||!n.enabled)return;const{content:p}=a.message;if(!Array.isArray(p))return;const m=n.emojiLinkRegex,h=p.every(function(f){return!!(f.type==="link"&&f.target.match(m)||f.type==="text"&&f.content===" ")});for(let f=0;f<p.length;f++){const y=p[f];if(y.type!=="link")continue;const g=y.target.match(m);if(!g)continue;const v=`${g[0]}?size=4096`,fe=Ce(g[1]);p[f]={type:"customEmoji",id:g[1],alt:(u=fe?.name)!=null?u:"<invalid>",src:v,frozenSrc:v.replace("gif","webp"),jumboable:h?!0:void 0}}})}}]),t}(_);l(j,"key","realEmojis"),l(j,"title","Real Emojis"),l(j,"subtitle","Formats fake nitro emoji links into real emojis by parsing the links when rendering the chat."),l(j,"icon","ArrowsUpDownIcon"),l(j,"emojiLinkRegex",/https:\/\/cdn.discordapp.com\/emojis\/(\d+)\.\w+/);const{findStore:te}=E,Ae=te("Stickers"),Ne=te("Channel");let U=function(r){R(t,r);var o=I(t);function t(){return k(this,t),o.apply(this,arguments)}return w(t,null,[{key:"getStickerUrl",value:function(e){return`https://media.discordapp.net/stickers/${e}.png?size=160&quality=lossless`}},{key:"canUseSticker",value:function(e,n){return!e.guild_id||e.guild_id===Ne.getChannel(n).guild_id}},{key:"patch",value:function(e){var n=this;e.instead(F,"sendStickers",function(c,i,a){var u;if(!n.enabled)return a.apply(c,i);const[d,p,m,h]=i,f=p.map(function(v){return Ae.getStickerById(v)}),y=(u=f?.filter)==null?void 0:u.call(f,function(v){return!n.canUseSticker(v,d)});if(y.length<1)return a.apply(c,i);const g=y.map(function(v){return n.getStickerUrl(v.id)}).join(`
`);F.sendMessage(d,{content:g},null,h)})}}]),t}(_);l(U,"key","freeStickers"),l(U,"title","Free Stickers"),l(U,"subtitle","Turns invalid stickers into images when sent. Note that animated stickers won't animate :c"),l(U,"icon","StickerIcon");const{findByName:Me,findStore:ze,common:{Clipboard:De},components:{Redesign:Le}}=E,{findInReactTree:Fe}=Q,Ge=ze("UserProfile"),He=Me("EditProfileTheme",{interop:!1}),Je=function(r){let{getText:o}=r,t;const[e,n]=s.useState(!1);return s.createElement(Le.IconButton,{icon:P("ic_message_copy"),variant:"primary",size:"md",loading:e,onPress:function(){clearTimeout(t),n(function(c){return!c}),t=setTimeout(function(){return n(function(c){return!c})},400),De.setString(o())}})};let S=function(r){R(t,r);var o=I(t);function t(){return k(this,t),o.apply(this,arguments)}return w(t,null,[{key:"is3y3",value:function(e){return Boolean([...e].some(function(n){return 917504<n.codePointAt(0)&&n.codePointAt(0)<917631}))}},{key:"encode",value:function(e){return[...e].map(function(n){return 0<n.codePointAt(0)&&n.codePointAt(0)<127?`${String.fromCodePoint(n.codePointAt(0)+917504)}`:n}).join("")}},{key:"decode",value:function(e){return[...e].map(function(n){return 917504<n.codePointAt(0)&&n.codePointAt(0)<917631?String.fromCodePoint(n.codePointAt(0)-917504):n}).join("")}},{key:"patch",value:function(e){var n=this;e.after(Ge,"getUserProfile",function(c,i,a){if(!a||!n.is3y3(a.bio)||!n.enabled)return;const u=n.decode(a.bio),d=u.match(n.colorExpression);!d||(d.shift(),a.themeColors=d.map(function(p){return parseInt("0x"+p.slice(1))}),a.premiumType=2,a.bio=u.replace(n.replacingExpression,""))}),e.after(He,"default",function(c,i,a){var u;if(!n.enabled)return;const d=Fe(a,function(h){return h?.children.find(function(f){var y;return((y=f?.type)==null?void 0:y.name)==="ColorSwatch"})}),p=function(h){var f;return(f=d?.children)==null?void 0:f.find(function(y){var g,v;return((g=y?.type)==null?void 0:g.name)==="ColorSwatch"&&((v=y?.props)==null?void 0:v.description)===h})},m=function(h){return h.props.color.toString(16).padStart(6,"0")};(u=d.children)==null||u.unshift(s.createElement(b,{style:{marginTop:5,marginRight:8}},s.createElement(Je,{getText:function(){const h=p("Primary"),f=p("Accent");return n.encode(`[#${m(h)},#${m(f)}]`)}})))})}}]),t}(_);l(S,"key","profileThemes"),l(S,"title","Profile Themes"),l(S,"subtitle","Uses 3y3 text to colorize profiles. Copy your own from the 'Profile Theme' section."),l(S,"icon","ic_custom_color"),l(S,"colorExpression",/\[(\#[0-9a-fA-F]{6})\s*,\s*(\#[0-9a-fA-F]{6})\]/),l(S,"replacingExpression",new RegExp(S.colorExpression,"g"));var Ve=Object.defineProperty,M=Object.getOwnPropertySymbols,ne=Object.prototype.hasOwnProperty,re=Object.prototype.propertyIsEnumerable,oe=(r,o,t)=>o in r?Ve(r,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[o]=t,qe=(r,o)=>{for(var t in o||(o={}))ne.call(o,t)&&oe(r,t,o[t]);if(M)for(var t of M(o))re.call(o,t)&&oe(r,t,o[t]);return r},Ye=(r,o)=>{var t={};for(var e in r)ne.call(r,e)&&o.indexOf(e)<0&&(t[e]=r[e]);if(r!=null&&M)for(var e of M(r))o.indexOf(e)<0&&re.call(r,e)&&(t[e]=r[e]);return t},ie;const{common:{StyleSheet:Ke,Theme:z},components:{Forms:J}}=E,ae=function(r){return Ke.createStyles(r)}({navigation:{paddingHorizontal:16,paddingBottom:16,backgroundColor:z.unsafe_rawColors.PRIMARY_800},shadow:{shadowColor:"#000",shadowOffset:{width:1,height:4},shadowOpacity:.15,shadowRadius:4.65,elevation:8},section:{marginTop:-20,marginHorizontal:16,shadowColor:"#000",shadowOffset:{width:1,height:4},shadowOpacity:.15,shadowRadius:4.65,elevation:8,height:"100%"},sectionIcon:{width:16,height:16,marginHorizontal:4},renderable:{backgroundColor:(ie=z.colors.CARD_PRIMARY_BG)!=null?ie:z.colors.BACKGROUND_PRIMARY},space:{marginBottom:50},search:{margin:0,marginTop:5,padding:10,borderBottomWidth:0,background:"none",backgroundColor:"none"},icon:{tintColor:z.colors.INTERACTIVE_NORMAL,width:16,height:16}}),Qe=[{title:"Disable",value:!1},{title:"Enable",value:!0}],We=function(r){let o=r,{title:t,icon:e,patches:n,children:c,style:i}=o,a=Ye(o,["title","icon","patches","children","style"]);const[u,d]=s.useState(O(`${t}.hidden`,!1)),p=Object.keys(n).every(function(f){return!O(`${f}.enabled`)}),m=W(T.name),h=ae();return s.useEffect(function(){m.set(`${t}.hidden`,u)},[u]),s.createElement(J.FormSection,qe({title:t,style:[i,{opacity:p?.5:1}],icon:s.createElement(b,{style:{flexDirection:"row"}},e,s.createElement(Z,{onPress:function(){Object.keys(n).forEach(function(f){return m.set(`${f}.enabled`,p)}),A(G(300,"keyboard"))}},s.createElement(J.FormRow.Icon,{source:P(p?"Small":"Check"),style:h.sectionIcon})),s.createElement(Z,{onPress:function(){d(function(f){return!f}),A({duration:300,create:{type:"keyboard",property:"opacity"},update:{type:"easeInEaseOut"},delete:{type:"easeInEaseOut",property:"opacity"}})}},s.createElement(J.FormRow.Icon,{source:P(`ic_arrow${u?"":"_down"}`),style:h.sectionIcon})))},a),!u&&c)},ce={serverInvite:"https://discord.gg/TeRQEPb",bannersSource:"https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json"},{findByProps:se,components:{Redesign:le}}=E,Xe=se("default","getUserBannerURL",{lazy:!0}),Ze=se("openURL","openDeeplink",{lazy:!0});let $=function(r){R(t,r);var o=I(t);function t(){return k(this,t),o.apply(this,arguments)}return w(t,null,[{key:"fetchBanners",value:function(){var e=this;return new Promise(function(n,c){fetch(ce.bannersSource).then(function(i){return i.ok||c("Failed to fetch badges."),i.json()}).then(function(i){e.banners=i,n(1)}).catch(console.error)})}},{key:"getBanner",value:function(e){var n;const c=(n=this.banners)==null?void 0:n.find(function(i){return i.uid===e.id});return!(e!=null&&e.banner)&&c?c.img:e.banner}},{key:"patch",value:function(e){var n=this;e.after(Xe,"getUserBannerURL",function(c,i){let[a]=i;return n.enabled?n.banners?n.getBanner(a):(n.fetchBanners(),a.banner):a.banner})}},{key:"render",value:function(e){let{disabled:n}=e;const[c,i]=s.useState(!1);return s.createElement(b,{style:{flexDirection:"row",marginHorizontal:16,marginBottom:16}},s.createElement(le.Button,{text:"Join Server",onPress:function(){return Ze.openDeeplink(ce.serverInvite)},style:{flex:.5,marginRight:10},variant:"primary",size:"md",icon:P("icon-invite"),iconPosition:"start",disabled:n}),s.createElement(le.Button,{text:"Reload Banners",onPress:function(){i(!0),t.fetchBanners().then(function(){return i(!1)}).catch(function(a){return console.error(a)})},style:{flex:.5},variant:"primary-alt",size:"md",icon:P("ic_message_retry"),iconPosition:"start",disabled:n,loading:c}))}}]),t}(_);l($,"key","customBanner"),l($,"title","Custom Banner"),l($,"subtitle","Displays custom banners with the UserBG API. Request your own at the server below."),l($,"icon","ic_profile_24px"),l($,"banners",void 0);const{findByName:et,findByProps:V,common:{i18n:{Messages:D}}}=E,tt=V("ButtonColors",{lazy:!0}),nt=V("TextStyleSheet",{lazy:!0}),rt=V("SearchableSettingsList",{lazy:!0}),ot=et("UpsellCard",{interop:!1,lazy:!0});let x=function(r){R(t,r);var o=I(t);function t(){return k(this,t),o.apply(this,arguments)}return w(t,null,[{key:"patch",value:function(e){var n=this;e.instead(tt,"default",function(c,i,a){if(!(i[0].text===D.EMOJI_POPOUT_PREMIUM_CTA&&n.enabled))return a.apply(c,i)}),e.instead(b,"render",function(c,i,a){var u;if(!([D.PREMIUM,"Nitro"].includes((u=i[0])==null?void 0:u.accessibilityLabel)&&n.enabled))return a.apply(c,i)}),e.instead(ot,"default",function(c,i,a){if(!n.enabled)return a.apply(c,i)}),e.before(nt.Text,"render",function(c,i){!n.enabled||typeof i[0].children!="string"||n.props.forEach(function(a){var u,d,p;const m=D[`EMOJI_POPOUT_${a}`],h=D[`EMOJI_POPOUT_PREMIUM_${a}`];!((u=i[0].children)!=null&&u.includes(m))||(i[0].children=(p=(d=i[0].children)==null?void 0:d.replace)==null?void 0:p.call(d,m,h))})}),e.before(rt.SearchableSettingsList,"type",function(c,i){let[{sections:a}]=i;const u=a.find(function(d){return d.settings.find(function(p){return p==="PREMIUM"})});u&&(u.settings=u.settings.filter(function(d){return d!=="PREMIUM"}))})}}]),t}(_);l(x,"key","hideUpsells"),l(x,"title","Hide Upsells"),l(x,"subtitle","Hide all 'Get Nitro' upsells throughout Discord (doesn't include boosting upsells)"),l(x,"icon","img_nitro_boosted"),l(x,"props",["CURRENT_GUILD_DESCRIPTION","JOINED_GUILD_DESCRIPTION","UNJOINED_DISCOVERABLE_GUILD_DESCRIPTION"]);let C=function(r){R(t,r);var o=I(t);function t(){return k(this,t),o.apply(this,arguments)}return w(t,null,[{key:"patch",value:function(e){var n=this;Object.keys(X).forEach(function(c){c.includes("can")&&e.instead(X,c,function(i,a,u){return n.enabled?!0:u.apply(i,a)})})}}]),t}(_);l(C,"key","pseudoPatches"),l(C,"title","Pseudo Patches"),l(C,"subtitle","Patches several 'can' functions. Must be on to use most of the features in this plugin."),l(C,"icon","ic_message_retry");const q={client:{icon:"ic_nitro_rep_24px",patches:{hideUpsells:x,pseudoPatches:C}},chat:{icon:"feature_star",patches:{freeEmojis:B,realEmojis:j,freeStickers:U}},profile:{icon:"ic_profile_24px",patches:{profileThemes:S,customBanner:$}}},it=function(r){return Object.values(q).forEach(function(o){Object.values(o.patches).forEach(function(t){var e;try{t.patch(r)}catch(n){console.error(`Patch '${t.title}' (${t.key}) errored with '${(e=n.message)!=null?e:n}'.`)}})})},{components:{Forms:at,Redesign:{TableSwitchRow:ct,TableRowIcon:st},Button:Y}}=E,{Search:lt}=be;function ut(){const r=W(T.name),[o,t]=s.useState(""),e=ae();return s.createElement(Pe,null,s.createElement(b,{style:e.navigation},s.createElement(b,{style:[e.shadow,{marginTop:16}]},s.createElement(lt,{placeholder:"Search...",value:o,onChange:function(n){return t(n)},onClear:function(){return t("")},isClearable:!0,leadingIcon:function(){return s.createElement(L.View,{style:{flex:1,justifyContent:"center",alignItems:"center"}},s.createElement(L.Image,{source:P("Search"),style:e.icon}))}})),s.createElement(b,{style:e.shadow},s.createElement(b,{style:{flexDirection:"row"}},Qe.map(function(n,c,i){let{title:a,value:u}=n,{length:d}=i;return s.createElement(Y,{color:Y.Colors.BRAND,text:a,size:Y.Sizes.MEDIUM,onPress:function(){Re(r,q,u),A(G(300,"keyboard"))},style:{marginTop:16,borderRadius:12,marginHorizontal:4,flex:1/d}})})))),s.createElement(b,{style:e.section},Object.entries(q).map(function(n){let[c,{icon:i,patches:a}]=n;return s.createElement(We,{key:c,title:Q.capitalize(c),icon:s.createElement(at.FormRow.Icon,{style:e.sectionIcon,source:P(i)}),inset:!0,sectionBodyStyle:{borderRadius:24},uppercaseTitle:!1,patches:a},Object.values(a).filter(function(u){let{title:d,subtitle:p}=u;return[d,p].some(function(m){return m.toLowerCase().includes(o.toLowerCase())})}).map(function(u,d,p){let{key:m,title:h,subtitle:f,icon:y,render:g}=u;return s.createElement(s.Fragment,null,s.createElement(b,{style:O(`${m}.enabled`)?{}:{opacity:.5}},s.createElement(ct,{label:h,subLabel:f,icon:s.createElement(st,{source:typeof y=="string"?P(y):y}),value:O(`${m}.enabled`),onValueChange:function(v){r.set(`${m}.enabled`,JSON.parse(v)),A(G(300,"keyboard"))},start:d===0,end:d===p.length-1})),g&&s.createElement(b,{style:e.renderable},s.createElement(g,{disabled:!O(`${m}.enabled`)})))}))})),s.createElement(b,{style:e.space}))}const ue=ke(T.name);let ft=function(){function r(){k(this,r)}return w(r,[{key:"start",value:function(){it(ue)}},{key:"stop",value:function(){ue.unpatchAll()}},{key:"settings",value:function(){return s.createElement(ut,null)}}]),r}();var dt=new ft;return dt})();
