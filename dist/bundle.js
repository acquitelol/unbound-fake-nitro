(function(){function k(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}function Z(t,r){for(var e=0;e<r.length;e++){var n=r[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function P(t,r,e){return r&&Z(t.prototype,r),e&&Z(t,e),t}var ve="FakeNitro",be="rosie.fakenitro",Ee="http://rosies-macbook-air.local:5496/bundle.js",_e="1.0.9",ke="ic_nitro_rep_24px",Pe="Adds an authentic pseudo-nitro experience to the client, ranging from free emojis to image banners.",Ie=[{name:"Rosie<3",id:"588262373488590878"}],A={name:ve,id:be,bundle:Ee,version:_e,icon:ke,description:Pe,authors:Ie};const{utilities:ee,metro:b,components:we,assets:{getIDByName:I},storage:{useSettingsStore:te,get:Se,set:Oe,on:Re},patcher:{createPatcher:$e}}=window.unbound;b.stores.Users;const J=window.ReactNative,f=window.React,[ne,je,V]=b.findByProps({params:["canUseEmojisEverywhere"],lazy:!0},{params:["uploadLocalFiles"],lazy:!0},{params:["sendMessage","receiveMessage"],lazy:!0},{bulk:!0}),{ScrollView:Te,TouchableOpacity:re,View:E,LayoutAnimation:{create:q,configureNext:z},FlatList:wt}=J,R=function(t){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return Se(A.name,t,r)},Ae=function(t,r){return Oe(A.name,t,r)},Ce=function(t,r,e){return Object.values(r).map(function(n){let{patches:o}=n;Object.values(o).forEach(function(c){let{key:i}=c;return t.set(`${i}.enabled`,e)})})};function s(t,r,e){return r in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}function Y(t,r){return Y=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Y(t,r)}function w(t,r){if(typeof r!="function"&&r!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(r&&r.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),r&&Y(t,r)}function M(t){return M=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},M(t)}function xe(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Be(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function Ne(t){return t&&typeof Symbol<"u"&&t.constructor===Symbol?"symbol":typeof t}function Ue(t,r){return r&&(Ne(r)==="object"||typeof r=="function")?r:Be(t)}function S(t){var r=xe();return function(){var n=M(t),o;if(r){var c=M(this).constructor;o=Reflect.construct(n,arguments,c)}else o=n.apply(this,arguments);return Ue(this,o)}}let _=function(){function t(){k(this,t)}return P(t,null,[{key:"get",value:function(r,e){var n;return(n=R(`${this.key}.${r}`))!=null?n:e}},{key:"set",value:function(r,e){return Ae(`${this.key}.${r}`,e)}},{key:"enabled",get:function(){return this.get("enabled")}},{key:"patch",value:function(r){}},{key:"render",value:function(r){}}]),t}();s(_,"key",void 0),s(_,"title",void 0),s(_,"subtitle",void 0),s(_,"icon",void 0);const{findStore:ze}=b,Me=ze("SelectedGuild");let C=function(t){w(e,t);var r=S(e);function e(){return k(this,e),r.apply(this,arguments)}return P(e,null,[{key:"parseEmojis",value:function(n){!n||!n.validNonShortcutEmojis||!this.enabled||(n.validNonShortcutEmojis.forEach(function(o,c){var i,a;(o.guildId!==Me.getGuildId()||o.animated)&&(n.content=n.content.replace(`<${o.animated?"a":""}:${(i=o.originalName)!=null?i:o.name}:${o.id}>`,o.url.replace("webp","png").replace(/size=\d+/,`size=48&quality=lossless&name=${(a=o.originalName)!=null?a:o.name}`)),delete n.validNonShortcutEmojis[c])}),n.validNonShortcutEmojis=n.validNonShortcutEmojis.filter(function(o){return o}))}},{key:"patch",value:function(n){var o=this;n.before(V,"sendMessage",function(c,i){let[,a]=i;return o.parseEmojis(a)}),n.before(je,"uploadLocalFiles",function(c,i){let[{parsedMessage:a}]=i;return o.parseEmojis(a)})}}]),e}(_);s(C,"key","freeEmojis"),s(C,"title","Free Emojis"),s(C,"subtitle","Allows you to send any custom or animated emoji as an image/gif link."),s(C,"icon","ic_emoji_24px");const{findStore:Le,findByName:Fe}=b,{getCustomEmojiById:De}=Le("Emoji"),oe=Fe("RowManager");let $=function(t){w(e,t);var r=S(e);function e(){return k(this,e),r.apply(this,arguments)}return P(e,null,[{key:"patch",value:function(n){var o=this;n.before(oe.prototype,"generate",function(c,i){var a,u,d;let[l]=i;if(l.rowType!==1||!((a=l.message)!=null&&a.content)||!o.enabled)return;let p=l.message.content;const y=o.emojiLinkRegex;if(typeof p!="string"||!p.match(y))return;let m=p.slice((u=p.match(y))==null?void 0:u.index).trim().split(`
`);if(!m.every(function(g){return g.match(y)}))return;p=p.slice(0,(d=p.match(y))==null?void 0:d.index),p=p.replace(/  /g,function(){return` ${m.shift()} `}).trim(),m.length&&(p+=` ${m.join(" ")}`);const h=l.message.embeds.filter(function(g){return!(g.type==="image"&&g.url.match(y))});l.message.content=p,l.message.embeds=h,l.__fakenitro=!0}),n.after(oe.prototype,"generate",function(c,i,a){var u;let[d]=i;if(d.rowType!==1||!d.__fakenitro||!Array.isArray(a.message.content)||!o.enabled)return;const{content:l}=a.message;if(!Array.isArray(l))return;const p=o.emojiLinkRegex,y=l.every(function(m){return!!(m.type==="link"&&m.target.match(p)||m.type==="text"&&m.content===" ")});for(let m=0;m<l.length;m++){const h=l[m];if(h.type!=="link")continue;const g=h.target.match(p);if(!g)continue;const v=`${g[0]}?size=4096`,ge=De(g[1]);l[m]={type:"customEmoji",id:g[1],alt:(u=ge?.name)!=null?u:"<invalid>",src:v,frozenSrc:v.replace("gif","webp"),jumboable:y?!0:void 0}}})}}]),e}(_);s($,"key","realEmojis"),s($,"title","Real Emojis"),s($,"subtitle","Formats fake nitro emoji links into real emojis by parsing the links when rendering the chat."),s($,"icon","ArrowsUpDownIcon"),s($,"emojiLinkRegex",/https:\/\/cdn.discordapp.com\/emojis\/(\d+)\.\w+/);const{findStore:ie}=b,Ge=ie("Stickers"),He=ie("Channel");let x=function(t){w(e,t);var r=S(e);function e(){return k(this,e),r.apply(this,arguments)}return P(e,null,[{key:"getStickerUrl",value:function(n){return`https://media.discordapp.net/stickers/${n}.png?size=160&quality=lossless`}},{key:"canUseSticker",value:function(n,o){return!n.guild_id||n.guild_id===He.getChannel(o).guild_id}},{key:"patch",value:function(n){var o=this;n.instead(V,"sendStickers",function(c,i,a){var u;if(!o.enabled)return a.apply(c,i);const[d,l,p,y]=i,m=l.map(function(v){return Ge.getStickerById(v)}),h=(u=m?.filter)==null?void 0:u.call(m,function(v){return!o.canUseSticker(v,d)});if(h.length<1)return a.apply(c,i);const g=h.map(function(v){return o.getStickerUrl(v.id)}).join(`
`);V.sendMessage(d,{content:g},null,y)})}}]),e}(_);s(x,"key","freeStickers"),s(x,"title","Free Stickers"),s(x,"subtitle","Turns invalid stickers into images when sent. Note that animated stickers won't animate :c"),s(x,"icon","StickerIcon");const{findByName:Je,findStore:Ve,common:{Clipboard:qe},components:{Redesign:Ye}}=b,{findInReactTree:Ke}=ee,Qe=Ve("UserProfile"),We=Je("EditProfileTheme",{interop:!1}),Xe=function(t){let{getText:r}=t,e;const[n,o]=f.useState(!1);return f.createElement(Ye.IconButton,{icon:I("ic_message_copy"),variant:"primary",size:"md",loading:n,onPress:function(){clearTimeout(e),o(function(c){return!c}),e=setTimeout(function(){return o(function(c){return!c})},400),qe.setString(r())}})};let O=function(t){w(e,t);var r=S(e);function e(){return k(this,e),r.apply(this,arguments)}return P(e,null,[{key:"is3y3",value:function(n){return Boolean([...n].some(function(o){return 917504<o.codePointAt(0)&&o.codePointAt(0)<917631}))}},{key:"encode",value:function(n){return[...n].map(function(o){return 0<o.codePointAt(0)&&o.codePointAt(0)<127?`${String.fromCodePoint(o.codePointAt(0)+917504)}`:o}).join("")}},{key:"decode",value:function(n){return[...n].map(function(o){return 917504<o.codePointAt(0)&&o.codePointAt(0)<917631?String.fromCodePoint(o.codePointAt(0)-917504):o}).join("")}},{key:"patch",value:function(n){var o=this;n.after(Qe,"getUserProfile",function(c,i,a){if(!a||!o.is3y3(a.bio)||!o.enabled)return;const u=o.decode(a.bio),d=u.match(o.colorExpression);!d||(d.shift(),a.themeColors=d.map(function(l){return parseInt("0x"+l.slice(1))}),a.premiumType=2,a.bio=u.replace(o.replacingExpression,""))}),n.after(We,"default",function(c,i,a){var u;if(!o.enabled)return;const d=Ke(a,function(y){return y?.children.find(function(m){var h;return((h=m?.type)==null?void 0:h.name)==="ColorSwatch"})}),l=function(y){var m;return(m=d?.children)==null?void 0:m.find(function(h){var g,v;return((g=h?.type)==null?void 0:g.name)==="ColorSwatch"&&((v=h?.props)==null?void 0:v.description)===y})},p=function(y){return y.props.color.toString(16).padStart(6,"0")};(u=d.children)==null||u.unshift(f.createElement(E,{style:{marginTop:5,marginRight:8}},f.createElement(Xe,{getText:function(){const y=l("Primary"),m=l("Accent");return o.encode(`[#${p(y)},#${p(m)}]`)}})))})}}]),e}(_);s(O,"key","profileThemes"),s(O,"title","Profile Themes"),s(O,"subtitle","Uses 3y3 text to colorize profiles. Copy your own from the 'Profile Theme' section."),s(O,"icon","ic_custom_color"),s(O,"colorExpression",/\[(\#[0-9a-fA-F]{6})\s*,\s*(\#[0-9a-fA-F]{6})\]/),s(O,"replacingExpression",new RegExp(O.colorExpression,"g"));var Ze=Object.defineProperty,L=Object.getOwnPropertySymbols,ae=Object.prototype.hasOwnProperty,ce=Object.prototype.propertyIsEnumerable,se=(t,r,e)=>r in t?Ze(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e,et=(t,r)=>{for(var e in r||(r={}))ae.call(r,e)&&se(t,e,r[e]);if(L)for(var e of L(r))ce.call(r,e)&&se(t,e,r[e]);return t},tt=(t,r)=>{var e={};for(var n in t)ae.call(t,n)&&r.indexOf(n)<0&&(e[n]=t[n]);if(t!=null&&L)for(var n of L(t))r.indexOf(n)<0&&ce.call(t,n)&&(e[n]=t[n]);return e},le;const{common:{StyleSheet:nt,Theme:F},components:{Forms:K}}=b,ue=function(t){return nt.createStyles(t)}({navigation:{paddingHorizontal:16,paddingBottom:16,backgroundColor:F.unsafe_rawColors.PRIMARY_800},shadow:{shadowColor:"#000",shadowOffset:{width:1,height:4},shadowOpacity:.15,shadowRadius:4.65,elevation:8},section:{marginTop:-20,marginHorizontal:16,shadowColor:"#000",shadowOffset:{width:1,height:4},shadowOpacity:.15,shadowRadius:4.65,elevation:8,height:"100%"},sectionIcon:{width:16,height:16,marginHorizontal:4},renderable:{backgroundColor:(le=F.colors.CARD_PRIMARY_BG)!=null?le:F.colors.BACKGROUND_PRIMARY},space:{marginBottom:50},search:{margin:0,marginTop:5,padding:10,borderBottomWidth:0,background:"none",backgroundColor:"none"},icon:{tintColor:F.colors.INTERACTIVE_NORMAL,width:16,height:16}}),rt=[{title:"Disable",value:!1},{title:"Enable",value:!0}],ot=function(t){let r=t,{title:e,icon:n,patches:o,children:c,style:i}=r,a=tt(r,["title","icon","patches","children","style"]);const[u,d]=f.useState(R(`${e}.hidden`,!1)),l=Object.keys(o).every(function(m){return!R(`${m}.enabled`)}),p=te(A.name),y=ue();return f.useEffect(function(){p.set(`${e}.hidden`,u)},[u]),f.createElement(K.FormSection,et({title:e,style:[i,{opacity:l?.5:1}],icon:f.createElement(E,{style:{flexDirection:"row"}},n,f.createElement(re,{onPress:function(){Object.keys(o).forEach(function(m){return p.set(`${m}.enabled`,l)}),z(q(300,"keyboard"))}},f.createElement(K.FormRow.Icon,{source:I(l?"Small":"Check"),style:y.sectionIcon})),f.createElement(re,{onPress:function(){d(function(m){return!m}),z({duration:300,create:{type:"keyboard",property:"opacity"},update:{type:"easeInEaseOut"},delete:{type:"easeInEaseOut",property:"opacity"}})}},f.createElement(K.FormRow.Icon,{source:I(`ic_arrow${u?"":"_down"}`),style:y.sectionIcon})))},a),!u&&c)},fe={serverInvite:"https://discord.gg/TeRQEPb",bannersSource:"https://raw.githubusercontent.com/Discord-Custom-Covers/usrbg/master/dist/usrbg.json"},{findByProps:de,components:{Redesign:pe}}=b,it=de("default","getUserBannerURL",{lazy:!0}),at=de("openURL","openDeeplink",{lazy:!0});let j=function(t){w(e,t);var r=S(e);function e(){return k(this,e),r.apply(this,arguments)}return P(e,null,[{key:"fetchBanners",value:function(){var n=this;return new Promise(function(o,c){fetch(fe.bannersSource).then(function(i){return i.ok||c("Failed to fetch badges."),i.json()}).then(function(i){n.banners=i,o(1)}).catch(console.error)})}},{key:"getBanner",value:function(n){var o;const c=(o=this.banners)==null?void 0:o.find(function(i){return i.uid===n.id});return!(n!=null&&n.banner)&&c?c.img:n.banner}},{key:"patch",value:function(n){var o=this;n.after(it,"getUserBannerURL",function(c,i){let[a]=i;return o.enabled?o.banners?o.getBanner(a):(o.fetchBanners(),a.banner):a.banner})}},{key:"render",value:function(n){let{disabled:o}=n;const[c,i]=f.useState(!1);return f.createElement(E,{style:{flexDirection:"row",marginHorizontal:16,marginBottom:16}},f.createElement(pe.Button,{text:"Join Server",onPress:function(){return at.openDeeplink(fe.serverInvite)},style:{flex:.5,marginRight:10},variant:"primary",size:"md",icon:I("icon-invite"),iconPosition:"start",disabled:o}),f.createElement(pe.Button,{text:"Reload Banners",onPress:function(){i(!0),e.fetchBanners().then(function(){return i(!1)}).catch(function(a){return console.error(a)})},style:{flex:.5},variant:"primary-alt",size:"md",icon:I("ic_message_retry"),iconPosition:"start",disabled:o,loading:c}))}}]),e}(_);s(j,"key","customBanner"),s(j,"title","Custom Banner"),s(j,"subtitle","Displays custom banners with the UserBG API. Request your own at the server below."),s(j,"icon","ic_profile_24px"),s(j,"banners",void 0);const{findByName:ct,findByProps:D,common:{i18n:{Messages:B}},components:{Redesign:{Button:Ot}}}=b,st=D("ButtonColors",{lazy:!0}),lt=D("TextStyleSheet",{lazy:!0}),ut=D("SearchableSettingsList",{lazy:!0}),ft=ct("UpsellCard",{interop:!1,lazy:!0}),dt=D("TryItOutUpsellCard",{lazy:!0});let T=function(t){w(e,t);var r=S(e);function e(){return k(this,e),r.apply(this,arguments)}return P(e,null,[{key:"patch",value:function(n){var o=this;n.instead(st,"default",function(c,i,a){if(!([B.APP_ICON_UPSELL,B.EMOJI_POPOUT_PREMIUM_CTA].includes(i[0].text)&&o.enabled))return a.apply(c,i)}),n.instead(E,"render",function(c,i,a){var u;if(!([B.PREMIUM,"Nitro"].includes((u=i[0])==null?void 0:u.accessibilityLabel)&&o.enabled))return a.apply(c,i)}),n.instead(ft,"default",function(c,i,a){if(!o.enabled)return a.apply(c,i)}),n.instead(dt,"TryItOutUpsellCard",function(c,i,a){if(!o.enabled)return a.apply(c,i)}),n.before(lt.Text,"render",function(c,i){!o.enabled||typeof i[0].children!="string"||o.props.forEach(function(a){var u,d,l;const p=B[`EMOJI_POPOUT_${a}`],y=B[`EMOJI_POPOUT_PREMIUM_${a}`];!((u=i[0].children)!=null&&u.includes(p))||(i[0].children=(l=(d=i[0].children)==null?void 0:d.replace)==null?void 0:l.call(d,p,y))})}),n.before(ut.SearchableSettingsList,"type",function(c,i){let[{sections:a}]=i;const u=a.find(function(d){return d.settings.find(function(l){return l==="PREMIUM"})});u&&(u.settings=u.settings.filter(function(d){return d!=="PREMIUM"}))})}}]),e}(_);s(T,"key","hideUpsells"),s(T,"title","Hide Upsells"),s(T,"subtitle","Hide all 'Get Nitro' upsells throughout Discord (doesn't include boosting upsells)"),s(T,"icon","img_nitro_boosted"),s(T,"props",["CURRENT_GUILD_DESCRIPTION","JOINED_GUILD_DESCRIPTION","UNJOINED_DISCOVERABLE_GUILD_DESCRIPTION"]);let N=function(t){w(e,t);var r=S(e);function e(){return k(this,e),r.apply(this,arguments)}return P(e,null,[{key:"patch",value:function(n){var o=this;Object.keys(ne).forEach(function(c){c.includes("can")&&n.instead(ne,c,function(i,a,u){return o.enabled?!0:u.apply(i,a)})})}}]),e}(_);s(N,"key","pseudoPatches"),s(N,"title","Pseudo Patches"),s(N,"subtitle","Patches several 'can' functions. Must be on to use most of the features in this plugin."),s(N,"icon","ic_message_retry");var pt=Object.defineProperty,me=Object.getOwnPropertySymbols,mt=Object.prototype.hasOwnProperty,yt=Object.prototype.propertyIsEnumerable,ye=(t,r,e)=>r in t?pt(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e,ht=(t,r)=>{for(var e in r||(r={}))mt.call(r,e)&&ye(t,e,r[e]);if(me)for(var e of me(r))yt.call(r,e)&&ye(t,e,r[e]);return t};const G=b.findByProps("OFFICIAL_ALTERNATE_ICONS",{lazy:!0}),H=b.findByProps("FreemiumAppIconIds",{lazy:!0}),Q=G.OFFICIAL_ALTERNATE_ICONS();let U=function(t){w(e,t);var r=S(e);function e(){return k(this,e),r.apply(this,arguments)}return P(e,null,[{key:"patch",value:function(){var n=this;const o=Q.slice(),c=G.ICONS.slice(),i=ht({},H.FreemiumAppIconIds);Re("changed",function(a){let{key:u,value:d}=a;u===`${n.key}.enabled`&&(d?(Q.forEach(function(l){return l.isPremium=!1}),G.ICONS.forEach(function(l){l.isPremium=!1}),H.FreemiumAppIconIds=H.MasterAppIconIds):(Q.forEach(function(l,p){return l.isPremium=o[p]}),G.ICONS.forEach(function(l,p){return l.isPremium=c[p]}),H.FreemiumAppIconIds=i))})}}]),e}(_);s(U,"key","appIcons"),s(U,"title","App Icons"),s(U,"subtitle","Enables Discord's fancy custom 'App Icons' without needing nitro"),s(U,"icon","Discord");const W={client:{icon:"ic_nitro_rep_24px",patches:{hideUpsells:T,pseudoPatches:N,appIcons:U}},chat:{icon:"feature_star",patches:{freeEmojis:C,realEmojis:$,freeStickers:x}},profile:{icon:"ic_profile_24px",patches:{profileThemes:O,customBanner:j}}},gt=function(t){return Object.values(W).forEach(function(r){Object.values(r.patches).forEach(function(e){var n;try{e.patch(t)}catch(o){console.error(`Patch '${e.title}' (${e.key}) errored with '${(n=o.message)!=null?n:o}'.`)}})})},{components:{Forms:vt,Redesign:{TableSwitchRow:bt,TableRowIcon:Et},Button:X}}=b,{Search:_t}=we;function kt(){const t=te(A.name),[r,e]=f.useState(""),n=ue();return f.createElement(Te,null,f.createElement(E,{style:n.navigation},f.createElement(E,{style:[n.shadow,{marginTop:16}]},f.createElement(_t,{placeholder:"Search...",value:r,onChange:function(o){return e(o)},onClear:function(){return e("")},isClearable:!0,leadingIcon:function(){return f.createElement(J.View,{style:{flex:1,justifyContent:"center",alignItems:"center"}},f.createElement(J.Image,{source:I("Search"),style:n.icon}))}})),f.createElement(E,{style:n.shadow},f.createElement(E,{style:{flexDirection:"row"}},rt.map(function(o,c,i){let{title:a,value:u}=o,{length:d}=i;return f.createElement(X,{color:X.Colors.BRAND,text:a,size:X.Sizes.MEDIUM,onPress:function(){Ce(t,W,u),z(q(300,"keyboard"))},style:{marginTop:16,borderRadius:12,marginHorizontal:4,flex:1/d}})})))),f.createElement(E,{style:n.section},Object.entries(W).map(function(o){let[c,{icon:i,patches:a}]=o;return f.createElement(ot,{key:c,title:ee.capitalize(c),icon:f.createElement(vt.FormRow.Icon,{style:n.sectionIcon,source:I(i)}),inset:!0,sectionBodyStyle:{borderRadius:24},uppercaseTitle:!1,patches:a},Object.values(a).filter(function(u){let{title:d,subtitle:l}=u;return[d,l].some(function(p){return p.toLowerCase().includes(r.toLowerCase())})}).map(function(u,d,l){let{key:p,title:y,subtitle:m,icon:h,render:g}=u;return f.createElement(f.Fragment,null,f.createElement(E,{style:R(`${p}.enabled`)?{}:{opacity:.5}},f.createElement(bt,{label:y,subLabel:m,icon:f.createElement(Et,{source:typeof h=="string"?I(h):h}),value:R(`${p}.enabled`),onValueChange:function(v){t.set(`${p}.enabled`,JSON.parse(v)),z(q(300,"keyboard"))},start:d===0,end:d===l.length-1})),g&&f.createElement(E,{style:n.renderable},f.createElement(g,{disabled:!R(`${p}.enabled`)})))}))})),f.createElement(E,{style:n.space}))}const he=$e(A.name);let Pt=function(){function t(){k(this,t)}return P(t,[{key:"start",value:function(){gt(he)}},{key:"stop",value:function(){he.unpatchAll()}},{key:"settings",value:function(){return f.createElement(kt,null)}}]),t}();var It=new Pt;return It})();
