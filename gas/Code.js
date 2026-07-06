const SHEET_NAME = "申込一覧";
const DEFAULT_SPREADSHEET_ID = "175biha_rd58pC8ixceY0nOM7ZLWS6AfSVoxVQqu0MYk";

const FIELDS = [
  "submitted_at",
  "lead_status",
  "campaign_id",
  "seminar_title",
  "seminar_date",
  "company",
  "department",
  "name",
  "email",
  "phone",
  "employee_size",
  "certification_status",
  "interests",
  "message",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "page_url",
  "privacy_consent",
];

const HEADERS = [
  "送信日時",
  "対応状況",
  "キャンペーンID",
  "セミナー名",
  "開催日時",
  "会社名",
  "部署名",
  "お名前",
  "メールアドレス",
  "電話番号",
  "従業員規模",
  "認定への取り組み状況",
  "気になっているテーマ",
  "事前に聞きたいこと",
  "UTM Source",
  "UTM Medium",
  "UTM Campaign",
  "申込ページURL",
  "個人情報同意",
];

function doGet() {
  try {
    setupSheet();
    return jsonOutput_({
      ok: true,
      message: "BODY PALETTE seminar form endpoint is ready.",
    });
  } catch (error) {
    console.error(error);
    return jsonOutput_({
      ok: false,
      error: error.message,
    });
  }
}

function doPost(e) {
  try {
    const payload = parsePayload_(e);
    const sheet = setupSheet();
    sheet.appendRow(FIELDS.map((field) => normalizeCell_(payload[field])));

    return jsonOutput_({
      ok: true,
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    return jsonOutput_({
      ok: false,
      error: error.message,
    });
  }
}

function setupSheet() {
  const spreadsheet = getSpreadsheet_();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  const currentHeaders = headerRange.getValues()[0];
  const headerIsEmpty = currentHeaders.every((value) => value === "");

  if (headerIsEmpty || currentHeaders.join("\t") !== HEADERS.join("\t")) {
    headerRange.setValues([HEADERS]);
  }

  sheet.setFrozenRows(1);
  headerRange
    .setBackground("#162033")
    .setFontColor("#ffffff")
    .setFontWeight("bold")
    .setWrap(true);
  sheet.getRange("A:A").setNumberFormat("yyyy-mm-dd hh:mm:ss");
  sheet.autoResizeColumns(1, HEADERS.length);

  return sheet;
}

function getSpreadsheet_() {
  const spreadsheetId =
    PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID") ||
    DEFAULT_SPREADSHEET_ID;

  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId);
  }

  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!activeSpreadsheet) {
    throw new Error("スプレッドシートが見つかりません。SPREADSHEET_IDを設定してください。");
  }

  return activeSpreadsheet;
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("送信データが空です。");
  }

  return JSON.parse(e.postData.contents);
}

function normalizeCell_(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return value;
}

function jsonOutput_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
