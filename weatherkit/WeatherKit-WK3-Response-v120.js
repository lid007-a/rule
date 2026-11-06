!function(){"use strict";let t;const e=(...e)=>t.webFetch(...e),i=(...e)=>t.fetch(...e),n=[{key:"DataSets",name:"[数据集] 解析与处理范围",value:"airQuality,currentWeather,forecastDaily,forecastHourly,forecastNextHour,locationInfo,news,historicalComparisons,weatherAlerts,weatherChanges",description:"逗号分隔；填 [] 全部透传。WK3 仅处理空气质量、分钟降水与预警；当前/逐日/逐小时天气仍透传。"},{key:"Weather.Replace",name:"[天气] 替换范围",value:"CN",description:"逗号分隔国家码；保留现有大陆范围与香港缺失 AQ 专用补入逻辑，不支持正则。"},{key:"Weather.Provider",name:"[天气] 数据源",value:"ColorfulClouds",options:["WeatherKit","ColorfulClouds","QWeather"],description:"WK2 可选择天气数据源；WK3 当前/逐日/逐小时天气仍透传。"},{key:"Weather.ReplaceDaily",name:"[天气] 替换逐日预报",value:"false",boolean:!0,description:"WK2 可选；WK3 逐日预报保持苹果数据。"},{key:"Weather.ReplaceHourly",name:"[天气] 替换逐小时预报",value:"false",boolean:!0,description:"WK2 可选；WK3 逐小时预报保持苹果数据。"},{key:"WeatherAlerts.Provider",name:"[天气预警] 数据源",value:"QWeatherWeb",options:["QWeatherWeb","WeatherKit"],description:"QWeatherWeb：和风公开页面补全，苹果原生展示；WeatherKit：预警原样透传。原项目 API 预警源尚未移植，不提供无效选择。"},{key:"NextHour.Provider",name:"[分钟降水] 数据源",value:"ColorfulClouds",options:["WeatherKit","ColorfulClouds","QWeather"],description:"WeatherKit 不替换；彩云/和风按已验证 WK3 雨况处理。"},{key:"AirQuality.Current.Index.Provider",name:"[今日空气指数] 数据源",value:"ColorfulCloudsUS",options:["ColorfulCloudsUS","ColorfulCloudsCN","QWeather","Calculate"],description:"默认彩云美标。WK3 已验证国标→美标和同标准指数替换；其他跨标准保留苹果数据。"},{key:"AirQuality.Current.Index.Replace",name:"[今日空气指数] 替换范围（原始标准）",value:"HJ6332012",description:"逗号分隔原始标准；不是输出标准。国内转美标仍填 HJ6332012。现有非国标算法会确保包含国内原标准。"},{key:"AirQuality.Current.Index.ForceCNPrimaryPollutants",name:"[今日空气指数] 强制国标主要污染物",value:"true",boolean:!0,description:"沿用原项目：国标指数≤50时仍显示主要污染物。"},{key:"AirQuality.Current.Pollutants.Provider",name:"[今日污染物] 数据源",value:"ColorfulClouds",options:["ColorfulClouds","QWeather"],description:"用于 WK2/内置计算；WK3 美标直接替换时污染物跟随指数来源。"},{key:"AirQuality.Current.Pollutants.Units.Replace",name:"[污染物单位] 替换原标准",value:"[]",description:"默认 [] 不额外转换；可填 HJ6332012、EPA_NowCast、EU.EAQI、UBA，逗号分隔。WK3 完整美标 AQ 使用同源单位，此独立设置主要用于 WK2。"},{key:"AirQuality.Current.Pollutants.Units.Mode",name:"[污染物单位] 转换模式",value:"Scale",options:["Scale","ugm3","EU_ppb","US_ppb","Force_ugm3","Force_EU_ppb","Force_US_ppb"],description:"Scale 按标准；其余为原项目单位模式，适用范围同单位替换项。"},{key:"AirQuality.Comparison.ReplaceWhenCurrentChange",name:"[昨日对比] 今日变化时重算",value:"true",boolean:!0,description:"WK2 沿用原设置；WK3 当前美标数据替换后始终仅做同源同标准比较，失败为未知。"},{key:"AirQuality.Comparison.Yesterday.IndexProvider",name:"[昨日空气指数] 数据源",value:"ColorfulCloudsUS",options:["ColorfulCloudsUS","ColorfulCloudsCN","QWeather","Calculate","WeatherKit"],description:"默认彩云美标。WK3 不跨来源/算法比较；不兼容组合返回未知；WeatherKit 不注入。"},{key:"AirQuality.Comparison.Yesterday.PollutantsProvider",name:"[昨日污染物] 数据源",value:"ColorfulCloudsCN",options:["ColorfulCloudsCN","QWeather"],description:"原项目内置昨日算法所用来源；WK3 裸 Calculate 昨日比较尚未接通。"},{key:"AirQuality.Calculate.Algorithm",name:"[内置算法] 计算公式",value:"WAQI_InstantCast_US",options:["None","UBA","EU_EAQI","WAQI_InstantCast_US","WAQI_InstantCast_CN","WAQI_InstantCast_CN_25_DRAFT","CA_AQHI","HK_AQHI","AQHI_Multi_CN","AQHI_Multi_CN_HK","CN_DEATH_AQHI","CN_DEATH_HK_AQHI"],description:"上游十二种算法；仅指数来源选 Calculate 时计算。WK3 未验证的目标标准保持苹果原值。"},{key:"AirQuality.Calculate.AllowOverRange",name:"[内置算法] 允许指数超标",value:"true",boolean:!0,description:"沿用上游配置。WK3 当前美标编码校验指数0–500；本项不会绕过 WK3 物理范围校验。"},{key:"API.ColorfulClouds.Token",name:"[API] 彩云令牌",value:"",description:"留空沿用当前公共令牌；自有令牌只在设备参数中填写，不写入公开 Gist。"},{key:"API.QWeather.Host",name:"[API] 和风主机",value:"devapi.qweather.com",description:"使用和风 API 数据源时填写控制台主机名。"},{key:"API.QWeather.Token",name:"[API] 和风令牌",value:"",description:"使用和风 API 数据源时需要；网页预警补全不需要。"},{key:"LogLevel",name:"[调试] 日志等级",value:"INFO",options:["OFF","ERROR","WARN","INFO","DEBUG","ALL"],description:"默认 INFO，与当前脚本一致；只控制本机日志。"},{key:"HTTP_TIMEOUT_MS",name:"[网络] 单次请求超时（毫秒）",value:"8000",description:"默认8000毫秒；脚本总体超时仍为30秒。"}];var a={WeatherKit:{Settings:{DataSets:["airQuality","currentWeather","forecastDaily","forecastHourly","forecastNextHour","locationInfo","news","historicalComparisons","weatherAlerts","weatherChanges"],Weather:{Replace:["CN"],ReplaceDaily:!1,ReplaceHourly:!1,Provider:"ColorfulClouds"},NextHour:{Provider:"ColorfulClouds"},AirQuality:{Current:{Pollutants:{Provider:"ColorfulClouds",Units:{Replace:[],Mode:"Scale"}},Index:{Replace:["HJ6332012"],Provider:"ColorfulCloudsCN",ForceCNPrimaryPollutants:!0}},Comparison:{ReplaceWhenCurrentChange:!0,Yesterday:{PollutantsProvider:"ColorfulCloudsCN",IndexProvider:"ColorfulCloudsCN"}},Calculate:{Algorithm:"WAQI_InstantCast_US",AllowOverRange:!0}},API:{QWeather:{Token:null,Host:"devapi.qweather.com"},ColorfulClouds:{Token:null}},EdgeCache:!1},Configs:{Availability:{v1:["currentWeather","dailyForecast","hourlyForecast","minuteForecast","weatherAlerts"],v2:["airQuality","currentWeather","forecastDaily","forecastHourly","forecastPeriodic","historicalComparisons","weatherChanges","forecastNextHour","weatherAlerts","weatherAlertNotifications","news"]}}},Default:{Settings:{LogLevel:"INFO"},Configs:{Storefront:{AE:"143481",AF:"143610",AG:"143540",AI:"143538",AL:"143575",AM:"143524",AO:"143564",AR:"143505",AT:"143445",AU:"143460",AZ:"143568",BA:"143612",BB:"143541",BD:"143490",BE:"143446",BF:"143578",BG:"143526",BH:"143559",BJ:"143576",BM:"143542",BN:"143560",BO:"143556",BR:"143503",BS:"143539",BT:"143577",BW:"143525",BY:"143565",BZ:"143555",CA:"143455",CD:"143613",CG:"143582",CH:"143459",CI:"143527",CL:"143483",CM:"143574",CN:"143465",CO:"143501",CR:"143495",CV:"143580",CY:"143557",CZ:"143489",DE:"143443",DK:"143458",DM:"143545",DO:"143508",DZ:"143563",EC:"143509",EE:"143518",EG:"143516",ES:"143454",FI:"143447",FJ:"143583",FM:"143591",FR:"143442",GA:"143614",GB:"143444",GD:"143546",GF:"143615",GH:"143573",GM:"143584",GR:"143448",GT:"143504",GW:"143585",GY:"143553",HK:"143463",HN:"143510",HR:"143494",HU:"143482",ID:"143476",IE:"143449",IL:"143491",IN:"143467",IQ:"143617",IS:"143558",IT:"143450",JM:"143511",JO:"143528",JP:"143462",KE:"143529",KG:"143586",KH:"143579",KN:"143548",KP:"143466",KR:"143466",KW:"143493",KY:"143544",KZ:"143517",TC:"143552",TD:"143581",TJ:"143603",TH:"143475",TM:"143604",TN:"143536",TO:"143608",TR:"143480",TT:"143551",TW:"143470",TZ:"143572",LA:"143587",LB:"143497",LC:"143549",LI:"143522",LK:"143486",LR:"143588",LT:"143520",LU:"143451",LV:"143519",LY:"143567",MA:"143620",MD:"143523",ME:"143619",MG:"143531",MK:"143530",ML:"143532",MM:"143570",MN:"143592",MO:"143515",MR:"143590",MS:"143547",MT:"143521",MU:"143533",MV:"143488",MW:"143589",MX:"143468",MY:"143473",MZ:"143593",NA:"143594",NE:"143534",NG:"143561",NI:"143512",NL:"143452",NO:"143457",NP:"143484",NR:"143606",NZ:"143461",OM:"143562",PA:"143485",PE:"143507",PG:"143597",PH:"143474",PK:"143477",PL:"143478",PT:"143453",PW:"143595",PY:"143513",QA:"143498",RO:"143487",RS:"143500",RU:"143469",RW:"143621",SA:"143479",SB:"143601",SC:"143599",SE:"143456",SG:"143464",SI:"143499",SK:"143496",SL:"143600",SN:"143535",SR:"143554",ST:"143598",SV:"143506",SZ:"143602",UA:"143492",UG:"143537",US:"143441",UY:"143514",UZ:"143566",VC:"143550",VE:"143502",VG:"143543",VN:"143471",VU:"143609",XK:"143624",YE:"143571",ZA:"143472",ZM:"143622",ZW:"143605"}}}};let s={};try{s=JSON.parse(globalThis.$environment?.SETTINGS||globalThis.$env?.SETTINGS||"{}")}catch{}const r={OFF:0,ERROR:1,WARN:2,INFO:3,DEBUG:4,ALL:5}[globalThis.$environment?.LogLevel??globalThis.$env?.LogLevel??s.LogLevel??"INFO"]??3,o=Object.fromEntries([["debug",4],["info",3],["warn",2],["error",1],["log",1],["exception",1]].map(([t,e])=>[t,(...i)=>{r>=e&&console["exception"===t?"error":t](...(t=>t.map(t=>"object"==typeof t&&null!==t?JSON.stringify(t,null,2):t))(i))}]));function d(t){return Array.isArray(t)?t:t.replace(/\[(\d+)\]/g,".$1").split(".").filter(Boolean)}function c(t){if(null===t||"object"!=typeof t)return!1;const e=Object.getPrototypeOf(t);return null===e||e===Object.prototype}function u(t,...e){if(null==t)return t;for(const i of e)if(null!=i)for(const e of Object.keys(i)){const n=i[e],a=t[e];c(n)?t[e]=u(c(a)?a:{},n):Array.isArray(n)?t[e]=n.length>0?[...n]:void 0!==a?a:[]:void 0!==n&&(t[e]=n)}return t}function l(t,e,i){const n=d(e).reduce((t,e)=>Object(t)[e],t);return void 0===n?i:n}function p(t,e,i){const n=d(e);return n.slice(0,-1).reduce((t,e,i)=>(Object(t[e])!==t[e]&&(t[e]=/^\d+$/.test(n[i+1])?[]:{}),t[e]),t)[n[n.length-1]]=i,t}function h(t){return/^\d+$/.test(t)?Number.parseInt(t,10):t}function b(t,e){for(const i in t){const n=t[i];t[i]="object"==typeof n&&null!==n?b(n,e):e(i,n)}return t}function m(t,e){const i=l(t,e);Array.isArray(i)||p(t,e,i?[i]:[])}function y(t,e={}){const i=u({},t?.Default?.Settings,t?.WeatherKit?.Settings);e&&"object"==typeof e&&u(i,e),m(i,"Weather.Replace"),m(i,"AirQuality.Current.Index.Replace"),m(i,"AirQuality.Current.Pollutants.Units.Replace"),b(i,(t,e)=>{if("string"==typeof e)switch(e){case"true":case"false":case"[]":return JSON.parse(e);default:return e.includes(",")?function(t){switch(typeof t){case"string":return t.split(",");case"number":case"boolean":return[t];default:return t||[]}}(e).map(t=>h(t)):h(e)}return e});const n=i?.AirQuality?.Current?.Index?.Provider,a=i?.AirQuality?.Calculate?.Algorithm,s=i?.AirQuality?.Current?.Index?.Replace,r=i?.AirQuality?.Comparison?.Yesterday,d="ColorfulCloudsUS"===n||"Calculate"===n&&["WAQI_InstantCast_US","EU_EAQI","UBA"].includes(a);d&&Array.isArray(s)&&!s.includes("HJ6332012")&&s.unshift("HJ6332012"),r&&"ColorfulCloudsUS"===n&&"ColorfulCloudsCN"===r.IndexProvider?r.IndexProvider="ColorfulCloudsUS":r&&"Calculate"===n&&d&&"ColorfulCloudsCN"===r.IndexProvider&&(r.IndexProvider="Calculate");const c=u({},t?.Default?.Configs,t?.WeatherKit?.Configs);if(c.Locale&&(c.Locale=new Map(c.Locale)),c.i18n)for(const t in c.i18n)c.i18n[t]=new Map(c.i18n[t]);return o.info("[buildSettings] Settings:",JSON.stringify(i,null,2)),{Settings:i,Configs:c}}function f(t){const e=t.env?.SETTINGS?JSON.parse(t.env.SETTINGS):{},i={};for(const[e,n]of Object.entries(t.env??{}))(e.includes(".")||"DataSets"===e||"LogLevel"===e)&&p(i,e,n);u(e,i);const n=y(a,function t(e){if(Array.isArray(e))return e.length?e:"[]";if(e&&"object"==typeof e)for(const i of Object.keys(e))e[i]=t(e[i]);return e}(e));for(const t of["DataSets","Weather.Replace","AirQuality.Current.Index.Replace","AirQuality.Current.Pollutants.Units.Replace"]){const a=l(i,t)??l(e,t);if(void 0===a)continue;let s=a;if("string"==typeof s){const t=s.trim();s=t.startsWith("[")?JSON.parse(t):t.split(",").map(t=>t.trim()).filter(Boolean)}if(!Array.isArray(s)||s.some(t=>"string"!=typeof t||!t.trim()))throw new TypeError(`Invalid list setting: ${t}`);p(n.Settings,t,s.map(t=>t.trim()))}for(const t of["API.ColorfulClouds.Token","API.QWeather.Token","API.QWeather.Host"]){const a=l(i,t)??l(e,t);void 0!==a&&p(n.Settings,t,String(a)||(t.endsWith(".Host")?"devapi.qweather.com":null))}return"WeatherKit"===n.Settings.WeatherAlerts?.Provider&&(n.Settings.DataSets=n.Settings.DataSets.filter(t=>"weatherAlerts"!==t)),n}function _(t={}){const e={},i=(t,i)=>{null!=i&&(e[String(t).toLowerCase()]=i)};if("function"==typeof t.forEach)t.forEach((t,e)=>i(e,t));else if("function"==typeof t.entries)for(const[e,n]of t.entries())i(e,n);else for(const[e,n]of Object.entries(t))"function"!=typeof n&&i(e,n);for(const e of["content-type","content-encoding","etag","user-agent","x-schema-version"])i(e,"function"==typeof t.get?t.get(e):t[e]);return e}function g(t={},e={}){const i=new Set(["content-length","transfer-encoding","content-encoding","etag","content-md5"]);if("function"==typeof t.set&&"function"==typeof t.delete){for(const[n,a]of Object.entries(e))i.has(n.toLowerCase())||void 0===a||t.set(n,a);for(const e of i)t.delete(e);return t}const n={..._(t),..._(e)};for(const t of i)delete n[t];return n}const I=new Int32Array(2),N=new Float32Array(I.buffer),C=new Float64Array(I.buffer),x=1===new Uint16Array(new Uint8Array([1,0]).buffer)[0];var A;!function(t){t[t.UTF8_BYTES=1]="UTF8_BYTES",t[t.UTF16_STRING=2]="UTF16_STRING"}(A||(A={}));class T{constructor(t){this.bytes_=t,this.position_=0,this.text_decoder_=new TextDecoder}static allocate(t){return new T(new Uint8Array(t))}clear(){this.position_=0}bytes(){return this.bytes_}position(){return this.position_}setPosition(t){this.position_=t}capacity(){return this.bytes_.length}readInt8(t){return this.readUint8(t)<<24>>24}readUint8(t){return this.bytes_[t]}readInt16(t){return this.readUint16(t)<<16>>16}readUint16(t){return this.bytes_[t]|this.bytes_[t+1]<<8}readInt32(t){return this.bytes_[t]|this.bytes_[t+1]<<8|this.bytes_[t+2]<<16|this.bytes_[t+3]<<24}readUint32(t){return this.readInt32(t)>>>0}readInt64(t){return BigInt.asIntN(64,BigInt(this.readUint32(t))+(BigInt(this.readUint32(t+4))<<BigInt(32)))}readUint64(t){return BigInt.asUintN(64,BigInt(this.readUint32(t))+(BigInt(this.readUint32(t+4))<<BigInt(32)))}readFloat32(t){return I[0]=this.readInt32(t),N[0]}readFloat64(t){return I[x?0:1]=this.readInt32(t),I[x?1:0]=this.readInt32(t+4),C[0]}writeInt8(t,e){this.bytes_[t]=e}writeUint8(t,e){this.bytes_[t]=e}writeInt16(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8}writeUint16(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8}writeInt32(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8,this.bytes_[t+2]=e>>16,this.bytes_[t+3]=e>>24}writeUint32(t,e){this.bytes_[t]=e,this.bytes_[t+1]=e>>8,this.bytes_[t+2]=e>>16,this.bytes_[t+3]=e>>24}writeInt64(t,e){this.writeInt32(t,Number(BigInt.asIntN(32,e))),this.writeInt32(t+4,Number(BigInt.asIntN(32,e>>BigInt(32))))}writeUint64(t,e){this.writeUint32(t,Number(BigInt.asUintN(32,e))),this.writeUint32(t+4,Number(BigInt.asUintN(32,e>>BigInt(32))))}writeFloat32(t,e){N[0]=e,this.writeInt32(t,I[0])}writeFloat64(t,e){C[0]=e,this.writeInt32(t,I[x?0:1]),this.writeInt32(t+4,I[x?1:0])}getBufferIdentifier(){if(this.bytes_.length<this.position_+4+4)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");let t="";for(let e=0;e<4;e++)t+=String.fromCharCode(this.readInt8(this.position_+4+e));return t}__offset(t,e){const i=t-this.readInt32(t);return e<this.readInt16(i)?this.readInt16(i+e):0}__union(t,e){return t.bb_pos=e+this.readInt32(e),t.bb=this,t}__string(t,e){t+=this.readInt32(t);const i=this.readInt32(t);t+=4;const n=this.bytes_.subarray(t,t+i);return e===A.UTF8_BYTES?n:this.text_decoder_.decode(n)}__union_with_string(t,e){return"string"==typeof t?this.__string(e):this.__union(t,e)}__indirect(t){return t+this.readInt32(t)}__vector(t){return t+this.readInt32(t)+4}__vector_len(t){return this.readInt32(t+this.readInt32(t))}__has_identifier(t){if(4!=t.length)throw new Error("FlatBuffers: file identifier must be length 4");for(let e=0;e<4;e++)if(t.charCodeAt(e)!=this.readInt8(this.position()+4+e))return!1;return!0}createScalarList(t,e){const i=[];for(let n=0;n<e;++n){const e=t(n);null!==e&&i.push(e)}return i}createObjList(t,e){const i=[];for(let n=0;n<e;++n){const e=t(n);null!==e&&i.push(e.unpack())}return i}}class S{constructor(t){let e;this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null,this.text_encoder=new TextEncoder,e=t||1024,this.bb=T.allocate(e),this.space=e}clear(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1,this.string_maps=null}forceDefaults(t){this.force_defaults=t}dataBuffer(){return this.bb}asUint8Array(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())}prep(t,e){t>this.minalign&&(this.minalign=t);const i=1+~(this.bb.capacity()-this.space+e)&t-1;for(;this.space<i+t+e;){const t=this.bb.capacity();this.bb=S.growByteBuffer(this.bb),this.space+=this.bb.capacity()-t}this.pad(i)}pad(t){for(let e=0;e<t;e++)this.bb.writeInt8(--this.space,0)}writeInt8(t){this.bb.writeInt8(this.space-=1,t)}writeInt16(t){this.bb.writeInt16(this.space-=2,t)}writeInt32(t){this.bb.writeInt32(this.space-=4,t)}writeInt64(t){this.bb.writeInt64(this.space-=8,t)}writeFloat32(t){this.bb.writeFloat32(this.space-=4,t)}writeFloat64(t){this.bb.writeFloat64(this.space-=8,t)}addInt8(t){this.prep(1,0),this.writeInt8(t)}addInt16(t){this.prep(2,0),this.writeInt16(t)}addInt32(t){this.prep(4,0),this.writeInt32(t)}addInt64(t){this.prep(8,0),this.writeInt64(t)}addFloat32(t){this.prep(4,0),this.writeFloat32(t)}addFloat64(t){this.prep(8,0),this.writeFloat64(t)}addFieldInt8(t,e,i){(this.force_defaults||e!=i)&&(this.addInt8(e),this.slot(t))}addFieldInt16(t,e,i){(this.force_defaults||e!=i)&&(this.addInt16(e),this.slot(t))}addFieldInt32(t,e,i){(this.force_defaults||e!=i)&&(this.addInt32(e),this.slot(t))}addFieldInt64(t,e,i){(this.force_defaults||e!==i)&&(this.addInt64(e),this.slot(t))}addFieldFloat32(t,e,i){(this.force_defaults||e!=i)&&(this.addFloat32(e),this.slot(t))}addFieldFloat64(t,e,i){(this.force_defaults||e!=i)&&(this.addFloat64(e),this.slot(t))}addFieldOffset(t,e,i){(this.force_defaults||e!=i)&&(this.addOffset(e),this.slot(t))}addFieldStruct(t,e,i){e!=i&&(this.nested(e),this.slot(t))}nested(t){if(t!=this.offset())throw new TypeError("FlatBuffers: struct must be serialized inline.")}notNested(){if(this.isNested)throw new TypeError("FlatBuffers: object serialization must not be nested.")}slot(t){null!==this.vtable&&(this.vtable[t]=this.offset())}offset(){return this.bb.capacity()-this.space}static growByteBuffer(t){const e=t.capacity();if(3221225472&e)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");const i=e<<1,n=T.allocate(i);return n.setPosition(i-e),n.bytes().set(t.bytes(),i-e),n}addOffset(t){this.prep(4,0),this.writeInt32(this.offset()-t+4)}startObject(t){this.notNested(),null==this.vtable&&(this.vtable=[]),this.vtable_in_use=t;for(let e=0;e<t;e++)this.vtable[e]=0;this.isNested=!0,this.object_start=this.offset()}endObject(){if(null==this.vtable||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);const t=this.offset();let e=this.vtable_in_use-1;for(;e>=0&&0==this.vtable[e];e--);const i=e+1;for(;e>=0;e--)this.addInt16(0!=this.vtable[e]?t-this.vtable[e]:0);this.addInt16(t-this.object_start);const n=2*(i+2);this.addInt16(n);let a=0;const s=this.space;t:for(e=0;e<this.vtables.length;e++){const t=this.bb.capacity()-this.vtables[e];if(n==this.bb.readInt16(t)){for(let e=2;e<n;e+=2)if(this.bb.readInt16(s+e)!=this.bb.readInt16(t+e))continue t;a=this.vtables[e];break}}return a?(this.space=this.bb.capacity()-t,this.bb.writeInt32(this.space,a-t)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-t,this.offset()-t)),this.isNested=!1,t}finish(t,e,i){const n=i?4:0;if(e){const t=e;if(this.prep(this.minalign,8+n),4!=t.length)throw new TypeError("FlatBuffers: file identifier must be length 4");for(let e=3;e>=0;e--)this.writeInt8(t.charCodeAt(e))}this.prep(this.minalign,4+n),this.addOffset(t),n&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)}finishSizePrefixed(t,e){this.finish(t,e,!0)}requiredField(t,e){const i=this.bb.capacity()-t,n=i-this.bb.readInt32(i);if(!(e<this.bb.readInt16(n)&&0!=this.bb.readInt16(n+e)))throw new TypeError("FlatBuffers: field "+e+" must be set")}startVector(t,e,i){this.notNested(),this.vector_num_elems=e,this.prep(4,t*e),this.prep(i,t*e)}endVector(){return this.writeInt32(this.vector_num_elems),this.offset()}createSharedString(t){if(!t)return 0;if(this.string_maps||(this.string_maps=new Map),this.string_maps.has(t))return this.string_maps.get(t);const e=this.createString(t);return this.string_maps.set(t,e),e}createString(t){if(null==t)return 0;let e;return e=t instanceof Uint8Array?t:this.text_encoder.encode(t),this.addInt8(0),this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length),this.bb.bytes().set(e,this.space),this.endVector()}createByteVector(t){return null==t?0:(this.startVector(1,t.length,1),this.bb.setPosition(this.space-=t.length),this.bb.bytes().set(t,this.space),this.endVector())}createObjectOffset(t){return null===t?0:"string"==typeof t?this.createString(t):t.pack(this)}createObjectOffsetList(t){const e=[];for(let i=0;i<t.length;++i){const n=t[i];if(null===n)throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.");e.push(this.createObjectOffset(n))}return e}createStructOffsetList(t,e){return e(this,t.length),this.createObjectOffsetList(t.slice().reverse()),this.endVector()}}class v{static multiply(t,e,i=15){return t*e}static divide(t,e,i=15){return 0===e?0:t/e}static add(t,e,i=15){return t+e}static subtract(t,e,i=15){return t-e}}let F=class t{static Name="AirQuality";static Version="3.1.0";static Author="Virgil Clyne & Wordless Echo";static#t(t,e){const i=10**(e.toString().split(".")[1]||"").length;return Math.ceil(t*i)/i}static CategoryIndex(e,i){o.debug("☑️ CategoryIndex",`index: ${e}`);if(!i?.ranges||!Array.isArray(i.ranges)||0===i.ranges.length)return o.debug("categories:",i),o.error("GetPrimaryPollutant","categories无效"),-1;const n=i.ranges.find(({indexes:i})=>{const[n,a]=i;return t.#t(e,n)>=n&&t.#t(e,a)<=a});return n?(o.debug("✅ CategoryIndex",`categoryIndex: ${n.categoryIndex}`),n.categoryIndex):(o.error("CategoryIndex",`找不到index: ${e}对应的category`),-1)}static CompareCategoryIndexes(e,i){o.debug("☑️ CompareCategoryIndexes",`todayCategoryIndex: ${e}`,`yesterdayCategoryIndex: ${i}`);const{UNKNOWN:n,SAME:a,WORSE:s,BETTER:r}=t.Config.CompareCategoryIndexes,d=Number(e)-Number(i);return Number.isNaN(d)?(o.error("CompareCategoryIndexes","categoryIndex无效"),n):0===d?(o.debug("✅ CompareCategoryIndexes"),a):d>0?(o.debug("✅ CompareCategoryIndexes"),s):(o.debug("✅ CompareCategoryIndexes"),r)}static ConvertUnits(e,i,n){o.debug("☑️ ConvertUnits");const a=t.Config.Units.Friendly,s=e.map(e=>{const s=n[e.pollutantType];if(!s)return o.debug("ConvertUnits",`No scale for ${e.pollutantType}, skip`),e;o.debug("ConvertUnits",`Converting ${e.pollutantType}`);const r=t.ConvertUnit(e.amount,e.units,s.units,i?.[e.pollutantType]||-1,s?.stpConversionFactor||-1);return r<0?(o.error("ConvertUnits",`无法转换${e.pollutantType}的单位`,`${e.amount} ${a[e.units]??e.units} (STP conversion factor: ${i?.[e.pollutantType]||-1}) -> ${r} ${a[s.units]??s.units} (STP conversion factor: ${s?.stpConversionFactor||-1})`),e):(o.debug("ConvertUnits",`Converted ${e.pollutantType}: ${r} ${a[s.units]??s.units}`),{...e,amount:r,units:s.units})});return o.debug("✅ ConvertUnits"),s}static FixPollutantsUnits(e){switch(o.debug("☑️ FixPollutantsUnits"),e?.metadata?.providerName){case"和风天气":case"QWeather":e.pollutants=e?.pollutants?.map(e=>{switch(e.pollutantType){case"CO":{const{mgm3:i,ugm3:n}=t.Config.Units.WeatherKit;e.amount=t.ConvertUnit(e.amount,i,n);break}}return e});break;default:o.info(`Provider ${e?.metadata?.providerName} is no need to fix.`)}return o.debug("✅ FixPollutantsUnits"),e}static#e(e){return o.debug("☑️ GetStpConversionFactors"),o.debug("✅ GetStpConversionFactors",`STP conversion factors for ${e?.metadata?.providerName}: US`),t.Config.STP_ConversionFactors.US}static Pollutants2AQI(e,i,n={}){o.debug("☑️ Pollutants2AQI");const a=n?.algorithm??i?.AirQuality?.Calculate?.Algorithm,s=n?.forcePrimaryPollutant??i?.AirQuality?.Current?.Index?.ForceCNPrimaryPollutants,r=n?.allowOverRange??i?.AirQuality?.Calculate?.AllowOverRange,d=t.#e(e),c=t.Config.Scales[a]??t.Config.Scales.UBA;switch(a){case"None":return e;case"EU_EAQI":o.debug("☑️ PollutantsToEAQI"),e=t.#i(e.pollutants,c,{stpConversionFactors:d,allowOverRange:!1}),o.debug("✅ PollutantsToEAQI");break;case"WAQI_InstantCast_US":o.debug("☑️ PollutantsToInstantCastUS",`allowOverRange: ${r}`),e=t.#i(e.pollutants,c,{stpConversionFactors:d,allowOverRange:r}),o.debug("✅ PollutantsToInstantCastUS");break;case"WAQI_InstantCast_CN":case"WAQI_InstantCast_CN_25_DRAFT":{o.debug("☑️ PollutantsToInstantCastCN",`allowOverRange: ${r}`,`forcePrimaryPollutant: ${s}`),e=t.#i(e.pollutants,c,{stpConversionFactors:d,allowOverRange:r});const i=!s&&e.index<=50;i&&o.info("PollutantsToInstantCastCN",`Max index of pollutants ${e.primaryPollutant} = ${e.index} is <= 50, primaryPollutant will be set to NOT_AVAILABLE.`),e={...e,primaryPollutant:i?"NOT_AVAILABLE":e.primaryPollutant},o.debug("✅ PollutantsToInstantCastCN");break}case"CN_DEATH_AQHI":case"CA_AQHI":case"HK_AQHI":case"CN_DEATH_HK_AQHI":e=t.#n(e.pollutants,c,{stpConversionFactors:d}),e={...e,index:e.categoryIndex};break;case"AQHI_Multi_CN":case"AQHI_Multi_CN_HK":e=t.#a(e.pollutants,c,{stpConversionFactors:d}),e={...e,index:e.categoryIndex};break;default:o.debug("☑️ PollutantsToUBA"),e=t.#i(e.pollutants,c,{stpConversionFactors:d,allowOverRange:!0}),e={...e,index:e.categoryIndex},o.debug("✅ PollutantsToUBA")}return o.debug("✅ Pollutants2AQI"),e}static ConvertPollutants(e,i,n,a,s){const r=s?.AirQuality?.Current?.Pollutants?.Units?.Mode||"Scale";o.debug("☑️ ConvertPollutants",`mode: ${r}`);const d=s?.AirQuality?.Current?.Pollutants?.Units?.Replace??[],c=n&&a?.metadata&&!a.metadata.temporarilyUnavailable,u=t.GetNameFromScale(c?a?.scale:e?.scale),l=i?.metadata&&!i.metadata.temporarilyUnavailable?i.pollutants:e?.pollutants;o.debug("✅ ConvertPollutants");const p=Array.isArray(a?.pollutants)&&a.pollutants.some(t=>Number.isFinite(Number(t?.index))),h=s?.AirQuality?.Current?.Index?.Provider;if(c&&p&&h&&"WeatherKit"!==h&&!d.includes(u))return o.info("ConvertPollutants",`Use pollutants converted by ${h}`),a.pollutants;if(d.includes(u)){if(c&&"Calculate"===s?.AirQuality?.Current?.Index?.Provider&&"Scale"===r)return o.info("ConvertPollutants","Use pollutants from iRingo"),a.pollutants;{const i=(e=>{const i=t.Config.Scales;switch(e){case i.HJ6332012.weatherKitScale.name:return i.WAQI_InstantCast_CN;case i.EPA_NowCast.weatherKitScale.name:return i.WAQI_InstantCast_US;case i.EU_EAQI.weatherKitScale.name:return i.EU_EAQI;default:return i[e]}})(u);return i?t.ConvertUnits(l,t.#e(e),(e=>{const{ugm3:i,ppb:n}=t.Config.Units.WeatherKit,{US:a,EU:s}=t.Config.STP_ConversionFactors,o={OZONE:{units:i,stpConversionFactor:-1},NO2:{units:i,stpConversionFactor:-1},SO2:{units:i,stpConversionFactor:-1},CO:{units:i,stpConversionFactor:-1},C6H6:{units:i,stpConversionFactor:-1},NH3:{units:i,stpConversionFactor:-1},NO:{units:i,stpConversionFactor:-1}},d={OZONE:{units:n,stpConversionFactor:a.OZONE},NO2:{units:n,stpConversionFactor:a.NO2},SO2:{units:n,stpConversionFactor:a.SO2},CO:{units:n,stpConversionFactor:a.CO},C6H6:{units:n,stpConversionFactor:a.C6H6},NH3:{units:n,stpConversionFactor:a.NH3},NO:{units:n,stpConversionFactor:a.NO}},c={OZONE:{units:n,stpConversionFactor:s.OZONE},NO2:{units:n,stpConversionFactor:s.NO2},SO2:{units:n,stpConversionFactor:s.SO2},CO:{units:n,stpConversionFactor:s.CO},C6H6:{units:n,stpConversionFactor:s.C6H6},NH3:{units:n,stpConversionFactor:s.NH3},NO:{units:n,stpConversionFactor:s.NO}};switch(r){case"ugm3":return{...o,...e};case"EU_ppb":return{...c,...e};case"US_ppb":return{...d,...e};case"Force_ugm3":return o;case"Force_EU_ppb":return c;case"Force_US_ppb":return d;default:return e}})(i.pollutants)):(o.error("ConvertPollutants",`Unsupported scale name: ${u}`),l)}}return l}static ToWeatherKitScale=({name:t,version:e})=>e?`${t}.${e}`:t;static GetNameFromScale(t){if(!t)return"";o.debug("☑️ GetNameFromScale",`scale: ${t}`);const e=t.lastIndexOf(".");if(-1===e)return o.warn("GetNameFromScale",`无法找到${t}的版本号`),t;const i=t.substring(0,e);return o.debug("✅ GetNameFromScale",`scaleName: ${i}`),i}static chooseAlogrithm(e,i){switch(o.debug("☑️ chooseAlogrithm",`currentIndexProvider: ${i?.AirQuality?.Comparison?.Yesterday?.IndexProvider}`),i?.AirQuality?.Comparison?.Yesterday?.IndexProvider){case"Calculate":return o.debug("✅ chooseAlogrithm",`algorithm: ${i?.AirQuality?.Calculate?.Algorithm}`),i?.AirQuality?.Calculate?.Algorithm;case"QWeather":case"ColorfulCloudsCN":return o.debug("✅ chooseAlogrithm","algorithm: WAQI_InstantCast_CN"),"WAQI_InstantCast_CN";case"WeatherKit":{const i=t.GetNameFromScale(e?.scale),n=t.Config.Scales;if(i===n.HJ6332012.weatherKitScale.name)return o.debug("✅ chooseAlogrithm","algorithm: WAQI_InstantCast_CN"),"WAQI_InstantCast_CN";if(i===n.EPA_NowCast.weatherKitScale.name)return o.debug("✅ chooseAlogrithm","algorithm: WAQI_InstantCast_US"),"WAQI_InstantCast_US";return[n.EU_EAQI.weatherKitScale.name,n.UBA.weatherKitScale.name].includes(i)?(o.debug("✅ chooseAlogrithm",`algorithm: ${i}`),i):(o.error("chooseAlogrithm","没有找到合适的内置算法"),"")}default:return o.error("chooseAlogrithm","未知的currentIndexProvider"),""}}static appendScaleToProviderName(e,i){const n=e?.metadata?.providerName;if(!n)return"";const a=n.split("\n"),s=a[0].trim(),r=a.length>1?`\n${a.slice(1).join("\n")}`:"";let o="";switch(s){case"和风天气":o="（国标，12年2月版）";break;case"彩云天气":o=`（${e?.scale===t.ToWeatherKitScale(t.Config.Scales.EPA_NowCast.weatherKitScale)?"美标，18年9月版":"国标，12年2月版"}）`;break;case"iRingo":switch(i?.AirQuality?.Calculate?.Algorithm){case"EU_EAQI":o=" (ETC HE Report 2024/17)";break;case"WAQI_InstantCast_US":o=" (WAQI InstantCast with EPA-454/B-24-002)";break;case"WAQI_InstantCast_CN":o=" (InstantCast with HJ 633—2012)";break;case"WAQI_InstantCast_CN_25_DRAFT":o=" (InstantCast with HJ 633 2025 DRAFT)";break;default:o=" (FB001846)"}}return`${s}${o}${r}`}static#s(e,i,n,a){if(!n)return o.info("PollutantsToIndexes",`当前标准不使用污染物${i}计算指数，保留浓度并将index标记为-1`),-1;const{add:s,subtract:r,multiply:d,divide:c}=v;o.debug(`${i}: ${e.amount} ${a[e.units]??e.units}`);const u=n.ranges.min.amounts[0];if(e.amount<u)return o.error("PollutantsToIndexes",`${i}的含量无效：${e.amount} ${a[n.units]}需要 >= ${u}`),n.ranges.min.indexes[0];const l=e.amount>n.ranges.max.amounts[1];l&&(o.warn("PollutantsToIndexes",`检测到爆表指数！${i}：${e.amount} ${a[n.units]}`),o.warn("PollutantsToIndexes","注意身体！"));const{indexes:p,amounts:h}=l?n.ranges.max:n.ranges.value.find(({amounts:i})=>{const[n,a]=i;return t.#t(e.amount,n)>=n&&t.#t(e.amount,a)<=a});o.debug("indexes:",p,"amounts:",h);const[b,m]=p,[y,f]=h;return s(d(c(r(m,b),r(f,y)),r(e.amount,y)),e.amount>f?m:b)}static#r(e,i){return e.map(e=>{const n=t.#s(e,e.pollutantType,i?.[e.pollutantType],t.Config.Units.Friendly);return e.index=n,e})}static PollutantsToIndexes(e,i,n={}){const a=t.Config.Scales[i];if(!a)return o.error("PollutantsToIndexes",`Unsupported scale: ${i}`),[];const s=n?.stpConversionFactors,r=Array.isArray(e)?e.map(t=>({...t})):[],d=s?t.ConvertUnits(r,s,a.pollutants):r;return t.#r(d,a.pollutants)}static PrimaryPollutant(e,i){o.debug("☑️ PrimaryPollutant");const n={pollutantType:"NOT_AVAILABLE",index:-1,categoryIndex:-1};if(!Array.isArray(e)||0===e.length)return o.debug("pollutants:",e),o.error("PrimaryPollutant","pollutants无效"),n;const a=e.filter(({index:t})=>Number.isFinite(t)&&t>=0).map(e=>({...e,categoryIndex:t.CategoryIndex(e.index,i)})).filter(({categoryIndex:t})=>Number.isFinite(t)&&t>=0).sort((t,e)=>e.index-t.index);if(0===a.length)return o.debug("pollutants:",e,"indexesWithCategory:",a),o.error("PrimaryPollutant","找不到有效的index"),n;const s=a.reduce((t,{categoryIndex:e})=>e>t?e:t,Number.NEGATIVE_INFINITY),r=a.filter(({categoryIndex:t})=>t===s);r.length>1&&(o.info("PrimaryPollutant",`检测到多个同级别的污染物，按最高指数选择主污染物，maxCategoryIndex：${s}`),r.map(({pollutantType:t,index:e})=>o.info("GetPrimaryPollutants",`${t}：${e}`)));const d=r[0];return o.debug("✅ PrimaryPollutant","primaryPollutant:",d),d}static#i(e,i,n={}){o.debug("☑️ PollutantsToAirQuality");const a=n?.stpConversionFactors,s=n?.allowOverRange??!0;if(!Array.isArray(e)||0===e.length)return o.debug("pollutants:",e),o.error("PollutantsToAirQuality","pollutants无效"),{metadata:{providerName:"iRingo",temporarilyUnavailable:!0}};let r=[];a&&(r=t.ConvertUnits(e,a,i.pollutants)),r=t.#r(r,i.pollutants),o.debug("PollutantsToAirQuality","convertedPollutants:",r);const d=t.PrimaryPollutant(r,i.categories),c=i?.weatherKitScale?.maxIndex,u=s||!Number.isFinite(c)?Math.round(d.index):Math.min(Math.round(d.index),c);return o.debug("✅ PollutantsToAirQuality"),{index:u,isSignificant:d.categoryIndex>=i.categories.significantIndex,categoryIndex:d.categoryIndex,pollutants:r,metadata:{providerName:"iRingo",temporarilyUnavailable:!1},primaryPollutant:d.pollutantType,scale:t.ToWeatherKitScale(i.weatherKitScale)}}static#n(e,i,n={}){if(o.info("☑️ PollutantsToAQHI"),!Array.isArray(e)||0===e.length)return o.debug(`pollutants: ${JSON.stringify(e)}`),o.error("PollutantsToAQHI","pollutants无效"),{metadata:{providerName:"iRingo",temporarilyUnavailable:!0}};const a=n?.stpConversionFactors,{ugm3:s}=t.Config.Units.WeatherKit,r=a?t.ConvertUnits(e,a,i.pollutants):e,d=t=>{const e=r.find(({pollutantType:e})=>e===t);return e?e.units!==s?(o.warn("PollutantsToAQHI",`${t} 单位不是 µg/m³（${e.units}），跳过`),null):e.amount:null},{betas:c}=i,u=(t,e)=>null===e||e<0?0:100*(Math.exp(t*e)-1),l=u(c.NO2||0,d("NO2")),p=u(c.SO2||0,d("SO2")),h=u(c.O3||0,d("OZONE")),b=u(c.PM10||0,d("PM10")),m=u(c.PM2_5||0,d("PM2_5")),y=Math.max(b,m),f=l+p+h+y;o.info("PollutantsToAQHI",`%AR: NO2=${l.toFixed(4)}, SO2=${p.toFixed(4)}, O3=${h.toFixed(4)}, PM=${y.toFixed(4)} (PM10=${b.toFixed(4)}, PM2.5=${m.toFixed(4)}), total=${f.toFixed(4)}`),r.forEach(t=>{switch(t.pollutantType){case"NO2":t.index=l;break;case"SO2":t.index=p;break;case"OZONE":t.index=h;break;case"PM10":t.index=b;break;case"PM2_5":t.index=m;break;default:t.index=-1}});const _=t.CategoryIndex(f,i.categories),g=r.reduce((t,e)=>e.index>t.index?e:t,{pollutantType:"NOT_AVAILABLE",index:-1});return o.info("✅ PollutantsToAQHI",`AQHI: ${_}, primaryPollutant: ${g.pollutantType}`),{index:f,isSignificant:_>=i.categories.significantIndex,categoryIndex:_,pollutants:r,metadata:{providerName:"iRingo",temporarilyUnavailable:!1},primaryPollutant:g.pollutantType,scale:t.ToWeatherKitScale(i.weatherKitScale)}}static#a(e,i,n={}){if(o.info("☑️ PollutantsToAQHIMulti"),!Array.isArray(e)||0===e.length)return o.debug(`pollutants: ${JSON.stringify(e)}`),o.error("PollutantsToAQHIMulti","pollutants无效"),{metadata:{providerName:"iRingo",temporarilyUnavailable:!0}};const a=n?.stpConversionFactors,{ugm3:s}=t.Config.Units.WeatherKit,r=a?t.ConvertUnits(e,a,i.pollutants):e,d=t=>{const e=r.find(({pollutantType:e})=>e===t);return e?e.units!==s?(o.warn("PollutantsToAQHIMulti",`${t} 单位不是 µg/m³（${e.units}），跳过`),null):e.amount:null},{beta:c,weights:u}=i,l={OZONE:(u.O3||0)*Math.max(d("OZONE")||0,0),NO2:(u.NO2||0)*Math.max(d("NO2")||0,0),PM10:(u.PM10||0)*Math.max(d("PM10")||0,0),PM2_5:(u.PM2_5||0)*Math.max(d("PM2_5")||0,0),SO2:(u.SO2||0)*Math.max(d("SO2")||0,0)},p=l.PM10>0&&(l.PM2_5<=0||l.PM10>1.2*l.PM2_5),h=p?l.PM10:l.PM2_5,b=l.OZONE+l.NO2+l.SO2+h,m=(c||0)*b;o.info("PollutantsToAQHIMulti",`risk: O3=${l.OZONE.toFixed(4)}, NO2=${l.NO2.toFixed(4)}, PM10=${l.PM10.toFixed(4)}, PM2.5=${l.PM2_5.toFixed(4)}, usePM10=${p}, SO2=${l.SO2.toFixed(4)}, totalWeighted=${b.toFixed(4)}, totalRisk=${m.toFixed(4)}`),r.forEach(t=>{switch(t.pollutantType){case"OZONE":t.index=l.OZONE;break;case"NO2":t.index=l.NO2;break;case"PM10":t.index=l.PM10;break;case"PM2_5":t.index=l.PM2_5;break;case"SO2":t.index=l.SO2;break;default:t.index=-1}});const y=t.CategoryIndex(m,i.categories),f=r.reduce((t,e)=>e.index>t.index?e:t,{pollutantType:"NOT_AVAILABLE",index:-1});return o.info("✅ PollutantsToAQHIMulti",`AQHI: ${y}, primaryPollutant: ${f.pollutantType}`),{index:m,isSignificant:y>=i.categories.significantIndex,categoryIndex:y,pollutants:r,metadata:{providerName:"iRingo",temporarilyUnavailable:!1},primaryPollutant:f.pollutantType,scale:t.ToWeatherKitScale(i.weatherKitScale)}}static Config={Scales:{UBA:{weatherKitScale:{name:"UBA",version:"2414"},categories:{significantIndex:4,ranges:[{categoryIndex:1,indexes:[0,.99]},{categoryIndex:2,indexes:[1,1.99]},{categoryIndex:3,indexes:[2,2.99]},{categoryIndex:4,indexes:[3,3.99]},{categoryIndex:5,indexes:[4,Number.POSITIVE_INFINITY]}]},pollutants:{NO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,.99],amounts:[0,10]},max:{indexes:[3,3.99],amounts:[61,100]},value:[{indexes:[0,.99],amounts:[0,10]},{indexes:[1,1.99],amounts:[11,30]},{indexes:[2,2.99],amounts:[31,60]},{indexes:[3,3.99],amounts:[61,100]},{indexes:[4,Number.POSITIVE_INFINITY],amounts:[101,Number.POSITIVE_INFINITY]}]}},PM10:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,.99],amounts:[0,9]},max:{indexes:[3,3.99],amounts:[55,90]},value:[{indexes:[0,.99],amounts:[0,9]},{indexes:[1,1.99],amounts:[10,27]},{indexes:[2,2.99],amounts:[28,54]},{indexes:[3,3.99],amounts:[55,90]},{indexes:[4,Number.POSITIVE_INFINITY],amounts:[91,Number.POSITIVE_INFINITY]}]}},PM2_5:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,.99],amounts:[0,5]},max:{indexes:[3,3.99],amounts:[31,50]},value:[{indexes:[0,.99],amounts:[0,5]},{indexes:[1,1.99],amounts:[6,15]},{indexes:[2,2.99],amounts:[16,30]},{indexes:[3,3.99],amounts:[31,50]},{indexes:[4,Number.POSITIVE_INFINITY],amounts:[51,Number.POSITIVE_INFINITY]}]}},OZONE:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,.99],amounts:[0,24]},max:{indexes:[3,3.99],amounts:[145,240]},value:[{indexes:[0,.99],amounts:[0,24]},{indexes:[1,1.99],amounts:[25,72]},{indexes:[2,2.99],amounts:[73,144]},{indexes:[3,3.99],amounts:[145,240]},{indexes:[4,Number.POSITIVE_INFINITY],amounts:[241,Number.POSITIVE_INFINITY]}]}},SO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,.99],amounts:[0,10]},max:{indexes:[3,3.99],amounts:[61,100]},value:[{indexes:[0,.99],amounts:[0,10]},{indexes:[1,1.99],amounts:[11,30]},{indexes:[2,2.99],amounts:[31,60]},{indexes:[3,3.99],amounts:[61,100]},{indexes:[4,Number.POSITIVE_INFINITY],amounts:[101,Number.POSITIVE_INFINITY]}]}}}},EU_EAQI:{weatherKitScale:{name:"EU.EAQI",version:"2414",maxIndex:60},categories:{significantIndex:4,ranges:[{categoryIndex:1,indexes:[0,9]},{categoryIndex:2,indexes:[10,19]},{categoryIndex:3,indexes:[20,29]},{categoryIndex:4,indexes:[30,39]},{categoryIndex:5,indexes:[40,49]},{categoryIndex:6,indexes:[50,Number.POSITIVE_INFINITY]}]},pollutants:{PM2_5:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,9],amounts:[0,5]},max:{indexes:[40,49],amounts:[91,140]},value:[{indexes:[0,9],amounts:[0,5]},{indexes:[10,19],amounts:[6,15]},{indexes:[20,29],amounts:[16,50]},{indexes:[30,39],amounts:[51,90]},{indexes:[40,49],amounts:[91,140]},{indexes:[50,Number.POSITIVE_INFINITY],amounts:[141,Number.POSITIVE_INFINITY]}]}},PM10:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,9],amounts:[0,15]},max:{indexes:[40,49],amounts:[196,270]},value:[{indexes:[0,9],amounts:[0,15]},{indexes:[10,19],amounts:[16,45]},{indexes:[20,29],amounts:[46,120]},{indexes:[30,39],amounts:[121,195]},{indexes:[40,49],amounts:[196,270]},{indexes:[50,Number.POSITIVE_INFINITY],amounts:[271,Number.POSITIVE_INFINITY]}]}},OZONE:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,9],amounts:[0,60]},max:{indexes:[40,49],amounts:[161,180]},value:[{indexes:[0,9],amounts:[0,60]},{indexes:[10,19],amounts:[61,100]},{indexes:[20,29],amounts:[101,120]},{indexes:[30,39],amounts:[121,160]},{indexes:[40,49],amounts:[161,180]},{indexes:[50,Number.POSITIVE_INFINITY],amounts:[181,Number.POSITIVE_INFINITY]}]}},NO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,9],amounts:[0,10]},max:{indexes:[40,49],amounts:[101,150]},value:[{indexes:[0,9],amounts:[0,10]},{indexes:[10,19],amounts:[11,25]},{indexes:[20,29],amounts:[26,60]},{indexes:[30,39],amounts:[61,100]},{indexes:[40,49],amounts:[101,150]},{indexes:[50,Number.POSITIVE_INFINITY],amounts:[151,Number.POSITIVE_INFINITY]}]}},SO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,9],amounts:[0,20]},max:{indexes:[40,49],amounts:[191,275]},value:[{indexes:[0,9],amounts:[0,20]},{indexes:[10,19],amounts:[21,40]},{indexes:[20,29],amounts:[41,125]},{indexes:[30,39],amounts:[126,190]},{indexes:[40,49],amounts:[191,275]},{indexes:[50,Number.POSITIVE_INFINITY],amounts:[276,Number.MAX_VALUE]}]}}}},HJ6332012:{weatherKitScale:{name:"HJ6332012",version:"2604"},categories:{significantIndex:3,ranges:[{categoryIndex:1,indexes:[0,50]},{categoryIndex:2,indexes:[51,100]},{categoryIndex:3,indexes:[101,150]},{categoryIndex:4,indexes:[151,200]},{categoryIndex:5,indexes:[201,300]},{categoryIndex:6,indexes:[301,500]}]},pollutants:{SO2_24H:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,50]},max:{indexes:[401,500],amounts:[2101,2620]},value:[{indexes:[0,50],amounts:[0,50]},{indexes:[51,100],amounts:[51,150]},{indexes:[101,150],amounts:[151,475]},{indexes:[151,200],amounts:[476,800]},{indexes:[201,300],amounts:[801,1600]},{indexes:[301,400],amounts:[1601,2100]},{indexes:[401,500],amounts:[2101,2620]}]}},SO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,150]},max:{indexes:[151,200],amounts:[651,800]},value:[{indexes:[0,50],amounts:[0,150]},{indexes:[51,100],amounts:[151,500]},{indexes:[101,150],amounts:[501,650]},{indexes:[151,200],amounts:[651,800]}]}},NO2_24H:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,40]},max:{indexes:[401,500],amounts:[751,940]},value:[{indexes:[0,50],amounts:[0,40]},{indexes:[51,100],amounts:[41,80]},{indexes:[101,150],amounts:[81,180]},{indexes:[151,200],amounts:[181,280]},{indexes:[201,300],amounts:[281,565]},{indexes:[301,400],amounts:[566,750]},{indexes:[401,500],amounts:[751,940]}]}},NO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,100]},max:{indexes:[401,500],amounts:[3091,3840]},value:[{indexes:[0,50],amounts:[0,100]},{indexes:[51,100],amounts:[101,200]},{indexes:[101,150],amounts:[201,700]},{indexes:[151,200],amounts:[701,1200]},{indexes:[201,300],amounts:[1201,2340]},{indexes:[301,400],amounts:[2341,3090]},{indexes:[401,500],amounts:[3091,3840]}]}},PM10_24H:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,50]},max:{indexes:[401,500],amounts:[501,600]},value:[{indexes:[0,50],amounts:[0,50]},{indexes:[51,100],amounts:[51,150]},{indexes:[101,150],amounts:[151,250]},{indexes:[151,200],amounts:[251,350]},{indexes:[201,300],amounts:[351,420]},{indexes:[301,400],amounts:[421,500]},{indexes:[401,500],amounts:[501,600]}]}},CO_24H:{units:"MILLIGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,2]},max:{indexes:[401,500],amounts:[49,60]},value:[{indexes:[0,50],amounts:[0,2]},{indexes:[51,100],amounts:[3,4]},{indexes:[101,150],amounts:[5,14]},{indexes:[151,200],amounts:[15,24]},{indexes:[201,300],amounts:[25,36]},{indexes:[301,400],amounts:[37,48]},{indexes:[401,500],amounts:[49,60]}]}},CO:{units:"MILLIGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,5]},max:{indexes:[401,500],amounts:[121,150]},value:[{indexes:[0,50],amounts:[0,5]},{indexes:[51,100],amounts:[6,10]},{indexes:[101,150],amounts:[11,35]},{indexes:[151,200],amounts:[36,60]},{indexes:[201,300],amounts:[61,90]},{indexes:[301,400],amounts:[91,120]},{indexes:[401,500],amounts:[121,150]}]}},OZONE:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,160]},max:{indexes:[401,500],amounts:[1001,1200]},value:[{indexes:[0,50],amounts:[0,160]},{indexes:[51,100],amounts:[161,200]},{indexes:[101,150],amounts:[201,300]},{indexes:[151,200],amounts:[301,400]},{indexes:[201,300],amounts:[401,800]},{indexes:[301,400],amounts:[801,1e3]},{indexes:[401,500],amounts:[1001,1200]}]}},OZONE_8H:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,100]},max:{indexes:[201,300],amounts:[266,800]},value:[{indexes:[0,50],amounts:[0,100]},{indexes:[51,100],amounts:[101,160]},{indexes:[101,150],amounts:[161,215]},{indexes:[151,200],amounts:[216,265]},{indexes:[201,300],amounts:[266,800]}]}},PM2_5_24H:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,35]},max:{indexes:[401,500],amounts:[351,500]},value:[{indexes:[0,50],amounts:[0,35]},{indexes:[51,100],amounts:[36,75]},{indexes:[101,150],amounts:[76,115]},{indexes:[151,200],amounts:[116,150]},{indexes:[201,300],amounts:[151,250]},{indexes:[301,400],amounts:[251,350]},{indexes:[401,500],amounts:[351,500]}]}}}},HJ6332025_DRAFT:{weatherKitScale:{name:"HJ6332012",version:"2604"},categories:{significantIndex:3,ranges:[{categoryIndex:1,indexes:[1,50]},{categoryIndex:2,indexes:[51,100]},{categoryIndex:3,indexes:[101,150]},{categoryIndex:4,indexes:[151,200]},{categoryIndex:5,indexes:[201,300]},{categoryIndex:6,indexes:[301,500]}]},pollutants:{SO2_24H:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,50]},max:{indexes:[401,500],amounts:[2101,2620]},value:[{indexes:[0,50],amounts:[0,50]},{indexes:[51,100],amounts:[51,150]},{indexes:[101,150],amounts:[151,475]},{indexes:[151,200],amounts:[476,800]},{indexes:[201,300],amounts:[801,1600]},{indexes:[301,400],amounts:[1601,2100]},{indexes:[401,500],amounts:[2101,2620]}]}},SO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,150]},max:{indexes:[200,200],amounts:[801,Number.POSITIVE_INFINITY]},value:[{indexes:[0,50],amounts:[0,150]},{indexes:[51,100],amounts:[151,500]},{indexes:[101,150],amounts:[501,650]},{indexes:[151,200],amounts:[651,800]},{indexes:[200,200],amounts:[801,Number.POSITIVE_INFINITY]}]}},NO2_24H:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,40]},max:{indexes:[401,500],amounts:[751,940]},value:[{indexes:[0,50],amounts:[0,40]},{indexes:[51,100],amounts:[41,80]},{indexes:[101,150],amounts:[81,180]},{indexes:[151,200],amounts:[181,280]},{indexes:[201,300],amounts:[281,565]},{indexes:[301,400],amounts:[566,750]},{indexes:[401,500],amounts:[751,940]}]}},NO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,100]},max:{indexes:[401,500],amounts:[3091,3840]},value:[{indexes:[0,50],amounts:[0,100]},{indexes:[51,100],amounts:[101,200]},{indexes:[101,150],amounts:[201,700]},{indexes:[151,200],amounts:[701,1200]},{indexes:[201,300],amounts:[1201,2340]},{indexes:[301,400],amounts:[2341,3090]},{indexes:[401,500],amounts:[3091,3840]}]}},CO_24H:{units:"MILLIGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,2]},max:{indexes:[401,500],amounts:[49,60]},value:[{indexes:[0,50],amounts:[0,2]},{indexes:[51,100],amounts:[3,4]},{indexes:[101,150],amounts:[5,14]},{indexes:[151,200],amounts:[15,24]},{indexes:[201,300],amounts:[25,36]},{indexes:[301,400],amounts:[37,48]},{indexes:[401,500],amounts:[49,60]}]}},CO:{units:"MILLIGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,5]},max:{indexes:[401,500],amounts:[121,150]},value:[{indexes:[0,50],amounts:[0,5]},{indexes:[51,100],amounts:[6,10]},{indexes:[101,150],amounts:[11,35]},{indexes:[151,200],amounts:[36,60]},{indexes:[201,300],amounts:[61,90]},{indexes:[301,400],amounts:[91,120]},{indexes:[401,500],amounts:[121,150]}]}},OZONE_8H:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,100]},max:{indexes:[300,300],amounts:[801,Number.POSITIVE_INFINITY]},value:[{indexes:[0,50],amounts:[0,100]},{indexes:[51,100],amounts:[101,160]},{indexes:[101,150],amounts:[161,215]},{indexes:[151,200],amounts:[216,265]},{indexes:[201,300],amounts:[266,800]},{indexes:[300,300],amounts:[801,Number.POSITIVE_INFINITY]}]}},OZONE:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,160]},max:{indexes:[401,500],amounts:[1001,1200]},value:[{indexes:[0,50],amounts:[0,160]},{indexes:[51,100],amounts:[161,200]},{indexes:[101,150],amounts:[201,300]},{indexes:[151,200],amounts:[301,400]},{indexes:[201,300],amounts:[401,800]},{indexes:[301,400],amounts:[801,1e3]},{indexes:[401,500],amounts:[1001,1200]}]}},PM10_24H:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,50]},max:{indexes:[401,500],amounts:[501,600]},value:[{indexes:[0,50],amounts:[0,50]},{indexes:[51,100],amounts:[51,120]},{indexes:[101,150],amounts:[121,250]},{indexes:[151,200],amounts:[251,350]},{indexes:[201,300],amounts:[351,420]},{indexes:[301,400],amounts:[421,500]},{indexes:[401,500],amounts:[501,600]}]}},PM2_5_24H:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,35]},max:{indexes:[401,500],amounts:[351,500]},value:[{indexes:[0,50],amounts:[0,30]},{indexes:[51,100],amounts:[31,60]},{indexes:[101,150],amounts:[61,115]},{indexes:[151,200],amounts:[116,150]},{indexes:[201,300],amounts:[151,250]},{indexes:[301,400],amounts:[251,350]},{indexes:[401,500],amounts:[351,500]}]}}}},EPA_NowCast:{weatherKitScale:{name:"EPA_NowCast",version:"2414"},categories:{significantIndex:3,ranges:[{categoryIndex:1,indexes:[0,50]},{categoryIndex:2,indexes:[51,100]},{categoryIndex:3,indexes:[101,150]},{categoryIndex:4,indexes:[151,200]},{categoryIndex:5,indexes:[201,300]},{categoryIndex:6,indexes:[301,Number.POSITIVE_INFINITY]}]},pollutants:{OZONE_8H:{units:"PARTS_PER_MILLION",stpConversionFactor:1.96189649169881,ranges:{min:{indexes:[0,50],amounts:[0,.054]},max:{indexes:[201,300],amounts:[.106,.2]},value:[{indexes:[0,50],amounts:[0,.054]},{indexes:[51,100],amounts:[.055,.07]},{indexes:[101,150],amounts:[.071,.085]},{indexes:[151,200],amounts:[.086,.105]},{indexes:[201,300],amounts:[.106,.2]},{indexes:[301,Number.POSITIVE_INFINITY],amounts:[.201,Number.POSITIVE_INFINITY]}]}},OZONE:{units:"PARTS_PER_MILLION",stpConversionFactor:1.96189649169881,ranges:{min:{indexes:[101,150],amounts:[.125,.164]},max:{indexes:[301,500],amounts:[.405,.604]},value:[{indexes:[101,150],amounts:[.125,.164]},{indexes:[151,200],amounts:[.165,.204]},{indexes:[201,300],amounts:[.205,.404]},{indexes:[301,500],amounts:[.405,.604]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[.605,Number.POSITIVE_INFINITY]}]}},PM2_5_24H:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,9]},max:{indexes:[301,500],amounts:[225.5,325.4]},value:[{indexes:[0,50],amounts:[0,9]},{indexes:[51,100],amounts:[9.1,35.4]},{indexes:[101,150],amounts:[35.5,55.4]},{indexes:[151,200],amounts:[55.5,125.4]},{indexes:[201,300],amounts:[125.5,225.4]},{indexes:[301,500],amounts:[225.5,325.4]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[325.5,Number.POSITIVE_INFINITY]}]}},PM10_24H:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,54]},max:{indexes:[301,500],amounts:[425,604]},value:[{indexes:[0,50],amounts:[0,54]},{indexes:[51,100],amounts:[55,154]},{indexes:[101,150],amounts:[155,254]},{indexes:[151,200],amounts:[255,354]},{indexes:[201,300],amounts:[355,424]},{indexes:[301,500],amounts:[425,604]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[605,Number.POSITIVE_INFINITY]}]}},CO_8H:{units:"PARTS_PER_MILLION",stpConversionFactor:1.14491990608754,ranges:{min:{indexes:[0,50],amounts:[0,4.4]},max:{indexes:[301,500],amounts:[30.5,50.4]},value:[{indexes:[0,50],amounts:[0,4.4]},{indexes:[51,100],amounts:[4.5,9.4]},{indexes:[101,150],amounts:[9.5,12.4]},{indexes:[151,200],amounts:[12.5,15.4]},{indexes:[201,300],amounts:[15.5,30.4]},{indexes:[301,500],amounts:[30.5,50.4]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[50.5,Number.POSITIVE_INFINITY]}]}},SO2:{units:"PARTS_PER_BILLION",stpConversionFactor:2.618396263625692,ranges:{min:{indexes:[0,50],amounts:[0,35]},max:{indexes:[301,500],amounts:[605,1004]},value:[{indexes:[0,50],amounts:[0,35]},{indexes:[51,100],amounts:[36,75]},{indexes:[101,150],amounts:[76,185]},{indexes:[151,200],amounts:[186,304]},{indexes:[201,300],amounts:[305,604]},{indexes:[301,500],amounts:[605,1004]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[1005,Number.POSITIVE_INFINITY]}]}},NO2:{units:"PARTS_PER_BILLION",stpConversionFactor:1.880472698306222,ranges:{min:{indexes:[0,50],amounts:[0,53]},max:{indexes:[301,500],amounts:[1250,2049]},value:[{indexes:[0,50],amounts:[0,53]},{indexes:[51,100],amounts:[54,100]},{indexes:[101,150],amounts:[101,360]},{indexes:[151,200],amounts:[361,649]},{indexes:[201,300],amounts:[650,1249]},{indexes:[301,500],amounts:[1250,2049]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[2050,Number.POSITIVE_INFINITY]}]}}}},WAQI_InstantCast_US:{weatherKitScale:{name:"EPA_NowCast",version:"2414",maxIndex:500},categories:{significantIndex:3,ranges:[{categoryIndex:1,indexes:[0,50]},{categoryIndex:2,indexes:[51,100]},{categoryIndex:3,indexes:[101,150]},{categoryIndex:4,indexes:[151,200]},{categoryIndex:5,indexes:[201,300]},{categoryIndex:6,indexes:[301,Number.POSITIVE_INFINITY]}]},pollutants:{OZONE:{units:"PARTS_PER_BILLION",stpConversionFactor:1.96189649169881,ranges:{min:{indexes:[0,50],amounts:[0,62.5]},max:{indexes:[301,500],amounts:[405.1,605]},value:[{indexes:[0,50],amounts:[0,62.5]},{indexes:[51,100],amounts:[62.6,101.5]},{indexes:[101,150],amounts:[101.6,152.5]},{indexes:[151,200],amounts:[152.6,205]},{indexes:[201,300],amounts:[205.1,405]},{indexes:[301,500],amounts:[405.1,605]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[605.1,Number.POSITIVE_INFINITY]}]}},PM2_5:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,9]},max:{indexes:[301,500],amounts:[225.5,325.4]},value:[{indexes:[0,50],amounts:[0,9]},{indexes:[51,100],amounts:[9.1,35.4]},{indexes:[101,150],amounts:[35.5,55.4]},{indexes:[151,200],amounts:[55.5,125.4]},{indexes:[201,300],amounts:[125.5,225.4]},{indexes:[301,500],amounts:[225.5,325.4]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[325.5,Number.POSITIVE_INFINITY]}]}},PM10:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,54]},max:{indexes:[301,500],amounts:[425,604]},value:[{indexes:[0,50],amounts:[0,54]},{indexes:[51,100],amounts:[55,154]},{indexes:[101,150],amounts:[155,254]},{indexes:[151,200],amounts:[255,354]},{indexes:[201,300],amounts:[355,424]},{indexes:[301,500],amounts:[425,604]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[605,Number.POSITIVE_INFINITY]}]}},CO:{units:"PARTS_PER_BILLION",stpConversionFactor:1.144511152104645,ranges:{min:{indexes:[0,50],amounts:[0,4400]},max:{indexes:[301,500],amounts:[30401,50400]},value:[{indexes:[0,50],amounts:[0,4400]},{indexes:[51,100],amounts:[4401,9400]},{indexes:[101,150],amounts:[9401,12400]},{indexes:[151,200],amounts:[12401,15400]},{indexes:[201,300],amounts:[15401,30400]},{indexes:[301,500],amounts:[30401,50400]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[50401,Number.POSITIVE_INFINITY]}]}},SO2:{units:"PARTS_PER_BILLION",stpConversionFactor:2.618396263625692,ranges:{min:{indexes:[0,50],amounts:[0,35]},max:{indexes:[301,500],amounts:[605,1004]},value:[{indexes:[0,50],amounts:[0,35]},{indexes:[51,100],amounts:[36,75]},{indexes:[101,150],amounts:[76,185]},{indexes:[151,200],amounts:[186,304]},{indexes:[201,300],amounts:[305,604]},{indexes:[301,500],amounts:[605,1004]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[1005,Number.POSITIVE_INFINITY]}]}},NO2:{units:"PARTS_PER_BILLION",stpConversionFactor:1.880472698306222,ranges:{min:{indexes:[0,50],amounts:[0,53]},max:{indexes:[301,500],amounts:[1250,2049]},value:[{indexes:[0,50],amounts:[0,53]},{indexes:[51,100],amounts:[54,100]},{indexes:[101,150],amounts:[101,360]},{indexes:[151,200],amounts:[361,649]},{indexes:[201,300],amounts:[650,1249]},{indexes:[301,500],amounts:[1250,2049]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[2050,Number.POSITIVE_INFINITY]}]}}}},WAQI_InstantCast_CN:{weatherKitScale:{name:"HJ6332012",version:"2604",maxIndex:500},categories:{significantIndex:3,ranges:[{categoryIndex:1,indexes:[0,50]},{categoryIndex:2,indexes:[51,100]},{categoryIndex:3,indexes:[101,150]},{categoryIndex:4,indexes:[151,200]},{categoryIndex:5,indexes:[201,300]},{categoryIndex:6,indexes:[301,Number.POSITIVE_INFINITY]}]},pollutants:{SO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,150]},max:{indexes:[401,500],amounts:[2101,2620]},value:[{indexes:[0,50],amounts:[0,150]},{indexes:[51,100],amounts:[151,500]},{indexes:[101,150],amounts:[501,650]},{indexes:[151,200],amounts:[651,800]},{indexes:[201,300],amounts:[801,1600]},{indexes:[301,400],amounts:[1601,2100]},{indexes:[401,500],amounts:[2101,2620]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[2602,Number.POSITIVE_INFINITY]}]}},NO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,100]},max:{indexes:[401,500],amounts:[3091,3840]},value:[{indexes:[0,50],amounts:[0,100]},{indexes:[51,100],amounts:[101,200]},{indexes:[101,150],amounts:[201,700]},{indexes:[151,200],amounts:[701,1200]},{indexes:[201,300],amounts:[1201,2340]},{indexes:[301,400],amounts:[2341,3090]},{indexes:[401,500],amounts:[3091,3840]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[3841,Number.POSITIVE_INFINITY]}]}},PM10:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,50]},max:{indexes:[401,500],amounts:[501,600]},value:[{indexes:[0,50],amounts:[0,50]},{indexes:[51,100],amounts:[51,150]},{indexes:[101,150],amounts:[151,250]},{indexes:[151,200],amounts:[251,350]},{indexes:[201,300],amounts:[351,420]},{indexes:[301,400],amounts:[421,500]},{indexes:[401,500],amounts:[501,600]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[601,Number.POSITIVE_INFINITY]}]}},CO:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,5e3]},max:{indexes:[401,500],amounts:[120001,15e4]},value:[{indexes:[0,50],amounts:[0,5e3]},{indexes:[51,100],amounts:[5001,1e4]},{indexes:[101,150],amounts:[10001,35e3]},{indexes:[151,200],amounts:[35001,6e4]},{indexes:[201,300],amounts:[60001,9e4]},{indexes:[301,400],amounts:[90001,12e4]},{indexes:[401,500],amounts:[120001,15e4]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[150001,Number.POSITIVE_INFINITY]}]}},OZONE:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,160]},max:{indexes:[401,500],amounts:[1001,1200]},value:[{indexes:[0,50],amounts:[0,160]},{indexes:[51,100],amounts:[161,200]},{indexes:[101,150],amounts:[201,300]},{indexes:[151,200],amounts:[301,400]},{indexes:[201,300],amounts:[401,800]},{indexes:[301,400],amounts:[801,1e3]},{indexes:[401,500],amounts:[1001,1200]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[1201,Number.POSITIVE_INFINITY]}]}},PM2_5:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,35]},max:{indexes:[401,500],amounts:[351,500]},value:[{indexes:[0,50],amounts:[0,35]},{indexes:[51,100],amounts:[36,75]},{indexes:[101,150],amounts:[76,115]},{indexes:[151,200],amounts:[116,150]},{indexes:[201,300],amounts:[151,250]},{indexes:[301,400],amounts:[251,350]},{indexes:[401,500],amounts:[351,500]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[501,Number.POSITIVE_INFINITY]}]}}}},WAQI_InstantCast_CN_25_DRAFT:{weatherKitScale:{name:"HJ6332012",version:"2604",maxIndex:500},categories:{significantIndex:3,ranges:[{categoryIndex:1,indexes:[1,50]},{categoryIndex:2,indexes:[51,100]},{categoryIndex:3,indexes:[101,150]},{categoryIndex:4,indexes:[151,200]},{categoryIndex:5,indexes:[201,300]},{categoryIndex:6,indexes:[301,Number.POSITIVE_INFINITY]}]},pollutants:{SO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,150]},max:{indexes:[200,200],amounts:[801,Number.POSITIVE_INFINITY]},value:[{indexes:[0,50],amounts:[0,150]},{indexes:[51,100],amounts:[151,500]},{indexes:[101,150],amounts:[501,650]},{indexes:[151,200],amounts:[651,800]},{indexes:[200,200],amounts:[801,Number.POSITIVE_INFINITY]}]}},NO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,100]},max:{indexes:[401,500],amounts:[3091,3840]},value:[{indexes:[0,50],amounts:[0,100]},{indexes:[51,100],amounts:[101,200]},{indexes:[101,150],amounts:[201,700]},{indexes:[151,200],amounts:[701,1200]},{indexes:[201,300],amounts:[1201,2340]},{indexes:[301,400],amounts:[2341,3090]},{indexes:[401,500],amounts:[3091,3840]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[3841,Number.POSITIVE_INFINITY]}]}},CO:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,5e3]},max:{indexes:[401,500],amounts:[120001,15e4]},value:[{indexes:[0,50],amounts:[0,5e3]},{indexes:[51,100],amounts:[5001,1e4]},{indexes:[101,150],amounts:[10001,35e3]},{indexes:[151,200],amounts:[35001,6e4]},{indexes:[201,300],amounts:[60001,9e4]},{indexes:[301,400],amounts:[90001,12e4]},{indexes:[401,500],amounts:[120001,15e4]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[150001,Number.POSITIVE_INFINITY]}]}},OZONE:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,160]},max:{indexes:[401,500],amounts:[1001,1200]},value:[{indexes:[0,50],amounts:[0,160]},{indexes:[51,100],amounts:[161,200]},{indexes:[101,150],amounts:[201,300]},{indexes:[151,200],amounts:[301,400]},{indexes:[201,300],amounts:[401,800]},{indexes:[301,400],amounts:[801,1e3]},{indexes:[401,500],amounts:[1001,1200]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[1201,Number.POSITIVE_INFINITY]}]}},PM10:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,50]},max:{indexes:[401,500],amounts:[501,600]},value:[{indexes:[0,50],amounts:[0,50]},{indexes:[51,100],amounts:[51,120]},{indexes:[101,150],amounts:[121,250]},{indexes:[151,200],amounts:[251,350]},{indexes:[201,300],amounts:[351,420]},{indexes:[301,400],amounts:[421,500]},{indexes:[401,500],amounts:[501,600]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[601,Number.POSITIVE_INFINITY]}]}},PM2_5:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1,ranges:{min:{indexes:[0,50],amounts:[0,35]},max:{indexes:[401,500],amounts:[351,500]},value:[{indexes:[0,50],amounts:[0,30]},{indexes:[51,100],amounts:[31,60]},{indexes:[101,150],amounts:[61,115]},{indexes:[151,200],amounts:[116,150]},{indexes:[201,300],amounts:[151,250]},{indexes:[301,400],amounts:[251,350]},{indexes:[401,500],amounts:[351,500]},{indexes:[501,Number.POSITIVE_INFINITY],amounts:[501,Number.POSITIVE_INFINITY]}]}}}},HK_AQHI:{weatherKitScale:{name:"HK.AQHI"},categories:{significantIndex:7,ranges:[{categoryIndex:1,indexes:[0,1.87]},{categoryIndex:2,indexes:[1.88,3.73]},{categoryIndex:3,indexes:[3.74,5.6]},{categoryIndex:4,indexes:[5.61,7.46]},{categoryIndex:5,indexes:[7.47,9.33]},{categoryIndex:6,indexes:[9.34,11.2]},{categoryIndex:7,indexes:[11.21,12.81]},{categoryIndex:8,indexes:[12.82,14.94]},{categoryIndex:9,indexes:[14.95,17.08]},{categoryIndex:10,indexes:[17.09,19.21]},{categoryIndex:11,indexes:[19.22,Number.POSITIVE_INFINITY]}]},betas:{NO2:.0004462559,SO2:.0001393235,O3:.0004888034,PM10:.0002821751,PM2_5:.0002180567},pollutants:{NO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},SO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},OZONE:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},PM10:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},PM2_5:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1}}},CA_AQHI:{weatherKitScale:{name:"CA.AQHI"},categories:{significantIndex:7,ranges:[{categoryIndex:1,indexes:[0,1.04]},{categoryIndex:2,indexes:[1.05,2.08]},{categoryIndex:3,indexes:[2.09,3.12]},{categoryIndex:4,indexes:[3.13,4.16]},{categoryIndex:5,indexes:[4.17,5.2]},{categoryIndex:6,indexes:[5.21,6.24]},{categoryIndex:7,indexes:[6.25,7.28]},{categoryIndex:8,indexes:[7.29,8.32]},{categoryIndex:9,indexes:[8.33,9.36]},{categoryIndex:10,indexes:[9.37,10.4]},{categoryIndex:11,indexes:[10.41,Number.POSITIVE_INFINITY]}]},betas:{NO2:871e-6,O3:537e-6,PM2_5:487e-6},pollutants:{NO2:{units:"PARTS_PER_BILLION",stpConversionFactor:-1},OZONE:{units:"PARTS_PER_BILLION",stpConversionFactor:-1},PM2_5:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1}}},CN_DEATH_AQHI:{weatherKitScale:{name:"CN.AQHI"},categories:{significantIndex:6,ranges:[{categoryIndex:1,indexes:[0,2.004]},{categoryIndex:2,indexes:[2.005,4.008]},{categoryIndex:3,indexes:[4.009,7.018]},{categoryIndex:4,indexes:[7.018,8.016]},{categoryIndex:5,indexes:[8.017,10.02]},{categoryIndex:6,indexes:[10.021,12.024]},{categoryIndex:7,indexes:[12.025,14.028]},{categoryIndex:8,indexes:[14.029,16.032]},{categoryIndex:9,indexes:[16.033,18.036]},{categoryIndex:10,indexes:[18.037,20.04]},{categoryIndex:11,indexes:[20.041,Number.POSITIVE_INFINITY]}]},betas:{NO2:9e-4,SO2:59e-5,O3:24e-5,PM2_5:22e-5},pollutants:{NO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},SO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},OZONE:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},PM2_5:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1}}},CN_DEATH_HK_AQHI:{weatherKitScale:{name:"CN.AQHI"},categories:{significantIndex:6,ranges:[{categoryIndex:1,indexes:[0,2.004]},{categoryIndex:2,indexes:[2.005,4.008]},{categoryIndex:3,indexes:[4.009,7.018]},{categoryIndex:4,indexes:[7.018,8.016]},{categoryIndex:5,indexes:[8.017,10.02]},{categoryIndex:6,indexes:[10.021,12.024]},{categoryIndex:7,indexes:[12.025,14.028]},{categoryIndex:8,indexes:[14.029,16.032]},{categoryIndex:9,indexes:[16.033,18.036]},{categoryIndex:10,indexes:[18.037,20.04]},{categoryIndex:11,indexes:[20.041,Number.POSITIVE_INFINITY]}]},betas:{NO2:9e-4,SO2:59e-5,O3:24e-5,PM10:.0002821751,PM2_5:.0002180567},pollutants:{NO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},SO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},OZONE:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},PM10:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},PM2_5:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1}}},AQHI_Multi_CN:{weatherKitScale:{name:"CA.AQHI"},categories:{significantIndex:7,ranges:[{categoryIndex:1,indexes:[0,5.8453]},{categoryIndex:2,indexes:[5.8454,11.6906]},{categoryIndex:3,indexes:[11.6907,17.536]},{categoryIndex:4,indexes:[17.5361,23.3812]},{categoryIndex:5,indexes:[23.3813,29.2265]},{categoryIndex:6,indexes:[29.2266,35.0718]},{categoryIndex:7,indexes:[35.0719,40.9171]},{categoryIndex:8,indexes:[40.9172,46.7624]},{categoryIndex:9,indexes:[46.7625,52.6077]},{categoryIndex:10,indexes:[52.6078,58.453]},{categoryIndex:11,indexes:[58.4531,Number.POSITIVE_INFINITY]}]},beta:.369991,weights:{O3:.271273,NO2:.390781,PM2_5:.120648,SO2:.217224},pollutants:{NO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},SO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},OZONE:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},PM2_5:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1}}},AQHI_Multi_CN_HK:{weatherKitScale:{name:"CA.AQHI"},categories:{significantIndex:7,ranges:[{categoryIndex:1,indexes:[0,5.8453]},{categoryIndex:2,indexes:[5.8454,11.6906]},{categoryIndex:3,indexes:[11.6907,17.536]},{categoryIndex:4,indexes:[17.5361,23.3812]},{categoryIndex:5,indexes:[23.3813,29.2265]},{categoryIndex:6,indexes:[29.2266,35.0718]},{categoryIndex:7,indexes:[35.0719,40.9171]},{categoryIndex:8,indexes:[40.9172,46.7624]},{categoryIndex:9,indexes:[46.7625,52.6077]},{categoryIndex:10,indexes:[52.6078,58.453]},{categoryIndex:11,indexes:[58.4531,Number.POSITIVE_INFINITY]}]},beta:.369991,weights:{O3:.271273,NO2:.390781,PM10:.156123,PM2_5:.120648,SO2:.217224},pollutants:{NO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},SO2:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},OZONE:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},PM10:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1},PM2_5:{units:"MICROGRAMS_PER_CUBIC_METER",stpConversionFactor:-1}}}},Pollutants:{co:"CO",no:"NO",no2:"NO2",so2:"SO2",o3:"OZONE",nox:"NOX",pm25:"PM2_5",pm10:"PM10",other:"NOT_AVAILABLE"},CompareCategoryIndexes:{BETTER:"BETTER",SAME:"SAME",UNKNOWN:"UNKNOWN",WORSE:"WORSE"},Units:{WeatherKit:{ugm3:"MICROGRAMS_PER_CUBIC_METER",mgm3:"MILLIGRAMS_PER_CUBIC_METER",ppb:"PARTS_PER_BILLION",ppm:"PARTS_PER_MILLION"},Friendly:{MICROGRAMS_PER_CUBIC_METER:"μg/m3",MILLIGRAMS_PER_CUBIC_METER:"mg/m3",PARTS_PER_BILLION:"ppb",PARTS_PER_MILLION:"ppm"}},STP_ConversionFactors:{US:{OZONE:1.96189649169881,SO2:2.618396263625692,NO2:1.880472698306222,CO:1.14491990608754,C6H6:3.192940861982224,NH3:.696148908267651,NO:1.226507201073285},EU:{OZONE:1.995358823128092,SO2:2.663055930411053,NO2:1.912546256182842,CO:1.164447791233157,C6H6:3.247400027289784,NH3:.708022503837626,NO:1.247426648473478}}};static ConvertUnit(e,i,n,a=-1,s=-1){o.debug("☑️ ConvertUnit");const r=t.Config.Units.Friendly;if(o.debug("Convert",e,"from",r[i],"with",a,"to",r[n],"with",s),e<0)return o.error("ConvertUnit",`Amount ${e} < 0`),-1;const d=Number(e.toFixed(15)),{ugm3:c,mgm3:u,ppb:l,ppm:p}=t.Config.Units.WeatherKit,h=[l,p],b=[...h,c,u];if(!b.includes(i)||!b.includes(n))return o.error("ConvertUnit","不支持的单位",`from: ${i}`,`to: ${n}`),-1;const m=h.includes(i),y=h.includes(n),f=m&&y;if(f&&a!==s){if(a<=0||s<=0)return o.error("ConvertUnit","无效的STP conversion factor",`fromStpConversionFactor: ${a}`,`toStpConversionFactor: ${s}`),-1;const e=t.ConvertUnit(d,i,c,a);return t.ConvertUnit(e,c,n,-1,s)}if(!f&&m&&a<=0)return o.error("ConvertUnit",`fromStpConversionFactor ${a} <= 0`),-1;if(!f&&y&&s<=0)return o.error("ConvertUnit",`toStpConversionFactor ${s} <= 0`),-1;const{multiply:_,divide:g}=v;switch(i){case p:switch(n){case p:return o.debug("✅ ConvertUnit"),d;case l:return o.debug("✅ ConvertUnit"),_(d,1e3);case u:return o.debug("✅ ConvertUnit"),_(d,a);case c:{const e=t.ConvertUnit(d,i,l);return o.debug("✅ ConvertUnit"),_(e,a)}default:return-1}case l:switch(n){case l:return o.debug("✅ ConvertUnit"),d;case p:return o.debug("✅ ConvertUnit"),_(d,.001);case u:{const e=t.ConvertUnit(d,i,p);return o.debug("✅ ConvertUnit"),_(e,a)}case c:return o.debug("✅ ConvertUnit"),_(d,a);default:return-1}case u:switch(n){case u:return o.debug("✅ ConvertUnit"),d;case c:return o.debug("✅ ConvertUnit"),_(d,1e3);case p:return o.debug("✅ ConvertUnit"),g(d,s);case l:{const e=t.ConvertUnit(d,i,c);return o.debug("✅ ConvertUnit"),g(e,s)}default:return-1}case c:switch(n){case c:return o.debug("✅ ConvertUnit"),d;case u:return o.debug("✅ ConvertUnit"),_(d,.001);case p:{const e=t.ConvertUnit(d,i,u);return o.debug("✅ ConvertUnit"),g(e,s)}case l:return o.debug("✅ ConvertUnit"),g(d,s);default:return-1}default:return-1}}};const w={"zh-Hant-HK":"空氣質素","zh-Hant-TW":"空氣品質","zh-Hans-CN":"空气质量","en-US":"Air Quality"},O={displayName:{"zh-Hans-CN":"空气质量指数","zh-Hant-HK":"空氣質量指數","en-US":"Air Quality Index"},shortDisplayName:{"zh-Hans-CN":"AQI","zh-Hant-HK":"AQI","en-US":"AQI"},longDisplayName:{"zh-Hans-CN":"中国 (HJ 633—2012)","zh-Hant-HK":"中國 (HJ 633—2012)","en-US":"China (HJ 633—2012)"},categories:[{range:[0,50],glyph:"aqi.low",colors:["#00E400"],categoryName:{"zh-Hans-CN":"优","zh-Hant-HK":"優","en-US":"Good"},recommendation:{"zh-Hans-CN":"空气质量令人满意，基本无空气污染。","zh-Hant-HK":"空氣質量令人滿意，基本無空氣污染。","en-US":"Air quality is satisfactory, and air pollution poses little or no risk."}},{range:[51,100],glyph:"aqi.low",colors:["#FFFF00"],categoryName:{"zh-Hans-CN":"良","zh-Hant-HK":"良","en-US":"Moderate"},recommendation:{"zh-Hans-CN":"空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响。","zh-Hant-HK":"空氣質量可接受，但某些污染物可能對極少數異常敏感人群健康有較弱影響。","en-US":"Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution."}},{range:[101,150],glyph:"aqi.medium",colors:["#FF7E00"],categoryName:{"zh-Hans-CN":"轻度污染","zh-Hant-HK":"輕度污染","en-US":"Unhealthy for Sensitive Groups"},recommendation:{"zh-Hans-CN":"敏感人群症状有轻度加剧，健康人群出现刺激症状。建议儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼。","zh-Hant-HK":"敏感人群症狀有輕度加劇，健康人群出現刺激症狀。建議兒童、老年人及心臟病、呼吸系統疾病患者應減少長時間、高強度的戶外鍛煉。","en-US":"Members of sensitive groups may experience health effects. The general public is less likely to be affected. Children, the elderly, and people with heart or respiratory diseases should reduce prolonged or heavy outdoor exertion."}},{range:[151,200],glyph:"aqi.high",colors:["#FF0000"],categoryName:{"zh-Hans-CN":"中度污染","zh-Hant-HK":"中度污染","en-US":"Unhealthy"},recommendation:{"zh-Hans-CN":"进一步加剧敏感人群症状，可能对心脏和呼吸系统有影响。儿童、老年人及心脏病、呼吸系统疾病患者应避免长时间、高强度的户外锻炼，一般人群适量减少户外运动。","zh-Hant-HK":"進一步加劇敏感人群症狀，可能對心臟和呼吸系統有影響。兒童、老年人及心臟病、呼吸系統疾病患者應避免長時間、高強度的戶外鍛煉，一般人群適量減少戶外運動。","en-US":"Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects. Children, the elderly, and people with heart or respiratory diseases should avoid prolonged or heavy outdoor exertion. Everyone else should reduce outdoor exertion."}},{range:[201,300],glyph:"aqi.high",colors:["#99004C"],categoryName:{"zh-Hans-CN":"重度污染","zh-Hant-HK":"重度污染","en-US":"Very Unhealthy"},recommendation:{"zh-Hans-CN":"心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状。儿童、老年人和病人应停留在室内，避免体力消耗，一般人群应避免户外活动。","zh-Hant-HK":"心臟病和肺病症狀顯著加劇，運動耐受力降低，健康人群普遍出現症狀。兒童、老年人和病人應停留在室內，避免體力消耗，一般人群應避免戶外活動。","en-US":"Health warnings of emergency conditions. The entire population is more likely to be affected. Children, the elderly, and the ill should stay indoors. Everyone else should avoid outdoor exertion."}},{range:[301,500],glyph:"aqi.high",colors:["#7E0023"],categoryName:{"zh-Hans-CN":"严重污染","zh-Hant-HK":"嚴重污染","en-US":"Hazardous"},recommendation:{"zh-Hans-CN":"健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病。儿童、老年人和病人应当留在室内，避免体力消耗。一般人群应避免户外活动。","zh-Hant-HK":"健康人群運動耐受力降低，有明顯強烈症狀，提前出現某些疾病。兒童、老年人和病人應當留在室內，避免體力消耗。一般人群應避免戶外活動。","en-US":"Health alert: everyone may experience more serious health effects. Children, the elderly, and the ill should remain indoors. Everyone else should avoid outdoor exertion."}}],gradient:{stops:[{location:0,color:"#00E400"},{location:50,color:"#00E400"},{location:51,color:"#FFFF00"},{location:100,color:"#FFFF00"},{location:101,color:"#FF7E00"},{location:150,color:"#FF7E00"},{location:151,color:"#FF0000"},{location:200,color:"#FF0000"},{location:201,color:"#99004C"},{location:300,color:"#99004C"},{location:301,color:"#7E0023"}]}},E={displayName:{"zh-Hans-CN":"空气质量指数","zh-Hant-HK":"空氣質量指數","en-US":"Air Quality Index"},shortDisplayName:{"zh-Hans-CN":"AQI","zh-Hant-HK":"AQI","en-US":"AQI"},longDisplayName:{"zh-Hans-CN":"美国 (EPA NowCast)","zh-Hant-HK":"美國 (EPA NowCast)","en-US":"United States (EPA NowCast)"},categories:[{range:[0,50],glyph:"aqi.low",colors:["#00E400"],categoryName:{"zh-Hans-CN":"优","zh-Hant-HK":"優","en-US":"Good"},recommendation:{"zh-Hans-CN":"空气质量令人满意，基本无空气污染。","zh-Hant-HK":"空氣質量令人滿意，基本無空氣污染。","en-US":"Air quality is satisfactory, and air pollution poses little or no risk."}},{range:[51,100],glyph:"aqi.low",colors:["#FFFF00"],categoryName:{"zh-Hans-CN":"良","zh-Hant-HK":"良","en-US":"Moderate"},recommendation:{"zh-Hans-CN":"空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响。","zh-Hant-HK":"空氣質量可接受，但某些污染物可能對極少數異常敏感人群健康有較弱影響。","en-US":"Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution."}},{range:[101,150],glyph:"aqi.medium",colors:["#FF7E00"],categoryName:{"zh-Hans-CN":"敏感人群不健康","zh-Hant-HK":"敏感人群不健康","en-US":"Unhealthy for Sensitive Groups"},recommendation:{"zh-Hans-CN":"敏感人群症状有轻度加剧，健康人群出现刺激症状。建议儿童、老年人及心脏病、呼吸系统疾病患者应减少户外活动。","zh-Hant-HK":"敏感人群症狀有輕度加劇，健康人群出現刺激症狀。建議兒童、老年人及心臟病、呼吸系統疾病患者應減少戶外活動。","en-US":"Members of sensitive groups may experience health effects. The general public is less likely to be affected."}},{range:[151,200],glyph:"aqi.high",colors:["#FF0000"],categoryName:{"zh-Hans-CN":"不健康","zh-Hant-HK":"不健康","en-US":"Unhealthy"},recommendation:{"zh-Hans-CN":"进一步加剧敏感人群症状，可能对心脏和呼吸系统有影响。一般人群应减少户外活动。","zh-Hant-HK":"進一步加劇敏感人群症狀，可能對心臟和呼吸系統有影響。一般人群應減少戶外活動。","en-US":"Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects."}},{range:[201,300],glyph:"aqi.high",colors:["#99004C"],categoryName:{"zh-Hans-CN":"非常不健康","zh-Hant-HK":"非常不健康","en-US":"Very Unhealthy"},recommendation:{"zh-Hans-CN":"健康警告：所有人都可能出现更严重的健康影响。","zh-Hant-HK":"健康警告：所有人都可能出現更嚴重的健康影響。","en-US":"Health alert: everyone may experience more serious health effects."}},{range:[301,500],glyph:"aqi.high",colors:["#7E0023"],categoryName:{"zh-Hans-CN":"危险","zh-Hant-HK":"危險","en-US":"Hazardous"},recommendation:{"zh-Hans-CN":"健康警告：所有人都可能出现严重的健康影响。应避免所有户外活动。","zh-Hant-HK":"健康警告：所有人都可能出現嚴重的健康影響。應避免所有戶外活動。","en-US":"Health warning of emergency conditions: everyone is more likely to be affected. Avoid all outdoor exertion."}}],gradient:{stops:[{location:0,color:"#00E400"},{location:50,color:"#00E400"},{location:51,color:"#FFFF00"},{location:100,color:"#FFFF00"},{location:101,color:"#FF7E00"},{location:150,color:"#FF7E00"},{location:151,color:"#FF0000"},{location:200,color:"#FF0000"},{location:201,color:"#99004C"},{location:300,color:"#99004C"},{location:301,color:"#7E0023"}]}},P={displayName:{"zh-Hans-CN":"欧洲空气质量指数","zh-Hant-HK":"歐洲空氣質量指數","en-US":"European Air Quality Index"},shortDisplayName:{"zh-Hans-CN":"EAQI","zh-Hant-HK":"EAQI","en-US":"EAQI"},longDisplayName:{"zh-Hans-CN":"欧洲 (EAQI)","zh-Hant-HK":"歐洲 (EAQI)","en-US":"Europe (EAQI)"},categories:[{range:[0,20],glyph:"aqi.low",colors:["#1E88E5"],categoryName:{"zh-Hans-CN":"非常好","zh-Hant-HK":"非常好","en-US":"Very Good"},recommendation:{"zh-Hans-CN":"享受户外活动。","zh-Hant-HK":"享受戶外活動。","en-US":"Enjoy your usual outdoor activities."}},{range:[21,40],glyph:"aqi.low",colors:["#00C853"],categoryName:{"zh-Hans-CN":"好","zh-Hant-HK":"好","en-US":"Good"},recommendation:{"zh-Hans-CN":"享受户外活动。","zh-Hant-HK":"享受戶外活動。","en-US":"Enjoy your usual outdoor activities."}},{range:[41,60],glyph:"aqi.medium",colors:["#FFEB3B"],categoryName:{"zh-Hans-CN":"中等","zh-Hant-HK":"中等","en-US":"Moderate"},recommendation:{"zh-Hans-CN":"敏感人群应考虑减少户外活动。","zh-Hant-HK":"敏感人群應考慮減少戶外活動。","en-US":"Sensitive individuals should consider reducing outdoor exertion."}},{range:[61,80],glyph:"aqi.high",colors:["#FF9800"],categoryName:{"zh-Hans-CN":"差","zh-Hant-HK":"差","en-US":"Poor"},recommendation:{"zh-Hans-CN":"敏感人群应减少户外活动。","zh-Hant-HK":"敏感人群應減少戶外活動。","en-US":"Sensitive groups should reduce outdoor exertion."}},{range:[81,100],glyph:"aqi.high",colors:["#F44336"],categoryName:{"zh-Hans-CN":"非常差","zh-Hant-HK":"非常差","en-US":"Very Poor"},recommendation:{"zh-Hans-CN":"所有人应减少户外活动。","zh-Hant-HK":"所有人應減少戶外活動。","en-US":"Everyone should reduce outdoor exertion."}}],gradient:{stops:[{location:0,color:"#1E88E5"},{location:20,color:"#1E88E5"},{location:21,color:"#00C853"},{location:40,color:"#00C853"},{location:41,color:"#FFEB3B"},{location:60,color:"#FFEB3B"},{location:61,color:"#FF9800"},{location:80,color:"#FF9800"},{location:81,color:"#F44336"}]}},U={displayName:{"zh-Hans-CN":"德国空气质量指数","zh-Hant-HK":"德國空氣質量指數","en-US":"German Air Quality Index"},shortDisplayName:{"zh-Hans-CN":"LQI","zh-Hant-HK":"LQI","en-US":"LQI"},longDisplayName:{"zh-Hans-CN":"德国 (UBA LQI)","zh-Hant-HK":"德國 (UBA LQI)","en-US":"Germany (UBA LQI)"},categories:[{range:[0,.99],glyph:"aqi.low",colors:["#00C853"],categoryName:{"zh-Hans-CN":"非常好","zh-Hant-HK":"非常好","en-US":"Very Good"},recommendation:{"zh-Hans-CN":"可以自由进行户外活动。","zh-Hant-HK":"可以自由進行戶外活動。","en-US":"You can freely engage in outdoor activities."}},{range:[1,1.99],glyph:"aqi.low",colors:["#64DD17"],categoryName:{"zh-Hans-CN":"好","zh-Hant-HK":"好","en-US":"Good"},recommendation:{"zh-Hans-CN":"可以自由进行户外活动。","zh-Hant-HK":"可以自由進行戶外活動。","en-US":"You can usually engage in outdoor activities without restriction."}},{range:[2,2.99],glyph:"aqi.medium",colors:["#FFEB3B"],categoryName:{"zh-Hans-CN":"中等","zh-Hant-HK":"中等","en-US":"Moderate"},recommendation:{"zh-Hans-CN":"敏感人群应减少户外活动。","zh-Hant-HK":"敏感人群應減少戶外活動。","en-US":"Sensitive individuals should reduce outdoor exertion."}},{range:[3,3.99],glyph:"aqi.high",colors:["#FF9800"],categoryName:{"zh-Hans-CN":"差","zh-Hant-HK":"差","en-US":"Poor"},recommendation:{"zh-Hans-CN":"敏感人群应避免户外活动。","zh-Hant-HK":"敏感人群應避免戶外活動。","en-US":"Sensitive groups should avoid outdoor exertion."}},{range:[4,4],glyph:"aqi.high",colors:["#F44336"],categoryName:{"zh-Hans-CN":"非常差","zh-Hant-HK":"非常差","en-US":"Very Poor"},recommendation:{"zh-Hans-CN":"所有人应减少户外活动。","zh-Hant-HK":"所有人應減少戶外活動。","en-US":"Everyone should reduce outdoor exertion."}}],gradient:{stops:[{location:0,color:"#00C853"},{location:1,color:"#64DD17"},{location:2,color:"#FFEB3B"},{location:3,color:"#FF9800"},{location:4,color:"#F44336"}]}},M={displayName:{"zh-Hant-HK":"AQHI (HK)","zh-Hans-CN":"AQHI (HK)","en-US":"AQHI (HK)"},shortDisplayName:{"zh-Hant-HK":"AQHI","zh-Hans-CN":"AQHI","en-US":"AQHI"},longDisplayName:{"zh-Hant-HK":"香港 (AQHI)","zh-Hans-CN":"香港 (AQHI)","en-US":"Hong Kong (AQHI)"},categories:[{range:[1,3],glyph:"aqi.low",colors:["#04DE71","#04DE71","#58E156"],categoryName:{"zh-Hant-HK":"低","zh-Hans-CN":"低","en-US":"Low"},recommendation:{"zh-Hant-HK":"可如常活動。","zh-Hans-CN":"可如常活动。","en-US":"No response action is required."}},{range:[4,6],glyph:"aqi.medium",colors:["#FFE620","#FFBE10","#FF9500"],categoryName:{"zh-Hant-HK":"中","zh-Hans-CN":"中","en-US":"Moderate"},recommendation:{"zh-Hant-HK":"一般可如常活動，但個別出現症狀的人士應考慮減少戶外體力消耗。","zh-Hans-CN":"一般可如常活动，但個別出现症状的人士应考虑减少户外体力消耗。","en-US":"No response action is normally required. Individuals who are experiencing symptoms are advised to consider reducing outdoor physical exertion."}},{range:[7,7],glyph:"aqi.high",colors:["#FA114F"],categoryName:{"zh-Hant-HK":"高","zh-Hans-CN":"高","en-US":"High"},recommendation:{"zh-Hant-HK":"心臟病或呼吸系統疾病患者、兒童及長者應減少戶外體力消耗。","zh-Hans-CN":"心脏病或呼吸系统疾病患者、儿童及长者应减少户外体力消耗。","en-US":"People with existing heart or respiratory illnesses, Children and the elderly are advised to reduce outdoor physical exertion."}},{range:[8,10],glyph:"aqi.high",colors:["#D11343","#A91537","#80172B"],categoryName:{"zh-Hant-HK":"甚高","zh-Hans-CN":"甚高","en-US":"Very High"},recommendation:{"zh-Hant-HK":"心臟病或呼吸系統疾病患者、兒童及長者應盡量減少戶外體力消耗。","zh-Hans-CN":"心脏病或呼吸系统疾病患者、儿童及长者应尽量减少户外体力消耗。","en-US":"People with existing heart or respiratory illnesses, Children and the elderly are advised to reduce to the minimum outdoor physical exertion."}},{range:[11,11],glyph:"aqi.high",colors:["#80172B"],categoryName:{"zh-Hant-HK":"嚴重","zh-Hans-CN":"严重","en-US":"Serious"},recommendation:{"zh-Hant-HK":"心臟病或呼吸系統疾病患者、兒童及長者應避免戶外體力消耗。","zh-Hans-CN":"心脏病或呼吸系统疾病患者、儿童及长者应避免户外体力消耗。","en-US":"People with existing heart or respiratory illnesses, Children and the elderly are advised to avoid outdoor physical exertion."}}],gradient:{stops:[{location:1,color:"#04DE71"},{location:2.5,color:"#04DE71"},{location:4,color:"#FFE620"},{location:6,color:"#FF9500"},{location:7,color:"#FA114F"},{location:8,color:"#D11343"},{location:9.5,color:"#80172B"}]}},R={displayName:{"zh-Hans-CN":"AQHI (CN)"},shortDisplayName:{"zh-Hans-CN":"AQHI"},longDisplayName:{"zh-Hans-CN":"中国 (AQHI)"},categories:[{range:[1,1],glyph:"aqi.low",colors:["#2094FA"],categoryName:{"zh-Hans-CN":"极低"},recommendation:{"zh-Hans-CN":"适宜进行户外活动。"}},{range:[2,3],glyph:"aqi.low",colors:["#04DE71","#CCFF66"],categoryName:{"zh-Hans-CN":"低"},recommendation:{"zh-Hans-CN":"正常进行户外活动。心肺疾病患者可遵照医嘱进行身体锻炼。"}},{range:[4,5],glyph:"aqi.medium",colors:["#FFE620","#FF9500"],categoryName:{"zh-Hans-CN":"中"},recommendation:{"zh-Hans-CN":"心肺疾病患者应减少长时间、高强度的户外活动，并遵照医嘱进行身体锻炼。"}},{range:[6,10],glyph:"aqi.high",colors:["#FA114F","#DC1346","#BD143D","#9F1634","#80172B"],categoryName:{"zh-Hans-CN":"高"},recommendation:{"zh-Hans-CN":"心肺疾病患者、老人、儿童及孕妇应尽量减少户外活动。一般人群应减少长时间、高强度的户外活动。"}},{range:[11,11],glyph:"aqi.high",colors:["#80172B"],categoryName:{"zh-Hans-CN":"极高"},recommendation:{"zh-Hans-CN":"心肺疾病患者、老人、儿童及孕妇应避免户外活动。一般人群应尽量减少户外活动。"}}],gradient:{stops:[{location:1,color:"#2094FA"},{location:2,color:"#04DE71"},{location:3.5,color:"#CCFF66"},{location:4,color:"#FFE620"},{location:6,color:"#FA114F"},{location:8,color:"#BD143D"},{location:10,color:"#80172B"}]}};function H(t,e){return t[e]??t["en-US"]??""}function W(t){return/^zh-Hant-HK$/i.test(t)?"zh-HK":/^zh-Hant/i.test(t)?"zh-TW":/^zh/i.test(t)?"zh-CN":"en"}function L(t){const[e,i]=`${t||""}`.split("."),n=Number.parseInt(i,10);return{name:e||t,version:Number.isFinite(n)?n:1}}class D{static normalizeLanguage(t){return/zh-Hant-HK/i.test(t)?"zh-Hant-HK":/^zh-Hant/i.test(t)?"zh-Hant-TW":/^zh/i.test(t)?"zh-Hans-CN":"en-US"}static buildScale(t,e){o.debug("☑️ AirQualityScale.buildScale",`language: ${t}`,`scaleName: ${e}`);const i=e?.split(".")?.[0];o.debug(`scaleBaseName: ${i}`);let n=null;switch(i){case"HJ6332012":case"HJ6332025_DRAFT":n=D.#o(t,e,O);break;case"EPA_NowCast":n=D.#o(t,e,E);break;case"EU":case"EAQI":n=D.#o(t,e,P);break;case"UBA":n=D.#o(t,e,U);break;case"HK":n=D.#d(t,e,M);break;case"CN":n=D.#d(t,e,R);break;default:o.warn("AirQualityScale.buildScale",`未知的 scale: ${e}，透传到 Apple`),n=null}return o.debug("✅ AirQualityScale.buildScale",n?"已构建本地响应":"透传"),n}static#o(t,e,i){const n=D.normalizeLanguage(t),a=L(e),s=[];for(const t of i.categories){const[e,i]=t.range;s.push({categoryNumber:s.length+1,range:[e,i===Number.POSITIVE_INFINITY?9999:i],color:t.colors[0],categoryName:H(t.categoryName,n),recommendation:H(t.recommendation,n),glyph:t.glyph})}const r={name:a.name,displayName:H(i.displayName,n),shortDisplayName:H(i.shortDisplayName,n),longDisplayName:H(i.longDisplayName,n),displayLabel:H(w,n),language:W(t),version:a.version,aqi:{numerical:!0,ascending:!0,range:i===U?[0,4]:i===P?[0,100]:[0,500],categories:s,gradient:i.gradient}};return{status:200,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store, max-age=0"},body:JSON.stringify(r)}}static#d(t,e,i){const n=D.normalizeLanguage(t),a="zh-Hant-TW"===n?"zh-Hant-HK":n,s=L(e),r=[];for(const t of i.categories){const[e,i]=t.range;for(let n=e;n<=i;n++)r.push({categoryNumber:n,range:[n,n],color:t.colors[n-e],categoryName:H(t.categoryName,a),recommendation:H(t.recommendation,a),glyph:t.glyph})}const o={name:s.name,displayName:H(i.displayName,a),shortDisplayName:H(i.shortDisplayName,a),longDisplayName:H(i.longDisplayName,a),displayLabel:H(w,n),language:W(t),version:s.version,aqi:{numerical:!0,ascending:!0,range:[1,11],categories:r,gradient:i.gradient}};return{status:200,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store, max-age=0"},body:JSON.stringify(o)}}}class B{Name="ForecastNextHour";Version="v1.6.3";Author="iRingo";static#c={Pollutants:{co:"CO",no:"NO",no2:"NO2",so2:"SO2",o3:"OZONE",nox:"NOX",pm25:"PM2_5",pm10:"PM10",other:"NOT_AVAILABLE"},WeatherCondition:{"晴朗":"CLEAR","雨夹雪":"SLEET","小雨":"DRIZZLE","下雨":"RAIN","中雨":"RAIN","大雨":"HEAVY_RAIN","小雪":"FLURRIES","下雪":"SNOW","中雪":"SNOW","大雪":"HEAVY_SNOW","冰雹":"HAIL"},PrecipitationType:{"晴朗":"CLEAR","无降水":"CLEAR","降水":"RAIN","雨夹雪":"SLEET",rain:"RAIN","雨":"RAIN",snow:"SNOW","雪":"SNOW","冰雹":"HAIL"},Precipitation:{Level:{INVALID:-1,NO:0,LIGHT:1,MODERATE:2,HEAVY:3,EXTREME:4},Range:{radar:{NO:[0,.031],LIGHT:[.031,.25],MODERATE:[.25,.35],HEAVY:[.35,.48],EXTREME:[.48,Number.MAX_VALUE]},mmph:{NO:[0,.08],LIGHT:[.08,3.44],MODERATE:[3.44,11.33],HEAVY:[11.33,51.3],EXTREME:[51.3,Number.MAX_VALUE]},precipitation:{NO:[0,.01],LIGHT:[.01,.6],MODERATE:[.6,1.65],HEAVY:[1.65,8],EXTREME:[8,205]}}}};static WeatherCondition(t){o.debug("☑️ WeatherCondition",`sentence: ${t}`);let e="CLEAR";return Object.keys(B.#c.WeatherCondition).forEach(i=>{t.includes(i)&&(e=B.#c.WeatherCondition[i])}),o.debug(`✅ WeatherCondition: ${e}`),e}static PrecipitationType(t){o.debug("☑️ PrecipitationType",`sentence: ${t}`);let e="CLEAR";return Object.keys(B.#c.PrecipitationType).forEach(i=>{t.includes(i)&&(e=B.#c.PrecipitationType[i])}),o.debug(`✅ PrecipitationType: ${e}`),e}static Minute(t=[],e="",i="mmph"){o.debug("☑️ Minute");const n=B.PrecipitationType(e);return t=t.map((t,e)=>{if(t.precipitationIntensity=Math.trunc(1e6*t.precipitationIntensity)/1e6,t.perceivedPrecipitationIntensity=B.#u(t.precipitationIntensity,i),t.perceivedPrecipitationIntensity>2){switch(n){case"RAIN":t.condition="HEAVY_RAIN";break;case"SNOW":t.condition="HEAVY_SNOW";break;default:t.condition=n}t.summaryCondition=n,t.clear=!1}else if(t.perceivedPrecipitationIntensity>1){switch(n){case"RAIN":t.condition="RAIN";break;case"SNOW":t.condition="SNOW";break;default:t.condition=n}t.summaryCondition=n,t.clear=!1}else if(t.perceivedPrecipitationIntensity>.1){switch(n){case"RAIN":t.condition="DRIZZLE";break;case"SNOW":t.condition="FLURRIES";break;default:t.condition=n}t.summaryCondition=n,t.clear=!1}else if(t.perceivedPrecipitationIntensity>0){switch(n){case"RAIN":t.condition="POSSIBLE_DRIZZLE";break;case"SNOW":t.condition="POSSIBLE_FLURRIES";break;default:t.condition=`POSSIBLE_${n}`}t.summaryCondition=n,t.clear=!1}else t.condition="CLEAR",t.summaryCondition="CLEAR",t.clear=!0;return t}),o.debug("✅ Minute"),t}static Summary(t=[]){o.debug("☑️ Summary");const e=[];let i={condition:"CLEAR",startTime:0,precipitationChance:0,precipitationIntensity:0,maxCondition:"",clear:!0},n={};const a=Math.min(71,t.length),s=t=>{const e=(t.HEAVY_RAIN||0)+(t.HEAVY_SNOW||0),i=(t.RAIN||0)+(t.SNOW||0),n=(t.DRIZZLE||0)+(t.FLURRIES||0),a=(t.POSSIBLE_DRIZZLE||0)+(t.POSSIBLE_FLURRIES||0),s=Object.values(t).reduce((t,e)=>t+e,0),r=Math.max(3,Math.min(12,Math.round(.2*s)));return e>=r?t.HEAVY_RAIN?"HEAVY_RAIN":"HEAVY_SNOW":e+i>=r?t.RAIN?"RAIN":"SNOW":e+i+n>=r?t.DRIZZLE?"DRIZZLE":"FLURRIES":e+i+n+a>0?t.POSSIBLE_DRIZZLE?"POSSIBLE_DRIZZLE":"POSSIBLE_FLURRIES":"CLEAR"};for(let r=0;r<a;r++){const d=t[r],c=t[r-1];switch(n[d.condition]=(n[d.condition]||0)+1,r){case 0:i.startTime=d.startTime,i.condition=d.summaryCondition,i.precipitationChance=d.precipitationChance,i.precipitationIntensity=d.precipitationIntensity,i.clear=d.clear,1===a&&(i.endTime=0,i.maxCondition=s(n),e.push({...i}));break;case a-1:i.endTime=0,i.clear=d.clear,i.maxCondition=s(n),o.debug(`Summaries[${r}]`,JSON.stringify({...d,...i},null,2)),e.push({...i});break;default:d.summaryCondition!==c.summaryCondition?(n[d.condition]--,0===n[d.condition]&&delete n[d.condition],i.endTime=d.startTime,i.maxCondition=s(n),o.debug(`Summaries[${r}]`,JSON.stringify({...c,...i},null,2)),e.push({...i}),n={},n[d.condition]=1,i={startTime:d.startTime,condition:d.summaryCondition,precipitationChance:d.precipitationChance,precipitationIntensity:d.precipitationIntensity,maxCondition:"",clear:d.clear}):(i.precipitationChance=Math.max(i.precipitationChance,d.precipitationChance),i.precipitationIntensity=Math.max(i.precipitationIntensity,d.precipitationIntensity))}}return o.debug(`Summaries: ${JSON.stringify(e,null,2)}`),o.debug("✅ Summary"),e}static Condition(t=[]){o.debug("☑️ Condition");const e=[];switch(t.length>4&&(t=t.slice(0,4))[3]&&(t[3].endTime=0),t.map(t=>t.clear).join("|")){case"true":{const i=t[0];e.push({beginCondition:i.maxCondition,endCondition:i.maxCondition,forecastToken:"CLEAR",parameters:[],startTime:i.startTime,endTime:0});break}case"false":{const i=t[0];e.push({beginCondition:i.maxCondition,endCondition:i.maxCondition,forecastToken:"CONSTANT",parameters:[],startTime:i.startTime,endTime:0});break}case"true|false":{const i=t[0],n=t[1];e.push({beginCondition:n.maxCondition,endCondition:n.maxCondition,forecastToken:"START",parameters:[{date:n.startTime,type:"FIRST_AT"}],startTime:i.startTime,endTime:i.endTime}),e.push({beginCondition:n.maxCondition,endCondition:n.maxCondition,forecastToken:"CONSTANT",parameters:[],startTime:n.startTime,endTime:0});break}case"false|true":{const i=t[0],n=t[1];e.push({beginCondition:i.maxCondition,endCondition:i.maxCondition,forecastToken:"STOP",parameters:[{date:i.endTime,type:"FIRST_AT"}],startTime:i.startTime,endTime:i.endTime}),e.push({beginCondition:n.maxCondition,endCondition:n.maxCondition,forecastToken:"CLEAR",parameters:[],startTime:n.startTime,endTime:0});break}case"false|true|false":{const i=t[0],n=t[1],a=t[2];e.push({beginCondition:i.maxCondition,endCondition:a.maxCondition,forecastToken:"STOP_START",parameters:[{date:i.endTime,type:"FIRST_AT"},{date:a.startTime,type:"SECOND_AT"}],startTime:i.startTime,endTime:i.endTime}),e.push({beginCondition:a.maxCondition,endCondition:a.maxCondition,forecastToken:"START",parameters:[{date:a.startTime,type:"FIRST_AT"}],startTime:n.startTime,endTime:n.endTime}),e.push({beginCondition:a.maxCondition,endCondition:a.maxCondition,forecastToken:"CONSTANT",parameters:[],startTime:a.startTime,endTime:0});break}case"true|false|true":{const i=t[0],n=t[1],a=t[2];e.push({beginCondition:n.maxCondition,endCondition:n.maxCondition,forecastToken:"START_STOP",parameters:[{date:n.startTime,type:"FIRST_AT"},{date:n.endTime,type:"SECOND_AT"}],startTime:i.startTime,endTime:i.endTime}),e.push({beginCondition:n.maxCondition,endCondition:n.maxCondition,forecastToken:"STOP",parameters:[{date:n.endTime,type:"FIRST_AT"}],startTime:n.startTime,endTime:n.endTime}),e.push({beginCondition:a.maxCondition,endCondition:a.maxCondition,forecastToken:"CLEAR",parameters:[],startTime:a.startTime,endTime:0});break}case"false|true|false|true":{const i=t[0],n=t[1],a=t[2],s=t[3];e.push({beginCondition:i.maxCondition,endCondition:a.maxCondition,forecastToken:"STOP_START",parameters:[{date:i.endTime,type:"FIRST_AT"},{date:a.startTime,type:"SECOND_AT"}],startTime:i.startTime,endTime:i.endTime}),e.push({beginCondition:a.maxCondition,endCondition:a.maxCondition,forecastToken:"START_STOP",parameters:[{date:a.startTime,type:"FIRST_AT"},{date:a.endTime,type:"SECOND_AT"}],startTime:n.startTime,endTime:n.endTime}),e.push({beginCondition:a.maxCondition,endCondition:a.maxCondition,forecastToken:"STOP",parameters:[{date:a.endTime,type:"FIRST_AT"}],startTime:a.startTime,endTime:a.endTime}),e.push({beginCondition:s.maxCondition,endCondition:s.maxCondition,forecastToken:"CLEAR",parameters:[],startTime:s.startTime,endTime:0});break}case"true|false|true|false":{const i=t[0],n=t[1],a=t[2],s=t[3];e.push({beginCondition:n.maxCondition,endCondition:n.maxCondition,forecastToken:"START_STOP",parameters:[{date:n.startTime,type:"FIRST_AT"},{date:n.endTime,type:"SECOND_AT"}],startTime:i.startTime,endTime:i.endTime}),e.push({beginCondition:n.maxCondition,endCondition:s.maxCondition,forecastToken:"STOP_START",parameters:[{date:n.endTime,type:"FIRST_AT"},{date:s.startTime,type:"SECOND_AT"}],startTime:n.startTime,endTime:n.endTime}),e.push({beginCondition:s.maxCondition,endCondition:s.maxCondition,forecastToken:"START",parameters:[{date:s.startTime,type:"FIRST_AT"}],startTime:a.startTime,endTime:a.endTime}),e.push({beginCondition:s.maxCondition,endCondition:s.maxCondition,forecastToken:"CONSTANT",parameters:[],startTime:s.startTime,endTime:0});break}default:{const i=t.find(t=>!t.clear);if(i)e.push({beginCondition:i.maxCondition,endCondition:i.maxCondition,forecastToken:"CONSTANT",parameters:[],startTime:i.startTime,endTime:0});else if(t.length>0){const i=t[0];e.push({beginCondition:i.maxCondition,endCondition:i.maxCondition,forecastToken:"CLEAR",parameters:[],startTime:i.startTime,endTime:0})}break}}return o.debug(`Conditions: ${JSON.stringify(e,null,2)}`),o.debug("✅ Condition"),e}static#u(t,e="mmph"){const i=B.#c.Precipitation.Range[e];let n=0;return 0===t||t>i.NO[0]&&t<=i.NO[1]?n=0:t>i.LIGHT[0]&&t<=i.LIGHT[1]?n=Math.min(1,(t-i.LIGHT[0])/(i.LIGHT[1]-i.LIGHT[0])):t>i.MODERATE[0]&&t<=i.MODERATE[1]?n=1+Math.min(1,(t-i.MODERATE[0])/(i.MODERATE[1]-i.MODERATE[0])):t>i.HEAVY[0]&&(n=2+Math.min(1,(t-i.HEAVY[0])/(i.HEAVY[1]-i.HEAVY[0]))),n=Math.trunc(1e3*n)/1e3,n}}let K=class{static Name="Weather";static Version="0.3.0";static Author="Virgil Clyne & 001";static ConvertDSWRF(t,e=.04){o.debug("☑️ ConvertDSWRF");const i=Math.round(Math.max(t,0)*e/.025);return o.debug("✅ ConvertDSWRF"),Math.min(i,11)}static mergeForecast(t=[],e=[]){let i=0,n=0;for(;i<t.length;){const a=t[i].forecastStart,s=n<e.length?e[n].forecastStart:Number.POSITIVE_INFINITY;a===s?(Object.hasOwn(e[n],"daytimeForecast")&&(e[n].daytimeForecast={...t[i].daytimeForecast,...e[n].daytimeForecast}),Object.hasOwn(e[n],"overnightForecast")&&(e[n].overnightForecast={...t[i].overnightForecast,...e[n].overnightForecast}),Object.hasOwn(e[n],"restOfDayForecast")&&(e[n].restOfDayForecast={...t[i].restOfDayForecast,...e[n].restOfDayForecast}),Object.assign(t[i],e[n]),i++,n++):s<a?n++:i++}return t}static ConvertWeatherCode(t){switch(t){case"晴":case"CLEAR_DAY":case"CLEAR_NIGHT":return"CLEAR";case"多云":case"PARTLY_CLOUDY_DAY":case"PARTLY_CLOUDY_NIGHT":case"晴间多云":return"PARTLY_CLOUDY";case"少云":return"MOSTLY_CLEAR";case"阴":case"CLOUDY":return"CLOUDY";case"WIND":return"WINDY";case"薄雾":case"雾":case"浓雾":case"强浓雾":case"大雾":case"特强浓雾":case"FOG":return"FOGGY";case"霾":case"中度霾":case"重度霾":case"严重霾":case"LIGHT_HAZE":case"MODERATE_HAZE":case"HEAVY_HAZE":case"扬沙":case"浮尘":case"沙尘暴":case"强沙尘暴":case"DUST":case"SAND":return"HAZE";case"小雨":case"毛毛雨/细雨":case"LIGHT_RAIN":return"DRIZZLE";case"雨":case"阵雨":case"中雨":case"小到中雨":case"MODERATE_RAIN":return"RAIN";case"大雨":case"中到大雨":case"暴雨":case"大暴雨":case"强降雨":case"特大暴雨":case"大到暴雨":case"暴雨到大暴雨":case"大暴雨到特大暴雨":case"极端降雨":case"HEAVY_RAIN":return"HEAVY_RAIN";case"雷阵雨":case"强雷阵雨":case"STORM_RAIN":case"雷阵雨伴有冰雹":return"THUNDERSTORMS";case"小雪":case"LIGHT_SNOW":return"FLURRIES";case"雪":case"阵雪":case"中雪":case"小到中雪":case"MODERATE_SNOW":return"SNOW";case"大雪":case"中到大雪":case"HEAVY_SNOW":return"HEAVY_SNOW";case"暴雪":case"大到暴雪":case"STORM_SNOW":return"BLIZZARD";case"雨夹雪":case"雨雪天气":case"阵雨夹雪":case"冻雨":return"FREEZING_DRIZZLE";default:return o.debug(`skycon: ${t}`),null}}static ConvertMoonPhase(t){switch(t){case"新月":return"NEW";case"蛾眉月":return"WAXING_CRESCENT";case"上弦月":return"FIRST_QUARTER";case"盈凸月":return"WAXING_GIBBOUS";case"满月":return"FULL";case"亏凸月":return"WANING_GIBBOUS";case"下弦月":return"THIRD_QUARTER";case"残月":return"WANING_CRESCENT";default:return o.debug(`moonPhase: ${t}`),null}}};class ${constructor(t,e){this.Name="ColorfulClouds",this.Version="4.1.0",o.debug(`🟧 ${this.Name} v${this.Version}`),this.endpoint=`https://api.caiyunapp.com/v2.6/${e}/${t.longitude},${t.latitude}`,this.headers={Referer:"https://caiyunapp.com/","User-Agent":"curl/8.14.1"},this.version=t.version,this.language=t.language,this.latitude=t.latitude,this.longitude=t.longitude,this.country=t.country}#l={realtimePromise:null,yesterdayHourly:void 0};#p={Pollutants:{co:"CO",no:"NO",no2:"NO2",so2:"SO2",o3:"OZONE",nox:"NOX",pm25:"PM2_5",pm10:"PM10",other:"NOT_AVAILABLE"},Availability:{Minutely:["CN","HK","MO","TW","IT","LT","MT","FR","SK","NO","BY","IS","CZ","SI","DE","ES","UA","DK","PL","FI","SE","HR","RU","RO","PT","EE","RS","AT","GR","HU","FJ","GU","MH","NC","TR","BH","SA","ID","IR","SG","OM","PH","IN","KH","CY","MY","VN","KW","TH","KR","KP","CA","BS","KY","MX","PA","MQ","CU","BM","PR","CW","GP","NI","BR","GF","CO","GY","PY","AR"],AirQuality:["CN","HK","MO"]}};async#h(){if(o.debug("☑️ RealTime"),this.#l.realtimePromise)o.debug("✅ RealTime","Using cache promise");else{const t={url:`${this.endpoint}/realtime`,headers:this.headers};this.#l.realtimePromise=i(t).then(t=>JSON.parse(t?.body??"{}")).then(t=>{if("ok"===t?.status&&"ok"===t?.result?.realtime?.status)return t;throw Error(JSON.stringify(t??{}))}).catch(t=>(o.error(`RealTime: ${t}`),this.#l.realtimePromise=null,{}))}return this.#l.realtimePromise}async Minutely(){if(o.debug("☑️ Minutely"),!this.#p.Availability.Minutely.includes(this.country))return void o.warn("Minutely",`Unsupported country: ${this.country}`);const t={url:`${this.endpoint}/minutely?unit=metric:v2`,headers:this.headers};let e;try{const n=await i(t).then(t=>JSON.parse(t?.body??"{}"));switch(n?.status){case"ok":switch(n?.result?.minutely?.status){case"ok":{const t=Date.now()/1e3|0,i={attributionUrl:"https://www.caiyunapp.com/h5",expireTime:t+3600,language:"zh-CN",latitude:n?.location?.[0],longitude:n?.location?.[1],providerName:"彩云天气",providerLogo:"https://raw.githubusercontent.com/NSRingo/WeatherKit/main/images/icon/v2/ColorfulClouds.png",readTime:t,reportedTime:n?.server_time,temporarilyUnavailable:!1,sourceType:"MODELED"};n.result.minutely.probability=n.result.minutely.probability.map(t=>Math.max(0,Math.min(100,Math.round(t<=1?100*t:t))));let a=new Date(1e3*n?.server_time).setSeconds(0,0);a=a.valueOf()/1e3-60,e={metadata:i,condition:[],forecastEnd:0,forecastStart:a,minutes:n?.result?.minutely?.precipitation_2h?.map((t,e)=>{const i={perceivedPrecipitationIntensity:0,precipitationChance:0,precipitationIntensity:t,startTime:a+60*e};return i.precipitationChance=e<30?n?.result?.minutely?.probability?.[0]:e<60?n?.result?.minutely?.probability?.[1]:e<90?n?.result?.minutely?.probability?.[2]:n?.result?.minutely?.probability?.[3],i}),summary:[]},e.minutes.length=Math.min(85,e.minutes.length),e.forecastEnd=a+60*e.minutes.length,e.minutes=B.Minute(e.minutes,n?.result?.minutely?.description,"mmph"),e.summary=B.Summary(e.minutes),e.condition=B.Condition(e.summary);break}case"error":case"failed":case void 0:throw Error(JSON.stringify({status:n?.result?.minutely?.status,reason:n?.result?.minutely}))}break;case"error":case"failed":case void 0:throw Error(JSON.stringify(n??{}))}}catch(t){o.error(`Minutely: ${t}`)}finally{o.debug("✅ Minutely")}return e}async#b(t=273,e=void 0){o.debug("☑️ Hourly",`hourlysteps: ${t}`,`begin: ${e}`);const n={url:`${this.endpoint}/hourly?hourlysteps=${t}`,headers:this.headers};e&&(n.url+=`&begin=${e}`);try{const t=await i(n).then(t=>JSON.parse(t?.body??"{}"));switch(t?.status){case"ok":switch(t?.result?.hourly?.status){case"ok":return o.debug("✅ Hourly"),t;case"error":case void 0:throw Error(JSON.stringify({status:t?.result?.hourly?.status,reason:t?.result?.hourly}))}break;case"error":case"failed":case void 0:throw Error(JSON.stringify(t??{}))}}catch(t){o.error(`Hourly: ${t}`)}finally{o.debug("✅ Hourly")}return{}}async Daily(t=10,e=void 0){o.debug("☑️ Daily");const n={url:`${this.endpoint}/daily?dailysteps=${t}`,headers:this.headers};let a;e&&(n.url+=`&begin=${e}`);try{const e=await i(n).then(t=>JSON.parse(t?.body??"{}"));switch(e?.status){case"ok":switch(e?.result?.daily?.status){case"ok":{const i=Date.now()/1e3|0;a={metadata:{attributionUrl:"https://www.caiyunapp.com/h5",expireTime:i+3600,language:"zh-CN",latitude:e?.location?.[0],longitude:e?.location?.[1],providerName:"彩云天气",readTime:i,reportedTime:e?.server_time,temporarilyUnavailable:!1,sourceType:"STATION"},days:[]};for(let i=0;i<t;i++){const t=new Date(e?.result?.daily?.skycon?.[i]?.date).getTime()/1e3|0;a.days.push({forecastStart:t,forecastEnd:t+86400,conditionCode:K.ConvertWeatherCode(e?.result?.daily?.skycon?.[i]?.value),humidityMax:Math.round(100*e?.result?.daily?.humidity?.[i]?.max),humidityMin:Math.round(100*e?.result?.daily?.humidity?.[i]?.min),precipitationAmount:e?.result?.daily?.precipitation?.[i]?.avg,precipitationChance:e?.result?.daily?.precipitation?.[i]?.probability,temperatureMax:e?.result?.daily?.temperature?.[i]?.max,temperatureMin:e?.result?.daily?.temperature?.[i]?.min,visibilityMax:1e3*e?.result?.daily?.visibility?.[i]?.max,visibilityMin:1e3*e?.result?.daily?.visibility?.[i]?.min,windSpeedAvg:e?.result?.daily?.wind?.[i]?.avg?.speed,windSpeedMax:e?.result?.daily?.wind?.[i]?.max?.speed,daytimeForecast:{forecastStart:t+28800,forecastEnd:t+28800+43200,cloudCover:e?.result?.daily?.cloudrate?.[i]?.avg,conditionCode:K.ConvertWeatherCode(e?.result?.daily?.skycon_08h_20h?.[i]?.value),precipitationAmount:e?.result?.daily?.precipitation_08h_20h?.[i]?.avg,precipitationChance:e?.result?.daily?.precipitation_08h_20h?.[i]?.probability,temperatureMax:e?.result?.daily?.temperature_08h_20h?.[i]?.max,temperatureMin:e?.result?.daily?.temperature_08h_20h?.[i]?.min,windDirection:e?.result?.daily?.wind_08h_20h?.[i]?.avg?.direction,windSpeed:e?.result?.daily?.wind_08h_20h?.[i]?.avg?.speed,windSpeedMax:e?.result?.daily?.wind_08h_20h?.[i]?.max?.speed},overnightForecast:{forecastStart:t+72e3,forecastEnd:t+72e3+43200,cloudCover:e?.result?.daily?.cloudrate?.[i]?.avg,conditionCode:K.ConvertWeatherCode(e?.result?.daily?.skycon_20h_32h?.[i]?.value),precipitationAmount:e?.result?.daily?.precipitation_20h_32h?.[i]?.avg,precipitationChance:e?.result?.daily?.precipitation_20h_32h?.[i]?.probability,temperatureMax:e?.result?.daily?.temperature_20h_32h?.[i]?.max,temperatureMin:e?.result?.daily?.temperature_20h_32h?.[i]?.min,windDirection:e?.result?.daily?.wind_20h_32h?.[i]?.avg?.direction,windSpeed:e?.result?.daily?.wind_20h_32h?.[i]?.avg?.speed,windSpeedMax:e?.result?.daily?.wind_20h_32h?.[i]?.max?.speed}})}break}case"error":case void 0:throw Error(JSON.stringify({status:e?.result?.daily?.status,reason:e?.result?.daily}))}break;case"error":case"failed":case void 0:throw Error(JSON.stringify(e??{}))}}catch(t){o.error(`Daily: ${t}`)}finally{o.debug("✅ Daily")}return a}#m(t,e=[this.latitude,this.longitude],i=!1){const n=Math.trunc(Date.now()/1e3),[a,s]=e;return{longitude:s,providerName:"彩云天气",providerLogo:"https://raw.githubusercontent.com/NSRingo/WeatherKit/main/images/icon/v2/ColorfulClouds.png",reportedTime:t??n,latitude:a,expireTime:n+3600,attributionUrl:"https://www.caiyunapp.com/h5",temporarilyUnavailable:i,readTime:n,sourceType:"MODELED"}}#y(t={},e=""){o.debug("☑️ CreatePollutants");const{mgm3:i,ugm3:n}=F.Config.Units.WeatherKit,a=Object.entries(t).map(([a,s])=>{switch(a){case"co":return{amount:F.ConvertUnit(s??-1,i,n),pollutantType:this.#p.Pollutants[a],units:n,index:"HJ6332012"===e?t.co_iaqi_chn:void 0};case"no":case"no2":case"so2":case"o3":case"nox":case"pm25":case"pm10":return{amount:s??-1,pollutantType:this.#p.Pollutants[a],units:n,index:"HJ6332012"===e?t[`${a}_iaqi_chn`]:void 0};default:return null}}).filter(Boolean);return o.debug("✅ CreatePollutants"),a}async CurrentAirQuality(t=!0,e=!0){o.debug("☑️ CurrentAirQuality");const i={metadata:this.#m(void 0,void 0,!0),pollutants:[],previousDayComparison:F.Config.CompareCategoryIndexes.UNKNOWN};if(!this.#p.Availability.AirQuality.includes(this.country))return o.warn("CurrentAirQuality",`Unsupported country: ${this.country}`),i;const n=await this.#h();if(!n.result)return o.error("CurrentAirQuality","无法获取realtime数据"),i;if(""===n.result.realtime.air_quality.description.usa)return o.error("CurrentAirQuality","不支持的位置"),i;const a={metadata:this.#m(n.result.realtime.air_quality.obs_time,n.location),pollutants:this.#y(n.result.realtime.air_quality,t?void 0:"HJ6332012"),previousDayComparison:F.Config.CompareCategoryIndexes.UNKNOWN};if(t){const t=F.Config.Scales.WAQI_InstantCast_US,e=n.result.realtime.air_quality.aqi.usa,i=F.CategoryIndex(e,t.categories),s=F.PollutantsToIndexes(a.pollutants,"WAQI_InstantCast_US",{stpConversionFactors:F.Config.STP_ConversionFactors.US}),r=F.PrimaryPollutant(s,t.categories),d={...a,pollutants:s,categoryIndex:i,index:e,isSignificant:i>=t.categories.significantIndex,primaryPollutant:r.pollutantType,scale:F.ToWeatherKitScale(t.weatherKitScale)};return o.debug("✅ CurrentAirQuality"),d}{const t=F.Config.Scales.HJ6332012,i=n.result.realtime.air_quality.aqi.chn,s=F.CategoryIndex(i,t.categories),r=F.PrimaryPollutant(a.pollutants,t.categories),d=!e&&r.index<=50;d&&o.info("CurrentAirQuality",`Max index of pollutants ${r.pollutantType} = ${r.index} is <= 50, primaryPollutant will be set to NOT_AVAILABLE.`);const c={...a,categoryIndex:s,index:i,isSignificant:s>=t.categories.significantIndex,primaryPollutant:d?"NOT_AVAILABLE":r.pollutantType,scale:F.ToWeatherKitScale(t.weatherKitScale)};return o.debug("✅ CurrentAirQuality"),c}}async CurrentWeather(){o.debug("☑️ CurrentWeather");const t=await this.#h();return t.result?(o.debug("✅ CurrentWeather"),{metadata:this.#m(t.result.server_time,t.location),cloudCover:Math.round(100*t.result.realtime.cloudrate),conditionCode:K.ConvertWeatherCode(t.result.realtime.skycon),humidity:Math.round(100*t.result.realtime.humidity),perceivedPrecipitationIntensity:t.result.realtime.precipitation.local.intensity,pressure:t.result.realtime.pressure/100,temperature:t.result.realtime.temperature,temperatureApparent:t.result.realtime.apparent_temperature,visibility:1e3*t.result.realtime.visibility,windDirection:t.result.realtime.wind.direction,windSpeed:t.result.realtime.wind.speed}):(o.error("CurrentWeather","无法获取realtime数"),{metadata:this.#m(void 0,void 0,!0)})}async prefetchYesterdayHourly(){o.debug("☑️ prefetchYesterdayHourly"),this.#l.yesterdayHourly=this.#b(1,Math.trunc((Date.now()-864e5)/1e3));const t=await this.#l.yesterdayHourly;return o.debug("✅ prefetchYesterdayHourly"),t}async YesterdayAirQuality(t=!0){o.debug("☑️ YesterdayAirQuality");const e=await(this.#l.yesterdayHourly??this.#b(1,Math.trunc((Date.now()-864e5)/1e3))),i=t?F.Config.Scales.EPA_NowCast:F.Config.Scales.HJ6332012,n={previousDayComparison:F.Config.CompareCategoryIndexes.UNKNOWN,pollutants:[],primaryPollutant:"NOT_AVAILABLE",scale:F.ToWeatherKitScale(i.weatherKitScale)};if(!e.result)return o.error("YesterdayAirQuality","无法获取hourly数据"),{...n,categoryIndex:-1,metadata:this.#m(void 0,void 0,!0)};const{usa:a,chn:s}=e.result.hourly.air_quality.aqi[0].value;0===a&&0===s&&o.warn("YesterdayAirQuality","usa和chn的AQI值都为0，不支持的位置？");const r=t?a:s,d=F.CategoryIndex(r,i.categories),c=d>=i.categories.significantIndex;return o.debug(`index: ${r}`),o.debug("✅ YesterdayAirQuality",`categoryIndex: ${d}`),{...n,index:r,categoryIndex:d,isSignificant:c,metadata:this.#m(e.result.server_time,e.location)}}async ForecastHourly(t,e){o.debug("☑️ ForecastHourly");const i=await this.#b(t,e);return i.result?(o.debug("✅ ForecastHourly"),{metadata:this.#m(i.result.server_time,i.location),hours:Array.from({length:i.result.hourly.skycon.length},(t,e)=>({cloudCover:i.result.hourly.cloudrate[e].value,conditionCode:K.ConvertWeatherCode(i.result.hourly.skycon[e].value),forecastStart:new Date(i.result.hourly.skycon[e].datetime).getTime()/1e3|0,humidity:Math.round(100*i.result.hourly.humidity[e].value),precipitationAmount:i.result.hourly.precipitation[e].value,precipitationChance:i.result.hourly.precipitation[e].probability,pressure:i.result.hourly.pressure[e].value/100,temperature:i.result.hourly.temperature[e].value,temperatureApparent:i.result.hourly.apparent_temperature[e].value,visibility:1e3*i.result.hourly.visibility[e].value,windDirection:i.result.hourly.wind[e].direction,windSpeed:i.result.hourly.wind[e].speed}))}):(o.error("ForecastHourly","Failed to get hourly data"),{metadata:this.#m(void 0,void 0,!0)})}}class V{constructor(t,e,i="devapi.qweather.com"){this.Name="QWeather",this.Version="5.1.0",o.debug(`🟧 ${this.Name} v${this.Version}`),this.endpoint=`https://${i}`,this.headers={"X-QW-Api-Key":e},this.version=t.version,this.language=t.language,this.latitude=t.latitude,this.longitude=t.longitude,this.country=t.country}#l={airQualityCurrentPromise:null,historicalAir:null};#p={Pollutants:{co:"CO",no:"NO",no2:"NO2",so2:"SO2",o3:"OZONE",nox:"NOX",pm25:"PM2_5",pm2p5:"PM2_5",pm10:"PM10",other:"NOT_AVAILABLE",na:"NOT_AVAILABLE",undefined:"NOT_AVAILABLE",null:"NOT_AVAILABLE"},Units:{"μg/m3":"MICROGRAMS_PER_CUBIC_METER","mg/m3":"MILLIGRAMS_PER_CUBIC_METER",ppb:"PARTS_PER_BILLION",ppm:"PARTS_PER_MILLION"},Availability:{Minutely:["CN","HK","MO"],AirQuality:["AD","BE","BG","CA","CN","HR","CZ","DK","FI","FR","DE","GI","GR","HK","HU","IE","JP","KR","LV","LT","MO","MT","NL","MK","NO","PL","PT","RO","RS","SG","SK","SI","ES","SE","CH","TW","TH","GB","US"]}};static async GetLocationsGrid(t,e){o.debug("☑️ GetLocationsGrid");const n=t?.locationsGrid;if(n?.lastUpdated&&n.lastUpdated+2592e6>Date.now())return o.debug("✅ GetLocationsGrid","Cache found!"),n.data;o.info("⚠️ GetLocationsGrid","Cache not found or stale, fetching...");try{const a=await i({headers:n?.etag?{"If-None-Match":n?.etag}:void 0,url:"https://raw.githubusercontent.com/NSRingo/QWeather-Location-Grid/refs/heads/main/data/qweather-china-city-list-grid.json"});if(304===a.status)return o.debug("✅ GetLocationsGrid","Cache not modified"),e({...t,locationsGrid:{...n,lastUpdated:Date.now()}}),n.data;const s=JSON.parse(a.body),r="function"==typeof a.headers?.get?a.headers.get("ETag"):a.headers?.etag||a.headers?.ETag;return e({...t,locationsGrid:{etag:r,lastUpdated:Date.now(),data:s}}),o.debug("✅ GetLocationsGrid"),s}catch(t){return o.error("GetLocationsGrid error:",t),n?.data||null}}static GetLocationInfo(t,e,i){if(o.debug("☑️ GetLocationInfo"),!t)return o.warn("GetLocationInfo","No locationsGrid provided"),null;const{gridSize:n,grid:a}=t,s=(t,e,i,n)=>{const a=(i-t)*Math.PI/180,s=(n-e)*Math.PI/180,r=Math.sin(a/2)**2+Math.cos(t*Math.PI/180)*Math.cos(i*Math.PI/180)*Math.sin(s/2)**2;return 12742*Math.atan2(Math.sqrt(r),Math.sqrt(1-r))},r=((t,e)=>{const i=((t,e,i=2)=>{const a=Math.floor(e/n),s=Math.floor(t/n),r=[];for(let t=-i;t<=i;t++)for(let e=-i;e<=i;e++)r.push(`${a+t},${s+e}`);return r})(t,e,2);let r=null,o=Number.POSITIVE_INFINITY;for(const n of i){const i=a[n];if(i)for(const n of i){const i=s(t,e,n.latitude,n.longitude);i<o&&(o=i,r=n)}}return r})(e,i);return o.debug("✅ GetLocationInfo"),r}async GeoAPI(t="city/lookup"){o.debug("☑️ GeoAPI");const e={url:`${this.endpoint}/geo/v2/${t}?location=${this.longitude},${this.latitude}`,headers:this.headers};let n;try{const t=await i(e).then(t=>JSON.parse(t?.body??"{}"));if("200"!==t?.code)throw Error(t?.code);n={attributionUrl:t?.location?.[0]?.fxLink,latitude:t?.location?.[0]?.lat,longitude:t?.location?.[0]?.lon,providerLogo:"https://raw.githubusercontent.com/NSRingo/WeatherKit/main/images/icon/v2/QWeather.png",providerName:"和风天气",locationID:t?.location?.[0]?.id}}catch(t){o.error(`GeoAPI: ${t}`)}finally{o.debug("metadata:",n),o.debug("✅ GeoAPI")}return n}async WeatherNow(){o.debug("☑️ WeatherNow");const t={url:`${this.endpoint}/v7/weather/now?location=${this.longitude},${this.latitude}`,headers:this.headers};let e;try{const n=await i(t).then(t=>JSON.parse(t?.body??"{}"));switch(n?.code){case"200":{const t=Date.now()/1e3|0;e={metadata:{attributionUrl:n?.fxLink,expireTime:t+3600,language:"zh-CN",latitude:this.latitude,longitude:this.longitude,providerLogo:"https://raw.githubusercontent.com/NSRingo/WeatherKit/main/images/icon/v2/QWeather.png",providerName:"和风天气",readTime:t,reportedTime:new Date(n?.now?.pubTime).getTime()/1e3|0,temporarilyUnavailable:!1,sourceType:"STATION"},cloudCover:Number.parseInt(n?.now?.cloud,10),conditionCode:K.ConvertWeatherCode(n?.now?.text),humidity:Number.parseInt(n?.now?.humidity,10),perceivedPrecipitationIntensity:Number.parseFloat(n?.now?.precip),pressure:Number.parseFloat(n?.now?.pressure),temperature:Number.parseFloat(n?.now?.temp),temperatureApparent:Number.parseFloat(n?.now?.feelsLike),temperatureDewPoint:Number.parseFloat(n?.now?.dew),visibility:1e3*Number.parseFloat(n?.now?.vis),windDirection:Number.parseInt(n?.now?.wind360,10),windSpeed:Number.parseFloat(n?.now?.windSpeed)};break}case"204":case"400":case"401":case"402":case"403":case"404":case"429":case"500":case void 0:throw Error(n?.code)}}catch(t){o.error(`WeatherNow: ${t}`)}finally{o.debug("✅ WeatherNow")}return e}async#f(){if(o.debug("☑️ AirQualityCurrent"),this.#l.airQualityCurrentPromise)o.debug("✅ AirQualityCurrent","Using cache promise");else{const t={url:`${this.endpoint}/airquality/v1/current/${this.latitude}/${this.longitude}`,headers:this.headers};this.#l.airQualityCurrentPromise=i(t).then(t=>JSON.parse(t?.body??"{}")).then(t=>{if(void 0===t?.error)return t;throw Error(JSON.stringify(t?.error,null,2))}).catch(t=>(o.error(`AirQualityCurrent: ${t}`),this.#l.airQualityCurrentPromise=null,{}))}return this.#l.airQualityCurrentPromise}async Minutely(){if(o.debug("☑️ Minutely"),!this.#p.Availability.Minutely.includes(this.country))return void o.warn("Minutely",`Unsupported country: ${this.country}`);const t={url:`${this.endpoint}/v7/minutely/5m?location=${this.longitude},${this.latitude}`,headers:this.headers};let e;try{const n=await i(t).then(t=>JSON.parse(t?.body??"{}"));switch(n?.code){case"200":{const t=Date.now()/1e3|0;let i=new Date(n?.updateTime).setSeconds(0,0);i=i.valueOf()/1e3,e={metadata:{attributionUrl:n?.fxLink,expireTime:t+3600,language:"zh-CN",latitude:this.latitude,longitude:this.longitude,providerLogo:"https://raw.githubusercontent.com/NSRingo/WeatherKit/main/images/icon/v2/QWeather.png",providerName:"和风天气",readTime:t,reportedTime:t,temporarilyUnavailable:!1,sourceType:"MODELED"},condition:[],forecastEnd:0,forecastStart:i,minutes:n?.minutely?.map((t,e)=>{const i={perceivedPrecipitationIntensity:0,precipitationChance:0,precipitationIntensity:12*Number.parseFloat(t.precip),startTime:new Date(t.fxTime)/1e3};let n=[{...i},{...i},{...i},{...i},{...i}];return n=n.map((t,e)=>(t.startTime=t.startTime+60*e,t)),n}).flat(Number.POSITIVE_INFINITY),summary:[]},e.minutes.length=Math.min(85,e.minutes.length),e.forecastEnd=i+60*e.minutes.length,e.minutes=B.Minute(e.minutes,n?.summary,"mmph"),e.summary=B.Summary(e.minutes),e.condition=B.Condition(e.summary);break}case"204":case"400":case"401":case"402":case"403":case"404":case"429":case"500":case void 0:throw Error(n?.code)}}catch(t){o.error(`Minutely: ${t}`)}finally{o.debug("✅ Minutely")}return e}async Hourly(t=168){o.debug("☑️ Hourly",`host: ${this.host}`);const e={url:`${this.endpoint}/v7/weather/${t}h?location=${this.longitude},${this.latitude}`,headers:this.headers};let n;try{const t=await i(e).then(t=>JSON.parse(t?.body??"{}"));switch(t?.code){case"200":{const e=Date.now()/1e3|0;n={metadata:{attributionUrl:t?.fxLink,expireTime:e+3600,language:"zh-CN",latitude:this.latitude,longitude:this.longitude,providerLogo:"https://raw.githubusercontent.com/NSRingo/WeatherKit/main/images/icon/v2/QWeather.png",providerName:"和风天气",readTime:e,reportedTime:new Date(t?.updateTime),temporarilyUnavailable:!1,sourceType:"STATION"},hours:t?.hourly?.map(t=>({cloudCover:Number.parseInt(t?.cloud,10),conditionCode:K.ConvertWeatherCode(t?.text),forecastStart:new Date(t?.fxTime).getTime()/1e3|0,humidity:Number.parseInt(t?.humidity,10),precipitationAmount:Number.parseFloat(t?.precip),precipitationChance:Number.parseInt(t?.pop,10),precipitationIntensity:Number.parseInt(t?.precip,10),pressure:Number.parseFloat(t?.pressure),temperature:Number.parseFloat(t?.temp),temperatureDewPoint:Number.parseFloat(t?.dew),windDirection:Number.parseInt(t?.wind360,10),windSpeed:Number.parseFloat(t?.windSpeed)}))};break}case"204":case"400":case"401":case"402":case"403":case"404":case"429":case"500":case void 0:throw Error(t?.code)}}catch(t){o.error(`Hourly: ${t}`)}finally{o.debug("✅ Hourly")}return n}async Daily(t=10){o.debug("☑️ Daily",`host: ${this.host}`);const e={url:`${this.endpoint}/v7/weather/${t}d?location=${this.longitude},${this.latitude}`,headers:this.headers};let n;try{const t=await i(e).then(t=>JSON.parse(t?.body??"{}"));switch(t?.code){case"200":{const e=Date.now()/1e3|0,i={attributionUrl:t?.fxLink,expireTime:e+3600,language:"zh-CN",latitude:this.latitude,longitude:this.longitude,providerLogo:"https://raw.githubusercontent.com/NSRingo/WeatherKit/main/images/icon/v2/QWeather.png",providerName:"和风天气",readTime:e,reportedTime:new Date(t?.updateTime),temporarilyUnavailable:!1,sourceType:"STATION"},a=i.reportedTime.getTimezoneOffset();n={metadata:i,days:t?.daily?.map(t=>{const e=(Date.parse(t?.fxDate)/1e3|0)+60*a;return{forecastStart:e,forecastEnd:e+86400,maxUvIndex:Number.parseInt(t?.uvIndex,10),moonPhase:K.ConvertMoonPhase(t?.moonPhase),moonrise:this.#_(t?.fxDate,t?.moonrise),moonset:this.#_(t?.fxDate,t?.moonset),precipitationAmount:Number.parseFloat(t?.precip),sunrise:this.#_(t?.fxDate,t?.sunrise),sunset:this.#_(t?.fxDate,t?.sunset),temperatureMax:Number.parseFloat(t?.tempMax),temperatureMin:Number.parseFloat(t?.tempMin),windSpeedAvg:(7*Number.parseFloat(t?.windSpeedDay)+17*Number.parseFloat(t?.windSpeedNight))/24,daytimeForecast:{forecastStart:e+25200,forecastEnd:e+25200+43200,conditionCode:K.ConvertWeatherCode(t?.textDay),precipitationAmount:Number.parseFloat(t?.precip),windDirection:Number.parseInt(t?.wind360Day,10),windSpeed:Number.parseFloat(t?.windSpeedDay)},overnightForecast:{forecastStart:e+68400,forecastEnd:e+68400+43200,conditionCode:K.ConvertWeatherCode(t?.textNight),precipitationAmount:Number.parseFloat(t?.precip),windDirection:Number.parseInt(t?.wind360Night,10),windSpeed:Number.parseFloat(t?.windSpeedNight)}}})};break}case"204":case"400":case"401":case"402":case"403":case"404":case"429":case"500":case void 0:throw Error(t?.code)}}catch(t){o.error(`Daily: ${t}`)}finally{o.debug("✅ Daily")}return n}async#g(t=new Number,e){if(!e){const t=new Date(Date.now()-864e5);e=t.getFullYear()+String(t.getMonth()+1).padStart(2,"0")+String(t.getDate()).padStart(2,"0")}o.debug("☑️ HistoricalAir",`locationID: ${t}`,`date: ${e}`);const n={url:`${this.endpoint}/v7/historical/air?location=${t}&date=${e}`,headers:this.headers};try{const t=await i(n).then(t=>JSON.parse(t?.body??"{}"));switch(t?.code){case"200":return t;case"204":case"400":case"401":case"402":case"403":case"404":case"429":case"500":case void 0:throw Error(t?.code)}}catch(t){o.error(`HistoricalAir: ${t}`)}finally{o.debug("✅ HistoricalAir")}return{}}#m(t="https://www.qweather.com/",e="MODELED",i=!1){const n=Date.now()/1e3;return{longitude:this.longitude,providerLogo:"https://raw.githubusercontent.com/NSRingo/WeatherKit/main/images/icon/v2/QWeather.png",providerName:"和风天气",reportedTime:n,latitude:this.latitude,expireTime:n+3600,attributionUrl:t,temporarilyUnavailable:i,readTime:n,sourceType:e}}#y(t,e){o.debug("☑️ CreatePollutants"),o.debug("pollutantsObj:",t);const i=t.filter(t=>"ppmC"!==t.concentration.unit).map(({code:t,concentration:i,subIndexes:n=[]})=>{const{value:a,unit:s}=i,r=s.replace("³","3"),d=this.#p.Pollutants[t],c=n.find(t=>t.code===e);e&&!c&&o.warn("CreatePollutants",`No index for ${d} was found for required scale`);const u=F.Config.Units.Friendly,{ugm3:l,mgm3:p,ppb:h,ppm:b}=F.Config.Units.WeatherKit;switch(r){case u.MILLIGRAMS_PER_CUBIC_METER:return{pollutantType:d,amount:F.ConvertUnit(a,p,l),units:l,index:e?c?.aqi??-1:void 0};case u.PARTS_PER_MILLION:return{pollutantType:d,amount:F.ConvertUnit(a,b,h),units:h,index:e?c?.aqi??-1:void 0};default:return{pollutantType:d,amount:a,units:this.#p.Units[r],index:e?c?.aqi??-1:void 0}}});return o.debug("✅ CreatePollutants"),i}#I(t){o.debug("☑️ CreatePollutantsV7"),o.debug("pollutantsObj:",t);const{mgm3:e,ugm3:i}=F.Config.Units.WeatherKit,n=Object.entries(t).map(([t,n])=>{const a=Number.parseFloat(n);switch(t){case"co":return{amount:F.ConvertUnit(a??-1,e,i),pollutantType:this.#p.Pollutants[t],units:i};case"no":case"no2":case"so2":case"o3":case"nox":case"pm25":case"pm10":return{amount:a??-1,pollutantType:this.#p.Pollutants[t],units:i};default:return null}}).filter(Boolean);return o.debug("✅ CreatePollutantsV7"),n}async CurrentAirQuality(t=!0){if(!this.#p.Availability.AirQuality.includes(this.country))return o.warn("CurrentAirQuality",`Unsupported country: ${this.country}`),{metadata:this.#m(`https://www.qweather.com/air/a/${this.latitude},${this.longitude}?from=AppleWeatherService`,void 0,!0),pollutants:[],previousDayComparison:F.Config.CompareCategoryIndexes.UNKNOWN};o.debug("☑️ CurrentAirQuality");const e=await this.#f();if(!Array.isArray(e.pollutants))return o.error("AirQuality","Failed to get current air quality data."),{metadata:this.#m(`https://www.qweather.com/air/a/${this.latitude},${this.longitude}?from=AppleWeatherService`,void 0,!0),pollutants:[],previousDayComparison:F.Config.CompareCategoryIndexes.UNKNOWN};const i=(t=>{o.debug("☑️ findSupportedIndex");const e=["cn-mee","cn-mee-1h","eu-eea","us-epa","us-epa-nc"];for(const i of t)if(e.includes(i.code))return o.debug("✅ indexCodeToScale",`index.code: ${i.code}`),i;return{}})(e.indexes),n=(t=>{o.debug("☑️ indexCodeToScale",`code: ${t}`);const{HJ6332012:e,EPA_NowCast:i,EU_EAQI:n}=F.Config.Scales;switch(t){case"cn-mee":case"cn-mee-1h":return o.debug("✅ indexCodeToScale","HJ6332012"),e;case"us-epa":case"us-epa-nc":return o.debug("✅ indexCodeToScale","EPA_NowCast"),i;case"eu-eea":return o.debug("✅ indexCodeToScale","EU_EAQI"),n;default:return o.error("indexCodeToScale","不支持的code"),{}}})(i?.code),a={metadata:this.#m(`https://www.qweather.com/air/a/${this.latitude},${this.longitude}?from=AppleWeatherService`),pollutants:this.#y(e.pollutants,i?.code),previousDayComparison:F.Config.CompareCategoryIndexes.UNKNOWN};if(!i?.code||!n?.categories)return o.error("AirQuality","No supported index found",`airQualityCurrent.indexes[].code = ${JSON.stringify(e.indexes?.map(({code:t})=>t))}`),{...a,index:-1,isSignificant:!1,categoryIndex:-1,primaryPollutant:"NOT_AVAILABLE",scale:F.ToWeatherKitScale(F.Config.Scales.HJ6332012.weatherKitScale)};const s=Number.parseInt(i.level,10),r=this.#p.Pollutants[i.primaryPollutant?.code]||"NOT_AVAILABLE";o.debug(`apiPrimaryPollutant: ${r}`),t||"NOT_AVAILABLE"!==r||o.info("CurrentAirQuality","Max index of pollutants is <= 50, primaryPollutant will be NOT_AVAILABLE.");const d={metadata:this.#m(`https://www.qweather.com/air/a/${this.latitude},${this.longitude}?from=AppleWeatherService`),categoryIndex:s,index:i.aqi,isSignificant:s>=n.categories.significantIndex,...a,primaryPollutant:r,scale:F.ToWeatherKitScale(n.weatherKitScale)};if("NOT_AVAILABLE"===d.primaryPollutant){const e=F.PrimaryPollutant(a.pollutants,n.categories),i=!t&&e.index<=50;i&&o.info("CurrentAirQuality",`Max index of pollutants ${e.pollutantType} = ${e.index} is <= 50, primaryPollutant will be set to NOT_AVAILABLE.`),i||(d.primaryPollutant=e.pollutantType)}return o.debug("✅ CurrentAirQuality"),d}async prefetchYesterdayAirQuality(t){if(o.debug("☑️ prefetchYesterdayAirQuality"),t&&t.id&&9===t.id.length){this.#l.historicalAir=this.#g(t.id);const e=await this.#l.historicalAir;return o.debug("✅ prefetchYesterdayAirQuality"),e}return o.warn("prefetchYesterdayAirQuality","Invalid locationInfo"),null}async YesterdayAirQuality(t){o.debug("☑️ YesterdayAirQuality","locationInfo:",t);const e={metadata:this.#m(void 0,void 0,!0),categoryIndex:-1,pollutants:[]};if(!this.#p.Availability.AirQuality.includes(this.country))return o.warn("YesterdayAirQuality",`Unsupported country: ${this.country}`),e;if(!t||"TW"===t.iso||9!==t.id.length)return o.error("YesterdayAirQuality","Unsupported location"),e;const i=await(this.#l.historicalAir??this.#g(t.id));if(!i.airHourly)return o.error("YesterdayAirQuality",`Failed to get HistoricalAir(${t.id})`),e;const n=(new Date).getHours(),a=Number.parseInt(i.airHourly[n].level,10),s=Number.parseInt(i.airHourly[n].aqi,10),r=this.#I(i.airHourly[n]);return o.debug(`hour: ${n}`,`index: ${s}`),o.debug("✅ YesterdayAirQuality","pollutants:",r,"categoryIndex:",a),{metadata:this.#m(i.fxLink),categoryIndex:a,index:s,pollutants:r,primaryPollutant:this.#p.Pollutants[i.airHourly[n].primary]||"NOT_AVAILABLE",scale:F.ToWeatherKitScale(F.Config.Scales.HJ6332012.weatherKitScale)}}#_(t,e){return new Date(`${t}T${e}:00+08:00`).getTime()/1e3|0}}const Q={UNKNOWN:0,MUCH_WORSE:1,WORSE:2,SAME:3,BETTER:4,MUCH_BETTER:5,0:"UNKNOWN",1:"MUCH_WORSE",2:"WORSE",3:"SAME",4:"BETTER",5:"MUCH_BETTER"},k={APPLE_INTERNAL:0,MODELED:1,STATION:2,UNKNOWN3:3,UNKNOWN4:4,0:"APPLE_INTERNAL",1:"MODELED",2:"STATION",3:"UNKNOWN3",4:"UNKNOWN4"},G={NOT_AVAILABLE:0,C6H6:1,NH3:2,NMHC:3,NO:4,NO2:5,NOX:6,OZONE:7,PM2_5:8,SO2:9,PM10:10,CO:11,UNKNOWN12:12,UNKNOWN13:13,0:"NOT_AVAILABLE",1:"C6H6",2:"NH3",3:"NMHC",4:"NO",5:"NO2",6:"NOX",7:"OZONE",8:"PM2_5",9:"SO2",10:"PM10",11:"CO",12:"UNKNOWN12",13:"UNKNOWN13"},z={PARTS_PER_BILLION:0,MICROGRAMS_PER_CUBIC_METER:1,UNKNOWN2:2,UNKNOWN3:3,0:"PARTS_PER_BILLION",1:"MICROGRAMS_PER_CUBIC_METER",2:"UNKNOWN2",3:"UNKNOWN3"},Y={UNKNOWN0:0,TEMPERATURE_MAX:1,PRECIPITATION:2,UNKNOWN3:3,0:"UNKNOWN0",1:"TEMPERATURE_MAX",2:"PRECIPITATION",3:"UNKNOWN3"},j={UNKNOWN:0,OBSERVED:1,LIKELY:2,POSSIBLE:3,UNLIKELY:4,UNKNOWN5:5},Z={STEADY:0,INC:1,DEC:2,UNKNOWN3:3,0:"STEADY",1:"INC",2:"DEC",3:"UNKNOWN3"},q=0,J=0,X={CLEAR:0,UNKNOWN1:1,UNKNOWN2:2,SLEET:3,POSSIBLE_SLEET:4,HEAVY_RAIN:5,RAIN:6,DRIZZLE:7,POSSIBLE_DRIZZLE:8,HEAVY_SNOW:9,SNOW:10,UNKNOWN11:11,UNKNOWN12:12,UNKNOWN13:13,UNKNOWN14:14,UNKNOWN15:15,UNKNOWN16:16,UNKNOWN17:17,UNKNOWN18:18,0:"CLEAR",1:"UNKNOWN1",2:"UNKNOWN2",3:"SLEET",4:"POSSIBLE_SLEET",5:"HEAVY_RAIN",6:"RAIN",7:"DRIZZLE",8:"POSSIBLE_DRIZZLE",9:"HEAVY_SNOW",10:"SNOW",11:"UNKNOWN11",12:"UNKNOWN12",13:"UNKNOWN13",14:"UNKNOWN14",15:"UNKNOWN15",16:"UNKNOWN16",17:"UNKNOWN17",18:"UNKNOWN18"},tt={CLEAR:0,START:1,STOP:2,START_STOP:3,STOP_START:4,CONSTANT:5,UNKNOWN6:6,UNKNOWN7:7,0:"CLEAR",1:"START",2:"STOP",3:"START_STOP",4:"STOP_START",5:"CONSTANT",6:"UNKNOWN6",7:"UNKNOWN7"},et={FIRST_AT:0,SECOND_AT:1,UNKNOWN2:2,0:"FIRST_AT",1:"SECOND_AT",2:"UNKNOWN2"},it={CLEAR:0,RAIN:1,SNOW:2,SLEET:3,HAIL:4,MIXED:5,UNKNOWN6:6,0:"CLEAR",1:"RAIN",2:"SNOW",3:"SLEET",4:"HAIL",5:"MIXED",6:"UNKNOWN6"},nt={RISING:0,FALLING:1,STEADY:2,UNDEFINED:3,0:"RISING",1:"FALLING",2:"STEADY",3:"UNDEFINED"},at={CLEAR:0,BLIZZARD:1,PRECIPITATION:2,SLEET:3,BREEZY:4,CLOUDY:5,DRIZZLE:6,FLURRIES:7,FOGGY:8,BLOWING_DUST:9,BLOWING_SNOW:10,FREEZING_RAIN:11,FRIGID:12,HAZE:13,HEAVY_RAIN:14,HEAVY_SNOW:15,HAIL:16,HOT:17,ISOLATED_THUNDERSTORMS:18,MOSTLY_CLEAR:19,MOSTLY_CLOUDY:20,PARTLY_CLOUDY:21,RAIN:22,HURRICANE:23,SCATTERED_THUNDERSTORMS:24,UNKNOWN25:25,SNOW:26,SMOKY:27,UNKNOWN28:28,FREEZING_DRIZZLE:29,THUNDERSTORMS:30,STRONG_STORMS:31,WINDY:32,WINTRY_MIX:33,SUN_FLURRIES:34,SUN_SHOWERS:35,UNKNOWN36:36,TROPICAL_STORM:37,UNKNOWN38:38,UNKNOWN39:39,UNKNOWN40:40,UNKNOWN41:41,UNKNOWN42:42,UNKNOWN43:43,UNKNOWN44:44,0:"CLEAR",1:"BLIZZARD",2:"PRECIPITATION",3:"SLEET",4:"BREEZY",5:"CLOUDY",6:"DRIZZLE",7:"FLURRIES",8:"FOGGY",9:"BLOWING_DUST",10:"BLOWING_SNOW",11:"FREEZING_RAIN",12:"FRIGID",13:"HAZE",14:"HEAVY_RAIN",15:"HEAVY_SNOW",16:"HAIL",17:"HOT",18:"ISOLATED_THUNDERSTORMS",19:"MOSTLY_CLEAR",20:"MOSTLY_CLOUDY",21:"PARTLY_CLOUDY",22:"RAIN",23:"HURRICANE",24:"SCATTERED_THUNDERSTORMS",25:"UNKNOWN25",26:"SNOW",27:"SMOKY",28:"UNKNOWN28",29:"FREEZING_DRIZZLE",30:"THUNDERSTORMS",31:"STRONG_STORMS",32:"WINDY",33:"WINTRY_MIX",34:"SUN_FLURRIES",35:"SUN_SHOWERS",36:"UNKNOWN36",37:"TROPICAL_STORM",38:"UNKNOWN38",39:"UNKNOWN39",40:"UNKNOWN40",41:"UNKNOWN41",42:"UNKNOWN42",43:"UNKNOWN43",44:"UNKNOWN44"},st={NEW:0,WAXING_CRESCENT:1,FIRST_QUARTER:2,WAXING_GIBBOUS:3,FULL:4,WANING_GIBBOUS:5,THIRD_QUARTER:6,WANING_CRESCENT:7,UNKNOWN8:8,0:"NEW",1:"WAXING_CRESCENT",2:"FIRST_QUARTER",3:"WAXING_GIBBOUS",4:"FULL",5:"WANING_GIBBOUS",6:"THIRD_QUARTER",7:"WANING_CRESCENT",8:"UNKNOWN8"},rt={UNKNOWN0:0,AIR_QUALITY_DETAILS:1,UNKNOWN2:2,UNKNOWN3:3,UNKNOWN4:4,UNKNOWN5:5,UNKNOWN6:6,UNKNOWN7:7,UNKNOWN8:8,TEMPERATURE_FEELS_LIKE_DETAILS:9,UNKNOWN10:10,TRENDS:11,UV_DETAILS:12,UNKNOWN13:13,WIND_DETAILS:14,UNKNOWN15:15,UNKNOWN16:16,UNKNOWN17:17,UNKNOWN18:18,0:"UNKNOWN0",1:"AIR_QUALITY_DETAILS",2:"UNKNOWN2",3:"UNKNOWN3",4:"UNKNOWN4",5:"UNKNOWN5",6:"UNKNOWN6",7:"UNKNOWN7",8:"UNKNOWN8",9:"TEMPERATURE_FEELS_LIKE_DETAILS",10:"UNKNOWN10",11:"TRENDS",12:"UV_DETAILS",13:"UNKNOWN13",14:"WIND_DETAILS",15:"UNKNOWN15",16:"UNKNOWN16",17:"UNKNOWN17",18:"UNKNOWN18"},ot={UNKNOWN0:0,SHELTER:1,EVACUATE:2,PREPARE:3,EXECUTE:4,AVOID:5,MONITOR:6,ASSESS:7,ALLCLEAR:8,NONE:9,UNKNOWN10:10,0:"UNKNOWN0",1:"SHELTER",2:"EVACUATE",3:"PREPARE",4:"EXECUTE",5:"AVOID",6:"MONITOR",7:"ASSESS",8:"ALLCLEAR",9:"NONE",10:"UNKNOWN10"},dt={UNKNOWN:0,EXTREME:1,SEVERE:2,MODERATE:3,MINOR:4,UNKNOWN5:5,UNKNOWN6:6,UNKNOWN7:7,UNKNOWN8:8,UNKNOWN9:9,STATEMENT:10,WARNING:11,ADVISORY:12,UNKNOWN13:13,0:"UNKNOWN",1:"EXTREME",2:"SEVERE",3:"MODERATE",4:"MINOR",5:"UNKNOWN5",6:"UNKNOWN6",7:"UNKNOWN7",8:"UNKNOWN8",9:"UNKNOWN9",10:"STATEMENT",11:"WARNING",12:"ADVISORY",13:"UNKNOWN13"},ct={UNKNOWN:0,UNKNOWN1:1,UNKNOWN2:2,UNKNOWN3:3,UNKNOWN4:4,UNKNOWN5:5,UNKNOWN6:6,UNKNOWN7:7,UNKNOWN8:8,UNKNOWN9:9,STATEMENT:10,WARNING:11,ADVISORY:12,UNKNOWN13:13,0:"UNKNOWN",1:"UNKNOWN1",2:"UNKNOWN2",3:"UNKNOWN3",4:"UNKNOWN4",5:"UNKNOWN5",6:"UNKNOWN6",7:"UNKNOWN7",8:"UNKNOWN8",9:"UNKNOWN9",10:"STATEMENT",11:"WARNING",12:"ADVISORY",13:"UNKNOWN13"},ut={UNKNOWN:0,IMMEDIATE:1,EXPECTED:2,FUTURE:3,PAST:4,UNKNOWN5:5,0:"UNKNOWN",1:"IMMEDIATE",2:"EXPECTED",3:"FUTURE",4:"PAST",5:"UNKNOWN5"},lt={UNKNOWN:0,OBSERVED:1,LIKELY:2,POSSIBLE:3,UNLIKELY:4,UNKNOWN5:5,0:"UNKNOWN",1:"OBSERVED",2:"LIKELY",3:"POSSIBLE",4:"UNLIKELY",5:"UNKNOWN5"},pt={UNKNOWN:0,UNKNOWN1:1,UNKNOWN2:2,UNKNOWN3:3,UNKNOWN4:4,UNKNOWN5:5,UNKNOWN6:6,UNKNOWN7:7,UNKNOWN8:8,UNKNOWN9:9,STATEMENT:10,WARNING:11,ADVISORY:12,UNKNOWN13:13,0:"UNKNOWN",1:"UNKNOWN1",2:"UNKNOWN2",3:"UNKNOWN3",4:"UNKNOWN4",5:"UNKNOWN5",6:"UNKNOWN6",7:"UNKNOWN7",8:"UNKNOWN8",9:"UNKNOWN9",10:"STATEMENT",11:"WARNING",12:"ADVISORY",13:"UNKNOWN13"},ht=new Int32Array(2);new Float32Array(ht.buffer),new Float64Array(ht.buffer),new Uint16Array(new Uint8Array([1,0]).buffer)[0];class bt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsMetadata(t,e){return(e||new bt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsMetadata(t,e){return t.setPosition(t.position()+4),(e||new bt).__init(t.readInt32(t.position())+t.position(),t)}attributionUrl(t){const e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__string(this.bb_pos+e,t):null}expireTime(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}language(t){const e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__string(this.bb_pos+e,t):null}latitude(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readFloat32(this.bb_pos+t):0}longitude(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readFloat32(this.bb_pos+t):0}providerLogo(t){const e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__string(this.bb_pos+e,t):null}providerName(t){const e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__string(this.bb_pos+e,t):null}readTime(){const t=this.bb.__offset(this.bb_pos,18);return t?this.bb.readUint32(this.bb_pos+t):0}reportedTime(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readUint32(this.bb_pos+t):0}temporarilyUnavailable(){const t=this.bb.__offset(this.bb_pos,22);return!!t&&!!this.bb.readInt8(this.bb_pos+t)}sourceType(){const t=this.bb.__offset(this.bb_pos,24);return t?this.bb.readInt8(this.bb_pos+t):k.APPLE_INTERNAL}static startMetadata(t){t.startObject(11)}static addAttributionUrl(t,e){t.addFieldOffset(0,e,0)}static addExpireTime(t,e){t.addFieldInt32(1,e,0)}static addLanguage(t,e){t.addFieldOffset(2,e,0)}static addLatitude(t,e){t.addFieldFloat32(3,e,0)}static addLongitude(t,e){t.addFieldFloat32(4,e,0)}static addProviderLogo(t,e){t.addFieldOffset(5,e,0)}static addProviderName(t,e){t.addFieldOffset(6,e,0)}static addReadTime(t,e){t.addFieldInt32(7,e,0)}static addReportedTime(t,e){t.addFieldInt32(8,e,0)}static addTemporarilyUnavailable(t,e){t.addFieldInt8(9,+e,0)}static addSourceType(t,e){t.addFieldInt8(10,e,k.APPLE_INTERNAL)}static endMetadata(t){return t.endObject()}static createMetadata(t,e,i,n,a,s,r,o,d,c,u,l){return bt.startMetadata(t),bt.addAttributionUrl(t,e),bt.addExpireTime(t,i),bt.addLanguage(t,n),bt.addLatitude(t,a),bt.addLongitude(t,s),bt.addProviderLogo(t,r),bt.addProviderName(t,o),bt.addReadTime(t,d),bt.addReportedTime(t,c),bt.addTemporarilyUnavailable(t,u),bt.addSourceType(t,l),bt.endMetadata(t)}}class mt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsPollutant(t,e){return(e||new mt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsPollutant(t,e){return t.setPosition(t.position()+4),(e||new mt).__init(t.readInt32(t.position())+t.position(),t)}pollutantType(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt8(this.bb_pos+t):G.NOT_AVAILABLE}amount(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readFloat32(this.bb_pos+t):0}units(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):z.PARTS_PER_BILLION}static startPollutant(t){t.startObject(3)}static addPollutantType(t,e){t.addFieldInt8(0,e,G.NOT_AVAILABLE)}static addAmount(t,e){t.addFieldFloat32(1,e,0)}static addUnits(t,e){t.addFieldInt8(2,e,z.PARTS_PER_BILLION)}static endPollutant(t){return t.endObject()}static createPollutant(t,e,i,n){return mt.startPollutant(t),mt.addPollutantType(t,e),mt.addAmount(t,i),mt.addUnits(t,n),mt.endPollutant(t)}}class yt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsAirQuality(t,e){return(e||new yt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsAirQuality(t,e){return t.setPosition(t.position()+4),(e||new yt).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const e=this.bb.__offset(this.bb_pos,4);return e?(t||new bt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}categoryIndex(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readInt8(this.bb_pos+t):0}index(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt16(this.bb_pos+t):0}isSignificant(){const t=this.bb.__offset(this.bb_pos,10);return!!t&&!!this.bb.readInt8(this.bb_pos+t)}pollutants(t,e){const i=this.bb.__offset(this.bb_pos,12);return i?(e||new mt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}pollutantsLength(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.__vector_len(this.bb_pos+t):0}previousDayComparison(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readInt8(this.bb_pos+t):Q.UNKNOWN}primaryPollutant(){const t=this.bb.__offset(this.bb_pos,16);return t?this.bb.readInt8(this.bb_pos+t):G.NOT_AVAILABLE}scale(t){const e=this.bb.__offset(this.bb_pos,18);return e?this.bb.__string(this.bb_pos+e,t):null}static startAirQuality(t){t.startObject(8)}static addMetadata(t,e){t.addFieldOffset(0,e,0)}static addCategoryIndex(t,e){t.addFieldInt8(1,e,0)}static addIndex(t,e){t.addFieldInt16(2,e,0)}static addIsSignificant(t,e){t.addFieldInt8(3,+e,0)}static addPollutants(t,e){t.addFieldOffset(4,e,0)}static createPollutantsVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startPollutantsVector(t,e){t.startVector(4,e,4)}static addPreviousDayComparison(t,e){t.addFieldInt8(5,e,Q.UNKNOWN)}static addPrimaryPollutant(t,e){t.addFieldInt8(6,e,G.NOT_AVAILABLE)}static addScale(t,e){t.addFieldOffset(7,e,0)}static endAirQuality(t){return t.endObject()}static createAirQuality(t,e,i,n,a,s,r,o,d){return yt.startAirQuality(t),yt.addMetadata(t,e),yt.addCategoryIndex(t,i),yt.addIndex(t,n),yt.addIsSignificant(t,a),yt.addPollutants(t,s),yt.addPreviousDayComparison(t,r),yt.addPrimaryPollutant(t,o),yt.addScale(t,d),yt.endAirQuality(t)}}let ft=class t{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsUUID(e,i){return(i||new t).__init(e.readInt32(e.position())+e.position(),e)}static getSizePrefixedRootAsUUID(e,i){return e.setPosition(e.position()+4),(i||new t).__init(e.readInt32(e.position())+e.position(),e)}bytes(t){const e=this.bb.__offset(this.bb_pos,4);return e?this.bb.readUint8(this.bb.__vector(this.bb_pos+e)+t):0}bytesLength(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__vector_len(this.bb_pos+t):0}bytesArray(){const t=this.bb.__offset(this.bb_pos,4);return t?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+t),this.bb.__vector_len(this.bb_pos+t)):null}static startUUID(t){t.startObject(1)}static addBytes(t,e){t.addFieldOffset(0,e,0)}static createBytesVector(t,e){t.startVector(1,e.length,1);for(let i=e.length-1;i>=0;i--)t.addInt8(e[i]);return t.endVector()}static startBytesVector(t,e){t.startVector(1,e,1)}static endUUID(t){return t.endObject()}static createUUID(e,i){return t.startUUID(e),t.addBytes(e,i),t.endUUID(e)}};class _t{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsArticles(t,e){return(e||new _t).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsArticles(t,e){return t.setPosition(t.position()+4),(e||new _t).__init(t.readInt32(t.position())+t.position(),t)}id(t){const e=this.bb.__offset(this.bb_pos,4);return e?this.bb.__string(this.bb_pos+e,t):null}supportedStorefronts(t,e){const i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__string(this.bb.__vector(this.bb_pos+i)+4*t,e):null}supportedStorefrontsLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}alertIds(t,e){const i=this.bb.__offset(this.bb_pos,8);return i?(e||new ft).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}alertIdsLength(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}phenomena(t,e){const i=this.bb.__offset(this.bb_pos,10);return i?this.bb.__string(this.bb.__vector(this.bb_pos+i)+4*t,e):null}phenomenaLength(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__vector_len(this.bb_pos+t):0}headlineOverride(t){const e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__string(this.bb_pos+e,t):null}locale(t){const e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__string(this.bb_pos+e,t):null}static startArticles(t){t.startObject(6)}static addId(t,e){t.addFieldOffset(0,e,0)}static addSupportedStorefronts(t,e){t.addFieldOffset(1,e,0)}static createSupportedStorefrontsVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startSupportedStorefrontsVector(t,e){t.startVector(4,e,4)}static addAlertIds(t,e){t.addFieldOffset(2,e,0)}static createAlertIdsVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startAlertIdsVector(t,e){t.startVector(4,e,4)}static addPhenomena(t,e){t.addFieldOffset(3,e,0)}static createPhenomenaVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startPhenomenaVector(t,e){t.startVector(4,e,4)}static addHeadlineOverride(t,e){t.addFieldOffset(4,e,0)}static addLocale(t,e){t.addFieldOffset(5,e,0)}static endArticles(t){return t.endObject()}static createArticles(t,e,i,n,a,s,r){return _t.startArticles(t),_t.addId(t,e),_t.addSupportedStorefronts(t,i),_t.addAlertIds(t,n),_t.addPhenomena(t,a),_t.addHeadlineOverride(t,s),_t.addLocale(t,r),_t.endArticles(t)}}class gt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsChange(t,e){return(e||new gt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsChange(t,e){return t.setPosition(t.position()+4),(e||new gt).__init(t.readInt32(t.position())+t.position(),t)}forecastStart(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}forecastEnd(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}maxTemperatureChange(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):Z.STEADY}minTemperatureChange(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):Z.STEADY}dayPrecipitationChange(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readInt8(this.bb_pos+t):Z.STEADY}nightPrecipitationChange(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readInt8(this.bb_pos+t):Z.STEADY}static startChange(t){t.startObject(6)}static addForecastStart(t,e){t.addFieldInt32(0,e,0)}static addForecastEnd(t,e){t.addFieldInt32(1,e,0)}static addMaxTemperatureChange(t,e){t.addFieldInt8(2,e,Z.STEADY)}static addMinTemperatureChange(t,e){t.addFieldInt8(3,e,Z.STEADY)}static addDayPrecipitationChange(t,e){t.addFieldInt8(4,e,Z.STEADY)}static addNightPrecipitationChange(t,e){t.addFieldInt8(5,e,Z.STEADY)}static endChange(t){return t.endObject()}static createChange(t,e,i,n,a,s,r){return gt.startChange(t),gt.addForecastStart(t,e),gt.addForecastEnd(t,i),gt.addMaxTemperatureChange(t,n),gt.addMinTemperatureChange(t,a),gt.addDayPrecipitationChange(t,s),gt.addNightPrecipitationChange(t,r),gt.endChange(t)}}class It{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsComparison(t,e){return(e||new It).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsComparison(t,e){return t.setPosition(t.position()+4),(e||new It).__init(t.readInt32(t.position())+t.position(),t)}condition(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt8(this.bb_pos+t):q}currentValue(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readFloat32(this.bb_pos+t):0}baselineValue(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readFloat32(this.bb_pos+t):0}deviation(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):J}baselineType(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readUint32(this.bb_pos+t):0}baselineStartDate(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readUint32(this.bb_pos+t):0}static startComparison(t){t.startObject(6)}static addCondition(t,e){t.addFieldInt8(0,e,q)}static addCurrentValue(t,e){t.addFieldFloat32(1,e,0)}static addBaselineValue(t,e){t.addFieldFloat32(2,e,0)}static addDeviation(t,e){t.addFieldInt8(3,e,J)}static addBaselineType(t,e){t.addFieldInt32(4,e,0)}static addBaselineStartDate(t,e){t.addFieldInt32(5,e,0)}static endComparison(t){return t.endObject()}static createComparison(t,e,i,n,a,s,r){return It.startComparison(t),It.addCondition(t,e),It.addCurrentValue(t,i),It.addBaselineValue(t,n),It.addDeviation(t,a),It.addBaselineType(t,s),It.addBaselineStartDate(t,r),It.endComparison(t)}}class Nt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsParameter(t,e){return(e||new Nt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsParameter(t,e){return t.setPosition(t.position()+4),(e||new Nt).__init(t.readInt32(t.position())+t.position(),t)}type(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt8(this.bb_pos+t):et.FIRST_AT}date(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}static startParameter(t){t.startObject(2)}static addType(t,e){t.addFieldInt8(0,e,et.FIRST_AT)}static addDate(t,e){t.addFieldInt32(1,e,0)}static endParameter(t){return t.endObject()}static createParameter(t,e,i){return Nt.startParameter(t),Nt.addType(t,e),Nt.addDate(t,i),Nt.endParameter(t)}}class Ct{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsCondition(t,e){return(e||new Ct).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsCondition(t,e){return t.setPosition(t.position()+4),(e||new Ct).__init(t.readInt32(t.position())+t.position(),t)}startTime(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}endTime(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}forecastToken(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):tt.CLEAR}beginCondition(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):X.CLEAR}endCondition(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readInt8(this.bb_pos+t):X.CLEAR}parameters(t,e){const i=this.bb.__offset(this.bb_pos,14);return i?(e||new Nt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}parametersLength(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__vector_len(this.bb_pos+t):0}static startCondition(t){t.startObject(6)}static addStartTime(t,e){t.addFieldInt32(0,e,0)}static addEndTime(t,e){t.addFieldInt32(1,e,0)}static addForecastToken(t,e){t.addFieldInt8(2,e,tt.CLEAR)}static addBeginCondition(t,e){t.addFieldInt8(3,e,X.CLEAR)}static addEndCondition(t,e){t.addFieldInt8(4,e,X.CLEAR)}static addParameters(t,e){t.addFieldOffset(5,e,0)}static createParametersVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startParametersVector(t,e){t.startVector(4,e,4)}static endCondition(t){return t.endObject()}static createCondition(t,e,i,n,a,s,r){return Ct.startCondition(t),Ct.addStartTime(t,e),Ct.addEndTime(t,i),Ct.addForecastToken(t,n),Ct.addBeginCondition(t,a),Ct.addEndCondition(t,s),Ct.addParameters(t,r),Ct.endCondition(t)}}class xt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsPrecipitationAmountByType(t,e){return(e||new xt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsPrecipitationAmountByType(t,e){return t.setPosition(t.position()+4),(e||new xt).__init(t.readInt32(t.position())+t.position(),t)}precipitationType(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt8(this.bb_pos+t):it.CLEAR}expected(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readFloat32(this.bb_pos+t):0}minimumSnow(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readFloat32(this.bb_pos+t):0}maximumSnow(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readFloat32(this.bb_pos+t):0}expectedSnow(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readFloat32(this.bb_pos+t):0}static startPrecipitationAmountByType(t){t.startObject(5)}static addPrecipitationType(t,e){t.addFieldInt8(0,e,it.CLEAR)}static addExpected(t,e){t.addFieldFloat32(1,e,0)}static addMinimumSnow(t,e){t.addFieldFloat32(2,e,0)}static addMaximumSnow(t,e){t.addFieldFloat32(3,e,0)}static addExpectedSnow(t,e){t.addFieldFloat32(4,e,0)}static endPrecipitationAmountByType(t){return t.endObject()}static createPrecipitationAmountByType(t,e,i,n,a,s){return xt.startPrecipitationAmountByType(t),xt.addPrecipitationType(t,e),xt.addExpected(t,i),xt.addMinimumSnow(t,n),xt.addMaximumSnow(t,a),xt.addExpectedSnow(t,s),xt.endPrecipitationAmountByType(t)}}class At{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsCurrentWeatherData(t,e){return(e||new At).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsCurrentWeatherData(t,e){return t.setPosition(t.position()+4),(e||new At).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const e=this.bb.__offset(this.bb_pos,4);return e?(t||new bt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}asOf(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}cloudCover(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverLowAltPct(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverMidAltPct(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverHighAltPct(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readInt8(this.bb_pos+t):0}conditionCode(){const t=this.bb.__offset(this.bb_pos,16);return t?this.bb.readInt8(this.bb_pos+t):at.CLEAR}daylight(){const t=this.bb.__offset(this.bb_pos,18);return!!t&&!!this.bb.readInt8(this.bb_pos+t)}humidity(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readInt8(this.bb_pos+t):0}perceivedPrecipitationIntensity(){const t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmount1h(){const t=this.bb.__offset(this.bb_pos,24);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmount6h(){const t=this.bb.__offset(this.bb_pos,26);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmount24h(){const t=this.bb.__offset(this.bb_pos,28);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmountNext1h(){const t=this.bb.__offset(this.bb_pos,30);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmountNext6h(){const t=this.bb.__offset(this.bb_pos,32);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmountNext24h(){const t=this.bb.__offset(this.bb_pos,34);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmountNext1hByType(t,e){const i=this.bb.__offset(this.bb_pos,36);return i?(e||new xt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountNext1hByTypeLength(){const t=this.bb.__offset(this.bb_pos,36);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationAmountNext6hByType(t,e){const i=this.bb.__offset(this.bb_pos,38);return i?(e||new xt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountNext6hByTypeLength(){const t=this.bb.__offset(this.bb_pos,38);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationAmountNext24hByType(t,e){const i=this.bb.__offset(this.bb_pos,40);return i?(e||new xt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountNext24hByTypeLength(){const t=this.bb.__offset(this.bb_pos,40);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationAmountPrevious1hByType(t,e){const i=this.bb.__offset(this.bb_pos,42);return i?(e||new xt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountPrevious1hByTypeLength(){const t=this.bb.__offset(this.bb_pos,42);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationAmountPrevious6hByType(t,e){const i=this.bb.__offset(this.bb_pos,44);return i?(e||new xt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountPrevious6hByTypeLength(){const t=this.bb.__offset(this.bb_pos,44);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationAmountPrevious24hByType(t,e){const i=this.bb.__offset(this.bb_pos,46);return i?(e||new xt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountPrevious24hByTypeLength(){const t=this.bb.__offset(this.bb_pos,46);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationIntensity(){const t=this.bb.__offset(this.bb_pos,48);return t?this.bb.readFloat32(this.bb_pos+t):0}pressure(){const t=this.bb.__offset(this.bb_pos,50);return t?this.bb.readFloat32(this.bb_pos+t):0}pressureTrend(){const t=this.bb.__offset(this.bb_pos,52);return t?this.bb.readInt8(this.bb_pos+t):nt.RISING}snowfallAmount1h(){const t=this.bb.__offset(this.bb_pos,54);return t?this.bb.readFloat32(this.bb_pos+t):0}snowfallAmount6h(){const t=this.bb.__offset(this.bb_pos,56);return t?this.bb.readFloat32(this.bb_pos+t):0}snowfallAmount24h(){const t=this.bb.__offset(this.bb_pos,58);return t?this.bb.readFloat32(this.bb_pos+t):0}snowfallAmountNext1h(){const t=this.bb.__offset(this.bb_pos,60);return t?this.bb.readFloat32(this.bb_pos+t):0}snowfallAmountNext6h(){const t=this.bb.__offset(this.bb_pos,62);return t?this.bb.readFloat32(this.bb_pos+t):0}snowfallAmountNext24h(){const t=this.bb.__offset(this.bb_pos,64);return t?this.bb.readFloat32(this.bb_pos+t):0}temperature(){const t=this.bb.__offset(this.bb_pos,66);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureApparent(){const t=this.bb.__offset(this.bb_pos,68);return t?this.bb.readFloat32(this.bb_pos+t):0}unknown34(){const t=this.bb.__offset(this.bb_pos,70);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureDewPoint(){const t=this.bb.__offset(this.bb_pos,72);return t?this.bb.readFloat32(this.bb_pos+t):0}uvIndex(){const t=this.bb.__offset(this.bb_pos,74);return t?this.bb.readInt8(this.bb_pos+t):0}visibility(){const t=this.bb.__offset(this.bb_pos,76);return t?this.bb.readFloat32(this.bb_pos+t):0}windDirection(){const t=this.bb.__offset(this.bb_pos,78);return t?this.bb.readInt16(this.bb_pos+t):0}windGust(){const t=this.bb.__offset(this.bb_pos,80);return t?this.bb.readFloat32(this.bb_pos+t):0}windSpeed(){const t=this.bb.__offset(this.bb_pos,82);return t?this.bb.readFloat32(this.bb_pos+t):0}static startCurrentWeatherData(t){t.startObject(40)}static addMetadata(t,e){t.addFieldOffset(0,e,0)}static addAsOf(t,e){t.addFieldInt32(1,e,0)}static addCloudCover(t,e){t.addFieldInt8(2,e,0)}static addCloudCoverLowAltPct(t,e){t.addFieldInt8(3,e,0)}static addCloudCoverMidAltPct(t,e){t.addFieldInt8(4,e,0)}static addCloudCoverHighAltPct(t,e){t.addFieldInt8(5,e,0)}static addConditionCode(t,e){t.addFieldInt8(6,e,at.CLEAR)}static addDaylight(t,e){t.addFieldInt8(7,+e,0)}static addHumidity(t,e){t.addFieldInt8(8,e,0)}static addPerceivedPrecipitationIntensity(t,e){t.addFieldFloat32(9,e,0)}static addPrecipitationAmount1h(t,e){t.addFieldFloat32(10,e,0)}static addPrecipitationAmount6h(t,e){t.addFieldFloat32(11,e,0)}static addPrecipitationAmount24h(t,e){t.addFieldFloat32(12,e,0)}static addPrecipitationAmountNext1h(t,e){t.addFieldFloat32(13,e,0)}static addPrecipitationAmountNext6h(t,e){t.addFieldFloat32(14,e,0)}static addPrecipitationAmountNext24h(t,e){t.addFieldFloat32(15,e,0)}static addPrecipitationAmountNext1hByType(t,e){t.addFieldOffset(16,e,0)}static createPrecipitationAmountNext1hByTypeVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startPrecipitationAmountNext1hByTypeVector(t,e){t.startVector(4,e,4)}static addPrecipitationAmountNext6hByType(t,e){t.addFieldOffset(17,e,0)}static createPrecipitationAmountNext6hByTypeVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startPrecipitationAmountNext6hByTypeVector(t,e){t.startVector(4,e,4)}static addPrecipitationAmountNext24hByType(t,e){t.addFieldOffset(18,e,0)}static createPrecipitationAmountNext24hByTypeVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startPrecipitationAmountNext24hByTypeVector(t,e){t.startVector(4,e,4)}static addPrecipitationAmountPrevious1hByType(t,e){t.addFieldOffset(19,e,0)}static createPrecipitationAmountPrevious1hByTypeVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startPrecipitationAmountPrevious1hByTypeVector(t,e){t.startVector(4,e,4)}static addPrecipitationAmountPrevious6hByType(t,e){t.addFieldOffset(20,e,0)}static createPrecipitationAmountPrevious6hByTypeVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startPrecipitationAmountPrevious6hByTypeVector(t,e){t.startVector(4,e,4)}static addPrecipitationAmountPrevious24hByType(t,e){t.addFieldOffset(21,e,0)}static createPrecipitationAmountPrevious24hByTypeVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startPrecipitationAmountPrevious24hByTypeVector(t,e){t.startVector(4,e,4)}static addPrecipitationIntensity(t,e){t.addFieldFloat32(22,e,0)}static addPressure(t,e){t.addFieldFloat32(23,e,0)}static addPressureTrend(t,e){t.addFieldInt8(24,e,nt.RISING)}static addSnowfallAmount1h(t,e){t.addFieldFloat32(25,e,0)}static addSnowfallAmount6h(t,e){t.addFieldFloat32(26,e,0)}static addSnowfallAmount24h(t,e){t.addFieldFloat32(27,e,0)}static addSnowfallAmountNext1h(t,e){t.addFieldFloat32(28,e,0)}static addSnowfallAmountNext6h(t,e){t.addFieldFloat32(29,e,0)}static addSnowfallAmountNext24h(t,e){t.addFieldFloat32(30,e,0)}static addTemperature(t,e){t.addFieldFloat32(31,e,0)}static addTemperatureApparent(t,e){t.addFieldFloat32(32,e,0)}static addUnknown34(t,e){t.addFieldFloat32(33,e,0)}static addTemperatureDewPoint(t,e){t.addFieldFloat32(34,e,0)}static addUvIndex(t,e){t.addFieldInt8(35,e,0)}static addVisibility(t,e){t.addFieldFloat32(36,e,0)}static addWindDirection(t,e){t.addFieldInt16(37,e,0)}static addWindGust(t,e){t.addFieldFloat32(38,e,0)}static addWindSpeed(t,e){t.addFieldFloat32(39,e,0)}static endCurrentWeatherData(t){return t.endObject()}static createCurrentWeatherData(t,e,i,n,a,s,r,o,d,c,u,l,p,h,b,m,y,f,_,g,I,N,C,x,A,T,S,v,F,w,O,E,P,U,M,R,H,W,L,D,B){return At.startCurrentWeatherData(t),At.addMetadata(t,e),At.addAsOf(t,i),At.addCloudCover(t,n),At.addCloudCoverLowAltPct(t,a),At.addCloudCoverMidAltPct(t,s),At.addCloudCoverHighAltPct(t,r),At.addConditionCode(t,o),At.addDaylight(t,d),At.addHumidity(t,c),At.addPerceivedPrecipitationIntensity(t,u),At.addPrecipitationAmount1h(t,l),At.addPrecipitationAmount6h(t,p),At.addPrecipitationAmount24h(t,h),At.addPrecipitationAmountNext1h(t,b),At.addPrecipitationAmountNext6h(t,m),At.addPrecipitationAmountNext24h(t,y),At.addPrecipitationAmountNext1hByType(t,f),At.addPrecipitationAmountNext6hByType(t,_),At.addPrecipitationAmountNext24hByType(t,g),At.addPrecipitationAmountPrevious1hByType(t,I),At.addPrecipitationAmountPrevious6hByType(t,N),At.addPrecipitationAmountPrevious24hByType(t,C),At.addPrecipitationIntensity(t,x),At.addPressure(t,A),At.addPressureTrend(t,T),At.addSnowfallAmount1h(t,S),At.addSnowfallAmount6h(t,v),At.addSnowfallAmount24h(t,F),At.addSnowfallAmountNext1h(t,w),At.addSnowfallAmountNext6h(t,O),At.addSnowfallAmountNext24h(t,E),At.addTemperature(t,P),At.addTemperatureApparent(t,U),At.addUnknown34(t,M),At.addTemperatureDewPoint(t,R),At.addUvIndex(t,H),At.addVisibility(t,W),At.addWindDirection(t,L),At.addWindGust(t,D),At.addWindSpeed(t,B),At.endCurrentWeatherData(t)}}class Tt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsDayPartForecast(t,e){return(e||new Tt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDayPartForecast(t,e){return t.setPosition(t.position()+4),(e||new Tt).__init(t.readInt32(t.position())+t.position(),t)}forecastStart(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}forecastEnd(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}cloudCover(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverLowAltPct(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverMidAltPct(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverHighAltPct(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readInt8(this.bb_pos+t):0}conditionCode(){const t=this.bb.__offset(this.bb_pos,16);return t?this.bb.readInt8(this.bb_pos+t):at.CLEAR}humidity(){const t=this.bb.__offset(this.bb_pos,18);return t?this.bb.readInt8(this.bb_pos+t):0}humidityMax(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readInt8(this.bb_pos+t):0}humidityMin(){const t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readInt8(this.bb_pos+t):0}precipitationAmount(){const t=this.bb.__offset(this.bb_pos,24);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmountByType(t,e){const i=this.bb.__offset(this.bb_pos,26);return i?(e||new xt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountByTypeLength(){const t=this.bb.__offset(this.bb_pos,26);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationChance(){const t=this.bb.__offset(this.bb_pos,28);return t?this.bb.readInt8(this.bb_pos+t):0}precipitationType(){const t=this.bb.__offset(this.bb_pos,30);return t?this.bb.readInt8(this.bb_pos+t):it.CLEAR}snowfallAmount(){const t=this.bb.__offset(this.bb_pos,32);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureMax(){const t=this.bb.__offset(this.bb_pos,34);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureMin(){const t=this.bb.__offset(this.bb_pos,36);return t?this.bb.readFloat32(this.bb_pos+t):0}visibilityMax(){const t=this.bb.__offset(this.bb_pos,38);return t?this.bb.readFloat32(this.bb_pos+t):0}visibilityMin(){const t=this.bb.__offset(this.bb_pos,40);return t?this.bb.readFloat32(this.bb_pos+t):0}windDirection(){const t=this.bb.__offset(this.bb_pos,42);return t?this.bb.readInt16(this.bb_pos+t):0}windGustSpeedMax(){const t=this.bb.__offset(this.bb_pos,44);return t?this.bb.readFloat32(this.bb_pos+t):0}windSpeed(){const t=this.bb.__offset(this.bb_pos,46);return t?this.bb.readFloat32(this.bb_pos+t):0}windSpeedMax(){const t=this.bb.__offset(this.bb_pos,48);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationIntensityMax(){const t=this.bb.__offset(this.bb_pos,50);return t?this.bb.readFloat32(this.bb_pos+t):0}perceivedPrecipitationIntensityMax(){const t=this.bb.__offset(this.bb_pos,52);return t?this.bb.readFloat32(this.bb_pos+t):0}uvIndexMin(){const t=this.bb.__offset(this.bb_pos,54);return t?this.bb.readInt8(this.bb_pos+t):0}uvIndexMax(){const t=this.bb.__offset(this.bb_pos,56);return t?this.bb.readInt8(this.bb_pos+t):0}temperatureApparentMin(){const t=this.bb.__offset(this.bb_pos,58);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureApparentMax(){const t=this.bb.__offset(this.bb_pos,60);return t?this.bb.readFloat32(this.bb_pos+t):0}daylight(){const t=this.bb.__offset(this.bb_pos,62);return!!t&&!!this.bb.readInt8(this.bb_pos+t)}static startDayPartForecast(t){t.startObject(30)}static addForecastStart(t,e){t.addFieldInt32(0,e,0)}static addForecastEnd(t,e){t.addFieldInt32(1,e,0)}static addCloudCover(t,e){t.addFieldInt8(2,e,0)}static addCloudCoverLowAltPct(t,e){t.addFieldInt8(3,e,0)}static addCloudCoverMidAltPct(t,e){t.addFieldInt8(4,e,0)}static addCloudCoverHighAltPct(t,e){t.addFieldInt8(5,e,0)}static addConditionCode(t,e){t.addFieldInt8(6,e,at.CLEAR)}static addHumidity(t,e){t.addFieldInt8(7,e,0)}static addHumidityMax(t,e){t.addFieldInt8(8,e,0)}static addHumidityMin(t,e){t.addFieldInt8(9,e,0)}static addPrecipitationAmount(t,e){t.addFieldFloat32(10,e,0)}static addPrecipitationAmountByType(t,e){t.addFieldOffset(11,e,0)}static createPrecipitationAmountByTypeVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startPrecipitationAmountByTypeVector(t,e){t.startVector(4,e,4)}static addPrecipitationChance(t,e){t.addFieldInt8(12,e,0)}static addPrecipitationType(t,e){t.addFieldInt8(13,e,it.CLEAR)}static addSnowfallAmount(t,e){t.addFieldFloat32(14,e,0)}static addTemperatureMax(t,e){t.addFieldFloat32(15,e,0)}static addTemperatureMin(t,e){t.addFieldFloat32(16,e,0)}static addVisibilityMax(t,e){t.addFieldFloat32(17,e,0)}static addVisibilityMin(t,e){t.addFieldFloat32(18,e,0)}static addWindDirection(t,e){t.addFieldInt16(19,e,0)}static addWindGustSpeedMax(t,e){t.addFieldFloat32(20,e,0)}static addWindSpeed(t,e){t.addFieldFloat32(21,e,0)}static addWindSpeedMax(t,e){t.addFieldFloat32(22,e,0)}static addPrecipitationIntensityMax(t,e){t.addFieldFloat32(23,e,0)}static addPerceivedPrecipitationIntensityMax(t,e){t.addFieldFloat32(24,e,0)}static addUvIndexMin(t,e){t.addFieldInt8(25,e,0)}static addUvIndexMax(t,e){t.addFieldInt8(26,e,0)}static addTemperatureApparentMin(t,e){t.addFieldFloat32(27,e,0)}static addTemperatureApparentMax(t,e){t.addFieldFloat32(28,e,0)}static addDaylight(t,e){t.addFieldInt8(29,+e,0)}static endDayPartForecast(t){return t.endObject()}static createDayPartForecast(t,e,i,n,a,s,r,o,d,c,u,l,p,h,b,m,y,f,_,g,I,N,C,x,A,T,S,v,F,w,O){return Tt.startDayPartForecast(t),Tt.addForecastStart(t,e),Tt.addForecastEnd(t,i),Tt.addCloudCover(t,n),Tt.addCloudCoverLowAltPct(t,a),Tt.addCloudCoverMidAltPct(t,s),Tt.addCloudCoverHighAltPct(t,r),Tt.addConditionCode(t,o),Tt.addHumidity(t,d),Tt.addHumidityMax(t,c),Tt.addHumidityMin(t,u),Tt.addPrecipitationAmount(t,l),Tt.addPrecipitationAmountByType(t,p),Tt.addPrecipitationChance(t,h),Tt.addPrecipitationType(t,b),Tt.addSnowfallAmount(t,m),Tt.addTemperatureMax(t,y),Tt.addTemperatureMin(t,f),Tt.addVisibilityMax(t,_),Tt.addVisibilityMin(t,g),Tt.addWindDirection(t,I),Tt.addWindGustSpeedMax(t,N),Tt.addWindSpeed(t,C),Tt.addWindSpeedMax(t,x),Tt.addPrecipitationIntensityMax(t,A),Tt.addPerceivedPrecipitationIntensityMax(t,T),Tt.addUvIndexMin(t,S),Tt.addUvIndexMax(t,v),Tt.addTemperatureApparentMin(t,F),Tt.addTemperatureApparentMax(t,w),Tt.addDaylight(t,O),Tt.endDayPartForecast(t)}}class St{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsDayWeatherConditions(t,e){return(e||new St).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDayWeatherConditions(t,e){return t.setPosition(t.position()+4),(e||new St).__init(t.readInt32(t.position())+t.position(),t)}forecastStart(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}forecastEnd(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}conditionCode(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):at.CLEAR}humidityMax(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):0}humidityMin(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readInt8(this.bb_pos+t):0}maxUvIndex(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readInt8(this.bb_pos+t):0}moonPhase(){const t=this.bb.__offset(this.bb_pos,16);return t?this.bb.readInt8(this.bb_pos+t):st.NEW}moonrise(){const t=this.bb.__offset(this.bb_pos,18);return t?this.bb.readUint32(this.bb_pos+t):0}moonset(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readUint32(this.bb_pos+t):0}precipitationAmount(){const t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmountByType(t,e){const i=this.bb.__offset(this.bb_pos,24);return i?(e||new xt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountByTypeLength(){const t=this.bb.__offset(this.bb_pos,24);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationChance(){const t=this.bb.__offset(this.bb_pos,26);return t?this.bb.readInt8(this.bb_pos+t):0}precipitationType(){const t=this.bb.__offset(this.bb_pos,28);return t?this.bb.readInt8(this.bb_pos+t):it.CLEAR}snowfallAmount(){const t=this.bb.__offset(this.bb_pos,30);return t?this.bb.readFloat32(this.bb_pos+t):0}solarMidnight(){const t=this.bb.__offset(this.bb_pos,32);return t?this.bb.readUint32(this.bb_pos+t):0}solarNoon(){const t=this.bb.__offset(this.bb_pos,34);return t?this.bb.readUint32(this.bb_pos+t):0}sunrise(){const t=this.bb.__offset(this.bb_pos,36);return t?this.bb.readUint32(this.bb_pos+t):0}sunriseCivil(){const t=this.bb.__offset(this.bb_pos,38);return t?this.bb.readUint32(this.bb_pos+t):0}sunriseNautical(){const t=this.bb.__offset(this.bb_pos,40);return t?this.bb.readUint32(this.bb_pos+t):0}sunriseAstronomical(){const t=this.bb.__offset(this.bb_pos,42);return t?this.bb.readUint32(this.bb_pos+t):0}sunset(){const t=this.bb.__offset(this.bb_pos,44);return t?this.bb.readUint32(this.bb_pos+t):0}sunsetCivil(){const t=this.bb.__offset(this.bb_pos,46);return t?this.bb.readUint32(this.bb_pos+t):0}sunsetNautical(){const t=this.bb.__offset(this.bb_pos,48);return t?this.bb.readUint32(this.bb_pos+t):0}sunsetAstronomical(){const t=this.bb.__offset(this.bb_pos,50);return t?this.bb.readUint32(this.bb_pos+t):0}temperatureMax(){const t=this.bb.__offset(this.bb_pos,52);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureMaxTime(){const t=this.bb.__offset(this.bb_pos,54);return t?this.bb.readUint32(this.bb_pos+t):0}temperatureMin(){const t=this.bb.__offset(this.bb_pos,56);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureMinTime(){const t=this.bb.__offset(this.bb_pos,58);return t?this.bb.readUint32(this.bb_pos+t):0}windGustSpeedMax(){const t=this.bb.__offset(this.bb_pos,60);return t?this.bb.readFloat32(this.bb_pos+t):0}windSpeedAvg(){const t=this.bb.__offset(this.bb_pos,62);return t?this.bb.readFloat32(this.bb_pos+t):0}windSpeedMax(){const t=this.bb.__offset(this.bb_pos,64);return t?this.bb.readFloat32(this.bb_pos+t):0}visibilityMax(){const t=this.bb.__offset(this.bb_pos,66);return t?this.bb.readFloat32(this.bb_pos+t):0}visibilityMin(){const t=this.bb.__offset(this.bb_pos,68);return t?this.bb.readFloat32(this.bb_pos+t):0}overnightForecast(t){const e=this.bb.__offset(this.bb_pos,70);return e?(t||new Tt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}daytimeForecast(t){const e=this.bb.__offset(this.bb_pos,72);return e?(t||new Tt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}restOfDayForecast(t){const e=this.bb.__offset(this.bb_pos,74);return e?(t||new Tt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}static startDayWeatherConditions(t){t.startObject(36)}static addForecastStart(t,e){t.addFieldInt32(0,e,0)}static addForecastEnd(t,e){t.addFieldInt32(1,e,0)}static addConditionCode(t,e){t.addFieldInt8(2,e,at.CLEAR)}static addHumidityMax(t,e){t.addFieldInt8(3,e,0)}static addHumidityMin(t,e){t.addFieldInt8(4,e,0)}static addMaxUvIndex(t,e){t.addFieldInt8(5,e,0)}static addMoonPhase(t,e){t.addFieldInt8(6,e,st.NEW)}static addMoonrise(t,e){t.addFieldInt32(7,e,0)}static addMoonset(t,e){t.addFieldInt32(8,e,0)}static addPrecipitationAmount(t,e){t.addFieldFloat32(9,e,0)}static addPrecipitationAmountByType(t,e){t.addFieldOffset(10,e,0)}static createPrecipitationAmountByTypeVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startPrecipitationAmountByTypeVector(t,e){t.startVector(4,e,4)}static addPrecipitationChance(t,e){t.addFieldInt8(11,e,0)}static addPrecipitationType(t,e){t.addFieldInt8(12,e,it.CLEAR)}static addSnowfallAmount(t,e){t.addFieldFloat32(13,e,0)}static addSolarMidnight(t,e){t.addFieldInt32(14,e,0)}static addSolarNoon(t,e){t.addFieldInt32(15,e,0)}static addSunrise(t,e){t.addFieldInt32(16,e,0)}static addSunriseCivil(t,e){t.addFieldInt32(17,e,0)}static addSunriseNautical(t,e){t.addFieldInt32(18,e,0)}static addSunriseAstronomical(t,e){t.addFieldInt32(19,e,0)}static addSunset(t,e){t.addFieldInt32(20,e,0)}static addSunsetCivil(t,e){t.addFieldInt32(21,e,0)}static addSunsetNautical(t,e){t.addFieldInt32(22,e,0)}static addSunsetAstronomical(t,e){t.addFieldInt32(23,e,0)}static addTemperatureMax(t,e){t.addFieldFloat32(24,e,0)}static addTemperatureMaxTime(t,e){t.addFieldInt32(25,e,0)}static addTemperatureMin(t,e){t.addFieldFloat32(26,e,0)}static addTemperatureMinTime(t,e){t.addFieldInt32(27,e,0)}static addWindGustSpeedMax(t,e){t.addFieldFloat32(28,e,0)}static addWindSpeedAvg(t,e){t.addFieldFloat32(29,e,0)}static addWindSpeedMax(t,e){t.addFieldFloat32(30,e,0)}static addVisibilityMax(t,e){t.addFieldFloat32(31,e,0)}static addVisibilityMin(t,e){t.addFieldFloat32(32,e,0)}static addOvernightForecast(t,e){t.addFieldOffset(33,e,0)}static addDaytimeForecast(t,e){t.addFieldOffset(34,e,0)}static addRestOfDayForecast(t,e){t.addFieldOffset(35,e,0)}static endDayWeatherConditions(t){return t.endObject()}}class vt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsDailyForecastData(t,e){return(e||new vt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDailyForecastData(t,e){return t.setPosition(t.position()+4),(e||new vt).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const e=this.bb.__offset(this.bb_pos,4);return e?(t||new bt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}days(t,e){const i=this.bb.__offset(this.bb_pos,6);return i?(e||new St).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}daysLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}static startDailyForecastData(t){t.startObject(2)}static addMetadata(t,e){t.addFieldOffset(0,e,0)}static addDays(t,e){t.addFieldOffset(1,e,0)}static createDaysVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startDaysVector(t,e){t.startVector(4,e,4)}static endDailyForecastData(t){return t.endObject()}static createDailyForecastData(t,e,i){return vt.startDailyForecastData(t),vt.addMetadata(t,e),vt.addDays(t,i),vt.endDailyForecastData(t)}}class Ft{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsForecastMinute(t,e){return(e||new Ft).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsForecastMinute(t,e){return t.setPosition(t.position()+4),(e||new Ft).__init(t.readInt32(t.position())+t.position(),t)}startTime(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}precipitationChance(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readInt8(this.bb_pos+t):0}precipitationIntensity(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readFloat32(this.bb_pos+t):0}perceivedPrecipitationIntensity(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readFloat32(this.bb_pos+t):0}static startForecastMinute(t){t.startObject(4)}static addStartTime(t,e){t.addFieldInt32(0,e,0)}static addPrecipitationChance(t,e){t.addFieldInt8(1,e,0)}static addPrecipitationIntensity(t,e){t.addFieldFloat32(2,e,0)}static addPerceivedPrecipitationIntensity(t,e){t.addFieldFloat32(3,e,0)}static endForecastMinute(t){return t.endObject()}static createForecastMinute(t,e,i,n,a){return Ft.startForecastMinute(t),Ft.addStartTime(t,e),Ft.addPrecipitationChance(t,i),Ft.addPrecipitationIntensity(t,n),Ft.addPerceivedPrecipitationIntensity(t,a),Ft.endForecastMinute(t)}}class wt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsForecastPeriodSummary(t,e){return(e||new wt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsForecastPeriodSummary(t,e){return t.setPosition(t.position()+4),(e||new wt).__init(t.readInt32(t.position())+t.position(),t)}startTime(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}endTime(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}condition(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):it.CLEAR}precipitationChance(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):0}precipitationIntensity(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readFloat32(this.bb_pos+t):0}static startForecastPeriodSummary(t){t.startObject(5)}static addStartTime(t,e){t.addFieldInt32(0,e,0)}static addEndTime(t,e){t.addFieldInt32(1,e,0)}static addCondition(t,e){t.addFieldInt8(2,e,it.CLEAR)}static addPrecipitationChance(t,e){t.addFieldInt8(3,e,0)}static addPrecipitationIntensity(t,e){t.addFieldFloat32(4,e,0)}static endForecastPeriodSummary(t){return t.endObject()}static createForecastPeriodSummary(t,e,i,n,a,s){return wt.startForecastPeriodSummary(t),wt.addStartTime(t,e),wt.addEndTime(t,i),wt.addCondition(t,n),wt.addPrecipitationChance(t,a),wt.addPrecipitationIntensity(t,s),wt.endForecastPeriodSummary(t)}}class Ot{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsHistoricalComparison(t,e){return(e||new Ot).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsHistoricalComparison(t,e){return t.setPosition(t.position()+4),(e||new Ot).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const e=this.bb.__offset(this.bb_pos,4);return e?(t||new bt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}comparisons(t,e){const i=this.bb.__offset(this.bb_pos,6);return i?(e||new It).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}comparisonsLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}static startHistoricalComparison(t){t.startObject(2)}static addMetadata(t,e){t.addFieldOffset(0,e,0)}static addComparisons(t,e){t.addFieldOffset(1,e,0)}static createComparisonsVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startComparisonsVector(t,e){t.startVector(4,e,4)}static endHistoricalComparison(t){return t.endObject()}static createHistoricalComparison(t,e,i){return Ot.startHistoricalComparison(t),Ot.addMetadata(t,e),Ot.addComparisons(t,i),Ot.endHistoricalComparison(t)}}class Et{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsHourWeatherConditions(t,e){return(e||new Et).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsHourWeatherConditions(t,e){return t.setPosition(t.position()+4),(e||new Et).__init(t.readInt32(t.position())+t.position(),t)}forecastStart(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}cloudCover(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverLowAltPct(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverMidAltPct(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverHighAltPct(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readInt8(this.bb_pos+t):0}conditionCode(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readInt8(this.bb_pos+t):at.CLEAR}daylight(){const t=this.bb.__offset(this.bb_pos,16);return!!t&&!!this.bb.readInt8(this.bb_pos+t)}humidity(){const t=this.bb.__offset(this.bb_pos,18);return t?this.bb.readInt8(this.bb_pos+t):0}perceivedPrecipitationIntensity(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmount(){const t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationIntensity(){const t=this.bb.__offset(this.bb_pos,24);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationChance(){const t=this.bb.__offset(this.bb_pos,26);return t?this.bb.readInt8(this.bb_pos+t):0}precipitationType(){const t=this.bb.__offset(this.bb_pos,28);return t?this.bb.readInt8(this.bb_pos+t):it.CLEAR}pressure(){const t=this.bb.__offset(this.bb_pos,30);return t?this.bb.readFloat32(this.bb_pos+t):0}pressureTrend(){const t=this.bb.__offset(this.bb_pos,32);return t?this.bb.readInt8(this.bb_pos+t):nt.RISING}snowfallAmount(){const t=this.bb.__offset(this.bb_pos,34);return t?this.bb.readFloat32(this.bb_pos+t):0}snowfallIntensity(){const t=this.bb.__offset(this.bb_pos,36);return t?this.bb.readFloat32(this.bb_pos+t):0}temperature(){const t=this.bb.__offset(this.bb_pos,38);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureApparent(){const t=this.bb.__offset(this.bb_pos,40);return t?this.bb.readFloat32(this.bb_pos+t):0}unknown20(){const t=this.bb.__offset(this.bb_pos,42);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureDewPoint(){const t=this.bb.__offset(this.bb_pos,44);return t?this.bb.readFloat32(this.bb_pos+t):0}uvIndex(){const t=this.bb.__offset(this.bb_pos,46);return t?this.bb.readInt8(this.bb_pos+t):0}visibility(){const t=this.bb.__offset(this.bb_pos,48);return t?this.bb.readFloat32(this.bb_pos+t):0}windDirection(){const t=this.bb.__offset(this.bb_pos,50);return t?this.bb.readInt16(this.bb_pos+t):0}windGust(){const t=this.bb.__offset(this.bb_pos,52);return t?this.bb.readFloat32(this.bb_pos+t):0}windSpeed(){const t=this.bb.__offset(this.bb_pos,54);return t?this.bb.readFloat32(this.bb_pos+t):0}static startHourWeatherConditions(t){t.startObject(26)}static addForecastStart(t,e){t.addFieldInt32(0,e,0)}static addCloudCover(t,e){t.addFieldInt8(1,e,0)}static addCloudCoverLowAltPct(t,e){t.addFieldInt8(2,e,0)}static addCloudCoverMidAltPct(t,e){t.addFieldInt8(3,e,0)}static addCloudCoverHighAltPct(t,e){t.addFieldInt8(4,e,0)}static addConditionCode(t,e){t.addFieldInt8(5,e,at.CLEAR)}static addDaylight(t,e){t.addFieldInt8(6,+e,0)}static addHumidity(t,e){t.addFieldInt8(7,e,0)}static addPerceivedPrecipitationIntensity(t,e){t.addFieldFloat32(8,e,0)}static addPrecipitationAmount(t,e){t.addFieldFloat32(9,e,0)}static addPrecipitationIntensity(t,e){t.addFieldFloat32(10,e,0)}static addPrecipitationChance(t,e){t.addFieldInt8(11,e,0)}static addPrecipitationType(t,e){t.addFieldInt8(12,e,it.CLEAR)}static addPressure(t,e){t.addFieldFloat32(13,e,0)}static addPressureTrend(t,e){t.addFieldInt8(14,e,nt.RISING)}static addSnowfallAmount(t,e){t.addFieldFloat32(15,e,0)}static addSnowfallIntensity(t,e){t.addFieldFloat32(16,e,0)}static addTemperature(t,e){t.addFieldFloat32(17,e,0)}static addTemperatureApparent(t,e){t.addFieldFloat32(18,e,0)}static addUnknown20(t,e){t.addFieldFloat32(19,e,0)}static addTemperatureDewPoint(t,e){t.addFieldFloat32(20,e,0)}static addUvIndex(t,e){t.addFieldInt8(21,e,0)}static addVisibility(t,e){t.addFieldFloat32(22,e,0)}static addWindDirection(t,e){t.addFieldInt16(23,e,0)}static addWindGust(t,e){t.addFieldFloat32(24,e,0)}static addWindSpeed(t,e){t.addFieldFloat32(25,e,0)}static endHourWeatherConditions(t){return t.endObject()}static createHourWeatherConditions(t,e,i,n,a,s,r,o,d,c,u,l,p,h,b,m,y,f,_,g,I,N,C,x,A,T,S){return Et.startHourWeatherConditions(t),Et.addForecastStart(t,e),Et.addCloudCover(t,i),Et.addCloudCoverLowAltPct(t,n),Et.addCloudCoverMidAltPct(t,a),Et.addCloudCoverHighAltPct(t,s),Et.addConditionCode(t,r),Et.addDaylight(t,o),Et.addHumidity(t,d),Et.addPerceivedPrecipitationIntensity(t,c),Et.addPrecipitationAmount(t,u),Et.addPrecipitationIntensity(t,l),Et.addPrecipitationChance(t,p),Et.addPrecipitationType(t,h),Et.addPressure(t,b),Et.addPressureTrend(t,m),Et.addSnowfallAmount(t,y),Et.addSnowfallIntensity(t,f),Et.addTemperature(t,_),Et.addTemperatureApparent(t,g),Et.addUnknown20(t,I),Et.addTemperatureDewPoint(t,N),Et.addUvIndex(t,C),Et.addVisibility(t,x),Et.addWindDirection(t,A),Et.addWindGust(t,T),Et.addWindSpeed(t,S),Et.endHourWeatherConditions(t)}}class Pt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsHourlyForecastData(t,e){return(e||new Pt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsHourlyForecastData(t,e){return t.setPosition(t.position()+4),(e||new Pt).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const e=this.bb.__offset(this.bb_pos,4);return e?(t||new bt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}hours(t,e){const i=this.bb.__offset(this.bb_pos,6);return i?(e||new Et).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}hoursLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}static startHourlyForecastData(t){t.startObject(2)}static addMetadata(t,e){t.addFieldOffset(0,e,0)}static addHours(t,e){t.addFieldOffset(1,e,0)}static createHoursVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startHoursVector(t,e){t.startVector(4,e,4)}static endHourlyForecastData(t){return t.endObject()}static createHourlyForecastData(t,e,i){return Pt.startHourlyForecastData(t),Pt.addMetadata(t,e),Pt.addHours(t,i),Pt.endHourlyForecastData(t)}}class Ut{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsLocationInfo(t,e){return(e||new Ut).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsLocationInfo(t,e){return t.setPosition(t.position()+4),(e||new Ut).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const e=this.bb.__offset(this.bb_pos,4);return e?(t||new bt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}preciseName(t){const e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__string(this.bb_pos+e,t):null}countryCode(t){const e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__string(this.bb_pos+e,t):null}timeZone(t){const e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__string(this.bb_pos+e,t):null}primaryName(t){const e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__string(this.bb_pos+e,t):null}static startLocationInfo(t){t.startObject(5)}static addMetadata(t,e){t.addFieldOffset(0,e,0)}static addPreciseName(t,e){t.addFieldOffset(1,e,0)}static addCountryCode(t,e){t.addFieldOffset(2,e,0)}static addTimeZone(t,e){t.addFieldOffset(3,e,0)}static addPrimaryName(t,e){t.addFieldOffset(4,e,0)}static endLocationInfo(t){return t.endObject()}static createLocationInfo(t,e,i,n,a,s){return Ut.startLocationInfo(t),Ut.addMetadata(t,e),Ut.addPreciseName(t,i),Ut.addCountryCode(t,n),Ut.addTimeZone(t,a),Ut.addPrimaryName(t,s),Ut.endLocationInfo(t)}}class Mt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsPlacement(t,e){return(e||new Mt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsPlacement(t,e){return t.setPosition(t.position()+4),(e||new Mt).__init(t.readInt32(t.position())+t.position(),t)}priority(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt8(this.bb_pos+t):0}articles(t,e){const i=this.bb.__offset(this.bb_pos,6);return i?(e||new _t).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}articlesLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}placement(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):rt.UNKNOWN0}static startPlacement(t){t.startObject(3)}static addPriority(t,e){t.addFieldInt8(0,e,0)}static addArticles(t,e){t.addFieldOffset(1,e,0)}static createArticlesVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startArticlesVector(t,e){t.startVector(4,e,4)}static addPlacement(t,e){t.addFieldInt8(2,e,rt.UNKNOWN0)}static endPlacement(t){return t.endObject()}static createPlacement(t,e,i,n){return Mt.startPlacement(t),Mt.addPriority(t,e),Mt.addArticles(t,i),Mt.addPlacement(t,n),Mt.endPlacement(t)}}class Rt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsNews(t,e){return(e||new Rt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNews(t,e){return t.setPosition(t.position()+4),(e||new Rt).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const e=this.bb.__offset(this.bb_pos,4);return e?(t||new bt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}placements(t,e){const i=this.bb.__offset(this.bb_pos,6);return i?(e||new Mt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}placementsLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}static startNews(t){t.startObject(2)}static addMetadata(t,e){t.addFieldOffset(0,e,0)}static addPlacements(t,e){t.addFieldOffset(1,e,0)}static createPlacementsVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startPlacementsVector(t,e){t.startVector(4,e,4)}static endNews(t){return t.endObject()}static createNews(t,e,i){return Rt.startNews(t),Rt.addMetadata(t,e),Rt.addPlacements(t,i),Rt.endNews(t)}}class Ht{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsNextHourForecastData(t,e){return(e||new Ht).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNextHourForecastData(t,e){return t.setPosition(t.position()+4),(e||new Ht).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const e=this.bb.__offset(this.bb_pos,4);return e?(t||new bt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}condition(t,e){const i=this.bb.__offset(this.bb_pos,6);return i?(e||new Ct).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}conditionLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}summary(t,e){const i=this.bb.__offset(this.bb_pos,8);return i?(e||new wt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}summaryLength(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}forecastStart(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readUint32(this.bb_pos+t):0}forecastEnd(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readUint32(this.bb_pos+t):0}minutes(t,e){const i=this.bb.__offset(this.bb_pos,14);return i?(e||new Ft).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}minutesLength(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__vector_len(this.bb_pos+t):0}static startNextHourForecastData(t){t.startObject(6)}static addMetadata(t,e){t.addFieldOffset(0,e,0)}static addCondition(t,e){t.addFieldOffset(1,e,0)}static createConditionVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startConditionVector(t,e){t.startVector(4,e,4)}static addSummary(t,e){t.addFieldOffset(2,e,0)}static createSummaryVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startSummaryVector(t,e){t.startVector(4,e,4)}static addForecastStart(t,e){t.addFieldInt32(3,e,0)}static addForecastEnd(t,e){t.addFieldInt32(4,e,0)}static addMinutes(t,e){t.addFieldOffset(5,e,0)}static createMinutesVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startMinutesVector(t,e){t.startVector(4,e,4)}static endNextHourForecastData(t){return t.endObject()}static createNextHourForecastData(t,e,i,n,a,s,r){return Ht.startNextHourForecastData(t),Ht.addMetadata(t,e),Ht.addCondition(t,i),Ht.addSummary(t,n),Ht.addForecastStart(t,a),Ht.addForecastEnd(t,s),Ht.addMinutes(t,r),Ht.endNextHourForecastData(t)}}class Wt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsWeatherAlertSummary(t,e){return(e||new Wt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsWeatherAlertSummary(t,e){return t.setPosition(t.position()+4),(e||new Wt).__init(t.readInt32(t.position())+t.position(),t)}id(t){const e=this.bb.__offset(this.bb_pos,4);return e?(t||new ft).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}areaId(t){const e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__string(this.bb_pos+e,t):null}areaName(t){const e=this.bb.__offset(this.bb_pos,8);return e?this.bb.__string(this.bb_pos+e,t):null}attributionUrl(t){const e=this.bb.__offset(this.bb_pos,10);return e?this.bb.__string(this.bb_pos+e,t):null}countryCode(t){const e=this.bb.__offset(this.bb_pos,12);return e?this.bb.__string(this.bb_pos+e,t):null}description(t){const e=this.bb.__offset(this.bb_pos,14);return e?this.bb.__string(this.bb_pos+e,t):null}token(t){const e=this.bb.__offset(this.bb_pos,16);return e?this.bb.__string(this.bb_pos+e,t):null}effectiveTime(){const t=this.bb.__offset(this.bb_pos,18);return t?this.bb.readUint32(this.bb_pos+t):0}expireTime(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readUint32(this.bb_pos+t):0}issuedTime(){const t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readUint32(this.bb_pos+t):0}eventOnsetTime(){const t=this.bb.__offset(this.bb_pos,24);return t?this.bb.readUint32(this.bb_pos+t):0}eventEndTime(){const t=this.bb.__offset(this.bb_pos,26);return t?this.bb.readUint32(this.bb_pos+t):0}detailsUrl(t){const e=this.bb.__offset(this.bb_pos,28);return e?this.bb.__string(this.bb_pos+e,t):null}phenomenon(t){const e=this.bb.__offset(this.bb_pos,30);return e?this.bb.__string(this.bb_pos+e,t):null}severity(){const t=this.bb.__offset(this.bb_pos,32);return t?this.bb.readInt8(this.bb_pos+t):dt.UNKNOWN}significance(){const t=this.bb.__offset(this.bb_pos,34);return t?this.bb.readInt8(this.bb_pos+t):ct.UNKNOWN}source(t){const e=this.bb.__offset(this.bb_pos,36);return e?this.bb.__string(this.bb_pos+e,t):null}eventSource(t){const e=this.bb.__offset(this.bb_pos,38);return e?this.bb.__string(this.bb_pos+e,t):null}urgency(){const t=this.bb.__offset(this.bb_pos,40);return t?this.bb.readInt8(this.bb_pos+t):ut.UNKNOWN}certainty(){const t=this.bb.__offset(this.bb_pos,42);return t?this.bb.readInt8(this.bb_pos+t):lt.UNKNOWN}importance(){const t=this.bb.__offset(this.bb_pos,44);return t?this.bb.readInt8(this.bb_pos+t):pt.NORMAL}responses(t){const e=this.bb.__offset(this.bb_pos,46);return e?this.bb.readInt8(this.bb.__vector(this.bb_pos+e)+t):0}responsesLength(){const t=this.bb.__offset(this.bb_pos,46);return t?this.bb.__vector_len(this.bb_pos+t):0}responsesArray(){const t=this.bb.__offset(this.bb_pos,46);return t?new Int8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+t),this.bb.__vector_len(this.bb_pos+t)):null}unknown23(){const t=this.bb.__offset(this.bb_pos,48);return t?this.bb.readInt8(this.bb_pos+t):0}unknown24(){const t=this.bb.__offset(this.bb_pos,50);return t?this.bb.readInt8(this.bb_pos+t):0}unknown25(){const t=this.bb.__offset(this.bb_pos,52);return t?this.bb.readInt8(this.bb_pos+t):0}unknown26(){const t=this.bb.__offset(this.bb_pos,54);return t?this.bb.readInt8(this.bb_pos+t):0}static startWeatherAlertSummary(t){t.startObject(26)}static addId(t,e){t.addFieldOffset(0,e,0)}static addAreaId(t,e){t.addFieldOffset(1,e,0)}static addAreaName(t,e){t.addFieldOffset(2,e,0)}static addAttributionUrl(t,e){t.addFieldOffset(3,e,0)}static addCountryCode(t,e){t.addFieldOffset(4,e,0)}static addDescription(t,e){t.addFieldOffset(5,e,0)}static addToken(t,e){t.addFieldOffset(6,e,0)}static addEffectiveTime(t,e){t.addFieldInt32(7,e,0)}static addExpireTime(t,e){t.addFieldInt32(8,e,0)}static addIssuedTime(t,e){t.addFieldInt32(9,e,0)}static addEventOnsetTime(t,e){t.addFieldInt32(10,e,0)}static addEventEndTime(t,e){t.addFieldInt32(11,e,0)}static addDetailsUrl(t,e){t.addFieldOffset(12,e,0)}static addPhenomenon(t,e){t.addFieldOffset(13,e,0)}static addSeverity(t,e){t.addFieldInt8(14,e,dt.UNKNOWN)}static addSignificance(t,e){t.addFieldInt8(15,e,ct.UNKNOWN)}static addSource(t,e){t.addFieldOffset(16,e,0)}static addEventSource(t,e){t.addFieldOffset(17,e,0)}static addUrgency(t,e){t.addFieldInt8(18,e,ut.UNKNOWN)}static addCertainty(t,e){t.addFieldInt8(19,e,lt.UNKNOWN)}static addImportance(t,e){t.addFieldInt8(20,e,pt.NORMAL)}static addResponses(t,e){t.addFieldOffset(21,e,0)}static createResponsesVector(t,e){t.startVector(1,e.length,1);for(let i=e.length-1;i>=0;i--)t.addInt8(e[i]);return t.endVector()}static startResponsesVector(t,e){t.startVector(1,e,1)}static addUnknown23(t,e){t.addFieldInt8(22,e,0)}static addUnknown24(t,e){t.addFieldInt8(23,e,0)}static addUnknown25(t,e){t.addFieldInt8(24,e,0)}static addUnknown26(t,e){t.addFieldInt8(25,e,0)}static endWeatherAlertSummary(t){return t.endObject()}static createWeatherAlertSummary(t,e,i,n,a,s,r,o,d,c,u,l,p,h,b,m,y,f,_,g,I,N,C,x,A,T,S){return Wt.startWeatherAlertSummary(t),Wt.addId(t,e),Wt.addAreaId(t,i),Wt.addAreaName(t,n),Wt.addAttributionUrl(t,a),Wt.addCountryCode(t,s),Wt.addDescription(t,r),Wt.addToken(t,o),Wt.addEffectiveTime(t,d),Wt.addExpireTime(t,c),Wt.addIssuedTime(t,u),Wt.addEventOnsetTime(t,l),Wt.addEventEndTime(t,p),Wt.addDetailsUrl(t,h),Wt.addPhenomenon(t,b),Wt.addSeverity(t,m),Wt.addSignificance(t,y),Wt.addSource(t,f),Wt.addEventSource(t,_),Wt.addUrgency(t,g),Wt.addCertainty(t,I),Wt.addImportance(t,N),Wt.addResponses(t,C),Wt.addUnknown23(t,x),Wt.addUnknown24(t,A),Wt.addUnknown25(t,T),Wt.addUnknown26(t,S),Wt.endWeatherAlertSummary(t)}}class Lt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsWeatherAlertCollectionData(t,e){return(e||new Lt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsWeatherAlertCollectionData(t,e){return t.setPosition(t.position()+4),(e||new Lt).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const e=this.bb.__offset(this.bb_pos,4);return e?(t||new bt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}detailsUrl(t){const e=this.bb.__offset(this.bb_pos,6);return e?this.bb.__string(this.bb_pos+e,t):null}alerts(t,e){const i=this.bb.__offset(this.bb_pos,8);return i?(e||new Wt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}alertsLength(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}static startWeatherAlertCollectionData(t){t.startObject(3)}static addMetadata(t,e){t.addFieldOffset(0,e,0)}static addDetailsUrl(t,e){t.addFieldOffset(1,e,0)}static addAlerts(t,e){t.addFieldOffset(2,e,0)}static createAlertsVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startAlertsVector(t,e){t.startVector(4,e,4)}static endWeatherAlertCollectionData(t){return t.endObject()}static createWeatherAlertCollectionData(t,e,i,n){return Lt.startWeatherAlertCollectionData(t),Lt.addMetadata(t,e),Lt.addDetailsUrl(t,i),Lt.addAlerts(t,n),Lt.endWeatherAlertCollectionData(t)}}class Dt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsWeatherChanges(t,e){return(e||new Dt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsWeatherChanges(t,e){return t.setPosition(t.position()+4),(e||new Dt).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const e=this.bb.__offset(this.bb_pos,4);return e?(t||new bt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}forecastStart(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}forecastEnd(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readUint32(this.bb_pos+t):0}changes(t,e){const i=this.bb.__offset(this.bb_pos,10);return i?(e||new gt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}changesLength(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__vector_len(this.bb_pos+t):0}static startWeatherChanges(t){t.startObject(4)}static addMetadata(t,e){t.addFieldOffset(0,e,0)}static addForecastStart(t,e){t.addFieldInt32(1,e,0)}static addForecastEnd(t,e){t.addFieldInt32(2,e,0)}static addChanges(t,e){t.addFieldOffset(3,e,0)}static createChangesVector(t,e){t.startVector(4,e.length,4);for(let i=e.length-1;i>=0;i--)t.addOffset(e[i]);return t.endVector()}static startChangesVector(t,e){t.startVector(4,e,4)}static endWeatherChanges(t){return t.endObject()}static createWeatherChanges(t,e,i,n,a){return Dt.startWeatherChanges(t),Dt.addMetadata(t,e),Dt.addForecastStart(t,i),Dt.addForecastEnd(t,n),Dt.addChanges(t,a),Dt.endWeatherChanges(t)}}class Bt{bb=null;bb_pos=0;__init(t,e){return this.bb_pos=t,this.bb=e,this}static getRootAsWeather(t,e){return(e||new Bt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsWeather(t,e){return t.setPosition(t.position()+4),(e||new Bt).__init(t.readInt32(t.position())+t.position(),t)}airQuality(t){const e=this.bb.__offset(this.bb_pos,4);return e?(t||new yt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}currentWeather(t){const e=this.bb.__offset(this.bb_pos,6);return e?(t||new At).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}forecastDaily(t){const e=this.bb.__offset(this.bb_pos,8);return e?(t||new vt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}forecastHourly(t){const e=this.bb.__offset(this.bb_pos,10);return e?(t||new Pt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}forecastNextHour(t){const e=this.bb.__offset(this.bb_pos,12);return e?(t||new Ht).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}news(t){const e=this.bb.__offset(this.bb_pos,14);return e?(t||new Rt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}weatherAlerts(t){const e=this.bb.__offset(this.bb_pos,16);return e?(t||new Lt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}weatherChanges(t){const e=this.bb.__offset(this.bb_pos,18);return e?(t||new Dt).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}historicalComparisons(t){const e=this.bb.__offset(this.bb_pos,20);return e?(t||new Ot).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}locationInfo(t){const e=this.bb.__offset(this.bb_pos,22);return e?(t||new Ut).__init(this.bb.__indirect(this.bb_pos+e),this.bb):null}static startWeather(t){t.startObject(10)}static addAirQuality(t,e){t.addFieldOffset(0,e,0)}static addCurrentWeather(t,e){t.addFieldOffset(1,e,0)}static addForecastDaily(t,e){t.addFieldOffset(2,e,0)}static addForecastHourly(t,e){t.addFieldOffset(3,e,0)}static addForecastNextHour(t,e){t.addFieldOffset(4,e,0)}static addNews(t,e){t.addFieldOffset(5,e,0)}static addWeatherAlerts(t,e){t.addFieldOffset(6,e,0)}static addWeatherChanges(t,e){t.addFieldOffset(7,e,0)}static addHistoricalComparisons(t,e){t.addFieldOffset(8,e,0)}static addLocationInfo(t,e){t.addFieldOffset(9,e,0)}static endWeather(t){return t.endObject()}static finishWeatherBuffer(t,e){t.finish(e)}static finishSizePrefixedWeatherBuffer(t,e){t.finish(e,void 0,!0)}}const Kt=new class{#N;#C;#x;#A;#T;constructor(t){if(!t||"object"!=typeof t||Array.isArray(t))throw new TypeError("FlatBufferRootProcessor options must be an object");try{if("string"!=typeof t.name||0===t.name.length)throw new TypeError("FlatBufferRootProcessor name must be a non-empty string");if("function"!=typeof t.rootClass||!t.rootClass.prototype||"function"!=typeof t.rootClass.prototype.__init)throw new TypeError(`${t.name} rootClass must be a generated FlatBuffers table class`);if(!t.codecs||"object"!=typeof t.codecs||Array.isArray(t.codecs))throw new TypeError(`${t.name} codecs must be an object`);if(!Array.isArray(t.configurableRootNames))throw new TypeError(`${t.name} configurableRootNames must be an array`);const e=Object.getOwnPropertyNames(t.rootClass.prototype).filter(t=>!["constructor","__init"].includes(t));for(const i of e){if("function"!=typeof t.rootClass.prototype[i])throw new TypeError(`${t.name} root accessor ${i} must be a function`);const e=`${i[0].toUpperCase()}${i.slice(1)}`;if("function"!=typeof t.rootClass[`add${e}`])throw new TypeError(`${t.name} root accessor ${i} has no matching add${e}`)}const i=new Set(e),n=new Map;for(const e of Object.keys(t.codecs)){if(!i.has(e))throw new RangeError(`${t.name} codec ${e} is not a root accessor`);const a=t.codecs[e];if(!a||"object"!=typeof a||Array.isArray(a))throw new TypeError(`${t.name} codec ${e} must be an object`);if("function"!=typeof a.tableClass||!a.tableClass.prototype||"function"!=typeof a.tableClass.prototype.__init)throw new TypeError(`${t.name} codec ${e} tableClass must be a generated FlatBuffers table class`);if("function"!=typeof a.decode)throw new TypeError(`${t.name} codec ${e} must provide decode`);if("function"!=typeof a.encode)throw new TypeError(`${t.name} codec ${e} must provide encode`);n.set(e,Object.freeze({decode:a.decode,encode:a.encode,tableClass:a.tableClass}))}const a=new Set;for(const e of t.configurableRootNames){if("string"!=typeof e||0===e.length)throw new TypeError(`${t.name} configurableRootNames must contain non-empty strings`);if(!i.has(e))throw new RangeError(`${t.name} configurable root ${e} is not a root accessor`);if(a.has(e))throw new RangeError(`${t.name} configurable root ${e} is duplicated`);a.add(e)}const s=e.map((t,e)=>Object.freeze({codec:n.get(t),id:e,name:t}));this.#N=t.name,this.#C=Object.freeze(s),this.#x=new Map(s.map(t=>[t.id,t])),this.#A=new Map(s.map(t=>[t.name,t])),this.#T=a}catch(e){throw o.error(`${"string"==typeof t.name&&t.name?t.name:"FlatBufferRootProcessor"}.configure`,e),e}}filterRootNames(t,e){try{this.#S(t,"requestedRootNames"),this.#S(e,"enabledRootNames");const i=new Set(e);return t.filter(t=>!this.#T.has(t)||i.has(t))}catch(t){throw o.error(`${this.#N}.filterRootNames`,t),t}}decode(t,e=[]){try{this.#S(e,"rootNames")}catch(t){throw o.error(`${this.#N}.decode`,t),t}const i=new Set(e),n={};let a;try{a=this.#v(t)}catch(t){throw o.error(`${this.#N}.decode`,t),t}const s=this.#F("decode",a),r=new Set([...a.slots.keys(),...a.failures.map(t=>t.id)]),d=[...i].filter(t=>{const e=this.#A.get(t);return!e||!e.codec}),c=[...i].filter(t=>{const e=this.#A.get(t);return!!e&&(Boolean(e.codec)&&!r.has(e.id))}),u=a.failures.filter(({id:t})=>{const e=this.#x.get(t);return!!e&&(Boolean(e.codec)&&i.has(e.name))}).map(({id:t,error:e})=>`${this.#w(t)}(${e.message})`);let l=0;for(const[t,e]of[...a.slots].sort(([t],[e])=>t-e)){const a=this.#x.get(t);if(a&&a.codec&&i.has(a.name))try{const t=(new a.codec.tableClass).__init(e.tablePosition,new T(e.bytes));n[a.name]=a.codec.decode(t),l++}catch(e){const i=e instanceof Error?e.message:String(e);u.push(`${this.#w(t)}(${i})`)}}const p=s.unknownLabels,h=`${this.#N}.decode.parse：已知 ${s.knownCount}/${a.presentSlotCount}，解析 ${l}/${a.presentSlotCount}，失败 ${u.length}/${a.presentSlotCount}，未知 ${p.length}/${a.presentSlotCount}；失败=[${u.join(", ")}]；未知=[${p.join(", ")}]；请求未知=[${d.join(", ")}]；缺失=[${c.join(", ")}]`;return u.length||p.length||d.length?o.warn(h):o.debug(h),n}encode(t=void 0,e={}){if(!e||"object"!=typeof e||Array.isArray(e)){const t=new TypeError(`${this.#N}.encode patch must be an object`);throw o.error(`${this.#N}.encode`,t),t}const i=Object.keys(e),n=new Map,a=[],s=[];let r=0;for(const t of i){const i=this.#A.get(t);if(i&&i.codec){r++;try{const a=e[t];if(!a||"object"!=typeof a||Array.isArray(a))throw new TypeError(`${t} must be an object`);const s=new S,r=i.codec.encode(s,a);if(!Number.isSafeInteger(r)||r<=0)throw new Error(`${t} codec did not produce a table`);s.finish(r);const o=s.asUint8Array(),d=new T(o),c=d.position()+d.readUint32(d.position());n.set(i.id,{bytes:o,tablePosition:c})}catch(t){const e=t instanceof Error?t.message:String(t);a.push(`${this.#w(i.id)}(${e})`)}}else s.push(t)}const d=`${this.#N}.encode.compile：已知 ${r}/${i.length}，编译 ${n.size}/${i.length}，失败 ${a.length}/${i.length}，未知 ${s.length}/${i.length}；失败=[${a.join(", ")}]；未知=[${s.join(", ")}]`;let c;if(a.length||s.length?o.warn(d):o.debug(d),void 0!==t)try{c=this.#v(t)}catch(t){throw o.error(`${this.#N}.encode`,t),t}else c={failures:[],presentSlotCount:0,slotCount:0,slots:new Map};if(this.#F("encode",c),void 0!==t&&0===n.size)return t.bytes().subarray(t.position(),t.capacity());const u=new Map(c.slots);for(const[t,e]of n)u.set(t,e);try{const t=this.#O({failures:[],presentSlotCount:u.size,slotCount:c.slotCount,slots:u},this.#C.length);return o.debug(`${this.#N}.encode.assemble：输出 ${u.size} 个 slot，替换 ${n.size} 个 slot`),t}catch(t){throw o.error(`${this.#N}.encode`,t),t}}#S(t,e){if(!Array.isArray(t)||t.some(t=>"string"!=typeof t))throw new TypeError(`${this.#N}.${e} must be an array of strings`)}#v(t){if(!t||"function"!=typeof t.position||"function"!=typeof t.capacity||"function"!=typeof t.bytes)throw new TypeError(`${this.#N} source must be a FlatBuffers ByteBuffer`);const e=t.position(),i=t.capacity();this.#E(e,4,e,i,"root offset");const n=e+t.readUint32(e),a=this.#P(t,n,e,i,"root table"),s=(a.vtableLength-4)/2,r=t.bytes().subarray(e,i),o=new Map,d=[];let c=0;for(let u=0;u<s;u++){const s=t.readUint16(a.vtablePosition+4+2*u);if(0!==s){c++;try{if(s<4||s+4>a.objectLength)throw new Error(`root slot ${u} has an invalid field offset: ${s}`);const d=n+s;this.#E(d,4,e,i,`root slot ${u}`);const c=t.readUint32(d);if(0===c)throw new Error(`root slot ${u} has a null table offset`);const l=d+c;this.#P(t,l,e,i,`root slot ${u} table`),o.set(u,{bytes:r,tablePosition:l-e})}catch(t){d.push({id:u,error:t instanceof Error?t:new Error(String(t))})}}}return{failures:d,presentSlotCount:c,slotCount:s,slots:o}}#O(t,e){if(!(t&&t.slots instanceof Map))throw new TypeError("FlatBuffer root slot dictionary must contain a slots Map");if(!Number.isSafeInteger(t.slotCount)||t.slotCount<0)throw new RangeError(`Invalid FlatBuffer root slot count: ${t.slotCount}`);if(!Number.isSafeInteger(e)||e<0)throw new RangeError(`Invalid FlatBuffer schema slot count: ${e}`);const i=new S,n=new Map,a=new Map;let s=Math.max(t.slotCount,e);for(const[e,r]of[...t.slots].sort(([t],[e])=>t-e)){if(!Number.isSafeInteger(e)||e<0)throw new RangeError(`Invalid FlatBuffer root slot: ${e}`);if(!(r&&r.bytes instanceof Uint8Array))throw new TypeError(`FlatBuffer root slot ${e} must contain Uint8Array bytes`);if(!Number.isSafeInteger(r.tablePosition))throw new RangeError(`Invalid FlatBuffer root slot ${e} table position: ${r.tablePosition}`);const t=new T(r.bytes);this.#P(t,r.tablePosition,0,r.bytes.length,`root slot ${e} table`);let o=n.get(r.bytes);if(void 0===o){i.startVector(1,r.bytes.length,8);for(let t=r.bytes.length-1;t>=0;t--)i.writeInt8(r.bytes[t]);o=i.endVector()-4,n.set(r.bytes,o)}a.set(e,o-r.tablePosition),s=Math.max(s,e+1)}i.startObject(s);for(const[t,e]of[...a].sort(([t],[e])=>t-e))i.addFieldOffset(t,e,0);const r=i.endObject();return i.finish(r),i.asUint8Array()}#P(t,e,i,n,a){this.#E(e,4,i,n,a);const s=e-t.readInt32(e);this.#E(s,4,i,n,`${a} vtable`);const r=t.readUint16(s),o=t.readUint16(s+2);if(r<4||r%2!=0)throw new Error(`${a} has an invalid vtable length: ${r}`);if(o<4)throw new Error(`${a} has an invalid object length: ${o}`);return this.#E(s,r,i,n,`${a} vtable`),this.#E(e,o,i,n,a),{objectLength:o,vtableLength:r,vtablePosition:s}}#E(t,e,i,n,a){if(!Number.isSafeInteger(t)||!Number.isSafeInteger(e)||t<i||e<0||t+e>n)throw new Error(`${a} is outside the FlatBuffer`)}#F(t,e){const i=[...e.slots.keys(),...e.failures.map(t=>t.id)].sort((t,e)=>t-e),n=i.filter(t=>{const e=this.#x.get(t);return!!e&&Boolean(e.codec)}).length,a=i.filter(t=>{const e=this.#x.get(t);return!e||!e.codec}).map(t=>this.#w(t)),s=e.failures.map(({id:t,error:e})=>`${this.#w(t)}(${e.message})`),r=`${this.#N}.${t}.slots：已知 ${n}/${e.presentSlotCount}，读取 ${e.slots.size}/${e.presentSlotCount}，失败 ${s.length}/${e.presentSlotCount}，未知 ${a.length}/${e.presentSlotCount}；失败=[${s.join(", ")}]；未知=[${a.join(", ")}]`;return s.length||a.length?o.warn(r):o.debug(r),{knownCount:n,unknownLabels:a}}#w(t){const e=this.#x.get(t);return e?`${e.name}#${t}`:`slot#${t}`}}({codecs:{airQuality:{decode:Qt,encode:$t,tableClass:yt},currentWeather:{decode:function(t){const e=t;t={metadata:zt(e.metadata()),asOf:e.asOf(),cloudCover:e.cloudCover(),cloudCoverHighAltPct:e.cloudCoverHighAltPct(),cloudCoverLowAltPct:e.cloudCoverLowAltPct(),cloudCoverMidAltPct:e.cloudCoverMidAltPct(),conditionCode:at[e.conditionCode()],daylight:e.daylight(),humidity:e.humidity(),perceivedPrecipitationIntensity:e.perceivedPrecipitationIntensity(),precipitationAmount1h:e.precipitationAmount1h(),precipitationAmount24h:e.precipitationAmount24h(),precipitationAmount6h:e.precipitationAmount6h(),precipitationAmountNext1h:e.precipitationAmountNext1h(),precipitationAmountNext1hByType:[],precipitationAmountNext24h:e.precipitationAmountNext24h(),precipitationAmountNext24hByType:[],precipitationAmountNext6h:e.precipitationAmountNext6h(),precipitationAmountNext6hByType:[],precipitationAmountPrevious1hByType:[],precipitationAmountPrevious24hByType:[],precipitationAmountPrevious6hByType:[],precipitationIntensity:e.precipitationIntensity(),pressure:e.pressure(),pressureTrend:nt[e.pressureTrend()],snowfallAmount1h:e.snowfallAmount1h(),snowfallAmount24h:e.snowfallAmount24h(),snowfallAmount6h:e.snowfallAmount6h(),snowfallAmountNext1h:e.snowfallAmountNext1h(),snowfallAmountNext24h:e.snowfallAmountNext24h(),snowfallAmountNext6h:e.snowfallAmountNext6h(),temperature:e.temperature(),temperatureApparent:e.temperatureApparent(),unknown34:e.unknown34(),temperatureDewPoint:e.temperatureDewPoint(),uvIndex:e.uvIndex(),visibility:e.visibility(),windDirection:e.windDirection(),windGust:e.windGust(),windSpeed:e.windSpeed()};for(let i=0;i<e.precipitationAmountNext1hByTypeLength();i++)t.precipitationAmountNext1hByType.push({expected:e.precipitationAmountNext1hByType(i).expected(),expectedSnow:e.precipitationAmountNext1hByType(i).expectedSnow(),maximumSnow:e.precipitationAmountNext1hByType(i).maximumSnow(),minimumSnow:e.precipitationAmountNext1hByType(i).minimumSnow(),precipitationType:it[e.precipitationAmountNext1hByType(i).precipitationType()]});for(let i=0;i<e.precipitationAmountNext24hByTypeLength();i++)t.precipitationAmountNext24hByType.push({expected:e.precipitationAmountNext24hByType(i).expected(),expectedSnow:e.precipitationAmountNext24hByType(i).expectedSnow(),maximumSnow:e.precipitationAmountNext24hByType(i).maximumSnow(),minimumSnow:e.precipitationAmountNext24hByType(i).minimumSnow(),precipitationType:it[e.precipitationAmountNext24hByType(i).precipitationType()]});for(let i=0;i<e.precipitationAmountNext6hByTypeLength();i++)t.precipitationAmountNext6hByType.push({expected:e.precipitationAmountNext6hByType(i).expected(),expectedSnow:e.precipitationAmountNext6hByType(i).expectedSnow(),maximumSnow:e.precipitationAmountNext6hByType(i).maximumSnow(),minimumSnow:e.precipitationAmountNext6hByType(i).minimumSnow(),precipitationType:it[e.precipitationAmountNext6hByType(i).precipitationType()]});for(let i=0;i<e.precipitationAmountPrevious1hByTypeLength();i++)t.precipitationAmountPrevious1hByType.push({expected:e.precipitationAmountPrevious1hByType(i).expected(),expectedSnow:e.precipitationAmountPrevious1hByType(i).expectedSnow(),maximumSnow:e.precipitationAmountPrevious1hByType(i).maximumSnow(),minimumSnow:e.precipitationAmountPrevious1hByType(i).minimumSnow(),precipitationType:it[e.precipitationAmountPrevious1hByType(i).precipitationType()]});for(let i=0;i<e.precipitationAmountPrevious24hByTypeLength();i++)t.precipitationAmountPrevious24hByType.push({expected:e.precipitationAmountPrevious24hByType(i).expected(),expectedSnow:e.precipitationAmountPrevious24hByType(i).expectedSnow(),maximumSnow:e.precipitationAmountPrevious24hByType(i).maximumSnow(),minimumSnow:e.precipitationAmountPrevious24hByType(i).minimumSnow(),precipitationType:it[e.precipitationAmountPrevious24hByType(i).precipitationType()]});for(let i=0;i<e.precipitationAmountPrevious6hByTypeLength();i++)t.precipitationAmountPrevious6hByType.push({expected:e.precipitationAmountPrevious6hByType(i).expected(),expectedSnow:e.precipitationAmountPrevious6hByType(i).expectedSnow(),maximumSnow:e.precipitationAmountPrevious6hByType(i).maximumSnow(),minimumSnow:e.precipitationAmountPrevious6hByType(i).minimumSnow(),precipitationType:it[e.precipitationAmountPrevious6hByType(i).precipitationType()]});return t},encode:function(t,e){const i=Gt(t,e.metadata),n=At.createPrecipitationAmountNext1hByTypeVector(t,e.precipitationAmountNext1hByType.map(e=>xt.createPrecipitationAmountByType(t,it[e.precipitationType],e.expected,e.minimumSnow,e.maximumSnow,e.expectedSnow))),a=At.createPrecipitationAmountNext24hByTypeVector(t,e.precipitationAmountNext24hByType.map(e=>xt.createPrecipitationAmountByType(t,it[e.precipitationType],e.expected,e.minimumSnow,e.maximumSnow,e.expectedSnow))),s=At.createPrecipitationAmountNext6hByTypeVector(t,e.precipitationAmountNext6hByType.map(e=>xt.createPrecipitationAmountByType(t,it[e.precipitationType],e.expected,e.minimumSnow,e.maximumSnow,e.expectedSnow))),r=At.createPrecipitationAmountPrevious1hByTypeVector(t,e.precipitationAmountPrevious1hByType.map(e=>xt.createPrecipitationAmountByType(t,it[e.precipitationType],e.expected,e.minimumSnow,e.maximumSnow,e.expectedSnow))),o=At.createPrecipitationAmountPrevious24hByTypeVector(t,e.precipitationAmountPrevious24hByType.map(e=>xt.createPrecipitationAmountByType(t,it[e.precipitationType],e.expected,e.minimumSnow,e.maximumSnow,e.expectedSnow))),d=At.createPrecipitationAmountPrevious6hByTypeVector(t,e.precipitationAmountPrevious6hByType.map(e=>xt.createPrecipitationAmountByType(t,it[e.precipitationType],e.expected,e.minimumSnow,e.maximumSnow,e.expectedSnow)));return At.createCurrentWeatherData(t,i,e.asOf,e.cloudCover,e.cloudCoverLowAltPct,e.cloudCoverMidAltPct,e.cloudCoverHighAltPct,at[e.conditionCode],e.daylight,e.humidity,e.perceivedPrecipitationIntensity,e.precipitationAmount1h,e.precipitationAmount6h,e.precipitationAmount24h,e.precipitationAmountNext1h,e.precipitationAmountNext6h,e.precipitationAmountNext24h,n,s,a,r,d,o,e.precipitationIntensity,e.pressure,nt[e.pressureTrend],e.snowfallAmount1h,e.snowfallAmount6h,e.snowfallAmount24h,e.snowfallAmountNext1h,e.snowfallAmountNext6h,e.snowfallAmountNext24h,e.temperature,e.temperatureApparent,e.unknown34,e.temperatureDewPoint,e.uvIndex,e.visibility,e.windDirection,e.windGust,e.windSpeed)},tableClass:At},forecastDaily:{decode:function(t){const e=t;t={metadata:zt(e.metadata()),days:[]};for(let i=0;i<e.daysLength();i++){const n={conditionCode:at[e.days(i).conditionCode()],forecastEnd:e.days(i).forecastEnd(),forecastStart:e.days(i).forecastStart(),humidityMax:e.days(i).humidityMax(),humidityMin:e.days(i).humidityMin(),maxUvIndex:e.days(i).maxUvIndex(),moonPhase:st[e.days(i).moonPhase()],moonrise:e.days(i).moonrise(),moonset:e.days(i).moonset(),precipitationAmount:e.days(i).precipitationAmount(),precipitationAmountByType:[],precipitationChance:e.days(i).precipitationChance(),precipitationType:it[e.days(i).precipitationType()],snowfallAmount:e.days(i).snowfallAmount(),solarMidnight:e.days(i).solarMidnight(),solarNoon:e.days(i).solarNoon(),sunrise:e.days(i).sunrise(),sunriseCivil:e.days(i).sunriseCivil(),sunriseNautical:e.days(i).sunriseNautical(),sunriseAstronomical:e.days(i).sunriseAstronomical(),sunset:e.days(i).sunset(),sunsetCivil:e.days(i).sunsetCivil(),sunsetNautical:e.days(i).sunsetNautical(),sunsetAstronomical:e.days(i).sunsetAstronomical(),temperatureMax:e.days(i).temperatureMax(),temperatureMaxTime:e.days(i).temperatureMaxTime(),temperatureMin:e.days(i).temperatureMin(),temperatureMinTime:e.days(i).temperatureMinTime(),visibilityMax:e.days(i).visibilityMax(),visibilityMin:e.days(i).visibilityMin(),windGustSpeedMax:e.days(i).windGustSpeedMax(),windSpeedAvg:e.days(i).windSpeedAvg(),windSpeedMax:e.days(i).windSpeedMax()};for(let t=0;t<e.days(i).precipitationAmountByTypeLength();t++)n.precipitationAmountByType.push({expected:e.days(i).precipitationAmountByType(t).expected(),expectedSnow:e.days(i).precipitationAmountByType(t).expectedSnow(),maximumSnow:e.days(i).precipitationAmountByType(t).maximumSnow(),minimumSnow:e.days(i).precipitationAmountByType(t).minimumSnow(),precipitationType:it[e.days(i).precipitationAmountByType(t).precipitationType()]});if(e.days(i).daytimeForecast()){n.daytimeForecast={cloudCover:e.days(i).daytimeForecast().cloudCover(),cloudCoverHighAltPct:e.days(i).daytimeForecast().cloudCoverHighAltPct(),cloudCoverLowAltPct:e.days(i).daytimeForecast().cloudCoverLowAltPct(),cloudCoverMidAltPct:e.days(i).daytimeForecast().cloudCoverMidAltPct(),conditionCode:at[e.days(i).daytimeForecast().conditionCode()],forecastEnd:e.days(i).daytimeForecast().forecastEnd(),forecastStart:e.days(i).daytimeForecast().forecastStart(),humidity:e.days(i).daytimeForecast().humidity(),humidityMax:e.days(i).daytimeForecast().humidityMax(),humidityMin:e.days(i).daytimeForecast().humidityMin(),precipitationAmount:e.days(i).daytimeForecast().precipitationAmount(),precipitationAmountByType:[],precipitationChance:e.days(i).daytimeForecast().precipitationChance(),precipitationType:it[e.days(i).daytimeForecast().precipitationType()],snowfallAmount:e.days(i).daytimeForecast().snowfallAmount(),temperatureMax:e.days(i).daytimeForecast().temperatureMax(),temperatureMin:e.days(i).daytimeForecast().temperatureMin(),visibilityMax:e.days(i).daytimeForecast().visibilityMax(),visibilityMin:e.days(i).daytimeForecast().visibilityMin(),windDirection:e.days(i).daytimeForecast().windDirection(),windGustSpeedMax:e.days(i).daytimeForecast().windGustSpeedMax(),windSpeed:e.days(i).daytimeForecast().windSpeed(),windSpeedMax:e.days(i).daytimeForecast().windSpeedMax(),precipitationIntensityMax:e.days(i).daytimeForecast().precipitationIntensityMax(),perceivedPrecipitationIntensityMax:e.days(i).daytimeForecast().perceivedPrecipitationIntensityMax(),uvIndexMin:e.days(i).daytimeForecast().uvIndexMin(),uvIndexMax:e.days(i).daytimeForecast().uvIndexMax(),temperatureApparentMin:e.days(i).daytimeForecast().temperatureApparentMin(),temperatureApparentMax:e.days(i).daytimeForecast().temperatureApparentMax(),daylight:e.days(i).daytimeForecast().daylight()};for(let t=0;t<e.days(i).daytimeForecast().precipitationAmountByTypeLength();t++)n.daytimeForecast.precipitationAmountByType.push({expected:e.days(i).daytimeForecast().precipitationAmountByType(t).expected(),expectedSnow:e.days(i).daytimeForecast().precipitationAmountByType(t).expectedSnow(),maximumSnow:e.days(i).daytimeForecast().precipitationAmountByType(t).maximumSnow(),minimumSnow:e.days(i).daytimeForecast().precipitationAmountByType(t).minimumSnow(),precipitationType:it[e.days(i).daytimeForecast().precipitationAmountByType(t).precipitationType()]})}if(e.days(i).overnightForecast()){n.overnightForecast={cloudCover:e.days(i).overnightForecast().cloudCover(),cloudCoverHighAltPct:e.days(i).overnightForecast().cloudCoverHighAltPct(),cloudCoverLowAltPct:e.days(i).overnightForecast().cloudCoverLowAltPct(),cloudCoverMidAltPct:e.days(i).overnightForecast().cloudCoverMidAltPct(),conditionCode:at[e.days(i).overnightForecast().conditionCode()],forecastEnd:e.days(i).overnightForecast().forecastEnd(),forecastStart:e.days(i).overnightForecast().forecastStart(),humidity:e.days(i).overnightForecast().humidity(),humidityMax:e.days(i).overnightForecast().humidityMax(),humidityMin:e.days(i).overnightForecast().humidityMin(),precipitationAmount:e.days(i).overnightForecast().precipitationAmount(),precipitationAmountByType:[],precipitationChance:e.days(i).overnightForecast().precipitationChance(),precipitationType:it[e.days(i).overnightForecast().precipitationType()],snowfallAmount:e.days(i).overnightForecast().snowfallAmount(),temperatureMax:e.days(i).overnightForecast().temperatureMax(),temperatureMin:e.days(i).overnightForecast().temperatureMin(),visibilityMax:e.days(i).overnightForecast().visibilityMax(),visibilityMin:e.days(i).overnightForecast().visibilityMin(),windDirection:e.days(i).overnightForecast().windDirection(),windGustSpeedMax:e.days(i).overnightForecast().windGustSpeedMax(),windSpeed:e.days(i).overnightForecast().windSpeed(),windSpeedMax:e.days(i).overnightForecast().windSpeedMax(),precipitationIntensityMax:e.days(i).overnightForecast().precipitationIntensityMax(),perceivedPrecipitationIntensityMax:e.days(i).overnightForecast().perceivedPrecipitationIntensityMax(),uvIndexMin:e.days(i).overnightForecast().uvIndexMin(),uvIndexMax:e.days(i).overnightForecast().uvIndexMax(),temperatureApparentMin:e.days(i).overnightForecast().temperatureApparentMin(),temperatureApparentMax:e.days(i).overnightForecast().temperatureApparentMax(),daylight:e.days(i).overnightForecast().daylight()};for(let t=0;t<e.days(i).overnightForecast().precipitationAmountByTypeLength();t++)n.overnightForecast.precipitationAmountByType.push({expected:e.days(i).overnightForecast().precipitationAmountByType(t).expected(),expectedSnow:e.days(i).overnightForecast().precipitationAmountByType(t).expectedSnow(),maximumSnow:e.days(i).overnightForecast().precipitationAmountByType(t).maximumSnow(),minimumSnow:e.days(i).overnightForecast().precipitationAmountByType(t).minimumSnow(),precipitationType:it[e.days(i).overnightForecast().precipitationAmountByType(t).precipitationType()]})}if(e.days(i).restOfDayForecast()){n.restOfDayForecast={cloudCover:e.days(i).restOfDayForecast().cloudCover(),cloudCoverHighAltPct:e.days(i).restOfDayForecast().cloudCoverHighAltPct(),cloudCoverLowAltPct:e.days(i).restOfDayForecast().cloudCoverLowAltPct(),cloudCoverMidAltPct:e.days(i).restOfDayForecast().cloudCoverMidAltPct(),conditionCode:at[e.days(i).restOfDayForecast().conditionCode()],forecastEnd:e.days(i).restOfDayForecast().forecastEnd(),forecastStart:e.days(i).restOfDayForecast().forecastStart(),humidity:e.days(i).restOfDayForecast().humidity(),humidityMax:e.days(i).restOfDayForecast().humidityMax(),humidityMin:e.days(i).restOfDayForecast().humidityMin(),precipitationAmount:e.days(i).restOfDayForecast().precipitationAmount(),precipitationAmountByType:[],precipitationChance:e.days(i).restOfDayForecast().precipitationChance(),precipitationType:it[e.days(i).restOfDayForecast().precipitationType()],snowfallAmount:e.days(i).restOfDayForecast().snowfallAmount(),temperatureMax:e.days(i).restOfDayForecast().temperatureMax(),temperatureMin:e.days(i).restOfDayForecast().temperatureMin(),visibilityMax:e.days(i).restOfDayForecast().visibilityMax(),visibilityMin:e.days(i).restOfDayForecast().visibilityMin(),windDirection:e.days(i).restOfDayForecast().windDirection(),windGustSpeedMax:e.days(i).restOfDayForecast().windGustSpeedMax(),windSpeed:e.days(i).restOfDayForecast().windSpeed(),windSpeedMax:e.days(i).restOfDayForecast().windSpeedMax(),precipitationIntensityMax:e.days(i).restOfDayForecast().precipitationIntensityMax(),perceivedPrecipitationIntensityMax:e.days(i).restOfDayForecast().perceivedPrecipitationIntensityMax(),uvIndexMin:e.days(i).restOfDayForecast().uvIndexMin(),uvIndexMax:e.days(i).restOfDayForecast().uvIndexMax(),temperatureApparentMin:e.days(i).restOfDayForecast().temperatureApparentMin(),temperatureApparentMax:e.days(i).restOfDayForecast().temperatureApparentMax(),daylight:e.days(i).restOfDayForecast().daylight()};for(let t=0;t<e.days(i).restOfDayForecast().precipitationAmountByTypeLength();t++)n.restOfDayForecast.precipitationAmountByType.push({expected:e.days(i).restOfDayForecast().precipitationAmountByType(t).expected(),expectedSnow:e.days(i).restOfDayForecast().precipitationAmountByType(t).expectedSnow(),maximumSnow:e.days(i).restOfDayForecast().precipitationAmountByType(t).maximumSnow(),minimumSnow:e.days(i).restOfDayForecast().precipitationAmountByType(t).minimumSnow(),precipitationType:it[e.days(i).restOfDayForecast().precipitationAmountByType(t).precipitationType()]})}t.days.push(n)}return t},encode:function(t,e){const i=Gt(t,e.metadata),n=e.days.map(e=>{const i={};return i.precipitationAmountByTypeOffest=St.createPrecipitationAmountByTypeVector(t,e.precipitationAmountByType.map(e=>xt.createPrecipitationAmountByType(t,it[e.precipitationType],e.expected,e.minimumSnow,e.maximumSnow,e.expectedSnow))),e.daytimeForecast&&(i.daytimeForecastPrecipitationAmountByTypeOffest=Tt.createPrecipitationAmountByTypeVector(t,e.daytimeForecast.precipitationAmountByType.map(e=>xt.createPrecipitationAmountByType(t,it[e.precipitationType],e.expected,e.minimumSnow,e.maximumSnow,e.expectedSnow))),i.daytimeForecastOffset=Tt.createDayPartForecast(t,e.daytimeForecast.forecastStart,e.daytimeForecast.forecastEnd,e.daytimeForecast.cloudCover,e.daytimeForecast.cloudCoverLowAltPct,e.daytimeForecast.cloudCoverMidAltPct,e.daytimeForecast.cloudCoverHighAltPct,at[e.daytimeForecast.conditionCode],e.daytimeForecast.humidity,e.daytimeForecast.humidityMax,e.daytimeForecast.humidityMin,e.daytimeForecast.precipitationAmount,i.daytimeForecastPrecipitationAmountByTypeOffest,e.daytimeForecast.precipitationChance,it[e.daytimeForecast.precipitationType],e.daytimeForecast.snowfallAmount,e.daytimeForecast.temperatureMax,e.daytimeForecast.temperatureMin,e.daytimeForecast.visibilityMax,e.daytimeForecast.visibilityMin,e.daytimeForecast.windDirection,e.daytimeForecast.windGustSpeedMax,e.daytimeForecast.windSpeed,e.daytimeForecast.windSpeedMax,e.daytimeForecast.precipitationIntensityMax,e.daytimeForecast.perceivedPrecipitationIntensityMax,e.daytimeForecast.uvIndexMin,e.daytimeForecast.uvIndexMax,e.daytimeForecast.temperatureApparentMin,e.daytimeForecast.temperatureApparentMax,e.daytimeForecast.daylight)),e.overnightForecast&&(i.overnightForecastPrecipitationAmountByTypeOffest=Tt.createPrecipitationAmountByTypeVector(t,e.overnightForecast.precipitationAmountByType.map(e=>xt.createPrecipitationAmountByType(t,it[e.precipitationType],e.expected,e.minimumSnow,e.maximumSnow,e.expectedSnow))),i.overnightForecastOffset=Tt.createDayPartForecast(t,e.overnightForecast.forecastStart,e.overnightForecast.forecastEnd,e.overnightForecast.cloudCover,e.overnightForecast.cloudCoverLowAltPct,e.overnightForecast.cloudCoverMidAltPct,e.overnightForecast.cloudCoverHighAltPct,at[e.overnightForecast.conditionCode],e.overnightForecast.humidity,e.overnightForecast.humidityMax,e.overnightForecast.humidityMin,e.overnightForecast.precipitationAmount,i.overnightForecastPrecipitationAmountByTypeOffest,e.overnightForecast.precipitationChance,it[e.overnightForecast.precipitationType],e.overnightForecast.snowfallAmount,e.overnightForecast.temperatureMax,e.overnightForecast.temperatureMin,e.overnightForecast.visibilityMax,e.overnightForecast.visibilityMin,e.overnightForecast.windDirection,e.overnightForecast.windGustSpeedMax,e.overnightForecast.windSpeed,e.overnightForecast.windSpeedMax,e.overnightForecast.precipitationIntensityMax,e.overnightForecast.perceivedPrecipitationIntensityMax,e.overnightForecast.uvIndexMin,e.overnightForecast.uvIndexMax,e.overnightForecast.temperatureApparentMin,e.overnightForecast.temperatureApparentMax,e.overnightForecast.daylight)),e.restOfDayForecast&&(i.restOfDayForecastPrecipitationAmountByTypeOffest=Tt.createPrecipitationAmountByTypeVector(t,e.restOfDayForecast.precipitationAmountByType.map(e=>xt.createPrecipitationAmountByType(t,it[e.precipitationType],e.expected,e.minimumSnow,e.maximumSnow,e.expectedSnow))),i.restOfDayForecastOffset=Tt.createDayPartForecast(t,e.restOfDayForecast.forecastStart,e.restOfDayForecast.forecastEnd,e.restOfDayForecast.cloudCover,e.restOfDayForecast.cloudCoverLowAltPct,e.restOfDayForecast.cloudCoverMidAltPct,e.restOfDayForecast.cloudCoverHighAltPct,at[e.restOfDayForecast.conditionCode],e.restOfDayForecast.humidity,e.restOfDayForecast.humidityMax,e.restOfDayForecast.humidityMin,e.restOfDayForecast.precipitationAmount,i.restOfDayForecastPrecipitationAmountByTypeOffest,e.restOfDayForecast.precipitationChance,it[e.restOfDayForecast.precipitationType],e.restOfDayForecast.snowfallAmount,e.restOfDayForecast.temperatureMax,e.restOfDayForecast.temperatureMin,e.restOfDayForecast.visibilityMax,e.restOfDayForecast.visibilityMin,e.restOfDayForecast.windDirection,e.restOfDayForecast.windGustSpeedMax,e.restOfDayForecast.windSpeed,e.restOfDayForecast.windSpeedMax,e.restOfDayForecast.precipitationIntensityMax,e.restOfDayForecast.perceivedPrecipitationIntensityMax,e.restOfDayForecast.uvIndexMin,e.restOfDayForecast.uvIndexMax,e.restOfDayForecast.temperatureApparentMin,e.restOfDayForecast.temperatureApparentMax,e.restOfDayForecast.daylight)),St.startDayWeatherConditions(t),St.addForecastStart(t,e.forecastStart),St.addForecastEnd(t,e.forecastEnd),St.addConditionCode(t,at[e.conditionCode]),St.addHumidityMax(t,e.humidityMax),St.addHumidityMin(t,e.humidityMin),St.addMaxUvIndex(t,e.maxUvIndex),St.addMoonPhase(t,st[e.moonPhase]),St.addMoonrise(t,e.moonrise),St.addMoonset(t,e.moonset),St.addPrecipitationAmount(t,e.precipitationAmount),St.addPrecipitationAmountByType(t,i.precipitationAmountByTypeOffest),St.addPrecipitationChance(t,e.precipitationChance),St.addPrecipitationType(t,it[e.precipitationType]),St.addSnowfallAmount(t,e.snowfallAmount),St.addSolarMidnight(t,e.solarMidnight),St.addSolarNoon(t,e.solarNoon),St.addSunrise(t,e.sunrise),St.addSunriseCivil(t,e.sunriseCivil),St.addSunriseNautical(t,e.sunriseNautical),St.addSunriseAstronomical(t,e.sunriseAstronomical),St.addSunset(t,e.sunset),St.addSunsetCivil(t,e.sunsetCivil),St.addSunsetNautical(t,e.sunsetNautical),St.addSunsetAstronomical(t,e.sunsetAstronomical),St.addTemperatureMax(t,e.temperatureMax),St.addTemperatureMaxTime(t,e.temperatureMaxTime),St.addTemperatureMin(t,e.temperatureMin),St.addTemperatureMinTime(t,e.temperatureMinTime),St.addVisibilityMax(t,e.visibilityMax),St.addVisibilityMin(t,e.visibilityMin),St.addWindGustSpeedMax(t,e.windGustSpeedMax),St.addWindSpeedAvg(t,e.windSpeedAvg),St.addWindSpeedMax(t,e.windSpeedMax),e.daytimeForecast&&St.addDaytimeForecast(t,i.daytimeForecastOffset),e.overnightForecast&&St.addOvernightForecast(t,i.overnightForecastOffset),e.restOfDayForecast&&St.addRestOfDayForecast(t,i.restOfDayForecastOffset),St.endDayWeatherConditions(t)}),a=vt.createDaysVector(t,n);return vt.createDailyForecastData(t,i,a)},tableClass:vt},forecastHourly:{decode:function(t){const e=t;t={metadata:zt(e.metadata()),hours:[]};for(let i=0;i<e.hoursLength();i++)t.hours.push({cloudCover:e.hours(i).cloudCover(),cloudCoverHighAltPct:e.hours(i).cloudCoverHighAltPct(),cloudCoverLowAltPct:e.hours(i).cloudCoverLowAltPct(),cloudCoverMidAltPct:e.hours(i).cloudCoverMidAltPct(),conditionCode:at[e.hours(i).conditionCode()],daylight:e.hours(i).daylight(),forecastStart:e.hours(i).forecastStart(),humidity:e.hours(i).humidity(),perceivedPrecipitationIntensity:e.hours(i).perceivedPrecipitationIntensity(),precipitationAmount:e.hours(i).precipitationAmount(),precipitationChance:e.hours(i).precipitationChance(),precipitationIntensity:e.hours(i).precipitationIntensity(),precipitationType:it[e.hours(i).precipitationType()],pressure:e.hours(i).pressure(),pressureTrend:nt[e.hours(i).pressureTrend()],snowfallAmount:e.hours(i).snowfallAmount(),snowfallIntensity:e.hours(i).snowfallIntensity(),temperature:e.hours(i).temperature(),temperatureApparent:e.hours(i).temperatureApparent(),unknown20:e.hours(i).unknown20(),temperatureDewPoint:e.hours(i).temperatureDewPoint(),uvIndex:e.hours(i).uvIndex(),visibility:e.hours(i).visibility(),windDirection:e.hours(i).windDirection(),windGust:e.hours(i).windGust(),windSpeed:e.hours(i).windSpeed()});return t},encode:function(t,e){const i=Gt(t,e.metadata),n=e.hours.map(e=>Et.createHourWeatherConditions(t,e.forecastStart,e.cloudCover,e.cloudCoverLowAltPct,e.cloudCoverMidAltPct,e.cloudCoverHighAltPct,at[e.conditionCode],e.daylight,e.humidity,e.perceivedPrecipitationIntensity,e.precipitationAmount,e.precipitationIntensity,e.precipitationChance,it[e.precipitationType],e.pressure,nt[e.pressureTrend],e.snowfallAmount,e.snowfallIntensity,e.temperature,e.temperatureApparent,e.unknown20,e.temperatureDewPoint,e.uvIndex,e.visibility,e.windDirection,e.windGust,e.windSpeed)),a=Pt.createHoursVector(t,n);return Pt.createHourlyForecastData(t,i,a)},tableClass:Pt},forecastNextHour:{decode:kt,encode:Vt,tableClass:Ht},historicalComparisons:{decode:function(t){const e=t;t={metadata:zt(e.metadata()),comparisons:[]};for(let i=0;i<e.comparisonsLength();i++){const n={baselineStartDate:e.comparisons(i).baselineStartDate(),baselineType:e.comparisons(i).baselineType(),baselineValue:e.comparisons(i).baselineValue(),condition:Y[e.comparisons(i).condition()],currentValue:e.comparisons(i).currentValue(),deviation:j[e.comparisons(i).deviation()]};t.comparisons.push(n)}return t},encode:function(t,e){const i=Gt(t,e.metadata),n=e.comparisons.map(e=>It.createComparison(t,Y[e.condition],e.currentValue,e.baselineValue,j[e.deviation],e.baselineType,e.baselineStartDate)),a=Ot.createComparisonsVector(t,n);return Ot.createHistoricalComparison(t,i,a)},tableClass:Ot},locationInfo:{decode:function(t){const e=t;return t={metadata:zt(e.metadata()),countryCode:e.countryCode(),preciseName:e.preciseName(),primaryName:e.primaryName(),timeZone:e.timeZone()}},encode:function(t,e){const i=Gt(t,e.metadata);return Ut.createLocationInfo(t,i,t.createString(e.preciseName),t.createString(e.countryCode),t.createString(e.timeZone),t.createString(e.primaryName))},tableClass:Ut},news:{decode:function(t){const e=t;t={metadata:zt(e.metadata()),placements:[]};for(let i=0;i<e.placementsLength();i++){const n={articles:[],placement:rt[e.placements(i).placement()],priority:e.placements(i).priority()};for(let t=0;t<e.placements(i).articlesLength();t++){const a={alertIds:[],headlineOverride:e.placements(i).articles(t).headlineOverride(),id:e.placements(i).articles(t).id(),locale:e.placements(i).articles(t).locale(),phenomena:[],supportedStorefronts:[]};for(let n=0;n<e.placements(i).articles(t).alertIdsLength();n++)a.alertIds.push(Zt(e.placements(i).articles(t).alertIds(n)));for(let n=0;n<e.placements(i).articles(t).phenomenaLength();n++)a.phenomena.push(e.placements(i).articles(t).phenomena(n));for(let n=0;n<e.placements(i).articles(t).supportedStorefrontsLength();n++)a.supportedStorefronts.push(e.placements(i).articles(t).supportedStorefronts(n));n.articles.push(a)}t.placements.push(n)}return t},encode:function(t,e){const i=Gt(t,e.metadata),n=e.placements.map(e=>{const i=e.articles.map(e=>{const i=e.alertIds.map(e=>jt(t,e)).filter(Boolean),n=_t.createAlertIdsVector(t,i),a=t.createString(e.headlineOverride),s=t.createString(e.id),r=t.createString(e.locale),o=_t.createPhenomenaVector(t,e.phenomena.map(e=>t.createString(e))),d=_t.createSupportedStorefrontsVector(t,e.supportedStorefronts.map(e=>t.createString(e)));return _t.createArticles(t,s,d,n,o,a,r)}),n=Mt.createArticlesVector(t,i);return Mt.createPlacement(t,e.priority,n,rt[e.placement])}),a=Rt.createPlacementsVector(t,n);return Rt.createNews(t,i,a)},tableClass:Rt},weatherAlerts:{decode:function(t){const e=t;t={metadata:zt(e.metadata()),alerts:[],detailsUrl:e.detailsUrl()};for(let i=0;i<e.alertsLength();i++){const n={areaId:e.alerts(i).areaId(),areaName:e.alerts(i).areaName(),attributionUrl:e.alerts(i).attributionUrl(),certainty:lt[e.alerts(i).certainty()],countryCode:e.alerts(i).countryCode(),description:e.alerts(i).description(),detailsUrl:e.alerts(i).detailsUrl(),effectiveTime:e.alerts(i).effectiveTime(),eventEndTime:e.alerts(i).eventEndTime(),eventOnsetTime:e.alerts(i).eventOnsetTime(),eventSource:e.alerts(i).eventSource(),expireTime:e.alerts(i).expireTime(),id:Zt(e.alerts(i).id()),importance:pt[e.alerts(i).importance()],issuedTime:e.alerts(i).issuedTime(),phenomenon:e.alerts(i).phenomenon(),responses:[],severity:dt[e.alerts(i).severity()],significance:ct[e.alerts(i).significance()],source:e.alerts(i).source(),token:e.alerts(i).token(),urgency:ut[e.alerts(i).urgency()],unknown23:e.alerts(i).unknown23(),unknown24:e.alerts(i).unknown24(),unknown25:e.alerts(i).unknown25(),unknown26:e.alerts(i).unknown26()};for(let t=0;t<e.alerts(i).responsesLength();t++)n.responses.push(ot[e.alerts(i).responses(t)]);t.alerts.push(n)}return t},encode:function(t,e){const i=Gt(t,e.metadata),n=e.alerts.map(e=>{const i=e.responses.map(t=>ot[t]),n=Wt.createResponsesVector(t,i),a=jt(t,e.id),s=t.createString(e.areaId),r=t.createString(e.areaName),o=t.createString(e.attributionUrl),d=t.createString(e.countryCode),c=t.createString(e.description),u=t.createString(e.token),l=t.createString(e.detailsUrl),p=t.createString(e.phenomenon),h=t.createString(e.source),b=t.createString(e.eventSource);return Wt.createWeatherAlertSummary(t,a,s,r,o,d,c,u,e.effectiveTime,e.expireTime,e.issuedTime,e.eventOnsetTime,e.eventEndTime,l,p,dt[e.severity],ct[e.significance],h,b,ut[e.urgency],lt[e.certainty],pt[e.importance],n,e.unknown23,e.unknown24,e.unknown25,e.unknown26)}),a=Lt.createAlertsVector(t,n),s=t.createString(e.detailsUrl);return Lt.createWeatherAlertCollectionData(t,i,s,a)},tableClass:Lt},weatherChanges:{decode:function(t){const e=t;t={metadata:zt(e.metadata()),changes:[],forecastEnd:e.forecastEnd(),forecastStart:e.forecastStart()};for(let i=0;i<e.changesLength();i++){const n={dayPrecipitationChange:Z[e.changes(i).dayPrecipitationChange()],forecastEnd:e.changes(i).forecastEnd(),forecastStart:e.changes(i).forecastStart(),maxTemperatureChange:Z[e.changes(i).maxTemperatureChange()],minTemperatureChange:Z[e.changes(i).minTemperatureChange()],nightPrecipitationChange:Z[e.changes(i).nightPrecipitationChange()]};t.changes.push(n)}return t},encode:function(t,e){const i=Gt(t,e.metadata),n=e.changes.map(e=>gt.createChange(t,e.forecastStart,e.forecastEnd,Z[e.maxTemperatureChange],Z[e.minTemperatureChange],Z[e.dayPrecipitationChange],Z[e.nightPrecipitationChange])),a=Dt.createChangesVector(t,n);return Dt.createWeatherChanges(t,i,e.forecastStart,e.forecastEnd,a)},tableClass:Dt}},configurableRootNames:a.WeatherKit.Settings.DataSets,name:"WeatherKit2",rootClass:Bt});function $t(t,e){const i=Gt(t,e.metadata),n=yt.createPollutantsVector(t,e.pollutants.map(e=>mt.createPollutant(t,G[e.pollutantType],e.amount,z[e.units]))),a=t.createString(e.scale);return yt.createAirQuality(t,i,e.categoryIndex,e.index,e.isSignificant,n,Q[e.previousDayComparison],G[e.primaryPollutant],a)}function Vt(t,e){const i=Gt(t,e.metadata),n=e.condition.filter(t=>[t.beginCondition,t.endCondition].every(t=>"number"==typeof X[t])).map(e=>{const i=e.parameters.map(e=>Nt.createParameter(t,et[e.type],e.date)),n=Ct.createParametersVector(t,i);return Ct.createCondition(t,e.startTime,e.endTime,tt[e.forecastToken],X[e.beginCondition],X[e.endCondition],n)}),a=Ht.createConditionVector(t,n),s=e.summary.map(e=>wt.createForecastPeriodSummary(t,e.startTime,e.endTime,it[e.condition],e.precipitationChance,e.precipitationIntensity)),r=Ht.createSummaryVector(t,s),o=e.minutes.map(e=>Ft.createForecastMinute(t,e.startTime,e.precipitationChance,e.precipitationIntensity,e.perceivedPrecipitationIntensity)),d=Ht.createMinutesVector(t,o);return Ht.createNextHourForecastData(t,i,a,r,e.forecastStart,e.forecastEnd,d)}function Qt(t){const e=t;t={metadata:zt(e.metadata()),categoryIndex:e.categoryIndex(),index:e.index(),isSignificant:e.isSignificant(),pollutants:[],previousDayComparison:Q[e.previousDayComparison()],primaryPollutant:G[e.primaryPollutant()],scale:e.scale()};for(let i=0;i<e.pollutantsLength();i++)t.pollutants.push({amount:e.pollutants(i).amount(),pollutantType:G[e.pollutants(i).pollutantType()],units:z[e.pollutants(i).units()]});return t}function kt(t){const e=t;t={metadata:zt(e.metadata()),condition:[],forecastEnd:e.forecastEnd(),forecastStart:e.forecastStart(),minutes:[],summary:[]};for(let i=0;i<e.conditionLength();i++){const n={beginCondition:X[e.condition(i).beginCondition()],endCondition:X[e.condition(i).endCondition()],endTime:e.condition(i).endTime(),forecastToken:tt[e.condition(i).forecastToken()],parameters:[],startTime:e.condition(i).startTime()};for(let t=0;t<e.condition(i).parametersLength();t++)n.parameters.push({date:e.condition(i).parameters(t).date(),type:et[e.condition(i).parameters(t).type()]});t.condition.push(n)}for(let i=0;i<e.minutesLength();i++)t.minutes.push({perceivedPrecipitationIntensity:e.minutes(i).perceivedPrecipitationIntensity(),precipitationChance:e.minutes(i).precipitationChance(),precipitationIntensity:e.minutes(i).precipitationIntensity(),startTime:e.minutes(i).startTime()});for(let i=0;i<e.summaryLength();i++)t.summary.push({condition:it[e.summary(i).condition()],endTime:e.summary(i).endTime(),precipitationChance:e.summary(i).precipitationChance(),precipitationIntensity:e.summary(i).precipitationIntensity(),startTime:e.summary(i).startTime()});return t}function Gt(t,e){return e?bt.createMetadata(t,t.createString(e.attributionUrl),e.expireTime,t.createString(e.language),e.latitude,e.longitude,t.createString(e.providerLogo),t.createString(e.providerName),e.readTime,e.reportedTime,e.temporarilyUnavailable,k[e.sourceType],e.unknown11,e.unknown12,e.unknown13,e.unknown14,e.unknown15):0}function zt(t){if(t)return t={attributionUrl:t.attributionUrl(),expireTime:t.expireTime(),language:t.language(),latitude:t.latitude(),longitude:t.longitude(),providerLogo:t.providerLogo(),providerName:t.providerName(),readTime:t.readTime(),reportedTime:t.reportedTime(),temporarilyUnavailable:t.temporarilyUnavailable(),sourceType:k[t.sourceType()]}}function Yt(t){if(null==t)return null;if(t instanceof Uint8Array||Array.isArray(t))return t;if("string"==typeof t){const e=function(t){if("string"!=typeof t)return null;const e=t.replace(/-/g,"").toLowerCase();if(!/^[0-9a-f]{32}$/.test(e))return null;const i=[];for(let t=0;t<e.length;t+=2)i.push(Number.parseInt(e.slice(t,t+2),16));return{bytes:i}}(t);return e?e.bytes:null}if("object"==typeof t){if(t.bytes instanceof Uint8Array||Array.isArray(t.bytes))return t.bytes;if("function"==typeof t.bytesArray)return t.bytesArray()}return null}function jt(t,e){const i=Yt(e);if(!i||0===i.length)return 0;const n=ft.createBytesVector(t,i);return ft.createUUID(t,n)}function Zt(t){return function(t){const e=Yt(t);if(!e||16!==e.length)return null;const i=Array.from(e).map(t=>t.toString(16).padStart(2,"0")).join("");return`${i.slice(0,8)}-${i.slice(8,12)}-${i.slice(12,16)}-${i.slice(16,20)}-${i.slice(20,32)}`}(t)}const qt=0;class Jt extends yt{}function Xt(t=0){if(!Number.isInteger(t)||t<0||t>255)throw new TypeError("WK3 enum must be a raw integer from 0 to 255; symbolic WK2 names are unsupported");return t}function te(t=0,e=4294967295){if(!Number.isInteger(t)||t<0||t>e)throw new RangeError("WK3 unsigned integer out of range");return t}function ee(t=0){if("number"!=typeof t||!Number.isFinite(Math.fround(t)))throw new TypeError("WK3 finite float32 required");return t}function ie(t){return t?{attributionUrl:t.attributionUrl(),expireTime:t.expireTime(),language:t.language(),latitude:t.latitude(),longitude:t.longitude(),providerLogo:t.providerLogo(),providerName:t.providerName(),readTime:t.readTime(),reportedTime:t.reportedTime(),temporarilyUnavailable:t.temporarilyUnavailable(),sourceType:255&t.sourceType()}:null}function ne(t,e){const i=function(t,e){return e?bt.createMetadata(t,t.createString(e.attributionUrl),te(e.expireTime),t.createString(e.language),ee(e.latitude),ee(e.longitude),t.createString(e.providerLogo),t.createString(e.providerName),te(e.readTime),te(e.reportedTime),e.temporarilyUnavailable??!1,Xt(e.sourceType)):0}(t,e.metadata),n=null==e.pollutants?0:yt.createPollutantsVector(t,e.pollutants.map(e=>mt.createPollutant(t,Xt(e.pollutantType),ee(e.amount),Xt(e.units)))),a=t.createString(e.scale);return yt.createAirQuality(t,i,Xt(e.categoryIndex),te(e.index,65535),e.isSignificant??!1,n,Xt(e.previousDayComparison),Xt(e.primaryPollutant),a)}const ae={NOT_AVAILABLE:1,NO:5,NO2:6,NOX:7,OZONE:8,PM2_5:9,SO2:10,PM10:11,CO:12},se={PARTS_PER_BILLION:1,MICROGRAMS_PER_CUBIC_METER:2},re={MODELED:2,STATION:3};function oe(t){const e=(t,e)=>{if(!Object.hasOwn(t,e))throw new TypeError(`Unsupported WK3 AQ enum: ${e}`);return t[e]};if(!["EPA_NowCast.2414","EPA_NowCast.2604"].includes(t?.scale))throw new TypeError("Unsupported EPA_NowCast scale version");if(!Number.isInteger(t.index))throw new TypeError("Missing integer AQI");const i=te(t.index,500),n=i<=50?1:i<=100?2:i<=150?3:i<=200?4:i<=300?5:6;if(t.categoryIndex!==n||t.isSignificant!==n>=3)throw new TypeError("Inconsistent EPA AQI category/significance");if(!t.metadata||t.metadata.temporarilyUnavailable||!t.metadata.providerName)throw new TypeError("Missing AQ provider metadata");if(!Array.isArray(t.pollutants)||!t.pollutants.length)throw new TypeError("Missing provider pollutants");const a=new Set,s=t.pollutants.map(t=>{const i=e(ae,t.pollutantType);if(1===i||a.has(i))throw new TypeError("Invalid or duplicate pollutant");if(a.add(i),"number"!=typeof t.amount)throw new TypeError("Missing pollutant concentration");const n=ee(t.amount);if(n<0)throw new RangeError("Negative pollutant concentration");return{pollutantType:i,amount:n,units:e(se,t.units)}}),r=e(ae,t.primaryPollutant);if(1!==r&&!a.has(r))throw new TypeError("Primary pollutant missing from provider data");return{metadata:{...t.metadata,sourceType:e(re,t.metadata.sourceType)},index:i,categoryIndex:n,isSignificant:n>=3,pollutants:s,primaryPollutant:r,previousDayComparison:0,scale:"EPA_NowCast.2604"}}function de(t,e="airQuality"){if("airQuality"!==e)throw new RangeError(`Unsupported WK3 data set ${e}`);const i=t instanceof T?t:new T(t),n=i.position(),a=n+i.readUint32(n),s=i.__offset(a,4+2*qt);return s?{metadata:ie((r=(new Jt).__init(i.__indirect(a+s),i)).metadata()),categoryIndex:255&r.categoryIndex(),index:65535&r.index(),isSignificant:r.isSignificant(),pollutants:Array.from({length:r.pollutantsLength()},(t,e)=>{const i=r.pollutants(e);return{pollutantType:255&i.pollutantType(),amount:i.amount(),units:255&i.units()}}),previousDayComparison:255&r.previousDayComparison(),primaryPollutant:255&r.primaryPollutant(),scale:r.scale()}:null;var r}const ce=0,ue=2,le=3,pe=4;function he(t){return/^EPA_NowCast\.(2414|2604)$/.test(t)?"US":/^HJ6332012\.(2414|2604)$/.test(t)?"CN":null}function be(t){return!(!t?.metadata||t.metadata.temporarilyUnavailable||!he(t.scale))&&(!(!Number.isInteger(t.categoryIndex)||t.categoryIndex<1||t.categoryIndex>6)&&(void 0===t.index||Number.isInteger(t.index)&&t.index>=0&&t.index<=500&&((e=t.index)<=50?1:e<=100?2:e<=150?3:e<=200?4:e<=300?5:6)===t.categoryIndex));var e}function me(t,e,i){if("string"!=typeof t||!t.trim()||t!==e)return!1;if("Calculate"===t)return!1;const n={ColorfulCloudsUS:"US",ColorfulCloudsCN:"CN",QWeather:"CN"}[t];return!n||n===he(i)}async function ye(t,{currentProvider:e,yesterdayProvider:i=e,sources:n={},yesterday:a,locationInfo:s}={}){const r={...t,previousDayComparison:ce};try{const o=void 0===a?void 0:Promise.resolve(a);if(o?.catch(()=>{}),!be(t)||!me(e,i,t.scale))return r;let d=o;if(void 0===d)switch(i){case"ColorfulCloudsUS":case"ColorfulCloudsCN":d=n.colorfulClouds?.YesterdayAirQuality("ColorfulCloudsUS"===i);break;case"QWeather":s&&(d=n.qWeather?.YesterdayAirQuality(s))}r.previousDayComparison=function(t,e,{currentProvider:i,yesterdayProvider:n}={}){return be(t)&&be(e)&&he(t.scale)===he(e.scale)&&me(i,n,t.scale)?t.categoryIndex<e.categoryIndex?pe:t.categoryIndex>e.categoryIndex?ue:le:ce}(t,await d,{currentProvider:e,yesterdayProvider:i})}catch{}return r}class fe{static async FetchWeatherAlertPage(t,i="zh-CN",n=e){const a=fe.BuildWeatherAlertPageURL(t,i),s=await n(a.toString(),{redirect:"error",headers:{Accept:"text/html"}});if(200!==(s.status??s.statusCode))throw new Error("QWeather alert page unavailable");const r=s.headers,o="function"==typeof r?.get?r.get("content-type"):r?.["content-type"];if(!/text\/html/i.test(o??""))throw new TypeError("Expected QWeather HTML");const d="function"==typeof s.text?await s.text():s.body;if("string"!=typeof d||(new TextEncoder).encode(d).length>2097152)throw new RangeError("Invalid QWeather page size");return fe.ExtractWeatherAlertPage(d)}static async DetailsForQWeather(t,i="zh-CN",n=e){const a=await fe.FetchWeatherAlertPage(t,i,n);return fe.Build(a,{identifier:t,language:i,attributionUrl:fe.BuildWeatherAlertPageURL(t,i),countryCode:"CN",eventSource:"CN"})}static Build(t,e){const i=e.identifier.match(/-(\d+)$/)?.[1];return t.alerts.map((n,a)=>{const s=fe.#U(`${e.identifier}:${n.identifier??a}`),r=[];for(const t of[n.message,n.standard,n.guidelines?.filter(Boolean).join("\n")])t&&r.push({language:e.language,text:t});!r.length&&n.description&&r.push({language:e.language,text:n.description});const o=fe.#M(n.guidelines,n.responses),d=n.areaId||i,c=n.areaName||t.areaName,u=n.effectiveTime??n.issuedTime,l=n.expireTime??"9999-12-31T23:59:59Z",p=n.eventOnsetTime??u,h=n.eventEndTime??(n.expireTime?l:void 0),b=n.source||t.source||"",m=n.importance||fe.#R(n.severity),y=n.phenomenon,f=fe.#H(n.description,n.eventName);return{id:s,...d?{areaId:d}:{},...c?{areaName:c}:{},attributionURL:e.attributionUrl.toString(),certainty:n.certainty||"unknown",countryCode:e.countryCode??"",description:f,detailsUrl:`#${s}`,effectiveTime:u,...h?{eventEndTime:h}:{},...p?{eventOnsetTime:p}:{},eventSource:e.eventSource??e.countryCode??"",expireTime:l,issuedTime:n.issuedTime,...m?{importance:m}:{},messages:r,name:"WeatherAlert",...y?{phenomenon:y}:{},precedence:a,responses:o,...n.significance?{significance:n.significance}:{},reportedAt:n.reportedAt,severity:n.severity,source:b,...n.token?{token:n.token}:{},urgency:n.urgency||"unknown"}})}static ParseWeatherAlertPageURL(t){try{const e=new URL(t);if("https:"!==e.protocol||"www.qweather.com"!==e.hostname)return;if("?from=AppleWeatherService"!==e.search||e.hash)return;return decodeURIComponent(e.pathname).match(/^\/{1,2}(?:en\/)?severe-weather\/([^/]+)\.html$/)?.[1]}catch{return}}static BuildWeatherAlertPageURL(t,e="zh-CN",i=!0){if(t=t?.trim(),!/^[a-zA-Z0-9][a-zA-Z0-9_-]*-\d+$/.test(t??""))throw new TypeError("Invalid QWeather location identifier");const n=new URL("https://www.qweather.com");return n.pathname=e.toLowerCase().startsWith("en")?`/en/severe-weather/${t}.html`:`/severe-weather/${t}.html`,i&&n.searchParams.set("from","AppleWeatherService"),n}static BuildAppleAlertDetailsURL(t,e="zh-CN"){return`https://weatherkit.apple.com/alertDetails/index.html?lang=${encodeURIComponent(e)}&ids=${encodeURIComponent(t)}&party=qweather`}static ExtractWeatherAlertPage(t){const e=String(t??"");let i=fe.#W(e,/<h1[^>]*class=["'][^"']*c-submenu__location[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i);if(!i){i=fe.#W(e,/<title>([\s\S]*?)<\/title>/i).replace(/\s*(?:severe weather warning|灾害预警|天气预警).*$/i,"").trim()}const n=fe.#W(e,/<span[^>]*class=["'][^"']*c-submenu__location-adm[^"']*["'][^>]*>([\s\S]*?)<\/span>/i),a=fe.#W(e,/<a[^>]*class=["'][^"']*data-source__txt[^"']*["'][^>]*>([\s\S]*?)<\/a>/i).replace(/^(?:预警数据来源|Warning data source)\s*[:：]\s*/i,"").trim(),s=Array.from(e.matchAll(/<div[^>]*class=["']([^"']*\bc-city-warning-events\b[^"']*)["'][^>]*>/gi),t=>({index:t.index,contentStart:t.index+t[0].length,className:t[1]})),r=[];for(const[t,i]of s.entries()){let n=t+1<s.length?s[t+1].index:e.length;const o=e.indexOf('<div class="c-city-warning-around">',i.contentStart);-1!==o&&o<n&&(n=o);const d=e.slice(i.contentStart,n),c=fe.#W(d,/<h3[^>]*>([\s\S]*?)<\/h3>/i),u=fe.#W(d,/<p[^>]*>\s*((?:Issue\s+date|发布\s*日期)\s*[:：][\s\S]*?)<\/p>/i).replace(/^(?:Issue\s+date|发布\s*日期)\s*[:：]\s*/i,"").trim(),l=fe.#W(d,/<p[^>]*class=["'][^"']*warning-events__txt[^"']*["'][^>]*>([\s\S]*?)<\/p>/i),p=d.match(/<div[^>]*class=["'][^"']*warning-explain[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1]??"",h=fe.#W(p,/<h4[^>]*>[\s\S]*?<\/h4>\s*<p[^>]*>([\s\S]*?)<\/p>/i),b=d.match(/<div[^>]*class=["'][^"']*warning-defense__txt[^"']*["'][^>]*>([\s\S]*?)<\/div>/i)?.[1]??"",m=Array.from(b.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi),t=>fe.#L(t[1]).replace(/^\s*\d+[.、]\s*/,"").trim()).filter(Boolean),y=u&&!/(?:Z|[+-]\d{2}:?\d{2})$/i.test(u)?`${u.replace(" ","T")}+08:00`:u,f=new Date(y);if(!c&&!l||Number.isNaN(f.getTime()))continue;const _=c||l,g=fe.#D(_),I=g.source||a||"QWeather",N=`${i.className} ${c}`.toLowerCase();let C="unknown";switch(!0){case/warning--red|红色|\bred\b/.test(N):C="extreme";break;case/warning--orange|橙色|\borange\b/.test(N):C="severe";break;case/warning--yellow|黄色|\byellow\b/.test(N):C="moderate";break;case/warning--blue|蓝色|\bblue\b/.test(N):C="minor"}r.push({description:_,...g.eventName?{eventName:g.eventName}:{},guidelines:m,issuedTime:f.toISOString(),message:l,reportedAt:f.toISOString(),severity:C,source:I,standard:h})}return{alerts:r,areaName:i||n,source:r.find(t=>t?.source)?.source||a||"QWeather"}}static#U(t){const e=[2166136261,2654435769,2246822507,3266489909];for(let i=0;i<e.length;i++)for(let n=0;n<t.length;n++)e[i]^=t.charCodeAt(n)+i,e[i]=Math.imul(e[i],16777619);const i=new Uint8Array(16),n=new DataView(i.buffer);for(let t=0;t<e.length;t++)n.setUint32(4*t,e[t]);i[6]=15&i[6]|80,i[8]=63&i[8]|128;const a=Array.from(i,t=>t.toString(16).padStart(2,"0")).join("");return`${a.slice(0,8)}-${a.slice(8,12)}-${a.slice(12,16)}-${a.slice(16,20)}-${a.slice(20)}`}static#M(t,e=[]){const i=fe.#B(e);if(i.length)return i;const n=[];for(const e of t??[]){const t=fe.#K(e);t&&!n.includes(t)&&n.push(t)}return n.length?n:t?.length?["monitor"]:[]}static#R(t){switch(String(t??"").trim().toLowerCase()){case"extreme":case"severe":return"high";case"minor":return"low";default:return"normal"}}static#H(t,e=""){const i=String(t??"").trim(),n=fe.#$(e);if(!i)return n;const a=i.match(/^.+?(?:发布|更新|变更)\s*[:：]?\s*(.+)$/);if(a?.[1])return fe.#$(a[1]);const s=i.match(/^(.+?)\s+issued\b\s*[:：]?\s*(.+)$/i);if(s?.[1]&&s?.[2]){const t=fe.#$(s[1]);return Boolean(n)&&fe.#V(n)===fe.#V(t)?n:fe.#Q(s[2])||n}const r=i.match(/^.+?\s+issues?\b\s*[:：]?\s*(.+)$/i);return r?.[1]?fe.#Q(r[1])||n:fe.#$(i)||n}static#W(t,e,i=""){const n=t.match(e);return n?fe.#L(n[1]):i}static#L(t){return String(t??"").replace(/<br\s*\/?\s*>/gi,"\n").replace(/<[^>]*>/g,"").replace(/&nbsp;|&#160;/gi," ").replace(/&apos;/gi,"&#39;").replace(/&#(\d+);/g,(t,e)=>String.fromCodePoint(Number(e))).replace(/&#x([0-9a-f]+);/gi,(t,e)=>String.fromCodePoint(Number.parseInt(e,16))).replace(/&quot;/gi,'"').replace(/&#39;/gi,"'").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&amp;/gi,"&").replace(/\r/g,"").replace(/[ \t]+\n/g,"\n").replace(/\n[ \t]+/g,"\n").replace(/[ \t]{2,}/g," ").replace(/\n{3,}/g,"\n\n").trim()}static#D(t){const e=String(t??"").trim(),i=e.match(/^(.+?)发布\s*[:：]?\s*(.+)$/);if(i?.[1]&&i?.[2])return{eventName:i[2].trim(),source:i[1].trim()};const n=e.match(/^(.+?)\s+issued\b[\s\S]*\s+by\s+(.+)$/i);if(n?.[1]&&n?.[2])return{eventName:n[1].trim(),source:n[2].trim()};const a=e.match(/^(.+?)\s+issued\b\s*[:：]?\s*(.+)$/i);if(a?.[1]&&a?.[2]){const t=a[2].trim();return/^(?:for\b|\d{1,2}[/:.-]|\p{L}+\s+(?:\d{1,2}\b|at\b|until\b))/iu.test(t)?{eventName:a[1].trim(),source:""}:{eventName:t,source:a[1].trim()}}const s=e.match(/^(.+?)\s+issues?\b\s*[:：]?\s*(.+)$/i);return s?.[1]&&s?.[2]?{eventName:s[2].trim(),source:s[1].trim()}:{eventName:e,source:""}}static#B(t){const e=[];for(const i of t??[]){const t=String(i??"").trim();t&&!e.includes(t)&&e.push(t)}return e}static#K(t){const e=String(t??"").trim().toLowerCase();if(!e)return null;const i=e.replace(/\s+/g,"");return/撤离|疏散|转移|离开/.test(e)||i.includes("evacuat")?"evacuate":/就地|躲避|避难|避险|避风|室内|躲到|进入室内|待在室内/.test(e)||i.includes("takeshelter")||i.includes("seekshelter")?"shelter":/执行|实施|预案|计划/.test(e)||i.includes("execute")||i.includes("carryout")||i.includes("implement")?"execute":/准备|防范|防护|备好|做好.*准备/.test(e)||i.includes("prepare")||i.includes("preparations")?"prepare":/远离|避免|不要|切勿|勿|别/.test(e)||i.includes("avoid")||i.includes("stayaway")||i.includes("keepaway")||i.includes("donot")||i.includes("dont")?"avoid":/密切关注|持续关注|关注|留意|监测|观察|跟踪/.test(e)||i.includes("monitor")||i.includes("watch")||i.includes("followup")?"monitor":/评估|检查/.test(e)||i.includes("assess")||i.includes("inspect")?"assess":/解除|恢复正常/.test(e)||i.includes("allclear")?"allClear":/无需|不需|无须/.test(e)||i.includes("none")?"none":null}static#$(t){return String(t??"").trim().replace(/\s*[\[【][^\]】]+[\]】]\s*$/u,"").replace(/\s*[。．.]+\s*$/gu,"").replace(/预警信号$/u,"预警").replace(/預警信號$/u,"預警")}static#V(t){return String(t??"").trim().toLowerCase().replace(/\s+/g,"").replace(/预警信号|预警|警报|报告/g,"")}static#Q(t){return fe.#$(t).replace(/^(?:a|an|the)\s+/i,"").replace(/\b\p{L}/gu,t=>t.toUpperCase())}}const _e=/^[a-zA-Z0-9][a-zA-Z0-9_-]*-\d{9}$/,ge=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function Ie(t,e){if(!t||"object"!=typeof t||Array.isArray(t)||Object.keys(t).length!==e.length||e.some(e=>!Object.hasOwn(t,e)))throw new TypeError("Invalid native alert payload shape")}function Ne(t){if(!(Array.isArray(t)||t instanceof Uint8Array)||16!==t.length||!Array.from(t).every(t=>Number.isInteger(t)&&t>=0&&t<=255))throw new TypeError("Expected 16 Apple UUID bytes");const e=Array.from(t,t=>t.toString(16).padStart(2,"0")).join("");return`${e.slice(0,8)}-${e.slice(8,12)}-${e.slice(12,16)}-${e.slice(16,20)}-${e.slice(20)}`}function Ce({identifier:t,language:e="zh-CN",alerts:i,timezone:n}){if(function(t){if("string"!=typeof t||t.length>64||!/^[a-zA-Z]{2,8}(?:-[a-zA-Z0-9]{1,8})*$/.test(t))throw new TypeError("Invalid alert language")}(e),void 0!==n&&("string"!=typeof n||!/^[A-Za-z0-9_+/-]{1,128}$/.test(n)))throw new TypeError("Invalid alert timezone");if(!Array.isArray(i)||!i.length||i.length>32)throw new RangeError("Invalid native alert count");const a=function(t){if(Ie(t,["region","alerts"]),"string"!=typeof t.region||t.region.length>128||!_e.test(t.region))throw new TypeError("Invalid QWeather region");if(!Array.isArray(t.alerts)||!t.alerts.length||t.alerts.length>32)throw new RangeError("Invalid native alert count");const e=new Set;for(const i of t.alerts){if(Ie(i,["id","description","issuedTime","severity"]),"string"!=typeof i.id||!ge.test(i.id)||e.has(i.id))throw new TypeError("Invalid or duplicate Apple UUID");if(e.add(i.id),"string"!=typeof i.description||!i.description.trim()||i.description.length>512)throw new TypeError("Invalid alert description");if(!Number.isInteger(i.issuedTime)||i.issuedTime<=0||i.issuedTime>4294967295)throw new TypeError("Invalid alert issuedTime");if(!Number.isInteger(i.severity)||i.severity<0||i.severity>255)throw new TypeError("Invalid WK3 severity")}return t}({region:t,alerts:i.map(t=>({id:Ne(t?.id?.bytes),description:t.description,issuedTime:t.issuedTime,severity:t.severity}))}),s=(new TextEncoder).encode(JSON.stringify(a));if(s.length>12e3)throw new RangeError("Native alert payload too long");const r="wk3_"+function(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}(s);if(r.length>16384)throw new RangeError("Native alert ids too long");const o=new URL("https://weatherkit.apple.com/alertDetails/index.html");return o.searchParams.set("lang",e),o.searchParams.set("ids",r),o.searchParams.set("party","qweather"),void 0!==n&&o.searchParams.set("timezone",n),o.toString()}const xe={severity:{UNKNOWN:0,MODERATE:3,MINOR:4},significance:{UNKNOWN:0,STATEMENT:10},urgency:{UNKNOWN:0,EXPECTED:2},certainty:{UNKNOWN:0,LIKELY:2},importance:{LOW:2},responses:{MONITOR:7}},Ae={attributionUrl:3,countryCode:4,description:5,token:6,detailsUrl:12,phenomenon:13,source:16,eventSource:17},Te={effectiveTime:7,expireTime:8,issuedTime:9,eventOnsetTime:10,eventEndTime:11},Se={severity:14,significance:15,urgency:18,certainty:19,importance:20},ve=Symbol("WK3Alerts.originalArena"),Fe=(t,e=4294967295)=>{if(!Number.isInteger(t)||t<0||t>e)throw new RangeError("Expected unsigned wire integer");return t};function we(t){if(t instanceof T)return t.bytes().subarray(t.position());if(!(t instanceof Uint8Array))throw new TypeError("Expected Uint8Array or ByteBuffer");return t}function Oe(t){const e=we(t),i=new DataView(e.buffer,e.byteOffset,e.byteLength),n=(t,i)=>{if(!Number.isInteger(t)||t<0||t+i>e.length)throw new RangeError("Invalid WK3 offset")},a=t=>(n(t,2),i.getUint16(t,!0)),s=t=>(n(t,4),i.getUint32(t,!0)),r=t=>{const e=t+s(t);return n(e,4),e};return{b:e,v:i,check:n,u16:a,u32:s,indirect:r,field:(t,e)=>{n(t,4);const s=t-i.getInt32(t,!0),r=a(s),o=a(s+2);if(n(s,r),n(t,o),r<4||r%2||o<4)throw new RangeError("Invalid WK3 table");const d=4+2*e<r?a(s+4+2*e):0;if(d&&(d<4||d>=o))throw new RangeError("Invalid WK3 field");return d?t+d:0},string:t=>{if(!t)return null;const i=r(t),a=s(i);if(n(i+4,a+1),e[i+4+a])throw new RangeError("Invalid WK3 string");return new TextDecoder("utf-8",{fatal:!0}).decode(e.subarray(i+4,i+4+a))},vector:(t,e)=>{if(!t)return{start:0,length:0};const i=r(t),a=s(i);return n(i+4,a*e),{start:i+4,length:a}}}}function Ee(t){const e=t.indirect(0),i=t.field(e,9);return i?t.indirect(i):0}function Pe(t,e){const i={},n=t.field(e,0);if(n){const e=t.field(t.indirect(n),0),a=t.vector(e,1);if(16!==a.length)throw new RangeError("Expected 16 UUID bytes");i.id={bytes:Array.from(t.b.subarray(a.start,a.start+16))}}else i.id=null;const a=t.field(e,1);i.areaId=t.string(a);for(const[n,a]of Object.entries(Ae))i[n]=t.string(t.field(e,a));for(const[n,a]of Object.entries(Te)){const s=t.field(e,a);i[n]=s?t.u32(s):0}for(const[n,a]of Object.entries(Se)){const s=t.field(e,a);i[n]=s?t.b[s]:0}const s=t.vector(t.field(e,21),1);return i.responses=Array.from(t.b.subarray(s.start,s.start+s.length)),i}function Ue(t,e){const i=e-t.v.getInt32(e,!0),n=(t.u16(i)-4)/2,a=t.field(e,0);if(a){const e=t.indirect(a),i=e-t.v.getInt32(e,!0),n=(t.u16(i)-4)/2;if(Array.from({length:Math.max(0,n-1)},(i,n)=>t.field(e,n+1)).some(Boolean))return!0}return Boolean(t.field(e,2))||Array.from({length:Math.max(0,n-22)},(i,n)=>t.field(e,n+22)).some(Boolean)}function Me(t){const e=new S,i={};for(const[n,a]of Object.entries({areaId:1,...Ae}))if(null!=t[n]){if("string"!=typeof t[n])throw new TypeError(`Expected string ${n}`);i[a]=e.createString(t[n])}let n=0;if(t.id){if(!Array.isArray(t.id.bytes)||16!==t.id.bytes.length)throw new TypeError("Expected UUID byte array");e.startVector(1,16,1);for(const i of[...t.id.bytes].reverse())e.addInt8(Fe(i,255));const i=e.endVector();e.startObject(1),e.addFieldOffset(0,i,0),n=e.endObject()}if(!Array.isArray(t.responses))throw new TypeError("Expected raw responses array");e.startVector(1,t.responses.length,1);for(const i of[...t.responses].reverse())e.addInt8(Fe(i,255));const a=e.endVector();e.startObject(22),e.addFieldOffset(0,n,0);for(const[t,n]of Object.entries(i))e.addFieldOffset(Number(t),n,0);for(const[i,n]of Object.entries(Te))e.addFieldInt32(n,Fe(t[i]),0);for(const[i,n]of Object.entries(Se))e.addFieldInt8(n,Fe(t[i],255),0);return e.addFieldOffset(21,a,0),e.finish(e.endObject()),e.asUint8Array()}function Re(t,e,i={}){const n=Oe(t),a=Ee(n);if(!a){if(e?.length)throw new RangeError("Apple response has no alerts collection");return n.b}const s=n.vector(n.field(a,2),4);if(!Array.isArray(e)||e.length!==s.length)throw new RangeError("Cannot add/remove WK3 alerts");const r=[];for(let t=0;t<e.length;t++){const i=s.start+4*t,a=n.indirect(i),o=Pe(n,a),d=e[t];if(!d||JSON.stringify(d.id)!==JSON.stringify(o.id))throw new TypeError("Cannot change WK3 alert identity/order");const c=new Set(["id","areaId",...Object.keys(Ae),...Object.keys(Te),...Object.keys(Se),"responses"]);if(Object.keys(d).some(t=>!c.has(t)))throw new TypeError("Unverified WK3 alert field");if(JSON.stringify(d)!==JSON.stringify(o)){if(Ue(n,a))throw new RangeError("Unverified WK3 summary fields; preserve original");r.push({p:i,bytes:Me(d)})}}let o=n.b;for(const t of r){const e=8*Math.ceil(o.length/8),i=new Uint8Array(e+t.bytes.length);i.set(o),i.set(t.bytes,e),new DataView(i.buffer).setUint32(t.p,e+new DataView(t.bytes.buffer,t.bytes.byteOffset).getUint32(0,!0)-t.p,!0),o=i}if(void 0!==i.detailsUrl){const t=n.field(a,1);if(!t||"string"!=typeof i.detailsUrl)throw new TypeError("Expected existing collection URL field");if(i.detailsUrl!==n.string(t)){const e=(new TextEncoder).encode(i.detailsUrl),n=4*Math.ceil(o.length/4),a=new Uint8Array(n+e.length+5);a.set(o),a.set(e,n+4);const s=new DataView(a.buffer);s.setUint32(n,e.length,!0),s.setUint32(t,n-t,!0),o=a}}return o}async function He(t,{language:i="zh-CN",timezone:n,fetchImpl:a=e,rewriteDetails:s=!1}={}){const r=we(t);try{const t=function(t){const e=Oe(t),i=Ee(e);if(!i)return null;const n=e.vector(e.field(i,2),4),a={detailsUrl:e.string(e.field(i,1)),alerts:Array.from({length:n.length},(t,i)=>Pe(e,e.indirect(n.start+4*i)))};return Object.defineProperty(a,ve,{value:e.b,enumerable:!0}),a}(r);if(!t?.alerts.length)return r;const e=fe.ParseWeatherAlertPageURL(t.detailsUrl);if(!e)return r;const o=await fe.FetchWeatherAlertPage(e,i,a);if(!o.alerts.length)return r;const d={identifier:e,language:i,countryCode:"CN",eventSource:"CN",attributionUrl:t.detailsUrl},c=fe.Build(o,d),u=new Set,l=t.alerts.map(t=>{const e=c.map((t,e)=>({source:t,index:e})).filter(({source:e,index:i})=>{if(u.has(i)||!t.description||!e.description.includes(t.description))return!1;const n=xe.severity[String(e.severity).toUpperCase()];if(void 0===n||n!==t.severity)return!1;const a=Date.parse(e.issuedTime)/1e3;return!t.issuedTime||a===t.issuedTime});return 1!==e.length?null:(u.add(e[0].index),e[0].source)});if(!l.some(Boolean))return r;let p=function(t,e){if(!Array.isArray(e)||t.alerts.length!==e.length)throw new RangeError("Expected one matched source per Apple alert");return t.alerts.map((t,i)=>{const n=e[i];if(!n)return t;const a={...t};n.description&&(a.description=n.description);for(const t of["source","areaId","phenomenon","token"])!a[t]&&n[t]&&(a[t]=n[t]);for(const t of Object.keys(Te)){if(a[t]||null==n[t])continue;const e="number"==typeof n[t]?n[t]:Date.parse(n[t])/1e3;Number.isInteger(e)&&e>0&&e<=4294967295&&(a[t]=e)}!a.eventEndTime&&a.expireTime&&(a.eventEndTime=a.expireTime),!a.eventOnsetTime&&a.effectiveTime&&(a.eventOnsetTime=a.effectiveTime);for(const t of Object.keys(Se)){if(a[t])continue;const e=String(n[t]??"").toUpperCase(),i=xe[t][e];void 0!==i&&(a[t]=i)}return a})}(t,l);p=p.map((t,e)=>l[e]&&/^(国家预警信息发布中心|QWeather|和风天气)$/.test(t.source??"")?{...t,source:l[e].source}:t);const h={};if(s){if(l.some(t=>!t))return Re(r,p);const t=Ce({identifier:e,language:i,timezone:n,alerts:p});p=p.map(e=>({...e,detailsUrl:t})),h.detailsUrl=t}return Re(r,p,h)}catch{return r}}const We={condition:{CLEAR:1,RAIN:7,DRIZZLE:8},precipitation:{CLEAR:1,RAIN:2},forecastToken:{CLEAR:1,START:2,STOP:3,START_STOP:4,CONSTANT:6},parameterType:{FIRST_AT:1,SECOND_AT:2},sourceType:{MODELED:2,STATION:3}},Le=(t=0,e=4294967295)=>{if(!Number.isInteger(t)||t<0||t>e)throw new RangeError("WK3 unsigned integer out of range");return t},De=t=>Le(t,255),Be=(t=0)=>{if("number"!=typeof t||!Number.isFinite(Math.fround(t))||t<0)throw new TypeError("WK3 nonnegative finite float32 required");return t},Ke=t=>Le(t,100);function $e(t,e,i){if(!Number.isSafeInteger(e)||e<0||!Number.isSafeInteger(i)||i<0||e+i>t.capacity())throw new RangeError("Truncated WK3 nextHour")}class Ve{__init(t,e){return this.bb_pos=t,this.bb=e,this}check(t){$e(this.bb,this.bb_pos,4);const e=this.bb_pos-this.bb.readInt32(this.bb_pos);$e(this.bb,e,4);const i=this.bb.readUint16(e),n=this.bb.readUint16(e+2);if(i<4||i%2||(i-4)/2>t||n<4)throw new TypeError("Unsupported WK3 nextHour table layout");$e(this.bb,e,i),$e(this.bb,this.bb_pos,n);for(let t=4;t<i;t+=2){const i=this.bb.readUint16(e+t);if(i&&(i<4||i>=n))throw new RangeError("Invalid WK3 field offset")}return this}field(t,e=4){const i=this.bb.__offset(this.bb_pos,4+2*t);if(!i)return 0;const n=this.bb_pos-this.bb.readInt32(this.bb_pos);if(i+e>this.bb.readUint16(n+2))throw new RangeError("Invalid WK3 scalar width");return $e(this.bb,this.bb_pos+i,e),this.bb_pos+i}scalar(t,e="readUint32"){const i=this.field(t,"readUint8"===e?1:4);return i?this.bb[e](i):0}child(t){const e=this.field(t);if(!e)return null;const i=e+this.bb.readUint32(e);return $e(this.bb,i,4),(new Ve).__init(i,this.bb)}vector(t,e=!1){const i=this.field(t);if(!i)return[];const n=i+this.bb.readUint32(i);$e(this.bb,n,4);const a=this.bb.readUint32(n);if(e&&1!==a)throw new TypeError("Unverified WK3 multi-condition summary vector");return $e(this.bb,n+4,a*(e?1:4)),Array.from({length:a},(t,i)=>{if(e)return this.bb.readUint8(n+4+i);const a=n+4+4*i,s=a+this.bb.readUint32(a);return $e(this.bb,s,4),(new Ve).__init(s,this.bb)})}}class Qe extends Ve{}function ke(t){if(!t)return null;t.check(11);const e=(new bt).__init(t.bb_pos,t.bb);return{attributionUrl:e.attributionUrl(),expireTime:e.expireTime(),language:e.language(),latitude:e.latitude(),longitude:e.longitude(),providerLogo:e.providerLogo(),providerName:e.providerName(),readTime:e.readTime(),reportedTime:e.reportedTime(),temporarilyUnavailable:e.temporarilyUnavailable(),sourceType:255&e.sourceType()}}function Ge(t){return t.check(2),{type:t.scalar(0,"readUint8"),date:t.scalar(1)}}function ze(t){return t.check(6),{startTime:t.scalar(0),endTime:t.scalar(1),forecastToken:t.scalar(2,"readUint8"),beginCondition:t.scalar(3,"readUint8"),endCondition:t.scalar(4,"readUint8"),parameters:t.vector(5).map(Ge)}}function Ye(t){return t.check(5),{startTime:t.scalar(0),endTime:t.scalar(1),condition:t.vector(2,!0),precipitationChance:t.scalar(3,"readUint8"),precipitationIntensity:t.scalar(4,"readFloat32")}}function je(t){return t.check(4),{startTime:t.scalar(0),precipitationChance:t.scalar(1,"readUint8"),precipitationIntensity:t.scalar(2,"readFloat32"),perceivedPrecipitationIntensity:t.scalar(3,"readFloat32")}}function Ze(t){const e=t instanceof T?t:new T(t),i=e.position();$e(e,i,4);const n=(new Ve).__init(i+e.readUint32(i),e);n.check(32765);const a=n.child(5);return a?function(t){const e=(new Qe).__init(t.bb_pos,t.bb).check(6);return{metadata:ke(e.child(0)),condition:e.vector(1).map(ze),summary:e.vector(2).map(Ye),forecastStart:e.scalar(3),forecastEnd:e.scalar(4),minutes:e.vector(5).map(je)}}(a):null}function qe(t,e,i=!1){if(i&&1!==e.length)throw new TypeError("Unverified WK3 multi-condition summary vector");t.startVector(i?1:4,e.length,i?1:4);for(let n=e.length-1;n>=0;n--)i?t.addInt8(De(e[n])):t.addOffset(e[n]);return t.endVector()}function Je(t,e){if(null==e)return 0;if("string"!=typeof e)throw new TypeError("WK3 metadata string required");return t.createString(e)}function Xe(t,e){const i=Le(e.startTime),n=Le(e.endTime),a=De(e.forecastToken),s=De(e.beginCondition),r=De(e.endCondition),o=qe(t,(e.parameters??[]).map(e=>function(t,e){const i=De(e.type),n=Le(e.date);return t.startObject(2),t.addFieldInt8(0,i,0),t.addFieldInt32(1,n,0),t.endObject()}(t,e)));return t.startObject(6),t.addFieldInt32(0,i,0),t.addFieldInt32(1,n,0),t.addFieldInt8(2,a,0),t.addFieldInt8(3,s,0),t.addFieldInt8(4,r,0),t.addFieldOffset(5,o,0),t.endObject()}function ti(t,e){const i=Le(e.forecastStart),n=Le(e.forecastEnd),a=function(t,e){if(!e)return 0;const i=t=>{if("number"!=typeof t||!Number.isFinite(Math.fround(t)))throw new TypeError("WK3 metadata finite float required");return t};return bt.createMetadata(t,Je(t,e.attributionUrl),Le(e.expireTime),Je(t,e.language),i(e.latitude??0),i(e.longitude??0),Je(t,e.providerLogo),Je(t,e.providerName),Le(e.readTime),Le(e.reportedTime),e.temporarilyUnavailable??!1,De(e.sourceType))}(t,e.metadata),s=qe(t,(e.condition??[]).map(e=>Xe(t,e))),r=qe(t,(e.summary??[]).map(e=>function(t,e){if(!Array.isArray(e.condition))throw new TypeError("WK3 summary.condition must be an enum array, not a WK2 scalar");const i=Le(e.startTime),n=Le(e.endTime),a=Ke(e.precipitationChance),s=Be(e.precipitationIntensity),r=qe(t,e.condition,!0);return t.startObject(5),t.addFieldInt32(0,i,0),t.addFieldInt32(1,n,0),t.addFieldOffset(2,r,0),t.addFieldInt8(3,a,0),t.addFieldFloat32(4,s,0),t.endObject()}(t,e))),o=qe(t,(e.minutes??[]).map(e=>function(t,e){const i=Le(e.startTime),n=Ke(e.precipitationChance),a=Be(e.precipitationIntensity),s=Be(e.perceivedPrecipitationIntensity);return t.startObject(4),t.addFieldInt32(0,i,0),t.addFieldInt8(1,n,0),t.addFieldFloat32(2,a,0),t.addFieldFloat32(3,s,0),t.endObject()}(t,e)));return t.startObject(6),t.addFieldOffset(0,a,0),t.addFieldOffset(1,s,0),t.addFieldOffset(2,r,0),t.addFieldInt32(3,i,0),t.addFieldInt32(4,n,0),t.addFieldOffset(5,o,0),t.endObject()}function ei(t,e){const i=We[t];if("string"!=typeof e||!Object.hasOwn(i,e))throw new TypeError(`Unsupported WK3 nextHour ${t}: ${e}`);return i[e]}function ii(t,e){if("number"!=typeof t)throw new TypeError("Missing provider nextHour number");return e(t)}function ni(t=new URL($request.url)){o.debug("☑️ parseWeatherKitURL");const e=t?.pathname.match(/^\/api\/(?<version>v1|v2|v3)\/(availability|weather)\/(?<locale>[A-Z0-9]+(?:-[A-Z0-9]+)*)\/(?<latitude>-?\d+\.?\d*)\/(?<longitude>-?\d+\.?\d*)$/i)?.groups,i=e?.locale?.split("-")||[];let n;i.length>1&&/^[A-Z]{2}$/i.test(i.at(-1))&&(n=i.pop().toUpperCase());const a={version:e?.version,language:i.join("-")||void 0,latitude:e?.latitude,longitude:e?.longitude,country:t?.searchParams?.get("country")?.toUpperCase()||n,dataSets:t?.searchParams?.get("dataSets")?.split(",")||[]};return o.info("✅ parseWeatherKitURL",`🟧version: ${a.version} 🟧language: ${a.language} 🟧country: ${a.country}`,`🟧latitude: ${a.latitude} 🟧longitude: ${a.longitude}`),a}const ai={minLatitude:22.1,maxLatitude:22.45,minLongitude:113.8,maxLongitude:114.45},si={minLatitude:22.05,maxLatitude:22.25,minLongitude:113.45,maxLongitude:113.65},ri={minLatitude:21.75,maxLatitude:25.5,minLongitude:119.2,maxLongitude:122.1};function oi(t,e,i){return t>=i.minLatitude&&t<=i.maxLatitude&&e>=i.minLongitude&&e<=i.maxLongitude}function di(t={},e={}){return!!e?.Weather?.Replace?.includes(t.country)&&function(t={}){if("CN"!==t.country)return!1;const e=Number(t.latitude),i=Number(t.longitude);return!(!Number.isFinite(e)||!Number.isFinite(i)||e<18||e>54||i<73||i>135||oi(e,i,ai)||oi(e,i,si)||oi(e,i,ri))}(t)}async function ci(t,e,i={}){const{preFetched:n={},enviroments:s,parameters:r,Settings:d,Configs:c}=i,u=new URL(t.url);o.debug("url:",u.toJSON());const l=u.pathname.split("/").filter(Boolean);o.debug("PATHs:",l);const p=(e.headers?.["Content-Type"]??e.headers?.["content-type"])?.split(";")?.[0];if(o.debug("FORMAT:",p),o.debug("[Apple Response]",u.pathname,`status: ${e.status}`,`content-type: ${p}`),u.pathname.startsWith("/api/v1/airQualityScale/")||u.pathname.startsWith("/api/v2/airQualityScale/"))try{const t="string"==typeof e.body?e.body:e.bodyBytes?(new TextDecoder).decode(new Uint8Array(e.bodyBytes)):"(binary)";o.log(`[Apple Response Body] ${u.pathname}`,t.length>2e3?`${t.slice(0,2e3)}...`:t)}catch(t){o.log(`[Apple Response Body] ${u.pathname}`,"(无法解析)",t.message)}const{Settings:h,Configs:b}=d?{Settings:d,Configs:c}:y(a),m=Object.fromEntries(Object.entries(t.headers||{}).map(([t,e])=>[t.toLowerCase(),Array.isArray(e)?e.join(","):`${e}`])),f=m["user-agent"]||"",_=m["x-schema-version"]||"",g=/WeatherKit_Weather_iOS_Version 27/i.test(f)||/^lib-rc-2\./i.test(_);let I={};if(u.pathname.startsWith("/api/v1/airQualityScale/")||u.pathname.startsWith("/api/v2/airQualityScale/")){if(200===e.status)return o.log(`[proxy] airQualityScale Apple 返回 200，透传: ${u.pathname}`),e;const t=u.pathname.split("/").filter(Boolean),i=t[3]??"en",n=t[4]??"",a=D.buildScale(i,n);if(a)return o.log(`[proxy] airQualityScale Apple 返回 ${e.status}，本地构建: ${n}`),e.status=200,e.headers={...e.headers,...a.headers},e.body=a.body,e}switch(p){case void 0:case"application/x-www-form-urlencoded":case"text/plain":default:case"application/x-mpegURL":case"application/x-mpegurl":case"application/vnd.apple.mpegurl":case"audio/mpegurl":case"text/xml":case"text/html":case"text/plist":case"application/xml":case"application/plist":case"application/x-plist":case"text/vtt":case"application/vtt":break;case"text/json":case"application/json":if(I=JSON.parse(e.body),o.debug(`[Apple Response] ${u.pathname}`,I),"weatherkit.apple.com"===u.hostname)(u.pathname.startsWith("/api/v1/availability/")||u.pathname.startsWith("/api/v2/availability/"))&&(I=b?.Availability?.v2);e.body=JSON.stringify(I);break;case"application/vnd.apple.flatbuffer":case"application/protobuf":case"application/x-protobuf":case"application/vnd.google.protobuf":case"application/grpc":case"application/grpc+proto":case"application/octet-stream":{let t=e.bodyBytes?new Uint8Array(e.bodyBytes):e.body??new Uint8Array;switch(p){case"application/vnd.apple.flatbuffer":{if("weatherkit.apple.com"!==u.hostname||!/^\/api\/v[23]\/weather\//.test(u.pathname)||200!==e.status)break;const i=r||ni(u),a={...i,dataSets:i.dataSets.filter(t=>h.DataSets.includes(t))},d=di(a,h);if(!d&&u.pathname.startsWith("/api/v3/weather/")&&function(t={}){if(!["HK","CN"].includes(t.country))return!1;const e=Number(t.latitude),i=Number(t.longitude);return Number.isFinite(e)&&Number.isFinite(i)&&oi(e,i,ai)}(a)&&a.dataSets.includes("airQuality")&&!de(t)){const e=s||{colorfulClouds:new $({...a,country:"HK"},h?.API?.ColorfulClouds?.Token||"Y2FpeXVuX25vdGlmeQ=="),parameters:a,country:"HK"};t=await async function(t,e,i,n={}){if("ColorfulCloudsUS"!==e?.AirQuality?.Current?.Index?.Provider)return t;try{const a=n.index?await n.index:await i.colorfulClouds.CurrentAirQuality(!0,e?.AirQuality?.Current?.Index?.ForceCNPrimaryPollutants),s=await ye(oe(a),{currentProvider:"ColorfulCloudsUS",yesterdayProvider:e?.AirQuality?.Comparison?.Yesterday?.IndexProvider,sources:i,yesterday:n.yesterdayAirQuality}),r=new S;r.finish(ne(r,s));const d=pi(t,0,r.asUint8Array());return o.info("WK3 HK AQ patch",`补入香港美标 AQI ${s.index}; 昨日对比=${s.previousDayComparison}，其他天气原样保留。`),d}catch(e){return o.warn("WK3 HK AQ patch","数据源不可用，保持原响应。",e?.message??e),t}}(t,h,e,n);break}if(!d){o.log(`[proxy] ${a.country}/${a.latitude},${a.longitude} 无需替换，直接跳过 FlatBuffer 编解码。`);break}if(u.pathname.startsWith("/api/v3/weather/")){const e=s||{colorfulClouds:new $(a,h?.API?.ColorfulClouds?.Token||"Y2FpeXVuX25vdGlmeQ=="),qWeather:new V(a,h?.API?.QWeather?.Token,h?.API?.QWeather?.Host),parameters:a,country:a.country};if(a.dataSets.includes("airQuality")&&(t=await async function(t,e,i,n={}){try{const a=de(t);if(!a)return t;const s=F.GetNameFromScale(a.scale);if(!(e?.AirQuality?.Current?.Index?.Replace||[]).includes(s))return t;let r;if(n.index)r=await n.index;else if("Calculate"===e?.AirQuality?.Current?.Index?.Provider){const a=n.pollutants?await n.pollutants:await xi(e,i);if(!a?.metadata||a.metadata.temporarilyUnavailable)return t;r=await Ai(a,e,i),r?.metadata&&(r={...r,metadata:{...a.metadata,...r.metadata}})}else r=await Ai(void 0,e,i);if(!r?.metadata||r.metadata.temporarilyUnavailable)return t;const d=F.GetNameFromScale(r.scale);if(!s||d!==s){if("HJ6332012"!==s||"EPA_NowCast"!==d)return t;const c=hi(t,0),u=Ii(t,c,0),l=c+u+hi(t,c+u);if(mi(t,l-bi(t,l))>20)return t;const p=await ye(oe(r),{currentProvider:e?.AirQuality?.Current?.Index?.Provider,yesterdayProvider:e?.AirQuality?.Comparison?.Yesterday?.IndexProvider,sources:i,yesterday:n.yesterdayAirQuality}),h=new S;h.finish(ne(h,p));const b=li(t,0,h.asUint8Array());return o.info("WK3 AQ patch",`国标转美标: ${a.index} -> ${p.index} (${p.scale}); 同步污染物、单位、首要污染物及来源，昨日对比=${p.previousDayComparison}。`),b}if(!Number.isInteger(r.index)||r.index<0||r.index>32767||!Number.isInteger(r.categoryIndex)||r.categoryIndex<0||r.categoryIndex>127)return t;const c=hi(t,0),u=Ii(t,c,0),l=c+u+hi(t,c+u);if(!Ii(t,l,1)||!Ii(t,l,2))return t;const p=new Uint8Array(t);return _i(p,l,1,r.categoryIndex),gi(p,l,2,r.index),o.info("WK3 AQ patch",`同标准 AQI: ${a.index} -> ${r.index} (${s}); 保留原始污染物、昨日对比与全部预报槽。`),p}catch(e){return o.warn("WK3 AQ patch","指数替换失败，保留 Apple 原始二进制响应。",e?.message??e),t}}(t,h,e,n)),a.dataSets.includes("forecastNextHour")&&(t=await async function(t,e,i,n={}){if("WeatherKit"===e?.NextHour?.Provider)return t;try{Ze(t);const a=await Ni(void 0,e,i,n.forecastNextHour),s=function(t,{intensityUnit:e,chanceUnit:i}={}){if("mm/h"!==e||"percent"!==i)throw new TypeError("Explicit mm/h and percent units required");if(!t?.metadata?.providerName||t.metadata.temporarilyUnavailable)throw new TypeError("Missing available nextHour provider metadata");if(!(Array.isArray(t.minutes)&&t.minutes.length&&Array.isArray(t.condition)&&t.condition.length&&Array.isArray(t.summary)&&t.summary.length))throw new TypeError("Missing nextHour minutes/condition/summary");const n=ii(t.forecastStart,Le),a=ii(t.forecastEnd,Le),s=t.minutes.map((t,e)=>{const i=ii(t.startTime,Le);if(i!==n+60*e)throw new TypeError("Noncontiguous nextHour minutes");return{startTime:i,precipitationChance:ii(t.precipitationChance,Ke),precipitationIntensity:ii(t.precipitationIntensity,Be),perceivedPrecipitationIntensity:ii(t.perceivedPrecipitationIntensity,Be)}});if(a!==n+60*s.length)throw new TypeError("Inconsistent nextHour forecastEnd");const r=t=>({startTime:ii(t.startTime,Le),endTime:null==t.endTime?0:ii(t.endTime,Le)}),o=t.summary.map(t=>({...r(t),condition:(Array.isArray(t.condition)?t.condition:[t.condition]).map(t=>ei("precipitation",t)),precipitationChance:ii(t.precipitationChance,Ke),precipitationIntensity:ii(t.precipitationIntensity,Be)}));if(o.some(t=>1!==t.condition.length))throw new TypeError("Unverified WK3 multi-condition summary vector");const d=t.condition.map(t=>{if(!Array.isArray(t.parameters))throw new TypeError("Missing condition parameters");return{...r(t),forecastToken:ei("forecastToken",t.forecastToken),beginCondition:ei("condition",t.beginCondition),endCondition:ei("condition",t.endCondition),parameters:t.parameters.map(t=>({type:ei("parameterType",t.type),date:ii(t.date,Le)}))}});for(const t of[o,d])for(let e=0;e<t.length;e++){const i=t[e],s=t[e+1];if(i.startTime!==(0===e?n:t[e-1].endTime)||(s?i.endTime!==s.startTime||i.endTime<=i.startTime||i.endTime>=a:0!==i.endTime))throw new TypeError("Inconsistent nextHour segment timeline")}return{metadata:{...t.metadata,sourceType:ei("sourceType",t.metadata.sourceType)},forecastStart:n,forecastEnd:a,minutes:s,summary:o,condition:d}}(a,{intensityUnit:"mm/h",chanceUnit:"percent"}),r=new S;r.finish(ti(r,s));const d=Ii(t,hi(t,0),5)?li(t,5,r.asUint8Array()):pi(t,5,r.asUint8Array());return o.info("WK3 nextHour patch",...ui(a)),d}catch(e){return o.warn("WK3 nextHour patch","分钟降水替换失败，保留原响应。",e?.message??e),t}}(t,h,e,n)),a.dataSets.includes("weatherAlerts")){const e=await He(t,{language:a.language,timezone:u.searchParams.get("timezone")||void 0,rewriteDetails:!0});o.info("WK3 alerts patch",e===t?"无可补全的匹配预警，保留原始信息。":"已补全国内预警；苹果原生详情页保留原事件 ID。"),t=e}break}if(g&&"weatherkit.apple.com"===u.hostname&&u.pathname.startsWith("/api/v2/weather/")){const e=s||{colorfulClouds:new $(a,h?.API?.ColorfulClouds?.Token||"Y2FpeXVuX25vdGlmeQ=="),qWeather:new V(a,h?.API?.QWeather?.Token,h?.API?.QWeather?.Host),parameters:a,country:a.country};t=await async function(t,e,i,n={},a={}){let s=t;a.dataSets?.includes("airQuality")&&(s=await async function(t,e,i,n={}){try{if(!Ii(t,hi(t,0),0))return o.info("FlatBuffer AQ patch","iOS 27 原始响应没有 airQuality 字段，保持 Apple 原始二进制响应。"),t;const a=new T(t),s=Bt.getRootAsWeather(a),r=s?.airQuality();if(!r)return o.info("FlatBuffer AQ patch","iOS 27 原始响应 airQuality 为空，保持 Apple 原始二进制响应。"),t;const d=Qt(r),c=await Ci(d,e,i,n),u=Ii(t,r.bb_pos,5);let l,p="known-fields";if(!u&&c?.previousDayComparison&&c.previousDayComparison!==F.Config.CompareCategoryIndexes.UNKNOWN){const e=new S,i=$t(e,c);e.finish(i),l=li(t,0,e.asUint8Array()),p="replace-airQuality-table"}else l=function(t,e,i){const n=new Uint8Array(t);_i(n,e,1,i?.categoryIndex),gi(n,e,2,i?.index),_i(n,e,3,i?.isSignificant?1:0),_i(n,e,5,Q[i?.previousDayComparison]),_i(n,e,6,G[i?.primaryPollutant]);let a=n;return a=function(t,e,i,n){if(!n?.length)return t;const a=Ii(t,e,i);if(!a)return t;const s=hi(n,0),r=new Uint8Array(t.length+n.length);r.set(t,0),r.set(n,t.length);const o=e+a,d=t.length+s;return yi(r,o,d-o),r}(a,e,7,function(t){const e=new S,i=e.createString(t??"");return e.finish(i),e.asUint8Array()}(i?.scale)),a}(t,r.bb_pos,c);return o.info("FlatBuffer AQ patch","replace-airQuality-table"===p?"检测到 iOS 27 WK2.Weather，原始 airQuality 缺少 previousDayComparison 字段，替换 airQuality 子表以写入昨日对比。":"检测到 iOS 27 WK2.Weather，仅修改 airQuality 已知字段并保留 Apple 原始未知字段。",`index: ${c?.index}`,`primaryPollutant: ${c?.primaryPollutant}`,`scale: ${c?.scale}`,`previousDayComparison: ${c?.previousDayComparison}`),l}catch(e){return o.warn("FlatBuffer AQ patch","替换 iOS 27 airQuality 失败，已回退为 Apple 原始二进制响应。",e?.message??e),t}}(s,e,i,n));a.dataSets?.includes("forecastNextHour")&&(s=await async function(t,e,i,n={}){try{if(!Ii(t,hi(t,0),4)){const a=await Ni(void 0,e,i,n.forecastNextHour);if(a?.metadata){const e=new S,i=Vt(e,a);e.finish(i);const n=pi(t,4,e.asUint8Array());return o.info("FlatBuffer nextHour patch","iOS 27 原始响应没有 forecastNextHour 字段，已重建 Weather 根表并补入 forecastNextHour，原始子表保持复用。",...ui(a)),n}return o.info("FlatBuffer nextHour patch","iOS 27 原始响应没有 forecastNextHour 字段，且没有可用的下一小时降水数据，保持 Apple 原始二进制响应。",...ui(a)),t}const a=new T(t),s=Bt.getRootAsWeather(a),r=s?.forecastNextHour();if(!r)return o.info("FlatBuffer nextHour patch","iOS 27 原始响应 forecastNextHour 为空，保持 Apple 原始二进制响应。"),t;const d=kt(r),c=await Ni(d,e,i,n.forecastNextHour);if(!c?.metadata)return o.info("FlatBuffer nextHour patch","没有可用的下一小时降水数据，保持 Apple 原始 forecastNextHour。",...ui(c)),t;const u=new S,l=Vt(u,c);u.finish(l);const p=li(t,4,u.asUint8Array());return o.info("FlatBuffer nextHour patch","检测到 iOS 27 WK2.Weather，仅替换 forecastNextHour 字段并保留其余 Apple 原始二进制字段。",...ui(c)),p}catch(e){return o.warn("FlatBuffer nextHour patch","替换 iOS 27 forecastNextHour 失败，已回退为 Apple 原始二进制响应。",e?.message??e),t}}(s,e,i,n));return s}(t,h,e,n,a);break}const c=new T(t);switch(u.hostname){case"weatherkit.apple.com":if(u.pathname.startsWith("/api/v2/weather/")){const e=a.dataSets.filter(t=>["airQuality","currentWeather","forecastDaily","forecastHourly","forecastNextHour"].includes(t));I=Kt.decode(c,e);const i=s||{colorfulClouds:new $(a,h?.API?.ColorfulClouds?.Token||"Y2FpeXVuX25vdGlmeQ=="),qWeather:new V(a,h?.API?.QWeather?.Token,h?.API?.QWeather?.Host),parameters:a,country:a.country},r=["currentWeather","forecastDaily","forecastHourly","forecastNextHour","airQuality"];await Promise.all(e.map(async t=>{switch(t){case"airQuality":I.airQuality=await Ci(I.airQuality,h,i,n);break;case"currentWeather":I.currentWeather=await async function(t,e,i,n){if(o.debug("☑️ InjectCurrentWeather"),!di(i.parameters,e))return o.warn("InjectCurrentWeather",`Unreplaced location: ${i.country}`),o.debug("✅ InjectCurrentWeather"),t;let a;if(n)a=await n,o.info("InjectCurrentWeather","使用预取数据");else switch(e?.Weather?.Provider){case"WeatherKit":default:break;case"QWeather":a=await i.qWeather.WeatherNow();break;case"ColorfulClouds":a=await i.colorfulClouds.CurrentWeather()}a?.metadata&&(a.metadata={...t?.metadata,...a.metadata},t={...t,...a});return o.debug("✅ InjectCurrentWeather"),t}(I.currentWeather,h,i,n.currentWeather);break;case"forecastDaily":I.forecastDaily=await async function(t,e,i,n){o.debug("☑️ InjectForecastDaily");const a=e?.Weather?.ReplaceDaily??!0;if(!a||!di(i.parameters,e))return o.info("InjectForecastDaily",`Unreplaced or skipped location: ${i.country}`),o.debug("✅ InjectForecastDaily"),t;let s;if(n)s=await n,o.info("InjectForecastDaily","使用预取数据");else switch(e?.Weather?.Provider){case"WeatherKit":default:break;case"QWeather":s=await i.qWeather.Daily();break;case"ColorfulClouds":{const e=t.days?.length||11,n=t.days?.[0]?.forecastStart||void 0;s=await i.colorfulClouds.Daily(e,n);break}}s?.metadata&&(t.metadata={...t?.metadata,...s.metadata},K.mergeForecast(t?.days,s?.days));return o.debug("✅ InjectForecastDaily"),t}(I.forecastDaily,h,i,n.forecastDaily);break;case"forecastHourly":I.forecastHourly=await async function(t,e,i,n){o.debug("☑️ InjectForecastHourly");const a=e?.Weather?.ReplaceHourly??!0;if(!a||!di(i.parameters,e))return o.info("InjectForecastHourly",`Unreplaced or skipped location: ${i.country}`),o.debug("✅ InjectForecastHourly"),t;let s;if(n)s=await n,o.info("InjectForecastHourly","使用预取数据");else switch(e?.Weather?.Provider){case"WeatherKit":default:break;case"QWeather":s=await i.qWeather.Hourly();break;case"ColorfulClouds":{o.debug("✅ InjectForecastHourly ColorfulClouds");const e=t.hours?.length||273,n=t.hours?.[0]?.forecastStart||void 0;s=await i.colorfulClouds.ForecastHourly(e,n);break}}s?.metadata&&(t.metadata={...t?.metadata,...s.metadata},t.hours=K.mergeForecast(t?.hours,s?.hours));return o.debug("✅ InjectForecastHourly"),t}(I.forecastHourly,h,i,n.forecastHourly);break;case"forecastNextHour":I.forecastNextHour=await Ni(I.forecastNextHour,h,i,n.forecastNextHour)}})),r.forEach(t=>{I?.[t]?.metadata?.providerLogo&&(I[t].metadata.providerLogo=void 0)}),t=Kt.encode(c,I);break}}break}}e.body=t;break}}return e}function ui(t){const e=t?.minutes??[],i=e.map(t=>t?.precipitationIntensity??0);return[`minutes: ${e.length}`,`summary: ${t?.summary?.length??0}`,`condition: ${t?.condition?.length??0}`,`rainyMinutes: ${i.filter(t=>t>0).length}`,`maxIntensity: ${i.length?Math.max(...i):0}`,`firstToken: ${t?.condition?.[0]?.forecastToken??"UNKNOWN"}`]}function li(t,e,i){const n=hi(t,0),a=Ii(t,n,e);if(!a)return t;const s=hi(i,0),r=4*Math.ceil(t.length/4),o=new Uint8Array(r+i.length);o.set(t,0),o.set(i,r);const d=n+a;return yi(o,d,r+s-d),o}function pi(t,e,i){const n=hi(t,0),a=mi(t,n-bi(t,n)),s=Math.max(0,(a-4)/2),r=Math.max(10,s,e+1),o=4+2*r,d=4+4*r,c=4*Math.ceil((4+o)/4),u=8*Math.ceil((c+d)/8),l=8*Math.ceil((u+t.length)/8),p=hi(i,0),h=new Uint8Array(l+i.length);h.set(t,u),h.set(i,l),yi(h,0,c),fi(h,4,o),fi(h,6,d),yi(h,c,c-4);for(let i=0;i<r;i++){const a=8+2*i,s=4+4*i;let r;if(i===e){r=l+p-(c+s)}else{const e=Ii(t,n,i);if(!e)continue;const a=n+e,o=hi(t,a),d=a+o;if(o&&d>a&&d<t.length){r=u+d-(c+s)}else r=o}fi(h,a,s),yi(h,c+s,r)}return h}function hi(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24)>>>0}function bi(t,e){const i=hi(t,e);return i>2147483647?i-4294967296:i}function mi(t,e){return t[e]|t[e+1]<<8}function yi(t,e,i){t[e]=255&i,t[e+1]=i>>>8&255,t[e+2]=i>>>16&255,t[e+3]=i>>>24&255}function fi(t,e,i){t[e]=255&i,t[e+1]=i>>>8&255}function _i(t,e,i,n){if(null==n)return;const a=Ii(t,e,i);a&&(t[e+a]=255&n)}function gi(t,e,i,n){if(null==n)return;const a=Ii(t,e,i);a&&fi(t,e+a,n)}function Ii(t,e,i){if(!Number.isFinite(e)||e<=0||e+4>t.length)return 0;const n=e-bi(t,e);if(n<0||n+4>t.length)return 0;const a=4+2*i;return a+2>mi(t,n)||n+a+2>t.length?0:mi(t,n+a)}async function Ni(t,e,i,n){if(o.debug("☑️ InjectForecastNextHour"),!di(i.parameters,e))return o.info("InjectForecastNextHour",`Unreplaced location: ${i.country}`),o.debug("✅ InjectForecastNextHour"),t;let a;if(n)a=await n,o.info("InjectForecastNextHour","使用预取数据");else switch(e?.NextHour?.Provider){case"WeatherKit":break;case"QWeather":a=await i.qWeather.Minutely();break;default:a=await i.colorfulClouds.Minutely()}if(a?.metadata){"CLEAR"===a?.condition?.[0]?.forecastToken||0===a?.condition?.length?(o.info("InjectForecastNextHour","未来一小时无降水，保留下一小时预报数据"),a.metadata={...t?.metadata,...a.metadata},t={...t,...a}):(a.metadata={...t?.metadata,...a.metadata},t={...t,...a})}return o.debug("✅ InjectForecastNextHour"),t}async function Ci(t,e,i,n={}){if(!di(i.parameters,e))return o.info("InjectAirQuality",`Unreplaced location: ${i.country}`),F.FixPollutantsUnits(t);t=F.FixPollutantsUnits(t);const a=!Array.isArray(t?.pollutants)||0===t.pollutants.length,s=e?.AirQuality?.Current?.Pollutants?.Provider&&"WeatherKit"!==e.AirQuality.Current.Pollutants.Provider,r=a||s,d=r?n.pollutants?await n.pollutants:await xi(e,i):t;r&&n.pollutants&&o.info("InjectAirQuality","污染物使用预取数据");const c=r&&!(!d?.metadata||d.metadata.temporarilyUnavailable),u=c||e?.AirQuality?.Current?.Index?.Replace?.includes(F.GetNameFromScale(t?.scale));let l=d;u&&(n.index?(l=await n.index,o.info("InjectAirQuality","指数使用预取数据")):l=await Ai(d,e,i));const p=t?.previousDayComparison??F.Config.CompareCategoryIndexes.UNKNOWN,h=u||e?.AirQuality?.Comparison?.ReplaceWhenCurrentChange,b=h?F.Config.CompareCategoryIndexes.UNKNOWN:p,m=h||b===F.Config.CompareCategoryIndexes.UNKNOWN,y=u?e?.AirQuality?.Current?.Index?.Provider:"WeatherKit";let f={...l,previousDayComparison:p};if(m)try{f=await async function(t,e,i,n,a={}){o.debug("☑️ InjectComparison");const{UNKNOWN:s}=F.Config.CompareCategoryIndexes,r=(t,e,i)=>{o.debug("☑️ isHJ6332012",`currentIndexProvider: ${t}`);if(F.GetNameFromScale(e)===F.Config.Scales.HJ6332012.weatherKitScale.name)return o.debug("✅ isHJ6332012",!0),!0;switch(t){case"Calculate":{o.debug(`Settings?.AirQuality?.Calculate?.Algorithm: ${i?.AirQuality?.Calculate?.Algorithm}`);const t="WAQI_InstantCast_CN"===i?.AirQuality?.Calculate?.Algorithm;return o.debug("✅ isHJ6332012",t),t}case"QWeather":case"ColorfulCloudsCN":return o.debug("✅ isHJ6332012",!0),!0;case"WeatherKit":{const t=F.GetNameFromScale(e)===F.Config.Scales.HJ6332012.weatherKitScale.name;return o.debug("✅ isHJ6332012",t),t}default:return o.debug("✅ isHJ6332012",!1),!1}},d=(t,e)=>{o.debug("☑️ isEPA454_B18007",`currentIndexProvider: ${t}`);if(F.GetNameFromScale(e)===F.Config.Scales.EPA_NowCast.weatherKitScale.name)return o.debug("✅ isEPA454_B18007",!0),!0;switch(t){case"WAQI":case"ColorfulCloudsUS":return o.debug("✅ isEPA454_B18007",!0),!0;default:return o.debug("✅ isEPA454_B18007",!1),!1}},c=async(t,e)=>{o.debug("☑️ colorfulCloudsComparison",`currentCategoryIndex: ${e}`);const i=await n.colorfulClouds.YesterdayAirQuality(t),a=(t=!1)=>({...i.metadata,providerName:i.metadata.providerName,temporarilyUnavailable:t});if(!i.metadata.temporarilyUnavailable){if(e){const t={...i,metadata:a(!1),previousDayComparison:F.CompareCategoryIndexes(e,i.categoryIndex)};return o.debug("✅ colorfulCloudsComparison"),t}{const e=await n.colorfulClouds.CurrentAirQuality(t);if(!e.metadata.temporarilyUnavailable){o.debug(`colorfulCloudsCurrent?.index: ${e?.index}`);const t={...i,metadata:a(!1),previousDayComparison:F.CompareCategoryIndexes(e.categoryIndex,i.categoryIndex)};return o.debug("✅ colorfulCloudsComparison"),t}}}return o.error("colorfulCloudsComparison",`无法从彩云天气获取${i.metadata.temporarilyUnavailable?"昨日":"今日"}的空气质量数据`),{...i,metadata:a(!0),previousDayComparison:s}},u=async(t,e)=>{o.debug("☑️ qweatherComparison",`currentCategoryIndex: ${t}`);const i=a?.locationsGrid??await V.GetLocationsGrid(void 0,()=>{}),{latitude:r,longitude:d}=n.qWeather,c=V.GetLocationInfo(i,r,d),u=await n.qWeather.YesterdayAirQuality(c),l=(t,e=!1)=>({...u.metadata,providerName:t,temporarilyUnavailable:e});if(!u.metadata.temporarilyUnavailable){const i=e?e(u):void 0,a=i?{...i,metadata:{...i.metadata,providerName:i.metadata.providerName}}:{...u,metadata:{...u.metadata,providerName:u.metadata.providerName}};if(t){const e={...u,metadata:l(a.metadata.providerName,!1),previousDayComparison:F.CompareCategoryIndexes(t,a.categoryIndex)};return o.debug("✅ qweatherComparison"),e}{const t=await n.qWeather.CurrentAirQuality();if(!t.metadata.temporarilyUnavailable){o.debug(`qweatherCurrent?.index: ${t?.index}`);const e={...u,metadata:l(a.metadata.providerName,!1),previousDayComparison:F.CompareCategoryIndexes(t.categoryIndex,a.categoryIndex)};return o.debug("✅ qweatherComparison"),e}}}return o.error("qweatherComparison",`无法从和风天气获取${u.metadata.temporarilyUnavailable?"昨日":"今日"}空气质量数据`),{...u,metadata:l(u.metadata.providerName,!0),previousDayComparison:s}};switch(i?.AirQuality?.Comparison?.Yesterday?.IndexProvider){case"Calculate":{const n=F.chooseAlogrithm(t,i),a=i?.AirQuality?.Comparison?.Yesterday?.PollutantsProvider;if(o.debug(`Settings?.AirQuality?.Comparison?.Yesterday?.PollutantsProvider: ${a}`),""!==n){if("ColorfulCloudsCN"===a){if("WAQI_InstantCast_US"===n){const e=await c(!0,t?.categoryIndex);return o.debug("✅ InjectComparison"),e}const a=await c(!1,r(e,t?.scale,i)?t?.categoryIndex:void 0);return o.debug("✅ InjectComparison"),a}{const e=t=>F.Pollutants2AQI(t,i,{algorithm:n}),a=await u(t?.categoryIndex,e);return o.debug("✅ InjectComparison"),a}}return o.error("InjectComparison","不支持今日空气质量的标准"),{metadata:{providerName:"iRingo",temporarilyUnavailable:!0},previousDayComparison:s}}case"QWeather":{const n=await u(r(e,t?.scale,i)?t?.categoryIndex:void 0);return o.debug("✅ InjectComparison"),n}case"ColorfulCloudsCN":{const n=c(!1,r(e,t?.scale,i)?t?.categoryIndex:void 0);return o.debug("✅ InjectComparison"),n}default:{const i=c(!0,d(e,t?.scale)?t?.categoryIndex:void 0);return o.debug("✅ InjectComparison"),i}}}(l,y,e,i,n)}catch(t){o.warn("InjectAirQuality","昨日对比获取失败，使用 UNKNOWN 继续返回当前空气质量。",t?.message??t),f={...l,previousDayComparison:F.Config.CompareCategoryIndexes.UNKNOWN}}const _=t?.metadata,g=d?.metadata,I=l?.metadata,N=f?.metadata,C=c&&g&&!g.temporarilyUnavailable?g.providerName:null,x=u&&I&&!I.temporarilyUnavailable?I.providerName:null,A=m&&N&&!N.temporarilyUnavailable?N.providerName:null,T=[];!C||C!==x||A&&C!==A?(u&&c&&m||!_?.providerName||_.temporarilyUnavailable||T.push(_.providerName),C&&T.push(`污染物：${C}`),x&&T.push(`指数：${F.appendScaleToProviderName(l,e)}`),A&&T.push(`对比昨日：${A}`)):T.push(F.appendScaleToProviderName(l,e));const S=l?.metadata&&!l.metadata.temporarilyUnavailable&&l.metadata.attributionUrl?l.metadata:g&&!g.temporarilyUnavailable&&g.attributionUrl?g:null,v=T.filter(Boolean).join("\n")||_?.providerName||I?.providerName||g?.providerName||"WeatherKit-Proxy";return t={...t,...l?.metadata&&!l.metadata.temporarilyUnavailable?l:{},metadata:{...t?.metadata?t.metadata:d?.metadata,providerName:v,...S?{attributionUrl:S.attributionUrl}:{}},pollutants:F.ConvertPollutants(t,d,u,l,e)??[],previousDayComparison:f?.previousDayComparison??F.Config.CompareCategoryIndexes.UNKNOWN},o.info("InjectAirQuality summary",`index: ${t?.index}`,`categoryIndex: ${t?.categoryIndex}`,`primaryPollutant: ${t?.primaryPollutant}`,`scale: ${t?.scale}`,`previousDayComparison: ${t?.previousDayComparison}`,`pollutants: ${t?.pollutants?.length??0}`,`temporarilyUnavailable: ${!0===t?.metadata?.temporarilyUnavailable}`),o.debug("airQuality:",t),t}async function xi(t,e){if(o.debug("☑️ InjectPollutants"),"QWeather"===t?.AirQuality?.Current?.Pollutants?.Provider){const t=await e.qWeather.CurrentAirQuality();return o.debug("✅ InjectPollutants"),t}{const t=await e.colorfulClouds.CurrentAirQuality();return o.debug("✅ InjectPollutants"),t}}async function Ai(t,e,i){switch(o.debug("☑️ InjectIndex"),e?.AirQuality?.Current?.Index?.Provider){case"QWeather":{const t=await i.qWeather.CurrentAirQuality(e.AirQuality.Current.Index.ForceCNPrimaryPollutants);return o.debug("✅ InjectIndex"),t}case"ColorfulCloudsUS":case"ColorfulCloudsCN":{const t=await i.colorfulClouds.CurrentAirQuality("ColorfulCloudsUS"===e.AirQuality.Current.Index.Provider,e.AirQuality.Current.Index.ForceCNPrimaryPollutants);return o.debug("✅ InjectIndex"),t}default:{const i=F.Pollutants2AQI(t,e);return o.debug("✅ InjectIndex"),i}}}
async function __cw3(body,url,st){
  try{
    if(!(body instanceof Uint8Array)) return body;
    var ps=url.pathname.split('/').filter(function(x){return x});
    if(ps[1]!=="v3"||ps[2]!=="weather"||ps.length<6) return body;
    if(__arg("Weather.Provider","ColorfulClouds")==="QWeather") return await __cw3q(body,url);
    var lat=ps[4],lon=ps[5];
    console.log("☑️ [天气增强] 当前天气 进入 · 坐标 "+lat+","+lon);
    var j=await __rt(lat,lon);
    var rt=j&&j.result&&j.result.realtime;
    if(!rt){ console.log("⚠️ [天气增强] 当前天气 · 彩云无数据，跳过"); return body; }
    var bin=new Uint8Array(body.length);for(var q=0;q<body.length;q++)bin[q]=body[q];var dv=new DataView(bin.buffer);
    var root=dv.getUint32(0,true);
    var vt=root-dv.getInt32(root,true);
    var vl=dv.getUint16(vt,true);
    if(vl<6) return body;
    var fo=dv.getUint16(vt+6,true);
    if(!fo) return body;
    var fp=root+fo;var tb=fp+dv.getUint32(fp,true);
    var t2=tb-dv.getInt32(tb,true);
    var l2=dv.getUint16(t2,true);
    function off(ix){ if(4+2*ix+2>l2) return 0; var o=dv.getUint16(t2+4+2*ix,true); return o?tb+o:0; }
    function setF(ix,v){ var p=off(ix); if(p&&typeof v==="number"&&isFinite(v)) dv.setFloat32(p,v,true); }
    function setI(ix,v){ var p=off(ix); if(p&&typeof v==="number"&&isFinite(v)) dv.setInt8(p,Math.max(-128,Math.min(127,Math.round(v)))); }
    setF(25,rt.temperature); setF(26,rt.apparent_temperature); setF(27,rt.dewpoint);
    setF(23,rt.pressure/100); setF(29,rt.visibility*1000); setF(31,rt.gust/3.6);
    if(rt.wind) setF(32,rt.wind.speed/3.6);
    if(rt.precipitation&&rt.precipitation.local) setF(22,rt.precipitation.local.intensity);
    setI(8,100*rt.humidity); setI(3,100*rt.cloudrate);
    console.log("✅ [天气增强] 当前天气 · 温度 "+rt.temperature+"° · 体感 "+rt.apparent_temperature+"° · 湿度 "+Math.round(100*rt.humidity)+"% · 气压 "+Math.round(rt.pressure/100)+" hPa");
    return bin;
  }catch(e){ return body; }
}

async function Ti(t){const e=new URL(t.request.url);if("weatherkit.apple.com"!==e.hostname)return;if(/^\/api\/v[12]\/availability\//.test(e.pathname)){const{Configs:e}=f(t);return{status:200,headers:g(t.response.headers,{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}),body:JSON.stringify(e?.Availability?.v2??[])}}if(!/^\/api\/(?:v[23]\/weather\/|v[12]\/airQualityScale\/)/.test(e.pathname))return;const i=_(t.response.headers),n=/flatbuffer|protobuf|octet-stream/i.test(i["content-type"]??"")?new Uint8Array(await t.response.arrayBuffer()):await t.response.text(),a=t.response.status;try{const{Settings:s,Configs:r}=f(t),o=await async function(t,e,i,n){const a=ni(e),s={...a,dataSets:a.dataSets.filter(t=>i.DataSets.includes(t))},r={colorfulClouds:new $(s,i.API?.ColorfulClouds?.Token||"Y2FpeXVuX25vdGlmeQ=="),qWeather:new V(s,i.API?.QWeather?.Token,i.API?.QWeather?.Host),parameters:s,country:s.country},o={};if(di(s,i)){const e=t=>Promise.resolve(t).catch(()=>{});if(s.dataSets.includes("forecastNextHour")&&"WeatherKit"!==i.NextHour.Provider&&(o.forecastNextHour=e("QWeather"===i.NextHour.Provider?r.qWeather.Minutely():r.colorfulClouds.Minutely())),s.dataSets.includes("airQuality")){const n=i.AirQuality.Current.Index.Provider;"QWeather"===n?o.index=e(r.qWeather.CurrentAirQuality(i.AirQuality.Current.Index.ForceCNPrimaryPollutants)):"ColorfulCloudsUS"!==n&&"ColorfulCloudsCN"!==n||(o.index=e(r.colorfulClouds.CurrentAirQuality("ColorfulCloudsUS"===n,i.AirQuality.Current.Index.ForceCNPrimaryPollutants)));const a=i.AirQuality.Comparison.Yesterday.IndexProvider;if("QWeather"===a){const i="weatherkit-local.qweather-grid",n=t.storage?.getJSON(i),a=await V.GetLocationsGrid(n,e=>t.storage?.setJSON(i,e));o.locationsGrid=a;const d=V.GetLocationInfo(a,s.latitude,s.longitude);o.yesterdayAirQuality=e(r.qWeather.prefetchYesterdayAirQuality(d).then(()=>r.qWeather.YesterdayAirQuality(d)))}else"ColorfulCloudsUS"!==a&&"ColorfulCloudsCN"!==a||(o.yesterdayAirQuality=e(r.colorfulClouds.prefetchYesterdayHourly().then(()=>r.colorfulClouds.YesterdayAirQuality("ColorfulCloudsUS"===a))))}}return{Settings:i,Configs:n,parameters:s,enviroments:r,preFetched:o}}(t,e,s,r),d={url:e.toString(),method:t.request.method,headers:_(t.request.headers)},c={status:a,headers:i,body:n},u=await ci(d,c,o);try{u.body=await __cw3(u.body,e,s)}catch(_e){console.log("⚠️ 步骤 __cw3 异常："+(_e&&_e.message||_e));}try{u.body=await __h3(u.body,e,s)}catch(_e){console.log("⚠️ 步骤 __h3 异常："+(_e&&_e.message||_e));}try{u.body=await __d3(u.body,e,s)}catch(_e){console.log("⚠️ 步骤 __d3 异常："+(_e&&_e.message||_e));}try{var __t0=Date.now();u.body=await __aqRoot(u.body,e,s);console.log("⏱ __aqRoot "+(Date.now()-__t0)+"ms");}catch(_e){console.log("⚠️ 步骤 __aqRoot 异常："+(_e&&_e.message||_e));}
try{var __t1=Date.now();u.body=await __nhRoot(u.body,e,s);console.log("⏱ __nhRoot "+(Date.now()-__t1)+"ms");}catch(_e){console.log("⚠️ 步骤 __nhRoot 异常："+(_e&&_e.message||_e));}
try{u.body=await __nhScale(u.body,e,s)}catch(_e){console.log("⚠️ 步骤 __nhScale 异常："+(_e&&_e.message||_e));}
try{u.body=await __nhForce(u.body,e,s)}catch(_e){console.log("⚠️ 步骤 __nhForce 异常："+(_e&&_e.message||_e));}
try{u.body=await __nhMin(u.body,e,s)}catch(_e){console.log("⚠️ 步骤 __nhMin 异常："+(_e&&_e.message||_e));}
try{u.body=await __nhPeak(u.body,e,s)}catch(_e){console.log("⚠️ 步骤 __nhPeak 异常："+(_e&&_e.message||_e));}
try{u.body=await __nhChance(u.body,e,s)}catch(_e){console.log("⚠️ 步骤 __nhChance 异常："+(_e&&_e.message||_e));}
try{u.body=await __nhClean(u.body,e,s)}catch(_e){console.log("⚠️ 步骤 __nhClean 异常："+(_e&&_e.message||_e));}
try{var __t2=Date.now();u.body=await __alertsRoot(u.body,e,s);console.log("⏱ __alertsRoot "+(Date.now()-__t2)+"ms");}catch(_e){console.log("⚠️ 步骤 __alertsRoot 异常："+(_e&&_e.message||_e));}
return{status:u.status??a,headers:g(t.response.headers,u.headers),body:u.body??n}}catch{return{status:a,headers:g(t.response.headers,i),body:n}}}const Si=t=>"string"==typeof t?Uint8Array.from(t,t=>255&t.charCodeAt(0)).buffer:t instanceof ArrayBuffer?t:ArrayBuffer.isView(t)?t.buffer.slice(t.byteOffset,t.byteOffset+t.byteLength):new Uint8Array(t).buffer,vi=function(t){const e=Number(t.env?.HTTP_TIMEOUT_MS),i=e>0?e:8e3;async function n(e,n={},a=!1){const s="string"==typeof e||e instanceof URL?{url:String(e),...n}:{...n,...e},r=(s.method||(void 0!==s.body||void 0!==s.bodyBytes?"POST":"GET")).toLowerCase(),o=_(s.headers);for(const t of["host",":authority","content-length"])delete o[t];let d=Number(s.timeout)||i;a&&s.timeout&&d<=500&&(d*=1e3);const c={headers:o,timeout:d,credentials:s.credentials??"omit"};for(const t of["policy","policyDescriptor","redirect","insecureTls"])void 0!==s[t]&&(c[t]=s[t]);if("get"!==r&&"head"!==r){const t=s.bodyBytes??s.body;null!=t&&(c.body=t instanceof ArrayBuffer?new Uint8Array(t):t)}if("function"!=typeof t.http?.[r])throw new TypeError(`Unsupported HTTP method: ${r}`);return t.http[r](s.url,c)}return{webFetch:(t,e)=>n(t,e),async fetch(t,e){const i=await n(t,e,!0),a=_(i.headers),s=i.status,r=/flatbuffer|protobuf|octet-stream/i.test(a["content-type"]??"");return{ok:s>=200&&s<300,status:s,statusCode:s,statusText:i.statusText??"",headers:a,body:r?"":await i.text(),bodyBytes:r?await i.arrayBuffer():void 0}}}}({env:globalThis.$environment??globalThis.$env??{},http:globalThis.$httpClient?{get:(t,e)=>new Promise((i,n)=>$httpClient.get({url:t,...e},(t,e,a)=>t?n(t):i({status:e.status,headers:e.headers,text:async()=>a,arrayBuffer:async()=>Si(a)}))),post:(t,e)=>new Promise((i,n)=>$httpClient.post({url:t,...e},(t,e,a)=>t?n(t):i({status:e.status,headers:e.headers,text:async()=>a,arrayBuffer:async()=>Si(a)})))}:{get:async(t,e)=>{const i=await $task.fetch({url:t,...e});return{status:i.statusCode,headers:i.headers,text:async()=>i.body,arrayBuffer:async()=>Si(i.body)}},post:async(t,e)=>{const i=await $task.fetch({url:t,...e});return{status:i.statusCode,headers:i.headers,text:async()=>i.body,arrayBuffer:async()=>(new TextEncoder).encode(i.body).buffer}}}});t=vi,async function(t,e,i=globalThis){const a=i.$request??{},s=i.$response??{},r=t=>{const e={};if(t&&"function"==typeof t.forEach)t.forEach((t,i)=>{e[i]=t});else for(const[i,n]of Object.entries(t??{}))"function"!=typeof n&&(e[i]=n);return e},o=t=>{const e=t instanceof Uint8Array?t:new Uint8Array(t);let i="";for(let t=0;t<e.length;t+=8192)i+=String.fromCharCode(...e.subarray(t,t+8192));return i},d=t=>{const e=t.status??t.statusCode??200;if("number"==typeof e)return e;const i=String(e).match(/\b(\d{3})\b/);return i?Number(i[1]):200},c=i.$argument;let u={};const l=n.map(t=>t.key),p=t=>{if(Array.isArray(t)){const e=new Set(n.filter(t=>t.boolean).map(t=>t.key));for(let i=0;i<Math.min(t.length,l.length);i++)void 0!==t[i]&&(u[l[i]]=e.has(l[i])?!0===t[i]||"true"===t[i]:t[i])}else t&&"object"==typeof t&&Object.assign(u,t)};if(c&&"object"==typeof c)p(c);else if("string"==typeof c)try{p(JSON.parse(c))}catch{const t=c.match(/(?:^|&)\s*([^=&]+)\s*=\s*(?:\"([^\"]*)\"|'([^']*)'|([^&]*))/g);if(t?.length)for(const e of t){const t=e.replace(/^&/,"").match(/^([^=]+)=(?:\"([^\"]*)\"|'([^']*)'|([^&]*))$/);if(t){const e=decodeURIComponent(t[1]).trim(),i=t[2]??t[3]??t[4]??"";u[e]=i.startsWith("[")&&i.endsWith("]")?i.slice(1,-1).split(",").map(t=>t.trim().replace(/^['\"]|['\"]$/g,"")):"true"===i||"false"!==i&&decodeURIComponent(i)}}else{const t=[];let e=0,i=0,n="";for(let a=0;a<=c.length;a++){const s=c[a];n?s===n&&"\\\\"!==c[a-1]&&(n=""):'"'===s||"'"===s?n=s:"["===s||"{"===s?i++:"]"===s||"}"===s?i--:","!==s&&a!==c.length||0!==i||(t.push(c.slice(e,a)),e=a+1)}for(const e of t){const t=e.indexOf(":");if(t<=0)continue;const i=e.slice(0,t).trim(),n=e.slice(t+1).trim();if(n.startsWith("[")&&n.endsWith("]")){const t=n.slice(1,-1).split(",").map(t=>t.trim()).filter(Boolean);u[i]=t.map(t=>t.replace(/^['\"]|['\"]$/g,""))}else u[i]="true"===n||"false"===n?"true"===n:n.replace(/^(?:\"([\\s\\S]*)\"|'([\\s\\S]*)')$/,(t,e,i)=>e??i)}}}const h={env:{...i.$environment??i.$env??{},...u},request:{...a,headers:r(a.headers)},respond:t=>t};{const t=s.bodyBytes??s.body??"",e=r(s.headers)["content-type"]??r(s.headers)["Content-Type"]??"",i=/flatbuffer|protobuf|octet-stream/i.test(e),n="string"==typeof t?i?(b=t,Uint8Array.from(b,t=>255&t.charCodeAt(0))):(new TextEncoder).encode(t):t instanceof ArrayBuffer?new Uint8Array(t):ArrayBuffer.isView(t)?new Uint8Array(t.buffer,t.byteOffset,t.byteLength):t,a=n instanceof Uint8Array?n:(new TextEncoder).encode(String(t));h.response={status:d(s),headers:r(s.headers),body:t,bodyBytes:i?a:void 0,text:async()=>(new TextDecoder).decode(a),arrayBuffer:async()=>a.slice().buffer}}var b;const m=i.$done;let y;try{y=await t(h)}catch(t){(i.console??console).error(t),y=void 0}if("function"!=typeof m)return y;if(null==y)return m();const f={status:y.status??200,headers:{...r(y.headers)},body:(_=y.body??"",_ instanceof ArrayBuffer?new Uint8Array(_):ArrayBuffer.isView(_)?new Uint8Array(_.buffer,_.byteOffset,_.byteLength):_)};var _;for(const t of Object.keys(f.headers))"content-length"!==t.toLowerCase()&&"content-encoding"!==t.toLowerCase()&&"transfer-encoding"!==t.toLowerCase()||delete f.headers[t];m(f)}(async t=>Ti(t),0,globalThis)}();
var __AQHI={"HK_AQHI":{"betas":{"NO2":0.0004462559,"SO2":0.0001393235,"O3":0.0004888034,"PM10":0.0002821751,"PM2_5":0.0002180567},"weights":null,"beta":null,"cats":[[0,1.87,1],[1.88,3.73,2],[3.74,5.6,3],[5.61,7.46,4],[7.47,9.33,5],[9.34,11.2,6],[11.21,12.81,7],[12.82,14.94,8],[14.95,17.08,9],[17.09,19.21,10],[19.22,null,11]]},"CA_AQHI":{"betas":{"NO2":0.000871,"O3":0.000537,"PM2_5":0.000487},"weights":null,"beta":null,"cats":[[0,1.04,1],[1.05,2.08,2],[2.09,3.12,3],[3.13,4.16,4],[4.17,5.2,5],[5.21,6.24,6],[6.25,7.28,7],[7.29,8.32,8],[8.33,9.36,9],[9.37,10.4,10],[10.41,null,11]]},"CN_DEATH_AQHI":{"betas":{"NO2":0.0009,"SO2":0.00059,"O3":0.00024,"PM2_5":0.00022},"weights":null,"beta":null,"cats":[[0,2.004,1],[2.005,4.008,2],[4.009,7.018,3],[7.018,8.016,4],[8.017,10.02,5],[10.021,12.024,6],[12.025,14.028,7],[14.029,16.032,8],[16.033,18.036,9],[18.037,20.04,10],[20.041,null,11]]},"CN_DEATH_HK_AQHI":{"betas":{"NO2":0.0009,"SO2":0.00059,"O3":0.00024,"PM10":0.0002821751,"PM2_5":0.0002180567},"weights":null,"beta":null,"cats":[[0,2.004,1],[2.005,4.008,2],[4.009,7.018,3],[7.018,8.016,4],[8.017,10.02,5],[10.021,12.024,6],[12.025,14.028,7],[14.029,16.032,8],[16.033,18.036,9],[18.037,20.04,10],[20.041,null,11]]},"AQHI_Multi_CN":{"betas":null,"weights":{"O3":0.271273,"NO2":0.390781,"PM2_5":0.120648,"SO2":0.217224},"beta":0.369991,"cats":[[0,5.8453,1],[5.8454,11.6906,2],[11.6907,17.536,3],[17.5361,23.3812,4],[23.3813,29.2265,5],[29.2266,35.0718,6],[35.0719,40.9171,7],[40.9172,46.7624,8],[46.7625,52.6077,9],[52.6078,58.453,10],[58.4531,null,11]]},"AQHI_Multi_CN_HK":{"betas":null,"weights":{"O3":0.271273,"NO2":0.390781,"PM10":0.156123,"PM2_5":0.120648,"SO2":0.217224},"beta":0.369991,"cats":[[0,5.8453,1],[5.8454,11.6906,2],[11.6907,17.536,3],[17.5361,23.3812,4],[23.3813,29.2265,5],[29.2266,35.0718,6],[35.0719,40.9171,7],[40.9172,46.7624,8],[46.7625,52.6077,9],[52.6078,58.453,10],[58.4531,null,11]]}};
function __aqhiCalc(pm,name){
  var a=__AQHI[name]; if(!a) return null;
  var sum=0, risk={};
  if(a.betas){
    var b=a.betas;
    var f=function(bt,c){ if(typeof bt!=="number"||!isFinite(bt)) return 0; return (typeof c!=="number"||!isFinite(c)||c<0)?0:100*(Math.exp(bt*c)-1); };
    var no2=f(b.NO2,pm.no2), so2=f(b.SO2,pm.so2), o3=f(b.O3,pm.o3);
    var p10=f(b.PM10,pm.pm10), p25=f(b.PM2_5,pm.pm25);
    sum = no2 + so2 + o3 + Math.max(p10, p25);
    risk={NO2:no2,SO2:so2,O3:o3,PM10:p10,PM2_5:p25};
  } else if(a.weights){
    var w=a.weights;
    var u={OZONE:(w.O3||0)*Math.max(pm.o3||0,0),
           NO2:(w.NO2||0)*Math.max(pm.no2||0,0),
           PM10:(w.PM10||0)*Math.max(pm.pm10||0,0),
           PM2_5:(w.PM2_5||0)*Math.max(pm.pm25||0,0),
           SO2:(w.SO2||0)*Math.max(pm.so2||0,0)};
    var usePM10 = u.PM10>0 && (u.PM2_5<=0 || u.PM10 > 1.2*u.PM2_5);
    var pmPart = usePM10 ? u.PM10 : u.PM2_5;
    sum = (a.beta||0) * (u.OZONE + u.NO2 + u.SO2 + pmPart);
    risk={O3:u.OZONE,NO2:u.NO2,PM10:u.PM10,PM2_5:u.PM2_5,SO2:u.SO2};
  } else return null;
  var cat=1;
  for(var i=0;i<a.cats.length;i++){ var hi=(a.cats[i][1]===null?1e9:a.cats[i][1]); if(sum>=a.cats[i][0] && sum<=hi){ cat=a.cats[i][2]; break; } }
  return {index:cat, cat:cat, raw:Math.round(sum*10000)/10000, primary:null};
}


async function __waqi(lat,lon){
  var key=__arg("API.WAQI.Token","");
  if(!key){ console.log("⚠️ [天气增强] 空气质量(WAQI) · 未填写 API.WAQI.Token，跳过"); return null; }
  var u="https://api.waqi.info/feed/geo:"+lat+";"+lon+"/?token="+encodeURIComponent(key);
  for(var i=0;i<2;i++){
    try{
      var r=await new Promise(function(res,rej){$httpClient.get({url:u,headers:{"User-Agent":"curl/8.14.1"}},function(e,rp,b){ if(e) rej(e); else res(b); });});
      var j=JSON.parse(r||"{}");
      if(j&&j.status==="ok"&&j.data&&typeof j.data.aqi==="number"){
        var ia=j.data.iaqi||{}, pm={};
        ["pm25","pm10","o3","no2","so2","co"].forEach(function(k){ if(ia[k]&&ia[k].v!=null) pm[k]=+ia[k].v; });
        return {index:+j.data.aqi, pm:pm};
      }
      console.log("⚠️ [天气增强] 空气质量(WAQI) · 返回异常，第 "+(i+1)+" 次");
    }catch(e){
      console.log("⚠️ [天气增强] 空气质量(WAQI) · 请求失败："+(e&&e.message||e)+"，第 "+(i+1)+" 次");
    }
    await new Promise(function(res){setTimeout(res,400);});
  }
  return null;
}

globalThis.__ALGO=globalThis.__ALGO||{};
var __ALGO={"UBA":{"pol":{"no2":[[0,10,0,0.99],[11,30,1,1.99],[31,60,2,2.99],[61,100,3,3.99],[101,null,4,null]],"pm10":[[0,9,0,0.99],[10,27,1,1.99],[28,54,2,2.99],[55,90,3,3.99],[91,null,4,null]],"pm25":[[0,5,0,0.99],[6,15,1,1.99],[16,30,2,2.99],[31,50,3,3.99],[51,null,4,null]],"o3":[[0,24,0,0.99],[25,72,1,1.99],[73,144,2,2.99],[145,240,3,3.99],[241,null,4,null]],"so2":[[0,10,0,0.99],[11,30,1,1.99],[31,60,2,2.99],[61,100,3,3.99],[101,null,4,null]]},"cats":[[0,0.99,1],[1,1.99,2],[2,2.99,3],[3,3.99,4],[4,null,5]],"setCat":true},"EU_EAQI":{"pol":{"pm25":[[0,5,0,9],[6,15,10,19],[16,50,20,29],[51,90,30,39],[91,140,40,49],[141,null,50,null]],"pm10":[[0,15,0,9],[16,45,10,19],[46,120,20,29],[121,195,30,39],[196,270,40,49],[271,null,50,null]],"o3":[[0,60,0,9],[61,100,10,19],[101,120,20,29],[121,160,30,39],[161,180,40,49],[181,null,50,null]],"no2":[[0,10,0,9],[11,25,10,19],[26,60,20,29],[61,100,30,39],[101,150,40,49],[151,null,50,null]],"so2":[[0,20,0,9],[21,40,10,19],[41,125,20,29],[126,190,30,39],[191,275,40,49],[276,1.7976931348623157e+308,50,null]]},"cats":[[0,9,1],[10,19,2],[20,29,3],[30,39,4],[40,49,5],[50,null,6]],"setCat":false},"WAQI_InstantCast_CN":{"pol":{"so2":[[0,150,0,50],[151,500,51,100],[501,650,101,150],[651,800,151,200],[801,1600,201,300],[1601,2100,301,400],[2101,2620,401,500],[2602,null,501,null]],"no2":[[0,100,0,50],[101,200,51,100],[201,700,101,150],[701,1200,151,200],[1201,2340,201,300],[2341,3090,301,400],[3091,3840,401,500],[3841,null,501,null]],"pm10":[[0,50,0,50],[51,150,51,100],[151,250,101,150],[251,350,151,200],[351,420,201,300],[421,500,301,400],[501,600,401,500],[601,null,501,null]],"co":[[0,5000,0,50],[5001,10000,51,100],[10001,35000,101,150],[35001,60000,151,200],[60001,90000,201,300],[90001,120000,301,400],[120001,150000,401,500],[150001,null,501,null]],"o3":[[0,160,0,50],[161,200,51,100],[201,300,101,150],[301,400,151,200],[401,800,201,300],[801,1000,301,400],[1001,1200,401,500],[1201,null,501,null]],"pm25":[[0,35,0,50],[36,75,51,100],[76,115,101,150],[116,150,151,200],[151,250,201,300],[251,350,301,400],[351,500,401,500],[501,null,501,null]]},"cats":[[0,50,1],[51,100,2],[101,150,3],[151,200,4],[201,300,5],[301,null,6]],"setCat":false},"WAQI_InstantCast_US":{"pol":{"o3":[[0,62.5,0,50],[62.6,101.5,51,100],[101.6,152.5,101,150],[152.6,205,151,200],[205.1,405,201,300],[405.1,605,301,500],[605.1,null,501,null]],"pm25":[[0,9,0,50],[9.1,35.4,51,100],[35.5,55.4,101,150],[55.5,125.4,151,200],[125.5,225.4,201,300],[225.5,325.4,301,500],[325.5,null,501,null]],"pm10":[[0,54,0,50],[55,154,51,100],[155,254,101,150],[255,354,151,200],[355,424,201,300],[425,604,301,500],[605,null,501,null]],"co":[[0,4400,0,50],[4401,9400,51,100],[9401,12400,101,150],[12401,15400,151,200],[15401,30400,201,300],[30401,50400,301,500],[50401,null,501,null]],"so2":[[0,35,0,50],[36,75,51,100],[76,185,101,150],[186,304,151,200],[305,604,201,300],[605,1004,301,500],[1005,null,501,null]],"no2":[[0,53,0,50],[54,100,51,100],[101,360,101,150],[361,649,151,200],[650,1249,201,300],[1250,2049,301,500],[2050,null,501,null]]},"cats":[[0,50,1],[51,100,2],[101,150,3],[151,200,4],[201,300,5],[301,null,6]],"setCat":false},"WAQI_InstantCast_CN_25_DRAFT":{"pol":{"so2":[[0,150,0,50],[151,500,51,100],[501,650,101,150],[651,800,151,200],[801,null,200,200]],"no2":[[0,100,0,50],[101,200,51,100],[201,700,101,150],[701,1200,151,200],[1201,2340,201,300],[2341,3090,301,400],[3091,3840,401,500],[3841,null,501,null]],"co":[[0,5000,0,50],[5001,10000,51,100],[10001,35000,101,150],[35001,60000,151,200],[60001,90000,201,300],[90001,120000,301,400],[120001,150000,401,500],[150001,null,501,null]],"o3":[[0,160,0,50],[161,200,51,100],[201,300,101,150],[301,400,151,200],[401,800,201,300],[801,1000,301,400],[1001,1200,401,500],[1201,null,501,null]],"pm10":[[0,50,0,50],[51,120,51,100],[121,250,101,150],[251,350,151,200],[351,420,201,300],[421,500,301,400],[501,600,401,500],[601,null,501,null]],"pm25":[[0,30,0,50],[31,60,51,100],[61,115,101,150],[116,150,151,200],[151,250,201,300],[251,350,301,400],[351,500,401,500],[501,null,501,null]]},"cats":[[0,50,1],[51,100,2],[101,150,3],[151,200,4],[201,300,5],[301,null,6]],"setCat":false}};
function __algoCalc(pm,name){
  var __T=__ALGO||globalThis.__ALGO||{};
  var a=__T[name]; if(!a) return null;
  var best=null,bestK=null;
  for(var k in a.pol){
    var v=pm[k]; if(typeof v!=="number"||!isFinite(v)) continue;
    var segs=a.pol[k], s=null;
    for(var i=0;i<segs.length;i++){
      var g=segs[i];
      if(v>=g[0]&&v<=g[1]){
        s=(g[1]===g[0])?g[2]:(g[2]+(v-g[0])/(g[1]-g[0])*(g[3]-g[2]));
        break;
      }
    }
    if(s===null&&segs.length){
      var last=segs[segs.length-1];
      if(v>last[1]) s=last[3];
    }
    if(s!==null&&(best===null||s>best)){ best=s; bestK=k; }
  }
  if(best===null) return null;
  var cat=1;
  for(var j=0;j<a.cats.length;j++){
    if(best>=a.cats[j][0]&&best<=a.cats[j][1]){ cat=a.cats[j][2]; break; }
  }
  var idx=a.setCat?cat:Math.round(best);
  return {index:idx,primary:bestK,cat:cat,raw:best};
}

var __SETTINGS={};
function __arg(k,def){
  try{
    if(!__SETTINGS.__init){
      __SETTINGS.__init=1;
      var a=globalThis.$argument||"";
      var re=/([A-Za-z][\w.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^&]*))/g,m;
      while((m=re.exec(a))){ __SETTINGS[m[1]]=(m[2]!==undefined?m[2]:(m[3]!==undefined?m[3]:m[4]))||""; }
      var e=globalThis.$environment||globalThis.$env||{};
      for(var k2 in e){ if(__SETTINGS[k2]===undefined && typeof e[k2]!=="object") __SETTINGS[k2]=e[k2]; }
    }
  }catch(e){}
  var v=__SETTINGS[k];
  /* Surge 未替换的模板占位符（{{{xxx}}}）视为未设置 */
  if(typeof v==="string" && v.indexOf("{{{")>=0) v="";
  return (v===undefined||v===""||v===null)?def:v;
}
function __qwHost(){ return __arg("API.QWeather.Host","ny2x8ajpxn.re.qweatherapi.com"); }
function __qwKey(){ return __arg("API.QWeather.Token",""); }
async function __qw(path,params){
  var key=__qwKey();
  if(!key){ console.log("⚠️ [天气增强] 和风 · 未填写 API.QWeather.Token，跳过"); return null; }
  var u="https://"+__qwHost()+path+"?"+params+"&key="+encodeURIComponent(key);
  for(var i=0;i<2;i++){
    try{
      var r=await new Promise(function(res,rej){$httpClient.get({url:u,headers:{"User-Agent":"curl/8.14.1"}},function(e,rp,b){ if(e) rej(e); else res(b); });});
      var j=JSON.parse(r||"{}");
      if(j&&String(j.code)==="200") return j;
      console.log("⚠️ [天气增强] 和风 "+path+" 返回 code="+(j&&j.code)+"，第 "+(i+1)+" 次");
    }catch(e){
      console.log("⚠️ [天气增强] 和风 "+path+" 请求失败："+(e&&e.message||e)+"，第 "+(i+1)+" 次");
    }
    await new Promise(function(res){setTimeout(res,400);});
  }
  return null;
}
function __cp(body){ var b=new Uint8Array(body.length); for(var i=0;i<body.length;i++) b[i]=body[i]; return b; }
function __f32(dv,p,v){ if(p&&typeof v==="number"&&isFinite(v)) dv.setFloat32(p,v,true); }
function __i8(dv,p,v){ if(p&&typeof v==="number"&&isFinite(v)&&v>=0&&v<=127) dv.setInt8(p,Math.round(v)); }

async function __cw3q(body,url){
  try{
    var ps=url.pathname.split('/').filter(function(x){return x});
    if(ps[1]!=="v3"||ps[2]!=="weather"||ps.length<6) return body;
    var lat=ps[4],lon=ps[5];
    var j=await __qw("/v7/weather/now","location="+lon+","+lat);
    if(!j||!j.now) return body;
    var w=j.now;
    var bin=__cp(body); var dv=new DataView(bin.buffer);
    var root=dv.getUint32(0,true), vt=root-dv.getInt32(root,true);
    var vl=dv.getUint16(vt,true); if(vl<6) return body;
    var fo=dv.getUint16(vt+6,true); if(!fo) return body;
    var fp=root+fo, tb=fp+dv.getUint32(fp,true);
    var t2=tb-dv.getInt32(tb,true), l2=dv.getUint16(t2,true);
    function off(ix){ if(4+2*ix+2>l2) return 0; var o=dv.getUint16(t2+4+2*ix,true); return o?tb+o:0; }
    __f32(dv,off(25),+w.temp); __f32(dv,off(26),+w.feelsLike); __f32(dv,off(27),+w.dew);
    __f32(dv,off(23),+w.pressure); __f32(dv,off(29),(+w.vis)*1000);
    __f32(dv,off(32),(+w.windSpeed)/3.6);
    __f32(dv,off(22),+w.precip);
    __i8(dv,off(8),+w.humidity); __i8(dv,off(3),+w.cloud);
    console.log("✅ [天气增强] 当前天气(和风) · 温度 "+w.temp+"° · 体感 "+w.feelsLike+"° · 湿度 "+w.humidity+"% · 气压 "+w.pressure+" hPa");
    return bin;
  }catch(e){ console.log("⚠️ [天气增强] 当前天气(和风) 异常："+(e&&e.message)); return body; }
}

async function __h3q(body,url){
  try{
    var ps=url.pathname.split('/').filter(function(x){return x});
    if(ps[1]!=="v3"||ps[2]!=="weather"||ps.length<6) return body;
    var lat=ps[4],lon=ps[5];
    var j=await __qw("/v7/weather/24h","location="+lon+","+lat);
    if(!j||!j.hourly||!j.hourly.length) return body;
    var byTs={};
    for(var i=0;i<j.hourly.length;i++){ byTs[Math.floor(Date.parse(j.hourly[i].fxTime)/3600000)]=j.hourly[i]; }
    var bin=__cp(body); var dv=new DataView(bin.buffer);
    var root=dv.getUint32(0,true), vt=root-dv.getInt32(root,true);
    var vl=dv.getUint16(vt,true); if(vl<12) return body;
    var fo=dv.getUint16(vt+10,true); if(!fo) return body;
    var fp=root+fo, tb=fp+dv.getUint32(fp,true);
    var t2=tb-dv.getInt32(tb,true), l2=dv.getUint16(t2,true);
    if(4+2*1+2>l2) return body;
    var vo=dv.getUint16(t2+6,true); if(!vo) return body;
    var vp=tb+vo, vec=vp+dv.getUint32(vp,true), L=dv.getUint32(vec,true);
    var n=0;
    for(var k=0;k<L;k++){
      var ep=vec+4+4*k, et=ep+dv.getUint32(ep,true);
      var ev=et-dv.getInt32(et,true), el=dv.getUint16(ev,true);
      function eoff(ix){ if(4+2*ix+2>el) return 0; var o=dv.getUint16(ev+4+2*ix,true); return o?et+o:0; }
      var p0=eoff(0); if(!p0) continue;
      var src=byTs[Math.floor(dv.getUint32(p0,true)/3600)]; if(!src) continue;
      __f32(dv,eoff(17),+src.temp); __f32(dv,eoff(18),+src.feelsLike);
      __f32(dv,eoff(24),(+src.windSpeed)/3.6);
      __f32(dv,eoff(13),+src.pressure);
      __f32(dv,eoff(21),(+src.vis)*1000);
      __f32(dv,eoff(10),+src.precip);
      __i8(dv,eoff(11),+src.pop); __i8(dv,eoff(7),+src.humidity); __i8(dv,eoff(1),+src.cloud);
      n++;
    }
    console.log("✅ [天气增强] 逐小时(和风) · 匹配 "+n+"/"+L+" 条 · 和风 "+j.hourly.length+" 条");
    return bin;
  }catch(e){ console.log("⚠️ [天气增强] 逐小时(和风) 异常："+(e&&e.message)); return body; }
}

async function __d3q(body,url){
  try{
    var ps=url.pathname.split('/').filter(function(x){return x});
    if(ps[1]!=="v3"||ps[2]!=="weather"||ps.length<6) return body;
    var lat=ps[4],lon=ps[5];
    var j=await __qw("/v7/weather/7d","location="+lon+","+lat);
    if(!j||!j.daily||!j.daily.length) return body;
    var byD={};
    for(var i=0;i<j.daily.length;i++){ byD[Math.floor(Date.parse(j.daily[i].fxTime)/86400000)]=j.daily[i]; }
    var bin=__cp(body); var dv=new DataView(bin.buffer);
    var root=dv.getUint32(0,true), vt=root-dv.getInt32(root,true);
    var vl=dv.getUint16(vt,true); if(vl<8) return body;
    var fo=dv.getUint16(vt+8,true); if(!fo) return body;
    var fp=root+fo, tb=fp+dv.getUint32(fp,true);
    var t2=tb-dv.getInt32(tb,true), l2=dv.getUint16(t2,true);
    if(4+2*1+2>l2) return body;
    var vo=dv.getUint16(t2+6,true); if(!vo) return body;
    var vp=tb+vo, vec=vp+dv.getUint32(vp,true), L=dv.getUint32(vec,true);
    var n=0;
    for(var k=0;k<L;k++){
      var ep=vec+4+4*k, et=ep+dv.getUint32(ep,true);
      var ev=et-dv.getInt32(et,true), el=dv.getUint16(ev,true);
      function doff(fx){ if(4+2*fx+2>el) return 0; var o=dv.getUint16(ev+4+2*fx,true); return o?et+o:0; }
      var p0=(4+2<=el)?dv.getUint16(ev+4,true):0; if(!p0) continue;
      var src=byD[Math.floor(dv.getUint32(et+p0,true)/86400)]; if(!src) continue;
      __f32(dv,doff(23),+src.tempMax); __f32(dv,doff(25),+src.tempMin);
      __i8(dv,doff(3),+src.humidity); __i8(dv,doff(4),+src.humidity);
      var __wd=parseFloat(src.windSpeedDay), __wn=parseFloat(src.windSpeedNight);
      if(!isFinite(__wd)) __wd=null;
      if(!isFinite(__wn)) __wn=null;
      var __wavg=(__wd!==null&&__wn!==null)?((__wd+__wn)/2):(__wd!==null?__wd:__wn);
      var __wmax=(__wd!==null&&__wn!==null)?Math.max(__wd,__wn):(__wd!==null?__wd:__wn);
      if(__wavg!==null) __f32(dv,doff(28),__wavg/3.6);
      if(__wmax!==null) __f32(dv,doff(29),__wmax/3.6);
      __f32(dv,doff(30),(+src.vis)*1000); __f32(dv,doff(31),(+src.vis)*1000);
      n++;
    }
    console.log("✅ [天气增强] 逐日(和风) · 匹配 "+n+"/"+L+" 天 · 和风 "+j.daily.length+" 天");
    return bin;
  }catch(e){ console.log("⚠️ [天气增强] 逐日(和风) 异常："+(e&&e.message)); return body; }
}

async function __qwAq(lat,lon){
  var j=await __qw("/airquality/v1/current/"+lat+"/"+lon,"");
  if(!j) return null;
  var out={chn:null,usa:null,pm:{}};
  try{
    if(j.aqi){ out.chn=(j.aqi.chn!=null?+j.aqi.chn:null); out.usa=(j.aqi.usa!=null?+j.aqi.usa:null); }
    var arr=j.pollutants||[];
    for(var i=0;i<arr.length;i++){
      var c=(arr[i].code||"").toLowerCase(), v=arr[i].concentration&&+arr[i].concentration.value;
      if(c==="pm2p5") out.pm.pm25=v; else if(c==="pm10") out.pm.pm10=v;
      else if(c==="o3") out.pm.o3=v; else if(c==="no2") out.pm.no2=v;
      else if(c==="so2") out.pm.so2=v; else if(c==="co") out.pm.co=v;
    }
  }catch(e){ console.log("⚠️ [天气增强] 和风空气质量解析失败："+(e&&e.message||e)); }
  return out;
}

var __RTCACHE={};
async function __rt(lat,lon){
  var k=lat+","+lon;
  if(__RTCACHE[k]) return __RTCACHE[k];
  for(var i=0;i<2;i++){
    try{
      var r=await new Promise(function(res,rej){$httpClient.get({url:"https://api.caiyunapp.com/v2.6/Y2FpeXVuX25vdGlmeQ==/"+lon+","+lat+"/realtime",headers:{Referer:"https://caiyunapp.com/","User-Agent":"curl/8.14.1"}},function(e,rp,b){ if(e) rej(e); else res(b); });});
      var j=JSON.parse(r||"{}");
      if(j&&j.result&&j.result.realtime){ __RTCACHE[k]=j; return j; }
      console.log("⚠️ [天气增强] 彩云 realtime 返回异常，第 "+(i+1)+" 次");
    }catch(e){
      console.log("⚠️ [天气增强] 彩云 realtime 失败："+(e&&e.message||e)+"，第 "+(i+1)+" 次");
    }
    await new Promise(function(res){setTimeout(res,400);});
  }
  return null;
}


async function __h3(body,url,st){
  try{
    
    if(!(body instanceof Uint8Array)) return body;
    var ps=url.pathname.split('/').filter(function(x){return x});
    if(ps[1]!=="v3"||ps[2]!=="weather"||ps.length<6) return body;
    if(__arg("Weather.Provider","ColorfulClouds")==="QWeather") return await __h3q(body,url);
    var lat=ps[4],lon=ps[5];
    var raw=await new Promise(function(res,rej){$httpClient.get({url:"https://api.caiyunapp.com/v2.6/Y2FpeXVuX25vdGlmeQ==/"+lon+","+lat+"/hourly?hourlysteps=24",headers:{Referer:"https://caiyunapp.com/","User-Agent":"curl/8.14.1"}},function(e,rp,b){ if(e) rej(e); else res(b); });});
    var j=JSON.parse(raw||"{}");
    var hh=j&&j.result&&j.result.hourly;
    
    if(!hh||!hh.temperature){ console.log("⚠️ [天气增强] 逐小时 · 彩云无数据，跳过"); return body; }
    var byTs={};
    for(var i=0;i<hh.temperature.length;i++){
      var t=Math.floor(Date.parse(hh.temperature[i].datetime)/3600000);
      byTs[t]={i:i};
    }
    var bin=new Uint8Array(body.length);for(var q=0;q<body.length;q++)bin[q]=body[q];
    var dv=new DataView(bin.buffer);
    var root=dv.getUint32(0,true);
    var vt=root-dv.getInt32(root,true);
    var vl=dv.getUint16(vt,true);
    if(vl<12) return body;
    var fo=dv.getUint16(vt+10,true);
    if(!fo){ return body; }
    var fp=root+fo;var tb=fp+dv.getUint32(fp,true);
    var t2=tb-dv.getInt32(tb,true);
    var l2=dv.getUint16(t2,true);
    if(4+2*1+2>l2) return body;
    var vo=dv.getUint16(t2+6,true);
    if(!vo) return body;
    var vp=tb+vo;var vec=vp+dv.getUint32(vp,true);
    var L=dv.getUint32(vec,true);
    
    var n=0, nc=0;
    var __ccOn=String(__arg("Weather.ReplaceConditionCode","true"))!=="false";
    function __ccOf(sky){
      if(!sky) return null;
      if(sky.indexOf("SNOW")>=0||sky.indexOf("SLEET")>=0||sky.indexOf("ICE")>=0) return null;
      if(sky==="CLEAR_DAY"||sky==="CLEAR_NIGHT") return 1;
      if(sky==="PARTLY_CLOUDY_DAY"||sky==="PARTLY_CLOUDY_NIGHT") return 24;
      if(sky==="CLOUDY"||sky==="OVERCAST") return 6;
      if(sky==="LIGHT_RAIN") return 7;
      if(sky.indexOf("RAIN")>=0) return 25;
      if(sky.indexOf("HAZE")>=0||sky==="FOG") return null;
      return null;
    }
    for(var k=0;k<L;k++){
      var ep=vec+4+4*k; var et=ep+dv.getUint32(ep,true);
      var ev=et-dv.getInt32(et,true);
      var el=dv.getUint16(ev,true);
      function eoff(ix){ if(4+2*ix+2>el) return 0; var o=dv.getUint16(ev+4+2*ix,true); return o?et+o:0; }
      var p0=eoff(0); if(!p0) continue;
      var ts=Math.floor(dv.getUint32(p0,true)/3600);
      var src=byTs[ts]; if(src===undefined) continue;
      var ix=src.i;
      function g(arr,f){ var a=arr&&arr[ix]; if(!a) return undefined; if(f!==undefined&&typeof a[f]==="number") return a[f]; return typeof a.value==="number"?a.value:undefined; }
      function sf(f,v){ var p=eoff(f); if(p&&typeof v==="number"&&isFinite(v)){dv.setFloat32(p,v,true);n++;} }
      function si(f,v){ var p=eoff(f); if(p&&typeof v==="number"&&isFinite(v)&&v>=0&&v<=127){dv.setInt8(p,Math.round(v));n++;} }
      sf(17,g(hh.temperature));
      sf(18,g(hh.apparent_temperature));
      sf(24,g(hh.wind,"speed")/3.6);
      sf(13,g(hh.pressure)/100);
      sf(21,g(hh.visibility)*1000);
      sf(10,g(hh.precipitation,"value"));
      si(11,g(hh.precipitation,"probability"));
      si(7,g(hh.humidity)*100);
      si(1,g(hh.cloudrate)*100);
      if(__ccOn){
        var __o5=eoff(5);
        if(__o5){
          var __u5=dv.getUint32(__o5,true), __t5=__o5+__u5;
          if(__u5>0 && __t5+8<=bin.length && dv.getUint32(__t5,true)===1){
            var __sky=hh.skycon&&hh.skycon[ix]?hh.skycon[ix].value:null;
            var __c2=__ccOf(__sky);
            if(__c2!==null && dv.getUint8(__t5+4)!==__c2){ dv.setUint8(__t5+4,__c2); nc++; }
          }
        }
      }
    }
    console.log("✅ [天气增强] 逐小时 · 写入 "+n+" 项 · 条件码 "+nc+" 条 · 彩云 "+hh.temperature.length+" 条");
    return bin;
  }catch(e){  return body; }
}

async function __d3(body,url,st){
  try{
    if(!(body instanceof Uint8Array)) return body;
    var ps=url.pathname.split('/').filter(function(x){return x});
    if(ps[1]!=="v3"||ps[2]!=="weather"||ps.length<6) return body;
    if(__arg("Weather.Provider","ColorfulClouds")==="QWeather") return await __d3q(body,url);
    var lat=ps[4],lon=ps[5];
    var raw=await new Promise(function(res,rej){$httpClient.get({url:"https://api.caiyunapp.com/v2.6/Y2FpeXVuX25vdGlmeQ==/"+lon+","+lat+"/daily?dailysteps=10",headers:{Referer:"https://caiyunapp.com/","User-Agent":"curl/8.14.1"}},function(e,rp,b){ if(e) rej(e); else res(b); });});
    var j=JSON.parse(raw||"{}");
    var dd=j&&j.result&&j.result.daily;
    if(!dd||!dd.temperature){ console.log("⚠️ [天气增强] 逐日 · 彩云无数据，跳过"); return body; }
    var byD={};
    for(var i=0;i<dd.temperature.length;i++){
      byD[Math.floor(Date.parse(dd.temperature[i].date)/86400000)]=i;
    }
    var bin=new Uint8Array(body.length);for(var q=0;q<body.length;q++)bin[q]=body[q];
    var dv=new DataView(bin.buffer);
    var root=dv.getUint32(0,true);
    var vt=root-dv.getInt32(root,true);
    var vl=dv.getUint16(vt,true);
    if(vl<8) return body;
    var fo=dv.getUint16(vt+8,true);
    if(!fo) return body;
    var fp=root+fo;var tb=fp+dv.getUint32(fp,true);
    var t2=tb-dv.getInt32(tb,true);
    var l2=dv.getUint16(t2,true);
    if(4+2*1+2>l2) return body;
    var vo=dv.getUint16(t2+6,true);
    if(!vo) return body;
    var vp=tb+vo;var vec=vp+dv.getUint32(vp,true);
    var L=dv.getUint32(vec,true);
    var n=0;
    for(var k=0;k<L;k++){
      var ep=vec+4+4*k; var et=ep+dv.getUint32(ep,true);
      var ev=et-dv.getInt32(et,true);
      var el=dv.getUint16(ev,true);
      var p0=(4+2<=el)?dv.getUint16(ev+4,true):0;
      if(!p0) continue;
      var ts=dv.getUint32(et+p0,true);
      var src=byD[Math.floor(ts/86400)]; if(src===undefined) continue;
      var ix=src;
      function doff(fx){ if(4+2*fx+2>el) return 0; var o=dv.getUint16(ev+4+2*fx,true); return o?et+o:0; }
      function sf(fx,v){ var p=doff(fx); if(p&&typeof v==="number"&&isFinite(v)){dv.setFloat32(p,v,true);n++;} }
      function si(fx,v){ var p=doff(fx); if(p&&typeof v==="number"&&isFinite(v)){dv.setInt8(p,Math.max(-128,Math.min(127,Math.round(v))));n++;} }
      var tm=dd.temperature&&dd.temperature[ix];
      var hu=dd.humidity&&dd.humidity[ix];
      var pr=dd.precipitation&&dd.precipitation[ix];
      var wd=dd.wind&&dd.wind[ix];
      var vs=dd.visibility&&dd.visibility[ix];
      if(tm){ sf(23,tm.max); sf(25,tm.min); }
      if(hu){ si(3,hu.max*100); si(4,hu.min*100); }
      if(pr){}
      if(wd){ if(wd.avg) sf(28,wd.avg.speed/3.6); if(wd.max) sf(29,wd.max.speed/3.6); }
      if(vs){ sf(30,vs.max*1000); sf(31,vs.min*1000); }
    }
    console.log("✅ [天气增强] 逐日 · 写入 "+n+" 项 · 彩云 "+dd.temperature.length+" 天");
    return bin;
  }catch(e){  return body; }
}


// 用响应里已有的污染物浓度（苹果原生=和风实测站）本地计算指数
function __aqCalcNative(body){
  try{
    var N=body.length; var v=new DataView(body.buffer,body.byteOffset,body.byteLength);
    var tr=v.getUint32(0,true); if(tr<=0||tr+4>N) return null;
    var trvt=tr-v.getInt32(tr,true); if(trvt<0) return null;
    var fo0=v.getUint16(trvt+4,true); if(!fo0) return null;
    var p=v.getUint32(tr+fo0,true); if(!p) return null;
    var t=tr+fo0+p; if(t+4>N) return null;
    var vt=t-v.getInt32(t,true); if(vt<0||vt+4>N) return null;
    var cnt=v.getUint16(vt+4+2*4,true); if(!cnt) return null;
    var sp=t+cnt; var vec=sp+v.getUint32(sp,true); var K=v.getUint32(vec,true);
    if(K<1||K>20) return null;
    var map={};
    for(var k=0;k<K;k++){
      var ep=vec+4+4*k; var et=ep+v.getUint32(ep,true); var ev=et-v.getInt32(et,true);
      var vs=v.getUint16(ev,true);
      var f0=v.getUint16(ev+4,true), f1=v.getUint16(ev+6,true);
      if(!f0||!f1) continue;
      var ty=v.getUint8(et+f0); var amt=v.getFloat32(et+f1,true);
      map[ty]=amt;
    }
    var pmv={no2:map[6],o3:map[8],pm25:map[9],so2:map[10],pm10:map[11],co:map[12]};
    var filled=0; for(var q in pmv){ if(typeof pmv[q]==="number"&&isFinite(pmv[q])) filled++; }
    if(filled<3) return null;
    var alg=__arg("AirQuality.Calculate.Algorithm","EU_EAQI");
    var r;
    if(typeof __AQHI!=="undefined"&&__AQHI[alg]) r=__aqhiCalc(pmv,alg);
    else r=__algoCalc(pmv,alg);
    if(!r) return null;
    var idx=r.index, cat=r.cat;
    var fs1=v.getUint16(vt+4+2*1,true), fs2=v.getUint16(vt+4+2*2,true), fs3=v.getUint16(vt+4+2*3,true);
    if(fs1) v.setUint8(t+fs1,cat);
    if(fs2) v.setInt16(t+fs2,Math.max(0,Math.min(999,Math.round(idx))),true);
    if(fs3) v.setUint8(t+fs3,cat>=3?1:0);
    // 同步 scale 标签（只在长度不超过原字符串时替换）
    var sp7=v.getUint16(vt+4+2*7,true);
    if(sp7){
      var ps=t+sp7; var pv2=ps+v.getUint32(ps,true);
      var oldL=v.getUint32(pv2,true);
      var NEW={'EU_EAQI':'EU.EAQI.2604','UBA':'UBA.LQI.2604','WAQI_InstantCast_CN':'HJ6332012.2604','WAQI_InstantCast_US':'EPA_NowCast.2604','HK_AQHI':'HK.AQHI.2604','CA_AQHI':'CA.AQHI.2604','CN_DEATH_AQHI':'CN.AQHI.2604'}[alg];
      if(NEW){
        var bytes=[]; for(var bi=0;bi<NEW.length;bi++) bytes.push(NEW.charCodeAt(bi)&255);
        if(bytes.length<=oldL && pv2+4+bytes.length+1<=N){
          for(var bi2=0;bi2<bytes.length;bi2++) v.setUint8(pv2+4+bi2,bytes[bi2]);
          v.setUint8(pv2+4+bytes.length,0);
          v.setUint32(pv2,bytes.length,true);
        }
      }
    }
    /* 改写 metadata：providerName 必须是苹果能识别的已知来源 */
    try{
      var mo0=v.getUint16(vt+4,true);
      var meta=mo0? t+mo0+v.getUint32(t+mo0,true) : 0;
      var mv=meta? meta-v.getInt32(meta,true) : 0;
      var mvs=mv? v.getUint16(mv,true) : 0;
      var mOffs=[];
      for(var mi=0;mi<(mvs-4)/2;mi++) mOffs.push(v.getUint16(mv+4+2*mi,true));
      function _setStr(offIdx, val){
        if(!mOffs[offIdx]) return;
        var pos=meta+mOffs[offIdx];
        var q=pos+v.getUint32(pos,true);
        var oldL=v.getUint32(q,true);
        if(val.length>oldL) return;
        if(q+4+val.length+1>N) return;   // 边界保护
        for(var ci=0;ci<val.length;ci++) v.setUint8(q+4+ci,val.charCodeAt(ci));
        v.setUint8(q+4+val.length,0);
        v.setUint32(q,val.length,true);
      }
      /* slot6 = providerName */
      _setStr(6,'iRingo');
      /* slot0 = attributionUrl */
      _setStr(0,'https://github.com/NSRingo');
    }catch(e2){}
    console.log("✅ [天气增强] 空气质量 · 原生污染物本地计算 "+alg+" index "+idx+" · 等级 "+cat+" · 污染物 "+filled+" 项");
    return new Uint8Array(v.buffer,v.byteOffset,v.byteLength);
  }catch(e){ console.log("⚠️ [天气增强] 空气质量 · 原生计算异常："+(e&&e.message)); return null; }
}

/* ============ WK3 预警注入钩子 v2（四源 + 苹果原生详情页） ============ */
'use strict';

(function () {
  var _f32 = new DataView(new ArrayBuffer(4));
  function _fbits(v) { _f32.setFloat32(0, Number(v) || 0, true); return _f32.getUint32(0, true); }
  function _sev(s) {
    return ({ extreme: 1, severe: 2, moderate: 3, minor: 4 })[String(s || '').toLowerCase()] || 0;
  }
  function _urg(u) {
    return ({ immediate: 1, expected: 2, future: 3, past: 4 })[String(u || '').toLowerCase()] || 0;
  }
  function _cert(c) {
    return ({ observed: 1, likely: 2, possible: 3, unlikely: 4 })[String(c || '').toLowerCase()] || 0;
  }
  function _unix(v) {
    if (!v) return 0;
    if (typeof v === 'number') return Math.round(v > 1e12 ? v / 1000 : v);
    var t = Date.parse(String(v)); return isNaN(t) ? 0 : Math.round(t / 1000);
  }
  function _utf8(s) {
    var out = []; s = String(s);
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c < 0x80) out.push(c);
      else if (c < 0x800) out.push(0xC0 | (c >> 6), 0x80 | (c & 63));
      else if (c >= 0xD800 && c <= 0xDBFF) {
        var c2 = s.charCodeAt(++i), cp = 0x10000 + ((c - 0xD800) << 10) + (c2 - 0xDC00);
        out.push(0xF0 | (cp >> 18), 0x80 | ((cp >> 12) & 63), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63));
      } else out.push(0xE0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
    return out;
  }
  function Blob() { this.b = []; }
  Blob.prototype.align4 = function () { while (this.b.length & 3) this.b.push(0); };
  Blob.prototype.u8 = function (v) { this.b.push(v & 255); };
  Blob.prototype.u16 = function (v) { this.b.push(v & 255, (v >>> 8) & 255); };
  Blob.prototype.u32 = function (v) { this.b.push(v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255); };
  Blob.prototype.u32at = function (p, v) {
    this.b[p] = v & 255; this.b[p + 1] = (v >>> 8) & 255;
    this.b[p + 2] = (v >>> 16) & 255; this.b[p + 3] = (v >>> 24) & 255;
  };
  Blob.prototype.str = function (s) {
    var e = _utf8(s); this.align4();
    var p = this.b.length; this.u32(e.length);
    for (var i = 0; i < e.length; i++) this.b.push(e[i]);
    this.b.push(0); return p;
  };
  Blob.prototype.ref = function (p, t) { this.u32at(p, (t - p) >>> 0); };

/* ============ 读取原生 weatherAlerts 元信息 ============ */

/**
 * 从响应中读出 weatherAlerts 的现有信息
 * @param {Uint8Array} body
 * @returns {{providerName:string, detailsUrl:string, alertCount:number}|null}
 */
function readAlertsMeta(body) {
  if (!(body instanceof Uint8Array)) return null;
  const dv = new DataView(body.buffer, body.byteOffset, body.byteLength);
  const rdStr = (p) => {
    try {
      const q = p + dv.getUint32(p, true);
      const L = dv.getUint32(q, true);
      if (L <= 0 || q + 4 + L > body.byteLength) return '';
      return new TextDecoder().decode(body.slice(q + 4, q + 4 + L));
    } catch (e) { return ''; }
  };
  try {
    const rootOff = dv.getUint32(0, true);
    const vt = rootOff - dv.getInt32(rootOff, true);
    const nf = (dv.getUint16(vt, true) - 4) / 2;
    if (nf <= 9) return null;
    const off9 = dv.getUint16(vt + 4 + 18, true);
    if (!off9) return null;
    const f9 = rootOff + off9;
    const obj = f9 + dv.getUint32(f9, true);

    const so = dv.getInt32(obj, true);
    const cv = so > 0 ? obj - so : obj + Math.abs(so);
    const cvs = dv.getUint16(cv, true);
    const cnf = (cvs - 4) / 2;
    if (cnf < 3) return null;
    const cOffs = [];
    for (let i = 0; i < cnf; i++) cOffs.push(dv.getUint16(cv + 4 + 2 * i, true));

    // slot2 = alerts 向量
    let alertCount = 0;
    if (cOffs[2]) {
      const p = obj + cOffs[2];
      const vec = p + dv.getUint32(p, true);
      alertCount = dv.getUint32(vec, true) / 4;
    }

    // slot1 = detailsUrl
    let detailsUrl = '';
    if (cOffs[1]) detailsUrl = rdStr(obj + cOffs[1]);

    // slot0 = metadata -> slot6 = providerName
    let providerName = '';
    if (cOffs[0]) {
      const mp = obj + cOffs[0];
      const meta = mp + dv.getUint32(mp, true);
      const mso = dv.getInt32(meta, true);
      const mv = mso > 0 ? meta - mso : meta + Math.abs(mso);
      const mvs = dv.getUint16(mv, true);
      const mnf = (mvs - 4) / 2;
      if (mnf > 6) {
        const m6 = dv.getUint16(mv + 4 + 2 * 6, true);
        if (m6) providerName = rdStr(meta + m6);
      }
    }
    return { providerName, detailsUrl, alertCount };
  } catch (e) {
    return null;
  }
}

/** 是否为官方预警中心数据（只有这种才替换） */
const ALERT_CENTERS = [
  '国家预警信息发布中心',
  '國家預警信息發布中心',
  'National Early Warning Center',
];
function isAlertCenter(name) {
  return ALERT_CENTERS.includes(String(name || '').trim());
}

/** 从和风预警页 URL 提取地区 ID */
function parseQWeatherAreaId(url) {
  try {
    const u = new URL(url);
    if (u.hostname !== 'www.qweather.com') return null;
    if (u.searchParams.get('from') !== 'AppleWeatherService') return null;
    const m = decodeURIComponent(u.pathname).match(/^\/(?:en\/)?severe-weather\/([^/]+)\.html$/);
    return m ? m[1] : null;
  } catch (e) { return null; }
}





  /* ---- 和风预警网页解析 ---- */
  function parseQWeatherPage(html) {
    var t = String(html || '');
    function pk(str, re) {
      var m = String(str || '').match(re);
      return m ? String(m[1]).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim() : '';
    }
    var location = pk(t, /<h1[^>]*class=["'][^"']*c-submenu__location[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i);
    if (!location) {
      location = pk(t, /<title>([\s\S]*?)<\/title>/i)
        .replace(/\s*(?:severe weather warning|灾害预警|天气预警).*$/i, '').trim();
    }
    var source = pk(t, /<a[^>]*class=["'][^"']*data-source__txt[^"']*["'][^>]*>([\s\S]*?)<\/a>/i)
      .replace(/^(?:预警数据来源|Warning data source)\s*[:：]\s*/i, '').trim();

    var marks = [], re = /<div[^>]*class=["']([^"']*\bc-city-warning-events\b[^"']*)["'][^>]*>/gi, m;
    while ((m = re.exec(t))) marks.push({ index: m.index, start: m.index + m[0].length });

    var out = [];
    for (var i = 0; i < marks.length; i++) {
      var end = (i + 1 < marks.length) ? marks[i + 1].index : t.length;
      var ai = t.indexOf('<div class="c-city-warning-around">', marks[i].start);
      if (ai !== -1 && ai < end) end = ai;
      var seg = t.slice(marks[i].start, end);

      var title = pk(seg, /<h3[^>]*>([\s\S]*?)<\/h3>/i);
      var issued = pk(seg, /<p[^>]*>\s*((?:Issue\s+date|发布\s*日期)\s*[:：][\s\S]*?)<\/p>/i)
        .replace(/^(?:Issue\s+date|发布\s*日期)\s*[:：]\s*/i, '').trim();
      var desc = pk(seg, /<p[^>]*class=["'][^"']*warning-events__txt[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);

      var crit = '';
      var em = seg.match(/<div[^>]*class=["'][^"']*warning-explain[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
      if (em) {
        var cm = em[1].match(/<h4[^>]*>[\s\S]*?<\/h4>\s*<p[^>]*>([\s\S]*?)<\/p>/i);
        if (cm) crit = String(cm[1]).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      }
      var dfn = pk(seg, /<div[^>]*class=["'][^"']*warning-defense__txt[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);

      if (!title && !desc) continue;
      var sev = 'unknown';
      if (/红色|特别重大/.test(title)) sev = 'extreme';
      else if (/橙色|重大/.test(title)) sev = 'severe';
      else if (/黄色|较大/.test(title)) sev = 'moderate';
      else if (/蓝色|一般/.test(title)) sev = 'minor';

      out.push({
        title: title, issued: issued, desc: desc, crit: crit, dfn: dfn,
        severity: sev,
        phenomenon: (title || '').replace(/^.*?发布\s*/, '').replace(/(?:红色|橙色|黄色|蓝色)?预警.*$/, '') || undefined,
      });
    }
    return { location: location, source: source, alerts: out };
  }

  function _meta(blob, o) {
    var hasSrc = !!(o.source && o.source.length), hasLang = !!(o.language && o.language.length);
    var order = hasSrc ? [8, 7, 6, 4, 3, 2, 1, 0] : [8, 7, 4, 3, 2, 1, 0];
    var offs = {}, cur = 8, i;
    for (i = 0; i < order.length; i++) { offs[order[i]] = cur; cur += 4; }
    offs[10] = 7;
    if (!hasLang) delete offs[2];
    var ts = Math.ceil(cur / 4) * 4;
    blob.align4();
    var vt = blob.b.length;
    blob.u16(4 + 2 * 11); blob.u16(ts);
    for (i = 0; i < 11; i++) blob.u16(offs[i] || 0);
    var tb = blob.b.length;
    for (i = 0; i < ts; i++) blob.u8(0);
    blob.u32at(tb, tb - vt);
    blob.u32at(tb + offs[1], _unix(o.issuedTime) >>> 0);
    blob.u32at(tb + offs[3], _fbits(o.latitude));
    blob.u32at(tb + offs[4], _fbits(o.longitude));
    blob.u32at(tb + offs[7], _unix(o.effectiveTime) >>> 0);
    blob.u32at(tb + offs[8], _unix(o.expireTime) >>> 0);
    blob.b[tb + offs[10]] = 3;
    return { tb: tb, offs: offs, hasSrc: hasSrc, hasLang: hasLang };
  }

  function _summary(blob, a) {
    var NF = 26, f = {};
    function S(s, v) { if (v != null && v !== '') f[s] = { k: 's', v: String(v) }; }
    function N(s, v) { if (v != null && v !== 0) f[s] = { k: 'i', v: v | 0 }; }
    function B(s, v) { if (v != null && v !== 0) f[s] = { k: 'b', v: v | 0 }; }
    S(0, a.id); S(1, a.areaId); S(2, a.areaName); S(3, a.attributionUrl); S(4, a.countryCode);
    S(5, a.description);
    N(7, _unix(a.effectiveTime)); N(8, _unix(a.expireTime)); N(9, _unix(a.issuedTime));
    N(10, _unix(a.onsetTime || a.effectiveTime));
    S(12, a.detailsUrl); S(13, a.phenomenon);
    B(14, a.severityCode); B(15, a.significanceCode);
    S(16, a.source); S(17, a.eventSource);
    B(18, a.urgencyCode); B(19, a.certaintyCode); B(20, a.importanceCode);

    var slots = Object.keys(f).map(Number).sort(function (x, y) { return x - y; });
    var cur = 4, offs = {}, u8s = [], bigs = [], i;
    for (i = 0; i < slots.length; i++) (f[slots[i]].k === 'b' ? u8s : bigs).push(slots[i]);
    for (i = 0; i < u8s.length; i++) { offs[u8s[i]] = cur; cur += 1; }
    for (i = 0; i < bigs.length; i++) { offs[bigs[i]] = cur; cur += 4; }
    var ts = cur;
    blob.align4();
    var vt = blob.b.length;
    blob.u16(4 + 2 * NF); blob.u16(ts);
    for (i = 0; i < NF; i++) blob.u16(offs[i] || 0);
    var tb = blob.b.length;
    for (i = 0; i < ts; i++) blob.u8(0);
    blob.u32at(tb, tb - vt);
    for (i = 0; i < slots.length; i++) {
      var s = slots[i], e = f[s], pos = tb + offs[s];
      if (e.k === 'i') blob.u32at(pos, e.v >>> 0);
      else if (e.k === 'b') blob.b[pos] = e.v & 255;
    }
    var strs = [];
    for (i = 0; i < slots.length; i++) {
      var s2 = slots[i];
      if (f[s2].k === 's') strs.push({ off: offs[s2], v: f[s2].v });
    }
    return { tb: tb, strs: strs };
  }

  function buildCollection(alerts, opt) {
    var blob = new Blob(), list = (alerts || []).filter(Boolean);
    var lang = opt.language || 'zh-CN';
    var attr = opt.attributionUrl || 'https://www.12379.cn/';
    var src = opt.source || '国家预警信息发布中心';
    var i;

    blob.u16(10); blob.u16(12); blob.u16(8); blob.u16(0); blob.u16(4);
    var ctb = blob.b.length;
    for (i = 0; i < 12; i++) blob.u8(0);
    blob.u32at(ctb, ctb - 0);

    var meta = _meta(blob, {
      issuedTime: opt.issuedTime || new Date().toISOString(),
      language: lang, latitude: opt.latitude, longitude: opt.longitude,
      source: src, effectiveTime: opt.effectiveTime, expireTime: opt.expireTime
    });
    blob.ref(meta.tb + meta.offs[0], blob.str(attr));
    if (meta.hasLang) blob.ref(meta.tb + meta.offs[2], blob.str(lang));
    if (meta.hasSrc) blob.ref(meta.tb + meta.offs[6], blob.str(src));

    var sums = [];
    for (i = 0; i < list.length; i++) {
      var x = list[i];
      sums.push(_summary(blob, {
        id: x.id, areaId: x.areaId, areaName: x.areaName || opt.areaName,
        attributionUrl: attr, countryCode: opt.countryCode || 'CN',
        description: x.description || x.headline,
        effectiveTime: x.effectiveTime, expireTime: x.expireTime,
        issuedTime: x.issuedTime, onsetTime: x.onsetTime,
        detailsUrl: x.detailsUrl,
        phenomenon: (x.eventType && x.eventType.name) || x.phenomenon,
        severityCode: _sev(x.severity), urgencyCode: _urg(x.urgency), certaintyCode: _cert(x.certainty),
        source: x.senderName || src, eventSource: 'CN'
      }));
    }

    var N = sums.length;
    blob.align4();
    var vec = blob.b.length;
    blob.u32(N * 4);
    var ptr = blob.b.length;
    for (i = 0; i < N; i++) blob.u32(0);
    for (i = 0; i < N; i++) blob.ref(ptr + i * 4, sums[i].tb);

    blob.ref(ctb + 8, meta.tb);
    blob.ref(ctb + 4, vec);

    for (i = 0; i < sums.length; i++) {
      for (var j = 0; j < sums[i].strs.length; j++) {
        var st = sums[i].strs[j];
        blob.ref(sums[i].tb + st.off, blob.str(st.v));
      }
    }
    return { bytes: blob.b, tbpos: ctb, count: N };
  }

  function inject(rawBuf, coll) {
    var add = coll.bytes;
    var out = new Uint8Array(rawBuf.length + add.length);
    out.set(rawBuf, 0);
    out.set(Uint8Array.from(add), rawBuf.length);
    var dv = new DataView(out.buffer);
    var abs = rawBuf.length + coll.tbpos;
    var rootOff = dv.getUint32(0, true);
    var vt = rootOff - dv.getInt32(rootOff, true);
    if ((dv.getUint16(vt, true) - 4) / 2 <= 9) throw new Error('no slot9');
    var off9 = dv.getUint16(vt + 4 + 18, true);
    if (!off9) throw new Error('slot9 empty');
    var f9 = rootOff + off9;
    if (f9 + 4 > out.length) throw new Error('slot9 out of range');
    dv.setUint32(f9, (abs - f9) >>> 0, true);
    return out;
  }

  function appleDetailsUrl(lat, lon, lang, party) {
    return 'https://weatherkit.apple.com/alertDetails/index.html' +
           '?lang=' + encodeURIComponent(lang) +
           '&ids=' + encodeURIComponent(lat + ',' + lon) +
           '&party=' + encodeURIComponent(party);
  }

  function httpGet(u, o) {
    /* 统一返回 {status, text} 形态，兼容 Surge 回调式与 Promise 式 */
    return new Promise(function (resolve, reject) {
      try {
        if (typeof $httpClient !== 'undefined' && $httpClient.get) {
          var done = false;
          /* Surge 的 $httpClient.get(options, callback) 只接受 2 个参数，
             url 和 headers 必须打包进 options */
          var opts = Object.assign({ url: u }, o || {});
          $httpClient.get(opts, function (err, resp, body) {
            if (done) return;
            done = true;
            if (err) { reject(new Error(String(err))); return; }
            var st = 0, txt = '';
            if (resp && typeof resp === 'object') {
              st = (resp.status != null) ? resp.status : (resp.statusCode != null ? resp.statusCode : 200);
            }
            if (typeof body === 'string') txt = body;
            else if (body != null) txt = String(body);
            else if (resp && typeof resp.text === 'function') {
              Promise.resolve(resp.text()).then(function (t) {
                resolve({ status: st || 200, text: String(t) });
              }).catch(reject);
              return;
            } else if (resp && typeof resp.body === 'string') txt = resp.body;
            resolve({ status: st || 200, text: txt });
          });
        } else if (typeof fetch !== 'undefined') {
          fetch(u, o).then(function (r) {
            var st = r.status;
            return Promise.resolve(typeof r.text === 'function' ? r.text() : '').then(function (t) {
              resolve({ status: st, text: String(t) });
            });
          }).catch(reject);
        } else {
          reject(new Error('no http client'));
        }
      } catch (e) { reject(e); }
    });
  }

  function textOf(res) {
    if (!res || typeof res !== 'object') return Promise.resolve({ status: 0, text: '' });
    var st = (res.status != null) ? res.status : (res.statusCode != null ? res.statusCode : 200);
    if (typeof res.text === 'string') return Promise.resolve({ status: st, text: res.text });
    var p = typeof res.text === 'function' ? res.text()
          : (typeof res.body === 'string' ? Promise.resolve(res.body) : Promise.resolve(''));
    return Promise.resolve(p).then(function (t) { return { status: st, text: String(t || '') }; })
      .catch(function () { return { status: 0, text: '' }; });
  }

  /* ============ 钩子 1：天气响应注入预警摘要 ============ */
  globalThis.__alertsRoot = function (body, url, st) {
    return (async function () {
      if (typeof __arg !== 'function') return body;
      var prov = __arg('WeatherAlerts.Provider', 'QWeatherWeb');
      if (prov === 'WeatherKit') return body;
      if (__arg('WeatherAlerts.QWeather.Enable', 'true') === 'false') return body;
      if (!(body instanceof Uint8Array)) return body;

      var ps = url.pathname.split('/').filter(function (x) { return x; });
      if (ps[1] !== 'v3' || ps[2] !== 'weather' || ps.length < 6) return body;
      var lat = parseFloat(ps[4]), lon = parseFloat(ps[5]);
      if (!isFinite(lat) || !isFinite(lon)) return body;

      var host = String(__arg('API.QWeather.Host', 'ny2x8ajpxn.re.qweatherapi.com')).trim();
      var token = String(__arg('API.QWeather.Token', '')).trim();
      var cyTok = String(__arg('API.ColorfulClouds.Token', '')).trim() || 'Y2FpeXVuX25vdGlmeQ==';
      var needQW = (prov === 'QWeather' || prov === 'QWeatherWeb');

      // 读取原生元信息：只在官方预警中心数据上做替换
      var native = readAlertsMeta(body);
      // 官方 v2 逻辑：QWeatherWeb 走 default 分支，不受来源限制
      //              QWeather / ColorfulClouds 仅原生为预警中心数据时替换
      if (prov !== 'QWeatherWeb') {
        if (!native || !isAlertCenter(native.providerName)) {
          console.log('⏭ [天气增强] 预警 · ' + prov + ' 需要预警中心数据（当前：' +
                      ((native && native.providerName) || '未知') + '），跳过');
          return body;
        }
      }

      if (needQW && (!host || !token)) {
        console.log('⏭ [天气增强] 预警 · 和风参数缺失 Host=['+host+'] Token=['+
          (token?('已填('+token.length+'位)'):'空')+']');
        return body;
      }

      var loc = ps[3] || '';
      var lang = /^zh-Hant/i.test(loc) ? 'zh-TW'
               : /^zh-Hans/i.test(loc) ? 'zh-CN'
               : /^zh/i.test(loc) ? 'zh-CN'
               : /^en/i.test(loc) ? 'en-US'
               : loc || 'zh-CN';
      var alerts = [], party = 'QWeather';

      try {
        if (prov === 'QWeather' || prov === 'QWeatherWeb') {
          party = 'QWeather';
          // 优先用原生 detailsUrl 里的地区 ID（官方做法）
          var areaFromNative = native && native.detailsUrl ? parseQWeatherAreaId(native.detailsUrl) : null;
          if (prov === 'QWeatherWeb' && areaFromNative) {
            var isEn2 = String(lang).toLowerCase().indexOf('en') === 0;
            var hp2 = await textOf(await httpGet(
              'https://www.qweather.com' + (isEn2 ? '/en' : '') + '/severe-weather/' + areaFromNative + '.html',
              { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', Accept: 'text/html' } }));
            if (hp2.status === 200) {
              var pg = parseQWeatherPage(hp2.text);
              alerts = pg.alerts.map(function (a) {
                return {
                  id: null, senderName: pg.source, severity: a.severity,
                  effectiveTime: a.issued, expireTime: null, onsetTime: a.issued,
                  headline: a.title, description: a.desc,
                  phenomenon: a.phenomenon, instruction: a.dfn, criteria: a.crit,
                  areaName: pg.location,
                };
              });
            }
          }
          if (!alerts.length) {
            var r1 = await textOf(await httpGet(
              'https://' + host + '/weatheralert/v1/current/' + lat.toFixed(2) + '/' + lon.toFixed(2) +
              '?key=' + encodeURIComponent(token) + '&lang=' + encodeURIComponent(lang),
              { headers: { 'User-Agent': 'curl/8.14.1', Accept: 'application/json' } }));
            if (r1.status === 200) alerts = (JSON.parse(r1.text).alerts) || [];
            else throw new Error('HTTP ' + r1.status);
          }
        } else if (prov === 'ColorfulClouds') {
          party = 'ColorfulClouds';
          var r3 = await textOf(await httpGet(
            'https://singer.caiyunhub.com/v3/cap_alert/location?token=' + encodeURIComponent(cyTok) +
            '&latitude=' + lat.toFixed(4) + '&longitude=' + lon.toFixed(4),
            { headers: { 'User-Agent': 'curl/8.14.1', Accept: 'application/json' } }));
          if (r3.status === 200) {
            var j3 = JSON.parse(r3.text);
            var arr = (j3 && j3.result && j3.result.alert) || [];
            alerts = arr.map(function (a) {
              return {
                id: a.id, senderName: a.source, severity: a.severity,
                effectiveTime: a.startTime, expireTime: a.endTime, onsetTime: a.startTime,
                headline: a.title || a.type, description: a.description, phenomenon: a.type,
              };
            });
          }
        }
      } catch (e) {
        console.log('❌ [天气增强] 预警拉取失败：' + (e && e.message ? e.message : e));
        return body;
      }

      var now = Date.now();
      var det = appleDetailsUrl(lat, lon, lang, party);
      var opt = {
        latitude: lat, longitude: lon, language: lang, countryCode: 'CN',
        attributionUrl: prov === 'ColorfulClouds' ? 'https://www.caiyunapp.com/h5' : 'https://www.12379.cn/',
        source: prov === 'ColorfulClouds' ? '彩云天气' : '国家预警信息发布中心',
        issuedTime: new Date(now).toISOString()
      };

      // 关键：无预警时保持原样，绝不覆盖苹果原生数据
      if (!alerts.length) {
        console.log('⏭ [天气增强] 预警 · 当前无生效预警，保留苹果原生');
        return body;
      }

      for (var k = 0; k < alerts.length; k++) alerts[k].detailsUrl = det;

      var mn = Infinity, mx = 0;
      for (var i2 = 0; i2 < alerts.length; i2++) {
        var s2 = Date.parse(alerts[i2].effectiveTime || alerts[i2].issuedTime || 0) || now;
        var e2 = Date.parse(alerts[i2].expireTime || 0) || (now + 86400000);
        if (s2 < mn) mn = s2;
        if (e2 > mx) mx = e2;
      }
      opt.effectiveTime = new Date(mn).toISOString();
      opt.expireTime = new Date(mx).toISOString();

      try {
        var coll = buildCollection(alerts, opt);
        var out = inject(body, coll);
        console.log('✅ [天气增强] 预警 · 注入 ' + coll.count + ' 条（' + prov + '）');
        return out;
      } catch (e) {
        console.log('❌ [天气增强] 预警编码失败：' + (e && e.message ? e.message : e));
        return body;
      }
    })();
  };

  globalThis.__wk3BuildCollection = buildCollection;
  globalThis.__wk3AppleDetailsUrl = appleDetailsUrl;
})();

/* ============ WK3 预警：详情页请求拦截（http-request） ============ */
/* 拦截 api/v1/weatherAlerts?ids=lat,lon，返回苹果 alertDetails 期望的 JSON */

(function () {
  function arg(k, d) {
    if (typeof __arg === 'function') return __arg(k, d);
    return d;
  }
  function httpGet(u, o) {
    if (typeof $httpClient !== 'undefined' && $httpClient.get) return $httpClient.get(u, o);
    if (typeof fetch !== 'undefined') return fetch(u, o);
    return Promise.reject(new Error('no http client'));
  }
  function textOf(res) {
    var st = res.status != null ? res.status : res.statusCode;
    var p = typeof res.text === 'function' ? res.text()
          : (typeof res.body === 'string' ? Promise.resolve(res.body) : Promise.resolve(''));
    return Promise.resolve(p).then(function (t) { return { status: st, text: String(t) }; });
  }

  function hash32(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return h >>> 0;
  }
  function makeId(seed) {
    var hex = function (n, w) { return (n >>> 0).toString(16).padStart(w, '0').slice(-w); };
    return hex(hash32(seed), 8) + '-' + hex(hash32(seed + '#2') >>> 16, 4) + '-4' +
           hex(hash32(seed + '#2') & 0xfff, 3) + '-a' + hex(hash32(seed + '#3') & 0xfff, 3) +
           '-' + hex(hash32(seed + '#4'), 8);
  }
  function sevOf(t) {
    t = String(t || '');
    if (/红色|特别重大/.test(t)) return 'extreme';
    if (/橙色|重大/.test(t)) return 'severe';
    if (/黄色|较大/.test(t)) return 'moderate';
    if (/蓝色|一般/.test(t)) return 'minor';
    return 'unknown';
  }
  function imp(sev) {
    if (sev === 'extreme' || sev === 'severe') return 'high';
    if (sev === 'minor') return 'low';
    return 'normal';
  }
  function iso(v) {
    if (!v) return undefined;
    var d = new Date(v);
    if (isNaN(d.getTime())) return undefined;
    return d.toISOString().replace(/\.000Z$/, 'Z');
  }

  function parsePage(html) {
    var t = String(html || '');
    function pick(re) {
      var m = t.match(re);
      return m ? String(m[1]).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim() : '';
    }
    var location = pick(/<h1[^>]*class=["'][^"']*c-submenu__location[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i);
    if (!location) {
      location = pick(/<title>([\s\S]*?)<\/title>/i)
        .replace(/\s*(?:severe weather warning|灾害预警|天气预警).*$/i, '').trim();
    }
    var source = pick(/<a[^>]*class=["'][^"']*data-source__txt[^"']*["'][^>]*>([\s\S]*?)<\/a>/i)
      .replace(/^(?:预警数据来源|Warning data source)\s*[:：]\s*/i, '').trim();

    var marks = [], re = /<div[^>]*class=["']([^"']*\bc-city-warning-events\b[^"']*)["'][^>]*>/gi, m;
    while ((m = re.exec(t))) marks.push({ index: m.index, start: m.index + m[0].length });

    var out = [];
    for (var i = 0; i < marks.length; i++) {
      var end = (i + 1 < marks.length) ? marks[i + 1].index : t.length;
      var ai = t.indexOf('<div class="c-city-warning-around">', marks[i].start);
      if (ai !== -1 && ai < end) end = ai;
      var seg = t.slice(marks[i].start, end);
      function pk(re2) {
        var mm = seg.match(re2);
        return mm ? String(mm[1]).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim() : '';
      }
      var title = pk(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
      var issued = pk(/<p[^>]*>\s*((?:Issue\s+date|发布\s*日期)\s*[:：][\s\S]*?)<\/p>/i)
        .replace(/^(?:Issue\s+date|发布\s*日期)\s*[:：]\s*/i, '').trim();
      var desc = pk(/<p[^>]*class=["'][^"']*warning-events__txt[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
      var crit = '';
      var em = seg.match(/<div[^>]*class=["'][^"']*warning-explain[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
      if (em) {
        var cm = em[1].match(/<h4[^>]*>[\s\S]*?<\/h4>\s*<p[^>]*>([\s\S]*?)<\/p>/i);
        if (cm) crit = String(cm[1]).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      }
      var dfn = pk(/<div[^>]*class=["'][^"']*warning-defense__txt[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
      if (!title && !desc) continue;
      out.push({ title: title, issued: issued, desc: desc, crit: crit, dfn: dfn });
    }
    return { location: location, source: source, alerts: out };
  }

  function fromPage(page, ctx) {
    return page.alerts.map(function (a, i) {
      var id = makeId(ctx.identifier + ':' + (a.title || i));
      var sev = sevOf(a.title);
      var msgs = [];
      if (a.desc) msgs.push({ language: ctx.language, text: a.desc });
      if (a.crit) msgs.push({ language: ctx.language, text: '触发条件：' + a.crit });
      if (a.dfn) msgs.push({ language: ctx.language, text: '防御指引：\n' + a.dfn });
      var t = iso(a.issued);
      return {
        id: id, areaName: page.location || ctx.areaName,
        attributionURL: ctx.attributionUrl, certainty: 'unknown',
        countryCode: ctx.countryCode || 'CN',
        description: a.desc || a.title, detailsUrl: '#' + id,
        effectiveTime: t, eventSource: 'CN',
        expireTime: '9999-12-31T23:59:59Z', issuedTime: t,
        importance: imp(sev), messages: msgs, name: 'WeatherAlert',
        phenomenon: (a.title || '').replace(/^.*?发布\s*/, '').replace(/(?:红色|橙色|黄色|蓝色)?预警.*$/, '') || undefined,
        precedence: i, responses: [], severity: sev,
        source: page.source || ctx.source || '', urgency: 'unknown',
      };
    });
  }

  function fromApi(api, ctx) {
    return (api || []).map(function (a, i) {
      var id = makeId(ctx.identifier + ':' + (a.id || i));
      var sev = a.severity || 'unknown';
      var msgs = [];
      if (a.headline) msgs.push({ language: ctx.language, text: a.headline });
      if (a.description && a.description !== a.headline) msgs.push({ language: ctx.language, text: a.description });
      if (a.criteria) msgs.push({ language: ctx.language, text: '触发条件：' + a.criteria });
      if (a.instruction) msgs.push({ language: ctx.language, text: '防御指引：\n' + a.instruction });
      return {
        id: id, areaId: a.areaId, areaName: a.areaName || ctx.areaName,
        attributionURL: ctx.attributionUrl, certainty: a.certainty || 'unknown',
        countryCode: ctx.countryCode || 'CN',
        description: a.headline || a.description || '', detailsUrl: '#' + id,
        effectiveTime: iso(a.effectiveTime || a.issuedTime),
        eventEndTime: iso(a.expireTime),
        eventOnsetTime: iso(a.onsetTime || a.effectiveTime),
        eventSource: 'CN',
        expireTime: iso(a.expireTime) || '9999-12-31T23:59:59Z',
        issuedTime: iso(a.issuedTime || a.effectiveTime),
        importance: imp(sev), messages: msgs, name: 'WeatherAlert',
        phenomenon: (a.eventType && a.eventType.name) || a.phenomenon,
        precedence: i, responses: [], severity: sev,
        source: a.senderName || ctx.source || '', urgency: a.urgency || 'unknown',
      };
    });
  }

  function fromCaiyun(cy, ctx) {
    var arr = (cy && cy.content) || [];
    return arr.map(function (a, i) {
      var id = makeId(ctx.identifier + ':' + (a.id || i));
      var sev = String(a.severity || 'unknown').toLowerCase();
      if (['extreme', 'severe', 'moderate', 'minor'].indexOf(sev) < 0) sev = 'unknown';
      var msgs = [];
      var d = a.description || a.title;
      if (d) msgs.push({ language: ctx.language, text: String(d) });
      return {
        id: id, areaName: a.location || ctx.areaName,
        attributionURL: ctx.attributionUrl, certainty: 'unknown',
        countryCode: ctx.countryCode || 'CN',
        description: String(d || ''), detailsUrl: '#' + id,
        effectiveTime: iso(a.startTime), eventEndTime: iso(a.endTime),
        eventOnsetTime: iso(a.startTime), eventSource: 'CN',
        expireTime: iso(a.endTime) || '9999-12-31T23:59:59Z',
        issuedTime: iso(a.startTime), importance: imp(sev),
        messages: msgs, name: 'WeatherAlert',
        phenomenon: a.type || a.title, precedence: i, responses: [],
        severity: sev, source: ctx.source || '彩云天气', urgency: 'unknown',
      };
    });
  }

  /* ---------- 主处理 ---------- */
  globalThis.__alertsDetailsRequest = function (url) {
    return (async function () {
      var u = new URL(url);
      if (u.hostname !== 'weatherkit.apple.com') return null;
      if (u.pathname !== '/api/v1/weatherAlerts') return null;

      var ids = (u.searchParams.get('ids') || '').trim();
      if (!ids) return null;

      var prov = arg('WeatherAlerts.Provider', 'QWeatherWeb');
      if (prov === 'WeatherKit') return null;

      var lang = (u.searchParams.get('lang') || 'zh-CN');
      var host = String(arg('API.QWeather.Host', '')).trim();
      var token = String(arg('API.QWeather.Token', '')).trim();
      var cyTok = String(arg('API.ColorfulClouds.Token', '')).trim() || 'Y2FpeXVuX25vdGlmeQ==';

      var ctx = {
        identifier: ids, language: lang, countryCode: 'CN',
        attributionUrl: prov === 'ColorfulClouds' ? 'https://www.caiyunapp.com/h5' : 'https://www.12379.cn/',
        source: prov === 'ColorfulClouds' ? '彩云天气' : '国家预警信息发布中心',
      };

      var alerts = [];
      var m = ids.match(/^(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$/);

      try {
        if (m) {
          var lat = parseFloat(m[1]), lon = parseFloat(m[2]);

          if (prov === 'ColorfulClouds') {
            var r1 = await textOf(await httpGet(
              'https://singer.caiyunhub.com/v3/cap_alert/location?token=' + encodeURIComponent(cyTok) +
              '&latitude=' + lat.toFixed(4) + '&longitude=' + lon.toFixed(4),
              { headers: { 'User-Agent': 'curl/8.14.1' } }));
            if (r1.status === 200) {
              var j1 = JSON.parse(r1.text);
              alerts = fromCaiyun({ content: (j1 && j1.result && j1.result.alert) || [] }, ctx);
            }
          } else if (prov === 'QWeather') {
            var r2 = await textOf(await httpGet(
              'https://' + host + '/weatheralert/v1/current/' + lat.toFixed(2) + '/' + lon.toFixed(2) +
              '?key=' + encodeURIComponent(token) + '&lang=' + lang,
              { headers: { 'User-Agent': 'curl/8.14.1' } }));
            if (r2.status === 200) alerts = fromApi(JSON.parse(r2.text).alerts || [], ctx);
          } else if (prov === 'QWeatherWeb') {
            // 先反查地区 ID，再抓网页（含防御指引）
            var areaId = null;
            try {
              var g = await textOf(await httpGet(
                'https://' + host + '/geo/v2/city/lookup?location=' + lon.toFixed(2) + ',' + lat.toFixed(2) +
                '&key=' + encodeURIComponent(token),
                { headers: { 'User-Agent': 'curl/8.14.1' } }));
              if (g.status === 200) {
                var gj = JSON.parse(g.text);
                if (gj && gj.code === '200' && gj.location && gj.location[0]) areaId = gj.location[0].id;
              }
            } catch (_) {}

            if (areaId) {
              var isEn = String(lang).toLowerCase().indexOf('en') === 0;
              var hp = await textOf(await httpGet(
                'https://www.qweather.com' + (isEn ? '/en' : '') + '/severe-weather/' + areaId + '.html',
                { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', Accept: 'text/html' } }));
              if (hp.status === 200) {
                alerts = fromPage(parsePage(hp.text), ctx);
              }
            }
            // 网页失败则退回 API
            if (!alerts.length && host && token) {
              try {
                var r3 = await textOf(await httpGet(
                  'https://' + host + '/weatheralert/v1/current/' + lat.toFixed(2) + '/' + lon.toFixed(2) +
                  '?key=' + encodeURIComponent(token) + '&lang=' + lang,
                  { headers: { 'User-Agent': 'curl/8.14.1' } }));
                if (r3.status === 200) alerts = fromApi(JSON.parse(r3.text).alerts || [], ctx);
              } catch (_) {}
            }
          }
        }
      } catch (e) {
        return { status: 200, statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'max-age=0', 'Content-Type': 'application/json' },
          body: '[]' };
      }

      return {
        status: 200, statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'max-age=0',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alerts),
      };
    })();
  };
})();

async function __aqRoot(body,url,st){
  try{
    if(!(body instanceof Uint8Array)) return body;
    var ps=url.pathname.split('/').filter(function(x){return x});
    if(ps[1]!=="v3"||ps[2]!=="weather"||ps.length<6) return body;
    var lat=ps[4],lon=ps[5];
    var __prov=__arg("AirQuality.Current.Index.Provider","Calculate");
    // WeatherKit = 不替换，保留苹果原生（和风实测站）数据
    if(__prov==="WeatherKit") return body;
    // Calculate = 用原生污染物浓度本地算指数（数据真实，标准可换）
    if(__prov==="Calculate"){
      var __nr=__aqCalcNative(body);
      return __nr||body;
    }
    // 未填彩云令牌时不碰空气质量，避免用公共令牌的固定假值覆盖真实数据
    var __tok=String(__arg("API.ColorfulClouds.Token","")).trim();
    if(__prov.indexOf("ColorfulClouds")===0 && !__tok){
      console.log("⏭ [天气增强] 空气质量 · 未填彩云令牌，保留苹果原生数据");
      return body;
    }
    var __us=__prov.indexOf("US")>=0;
    var cn=null, __pm=null;
    if(__prov==="QWeather"){
      var __q=await __qwAq(lat,lon);
      if(!__q){ console.log("⚠️ [天气增强] 空气质量(和风) · 获取失败，跳过注入"); return body; }
      cn=__us?(__q.usa!=null?__q.usa:__q.chn):__q.chn;
      __pm={6:__q.pm.no2,9:__q.pm.pm25,10:__q.pm.so2,11:__q.pm.pm10,8:__q.pm.o3,12:__q.pm.co};
    }else if(__prov==="WAQI"){
      var __w=await __waqi(lat,lon);
      if(!__w){ console.log("⚠️ [天气增强] 空气质量(WAQI) · 获取失败，跳过注入"); return body; }
      cn=__w.index; __us=true;
      __pm={6:__w.pm.no2,9:__w.pm.pm25,10:__w.pm.so2,11:__w.pm.pm10,8:__w.pm.o3,12:__w.pm.co};
      console.log("✅ [天气增强] 空气质量(WAQI) · index "+cn);
    }else{
      var jj=await __rt(lat,lon);
      var rt=jj&&jj.result&&jj.result.realtime; var aq=rt&&rt.air_quality;
      if(!aq||!aq.aqi||typeof aq.aqi.chn!=="number"){ console.log("⚠️ [天气增强] 空气质量 · 彩云无数据，跳过注入"); return body; }
      cn=__us?(aq.aqi.usa!=null?aq.aqi.usa:aq.aqi.chn):aq.aqi.chn;
      __pm={6:aq.no2,9:aq.pm25,10:aq.so2,11:aq.pm10,8:aq.o3,12:aq.co};
    }
    if(__prov==="Calculate"){
      var __alg=__arg("AirQuality.Calculate.Algorithm","WAQI_InstantCast_CN");
      var __pmv={pm25:__pm[9],pm10:__pm[11],o3:__pm[8],no2:__pm[6],so2:__pm[10],co:__pm[12]};
      var __r=(typeof __AQHI!=="undefined"&&__AQHI[__alg])?__aqhiCalc(__pmv,__alg):__algoCalc(__pmv,__alg);
      if(!__r){ console.log("⚠️ [天气增强] 空气质量 · 算法 "+__alg+" 计算失败或未实现，跳过注入"); return body; }
      cn=__r.index; __us=(__alg.indexOf("US")>=0||__alg.indexOf("EPA")>=0);
      console.log("✅ [天气增强] 空气质量 · 本地计算 "+__alg+" index "+__r.index+" · 等级 "+__r.cat+" · 首要污染物 "+__r.primary);
    }
    var __over=String(__arg("AirQuality.Calculate.AllowOverRange","true"))!=="false";
    if(typeof cn!=="number"||!isFinite(cn)||cn<0) return body;
    if(cn>500){ if(__over){ if(cn>999) cn=999; console.log("ℹ️ [天气增强] 空气质量 · 指数 "+cn+" 超量程，已保留"); } else { cn=500; console.log("ℹ️ [天气增强] 空气质量 · 指数超量程，按设置截断为 500"); } }

    var cat=cn<=50?1:cn<=100?2:cn<=150?3:cn<=200?4:cn<=300?5:6;
    var sig=cat>=3?1:0;
    var N=body.length; var s0=new Uint8Array(N); for(var q=0;q<N;q++) s0[q]=body[q];
    var v=new DataView(s0.buffer);
    var tr=v.getUint32(0,true); if(tr<=0||tr+4>N) return body;
    var trvt=tr-v.getInt32(tr,true); if(trvt<0||trvt+8>N) return body;
    var tvs=v.getUint16(trvt,true), tts=v.getUint16(trvt+2,true);
    if(tvs<6||tts<4||trvt+tvs>N) return body;
    if(v.getUint16(trvt+4,true)!==0){ console.log("⏭ [天气增强] 空气质量 · 已有数据表，跳过注入"); return body; }
    var nslots=(tvs-4)/2;
    var V=4, R=(V+tvs+3)&~3, REND=R+tts+4;
    var A1=(REND+7)&~7;
    var A2b=A1+N, A2=A2b+(((4-A2b%8)%8)+8)%8;
    var BLKLEN=464;
    /* 原生没有 AQ 表时不注入（保留原样），不做整包重建，避免破坏其它槽位 */
    console.log("⏭ [天气增强] 空气质量 · 原生无数据表，保持为空");
    return body;
  }catch(e){ console.log("⚠️ [天气增强] 空气质量异常："+(e&&e.message)); return body; }
}

// === 提取自官方 bundle 的 FlatBuffers Builder ===
// 用标准 Builder 构建 WK3 nextHour 子树



function __perc(t){
  if(!(t>0)) return 0;
  if(t<=0.08) return 0;
  if(t<=3.44) return Math.min(1,(t-0.08)/(3.44-0.08));
  if(t<=11.33) return 1+Math.min(1,(t-3.44)/(11.33-3.44));
  if(t<=51.3) return 2+Math.min(1,(t-11.33)/(51.3-11.33));
  return 3;
}
function __lv(t){
  if(!(t>0.08)) return 1;
  if(t<=3.44) return 8;
  return 7;
}
function __sumCond(t){ return (!(t>0.08))?1:2; }
function __nhSegs(G, base, cnt){
  var end = base + 60*cnt;
  var out=[];
  function S(tk, st, ed, pm){
    var lvl = (tk===1) ? 1 : 8;
    return {token:tk, begin:lvl, endCond:lvl, start:st, endTime:(ed||0), params:(pm||[])};
  }
  function lvlOf(t){ return (t<=0.08)?1:(t<=3.44?8:7); }
  var pat = G.map(function(x){return x.clear?"t":"f";}).join("|");
  var g0=G[0]||{}, g1=G[1]||{}, g2=G[2]||{}, g3=G[3]||{};
  switch(pat){
    case "t":
      return [S(1, base, 0)];
    case "f": {
      var lv=lvlOf(g0.inten);
      return [{token:6, begin:lv, endCond:lv, start:base, endTime:0, params:[]}];
    }
    case "t|f": {
      var pmA=[];
      if(g1.end < end) pmA.push({type:1, date:g1.end});
      var lvA=lvlOf(g1.inten);
      return [
        {token:2, begin:lvA, endCond:lvA, start:base, endTime:0, params:pmA},
        {token:6, begin:lvA, endCond:lvA, start:g1.start, endTime:0, params:[]}
      ];
    }
    case "f|t": {
      var lvB=lvlOf(g0.inten);
      return [
        {token:3, begin:lvB, endCond:lvB, start:base, endTime:g1.start, params:[{type:1, date:g1.start}]},
        S(1, g1.start, 0)
      ];
    }
    case "f|t|f": {
      var lvC=lvlOf(g0.inten), lvC2=lvlOf(g2.inten);
      return [
        {token:5, begin:lvC, endCond:lvC, start:base, endTime:g1.end, params:[{type:1,date:g1.end},{type:2,date:g2.start}]},
        {token:2, begin:lvC2, endCond:lvC2, start:g1.end, endTime:0, params:[{type:1,date:g2.end}]},
        {token:6, begin:lvC2, endCond:lvC2, start:g2.start, endTime:0, params:[]}
      ];
    }
    case "t|f|t|f": {
      var lvD=lvlOf(g1.inten), lvD2=lvlOf(g3.inten);
      return [
        {token:4, begin:lvD, endCond:lvD, start:base, endTime:g1.end, params:[{type:1,date:g1.end},{type:2,date:g2.start}]},
        {token:5, begin:lvD, endCond:lvD, start:g1.end, endTime:g2.end, params:[{type:1,date:g2.end},{type:2,date:g3.start}]},
        {token:2, begin:lvD2, endCond:lvD2, start:g2.end, endTime:0, params:[{type:1,date:g3.end}]},
        {token:6, begin:lvD2, endCond:lvD2, start:g3.start, endTime:0, params:[]}
      ];
    }
    default: {
      var lvE=lvlOf(g0.inten);
      return [{token:6, begin:lvE, endCond:lvE, start:base, endTime:0, params:[]}];
    }
  }
}

async function __nhFetchMin(lat,lon){
  try{
    var host=String(__arg('API.QWeather.Host','ny2x8ajpxn.re.qweatherapi.com')).trim();
    var tok=String(__arg('API.QWeather.Token','')).trim();
    if(!host||!tok){
      console.log('⚠️ [天气增强] 和风参数缺失 · Host=['+host+'] Token=['+
        (tok?('已填('+tok.length+'位)'):'空')+']');
      return null;
    }
    var u='https://'+host+'/v7/minutely/5m?location='+lon+','+lat+'&key='+encodeURIComponent(tok);
    var r=await new Promise(function(res,rej){
      $httpClient.get({url:u,headers:{'User-Agent':'curl/8.14.1'}},function(e,rp,b){ if(e) rej(e); else res(b); });
    });
    var j=JSON.parse(typeof r==='string'?r:String(r));
    if(!j||j.code!=='200'||!Array.isArray(j.minutely)) return null;
    /* 和风返回 5 分钟降水量(mm)，×12 得 mm/h；展开成 1 分钟粒度 */
    var out=[];
    for(var i=0;i<j.minutely.length;i++){
      var m=j.minutely[i];
      var mm5=parseFloat(m.precip)||0;
      var mmh=mm5*12;
      var t0=Math.floor(new Date(m.fxTime).getTime()/1000);
      for(var k=0;k<5;k++) out.push({t:t0+k*60, mmh:mmh, type:m.type||'rain'});
    }
    return {minutes:out, summary:j.summary||'', description:j.summary||''};
  }catch(e){ console.log('⚠️ [天气增强] 和风分钟降水失败：'+(e&&e.message||e)); return null; }
}

/* ============ 构建 forecastNextHour 子树 + 挂载到根表 ============ */

/* 极简 FlatBuffers 写入器（只支持本次需要的表/字符串/向量） */
function __fbw() {
  this.b = [];
  this.tail = [];
}
__fbw.prototype.len = function(){ return this.b.length; };
__fbw.prototype.pad = function(n){ while(this.b.length % n) this.b.push(0); };
__fbw.prototype.u8  = function(v){ this.b.push(v & 255); };
__fbw.prototype.u16 = function(v){ this.b.push(v & 255, (v>>>8) & 255); };
__fbw.prototype.i32 = function(v){ this.b.push(v & 255,(v>>>8)&255,(v>>>16)&255,(v>>>24)&255); };
__fbw.prototype.f32 = function(v){
  var dv=new DataView(new ArrayBuffer(4)); dv.setFloat32(0, Number(v)||0, true);
  for(var i=0;i<4;i++) this.b.push(dv.getUint8(i));
};
/* 表：fields = [{slot, kind, val}]  kind: 'u32'|'i8'|'f32'|'ref' */
__fbw.prototype.table = function(tsize, fields){
  var nf=1, i;
  for(i=0;i<fields.length;i++) if(fields[i].slot+1>nf) nf=fields[i].slot+1;
  var vs=4+2*nf;
  var cur=4, offs={};
  /* u8/i8 字段紧贴表头，其余 4 字节 */
  /* 对齐苹果布局：slot 越大偏移越大（slot0 在表尾、末尾 slot 在表头附近） */
  /* 过滤空值字段：slot 存在但值为 0/null 时不占表体空间（对齐苹果） */
  var small=[], big=[];
  for(i=0;i<fields.length;i++){
    var f0=fields[i];
    if(f0.kind!=='ref' && (f0.val===0 || f0.val===null || f0.val===undefined)) continue;
    (f0.kind==='i8'?small:big).push(f0);
  }
  /* 小字段（i8）放在最靠近表头 */
  /* 对齐苹果：int8 固定偏移 7，4字节字段从 8 开始按 slot 降序 */
  small.sort(function(a,b){return a.slot-b.slot;});
  big.sort(function(a,b){return b.slot-a.slot;});
  if(small.length){
    for(i=0;i<small.length;i++){ offs[small[i].slot]=7; }
    cur=8;
  }
  for(i=0;i<big.length;i++){ offs[big[i].slot]=cur; cur+=4; }
  var realTs=cur;

  this.pad(4);
  var vtPos=this.b.length;
  this.u16(vs); this.u16(realTs);
  for(i=0;i<nf;i++) this.u16(offs[i]||0);
  var tb=this.b.length;
  for(i=0;i<realTs;i++) this.b.push(0);
  this.__setI32(tb, tb-vtPos);

  for(i=0;i<fields.length;i++){
    var f=fields[i], off=offs[f.slot];
    if(!off) continue;
    var p=tb+off;
    if(f.kind==='u32') this.__setI32(p, f.val>>>0);
    else if(f.kind==='i8') this.b[p]=f.val & 255;
    else if(f.kind==='f32'){
      var dv=new DataView(new ArrayBuffer(4)); dv.setFloat32(0, Number(f.val)||0, true);
      for(var q=0;q<4;q++) this.b[p+q]=dv.getUint8(q);
    }
    /* ref 由调用方用 w.ref() 回填，此处不写 */
  }
  return { tb: tb, offs: offs, ts: realTs };
};
__fbw.prototype.__setI32 = function(p,v){
  this.b[p]=v&255; this.b[p+1]=(v>>>8)&255; this.b[p+2]=(v>>>16)&255; this.b[p+3]=(v>>>24)&255;
};
__fbw.prototype.str = function(s){
  var e=[]; s=String(s);
  for(var i=0;i<s.length;i++){
    var c=s.charCodeAt(i);
    if(c<0x80) e.push(c);
    else if(c<0x800) e.push(0xC0|(c>>6), 0x80|(c&63));
    else if(c>=0xD800&&c<=0xDBFF){
      var c2=s.charCodeAt(++i), cp=0x10000+((c-0xD800)<<10)+(c2-0xDC00);
      e.push(0xF0|(cp>>18),0x80|((cp>>12)&63),0x80|((cp>>6)&63),0x80|(cp&63));
    } else e.push(0xE0|(c>>12),0x80|((c>>6)&63),0x80|(c&63));
  }
  this.pad(4);
  var p=this.b.length;
  this.i32(e.length);
  for(var k=0;k<e.length;k++) this.b.push(e[k]);
  this.b.push(0);
  return p;
};
__fbw.prototype.ref = function(at, target){ this.__setI32(at, (target-at)>>>0); };

/* 感知强度 0-3 */
function __nhPerc(mmh){
  var x=Number(mmh)||0;
  if(!(x>0)) return 0;
  if(x<=0.08) return 0;
  if(x<=3.44) return Math.min(1,(x-0.08)/3.36);
  if(x<=11.33) return 1+Math.min(1,(x-3.44)/7.89);
  if(x<=51.33) return 2+Math.min(1,(x-11.33)/39.97);
  return 3;
}

/* 感知强度 → condition 枚举 */
function __nhCond(p, isSnow){
  if(p>2) return isSnow?9:5;
  if(p>1) return isSnow?10:6;
  if(p>0.1) return isSnow?10:7;
  if(p>0) return isSnow?10:8;
  return 0;
}

/**
 * 构建完整的 forecastNextHour 子树
 * 结构（实测）：[24,20,16,12,8,4] = metadata, condition, summary, forecastStart, forecastEnd, minutes
 * condition 表: [16,12,11,10,9,4] = startTime,endTime,token(int8),begin(int8),end(int8),params
 * summary 表:  [12,8,4] = startTime, endTime, condition(int8)
 * minute 表:   [12,11,4] = startTime, chance(int8), perceived(f32)
 */
function __nhBuildNextHour(mn, lat, lon){
  try{
    var pts=mn.minutes;
    if(!pts || !pts.length) return null;
    var n=Math.min(pts.length, 144);
    var start=pts[0].t;
    var w=new __fbw();

    /* 分段 */
    var segs=[];
    for(var m=0;m<n;m++){
      var c=__nhCond(__nhPerc(pts[m].mmh), false);
      var clr=(c===0);
      if(!segs.length || segs[segs.length-1].clear!==clr){
        segs.push({clear:clr, start:pts[m].t, end:0, cond:c});
      } else {
        segs[segs.length-1].end=pts[m].t;
        if(!clr && c<segs[segs.length-1].cond) segs[segs.length-1].cond=c;
      }
    }
    if(segs.length) segs[segs.length-1].end=start+60*n;

    /* 1) 字符串 */
    var sAttr=w.str('https://www.qweather.com');
    var sLang=w.str('zh-CN');
    var sLogo=w.str('https://raw.githubusercontent.com/NSRingo/WeatherKit/main/images/icon/v2/QWeather.png');
    var sName=w.str('和风天气');

    /* 2) minutes 表 */
    var minTb=[];
    for(var k=0;k<n;k++){
      var t=w.table(16,[
        {slot:0, kind:'u32', val:pts[k].t},
        {slot:1, kind:'i8',  val:(pts[k].mmh>0?70:0)},
        {slot:2, kind:'f32', val:__nhPerc(pts[k].mmh)}
      ]);
      minTb.push(t.tb);
    }
    /* 3) condition 表 */
    var condTb=[];
    for(var g=0;g<segs.length;g++){
      var a1=segs[g], b1=segs[g+1], c1=segs[g+2];
      var tok, beg, endc;
      if(a1.clear){
        if(b1){ tok=(c1?3:1); beg=b1.cond; endc=b1.cond; }
        else { tok=0; beg=a1.cond; endc=a1.cond; }
      } else {
        if(b1){ tok=(c1?4:2); beg=a1.cond; endc=(c1?c1.cond:a1.cond); }
        else { tok=5; beg=a1.cond; endc=a1.cond; }
      }
      var ct=w.table(20,[
        {slot:0, kind:'u32', val:a1.start},
        {slot:1, kind:'u32', val:a1.end||0},
        {slot:2, kind:'i8',  val:tok},
        {slot:3, kind:'i8',  val:beg},
        {slot:4, kind:'i8',  val:endc}
      ]);
      condTb.push(ct.tb);
    }
    /* 4) summary 表 */
    var sumTb=[];
    for(var q=0;q<segs.length;q++){
      var st=w.table(12,[
        {slot:0, kind:'u32', val:segs[q].start},
        {slot:1, kind:'u32', val:segs[q].end||0},
        {slot:2, kind:'i8',  val:segs[q].cond}
      ]);
      sumTb.push(st.tb);
    }
    /* 5) metadata 表 */
    var meta=w.table(44, [
      {slot:0, kind:'ref', val:sAttr},
      {slot:1, kind:'u32', val:(start+3600)},
      /* slot2 language 苹果原生为空，跳过 */
      {slot:3, kind:'f32', val:parseFloat(lat)},
      {slot:4, kind:'f32', val:parseFloat(lon)},
      /* slot5 providerLogo 苹果原生为空，跳过 */
      {slot:6, kind:'ref', val:sName},
      {slot:7, kind:'u32', val:start},
      {slot:8, kind:'u32', val:start},
      {slot:9, kind:'i8',  val:0},
      {slot:10,kind:'i8',  val:1}
    ]);
    w.ref(meta.tb+meta.offs[0], sAttr);
    if(meta.offs[2]) w.ref(meta.tb+meta.offs[2], sLang);
    if(meta.offs[5]) w.ref(meta.tb+meta.offs[5], sLogo);
    w.ref(meta.tb+meta.offs[6], sName);

    /* 6) 三个向量（在主表之前） */
    /* 返回向量起点（长度前缀位置），flatbuffer 引用指向这里 */
    function vecOf(list){
      w.pad(4);
      var head=w.b.length;
      w.i32(list.length);   /* 元素数，不是字节数 */
      var elem=w.b.length;
      for(var i=0;i<list.length;i++) w.i32(0);
      for(var i2=0;i2<list.length;i2++) w.ref(elem+i2*4, list[i2]);
      return head;
    }
    var vMin=vecOf(minTb);
    var vCond=vecOf(condTb);
    var vSum=vecOf(sumTb);

    /* 7) 主表（最后写，所有引用都是正向） */
    var nh=w.table(28,[
      {slot:0, kind:'ref', val:meta.tb},
      {slot:1, kind:'ref', val:vCond},
      {slot:2, kind:'ref', val:vSum},
      {slot:3, kind:'u32', val:start},
      {slot:4, kind:'u32', val:start+60*n},
      {slot:5, kind:'ref', val:vMin}
    ]);
    w.ref(nh.tb+nh.offs[0], meta.tb);
    w.ref(nh.tb+nh.offs[1], vCond);
    w.ref(nh.tb+nh.offs[2], vSum);
    w.ref(nh.tb+nh.offs[5], vMin);

    return { buf: w.b, tblOff: nh.tb };
  }catch(e){
    console.log('⚠️ 构建 nextHour 失败: '+(e&&e.message||e));
    return null;
  }
}

/**
 * 把子树挂到根表 slot5
 * 做法：原响应 + 子树 拼在一起，重建根表（vtable 加一项、表体加 4 字节）
 */
function __nhAttach(body, sub, subTblOff){
  try{
    var raw=body;
    var N=raw.length;
    var v=new DataView(raw.buffer, raw.byteOffset, raw.byteLength);
    var tr=v.getUint32(0,true);
    var so=v.getInt32(tr,true);
    var trvt=tr-so;
    var vs=v.getUint16(trvt,true), ts=v.getUint16(trvt+2,true);
    var nf=(vs-4)/2;
    var offs=[];
    for(var i=0;i<nf;i++) offs.push(v.getUint16(trvt+4+2*i,true));

    /* 结构校验：宁可不改，也不能撕裂响应 */
    if(vs < 4 || vs > 200 || ts < 4 || ts > 200 || trvt < 4 || trvt + vs > N) {
      throw new Error('根表结构异常 vs='+vs+' ts='+ts+' vt='+trvt+' len='+N);
    }
    for(var vi=0; vi<(vs-4)/2; vi++){
      var vo = v.getUint16(trvt+4+2*vi, true);
      if(vo && (vo + 4 > ts)) throw new Error('slot'+vi+' 偏移越界 off='+vo+' ts='+ts);
    }

    /* ---- 路径 A：vtable 已含 slot5 项（值为0），表体也预留了 4 字节 ----
       直接写那 4 字节，完全不动结构，最安全 */
    if(nf > 5){
      var slot5Off = offs[5];
      if(slot5Off && slot5Off + 4 <= ts){
        console.log('ℹ️ [天气增强] 分钟降水 · 路径A 原地挂载 (slot5off='+slot5Off+')');
        var outA = new Uint8Array(N + sub.length);
        outA.set(raw, 0);
        outA.set(Uint8Array.from(sub), N);
        var vA = new DataView(outA.buffer);
        var fieldPos = tr + slot5Off;
        var subAbs = N + subTblOff;
        vA.setUint32(fieldPos, (subAbs - fieldPos) >>> 0, true);
        return outA;
      }
    }

    console.log('ℹ️ [天气增强] 分钟降水 · 路径B 重建根表 (vs='+vs+' ts='+ts+' slot5='+offs[5]+')');
    /* ---- 路径 B：需要扩 vtable / 表体 ---- */
    /* 新布局：[根指针 4B][新vtable][新表体][原响应][子树]
       flatbuffer 根指针占 0..3，vtable 必须从 4 开始 */
    /* 槽数必须覆盖到 slot5（索引 5） */
    var newNf = Math.max(nf, 6);
    var newVs = 4 + 2*newNf;
    var newTs = ts + 4;
    var nvt=4;                         /* vtable 起点 */
    var ntb=nvt+newVs;                 /* 新表体起点 */
    var head=ntb+newTs;
    var base=head;
    var out=new Uint8Array(head+N+sub.length);
    var o=new DataView(out.buffer);

    /* 新 vtable */
    o.setUint16(nvt,newVs,true);
    o.setUint16(nvt+2,newTs,true);
    for(var s=0;s<newNf;s++) o.setUint16(nvt+4+2*s, (s<nf?offs[s]:0), true);
    o.setUint16(nvt+4+2*5, ts, true);  /* slot5 放在新表体末尾 */

    /* 新表体：拷原表体（跳 so 4 字节） */
    var oldRootData=raw.subarray(tr+4, tr+ts);
    out.set(oldRootData, ntb+4);
    o.setInt32(ntb, ntb-nvt, true);

    /* 根指针 */
    o.setUint32(0, ntb, true);

    /* 拷贝原响应整个 */
    out.set(raw, base);

    /* 修正新表体里所有 child 引用：原偏移 → base+原child */
    for(var s2=0;s2<nf;s2++){
      if(s2===5) continue;
      var of=offs[s2]; if(!of) continue;
      var oldFieldPos=tr+of;
      var childOld=oldFieldPos+v.getUint32(oldFieldPos,true);
      var newFieldPos=ntb+of;
      o.setUint32(newFieldPos, (base+childOld)-newFieldPos, true);
    }

    /* slot5 指向子树 */
    var subAbs=base+N+subTblOff;
    o.setUint32(ntb+ts, subAbs-(ntb+ts), true);

    /* 拷贝子树 */
    out.set(sub, base+N);

    return out;
  }catch(e){
    console.log('⚠️ 挂载 nextHour 失败: '+(e&&e.message||e));
    return null;
  }
}


/* ===== NextHour 模块（移植自 iRingo WeatherKit dev：flatbuffers 运行时 + 生成表 + 编解码）===== */
const __NHM = (function(){
/* NextHour module: generated from iRingo WeatherKit dev (flatbuffers runtime + tables + codec) */
const SIZEOF_SHORT = 2;
const SIZEOF_INT = 4;
const FILE_IDENTIFIER_LENGTH = 4;
const SIZE_PREFIX_LENGTH = 4;

const int32 = new Int32Array(2);
const float32 = new Float32Array(int32.buffer);
const float64 = new Float64Array(int32.buffer);
const isLittleEndian = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;

var Encoding;
(function (Encoding) {
    Encoding[Encoding["UTF8_BYTES"] = 1] = "UTF8_BYTES";
    Encoding[Encoding["UTF16_STRING"] = 2] = "UTF16_STRING";
})(Encoding || (Encoding = {}));

class ByteBuffer {
    /**
     * Create a new ByteBuffer with a given array of bytes (`Uint8Array`)
     */
    constructor(bytes_) {
        this.bytes_ = bytes_;
        this.position_ = 0;
        this.text_decoder_ = new TextDecoder();
    }
    /**
     * Create and allocate a new ByteBuffer with a given size.
     */
    static allocate(byte_size) {
        return new ByteBuffer(new Uint8Array(byte_size));
    }
    clear() {
        this.position_ = 0;
    }
    /**
     * Get the underlying `Uint8Array`.
     */
    bytes() {
        return this.bytes_;
    }
    /**
     * Get the buffer's position.
     */
    position() {
        return this.position_;
    }
    /**
     * Set the buffer's position.
     */
    setPosition(position) {
        this.position_ = position;
    }
    /**
     * Get the buffer's capacity.
     */
    capacity() {
        return this.bytes_.length;
    }
    readInt8(offset) {
        return this.readUint8(offset) << 24 >> 24;
    }
    readUint8(offset) {
        return this.bytes_[offset];
    }
    readInt16(offset) {
        return this.readUint16(offset) << 16 >> 16;
    }
    readUint16(offset) {
        return this.bytes_[offset] | this.bytes_[offset + 1] << 8;
    }
    readInt32(offset) {
        return this.bytes_[offset] | this.bytes_[offset + 1] << 8 | this.bytes_[offset + 2] << 16 | this.bytes_[offset + 3] << 24;
    }
    readUint32(offset) {
        return this.readInt32(offset) >>> 0;
    }
    readInt64(offset) {
        return BigInt.asIntN(64, BigInt(this.readUint32(offset)) + (BigInt(this.readUint32(offset + 4)) << BigInt(32)));
    }
    readUint64(offset) {
        return BigInt.asUintN(64, BigInt(this.readUint32(offset)) + (BigInt(this.readUint32(offset + 4)) << BigInt(32)));
    }
    readFloat32(offset) {
        int32[0] = this.readInt32(offset);
        return float32[0];
    }
    readFloat64(offset) {
        int32[isLittleEndian ? 0 : 1] = this.readInt32(offset);
        int32[isLittleEndian ? 1 : 0] = this.readInt32(offset + 4);
        return float64[0];
    }
    writeInt8(offset, value) {
        this.bytes_[offset] = value;
    }
    writeUint8(offset, value) {
        this.bytes_[offset] = value;
    }
    writeInt16(offset, value) {
        this.bytes_[offset] = value;
        this.bytes_[offset + 1] = value >> 8;
    }
    writeUint16(offset, value) {
        this.bytes_[offset] = value;
        this.bytes_[offset + 1] = value >> 8;
    }
    writeInt32(offset, value) {
        this.bytes_[offset] = value;
        this.bytes_[offset + 1] = value >> 8;
        this.bytes_[offset + 2] = value >> 16;
        this.bytes_[offset + 3] = value >> 24;
    }
    writeUint32(offset, value) {
        this.bytes_[offset] = value;
        this.bytes_[offset + 1] = value >> 8;
        this.bytes_[offset + 2] = value >> 16;
        this.bytes_[offset + 3] = value >> 24;
    }
    writeInt64(offset, value) {
        this.writeInt32(offset, Number(BigInt.asIntN(32, value)));
        this.writeInt32(offset + 4, Number(BigInt.asIntN(32, value >> BigInt(32))));
    }
    writeUint64(offset, value) {
        this.writeUint32(offset, Number(BigInt.asUintN(32, value)));
        this.writeUint32(offset + 4, Number(BigInt.asUintN(32, value >> BigInt(32))));
    }
    writeFloat32(offset, value) {
        float32[0] = value;
        this.writeInt32(offset, int32[0]);
    }
    writeFloat64(offset, value) {
        float64[0] = value;
        this.writeInt32(offset, int32[isLittleEndian ? 0 : 1]);
        this.writeInt32(offset + 4, int32[isLittleEndian ? 1 : 0]);
    }
    /**
     * Return the file identifier.   Behavior is undefined for FlatBuffers whose
     * schema does not include a file_identifier (likely points at padding or the
     * start of a the root vtable).
     */
    getBufferIdentifier() {
        if (this.bytes_.length < this.position_ + SIZEOF_INT +
            FILE_IDENTIFIER_LENGTH) {
            throw new Error('FlatBuffers: ByteBuffer is too short to contain an identifier.');
        }
        let result = "";
        for (let i = 0; i < FILE_IDENTIFIER_LENGTH; i++) {
            result += String.fromCharCode(this.readInt8(this.position_ + SIZEOF_INT + i));
        }
        return result;
    }
    /**
     * Look up a field in the vtable, return an offset into the object, or 0 if the
     * field is not present.
     */
    __offset(bb_pos, vtable_offset) {
        const vtable = bb_pos - this.readInt32(bb_pos);
        return vtable_offset < this.readInt16(vtable) ? this.readInt16(vtable + vtable_offset) : 0;
    }
    /**
     * Initialize any Table-derived type to point to the union at the given offset.
     */
    __union(t, offset) {
        t.bb_pos = offset + this.readInt32(offset);
        t.bb = this;
        return t;
    }
    /**
     * Create a JavaScript string from UTF-8 data stored inside the FlatBuffer.
     * This allocates a new string and converts to wide chars upon each access.
     *
     * To avoid the conversion to string, pass Encoding.UTF8_BYTES as the
     * "optionalEncoding" argument. This is useful for avoiding conversion when
     * the data will just be packaged back up in another FlatBuffer later on.
     *
     * @param offset
     * @param opt_encoding Defaults to UTF16_STRING
     */
    __string(offset, opt_encoding) {
        offset += this.readInt32(offset);
        const length = this.readInt32(offset);
        offset += SIZEOF_INT;
        const utf8bytes = this.bytes_.subarray(offset, offset + length);
        if (opt_encoding === Encoding.UTF8_BYTES)
            return utf8bytes;
        else
            return this.text_decoder_.decode(utf8bytes);
    }
    /**
     * Handle unions that can contain string as its member, if a Table-derived type then initialize it,
     * if a string then return a new one
     *
     * WARNING: strings are immutable in JS so we can't change the string that the user gave us, this
     * makes the behaviour of __union_with_string different compared to __union
     */
    __union_with_string(o, offset) {
        if (typeof o === 'string') {
            return this.__string(offset);
        }
        return this.__union(o, offset);
    }
    /**
     * Retrieve the relative offset stored at "offset"
     */
    __indirect(offset) {
        return offset + this.readInt32(offset);
    }
    /**
     * Get the start of data of a vector whose offset is stored at "offset" in this object.
     */
    __vector(offset) {
        return offset + this.readInt32(offset) + SIZEOF_INT; // data starts after the length
    }
    /**
     * Get the length of a vector whose offset is stored at "offset" in this object.
     */
    __vector_len(offset) {
        return this.readInt32(offset + this.readInt32(offset));
    }
    __has_identifier(ident) {
        if (ident.length != FILE_IDENTIFIER_LENGTH) {
            throw new Error('FlatBuffers: file identifier must be length ' +
                FILE_IDENTIFIER_LENGTH);
        }
        for (let i = 0; i < FILE_IDENTIFIER_LENGTH; i++) {
            if (ident.charCodeAt(i) != this.readInt8(this.position() + SIZEOF_INT + i)) {
                return false;
            }
        }
        return true;
    }
    /**
     * A helper function for generating list for obj api
     */
    createScalarList(listAccessor, listLength) {
        const ret = [];
        for (let i = 0; i < listLength; ++i) {
            const val = listAccessor(i);
            if (val !== null) {
                ret.push(val);
            }
        }
        return ret;
    }
    /**
     * A helper function for generating list for obj api
     * @param listAccessor function that accepts an index and return data at that index
     * @param listLength listLength
     * @param res result list
     */
    createObjList(listAccessor, listLength) {
        const ret = [];
        for (let i = 0; i < listLength; ++i) {
            const val = listAccessor(i);
            if (val !== null) {
                ret.push(val.unpack());
            }
        }
        return ret;
    }
}

class Builder {
    /**
     * Create a FlatBufferBuilder.
     */
    constructor(opt_initial_size) {
        /** Minimum alignment encountered so far. */
        this.minalign = 1;
        /** The vtable for the current table. */
        this.vtable = null;
        /** The amount of fields we're actually using. */
        this.vtable_in_use = 0;
        /** Whether we are currently serializing a table. */
        this.isNested = false;
        /** Starting offset of the current struct/table. */
        this.object_start = 0;
        /** List of offsets of all vtables. */
        this.vtables = [];
        /** For the current vector being built. */
        this.vector_num_elems = 0;
        /** False omits default values from the serialized data */
        this.force_defaults = false;
        this.string_maps = null;
        this.text_encoder = new TextEncoder();
        let initial_size;
        if (!opt_initial_size) {
            initial_size = 1024;
        }
        else {
            initial_size = opt_initial_size;
        }
        /**
         * @type {ByteBuffer}
         * @private
         */
        this.bb = ByteBuffer.allocate(initial_size);
        this.space = initial_size;
    }
    clear() {
        this.bb.clear();
        this.space = this.bb.capacity();
        this.minalign = 1;
        this.vtable = null;
        this.vtable_in_use = 0;
        this.isNested = false;
        this.object_start = 0;
        this.vtables = [];
        this.vector_num_elems = 0;
        this.force_defaults = false;
        this.string_maps = null;
    }
    /**
     * In order to save space, fields that are set to their default value
     * don't get serialized into the buffer. Forcing defaults provides a
     * way to manually disable this optimization.
     *
     * @param forceDefaults true always serializes default values
     */
    forceDefaults(forceDefaults) {
        this.force_defaults = forceDefaults;
    }
    /**
     * Get the ByteBuffer representing the FlatBuffer. Only call this after you've
     * called finish(). The actual data starts at the ByteBuffer's current position,
     * not necessarily at 0.
     */
    dataBuffer() {
        return this.bb;
    }
    /**
     * Get the bytes representing the FlatBuffer. Only call this after you've
     * called finish().
     */
    asUint8Array() {
        return this.bb.bytes().subarray(this.bb.position(), this.bb.position() + this.offset());
    }
    /**
     * Prepare to write an element of `size` after `additional_bytes` have been
     * written, e.g. if you write a string, you need to align such the int length
     * field is aligned to 4 bytes, and the string data follows it directly. If all
     * you need to do is alignment, `additional_bytes` will be 0.
     *
     * @param size This is the of the new element to write
     * @param additional_bytes The padding size
     */
    prep(size, additional_bytes) {
        // Track the biggest thing we've ever aligned to.
        if (size > this.minalign) {
            this.minalign = size;
        }
        // Find the amount of alignment needed such that `size` is properly
        // aligned after `additional_bytes`
        const align_size = ((~(this.bb.capacity() - this.space + additional_bytes)) + 1) & (size - 1);
        // Reallocate the buffer if needed.
        while (this.space < align_size + size + additional_bytes) {
            const old_buf_size = this.bb.capacity();
            this.bb = Builder.growByteBuffer(this.bb);
            this.space += this.bb.capacity() - old_buf_size;
        }
        this.pad(align_size);
    }
    pad(byte_size) {
        for (let i = 0; i < byte_size; i++) {
            this.bb.writeInt8(--this.space, 0);
        }
    }
    writeInt8(value) {
        this.bb.writeInt8(this.space -= 1, value);
    }
    writeInt16(value) {
        this.bb.writeInt16(this.space -= 2, value);
    }
    writeInt32(value) {
        this.bb.writeInt32(this.space -= 4, value);
    }
    writeInt64(value) {
        this.bb.writeInt64(this.space -= 8, value);
    }
    writeFloat32(value) {
        this.bb.writeFloat32(this.space -= 4, value);
    }
    writeFloat64(value) {
        this.bb.writeFloat64(this.space -= 8, value);
    }
    /**
     * Add an `int8` to the buffer, properly aligned, and grows the buffer (if necessary).
     * @param value The `int8` to add the buffer.
     */
    addInt8(value) {
        this.prep(1, 0);
        this.writeInt8(value);
    }
    /**
     * Add an `int16` to the buffer, properly aligned, and grows the buffer (if necessary).
     * @param value The `int16` to add the buffer.
     */
    addInt16(value) {
        this.prep(2, 0);
        this.writeInt16(value);
    }
    /**
     * Add an `int32` to the buffer, properly aligned, and grows the buffer (if necessary).
     * @param value The `int32` to add the buffer.
     */
    addInt32(value) {
        this.prep(4, 0);
        this.writeInt32(value);
    }
    /**
     * Add an `int64` to the buffer, properly aligned, and grows the buffer (if necessary).
     * @param value The `int64` to add the buffer.
     */
    addInt64(value) {
        this.prep(8, 0);
        this.writeInt64(value);
    }
    /**
     * Add a `float32` to the buffer, properly aligned, and grows the buffer (if necessary).
     * @param value The `float32` to add the buffer.
     */
    addFloat32(value) {
        this.prep(4, 0);
        this.writeFloat32(value);
    }
    /**
     * Add a `float64` to the buffer, properly aligned, and grows the buffer (if necessary).
     * @param value The `float64` to add the buffer.
     */
    addFloat64(value) {
        this.prep(8, 0);
        this.writeFloat64(value);
    }
    addFieldInt8(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
            this.addInt8(value);
            this.slot(voffset);
        }
    }
    addFieldInt16(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
            this.addInt16(value);
            this.slot(voffset);
        }
    }
    addFieldInt32(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
            this.addInt32(value);
            this.slot(voffset);
        }
    }
    addFieldInt64(voffset, value, defaultValue) {
        if (this.force_defaults || value !== defaultValue) {
            this.addInt64(value);
            this.slot(voffset);
        }
    }
    addFieldFloat32(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
            this.addFloat32(value);
            this.slot(voffset);
        }
    }
    addFieldFloat64(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
            this.addFloat64(value);
            this.slot(voffset);
        }
    }
    addFieldOffset(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
            this.addOffset(value);
            this.slot(voffset);
        }
    }
    /**
     * Structs are stored inline, so nothing additional is being added. `d` is always 0.
     */
    addFieldStruct(voffset, value, defaultValue) {
        if (value != defaultValue) {
            this.nested(value);
            this.slot(voffset);
        }
    }
    /**
     * Structures are always stored inline, they need to be created right
     * where they're used.  You'll get this assertion failure if you
     * created it elsewhere.
     */
    nested(obj) {
        if (obj != this.offset()) {
            throw new TypeError('FlatBuffers: struct must be serialized inline.');
        }
    }
    /**
     * Should not be creating any other object, string or vector
     * while an object is being constructed
     */
    notNested() {
        if (this.isNested) {
            throw new TypeError('FlatBuffers: object serialization must not be nested.');
        }
    }
    /**
     * Set the current vtable at `voffset` to the current location in the buffer.
     */
    slot(voffset) {
        if (this.vtable !== null)
            this.vtable[voffset] = this.offset();
    }
    /**
     * @returns Offset relative to the end of the buffer.
     */
    offset() {
        return this.bb.capacity() - this.space;
    }
    /**
     * Doubles the size of the backing ByteBuffer and copies the old data towards
     * the end of the new buffer (since we build the buffer backwards).
     *
     * @param bb The current buffer with the existing data
     * @returns A new byte buffer with the old data copied
     * to it. The data is located at the end of the buffer.
     *
     * uint8Array.set() formally takes {Array<number>|ArrayBufferView}, so to pass
     * it a uint8Array we need to suppress the type check:
     * @suppress {checkTypes}
     */
    static growByteBuffer(bb) {
        const old_buf_size = bb.capacity();
        // Ensure we don't grow beyond what fits in an int.
        if (old_buf_size & 0xC0000000) {
            throw new Error('FlatBuffers: cannot grow buffer beyond 2 gigabytes.');
        }
        const new_buf_size = old_buf_size << 1;
        const nbb = ByteBuffer.allocate(new_buf_size);
        nbb.setPosition(new_buf_size - old_buf_size);
        nbb.bytes().set(bb.bytes(), new_buf_size - old_buf_size);
        return nbb;
    }
    /**
     * Adds on offset, relative to where it will be written.
     *
     * @param offset The offset to add.
     */
    addOffset(offset) {
        this.prep(SIZEOF_INT, 0); // Ensure alignment is already done.
        this.writeInt32(this.offset() - offset + SIZEOF_INT);
    }
    /**
     * Start encoding a new object in the buffer.  Users will not usually need to
     * call this directly. The FlatBuffers compiler will generate helper methods
     * that call this method internally.
     */
    startObject(numfields) {
        this.notNested();
        if (this.vtable == null) {
            this.vtable = [];
        }
        this.vtable_in_use = numfields;
        for (let i = 0; i < numfields; i++) {
            this.vtable[i] = 0; // This will push additional elements as needed
        }
        this.isNested = true;
        this.object_start = this.offset();
    }
    /**
     * Finish off writing the object that is under construction.
     *
     * @returns The offset to the object inside `dataBuffer`
     */
    endObject() {
        if (this.vtable == null || !this.isNested) {
            throw new Error('FlatBuffers: endObject called without startObject');
        }
        this.addInt32(0);
        const vtableloc = this.offset();
        // Trim trailing zeroes.
        let i = this.vtable_in_use - 1;
        // eslint-disable-next-line no-empty
        for (; i >= 0 && this.vtable[i] == 0; i--) { }
        const trimmed_size = i + 1;
        // Write out the current vtable.
        for (; i >= 0; i--) {
            // Offset relative to the start of the table.
            this.addInt16(this.vtable[i] != 0 ? vtableloc - this.vtable[i] : 0);
        }
        const standard_fields = 2; // The fields below:
        this.addInt16(vtableloc - this.object_start);
        const len = (trimmed_size + standard_fields) * SIZEOF_SHORT;
        this.addInt16(len);
        // Search for an existing vtable that matches the current one.
        let existing_vtable = 0;
        const vt1 = this.space;
        outer_loop: for (i = 0; i < this.vtables.length; i++) {
            const vt2 = this.bb.capacity() - this.vtables[i];
            if (len == this.bb.readInt16(vt2)) {
                for (let j = SIZEOF_SHORT; j < len; j += SIZEOF_SHORT) {
                    if (this.bb.readInt16(vt1 + j) != this.bb.readInt16(vt2 + j)) {
                        continue outer_loop;
                    }
                }
                existing_vtable = this.vtables[i];
                break;
            }
        }
        if (existing_vtable) {
            // Found a match:
            // Remove the current vtable.
            this.space = this.bb.capacity() - vtableloc;
            // Point table to existing vtable.
            this.bb.writeInt32(this.space, existing_vtable - vtableloc);
        }
        else {
            // No match:
            // Add the location of the current vtable to the list of vtables.
            this.vtables.push(this.offset());
            // Point table to current vtable.
            this.bb.writeInt32(this.bb.capacity() - vtableloc, this.offset() - vtableloc);
        }
        this.isNested = false;
        return vtableloc;
    }
    /**
     * Finalize a buffer, poiting to the given `root_table`.
     */
    finish(root_table, opt_file_identifier, opt_size_prefix) {
        const size_prefix = opt_size_prefix ? SIZE_PREFIX_LENGTH : 0;
        if (opt_file_identifier) {
            const file_identifier = opt_file_identifier;
            this.prep(this.minalign, SIZEOF_INT +
                FILE_IDENTIFIER_LENGTH + size_prefix);
            if (file_identifier.length != FILE_IDENTIFIER_LENGTH) {
                throw new TypeError('FlatBuffers: file identifier must be length ' +
                    FILE_IDENTIFIER_LENGTH);
            }
            for (let i = FILE_IDENTIFIER_LENGTH - 1; i >= 0; i--) {
                this.writeInt8(file_identifier.charCodeAt(i));
            }
        }
        this.prep(this.minalign, SIZEOF_INT + size_prefix);
        this.addOffset(root_table);
        if (size_prefix) {
            this.addInt32(this.bb.capacity() - this.space);
        }
        this.bb.setPosition(this.space);
    }
    /**
     * Finalize a size prefixed buffer, pointing to the given `root_table`.
     */
    finishSizePrefixed(root_table, opt_file_identifier) {
        this.finish(root_table, opt_file_identifier, true);
    }
    /**
     * This checks a required field has been set in a given table that has
     * just been constructed.
     */
    requiredField(table, field) {
        const table_start = this.bb.capacity() - table;
        const vtable_start = table_start - this.bb.readInt32(table_start);
        const ok = field < this.bb.readInt16(vtable_start) &&
            this.bb.readInt16(vtable_start + field) != 0;
        // If this fails, the caller will show what field needs to be set.
        if (!ok) {
            throw new TypeError('FlatBuffers: field ' + field + ' must be set');
        }
    }
    /**
     * Start a new array/vector of objects.  Users usually will not call
     * this directly. The FlatBuffers compiler will create a start/end
     * method for vector types in generated code.
     *
     * @param elem_size The size of each element in the array
     * @param num_elems The number of elements in the array
     * @param alignment The alignment of the array
     */
    startVector(elem_size, num_elems, alignment) {
        this.notNested();
        this.vector_num_elems = num_elems;
        this.prep(SIZEOF_INT, elem_size * num_elems);
        this.prep(alignment, elem_size * num_elems); // Just in case alignment > int.
    }
    /**
     * Finish off the creation of an array and all its elements. The array must be
     * created with `startVector`.
     *
     * @returns The offset at which the newly created array
     * starts.
     */
    endVector() {
        this.writeInt32(this.vector_num_elems);
        return this.offset();
    }
    /**
     * Encode the string `s` in the buffer using UTF-8. If the string passed has
     * already been seen, we return the offset of the already written string
     *
     * @param s The string to encode
     * @return The offset in the buffer where the encoded string starts
     */
    createSharedString(s) {
        if (!s) {
            return 0;
        }
        if (!this.string_maps) {
            this.string_maps = new Map();
        }
        if (this.string_maps.has(s)) {
            return this.string_maps.get(s);
        }
        const offset = this.createString(s);
        this.string_maps.set(s, offset);
        return offset;
    }
    /**
     * Encode the string `s` in the buffer using UTF-8. If a Uint8Array is passed
     * instead of a string, it is assumed to contain valid UTF-8 encoded data.
     *
     * @param s The string to encode
     * @return The offset in the buffer where the encoded string starts
     */
    createString(s) {
        if (s === null || s === undefined) {
            return 0;
        }
        let utf8;
        if (s instanceof Uint8Array) {
            utf8 = s;
        }
        else {
            utf8 = this.text_encoder.encode(s);
        }
        this.addInt8(0);
        this.startVector(1, utf8.length, 1);
        this.bb.setPosition(this.space -= utf8.length);
        this.bb.bytes().set(utf8, this.space);
        return this.endVector();
    }
    /**
     * Create a byte vector.
     *
     * @param v The bytes to add
     * @returns The offset in the buffer where the byte vector starts
     */
    createByteVector(v) {
        if (v === null || v === undefined) {
            return 0;
        }
        this.startVector(1, v.length, 1);
        this.bb.setPosition(this.space -= v.length);
        this.bb.bytes().set(v, this.space);
        return this.endVector();
    }
    /**
     * A helper function to pack an object
     *
     * @returns offset of obj
     */
    createObjectOffset(obj) {
        if (obj === null) {
            return 0;
        }
        if (typeof obj === 'string') {
            return this.createString(obj);
        }
        else {
            return obj.pack(this);
        }
    }
    /**
     * A helper function to pack a list of object
     *
     * @returns list of offsets of each non null object
     */
    createObjectOffsetList(list) {
        const ret = [];
        for (let i = 0; i < list.length; ++i) {
            const val = list[i];
            if (val !== null) {
                ret.push(this.createObjectOffset(val));
            }
            else {
                throw new TypeError('FlatBuffers: Argument for createObjectOffsetList cannot contain null.');
            }
        }
        return ret;
    }
    createStructOffsetList(list, startFunc) {
        startFunc(this, list.length);
        this.createObjectOffsetList(list.slice().reverse());
        return this.endVector();
    }
}

// Code by Claude

const ROOT_OFFSET_SIZE = 4;
const VTABLE_HEADER_SIZE = 4;
const VTABLE_ENTRY_SIZE = 2;
const OFFSET_FIELD_SIZE = 4;
const MAX_SCALAR_ALIGNMENT = 8;

/**
 * table 结构校验结果。
 * Result of a structural table inspection.
 *
 * @typedef {object} TableInspection
 * @property {number} fieldCount vtable 声明的字段数量 / Field count declared by the vtable.
 * @property {number} objectLength table 对象字节长度 / Object length in bytes.
 * @property {number} vtableLength vtable 字节长度 / VTable length in bytes.
 * @property {number} vtablePosition vtable 相对 arena 起点的位置 / VTable position relative to the arena start.
 */

/**
 * 校验任意 table 的结构边界，并返回其布局元数据。
 * Validate the structural bounds of any table and return its layout metadata.
 *
 * 校验读取范围、vtable 长度（偶数且不小于 4）、对象长度（不小于 4），
 * 以及每个已存在字段的偏移是否落在 `[4, objectLength)` 内；
 * 声明字段数超过 `maxFieldCount` 时抛出异常。结构非法时抛出 RangeError。
 * Validates the readable range, vtable length (even and at least 4), object length
 * (at least 4), and that every present field offset lies within `[4, objectLength)`;
 * throws when the declared field count exceeds `maxFieldCount`. Invalid structures throw a RangeError.
 *
 * @param {ByteBuffer} byteBuffer - FlatBuffer / FlatBuffer.
 * @param {number} tablePosition - table 位置 / Table position.
 * @param {number} [maxFieldCount=Infinity] - 允许的最大字段数 / Maximum allowed field count.
 * @returns {TableInspection} table 布局元数据 / Table layout metadata.
 */
function inspectTable(byteBuffer, tablePosition, maxFieldCount = Number.POSITIVE_INFINITY) {
	if (!byteBuffer || typeof byteBuffer.position !== "function" || typeof byteBuffer.capacity !== "function" || typeof byteBuffer.readInt32 !== "function" || typeof byteBuffer.readUint16 !== "function") {
		throw new TypeError("inspectTable source must be a FlatBuffers ByteBuffer");
	}
	if (typeof maxFieldCount !== "number" || !(Number.isSafeInteger(maxFieldCount) || maxFieldCount === Number.POSITIVE_INFINITY) || maxFieldCount < 0) throw new TypeError("inspectTable maxFieldCount must be a non-negative safe integer");
	return inspectTableStructure(byteBuffer, tablePosition, byteBuffer.position(), byteBuffer.capacity(), "table", maxFieldCount);
}

/**
 * 校验 table 结构并返回布局元数据，错误消息携带标签。
 * Validate table structure and return layout metadata, with labeled error messages.
 * @param {ByteBuffer} source - FlatBuffer / FlatBuffer.
 * @param {number} tablePosition - table 位置 / Table position.
 * @param {number} start - arena 起点 / Arena start.
 * @param {number} end - arena 终点 / Arena end.
 * @param {string} label - 错误标签 / Error label.
 * @param {number} maxFieldCount - 允许的最大字段数 / Maximum allowed field count.
 * @returns {TableInspection} table 布局元数据 / Table layout metadata.
 */
function inspectTableStructure(source, tablePosition, start, end, label, maxFieldCount, checkFieldOffsets = true) {
	ensureRange(tablePosition, ROOT_OFFSET_SIZE, start, end, label);
	const vtablePosition = tablePosition - source.readInt32(tablePosition);
	ensureRange(vtablePosition, VTABLE_HEADER_SIZE, start, end, `${label} vtable`);

	const vtableLength = source.readUint16(vtablePosition);
	const objectLength = source.readUint16(vtablePosition + VTABLE_ENTRY_SIZE);
	if (vtableLength < VTABLE_HEADER_SIZE || vtableLength % VTABLE_ENTRY_SIZE !== 0) {
		throw new RangeError(`${label} has an invalid vtable length: ${vtableLength}`);
	}
	if (objectLength < ROOT_OFFSET_SIZE) throw new RangeError(`${label} has an invalid object length: ${objectLength}`);

	ensureRange(vtablePosition, vtableLength, start, end, `${label} vtable`);
	ensureRange(tablePosition, objectLength, start, end, label);

	const fieldCount = (vtableLength - VTABLE_HEADER_SIZE) / VTABLE_ENTRY_SIZE;
	if (fieldCount > maxFieldCount) throw new RangeError(`${label} declares ${fieldCount} fields, exceeding the verified maximum of ${maxFieldCount}`);
	if (checkFieldOffsets) {
		for (let id = 0; id < fieldCount; id++) {
			const fieldOffset = source.readUint16(vtablePosition + VTABLE_HEADER_SIZE + id * VTABLE_ENTRY_SIZE);
			if (fieldOffset !== 0 && (fieldOffset < ROOT_OFFSET_SIZE || fieldOffset >= objectLength)) {
				throw new RangeError(`${label} field ${id} has an invalid field offset: ${fieldOffset}`);
			}
		}
	}
	return { fieldCount, objectLength, vtableLength, vtablePosition };
}

/**
 * 校验二进制读取范围。
 * Validate a binary read range.
 * @param {number} position - 起点 / Start position.
 * @param {number} length - 长度 / Length.
 * @param {number} start - arena 起点 / Arena start.
 * @param {number} end - arena 终点 / Arena end.
 * @param {string} label - 错误标签 / Error label.
 * @returns {void}
 */
function ensureRange(position, length, start, end, label) {
	if (!Number.isSafeInteger(position) || !Number.isSafeInteger(length) || position < start || length < 0 || position + length > end) {
		throw new RangeError(`${label} is outside the FlatBuffer`);
	}
}

/**
 * @typedef {object} SlotBinary
 * @property {Uint8Array} bytes 二进制 arena / Binary arena.
 * @property {number} tablePosition 产品表相对 arena 起点的位置 / Product table position relative to the arena start.
 */

/**
 * @typedef {object} RootSlotFailure
 * @property {number} id 根 slot ID / Root slot ID.
 * @property {Error} error 读取失败 / Read failure.
 */

/**
 * 单个已请求根产品的读取或解码失败记录。
 * Read or decode failure record for one requested root product.
 *
 * @typedef {object} FlatBufferRootDecodeFailure
 * @property {string} name 根名称 / Root name.
 * @property {string} message 失败原因 / Failure message.
 */

/**
 * decodeWithReport 的分类报告。
 * Classified report returned by decodeWithReport.
 *
 * @typedef {object} FlatBufferRootDecodeReport
 * @property {Record<string, unknown>} json 已成功解码的根对象 / Successfully decoded root objects.
 * @property {string[]} missing 已请求但物理缺失的根名称；缺失是正常情况 / Requested root names absent from the source root; absence is normal.
 * @property {FlatBufferRootDecodeFailure[]} failures 已请求但读取或解码失败的根产品 / Requested root products that failed to read or decode.
 * @property {string[]} unknown 已请求但未注册 codec 的根名称 / Requested root names without a registered codec.
 */

/**
 * @typedef {object} RootSlotDictionary
 * @property {number} slotCount 根表声明的 slot 数量 / Slot count declared by the root table.
 * @property {number} presentSlotCount 根表中实际存在的 slot 数量 / Number of physically present root slots.
 * @property {Map<number, SlotBinary>} slots 有效 slot 字典 / Valid slot dictionary.
 * @property {RootSlotFailure[]} failures 可隔离的 slot 读取失败 / Isolated slot read failures.
 */

/**
 * @typedef {object} FlatBufferRootCodec
 * @property {new () => {__init(position: number, byteBuffer: ByteBuffer): unknown}} tableClass 产品表生成类 / Generated product table class.
 * @property {(table: unknown) => unknown} decode 产品表解码器 / Product table decoder.
 * @property {(builder: Builder, json: unknown) => number} encode 产品表编码器 / Product table encoder.
 */

/**
 * @typedef {object} FlatBufferRootProcessorOptions
 * @property {string} name 处理器名称和日志前缀 / Processor name and log prefix.
 * @property {Function} rootClass FlatBuffers 生成的根表类 / Generated FlatBuffers root table class.
 * @property {Readonly<Record<string, FlatBufferRootCodec>>} codecs 按根 accessor 名称注册的 codec / Codecs keyed by root accessor name.
 * @property {readonly string[]} configurableRootNames 受业务开关控制的根名称 / Root names controlled by business settings.
 */

/**
 * 使用生成的根表类配置 FlatBuffer 根 slot 编解码流程。
 * Configure FlatBuffer root-slot encoding and decoding with a generated root table class.
 */

const t=new Int32Array(2);var s;new Float32Array(t.buffer),new Float64Array(t.buffer),new Uint16Array(new Uint8Array([1,0]).buffer)[0],function(t){t[t.UTF8_BYTES=1]="UTF8_BYTES",t[t.UTF16_STRING=2]="UTF16_STRING";}(s||(s={}));class i{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsForecastMinute(t,s){return (s||new i).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsForecastMinute(t,s){return t.setPosition(t.position()+4),(s||new i).__init(t.readInt32(t.position())+t.position(),t)}startTime(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}precipitationChance(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readInt8(this.bb_pos+t):0}precipitationIntensity(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readFloat32(this.bb_pos+t):0}perceivedPrecipitationIntensity(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readFloat32(this.bb_pos+t):0}static startForecastMinute(t){t.startObject(4);}static addStartTime(t,s){t.addFieldInt32(0,s,0);}static addPrecipitationChance(t,s){t.addFieldInt8(1,s,0);}static addPrecipitationIntensity(t,s){t.addFieldFloat32(2,s,0);}static addPerceivedPrecipitationIntensity(t,s){t.addFieldFloat32(3,s,0);}static endForecastMinute(t){return t.endObject()}static createForecastMinute(t,s,e,o,n){return i.startForecastMinute(t),i.addStartTime(t,s),i.addPrecipitationChance(t,e),i.addPrecipitationIntensity(t,o),i.addPerceivedPrecipitationIntensity(t,n),i.endForecastMinute(t)}}class e{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsUUID(t,s){return (s||new e).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsUUID(t,s){return t.setPosition(t.position()+4),(s||new e).__init(t.readInt32(t.position())+t.position(),t)}bytes(t){const s=this.bb.__offset(this.bb_pos,4);return s?this.bb.readUint8(this.bb.__vector(this.bb_pos+s)+t):0}bytesLength(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.__vector_len(this.bb_pos+t):0}bytesArray(){const t=this.bb.__offset(this.bb_pos,4);return t?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+t),this.bb.__vector_len(this.bb_pos+t)):null}static startUUID(t){t.startObject(1);}static addBytes(t,s){t.addFieldOffset(0,s,0);}static createBytesVector(t,s){t.startVector(1,s.length,1);for(let i=s.length-1;i>=0;i--)t.addInt8(s[i]);return t.endVector()}static startBytesVector(t,s){t.startVector(1,s,1);}static endUUID(t){return t.endObject()}static createUUID(t,s){return e.startUUID(t),e.addBytes(t,s),e.endUUID(t)}}var o,n,a=Object.freeze({__proto__:null,ForecastMinute:i,UUID:e});!function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.MUCH_WORSE=1]="MUCH_WORSE",t[t.WORSE=2]="WORSE",t[t.SAME=3]="SAME",t[t.BETTER=4]="BETTER",t[t.MUCH_BETTER=5]="MUCH_BETTER";}(o||(o={})),function(t){t[t.APPLE_INTERNAL=0]="APPLE_INTERNAL",t[t.MODELED=1]="MODELED",t[t.STATION=2]="STATION",t[t.UNKNOWN3=3]="UNKNOWN3",t[t.UNKNOWN4=4]="UNKNOWN4";}(n||(n={}));let b=class t{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsMetadata(s,i){return (i||new t).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsMetadata(s,i){return s.setPosition(s.position()+4),(i||new t).__init(s.readInt32(s.position())+s.position(),s)}attributionUrl(t){const s=this.bb.__offset(this.bb_pos,4);return s?this.bb.__string(this.bb_pos+s,t):null}expireTime(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}language(t){const s=this.bb.__offset(this.bb_pos,8);return s?this.bb.__string(this.bb_pos+s,t):null}latitude(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readFloat32(this.bb_pos+t):0}longitude(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readFloat32(this.bb_pos+t):0}providerLogo(t){const s=this.bb.__offset(this.bb_pos,14);return s?this.bb.__string(this.bb_pos+s,t):null}providerName(t){const s=this.bb.__offset(this.bb_pos,16);return s?this.bb.__string(this.bb_pos+s,t):null}readTime(){const t=this.bb.__offset(this.bb_pos,18);return t?this.bb.readUint32(this.bb_pos+t):0}reportedTime(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readUint32(this.bb_pos+t):0}temporarilyUnavailable(){const t=this.bb.__offset(this.bb_pos,22);return !!t&&!!this.bb.readInt8(this.bb_pos+t)}sourceType(){const t=this.bb.__offset(this.bb_pos,24);return t?this.bb.readInt8(this.bb_pos+t):n.APPLE_INTERNAL}static startMetadata(t){t.startObject(11);}static addAttributionUrl(t,s){t.addFieldOffset(0,s,0);}static addExpireTime(t,s){t.addFieldInt32(1,s,0);}static addLanguage(t,s){t.addFieldOffset(2,s,0);}static addLatitude(t,s){t.addFieldFloat32(3,s,0);}static addLongitude(t,s){t.addFieldFloat32(4,s,0);}static addProviderLogo(t,s){t.addFieldOffset(5,s,0);}static addProviderName(t,s){t.addFieldOffset(6,s,0);}static addReadTime(t,s){t.addFieldInt32(7,s,0);}static addReportedTime(t,s){t.addFieldInt32(8,s,0);}static addTemporarilyUnavailable(t,s){t.addFieldInt8(9,+s,0);}static addSourceType(t,s){t.addFieldInt8(10,s,n.APPLE_INTERNAL);}static endMetadata(t){return t.endObject()}static createMetadata(s,i,e,o,n,a,b,r,d,_,h,c){return t.startMetadata(s),t.addAttributionUrl(s,i),t.addExpireTime(s,e),t.addLanguage(s,o),t.addLatitude(s,n),t.addLongitude(s,a),t.addProviderLogo(s,b),t.addProviderName(s,r),t.addReadTime(s,d),t.addReportedTime(s,_),t.addTemporarilyUnavailable(s,h),t.addSourceType(s,c),t.endMetadata(s)}};var r,d;!function(t){t[t.NOT_AVAILABLE=0]="NOT_AVAILABLE",t[t.C6H6=1]="C6H6",t[t.NH3=2]="NH3",t[t.NMHC=3]="NMHC",t[t.NO=4]="NO",t[t.NO2=5]="NO2",t[t.NOX=6]="NOX",t[t.OZONE=7]="OZONE",t[t.PM2_5=8]="PM2_5",t[t.SO2=9]="SO2",t[t.PM10=10]="PM10",t[t.CO=11]="CO",t[t.UNKNOWN12=12]="UNKNOWN12",t[t.UNKNOWN13=13]="UNKNOWN13";}(r||(r={})),function(t){t[t.PARTS_PER_BILLION=0]="PARTS_PER_BILLION",t[t.MICROGRAMS_PER_CUBIC_METER=1]="MICROGRAMS_PER_CUBIC_METER",t[t.UNKNOWN2=2]="UNKNOWN2",t[t.UNKNOWN3=3]="UNKNOWN3";}(d||(d={}));let _=class t{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsPollutant(s,i){return (i||new t).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsPollutant(s,i){return s.setPosition(s.position()+4),(i||new t).__init(s.readInt32(s.position())+s.position(),s)}pollutantType(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt8(this.bb_pos+t):r.NOT_AVAILABLE}amount(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readFloat32(this.bb_pos+t):0}units(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):d.PARTS_PER_BILLION}static startPollutant(t){t.startObject(3);}static addPollutantType(t,s){t.addFieldInt8(0,s,r.NOT_AVAILABLE);}static addAmount(t,s){t.addFieldFloat32(1,s,0);}static addUnits(t,s){t.addFieldInt8(2,s,d.PARTS_PER_BILLION);}static endPollutant(t){return t.endObject()}static createPollutant(s,i,e,o){return t.startPollutant(s),t.addPollutantType(s,i),t.addAmount(s,e),t.addUnits(s,o),t.endPollutant(s)}},h=class t{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsAirQuality(s,i){return (i||new t).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsAirQuality(s,i){return s.setPosition(s.position()+4),(i||new t).__init(s.readInt32(s.position())+s.position(),s)}metadata(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new b).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}categoryIndex(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readInt8(this.bb_pos+t):0}index(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt16(this.bb_pos+t):0}isSignificant(){const t=this.bb.__offset(this.bb_pos,10);return !!t&&!!this.bb.readInt8(this.bb_pos+t)}pollutants(t,s){const i=this.bb.__offset(this.bb_pos,12);return i?(s||new _).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}pollutantsLength(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.__vector_len(this.bb_pos+t):0}previousDayComparison(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readInt8(this.bb_pos+t):o.UNKNOWN}primaryPollutant(){const t=this.bb.__offset(this.bb_pos,16);return t?this.bb.readInt8(this.bb_pos+t):r.NOT_AVAILABLE}scale(t){const s=this.bb.__offset(this.bb_pos,18);return s?this.bb.__string(this.bb_pos+s,t):null}static startAirQuality(t){t.startObject(8);}static addMetadata(t,s){t.addFieldOffset(0,s,0);}static addCategoryIndex(t,s){t.addFieldInt8(1,s,0);}static addIndex(t,s){t.addFieldInt16(2,s,0);}static addIsSignificant(t,s){t.addFieldInt8(3,+s,0);}static addPollutants(t,s){t.addFieldOffset(4,s,0);}static createPollutantsVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startPollutantsVector(t,s){t.startVector(4,s,4);}static addPreviousDayComparison(t,s){t.addFieldInt8(5,s,o.UNKNOWN);}static addPrimaryPollutant(t,s){t.addFieldInt8(6,s,r.NOT_AVAILABLE);}static addScale(t,s){t.addFieldOffset(7,s,0);}static endAirQuality(t){return t.endObject()}static createAirQuality(s,i,e,o,n,a,b,r,d){return t.startAirQuality(s),t.addMetadata(s,i),t.addCategoryIndex(s,e),t.addIndex(s,o),t.addIsSignificant(s,n),t.addPollutants(s,a),t.addPreviousDayComparison(s,b),t.addPrimaryPollutant(s,r),t.addScale(s,d),t.endAirQuality(s)}};class c{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsArticles(t,s){return (s||new c).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsArticles(t,s){return t.setPosition(t.position()+4),(s||new c).__init(t.readInt32(t.position())+t.position(),t)}id(t){const s=this.bb.__offset(this.bb_pos,4);return s?this.bb.__string(this.bb_pos+s,t):null}supportedStorefronts(t,s){const i=this.bb.__offset(this.bb_pos,6);return i?this.bb.__string(this.bb.__vector(this.bb_pos+i)+4*t,s):null}supportedStorefrontsLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}alertIds(t,s){const i=this.bb.__offset(this.bb_pos,8);return i?(s||new e).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}alertIdsLength(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}phenomena(t,s){const i=this.bb.__offset(this.bb_pos,10);return i?this.bb.__string(this.bb.__vector(this.bb_pos+i)+4*t,s):null}phenomenaLength(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__vector_len(this.bb_pos+t):0}headlineOverride(t){const s=this.bb.__offset(this.bb_pos,12);return s?this.bb.__string(this.bb_pos+s,t):null}locale(t){const s=this.bb.__offset(this.bb_pos,14);return s?this.bb.__string(this.bb_pos+s,t):null}static startArticles(t){t.startObject(6);}static addId(t,s){t.addFieldOffset(0,s,0);}static addSupportedStorefronts(t,s){t.addFieldOffset(1,s,0);}static createSupportedStorefrontsVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startSupportedStorefrontsVector(t,s){t.startVector(4,s,4);}static addAlertIds(t,s){t.addFieldOffset(2,s,0);}static createAlertIdsVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startAlertIdsVector(t,s){t.startVector(4,s,4);}static addPhenomena(t,s){t.addFieldOffset(3,s,0);}static createPhenomenaVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startPhenomenaVector(t,s){t.startVector(4,s,4);}static addHeadlineOverride(t,s){t.addFieldOffset(4,s,0);}static addLocale(t,s){t.addFieldOffset(5,s,0);}static endArticles(t){return t.endObject()}static createArticles(t,s,i,e,o,n,a){return c.startArticles(t),c.addId(t,s),c.addSupportedStorefronts(t,i),c.addAlertIds(t,e),c.addPhenomena(t,o),c.addHeadlineOverride(t,n),c.addLocale(t,a),c.endArticles(t)}}var p,l,u,f,N,O,I,F;!function(t){t[t.MEAN=0]="MEAN",t[t.UNKNOWN1=1]="UNKNOWN1",t[t.UNKNOWN2=2]="UNKNOWN2",t[t.UNKNOWN3=3]="UNKNOWN3",t[t.UNKNOWN4=4]="UNKNOWN4",t[t.UNKNOWN5=5]="UNKNOWN5";}(p||(p={})),function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.OBSERVED=1]="OBSERVED",t[t.LIKELY=2]="LIKELY",t[t.POSSIBLE=3]="POSSIBLE",t[t.UNLIKELY=4]="UNLIKELY",t[t.UNKNOWN5=5]="UNKNOWN5";}(l||(l={})),function(t){t[t.STEADY=0]="STEADY",t[t.INC=1]="INC",t[t.DEC=2]="DEC",t[t.UNKNOWN3=3]="UNKNOWN3";}(u||(u={}));class A{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsChange(t,s){return (s||new A).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsChange(t,s){return t.setPosition(t.position()+4),(s||new A).__init(t.readInt32(t.position())+t.position(),t)}forecastStart(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}forecastEnd(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}maxTemperatureChange(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):u.STEADY}minTemperatureChange(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):u.STEADY}dayPrecipitationChange(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readInt8(this.bb_pos+t):u.STEADY}nightPrecipitationChange(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readInt8(this.bb_pos+t):u.STEADY}static startChange(t){t.startObject(6);}static addForecastStart(t,s){t.addFieldInt32(0,s,0);}static addForecastEnd(t,s){t.addFieldInt32(1,s,0);}static addMaxTemperatureChange(t,s){t.addFieldInt8(2,s,u.STEADY);}static addMinTemperatureChange(t,s){t.addFieldInt8(3,s,u.STEADY);}static addDayPrecipitationChange(t,s){t.addFieldInt8(4,s,u.STEADY);}static addNightPrecipitationChange(t,s){t.addFieldInt8(5,s,u.STEADY);}static endChange(t){return t.endObject()}static createChange(t,s,i,e,o,n,a){return A.startChange(t),A.addForecastStart(t,s),A.addForecastEnd(t,i),A.addMaxTemperatureChange(t,e),A.addMinTemperatureChange(t,o),A.addDayPrecipitationChange(t,n),A.addNightPrecipitationChange(t,a),A.endChange(t)}}!function(t){t[t.UNKNOWN0=0]="UNKNOWN0",t[t.TEMPERATURE_MAX=1]="TEMPERATURE_MAX",t[t.PRECIPITATION=2]="PRECIPITATION",t[t.UNKNOWN3=3]="UNKNOWN3",t[t.UVI=4]="UVI";}(f||(f={})),function(t){t[t.MUCHHIGHER=0]="MUCHHIGHER",t[t.HIGHER=1]="HIGHER",t[t.NORMAL=2]="NORMAL",t[t.LOWER=3]="LOWER",t[t.MUCHLOWER=4]="MUCHLOWER",t[t.UNKNOWN5=5]="UNKNOWN5";}(N||(N={}));class m{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsComparison(t,s){return (s||new m).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsComparison(t,s){return t.setPosition(t.position()+4),(s||new m).__init(t.readInt32(t.position())+t.position(),t)}condition(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt8(this.bb_pos+t):f.UNKNOWN0}currentValue(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readFloat32(this.bb_pos+t):0}baselineValue(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readFloat32(this.bb_pos+t):0}deviation(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):N.MUCHHIGHER}baselineType(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readUint32(this.bb_pos+t):0}baselineStartDate(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readUint32(this.bb_pos+t):0}static startComparison(t){t.startObject(6);}static addCondition(t,s){t.addFieldInt8(0,s,f.UNKNOWN0);}static addCurrentValue(t,s){t.addFieldFloat32(1,s,0);}static addBaselineValue(t,s){t.addFieldFloat32(2,s,0);}static addDeviation(t,s){t.addFieldInt8(3,s,N.MUCHHIGHER);}static addBaselineType(t,s){t.addFieldInt32(4,s,0);}static addBaselineStartDate(t,s){t.addFieldInt32(5,s,0);}static endComparison(t){return t.endObject()}static createComparison(t,s,i,e,o,n,a){return m.startComparison(t),m.addCondition(t,s),m.addCurrentValue(t,i),m.addBaselineValue(t,e),m.addDeviation(t,o),m.addBaselineType(t,n),m.addBaselineStartDate(t,a),m.endComparison(t)}}!function(t){t[t.CLEAR=0]="CLEAR",t[t.UNKNOWN1=1]="UNKNOWN1",t[t.UNKNOWN2=2]="UNKNOWN2",t[t.SLEET=3]="SLEET",t[t.POSSIBLE_SLEET=4]="POSSIBLE_SLEET",t[t.HEAVY_RAIN=5]="HEAVY_RAIN",t[t.RAIN=6]="RAIN",t[t.DRIZZLE=7]="DRIZZLE",t[t.POSSIBLE_DRIZZLE=8]="POSSIBLE_DRIZZLE",t[t.HEAVY_SNOW=9]="HEAVY_SNOW",t[t.SNOW=10]="SNOW",t[t.UNKNOWN11=11]="UNKNOWN11",t[t.UNKNOWN12=12]="UNKNOWN12",t[t.UNKNOWN13=13]="UNKNOWN13",t[t.UNKNOWN14=14]="UNKNOWN14",t[t.UNKNOWN15=15]="UNKNOWN15",t[t.UNKNOWN16=16]="UNKNOWN16",t[t.UNKNOWN17=17]="UNKNOWN17",t[t.UNKNOWN18=18]="UNKNOWN18";}(O||(O={})),function(t){t[t.CLEAR=0]="CLEAR",t[t.START=1]="START",t[t.STOP=2]="STOP",t[t.START_STOP=3]="START_STOP",t[t.STOP_START=4]="STOP_START",t[t.CONSTANT=5]="CONSTANT",t[t.UNKNOWN6=6]="UNKNOWN6",t[t.UNKNOWN7=7]="UNKNOWN7";}(I||(I={})),function(t){t[t.FIRST_AT=0]="FIRST_AT",t[t.SECOND_AT=1]="SECOND_AT",t[t.UNKNOWN2=2]="UNKNOWN2";}(F||(F={}));let U=class t{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsParameter(s,i){return (i||new t).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsParameter(s,i){return s.setPosition(s.position()+4),(i||new t).__init(s.readInt32(s.position())+s.position(),s)}type(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt8(this.bb_pos+t):F.FIRST_AT}date(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}static startParameter(t){t.startObject(2);}static addType(t,s){t.addFieldInt8(0,s,F.FIRST_AT);}static addDate(t,s){t.addFieldInt32(1,s,0);}static endParameter(t){return t.endObject()}static createParameter(s,i,e){return t.startParameter(s),t.addType(s,i),t.addDate(s,e),t.endParameter(s)}},W=class t{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsCondition(s,i){return (i||new t).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsCondition(s,i){return s.setPosition(s.position()+4),(i||new t).__init(s.readInt32(s.position())+s.position(),s)}startTime(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}endTime(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}forecastToken(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):I.CLEAR}beginCondition(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):O.CLEAR}endCondition(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readInt8(this.bb_pos+t):O.CLEAR}parameters(t,s){const i=this.bb.__offset(this.bb_pos,14);return i?(s||new U).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}parametersLength(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__vector_len(this.bb_pos+t):0}static startCondition(t){t.startObject(6);}static addStartTime(t,s){t.addFieldInt32(0,s,0);}static addEndTime(t,s){t.addFieldInt32(1,s,0);}static addForecastToken(t,s){t.addFieldInt8(2,s,I.CLEAR);}static addBeginCondition(t,s){t.addFieldInt8(3,s,O.CLEAR);}static addEndCondition(t,s){t.addFieldInt8(4,s,O.CLEAR);}static addParameters(t,s){t.addFieldOffset(5,s,0);}static createParametersVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startParametersVector(t,s){t.startVector(4,s,4);}static endCondition(t){return t.endObject()}static createCondition(s,i,e,o,n,a,b){return t.startCondition(s),t.addStartTime(s,i),t.addEndTime(s,e),t.addForecastToken(s,o),t.addBeginCondition(s,n),t.addEndCondition(s,a),t.addParameters(s,b),t.endCondition(s)}};var P,T,y,S;!function(t){t[t.CLEAR=0]="CLEAR",t[t.RAIN=1]="RAIN",t[t.SNOW=2]="SNOW",t[t.SLEET=3]="SLEET",t[t.HAIL=4]="HAIL",t[t.UNKNOWN5=5]="UNKNOWN5",t[t.MIXED=6]="MIXED";}(P||(P={}));class C{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsPrecipitationAmountByType(t,s){return (s||new C).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsPrecipitationAmountByType(t,s){return t.setPosition(t.position()+4),(s||new C).__init(t.readInt32(t.position())+t.position(),t)}precipitationType(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt8(this.bb_pos+t):P.CLEAR}expected(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readFloat32(this.bb_pos+t):0}minimumSnow(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readFloat32(this.bb_pos+t):0}maximumSnow(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readFloat32(this.bb_pos+t):0}expectedSnow(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readFloat32(this.bb_pos+t):0}static startPrecipitationAmountByType(t){t.startObject(5);}static addPrecipitationType(t,s){t.addFieldInt8(0,s,P.CLEAR);}static addExpected(t,s){t.addFieldFloat32(1,s,0);}static addMinimumSnow(t,s){t.addFieldFloat32(2,s,0);}static addMaximumSnow(t,s){t.addFieldFloat32(3,s,0);}static addExpectedSnow(t,s){t.addFieldFloat32(4,s,0);}static endPrecipitationAmountByType(t){return t.endObject()}static createPrecipitationAmountByType(t,s,i,e,o,n){return C.startPrecipitationAmountByType(t),C.addPrecipitationType(t,s),C.addExpected(t,i),C.addMinimumSnow(t,e),C.addMaximumSnow(t,o),C.addExpectedSnow(t,n),C.endPrecipitationAmountByType(t)}}!function(t){t[t.RISING=0]="RISING",t[t.FALLING=1]="FALLING",t[t.STEADY=2]="STEADY",t[t.UNKNOWN3=3]="UNKNOWN3";}(T||(T={})),function(t){t[t.CLEAR=0]="CLEAR",t[t.BLIZZARD=1]="BLIZZARD",t[t.PRECIPITATION=2]="PRECIPITATION",t[t.UNKNOWN3=3]="UNKNOWN3",t[t.UNKNOWN4=4]="UNKNOWN4",t[t.CLOUDY=5]="CLOUDY",t[t.DRIZZLE=6]="DRIZZLE",t[t.FLURRIES=7]="FLURRIES",t[t.FOGGY=8]="FOGGY",t[t.FREEZING_DRIZZLE=9]="FREEZING_DRIZZLE",t[t.UNKNOWN10=10]="UNKNOWN10",t[t.UNKNOWN11=11]="UNKNOWN11",t[t.UNKNOWN12=12]="UNKNOWN12",t[t.HAZE=13]="HAZE",t[t.HEAVY_RAIN=14]="HEAVY_RAIN",t[t.HEAVY_SNOW=15]="HEAVY_SNOW",t[t.UNKNOWN16=16]="UNKNOWN16",t[t.UNKNOWN17=17]="UNKNOWN17",t[t.ISOLATED_THUNDERSTORMS=18]="ISOLATED_THUNDERSTORMS",t[t.MOSTLY_CLEAR=19]="MOSTLY_CLEAR",t[t.MOSTLY_CLOUDY=20]="MOSTLY_CLOUDY",t[t.PARTLY_CLOUDY=21]="PARTLY_CLOUDY",t[t.RAIN=22]="RAIN",t[t.UNKNOWN23=23]="UNKNOWN23",t[t.UNKNOWN24=24]="UNKNOWN24",t[t.UNKNOWN25=25]="UNKNOWN25",t[t.SNOW=26]="SNOW",t[t.UNKNOWN27=27]="UNKNOWN27",t[t.UNKNOWN28=28]="UNKNOWN28",t[t.UNKNOWN29=29]="UNKNOWN29",t[t.THUNDERSTORMS=30]="THUNDERSTORMS",t[t.UNKNOWN31=31]="UNKNOWN31",t[t.WINDY=32]="WINDY",t[t.WINTRY_MIX=33]="WINTRY_MIX",t[t.UNKNOWN34=34]="UNKNOWN34",t[t.UNKNOWN35=35]="UNKNOWN35",t[t.UNKNOWN36=36]="UNKNOWN36",t[t.UNKNOWN37=37]="UNKNOWN37",t[t.UNKNOWN38=38]="UNKNOWN38",t[t.UNKNOWN39=39]="UNKNOWN39",t[t.UNKNOWN40=40]="UNKNOWN40",t[t.UNKNOWN41=41]="UNKNOWN41",t[t.UNKNOWN42=42]="UNKNOWN42",t[t.UNKNOWN43=43]="UNKNOWN43",t[t.UNKNOWN44=44]="UNKNOWN44";}(y||(y={}));class E{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsCurrentWeatherData(t,s){return (s||new E).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsCurrentWeatherData(t,s){return t.setPosition(t.position()+4),(s||new E).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new b).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}asOf(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}cloudCover(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverLowAltPct(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverMidAltPct(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverHighAltPct(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readInt8(this.bb_pos+t):0}conditionCode(){const t=this.bb.__offset(this.bb_pos,16);return t?this.bb.readInt8(this.bb_pos+t):y.CLEAR}daylight(){const t=this.bb.__offset(this.bb_pos,18);return !!t&&!!this.bb.readInt8(this.bb_pos+t)}humidity(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readInt8(this.bb_pos+t):0}perceivedPrecipitationIntensity(){const t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmount1h(){const t=this.bb.__offset(this.bb_pos,24);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmount6h(){const t=this.bb.__offset(this.bb_pos,26);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmount24h(){const t=this.bb.__offset(this.bb_pos,28);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmountNext1h(){const t=this.bb.__offset(this.bb_pos,30);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmountNext6h(){const t=this.bb.__offset(this.bb_pos,32);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmountNext24h(){const t=this.bb.__offset(this.bb_pos,34);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmountNext1hByType(t,s){const i=this.bb.__offset(this.bb_pos,36);return i?(s||new C).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountNext1hByTypeLength(){const t=this.bb.__offset(this.bb_pos,36);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationAmountNext6hByType(t,s){const i=this.bb.__offset(this.bb_pos,38);return i?(s||new C).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountNext6hByTypeLength(){const t=this.bb.__offset(this.bb_pos,38);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationAmountNext24hByType(t,s){const i=this.bb.__offset(this.bb_pos,40);return i?(s||new C).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountNext24hByTypeLength(){const t=this.bb.__offset(this.bb_pos,40);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationAmountPrevious1hByType(t,s){const i=this.bb.__offset(this.bb_pos,42);return i?(s||new C).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountPrevious1hByTypeLength(){const t=this.bb.__offset(this.bb_pos,42);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationAmountPrevious6hByType(t,s){const i=this.bb.__offset(this.bb_pos,44);return i?(s||new C).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountPrevious6hByTypeLength(){const t=this.bb.__offset(this.bb_pos,44);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationAmountPrevious24hByType(t,s){const i=this.bb.__offset(this.bb_pos,46);return i?(s||new C).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountPrevious24hByTypeLength(){const t=this.bb.__offset(this.bb_pos,46);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationIntensity(){const t=this.bb.__offset(this.bb_pos,48);return t?this.bb.readFloat32(this.bb_pos+t):0}pressure(){const t=this.bb.__offset(this.bb_pos,50);return t?this.bb.readFloat32(this.bb_pos+t):0}pressureTrend(){const t=this.bb.__offset(this.bb_pos,52);return t?this.bb.readInt8(this.bb_pos+t):T.RISING}snowfallAmount1h(){const t=this.bb.__offset(this.bb_pos,54);return t?this.bb.readFloat32(this.bb_pos+t):0}snowfallAmount6h(){const t=this.bb.__offset(this.bb_pos,56);return t?this.bb.readFloat32(this.bb_pos+t):0}snowfallAmount24h(){const t=this.bb.__offset(this.bb_pos,58);return t?this.bb.readFloat32(this.bb_pos+t):0}snowfallAmountNext1h(){const t=this.bb.__offset(this.bb_pos,60);return t?this.bb.readFloat32(this.bb_pos+t):0}snowfallAmountNext6h(){const t=this.bb.__offset(this.bb_pos,62);return t?this.bb.readFloat32(this.bb_pos+t):0}snowfallAmountNext24h(){const t=this.bb.__offset(this.bb_pos,64);return t?this.bb.readFloat32(this.bb_pos+t):0}temperature(){const t=this.bb.__offset(this.bb_pos,66);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureApparent(){const t=this.bb.__offset(this.bb_pos,68);return t?this.bb.readFloat32(this.bb_pos+t):0}unknown34(){const t=this.bb.__offset(this.bb_pos,70);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureDewPoint(){const t=this.bb.__offset(this.bb_pos,72);return t?this.bb.readFloat32(this.bb_pos+t):0}uvIndex(){const t=this.bb.__offset(this.bb_pos,74);return t?this.bb.readInt8(this.bb_pos+t):0}visibility(){const t=this.bb.__offset(this.bb_pos,76);return t?this.bb.readFloat32(this.bb_pos+t):0}windDirection(){const t=this.bb.__offset(this.bb_pos,78);return t?this.bb.readInt16(this.bb_pos+t):0}windGust(){const t=this.bb.__offset(this.bb_pos,80);return t?this.bb.readFloat32(this.bb_pos+t):0}windSpeed(){const t=this.bb.__offset(this.bb_pos,82);return t?this.bb.readFloat32(this.bb_pos+t):0}static startCurrentWeatherData(t){t.startObject(40);}static addMetadata(t,s){t.addFieldOffset(0,s,0);}static addAsOf(t,s){t.addFieldInt32(1,s,0);}static addCloudCover(t,s){t.addFieldInt8(2,s,0);}static addCloudCoverLowAltPct(t,s){t.addFieldInt8(3,s,0);}static addCloudCoverMidAltPct(t,s){t.addFieldInt8(4,s,0);}static addCloudCoverHighAltPct(t,s){t.addFieldInt8(5,s,0);}static addConditionCode(t,s){t.addFieldInt8(6,s,y.CLEAR);}static addDaylight(t,s){t.addFieldInt8(7,+s,0);}static addHumidity(t,s){t.addFieldInt8(8,s,0);}static addPerceivedPrecipitationIntensity(t,s){t.addFieldFloat32(9,s,0);}static addPrecipitationAmount1h(t,s){t.addFieldFloat32(10,s,0);}static addPrecipitationAmount6h(t,s){t.addFieldFloat32(11,s,0);}static addPrecipitationAmount24h(t,s){t.addFieldFloat32(12,s,0);}static addPrecipitationAmountNext1h(t,s){t.addFieldFloat32(13,s,0);}static addPrecipitationAmountNext6h(t,s){t.addFieldFloat32(14,s,0);}static addPrecipitationAmountNext24h(t,s){t.addFieldFloat32(15,s,0);}static addPrecipitationAmountNext1hByType(t,s){t.addFieldOffset(16,s,0);}static createPrecipitationAmountNext1hByTypeVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startPrecipitationAmountNext1hByTypeVector(t,s){t.startVector(4,s,4);}static addPrecipitationAmountNext6hByType(t,s){t.addFieldOffset(17,s,0);}static createPrecipitationAmountNext6hByTypeVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startPrecipitationAmountNext6hByTypeVector(t,s){t.startVector(4,s,4);}static addPrecipitationAmountNext24hByType(t,s){t.addFieldOffset(18,s,0);}static createPrecipitationAmountNext24hByTypeVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startPrecipitationAmountNext24hByTypeVector(t,s){t.startVector(4,s,4);}static addPrecipitationAmountPrevious1hByType(t,s){t.addFieldOffset(19,s,0);}static createPrecipitationAmountPrevious1hByTypeVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startPrecipitationAmountPrevious1hByTypeVector(t,s){t.startVector(4,s,4);}static addPrecipitationAmountPrevious6hByType(t,s){t.addFieldOffset(20,s,0);}static createPrecipitationAmountPrevious6hByTypeVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startPrecipitationAmountPrevious6hByTypeVector(t,s){t.startVector(4,s,4);}static addPrecipitationAmountPrevious24hByType(t,s){t.addFieldOffset(21,s,0);}static createPrecipitationAmountPrevious24hByTypeVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startPrecipitationAmountPrevious24hByTypeVector(t,s){t.startVector(4,s,4);}static addPrecipitationIntensity(t,s){t.addFieldFloat32(22,s,0);}static addPressure(t,s){t.addFieldFloat32(23,s,0);}static addPressureTrend(t,s){t.addFieldInt8(24,s,T.RISING);}static addSnowfallAmount1h(t,s){t.addFieldFloat32(25,s,0);}static addSnowfallAmount6h(t,s){t.addFieldFloat32(26,s,0);}static addSnowfallAmount24h(t,s){t.addFieldFloat32(27,s,0);}static addSnowfallAmountNext1h(t,s){t.addFieldFloat32(28,s,0);}static addSnowfallAmountNext6h(t,s){t.addFieldFloat32(29,s,0);}static addSnowfallAmountNext24h(t,s){t.addFieldFloat32(30,s,0);}static addTemperature(t,s){t.addFieldFloat32(31,s,0);}static addTemperatureApparent(t,s){t.addFieldFloat32(32,s,0);}static addUnknown34(t,s){t.addFieldFloat32(33,s,0);}static addTemperatureDewPoint(t,s){t.addFieldFloat32(34,s,0);}static addUvIndex(t,s){t.addFieldInt8(35,s,0);}static addVisibility(t,s){t.addFieldFloat32(36,s,0);}static addWindDirection(t,s){t.addFieldInt16(37,s,0);}static addWindGust(t,s){t.addFieldFloat32(38,s,0);}static addWindSpeed(t,s){t.addFieldFloat32(39,s,0);}static endCurrentWeatherData(t){return t.endObject()}static createCurrentWeatherData(t,s,i,e,o,n,a,b,r,d,_,h,c,p,l,u,f,N,O,I,F,A,m,U,W,P,T,y,S,C,g,K,R,L,w,v,M,D,V,x,H){return E.startCurrentWeatherData(t),E.addMetadata(t,s),E.addAsOf(t,i),E.addCloudCover(t,e),E.addCloudCoverLowAltPct(t,o),E.addCloudCoverMidAltPct(t,n),E.addCloudCoverHighAltPct(t,a),E.addConditionCode(t,b),E.addDaylight(t,r),E.addHumidity(t,d),E.addPerceivedPrecipitationIntensity(t,_),E.addPrecipitationAmount1h(t,h),E.addPrecipitationAmount6h(t,c),E.addPrecipitationAmount24h(t,p),E.addPrecipitationAmountNext1h(t,l),E.addPrecipitationAmountNext6h(t,u),E.addPrecipitationAmountNext24h(t,f),E.addPrecipitationAmountNext1hByType(t,N),E.addPrecipitationAmountNext6hByType(t,O),E.addPrecipitationAmountNext24hByType(t,I),E.addPrecipitationAmountPrevious1hByType(t,F),E.addPrecipitationAmountPrevious6hByType(t,A),E.addPrecipitationAmountPrevious24hByType(t,m),E.addPrecipitationIntensity(t,U),E.addPressure(t,W),E.addPressureTrend(t,P),E.addSnowfallAmount1h(t,T),E.addSnowfallAmount6h(t,y),E.addSnowfallAmount24h(t,S),E.addSnowfallAmountNext1h(t,C),E.addSnowfallAmountNext6h(t,g),E.addSnowfallAmountNext24h(t,K),E.addTemperature(t,R),E.addTemperatureApparent(t,L),E.addUnknown34(t,w),E.addTemperatureDewPoint(t,v),E.addUvIndex(t,M),E.addVisibility(t,D),E.addWindDirection(t,V),E.addWindGust(t,x),E.addWindSpeed(t,H),E.endCurrentWeatherData(t)}}class g{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsDayPartForecast(t,s){return (s||new g).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDayPartForecast(t,s){return t.setPosition(t.position()+4),(s||new g).__init(t.readInt32(t.position())+t.position(),t)}forecastStart(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}forecastEnd(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}cloudCover(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverLowAltPct(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverMidAltPct(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverHighAltPct(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readInt8(this.bb_pos+t):0}conditionCode(){const t=this.bb.__offset(this.bb_pos,16);return t?this.bb.readInt8(this.bb_pos+t):y.CLEAR}humidity(){const t=this.bb.__offset(this.bb_pos,18);return t?this.bb.readInt8(this.bb_pos+t):0}humidityMax(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readInt8(this.bb_pos+t):0}humidityMin(){const t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readInt8(this.bb_pos+t):0}precipitationAmount(){const t=this.bb.__offset(this.bb_pos,24);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmountByType(t,s){const i=this.bb.__offset(this.bb_pos,26);return i?(s||new C).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountByTypeLength(){const t=this.bb.__offset(this.bb_pos,26);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationChance(){const t=this.bb.__offset(this.bb_pos,28);return t?this.bb.readInt8(this.bb_pos+t):0}precipitationType(){const t=this.bb.__offset(this.bb_pos,30);return t?this.bb.readInt8(this.bb_pos+t):P.CLEAR}snowfallAmount(){const t=this.bb.__offset(this.bb_pos,32);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureMax(){const t=this.bb.__offset(this.bb_pos,34);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureMin(){const t=this.bb.__offset(this.bb_pos,36);return t?this.bb.readFloat32(this.bb_pos+t):0}visibilityMax(){const t=this.bb.__offset(this.bb_pos,38);return t?this.bb.readFloat32(this.bb_pos+t):0}visibilityMin(){const t=this.bb.__offset(this.bb_pos,40);return t?this.bb.readFloat32(this.bb_pos+t):0}windDirection(){const t=this.bb.__offset(this.bb_pos,42);return t?this.bb.readInt16(this.bb_pos+t):0}windGustSpeedMax(){const t=this.bb.__offset(this.bb_pos,44);return t?this.bb.readFloat32(this.bb_pos+t):0}windSpeed(){const t=this.bb.__offset(this.bb_pos,46);return t?this.bb.readFloat32(this.bb_pos+t):0}windSpeedMax(){const t=this.bb.__offset(this.bb_pos,48);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationIntensityMax(){const t=this.bb.__offset(this.bb_pos,50);return t?this.bb.readFloat32(this.bb_pos+t):0}perceivedPrecipitationIntensityMax(){const t=this.bb.__offset(this.bb_pos,52);return t?this.bb.readFloat32(this.bb_pos+t):0}uvIndexMin(){const t=this.bb.__offset(this.bb_pos,54);return t?this.bb.readInt8(this.bb_pos+t):0}uvIndexMax(){const t=this.bb.__offset(this.bb_pos,56);return t?this.bb.readInt8(this.bb_pos+t):0}temperatureApparentMin(){const t=this.bb.__offset(this.bb_pos,58);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureApparentMax(){const t=this.bb.__offset(this.bb_pos,60);return t?this.bb.readFloat32(this.bb_pos+t):0}daylight(){const t=this.bb.__offset(this.bb_pos,62);return !!t&&!!this.bb.readInt8(this.bb_pos+t)}static startDayPartForecast(t){t.startObject(30);}static addForecastStart(t,s){t.addFieldInt32(0,s,0);}static addForecastEnd(t,s){t.addFieldInt32(1,s,0);}static addCloudCover(t,s){t.addFieldInt8(2,s,0);}static addCloudCoverLowAltPct(t,s){t.addFieldInt8(3,s,0);}static addCloudCoverMidAltPct(t,s){t.addFieldInt8(4,s,0);}static addCloudCoverHighAltPct(t,s){t.addFieldInt8(5,s,0);}static addConditionCode(t,s){t.addFieldInt8(6,s,y.CLEAR);}static addHumidity(t,s){t.addFieldInt8(7,s,0);}static addHumidityMax(t,s){t.addFieldInt8(8,s,0);}static addHumidityMin(t,s){t.addFieldInt8(9,s,0);}static addPrecipitationAmount(t,s){t.addFieldFloat32(10,s,0);}static addPrecipitationAmountByType(t,s){t.addFieldOffset(11,s,0);}static createPrecipitationAmountByTypeVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startPrecipitationAmountByTypeVector(t,s){t.startVector(4,s,4);}static addPrecipitationChance(t,s){t.addFieldInt8(12,s,0);}static addPrecipitationType(t,s){t.addFieldInt8(13,s,P.CLEAR);}static addSnowfallAmount(t,s){t.addFieldFloat32(14,s,0);}static addTemperatureMax(t,s){t.addFieldFloat32(15,s,0);}static addTemperatureMin(t,s){t.addFieldFloat32(16,s,0);}static addVisibilityMax(t,s){t.addFieldFloat32(17,s,0);}static addVisibilityMin(t,s){t.addFieldFloat32(18,s,0);}static addWindDirection(t,s){t.addFieldInt16(19,s,0);}static addWindGustSpeedMax(t,s){t.addFieldFloat32(20,s,0);}static addWindSpeed(t,s){t.addFieldFloat32(21,s,0);}static addWindSpeedMax(t,s){t.addFieldFloat32(22,s,0);}static addPrecipitationIntensityMax(t,s){t.addFieldFloat32(23,s,0);}static addPerceivedPrecipitationIntensityMax(t,s){t.addFieldFloat32(24,s,0);}static addUvIndexMin(t,s){t.addFieldInt8(25,s,0);}static addUvIndexMax(t,s){t.addFieldInt8(26,s,0);}static addTemperatureApparentMin(t,s){t.addFieldFloat32(27,s,0);}static addTemperatureApparentMax(t,s){t.addFieldFloat32(28,s,0);}static addDaylight(t,s){t.addFieldInt8(29,+s,0);}static endDayPartForecast(t){return t.endObject()}static createDayPartForecast(t,s,i,e,o,n,a,b,r,d,_,h,c,p,l,u,f,N,O,I,F,A,m,U,W,P,T,y,S,C,E){return g.startDayPartForecast(t),g.addForecastStart(t,s),g.addForecastEnd(t,i),g.addCloudCover(t,e),g.addCloudCoverLowAltPct(t,o),g.addCloudCoverMidAltPct(t,n),g.addCloudCoverHighAltPct(t,a),g.addConditionCode(t,b),g.addHumidity(t,r),g.addHumidityMax(t,d),g.addHumidityMin(t,_),g.addPrecipitationAmount(t,h),g.addPrecipitationAmountByType(t,c),g.addPrecipitationChance(t,p),g.addPrecipitationType(t,l),g.addSnowfallAmount(t,u),g.addTemperatureMax(t,f),g.addTemperatureMin(t,N),g.addVisibilityMax(t,O),g.addVisibilityMin(t,I),g.addWindDirection(t,F),g.addWindGustSpeedMax(t,A),g.addWindSpeed(t,m),g.addWindSpeedMax(t,U),g.addPrecipitationIntensityMax(t,W),g.addPerceivedPrecipitationIntensityMax(t,P),g.addUvIndexMin(t,T),g.addUvIndexMax(t,y),g.addTemperatureApparentMin(t,S),g.addTemperatureApparentMax(t,C),g.addDaylight(t,E),g.endDayPartForecast(t)}}!function(t){t[t.NEW=0]="NEW",t[t.WAXING_CRESCENT=1]="WAXING_CRESCENT",t[t.FIRST_QUARTER=2]="FIRST_QUARTER",t[t.WAXING_GIBBOUS=3]="WAXING_GIBBOUS",t[t.FULL=4]="FULL",t[t.WANING_GIBBOUS=5]="WANING_GIBBOUS",t[t.THIRD_QUARTER=6]="THIRD_QUARTER",t[t.WANING_CRESCENT=7]="WANING_CRESCENT",t[t.UNKNOWN8=8]="UNKNOWN8";}(S||(S={}));class K{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsDayWeatherConditions(t,s){return (s||new K).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDayWeatherConditions(t,s){return t.setPosition(t.position()+4),(s||new K).__init(t.readInt32(t.position())+t.position(),t)}forecastStart(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}forecastEnd(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}conditionCode(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):y.CLEAR}humidityMax(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):0}humidityMin(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readInt8(this.bb_pos+t):0}maxUvIndex(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readInt8(this.bb_pos+t):0}moonPhase(){const t=this.bb.__offset(this.bb_pos,16);return t?this.bb.readInt8(this.bb_pos+t):S.NEW}moonrise(){const t=this.bb.__offset(this.bb_pos,18);return t?this.bb.readUint32(this.bb_pos+t):0}moonset(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readUint32(this.bb_pos+t):0}precipitationAmount(){const t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmountByType(t,s){const i=this.bb.__offset(this.bb_pos,24);return i?(s||new C).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}precipitationAmountByTypeLength(){const t=this.bb.__offset(this.bb_pos,24);return t?this.bb.__vector_len(this.bb_pos+t):0}precipitationChance(){const t=this.bb.__offset(this.bb_pos,26);return t?this.bb.readInt8(this.bb_pos+t):0}precipitationType(){const t=this.bb.__offset(this.bb_pos,28);return t?this.bb.readInt8(this.bb_pos+t):P.CLEAR}snowfallAmount(){const t=this.bb.__offset(this.bb_pos,30);return t?this.bb.readFloat32(this.bb_pos+t):0}solarMidnight(){const t=this.bb.__offset(this.bb_pos,32);return t?this.bb.readUint32(this.bb_pos+t):0}solarNoon(){const t=this.bb.__offset(this.bb_pos,34);return t?this.bb.readUint32(this.bb_pos+t):0}sunrise(){const t=this.bb.__offset(this.bb_pos,36);return t?this.bb.readUint32(this.bb_pos+t):0}sunriseCivil(){const t=this.bb.__offset(this.bb_pos,38);return t?this.bb.readUint32(this.bb_pos+t):0}sunriseNautical(){const t=this.bb.__offset(this.bb_pos,40);return t?this.bb.readUint32(this.bb_pos+t):0}sunriseAstronomical(){const t=this.bb.__offset(this.bb_pos,42);return t?this.bb.readUint32(this.bb_pos+t):0}sunset(){const t=this.bb.__offset(this.bb_pos,44);return t?this.bb.readUint32(this.bb_pos+t):0}sunsetCivil(){const t=this.bb.__offset(this.bb_pos,46);return t?this.bb.readUint32(this.bb_pos+t):0}sunsetNautical(){const t=this.bb.__offset(this.bb_pos,48);return t?this.bb.readUint32(this.bb_pos+t):0}sunsetAstronomical(){const t=this.bb.__offset(this.bb_pos,50);return t?this.bb.readUint32(this.bb_pos+t):0}temperatureMax(){const t=this.bb.__offset(this.bb_pos,52);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureMaxTime(){const t=this.bb.__offset(this.bb_pos,54);return t?this.bb.readUint32(this.bb_pos+t):0}temperatureMin(){const t=this.bb.__offset(this.bb_pos,56);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureMinTime(){const t=this.bb.__offset(this.bb_pos,58);return t?this.bb.readUint32(this.bb_pos+t):0}windGustSpeedMax(){const t=this.bb.__offset(this.bb_pos,60);return t?this.bb.readFloat32(this.bb_pos+t):0}windSpeedAvg(){const t=this.bb.__offset(this.bb_pos,62);return t?this.bb.readFloat32(this.bb_pos+t):0}windSpeedMax(){const t=this.bb.__offset(this.bb_pos,64);return t?this.bb.readFloat32(this.bb_pos+t):0}visibilityMax(){const t=this.bb.__offset(this.bb_pos,66);return t?this.bb.readFloat32(this.bb_pos+t):0}visibilityMin(){const t=this.bb.__offset(this.bb_pos,68);return t?this.bb.readFloat32(this.bb_pos+t):0}daytimeForecast(t){const s=this.bb.__offset(this.bb_pos,70);return s?(t||new g).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}overnightForecast(t){const s=this.bb.__offset(this.bb_pos,72);return s?(t||new g).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}restOfDayForecast(t){const s=this.bb.__offset(this.bb_pos,74);return s?(t||new g).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}static startDayWeatherConditions(t){t.startObject(36);}static addForecastStart(t,s){t.addFieldInt32(0,s,0);}static addForecastEnd(t,s){t.addFieldInt32(1,s,0);}static addConditionCode(t,s){t.addFieldInt8(2,s,y.CLEAR);}static addHumidityMax(t,s){t.addFieldInt8(3,s,0);}static addHumidityMin(t,s){t.addFieldInt8(4,s,0);}static addMaxUvIndex(t,s){t.addFieldInt8(5,s,0);}static addMoonPhase(t,s){t.addFieldInt8(6,s,S.NEW);}static addMoonrise(t,s){t.addFieldInt32(7,s,0);}static addMoonset(t,s){t.addFieldInt32(8,s,0);}static addPrecipitationAmount(t,s){t.addFieldFloat32(9,s,0);}static addPrecipitationAmountByType(t,s){t.addFieldOffset(10,s,0);}static createPrecipitationAmountByTypeVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startPrecipitationAmountByTypeVector(t,s){t.startVector(4,s,4);}static addPrecipitationChance(t,s){t.addFieldInt8(11,s,0);}static addPrecipitationType(t,s){t.addFieldInt8(12,s,P.CLEAR);}static addSnowfallAmount(t,s){t.addFieldFloat32(13,s,0);}static addSolarMidnight(t,s){t.addFieldInt32(14,s,0);}static addSolarNoon(t,s){t.addFieldInt32(15,s,0);}static addSunrise(t,s){t.addFieldInt32(16,s,0);}static addSunriseCivil(t,s){t.addFieldInt32(17,s,0);}static addSunriseNautical(t,s){t.addFieldInt32(18,s,0);}static addSunriseAstronomical(t,s){t.addFieldInt32(19,s,0);}static addSunset(t,s){t.addFieldInt32(20,s,0);}static addSunsetCivil(t,s){t.addFieldInt32(21,s,0);}static addSunsetNautical(t,s){t.addFieldInt32(22,s,0);}static addSunsetAstronomical(t,s){t.addFieldInt32(23,s,0);}static addTemperatureMax(t,s){t.addFieldFloat32(24,s,0);}static addTemperatureMaxTime(t,s){t.addFieldInt32(25,s,0);}static addTemperatureMin(t,s){t.addFieldFloat32(26,s,0);}static addTemperatureMinTime(t,s){t.addFieldInt32(27,s,0);}static addWindGustSpeedMax(t,s){t.addFieldFloat32(28,s,0);}static addWindSpeedAvg(t,s){t.addFieldFloat32(29,s,0);}static addWindSpeedMax(t,s){t.addFieldFloat32(30,s,0);}static addVisibilityMax(t,s){t.addFieldFloat32(31,s,0);}static addVisibilityMin(t,s){t.addFieldFloat32(32,s,0);}static addDaytimeForecast(t,s){t.addFieldOffset(33,s,0);}static addOvernightForecast(t,s){t.addFieldOffset(34,s,0);}static addRestOfDayForecast(t,s){t.addFieldOffset(35,s,0);}static endDayWeatherConditions(t){return t.endObject()}}class R{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsDailyForecastData(t,s){return (s||new R).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsDailyForecastData(t,s){return t.setPosition(t.position()+4),(s||new R).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new b).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}days(t,s){const i=this.bb.__offset(this.bb_pos,6);return i?(s||new K).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}daysLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}static startDailyForecastData(t){t.startObject(2);}static addMetadata(t,s){t.addFieldOffset(0,s,0);}static addDays(t,s){t.addFieldOffset(1,s,0);}static createDaysVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startDaysVector(t,s){t.startVector(4,s,4);}static endDailyForecastData(t){return t.endObject()}static createDailyForecastData(t,s,i){return R.startDailyForecastData(t),R.addMetadata(t,s),R.addDays(t,i),R.endDailyForecastData(t)}}let L=class t{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsForecastPeriodSummary(s,i){return (i||new t).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsForecastPeriodSummary(s,i){return s.setPosition(s.position()+4),(i||new t).__init(s.readInt32(s.position())+s.position(),s)}startTime(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}endTime(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}condition(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):P.CLEAR}precipitationChance(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):0}precipitationIntensity(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readFloat32(this.bb_pos+t):0}static startForecastPeriodSummary(t){t.startObject(5);}static addStartTime(t,s){t.addFieldInt32(0,s,0);}static addEndTime(t,s){t.addFieldInt32(1,s,0);}static addCondition(t,s){t.addFieldInt8(2,s,P.CLEAR);}static addPrecipitationChance(t,s){t.addFieldInt8(3,s,0);}static addPrecipitationIntensity(t,s){t.addFieldFloat32(4,s,0);}static endForecastPeriodSummary(t){return t.endObject()}static createForecastPeriodSummary(s,i,e,o,n,a){return t.startForecastPeriodSummary(s),t.addStartTime(s,i),t.addEndTime(s,e),t.addCondition(s,o),t.addPrecipitationChance(s,n),t.addPrecipitationIntensity(s,a),t.endForecastPeriodSummary(s)}};class w{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsForecastPeriodic(t,s){return (s||new w).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsForecastPeriodic(t,s){return t.setPosition(t.position()+4),(s||new w).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new b).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}static startForecastPeriodic(t){t.startObject(1);}static addMetadata(t,s){t.addFieldOffset(0,s,0);}static endForecastPeriodic(t){return t.endObject()}static createForecastPeriodic(t,s){return w.startForecastPeriodic(t),w.addMetadata(t,s),w.endForecastPeriodic(t)}}class v{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsHistoricalComparison(t,s){return (s||new v).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsHistoricalComparison(t,s){return t.setPosition(t.position()+4),(s||new v).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new b).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}comparisons(t,s){const i=this.bb.__offset(this.bb_pos,6);return i?(s||new m).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}comparisonsLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}static startHistoricalComparison(t){t.startObject(2);}static addMetadata(t,s){t.addFieldOffset(0,s,0);}static addComparisons(t,s){t.addFieldOffset(1,s,0);}static createComparisonsVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startComparisonsVector(t,s){t.startVector(4,s,4);}static endHistoricalComparison(t){return t.endObject()}static createHistoricalComparison(t,s,i){return v.startHistoricalComparison(t),v.addMetadata(t,s),v.addComparisons(t,i),v.endHistoricalComparison(t)}}class M{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsHourWeatherConditions(t,s){return (s||new M).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsHourWeatherConditions(t,s){return t.setPosition(t.position()+4),(s||new M).__init(t.readInt32(t.position())+t.position(),t)}forecastStart(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}cloudCover(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverLowAltPct(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverMidAltPct(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):0}cloudCoverHighAltPct(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readInt8(this.bb_pos+t):0}conditionCode(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readInt8(this.bb_pos+t):y.CLEAR}daylight(){const t=this.bb.__offset(this.bb_pos,16);return !!t&&!!this.bb.readInt8(this.bb_pos+t)}humidity(){const t=this.bb.__offset(this.bb_pos,18);return t?this.bb.readInt8(this.bb_pos+t):0}perceivedPrecipitationIntensity(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationAmount(){const t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationIntensity(){const t=this.bb.__offset(this.bb_pos,24);return t?this.bb.readFloat32(this.bb_pos+t):0}precipitationChance(){const t=this.bb.__offset(this.bb_pos,26);return t?this.bb.readInt8(this.bb_pos+t):0}precipitationType(){const t=this.bb.__offset(this.bb_pos,28);return t?this.bb.readInt8(this.bb_pos+t):P.CLEAR}pressure(){const t=this.bb.__offset(this.bb_pos,30);return t?this.bb.readFloat32(this.bb_pos+t):0}pressureTrend(){const t=this.bb.__offset(this.bb_pos,32);return t?this.bb.readInt8(this.bb_pos+t):T.RISING}snowfallAmount(){const t=this.bb.__offset(this.bb_pos,34);return t?this.bb.readFloat32(this.bb_pos+t):0}snowfallIntensity(){const t=this.bb.__offset(this.bb_pos,36);return t?this.bb.readFloat32(this.bb_pos+t):0}temperature(){const t=this.bb.__offset(this.bb_pos,38);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureApparent(){const t=this.bb.__offset(this.bb_pos,40);return t?this.bb.readFloat32(this.bb_pos+t):0}unknown20(){const t=this.bb.__offset(this.bb_pos,42);return t?this.bb.readFloat32(this.bb_pos+t):0}temperatureDewPoint(){const t=this.bb.__offset(this.bb_pos,44);return t?this.bb.readFloat32(this.bb_pos+t):0}uvIndex(){const t=this.bb.__offset(this.bb_pos,46);return t?this.bb.readInt8(this.bb_pos+t):0}visibility(){const t=this.bb.__offset(this.bb_pos,48);return t?this.bb.readFloat32(this.bb_pos+t):0}windDirection(){const t=this.bb.__offset(this.bb_pos,50);return t?this.bb.readInt16(this.bb_pos+t):0}windGust(){const t=this.bb.__offset(this.bb_pos,52);return t?this.bb.readFloat32(this.bb_pos+t):0}windSpeed(){const t=this.bb.__offset(this.bb_pos,54);return t?this.bb.readFloat32(this.bb_pos+t):0}static startHourWeatherConditions(t){t.startObject(26);}static addForecastStart(t,s){t.addFieldInt32(0,s,0);}static addCloudCover(t,s){t.addFieldInt8(1,s,0);}static addCloudCoverLowAltPct(t,s){t.addFieldInt8(2,s,0);}static addCloudCoverMidAltPct(t,s){t.addFieldInt8(3,s,0);}static addCloudCoverHighAltPct(t,s){t.addFieldInt8(4,s,0);}static addConditionCode(t,s){t.addFieldInt8(5,s,y.CLEAR);}static addDaylight(t,s){t.addFieldInt8(6,+s,0);}static addHumidity(t,s){t.addFieldInt8(7,s,0);}static addPerceivedPrecipitationIntensity(t,s){t.addFieldFloat32(8,s,0);}static addPrecipitationAmount(t,s){t.addFieldFloat32(9,s,0);}static addPrecipitationIntensity(t,s){t.addFieldFloat32(10,s,0);}static addPrecipitationChance(t,s){t.addFieldInt8(11,s,0);}static addPrecipitationType(t,s){t.addFieldInt8(12,s,P.CLEAR);}static addPressure(t,s){t.addFieldFloat32(13,s,0);}static addPressureTrend(t,s){t.addFieldInt8(14,s,T.RISING);}static addSnowfallAmount(t,s){t.addFieldFloat32(15,s,0);}static addSnowfallIntensity(t,s){t.addFieldFloat32(16,s,0);}static addTemperature(t,s){t.addFieldFloat32(17,s,0);}static addTemperatureApparent(t,s){t.addFieldFloat32(18,s,0);}static addUnknown20(t,s){t.addFieldFloat32(19,s,0);}static addTemperatureDewPoint(t,s){t.addFieldFloat32(20,s,0);}static addUvIndex(t,s){t.addFieldInt8(21,s,0);}static addVisibility(t,s){t.addFieldFloat32(22,s,0);}static addWindDirection(t,s){t.addFieldInt16(23,s,0);}static addWindGust(t,s){t.addFieldFloat32(24,s,0);}static addWindSpeed(t,s){t.addFieldFloat32(25,s,0);}static endHourWeatherConditions(t){return t.endObject()}static createHourWeatherConditions(t,s,i,e,o,n,a,b,r,d,_,h,c,p,l,u,f,N,O,I,F,A,m,U,W,P,T){return M.startHourWeatherConditions(t),M.addForecastStart(t,s),M.addCloudCover(t,i),M.addCloudCoverLowAltPct(t,e),M.addCloudCoverMidAltPct(t,o),M.addCloudCoverHighAltPct(t,n),M.addConditionCode(t,a),M.addDaylight(t,b),M.addHumidity(t,r),M.addPerceivedPrecipitationIntensity(t,d),M.addPrecipitationAmount(t,_),M.addPrecipitationIntensity(t,h),M.addPrecipitationChance(t,c),M.addPrecipitationType(t,p),M.addPressure(t,l),M.addPressureTrend(t,u),M.addSnowfallAmount(t,f),M.addSnowfallIntensity(t,N),M.addTemperature(t,O),M.addTemperatureApparent(t,I),M.addUnknown20(t,F),M.addTemperatureDewPoint(t,A),M.addUvIndex(t,m),M.addVisibility(t,U),M.addWindDirection(t,W),M.addWindGust(t,P),M.addWindSpeed(t,T),M.endHourWeatherConditions(t)}}class D{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsHourlyForecastData(t,s){return (s||new D).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsHourlyForecastData(t,s){return t.setPosition(t.position()+4),(s||new D).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new b).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}hours(t,s){const i=this.bb.__offset(this.bb_pos,6);return i?(s||new M).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}hoursLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}static startHourlyForecastData(t){t.startObject(2);}static addMetadata(t,s){t.addFieldOffset(0,s,0);}static addHours(t,s){t.addFieldOffset(1,s,0);}static createHoursVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startHoursVector(t,s){t.startVector(4,s,4);}static endHourlyForecastData(t){return t.endObject()}static createHourlyForecastData(t,s,i){return D.startHourlyForecastData(t),D.addMetadata(t,s),D.addHours(t,i),D.endHourlyForecastData(t)}}var V,x;!function(t){t[t.NORMAL=0]="NORMAL",t[t.LOW=1]="LOW",t[t.HIGH=2]="HIGH",t[t.UNKNOWN3=3]="UNKNOWN3",t[t.UNKNOWN4=4]="UNKNOWN4",t[t.UNKNOWN5=5]="UNKNOWN5";}(V||(V={}));class H{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsLocationInfo(t,s){return (s||new H).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsLocationInfo(t,s){return t.setPosition(t.position()+4),(s||new H).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new b).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}preciseName(t){const s=this.bb.__offset(this.bb_pos,6);return s?this.bb.__string(this.bb_pos+s,t):null}countryCode(t){const s=this.bb.__offset(this.bb_pos,8);return s?this.bb.__string(this.bb_pos+s,t):null}timeZone(t){const s=this.bb.__offset(this.bb_pos,10);return s?this.bb.__string(this.bb_pos+s,t):null}primaryName(t){const s=this.bb.__offset(this.bb_pos,12);return s?this.bb.__string(this.bb_pos+s,t):null}static startLocationInfo(t){t.startObject(5);}static addMetadata(t,s){t.addFieldOffset(0,s,0);}static addPreciseName(t,s){t.addFieldOffset(1,s,0);}static addCountryCode(t,s){t.addFieldOffset(2,s,0);}static addTimeZone(t,s){t.addFieldOffset(3,s,0);}static addPrimaryName(t,s){t.addFieldOffset(4,s,0);}static endLocationInfo(t){return t.endObject()}static createLocationInfo(t,s,i,e,o,n){return H.startLocationInfo(t),H.addMetadata(t,s),H.addPreciseName(t,i),H.addCountryCode(t,e),H.addTimeZone(t,o),H.addPrimaryName(t,n),H.endLocationInfo(t)}}!function(t){t[t.UNKNOWN0=0]="UNKNOWN0",t[t.AIR_QUALITY_DETAILS=1]="AIR_QUALITY_DETAILS",t[t.UNKNOWN2=2]="UNKNOWN2",t[t.UNKNOWN3=3]="UNKNOWN3",t[t.UNKNOWN4=4]="UNKNOWN4",t[t.UNKNOWN5=5]="UNKNOWN5",t[t.UNKNOWN6=6]="UNKNOWN6",t[t.UNKNOWN7=7]="UNKNOWN7",t[t.UNKNOWN8=8]="UNKNOWN8",t[t.TEMPERATURE_FEELS_LIKE_DETAILS=9]="TEMPERATURE_FEELS_LIKE_DETAILS",t[t.UNKNOWN10=10]="UNKNOWN10",t[t.TRENDS=11]="TRENDS",t[t.UV_DETAILS=12]="UV_DETAILS",t[t.UNKNOWN13=13]="UNKNOWN13",t[t.WIND_DETAILS=14]="WIND_DETAILS",t[t.UNKNOWN15=15]="UNKNOWN15",t[t.UNKNOWN16=16]="UNKNOWN16",t[t.UNKNOWN17=17]="UNKNOWN17",t[t.UNKNOWN18=18]="UNKNOWN18";}(x||(x={}));class B{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsPlacement(t,s){return (s||new B).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsPlacement(t,s){return t.setPosition(t.position()+4),(s||new B).__init(t.readInt32(t.position())+t.position(),t)}priority(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt8(this.bb_pos+t):0}articles(t,s){const i=this.bb.__offset(this.bb_pos,6);return i?(s||new c).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}articlesLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}placement(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):x.UNKNOWN0}static startPlacement(t){t.startObject(3);}static addPriority(t,s){t.addFieldInt8(0,s,0);}static addArticles(t,s){t.addFieldOffset(1,s,0);}static createArticlesVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startArticlesVector(t,s){t.startVector(4,s,4);}static addPlacement(t,s){t.addFieldInt8(2,s,x.UNKNOWN0);}static endPlacement(t){return t.endObject()}static createPlacement(t,s,i,e){return B.startPlacement(t),B.addPriority(t,s),B.addArticles(t,i),B.addPlacement(t,e),B.endPlacement(t)}}class j{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsNews(t,s){return (s||new j).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNews(t,s){return t.setPosition(t.position()+4),(s||new j).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new b).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}placements(t,s){const i=this.bb.__offset(this.bb_pos,6);return i?(s||new B).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}placementsLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}static startNews(t){t.startObject(2);}static addMetadata(t,s){t.addFieldOffset(0,s,0);}static addPlacements(t,s){t.addFieldOffset(1,s,0);}static createPlacementsVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startPlacementsVector(t,s){t.startVector(4,s,4);}static endNews(t){return t.endObject()}static createNews(t,s,i){return j.startNews(t),j.addMetadata(t,s),j.addPlacements(t,i),j.endNews(t)}}let G=class t{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsNextHourForecastData(s,i){return (i||new t).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsNextHourForecastData(s,i){return s.setPosition(s.position()+4),(i||new t).__init(s.readInt32(s.position())+s.position(),s)}metadata(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new b).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}condition(t,s){const i=this.bb.__offset(this.bb_pos,6);return i?(s||new W).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}conditionLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}summary(t,s){const i=this.bb.__offset(this.bb_pos,8);return i?(s||new L).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}summaryLength(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}forecastStart(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readUint32(this.bb_pos+t):0}forecastEnd(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readUint32(this.bb_pos+t):0}minutes(t,s){const e=this.bb.__offset(this.bb_pos,14);return e?(s||new i).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+e)+4*t),this.bb):null}minutesLength(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__vector_len(this.bb_pos+t):0}static startNextHourForecastData(t){t.startObject(6);}static addMetadata(t,s){t.addFieldOffset(0,s,0);}static addCondition(t,s){t.addFieldOffset(1,s,0);}static createConditionVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startConditionVector(t,s){t.startVector(4,s,4);}static addSummary(t,s){t.addFieldOffset(2,s,0);}static createSummaryVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startSummaryVector(t,s){t.startVector(4,s,4);}static addForecastStart(t,s){t.addFieldInt32(3,s,0);}static addForecastEnd(t,s){t.addFieldInt32(4,s,0);}static addMinutes(t,s){t.addFieldOffset(5,s,0);}static createMinutesVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startMinutesVector(t,s){t.startVector(4,s,4);}static endNextHourForecastData(t){return t.endObject()}static createNextHourForecastData(s,i,e,o,n,a,b){return t.startNextHourForecastData(s),t.addMetadata(s,i),t.addCondition(s,e),t.addSummary(s,o),t.addForecastStart(s,n),t.addForecastEnd(s,a),t.addMinutes(s,b),t.endNextHourForecastData(s)}};var Y,z,Z,k;!function(t){t[t.UNKNOWN0=0]="UNKNOWN0",t[t.SHELTER=1]="SHELTER",t[t.EVACUATE=2]="EVACUATE",t[t.PREPARE=3]="PREPARE",t[t.EXECUTE=4]="EXECUTE",t[t.AVOID=5]="AVOID",t[t.MONITOR=6]="MONITOR",t[t.ACCESS=7]="ACCESS",t[t.ALLCLEAR=8]="ALLCLEAR",t[t.NONE=9]="NONE",t[t.UNKNOWN10=10]="UNKNOWN10";}(Y||(Y={})),function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.EXTREME=1]="EXTREME",t[t.SEVERE=2]="SEVERE",t[t.MODERATE=3]="MODERATE",t[t.MINOR=4]="MINOR",t[t.UNKNOWN5=5]="UNKNOWN5";}(z||(z={})),function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.UNKNOWN1=1]="UNKNOWN1",t[t.UNKNOWN2=2]="UNKNOWN2",t[t.UNKNOWN3=3]="UNKNOWN3",t[t.UNKNOWN4=4]="UNKNOWN4",t[t.UNKNOWN5=5]="UNKNOWN5",t[t.UNKNOWN6=6]="UNKNOWN6",t[t.UNKNOWN7=7]="UNKNOWN7",t[t.UNKNOWN8=8]="UNKNOWN8",t[t.UNKNOWN9=9]="UNKNOWN9",t[t.STATEMENT=10]="STATEMENT",t[t.WARNING=11]="WARNING",t[t.ADVISORY=12]="ADVISORY",t[t.UNKNOWN13=13]="UNKNOWN13";}(Z||(Z={})),function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.IMMEDIATE=1]="IMMEDIATE",t[t.EXPECTED=2]="EXPECTED",t[t.FUTURE=3]="FUTURE",t[t.PAST=4]="PAST",t[t.UNKNOWN5=5]="UNKNOWN5";}(k||(k={}));let Q=class t{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsWeatherAlertSummary(s,i){return (i||new t).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsWeatherAlertSummary(s,i){return s.setPosition(s.position()+4),(i||new t).__init(s.readInt32(s.position())+s.position(),s)}id(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new e).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}areaId(t){const s=this.bb.__offset(this.bb_pos,6);return s?this.bb.__string(this.bb_pos+s,t):null}areaName(t){const s=this.bb.__offset(this.bb_pos,8);return s?this.bb.__string(this.bb_pos+s,t):null}attributionUrl(t){const s=this.bb.__offset(this.bb_pos,10);return s?this.bb.__string(this.bb_pos+s,t):null}countryCode(t){const s=this.bb.__offset(this.bb_pos,12);return s?this.bb.__string(this.bb_pos+s,t):null}description(t){const s=this.bb.__offset(this.bb_pos,14);return s?this.bb.__string(this.bb_pos+s,t):null}token(t){const s=this.bb.__offset(this.bb_pos,16);return s?this.bb.__string(this.bb_pos+s,t):null}effectiveTime(){const t=this.bb.__offset(this.bb_pos,18);return t?this.bb.readUint32(this.bb_pos+t):0}expireTime(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readUint32(this.bb_pos+t):0}issuedTime(){const t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readUint32(this.bb_pos+t):0}eventOnsetTime(){const t=this.bb.__offset(this.bb_pos,24);return t?this.bb.readUint32(this.bb_pos+t):0}eventEndTime(){const t=this.bb.__offset(this.bb_pos,26);return t?this.bb.readUint32(this.bb_pos+t):0}detailsUrl(t){const s=this.bb.__offset(this.bb_pos,28);return s?this.bb.__string(this.bb_pos+s,t):null}phenomenon(t){const s=this.bb.__offset(this.bb_pos,30);return s?this.bb.__string(this.bb_pos+s,t):null}severity(){const t=this.bb.__offset(this.bb_pos,32);return t?this.bb.readInt8(this.bb_pos+t):z.UNKNOWN}significance(){const t=this.bb.__offset(this.bb_pos,34);return t?this.bb.readInt8(this.bb_pos+t):Z.UNKNOWN}source(t){const s=this.bb.__offset(this.bb_pos,36);return s?this.bb.__string(this.bb_pos+s,t):null}eventSource(t){const s=this.bb.__offset(this.bb_pos,38);return s?this.bb.__string(this.bb_pos+s,t):null}urgency(){const t=this.bb.__offset(this.bb_pos,40);return t?this.bb.readInt8(this.bb_pos+t):k.UNKNOWN}certainty(){const t=this.bb.__offset(this.bb_pos,42);return t?this.bb.readInt8(this.bb_pos+t):l.UNKNOWN}importance(){const t=this.bb.__offset(this.bb_pos,44);return t?this.bb.readInt8(this.bb_pos+t):V.NORMAL}responses(t){const s=this.bb.__offset(this.bb_pos,46);return s?this.bb.readInt8(this.bb.__vector(this.bb_pos+s)+t):0}responsesLength(){const t=this.bb.__offset(this.bb_pos,46);return t?this.bb.__vector_len(this.bb_pos+t):0}responsesArray(){const t=this.bb.__offset(this.bb_pos,46);return t?new Int8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+t),this.bb.__vector_len(this.bb_pos+t)):null}unknown23(){const t=this.bb.__offset(this.bb_pos,48);return t?this.bb.readInt8(this.bb_pos+t):0}unknown24(){const t=this.bb.__offset(this.bb_pos,50);return t?this.bb.readInt8(this.bb_pos+t):0}unknown25(){const t=this.bb.__offset(this.bb_pos,52);return t?this.bb.readInt8(this.bb_pos+t):0}unknown26(){const t=this.bb.__offset(this.bb_pos,54);return t?this.bb.readInt8(this.bb_pos+t):0}static startWeatherAlertSummary(t){t.startObject(26);}static addId(t,s){t.addFieldOffset(0,s,0);}static addAreaId(t,s){t.addFieldOffset(1,s,0);}static addAreaName(t,s){t.addFieldOffset(2,s,0);}static addAttributionUrl(t,s){t.addFieldOffset(3,s,0);}static addCountryCode(t,s){t.addFieldOffset(4,s,0);}static addDescription(t,s){t.addFieldOffset(5,s,0);}static addToken(t,s){t.addFieldOffset(6,s,0);}static addEffectiveTime(t,s){t.addFieldInt32(7,s,0);}static addExpireTime(t,s){t.addFieldInt32(8,s,0);}static addIssuedTime(t,s){t.addFieldInt32(9,s,0);}static addEventOnsetTime(t,s){t.addFieldInt32(10,s,0);}static addEventEndTime(t,s){t.addFieldInt32(11,s,0);}static addDetailsUrl(t,s){t.addFieldOffset(12,s,0);}static addPhenomenon(t,s){t.addFieldOffset(13,s,0);}static addSeverity(t,s){t.addFieldInt8(14,s,z.UNKNOWN);}static addSignificance(t,s){t.addFieldInt8(15,s,Z.UNKNOWN);}static addSource(t,s){t.addFieldOffset(16,s,0);}static addEventSource(t,s){t.addFieldOffset(17,s,0);}static addUrgency(t,s){t.addFieldInt8(18,s,k.UNKNOWN);}static addCertainty(t,s){t.addFieldInt8(19,s,l.UNKNOWN);}static addImportance(t,s){t.addFieldInt8(20,s,V.NORMAL);}static addResponses(t,s){t.addFieldOffset(21,s,0);}static createResponsesVector(t,s){t.startVector(1,s.length,1);for(let i=s.length-1;i>=0;i--)t.addInt8(s[i]);return t.endVector()}static startResponsesVector(t,s){t.startVector(1,s,1);}static addUnknown23(t,s){t.addFieldInt8(22,s,0);}static addUnknown24(t,s){t.addFieldInt8(23,s,0);}static addUnknown25(t,s){t.addFieldInt8(24,s,0);}static addUnknown26(t,s){t.addFieldInt8(25,s,0);}static endWeatherAlertSummary(t){return t.endObject()}static createWeatherAlertSummary(s,i,e,o,n,a,b,r,d,_,h,c,p,l,u,f,N,O,I,F,A,m,U,W,P,T,y){return t.startWeatherAlertSummary(s),t.addId(s,i),t.addAreaId(s,e),t.addAreaName(s,o),t.addAttributionUrl(s,n),t.addCountryCode(s,a),t.addDescription(s,b),t.addToken(s,r),t.addEffectiveTime(s,d),t.addExpireTime(s,_),t.addIssuedTime(s,h),t.addEventOnsetTime(s,c),t.addEventEndTime(s,p),t.addDetailsUrl(s,l),t.addPhenomenon(s,u),t.addSeverity(s,f),t.addSignificance(s,N),t.addSource(s,O),t.addEventSource(s,I),t.addUrgency(s,F),t.addCertainty(s,A),t.addImportance(s,m),t.addResponses(s,U),t.addUnknown23(s,W),t.addUnknown24(s,P),t.addUnknown25(s,T),t.addUnknown26(s,y),t.endWeatherAlertSummary(s)}},X=class t{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsWeatherAlertCollectionData(s,i){return (i||new t).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsWeatherAlertCollectionData(s,i){return s.setPosition(s.position()+4),(i||new t).__init(s.readInt32(s.position())+s.position(),s)}metadata(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new b).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}detailsUrl(t){const s=this.bb.__offset(this.bb_pos,6);return s?this.bb.__string(this.bb_pos+s,t):null}alerts(t,s){const i=this.bb.__offset(this.bb_pos,8);return i?(s||new Q).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}alertsLength(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}static startWeatherAlertCollectionData(t){t.startObject(3);}static addMetadata(t,s){t.addFieldOffset(0,s,0);}static addDetailsUrl(t,s){t.addFieldOffset(1,s,0);}static addAlerts(t,s){t.addFieldOffset(2,s,0);}static createAlertsVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startAlertsVector(t,s){t.startVector(4,s,4);}static endWeatherAlertCollectionData(t){return t.endObject()}static createWeatherAlertCollectionData(s,i,e,o){return t.startWeatherAlertCollectionData(s),t.addMetadata(s,i),t.addDetailsUrl(s,e),t.addAlerts(s,o),t.endWeatherAlertCollectionData(s)}};class q{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsWeatherChanges(t,s){return (s||new q).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsWeatherChanges(t,s){return t.setPosition(t.position()+4),(s||new q).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new b).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}forecastStart(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}forecastEnd(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readUint32(this.bb_pos+t):0}changes(t,s){const i=this.bb.__offset(this.bb_pos,10);return i?(s||new A).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}changesLength(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.__vector_len(this.bb_pos+t):0}static startWeatherChanges(t){t.startObject(4);}static addMetadata(t,s){t.addFieldOffset(0,s,0);}static addForecastStart(t,s){t.addFieldInt32(1,s,0);}static addForecastEnd(t,s){t.addFieldInt32(2,s,0);}static addChanges(t,s){t.addFieldOffset(3,s,0);}static createChangesVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startChangesVector(t,s){t.startVector(4,s,4);}static endWeatherChanges(t){return t.endObject()}static createWeatherChanges(t,s,i,e,o){return q.startWeatherChanges(t),q.addMetadata(t,s),q.addForecastStart(t,i),q.addForecastEnd(t,e),q.addChanges(t,o),q.endWeatherChanges(t)}}var J,$,tt,st,it,et,ot,nt,at,bt,rt,dt,_t,ht=Object.freeze({__proto__:null,AirQuality:h,Articles:c,get BaselineType(){return p},get Certainty(){return l},Change:A,Common:a,Comparison:m,get ComparisonTrend(){return o},get ComparisonType(){return f},Condition:W,get ConditionType(){return O},CurrentWeatherData:E,DailyForecastData:R,DayPartForecast:g,DayWeatherConditions:K,get Deviation(){return N},get Direction(){return u},ForecastPeriodSummary:L,ForecastPeriodic:w,get ForecastToken(){return I},HistoricalComparison:v,HourWeatherConditions:M,HourlyForecastData:D,get ImportanceType(){return V},LocationInfo:H,Metadata:b,get MoonPhase(){return S},News:j,NextHourForecastData:G,Parameter:U,get ParameterType(){return F},Placement:B,get PlacementType(){return x},Pollutant:_,get PollutantType(){return r},PrecipitationAmountByType:C,get PrecipitationType(){return P},get PressureTrend(){return T},get ResponseType(){return Y},get Severity(){return z},get SignificanceType(){return Z},get SourceType(){return n},get UnitType(){return d},get Urgency(){return k},Weather:class t{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsWeather(s,i){return (i||new t).__init(s.readInt32(s.position())+s.position(),s)}static getSizePrefixedRootAsWeather(s,i){return s.setPosition(s.position()+4),(i||new t).__init(s.readInt32(s.position())+s.position(),s)}airQuality(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new h).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}currentWeather(t){const s=this.bb.__offset(this.bb_pos,6);return s?(t||new E).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}forecastDaily(t){const s=this.bb.__offset(this.bb_pos,8);return s?(t||new R).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}forecastHourly(t){const s=this.bb.__offset(this.bb_pos,10);return s?(t||new D).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}forecastNextHour(t){const s=this.bb.__offset(this.bb_pos,12);return s?(t||new G).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}news(t){const s=this.bb.__offset(this.bb_pos,14);return s?(t||new j).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}weatherAlerts(t){const s=this.bb.__offset(this.bb_pos,16);return s?(t||new X).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}weatherChanges(t){const s=this.bb.__offset(this.bb_pos,18);return s?(t||new q).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}historicalComparisons(t){const s=this.bb.__offset(this.bb_pos,20);return s?(t||new v).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}locationInfo(t){const s=this.bb.__offset(this.bb_pos,22);return s?(t||new H).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}static startWeather(t){t.startObject(10);}static addAirQuality(t,s){t.addFieldOffset(0,s,0);}static addCurrentWeather(t,s){t.addFieldOffset(1,s,0);}static addForecastDaily(t,s){t.addFieldOffset(2,s,0);}static addForecastHourly(t,s){t.addFieldOffset(3,s,0);}static addForecastNextHour(t,s){t.addFieldOffset(4,s,0);}static addNews(t,s){t.addFieldOffset(5,s,0);}static addWeatherAlerts(t,s){t.addFieldOffset(6,s,0);}static addWeatherChanges(t,s){t.addFieldOffset(7,s,0);}static addHistoricalComparisons(t,s){t.addFieldOffset(8,s,0);}static addLocationInfo(t,s){t.addFieldOffset(9,s,0);}static endWeather(t){return t.endObject()}static finishWeatherBuffer(t,s){t.finish(s);}static finishSizePrefixedWeatherBuffer(t,s){t.finish(s,void 0,true);}},WeatherAlertCollectionData:X,WeatherAlertSummary:Q,WeatherChanges:q,get WeatherCondition(){return y}});!function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.UNKNOWN1=1]="UNKNOWN1",t[t.WORSE=2]="WORSE",t[t.SAME=3]="SAME",t[t.BETTER=4]="BETTER";}(J||(J={})),function(t){t[t.UNKNOWN0=0]="UNKNOWN0",t[t.UNKNOWN1=1]="UNKNOWN1",t[t.MODELED=2]="MODELED",t[t.STATION=3]="STATION";}($||($={}));class ct{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsMetadata(t,s){return (s||new ct).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsMetadata(t,s){return t.setPosition(t.position()+4),(s||new ct).__init(t.readInt32(t.position())+t.position(),t)}attributionUrl(t){const s=this.bb.__offset(this.bb_pos,4);return s?this.bb.__string(this.bb_pos+s,t):null}expireTime(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}language(t){const s=this.bb.__offset(this.bb_pos,8);return s?this.bb.__string(this.bb_pos+s,t):null}latitude(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readFloat32(this.bb_pos+t):0}longitude(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readFloat32(this.bb_pos+t):0}providerLogo(t){const s=this.bb.__offset(this.bb_pos,14);return s?this.bb.__string(this.bb_pos+s,t):null}providerName(t){const s=this.bb.__offset(this.bb_pos,16);return s?this.bb.__string(this.bb_pos+s,t):null}readTime(){const t=this.bb.__offset(this.bb_pos,18);return t?this.bb.readUint32(this.bb_pos+t):0}reportedTime(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readUint32(this.bb_pos+t):0}temporarilyUnavailable(){const t=this.bb.__offset(this.bb_pos,22);return !!t&&!!this.bb.readInt8(this.bb_pos+t)}sourceType(){const t=this.bb.__offset(this.bb_pos,24);return t?this.bb.readInt8(this.bb_pos+t):$.UNKNOWN0}static startMetadata(t){t.startObject(11);}static addAttributionUrl(t,s){t.addFieldOffset(0,s,0);}static addExpireTime(t,s){t.addFieldInt32(1,s,0);}static addLanguage(t,s){t.addFieldOffset(2,s,0);}static addLatitude(t,s){t.addFieldFloat32(3,s,0);}static addLongitude(t,s){t.addFieldFloat32(4,s,0);}static addProviderLogo(t,s){t.addFieldOffset(5,s,0);}static addProviderName(t,s){t.addFieldOffset(6,s,0);}static addReadTime(t,s){t.addFieldInt32(7,s,0);}static addReportedTime(t,s){t.addFieldInt32(8,s,0);}static addTemporarilyUnavailable(t,s){t.addFieldInt8(9,+s,0);}static addSourceType(t,s){t.addFieldInt8(10,s,$.UNKNOWN0);}static endMetadata(t){return t.endObject()}static createMetadata(t,s,i,e,o,n,a,b,r,d,_,h){return ct.startMetadata(t),ct.addAttributionUrl(t,s),ct.addExpireTime(t,i),ct.addLanguage(t,e),ct.addLatitude(t,o),ct.addLongitude(t,n),ct.addProviderLogo(t,a),ct.addProviderName(t,b),ct.addReadTime(t,r),ct.addReportedTime(t,d),ct.addTemporarilyUnavailable(t,_),ct.addSourceType(t,h),ct.endMetadata(t)}}!function(t){t[t.UNKNOWN0=0]="UNKNOWN0",t[t.NOT_AVAILABLE=1]="NOT_AVAILABLE",t[t.UNKNOWN2=2]="UNKNOWN2",t[t.UNKNOWN3=3]="UNKNOWN3",t[t.UNKNOWN4=4]="UNKNOWN4",t[t.NO=5]="NO",t[t.NO2=6]="NO2",t[t.NOX=7]="NOX",t[t.OZONE=8]="OZONE",t[t.PM2_5=9]="PM2_5",t[t.SO2=10]="SO2",t[t.PM10=11]="PM10",t[t.CO=12]="CO";}(tt||(tt={})),function(t){t[t.UNKNOWN0=0]="UNKNOWN0",t[t.PARTS_PER_BILLION=1]="PARTS_PER_BILLION",t[t.MICROGRAMS_PER_CUBIC_METER=2]="MICROGRAMS_PER_CUBIC_METER";}(st||(st={}));class pt{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsPollutant(t,s){return (s||new pt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsPollutant(t,s){return t.setPosition(t.position()+4),(s||new pt).__init(t.readInt32(t.position())+t.position(),t)}pollutantType(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt8(this.bb_pos+t):tt.UNKNOWN0}amount(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readFloat32(this.bb_pos+t):0}units(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):st.UNKNOWN0}static startPollutant(t){t.startObject(3);}static addPollutantType(t,s){t.addFieldInt8(0,s,tt.UNKNOWN0);}static addAmount(t,s){t.addFieldFloat32(1,s,0);}static addUnits(t,s){t.addFieldInt8(2,s,st.UNKNOWN0);}static endPollutant(t){return t.endObject()}static createPollutant(t,s,i,e){return pt.startPollutant(t),pt.addPollutantType(t,s),pt.addAmount(t,i),pt.addUnits(t,e),pt.endPollutant(t)}}class lt{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsAirQuality(t,s){return (s||new lt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsAirQuality(t,s){return t.setPosition(t.position()+4),(s||new lt).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new ct).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}categoryIndex(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readInt8(this.bb_pos+t):0}index(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt16(this.bb_pos+t):0}isSignificant(){const t=this.bb.__offset(this.bb_pos,10);return !!t&&!!this.bb.readInt8(this.bb_pos+t)}pollutants(t,s){const i=this.bb.__offset(this.bb_pos,12);return i?(s||new pt).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}pollutantsLength(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.__vector_len(this.bb_pos+t):0}previousDayComparison(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.readInt8(this.bb_pos+t):J.UNKNOWN}primaryPollutant(){const t=this.bb.__offset(this.bb_pos,16);return t?this.bb.readInt8(this.bb_pos+t):tt.UNKNOWN0}scale(t){const s=this.bb.__offset(this.bb_pos,18);return s?this.bb.__string(this.bb_pos+s,t):null}static startAirQuality(t){t.startObject(8);}static addMetadata(t,s){t.addFieldOffset(0,s,0);}static addCategoryIndex(t,s){t.addFieldInt8(1,s,0);}static addIndex(t,s){t.addFieldInt16(2,s,0);}static addIsSignificant(t,s){t.addFieldInt8(3,+s,0);}static addPollutants(t,s){t.addFieldOffset(4,s,0);}static createPollutantsVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startPollutantsVector(t,s){t.startVector(4,s,4);}static addPreviousDayComparison(t,s){t.addFieldInt8(5,s,J.UNKNOWN);}static addPrimaryPollutant(t,s){t.addFieldInt8(6,s,tt.UNKNOWN0);}static addScale(t,s){t.addFieldOffset(7,s,0);}static endAirQuality(t){return t.endObject()}static createAirQuality(t,s,i,e,o,n,a,b,r){return lt.startAirQuality(t),lt.addMetadata(t,s),lt.addCategoryIndex(t,i),lt.addIndex(t,e),lt.addIsSignificant(t,o),lt.addPollutants(t,n),lt.addPreviousDayComparison(t,a),lt.addPrimaryPollutant(t,b),lt.addScale(t,r),lt.endAirQuality(t)}}!function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.UNKNOWN1=1]="UNKNOWN1",t[t.LIKELY=2]="LIKELY";}(it||(it={})),function(t){t[t.UNKNOWN0=0]="UNKNOWN0",t[t.CLEAR=1]="CLEAR",t[t.UNKNOWN2=2]="UNKNOWN2",t[t.UNKNOWN3=3]="UNKNOWN3",t[t.UNKNOWN4=4]="UNKNOWN4",t[t.UNKNOWN5=5]="UNKNOWN5",t[t.UNKNOWN6=6]="UNKNOWN6",t[t.RAIN=7]="RAIN",t[t.DRIZZLE=8]="DRIZZLE";}(et||(et={})),function(t){t[t.UNKNOWN0=0]="UNKNOWN0",t[t.CLEAR=1]="CLEAR",t[t.START=2]="START",t[t.STOP=3]="STOP",t[t.START_STOP=4]="START_STOP",t[t.UNKNOWN5=5]="UNKNOWN5",t[t.CONSTANT=6]="CONSTANT";}(ot||(ot={})),function(t){t[t.UNKNOWN0=0]="UNKNOWN0",t[t.FIRST_AT=1]="FIRST_AT",t[t.SECOND_AT=2]="SECOND_AT";}(nt||(nt={}));class ut{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsParameter(t,s){return (s||new ut).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsParameter(t,s){return t.setPosition(t.position()+4),(s||new ut).__init(t.readInt32(t.position())+t.position(),t)}type(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readInt8(this.bb_pos+t):nt.UNKNOWN0}date(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}static startParameter(t){t.startObject(2);}static addType(t,s){t.addFieldInt8(0,s,nt.UNKNOWN0);}static addDate(t,s){t.addFieldInt32(1,s,0);}static endParameter(t){return t.endObject()}static createParameter(t,s,i){return ut.startParameter(t),ut.addType(t,s),ut.addDate(t,i),ut.endParameter(t)}}class ft{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsCondition(t,s){return (s||new ft).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsCondition(t,s){return t.setPosition(t.position()+4),(s||new ft).__init(t.readInt32(t.position())+t.position(),t)}startTime(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}endTime(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}forecastToken(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.readInt8(this.bb_pos+t):ot.UNKNOWN0}beginCondition(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):et.UNKNOWN0}endCondition(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readInt8(this.bb_pos+t):et.UNKNOWN0}parameters(t,s){const i=this.bb.__offset(this.bb_pos,14);return i?(s||new ut).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}parametersLength(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__vector_len(this.bb_pos+t):0}static startCondition(t){t.startObject(6);}static addStartTime(t,s){t.addFieldInt32(0,s,0);}static addEndTime(t,s){t.addFieldInt32(1,s,0);}static addForecastToken(t,s){t.addFieldInt8(2,s,ot.UNKNOWN0);}static addBeginCondition(t,s){t.addFieldInt8(3,s,et.UNKNOWN0);}static addEndCondition(t,s){t.addFieldInt8(4,s,et.UNKNOWN0);}static addParameters(t,s){t.addFieldOffset(5,s,0);}static createParametersVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startParametersVector(t,s){t.startVector(4,s,4);}static endCondition(t){return t.endObject()}static createCondition(t,s,i,e,o,n,a){return ft.startCondition(t),ft.addStartTime(t,s),ft.addEndTime(t,i),ft.addForecastToken(t,e),ft.addBeginCondition(t,o),ft.addEndCondition(t,n),ft.addParameters(t,a),ft.endCondition(t)}}class Nt{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsForecastPeriodSummary(t,s){return (s||new Nt).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsForecastPeriodSummary(t,s){return t.setPosition(t.position()+4),(s||new Nt).__init(t.readInt32(t.position())+t.position(),t)}startTime(){const t=this.bb.__offset(this.bb_pos,4);return t?this.bb.readUint32(this.bb_pos+t):0}endTime(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.readUint32(this.bb_pos+t):0}precipitationChance(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readInt8(this.bb_pos+t):0}precipitationIntensity(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readFloat32(this.bb_pos+t):0}static startForecastPeriodSummary(t){t.startObject(5);}static addStartTime(t,s){t.addFieldInt32(0,s,0);}static addEndTime(t,s){t.addFieldInt32(1,s,0);}static addPrecipitationChance(t,s){t.addFieldInt8(3,s,0);}static addPrecipitationIntensity(t,s){t.addFieldFloat32(4,s,0);}static endForecastPeriodSummary(t){return t.endObject()}static createForecastPeriodSummary(t,s,i,e,o){return Nt.startForecastPeriodSummary(t),Nt.addStartTime(t,s),Nt.addEndTime(t,i),Nt.addPrecipitationChance(t,e),Nt.addPrecipitationIntensity(t,o),Nt.endForecastPeriodSummary(t)}}!function(t){t[t.UNKNOWN0=0]="UNKNOWN0",t[t.UNKNOWN1=1]="UNKNOWN1",t[t.LOW=2]="LOW";}(at||(at={}));class Ot{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsNextHourForecastData(t,s){return (s||new Ot).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsNextHourForecastData(t,s){return t.setPosition(t.position()+4),(s||new Ot).__init(t.readInt32(t.position())+t.position(),t)}metadata(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new ct).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}condition(t,s){const i=this.bb.__offset(this.bb_pos,6);return i?(s||new ft).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}conditionLength(){const t=this.bb.__offset(this.bb_pos,6);return t?this.bb.__vector_len(this.bb_pos+t):0}summary(t,s){const i=this.bb.__offset(this.bb_pos,8);return i?(s||new L).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}summaryLength(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}forecastStart(){const t=this.bb.__offset(this.bb_pos,10);return t?this.bb.readUint32(this.bb_pos+t):0}forecastEnd(){const t=this.bb.__offset(this.bb_pos,12);return t?this.bb.readUint32(this.bb_pos+t):0}minutes(t,s){const e=this.bb.__offset(this.bb_pos,14);return e?(s||new i).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+e)+4*t),this.bb):null}minutesLength(){const t=this.bb.__offset(this.bb_pos,14);return t?this.bb.__vector_len(this.bb_pos+t):0}static startNextHourForecastData(t){t.startObject(6);}static addMetadata(t,s){t.addFieldOffset(0,s,0);}static addCondition(t,s){t.addFieldOffset(1,s,0);}static createConditionVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startConditionVector(t,s){t.startVector(4,s,4);}static addSummary(t,s){t.addFieldOffset(2,s,0);}static createSummaryVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startSummaryVector(t,s){t.startVector(4,s,4);}static addForecastStart(t,s){t.addFieldInt32(3,s,0);}static addForecastEnd(t,s){t.addFieldInt32(4,s,0);}static addMinutes(t,s){t.addFieldOffset(5,s,0);}static createMinutesVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startMinutesVector(t,s){t.startVector(4,s,4);}static endNextHourForecastData(t){return t.endObject()}static createNextHourForecastData(t,s,i,e,o,n,a){return Ot.startNextHourForecastData(t),Ot.addMetadata(t,s),Ot.addCondition(t,i),Ot.addSummary(t,e),Ot.addForecastStart(t,o),Ot.addForecastEnd(t,n),Ot.addMinutes(t,a),Ot.endNextHourForecastData(t)}}!function(t){t[t.UNKNOWN0=0]="UNKNOWN0",t[t.UNKNOWN1=1]="UNKNOWN1",t[t.UNKNOWN2=2]="UNKNOWN2",t[t.UNKNOWN3=3]="UNKNOWN3",t[t.UNKNOWN4=4]="UNKNOWN4",t[t.UNKNOWN5=5]="UNKNOWN5",t[t.UNKNOWN6=6]="UNKNOWN6",t[t.MONITOR=7]="MONITOR";}(bt||(bt={})),function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.UNKNOWN1=1]="UNKNOWN1",t[t.UNKNOWN2=2]="UNKNOWN2",t[t.MODERATE=3]="MODERATE",t[t.MINOR=4]="MINOR";}(rt||(rt={})),function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.UNKNOWN1=1]="UNKNOWN1",t[t.UNKNOWN2=2]="UNKNOWN2",t[t.UNKNOWN3=3]="UNKNOWN3",t[t.UNKNOWN4=4]="UNKNOWN4",t[t.UNKNOWN5=5]="UNKNOWN5",t[t.UNKNOWN6=6]="UNKNOWN6",t[t.UNKNOWN7=7]="UNKNOWN7",t[t.UNKNOWN8=8]="UNKNOWN8",t[t.UNKNOWN9=9]="UNKNOWN9",t[t.STATEMENT=10]="STATEMENT";}(dt||(dt={})),function(t){t[t.UNKNOWN=0]="UNKNOWN",t[t.UNKNOWN1=1]="UNKNOWN1",t[t.EXPECTED=2]="EXPECTED";}(_t||(_t={}));class It{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsWeatherAlertSummary(t,s){return (s||new It).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsWeatherAlertSummary(t,s){return t.setPosition(t.position()+4),(s||new It).__init(t.readInt32(t.position())+t.position(),t)}id(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new e).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}areaId(t){const s=this.bb.__offset(this.bb_pos,6);return s?this.bb.__string(this.bb_pos+s,t):null}attributionUrl(t){const s=this.bb.__offset(this.bb_pos,10);return s?this.bb.__string(this.bb_pos+s,t):null}countryCode(t){const s=this.bb.__offset(this.bb_pos,12);return s?this.bb.__string(this.bb_pos+s,t):null}description(t){const s=this.bb.__offset(this.bb_pos,14);return s?this.bb.__string(this.bb_pos+s,t):null}token(t){const s=this.bb.__offset(this.bb_pos,16);return s?this.bb.__string(this.bb_pos+s,t):null}effectiveTime(){const t=this.bb.__offset(this.bb_pos,18);return t?this.bb.readUint32(this.bb_pos+t):0}expireTime(){const t=this.bb.__offset(this.bb_pos,20);return t?this.bb.readUint32(this.bb_pos+t):0}issuedTime(){const t=this.bb.__offset(this.bb_pos,22);return t?this.bb.readUint32(this.bb_pos+t):0}eventOnsetTime(){const t=this.bb.__offset(this.bb_pos,24);return t?this.bb.readUint32(this.bb_pos+t):0}eventEndTime(){const t=this.bb.__offset(this.bb_pos,26);return t?this.bb.readUint32(this.bb_pos+t):0}detailsUrl(t){const s=this.bb.__offset(this.bb_pos,28);return s?this.bb.__string(this.bb_pos+s,t):null}phenomenon(t){const s=this.bb.__offset(this.bb_pos,30);return s?this.bb.__string(this.bb_pos+s,t):null}severity(){const t=this.bb.__offset(this.bb_pos,32);return t?this.bb.readInt8(this.bb_pos+t):rt.UNKNOWN}significance(){const t=this.bb.__offset(this.bb_pos,34);return t?this.bb.readInt8(this.bb_pos+t):dt.UNKNOWN}source(t){const s=this.bb.__offset(this.bb_pos,36);return s?this.bb.__string(this.bb_pos+s,t):null}eventSource(t){const s=this.bb.__offset(this.bb_pos,38);return s?this.bb.__string(this.bb_pos+s,t):null}urgency(){const t=this.bb.__offset(this.bb_pos,40);return t?this.bb.readInt8(this.bb_pos+t):_t.UNKNOWN}certainty(){const t=this.bb.__offset(this.bb_pos,42);return t?this.bb.readInt8(this.bb_pos+t):it.UNKNOWN}importance(){const t=this.bb.__offset(this.bb_pos,44);return t?this.bb.readInt8(this.bb_pos+t):at.UNKNOWN0}responses(t){const s=this.bb.__offset(this.bb_pos,46);return s?this.bb.readInt8(this.bb.__vector(this.bb_pos+s)+t):0}responsesLength(){const t=this.bb.__offset(this.bb_pos,46);return t?this.bb.__vector_len(this.bb_pos+t):0}responsesArray(){const t=this.bb.__offset(this.bb_pos,46);return t?new Int8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+t),this.bb.__vector_len(this.bb_pos+t)):null}static startWeatherAlertSummary(t){t.startObject(22);}static addId(t,s){t.addFieldOffset(0,s,0);}static addAreaId(t,s){t.addFieldOffset(1,s,0);}static addAttributionUrl(t,s){t.addFieldOffset(3,s,0);}static addCountryCode(t,s){t.addFieldOffset(4,s,0);}static addDescription(t,s){t.addFieldOffset(5,s,0);}static addToken(t,s){t.addFieldOffset(6,s,0);}static addEffectiveTime(t,s){t.addFieldInt32(7,s,0);}static addExpireTime(t,s){t.addFieldInt32(8,s,0);}static addIssuedTime(t,s){t.addFieldInt32(9,s,0);}static addEventOnsetTime(t,s){t.addFieldInt32(10,s,0);}static addEventEndTime(t,s){t.addFieldInt32(11,s,0);}static addDetailsUrl(t,s){t.addFieldOffset(12,s,0);}static addPhenomenon(t,s){t.addFieldOffset(13,s,0);}static addSeverity(t,s){t.addFieldInt8(14,s,rt.UNKNOWN);}static addSignificance(t,s){t.addFieldInt8(15,s,dt.UNKNOWN);}static addSource(t,s){t.addFieldOffset(16,s,0);}static addEventSource(t,s){t.addFieldOffset(17,s,0);}static addUrgency(t,s){t.addFieldInt8(18,s,_t.UNKNOWN);}static addCertainty(t,s){t.addFieldInt8(19,s,it.UNKNOWN);}static addImportance(t,s){t.addFieldInt8(20,s,at.UNKNOWN0);}static addResponses(t,s){t.addFieldOffset(21,s,0);}static createResponsesVector(t,s){t.startVector(1,s.length,1);for(let i=s.length-1;i>=0;i--)t.addInt8(s[i]);return t.endVector()}static startResponsesVector(t,s){t.startVector(1,s,1);}static endWeatherAlertSummary(t){return t.endObject()}static createWeatherAlertSummary(t,s,i,e,o,n,a,b,r,d,_,h,c,p,l,u,f,N,O,I,F,A){return It.startWeatherAlertSummary(t),It.addId(t,s),It.addAreaId(t,i),It.addAttributionUrl(t,e),It.addCountryCode(t,o),It.addDescription(t,n),It.addToken(t,a),It.addEffectiveTime(t,b),It.addExpireTime(t,r),It.addIssuedTime(t,d),It.addEventOnsetTime(t,_),It.addEventEndTime(t,h),It.addDetailsUrl(t,c),It.addPhenomenon(t,p),It.addSeverity(t,l),It.addSignificance(t,u),It.addSource(t,f),It.addEventSource(t,N),It.addUrgency(t,O),It.addCertainty(t,I),It.addImportance(t,F),It.addResponses(t,A),It.endWeatherAlertSummary(t)}}class Ft{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsWeatherAlertCollectionData(t,s){return (s||new Ft).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsWeatherAlertCollectionData(t,s){return t.setPosition(t.position()+4),(s||new Ft).__init(t.readInt32(t.position())+t.position(),t)}detailsUrl(t){const s=this.bb.__offset(this.bb_pos,6);return s?this.bb.__string(this.bb_pos+s,t):null}alerts(t,s){const i=this.bb.__offset(this.bb_pos,8);return i?(s||new It).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+i)+4*t),this.bb):null}alertsLength(){const t=this.bb.__offset(this.bb_pos,8);return t?this.bb.__vector_len(this.bb_pos+t):0}static startWeatherAlertCollectionData(t){t.startObject(3);}static addDetailsUrl(t,s){t.addFieldOffset(1,s,0);}static addAlerts(t,s){t.addFieldOffset(2,s,0);}static createAlertsVector(t,s){t.startVector(4,s.length,4);for(let i=s.length-1;i>=0;i--)t.addOffset(s[i]);return t.endVector()}static startAlertsVector(t,s){t.startVector(4,s,4);}static endWeatherAlertCollectionData(t){return t.endObject()}static createWeatherAlertCollectionData(t,s,i){return Ft.startWeatherAlertCollectionData(t),Ft.addDetailsUrl(t,s),Ft.addAlerts(t,i),Ft.endWeatherAlertCollectionData(t)}}class At{bb=null;bb_pos=0;__init(t,s){return this.bb_pos=t,this.bb=s,this}static getRootAsWeather(t,s){return (s||new At).__init(t.readInt32(t.position())+t.position(),t)}static getSizePrefixedRootAsWeather(t,s){return t.setPosition(t.position()+4),(s||new At).__init(t.readInt32(t.position())+t.position(),t)}airQuality(t){const s=this.bb.__offset(this.bb_pos,4);return s?(t||new lt).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}forecastNextHour(t){const s=this.bb.__offset(this.bb_pos,14);return s?(t||new Ot).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}weatherAlerts(t){const s=this.bb.__offset(this.bb_pos,22);return s?(t||new Ft).__init(this.bb.__indirect(this.bb_pos+s),this.bb):null}static startWeather(t){t.startObject(15);}static addAirQuality(t,s){t.addFieldOffset(0,s,0);}static addForecastNextHour(t,s){t.addFieldOffset(5,s,0);}static addWeatherAlerts(t,s){t.addFieldOffset(9,s,0);}static endWeather(t){return t.endObject()}static finishWeatherBuffer(t,s){t.finish(s);}static finishSizePrefixedWeatherBuffer(t,s){t.finish(s,void 0,true);}}var mt=Object.freeze({__proto__:null,AirQuality:lt,get Certainty(){return it},Common:a,get ComparisonTrend(){return J},Condition:ft,get ConditionType(){return et},ForecastPeriodSummary:Nt,get ForecastToken(){return ot},get ImportanceType(){return at},Metadata:ct,NextHourForecastData:Ot,Parameter:ut,get ParameterType(){return nt},Pollutant:pt,get PollutantType(){return tt},get ResponseType(){return bt},get Severity(){return rt},get SignificanceType(){return dt},get SourceType(){return $},get UnitType(){return st},get Urgency(){return _t},Weather:At,WeatherAlertCollectionData:Ft,WeatherAlertSummary:It});

class ForecastNextHour {
    Name = "ForecastNextHour";
    Version = "v1.6.5";
    Author = "iRingo";

    // iOS 27 hides NextHour data once its metadata is more than 15 minutes old.
    static ExpirationInterval = 10 * 60;

    static #Configs = {
        Pollutants: {
            co: "CO",
            no: "NO",
            no2: "NO2",
            so2: "SO2",
            o3: "OZONE",
            nox: "NOX",
            pm25: "PM2_5",
            pm10: "PM10",
            other: "NOT_AVAILABLE",
        },
        WeatherCondition: {
            晴朗: "CLEAR",
            雨夹雪: "SLEET",
            小雨: "DRIZZLE",
            下雨: "RAIN",
            中雨: "RAIN",
            大雨: "HEAVY_RAIN",
            小雪: "FLURRIES",
            下雪: "SNOW",
            中雪: "SNOW",
            大雪: "HEAVY_SNOW",
            冰雹: "HAIL",
        },
        PrecipitationType: {
            晴朗: "CLEAR",
            雨夹雪: "SLEET",
            rain: "RAIN",
            雨: "RAIN",
            snow: "SNOW",
            雪: "SNOW",
            冰雹: "HAIL",
        },
        Precipitation: {
            Level: {
                INVALID: -1,
                NO: 0,
                LIGHT: 1,
                MODERATE: 2,
                HEAVY: 3,
                EXTREME: 4,
            },
            Range: {
                /**
                 * [降水强度 | 彩云天气 API]{@link https://docs.caiyunapp.com/weather-api/v2/v2.6/tables/precip.html}
                 */
                radar: {
                    NO: [0, 0.031],
                    LIGHT: [0.031, 0.25],
                    MODERATE: [0.25, 0.35],
                    HEAVY: [0.35, 0.48],
                    EXTREME: [0.48, Number.MAX_VALUE],
                },
                mmph: {
                    NO: [0, 0.08],
                    LIGHT: [0.08, 3.44],
                    MODERATE: [3.44, 11.33],
                    HEAVY: [11.33, 51.3],
                    EXTREME: [51.3, Number.MAX_VALUE],
                },
                precipitation: {
                    NO: [0, 0.01],
                    LIGHT: [0.01, 0.6],
                    MODERATE: [0.6, 1.65],
                    HEAVY: [1.65, 8.0],
                    EXTREME: [8.0, 205.0],
                },
            },
        },
    };

    static WeatherCondition(sentence) {
        Console.info("☑️ WeatherCondition", `sentence: ${sentence}`);
        // 完整短语排在通用词前，首次命中即可，避免“雨夹雪”又被“雪”覆盖。
        const weatherCondition = Object.entries(ForecastNextHour.#Configs.WeatherCondition).find(([key]) => sentence.includes(key))?.[1] ?? "CLEAR";
        Console.info(`✅ WeatherCondition: ${weatherCondition}`);
        return weatherCondition;
    }

    // 根据描述文本猜测降水类型
    static PrecipitationType(sentence) {
        Console.info("☑️ PrecipitationType", `sentence: ${sentence}`);
        const precipitationType = Object.entries(ForecastNextHour.#Configs.PrecipitationType).find(([key]) => sentence.includes(key))?.[1] ?? "CLEAR";
        Console.info(`✅ PrecipitationType: ${precipitationType}`);
        return precipitationType;
    }

    static Minute(minutes = [], description = "", units = "mmph") {
        Console.info("☑️ Minute");
        const precipitationType = ForecastNextHour.PrecipitationType(description);
        // refer: https://docs.caiyunapp.com/weather-api/v2/v2.6/tables/precip.html

        minutes = minutes.map((minute, i) => {
            // 根据precipitationIntensity来猜测生成perceivedPrecipitationIntensity
            minute.precipitationIntensity = Math.trunc(minute.precipitationIntensity * 1000000) / 1000000;
            minute.perceivedPrecipitationIntensity = ForecastNextHour.#ConvertPrecipitationIntensity(minute.precipitationIntensity, units);
            // 然后根据perceivedPrecipitationIntensity和precipitationChance来猜测生成condition和summaryCondition
            if (minute.perceivedPrecipitationIntensity > 2) {
                // 大雨，强烈感知
                switch (precipitationType) {
                    case "RAIN":
                        minute.condition = "HEAVY_RAIN";
                        break;
                    case "SNOW":
                        minute.condition = "HEAVY_SNOW";
                        break;
                    default:
                        minute.condition = precipitationType;
                        break;
                }

                minute.summaryCondition = precipitationType;
                minute.clear = false;
            } else if (minute.perceivedPrecipitationIntensity > 1) {
                // 中雨，明显感知
                switch (precipitationType) {
                    case "RAIN":
                        minute.condition = "RAIN";
                        break;
                    case "SNOW":
                        minute.condition = "SNOW";
                        break;
                    default:
                        minute.condition = precipitationType;
                        break;
                }
                minute.summaryCondition = precipitationType;
                minute.clear = false;
            } else if (minute.perceivedPrecipitationIntensity > 0.1) {
                // ❓ perceivedPrecipitationIntensity 小于 0.1, 苹果天气显示为无降水
                // 小雨，可以感知到
                switch (precipitationType) {
                    case "RAIN":
                        minute.condition = "DRIZZLE";
                        break;
                    case "SNOW":
                        minute.condition = "FLURRIES";
                        break;
                    default:
                        minute.condition = precipitationType;
                        break;
                }
                minute.summaryCondition = precipitationType;
                minute.clear = false;
            } else if (minute.perceivedPrecipitationIntensity > 0) {
                // 可能降水
                switch (precipitationType) {
                    case "RAIN":
                        minute.condition = "POSSIBLE_DRIZZLE";
                        break;
                    case "SNOW":
                        minute.condition = "POSSIBLE_FLURRIES";
                        break;
                    default:
                        minute.condition = `POSSIBLE_${precipitationType}`;
                        break;
                }
                minute.summaryCondition = precipitationType;
                minute.clear = false;
            } else {
                minute.condition = "CLEAR";
                minute.summaryCondition = "CLEAR";
                minute.clear = true;
            }
            //Console.debug(`minutes[${i}]`, JSON.stringify(minute, null, 2));
            return minute;
        });

        Console.info("✅ Minute");
        return minutes;
    }

    static Summary(minutes = []) {
        Console.info("☑️ Summary");
        const Summaries = [];
        const Summary = {
            condition: "CLEAR",
            startTime: 0,
            precipitationChance: 0,
            precipitationIntensity: 0,
            //beginCondition: "",
            //endCondition: "",
            maxCondition: "",
            clear: true,
        };
        const Length = Math.min(71, minutes.length);
        for (let i = 0; i < Length; i++) {
            const minute = minutes[i];
            const previousMinute = minutes[i - 1];
            switch (i) {
                case 0: // 第一个
                    Summary.startTime = minute.startTime;
                    Summary.condition = minute.summaryCondition; // condition 只关心降水类型，不关心具体强弱描述
                    Summary.precipitationChance = minute.precipitationChance;
                    Summary.precipitationIntensity = minute.precipitationIntensity;
                    //Summary.beginCondition = minute.condition;
                    //Summary.endCondition = "";
                    Summary.maxCondition = minute.condition;
                    Summary.clear = minute.clear;
                    break;
                case Length - 1: // 最后一个
                    Summary.endTime = 0; // ⚠️空值必须写零！
                    //Summary.endCondition = minute.condition;
                    Summary.clear = minute.clear;
                    Console.debug(`Summaries[${i}]`, JSON.stringify({ ...minute, ...Summary }, null, 2));
                    Summaries.push({ ...Summary });
                    break;
                default: // 中间
                    if (minute.summaryCondition !== previousMinute.summaryCondition) {
                        // 结束当前summary
                        Summary.endTime = minute.startTime;
                        //Summary.endCondition = previousMinute.condition;
                        Console.debug(`Summaries[${i}]`, JSON.stringify({ ...previousMinute, ...Summary }, null, 2));
                        Summaries.push({ ...Summary });

                        // 开始新的summary
                        Summary.startTime = minute.startTime;
                        Summary.condition = minute.summaryCondition; // condition 只关心降水类型，不关心具体强弱描述
                        Summary.precipitationChance = minute.precipitationChance;
                        Summary.precipitationIntensity = minute.precipitationIntensity;
                        //Summary.beginCondition = minute.condition;
                        //Summary.endCondition = ""; // 重置
                        Summary.maxCondition = minute.condition; // 重置
                        Summary.clear = minute.clear;
                    } else {
                        // 条件相同，更新最大值
                        Summary.precipitationChance = Math.max(Summary.precipitationChance, minute.precipitationChance);
                        Summary.precipitationIntensity = Math.max(Summary.precipitationIntensity, minute.precipitationIntensity);
                        if (Summary.precipitationIntensity === minute.precipitationIntensity) Summary.maxCondition = minute.condition;
                    }
                    break;
            }
        }
        Console.debug(`Summaries: ${JSON.stringify(Summaries, null, 2)}`);
        Console.info("✅ Summary");
        return Summaries;
    }

    static Condition(summaries = []) {
        Console.info("☑️ Condition");
        const Conditions = [];
        if (!summaries.length) {
            Console.debug(`Conditions: ${JSON.stringify(Conditions, null, 2)}`);
            Console.info("✅ Condition");
            return Conditions;
        }

        // Summary() emits alternating clear/precipitation runs. Preserve the
        // previous empty result for unsupported direct callers that violate it.
        for (let i = 1; i < summaries.length; i++) {
            if (summaries[i - 1].clear === summaries[i].clear) {
                Console.warn("Condition", `Adjacent summaries have the same clear state at indexes ${i - 1} and ${i}`);
                Console.debug(`Conditions: ${JSON.stringify(Conditions, null, 2)}`);
                Console.info("✅ Condition");
                return Conditions;
            }
        }

        for (let i = 0; i < summaries.length; i++) {
            const current = summaries[i];
            const next = summaries[i + 1];
            const afterNext = summaries[i + 2];

            if (current.clear) {
                if (!next) {
                    Conditions.push({
                        beginCondition: current.maxCondition,
                        endCondition: current.maxCondition,
                        forecastToken: "CLEAR",
                        parameters: [],
                        startTime: current.startTime,
                        endTime: 0,
                    });
                } else if (afterNext) {
                    Conditions.push({
                        beginCondition: next.maxCondition,
                        endCondition: next.maxCondition,
                        forecastToken: "START_STOP",
                        parameters: [
                            { date: next.startTime, type: "FIRST_AT" },
                            { date: next.endTime, type: "SECOND_AT" },
                        ],
                        startTime: current.startTime,
                        endTime: current.endTime,
                    });
                } else {
                    Conditions.push({
                        beginCondition: next.maxCondition,
                        endCondition: next.maxCondition,
                        forecastToken: "START",
                        parameters: [{ date: next.startTime, type: "FIRST_AT" }],
                        startTime: current.startTime,
                        endTime: current.endTime,
                    });
                }
            } else if (!next) {
                Conditions.push({
                    beginCondition: current.maxCondition,
                    endCondition: current.maxCondition,
                    forecastToken: "CONSTANT",
                    parameters: [],
                    startTime: current.startTime,
                    endTime: 0,
                });
            } else if (afterNext) {
                Conditions.push({
                    beginCondition: current.maxCondition,
                    endCondition: afterNext.maxCondition,
                    forecastToken: "STOP_START",
                    parameters: [
                        { date: current.endTime, type: "FIRST_AT" },
                        { date: afterNext.startTime, type: "SECOND_AT" },
                    ],
                    startTime: current.startTime,
                    endTime: current.endTime,
                });
            } else {
                Conditions.push({
                    beginCondition: current.maxCondition,
                    endCondition: current.maxCondition,
                    forecastToken: "STOP",
                    parameters: [{ date: current.endTime, type: "FIRST_AT" }],
                    startTime: current.startTime,
                    endTime: current.endTime,
                });
            }
        }
        // pinned WK2 schema 不认识的值会被 FlatBuffer 当成 0（CLEAR），因此整条条件必须跳过。
        const safeConditions = Conditions.filter(condition => {
            const supported = [condition.beginCondition, condition.endCondition].every(value => typeof ht.ConditionType[value] === "number");
            if (!supported) Console.warn("Condition", `Unsupported ConditionType: ${condition.beginCondition}/${condition.endCondition}`);
            return supported;
        });
        Console.debug(`Conditions: ${JSON.stringify(safeConditions, null, 2)}`);
        Console.info("✅ Condition");
        return safeConditions;
    }

    static #ConvertPrecipitationIntensity(precipitationIntensity, units = "mmph") {
        //Console.info("☑️ ConvertPrecipitationIntensity");
        //Console.debug(`precipitationIntensity: ${precipitationIntensity}`, `units: ${units}`);
        const Range = ForecastNextHour.#Configs.Precipitation.Range[units];
        let perceivedPrecipitationIntensity = 0;

        if (precipitationIntensity === 0) {
            // 无降水
            perceivedPrecipitationIntensity = 0;
        } else if (precipitationIntensity > Range.NO[0] && precipitationIntensity <= Range.NO[1]) {
            // 轻微降水，可能感知不到
            perceivedPrecipitationIntensity = 0; // 轻微降水通常感知不到
        } else if (precipitationIntensity > Range.LIGHT[0] && precipitationIntensity <= Range.LIGHT[1]) {
            // 小雨，可以感知到
            // 根据强度计算感知强度，在0-1之间
            perceivedPrecipitationIntensity = Math.min(1, (precipitationIntensity - Range.LIGHT[0]) / (Range.LIGHT[1] - Range.LIGHT[0]));
        } else if (precipitationIntensity > Range.MODERATE[0] && precipitationIntensity <= Range.MODERATE[1]) {
            // 中雨，明显感知
            // 根据强度计算感知强度，在1-2之间
            perceivedPrecipitationIntensity = 1 + Math.min(1, (precipitationIntensity - Range.MODERATE[0]) / (Range.MODERATE[1] - Range.MODERATE[0]));
        } else if (precipitationIntensity > Range.HEAVY[0]) {
            // 大雨，强烈感知
            // 根据强度计算感知强度，在2-3之间
            perceivedPrecipitationIntensity = 2 + Math.min(1, (precipitationIntensity - Range.HEAVY[0]) / (Range.HEAVY[1] - Range.HEAVY[0]));
        }

        // 使用Math.trunc保留一位小数（性能最快，截断不四舍五入）
        perceivedPrecipitationIntensity = Math.trunc(perceivedPrecipitationIntensity * 1000) / 1000;

        //Console.debug(`perceivedPrecipitationIntensity: ${perceivedPrecipitationIntensity}`);
        //Console.info(`✅ ConvertPrecipitationIntensity`);
        return perceivedPrecipitationIntensity;
    }
}

/**
 * 根据数据源名称返回对应版本的标志；Apple、WeatherKit、空值及未知来源不补标志。
 * Return the versioned logo for a provider; Apple, WeatherKit, empty, and unknown providers do not receive a logo.
 * @param {string | null | undefined} providerName - 数据源名称。
 * Provider name.
 * @param {string} [version="v2"] - 标志资源版本。
 * Logo asset version.
 * @returns {string | undefined} 匹配的数据源标志地址。
 * Matched provider logo URL.
 */

function encodeMetadata$1(builder, metadata) {
    if (!metadata) return 0;
    return ht.Metadata.createMetadata(
        builder,
        builder.createString(metadata.attributionUrl),
        metadata.expireTime,
        builder.createString(metadata.language),
        metadata.latitude,
        metadata.longitude,
        builder.createString(metadata.providerLogo),
        builder.createString(metadata.providerName),
        metadata.readTime,
        metadata.reportedTime,
        metadata.temporarilyUnavailable,
        ht.SourceType[metadata.sourceType],
        metadata.unknown11,
        metadata.unknown12,
        metadata.unknown13,
        metadata.unknown14,
        metadata.unknown15,
    );
}

/**
 * 解码产品元数据子表；缺失时返回 undefined。 / Decode the metadata child table; returns undefined when absent.
 * @param {object} [data] - 生成的元数据表实例 / Generated metadata table instance.
 * @returns {object|undefined} 元数据对象 / Metadata payload.
 */
function decodeMetadata$1(data) {
    if (!data) return undefined;
    data = {
        attributionUrl: data.attributionUrl(),
        expireTime: data.expireTime(),
        language: data.language(),
        latitude: data.latitude(),
        longitude: data.longitude(),
        providerLogo: data.providerLogo(),
        providerName: data.providerName(),
        readTime: data.readTime(),
        reportedTime: data.reportedTime(),
        temporarilyUnavailable: data.temporarilyUnavailable(),
        sourceType: ht.SourceType[data.sourceType()],
    };
    return data;
}

/**
 * 将 UUID 的多种表示（字符串、字节数组、字节对象）归一化为 16 字节数组。 / Normalize UUID representations (string, byte array, bytes object) to a 16-byte array.
 * @param {string|Uint8Array|Array|object} uuid - UUID 输入 / UUID input.
 * @returns {Uint8Array|Array|null} 16 字节数组 / 16-byte array.
 */

function encodeForecastNextHour(builder, data) {
    const metadataOffset = encodeMetadata$1(builder, data.metadata);
    // 防御第三方数据：未知枚举传给 FlatBuffer 会静默编码为 CLEAR。
    // Defend against third-party data: unknown enums would otherwise be silently encoded as CLEAR.
    const conditionOffsets = data.condition
        .filter(condition => [condition.beginCondition, condition.endCondition].every(value => typeof ht.ConditionType[value] === "number"))
        .map(condition => {
            const parametersOffsets = condition.parameters.map(parameter => ht.Parameter.createParameter(builder, ht.ParameterType[parameter.type], parameter.date));
            const parametersOffset = ht.Condition.createParametersVector(builder, parametersOffsets);
            return ht.Condition.createCondition(builder, condition.startTime, condition.endTime, ht.ForecastToken[condition.forecastToken], ht.ConditionType[condition.beginCondition], ht.ConditionType[condition.endCondition], parametersOffset);
        });
    const conditionOffset = ht.NextHourForecastData.createConditionVector(builder, conditionOffsets);
    const summaryOffsets = data.summary.map(summary => ht.ForecastPeriodSummary.createForecastPeriodSummary(builder, summary.startTime, summary.endTime, ht.PrecipitationType[summary.condition], summary.precipitationChance, summary.precipitationIntensity));
    const summaryOffset = ht.NextHourForecastData.createSummaryVector(builder, summaryOffsets);
    const minutesOffsets = data.minutes.map(minute => ht.Common.ForecastMinute.createForecastMinute(builder, minute.startTime, minute.precipitationChance, minute.precipitationIntensity, minute.perceivedPrecipitationIntensity));
    const minutesOffset = ht.NextHourForecastData.createMinutesVector(builder, minutesOffsets);
    return ht.NextHourForecastData.createNextHourForecastData(builder, metadataOffset, conditionOffset, summaryOffset, data.forecastStart, data.forecastEnd, minutesOffset);
}

/**
 * 编码 news 产品表。 / Encode the news product table.
 * @param {import("flatbuffers").Builder} builder - FlatBuffer 构建器 / FlatBuffer builder.
 * @param {object} data - 业务对象 / Payload.
 * @returns {number} 产品表偏移 / Table offset.
 */

function decodeForecastNextHour(data) {
    const NextHourForecastData = data;
    data = {
        metadata: decodeMetadata$1(NextHourForecastData.metadata()),
        condition: [],
        forecastEnd: NextHourForecastData.forecastEnd(),
        forecastStart: NextHourForecastData.forecastStart(),
        minutes: [],
        summary: [],
    };
    for (let i = 0; i < NextHourForecastData.conditionLength(); i++) {
        const condition = {
            beginCondition: ht.ConditionType[NextHourForecastData.condition(i).beginCondition()],
            endCondition: ht.ConditionType[NextHourForecastData.condition(i).endCondition()],
            endTime: NextHourForecastData.condition(i).endTime(),
            forecastToken: ht.ForecastToken[NextHourForecastData.condition(i).forecastToken()],
            parameters: [],
            startTime: NextHourForecastData.condition(i).startTime(),
        };
        for (let j = 0; j < NextHourForecastData.condition(i).parametersLength(); j++)
            condition.parameters.push({
                date: NextHourForecastData.condition(i).parameters(j).date(),
                type: ht.ParameterType[NextHourForecastData.condition(i).parameters(j).type()],
            });
        data.condition.push(condition);
    }
    for (let i = 0; i < NextHourForecastData.minutesLength(); i++)
        data.minutes.push({
            perceivedPrecipitationIntensity: NextHourForecastData.minutes(i).perceivedPrecipitationIntensity(),
            precipitationChance: NextHourForecastData.minutes(i).precipitationChance(),
            precipitationIntensity: NextHourForecastData.minutes(i).precipitationIntensity(),
            startTime: NextHourForecastData.minutes(i).startTime(),
        });
    for (let i = 0; i < NextHourForecastData.summaryLength(); i++)
        data.summary.push({
            condition: ht.PrecipitationType[NextHourForecastData.summary(i).condition()],
            endTime: NextHourForecastData.summary(i).endTime(),
            precipitationChance: NextHourForecastData.summary(i).precipitationChance(),
            precipitationIntensity: NextHourForecastData.summary(i).precipitationIntensity(),
            startTime: NextHourForecastData.summary(i).startTime(),
        });
    return data;
}

/**
 * 解码 news 产品表。 / Decode the news product table.
 * @param {object} data - 生成的表实例 / Generated table instance.
 * @returns {object} 业务对象 / Payload.
 */

/* exports */
var __NH = { ByteBuffer: ByteBuffer, Builder: Builder, mt: (typeof mt!=="undefined"?mt:null), ForecastNextHour: ForecastNextHour, encodeForecastNextHour: encodeForecastNextHour, decodeForecastNextHour: decodeForecastNextHour };
;return { ByteBuffer: ByteBuffer, Builder: Builder, mt: mt, ForecastNextHour: ForecastNextHour, encodeForecastNextHour: encodeForecastNextHour, decodeForecastNextHour: decodeForecastNextHour };
})();
/* ===== /NextHour 模块 ===== */

/* 用 dev 编码器生成 forecastNextHour 表，并通过 __nhAttach 挂到根 slot5（沿用既有挂载逻辑）。
   与旧 __nhBuildNextHour 的区别：summary/condition 由 dev 的 ForecastNextHour 整体重算，枚举取 dev 生成表。 */
function __nhBuildNew(mn){
  try{
    var FNH=__NHM.ForecastNextHour, mt=__NHM.mt;
    var now=Math.floor(Date.now()/1000);
    var mins=mn.minutes.map(function(x){return {startTime:x.t, precipitationChance:0, precipitationIntensity:x.mmh, perceivedPrecipitationIntensity:0};});
    mins.length=Math.min(85,mins.length);
    var t0=mins.length?mins[0].startTime:now;
    mins=FNH.Minute(mins, mn.description||'', 'mmph');
    var summary=FNH.Summary(mins), condition=FNH.Condition(summary);
    var data={
      metadata:{attributionUrl:'https://www.qweather.com',expireTime:now+600,language:'zh-CN',latitude:0,longitude:0,providerLogo:'',providerName:'和风天气',readTime:now,reportedTime:now,temporarilyUnavailable:false,sourceType:1},
      condition:condition, summary:summary, forecastStart:t0, forecastEnd:t0+60*mins.length, minutes:mins
    };
    var b=new __NHM.Builder(1024);
    b.finish(__NHM.encodeForecastNextHour(b,data));
    var __bb=b.asUint8Array();
    var __rootOff=new DataView(__bb.buffer,__bb.byteOffset,__bb.byteLength).getUint32(0,true);
    return {buf:__bb, rootOff:__rootOff};
  }catch(e){ console.log('⚠️ [天气增强] 分钟降水 · 新编码失败：'+(e&&e.message||e)); return null; }
}
async function __nhRoot(body,url,st){
  try{
    var ps=url.pathname.split('/').filter(function(x){return x});
    if(ps[1]!=="v3"||ps[2]!=="weather"||ps.length<6) return body;
    var lat=ps[4], lon=ps[5];

    /* JSON 分支：苹果某些情况下返回 JSON 而不是 flatbuffer */
    if(typeof body==='string' || (body && typeof body.byteLength==='number' && !(body instanceof Uint8Array))){
      var txt = (typeof body==='string') ? body : new TextDecoder('utf-8').decode(
        body instanceof ArrayBuffer ? new Uint8Array(body) : new Uint8Array(body.buffer||body));
      var head = txt.slice(0,1);
      if(head==='{'){
        try{
          var obj=JSON.parse(txt);
          var mnJ=await __nhFetchMin(lat,lon);
          if(!mnJ||!mnJ.minutes||!mnJ.minutes.length) return body;
          var pts=mnJ.minutes;
          var startT=pts[0].t;
          /* 构造 minutes 数组 */
          var jm=[];
          for(var q=0;q<pts.length && q<144;q++){
            jm.push({
              startTime: pts[q].t,
              precipitationChance: pts[q].mmh>0?70:0,
              precipitationIntensity: pts[q].mmh,
              perceivedPrecipitationIntensity: __perceived(pts[q].mmh)
            });
          }
          /* 构造 condition 段 */
          var segsJ=[], curJ=null;
          for(var q2=0;q2<jm.length;q2++){
            var cJ=__v3cond(jm[q2].perceivedPrecipitationIntensity,false);
            var clrJ=(cJ===0);
            if(!curJ || curJ.clear!==clrJ){
              if(curJ){ curJ.endTime=jm[q2].startTime; segsJ.push(curJ); }
              curJ={clear:clrJ,startTime:jm[q2].startTime,endTime:0,maxCond:cJ};
            } else if(!clrJ && cJ<curJ.maxCond) curJ.maxCond=cJ;
          }
          if(curJ) segsJ.push(curJ);
          var condsJ=[];
          var TOKN={0:'CLEAR',1:'START',2:'STOP',3:'START_STOP',4:'STOP_START',5:'CONSTANT'};
          for(var g=0;g<segsJ.length;g++){
            var aJ=segsJ[g], bJ=segsJ[g+1], cJ2=segsJ[g+2];
            var tokJ, begJ, endJ;
            if(aJ.clear){
              if(bJ){ tokJ=(cJ2?3:1); begJ=bJ.maxCond; endJ=bJ.maxCond; }
              else { tokJ=0; begJ=0; endJ=0; }
            } else {
              if(bJ){ tokJ=(cJ2?4:2); begJ=aJ.maxCond; endJ=(cJ2?cJ2.maxCond:aJ.maxCond); }
              else { tokJ=5; begJ=aJ.maxCond; endJ=aJ.maxCond; }
            }
            condsJ.push({beginCondition:begJ,endCondition:endJ,forecastToken:tokJ,
                         startTime:aJ.startTime,endTime:aJ.endTime,parameters:[]});
          }
          var sumsJ=segsJ.map(function(sg,i){
            return {startTime:sg.startTime, endTime:(i===segsJ.length-1?0:sg.endTime), condition:sg.maxCond};
          });
          obj.forecastNextHour={
            metadata:{
              attributionUrl:'https://www.qweather.com',
              expireTime:startT+3600, language:'zh-CN',
              latitude:parseFloat(lat), longitude:parseFloat(lon),
              providerName:'和风天气',
              readTime:startT, reportedTime:startT,
              temporarilyUnavailable:false, sourceType:'MODELED'
            },
            condition:condsJ, summary:sumsJ,
            forecastStart:startT, forecastEnd:startT+60*jm.length,
            minutes:jm
          };
          console.log('✅ [天气增强] 分钟降水 · JSON 注入 '+jm.length+' 条 · '+condsJ.length+' 段 · 峰值 '+
            Math.max.apply(null,jm.map(function(x){return x.precipitationIntensity;})).toFixed(2)+' mm/h');
          return JSON.stringify(obj);
        }catch(je){ console.log('⚠️ [天气增强] JSON 分钟降水异常：'+(je&&je.message||je)); return body; }
      }
      return body;
    }

    if(!(body instanceof Uint8Array)) return body;
    var N=body.length; var s0=new Uint8Array(N); for(var q=0;q<N;q++) s0[q]=body[q];
    var v=new DataView(s0.buffer);
    var tr=v.getUint32(0,true); if(tr<=0||tr+4>N) return body;
    var trvt=tr-v.getInt32(tr,true); if(trvt<0||trvt+8>N) return body;
    var tvs=v.getUint16(trvt,true), tts=v.getUint16(trvt+2,true);
    if(tvs<4||tts<4||trvt+tvs>N){ console.log("⚠️ [天气增强] 分钟降水 · 根表异常 vs="+tvs+" ts="+tts); return body; }

    /* 和风分钟降水：原地改写 slot5，不重建整包 */
    console.log("ℹ️ [天气增强] 分钟降水 · 进入 v3 根表 vs="+tvs+" ts="+tts+" 长度="+N);

    var mn=await __nhFetchMin(lat,lon);
    if(!mn||!mn.minutes||!mn.minutes.length){ console.log("⚠️ [天气增强] 分钟降水 · 和风无数据"); return body; }

    var o5=v.getUint16(trvt+4+2*5,true);
    if(!o5){
      /* 原生无 slot5：在响应尾部追加完整 nextHour 子树，再重建根表指向它 */
      var built=__nhBuildNew(mn);
      if(!built){ console.log("⚠️ [天气增强] 分钟降水 · 构建失败"); return body; }
      var out2=__nhAttach(body, built.buf, built.rootOff);
      if(!out2){ console.log("⚠️ [天气增强] 分钟降水 · 挂载失败"); return body; }
      console.log("✅ [天气增强] 分钟降水 · 新建 slot5 · "+mn.minutes.length+" 点 · 峰值 "+
        Math.max.apply(null,mn.minutes.map(function(x){return x.mmh;})).toFixed(2)+" mm/h");
      return out2;
    }
    var p5=tr+o5, nh=p5+v.getUint32(p5,true);
    var nv=nh-v.getInt32(nh,true);
    var oMin=v.getUint16(nv+4+2*5,true);
    if(!oMin){ console.log("⏭ [天气增强] 分钟降水 · 原生无分钟数据，跳过"); return body; }

    var mp=nh+oMin, mv=mp+v.getUint32(mp,true);
    var n0=v.getUint32(mv,true);

    /* 和风数据按时间戳建索引（分钟取整），避免时间轴错位 */
    var idx={};
    for(var q1=0;q1<mn.minutes.length;q1++){
      var m1=mn.minutes[q1];
      idx[Math.floor(m1.t/60)]=m1.mmh;
    }

    var w=0, miss=0;
    for(var k=0;k<n0 && k<200;k++){
      var e=mv+4+4*k;
      var t=e+v.getUint32(e,true);
      var tv=t-v.getInt32(t,true);
      var oCh=__fo(v,tv,1), oPi=__fo(v,tv,2);
      var oSt=__fo(v,tv,0);
      /* 强度字段不存在说明原生就是 0（苹果省略零值字段），
         这种条目无法原地写入非零值 —— 计入 miss，交给下面的整体重建判断 */
      if(!oPi){ miss++; continue; }
      var ts = oSt ? v.getUint32(t+oSt,true) : 0;
      var key = Math.floor(ts/60);
      var mmh = (ts ? idx[key] : undefined);
      if(mmh===undefined){ miss++; continue; }
      v.setFloat32(t+oPi, mmh, true);
      if(oCh) v.setUint8(t+oCh, mmh>0?70:0);
      w++;
    }
    /* 命中率过低（大量条目缺字段）→ 整体重建 slot5，保证数据完整 */
    if(w < n0 * 0.5){
      console.log("ℹ️ [天气增强] 分钟降水 · 原地改写覆盖率不足（"+w+"/"+n0+"），改为整体重建");
      var built2=__nhBuildNew(mn);
      if(built2){
        var out3=__nhAttach(body, built2.buf, built2.rootOff);
        if(out3){
          console.log("✅ [天气增强] 分钟降水 · 重建 slot5 · "+mn.minutes.length+" 点 · 峰值 "+
            Math.max.apply(null,mn.minutes.map(function(x){return x.mmh;})).toFixed(2)+" mm/h");
          return out3;
        }
      }
      console.log("⚠️ [天气增强] 分钟降水 · 重建失败，保留原地改写结果");
    } else if(miss>0){
      console.log("ℹ️ [天气增强] 分钟降水 · 时间轴未命中 "+miss+" 条");
    }

    console.log("✅ [天气增强] 分钟降水 · 和风写入 "+w+" 条 · 峰值 "+
      Math.max.apply(null,mn.minutes.map(function(x){return x.mmh;})).toFixed(2)+" mm/h");
    return new Uint8Array(v.buffer, v.byteOffset, v.byteLength);
  }catch(e){ console.log("⚠️ [天气增强] 分钟降水异常："+(e&&e.message||e)); return body; }
}


async function __nhScale(body,url,st){
  try{
    var f=parseFloat(__arg("NextHour.IntensityScale","1"));
    if(!isFinite(f)||f<=0||f===1) return body;
    if(!(body instanceof Uint8Array)) return body;
    var ps=url.pathname.split('/').filter(function(x){return x});
    if(ps[1]!=="v3"||ps[2]!=="weather"||ps.length<6) return body;
    var N=body.length; var bin=new Uint8Array(N); for(var q=0;q<N;q++) bin[q]=body[q];
    var v=new DataView(bin.buffer);
    var tr=v.getUint32(0,true), trvt=tr-v.getInt32(tr,true);
    var tvs=v.getUint16(trvt,true);
    if(tvs<16||v.getUint16(trvt+4+2*5,true)===0) return body;
    var p5=tr+v.getUint16(trvt+4+2*5,true);
    var nh=p5+v.getUint32(p5,true);
    var nv=nh-v.getInt32(nh,true);
    var mo=v.getUint16(nv+4,true);
    var cnt=0;
    // 分钟强度
    var o5=v.getUint16(nv+4+2*5,true);
    if(o5){
      var mp=nh+o5; var mv=mp+v.getUint32(mp,true);
      var n=v.getUint32(mv,true);
      for(var k=0;k<n&&k<200;k++){
        var ep=mv+4+4*k; var et=ep+v.getUint32(ep,true);
        var ev=et-v.getInt32(et,true);
        var f2=__fo(v,ev,2), f3=__fo(v,ev,3);
        if(f2){ v.setFloat32(et+f2, v.getFloat32(et+f2,true)*f, true); cnt++; }
        if(f3){ v.setFloat32(et+f3, v.getFloat32(et+f3,true)*f, true); }
      }
    }
    // summary 强度
    var o2=v.getUint16(nv+4+2*2,true);
    if(o2){
      var sp=nh+o2; var sv=sp+v.getUint32(sp,true);
      var n2=v.getUint32(sv,true);
      for(var k2=0;k2<n2&&k2<20;k2++){
        var e2=sv+4+4*k2; var t2=e2+v.getUint32(e2,true);
        var v2=t2-v.getInt32(t2,true);
        var g4=v.getUint16(v2+4+2*4,true);
        if(g4){ v.setFloat32(t2+g4, v.getFloat32(t2+g4,true)*f, true); }
      }
    }
    console.log("✅ [天气增强] 分钟降水强度 ×"+f+" · "+cnt+" 条");
    return bin;
  }catch(e){ console.log("⚠️ [天气增强] 强度倍率异常："+(e&&e.message)); return body; }
}
















/* 感知强度 → 条件类型（对齐苹果 Minute() 分级）
   >2   HEAVY_RAIN(5)      暴雨
   >1   RAIN(6)            雨
   >.1  DRIZZLE(7)         小雨
   >0   POSSIBLE_DRIZZLE(8) 微雨
   =0   CLEAR(0)           无 */

/* 取第 k 分钟的原始强度 */

/* ===== WK3 v3 Minute 真实结构（从真实响应逆向，非 v2 schema）=====
   vs=10 ts=16/18  vtable=[12,11,4]
     slot 0 (+ts-12) startTime             uint32
     slot 1 (+ts-11) precipitationChance   int8  0-100
     slot 2 (+ts-4)  perceivedIntensity    float32 0-3（感知强度，已归一化）
   注意：v3 的 slot2 是 float32，不是 int8；
        v2 那套 slot9/slot22 在这里不存在。 */

/* 感知强度(0-3) → 条件类型（v3 已归一化，直接按阈值分档） */







/* 降水类型猜测（对齐官方 dev 版 PrecipitationType）
   summary.precipitationType 独立枚举：0无 1雨 2雪 3雨夹雪 6混合 */
function __guessType(text){
  var t=String(text||'');
  if(/雨夹雪|凍雨|冻雨|sleet/i.test(t)) return 3;
  if(/冰雹|hail/i.test(t)) return 6;
  if(/雪|snow/i.test(t)) return 2;
  if(/雨|rain|降水|precip/i.test(t)) return 1;
  return 1;
}





async function __nhForce(body,url,st){
  try{
    if(String(__arg("NextHour.ForceRain","false"))!=="true") return body;
    if(!(body instanceof Uint8Array)) return body;
    var ps=url.pathname.split('/').filter(function(x){return x});
    if(ps[1]!=="v3"||ps[2]!=="weather"||ps.length<6) return body;
    var N=body.length; var bin=new Uint8Array(N); for(var q=0;q<N;q++) bin[q]=body[q];
    var v=new DataView(bin.buffer);
    var tr=v.getUint32(0,true), trvt=tr-v.getInt32(tr,true);
    if(v.getUint16(trvt+4+2*5,true)===0) return body;
    var p5=tr+v.getUint16(trvt+4+2*5,true); var nh=p5+v.getUint32(p5,true);
    var nv=nh-v.getInt32(nh,true);
    // 分钟最大值
    var maxI=0, maxC=0;
    var o5=v.getUint16(nv+4+2*5,true);
    if(o5){
      var mp=nh+o5; var mv=mp+v.getUint32(mp,true); var n=v.getUint32(mv,true);
      for(var k=0;k<n&&k<200;k++){
        var ep=mv+4+4*k; var et=ep+v.getUint32(ep,true); var ev=et-v.getInt32(et,true);
        var f2=__fo(v,ev,2), f1=__fo(v,ev,1);
        if(f2){ var x=v.getFloat32(et+f2,true); if(x>maxI) maxI=x; }
        if(f1){ var c=v.getUint8(et+f1); if(c>maxC) maxC=c; }
      }
    }
    if(maxI<=0) return body;
    var o2=v.getUint16(nv+4+2*2,true);
    if(!o2) return body;
    var sp=nh+o2; var sv=sp+v.getUint32(sp,true); var n2=v.getUint32(sv,true);
    for(var k2=0;k2<n2&&k2<20;k2++){
      var e2=sv+4+4*k2; var t2=e2+v.getUint32(e2,true); var v2=t2-v.getInt32(t2,true);
      var vs=v.getUint16(v2,true);
      for(var f=0;f<(vs-4)/2;f++){
        var oo=v.getUint16(v2+4+2*f,true);
        if(!oo) continue;
        var pos=t2+oo;
        if(f===2){
          var uu=v.getUint32(pos,true);
          if(uu>0&&pos+uu+8<=v.buffer.byteLength){
            var vv2=pos+uu, ll=vv2?v.getUint32(vv2,true):0;
            if(ll===1) v.setUint8(vv2+4,1);
          }
        }
        else if(f===3){ v.setUint8(pos,maxC||60); }
        else if(f===4){ v.setFloat32(pos,Math.max(maxI,1.0),true); }
      }
    }
    console.log("✅ [天气增强] 分钟降水 · 强制降雨标记 maxI="+maxI.toFixed(3)+" maxC="+maxC);
    return bin;
  }catch(e){ console.log("⚠️ [天气增强] 强制降雨异常："+(e&&e.message)); return body; }
}


async function __nhMin(body,url,st){
  try{
    var m=parseFloat(__arg("NextHour.MinIntensity","0"));
    if(!isFinite(m)||m<=0) return body;
    if(!(body instanceof Uint8Array)) return body;
    var ps=url.pathname.split('/').filter(function(x){return x});
    if(ps[1]!=="v3"||ps[2]!=="weather"||ps.length<6) return body;
    var N=body.length; var bin=new Uint8Array(N); for(var q=0;q<N;q++) bin[q]=body[q];
    var v=new DataView(bin.buffer);
    var tr=v.getUint32(0,true), trvt=tr-v.getInt32(tr,true);
    if(v.getUint16(trvt+4+2*5,true)===0) return body;
    var p5=tr+v.getUint16(trvt+4+2*5,true); var nh=p5+v.getUint32(p5,true);
    var nv=nh-v.getInt32(nh,true);
    var o5=v.getUint16(nv+4+2*5,true);
    if(!o5) return body;
    var mp=nh+o5; var mv=mp+v.getUint32(mp,true); var n=v.getUint32(mv,true);
    var cnt=0;
    for(var k=0;k<n&&k<200;k++){
      var ep=mv+4+4*k; var et=ep+v.getUint32(ep,true); var ev=et-v.getInt32(et,true);
      var f2=__fo(v,ev,2), f3=__fo(v,ev,3);
      if(f2){
        var x=v.getFloat32(et+f2,true);
        if(x>0 && x<m){ v.setFloat32(et+f2,m,true); cnt++; }
      }
      if(f3){
        var y=v.getFloat32(et+f3,true);
        if(y>0 && y<m) v.setFloat32(et+f3,m,true);
      }
    }
    // summary 强度同步
    var o2=v.getUint16(nv+4+2*2,true);
    if(o2){
      var sp=nh+o2; var sv=sp+v.getUint32(sp,true); var n2=v.getUint32(sv,true);
      for(var k2=0;k2<n2&&k2<20;k2++){
        var e2=sv+4+4*k2; var t2=e2+v.getUint32(e2,true); var v2=t2-v.getInt32(t2,true);
        var g4=v.getUint16(v2+4+2*4,true);
        if(g4){ var z=v.getFloat32(t2+g4,true); if(z>0 && z<m) v.setFloat32(t2+g4,m,true); }
      }
    }
    console.log("✅ [天气增强] 分钟降水 · 最低强度 "+m+" mm/h，抬升 "+cnt+" 条");
    return bin;
  }catch(e){ console.log("⚠️ [天气增强] 最低强度异常："+(e&&e.message)); return body; }
}


async function __nhPeak(body,url,st){
  try{
    var tgt=parseFloat(__arg("NextHour.PeakIntensity","0"));
    if(!isFinite(tgt)||tgt<=0) return body;
    if(!(body instanceof Uint8Array)) return body;
    var ps=url.pathname.split('/').filter(function(x){return x});
    if(ps[1]!=="v3"||ps[2]!=="weather"||ps.length<6) return body;
    var N=body.length; var bin=new Uint8Array(N); for(var q=0;q<N;q++) bin[q]=body[q];
    var v=new DataView(bin.buffer);
    var tr=v.getUint32(0,true), trvt=tr-v.getInt32(tr,true);
    if(v.getUint16(trvt+4+2*5,true)===0) return body;
    var p5=tr+v.getUint16(trvt+4+2*5,true); var nh=p5+v.getUint32(p5,true);
    var nv=nh-v.getInt32(nh,true);
    var o5=v.getUint16(nv+4+2*5,true);
    if(!o5) return body;
    var mp=nh+o5; var mv=mp+v.getUint32(mp,true); var n=v.getUint32(mv,true);
    var mx=0;
    for(var k=0;k<n&&k<200;k++){
      var ep=mv+4+4*k; var et=ep+v.getUint32(ep,true); var ev=et-v.getInt32(et,true);
      var f2=__fo(v,ev,2);
      if(f2){ var x=v.getFloat32(et+f2,true); if(x>mx) mx=x; }
    }
    if(mx<=0||mx>=tgt){ console.log("⏭ [天气增强] 峰值归一化 · 当前峰值 "+mx.toFixed(3)+" 已达标"); return body; }
    var ratio=tgt/mx; var cnt=0;
    for(var k2=0;k2<n&&k2<200;k2++){
      var e2=mv+4+4*k2; var t2=e2+v.getUint32(e2,true); var v2=t2-v.getInt32(t2,true);
      var g2=__fo(v,v2,2), g3=__fo(v,v2,3);
      if(g2){ var y=v.getFloat32(t2+g2,true); if(y>0){ v.setFloat32(t2+g2,y*ratio,true); cnt++; } }
      if(g3){ var z=v.getFloat32(t2+g3,true); if(z>0) v.setFloat32(t2+g3,z*ratio,true); }
    }
    var o2=v.getUint16(nv+4+2*2,true);
    if(o2){
      var sp=nh+o2; var sv=sp+v.getUint32(sp,true); var n2=v.getUint32(sv,true);
      for(var k3=0;k3<n2&&k3<20;k3++){
        var e3=sv+4+4*k3; var t3=e3+v.getUint32(e3,true); var v3=t3-v.getInt32(t3,true);
        var g4=v.getUint16(v3+4+2*4,true);
        if(g4){ var w=v.getFloat32(t3+g4,true); if(w>0) v.setFloat32(t3+g4,w*ratio,true); }
      }
    }
    console.log("✅ [天气增强] 峰值归一化 · "+mx.toFixed(3)+" → "+tgt+" (×"+ratio.toFixed(1)+") · "+cnt+" 条");
    return bin;
  }catch(e){ console.log("⚠️ [天气增强] 峰值归一化异常："+(e&&e.message)); return body; }
}



function __condCalc(p2, cnt){
  var first=-1, last=-1, any=false;
  for(var i=0;i<cnt;i++){
    if(p2[i]>0){ any=true; if(first<0) first=i; last=i; }
  }
  if(!any) return {token:1, begin:1, end:1, first:-1};
  var startsLater = first>0;
  var endsEarly = last<cnt-1;
  var token = (startsLater&&endsEarly)?4 : startsLater?1 : endsEarly?2 : 5;
  return {token:token, begin:6, end:6, first:first};
}



/* 感知强度 → 条件类型（对齐苹果 Minute() 分级）
   >2   HEAVY_RAIN(5)      暴雨
   >1   RAIN(6)            雨
   >.1  DRIZZLE(7)         小雨
   >0   POSSIBLE_DRIZZLE(8) 微雨
   =0   CLEAR(0)           无 */

/* 取第 k 分钟的原始强度 */

/* ===== WK3 v3 Minute 真实结构（从真实响应逆向，非 v2 schema）=====
   vs=10 ts=16/18  vtable=[12,11,4]
     slot 0 (+ts-12) startTime             uint32
     slot 1 (+ts-11) precipitationChance   int8  0-100
     slot 2 (+ts-4)  perceivedIntensity    float32 0-3（感知强度，已归一化）
   注意：v3 的 slot2 是 float32，不是 int8；
        v2 那套 slot9/slot22 在这里不存在。 */
function __v3minute(v, mv, k){
  var e=mv+4+4*k;
  var t=e+v.getUint32(e,true);
  var tv=t-v.getInt32(t,true);
  var vs=v.getUint16(tv,true);
  var nf=(vs-4)/2;
  function off(i){ return (4+2*i+2<=vs)? v.getUint16(tv+4+2*i,true):0; }
  var oSt=off(0), oCh=off(1), oPi=off(2);
  return {
    t:t, tv:tv,
    startTime: oSt? v.getUint32(t+oSt,true) : 0,
    chance: oCh? v.getUint8(t+oCh) : 0,
    perceived: oPi? v.getFloat32(t+oPi,true) : 0
  };
}

/* 感知强度(0-3) → 条件类型（v3 已归一化，直接按阈值分档） */
function __v3cond(p, isSnow){
  var HEAVY_RAIN=5, RAIN=6, DRIZZLE=7, POSSIBLE=8, HEAVY_SNOW=9, SNOW=10, CLEAR=0;
  if(p>2) return isSnow?HEAVY_SNOW:HEAVY_RAIN;
  if(p>1) return isSnow?SNOW:RAIN;
  if(p>0.1) return isSnow?SNOW:DRIZZLE;
  if(p>0) return isSnow?SNOW:POSSIBLE;
  return CLEAR;
}

function __segIntFrom(v, mv, n, k){
  try{
    var ep=mv+4+4*k; var et=ep+v.getUint32(ep,true); var ev=et-v.getInt32(et,true);
    var f2=__fo(v,ev,2);
    return f2? v.getFloat32(et+f2,true) : 0;
  }catch(e){ return 0; }
}

function __condOf(p, type){
  var isSnow = (type===1);
  if(p>2) return isSnow?9:5;
  if(p>1) return isSnow?10:6;
  if(p>0.1) return isSnow?10:7;
  if(p>0) return isSnow?10:8;
  return 0;
}
function __perceived(x){
  if(!(x>0)) return 0;
  if(x<=0.08) return 0;
  if(x<=3.44) return Math.min(1,(x-0.08)/3.36);
  if(x<=11.33) return 1+Math.min(1,(x-3.44)/7.89);
  if(x<=51.3) return 2+Math.min(1,(x-11.33)/39.97);
  return 3;
}

function __fo(v, vt, idx){
  try{ var vs=v.getUint16(vt,true); return (4+2*idx+2<=vs)?v.getUint16(vt+4+2*idx,true):0; }catch(e){ return 0; }
}

async function __nhClean(body,url,st){
  try{
    if(!(body instanceof Uint8Array)) return body;
    var ps=url.pathname.split('/').filter(function(x){return x});
    if(ps[1]!=="v3"||ps[2]!=="weather"||ps.length<6) return body;
    var N=body.length; var bin=new Uint8Array(N); for(var q=0;q<N;q++) bin[q]=body[q];
    var v=new DataView(bin.buffer);
    var tr=v.getUint32(0,true), trvt=tr-v.getInt32(tr,true);
    if(v.getUint16(trvt+4+2*5,true)===0) return body;
    var p5=tr+v.getUint16(trvt+4+2*5,true); var nh=p5+v.getUint32(p5,true);
    var nv=nh-v.getInt32(nh,true);
    var o5=v.getUint16(nv+4+2*5,true);
    if(!o5) return body;
    var mp=nh+o5; var mv=mp+v.getUint32(mp,true);
    /* 边界校验：新建的 slot5 可能导致偏移变化 */
    if(mv+4 > N) return body;
    var n=v.getUint32(mv,true);
    if(n<1 || n>300) return body;
    if(mv+4+4*n > N) return body;
    var __nhText=String(__arg('NextHour.Description','')||'');
    var mx=0, __first=-1, __last=-1;
    for(var k=0;k<n&&k<200;k++){
      var __mm=__v3minute(v,mv,k);
      var x=__mm.perceived;
      if(x>mx) mx=x;
      if(x>0){ if(__first<0) __first=k; __last=k; }
    }
    if(mx>0){
      // 修正 condition 向量
      /* 统计中段停顿：有雨→无雨→有雨 才是多段 */
      var __gaps=0, __inRain=false, __seenRain=false;
      for(var kk=0;kk<n&&kk<200;kk++){
        var ekk=mv+4+4*kk; var tkk=ekk+v.getUint32(ekk,true); var vkk=tkk-v.getInt32(tkk,true);
        var fkk=__fo(v,vkk,2);
        var xkk=fkk?v.getFloat32(tkk+fkk,true):0;
        if(xkk>0){ if(!__inRain&&__seenRain) __gaps++; __inRain=true; __seenRain=true; }
        else if(__seenRain){ __inRain=false; }
      }
      var __tok=5;
      if(__first>0&&__last<n-1) __tok=4;        /* 首尾都无雨 → STOP_START */
      else if(__first>0) __tok=1;               /* 开头无雨   → START */
      else if(__last<n-1) __tok=2;              /* 结尾无雨   → STOP */
      else if(__gaps>0) __tok=3;                /* 首尾有雨但中间断 → START_STOP */
      else __tok=5;                             /* 全程有雨   → CONSTANT */
      if(__gaps>0) console.log("🌧 [天气增强] 分钟降水 · 多段降雨，中段停顿 "+__gaps+" 次");
      var o1f=v.getUint16(nv+4+2*1,true);
      if(o1f){
        var spF=nh+o1f; var svF=spF+v.getUint32(spF,true); var nF=v.getUint32(svF,true);
        var fixed3=0;
        for(var kF=0;kF<nF&&kF<20;kF++){
          var eF=svF+4+4*kF; var tF=eF+v.getUint32(eF,true); var vF=tF-v.getInt32(tF,true);
          var vsF=v.getUint16(vF,true);
          var f2f=v.getUint16(vF+4+2*2,true), f3f=v.getUint16(vF+4+2*3,true), f4f=v.getUint16(vF+4+2*4,true);
          /* token 由 __nhRoot 统一计算，此处不再覆盖 */
        }
        if(fixed3) console.log("✅ [天气增强] 分钟降水 · 条件修正 token="+__tok+" 首雨="+__first+" 末雨="+__last);
      }
      // 有雨：确保 summary 条件为 RAIN（苹果语义：强度>0 即非 CLEAR）
      var o2r=v.getUint16(nv+4+2*2,true);
      if(o2r){
        var spR=nh+o2r; var svR=spR+v.getUint32(spR,true); var nR=v.getUint32(svR,true);
        var fixed2=0, __condSet={};
        for(var kR=0;kR<nR&&kR<20;kR++){
          var eR=svR+4+4*kR; var tR=eR+v.getUint32(eR,true); var vR=tR-v.getInt32(tR,true);
          var vsR=v.getUint16(vR,true);
          for(var fR=0;fR<(vsR-4)/2;fR++){
            if(fR!==2) continue;
            var ooR=v.getUint16(vR+4+2*fR,true); if(!ooR) continue;
            var posR=tR+ooR;
            var uR=v.getUint32(posR,true);
            if(uR>0&&posR+uR+8<=v.buffer.byteLength){
              var vpR=posR+uR, lnR=v.getUint32(vpR,true);
              if(lnR===1 && vpR+5<=v.buffer.byteLength){
                /* 按本段分钟强度分级：>2 暴雨 / >1 雨 / >.1 小雨 / >0 微雨 */
                /* 这里写的是 summary.precipitationType（0=无 1=雨 2=雪 3=雨夹雪 6=混合），
                   不是 condition 枚举，不能混用 */
                var __segV=v.getUint8(vpR+4);
                var __pi=__perceived(__segIntFrom(v,mv,n,kR));
                var __typ = __pi>0 ? __guessType(__nhText) : 0;
                if(__segV>6 || __segV===0 && __pi>0 || __segV===2 && __pi>0){
                  v.setUint8(vpR+4,__typ); fixed2++;
                }
                __condSet[__typ]=(__condSet[__typ]||0)+1;
              }
            }
          }
        }
        if(fixed2) console.log("✅ [天气增强] 分钟降水 · 条件分级 "+JSON.stringify(__condSet)+" ("+fixed2+" 段)");
      }
      return bin;
    }
    var o2=v.getUint16(nv+4+2*2,true);
    if(!o2) return body;
    var sp=nh+o2; var sv=sp+v.getUint32(sp,true); var n2=v.getUint32(sv,true);
    var fixed=0;
    for(var k2=0;k2<n2&&k2<20;k2++){
      var e2=sv+4+4*k2; var t2=e2+v.getUint32(e2,true); var v2=t2-v.getInt32(t2,true);
      var vs=v.getUint16(v2,true);
      for(var f=0;f<(vs-4)/2;f++){
        var oo=v.getUint16(v2+4+2*f,true);
        if(!oo) continue;
        var pos=t2+oo;
        if(f===2){
          var uc=v.getUint32(pos,true);
          if(uc>0&&pos+uc+8<=v.buffer.byteLength){
            var vc=pos+uc, lc=vc?v.getUint32(vc,true):0;
            if(lc===1){ if(v.getUint8(vc+4)>2) v.setUint8(vc+4,1); fixed++; }
          }
        }
        else if(f===3){ v.setUint8(pos,0); }
        else if(f===4){ v.setFloat32(pos,0,true); }
      }
    }
    console.log("🧹 [天气增强] 分钟降水 · 全为 0，summary 已清为 CLEAR");
    return bin;
  }catch(e){ console.log("⚠️ [天气增强] 无雨清理异常："+(e&&e.message)); return body; }
}


async function __nhChance(body,url,st){
  try{
    var m=parseFloat(__arg("NextHour.MinChance","0"));
    if(!isFinite(m)||m<=0) return body;
    if(!(body instanceof Uint8Array)) return body;
    var ps=url.pathname.split('/').filter(function(x){return x});
    if(ps[1]!=="v3"||ps[2]!=="weather"||ps.length<6) return body;
    var N=body.length; var bin=new Uint8Array(N); for(var q=0;q<N;q++) bin[q]=body[q];
    var v=new DataView(bin.buffer);
    var tr=v.getUint32(0,true), trvt=tr-v.getInt32(tr,true);
    if(v.getUint16(trvt+4+2*5,true)===0) return body;
    var p5=tr+v.getUint16(trvt+4+2*5,true); var nh=p5+v.getUint32(p5,true);
    var nv=nh-v.getInt32(nh,true);
    var o5=v.getUint16(nv+4+2*5,true);
    if(!o5) return body;
    var mp=nh+o5; var mv=mp+v.getUint32(mp,true); var n=v.getUint32(mv,true);
    var rainy=0, cnt=0;
    for(var k=0;k<n&&k<200;k++){
      var ep=mv+4+4*k; var et=ep+v.getUint32(ep,true); var ev=et-v.getInt32(et,true);
      var f2=__fo(v,ev,2), f1=__fo(v,ev,1);
      if(f2 && v.getFloat32(et+f2,true)>0){
        rainy++;
        if(f1){ var c=v.getUint8(et+f1); if(c<m){ v.setUint8(et+f1,Math.min(100,m)); cnt++; } }
      }
    }
    if(!rainy){ console.log("⏭ [天气增强] 分钟降水 · 无雨，概率不动"); return body; }
    var o2=v.getUint16(nv+4+2*2,true);
    if(o2){
      var sp=nh+o2; var sv=sp+v.getUint32(sp,true); var n2=v.getUint32(sv,true);
      for(var k2=0;k2<n2&&k2<20;k2++){
        var e2=sv+4+4*k2; var t2=e2+v.getUint32(e2,true); var v2=t2-v.getInt32(t2,true);
        var g3=v.getUint16(v2+4+2*3,true);
        if(g3){ var cc=v.getUint8(t2+g3); if(cc<m) v.setUint8(t2+g3,Math.min(100,m)); }
      }
    }
    console.log("✅ [天气增强] 分钟降水 · 最低概率 "+m+"%，提升 "+cnt+" 条（强度不变）");
    return bin;
  }catch(e){ console.log("⚠️ [天气增强] 最低概率异常："+(e&&e.message)); return body; }
}
