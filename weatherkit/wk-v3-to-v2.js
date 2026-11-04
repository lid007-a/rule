// iOS 27.3 的 WeatherKit v3 请求 → 改写为 v2。
// Apple 在 v2 下会返回 App 需要的 forecastNextHour 数据集，官方模块的 v2 逻辑原样生效。
(function () {
  var u = $request.url || '';
  var h = $request.headers || {};
  if (u.indexOf('/api/v3/weather/') < 0) { $done({}); return; }

  var V2 = ['airQuality','currentWeather','forecastDaily','forecastHourly','forecastNextHour','weatherAlerts'];

  u = u.replace('/api/v3/weather/', '/api/v2/weather/');
  try {
    var url = new URL(u);
    var ds = (url.searchParams.get('dataSets') || '').split(',').filter(function (x) { return V2.indexOf(x) >= 0; });
    url.searchParams.set('dataSets', ds.join(','));
    ['periodicStart','periodicEnd','periodLengths'].forEach(function (k) { url.searchParams.delete(k); });
    u = url.toString();
  } catch (e) {}

  for (var k in h) {
    var lk = k.toLowerCase();
    if (lk === 'accept') h[k] = 'application/vnd.apple.flatbuffer;messageType=WK2.Weather';
    else if (lk === 'x-schema-version') h[k] = 'lib-rc-2.1.23-b65';
  }
  $done({ url: u, headers: h });
})();
