const A = "http://www.w3.org/2000/svg";
var E = /* @__PURE__ */ ((t) => (t.BAR = "bar", t.LINE = "line", t))(E || {}), g = /* @__PURE__ */ ((t) => (t.ANIMATION = "animation", t.AREA_COLOR = "areaColor", t.CURVE = "curve", t.DATES = "dates", t.ID = "id", t.INDICATOR_COLOR = "indicatorColor", t.INDICATOR_WIDTH = "indicatorWidth", t.LINE_COLOR = "lineColor", t.LINE_THICKNESS = "lineThickness", t.NUMBER_LOCALE = "numberLocale", t.NUMBER_ROUNDING = "numberRounding", t.NUMBER_SHOW_ON = "numberShowOn", t.PLOT_COLOR = "plotColor", t.PLOT_RADIUS = "plotRadius", t.SET = "set", t.HIDE_PLOTS_ABOVE = "hidePlotsAbove", t.SHOW_LAST_VALUE = "showLastValue", t.LAST_VALUE_FONT_SIZE = "lastValueFontSize", t.LAST_VALUE_COLOR = "lastValueColor", t.TYPE = "type", t.TOOLTIP_SMOOTHING = "tooltipSmoothing", t))(g || {}), J = /* @__PURE__ */ ((t) => (t.ANIMATION = "data-animation", t.AREA_COLOR = "data-area-color", t.CURVE = "data-curve", t.DATES = "data-dates", t.ID = "data-id", t.INDICATOR_COLOR = "data-indicator-color", t.INDICATOR_WIDTH = "data-indicator-width", t.LINE_COLOR = "data-line-color", t.LINE_THICKNESS = "data-line-thickness", t.NUMBER_LOCALE = "data-number-locale", t.NUMBER_ROUNDING = "data-number-rounding", t.NUMBER_SHOW_ON = "data-number-show-on", t.PLOT_COLOR = "data-plot-color", t.PLOT_RADIUS = "data-plot-radius", t.SET = "data-set", t.HIDE_PLOTS_ABOVE = "data-hide-plots-above", t.SHOW_LAST_VALUE = "data-show-last-value", t.LAST_VALUE_FONT_SIZE = "data-last-value-font-size", t.LAST_VALUE_COLOR = "data-last-value-color", t.TYPE = "data-type", t.TOOLTIP_SMOOTHING = "data-tooltip-smoothing", t))(J || {});
const ot = "0.6.1", st = {
  version: ot
};
function at(t) {
  const { width: i, height: n } = t.parentElement.getBoundingClientRect(), s = { width: 300, height: 100 }, a = String(c(t, g.SHOW_LAST_VALUE, "false")) === "true", e = tt(t), m = e && e.length ? e.at(-1) : null;
  let r = 0;
  if (!(t.dataset.type && t.dataset.type === "bar") && a && ![null, void 0].includes(m)) {
    const b = Number(String(c(t, g.NUMBER_ROUNDING, 0)));
    r = 6 + m.toFixed(b).length * (Number(c(t, g.LAST_VALUE_FONT_SIZE, 12)) / 2);
  }
  const x = `0 0 ${(i || s.width) + r} ${n || s.height}`, N = document.createElementNS(A, "svg"), S = t.dataset.id;
  N.id = S, N.setAttribute("viewBox", x), N.style.width = "100%", N.style.height = "100%";
  const I = document.createElementNS(A, "desc");
  return I.setAttribute("aria-hidden", "true"), I.innerHTML = `Composed with tiny-spark v${st.version}`, N.appendChild(I), {
    svg: N,
    svgId: S,
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
  const i = t.length - 1, n = [`${_(t[0].x)},${_(t[0].y)}`], s = [], a = [], e = [], m = [];
  for (let r = 0; r < i; r += 1)
    s[r] = t[r + 1].x - t[r].x, a[r] = t[r + 1].y - t[r].y, e[r] = a[r] / s[r];
  m[0] = e[0], m[i] = e[i - 1];
  for (let r = 1; r < i; r += 1)
    if (e[r - 1] * e[r] <= 0)
      m[r] = 0;
    else {
      const O = 2 * e[r - 1] * e[r] / (e[r - 1] + e[r]);
      m[r] = O;
    }
  for (let r = 0; r < i; r += 1) {
    const O = t[r].x, v = t[r].y, x = t[r + 1].x, N = t[r + 1].y, S = m[r], I = m[r + 1], b = O + (x - O) / 3, d = v + S * (x - O) / 3, L = x - (x - O) / 3, P = N - I * (x - O) / 3;
    n.push(`C ${_(b)},${_(d)} ${_(L)},${_(P)} ${_(x)},${_(N)}`);
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
  const s = i.getBBox(), a = s.width, e = document.createElementNS("http://www.w3.org/2000/svg", "clipPath"), m = "clip-" + Math.random().toString(36).substr(2, 9);
  e.setAttribute("id", m);
  const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  r.setAttribute("x", s.x.toString()), r.setAttribute("y", s.y.toString()), r.setAttribute("width", "0"), r.setAttribute("height", s.height.toString()), e.appendChild(r);
  let O = t.querySelector("defs");
  O || (O = document.createElementNS("http://www.w3.org/2000/svg", "defs"), t.insertBefore(O, t.firstChild)), O.appendChild(e), i.setAttribute("clip-path", `url(#${m})`), r.style.transition = `width ${n}ms ease-out`, r.getBoundingClientRect(), r.setAttribute("width", a.toString()), r.addEventListener("transitionend", function v() {
    i.removeAttribute("clip-path"), e.parentNode && e.parentNode.removeChild(e), r.removeEventListener("transitionend", v);
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
  const m = i.dataset.type === E.BAR, { x: r, y: O } = pt(
    t,
    n.x,
    m && !n.isPositive ? n.bar.y : n.y
  );
  if (!e) {
    const b = document.createElement("div");
    b.classList.add("tiny-spark-tooltip"), b.setAttribute("id", `tooltip_${s}`), b.setAttribute("role", "tooltip"), b.setAttribute("aria-live", "polite"), b.style.position = "fixed", b.style.pointerEvents = "none", b.style.opacity = "0", b.style.willChange = "top, left", document.body.appendChild(b), e = G[s] = {
      targetX: 0,
      targetY: 0,
      displayX: 0,
      displayY: 0,
      frameId: null,
      tool: b,
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
  if (e.targetX = r - e.width / 2, e.targetY = O - e.height - N * 1.5, !e.hasSnapped) {
    e.displayX = e.targetX, e.displayY = e.targetY, e.tool.style.left = `${e.displayX}px`, e.tool.style.top = `${e.displayY}px`, e.tool.style.opacity = "1", e.hasSnapped = !0;
    return;
  }
  const S = Number(c(i, g.TOOLTIP_SMOOTHING, 1)) / 10;
  function I() {
    e.displayX += (e.targetX - e.displayX) * S, e.displayY += (e.targetY - e.displayY) * S, e.tool.style.left = `${Math.round(e.displayX)}px`, e.tool.style.top = `${Math.round(e.displayY)}px`, e.tool.style.opacity = "1", e.frameId = requestAnimationFrame(I);
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
  const { svg: a, svgId: e, width: m, height: r, viewBox: O } = at(t), { color: v, backgroundColor: x } = ut(t), N = Number(t.dataset.padding) ?? 12, S = { T: N, R: N, B: N, L: N }, I = T(), b = String(c(t, g.SHOW_LAST_VALUE, "false")) === "true", d = {
    left: S.L,
    top: S.T,
    width: m - S.L - S.R,
    height: r - S.T - S.B,
    bottom: r - S.B
  }, L = tt(t), { min: P } = j(L), k = L.map((o) => [null, void 0].includes(o) ? o : o + (P < 0 ? Math.abs(P) : 0)), { max: W } = j(k);
  let C = d.width / (L.length - 1) === 1 / 0 ? d.width : d.width / (L.length - 1);
  if (n) {
    const [o, f, p, l] = O.split(" ");
    a.setAttribute("viewBox", `${Number(o) - C / 2} ${f} ${Number(p) + C} ${l}`);
  }
  const M = !L.some((o) => o >= 0), it = gt(t), u = k.map((o, f) => {
    const p = {
      w: k.length === 1 ? C / 2 : 0,
      h: k.length === 1 ? d.height / 2 : 0
    }, l = d.left + C * f + p.w, h = (1 - (o || 0) / W) * d.height + p.h + S.T, H = (1 - (P < 0 ? Math.abs(P) : 0) / W) * d.height + S.T + p.h, X = L[f] >= 0;
    return {
      y: M && L.length === 1 ? d.top + d.height / 2 : h,
      x: l,
      v: L[f],
      d: it[f] || null,
      isPositive: X,
      bar: {
        x: l - C / 2,
        y: L.length === 1 ? d.top : X ? h : M ? d.top : H,
        h: L.length === 1 ? d.height : X ? H - h : M && L.length === 0 ? d.height : isNaN(h - H) ? 0 : h - H,
        w: C
      }
    };
  }), $ = [...u].filter(({ v: o }) => ![null, void 0].includes(o)), z = t.getAttribute("data-animation"), w = document.createElementNS(A, "path");
  w.classList.add("tiny-spark-line-path");
  const R = document.createElementNS(A, "path");
  R.classList.add("tiny-spark-line-area"), n || (!t.dataset.curve || t.dataset.curve === "true" ? w.setAttribute("d", `M ${Z($)}`) : w.setAttribute("d", `M ${K($)}`), w.setAttribute("fill", "none"), w.setAttribute("stroke", String(c(t, g.LINE_COLOR, v))), w.setAttribute("stroke-width", String(c(t, g.LINE_THICKNESS, 2))), w.setAttribute("stroke-linecap", "round"), z === "true" && s && (w.style.opacity = "0", R.style.opacity = "0"), u.length && (!t.dataset.curve || t.dataset.curve === "true" ? R.setAttribute("d", `M ${$[0].x},${d.bottom} ${Z($)} L ${$.at(-1).x},${d.bottom} Z`) : R.setAttribute("d", `M ${$[0].x},${d.bottom} ${K($)} L ${$.at(-1).x},${d.bottom} Z`)), R.setAttribute("fill", String(c(t, g.AREA_COLOR, "transparent"))), u.length > 1 && (a.appendChild(R), a.appendChild(w)));
  const F = [];
  u.forEach((o, f) => {
    const p = document.createElementNS(A, "line");
    p.classList.add("tiny-spark-indicator"), p.setAttribute("id", `indicator_${e}_${f}`), p.setAttribute("x1", String(d.left + (u.length === 1 ? d.width / 2 : f * C))), p.setAttribute("x2", String(d.left + (u.length === 1 ? d.width / 2 : f * C))), p.setAttribute("y1", String(d.top)), p.setAttribute("y2", String(d.bottom)), p.setAttribute("stroke", String(c(t, g.INDICATOR_COLOR, "#1A1A1A"))), p.setAttribute("stroke-width", String(c(t, g.INDICATOR_WIDTH, "1"))), p.setAttribute("stroke-linecap", "round"), p.style.pointerEvents = "none", p.style.opacity = "0", F.push(p), a.appendChild(p);
  });
  let V = [], U = [];
  const D = Number(String(c(t, g.PLOT_RADIUS, 0))) > 0, rt = !String(c(t, g.HIDE_PLOTS_ABOVE, "")) || u.length <= Number(String(c(t, g.HIDE_PLOTS_ABOVE, 0))), B = D && rt;
  n && u.forEach(({ bar: o, v: f }, p) => {
    if (![null, void 0].includes(f)) {
      const l = document.createElementNS(A, "rect");
      l.classList.add("tiny-spark-datapoint-bar"), l.setAttribute("x", String(o.x)), l.setAttribute("y", String(o.y)), l.setAttribute("width", String(o.w)), l.setAttribute("height", String(o.h)), l.setAttribute("fill", String(c(t, g.PLOT_COLOR, String(c(t, "lineColor", v))))), l.style.opacity = u.length === 1 ? "1" : "0", l.style.transition = `opacity ${p * (1e3 * 2 / u.length)}ms ease-in`, U.push(l), a.appendChild(l);
    }
  }), D && !n && u.forEach(({ x: o, y: f, v: p }, l) => {
    if (![null, void 0].includes(p)) {
      const h = document.createElementNS(A, "circle");
      h.classList.add("tiny-spark-datapoint-circle"), h.classList.add(`circle-${e}`), h.setAttribute("id", `circle_${e}_${l}`), h.setAttribute("cx", String(o || 0)), h.setAttribute("cy", String(f || 0)), h.setAttribute("r", String(c(t, g.PLOT_RADIUS, 3))), h.setAttribute("fill", String(c(t, g.PLOT_COLOR, String(c(t, "lineColor", v))))), h.setAttribute("stroke", x), h.style.opacity = u.length === 1 ? "1" : "0", h.style.transition = `opacity ${l * (1e3 * 2 / u.length)}ms ease-in`, h.style.pointerEvents = "none", V.push(h), B && a.appendChild(h);
    }
  });
  let y = null;
  if (b && u.length && u.at(-1)) {
    const o = Number(c(t, g.LAST_VALUE_FONT_SIZE, 12));
    y = document.createElementNS(A, "text"), y.classList.add("tiny-spark-last-value"), y.setAttribute("id", I), n ? (y.setAttribute("x", String(u.at(-1).x + Number(c(t, g.LINE_THICKNESS, 2)))), y.setAttribute("y", u.at(-1)?.isPositive ? String(u.at(-1).y - o / 3) : String(u.at(-1).bar.y + u.at(-1).bar.h + o)), y.setAttribute("text-anchor", "middle")) : (y.setAttribute("x", String(u.at(-1).x + 6 + Number(c(t, g.LINE_THICKNESS, 2)))), y.setAttribute("y", String(u.at(-1).y + o / 3)), y.setAttribute("text-anchor", "start")), y.setAttribute("font-size", String(o) + "px"), y.setAttribute("fill", String(c(t, g.LAST_VALUE_COLOR, String(c(t, g.INDICATOR_COLOR, "#1A1A1A"))))), y.innerHTML = nt(t, Number(u.at(-1).v)), y.style.opacity = u.length === 1 ? "1" : "0", a.appendChild(y);
  }
  u.forEach((o, f) => {
    const p = V[f], l = document.createElementNS(A, "rect");
    l.classList.add("tiny-spark-tooltip-trap"), l.setAttribute("x", `${u.length === 1 ? 0 : d.left + f * C - C / 2}`), l.setAttribute("y", `${d.top}`), l.setAttribute("height", `${d.height}`), l.setAttribute("width", `${C}`), l.setAttribute("fill", "transparent"), l.setAttribute("aria-describedby", `tooltip_${e}`), l.addEventListener("mouseenter", () => {
      q(a, t, o, e, !0), B ? document.getElementById(`circle_${e}_${f}`)?.setAttribute("r", String(Number(c(t, g.PLOT_RADIUS, 3)) * 1.5)) : a.appendChild(p), F[f].style.opacity = "1", b && y && (f === u.length - 1 ? y.style.opacity = "0" : y.style.opacity = "1");
    }), l.addEventListener("mouseout", () => {
      q(a, t, o, e, !1), B ? document.getElementById(`circle_${e}_${f}`)?.setAttribute("r", String(Number(c(t, g.PLOT_RADIUS, 3)))) : p.remove(), F.forEach((h) => h.style.opacity = "0"), b && y && (y.style.opacity = "1");
    }), a.appendChild(l);
  }), z === "true" && s ? et().then(() => {
    V.forEach((o) => {
      o.style.opacity = "1";
    }), U.forEach((o) => {
      o.style.opacity = "1";
    }), lt(w, 1e3, () => {
      y && (y.style.opacity = "1");
    }), dt(a, R);
  }) : (V.forEach((o) => {
    o.style.opacity = "1";
  }), U.forEach((o) => {
    o.style.opacity = "1";
  }), y && (y.style.opacity = "1")), t.appendChild(a), t.addEventListener("mouseleave", () => {
    const o = G[e];
    o && (cancelAnimationFrame(o.frameId), o.frameId = null, o.tool.style.opacity = "0", o.hasSnapped = !1);
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
        for (const m of e)
          if (m.type === "attributes" && m.attributeName && Object.values(J).includes(m.attributeName)) {
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
