/* ═══════════════════════════════════════════════════════════════
   どれトレ ネットワーク定義  ―― 東急目黒線系統(相鉄〜東急〜南北/三田〜埼玉高速)
   ＋ 東横線〜副都心線〜東武東上線(→小川町) 直通 版
   index.html はこのファイルに完全依存する。別路線に載せ替えるときはこのファイルを差し替える。
   ═══════════════════════════════════════════════════════════════ */
(function(global){
  "use strict";

  var NETWORK = {
    schemaVersion: 1,
    id: "tokyu-meguro-v1",
    appName: "どれトレ",
    defaultLine: "MG",
    defaultAnchor: "浦和美園",

    lines: {
      SH:{c:"#8F76D6", s:"SH", name:"東急新横浜線"},
      TY:{c:"#DA0442", s:"TY", name:"東急東横線"},
      MG:{c:"#009CD2", s:"MG", name:"東急目黒線"},
      I: {c:"#0079C2", s:"I",  name:"都営三田線"},
      N: {c:"#00AC9A", s:"N",  name:"東京メトロ南北線"},
      SO:{c:"#0B2A6B", s:"SO", name:"相鉄線"},
      SR:{c:"#1CADCA", s:"SR", name:"埼玉高速鉄道"},
      FK:{c:"#9C5E31", s:"F",  name:"東京メトロ副都心線"},
      TJ:{c:"#00559D", s:"TJ", name:"東武東上線"},
      MM:{c:"#0071BC", s:"MM", name:"みなとみらい線"}
    },
    theme: {
      tint:"#DA0442", tintRgb:"218,4,66", themeColor:"#DA0442",
      heroLight:{top:"#B4003A", bottom:"#DA0442"},
      heroDark: {top:"#7A0025", bottom:"#B4003A"}
    },
    captions: {
      supportedLines: "東横線・目黒線・新横浜線・副都心線・東上線と直通各線",
      transferNote:   "日吉〜田園調布間の各駅・白金高輪・武蔵小山では、同じホームの向かい側で乗り換えできます。"
    },

    segments: {
      SOTETSU_MAIN:    [["海老名",0],["かしわ台",3],["さがみ野",5],["相模大塚",7],["大和",9],["瀬谷",12],["三ツ境",14],["希望ヶ丘",16],["二俣川",19],["鶴ケ峰",21],["西谷",24]],
      SOTETSU_IZUMINO: [["湘南台",0],["ゆめが丘",2],["いずみ中央",4],["いずみ野",6],["弥生台",8],["緑園都市",10],["南万騎が原",12],["二俣川",15]],
      SOTETSU_SHINYOKO:[["西谷",0],["羽沢横浜国大",3],["新横浜",7]],
      SH:  [["新横浜",0],["新綱島",3],["日吉",6]],
      COR: [["日吉",0],["元住吉",2],["武蔵小杉",4],["新丸子",5],["多摩川",7],["田園調布",9]],
      MG:  [["田園調布",0],["奥沢",2],["大岡山",4],["洗足",6],["西小山",7],["武蔵小山",9],["不動前",11],["目黒",13]],
      SHD: [["目黒",0],["白金台",2],["白金高輪",4]],
      N:   [["白金高輪",0],["麻布十番",2],["六本木一丁目",4],["溜池山王",6],["永田町",8],["四ツ谷",10],["市ケ谷",12],["飯田橋",14],["後楽園",16],["東大前",18],["本駒込",19],["駒込",21],["西ケ原",23],["王子",25],["王子神谷",27],["志茂",29],["赤羽岩淵",31]],
      I:   [["白金高輪",0],["三田",2],["芝公園",4],["御成門",5],["内幸町",7],["日比谷",9],["大手町",11],["神保町",13],["水道橋",15],["春日",16],["白山",18],["千石",20],["巣鴨",22],["西巣鴨",24],["新板橋",25],["板橋区役所前",27],["板橋本町",29],["本蓮沼",31],["志村坂上",33],["志村三丁目",34],["蓮根",36],["西台",38],["高島平",39],["新高島平",41],["西高島平",43]],
      SR:  [["赤羽岩淵",0],["川口元郷",2],["南鳩ヶ谷",4],["鳩ヶ谷",6],["新井宿",8],["戸塚安行",10],["東川口",13],["浦和美園",16]],
      TY_STUB: [["田園調布",0],["自由が丘",2],["都立大学",4],["学芸大学",6],["祐天寺",8],["中目黒",10],["代官山",11],["渋谷",14]],
      /* 東横線 日吉→横浜(南=横浜側) */
      TY_SOUTH: [["日吉",0],["綱島",2],["大倉山",4],["菊名",6],["妙蓮寺",8],["白楽",10],["東白楽",11],["反町",13],["横浜",16]],
      /* みなとみらい線 横浜→元町・中華街(南=元町・中華街側) */
      MM:       [["横浜",0],["新高島",2],["みなとみらい",4],["馬車道",6],["日本大通り",8],["元町・中華街",10]],
      /* 東京メトロ副都心線: 渋谷 → 和光市(渋谷が南・和光市が北) */
      FUKU: [["渋谷",0],["明治神宮前",2],["北参道",4],["新宿三丁目",6],["東新宿",8],["西早稲田",10],["雑司が谷",12],["池袋",14],["要町",16],["千川",18],["小竹向原",20],["氷川台",22],["平和台",24],["地下鉄赤塚",26],["地下鉄成増",28],["和光市",31]],
      /* 東武東上線: 和光市 → 小川町(和光市が南・小川町が北の終端) */
      TOJO: [["和光市",0],["朝霞",3],["朝霞台",6],["志木",9],["柳瀬川",11],["みずほ台",13],["鶴瀬",15],["ふじみ野",17],["上福岡",19],["新河岸",22],["川越",25],["川越市",27],["霞ケ関",30],["鶴ケ島",33],["若葉",35],["坂戸",38],["北坂戸",40],["高坂",43],["東松山",47],["森林公園",51],["つきのわ",54],["武蔵嵐山",57],["小川町",63]]
    },

    segmentLine: {
      SH:"SH",
      COR:{shared:{TY:"TY"}, default:"MG"},
      MG:"MG",
      SHD:{shared:{I:"I", N:"N"}, default:"MG"},
      N:"N", I:"I", SR:"SR",
      TY_STUB:"TY",
      TY_SOUTH:"TY", MM:"MM",
      FUKU:"FK", TOJO:"TJ",
      SOTETSU_SHINYOKO:"SO", SOTETSU_MAIN:"SO", SOTETSU_IZUMINO:"SO"
    },
    segmentPrecedence: ["SH","COR","MG","SHD","N","I","SR","TY_STUB","TY_SOUTH","MM","FUKU","TOJO","SOTETSU_SHINYOKO","SOTETSU_MAIN","SOTETSU_IZUMINO"],

    /* 対面乗り換え可能駅(乗換0分): 日吉〜田園調布の全駅 + 白金高輪 + 武蔵小山 */
    transferStations: ["日吉","元住吉","武蔵小杉","新丸子","多摩川","田園調布","白金高輪","武蔵小山"],

    expressSkip: ["元住吉","新丸子","奥沢","洗足","西小山","不動前"],
    expressSkipSotetsu: ["かしわ台","さがみ野","相模大塚","瀬谷","三ツ境","希望ヶ丘","鶴ケ峰","ゆめが丘","いずみ中央","弥生台","緑園都市","南万騎が原"],
    expressSkipFukutoshin:     ["北参道","東新宿","西早稲田","雑司が谷","要町","千川","氷川台","平和台","地下鉄赤塚","地下鉄成増"],
    commExpressSkipFukutoshin: ["北参道","東新宿","西早稲田","雑司が谷","要町","千川"],
    /* 東横線: 急行 / 通勤特急 / 特急 の通過駅(本区間は日吉が分岐停車のため通特と特急は同一) */
    expressSkipToyoko: ["元住吉","新丸子","都立大学","祐天寺","代官山","大倉山","妙蓮寺","白楽","東白楽","反町","新高島"],
    commLtdSkipToyoko: ["元住吉","新丸子","多摩川","田園調布","都立大学","学芸大学","祐天寺","代官山","綱島","大倉山","妙蓮寺","白楽","東白楽","反町","新高島"],
    ltdSkipToyoko:     ["元住吉","新丸子","多摩川","田園調布","都立大学","学芸大学","祐天寺","代官山","日吉","綱島","大倉山","妙蓮寺","白楽","東白楽","反町","新高島","馬車道","日本大通り"],

    branches: {
      I:  {label:"三田線方面(→西高島平)",       eastAnchor:"西高島平"},
      N:  {label:"南北線・埼玉高速(→浦和美園)",  eastAnchor:"浦和美園"},
      TY: {label:"東横線・副都心線・東上線方面(→小川町)", eastAnchor:"小川町"}
    },

    pickerGroups: [
      {label:"相鉄本線",              segs:["SOTETSU_MAIN"]},
      {label:"相鉄いずみ野線",        segs:["SOTETSU_IZUMINO"]},
      {label:"相鉄新横浜線",          segs:["SOTETSU_SHINYOKO"]},
      {label:"東急新横浜線・並走区間", segs:["SH","COR"]},
      {label:"東急目黒線",            segs:["MG","SHD"]},
      {label:"東京メトロ南北線",       segs:["N"]},
      {label:"埼玉高速鉄道",          segs:["SR"]},
      {label:"都営三田線",            segs:["I"]},
      {label:"東急東横線 渋谷方面",     segs:["TY_STUB"]},
      {label:"東急東横線 横浜方面",     segs:["TY_SOUTH"]},
      {label:"みなとみらい線",         segs:["MM"]},
      {label:"東京メトロ副都心線",     segs:["FUKU"]},
      {label:"東武東上線 小川町方面",   segs:["TOJO"]}
    ]
  };

  /* ═════════ 路線固有の表示ロジック ═════════ */
  function netTypeLabel(tr, lineCode){
    if(lineCode === "SO") return tr.kindSo === "exp" ? "特急" : "各停";
    if(lineCode === "FK"){
      if(tr.kindFk === "exp")  return "急行";
      if(tr.kindFk === "cexp") return "通勤急行";
      return "各停";
    }
    if(lineCode === "TY" || lineCode === "MM"){
      if(tr.kindTy === "exp")  return "急行";
      if(tr.kindTy === "cexp") return "通勤特急";
      if(tr.kindTy === "ltd")  return "特急";
      return "各停";
    }
    if(lineCode === "TJ") return "各停";
    return tr.kindTk === "exp" ? "急行" : "各停";
  }
  function netTrainDesc(tr){
    if(tr.branch==="TY") return tr.dir==="nb"
      ? "東横線→副都心線→東上線 方面 直通・並走区間で乗換可"
      : "東上線・副都心線・東横線から新横浜線直通";
    var via = tr.branch==="I" ? "三田線" : "南北線";
    if(tr.origin==="白金高輪") return "白金高輪始発・座れる可能性大";
    if(tr.origin==="日吉") return "日吉始発・目黒線→"+via+" 直通";
    return (tr.dir==="nb" ? "新横浜線→目黒線→"+via : via+"→目黒線→新横浜線")+" 直通";
  }

  /* ═════════ 共通ユーティリティ ═════════ */
  function joinPaths(){
    var ps = Array.prototype.slice.call(arguments);
    var out = ps[0].map(function(x){ return [x[0],x[1]]; });
    for(var k=1;k<ps.length;k++){
      var base = out[out.length-1][1];
      ps[k].forEach(function(pair,i){ if(i===0) return; out.push([pair[0], base+pair[1]]); });
    }
    return out;
  }
  function reversePath(p){ var end=p[p.length-1][1]; return p.slice().reverse().map(function(x){return [x[0],end-x[1]];}); }
  function sliceFrom(p, st){ var i=p.findIndex(function(x){return x[0]===st;}); var o=p[i][1]; return p.slice(i).map(function(x){return [x[0],x[1]-o];}); }
  function truncTo(p, st){ var i=p.findIndex(function(x){return x[0]===st;}); return p.slice(0,i+1); }
  var NET_GRAPH = (function(){
    var g = new Map();
    function link(a,b){ if(!g.has(a))g.set(a,new Set()); if(!g.has(b))g.set(b,new Set()); g.get(a).add(b); g.get(b).add(a); }
    Object.keys(NETWORK.segments).forEach(function(key){ var seg=NETWORK.segments[key]; for(var i=0;i<seg.length-1;i++) link(seg[i][0],seg[i+1][0]); });
    return g;
  })();
  function netBfsDist(target){
    var dist=new Map([[target,0]]), queue=[target];
    while(queue.length){ var cur=queue.shift(), d=dist.get(cur); (NET_GRAPH.get(cur)||[]).forEach(function(nb){ if(!dist.has(nb)){dist.set(nb,d+1);queue.push(nb);} }); }
    return dist;
  }
  function netBfsPath(from, to){
    if(from===to) return [from];
    if(!NET_GRAPH.has(from)||!NET_GRAPH.has(to)) return null;
    var prev=new Map([[from,null]]), queue=[from];
    while(queue.length){ var cur=queue.shift(), nbs=NET_GRAPH.get(cur)||[];
      for(var nb of nbs){ if(prev.has(nb))continue; prev.set(nb,cur);
        if(nb===to){ var path=[to],p=cur; while(p!==null){path.unshift(p);p=prev.get(p);} return path; }
        queue.push(nb);
      }
    }
    return null;
  }
  function netStationsOfGroups(includePrep){
    var seen=new Set(), out=[];
    NETWORK.pickerGroups.forEach(function(gr){
      if(gr.prep && !includePrep) return;
      gr.segs.forEach(function(sk){ NETWORK.segments[sk].forEach(function(pair){ if(!seen.has(pair[0])){seen.add(pair[0]);out.push(pair[0]);} }); });
    });
    return out;
  }

  global.NETWORK = NETWORK;
  global.netTypeLabel = netTypeLabel;
  global.netTrainDesc = netTrainDesc;
  global.joinPaths = joinPaths;
  global.reversePath = reversePath;
  global.sliceFrom = sliceFrom;
  global.truncTo = truncTo;
  global.NET_GRAPH = NET_GRAPH;
  global.netBfsDist = netBfsDist;
  global.netBfsPath = netBfsPath;
  global.netStationsOfGroups = netStationsOfGroups;

})(typeof window !== "undefined" ? window : this);
