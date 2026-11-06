/**
 * WeatherKit WK3 预警详情页数据提供
 * 拦截 api/v1/weatherAlerts?ids=lat,lon，返回苹果 alertDetails 期望的 JSON
 * 支持 WeatherKit / QWeatherWeb / QWeather / ColorfulClouds
 */
'use strict';

function __arg(k, d) {
  try {
    const m = (globalThis.$argument || '').match(
      new RegExp('(?:^|&)' + k.replace(/\./g, '\\.') + '=([^&]*)'));
    if (m) return decodeURIComponent(m[1]);
  } catch (e) {}
  return d;
}

/* ============ WK3 预警：详情页请求拦截（http-request） ============ */
/* 拦截 api/v1/weatherAlerts?ids=lat,lon，返回苹果 alertDetails 期望的 JSON */

(function () {
  function arg(k, d) { return __arg(k, d); }
  function httpGet(u, o) {
    if (typeof $httpClient !== 'undefined' && $httpClient.get) return $httpClient.get(u, o);
    if (typeof fetch !== 'undefined') return fetch(u, o);
    return Promise.reject(new Error('no http client'));
  }
  function textOf(res) {
    var st = res.status != null ? res.status : res.statusCode;
    var p = typeof res.text === 'function' ? res.text()
          : (typeof res.body === 'string' ? Promise.resolve(res.body) : Promise.resolve(''));
    return Promise.resolve(p).then(function (t) { return { status: st, text: String(t) }; });
  }

  function hash32(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return h >>> 0;
  }
  function makeId(seed) {
    var hex = function (n, w) { return (n >>> 0).toString(16).padStart(w, '0').slice(-w); };
    return hex(hash32(seed), 8) + '-' + hex(hash32(seed + '#2') >>> 16, 4) + '-4' +
           hex(hash32(seed + '#2') & 0xfff, 3) + '-a' + hex(hash32(seed + '#3') & 0xfff, 3) +
           '-' + hex(hash32(seed + '#4'), 8);
  }
  function sevOf(t) {
    t = String(t || '');
    if (/红色|特别重大/.test(t)) return 'extreme';
    if (/橙色|重大/.test(t)) return 'severe';
    if (/黄色|较大/.test(t)) return 'moderate';
    if (/蓝色|一般/.test(t)) return 'minor';
    return 'unknown';
  }
  function imp(sev) {
    if (sev === 'extreme' || sev === 'severe') return 'high';
    if (sev === 'minor') return 'low';
    return 'normal';
  }
  function iso(v) {
    if (!v) return undefined;
    var d = new Date(v);
    if (isNaN(d.getTime())) return undefined;
    return d.toISOString().replace(/\.000Z$/, 'Z');
  }

  function parsePage(html) {
    var t = String(html || '');
    function pick(re) {
      var m = t.match(re);
      return m ? String(m[1]).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim() : '';
    }
    var location = pick(/<h1[^>]*class=["'][^"']*c-submenu__location[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i);
    if (!location) {
      location = pick(/<title>([\s\S]*?)<\/title>/i)
        .replace(/\s*(?:severe weather warning|灾害预警|天气预警).*$/i, '').trim();
    }
    var source = pick(/<a[^>]*class=["'][^"']*data-source__txt[^"']*["'][^>]*>([\s\S]*?)<\/a>/i)
      .replace(/^(?:预警数据来源|Warning data source)\s*[:：]\s*/i, '').trim();

    var marks = [], re = /<div[^>]*class=["']([^"']*\bc-city-warning-events\b[^"']*)["'][^>]*>/gi, m;
    while ((m = re.exec(t))) marks.push({ index: m.index, start: m.index + m[0].length });

    var out = [];
    for (var i = 0; i < marks.length; i++) {
      var end = (i + 1 < marks.length) ? marks[i + 1].index : t.length;
      var ai = t.indexOf('<div class="c-city-warning-around">', marks[i].start);
      if (ai !== -1 && ai < end) end = ai;
      var seg = t.slice(marks[i].start, end);
      function pk(re2) {
        var mm = seg.match(re2);
        return mm ? String(mm[1]).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim() : '';
      }
      var title = pk(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
      var issued = pk(/<p[^>]*>\s*((?:Issue\s+date|发布\s*日期)\s*[:：][\s\S]*?)<\/p>/i)
        .replace(/^(?:Issue\s+date|发布\s*日期)\s*[:：]\s*/i, '').trim();
      var desc = pk(/<p[^>]*class=["'][^"']*warning-events__txt[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
      var crit = '';
      var em = seg.match(/<div[^>]*class=["'][^"']*warning-explain[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
      if (em) {
        var cm = em[1].match(/<h4[^>]*>[\s\S]*?<\/h4>\s*<p[^>]*>([\s\S]*?)<\/p>/i);
        if (cm) crit = String(cm[1]).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      }
      var dfn = pk(/<div[^>]*class=["'][^"']*warning-defense__txt[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
      if (!title && !desc) continue;
      out.push({ title: title, issued: issued, desc: desc, crit: crit, dfn: dfn });
    }
    return { location: location, source: source, alerts: out };
  }

  function fromPage(page, ctx) {
    return page.alerts.map(function (a, i) {
      var id = makeId(ctx.identifier + ':' + (a.title || i));
      var sev = sevOf(a.title);
      var msgs = [];
      if (a.desc) msgs.push({ language: ctx.language, text: a.desc });
      if (a.crit) msgs.push({ language: ctx.language, text: '触发条件：' + a.crit });
      if (a.dfn) msgs.push({ language: ctx.language, text: '防御指引：\n' + a.dfn });
      var t = iso(a.issued);
      return {
        id: id, areaName: page.location || ctx.areaName,
        attributionURL: ctx.attributionUrl, certainty: 'unknown',
        countryCode: ctx.countryCode || 'CN',
        description: a.desc || a.title, detailsUrl: '#' + id,
        effectiveTime: t, eventSource: 'CN',
        expireTime: '9999-12-31T23:59:59Z', issuedTime: t,
        importance: imp(sev), messages: msgs, name: 'WeatherAlert',
        phenomenon: (a.title || '').replace(/^.*?发布\s*/, '').replace(/(?:红色|橙色|黄色|蓝色)?预警.*$/, '') || undefined,
        precedence: i, responses: [], severity: sev,
        source: page.source || ctx.source || '', urgency: 'unknown',
      };
    });
  }

  function fromApi(api, ctx) {
    return (api || []).map(function (a, i) {
      var id = makeId(ctx.identifier + ':' + (a.id || i));
      var sev = a.severity || 'unknown';
      var msgs = [];
      if (a.headline) msgs.push({ language: ctx.language, text: a.headline });
      if (a.description && a.description !== a.headline) msgs.push({ language: ctx.language, text: a.description });
      if (a.criteria) msgs.push({ language: ctx.language, text: '触发条件：' + a.criteria });
      if (a.instruction) msgs.push({ language: ctx.language, text: '防御指引：\n' + a.instruction });
      return {
        id: id, areaId: a.areaId, areaName: a.areaName || ctx.areaName,
        attributionURL: ctx.attributionUrl, certainty: a.certainty || 'unknown',
        countryCode: ctx.countryCode || 'CN',
        description: a.headline || a.description || '', detailsUrl: '#' + id,
        effectiveTime: iso(a.effectiveTime || a.issuedTime),
        eventEndTime: iso(a.expireTime),
        eventOnsetTime: iso(a.onsetTime || a.effectiveTime),
        eventSource: 'CN',
        expireTime: iso(a.expireTime) || '9999-12-31T23:59:59Z',
        issuedTime: iso(a.issuedTime || a.effectiveTime),
        importance: imp(sev), messages: msgs, name: 'WeatherAlert',
        phenomenon: (a.eventType && a.eventType.name) || a.phenomenon,
        precedence: i, responses: [], severity: sev,
        source: a.senderName || ctx.source || '', urgency: a.urgency || 'unknown',
      };
    });
  }

  function fromCaiyun(cy, ctx) {
    var arr = (cy && cy.content) || [];
    return arr.map(function (a, i) {
      var id = makeId(ctx.identifier + ':' + (a.id || i));
      var sev = String(a.severity || 'unknown').toLowerCase();
      if (['extreme', 'severe', 'moderate', 'minor'].indexOf(sev) < 0) sev = 'unknown';
      var msgs = [];
      var d = a.description || a.title;
      if (d) msgs.push({ language: ctx.language, text: String(d) });
      return {
        id: id, areaName: a.location || ctx.areaName,
        attributionURL: ctx.attributionUrl, certainty: 'unknown',
        countryCode: ctx.countryCode || 'CN',
        description: String(d || ''), detailsUrl: '#' + id,
        effectiveTime: iso(a.startTime), eventEndTime: iso(a.endTime),
        eventOnsetTime: iso(a.startTime), eventSource: 'CN',
        expireTime: iso(a.endTime) || '9999-12-31T23:59:59Z',
        issuedTime: iso(a.startTime), importance: imp(sev),
        messages: msgs, name: 'WeatherAlert',
        phenomenon: a.type || a.title, precedence: i, responses: [],
        severity: sev, source: ctx.source || '彩云天气', urgency: 'unknown',
      };
    });
  }

  /* ---------- 主处理 ---------- */
  globalThis.__alertsDetailsRequest = function (url) {
    return (async function () {
      var u = new URL(url);
      if (u.hostname !== 'weatherkit.apple.com') return null;
      if (u.pathname !== '/api/v1/weatherAlerts') return null;

      var ids = (u.searchParams.get('ids') || '').trim();
      if (!ids) return null;

      var prov = arg('WeatherAlerts.Provider', 'QWeatherWeb');
      if (prov === 'WeatherKit') return null;

      var lang = (u.searchParams.get('lang') || 'zh-CN');
      var host = String(arg('API.QWeather.Host', '')).trim();
      var token = String(arg('API.QWeather.Token', '')).trim();
      var cyTok = String(arg('API.ColorfulClouds.Token', '')).trim() || 'Y2FpeXVuX25vdGlmeQ==';

      var ctx = {
        identifier: ids, language: lang, countryCode: 'CN',
        attributionUrl: prov === 'ColorfulClouds' ? 'https://www.caiyunapp.com/h5' : 'https://www.12379.cn/',
        source: prov === 'ColorfulClouds' ? '彩云天气' : '国家预警信息发布中心',
      };

      var alerts = [];
      var m = ids.match(/^(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$/);

      try {
        if (m) {
          var lat = parseFloat(m[1]), lon = parseFloat(m[2]);

          if (prov === 'ColorfulClouds') {
            var r1 = await textOf(await httpGet(
              'https://singer.caiyunhub.com/v3/cap_alert/location?token=' + encodeURIComponent(cyTok) +
              '&latitude=' + lat.toFixed(4) + '&longitude=' + lon.toFixed(4),
              { headers: { 'User-Agent': 'curl/8.14.1' } }));
            if (r1.status === 200) {
              var j1 = JSON.parse(r1.text);
              alerts = fromCaiyun({ content: (j1 && j1.result && j1.result.alert) || [] }, ctx);
            }
          } else if (prov === 'QWeather') {
            var r2 = await textOf(await httpGet(
              'https://' + host + '/weatheralert/v1/current/' + lat.toFixed(2) + '/' + lon.toFixed(2) +
              '?key=' + encodeURIComponent(token) + '&lang=' + lang,
              { headers: { 'User-Agent': 'curl/8.14.1' } }));
            if (r2.status === 200) alerts = fromApi(JSON.parse(r2.text).alerts || [], ctx);
          } else if (prov === 'QWeatherWeb') {
            // 先反查地区 ID，再抓网页（含防御指引）
            var areaId = null;
            try {
              var g = await textOf(await httpGet(
                'https://' + host + '/geo/v2/city/lookup?location=' + lon.toFixed(2) + ',' + lat.toFixed(2) +
                '&key=' + encodeURIComponent(token),
                { headers: { 'User-Agent': 'curl/8.14.1' } }));
              if (g.status === 200) {
                var gj = JSON.parse(g.text);
                if (gj && gj.code === '200' && gj.location && gj.location[0]) areaId = gj.location[0].id;
              }
            } catch (_) {}

            if (areaId) {
              var isEn = String(lang).toLowerCase().indexOf('en') === 0;
              var hp = await textOf(await httpGet(
                'https://www.qweather.com' + (isEn ? '/en' : '') + '/severe-weather/' + areaId + '.html',
                { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', Accept: 'text/html' } }));
              if (hp.status === 200) {
                alerts = fromPage(parsePage(hp.text), ctx);
              }
            }
            // 网页失败则退回 API
            if (!alerts.length && host && token) {
              try {
                var r3 = await textOf(await httpGet(
                  'https://' + host + '/weatheralert/v1/current/' + lat.toFixed(2) + '/' + lon.toFixed(2) +
                  '?key=' + encodeURIComponent(token) + '&lang=' + lang,
                  { headers: { 'User-Agent': 'curl/8.14.1' } }));
                if (r3.status === 200) alerts = fromApi(JSON.parse(r3.text).alerts || [], ctx);
              } catch (_) {}
            }
          }
        }
      } catch (e) {
        return { status: 200, statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'max-age=0', 'Content-Type': 'application/json' },
          body: '[]' };
      }

      return {
        status: 200, statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'max-age=0',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alerts),
      };
    })();
  };
})();


/* ---------- Surge 入口 ---------- */
if (typeof $request !== 'undefined') {
  (async () => {
    try {
      const r = await globalThis.__alertsDetailsRequest($request.url);
      if (r) $done(r);
      else $done({});
    } catch (e) {
      console.log('[WK3AlertDetail] ' + (e && e.message ? e.message : e));
      $done({});
    }
  })();
}
