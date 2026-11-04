var u = $request.url;
var h = $request.headers || {};
u = u.replace('/api/v3/weather/', '/api/v2/weather/');
for (var k in h) {
  var lk = k.toLowerCase();
  if (lk === 'accept') h[k] = 'application/vnd.apple.flatbuffer;messageType=WK2.Weather';
  if (lk === 'x-schema-version') h[k] = 'lib-rc-2.1.23-b65';
}
$done({ url: u, headers: h });
