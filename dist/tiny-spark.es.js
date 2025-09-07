const A = "http://www.w3.org/2000/svg";
var E = /* @__PURE__ */ ((t) => (t.BAR = "bar", t.LINE = "line", t))(E || {}), g = /* @__PURE__ */ ((t) => (t.ANIMATION = "animation", t.AREA_COLOR = "areaColor", t.CURVE = "curve", t.DATES = "dates", t.ID = "id", t.INDICATOR_COLOR = "indicatorColor", t.INDICATOR_WIDTH = "indicatorWidth", t.LINE_COLOR = "lineColor", t.LINE_THICKNESS = "lineThickness", t.NUMBER_LOCALE = "numberLocale", t.NUMBER_ROUNDING = "numberRounding", t.NUMBER_SHOW_ON = "numberShowOn", t.PLOT_COLOR = "plotColor", t.PLOT_RADIUS = "plotRadius", t.SET = "set", t.HIDE_PLOTS_ABOVE = "hidePlotsAbove", t.SHOW_LAST_VALUE = "showLastValue", t.LAST_VALUE_FONT_SIZE = "lastValueFontSize", t.LAST_VALUE_COLOR = "lastValueColor", t.TYPE = "type", t.TOOLTIP_SMOOTHING = "tooltipSmoothing", t))(g || {}), J = /* @__PURE__ */ ((t) => (t.ANIMATION = "data-animation", t.AREA_COLOR = "data-area-color", t.CURVE = "data-curve", t.DATES = "data-dates", t.ID = "data-id", t.INDICATOR_COLOR = "data-indicator-color", t.INDICATOR_WIDTH = "data-indicator-width", t.LINE_COLOR = "data-line-color", t.LINE_THICKNESS = "data-line-thickness", t.NUMBER_LOCALE = "data-number-locale", t.NUMBER_ROUNDING = "data-number-rounding", t.NUMBER_SHOW_ON = "data-number-show-on", t.PLOT_COLOR = "data-plot-color", t.PLOT_RADIUS = "data-plot-radius", t.SET = "data-set", t.HIDE_PLOTS_ABOVE = "data-hide-plots-above", t.SHOW_LAST_VALUE = "data-show-last-value", t.LAST_VALUE_FONT_SIZE = "data-last-value-font-size", t.LAST_VALUE_COLOR = "data-last-value-color", t.TYPE = "data-type", t.TOOLTIP_SMOOTHING = "data-tooltip-smoothing", t))(J || {});
const rt = "0.6.1", st = {
  version: rt
};
function at(t) {
  const { width: i, height: n } = t.parentElement.getBoundingClientRect(), s = { width: 300, height: 100 }, a = String(c(t, g.SHOW_LAST_VALUE, "false")) === "true", e = tt(t), f = e && e.length ? e.at(-1) : null;
  let o = 0;
  if (!(t.dataset.type && t.dataset.type === "bar") && a && ![null, void 0].includes(f)) {
    const O = Number(String(c(t, g.NUMBER_ROUNDING, 0)));
    o = 6 + f.toFixed(O).length * (Number(c(t, g.LAST_VALUE_FONT_SIZE, 12)) / 2);
  }
  const x = `0 0 ${(i || s.width) + o} ${n || s.height}`, N = document.createElementNS(A, "svg"), b = t.dataset.id;
  N.id = b, N.setAttribute("viewBox", x), N.style.width = "100%", N.style.height = "100%";
  const I = document.createElementNS(A, "desc");
  return I.setAttribute("aria-hidden", "true"), I.innerHTML = `Composed with tiny-spark v${st.version}`, N.appendChild(I), {
    svg: N,
    svgId: b,
    width: i || s.width,
    height: n || s.height,
    viewBox: x
  };
}
function _(t, i = 0) {
  return isNaN(t) ? i : t;
}
function K(t) {
  let i = [];
  for (let n = 0; n < t.length; n += 1)
    i.push(`${_(t[n].x)},${_(t[n].y)} `);
  return i.join(" ").trim();
}
function Z(t) {
  if (t.length < 1) return "0,0";
  const i = t.length - 1, n = [`${_(t[0].x)},${_(t[0].y)}`], s = [], a = [], e = [], f = [];
  for (let o = 0; o < i; o += 1)
    s[o] = t[o + 1].x - t[o].x, a[o] = t[o + 1].y - t[o].y, e[o] = a[o] / s[o];
  f[0] = e[0], f[i] = e[i - 1];
  for (let o = 1; o < i; o += 1)
    if (e[o - 1] * e[o] <= 0)
      f[o] = 0;
    else {
      const S = 2 * e[o - 1] * e[o] / (e[o - 1] + e[o]);
      f[o] = S;
    }
  for (let o = 0; o < i; o += 1) {
    const S = t[o].x, v = t[o].y, x = t[o + 1].x, N = t[o + 1].y, b = f[o], I = f[o + 1], O = S + (x - S) / 3, l = v + b * (x - S) / 3, L = x - (x - S) / 3, P = N - I * (x - S) / 3;
    n.push(`C ${_(O)},${_(l)} ${_(L)},${_(P)} ${_(x)},${_(N)}`);
  }
  return n.join(" ");
}
function lt(t, i = 1e3, n) {
  t.style.opacity = "1";
  const s = t.getTotalLength();
  t.style.strokeDasharray = String(s), t.style.strokeDashoffset = String(s), t.getBoundingClientRect(), t.style.transition = `stroke-dashoffset ${i}ms ease-in-out`, t.style.strokeDashoffset = "0", t.addEventListener("transitionend", function a() {
    t.style.transition = "", t.removeEventListener("transitionend", a), n && n();
  });
}
function dt(t, i, n = 1e3) {
  i.style.opacity = "1";
  const s = i.getBBox(), a = s.width, e = document.createElementNS("http://www.w3.org/2000/svg", "clipPath"), f = "clip-" + Math.random().toString(36).substr(2, 9);
  e.setAttribute("id", f);
  const o = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  o.setAttribute("x", s.x.toString()), o.setAttribute("y", s.y.toString()), o.setAttribute("width", "0"), o.setAttribute("height", s.height.toString()), e.appendChild(o);
  let S = t.querySelector("defs");
  S || (S = document.createElementNS("http://www.w3.org/2000/svg", "defs"), t.insertBefore(S, t.firstChild)), S.appendChild(e), i.setAttribute("clip-path", `url(#${f})`), o.style.transition = `width ${n}ms ease-out`, o.getBoundingClientRect(), o.setAttribute("width", a.toString()), o.addEventListener("transitionend", function v() {
    i.removeAttribute("clip-path"), e.parentNode && e.parentNode.removeChild(e), o.removeEventListener("transitionend", v);
  });
}
function ct() {
  return document.querySelectorAll(".tiny-spark");
}
function Q(t, i) {
  return Object.keys(t.dataset).includes(i);
}
function c(t, i, n) {
  return Q(t, i) ? t.dataset[i] : n;
}
function ut(t) {
  if (!t) return {
    color: "#1A1A1A",
    backgroundColor: "#FFFFFF"
  };
  const i = window.getComputedStyle(t), n = i.getPropertyValue("color") || "#1A1A1A", s = i.getPropertyValue("background-color"), a = i.getPropertyValue("background");
  return { color: n, backgroundColor: s || a || "#FFFFFF" };
}
function T() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
    const i = Math.random() * 16 | 0;
    return (t == "x" ? i : i & 3 | 8).toString(16);
  });
}
function tt(t) {
  const i = t.getAttribute("data-set");
  if (!i) return [];
  try {
    const n = JSON.parse(i);
    return Array.isArray(n) && n.every((s) => typeof s == "number" || [null, void 0].includes(s)) ? n : (console.warn("data-set is not an array of numbers."), []);
  } catch (n) {
    return console.error("Error parsing data-set:", n), [];
  }
}
function gt(t) {
  const i = t.getAttribute("data-dates");
  if (!i) return [];
  try {
    const n = JSON.parse(i);
    return Array.isArray(n) && n.every((s) => typeof s == "string") ? n : (console.warn("data-dates is not an array of strings"), []);
  } catch (n) {
    return console.error("Error parsing data-dates", n), [];
  }
}
function j(t) {
  return {
    min: Math.min(...t),
    max: Math.max(...t)
  };
}
function et() {
  return new Promise((t) => setTimeout(t, 0));
}
function nt(t, i) {
  const n = String(c(t, g.NUMBER_LOCALE, navigator.language || "en-US")), s = Number(String(c(t, g.NUMBER_ROUNDING, 0)));
  return i.toLocaleString(n, {
    useGrouping: !0,
    minimumFractionDigits: s,
    maximumFractionDigits: s
  });
}
function pt(t, i, n) {
  if (!t.createSVGPoint || !t.getScreenCTM)
    throw new Error("Your browser does not support SVG coordinate transformation.");
  const s = t.getScreenCTM();
  if (!s)
    throw new Error("Cannot obtain the screen CTM.");
  const a = t.createSVGPoint();
  a.x = i, a.y = n;
  const e = a.matrixTransform(s);
  return { x: e.x, y: e.y };
}
const G = {};
function q(t, i, n, s, a) {
  let e = G[s];
  if (!a) {
    e && (cancelAnimationFrame(e.frameId), e.frameId = null, e.tool.style.opacity = "0");
    return;
  }
  const f = i.dataset.type === E.BAR, { x: o, y: S } = pt(
    t,
    n.x,
    f && !n.isPositive ? n.bar.y : n.y
  );
  if (!e) {
    const O = document.createElement("div");
    O.classList.add("tiny-spark-tooltip"), O.setAttribute("id", `tooltip_${s}`), O.setAttribute("role", "tooltip"), O.setAttribute("aria-live", "polite"), O.style.position = "fixed", O.style.pointerEvents = "none", O.style.opacity = "0", O.style.willChange = "top, left", document.body.appendChild(O), e = G[s] = {
      targetX: 0,
      targetY: 0,
      displayX: 0,
      displayY: 0,
      frameId: null,
      tool: O,
      width: 0,
      height: 0,
      hasSnapped: !1
    };
  }
  e.tool.setAttribute("aria-hidden", "false"), e.tool.innerHTML = `
    <div class="tiny-spark-tooltip-content">
      ${n.d ? `${n.d}: ` : ""}${[null, void 0].includes(n.v) ? "-" : nt(i, Number(n.v))}
    </div>
  `;
  const { width: v, height: x } = e.tool.getBoundingClientRect();
  e.width = v, e.height = x;
  const N = Number(c(i, g.PLOT_RADIUS, 3));
  if (e.targetX = o - e.width / 2, e.targetY = S - e.height - N * 1.5, !e.hasSnapped) {
    e.displayX = e.targetX, e.displayY = e.targetY, e.tool.style.left = `${e.displayX}px`, e.tool.style.top = `${e.displayY}px`, e.tool.style.opacity = "1", e.hasSnapped = !0;
    return;
  }
  const b = Number(c(i, g.TOOLTIP_SMOOTHING, 1)) / 10;
  function I() {
    e.displayX += (e.targetX - e.displayX) * b, e.displayY += (e.targetY - e.displayY) * b, e.tool.style.left = `${Math.round(e.displayX)}px`, e.tool.style.top = `${Math.round(e.displayY)}px`, e.tool.style.opacity = "1", e.frameId = requestAnimationFrame(I);
  }
  e.frameId == null && I();
}
function yt(t) {
  t.innerHTML = "";
}
function ht(t, i) {
  const n = t.dataset.type && t.dataset.type === "bar";
  let s = i;
  yt(t);
  const { svg: a, svgId: e, width: f, height: o, viewBox: S } = at(t), { color: v, backgroundColor: x } = ut(t);
  console.log("dataset = ", t.dataset);
  const N = Number(t.dataset.padding) || 12, b = { T: N, R: N, B: N, L: N };
  console.log("padding = ", b);
  const I = T(), O = String(c(t, g.SHOW_LAST_VALUE, "false")) === "true", l = {
    left: b.L,
    top: b.T,
    width: f - b.L - b.R,
    height: o - b.T - b.B,
    bottom: o - b.B,
    right: f - b.R
  };
  console.log("area = ", l);
  const L = tt(t), { min: P } = j(L), k = L.map((r) => [null, void 0].includes(r) ? r : r + (P < 0 ? Math.abs(P) : 0)), { max: W } = j(k);
  let C = l.width / (L.length - 1) === 1 / 0 ? l.width : l.width / (L.length - 1);
  if (n) {
    const [r, m, p, d] = S.split(" ");
    a.setAttribute("viewBox", `${Number(r) - C / 2} ${m} ${Number(p) + C} ${d}`);
  }
  const M = !L.some((r) => r >= 0), it = gt(t), u = k.map((r, m) => {
    const p = {
      w: k.length === 1 ? C / 2 : 0,
      h: k.length === 1 ? l.height / 2 : 0
    }, d = l.left + C * m + p.w, h = (1 - (r || 0) / W) * l.height + p.h + b.T, H = (1 - (P < 0 ? Math.abs(P) : 0) / W) * l.height + b.T + p.h, X = L[m] >= 0;
    return {
      y: M && L.length === 1 ? l.top + l.height / 2 : h,
      x: d,
      v: L[m],
      d: it[m] || null,
      isPositive: X,
      bar: {
        x: d - C / 2,
        y: L.length === 1 ? l.top : X ? h : M ? l.top : H,
        h: L.length === 1 ? l.height : X ? H - h : M && L.length === 0 ? l.height : isNaN(h - H) ? 0 : h - H,
        w: C
      }
    };
  }), $ = [...u].filter(({ v: r }) => ![null, void 0].includes(r)), z = t.getAttribute("data-animation"), w = document.createElementNS(A, "path");
  w.classList.add("tiny-spark-line-path");
  const R = document.createElementNS(A, "path");
  R.classList.add("tiny-spark-line-area"), n || (!t.dataset.curve || t.dataset.curve === "true" ? w.setAttribute("d", `M ${Z($)}`) : w.setAttribute("d", `M ${K($)}`), w.setAttribute("fill", "none"), w.setAttribute("stroke", String(c(t, g.LINE_COLOR, v))), w.setAttribute("stroke-width", String(c(t, g.LINE_THICKNESS, 2))), w.setAttribute("stroke-linecap", "round"), z === "true" && s && (w.style.opacity = "0", R.style.opacity = "0"), u.length && (!t.dataset.curve || t.dataset.curve === "true" ? R.setAttribute("d", `M ${$[0].x},${l.bottom} ${Z($)} L ${$.at(-1).x},${l.bottom} Z`) : R.setAttribute("d", `M ${$[0].x},${l.bottom} ${K($)} L ${$.at(-1).x},${l.bottom} Z`)), R.setAttribute("fill", String(c(t, g.AREA_COLOR, "transparent"))), u.length > 1 && (a.appendChild(R), a.appendChild(w)));
  const F = [];
  u.forEach((r, m) => {
    const p = document.createElementNS(A, "line");
    p.classList.add("tiny-spark-indicator"), p.setAttribute("id", `indicator_${e}_${m}`), p.setAttribute("x1", String(l.left + (u.length === 1 ? l.width / 2 : m * C))), p.setAttribute("x2", String(l.left + (u.length === 1 ? l.width / 2 : m * C))), p.setAttribute("y1", String(l.top)), p.setAttribute("y2", String(l.bottom)), p.setAttribute("stroke", String(c(t, g.INDICATOR_COLOR, "#1A1A1A"))), p.setAttribute("stroke-width", String(c(t, g.INDICATOR_WIDTH, "1"))), p.setAttribute("stroke-linecap", "round"), p.style.pointerEvents = "none", p.style.opacity = "0", F.push(p), a.appendChild(p);
  });
  let V = [], U = [];
  const D = Number(String(c(t, g.PLOT_RADIUS, 0))) > 0, ot = !String(c(t, g.HIDE_PLOTS_ABOVE, "")) || u.length <= Number(String(c(t, g.HIDE_PLOTS_ABOVE, 0))), B = D && ot;
  n && u.forEach(({ bar: r, v: m }, p) => {
    if (![null, void 0].includes(m)) {
      const d = document.createElementNS(A, "rect");
      d.classList.add("tiny-spark-datapoint-bar"), d.setAttribute("x", String(r.x)), d.setAttribute("y", String(r.y)), d.setAttribute("width", String(r.w)), d.setAttribute("height", String(r.h)), d.setAttribute("fill", String(c(t, g.PLOT_COLOR, String(c(t, "lineColor", v))))), d.style.opacity = u.length === 1 ? "1" : "0", d.style.transition = `opacity ${p * (1e3 * 2 / u.length)}ms ease-in`, U.push(d), a.appendChild(d);
    }
  }), D && !n && u.forEach(({ x: r, y: m, v: p }, d) => {
    if (![null, void 0].includes(p)) {
      const h = document.createElementNS(A, "circle");
      h.classList.add("tiny-spark-datapoint-circle"), h.classList.add(`circle-${e}`), h.setAttribute("id", `circle_${e}_${d}`), h.setAttribute("cx", String(r || 0)), h.setAttribute("cy", String(m || 0)), h.setAttribute("r", String(c(t, g.PLOT_RADIUS, 3))), h.setAttribute("fill", String(c(t, g.PLOT_COLOR, String(c(t, "lineColor", v))))), h.setAttribute("stroke", x), h.style.opacity = u.length === 1 ? "1" : "0", h.style.transition = `opacity ${d * (1e3 * 2 / u.length)}ms ease-in`, h.style.pointerEvents = "none", V.push(h), B && a.appendChild(h);
    }
  });
  let y = null;
  if (O && u.length && u.at(-1)) {
    const r = Number(c(t, g.LAST_VALUE_FONT_SIZE, 12));
    y = document.createElementNS(A, "text"), y.classList.add("tiny-spark-last-value"), y.setAttribute("id", I), n ? (y.setAttribute("x", String(u.at(-1).x + Number(c(t, g.LINE_THICKNESS, 2)))), y.setAttribute("y", u.at(-1)?.isPositive ? String(u.at(-1).y - r / 3) : String(u.at(-1).bar.y + u.at(-1).bar.h + r)), y.setAttribute("text-anchor", "middle")) : (y.setAttribute("x", String(u.at(-1).x + 6 + Number(c(t, g.LINE_THICKNESS, 2)))), y.setAttribute("y", String(u.at(-1).y + r / 3)), y.setAttribute("text-anchor", "start")), y.setAttribute("font-size", String(r) + "px"), y.setAttribute("fill", String(c(t, g.LAST_VALUE_COLOR, String(c(t, g.INDICATOR_COLOR, "#1A1A1A"))))), y.innerHTML = nt(t, Number(u.at(-1).v)), y.style.opacity = u.length === 1 ? "1" : "0", a.appendChild(y);
  }
  u.forEach((r, m) => {
    const p = V[m], d = document.createElementNS(A, "rect");
    d.classList.add("tiny-spark-tooltip-trap"), d.setAttribute("x", `${u.length === 1 ? 0 : l.left + m * C - C / 2}`), d.setAttribute("y", `${l.top}`), d.setAttribute("height", `${l.height}`), d.setAttribute("width", `${C}`), d.setAttribute("fill", "transparent"), d.setAttribute("aria-describedby", `tooltip_${e}`), d.addEventListener("mouseenter", () => {
      q(a, t, r, e, !0), B ? document.getElementById(`circle_${e}_${m}`)?.setAttribute("r", String(Number(c(t, g.PLOT_RADIUS, 3)) * 1.5)) : a.appendChild(p), F[m].style.opacity = "1", O && y && (m === u.length - 1 ? y.style.opacity = "0" : y.style.opacity = "1");
    }), d.addEventListener("mouseout", () => {
      q(a, t, r, e, !1), B ? document.getElementById(`circle_${e}_${m}`)?.setAttribute("r", String(Number(c(t, g.PLOT_RADIUS, 3)))) : p.remove(), F.forEach((h) => h.style.opacity = "0"), O && y && (y.style.opacity = "1");
    }), a.appendChild(d);
  }), z === "true" && s ? et().then(() => {
    V.forEach((r) => {
      r.style.opacity = "1";
    }), U.forEach((r) => {
      r.style.opacity = "1";
    }), lt(w, 1e3, () => {
      y && (y.style.opacity = "1");
    }), dt(a, R);
  }) : (V.forEach((r) => {
    r.style.opacity = "1";
  }), U.forEach((r) => {
    r.style.opacity = "1";
  }), y && (y.style.opacity = "1")), t.appendChild(a), t.addEventListener("mouseleave", () => {
    const r = G[e];
    r && (cancelAnimationFrame(r.frameId), r.frameId = null, r.tool.style.opacity = "0", r.hasSnapped = !1);
  });
}
function mt() {
  const t = ct();
  t.length && Array.from(t).forEach((i) => {
    if (!i.dataset.id) {
      const s = T();
      i.setAttribute("data-id", s);
    }
    const n = i;
    ft(n), n.__renderCount = 0, Y(n), et().then(() => {
      const s = new ResizeObserver((e) => {
        e.forEach(() => Y(n));
      });
      n.parentElement && s.observe(n.parentElement), new MutationObserver((e) => {
        for (const f of e)
          if (f.type === "attributes" && f.attributeName && Object.values(J).includes(f.attributeName)) {
            Y(n);
            break;
          }
      }).observe(n, { attributes: !0 });
    });
  });
}
function Y(t) {
  Q(t, "set") && ht(t, t.__renderCount < 2), t.__renderCount += 1;
}
function ft(t) {
  t.dataset.set || console.error(
    `Tiny-spark exception:

[data-set] data attribute is missing.
Provide an array of numbers, for example:

 data-set="[1, 2, 3]"`
  );
}
function bt(t) {
  return JSON.stringify(t);
}
export {
  mt as render,
  bt as tinyFormat
};
