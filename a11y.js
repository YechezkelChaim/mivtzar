/* תפריט נגישות של מבצר – בלי שירות חיצוני. ההעדפות נשמרות בדפדפן של המשתמש בלבד. */
(function () {
  if (window.__mvzA11y) return; window.__mvzA11y = 1;
  var KEY = "mvz-a11y", ZOOMS = [1, 1.15, 1.3, 1.5, 1.75];
  var st = { z: 0, contrast: 0, gray: 0, links: 0, font: 0, still: 0, cursor: 0 };
  try { var saved = JSON.parse(localStorage.getItem(KEY) || "{}"); for (var k in saved) if (k in st) st[k] = saved[k]; } catch (e) {}

  var css = ""
    + ".a11y-root{position:fixed;left:14px;bottom:14px;z-index:2147483000;font-family:system-ui,'Segoe UI',Arial,sans-serif;direction:rtl}"
    + ".a11y-btn{width:54px;height:54px;border-radius:50%;border:3px solid #fff;background:#1E4FA3;color:#fff;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;padding:0}"
    + ".a11y-btn svg{width:30px;height:30px}"
    + ".a11y-btn:focus-visible,.a11y-panel button:focus-visible{outline:3px solid #F28C1E;outline-offset:2px}"
    + ".a11y-panel{position:absolute;left:0;bottom:64px;width:290px;max-width:calc(100vw - 28px);background:#fff;color:#1A1F2B;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.3);padding:14px;display:none}"
    + ".a11y-panel.open{display:block}"
    + ".a11y-panel h2{font-size:18px;margin:0 0 10px;color:#123572}"
    + ".a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}"
    + ".a11y-panel button{font:inherit;font-size:15px;padding:10px 6px;border-radius:10px;border:2px solid #C9D2E0;background:#F4F6FA;color:#1A1F2B;cursor:pointer;margin:0;width:100%}"
    + ".a11y-panel button[aria-pressed=true]{background:#1E4FA3;border-color:#1E4FA3;color:#fff}"
    + ".a11y-panel .wide{grid-column:1/-1}"
    + ".a11y-panel a{display:block;text-align:center;margin-top:10px;color:#1E4FA3;font-size:15px}"
    /* מצבים */
    + "html.a11y-contrast body,html.a11y-contrast body *:not(.a11y-root):not(.a11y-root *){background-color:#000!important;color:#fff!important;border-color:#fff!important;box-shadow:none!important}"
    + "html.a11y-contrast body a:not(.a11y-root *){color:#FFE600!important}"
    + "html.a11y-contrast body button:not(.a11y-root *),html.a11y-contrast body input:not(.a11y-root *){background:#000!important;color:#FFE600!important;border:2px solid #FFE600!important}"
    + "html.a11y-gray body>*:not(.a11y-root){filter:grayscale(1)}"
    + "html.a11y-links a:not(.a11y-root *){text-decoration:underline!important;text-underline-offset:3px;font-weight:700!important}"
    + "html.a11y-font body *:not(.a11y-root *){font-family:Arial,'Segoe UI',sans-serif!important;letter-spacing:.03em!important;word-spacing:.12em!important;line-height:1.8!important}"
    + "html.a11y-still *,html.a11y-still *::before,html.a11y-still *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}"
    + "html.a11y-cursor,html.a11y-cursor *{cursor:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'%3E%3Cpath d='M4 2l16 10-7 1.5L16 21l-3 1.5-3.5-7.5L4 19z' fill='black' stroke='white' stroke-width='1.2'/%3E%3C/svg%3E\") 4 2,auto!important}";
  var s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);

  var root = document.createElement("div"); root.className = "a11y-root";
  root.innerHTML =
    '<button class="a11y-btn" type="button" aria-expanded="false" aria-controls="a11y-panel" aria-label="תפריט נגישות">'
    + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4" r="2"/><path d="M4 8h16M12 8v13M8 21l4-8 4 8"/></svg></button>'
    + '<div class="a11y-panel" id="a11y-panel" role="dialog" aria-label="תפריט נגישות"><h2>נגישות</h2><div class="a11y-grid">'
    + '<button type="button" data-a="z+">הגדלת טקסט</button><button type="button" data-a="z-">הקטנת טקסט</button>'
    + '<button type="button" data-t="contrast">ניגודיות גבוהה</button><button type="button" data-t="gray">גווני אפור</button>'
    + '<button type="button" data-t="links">הדגשת קישורים</button><button type="button" data-t="font">גופן קריא</button>'
    + '<button type="button" data-t="still">עצירת אנימציות</button><button type="button" data-t="cursor">סמן גדול</button>'
    + '<button type="button" data-a="reset" class="wide">איפוס הגדרות הנגישות</button>'
    + '</div><a href="accessibility.html">הצהרת נגישות</a></div>';
  document.body.appendChild(root);
  var btn = root.querySelector(".a11y-btn"), panel = root.querySelector(".a11y-panel");

  function apply() {
    var h = document.documentElement;
    ["contrast", "gray", "links", "font", "still", "cursor"].forEach(function (k) { h.classList.toggle("a11y-" + k, !!st[k]); });
    var z = ZOOMS[st.z] || 1;
    h.style.zoom = z === 1 ? "" : String(z); // כמו הגדלה של הדפדפן – הטקסט נשבר לשורות ולא יוצא מהמסך
    root.style.zoom = z === 1 ? "" : String(1 / z); // התפריט עצמו לא גדל
    root.querySelectorAll("[data-t]").forEach(function (b) { b.setAttribute("aria-pressed", st[b.dataset.t] ? "true" : "false"); });
    try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {}
  }
  function toggle(open) {
    panel.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) panel.querySelector("button").focus();
  }
  btn.addEventListener("click", function () { toggle(!panel.classList.contains("open")); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && panel.classList.contains("open")) { toggle(false); btn.focus(); } });
  document.addEventListener("click", function (e) { if (!root.contains(e.target)) toggle(false); });
  root.querySelectorAll("[data-t]").forEach(function (b) { b.addEventListener("click", function () { st[b.dataset.t] = st[b.dataset.t] ? 0 : 1; apply(); }); });
  root.querySelectorAll("[data-a]").forEach(function (b) {
    b.addEventListener("click", function () {
      var a = b.dataset.a;
      if (a === "z+") st.z = Math.min(ZOOMS.length - 1, st.z + 1);
      else if (a === "z-") st.z = Math.max(0, st.z - 1);
      else if (a === "reset") for (var k in st) st[k] = 0;
      apply();
    });
  });
  apply();
})();
