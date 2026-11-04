var u = $request.url || '';
var ds = '';
try { ds = (new URL(u)).searchParams.get('dataSets') || ''; } catch(e) {}
// 把每次请求的 URL 摘要写进一个特殊响应头
$done({ headers: Object.assign({}, $request.headers||{}, {
  'X-WK-Req': 'ds=' + ds + ' len=' + u.length + ' path=' + u.slice(24, 70)
}) });
