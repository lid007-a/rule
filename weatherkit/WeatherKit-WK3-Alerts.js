/**
 * WK3 预警增强 —— 和风 API → WeatherAlertCollectionData（生产版）
 *
 * 实测结构见 WK3-weatherAlerts-结构.md
 * 和风接口：GET /weatheralert/v1/current/{lat}/{lon}?key=xxx&lang=zh
 */

/* ================= 工具 ================= */
const _f32v = new DataView(new ArrayBuffer(4));
function f32bits(v) { _f32v.setFloat32(0, Number(v) || 0, true); return _f32v.getUint32(0, true); }

function sevCode(s) {
  return { extreme: 1, severe: 2, moderate: 3, minor: 4 }[String(s || '').toLowerCase()] || 0;
}
function urgCode(u) {
  return { immediate: 1, expected: 2, future: 3, past: 4 }[String(u || '').toLowerCase()] || 0;
}
function certCode(c) {
  return { observed: 1, likely: 2, possible: 3, unlikely: 4 }[String(c || '').toLowerCase()] || 0;
}
function toUnix(v) {
  if (!v) return 0;
  if (typeof v === 'number') return Math.round(v > 1e12 ? v / 1000 : v);
  const t = Date.parse(String(v));
  return isNaN(t) ? 0 : Math.round(t / 1000);
}
function utf8(s) {
  const out = [];
  s = String(s);
  for (let i = 0; i < s.length; i++) {
    let c = s.charCodeAt(i);
    if (c < 0x80) out.push(c);
    else if (c < 0x800) out.push(0xC0 | (c >> 6), 0x80 | (c & 63));
    else if (c >= 0xD800 && c <= 0xDBFF) {
      const c2 = s.charCodeAt(++i);
      const cp = 0x10000 + ((c - 0xD800) << 10) + (c2 - 0xDC00);
      out.push(0xF0 | (cp >> 18), 0x80 | ((cp >> 12) & 63), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63));
    } else out.push(0xE0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
  }
  return out;
}

/* ================= 字节流 ================= */
class Blob {
  constructor() { this.b = []; }
  get length() { return this.b.length; }
  align4() { while (this.b.length & 3) this.b.push(0); }
  u8(v) { this.b.push(v & 255); }
  u16(v) { this.b.push(v & 255, (v >>> 8) & 255); }
  u32(v) { this.b.push(v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255); }
  u32at(p, v) {
    this.b[p] = v & 255; this.b[p + 1] = (v >>> 8) & 255;
    this.b[p + 2] = (v >>> 16) & 255; this.b[p + 3] = (v >>> 24) & 255;
  }
  str(s) {
    const e = utf8(s);
    this.align4();
    const p = this.b.length;
    this.u32(e.length);
    for (let i = 0; i < e.length; i++) this.b.push(e[i]);
    this.b.push(0);
    return p;
  }
  ref(p, target) { this.u32at(p, (target - p) >>> 0); }
}

/* ================= metadata 表 ================= */
function buildMetadata(blob, o) {
  const hasSource = !!(o.source && o.source.length);
  const hasLang = !!(o.language && o.language.length);
  const order = hasSource ? [8, 7, 6, 4, 3, 2, 1, 0] : [8, 7, 4, 3, 2, 1, 0];
  const offs = {};
  let cur = 8;
  for (const sl of order) { offs[sl] = cur; cur += 4; }
  offs[10] = 7;
  if (!hasLang) delete offs[2];
  const tsize = Math.ceil(cur / 4) * 4;

  blob.align4();
  const vt = blob.length;
  blob.u16(4 + 2 * 11); blob.u16(tsize);
  for (let i = 0; i < 11; i++) blob.u16(offs[i] || 0);
  const tb = blob.length;
  for (let i = 0; i < tsize; i++) blob.u8(0);
  blob.u32at(tb, tb - vt);

  blob.u32at(tb + offs[1], toUnix(o.issuedTime) >>> 0);
  blob.u32at(tb + offs[3], f32bits(o.latitude));
  blob.u32at(tb + offs[4], f32bits(o.longitude));
  blob.u32at(tb + offs[7], toUnix(o.effectiveTime) >>> 0);
  blob.u32at(tb + offs[8], toUnix(o.expireTime) >>> 0);
  blob.b[tb + offs[10]] = (o.flag == null ? 3 : o.flag) & 255;

  return { tb, offs, hasSource, hasLang, tsize };
}

/* ================= alert 摘要表 ================= */
function buildAlertSummary(blob, a) {
  const NF = 26;
  const f = {};
  const S = (slot, v) => { if (v != null && v !== '') f[slot] = { k: 'str', v: String(v) }; };
  const N = (slot, v) => { if (v != null && v !== 0) f[slot] = { k: 'i32', v: v | 0 }; };
  const B = (slot, v) => { if (v != null) f[slot] = { k: 'i8', v: v | 0 }; };

  S(0, a.id);
  S(1, a.areaId);
  S(2, a.areaName);
  S(3, a.attributionUrl);
  S(4, a.countryCode);
  S(5, a.description);
  S(6, a.token);
  N(7, toUnix(a.effectiveTime));
  N(8, toUnix(a.expireTime));
  N(9, toUnix(a.issuedTime));
  N(10, toUnix(a.onsetTime || a.effectiveTime));
  N(11, a.endTime ? toUnix(a.endTime) : 0);
  S(12, a.detailsUrl);
  S(13, a.phenomenon);
  B(14, a.severityCode);
  B(15, a.significanceCode);
  S(16, a.source);
  S(17, a.eventSource);
  B(18, a.urgencyCode);
  B(19, a.certaintyCode);
  B(20, a.importanceCode);

  const slots = Object.keys(f).map(Number).sort((x, y) => x - y);
  let cur = 4;
  const offs = {};
  const u8s = slots.filter(s => f[s].k === 'i8');
  const bigs = slots.filter(s => f[s].k !== 'i8');
  for (const s of u8s) { offs[s] = cur; cur += 1; }
  for (const s of bigs) { offs[s] = cur; cur += 4; }
  const tsize = cur;

  blob.align4();
  const vt = blob.length;
  blob.u16(4 + 2 * NF); blob.u16(tsize);
  for (let i = 0; i < NF; i++) blob.u16(offs[i] || 0);
  const tb = blob.length;
  for (let i = 0; i < tsize; i++) blob.u8(0);
  blob.u32at(tb, tb - vt);

  for (const s of slots) {
    const e = f[s], p = tb + offs[s];
    if (e.k === 'i32') blob.u32at(p, e.v >>> 0);
    else if (e.k === 'i8') blob.b[p] = e.v & 255;
  }
  const strs = [];
  for (const s of slots) if (f[s].k === 'str') strs.push({ off: offs[s], v: f[s].v });
  return { tb, tsize, offs, strs };
}

/* ================= 组装 ================= */
function buildCollection(alerts, opt) {
  opt = opt || {};
  const blob = new Blob();
  const list = (alerts || []).filter(Boolean);
  const lang = opt.language || 'zh-CN';
  const base = opt.detailBase || 'https://www.qweather.com/severe-weather/';
  const attribution = opt.attributionUrl || 'https://www.qweather.com';
  const source = opt.source || '国家预警信息发布中心';

  // 容器占位
  blob.u16(10); blob.u16(12);
  blob.u16(8); blob.u16(0); blob.u16(4);
  const ctb = blob.length;
  for (let i = 0; i < 12; i++) blob.u8(0);
  blob.u32at(ctb, ctb - 0);

  // metadata
  const meta = buildMetadata(blob, {
    attributionUrl: attribution,
    issuedTime: opt.issuedTime || new Date().toISOString(),
    language: lang,
    latitude: opt.latitude,
    longitude: opt.longitude,
    source,
    effectiveTime: opt.effectiveTime,
    expireTime: opt.expireTime,
    flag: opt.flag,
  });
  const pAttr = blob.str(attribution);
  blob.ref(meta.tb + meta.offs[0], pAttr);
  if (meta.hasLang) blob.ref(meta.tb + meta.offs[2], blob.str(lang));
  if (meta.hasSource) blob.ref(meta.tb + meta.offs[6], blob.str(source));

  // alerts
  const summaries = [];
  for (const a of list) {
    summaries.push(buildAlertSummary(blob, {
      id: a.id,
      areaId: a.areaId,
      areaName: a.areaName || opt.areaName,
      attributionUrl: attribution,
      countryCode: opt.countryCode || 'CN',
      description: a.description || a.headline,
      effectiveTime: a.effectiveTime,
      expireTime: a.expireTime,
      issuedTime: a.issuedTime,
      onsetTime: a.onsetTime,
      detailsUrl: a.id ? base + a.id + '.html?from=AppleWeatherService' : undefined,
      phenomenon: a.eventType && a.eventType.name ? a.eventType.name : a.phenomenon,
      severityCode: sevCode(a.severity),
      urgencyCode: urgCode(a.urgency),
      certaintyCode: certCode(a.certainty),
      source: a.senderName || source,
      eventSource: 'CN',
    }));
  }

  // 向量
  const N = summaries.length;
  blob.align4();
  const vecPos = blob.length;
  blob.u32(N * 4);
  const ptrStart = blob.length;
  for (let i = 0; i < N; i++) blob.u32(0);
  for (let i = 0; i < N; i++) blob.ref(ptrStart + i * 4, summaries[i].tb);

  // 容器回填
  blob.ref(ctb + 8, meta.tb);
  blob.ref(ctb + 4, vecPos);

  // 字符串最后写
  for (const s of summaries) {
    for (const e of s.strs) blob.ref(s.tb + e.off, blob.str(e.v));
  }

  return { bytes: blob.b, tbpos: ctb, count: N };
}

/* ================= 注入 ================= */
function injectAlerts(rawBuf, coll) {
  const raw = Buffer.from(rawBuf);
  const add = Buffer.from(coll.bytes);
  const out = Buffer.alloc(raw.length + add.length);
  raw.copy(out, 0, 0, raw.length);
  add.copy(out, raw.length, 0, add.length);

  const abs = raw.length + coll.tbpos;
  const rootOff = out.readUInt32LE(0);
  const vt = rootOff - out.readInt32LE(rootOff);
  const nf = (out.readUInt16LE(vt) - 4) / 2;
  if (nf <= 9) throw new Error('根表无 slot 9');
  const off9 = out.readUInt16LE(vt + 4 + 2 * 9);
  if (!off9) throw new Error('根表 slot 9 为空槽');
  const field9 = rootOff + off9;
  out.writeUInt32LE((abs - field9) >>> 0, field9);
  return out;
}




/**
 * WeatherKit WK3 预警增强脚本
 * 从和风天气 API 拉取预警，编码为 WeatherAlertCollectionData 注入响应
 *
 * 用法：在响应处理中调用 wk3AlertsEnhance(responseBody, requestUrl, options)
 */
'use strict';

/* ---------- 和风 API ---------- */
async function fetchQWeatherAlerts(host, token, lat, lon, lang, fetchFn) {
  const u = `https://${host}/weatheralert/v1/current/${lat.toFixed(2)}/${lon.toFixed(2)}?key=${encodeURIComponent(token)}&lang=${encodeURIComponent(lang)}`;
  const res = await fetchFn(u, {
    headers: { 'User-Agent': 'curl/8.14.1', Accept: 'application/json' },
    timeout: 8000,
  });
  const status = res.status ?? res.statusCode;
  if (status !== 200) throw new Error(`QWeather alerts HTTP ${status}`);
  let txt;
  if (typeof res.text === 'function') txt = await res.text();
  else if (res.body) txt = typeof res.body === 'string' ? res.body : new TextDecoder().decode(res.body);
  else txt = '';
  const data = JSON.parse(txt);
  if (!data || !Array.isArray(data.alerts)) return [];
  return data.alerts;
}

/* ---------- 从请求 URL 提取经纬度 ---------- */
function parseLatLon(url) {
  // /api/v3/weather/{lang}/{lat}/{lon}?...
  const m = String(url).match(/\/weather\/[^/]+\/(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)/);
  if (!m) return null;
  return { lat: parseFloat(m[1]), lon: parseFloat(m[2]) };
}

/* ---------- 主入口 ---------- */
/**
 * @param {Uint8Array|ArrayBuffer} body 原始响应
 * @param {string} url 请求 URL
 * @param {object} opt {host, token, lang, enabled, log}
 * @param {function} encode 编码器（buildCollection）
 * @param {function} inject 注入器（injectAlerts）
 * @param {function} fetchFn 网络函数
 * @returns {Uint8Array|null} 新响应，null 表示不改
 */
async function wk3AlertsEnhance(body, url, opt, encode, inject, fetchFn) {
  const log = opt.log || function () {};
  if (!opt.enabled) { log('debug', '预警增强未启用'); return null; }
  if (!opt.token || !opt.host) { log('warn', '和风 Key 或 Host 未配置'); return null; }

  const pos = parseLatLon(url);
  if (!pos) { log('debug', 'URL 中无经纬度'); return null; }

  log('debug', `预警查询 ${pos.lat}, ${pos.lon}`);
  let alerts;
  try {
    alerts = await fetchQWeatherAlerts(opt.host, opt.token, pos.lat, pos.lon, opt.lang || 'zh-CN', fetchFn);
  } catch (e) {
    log('error', '和风预警拉取失败: ' + (e && e.message ? e.message : e));
    return null;
  }

  if (!alerts.length) {
    log('info', '当前地点无生效预警');
    // 无预警时构造空集合，确保 App 不显示旧预警
    try {
      const empty = encode([], {
        latitude: pos.lat, longitude: pos.lon, language: opt.lang || 'zh-CN',
        attributionUrl: 'https://www.qweather.com', source: '国家预警信息发布中心',
        countryCode: 'CN',
      });
      return inject(body, empty);
    } catch (e) { return null; }
  }

  const now = Date.now();
  // 取最宽的时间范围作为 metadata
  let minStart = Infinity, maxEnd = 0;
  for (const a of alerts) {
    const s = Date.parse(a.effectiveTime || a.issuedTime || 0) || now;
    const e = Date.parse(a.expireTime || 0) || (now + 86400000);
    if (s < minStart) minStart = s;
    if (e > maxEnd) maxEnd = e;
  }

  let coll;
  try {
    coll = encode(alerts, {
      latitude: pos.lat,
      longitude: pos.lon,
      language: opt.lang || 'zh-CN',
      attributionUrl: 'https://www.qweather.com',
      source: '国家预警信息发布中心',
      countryCode: 'CN',
      issuedTime: new Date(now).toISOString(),
      effectiveTime: new Date(minStart).toISOString(),
      expireTime: new Date(maxEnd).toISOString(),
    });
  } catch (e) {
    log('error', '预警编码失败: ' + (e && e.message ? e.message : e));
    return null;
  }

  log('info', `注入 ${coll.count} 条预警`);
  return inject(body, coll);
}

/* ---------- Surge 集成 ---------- */
if (typeof $response !== 'undefined' && typeof $request !== 'undefined') {
  (async () => {
    try {
      const Module = { buildCollection, injectAlerts };

      const env = (typeof $environment !== 'undefined' && $environment) ||
                  (typeof $env !== 'undefined' && $env) || {};
      const host = env['API.QWeather.Host'] || 'devapi.qweather.com';
      const token = env['API.QWeather.Token'] || '';
      const enabled = (env['WeatherAlerts.Provider'] || 'QWeatherWeb') === 'QWeatherWeb';
      const lang = 'zh-CN';

      const body = $response.body;
      if (!body) { $done($response); return; }

      const out = await wk3AlertsEnhance(
        body, $request.url,
        { host, token, lang, enabled, log: (lv, m) => console.log(`[WK3Alert] ${m}`) },
        Module.buildCollection, Module.injectAlerts,
        (u, o) => $httpClient.get(u, o)
      );
      if (out) {
        $done({ body: out });
      } else {
        $done($response);
      }
    } catch (e) {
      console.log('[WK3Alert] 异常: ' + (e && e.message ? e.message : e));
      $done($response);
    }
  })();
} else if (typeof module !== 'undefined' && module.exports) {
  module.exports = { wk3AlertsEnhance, fetchQWeatherAlerts, parseLatLon };
}
