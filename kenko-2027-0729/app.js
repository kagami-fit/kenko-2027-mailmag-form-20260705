(function () {
  const storageKey = "kenko_2027_seminar_form_submissions";
  const sheetEndpoint =
    "https://script.google.com/macros/s/AKfycbxNUg3_9CzA5sZ-adgnFrmIwjfrKvGEdn_nMbkxubbHANGCLzHpF7TU1B4RzqhMLCujWw/exec";
  const params = new URLSearchParams(window.location.search);
  const form = document.querySelector("#seminarForm");
  const error = document.querySelector("#formError");
  const thanks = document.querySelector("#thanksBox");
  const submitButton = form.querySelector(".submit-button");
  const submitLabel = submitButton.querySelector("span");
  const defaultSubmitLabel = submitLabel.textContent;

  document.querySelector("#utmSource").value = params.get("utm_source") || "";
  document.querySelector("#utmMedium").value = params.get("utm_medium") || "";
  document.querySelector("#utmCampaign").value = params.get("utm_campaign") || "";

  function saveRow(row) {
    const rows = JSON.parse(localStorage.getItem(storageKey) || "[]");
    rows.push(row);
    localStorage.setItem(storageKey, JSON.stringify(rows));
  }

  function isSheetEndpointConfigured() {
    return sheetEndpoint.startsWith("https://script.google.com/macros/s/");
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
    payload.seminar_title =
      target.dataset.seminarTitle || "健康経営優良法人認定2027 準備セミナー";
    payload.seminar_date = target.dataset.seminarDate || "2026-07-29 12:20-12:50";
    payload.submitted_at = new Date().toISOString();
    payload.page_url = window.location.href;
    payload.lead_status = "未対応";
    payload.privacy_consent = payload.privacy_consent ? "同意" : "";
    return payload;
  }

  async function postToSheet(payload) {
    if (!isSheetEndpointConfigured()) {
      throw new Error("Google Sheetsの送信先URLがまだ設定されていません。");
    }

    await fetch(sheetEndpoint, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
  }

  function setSubmitting(isSubmitting) {
    submitButton.disabled = isSubmitting;
    submitLabel.textContent = isSubmitting ? "送信中..." : defaultSubmitLabel;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    error.textContent = "";
    thanks.hidden = true;

    if (!form.reportValidity()) {
      error.textContent = "必須項目とメールアドレスの形式を確認してください。";
      return;
    }

    const payload = payloadFromForm(form);
    saveRow(payload);

    try {
      setSubmitting(true);
      await postToSheet(payload);
      form.reset();
      thanks.hidden = false;
      thanks.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (submissionError) {
      error.textContent =
        submissionError.message ||
        "送信できませんでした。時間をおいて再度お試しください。";
    } finally {
      setSubmitting(false);
    }
  });

  if (window.lucide) window.lucide.createIcons();
})();
