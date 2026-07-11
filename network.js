/* ═══════════════════════════════════════════════════════════════
   どれトレ ネットワーク定義  ―― 都営新宿線＋京王線 版
   index.html はこのファイルに完全依存する(路線データ・色・名称・種別ラベル・
   キャプションはすべてここで定義)。別路線に載せ替えるときはこのファイルを差し替える。

   稼働(時刻検索対象): 都営新宿線 ＋ 京王線(新線・本線・相模原・高尾)
   準備中(prep): 京王動物園線・競馬場線(データ未収録)

   新宿は2ノード: 「新宿」(都営↔京王新線の境界=新線側) と 「京王新宿」(京王本線起点)。
   駅グループ機能で、登録時は「新宿」1つ、案内では「新宿 (新線)」/「新宿 (京王本線)」に出し分ける。
   ═══════════════════════════════════════════════════════════════ */
(function(global){
  "use strict";

  var NETWORK = {
    schemaVersion: 1,
    id: "toei-shinjuku-keio-v1",
    appName: "どれトレ",
    defaultLine: "KO",
    defaultAnchor: "本八幡",

    lines: {
      S:  {c:"#6CB929", s:"S",  name:"都営新宿線"},
      KO: {c:"#DD0077", s:"KO", name:"京王線"}
    },
    theme: {
      tint:"#DD0077", tintRgb:"221,0,119", themeColor:"#DD0077",
      heroLight:{top:"#A80059", bottom:"#DD0077"},
      heroDark: {top:"#73003C", bottom:"#A80059"}
    },
    captions: {
      supportedLines: "都営新宿線・京王線(新線/本線/相模原/高尾)",
      transferNote:   "大島・笹塚・調布・北野・府中・高幡不動・京王多摩センターでは、同じホームの向かい側で乗り換えできます。"
    },

    segments: {
      SHINJUKU: [["本八幡",0],["篠崎",3],["瑞江",6],["一之江",8],["船堀",11],["東大島",13],["大島",16],["西大島",17],["住吉",19],["菊川",21],["森下",23],["浜町",24],["馬喰横山",26],["岩本町",28],["小川町",29],["神保町",31],["九段下",33],["市ケ谷",35],["曙橋",37],["新宿三丁目",40],["新宿",41]],
      KEIONEW:  [["新宿",0],["初台",2],["幡ヶ谷",3],["笹塚",5]],
      KEIOSTUB: [["京王新宿",0],["笹塚",4]],
      KEIOMAIN: [["笹塚",0],["代田橋",1],["明大前",3],["下高井戸",5],["桜上水",7],["上北沢",8],["八幡山",10],["芦花公園",11],["千歳烏山",13],["仙川",16],["つつじヶ丘",18],["柴崎",20],["国領",21],["布田",23],["調布",25],["西調布",27],["飛田給",29],["武蔵野台",31],["多磨霊園",32],["東府中",35],["府中",37],["分倍河原",40],["中河原",42],["聖蹟桜ヶ丘",44],["百草園",47],["高幡不動",49],["南平",51],["平山城址公園",53],["長沼",55],["北野",57],["京王八王子",60]],
      SAGAMIHARA: [["調布",0],["京王多摩川",2],["京王稲田堤",4],["京王よみうりランド",6],["稲城",8],["若葉台",11],["京王永山",14],["京王多摩センター",16],["京王堀之内",18],["南大沢",20],["多摩境",22],["橋本",25]],
      TAKAO:    [["北野",0],["京王片倉",2],["山田",4],["めじろ台",6],["狭間",8],["高尾",10],["高尾山口",12]],
      DOBUTSUEN:[["高幡不動",0],["多摩動物公園",3]],
      KEIBAJO:  [["東府中",0],["府中競馬正門前",2]]
    },

    segmentLine: {
      SHINJUKU:"S",
      KEIONEW:"KO", KEIOSTUB:"KO", KEIOMAIN:"KO",
      SAGAMIHARA:"KO", TAKAO:"KO", DOBUTSUEN:"KO", KEIBAJO:"KO"
    },
    segmentPrecedence: ["SHINJUKU","KEIONEW","KEIOSTUB","KEIOMAIN","SAGAMIHARA","TAKAO","DOBUTSUEN","KEIBAJO"],

    /* 対面乗り換え0分: 大島(都営新宿線の待避駅・各停⇔急行が同一ホーム接続)、
       笹塚(京王線本線と京王新線の分岐・2面4線で対面乗り換え可)。
       ※森下は1面2線で待避線が無いため対面乗り換え不可(除外)。 */
    transferStations: ["大島","笹塚","調布","北野","府中","高幡不動","京王多摩センター"],

    /* 都営新宿線の急行通過駅(急行停車=新宿・市ケ谷・神保町・馬喰横山・森下・大島・船堀・本八幡) */
    expressSkip: ["篠崎","瑞江","一之江","東大島","西大島","住吉","菊川","浜町","岩本町","小川町","九段下","曙橋","新宿三丁目"],

    branches: {
      KO: {label:"京王線直通方面", eastAnchor:"本八幡"}
    },

    /* ═════════ インプットツール用ラベル ═════════
       nb=eastAnchorへ近づく向き / sb=その逆。別路線に載せ替えるときはここも書き換える。 */
    directions: {
      nb: { badge:"上り", button:"上り(京王線方面 → 本八幡)", section:"上り(京王線方面 → 本八幡)" },
      sb: { badge:"下り", button:"下り(本八幡 → 京王線方面)", section:"下り(本八幡 → 京王線方面)" }
    },
    /* 種別トグル: tk=expressSkip(都営急行通過駅) / so=expressSkipSotetsu を使う区間。
       通過駅リストが空の区間トグルはツール側で自動的に非表示になる。 */
    typeLabels: {
      tk: { region:"都営新宿線内の種別", loc:"各停", exp:"急行" },
      so: { region:"種別(補助区間)",       loc:"各停", exp:"急行" }
    },

    /* 駅グループ: 登録時は1つの名前で選び、案内では別々のホームとして出し分ける。
       members = 物理ノード(探索は全メンバーへ展開), labels = 案内表示名。 */
    stationGroups: {
      "新宿": { members:["新宿","京王新宿"], labels:{ "新宿":"新宿 (新線)", "京王新宿":"新宿 (京王本線)" } }
    },

    pickerGroups: [
      {label:"都営新宿線",              segs:["SHINJUKU"]},
      {label:"京王新線",                segs:["KEIONEW"]},
      {label:"京王線 新宿口",            segs:["KEIOSTUB"]},
      {label:"京王線 本線",              segs:["KEIOMAIN"]},
      {label:"京王相模原線",             segs:["SAGAMIHARA"]},
      {label:"京王高尾線",               segs:["TAKAO"]},
      {label:"京王動物園線(準備中)",      segs:["DOBUTSUEN"],  prep:true},
      {label:"京王競馬場線(準備中)",      segs:["KEIBAJO"],    prep:true}
    ]
  };

  /* ═════════ 路線固有の表示ロジック ═════════ */
  /* 種別ラベル。kind(乗車区間の種別)が渡ればそれを優先、無ければ列車既定。
     loc=各停,exp=急行,rapid=快速,sexp=区間急行,ltd=特急,liner=京王ライナー */
  var KEIO_TYPE = { loc:"各停", exp:"急行", rapid:"快速", sexp:"区間急行", ltd:"特急", liner:"京王ライナー" };
  function netTypeLabel(tr, lineCode, kind){
    var k = (kind != null) ? kind : ((tr.kindTk != null) ? tr.kindTk : tr.kindSo);
    return KEIO_TYPE[k] || "各停";
  }
  /* 停車駅名の補正: データ上は新線側も本線側も「新宿」なので、隣接駅で実体を判定し、
     本線側(笹塚に隣接・初台に非隣接)を「京王新宿」に振り分ける。 */
  function netFixStops(names){
    for(var i=0;i<names.length;i++){
      if(names[i] !== "新宿") continue;
      var a=names[i-1], b=names[i+1];
      if((a==="笹塚"||b==="笹塚") && !(a==="初台"||b==="初台")) names[i]="京王新宿";
    }
    return names;
  }
  /* 列車の説明: 始発駅と、区間ごとの種別を stops[i][3](区間種別)から組み立てる。
     例: 「橋本始発　橋本〜新宿間は区間急行、新宿〜本八幡間は各駅停車」 */
  var DESC_TYPE = { loc:"各駅停車", exp:"急行", rapid:"快速", sexp:"区間急行", ltd:"特急", liner:"京王ライナー" };
  function netTrainDesc(tr){
    var stops = tr.stops || [];
    var defKind = (tr.kindTk != null ? tr.kindTk : tr.kindSo) || "loc";
    if(stops.length < 2) return netDisplayStation((stops[0] && stops[0][0]) || tr.origin || "") + "始発";
    var runs = [];
    for(var i=0;i<stops.length-1;i++){
      var k = stops[i][3] || defKind;
      var nextName = stops[i+1][0];
      if(runs.length && runs[runs.length-1].type === k){
        runs[runs.length-1].end = nextName;
      }else{
        runs.push({ type:k, start:stops[i][0], end:nextName });
      }
    }
    var origin = netDisplayStation(stops[0][0]);
    if(runs.length === 1){
      return origin + "始発・全区間" + (DESC_TYPE[runs[0].type] || "各駅停車");
    }
    var parts = runs.map(function(r){
      return netDisplayStation(r.start) + "〜" + netDisplayStation(r.end) + "間は" + (DESC_TYPE[r.type] || "各駅停車");
    });
    return origin + "始発　" + parts.join("、");
  }
  /* 区間(隣り合う停車駅の間)が乗り入れる路線を判定。両駅を同時に含む
     セグメントを優先順で探し、その路線コードを返す。京王線内で完結する
     乗車や、京王本線新宿(新線非経由)の判定に使う。 */
  function netEdgeLine(a, b, train){
    var prec = NETWORK.segmentPrecedence;
    for(var s=0;s<prec.length;s++){
      var key = prec[s], seg = NETWORK.segments[key];
      var hasA=false, hasB=false;
      for(var i=0;i<seg.length;i++){ if(seg[i][0]===a) hasA=true; if(seg[i][0]===b) hasB=true; }
      if(hasA && hasB){
        var rule = NETWORK.segmentLine[key];
        if(typeof rule === "string") return rule;
        var bl = rule.shared && train && rule.shared[train.branch];
        if(bl) return bl;
        return rule.default;
      }
    }
    return null;
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
  /* 駅グループ ヘルパー */
  function netGroupOf(name){
    var G = NETWORK.stationGroups || {};
    for(var k in G){ if(G[k].members.indexOf(name) >= 0) return k; }
    return null;
  }
  function netExpandStation(name){
    var g = (NETWORK.stationGroups || {})[name];
    return g ? g.members.slice() : [name];
  }
  function netDisplayStation(name){
    var G = NETWORK.stationGroups || {};
    for(var k in G){ if(G[k].labels && G[k].labels[name]) return G[k].labels[name]; }
    return name;
  }
  function netStationsOfGroups(includePrep){
    var seen = new Set(), out = [];
    NETWORK.pickerGroups.forEach(function(gr){
      if(gr.prep && !includePrep) return;
      gr.segs.forEach(function(sk){
        NETWORK.segments[sk].forEach(function(pair){
          var label = netGroupOf(pair[0]) || pair[0];
          if(!seen.has(label)){ seen.add(label); out.push(label); }
        });
      });
    });
    return out;
  }

  /* ═════════ グローバル公開 ═════════ */
  global.NETWORK = NETWORK;
  global.netTypeLabel = netTypeLabel;
  global.netFixStops = netFixStops;
  global.netTrainDesc = netTrainDesc;
  global.netEdgeLine = netEdgeLine;
  global.joinPaths = joinPaths;
  global.reversePath = reversePath;
  global.sliceFrom = sliceFrom;
  global.truncTo = truncTo;
  global.NET_GRAPH = NET_GRAPH;
  global.netBfsDist = netBfsDist;
  global.netBfsPath = netBfsPath;
  global.netStationsOfGroups = netStationsOfGroups;
  global.netGroupOf = netGroupOf;
  global.netExpandStation = netExpandStation;
  global.netDisplayStation = netDisplayStation;

})(typeof window !== "undefined" ? window : this);
