// Compiled by ClojureScript 1.9.946 {}
goog.provide('cljs.js');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.walk');
goog.require('cljs.env');
goog.require('cljs.spec.alpha');
goog.require('cljs.analyzer');
goog.require('cljs.compiler');
goog.require('cljs.tools.reader');
goog.require('cljs.tools.reader.reader_types');
goog.require('cljs.tagged_literals');
goog.require('goog.crypt.base64');
goog.require('cljs.source_map');
goog.require('goog.string.StringBuffer');
goog.require("cljs.core$macros");
cljs.js.debug_prn = (function cljs$js$debug_prn(var_args){
var args__9960__auto__ = [];
var len__9953__auto___14934 = arguments.length;
var i__9954__auto___14935 = (0);
while(true){
if((i__9954__auto___14935 < len__9953__auto___14934)){
args__9960__auto__.push((arguments[i__9954__auto___14935]));

var G__14936 = (i__9954__auto___14935 + (1));
i__9954__auto___14935 = G__14936;
continue;
} else {
}
break;
}

var argseq__9961__auto__ = ((((0) < args__9960__auto__.length))?(new cljs.core.IndexedSeq(args__9960__auto__.slice((0)),(0),null)):null);
return cljs.js.debug_prn.cljs$core$IFn$_invoke$arity$variadic(argseq__9961__auto__);
});

cljs.js.debug_prn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var _STAR_print_fn_STAR_14933 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_fn_STAR_ = cljs.core._STAR_print_err_fn_STAR_;

try{return cljs.core.apply.call(null,cljs.core.println,args);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_14933;
}});

cljs.js.debug_prn.cljs$lang$maxFixedArity = (0);

cljs.js.debug_prn.cljs$lang$applyTo = (function (seq14932){
return cljs.js.debug_prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq14932));
});

/**
 * Given a namespace as a symbol return the relative path sans extension
 */
cljs.js.ns__GT_relpath = (function cljs$js$ns__GT_relpath(ns_sym){
return clojure.string.replace.call(null,cljs.analyzer.munge_path.call(null,ns_sym),".","/");
});
cljs.js.file__GT_ns = (function cljs$js$file__GT_ns(file){
var lib_name = cljs.core.subs.call(null,clojure.string.replace.call(null,file,"/","."),(0),(cljs.core.count.call(null,file) - (5)));
return cljs.core.symbol.call(null,cljs.core.demunge.call(null,lib_name));
});
cljs.js.drop_macros_suffix = (function cljs$js$drop_macros_suffix(ns_name){
if(cljs.core.truth_(ns_name)){
if(clojure.string.ends_with_QMARK_.call(null,ns_name,"$macros")){
return cljs.core.subs.call(null,ns_name,(0),(cljs.core.count.call(null,ns_name) - (7)));
} else {
return ns_name;
}
} else {
return null;
}
});
cljs.js.elide_macros_suffix = (function cljs$js$elide_macros_suffix(sym){
return cljs.core.symbol.call(null,cljs.js.drop_macros_suffix.call(null,cljs.core.namespace.call(null,sym)),cljs.core.name.call(null,sym));
});
cljs.js.resolve_symbol = (function cljs$js$resolve_symbol(sym){
if(clojure.string.starts_with_QMARK_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(sym)].join(''),".")){
return sym;
} else {
return cljs.js.elide_macros_suffix.call(null,cljs.analyzer.resolve_symbol.call(null,sym));
}
});
cljs.js.read = (function cljs$js$read(eof,rdr){
var _STAR_ns_STAR_14937 = cljs.core._STAR_ns_STAR_;
cljs.core._STAR_ns_STAR_ = cljs.core.symbol.call(null,cljs.js.drop_macros_suffix.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core._STAR_ns_STAR_)].join('')));

try{return cljs.tools.reader.read.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"eof","eof",-489063237),eof,new cljs.core.Keyword(null,"read-cond","read-cond",1056899244),new cljs.core.Keyword(null,"allow","allow",-1857325745),new cljs.core.Keyword(null,"features","features",-1146962336),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs","cljs",1492417629),null], null), null)], null),rdr);
}finally {cljs.core._STAR_ns_STAR_ = _STAR_ns_STAR_14937;
}});
cljs.js.atom_QMARK_ = (function cljs$js$atom_QMARK_(x){
return (x instanceof cljs.core.Atom);
});
cljs.js.valid_name_QMARK_ = (function cljs$js$valid_name_QMARK_(x){
return ((x == null)) || ((x instanceof cljs.core.Symbol)) || (typeof x === 'string');
});
cljs.js.valid_opts_QMARK_ = (function cljs$js$valid_opts_QMARK_(x){
return ((x == null)) || (cljs.core.map_QMARK_.call(null,x));
});
if(typeof cljs.js._STAR_load_fn_STAR_ !== 'undefined'){
} else {
/**
 * Each runtime environment provides a different way to load a library.
 *   Whatever function *load-fn* is bound to will be passed two arguments - a
 *   map and a callback function: The map will have the following keys:
 * 
 *   :name   - the name of the library (a symbol)
 *   :macros - modifier signaling a macros namespace load
 *   :path   - munged relative library path (a string)
 * 
 *   It is up to the implementor to correctly resolve the corresponding .cljs,
 *   .cljc, or .js resource (the order must be respected). If :macros is true
 *   resolution should only consider .clj or .cljc resources (the order must be
 *   respected). Upon resolution the callback should be invoked with a map
 *   containing the following keys:
 * 
 *   :lang       - the language, :clj or :js
 *   :source     - the source of the library (a string)
 *   :file       - optional, the file path, it will be added to AST's :file keyword
 *              (but not in :meta)
 *   :cache      - optional, if a :clj namespace has been precompiled to :js, can
 *              give an analysis cache for faster loads.
 *   :source-map - optional, if a :clj namespace has been precompiled to :js, can
 *              give a V3 source map JSON
 * 
 *   If the resource could not be resolved, the callback should be invoked with
 *   nil.
 */
cljs.js._STAR_load_fn_STAR_ = (function cljs$js$_STAR_load_fn_STAR_(m,cb){
throw (new Error("No *load-fn* set"));
});
}
if(typeof cljs.js._STAR_eval_fn_STAR_ !== 'undefined'){
} else {
/**
 * Each runtime environment provides various ways to eval JavaScript
 *   source. Whatever function *eval-fn* is bound to will be passed a map
 *   containing the following keys:
 * 
 *   :source - the source of the library (string)
 *   :name   - used to unique identify the script (symbol)
 *   :cache  - if the source was originally ClojureScript, will be given the
 *          analysis cache.
 * 
 *   The result of evaluation should be the return value.
 */
cljs.js._STAR_eval_fn_STAR_ = (function cljs$js$_STAR_eval_fn_STAR_(m){
throw (new Error("No *eval-fn* set"));
});
}
/**
 * A default JavaScript evaluation function.
 */
cljs.js.js_eval = (function cljs$js$js_eval(p__14938){
var map__14939 = p__14938;
var map__14939__$1 = ((((!((map__14939 == null)))?((((map__14939.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14939.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14939):map__14939);
var resource = map__14939__$1;
var source = cljs.core.get.call(null,map__14939__$1,new cljs.core.Keyword(null,"source","source",-433931539));
return eval(source);
});
cljs.js.wrap_error = (function cljs$js$wrap_error(ex){
return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),ex], null);
});
/**
 * Construct an empty compiler state. Required to invoke analyze, compile,
 * eval and eval-str.
 */
cljs.js.empty_state = (function cljs$js$empty_state(var_args){
var G__14942 = arguments.length;
switch (G__14942) {
case 0:
return cljs.js.empty_state.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.js.empty_state.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.js.empty_state.cljs$core$IFn$_invoke$arity$0 = (function (){
var G__14943 = cljs.env.default_compiler_env.call(null);
cljs.core.swap_BANG_.call(null,G__14943,((function (G__14943){
return (function (state){
});})(G__14943))
);

return G__14943;
});

cljs.js.empty_state.cljs$core$IFn$_invoke$arity$1 = (function (init){
var G__14944 = cljs.js.empty_state.call(null);
cljs.core.swap_BANG_.call(null,G__14944,init);

return G__14944;
});

cljs.js.empty_state.cljs$lang$maxFixedArity = 1;

cljs.js.load_analysis_cache_BANG_ = (function cljs$js$load_analysis_cache_BANG_(state,ns,cache){
return cljs.core.swap_BANG_.call(null,state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),ns], null),cache);
});
cljs.js.load_source_map_BANG_ = (function cljs$js$load_source_map_BANG_(state,ns,sm_json){
var sm = cljs.source_map.decode.call(null,JSON.parse(sm_json));
return cljs.core.swap_BANG_.call(null,state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"source-maps","source-maps",-552851697),ns], null),sm);
});
cljs.js.sm_data = (function cljs$js$sm_data(){
return cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"source-map","source-map",1706252311),cljs.core.sorted_map.call(null),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),(0),new cljs.core.Keyword(null,"gen-line","gen-line",589592125),(0)], null));
});
cljs.js.prefix = (function cljs$js$prefix(s,pre){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(pre),cljs.core.str.cljs$core$IFn$_invoke$arity$1(s)].join('');
});
cljs.js.append_source_map = (function cljs$js$append_source_map(state,name,source,sb,sm_data,p__14946){
var map__14947 = p__14946;
var map__14947__$1 = ((((!((map__14947 == null)))?((((map__14947.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14947.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14947):map__14947);
var opts = map__14947__$1;
var output_dir = cljs.core.get.call(null,map__14947__$1,new cljs.core.Keyword(null,"output-dir","output-dir",-290956991));
var asset_path = cljs.core.get.call(null,map__14947__$1,new cljs.core.Keyword(null,"asset-path","asset-path",1500889617));
var t = (new Date()).valueOf();
var smn = (cljs.core.truth_(name)?clojure.string.replace.call(null,cljs.core.munge.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join('')),".","/"):["cljs-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(t)].join(''));
var ts = (new Date()).valueOf();
var out = (function (){var or__8674__auto__ = output_dir;
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return asset_path;
}
})();
var src = (function (){var G__14949 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(smn),".cljs?rel=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ts)].join('');
if(cljs.core.truth_(out)){
return cljs.js.prefix.call(null,G__14949,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(out),"/"].join(''));
} else {
return G__14949;
}
})();
var file = (function (){var G__14950 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(smn),".js?rel=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ts)].join('');
if(cljs.core.truth_(out)){
return cljs.js.prefix.call(null,G__14950,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(out),"/"].join(''));
} else {
return G__14950;
}
})();
var json = cljs.source_map.encode.call(null,cljs.core.PersistentArrayMap.createAsIfByAssoc([src,new cljs.core.Keyword(null,"source-map","source-map",1706252311).cljs$core$IFn$_invoke$arity$1(sm_data)]),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"lines","lines",-700165781),(new cljs.core.Keyword(null,"gen-line","gen-line",589592125).cljs$core$IFn$_invoke$arity$1(sm_data) + (3)),new cljs.core.Keyword(null,"file","file",-1269645878),file,new cljs.core.Keyword(null,"sources-content","sources-content",1729970239),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null)], null));
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.debug_prn.call(null,json);
} else {
}

cljs.core.swap_BANG_.call(null,state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"source-maps","source-maps",-552851697),name], null),cljs.source_map.invert_reverse_map.call(null,new cljs.core.Keyword(null,"source-map","source-map",1706252311).cljs$core$IFn$_invoke$arity$1(sm_data)));

return sb.append(["\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file),"\n//# sourceMappingURL=data:application/json;base64,",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.crypt.base64.encodeString(clojure.string.replace.call(null,encodeURIComponent(json),/%([0-9A-F]{2})/,((function (t,smn,ts,out,src,file,json,map__14947,map__14947__$1,opts,output_dir,asset_path){
return (function (p__14951){
var vec__14952 = p__14951;
var _ = cljs.core.nth.call(null,vec__14952,(0),null);
var match = cljs.core.nth.call(null,vec__14952,(1),null);
return String.fromCharCode(["0x",cljs.core.str.cljs$core$IFn$_invoke$arity$1(match)].join(''));
});})(t,smn,ts,out,src,file,json,map__14947,map__14947__$1,opts,output_dir,asset_path))
)))].join(''));
});
cljs.js.current_alias_map = (function cljs$js$current_alias_map(){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.remove.call(null,(function (p__14955){
var vec__14956 = p__14955;
var k = cljs.core.nth.call(null,vec__14956,(0),null);
var v = cljs.core.nth.call(null,vec__14956,(1),null);
return cljs.core.symbol_identical_QMARK_.call(null,k,v);
}),cljs.core.merge.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),cljs.analyzer._STAR_cljs_ns_STAR_,new cljs.core.Keyword(null,"requires","requires",-1201390927)], null)),cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),cljs.analyzer._STAR_cljs_ns_STAR_,new cljs.core.Keyword(null,"require-macros","require-macros",707947416)], null)))));
});
cljs.js._STAR_loaded_STAR_ = cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY);
/**
 * Like cljs.core/run!, but for an async procedure, and with the
 *   ability to break prior to processing the entire collection.
 * 
 *   Chains successive calls to the supplied procedure for items in
 *   the collection. The procedure should accept an item from the
 *   collection and a callback of one argument. If the break? predicate,
 *   when applied to the procedure callback value, yields a truthy
 *   result, terminates early calling the supplied cb with the callback
 *   value. Otherwise, when complete, calls cb with nil.
 */
cljs.js.run_async_BANG_ = (function cljs$js$run_async_BANG_(proc,coll,break_QMARK_,cb){
if(cljs.core.seq.call(null,coll)){
return proc.call(null,cljs.core.first.call(null,coll),(function (res){
if(cljs.core.truth_(break_QMARK_.call(null,res))){
return cb.call(null,res);
} else {
return cljs.js.run_async_BANG_.call(null,proc,cljs.core.rest.call(null,coll),break_QMARK_,cb);
}
}));
} else {
return cb.call(null,null);
}
});
cljs.js.process_deps = (function cljs$js$process_deps(bound_vars,names,opts,cb){
return cljs.js.run_async_BANG_.call(null,(function (name,cb__$1){
return cljs.js.require.call(null,bound_vars,name,null,opts,cb__$1);
}),names,new cljs.core.Keyword(null,"error","error",-978969032),cb);
});
cljs.js.process_macros_deps = (function cljs$js$process_macros_deps(bound_vars,cache,opts,cb){
return cljs.js.process_deps.call(null,bound_vars,cljs.core.distinct.call(null,cljs.core.vals.call(null,new cljs.core.Keyword(null,"require-macros","require-macros",707947416).cljs$core$IFn$_invoke$arity$1(cache))),cljs.core.dissoc.call(null,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"macros-ns","macros-ns",1626844933),true),new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410),new cljs.core.Keyword(null,"optimize-constants","optimize-constants",232704518)),cb);
});
cljs.js.process_libs_deps = (function cljs$js$process_libs_deps(bound_vars,cache,opts,cb){
return cljs.js.process_deps.call(null,bound_vars,cljs.core.distinct.call(null,cljs.core.concat.call(null,cljs.core.vals.call(null,new cljs.core.Keyword(null,"requires","requires",-1201390927).cljs$core$IFn$_invoke$arity$1(cache)),cljs.core.vals.call(null,new cljs.core.Keyword(null,"imports","imports",-1249933394).cljs$core$IFn$_invoke$arity$1(cache)))),cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"macros-ns","macros-ns",1626844933)),cb);
});
cljs.js.pre_file_side_effects = (function cljs$js$pre_file_side_effects(st,name,file,opts){
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.debug_prn.call(null,"Pre-file side-effects",file);
} else {
}

if(cljs.core.truth_((function (){var and__8662__auto__ = cljs.core.get_in.call(null,cljs.core.deref.call(null,st),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),name,new cljs.core.Keyword(null,"defs","defs",1398449717)], null));
if(cljs.core.truth_(and__8662__auto__)){
return cljs.core.not.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"cljs.core$macros","cljs.core$macros",-2057787548,null),null,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null),null], null), null).call(null,name));
} else {
return and__8662__auto__;
}
})())){
return cljs.core.swap_BANG_.call(null,st,cljs.core.update,new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),cljs.core.dissoc,name);
} else {
return null;
}
});
cljs.js.post_file_side_effects = (function cljs$js$post_file_side_effects(file,opts){
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.debug_prn.call(null,"Post-file side-effects",file);
} else {
}

return cljs.core._STAR_unchecked_arrays_STAR_ = false;;
});
cljs.js.require = (function cljs$js$require(var_args){
var G__14960 = arguments.length;
switch (G__14960) {
case 2:
return cljs.js.require.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.js.require.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.js.require.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.js.require.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.js.require.cljs$core$IFn$_invoke$arity$2 = (function (name,cb){
return cljs.js.require.call(null,name,null,cb);
});

cljs.js.require.cljs$core$IFn$_invoke$arity$3 = (function (name,opts,cb){
return cljs.js.require.call(null,null,name,opts,cb);
});

cljs.js.require.cljs$core$IFn$_invoke$arity$4 = (function (bound_vars,name,opts,cb){
return cljs.js.require.call(null,bound_vars,name,null,opts,cb);
});

cljs.js.require.cljs$core$IFn$_invoke$arity$5 = (function (bound_vars,name,reload,opts,cb){
var bound_vars__$1 = cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089),cljs.env.default_compiler_env.call(null),new cljs.core.Keyword(null,"*data-readers*","*data-readers*",-371480469),cljs.tagged_literals._STAR_cljs_data_readers_STAR_,new cljs.core.Keyword(null,"*load-macros*","*load-macros*",640729006),new cljs.core.Keyword(null,"load-macros","load-macros",459797395).cljs$core$IFn$_invoke$arity$2(opts,true),new cljs.core.Keyword(null,"*analyze-deps*","*analyze-deps*",-29540427),new cljs.core.Keyword(null,"analyze-deps","analyze-deps",1000677285).cljs$core$IFn$_invoke$arity$2(opts,true),new cljs.core.Keyword(null,"*load-fn*","*load-fn*",2055642106),(function (){var or__8674__auto__ = new cljs.core.Keyword(null,"load","load",-1318641184).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return cljs.js._STAR_load_fn_STAR_;
}
})(),new cljs.core.Keyword(null,"*eval-fn*","*eval-fn*",-217221128),(function (){var or__8674__auto__ = new cljs.core.Keyword(null,"eval","eval",-1103567905).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return cljs.js._STAR_eval_fn_STAR_;
}
})()], null),bound_vars);
var aname = (function (){var G__14961 = name;
if(cljs.core.truth_(new cljs.core.Keyword(null,"macros-ns","macros-ns",1626844933).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.analyzer.macro_ns_name.call(null,G__14961);
} else {
return G__14961;
}
})();
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"reload","reload",863702807),reload)){
cljs.core.swap_BANG_.call(null,cljs.js._STAR_loaded_STAR_,cljs.core.disj,aname);
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"reload-all","reload-all",761570200),reload)){
cljs.core.reset_BANG_.call(null,cljs.js._STAR_loaded_STAR_,cljs.core.PersistentHashSet.EMPTY);
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.debug_prn.call(null,["Loading ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),cljs.core.str.cljs$core$IFn$_invoke$arity$1((cljs.core.truth_(new cljs.core.Keyword(null,"macros-ns","macros-ns",1626844933).cljs$core$IFn$_invoke$arity$1(opts))?" macros":null))," namespace"].join(''));
} else {
}

if(!(cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,cljs.js._STAR_loaded_STAR_),aname))){
var env = new cljs.core.Keyword(null,"*env*","*env*",1860548436).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);
try{return new cljs.core.Keyword(null,"*load-fn*","*load-fn*",2055642106).cljs$core$IFn$_invoke$arity$1(bound_vars__$1).call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),name,new cljs.core.Keyword(null,"macros","macros",811339431),new cljs.core.Keyword(null,"macros-ns","macros-ns",1626844933).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"path","path",-188191168),cljs.js.ns__GT_relpath.call(null,name)], null),((function (env,bound_vars__$1,aname){
return (function (resource){
if((cljs.core.map_QMARK_.call(null,resource)) || ((resource == null))){
} else {
throw (new Error(["Assert failed: ","*load-fn* may only return a map or nil","\n","(or (map? resource) (nil? resource))"].join('')));
}

if(cljs.core.truth_(resource)){
var map__14963 = resource;
var map__14963__$1 = ((((!((map__14963 == null)))?((((map__14963.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14963.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14963):map__14963);
var lang = cljs.core.get.call(null,map__14963__$1,new cljs.core.Keyword(null,"lang","lang",-1819677104));
var source = cljs.core.get.call(null,map__14963__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var cache = cljs.core.get.call(null,map__14963__$1,new cljs.core.Keyword(null,"cache","cache",-1237023054));
var source_map = cljs.core.get.call(null,map__14963__$1,new cljs.core.Keyword(null,"source-map","source-map",1706252311));
var file = cljs.core.get.call(null,map__14963__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var pred__14965 = cljs.core.keyword_identical_QMARK_;
var expr__14966 = lang;
if(cljs.core.truth_(pred__14965.call(null,new cljs.core.Keyword(null,"clj","clj",-660495428),expr__14966))){
cljs.js.pre_file_side_effects.call(null,new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars__$1),aname,file,opts);

return cljs.js.eval_str_STAR_.call(null,bound_vars__$1,source,name,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"cljs-file","cljs-file",-1499001049),file),((function (pred__14965,expr__14966,map__14963,map__14963__$1,lang,source,cache,source_map,file,env,bound_vars__$1,aname){
return (function (res){
cljs.js.post_file_side_effects.call(null,file,opts);

if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res))){
return cb.call(null,res);
} else {
cljs.core.swap_BANG_.call(null,cljs.js._STAR_loaded_STAR_,cljs.core.conj,aname);

return cb.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),true], null));
}
});})(pred__14965,expr__14966,map__14963,map__14963__$1,lang,source,cache,source_map,file,env,bound_vars__$1,aname))
);
} else {
if(cljs.core.truth_(pred__14965.call(null,new cljs.core.Keyword(null,"js","js",1768080579),expr__14966))){
return cljs.js.process_macros_deps.call(null,bound_vars__$1,cache,opts,((function (pred__14965,expr__14966,map__14963,map__14963__$1,lang,source,cache,source_map,file,env,bound_vars__$1,aname){
return (function (res){
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res))){
return cb.call(null,res);
} else {
return cljs.js.process_libs_deps.call(null,bound_vars__$1,cache,opts,((function (pred__14965,expr__14966,map__14963,map__14963__$1,lang,source,cache,source_map,file,env,bound_vars__$1,aname){
return (function (res__$1){
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$1))){
return cb.call(null,res__$1);
} else {
var res__$2 = (function (){try{new cljs.core.Keyword(null,"*eval-fn*","*eval-fn*",-217221128).cljs$core$IFn$_invoke$arity$1(bound_vars__$1).call(null,resource);

if(cljs.core.truth_(cache)){
cljs.js.load_analysis_cache_BANG_.call(null,new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars__$1),aname,cache);

cljs.analyzer.register_specs.call(null,cache);
} else {
}

if(cljs.core.truth_(source_map)){
return cljs.js.load_source_map_BANG_.call(null,new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars__$1),aname,source_map);
} else {
return null;
}
}catch (e14968){var cause = e14968;
return cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,env,["Could not require ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''),cause));
}})();
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$2))){
return cb.call(null,res__$2);
} else {
cljs.core.swap_BANG_.call(null,cljs.js._STAR_loaded_STAR_,cljs.core.conj,aname);

return cb.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),true], null));
}
}
});})(pred__14965,expr__14966,map__14963,map__14963__$1,lang,source,cache,source_map,file,env,bound_vars__$1,aname))
);
}
});})(pred__14965,expr__14966,map__14963,map__14963__$1,lang,source,cache,source_map,file,env,bound_vars__$1,aname))
);
} else {
return cb.call(null,cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,env,["Invalid :lang specified ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(lang),", only :clj or :js allowed"].join(''))));
}
}
} else {
return cb.call(null,cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,env,cljs.analyzer.error_message.call(null,(cljs.core.truth_(new cljs.core.Keyword(null,"macros-ns","macros-ns",1626844933).cljs$core$IFn$_invoke$arity$1(opts))?new cljs.core.Keyword(null,"undeclared-macros-ns","undeclared-macros-ns",-438029430):new cljs.core.Keyword(null,"undeclared-ns","undeclared-ns",-1589012812)),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ns-sym","ns-sym",-1696101605),name,new cljs.core.Keyword(null,"js-provide","js-provide",1052912493),cljs.core.name.call(null,name)], null)))));
}
});})(env,bound_vars__$1,aname))
);
}catch (e14962){var cause = e14962;
return cb.call(null,cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,env,["Could not require ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''),cause)));
}} else {
return cb.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),true], null));
}
});

cljs.js.require.cljs$lang$maxFixedArity = 5;

cljs.js.patch_alias_map = (function cljs$js$patch_alias_map(compiler,in$,from,to){
var patch = (function (k,add_if_present_QMARK_){
return cljs.core.swap_BANG_.call(null,compiler,cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),in$,k], null),(function (m){
var replaced = clojure.walk.postwalk_replace.call(null,cljs.core.PersistentArrayMap.createAsIfByAssoc([from,to]),m);
if(cljs.core.truth_((function (){var and__8662__auto__ = add_if_present_QMARK_;
if(cljs.core.truth_(and__8662__auto__)){
return cljs.core.some.call(null,cljs.core.PersistentHashSet.createAsIfByAssoc([to]),cljs.core.vals.call(null,replaced));
} else {
return and__8662__auto__;
}
})())){
return cljs.core.assoc.call(null,replaced,from,to);
} else {
return replaced;
}
}));
});
var patch_renames = ((function (patch){
return (function (k){
return cljs.core.swap_BANG_.call(null,compiler,cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),in$,k], null),((function (patch){
return (function (m){
if(cljs.core.truth_(m)){
return cljs.core.reduce.call(null,((function (patch){
return (function (acc,p__14970){
var vec__14971 = p__14970;
var renamed = cljs.core.nth.call(null,vec__14971,(0),null);
var qualified_sym = cljs.core.nth.call(null,vec__14971,(1),null);
var entry = vec__14971;
if(cljs.core._EQ_.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(from)].join(''),cljs.core.namespace.call(null,qualified_sym))){
return cljs.core.assoc.call(null,acc,renamed,cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(to)].join(''),cljs.core.name.call(null,qualified_sym)));
} else {
return cljs.core.merge.call(null,acc,entry);
}
});})(patch))
,cljs.core.PersistentArrayMap.EMPTY,m);
} else {
return null;
}
});})(patch))
);
});})(patch))
;
patch.call(null,new cljs.core.Keyword(null,"requires","requires",-1201390927),true);

patch.call(null,new cljs.core.Keyword(null,"require-macros","require-macros",707947416),true);

patch.call(null,new cljs.core.Keyword(null,"uses","uses",232664692),false);

patch.call(null,new cljs.core.Keyword(null,"use-macros","use-macros",-905638393),false);

patch_renames.call(null,new cljs.core.Keyword(null,"renames","renames",343278368));

return patch_renames.call(null,new cljs.core.Keyword(null,"rename-macros","rename-macros",1076432512));
});
cljs.js.self_require_QMARK_ = (function cljs$js$self_require_QMARK_(deps,opts){
var and__8662__auto__ = new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(opts) === true;
if(and__8662__auto__){
return cljs.core.some.call(null,cljs.core.PersistentHashSet.createAsIfByAssoc([cljs.analyzer._STAR_cljs_ns_STAR_]),deps);
} else {
return and__8662__auto__;
}
});
cljs.js.load_deps = (function cljs$js$load_deps(var_args){
var G__14976 = arguments.length;
switch (G__14976) {
case 5:
return cljs.js.load_deps.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 7:
return cljs.js.load_deps.cljs$core$IFn$_invoke$arity$7((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]),(arguments[(6)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.js.load_deps.cljs$core$IFn$_invoke$arity$5 = (function (bound_vars,ana_env,lib,deps,cb){
return cljs.js.load_deps.call(null,bound_vars,ana_env,lib,deps,null,null,cb);
});

cljs.js.load_deps.cljs$core$IFn$_invoke$arity$7 = (function (bound_vars,ana_env,lib,deps,reload,opts,cb){
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.debug_prn.call(null,"Loading dependencies for",lib);
} else {
}

var _STAR_cljs_dep_set_STAR_14977 = cljs.analyzer._STAR_cljs_dep_set_STAR_;
cljs.analyzer._STAR_cljs_dep_set_STAR_ = (function (){var lib__$1 = (cljs.core.truth_(cljs.js.self_require_QMARK_.call(null,deps,opts))?new cljs.core.Symbol(null,"cljs.user","cljs.user",877795071,null):lib);
return cljs.core.vary_meta.call(null,cljs.core.conj.call(null,new cljs.core.Keyword(null,"*cljs-dep-set*","*cljs-dep-set*",-73964612).cljs$core$IFn$_invoke$arity$1(bound_vars),lib__$1),cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dep-path","dep-path",723826558)], null),cljs.core.conj,lib__$1);
})();

try{var bound_vars__$1 = cljs.core.assoc.call(null,bound_vars,new cljs.core.Keyword(null,"*cljs-dep-set*","*cljs-dep-set*",-73964612),cljs.analyzer._STAR_cljs_dep_set_STAR_);
if(!(cljs.core.every_QMARK_.call(null,((function (bound_vars__$1,_STAR_cljs_dep_set_STAR_14977){
return (function (p1__14974_SHARP_){
return !(cljs.core.contains_QMARK_.call(null,cljs.analyzer._STAR_cljs_dep_set_STAR_,p1__14974_SHARP_));
});})(bound_vars__$1,_STAR_cljs_dep_set_STAR_14977))
,deps))){
return cb.call(null,cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,ana_env,["Circular dependency detected ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.call(null,cljs.core.str,cljs.core.interpose.call(null," -> ",cljs.core.conj.call(null,new cljs.core.Keyword(null,"dep-path","dep-path",723826558).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,cljs.analyzer._STAR_cljs_dep_set_STAR_)),cljs.core.some.call(null,cljs.analyzer._STAR_cljs_dep_set_STAR_,deps)))))].join(''))));
} else {
if(cljs.core.seq.call(null,deps)){
var dep = cljs.core.first.call(null,deps);
var opts_SINGLEQUOTE_ = cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"context","context",-830191113)),new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320)),new cljs.core.Keyword(null,"ns","ns",441598760));
return cljs.js.require.call(null,bound_vars__$1,dep,reload,opts_SINGLEQUOTE_,((function (dep,opts_SINGLEQUOTE_,bound_vars__$1,_STAR_cljs_dep_set_STAR_14977){
return (function (res){
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.debug_prn.call(null,"Loading result:",res);
} else {
}

if(cljs.core.not.call(null,new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res))){
return cljs.js.load_deps.call(null,bound_vars__$1,ana_env,lib,cljs.core.next.call(null,deps),null,opts,cb);
} else {
var temp__5455__auto__ = (function (){var cljs_ns = cljs.analyzer.clj_ns__GT_cljs_ns.call(null,dep);
return cljs.core.get.call(null,cljs.core.PersistentArrayMap.createAsIfByAssoc([dep,null]),cljs_ns,cljs_ns);
})();
if(cljs.core.truth_(temp__5455__auto__)){
var cljs_dep = temp__5455__auto__;
return cljs.js.require.call(null,bound_vars__$1,cljs_dep,opts_SINGLEQUOTE_,((function (cljs_dep,temp__5455__auto__,dep,opts_SINGLEQUOTE_,bound_vars__$1,_STAR_cljs_dep_set_STAR_14977){
return (function (res__$1){
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$1))){
return cb.call(null,res__$1);
} else {
cljs.js.patch_alias_map.call(null,new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars__$1),lib,dep,cljs_dep);

return cljs.js.load_deps.call(null,bound_vars__$1,ana_env,lib,cljs.core.next.call(null,deps),null,opts,((function (cljs_dep,temp__5455__auto__,dep,opts_SINGLEQUOTE_,bound_vars__$1,_STAR_cljs_dep_set_STAR_14977){
return (function (res__$2){
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$2))){
return cb.call(null,res__$2);
} else {
return cb.call(null,cljs.core.update.call(null,res__$2,new cljs.core.Keyword(null,"aliased-loads","aliased-loads",220995766),cljs.core.assoc,dep,cljs_dep));
}
});})(cljs_dep,temp__5455__auto__,dep,opts_SINGLEQUOTE_,bound_vars__$1,_STAR_cljs_dep_set_STAR_14977))
);
}
});})(cljs_dep,temp__5455__auto__,dep,opts_SINGLEQUOTE_,bound_vars__$1,_STAR_cljs_dep_set_STAR_14977))
);
} else {
return cb.call(null,res);
}
}
});})(dep,opts_SINGLEQUOTE_,bound_vars__$1,_STAR_cljs_dep_set_STAR_14977))
);
} else {
return cb.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),null], null));
}
}
}finally {cljs.analyzer._STAR_cljs_dep_set_STAR_ = _STAR_cljs_dep_set_STAR_14977;
}});

cljs.js.load_deps.cljs$lang$maxFixedArity = 7;

cljs.js.analyze_deps = (function cljs$js$analyze_deps(var_args){
var G__14981 = arguments.length;
switch (G__14981) {
case 5:
return cljs.js.analyze_deps.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.js.analyze_deps.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.js.analyze_deps.cljs$core$IFn$_invoke$arity$5 = (function (bound_vars,ana_env,lib,deps,cb){
return cljs.js.analyze_deps.call(null,bound_vars,ana_env,lib,deps,null,cb);
});

cljs.js.analyze_deps.cljs$core$IFn$_invoke$arity$6 = (function (bound_vars,ana_env,lib,deps,opts,cb){
var _STAR_cljs_dep_set_STAR_14982 = cljs.analyzer._STAR_cljs_dep_set_STAR_;
cljs.analyzer._STAR_cljs_dep_set_STAR_ = cljs.core.vary_meta.call(null,cljs.core.conj.call(null,new cljs.core.Keyword(null,"*cljs-dep-set*","*cljs-dep-set*",-73964612).cljs$core$IFn$_invoke$arity$1(bound_vars),lib),cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"dep-path","dep-path",723826558)], null),cljs.core.conj,lib);

try{var compiler = cljs.core.deref.call(null,new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars));
var bound_vars__$1 = cljs.core.assoc.call(null,bound_vars,new cljs.core.Keyword(null,"*cljs-dep-set*","*cljs-dep-set*",-73964612),cljs.analyzer._STAR_cljs_dep_set_STAR_);
if(!(cljs.core.every_QMARK_.call(null,((function (compiler,bound_vars__$1,_STAR_cljs_dep_set_STAR_14982){
return (function (p1__14979_SHARP_){
return !(cljs.core.contains_QMARK_.call(null,cljs.analyzer._STAR_cljs_dep_set_STAR_,p1__14979_SHARP_));
});})(compiler,bound_vars__$1,_STAR_cljs_dep_set_STAR_14982))
,deps))){
return cb.call(null,cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,ana_env,["Circular dependency detected ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.apply.call(null,cljs.core.str,cljs.core.interpose.call(null," -> ",cljs.core.conj.call(null,new cljs.core.Keyword(null,"dep-path","dep-path",723826558).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,cljs.analyzer._STAR_cljs_dep_set_STAR_)),cljs.core.some.call(null,cljs.analyzer._STAR_cljs_dep_set_STAR_,deps)))))].join(''))));
} else {
if(cljs.core.seq.call(null,deps)){
var dep = cljs.core.first.call(null,deps);
try{return new cljs.core.Keyword(null,"*load-fn*","*load-fn*",2055642106).cljs$core$IFn$_invoke$arity$1(bound_vars__$1).call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),dep,new cljs.core.Keyword(null,"path","path",-188191168),cljs.js.ns__GT_relpath.call(null,dep)], null),((function (dep,compiler,bound_vars__$1,_STAR_cljs_dep_set_STAR_14982){
return (function (resource){
if((cljs.core.map_QMARK_.call(null,resource)) || ((resource == null))){
} else {
throw (new Error(["Assert failed: ","*load-fn* may only return a map or nil","\n","(or (map? resource) (nil? resource))"].join('')));
}

if(cljs.core.not.call(null,resource)){
var temp__5455__auto__ = (function (){var cljs_ns = cljs.analyzer.clj_ns__GT_cljs_ns.call(null,dep);
return cljs.core.get.call(null,cljs.core.PersistentArrayMap.createAsIfByAssoc([dep,null]),cljs_ns,cljs_ns);
})();
if(cljs.core.truth_(temp__5455__auto__)){
var cljs_dep = temp__5455__auto__;
cljs.js.patch_alias_map.call(null,new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars__$1),lib,dep,cljs_dep);

return cljs.js.analyze_deps.call(null,bound_vars__$1,ana_env,lib,cljs.core.cons.call(null,cljs_dep,cljs.core.next.call(null,deps)),opts,((function (cljs_dep,temp__5455__auto__,dep,compiler,bound_vars__$1,_STAR_cljs_dep_set_STAR_14982){
return (function (res){
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res))){
return cb.call(null,res);
} else {
return cb.call(null,cljs.core.update.call(null,res,new cljs.core.Keyword(null,"aliased-loads","aliased-loads",220995766),cljs.core.assoc,dep,cljs_dep));
}
});})(cljs_dep,temp__5455__auto__,dep,compiler,bound_vars__$1,_STAR_cljs_dep_set_STAR_14982))
);
} else {
return cb.call(null,cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,ana_env,cljs.analyzer.error_message.call(null,new cljs.core.Keyword(null,"undeclared-ns","undeclared-ns",-1589012812),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ns-sym","ns-sym",-1696101605),dep,new cljs.core.Keyword(null,"js-provide","js-provide",1052912493),cljs.core.name.call(null,dep)], null)))));
}
} else {
var map__14984 = resource;
var map__14984__$1 = ((((!((map__14984 == null)))?((((map__14984.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14984.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14984):map__14984);
var name = cljs.core.get.call(null,map__14984__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var lang = cljs.core.get.call(null,map__14984__$1,new cljs.core.Keyword(null,"lang","lang",-1819677104));
var source = cljs.core.get.call(null,map__14984__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var file = cljs.core.get.call(null,map__14984__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var pred__14986 = cljs.core.keyword_identical_QMARK_;
var expr__14987 = lang;
if(cljs.core.truth_(pred__14986.call(null,new cljs.core.Keyword(null,"clj","clj",-660495428),expr__14987))){
cljs.js.pre_file_side_effects.call(null,new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars__$1),name,file,opts);

return cljs.js.analyze_str_STAR_.call(null,bound_vars__$1,source,name,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"cljs-file","cljs-file",-1499001049),file),((function (pred__14986,expr__14987,map__14984,map__14984__$1,name,lang,source,file,dep,compiler,bound_vars__$1,_STAR_cljs_dep_set_STAR_14982){
return (function (res){
cljs.js.post_file_side_effects.call(null,file,opts);

if(cljs.core.not.call(null,new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res))){
return cljs.js.analyze_deps.call(null,bound_vars__$1,ana_env,lib,cljs.core.next.call(null,deps),opts,cb);
} else {
return cb.call(null,res);
}
});})(pred__14986,expr__14987,map__14984,map__14984__$1,name,lang,source,file,dep,compiler,bound_vars__$1,_STAR_cljs_dep_set_STAR_14982))
);
} else {
if(cljs.core.truth_(pred__14986.call(null,new cljs.core.Keyword(null,"js","js",1768080579),expr__14987))){
return cljs.js.analyze_deps.call(null,bound_vars__$1,ana_env,lib,cljs.core.next.call(null,deps),opts,cb);
} else {
return cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,ana_env,["Invalid :lang specified ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(lang),", only :clj or :js allowed"].join('')));
}
}
}
});})(dep,compiler,bound_vars__$1,_STAR_cljs_dep_set_STAR_14982))
);
}catch (e14983){var cause = e14983;
return cb.call(null,cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,ana_env,["Could not analyze dep ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(dep)].join(''),cause)));
}} else {
return cb.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),null], null));
}
}
}finally {cljs.analyzer._STAR_cljs_dep_set_STAR_ = _STAR_cljs_dep_set_STAR_14982;
}});

cljs.js.analyze_deps.cljs$lang$maxFixedArity = 6;

cljs.js.load_macros = (function cljs$js$load_macros(bound_vars,k,macros,lib,reload,reloads,opts,cb){
if(cljs.core.seq.call(null,macros)){
var nsym = cljs.core.first.call(null,cljs.core.vals.call(null,macros));
var k__$1 = (function (){var or__8674__auto__ = reload.call(null,k);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
var or__8674__auto____$1 = cljs.core.get_in.call(null,reloads,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,nsym], null));
if(cljs.core.truth_(or__8674__auto____$1)){
return or__8674__auto____$1;
} else {
var or__8674__auto____$2 = (function (){var and__8662__auto__ = cljs.core._EQ_.call(null,nsym,cljs.core.name);
if(and__8662__auto__){
var and__8662__auto____$1 = new cljs.core.Keyword(null,"*reload-macros*","*reload-macros*",-820635806).cljs$core$IFn$_invoke$arity$1(bound_vars);
if(cljs.core.truth_(and__8662__auto____$1)){
return new cljs.core.Keyword(null,"reload","reload",863702807);
} else {
return and__8662__auto____$1;
}
} else {
return and__8662__auto__;
}
})();
if(cljs.core.truth_(or__8674__auto____$2)){
return or__8674__auto____$2;
} else {
return null;
}
}
}
})();
var opts_SINGLEQUOTE_ = cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"macros-ns","macros-ns",1626844933),true),new cljs.core.Keyword(null,"context","context",-830191113)),new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320)),new cljs.core.Keyword(null,"ns","ns",441598760)),new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410),new cljs.core.Keyword(null,"optimize-constants","optimize-constants",232704518));
return cljs.js.require.call(null,bound_vars,nsym,k__$1,opts_SINGLEQUOTE_,((function (nsym,k__$1,opts_SINGLEQUOTE_){
return (function (res){
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res))){
return cljs.js.load_macros.call(null,bound_vars,k__$1,cljs.core.next.call(null,macros),lib,reload,reloads,opts,cb);
} else {
var temp__5455__auto__ = (function (){var cljs_ns = cljs.analyzer.clj_ns__GT_cljs_ns.call(null,nsym);
return cljs.core.get.call(null,cljs.core.PersistentArrayMap.createAsIfByAssoc([nsym,null]),cljs_ns,cljs_ns);
})();
if(cljs.core.truth_(temp__5455__auto__)){
var cljs_dep = temp__5455__auto__;
return cljs.js.require.call(null,bound_vars,cljs_dep,k__$1,opts_SINGLEQUOTE_,((function (cljs_dep,temp__5455__auto__,nsym,k__$1,opts_SINGLEQUOTE_){
return (function (res__$1){
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$1))){
return cb.call(null,res__$1);
} else {
cljs.js.patch_alias_map.call(null,new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars),lib,nsym,cljs_dep);

return cljs.js.load_macros.call(null,bound_vars,k__$1,cljs.core.next.call(null,macros),lib,reload,reloads,opts,((function (cljs_dep,temp__5455__auto__,nsym,k__$1,opts_SINGLEQUOTE_){
return (function (res__$2){
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$2))){
return cb.call(null,res__$2);
} else {
return cb.call(null,cljs.core.update.call(null,res__$2,new cljs.core.Keyword(null,"aliased-loads","aliased-loads",220995766),cljs.core.assoc,nsym,cljs_dep));
}
});})(cljs_dep,temp__5455__auto__,nsym,k__$1,opts_SINGLEQUOTE_))
);
}
});})(cljs_dep,temp__5455__auto__,nsym,k__$1,opts_SINGLEQUOTE_))
);
} else {
return cb.call(null,res);
}
}
});})(nsym,k__$1,opts_SINGLEQUOTE_))
);
} else {
return cb.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),null], null));
}
});
cljs.js.rewrite_ns_ast = (function cljs$js$rewrite_ns_ast(var_args){
var G__14993 = arguments.length;
switch (G__14993) {
case 2:
return cljs.js.rewrite_ns_ast.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.js.rewrite_ns_ast.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.js.rewrite_ns_ast.cljs$core$IFn$_invoke$arity$2 = (function (ast,smap){
return cljs.js.rewrite_ns_ast.call(null,ast,smap,false);
});

cljs.js.rewrite_ns_ast.cljs$core$IFn$_invoke$arity$3 = (function (ast,smap,macros_QMARK_){
var vec__14994 = (cljs.core.truth_(macros_QMARK_)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"use-macros","use-macros",-905638393),new cljs.core.Keyword(null,"require-macros","require-macros",707947416),new cljs.core.Keyword(null,"rename-macros","rename-macros",1076432512)], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"uses","uses",232664692),new cljs.core.Keyword(null,"requires","requires",-1201390927),new cljs.core.Keyword(null,"renames","renames",343278368)], null));
var uk = cljs.core.nth.call(null,vec__14994,(0),null);
var rk = cljs.core.nth.call(null,vec__14994,(1),null);
var renk = cljs.core.nth.call(null,vec__14994,(2),null);
var rewrite_renames = ((function (vec__14994,uk,rk,renk){
return (function (m){
if(cljs.core.truth_(m)){
return cljs.core.reduce.call(null,((function (vec__14994,uk,rk,renk){
return (function (acc,p__14997){
var vec__14998 = p__14997;
var renamed = cljs.core.nth.call(null,vec__14998,(0),null);
var qualified_sym = cljs.core.nth.call(null,vec__14998,(1),null);
var entry = vec__14998;
var from = cljs.core.symbol.call(null,cljs.core.namespace.call(null,qualified_sym));
var to = cljs.core.get.call(null,smap,from);
if(!((to == null))){
return cljs.core.assoc.call(null,acc,renamed,cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(to)].join(''),cljs.core.name.call(null,qualified_sym)));
} else {
return cljs.core.merge.call(null,acc,entry);
}
});})(vec__14994,uk,rk,renk))
,cljs.core.PersistentArrayMap.EMPTY,m);
} else {
return null;
}
});})(vec__14994,uk,rk,renk))
;
var rewrite_deps = ((function (vec__14994,uk,rk,renk,rewrite_renames){
return (function (deps){
return cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,cljs.core.map.call(null,((function (vec__14994,uk,rk,renk,rewrite_renames){
return (function (dep){
var temp__5455__auto__ = cljs.core.get.call(null,smap,dep);
if(cljs.core.truth_(temp__5455__auto__)){
var new_dep = temp__5455__auto__;
return new_dep;
} else {
return dep;
}
});})(vec__14994,uk,rk,renk,rewrite_renames))
),deps);
});})(vec__14994,uk,rk,renk,rewrite_renames))
;
return cljs.core.update.call(null,cljs.core.update.call(null,cljs.core.update.call(null,cljs.core.update.call(null,ast,uk,((function (vec__14994,uk,rk,renk,rewrite_renames,rewrite_deps){
return (function (p1__14990_SHARP_){
return clojure.walk.postwalk_replace.call(null,smap,p1__14990_SHARP_);
});})(vec__14994,uk,rk,renk,rewrite_renames,rewrite_deps))
),rk,((function (vec__14994,uk,rk,renk,rewrite_renames,rewrite_deps){
return (function (p1__14991_SHARP_){
return cljs.core.merge.call(null,smap,clojure.walk.postwalk_replace.call(null,smap,p1__14991_SHARP_));
});})(vec__14994,uk,rk,renk,rewrite_renames,rewrite_deps))
),renk,rewrite_renames),new cljs.core.Keyword(null,"deps","deps",1883360319),rewrite_deps);
});

cljs.js.rewrite_ns_ast.cljs$lang$maxFixedArity = 3;

cljs.js.check_macro_autoload_inferring_missing = (function cljs$js$check_macro_autoload_inferring_missing(p__15002,cenv){
var map__15003 = p__15002;
var map__15003__$1 = ((((!((map__15003 == null)))?((((map__15003.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15003.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15003):map__15003);
var ast = map__15003__$1;
var requires = cljs.core.get.call(null,map__15003__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var name = cljs.core.get.call(null,map__15003__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var namespaces = new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cenv));
var missing_require_macros = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.call(null,((function (namespaces,map__15003,map__15003__$1,ast,requires,name){
return (function (p__15005){
var vec__15006 = p__15005;
var _ = cljs.core.nth.call(null,vec__15006,(0),null);
var full_ns = cljs.core.nth.call(null,vec__15006,(1),null);
var map__15009 = cljs.core.get.call(null,namespaces,full_ns);
var map__15009__$1 = ((((!((map__15009 == null)))?((((map__15009.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15009.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15009):map__15009);
var use_macros = cljs.core.get.call(null,map__15009__$1,new cljs.core.Keyword(null,"use-macros","use-macros",-905638393));
var require_macros = cljs.core.get.call(null,map__15009__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var or__8674__auto__ = cljs.core.some.call(null,cljs.core.PersistentHashSet.createAsIfByAssoc([full_ns]),cljs.core.vals.call(null,use_macros));
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return cljs.core.some.call(null,cljs.core.PersistentHashSet.createAsIfByAssoc([full_ns]),cljs.core.vals.call(null,require_macros));
}
});})(namespaces,map__15003,map__15003__$1,ast,requires,name))
),requires);
var ast_SINGLEQUOTE_ = cljs.core.update_in.call(null,ast,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"require-macros","require-macros",707947416)], null),cljs.core.merge,missing_require_macros);
cljs.core.swap_BANG_.call(null,cenv,cljs.core.update_in,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),name,new cljs.core.Keyword(null,"require-macros","require-macros",707947416)], null),cljs.core.merge,missing_require_macros);

return ast_SINGLEQUOTE_;
});
cljs.js.ns_side_effects = (function cljs$js$ns_side_effects(var_args){
var G__15014 = arguments.length;
switch (G__15014) {
case 5:
return cljs.js.ns_side_effects.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.js.ns_side_effects.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.js.ns_side_effects.cljs$core$IFn$_invoke$arity$5 = (function (bound_vars,ana_env,ast,opts,cb){
return cljs.js.ns_side_effects.call(null,false,bound_vars,ana_env,ast,opts,cb);
});

cljs.js.ns_side_effects.cljs$core$IFn$_invoke$arity$6 = (function (load,bound_vars,ana_env,p__15015,opts,cb){
var map__15016 = p__15015;
var map__15016__$1 = ((((!((map__15016 == null)))?((((map__15016.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15016.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15016):map__15016);
var ast = map__15016__$1;
var op = cljs.core.get.call(null,map__15016__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.debug_prn.call(null,"Namespace side effects for",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ast));
} else {
}

if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ns*","ns*",200417856),null,new cljs.core.Keyword(null,"ns","ns",441598760),null], null), null).call(null,op))){
var check_uses_and_load_macros = ((function (map__15016,map__15016__$1,ast,op){
return (function cljs$js$check_uses_and_load_macros(res,rewritten_ast){
var env = new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars);
var map__15031 = rewritten_ast;
var map__15031__$1 = ((((!((map__15031 == null)))?((((map__15031.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15031.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15031):map__15031);
var uses = cljs.core.get.call(null,map__15031__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var use_macros = cljs.core.get.call(null,map__15031__$1,new cljs.core.Keyword(null,"use-macros","use-macros",-905638393));
var reload = cljs.core.get.call(null,map__15031__$1,new cljs.core.Keyword(null,"reload","reload",863702807));
var reloads = cljs.core.get.call(null,map__15031__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var name = cljs.core.get.call(null,map__15031__$1,new cljs.core.Keyword(null,"name","name",1843675177));
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res))){
return cb.call(null,res);
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"*load-macros*","*load-macros*",640729006).cljs$core$IFn$_invoke$arity$1(bound_vars))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.debug_prn.call(null,"Processing :use-macros for",name);
} else {
}

return cljs.js.load_macros.call(null,bound_vars,new cljs.core.Keyword(null,"use-macros","use-macros",-905638393),use_macros,name,reload,reloads,opts,((function (env,map__15031,map__15031__$1,uses,use_macros,reload,reloads,name,map__15016,map__15016__$1,ast,op){
return (function (res__$1){
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$1))){
return cb.call(null,res__$1);
} else {
var map__15033 = cljs.js.rewrite_ns_ast.call(null,rewritten_ast,new cljs.core.Keyword(null,"aliased-loads","aliased-loads",220995766).cljs$core$IFn$_invoke$arity$1(res__$1),true);
var map__15033__$1 = ((((!((map__15033 == null)))?((((map__15033.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15033.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15033):map__15033);
var rewritten_ast__$1 = map__15033__$1;
var require_macros = cljs.core.get.call(null,map__15033__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.debug_prn.call(null,"Processing :require-macros for",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ast));
} else {
}

return cljs.js.load_macros.call(null,bound_vars,new cljs.core.Keyword(null,"require-macros","require-macros",707947416),require_macros,name,reload,reloads,opts,((function (map__15033,map__15033__$1,rewritten_ast__$1,require_macros,env,map__15031,map__15031__$1,uses,use_macros,reload,reloads,name,map__15016,map__15016__$1,ast,op){
return (function (res_SINGLEQUOTE_){
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res_SINGLEQUOTE_))){
return cb.call(null,res_SINGLEQUOTE_);
} else {
var map__15035 = cljs.js.rewrite_ns_ast.call(null,rewritten_ast__$1,new cljs.core.Keyword(null,"aliased-loads","aliased-loads",220995766).cljs$core$IFn$_invoke$arity$1(res__$1),true);
var map__15035__$1 = ((((!((map__15035 == null)))?((((map__15035.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15035.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15035):map__15035);
var rewritten_ast__$2 = map__15035__$1;
var use_macros__$1 = cljs.core.get.call(null,map__15035__$1,new cljs.core.Keyword(null,"use-macros","use-macros",-905638393));
var res_SINGLEQUOTE___$1 = (function (){try{if(cljs.core.seq.call(null,use_macros__$1)){
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.debug_prn.call(null,"Checking :use-macros for",new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ast));
} else {
}

var _STAR_analyze_deps_STAR_15038_15047 = cljs.analyzer._STAR_analyze_deps_STAR_;
var _STAR_compiler_STAR_15039_15048 = cljs.env._STAR_compiler_STAR_;
cljs.analyzer._STAR_analyze_deps_STAR_ = new cljs.core.Keyword(null,"*analyze-deps*","*analyze-deps*",-29540427).cljs$core$IFn$_invoke$arity$1(bound_vars);

cljs.env._STAR_compiler_STAR_ = new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars);

try{cljs.analyzer.check_use_macros.call(null,use_macros__$1,env);
}finally {cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_15039_15048;

cljs.analyzer._STAR_analyze_deps_STAR_ = _STAR_analyze_deps_STAR_15038_15047;
}} else {
}

return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),null], null);
}catch (e15037){var cause = e15037;
return cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,ana_env,["Could not parse ns form ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ast))].join(''),cause));
}})();
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res_SINGLEQUOTE___$1))){
return cb.call(null,res_SINGLEQUOTE___$1);
} else {
try{var _STAR_analyze_deps_STAR_15041 = cljs.analyzer._STAR_analyze_deps_STAR_;
var _STAR_compiler_STAR_15042 = cljs.env._STAR_compiler_STAR_;
cljs.analyzer._STAR_analyze_deps_STAR_ = new cljs.core.Keyword(null,"*analyze-deps*","*analyze-deps*",-29540427).cljs$core$IFn$_invoke$arity$1(bound_vars);

cljs.env._STAR_compiler_STAR_ = new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars);

try{var ast_SINGLEQUOTE_ = cljs.js.check_macro_autoload_inferring_missing.call(null,cljs.analyzer.check_rename_macros_inferring_missing.call(null,cljs.analyzer.check_use_macros_inferring_missing.call(null,rewritten_ast__$2,env),env),env);
return cb.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),ast_SINGLEQUOTE_], null));
}finally {cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_15042;

cljs.analyzer._STAR_analyze_deps_STAR_ = _STAR_analyze_deps_STAR_15041;
}}catch (e15040){var cause = e15040;
return cb.call(null,cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,ana_env,["Could not parse ns form ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ast))].join(''),cause)));
}}
}
});})(map__15033,map__15033__$1,rewritten_ast__$1,require_macros,env,map__15031,map__15031__$1,uses,use_macros,reload,reloads,name,map__15016,map__15016__$1,ast,op))
);
}
});})(env,map__15031,map__15031__$1,uses,use_macros,reload,reloads,name,map__15016,map__15016__$1,ast,op))
);
} else {
try{if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.debug_prn.call(null,"Checking uses");
} else {
}

cljs.analyzer.check_uses.call(null,(cljs.core.truth_((function (){var and__8662__auto__ = new cljs.core.Keyword(null,"*analyze-deps*","*analyze-deps*",-29540427).cljs$core$IFn$_invoke$arity$1(bound_vars);
if(cljs.core.truth_(and__8662__auto__)){
return cljs.core.seq.call(null,uses);
} else {
return and__8662__auto__;
}
})())?cljs.analyzer.missing_uses.call(null,uses,env):null),env);

return cb.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),ast], null));
}catch (e15043){var cause = e15043;
return cb.call(null,cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,ana_env,["Could not parse ns form ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ast))].join(''),cause)));
}}
}
});})(map__15016,map__15016__$1,ast,op))
;
if(cljs.core.truth_((function (){var and__8662__auto__ = load;
if(cljs.core.truth_(and__8662__auto__)){
return cljs.core.seq.call(null,new cljs.core.Keyword(null,"deps","deps",1883360319).cljs$core$IFn$_invoke$arity$1(ast));
} else {
return and__8662__auto__;
}
})())){
var map__15044 = ast;
var map__15044__$1 = ((((!((map__15044 == null)))?((((map__15044.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15044.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15044):map__15044);
var reload = cljs.core.get.call(null,map__15044__$1,new cljs.core.Keyword(null,"reload","reload",863702807));
var name = cljs.core.get.call(null,map__15044__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var deps = cljs.core.get.call(null,map__15044__$1,new cljs.core.Keyword(null,"deps","deps",1883360319));
return cljs.js.load_deps.call(null,bound_vars,ana_env,name,deps,(function (){var or__8674__auto__ = new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reload);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reload);
}
})(),cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"macros-ns","macros-ns",1626844933)),((function (map__15044,map__15044__$1,reload,name,deps,map__15016,map__15016__$1,ast,op){
return (function (p1__15011_SHARP_){
return check_uses_and_load_macros.call(null,p1__15011_SHARP_,cljs.js.rewrite_ns_ast.call(null,ast,new cljs.core.Keyword(null,"aliased-loads","aliased-loads",220995766).cljs$core$IFn$_invoke$arity$1(p1__15011_SHARP_)));
});})(map__15044,map__15044__$1,reload,name,deps,map__15016,map__15016__$1,ast,op))
);
} else {
if(cljs.core.truth_((function (){var and__8662__auto__ = cljs.core.not.call(null,load);
if(and__8662__auto__){
var and__8662__auto____$1 = new cljs.core.Keyword(null,"*analyze-deps*","*analyze-deps*",-29540427).cljs$core$IFn$_invoke$arity$1(bound_vars);
if(cljs.core.truth_(and__8662__auto____$1)){
return cljs.core.seq.call(null,new cljs.core.Keyword(null,"deps","deps",1883360319).cljs$core$IFn$_invoke$arity$1(ast));
} else {
return and__8662__auto____$1;
}
} else {
return and__8662__auto__;
}
})())){
return cljs.js.analyze_deps.call(null,bound_vars,ana_env,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ast),new cljs.core.Keyword(null,"deps","deps",1883360319).cljs$core$IFn$_invoke$arity$1(ast),cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"macros-ns","macros-ns",1626844933)),((function (map__15016,map__15016__$1,ast,op){
return (function (p1__15012_SHARP_){
return check_uses_and_load_macros.call(null,p1__15012_SHARP_,cljs.js.rewrite_ns_ast.call(null,ast,new cljs.core.Keyword(null,"aliased-loads","aliased-loads",220995766).cljs$core$IFn$_invoke$arity$1(p1__15012_SHARP_)));
});})(map__15016,map__15016__$1,ast,op))
);
} else {
return check_uses_and_load_macros.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),null], null),ast);

}
}
} else {
return cb.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),ast], null));
}
});

cljs.js.ns_side_effects.cljs$lang$maxFixedArity = 6;

cljs.js.node_side_effects = (function cljs$js$node_side_effects(bound_vars,sb,deps,ns_name,emit_nil_result_QMARK_){
var seq__15049_15057 = cljs.core.seq.call(null,deps);
var chunk__15050_15058 = null;
var count__15051_15059 = (0);
var i__15052_15060 = (0);
while(true){
if((i__15052_15060 < count__15051_15059)){
var dep_15061 = cljs.core._nth.call(null,chunk__15050_15058,i__15052_15060);
sb.append((function (){var sb__9801__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15053_15062 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15054_15063 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (seq__15049_15057,chunk__15050_15058,count__15051_15059,i__15052_15060,_STAR_print_newline_STAR_15053_15062,_STAR_print_fn_STAR_15054_15063,sb__9801__auto__,dep_15061){
return (function (x__9802__auto__){
return sb__9801__auto__.append(x__9802__auto__);
});})(seq__15049_15057,chunk__15050_15058,count__15051_15059,i__15052_15060,_STAR_print_newline_STAR_15053_15062,_STAR_print_fn_STAR_15054_15063,sb__9801__auto__,dep_15061))
;

try{cljs.compiler.emitln.call(null,cljs.core.munge.call(null,ns_name),".",cljs.analyzer.munge_node_lib.call(null,dep_15061)," = require('",dep_15061,"');");
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15054_15063;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15053_15062;
}
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__9801__auto__)].join('');
})());

var G__15064 = seq__15049_15057;
var G__15065 = chunk__15050_15058;
var G__15066 = count__15051_15059;
var G__15067 = (i__15052_15060 + (1));
seq__15049_15057 = G__15064;
chunk__15050_15058 = G__15065;
count__15051_15059 = G__15066;
i__15052_15060 = G__15067;
continue;
} else {
var temp__5457__auto___15068 = cljs.core.seq.call(null,seq__15049_15057);
if(temp__5457__auto___15068){
var seq__15049_15069__$1 = temp__5457__auto___15068;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15049_15069__$1)){
var c__9605__auto___15070 = cljs.core.chunk_first.call(null,seq__15049_15069__$1);
var G__15071 = cljs.core.chunk_rest.call(null,seq__15049_15069__$1);
var G__15072 = c__9605__auto___15070;
var G__15073 = cljs.core.count.call(null,c__9605__auto___15070);
var G__15074 = (0);
seq__15049_15057 = G__15071;
chunk__15050_15058 = G__15072;
count__15051_15059 = G__15073;
i__15052_15060 = G__15074;
continue;
} else {
var dep_15075 = cljs.core.first.call(null,seq__15049_15069__$1);
sb.append((function (){var sb__9801__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15055_15076 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15056_15077 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (seq__15049_15057,chunk__15050_15058,count__15051_15059,i__15052_15060,_STAR_print_newline_STAR_15055_15076,_STAR_print_fn_STAR_15056_15077,sb__9801__auto__,dep_15075,seq__15049_15069__$1,temp__5457__auto___15068){
return (function (x__9802__auto__){
return sb__9801__auto__.append(x__9802__auto__);
});})(seq__15049_15057,chunk__15050_15058,count__15051_15059,i__15052_15060,_STAR_print_newline_STAR_15055_15076,_STAR_print_fn_STAR_15056_15077,sb__9801__auto__,dep_15075,seq__15049_15069__$1,temp__5457__auto___15068))
;

try{cljs.compiler.emitln.call(null,cljs.core.munge.call(null,ns_name),".",cljs.analyzer.munge_node_lib.call(null,dep_15075)," = require('",dep_15075,"');");
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15056_15077;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15055_15076;
}
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__9801__auto__)].join('');
})());

var G__15078 = cljs.core.next.call(null,seq__15049_15069__$1);
var G__15079 = null;
var G__15080 = (0);
var G__15081 = (0);
seq__15049_15057 = G__15078;
chunk__15050_15058 = G__15079;
count__15051_15059 = G__15080;
i__15052_15060 = G__15081;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_((function (){var and__8662__auto__ = cljs.core.seq.call(null,deps);
if(and__8662__auto__){
return emit_nil_result_QMARK_;
} else {
return and__8662__auto__;
}
})())){
return sb.append("null;");
} else {
return null;
}
});
cljs.js.global_exports_side_effects = (function cljs$js$global_exports_side_effects(bound_vars,sb,deps,ns_name,emit_nil_result_QMARK_){
var map__15082 = cljs.core.deref.call(null,new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars));
var map__15082__$1 = ((((!((map__15082 == null)))?((((map__15082.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15082.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15082):map__15082);
var js_dependency_index = cljs.core.get.call(null,map__15082__$1,new cljs.core.Keyword(null,"js-dependency-index","js-dependency-index",-1887042131));
var seq__15084_15096 = cljs.core.seq.call(null,deps);
var chunk__15085_15097 = null;
var count__15086_15098 = (0);
var i__15087_15099 = (0);
while(true){
if((i__15087_15099 < count__15086_15098)){
var dep_15100 = cljs.core._nth.call(null,chunk__15085_15097,i__15087_15099);
var map__15088_15101 = cljs.core.get.call(null,js_dependency_index,cljs.core.name.call(null,dep_15100));
var map__15088_15102__$1 = ((((!((map__15088_15101 == null)))?((((map__15088_15101.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15088_15101.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15088_15101):map__15088_15101);
var global_exports_15103 = cljs.core.get.call(null,map__15088_15102__$1,new cljs.core.Keyword(null,"global-exports","global-exports",-1644865592));
sb.append((function (){var sb__9801__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15090_15104 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15091_15105 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (seq__15084_15096,chunk__15085_15097,count__15086_15098,i__15087_15099,_STAR_print_newline_STAR_15090_15104,_STAR_print_fn_STAR_15091_15105,sb__9801__auto__,map__15088_15101,map__15088_15102__$1,global_exports_15103,dep_15100,map__15082,map__15082__$1,js_dependency_index){
return (function (x__9802__auto__){
return sb__9801__auto__.append(x__9802__auto__);
});})(seq__15084_15096,chunk__15085_15097,count__15086_15098,i__15087_15099,_STAR_print_newline_STAR_15090_15104,_STAR_print_fn_STAR_15091_15105,sb__9801__auto__,map__15088_15101,map__15088_15102__$1,global_exports_15103,dep_15100,map__15082,map__15082__$1,js_dependency_index))
;

try{cljs.compiler.emitln.call(null,cljs.core.munge.call(null,ns_name),".",cljs.analyzer.munge_global_export.call(null,dep_15100)," = goog.global.",cljs.core.get.call(null,global_exports_15103,cljs.core.symbol.call(null,dep_15100)),";");
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15091_15105;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15090_15104;
}
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__9801__auto__)].join('');
})());

var G__15106 = seq__15084_15096;
var G__15107 = chunk__15085_15097;
var G__15108 = count__15086_15098;
var G__15109 = (i__15087_15099 + (1));
seq__15084_15096 = G__15106;
chunk__15085_15097 = G__15107;
count__15086_15098 = G__15108;
i__15087_15099 = G__15109;
continue;
} else {
var temp__5457__auto___15110 = cljs.core.seq.call(null,seq__15084_15096);
if(temp__5457__auto___15110){
var seq__15084_15111__$1 = temp__5457__auto___15110;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15084_15111__$1)){
var c__9605__auto___15112 = cljs.core.chunk_first.call(null,seq__15084_15111__$1);
var G__15113 = cljs.core.chunk_rest.call(null,seq__15084_15111__$1);
var G__15114 = c__9605__auto___15112;
var G__15115 = cljs.core.count.call(null,c__9605__auto___15112);
var G__15116 = (0);
seq__15084_15096 = G__15113;
chunk__15085_15097 = G__15114;
count__15086_15098 = G__15115;
i__15087_15099 = G__15116;
continue;
} else {
var dep_15117 = cljs.core.first.call(null,seq__15084_15111__$1);
var map__15092_15118 = cljs.core.get.call(null,js_dependency_index,cljs.core.name.call(null,dep_15117));
var map__15092_15119__$1 = ((((!((map__15092_15118 == null)))?((((map__15092_15118.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15092_15118.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15092_15118):map__15092_15118);
var global_exports_15120 = cljs.core.get.call(null,map__15092_15119__$1,new cljs.core.Keyword(null,"global-exports","global-exports",-1644865592));
sb.append((function (){var sb__9801__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15094_15121 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15095_15122 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (seq__15084_15096,chunk__15085_15097,count__15086_15098,i__15087_15099,_STAR_print_newline_STAR_15094_15121,_STAR_print_fn_STAR_15095_15122,sb__9801__auto__,map__15092_15118,map__15092_15119__$1,global_exports_15120,dep_15117,seq__15084_15111__$1,temp__5457__auto___15110,map__15082,map__15082__$1,js_dependency_index){
return (function (x__9802__auto__){
return sb__9801__auto__.append(x__9802__auto__);
});})(seq__15084_15096,chunk__15085_15097,count__15086_15098,i__15087_15099,_STAR_print_newline_STAR_15094_15121,_STAR_print_fn_STAR_15095_15122,sb__9801__auto__,map__15092_15118,map__15092_15119__$1,global_exports_15120,dep_15117,seq__15084_15111__$1,temp__5457__auto___15110,map__15082,map__15082__$1,js_dependency_index))
;

try{cljs.compiler.emitln.call(null,cljs.core.munge.call(null,ns_name),".",cljs.analyzer.munge_global_export.call(null,dep_15117)," = goog.global.",cljs.core.get.call(null,global_exports_15120,cljs.core.symbol.call(null,dep_15117)),";");
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15095_15122;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15094_15121;
}
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__9801__auto__)].join('');
})());

var G__15123 = cljs.core.next.call(null,seq__15084_15111__$1);
var G__15124 = null;
var G__15125 = (0);
var G__15126 = (0);
seq__15084_15096 = G__15123;
chunk__15085_15097 = G__15124;
count__15086_15098 = G__15125;
i__15087_15099 = G__15126;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_((function (){var and__8662__auto__ = cljs.core.seq.call(null,deps);
if(and__8662__auto__){
return emit_nil_result_QMARK_;
} else {
return and__8662__auto__;
}
})())){
return sb.append("null;");
} else {
return null;
}
});
cljs.js.analyze_str_STAR_ = (function cljs$js$analyze_str_STAR_(bound_vars,source,name,opts,cb){
var rdr = cljs.tools.reader.reader_types.indexing_push_back_reader.call(null,source,(1),name);
var eof = {};
var aenv = cljs.analyzer.empty_env.call(null);
var the_ns = (function (){var or__8674__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return new cljs.core.Symbol(null,"cljs.user","cljs.user",877795071,null);
}
})();
var bound_vars__$1 = (function (){var G__15129 = cljs.core.merge.call(null,bound_vars,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"*cljs-ns*","*cljs-ns*",565777432),the_ns], null));
if(cljs.core.truth_(new cljs.core.Keyword(null,"source-map","source-map",1706252311).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.core.assoc.call(null,G__15129,new cljs.core.Keyword(null,"*sm-data*","*sm-data*",1341435219),cljs.js.sm_data.call(null));
} else {
return G__15129;
}
})();
return ((function (rdr,eof,aenv,the_ns,bound_vars__$1){
return (function cljs$js$analyze_str_STAR__$_analyze_loop(last_ast,ns){
while(true){
var _STAR_compiler_STAR_15130 = cljs.env._STAR_compiler_STAR_;
var _STAR_cljs_ns_STAR_15131 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_checked_arrays_STAR_15132 = cljs.analyzer._STAR_checked_arrays_STAR_;
var _STAR_cljs_static_fns_STAR_15133 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
var _STAR_fn_invoke_direct_STAR_15134 = cljs.analyzer._STAR_fn_invoke_direct_STAR_;
var _STAR_ns_STAR_15135 = cljs.core._STAR_ns_STAR_;
var _STAR_passes_STAR_15136 = cljs.analyzer._STAR_passes_STAR_;
var _STAR_alias_map_STAR_15137 = cljs.tools.reader._STAR_alias_map_STAR_;
var _STAR_data_readers_STAR_15138 = cljs.tools.reader._STAR_data_readers_STAR_;
var resolve_symbol15139 = cljs.tools.reader.resolve_symbol;
var _STAR_source_map_data_STAR_15140 = cljs.compiler._STAR_source_map_data_STAR_;
var _STAR_cljs_file_STAR_15141 = cljs.analyzer._STAR_cljs_file_STAR_;
cljs.env._STAR_compiler_STAR_ = new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.analyzer._STAR_cljs_ns_STAR_ = ns;

cljs.analyzer._STAR_checked_arrays_STAR_ = new cljs.core.Keyword(null,"checked-arrays","checked-arrays",-139154445).cljs$core$IFn$_invoke$arity$1(opts);

cljs.analyzer._STAR_cljs_static_fns_STAR_ = new cljs.core.Keyword(null,"static-fns","static-fns",-501950748).cljs$core$IFn$_invoke$arity$1(opts);

cljs.analyzer._STAR_fn_invoke_direct_STAR_ = (function (){var and__8662__auto__ = new cljs.core.Keyword(null,"static-fns","static-fns",-501950748).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(and__8662__auto__)){
return new cljs.core.Keyword(null,"fn-invoke-direct","fn-invoke-direct",-1537311210).cljs$core$IFn$_invoke$arity$1(opts);
} else {
return and__8662__auto__;
}
})();

cljs.core._STAR_ns_STAR_ = cljs.core.create_ns.call(null,ns);

cljs.analyzer._STAR_passes_STAR_ = new cljs.core.Keyword(null,"*passes*","*passes*",1335562782).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.tools.reader._STAR_alias_map_STAR_ = cljs.js.current_alias_map.call(null);

cljs.tools.reader._STAR_data_readers_STAR_ = new cljs.core.Keyword(null,"*data-readers*","*data-readers*",-371480469).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.tools.reader.resolve_symbol = cljs.js.resolve_symbol;

cljs.compiler._STAR_source_map_data_STAR_ = new cljs.core.Keyword(null,"*sm-data*","*sm-data*",1341435219).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.analyzer._STAR_cljs_file_STAR_ = new cljs.core.Keyword(null,"cljs-file","cljs-file",-1499001049).cljs$core$IFn$_invoke$arity$1(opts);

try{var res = (function (){try{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),cljs.js.read.call(null,eof,rdr)], null);
}catch (e15142){var cause = e15142;
return cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,aenv,["Could not analyze ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''),cause));
}})();
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res))){
return cb.call(null,res);
} else {
var form = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(res);
if(!((eof === form))){
var aenv__$1 = (function (){var G__15143 = cljs.core.assoc.call(null,aenv,new cljs.core.Keyword(null,"ns","ns",441598760),cljs.analyzer.get_namespace.call(null,cljs.analyzer._STAR_cljs_ns_STAR_));
var G__15143__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(opts))?cljs.core.assoc.call(null,G__15143,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(opts)):G__15143);
if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.core.assoc.call(null,G__15143__$1,new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320),true);
} else {
return G__15143__$1;
}
})();
var res__$1 = (function (){try{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),cljs.analyzer.analyze.call(null,aenv__$1,form,null,opts)], null);
}catch (e15144){var cause = e15144;
return cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,aenv__$1,["Could not analyze ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''),cause));
}})();
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$1))){
return cb.call(null,res__$1);
} else {
var ast = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(res__$1);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ns*","ns*",200417856),null,new cljs.core.Keyword(null,"ns","ns",441598760),null], null), null).call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(ast)))){
return cljs.js.ns_side_effects.call(null,bound_vars__$1,aenv__$1,ast,opts,((function (last_ast,ns,ast,aenv__$1,res__$1,form,res,_STAR_compiler_STAR_15130,_STAR_cljs_ns_STAR_15131,_STAR_checked_arrays_STAR_15132,_STAR_cljs_static_fns_STAR_15133,_STAR_fn_invoke_direct_STAR_15134,_STAR_ns_STAR_15135,_STAR_passes_STAR_15136,_STAR_alias_map_STAR_15137,_STAR_data_readers_STAR_15138,resolve_symbol15139,_STAR_source_map_data_STAR_15140,_STAR_cljs_file_STAR_15141,rdr,eof,aenv,the_ns,bound_vars__$1){
return (function (res__$2){
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$2))){
return cb.call(null,res__$2);
} else {
return cljs$js$analyze_str_STAR__$_analyze_loop.call(null,ast,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ast));
}
});})(last_ast,ns,ast,aenv__$1,res__$1,form,res,_STAR_compiler_STAR_15130,_STAR_cljs_ns_STAR_15131,_STAR_checked_arrays_STAR_15132,_STAR_cljs_static_fns_STAR_15133,_STAR_fn_invoke_direct_STAR_15134,_STAR_ns_STAR_15135,_STAR_passes_STAR_15136,_STAR_alias_map_STAR_15137,_STAR_data_readers_STAR_15138,resolve_symbol15139,_STAR_source_map_data_STAR_15140,_STAR_cljs_file_STAR_15141,rdr,eof,aenv,the_ns,bound_vars__$1))
);
} else {
var G__15145 = ast;
var G__15146 = ns;
last_ast = G__15145;
ns = G__15146;
continue;
}
}
} else {
return cb.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),last_ast], null));
}
}
}finally {cljs.analyzer._STAR_cljs_file_STAR_ = _STAR_cljs_file_STAR_15141;

cljs.compiler._STAR_source_map_data_STAR_ = _STAR_source_map_data_STAR_15140;

cljs.tools.reader.resolve_symbol = resolve_symbol15139;

cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_15138;

cljs.tools.reader._STAR_alias_map_STAR_ = _STAR_alias_map_STAR_15137;

cljs.analyzer._STAR_passes_STAR_ = _STAR_passes_STAR_15136;

cljs.core._STAR_ns_STAR_ = _STAR_ns_STAR_15135;

cljs.analyzer._STAR_fn_invoke_direct_STAR_ = _STAR_fn_invoke_direct_STAR_15134;

cljs.analyzer._STAR_cljs_static_fns_STAR_ = _STAR_cljs_static_fns_STAR_15133;

cljs.analyzer._STAR_checked_arrays_STAR_ = _STAR_checked_arrays_STAR_15132;

cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_15131;

cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_15130;
}break;
}
});})(rdr,eof,aenv,the_ns,bound_vars__$1))
.call(null,null,the_ns);
});
/**
 * Analyze ClojureScript source. The compiler state will be populated with
 * the results of analyzes. The parameters:
 * 
 * state (atom)
 *   the compiler state
 * 
 * source (string)
 *   the ClojureScript source
 * 
 * name (symbol or string)
 *   optional, the name of the source
 * 
 * opts (map)
 *   compilation options.
 * 
 *    :eval             - eval function to invoke, see *eval-fn*
 *    :load             - library resolution function, see *load-fn*
 *    :source-map       - set to true to generate inline source map information
 *    :def-emits-var    - sets whether def (and derived) forms return either a Var
 *                        (if set to true) or the def init value (if false).
 *                        Defaults to false.
 *    :checked-arrays   - if :warn or :error, checks inferred types and values passed
 *                        to aget/aset. Logs for incorrect values if :warn, throws if
 *                        :error. Defaults to false.
 *    :static-fns       - employ static dispatch to specific function arities in
 *                        emitted JavaScript, as opposed to making use of the
 *                        `call` construct. Defaults to false.
 *    :fn-invoke-direct - if `true`, does not generate `.call(null...)` calls for
 *                        unknown functions, but instead direct invokes via
 *                        `f(a0,a1...)`. Defaults to `false`.
 *    :target           - use `:nodejs` if targeting Node.js. Takes no other options
 *                        at the moment.
 *    :ns               - optional, the namespace in which to evaluate the source.
 *    :verbose          - optional, emit details from compiler activity. Defaults to
 *                        false.
 *    :context          - optional, sets the context for the source. Possible values
 *                        are `:expr`, `:statement` and `:return`. Defaults to
 *                        `:expr`.
 * 
 * cb (function)
 *   callback, will be invoked with a map. If successful the map will contain
 *   a key :value, the actual value is not meaningful. If unsuccessful the
 *   map will contain a key :error with an ex-info instance describing the cause
 *   of failure.
 */
cljs.js.analyze_str = (function cljs$js$analyze_str(var_args){
var G__15148 = arguments.length;
switch (G__15148) {
case 3:
return cljs.js.analyze_str.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.js.analyze_str.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.js.analyze_str.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.js.analyze_str.cljs$core$IFn$_invoke$arity$3 = (function (state,source,cb){
return cljs.js.analyze_str.call(null,state,source,null,cb);
});

cljs.js.analyze_str.cljs$core$IFn$_invoke$arity$4 = (function (state,source,name,cb){
return cljs.js.analyze_str.call(null,state,source,name,null,cb);
});

cljs.js.analyze_str.cljs$core$IFn$_invoke$arity$5 = (function (state,source,name,opts,cb){
if(cljs.core.truth_(cljs.js.atom_QMARK_.call(null,state))){
} else {
throw (new Error("Assert failed: (atom? state)"));
}

if(typeof source === 'string'){
} else {
throw (new Error("Assert failed: (string? source)"));
}

if(cljs.core.truth_(cljs.js.valid_name_QMARK_.call(null,name))){
} else {
throw (new Error("Assert failed: (valid-name? name)"));
}

if(cljs.core.truth_(cljs.js.valid_opts_QMARK_.call(null,opts))){
} else {
throw (new Error("Assert failed: (valid-opts? opts)"));
}

if(cljs.core.fn_QMARK_.call(null,cb)){
} else {
throw (new Error("Assert failed: (fn? cb)"));
}

return cljs.js.analyze_str_STAR_.call(null,new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089),state,new cljs.core.Keyword(null,"*data-readers*","*data-readers*",-371480469),cljs.tagged_literals._STAR_cljs_data_readers_STAR_,new cljs.core.Keyword(null,"*passes*","*passes*",1335562782),(function (){var or__8674__auto__ = new cljs.core.Keyword(null,"passes","passes",-2141861841).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return cljs.analyzer._STAR_passes_STAR_;
}
})(),new cljs.core.Keyword(null,"*analyze-deps*","*analyze-deps*",-29540427),new cljs.core.Keyword(null,"analyze-deps","analyze-deps",1000677285).cljs$core$IFn$_invoke$arity$2(opts,true),new cljs.core.Keyword(null,"*cljs-dep-set*","*cljs-dep-set*",-73964612),cljs.analyzer._STAR_cljs_dep_set_STAR_,new cljs.core.Keyword(null,"*load-macros*","*load-macros*",640729006),new cljs.core.Keyword(null,"load-macros","load-macros",459797395).cljs$core$IFn$_invoke$arity$2(opts,true),new cljs.core.Keyword(null,"*load-fn*","*load-fn*",2055642106),(function (){var or__8674__auto__ = new cljs.core.Keyword(null,"load","load",-1318641184).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return cljs.js._STAR_load_fn_STAR_;
}
})(),new cljs.core.Keyword(null,"*eval-fn*","*eval-fn*",-217221128),(function (){var or__8674__auto__ = new cljs.core.Keyword(null,"eval","eval",-1103567905).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return cljs.js._STAR_eval_fn_STAR_;
}
})()], null),source,name,opts,cb);
});

cljs.js.analyze_str.cljs$lang$maxFixedArity = 5;

cljs.js.eval_STAR_ = (function cljs$js$eval_STAR_(bound_vars,form,opts,cb){
var the_ns = (function (){var or__8674__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return new cljs.core.Symbol(null,"cljs.user","cljs.user",877795071,null);
}
})();
var bound_vars__$1 = (function (){var G__15150 = cljs.core.merge.call(null,bound_vars,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"*cljs-ns*","*cljs-ns*",565777432),the_ns], null));
if(cljs.core.truth_(new cljs.core.Keyword(null,"source-map","source-map",1706252311).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.core.assoc.call(null,G__15150,new cljs.core.Keyword(null,"*sm-data*","*sm-data*",1341435219),cljs.js.sm_data.call(null));
} else {
return G__15150;
}
})();
var _STAR_compiler_STAR_15151 = cljs.env._STAR_compiler_STAR_;
var _STAR_eval_fn_STAR_15152 = cljs.js._STAR_eval_fn_STAR_;
var _STAR_cljs_ns_STAR_15153 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_checked_arrays_STAR_15154 = cljs.analyzer._STAR_checked_arrays_STAR_;
var _STAR_cljs_static_fns_STAR_15155 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
var _STAR_fn_invoke_direct_STAR_15156 = cljs.analyzer._STAR_fn_invoke_direct_STAR_;
var _STAR_ns_STAR_15157 = cljs.core._STAR_ns_STAR_;
var _STAR_alias_map_STAR_15158 = cljs.tools.reader._STAR_alias_map_STAR_;
var _STAR_data_readers_STAR_15159 = cljs.tools.reader._STAR_data_readers_STAR_;
var resolve_symbol15160 = cljs.tools.reader.resolve_symbol;
var _STAR_source_map_data_STAR_15161 = cljs.compiler._STAR_source_map_data_STAR_;
cljs.env._STAR_compiler_STAR_ = new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.js._STAR_eval_fn_STAR_ = new cljs.core.Keyword(null,"*eval-fn*","*eval-fn*",-217221128).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.analyzer._STAR_cljs_ns_STAR_ = new cljs.core.Keyword(null,"*cljs-ns*","*cljs-ns*",565777432).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.analyzer._STAR_checked_arrays_STAR_ = new cljs.core.Keyword(null,"checked-arrays","checked-arrays",-139154445).cljs$core$IFn$_invoke$arity$1(opts);

cljs.analyzer._STAR_cljs_static_fns_STAR_ = new cljs.core.Keyword(null,"static-fns","static-fns",-501950748).cljs$core$IFn$_invoke$arity$1(opts);

cljs.analyzer._STAR_fn_invoke_direct_STAR_ = (function (){var and__8662__auto__ = new cljs.core.Keyword(null,"static-fns","static-fns",-501950748).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(and__8662__auto__)){
return new cljs.core.Keyword(null,"fn-invoke-direct","fn-invoke-direct",-1537311210).cljs$core$IFn$_invoke$arity$1(opts);
} else {
return and__8662__auto__;
}
})();

cljs.core._STAR_ns_STAR_ = cljs.core.create_ns.call(null,new cljs.core.Keyword(null,"*cljs-ns*","*cljs-ns*",565777432).cljs$core$IFn$_invoke$arity$1(bound_vars__$1));

cljs.tools.reader._STAR_alias_map_STAR_ = cljs.js.current_alias_map.call(null);

cljs.tools.reader._STAR_data_readers_STAR_ = new cljs.core.Keyword(null,"*data-readers*","*data-readers*",-371480469).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.tools.reader.resolve_symbol = cljs.js.resolve_symbol;

cljs.compiler._STAR_source_map_data_STAR_ = new cljs.core.Keyword(null,"*sm-data*","*sm-data*",1341435219).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

try{var aenv = cljs.analyzer.empty_env.call(null);
var aenv__$1 = (function (){var G__15162 = cljs.core.assoc.call(null,aenv,new cljs.core.Keyword(null,"ns","ns",441598760),cljs.analyzer.get_namespace.call(null,cljs.analyzer._STAR_cljs_ns_STAR_));
var G__15162__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(opts))?cljs.core.assoc.call(null,G__15162,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(opts)):G__15162);
if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.core.assoc.call(null,G__15162__$1,new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320),true);
} else {
return G__15162__$1;
}
})();
var res = (function (){try{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),cljs.analyzer.analyze.call(null,aenv__$1,form,null,opts)], null);
}catch (e15163){var cause = e15163;
return cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,aenv__$1,["Could not eval ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(form)].join(''),cause));
}})();
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res))){
return cb.call(null,res);
} else {
var ast = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(res);
var vec__15164 = ((cljs.core.keyword_identical_QMARK_.call(null,new cljs.core.Keyword(null,"target","target",253001721).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"nodejs","nodejs",321212524)))?(function (){var map__15167 = cljs.core.group_by.call(null,cljs.analyzer.node_module_dep_QMARK_,new cljs.core.Keyword(null,"deps","deps",1883360319).cljs$core$IFn$_invoke$arity$1(ast));
var map__15167__$1 = ((((!((map__15167 == null)))?((((map__15167.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15167.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15167):map__15167);
var node_libs = cljs.core.get.call(null,map__15167__$1,true);
var libs_to_load = cljs.core.get.call(null,map__15167__$1,false);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [node_libs,cljs.core.assoc.call(null,ast,new cljs.core.Keyword(null,"deps","deps",1883360319),libs_to_load)], null);
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,ast], null));
var node_deps = cljs.core.nth.call(null,vec__15164,(0),null);
var ast__$1 = cljs.core.nth.call(null,vec__15164,(1),null);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ns*","ns*",200417856),null,new cljs.core.Keyword(null,"ns","ns",441598760),null], null), null).call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(ast__$1)))){
return cljs.js.ns_side_effects.call(null,true,bound_vars__$1,aenv__$1,ast__$1,opts,((function (ast,vec__15164,node_deps,ast__$1,aenv,aenv__$1,res,_STAR_compiler_STAR_15151,_STAR_eval_fn_STAR_15152,_STAR_cljs_ns_STAR_15153,_STAR_checked_arrays_STAR_15154,_STAR_cljs_static_fns_STAR_15155,_STAR_fn_invoke_direct_STAR_15156,_STAR_ns_STAR_15157,_STAR_alias_map_STAR_15158,_STAR_data_readers_STAR_15159,resolve_symbol15160,_STAR_source_map_data_STAR_15161,the_ns,bound_vars__$1){
return (function (res__$1){
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$1))){
return cb.call(null,res__$1);
} else {
var ns_name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ast__$1);
var sb = (new goog.string.StringBuffer());
sb.append((function (){var sb__9801__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15169_15173 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15170_15174 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_15169_15173,_STAR_print_fn_STAR_15170_15174,sb__9801__auto__,ns_name,sb,ast,vec__15164,node_deps,ast__$1,aenv,aenv__$1,res,_STAR_compiler_STAR_15151,_STAR_eval_fn_STAR_15152,_STAR_cljs_ns_STAR_15153,_STAR_checked_arrays_STAR_15154,_STAR_cljs_static_fns_STAR_15155,_STAR_fn_invoke_direct_STAR_15156,_STAR_ns_STAR_15157,_STAR_alias_map_STAR_15158,_STAR_data_readers_STAR_15159,resolve_symbol15160,_STAR_source_map_data_STAR_15161,the_ns,bound_vars__$1){
return (function (x__9802__auto__){
return sb__9801__auto__.append(x__9802__auto__);
});})(_STAR_print_newline_STAR_15169_15173,_STAR_print_fn_STAR_15170_15174,sb__9801__auto__,ns_name,sb,ast,vec__15164,node_deps,ast__$1,aenv,aenv__$1,res,_STAR_compiler_STAR_15151,_STAR_eval_fn_STAR_15152,_STAR_cljs_ns_STAR_15153,_STAR_checked_arrays_STAR_15154,_STAR_cljs_static_fns_STAR_15155,_STAR_fn_invoke_direct_STAR_15156,_STAR_ns_STAR_15157,_STAR_alias_map_STAR_15158,_STAR_data_readers_STAR_15159,resolve_symbol15160,_STAR_source_map_data_STAR_15161,the_ns,bound_vars__$1))
;

try{cljs.compiler.emitln.call(null,["goog.provide(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,ns_name)),"\");"].join(''));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15170_15174;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15169_15173;
}
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__9801__auto__)].join('');
})());

if((node_deps == null)){
} else {
cljs.js.node_side_effects.call(null,bound_vars__$1,sb,node_deps,ns_name,new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(opts));
}

cljs.js.global_exports_side_effects.call(null,bound_vars__$1,sb,cljs.core.filter.call(null,cljs.analyzer.dep_has_global_exports_QMARK_,new cljs.core.Keyword(null,"deps","deps",1883360319).cljs$core$IFn$_invoke$arity$1(ast__$1)),ns_name,new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(opts));

return cb.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),cljs.js._STAR_eval_fn_STAR_.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"source","source",-433931539),sb.toString()], null))], null));
}
});})(ast,vec__15164,node_deps,ast__$1,aenv,aenv__$1,res,_STAR_compiler_STAR_15151,_STAR_eval_fn_STAR_15152,_STAR_cljs_ns_STAR_15153,_STAR_checked_arrays_STAR_15154,_STAR_cljs_static_fns_STAR_15155,_STAR_fn_invoke_direct_STAR_15156,_STAR_ns_STAR_15157,_STAR_alias_map_STAR_15158,_STAR_data_readers_STAR_15159,resolve_symbol15160,_STAR_source_map_data_STAR_15161,the_ns,bound_vars__$1))
);
} else {
var src = (function (){var sb__9801__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15171_15175 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15172_15176 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_15171_15175,_STAR_print_fn_STAR_15172_15176,sb__9801__auto__,ast,vec__15164,node_deps,ast__$1,aenv,aenv__$1,res,_STAR_compiler_STAR_15151,_STAR_eval_fn_STAR_15152,_STAR_cljs_ns_STAR_15153,_STAR_checked_arrays_STAR_15154,_STAR_cljs_static_fns_STAR_15155,_STAR_fn_invoke_direct_STAR_15156,_STAR_ns_STAR_15157,_STAR_alias_map_STAR_15158,_STAR_data_readers_STAR_15159,resolve_symbol15160,_STAR_source_map_data_STAR_15161,the_ns,bound_vars__$1){
return (function (x__9802__auto__){
return sb__9801__auto__.append(x__9802__auto__);
});})(_STAR_print_newline_STAR_15171_15175,_STAR_print_fn_STAR_15172_15176,sb__9801__auto__,ast,vec__15164,node_deps,ast__$1,aenv,aenv__$1,res,_STAR_compiler_STAR_15151,_STAR_eval_fn_STAR_15152,_STAR_cljs_ns_STAR_15153,_STAR_checked_arrays_STAR_15154,_STAR_cljs_static_fns_STAR_15155,_STAR_fn_invoke_direct_STAR_15156,_STAR_ns_STAR_15157,_STAR_alias_map_STAR_15158,_STAR_data_readers_STAR_15159,resolve_symbol15160,_STAR_source_map_data_STAR_15161,the_ns,bound_vars__$1))
;

try{cljs.compiler.emit.call(null,ast__$1);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15172_15176;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15171_15175;
}
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__9801__auto__)].join('');
})();
return cb.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),cljs.js._STAR_eval_fn_STAR_.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"source","source",-433931539),src], null))], null));
}
}
}finally {cljs.compiler._STAR_source_map_data_STAR_ = _STAR_source_map_data_STAR_15161;

cljs.tools.reader.resolve_symbol = resolve_symbol15160;

cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_15159;

cljs.tools.reader._STAR_alias_map_STAR_ = _STAR_alias_map_STAR_15158;

cljs.core._STAR_ns_STAR_ = _STAR_ns_STAR_15157;

cljs.analyzer._STAR_fn_invoke_direct_STAR_ = _STAR_fn_invoke_direct_STAR_15156;

cljs.analyzer._STAR_cljs_static_fns_STAR_ = _STAR_cljs_static_fns_STAR_15155;

cljs.analyzer._STAR_checked_arrays_STAR_ = _STAR_checked_arrays_STAR_15154;

cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_15153;

cljs.js._STAR_eval_fn_STAR_ = _STAR_eval_fn_STAR_15152;

cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_15151;
}});
/**
 * Evaluate a single ClojureScript form. The parameters:
 * 
 * state (atom)
 *   the compiler state
 * 
 * form (s-expr)
 *   the ClojureScript source
 * 
 * opts (map)
 *   compilation options.
 * 
 *    :eval             - eval function to invoke, see *eval-fn*
 *    :load             - library resolution function, see *load-fn*
 *    :source-map       - set to true to generate inline source map information
 *    :def-emits-var    - sets whether def (and derived) forms return either a Var
 *                        (if set to true) or the def init value (if false). Default
 *                        is false.
 *    :checked-arrays   - if :warn or :error, checks inferred types and values passed
 *                        to aget/aset. Logs for incorrect values if :warn, throws if
 *                        :error. Defaults to false.
 *    :static-fns       - employ static dispatch to specific function arities in
 *                        emitted JavaScript, as opposed to making use of the
 *                        `call` construct. Defaults to false.
 *    :fn-invoke-direct - if `true`, does not generate `.call(null...)` calls for
 *                        unknown functions, but instead direct invokes via
 *                        `f(a0,a1...)`. Defaults to `false`.
 *    :target           - use `:nodejs` if targeting Node.js. Takes no other options
 *                        at the moment.
 *    :ns               - optional, the namespace in which to evaluate the source.
 *    :verbose          - optional, emit details from compiler activity. Defaults to
 *                        false.
 *    :context          - optional, sets the context for the source. Possible values
 *                        are `:expr`, `:statement` and `:return`. Defaults to
 *                        `:expr`.
 * 
 * cb (function)
 *   callback, will be invoked with a map. If successful the map will contain
 *   a key :value with the result of evalution. If unsuccessful the map will
 *   contain a key :error with an ex-info instance describing the cause of
 *   failure.
 */
cljs.js.eval = (function cljs$js$eval(var_args){
var G__15178 = arguments.length;
switch (G__15178) {
case 3:
return cljs.js.eval.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.js.eval.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.js.eval.cljs$core$IFn$_invoke$arity$3 = (function (state,form,cb){
return cljs.js.eval.call(null,state,form,null,cb);
});

cljs.js.eval.cljs$core$IFn$_invoke$arity$4 = (function (state,form,opts,cb){
return cljs.js.eval_STAR_.call(null,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089),state,new cljs.core.Keyword(null,"*data-readers*","*data-readers*",-371480469),cljs.tagged_literals._STAR_cljs_data_readers_STAR_,new cljs.core.Keyword(null,"*analyze-deps*","*analyze-deps*",-29540427),new cljs.core.Keyword(null,"analyze-deps","analyze-deps",1000677285).cljs$core$IFn$_invoke$arity$2(opts,true),new cljs.core.Keyword(null,"*cljs-dep-set*","*cljs-dep-set*",-73964612),cljs.analyzer._STAR_cljs_dep_set_STAR_,new cljs.core.Keyword(null,"*load-macros*","*load-macros*",640729006),new cljs.core.Keyword(null,"load-macros","load-macros",459797395).cljs$core$IFn$_invoke$arity$2(opts,true),new cljs.core.Keyword(null,"*load-fn*","*load-fn*",2055642106),(function (){var or__8674__auto__ = new cljs.core.Keyword(null,"load","load",-1318641184).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return cljs.js._STAR_load_fn_STAR_;
}
})(),new cljs.core.Keyword(null,"*eval-fn*","*eval-fn*",-217221128),(function (){var or__8674__auto__ = new cljs.core.Keyword(null,"eval","eval",-1103567905).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return cljs.js._STAR_eval_fn_STAR_;
}
})()], null),form,opts,cb);
});

cljs.js.eval.cljs$lang$maxFixedArity = 4;

cljs.js.compile_str_STAR_ = (function cljs$js$compile_str_STAR_(bound_vars,source,name,opts,cb){
var rdr = cljs.tools.reader.reader_types.indexing_push_back_reader.call(null,source,(1),name);
var eof = {};
var aenv = cljs.analyzer.empty_env.call(null);
var sb = (new goog.string.StringBuffer());
var the_ns = (function (){var or__8674__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return new cljs.core.Symbol(null,"cljs.user","cljs.user",877795071,null);
}
})();
var bound_vars__$1 = (function (){var G__15182 = cljs.core.merge.call(null,bound_vars,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"*cljs-ns*","*cljs-ns*",565777432),the_ns], null));
if(cljs.core.truth_(new cljs.core.Keyword(null,"source-map","source-map",1706252311).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.core.assoc.call(null,G__15182,new cljs.core.Keyword(null,"*sm-data*","*sm-data*",1341435219),cljs.js.sm_data.call(null));
} else {
return G__15182;
}
})();
return ((function (rdr,eof,aenv,sb,the_ns,bound_vars__$1){
return (function cljs$js$compile_str_STAR__$_compile_loop(ns){
while(true){
var _STAR_compiler_STAR_15183 = cljs.env._STAR_compiler_STAR_;
var _STAR_eval_fn_STAR_15184 = cljs.js._STAR_eval_fn_STAR_;
var _STAR_cljs_ns_STAR_15185 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_checked_arrays_STAR_15186 = cljs.analyzer._STAR_checked_arrays_STAR_;
var _STAR_cljs_static_fns_STAR_15187 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
var _STAR_fn_invoke_direct_STAR_15188 = cljs.analyzer._STAR_fn_invoke_direct_STAR_;
var _STAR_ns_STAR_15189 = cljs.core._STAR_ns_STAR_;
var _STAR_alias_map_STAR_15190 = cljs.tools.reader._STAR_alias_map_STAR_;
var _STAR_data_readers_STAR_15191 = cljs.tools.reader._STAR_data_readers_STAR_;
var resolve_symbol15192 = cljs.tools.reader.resolve_symbol;
var _STAR_source_map_data_STAR_15193 = cljs.compiler._STAR_source_map_data_STAR_;
cljs.env._STAR_compiler_STAR_ = new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.js._STAR_eval_fn_STAR_ = new cljs.core.Keyword(null,"*eval-fn*","*eval-fn*",-217221128).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.analyzer._STAR_cljs_ns_STAR_ = ns;

cljs.analyzer._STAR_checked_arrays_STAR_ = new cljs.core.Keyword(null,"checked-arrays","checked-arrays",-139154445).cljs$core$IFn$_invoke$arity$1(opts);

cljs.analyzer._STAR_cljs_static_fns_STAR_ = new cljs.core.Keyword(null,"static-fns","static-fns",-501950748).cljs$core$IFn$_invoke$arity$1(opts);

cljs.analyzer._STAR_fn_invoke_direct_STAR_ = (function (){var and__8662__auto__ = new cljs.core.Keyword(null,"static-fns","static-fns",-501950748).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(and__8662__auto__)){
return new cljs.core.Keyword(null,"fn-invoke-direct","fn-invoke-direct",-1537311210).cljs$core$IFn$_invoke$arity$1(opts);
} else {
return and__8662__auto__;
}
})();

cljs.core._STAR_ns_STAR_ = cljs.core.create_ns.call(null,ns);

cljs.tools.reader._STAR_alias_map_STAR_ = cljs.js.current_alias_map.call(null);

cljs.tools.reader._STAR_data_readers_STAR_ = new cljs.core.Keyword(null,"*data-readers*","*data-readers*",-371480469).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.tools.reader.resolve_symbol = cljs.js.resolve_symbol;

cljs.compiler._STAR_source_map_data_STAR_ = new cljs.core.Keyword(null,"*sm-data*","*sm-data*",1341435219).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

try{var res = (function (){try{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),cljs.js.read.call(null,eof,rdr)], null);
}catch (e15194){var cause = e15194;
return cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,aenv,["Could not compile ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''),cause));
}})();
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res))){
return cb.call(null,res);
} else {
var form = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(res);
if(!((eof === form))){
var aenv__$1 = (function (){var G__15195 = cljs.core.assoc.call(null,aenv,new cljs.core.Keyword(null,"ns","ns",441598760),cljs.analyzer.get_namespace.call(null,cljs.analyzer._STAR_cljs_ns_STAR_));
var G__15195__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(opts))?cljs.core.assoc.call(null,G__15195,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(opts)):G__15195);
if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.core.assoc.call(null,G__15195__$1,new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320),true);
} else {
return G__15195__$1;
}
})();
var res__$1 = (function (){try{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),cljs.analyzer.analyze.call(null,aenv__$1,form,null,opts)], null);
}catch (e15196){var cause = e15196;
return cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,aenv__$1,["Could not compile ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''),cause));
}})();
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$1))){
return cb.call(null,res__$1);
} else {
var ast = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(res__$1);
var vec__15197 = ((cljs.core.keyword_identical_QMARK_.call(null,new cljs.core.Keyword(null,"target","target",253001721).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"nodejs","nodejs",321212524)))?(function (){var map__15200 = cljs.core.group_by.call(null,cljs.analyzer.node_module_dep_QMARK_,new cljs.core.Keyword(null,"deps","deps",1883360319).cljs$core$IFn$_invoke$arity$1(ast));
var map__15200__$1 = ((((!((map__15200 == null)))?((((map__15200.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15200.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15200):map__15200);
var node_libs = cljs.core.get.call(null,map__15200__$1,true);
var libs_to_load = cljs.core.get.call(null,map__15200__$1,false);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [node_libs,cljs.core.assoc.call(null,ast,new cljs.core.Keyword(null,"deps","deps",1883360319),libs_to_load)], null);
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,ast], null));
var node_deps = cljs.core.nth.call(null,vec__15197,(0),null);
var ast__$1 = cljs.core.nth.call(null,vec__15197,(1),null);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ns*","ns*",200417856),null,new cljs.core.Keyword(null,"ns","ns",441598760),null], null), null).call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(ast__$1)))){
return cljs.js.ns_side_effects.call(null,bound_vars__$1,aenv__$1,ast__$1,opts,((function (ns,ast,vec__15197,node_deps,ast__$1,aenv__$1,res__$1,form,res,_STAR_compiler_STAR_15183,_STAR_eval_fn_STAR_15184,_STAR_cljs_ns_STAR_15185,_STAR_checked_arrays_STAR_15186,_STAR_cljs_static_fns_STAR_15187,_STAR_fn_invoke_direct_STAR_15188,_STAR_ns_STAR_15189,_STAR_alias_map_STAR_15190,_STAR_data_readers_STAR_15191,resolve_symbol15192,_STAR_source_map_data_STAR_15193,rdr,eof,aenv,sb,the_ns,bound_vars__$1){
return (function (res__$2){
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$2))){
return cb.call(null,res__$2);
} else {
var ns_name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ast__$1);
sb.append((function (){var sb__9801__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15202_15206 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15203_15207 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (ns,_STAR_print_newline_STAR_15202_15206,_STAR_print_fn_STAR_15203_15207,sb__9801__auto__,ns_name,ast,vec__15197,node_deps,ast__$1,aenv__$1,res__$1,form,res,_STAR_compiler_STAR_15183,_STAR_eval_fn_STAR_15184,_STAR_cljs_ns_STAR_15185,_STAR_checked_arrays_STAR_15186,_STAR_cljs_static_fns_STAR_15187,_STAR_fn_invoke_direct_STAR_15188,_STAR_ns_STAR_15189,_STAR_alias_map_STAR_15190,_STAR_data_readers_STAR_15191,resolve_symbol15192,_STAR_source_map_data_STAR_15193,rdr,eof,aenv,sb,the_ns,bound_vars__$1){
return (function (x__9802__auto__){
return sb__9801__auto__.append(x__9802__auto__);
});})(ns,_STAR_print_newline_STAR_15202_15206,_STAR_print_fn_STAR_15203_15207,sb__9801__auto__,ns_name,ast,vec__15197,node_deps,ast__$1,aenv__$1,res__$1,form,res,_STAR_compiler_STAR_15183,_STAR_eval_fn_STAR_15184,_STAR_cljs_ns_STAR_15185,_STAR_checked_arrays_STAR_15186,_STAR_cljs_static_fns_STAR_15187,_STAR_fn_invoke_direct_STAR_15188,_STAR_ns_STAR_15189,_STAR_alias_map_STAR_15190,_STAR_data_readers_STAR_15191,resolve_symbol15192,_STAR_source_map_data_STAR_15193,rdr,eof,aenv,sb,the_ns,bound_vars__$1))
;

try{cljs.compiler.emit.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(res__$2));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15203_15207;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15202_15206;
}
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__9801__auto__)].join('');
})());

if((node_deps == null)){
} else {
cljs.js.node_side_effects.call(null,bound_vars__$1,sb,node_deps,ns_name,new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(opts));
}

return cljs$js$compile_str_STAR__$_compile_loop.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ast__$1));
}
});})(ns,ast,vec__15197,node_deps,ast__$1,aenv__$1,res__$1,form,res,_STAR_compiler_STAR_15183,_STAR_eval_fn_STAR_15184,_STAR_cljs_ns_STAR_15185,_STAR_checked_arrays_STAR_15186,_STAR_cljs_static_fns_STAR_15187,_STAR_fn_invoke_direct_STAR_15188,_STAR_ns_STAR_15189,_STAR_alias_map_STAR_15190,_STAR_data_readers_STAR_15191,resolve_symbol15192,_STAR_source_map_data_STAR_15193,rdr,eof,aenv,sb,the_ns,bound_vars__$1))
);
} else {
sb.append((function (){var sb__9801__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15204_15208 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15205_15209 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (ns,_STAR_print_newline_STAR_15204_15208,_STAR_print_fn_STAR_15205_15209,sb__9801__auto__,ast,vec__15197,node_deps,ast__$1,aenv__$1,res__$1,form,res,_STAR_compiler_STAR_15183,_STAR_eval_fn_STAR_15184,_STAR_cljs_ns_STAR_15185,_STAR_checked_arrays_STAR_15186,_STAR_cljs_static_fns_STAR_15187,_STAR_fn_invoke_direct_STAR_15188,_STAR_ns_STAR_15189,_STAR_alias_map_STAR_15190,_STAR_data_readers_STAR_15191,resolve_symbol15192,_STAR_source_map_data_STAR_15193,rdr,eof,aenv,sb,the_ns,bound_vars__$1){
return (function (x__9802__auto__){
return sb__9801__auto__.append(x__9802__auto__);
});})(ns,_STAR_print_newline_STAR_15204_15208,_STAR_print_fn_STAR_15205_15209,sb__9801__auto__,ast,vec__15197,node_deps,ast__$1,aenv__$1,res__$1,form,res,_STAR_compiler_STAR_15183,_STAR_eval_fn_STAR_15184,_STAR_cljs_ns_STAR_15185,_STAR_checked_arrays_STAR_15186,_STAR_cljs_static_fns_STAR_15187,_STAR_fn_invoke_direct_STAR_15188,_STAR_ns_STAR_15189,_STAR_alias_map_STAR_15190,_STAR_data_readers_STAR_15191,resolve_symbol15192,_STAR_source_map_data_STAR_15193,rdr,eof,aenv,sb,the_ns,bound_vars__$1))
;

try{cljs.compiler.emit.call(null,ast__$1);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15205_15209;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15204_15208;
}
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__9801__auto__)].join('');
})());

var G__15210 = ns;
ns = G__15210;
continue;
}
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"source-map","source-map",1706252311).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.append_source_map.call(null,cljs.env._STAR_compiler_STAR_,name,source,sb,cljs.core.deref.call(null,cljs.compiler._STAR_source_map_data_STAR_),opts);
} else {
}

return cb.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),sb.toString()], null));
}
}
}finally {cljs.compiler._STAR_source_map_data_STAR_ = _STAR_source_map_data_STAR_15193;

cljs.tools.reader.resolve_symbol = resolve_symbol15192;

cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_15191;

cljs.tools.reader._STAR_alias_map_STAR_ = _STAR_alias_map_STAR_15190;

cljs.core._STAR_ns_STAR_ = _STAR_ns_STAR_15189;

cljs.analyzer._STAR_fn_invoke_direct_STAR_ = _STAR_fn_invoke_direct_STAR_15188;

cljs.analyzer._STAR_cljs_static_fns_STAR_ = _STAR_cljs_static_fns_STAR_15187;

cljs.analyzer._STAR_checked_arrays_STAR_ = _STAR_checked_arrays_STAR_15186;

cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_15185;

cljs.js._STAR_eval_fn_STAR_ = _STAR_eval_fn_STAR_15184;

cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_15183;
}break;
}
});})(rdr,eof,aenv,sb,the_ns,bound_vars__$1))
.call(null,the_ns);
});
/**
 * Compile ClojureScript source into JavaScript. The parameters:
 * 
 * state (atom)
 *   the compiler state
 * 
 * source (string)
 *   the ClojureScript source
 * 
 * name (symbol or string)
 *   optional, the name of the source
 * 
 * opts (map)
 *   compilation options.
 * 
 *    :eval             - eval function to invoke, see *eval-fn*
 *    :load             - library resolution function, see *load-fn*
 *    :source-map       - set to true to generate inline source map information
 *    :def-emits-var    - sets whether def (and derived) forms return either a Var
 *                        (if set to true) or the def init value (if false). Default
 *                        is false.
 *    :checked-arrays   - if :warn or :error, checks inferred types and values passed
 *                        to aget/aset. Logs for incorrect values if :warn, throws if
 *                        :error. Defaults to false.
 *    :static-fns       - employ static dispatch to specific function arities in
 *                        emitted JavaScript, as opposed to making use of the
 *                        `call` construct. Defaults to false.
 *    :fn-invoke-direct - if `true`, does not generate `.call(null...)` calls for
 *                        unknown functions, but instead direct invokes via
 *                        `f(a0,a1...)`. Defaults to `false`.
 *    :target           - use `:nodejs` if targeting Node.js. Takes no other options
 *                        at the moment.
 *    :ns               - optional, the namespace in which to evaluate the source.
 *    :verbose          - optional, emit details from compiler activity. Defaults to
 *                        false.
 *    :context          - optional, sets the context for the source. Possible values
 *                        are `:expr`, `:statement` and `:return`. Defaults to
 *                        `:expr`.
 * 
 * cb (function)
 *   callback, will be invoked with a map. If successful the map will contain
 *   a key :value with the compilation result (string). If unsuccessful the map
 *   will contain a key :error with an ex-info instance describing the cause
 *   of failure.
 */
cljs.js.compile_str = (function cljs$js$compile_str(var_args){
var G__15212 = arguments.length;
switch (G__15212) {
case 3:
return cljs.js.compile_str.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.js.compile_str.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.js.compile_str.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.js.compile_str.cljs$core$IFn$_invoke$arity$3 = (function (state,source,cb){
return cljs.js.compile_str.call(null,state,source,null,cb);
});

cljs.js.compile_str.cljs$core$IFn$_invoke$arity$4 = (function (state,source,name,cb){
return cljs.js.compile_str.call(null,state,source,name,null,cb);
});

cljs.js.compile_str.cljs$core$IFn$_invoke$arity$5 = (function (state,source,name,opts,cb){
if(cljs.core.truth_(cljs.js.atom_QMARK_.call(null,state))){
} else {
throw (new Error("Assert failed: (atom? state)"));
}

if(typeof source === 'string'){
} else {
throw (new Error("Assert failed: (string? source)"));
}

if(cljs.core.truth_(cljs.js.valid_name_QMARK_.call(null,name))){
} else {
throw (new Error("Assert failed: (valid-name? name)"));
}

if(cljs.core.truth_(cljs.js.valid_opts_QMARK_.call(null,opts))){
} else {
throw (new Error("Assert failed: (valid-opts? opts)"));
}

if(cljs.core.fn_QMARK_.call(null,cb)){
} else {
throw (new Error("Assert failed: (fn? cb)"));
}

return cljs.js.compile_str_STAR_.call(null,new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089),state,new cljs.core.Keyword(null,"*data-readers*","*data-readers*",-371480469),cljs.tagged_literals._STAR_cljs_data_readers_STAR_,new cljs.core.Keyword(null,"*cljs-dep-set*","*cljs-dep-set*",-73964612),cljs.analyzer._STAR_cljs_dep_set_STAR_,new cljs.core.Keyword(null,"*analyze-deps*","*analyze-deps*",-29540427),new cljs.core.Keyword(null,"analyze-deps","analyze-deps",1000677285).cljs$core$IFn$_invoke$arity$2(opts,true),new cljs.core.Keyword(null,"*load-macros*","*load-macros*",640729006),new cljs.core.Keyword(null,"load-macros","load-macros",459797395).cljs$core$IFn$_invoke$arity$2(opts,true),new cljs.core.Keyword(null,"*load-fn*","*load-fn*",2055642106),(function (){var or__8674__auto__ = new cljs.core.Keyword(null,"load","load",-1318641184).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return cljs.js._STAR_load_fn_STAR_;
}
})(),new cljs.core.Keyword(null,"*eval-fn*","*eval-fn*",-217221128),(function (){var or__8674__auto__ = new cljs.core.Keyword(null,"eval","eval",-1103567905).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return cljs.js._STAR_eval_fn_STAR_;
}
})(),new cljs.core.Keyword(null,"*sm-data*","*sm-data*",1341435219),(cljs.core.truth_(new cljs.core.Keyword(null,"source-map","source-map",1706252311).cljs$core$IFn$_invoke$arity$1(opts))?cljs.js.sm_data.call(null):null)], null),source,name,opts,cb);
});

cljs.js.compile_str.cljs$lang$maxFixedArity = 5;

cljs.js.eval_str_STAR_ = (function cljs$js$eval_str_STAR_(bound_vars,source,name,opts,cb){
var rdr = cljs.tools.reader.reader_types.indexing_push_back_reader.call(null,source,(1),name);
var eof = {};
var aenv = cljs.analyzer.empty_env.call(null);
var sb = (new goog.string.StringBuffer());
var the_ns = (function (){var or__8674__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return new cljs.core.Symbol(null,"cljs.user","cljs.user",877795071,null);
}
})();
var bound_vars__$1 = (function (){var G__15216 = cljs.core.merge.call(null,bound_vars,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"*cljs-ns*","*cljs-ns*",565777432),the_ns], null));
if(cljs.core.truth_(new cljs.core.Keyword(null,"source-map","source-map",1706252311).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.core.assoc.call(null,G__15216,new cljs.core.Keyword(null,"*sm-data*","*sm-data*",1341435219),cljs.js.sm_data.call(null));
} else {
return G__15216;
}
})();
var aname = (function (){var G__15217 = name;
if(cljs.core.truth_(new cljs.core.Keyword(null,"macros-ns","macros-ns",1626844933).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.analyzer.macro_ns_name.call(null,G__15217);
} else {
return G__15217;
}
})();
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.debug_prn.call(null,"Evaluating",name);
} else {
}

return ((function (rdr,eof,aenv,sb,the_ns,bound_vars__$1,aname){
return (function cljs$js$eval_str_STAR__$_compile_loop(ns){
while(true){
var _STAR_compiler_STAR_15218 = cljs.env._STAR_compiler_STAR_;
var _STAR_eval_fn_STAR_15219 = cljs.js._STAR_eval_fn_STAR_;
var _STAR_cljs_ns_STAR_15220 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_checked_arrays_STAR_15221 = cljs.analyzer._STAR_checked_arrays_STAR_;
var _STAR_cljs_static_fns_STAR_15222 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
var _STAR_fn_invoke_direct_STAR_15223 = cljs.analyzer._STAR_fn_invoke_direct_STAR_;
var _STAR_ns_STAR_15224 = cljs.core._STAR_ns_STAR_;
var _STAR_alias_map_STAR_15225 = cljs.tools.reader._STAR_alias_map_STAR_;
var _STAR_data_readers_STAR_15226 = cljs.tools.reader._STAR_data_readers_STAR_;
var resolve_symbol15227 = cljs.tools.reader.resolve_symbol;
var _STAR_source_map_data_STAR_15228 = cljs.compiler._STAR_source_map_data_STAR_;
var _STAR_cljs_file_STAR_15229 = cljs.analyzer._STAR_cljs_file_STAR_;
cljs.env._STAR_compiler_STAR_ = new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.js._STAR_eval_fn_STAR_ = new cljs.core.Keyword(null,"*eval-fn*","*eval-fn*",-217221128).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.analyzer._STAR_cljs_ns_STAR_ = ns;

cljs.analyzer._STAR_checked_arrays_STAR_ = new cljs.core.Keyword(null,"checked-arrays","checked-arrays",-139154445).cljs$core$IFn$_invoke$arity$1(opts);

cljs.analyzer._STAR_cljs_static_fns_STAR_ = new cljs.core.Keyword(null,"static-fns","static-fns",-501950748).cljs$core$IFn$_invoke$arity$1(opts);

cljs.analyzer._STAR_fn_invoke_direct_STAR_ = (function (){var and__8662__auto__ = new cljs.core.Keyword(null,"static-fns","static-fns",-501950748).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(and__8662__auto__)){
return new cljs.core.Keyword(null,"fn-invoke-direct","fn-invoke-direct",-1537311210).cljs$core$IFn$_invoke$arity$1(opts);
} else {
return and__8662__auto__;
}
})();

cljs.core._STAR_ns_STAR_ = cljs.core.create_ns.call(null,ns);

cljs.tools.reader._STAR_alias_map_STAR_ = cljs.js.current_alias_map.call(null);

cljs.tools.reader._STAR_data_readers_STAR_ = new cljs.core.Keyword(null,"*data-readers*","*data-readers*",-371480469).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.tools.reader.resolve_symbol = cljs.js.resolve_symbol;

cljs.compiler._STAR_source_map_data_STAR_ = new cljs.core.Keyword(null,"*sm-data*","*sm-data*",1341435219).cljs$core$IFn$_invoke$arity$1(bound_vars__$1);

cljs.analyzer._STAR_cljs_file_STAR_ = new cljs.core.Keyword(null,"cljs-file","cljs-file",-1499001049).cljs$core$IFn$_invoke$arity$1(opts);

try{var res = (function (){try{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),cljs.js.read.call(null,eof,rdr)], null);
}catch (e15230){var cause = e15230;
return cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,aenv,["Could not eval ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''),cause));
}})();
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res))){
return cb.call(null,res);
} else {
var form = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(res);
if(!((eof === form))){
var aenv__$1 = (function (){var G__15231 = cljs.core.assoc.call(null,aenv,new cljs.core.Keyword(null,"ns","ns",441598760),cljs.analyzer.get_namespace.call(null,ns));
var G__15231__$1 = (cljs.core.truth_(new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(opts))?cljs.core.assoc.call(null,G__15231,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(opts)):G__15231);
if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.core.assoc.call(null,G__15231__$1,new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320),true);
} else {
return G__15231__$1;
}
})();
var res__$1 = (function (){try{return new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),cljs.analyzer.analyze.call(null,aenv__$1,form,null,opts)], null);
}catch (e15232){var cause = e15232;
return cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,aenv__$1,["Could not eval ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''),cause));
}})();
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$1))){
return cb.call(null,res__$1);
} else {
var ast = new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(res__$1);
var ns_SINGLEQUOTE_ = cljs.analyzer._STAR_cljs_ns_STAR_;
var vec__15233 = ((cljs.core.keyword_identical_QMARK_.call(null,new cljs.core.Keyword(null,"target","target",253001721).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"nodejs","nodejs",321212524)))?(function (){var map__15236 = cljs.core.group_by.call(null,cljs.analyzer.node_module_dep_QMARK_,new cljs.core.Keyword(null,"deps","deps",1883360319).cljs$core$IFn$_invoke$arity$1(ast));
var map__15236__$1 = ((((!((map__15236 == null)))?((((map__15236.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15236.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15236):map__15236);
var node_libs = cljs.core.get.call(null,map__15236__$1,true);
var libs_to_load = cljs.core.get.call(null,map__15236__$1,false);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [node_libs,cljs.core.assoc.call(null,ast,new cljs.core.Keyword(null,"deps","deps",1883360319),libs_to_load)], null);
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,ast], null));
var node_deps = cljs.core.nth.call(null,vec__15233,(0),null);
var ast__$1 = cljs.core.nth.call(null,vec__15233,(1),null);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ns*","ns*",200417856),null,new cljs.core.Keyword(null,"ns","ns",441598760),null], null), null).call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(ast__$1)))){
sb.append((function (){var sb__9801__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15238_15244 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15239_15245 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (ns,_STAR_print_newline_STAR_15238_15244,_STAR_print_fn_STAR_15239_15245,sb__9801__auto__,ast,ns_SINGLEQUOTE_,vec__15233,node_deps,ast__$1,aenv__$1,res__$1,form,res,_STAR_compiler_STAR_15218,_STAR_eval_fn_STAR_15219,_STAR_cljs_ns_STAR_15220,_STAR_checked_arrays_STAR_15221,_STAR_cljs_static_fns_STAR_15222,_STAR_fn_invoke_direct_STAR_15223,_STAR_ns_STAR_15224,_STAR_alias_map_STAR_15225,_STAR_data_readers_STAR_15226,resolve_symbol15227,_STAR_source_map_data_STAR_15228,_STAR_cljs_file_STAR_15229,rdr,eof,aenv,sb,the_ns,bound_vars__$1,aname){
return (function (x__9802__auto__){
return sb__9801__auto__.append(x__9802__auto__);
});})(ns,_STAR_print_newline_STAR_15238_15244,_STAR_print_fn_STAR_15239_15245,sb__9801__auto__,ast,ns_SINGLEQUOTE_,vec__15233,node_deps,ast__$1,aenv__$1,res__$1,form,res,_STAR_compiler_STAR_15218,_STAR_eval_fn_STAR_15219,_STAR_cljs_ns_STAR_15220,_STAR_checked_arrays_STAR_15221,_STAR_cljs_static_fns_STAR_15222,_STAR_fn_invoke_direct_STAR_15223,_STAR_ns_STAR_15224,_STAR_alias_map_STAR_15225,_STAR_data_readers_STAR_15226,resolve_symbol15227,_STAR_source_map_data_STAR_15228,_STAR_cljs_file_STAR_15229,rdr,eof,aenv,sb,the_ns,bound_vars__$1,aname))
;

try{cljs.compiler.emitln.call(null,["goog.provide(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ast__$1))),"\");"].join(''));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15239_15245;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15238_15244;
}
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__9801__auto__)].join('');
})());

return cljs.js.ns_side_effects.call(null,true,bound_vars__$1,aenv__$1,ast__$1,opts,((function (ns,ast,ns_SINGLEQUOTE_,vec__15233,node_deps,ast__$1,aenv__$1,res__$1,form,res,_STAR_compiler_STAR_15218,_STAR_eval_fn_STAR_15219,_STAR_cljs_ns_STAR_15220,_STAR_checked_arrays_STAR_15221,_STAR_cljs_static_fns_STAR_15222,_STAR_fn_invoke_direct_STAR_15223,_STAR_ns_STAR_15224,_STAR_alias_map_STAR_15225,_STAR_data_readers_STAR_15226,resolve_symbol15227,_STAR_source_map_data_STAR_15228,_STAR_cljs_file_STAR_15229,rdr,eof,aenv,sb,the_ns,bound_vars__$1,aname){
return (function (res__$2){
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$2))){
return cb.call(null,res__$2);
} else {
var ns_name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(ast__$1);
if((node_deps == null)){
} else {
cljs.js.node_side_effects.call(null,bound_vars__$1,sb,node_deps,ns_name,new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(opts));
}

cljs.js.global_exports_side_effects.call(null,bound_vars__$1,sb,cljs.core.filter.call(null,cljs.analyzer.dep_has_global_exports_QMARK_,new cljs.core.Keyword(null,"deps","deps",1883360319).cljs$core$IFn$_invoke$arity$1(ast__$1)),ns_name,new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(opts));

return cljs$js$eval_str_STAR__$_compile_loop.call(null,ns_SINGLEQUOTE_);
}
});})(ns,ast,ns_SINGLEQUOTE_,vec__15233,node_deps,ast__$1,aenv__$1,res__$1,form,res,_STAR_compiler_STAR_15218,_STAR_eval_fn_STAR_15219,_STAR_cljs_ns_STAR_15220,_STAR_checked_arrays_STAR_15221,_STAR_cljs_static_fns_STAR_15222,_STAR_fn_invoke_direct_STAR_15223,_STAR_ns_STAR_15224,_STAR_alias_map_STAR_15225,_STAR_data_readers_STAR_15226,resolve_symbol15227,_STAR_source_map_data_STAR_15228,_STAR_cljs_file_STAR_15229,rdr,eof,aenv,sb,the_ns,bound_vars__$1,aname))
);
} else {
var env__11386__auto___15246 = cljs.core.assoc.call(null,cljs.core.deref.call(null,new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089).cljs$core$IFn$_invoke$arity$1(bound_vars__$1)),new cljs.core.Keyword(null,"options","options",99638489),opts);
var env__11386__auto___15247__$1 = ((cljs.core.map_QMARK_.call(null,env__11386__auto___15246))?cljs.core.atom.call(null,env__11386__auto___15246):((((env__11386__auto___15246 instanceof cljs.core.Atom)) && (cljs.core.map_QMARK_.call(null,cljs.core.deref.call(null,env__11386__auto___15246))))?env__11386__auto___15246:(function(){throw (new Error(["Compiler environment must be a map or atom containing a map, not ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type.call(null,env__11386__auto___15246))].join('')))})()
));
var _STAR_compiler_STAR_15240_15248 = cljs.env._STAR_compiler_STAR_;
cljs.env._STAR_compiler_STAR_ = env__11386__auto___15247__$1;

try{sb.append((function (){var sb__9801__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15241_15249 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15242_15250 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (ns,_STAR_print_newline_STAR_15241_15249,_STAR_print_fn_STAR_15242_15250,sb__9801__auto__,_STAR_compiler_STAR_15240_15248,env__11386__auto___15246,env__11386__auto___15247__$1,ast,ns_SINGLEQUOTE_,vec__15233,node_deps,ast__$1,aenv__$1,res__$1,form,res,_STAR_compiler_STAR_15218,_STAR_eval_fn_STAR_15219,_STAR_cljs_ns_STAR_15220,_STAR_checked_arrays_STAR_15221,_STAR_cljs_static_fns_STAR_15222,_STAR_fn_invoke_direct_STAR_15223,_STAR_ns_STAR_15224,_STAR_alias_map_STAR_15225,_STAR_data_readers_STAR_15226,resolve_symbol15227,_STAR_source_map_data_STAR_15228,_STAR_cljs_file_STAR_15229,rdr,eof,aenv,sb,the_ns,bound_vars__$1,aname){
return (function (x__9802__auto__){
return sb__9801__auto__.append(x__9802__auto__);
});})(ns,_STAR_print_newline_STAR_15241_15249,_STAR_print_fn_STAR_15242_15250,sb__9801__auto__,_STAR_compiler_STAR_15240_15248,env__11386__auto___15246,env__11386__auto___15247__$1,ast,ns_SINGLEQUOTE_,vec__15233,node_deps,ast__$1,aenv__$1,res__$1,form,res,_STAR_compiler_STAR_15218,_STAR_eval_fn_STAR_15219,_STAR_cljs_ns_STAR_15220,_STAR_checked_arrays_STAR_15221,_STAR_cljs_static_fns_STAR_15222,_STAR_fn_invoke_direct_STAR_15223,_STAR_ns_STAR_15224,_STAR_alias_map_STAR_15225,_STAR_data_readers_STAR_15226,resolve_symbol15227,_STAR_source_map_data_STAR_15228,_STAR_cljs_file_STAR_15229,rdr,eof,aenv,sb,the_ns,bound_vars__$1,aname))
;

try{cljs.compiler.emit.call(null,ast__$1);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15242_15250;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15241_15249;
}
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__9801__auto__)].join('');
})());
}finally {cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_15240_15248;
}
var G__15251 = ns_SINGLEQUOTE_;
ns = G__15251;
continue;
}
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"source-map","source-map",1706252311).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.append_source_map.call(null,cljs.env._STAR_compiler_STAR_,aname,source,sb,cljs.core.deref.call(null,cljs.compiler._STAR_source_map_data_STAR_),opts);
} else {
}

if((aname instanceof cljs.core.Symbol)){
cljs.analyzer.dump_specs.call(null,aname);
} else {
}

var js_source = sb.toString();
var evalm = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"lang","lang",-1819677104),new cljs.core.Keyword(null,"clj","clj",-660495428),new cljs.core.Keyword(null,"name","name",1843675177),name,new cljs.core.Keyword(null,"path","path",-188191168),cljs.js.ns__GT_relpath.call(null,name),new cljs.core.Keyword(null,"source","source",-433931539),js_source,new cljs.core.Keyword(null,"cache","cache",-1237023054),cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),aname], null))], null);
var complete = ((function (ns,js_source,evalm,form,res,_STAR_compiler_STAR_15218,_STAR_eval_fn_STAR_15219,_STAR_cljs_ns_STAR_15220,_STAR_checked_arrays_STAR_15221,_STAR_cljs_static_fns_STAR_15222,_STAR_fn_invoke_direct_STAR_15223,_STAR_ns_STAR_15224,_STAR_alias_map_STAR_15225,_STAR_data_readers_STAR_15226,resolve_symbol15227,_STAR_source_map_data_STAR_15228,_STAR_cljs_file_STAR_15229,rdr,eof,aenv,sb,the_ns,bound_vars__$1,aname){
return (function (res__$1){
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(res__$1))){
return cb.call(null,res__$1);
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
cljs.js.debug_prn.call(null,js_source);
} else {
}

var res__$2 = (function (){try{return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ns","ns",441598760),ns,new cljs.core.Keyword(null,"value","value",305978217),cljs.js._STAR_eval_fn_STAR_.call(null,evalm)], null);
}catch (e15243){var cause = e15243;
return cljs.js.wrap_error.call(null,cljs.analyzer.error.call(null,aenv,"ERROR",cause));
}})();
return cb.call(null,res__$2);
}
});})(ns,js_source,evalm,form,res,_STAR_compiler_STAR_15218,_STAR_eval_fn_STAR_15219,_STAR_cljs_ns_STAR_15220,_STAR_checked_arrays_STAR_15221,_STAR_cljs_static_fns_STAR_15222,_STAR_fn_invoke_direct_STAR_15223,_STAR_ns_STAR_15224,_STAR_alias_map_STAR_15225,_STAR_data_readers_STAR_15226,resolve_symbol15227,_STAR_source_map_data_STAR_15228,_STAR_cljs_file_STAR_15229,rdr,eof,aenv,sb,the_ns,bound_vars__$1,aname))
;
var temp__5455__auto__ = new cljs.core.Keyword(null,"cache-source","cache-source",-190922003).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(temp__5455__auto__)){
var f = temp__5455__auto__;
return f.call(null,evalm,complete);
} else {
return complete.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"value","value",305978217),null], null));
}
}
}
}finally {cljs.analyzer._STAR_cljs_file_STAR_ = _STAR_cljs_file_STAR_15229;

cljs.compiler._STAR_source_map_data_STAR_ = _STAR_source_map_data_STAR_15228;

cljs.tools.reader.resolve_symbol = resolve_symbol15227;

cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_15226;

cljs.tools.reader._STAR_alias_map_STAR_ = _STAR_alias_map_STAR_15225;

cljs.core._STAR_ns_STAR_ = _STAR_ns_STAR_15224;

cljs.analyzer._STAR_fn_invoke_direct_STAR_ = _STAR_fn_invoke_direct_STAR_15223;

cljs.analyzer._STAR_cljs_static_fns_STAR_ = _STAR_cljs_static_fns_STAR_15222;

cljs.analyzer._STAR_checked_arrays_STAR_ = _STAR_checked_arrays_STAR_15221;

cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_15220;

cljs.js._STAR_eval_fn_STAR_ = _STAR_eval_fn_STAR_15219;

cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_15218;
}break;
}
});})(rdr,eof,aenv,sb,the_ns,bound_vars__$1,aname))
.call(null,new cljs.core.Keyword(null,"*cljs-ns*","*cljs-ns*",565777432).cljs$core$IFn$_invoke$arity$1(bound_vars__$1));
});
/**
 * Evalute ClojureScript source given as a string. The parameters:
 * 
 *   state (atom)
 *  the compiler state
 * 
 *   source (string)
 *  the ClojureScript source
 * 
 *   name (symbol or string)
 *  optional, the name of the source
 * 
 *   opts (map)
 *  compilation options.
 * 
 *  :eval             - eval function to invoke, see *eval-fn*
 *  :load             - library resolution function, see *load-fn*
 *  :source-map       - set to true to generate inline source map information
 *  :cache-source     - optional, a function to run side-effects with the
 *                      compilation result prior to actual evalution. This function
 *                      takes two arguments, the first is the eval map, the source
 *                      will be under :source. The second argument is a callback of
 *                      one argument. If an error occurs an :error key should be
 *                      supplied.
 *  :def-emits-var    - sets whether def (and derived) forms return either a Var
 *                      (if set to true) or the def init value (if false). Default
 *                      is false.
 *  :checked-arrays   - if :warn or :error, checks inferred types and values passed
 *                      to aget/aset. Logs for incorrect values if :warn, throws if
 *                      :error. Defaults to false.
 *  :static-fns       - employ static dispatch to specific function arities in
 *                      emitted JavaScript, as opposed to making use of the
 *                      `call` construct. Defaults to false.
 *  :fn-invoke-direct - if `true`, does not generate `.call(null...)` calls for
 *                      unknown functions, but instead direct invokes via
 *                      `f(a0,a1...)`. Defaults to `false`.
 *  :target           - use `:nodejs` if targeting Node.js. Takes no other options
 *                      at the moment.
 *  :ns               - optional, the namespace in which to evaluate the source.
 *  :verbose          - optional, emit details from compiler activity. Defaults to
 *                      false.
 *  :context          - optional, sets the context for the source. Possible values
 *                   are `:expr`, `:statement` and `:return`. Defaults to
 *                    `:expr`.
 * 
 *   cb (function)
 *  callback, will be invoked with a map. If succesful the map will contain
 *  a :value key with the result of evaluation and :ns the current namespace.
 *  If unsuccessful will contain a :error key with an ex-info instance describing
 *  the cause of failure.
 */
cljs.js.eval_str = (function cljs$js$eval_str(var_args){
var G__15253 = arguments.length;
switch (G__15253) {
case 3:
return cljs.js.eval_str.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.js.eval_str.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.js.eval_str.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.js.eval_str.cljs$core$IFn$_invoke$arity$3 = (function (state,source,cb){
return cljs.js.eval_str.call(null,state,source,null,cb);
});

cljs.js.eval_str.cljs$core$IFn$_invoke$arity$4 = (function (state,source,name,cb){
return cljs.js.eval_str.call(null,state,source,name,null,cb);
});

cljs.js.eval_str.cljs$core$IFn$_invoke$arity$5 = (function (state,source,name,opts,cb){
if(cljs.core.truth_(cljs.js.atom_QMARK_.call(null,state))){
} else {
throw (new Error("Assert failed: (atom? state)"));
}

if(typeof source === 'string'){
} else {
throw (new Error("Assert failed: (string? source)"));
}

if(cljs.core.truth_(cljs.js.valid_name_QMARK_.call(null,name))){
} else {
throw (new Error("Assert failed: (valid-name? name)"));
}

if(cljs.core.truth_(cljs.js.valid_opts_QMARK_.call(null,opts))){
} else {
throw (new Error("Assert failed: (valid-opts? opts)"));
}

if(cljs.core.fn_QMARK_.call(null,cb)){
} else {
throw (new Error("Assert failed: (fn? cb)"));
}

return cljs.js.eval_str_STAR_.call(null,new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"*compiler*","*compiler*",-168190089),state,new cljs.core.Keyword(null,"*data-readers*","*data-readers*",-371480469),cljs.tagged_literals._STAR_cljs_data_readers_STAR_,new cljs.core.Keyword(null,"*analyze-deps*","*analyze-deps*",-29540427),new cljs.core.Keyword(null,"analyze-deps","analyze-deps",1000677285).cljs$core$IFn$_invoke$arity$2(opts,true),new cljs.core.Keyword(null,"*cljs-dep-set*","*cljs-dep-set*",-73964612),cljs.analyzer._STAR_cljs_dep_set_STAR_,new cljs.core.Keyword(null,"*load-macros*","*load-macros*",640729006),new cljs.core.Keyword(null,"load-macros","load-macros",459797395).cljs$core$IFn$_invoke$arity$2(opts,true),new cljs.core.Keyword(null,"*load-fn*","*load-fn*",2055642106),(function (){var or__8674__auto__ = new cljs.core.Keyword(null,"load","load",-1318641184).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return cljs.js._STAR_load_fn_STAR_;
}
})(),new cljs.core.Keyword(null,"*eval-fn*","*eval-fn*",-217221128),(function (){var or__8674__auto__ = new cljs.core.Keyword(null,"eval","eval",-1103567905).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__8674__auto__)){
return or__8674__auto__;
} else {
return cljs.js._STAR_eval_fn_STAR_;
}
})()], null),source,name,opts,cb);
});

cljs.js.eval_str.cljs$lang$maxFixedArity = 5;


//# sourceMappingURL=js.js.map