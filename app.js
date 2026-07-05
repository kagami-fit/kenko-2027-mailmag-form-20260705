(function () {
  const storageKey = "kenko_2027_seminar_form_submissions";
  const params = new URLSearchParams(window.location.search);
  const form = document.querySelector("#seminarForm");
  const error = document.querySelector("#formError");
  const thanks = document.querySelector("#thanksBox");

  document.querySelector("#utmSource").value = params.get("utm_source") || "";
  document.querySelector("#utmMedium").value = params.get("utm_medium") || "";
  document.querySelector("#utmCampaign").value = params.get("utm_campaign") || "";

  function saveRow(row) {
    const rows = JSON.parse(localStorage.getItem(storageKey) || "[]");
    rows.push(row);
    localStorage.setItem(storageKey, JSON.stringify(rows));
  }

  function payloadFromForm(target) {
    const data = new FormData(target);
    const payload = {};
    for (const [key, value] of data.entries()) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        payload[key] = Array.isArray(payload[key])
          ? payload[key].concat(value)
          : [payload[key], value];
      } else {
        payload[key] = value;
      }
    }
    payload.seminar_title = "健康経営優良法人認定2027 準備セミナー";
    payload.seminar_date = "2026-07-29 12:20-12:50";
    payload.submitted_at = new Date().toISOString();
    payload.page_url = window.location.href;
    payload.lead_status = "未対応";
    return payload;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    error.textContent = "";

    if (!form.reportValidity()) {
      error.textContent = "必須項目とメールアドレスの形式を確認してください。";
      return;
    }

    saveRow(payloadFromForm(form));
    form.reset();
    thanks.hidden = false;
    thanks.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  if (window.lucide) window.lucide.createIcons();
})();
