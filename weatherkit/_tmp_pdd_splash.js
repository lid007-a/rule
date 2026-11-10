// 拼多多去开屏广告
// 匹配 /api/cappuccino/splash，把 splash_list 置空、valid_splash_id 归零。
// 只做这一件事，遇到任何异常都原样返回，不影响 App 启动。

(function () {
  try {
    var body = $response && $response.body;
    if (!body) { $done({}); return; }

    var obj = JSON.parse(body);

    // 兼容顶层或 result 包裹两种结构
    var target = obj;
    if (obj && obj.result && typeof obj.result === 'object' && ('splash_list' in obj.result)) {
      target = obj.result;
    }

    if (target && Array.isArray(target.splash_list) && target.splash_list.length > 0) {
      var names = target.splash_list.map(function (x) { return x && x.name; }).join(', ');
      target.splash_list = [];
      target.size = 0;
      if ('valid_splash_id' in target) target.valid_splash_id = 0;
      console.log('[拼多多去开屏] 已清除 ' + names);
      $done({ body: JSON.stringify(obj) });
      return;
    }

    $done({});
  } catch (e) {
    console.log('[拼多多去开屏] 异常，原样返回: ' + e);
    $done({});
  }
})();
