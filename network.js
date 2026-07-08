/* ═══════════════════════════════════════════════════════════════
   どれトレ ネットワーク定義(路線図)
   index.html と timetable-input-tool.html の両方がこのファイルを読み込む。
   路線・駅を追加する場合はここだけを編集する。

   確実対応スコープ:
     相鉄線(海老名)・相鉄いずみ野線(湘南台) → 新横浜 → 日吉 → 武蔵小杉 → 田園調布
     → 目黒線 → 白金高輪 → 南北線・埼玉高速鉄道(浦和美園) / 都営三田線(西高島平)
     東横線は新横浜〜田園調布の並走区間のみ(渋谷方面は準備段階prep)

   segments: 駅の並び [駅名, 起点からの累積所要分(各停・概算)]
   ※所要分は概算値。実際の時刻は trains-input.json 側が持つ。

   このファイルは複数の<script>から参照されるため、すべての公開シンボルを
   明示的に window.* へ代入する(const だと別scriptから見えないことがある)。
   ═══════════════════════════════════════════════════════════════ */
(function(global){
  "use strict";

  var NETWORK = {
    schemaVersion: 1,

    segments: {
      /* ── 相鉄線(西側) ── */
      SOTETSU_MAIN:    [["海老名",0],["かしわ台",3],["さがみ野",5],["相模大塚",7],["大和",9],["瀬谷",12],["三ツ境",14],["希望ヶ丘",16],["二俣川",19],["鶴ケ峰",21],["西谷",24]],
      SOTETSU_IZUMINO: [["湘南台",0],["ゆめが丘",2],["いずみ中央",4],["いずみ野",6],["弥生台",8],["緑園都市",10],["南万騎が原",12],["二俣川",15]],
      SOTETSU_SHINYOKO:[["西谷",0],["羽沢横浜国大",3],["新横浜",7]],

      /* ── 東急新横浜線・並走区間 ── */
      SH:  [["新横浜",0],["新綱島",3],["日吉",6]],
      COR: [["日吉",0],["元住吉",2],["武蔵小杉",4],["新丸子",5],["多摩川",7],["田園調布",9]],

      /* ── 目黒線系統(東側) ── */
      MG:  [["田園調布",0],["奥沢",2],["大岡山",4],["洗足",6],["西小山",7],["武蔵小山",9],["不動前",11],["目黒",13]],
      SHD: [["目黒",0],["白金台",2],["白金高輪",4]],
      N:   [["白金高輪",0],["麻布十番",2],["六本木一丁目",4],["溜池山王",6],["永田町",8],["四ツ谷",10],["市ケ谷",12],["飯田橋",14],["後楽園",16],["東大前",18],["本駒込",19],["駒込",21],["西ケ原",23],["王子",25],["王子神谷",27],["志茂",29],["赤羽岩淵",31]],
      I:   [["白金高輪",0],["三田",2],["芝公園",4],["御成門",5],["内幸町",7],["日比谷",9],["大手町",11],["神保町",13],["水道橋",15],["春日",16],["白山",18],["千石",20],["巣鴨",22],["西巣鴨",24],["新板橋",25],["板橋区役所前",27],["板橋本町",29],["本蓮沼",31],["志村坂上",33],["志村三丁目",34],["蓮根",36],["西台",38],["高島平",39],["新高島平",41],["西高島平",43]],
      SR:  [["赤羽岩淵",0],["川口元郷",2],["南鳩ヶ谷",4],["鳩ヶ谷",6],["新井宿",8],["戸塚安行",10],["東川口",13],["浦和美園",16]],

      /* ── 準備段階(prep): 始発・終着ラベルとしてのみ使用。拡張時はprepを外す ── */
      TY_STUB: [["田園調布",0],["自由が丘",2],["都立大学",4],["学芸大学",6],["祐天寺",8],["中目黒",10],["代官山",11],["渋谷",14]]
    },

    /* 路線バッジ判定: 駅→路線コード(共用区間は列車の系統で解決) */
    segmentLine: {
      SH:"SH",
      COR:{shared:{TY:"TY"}, default:"MG"},
      MG:"MG",
      SHD:{shared:{I:"I", N:"N"}, default:"MG"},
      N:"N", I:"I", SR:"SR",
      TY_STUB:"TY",
      SOTETSU_SHINYOKO:"SO", SOTETSU_MAIN:"SO", SOTETSU_IZUMINO:"SO"
    },
    segmentPrecedence: ["SH","COR","MG","SHD","N","I","SR","TY_STUB","SOTETSU_SHINYOKO","SOTETSU_MAIN","SOTETSU_IZUMINO"],

    /* 対面乗り換え可能駅(乗換0分): 日吉〜田園調布の全駅 + 白金高輪 */
    transferStations: ["日吉","元住吉","武蔵小杉","新丸子","多摩川","田園調布","白金高輪"],

    /* 急行通過駅(東急線内。地下鉄・埼玉高速区間は全列車各駅停車) */
    expressSkip: ["元住吉","新丸子","多摩川","奥沢","洗足","西小山","不動前"],

    /* 系統定義: 「系統」選択と方向判定の基準(東側の終端駅) */
    branches: {
      I:  {label:"三田線方面(→西高島平)",       eastAnchor:"西高島平"},
      N:  {label:"南北線・埼玉高速(→浦和美園)",  eastAnchor:"浦和美園"},
      TY: {label:"東横線方面(→渋谷・準備中)",    eastAnchor:"渋谷"}
    },

    /* 駅選択リストのグループ(prep:true = 準備段階。時刻入力の対象外) */
    pickerGroups: [
      {label:"相鉄本線",              segs:["SOTETSU_MAIN"]},
      {label:"相鉄いずみ野線",        segs:["SOTETSU_IZUMINO"]},
      {label:"相鉄新横浜線",          segs:["SOTETSU_SHINYOKO"]},
      {label:"東急新横浜線・並走区間", segs:["SH","COR"]},
      {label:"東急目黒線",            segs:["MG","SHD"]},
      {label:"東京メトロ南北線",       segs:["N"]},
      {label:"埼玉高速鉄道",          segs:["SR"]},
      {label:"都営三田線",            segs:["I"]},
      {label:"東急東横線 渋谷方面(準備中)", segs:["TY_STUB"], prep:true}
    ]
  };

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
  function reversePath(p){
    var end = p[p.length-1][1];
    return p.slice().reverse().map(function(x){ return [x[0], end-x[1]]; });
  }
  function sliceFrom(p, st){
    var i = p.findIndex(function(x){ return x[0]===st; });
    var o = p[i][1];
    return p.slice(i).map(function(x){ return [x[0], x[1]-o]; });
  }
  function truncTo(p, st){
    var i = p.findIndex(function(x){ return x[0]===st; });
    return p.slice(0, i+1);
  }

  /* 駅グラフ(隣接リスト): 分岐を含む路線図でも機能する */
  var NET_GRAPH = (function(){
    var g = new Map();
    function link(a,b){
      if(!g.has(a)) g.set(a, new Set());
      if(!g.has(b)) g.set(b, new Set());
      g.get(a).add(b); g.get(b).add(a);
    }
    Object.keys(NETWORK.segments).forEach(function(key){
      var seg = NETWORK.segments[key];
      for(var i=0;i<seg.length-1;i++) link(seg[i][0], seg[i+1][0]);
    });
    return g;
  })();
  function netBfsDist(target){
    var dist = new Map([[target,0]]);
    var queue = [target];
    while(queue.length){
      var cur = queue.shift();
      var d = dist.get(cur);
      (NET_GRAPH.get(cur)||[]).forEach(function(nb){
        if(!dist.has(nb)){ dist.set(nb, d+1); queue.push(nb); }
      });
    }
    return dist;
  }
  function netBfsPath(from, to){
    if(from===to) return [from];
    if(!NET_GRAPH.has(from) || !NET_GRAPH.has(to)) return null;
    var prev = new Map([[from,null]]);
    var queue = [from];
    while(queue.length){
      var cur = queue.shift();
      var nbs = NET_GRAPH.get(cur)||[];
      for(var nb of nbs){
        if(prev.has(nb)) continue;
        prev.set(nb, cur);
        if(nb===to){
          var path=[to], p=cur;
          while(p!==null){ path.unshift(p); p=prev.get(p); }
          return path;
        }
        queue.push(nb);
      }
    }
    return null;
  }
  function netStationsOfGroups(includePrep){
    var seen = new Set(), out = [];
    NETWORK.pickerGroups.forEach(function(gr){
      if(gr.prep && !includePrep) return;
      gr.segs.forEach(function(sk){
        NETWORK.segments[sk].forEach(function(pair){
          if(!seen.has(pair[0])){ seen.add(pair[0]); out.push(pair[0]); }
        });
      });
    });
    return out;
  }

  /* ═════════ グローバル公開(全script共有) ═════════ */
  global.NETWORK = NETWORK;
  global.joinPaths = joinPaths;
  global.reversePath = reversePath;
  global.sliceFrom = sliceFrom;
  global.truncTo = truncTo;
  global.NET_GRAPH = NET_GRAPH;
  global.netBfsDist = netBfsDist;
  global.netBfsPath = netBfsPath;
  global.netStationsOfGroups = netStationsOfGroups;

})(typeof window !== "undefined" ? window : this);
