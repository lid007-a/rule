var u = $request.url || '';
var ds = '';
try { ds = (new URL(u)).searchParams.get('dataSets') || ''; } catch(e) {}
var rec = 'ds=' + ds + ' :: ' + u.slice(0, 300);
// 追加到存储（按时间倒序，最多留 20 条）
var prev = $persistentStore.read('wk_reqs') || '';
$persistentStore.write((rec + '\n' + prev).split('\n').slice(0,20).join('\n'), 'wk_reqs');
$done({});
