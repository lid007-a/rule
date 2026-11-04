var u = $request.url || '';
var h = $request.headers || {};
var tok = h.authorization || h.Authorization || '';
var ds = '';
try { ds = (new URL(u)).searchParams.get('dataSets') || ''; } catch(e) {}
$done({
  url: u,
  headers: Object.assign({}, h, { 'X-WK-Probe': (ds||'?') + '|' + tok.slice(0,24) + '|' + u.length })
});
