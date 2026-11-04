// 只处理 forecastNextHour 单独请求，不改写任何东西，只标记
$done({ headers: (function(){var h=$request.headers||{};h['X-WK-Matched']='1';return h;})() });
