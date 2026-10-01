import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const modelDir = path.join(root, "model");
const previewDir = path.join(root, "outputs", "previews");
await fs.mkdir(modelDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const COLORS = {
  navy: "#17365D",
  blue: "#1F4E78",
  teal: "#0F6B78",
  lightBlue: "#D9EAF7",
  input: "#FFF2CC",
  inputFont: "#0000FF",
  calc: "#E7E6E6",
  link: "#008000",
  white: "#FFFFFF",
  dark: "#1F2937",
  border: "#C9D2DC",
  warning: "#FCE4D6",
};

const FONT = "Aptos";

function title(sheet, range, text, subtitle) {
  sheet.mergeCells(range);
  const topLeft = range.split(":")[0];
  sheet.getRange(topLeft).values = [[text]];
  sheet.getRange(range).format = {
    fill: COLORS.navy,
    font: { name: FONT, size: 18, bold: true, color: COLORS.white },
    verticalAlignment: "center",
  };
  sheet.getRange(range).format.rowHeight = 30;
  if (subtitle) {
    const row = Number(topLeft.match(/\d+/)[0]) + 1;
    sheet.mergeCells(`A${row}:H${row}`);
    sheet.getRange(`A${row}`).values = [[subtitle]];
    sheet.getRange(`A${row}:H${row}`).format = {
      fill: COLORS.lightBlue,
      font: { name: FONT, size: 10, italic: true, color: COLORS.dark },
      wrapText: true,
    };
    sheet.getRange(`A${row}:H${row}`).format.rowHeight = 28;
  }
}

function section(range, text) {
  range.values = [[text]];
  range.format = {
    fill: COLORS.blue,
    font: { name: FONT, bold: true, color: COLORS.white },
  };
}

function header(range) {
  range.format = {
    fill: COLORS.teal,
    font: { name: FONT, bold: true, color: COLORS.white },
    borders: { preset: "all", style: "thin", color: COLORS.border },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
  };
}

function inputStyle(range, numberFormat = null) {
  range.format = {
    fill: COLORS.input,
    font: { name: FONT, color: COLORS.inputFont },
    borders: { preset: "all", style: "thin", color: COLORS.border },
  };
  if (numberFormat) range.format.numberFormat = numberFormat;
}

function calcStyle(range, numberFormat = null) {
  range.format = {
    fill: COLORS.calc,
    font: { name: FONT, color: COLORS.dark },
    borders: { preset: "all", style: "thin", color: COLORS.border },
  };
  if (numberFormat) range.format.numberFormat = numberFormat;
}

function linkedStyle(range, numberFormat = null) {
  range.format = {
    font: { name: FONT, color: COLORS.link },
    borders: { preset: "all", style: "thin", color: COLORS.border },
  };
  if (numberFormat) range.format.numberFormat = numberFormat;
}

function baseSheet(sheet) {
  sheet.showGridLines = false;
  sheet.freezePanes.freezeRows(4);
}

function fit(sheet, widths) {
  for (const [col, width] of Object.entries(widths)) {
    sheet.getRange(`${col}:${col}`).format.columnWidth = width;
  }
}

function scenarioFormula(base, bull, bear, selector) {
  return `=IF(${selector}="Bull",${bull},IF(${selector}="Bear",${bear},${base}))`;
}

async function finalizeWorkbook(workbook, filename, sheetNames, checks) {
  workbook.recalculate();
  for (const sheetName of sheetNames) {
    const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
    const safe = sheetName.toLowerCase().replaceAll(" ", "_");
    await fs.writeFile(path.join(previewDir, `${filename.replace(".xlsx", "")}_${safe}.png`), new Uint8Array(await preview.arrayBuffer()));
  }
  const summary = [];
  for (const check of checks) {
    const result = await workbook.inspect({ kind: "region", sheetId: check.sheet, range: check.range, maxChars: 5000 });
    summary.push({ sheet: check.sheet, range: check.range, inspect: result.ndjson ?? String(result) });
  }
  const errorScan = await workbook.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 100 },
    maxChars: 5000,
  });
  summary.push({ errorScan: errorScan.ndjson ?? String(errorScan) });
  await fs.writeFile(path.join(previewDir, `${filename.replace(".xlsx", "")}_validation.json`), JSON.stringify(summary, null, 2));
  const output = await SpreadsheetFile.exportXlsx(workbook);
  await output.save(path.join(modelDir, filename));
}

async function buildHbmModel() {
  const wb = Workbook.create();
  const summary = wb.worksheets.add("Summary");
  const inputs = wb.worksheets.add("Scenario Inputs");
  const build = wb.worksheets.add("Vintage Build");
  const sources = wb.worksheets.add("Sources");
  [summary, inputs, build, sources].forEach(baseSheet);

  title(summary, "A1:H1", "SK hynix HBM Generation Model", "Illustrative template only · Replace yellow/blue inputs with sourced assumptions");
  summary.getRange("A4:B4").values = [["Selected Scenario", null]];
  summary.getRange("B4").formulas = [["='Scenario Inputs'!B3"]];
  linkedStyle(summary.getRange("B4"));
  summary.getRange("A6:F6").values = [["Metric", "2026E", "2027E", "2028E", "2029E", "2030E"]];
  header(summary.getRange("A6:F6"));
  summary.getRange("A7:A13").values = [
    ["HBM3E Revenue"], ["HBM4 Revenue"], ["HBM4E Revenue"], ["Total HBM Revenue"],
    ["HBM EBIT"], ["HBM EBIT Margin"], ["HBM4+ Revenue Mix"],
  ];
  const summaryRows = [8, 16, 24, 28, 29, 30, 31];
  for (let i = 0; i < summaryRows.length; i++) {
    const row = 7 + i;
    const sourceRow = summaryRows[i];
    for (let col = 0; col < 5; col++) {
      const letter = String.fromCharCode("B".charCodeAt(0) + col);
      summary.getRange(`${letter}${row}`).formulas = [[`='Vintage Build'!${letter}${sourceRow}`]];
    }
  }
  linkedStyle(summary.getRange("B7:F11"), "#,##0");
  linkedStyle(summary.getRange("B12:F13"), "0.0%");
  summary.getRange("A15:F15").merge();
  summary.getRange("A15").values = [["Interpretation prompts"]];
  section(summary.getRange("A15:F15"), "Interpretation prompts");
  summary.getRange("A16:F19").values = [
    ["Question", "Why it matters", "Base case test", "Bull trigger", "Bear trigger", "Owner"],
    ["Does HBM4 replace HBM3E before ASP erosion dominates?", "Protects mix and margin", "HBM4+ mix rises", "Faster qualification", "Ramp delay", "Analyst"],
    ["Does yield normalize before volume inflects?", "EBIT lags revenue if not", "Yield reaches target", "Learning curve beats plan", "Scrap/rework persists", "Analyst"],
    ["Is growth diversified by customer and product?", "Reduces concentration discount", "No single milestone dominates", "Broader adoption", "Customer delay", "Analyst"],
  ];
  header(summary.getRange("A16:F16"));
  summary.getRange("A17:F19").format = { wrapText: true, borders: { preset: "all", style: "thin", color: COLORS.border } };
  fit(summary, { A: 30, B: 18, C: 18, D: 18, E: 18, F: 16 });

  title(inputs, "A1:H1", "Scenario Inputs", "Blue font and yellow fill = user input · Values are illustrative");
  inputs.getRange("A3:B3").values = [["Selected Scenario", "Base"]];
  inputStyle(inputs.getRange("B3"));
  inputs.getRange("B3").dataValidation = { rule: { type: "list", values: ["Base", "Bull", "Bear"] } };
  inputs.getRange("A5:G5").values = [["Generation / Metric", "Unit", "2026E", "2027E", "2028E", "2029E", "2030E"]];
  header(inputs.getRange("A5:G5"));
  const genData = [
    ["HBM3E Volume Index", "Index", 100, 90, 65, 35, 15],
    ["HBM3E ASP Index", "Index", 100, 88, 78, 70, 65],
    ["HBM3E Yield / Ramp", "%", 0.95, 0.97, 0.98, 0.98, 0.98],
    ["HBM3E EBIT Margin", "%", 0.38, 0.34, 0.28, 0.20, 0.15],
    ["HBM3E Scale", "KRW bn / point", 20, 20, 20, 20, 20],
    ["", "", null, null, null, null, null],
    ["HBM4 Volume Index", "Index", 35, 90, 140, 150, 125],
    ["HBM4 ASP Index", "Index", 125, 118, 105, 92, 82],
    ["HBM4 Yield / Ramp", "%", 0.70, 0.88, 0.95, 0.97, 0.98],
    ["HBM4 EBIT Margin", "%", 0.28, 0.38, 0.41, 0.37, 0.31],
    ["HBM4 Scale", "KRW bn / point", 20, 20, 20, 20, 20],
    ["", "", null, null, null, null, null],
    ["HBM4E Volume Index", "Index", 0, 20, 70, 120, 155],
    ["HBM4E ASP Index", "Index", 145, 140, 130, 118, 105],
    ["HBM4E Yield / Ramp", "%", 0.00, 0.55, 0.80, 0.92, 0.96],
    ["HBM4E EBIT Margin", "%", 0.20, 0.24, 0.34, 0.40, 0.38],
    ["HBM4E Scale", "KRW bn / point", 20, 20, 20, 20, 20],
  ];
  inputs.getRange("A6:G22").values = genData;
  inputStyle(inputs.getRange("C6:G22"));
  inputs.getRange("C6:G22").format.numberFormat = "0.0";
  inputs.getRange("C8:G9").format.numberFormat = "0.0%";
  inputs.getRange("C14:G15").format.numberFormat = "0.0%";
  inputs.getRange("C20:G21").format.numberFormat = "0.0%";
  inputs.getRange("A25:E25").values = [["Scenario", "Volume Mult.", "ASP Mult.", "Yield Delta", "Margin Delta"]];
  header(inputs.getRange("A25:E25"));
  inputs.getRange("A26:E28").values = [
    ["Base", 1.00, 1.00, 0.00, 0.00],
    ["Bull", 1.12, 1.06, 0.03, 0.03],
    ["Bear", 0.82, 0.90, -0.06, -0.06],
  ];
  inputStyle(inputs.getRange("B26:E28"));
  inputs.getRange("B26:E28").format.numberFormat = "0.0%";
  fit(inputs, { A: 26, B: 16, C: 13, D: 13, E: 13, F: 13, G: 13, H: 3 });

  title(build, "A1:H1", "HBM Vintage Build", "Revenue = Volume index × ASP index × Yield/Ramp × Scale; scenario multipliers are explicit");
  build.getRange("A3:F3").values = [["Metric", "2026E", "2027E", "2028E", "2029E", "2030E"]];
  header(build.getRange("A3:F3"));
  const blocks = [
    { name: "HBM3E", start: 5, inputStart: 6 },
    { name: "HBM4", start: 13, inputStart: 12 },
    { name: "HBM4E", start: 21, inputStart: 18 },
  ];
  for (const block of blocks) {
    const r = block.start;
    build.getRange(`A${r}:A${r + 5}`).values = [[`${block.name} Volume`], [`${block.name} ASP`], [`${block.name} Yield / Ramp`], [`${block.name} Revenue`], [`${block.name} EBIT Margin`], [`${block.name} EBIT`]];
    for (let c = 0; c < 5; c++) {
      const out = String.fromCharCode(66 + c);
      const inp = String.fromCharCode(67 + c);
      const volRow = block.inputStart;
      const aspRow = block.inputStart + 1;
      const yieldRow = block.inputStart + 2;
      const marginRow = block.inputStart + 3;
      const scaleRow = block.inputStart + 4;
      const volMult = scenarioFormula("'Scenario Inputs'!$B$26", "'Scenario Inputs'!$B$27", "'Scenario Inputs'!$B$28", "'Scenario Inputs'!$B$3");
      const aspMult = scenarioFormula("'Scenario Inputs'!$C$26", "'Scenario Inputs'!$C$27", "'Scenario Inputs'!$C$28", "'Scenario Inputs'!$B$3");
      const yieldDelta = scenarioFormula("'Scenario Inputs'!$D$26", "'Scenario Inputs'!$D$27", "'Scenario Inputs'!$D$28", "'Scenario Inputs'!$B$3");
      const marginDelta = scenarioFormula("'Scenario Inputs'!$E$26", "'Scenario Inputs'!$E$27", "'Scenario Inputs'!$E$28", "'Scenario Inputs'!$B$3");
      build.getRange(`${out}${r}`).formulas = [[`='Scenario Inputs'!${inp}${volRow}*(${volMult.slice(1)})`]];
      build.getRange(`${out}${r + 1}`).formulas = [[`='Scenario Inputs'!${inp}${aspRow}*(${aspMult.slice(1)})`]];
      build.getRange(`${out}${r + 2}`).formulas = [[`=MIN(1,'Scenario Inputs'!${inp}${yieldRow}+(${yieldDelta.slice(1)}))`]];
      build.getRange(`${out}${r + 3}`).formulas = [[`=${out}${r}*${out}${r + 1}/100*${out}${r + 2}*'Scenario Inputs'!${inp}${scaleRow}`]];
      build.getRange(`${out}${r + 4}`).formulas = [[`='Scenario Inputs'!${inp}${marginRow}+(${marginDelta.slice(1)})`]];
      build.getRange(`${out}${r + 5}`).formulas = [[`=${out}${r + 3}*${out}${r + 4}`]];
    }
    linkedStyle(build.getRange(`B${r}:F${r + 5}`));
    build.getRange(`B${r + 2}:F${r + 2}`).format.numberFormat = "0.0%";
    build.getRange(`B${r + 4}:F${r + 4}`).format.numberFormat = "0.0%";
    build.getRange(`B${r + 3}:F${r + 3}`).format.numberFormat = "#,##0";
    build.getRange(`B${r + 5}:F${r + 5}`).format.numberFormat = "#,##0";
  }
  build.getRange("A28:A31").values = [["Total HBM Revenue"], ["Total HBM EBIT"], ["HBM EBIT Margin"], ["HBM4+ Revenue Mix"]];
  for (let c = 0; c < 5; c++) {
    const x = String.fromCharCode(66 + c);
    build.getRange(`${x}28`).formulas = [[`=SUM(${x}8,${x}16,${x}24)`]];
    build.getRange(`${x}29`).formulas = [[`=SUM(${x}10,${x}18,${x}26)`]];
    build.getRange(`${x}30`).formulas = [[`=${x}29/${x}28`]];
    build.getRange(`${x}31`).formulas = [[`=(${x}16+${x}24)/${x}28`]];
  }
  calcStyle(build.getRange("B28:F29"), "#,##0");
  calcStyle(build.getRange("B30:F31"), "0.0%");
  fit(build, { A: 28, B: 14, C: 14, D: 14, E: 14, F: 14, G: 3, H: 3 });

  title(sources, "A1:H1", "Sources & Assumption Log", "Record source, as-of date, unit, owner, and the condition that would change the assumption");
  sources.getRange("A4:H4").values = [["Input", "Source", "URL / File", "As-of", "Unit", "Status", "Owner", "Change condition"]];
  header(sources.getRange("A4:H4"));
  sources.getRange("A5:H9").values = [
    ["HBM shipment / generation mix", "SK hynix IR", "https://news.skhynix.com/category/ir/", "", "Index", "To source", "Analyst", "New guidance or qualification update"],
    ["Memory pricing", "Company IR / industry data", "", "", "Index", "To source", "Analyst", "Contract price reset"],
    ["Yield / ramp", "Management commentary", "", "", "%", "Scenario", "Analyst", "Ramp timing changes"],
    ["EBIT margin", "Analyst estimate", "", "", "%", "Scenario", "Analyst", "Cost or ASP deviation"],
    ["Scale factor", "Model calibration", "", "", "KRW bn / point", "Illustrative", "Analyst", "Actual segment revenue available"],
  ];
  sources.getRange("A5:H9").format = { wrapText: true, borders: { preset: "all", style: "thin", color: COLORS.border } };
  inputStyle(sources.getRange("B5:H9"));
  fit(sources, { A: 26, B: 24, C: 38, D: 13, E: 16, F: 14, G: 13, H: 30 });

  await finalizeWorkbook(wb, "HBM_generation_model.xlsx", ["Summary", "Scenario Inputs", "Vintage Build", "Sources"], [
    { sheet: "Summary", range: "A4:F13" },
    { sheet: "Vintage Build", range: "A28:F31" },
  ]);
}

async function buildSotpModel() {
  const wb = Workbook.create();
  const summary = wb.worksheets.add("Summary");
  const inputs = wb.worksheets.add("Segment Inputs");
  const dcf = wb.worksheets.add("DCF Check");
  const sources = wb.worksheets.add("Sources");
  [summary, inputs, dcf, sources].forEach(baseSheet);

  title(summary, "A1:H1", "SK hynix SOTP Valuation", "Primary valuation · Segment economics remain separate; DCF is a cross-check, not an averaged target");
  summary.getRange("A4:B4").values = [["Selected Scenario", null]];
  summary.getRange("B4").formulas = [["='Segment Inputs'!B3"]];
  linkedStyle(summary.getRange("B4"));
  summary.getRange("A6:E6").values = [["Segment", "Active EBIT", "Multiple", "Segment EV", "Role"]];
  header(summary.getRange("A6:E6"));
  const segments = ["HBM & AI DRAM", "Conventional DRAM", "NAND & Solidigm", "Other & Adjustments"];
  summary.getRange("A7:A10").values = segments.map(x => [x]);
  summary.getRange("E7:E10").values = [["Growth / visibility"], ["Mid-cycle anchor"], ["NAND peer check"], ["Conservative"]];
  for (let i = 0; i < 4; i++) {
    const row = 7 + i;
    const inputRow = 6 + i;
    summary.getRange(`B${row}`).formulas = [[`='Segment Inputs'!I${inputRow}`]];
    summary.getRange(`C${row}`).formulas = [[`='Segment Inputs'!J${inputRow}`]];
    summary.getRange(`D${row}`).formulas = [[`=B${row}*C${row}`]];
  }
  linkedStyle(summary.getRange("B7:C10"), "#,##0.0");
  calcStyle(summary.getRange("D7:D10"), "#,##0");
  summary.getRange("A12:D16").values = [
    ["Enterprise Value", null, null, null],
    ["Net Cash / (Debt)", null, null, null],
    ["Non-operating Assets", null, null, null],
    ["Equity Value", null, null, null],
    ["Value per Share", null, null, null],
  ];
  summary.getRange("D12").formulas = [["=SUM(D7:D10)"]];
  summary.getRange("D13").formulas = [["='Segment Inputs'!B13"]];
  summary.getRange("D14").formulas = [["='Segment Inputs'!B14"]];
  summary.getRange("D15").formulas = [["=SUM(D12:D14)"]];
  summary.getRange("D16").formulas = [["=D15*1000/'Segment Inputs'!B15"]];
  calcStyle(summary.getRange("D12:D15"), "#,##0");
  calcStyle(summary.getRange("D16"), "#,##0");
  summary.getRange("A18:D18").values = [["DCF Cross-check", null, null, null]];
  summary.mergeCells("A18:D18");
  section(summary.getRange("A18:D18"), "DCF Cross-check");
  summary.getRange("A19:D22").values = [["Metric", "SOTP", "DCF", "Interpretation"], ["Equity Value", null, null, ""], ["Value per Share", null, null, ""], ["DCF / SOTP", null, null, ""]];
  header(summary.getRange("A19:D19"));
  summary.getRange("B20").formulas = [["=D15"]];
  summary.getRange("C20").formulas = [["='DCF Check'!B24"]];
  summary.getRange("B21").formulas = [["=D16"]];
  summary.getRange("C21").formulas = [["='DCF Check'!B25"]];
  summary.getRange("B22").formulas = [["=C20/B20"]];
  summary.getRange("D20:D22").values = [["If DCF is lower, revisit CAPEX and cash conversion"], ["Do not average mechanically"], ["Large gap requires explanation"]];
  linkedStyle(summary.getRange("B20:C21"), "#,##0");
  linkedStyle(summary.getRange("B22"), "0.0%");
  fit(summary, { A: 28, B: 16, C: 15, D: 32, E: 22, F: 3 });

  title(inputs, "A1:J1", "Segment Inputs", "Illustrative inputs; active columns I:J change with the scenario selector");
  inputs.getRange("A3:B3").values = [["Selected Scenario", "Base"]];
  inputStyle(inputs.getRange("B3"));
  inputs.getRange("B3").dataValidation = { rule: { type: "list", values: ["Base", "Bull", "Bear"] } };
  inputs.getRange("A5:J5").values = [["Segment", "Base EBIT", "Base x", "Bull EBIT", "Bull x", "Bear EBIT", "Bear x", "Basis", "Active EBIT", "Active x"]];
  header(inputs.getRange("A5:J5"));
  inputs.getRange("A6:H9").values = [
    ["HBM & AI DRAM", 12000, 12.0, 15000, 13.5, 7500, 8.5, "EV / EBIT"],
    ["Conventional DRAM", 6000, 7.0, 7500, 8.0, 2500, 5.0, "EV / EBIT"],
    ["NAND & Solidigm", 1500, 6.0, 2800, 7.0, -500, 4.0, "EV / EBIT"],
    ["Other & Adjustments", 300, 5.0, 500, 5.5, 0, 3.0, "EV / EBIT"],
  ];
  inputStyle(inputs.getRange("B6:G9"), "#,##0.0");
  for (let i = 0; i < 4; i++) {
    const row = 6 + i;
    inputs.getRange(`I${row}`).formulas = [[scenarioFormula(`B${row}`, `D${row}`, `F${row}`, "$B$3")]];
    inputs.getRange(`J${row}`).formulas = [[scenarioFormula(`C${row}`, `E${row}`, `G${row}`, "$B$3")]];
  }
  calcStyle(inputs.getRange("I6:J9"), "#,##0.0");
  inputs.getRange("A12:B15").values = [["Balance sheet items", "Input"], ["Net Cash / (Debt), KRW bn", 5000], ["Non-operating Assets, KRW bn", 2000], ["Diluted Shares, mn", 720]];
  header(inputs.getRange("A12:B12"));
  inputStyle(inputs.getRange("B13:B15"), "#,##0");
  inputs.getRange("A17:J18").values = [
    ["Decision rule", "SOTP is the center value. DCF and PER are diagnostic cross-checks.", null, null, null, null, null, null, null, null],
    ["Warning", "Negative NAND EBIT should not be valued with a positive earnings multiple without normalization.", null, null, null, null, null, null, null, null],
  ];
  inputs.mergeCells("B17:J17");
  inputs.mergeCells("B18:J18");
  inputs.getRange("A17:J18").format = { fill: COLORS.warning, wrapText: true, font: { name: FONT, italic: true, color: COLORS.dark } };
  inputs.getRange("A17:J18").format.rowHeight = 34;
  fit(inputs, { A: 25, B: 14, C: 11, D: 14, E: 11, F: 14, G: 11, H: 14, I: 14, J: 11 });

  title(dcf, "A1:H1", "DCF Cash-flow Check", "Illustrative unlevered DCF · focus on CAPEX, working capital, and normalized margins");
  dcf.getRange("A4:F4").values = [["Metric", "2026E", "2027E", "2028E", "2029E", "2030E"]];
  header(dcf.getRange("A4:F4"));
  dcf.getRange("A5:A13").values = [["Revenue"], ["EBIT Margin"], ["EBIT"], ["Tax Rate"], ["NOPAT"], ["D&A"], ["CAPEX"], ["Change in NWC"], ["FCFF"]];
  dcf.getRange("B5:F6").values = [[90000, 102000, 112000, 118000, 122000], [0.32, 0.34, 0.33, 0.30, 0.28]];
  dcf.getRange("B8:F8").values = [[0.24, 0.24, 0.24, 0.24, 0.24]];
  dcf.getRange("B10:F12").values = [[12000, 13000, 14000, 14500, 15000], [22000, 24000, 24000, 23000, 22000], [1500, 1800, 1800, 1500, 1200]];
  inputStyle(dcf.getRange("B5:F6"));
  inputStyle(dcf.getRange("B8:F8"));
  inputStyle(dcf.getRange("B10:F12"));
  dcf.getRange("B6:F6").format.numberFormat = "0.0%";
  dcf.getRange("B8:F8").format.numberFormat = "0.0%";
  for (let c = 0; c < 5; c++) {
    const x = String.fromCharCode(66 + c);
    dcf.getRange(`${x}7`).formulas = [[`=${x}5*${x}6`]];
    dcf.getRange(`${x}9`).formulas = [[`=${x}7*(1-${x}8)`]];
    dcf.getRange(`${x}13`).formulas = [[`=${x}9+${x}10-${x}11-${x}12`]];
  }
  calcStyle(dcf.getRange("B7:F7"), "#,##0");
  calcStyle(dcf.getRange("B9:F9"), "#,##0");
  calcStyle(dcf.getRange("B13:F13"), "#,##0");
  dcf.getRange("A16:B18").values = [["DCF Assumptions", "Input"], ["WACC", 0.09], ["Terminal Growth", 0.02]];
  header(dcf.getRange("A16:B16"));
  inputStyle(dcf.getRange("B17:B18"), "0.0%");
  dcf.getRange("A20:B25").values = [["PV of Explicit FCFF", null], ["Terminal Value", null], ["PV of Terminal Value", null], ["Enterprise Value", null], ["Equity Value", null], ["Value per Share", null]];
  dcf.getRange("B20").formulas = [["=B13/(1+$B$17)^1+C13/(1+$B$17)^2+D13/(1+$B$17)^3+E13/(1+$B$17)^4+F13/(1+$B$17)^5"]];
  dcf.getRange("B21").formulas = [["=F13*(1+$B$18)/($B$17-$B$18)"]];
  dcf.getRange("B22").formulas = [["=B21/(1+$B$17)^5"]];
  dcf.getRange("B23").formulas = [["=SUM(B20,B22)"]];
  dcf.getRange("B24").formulas = [["=B23+'Segment Inputs'!B13+'Segment Inputs'!B14"]];
  dcf.getRange("B25").formulas = [["=B24*1000/'Segment Inputs'!B15"]];
  calcStyle(dcf.getRange("B20:B24"), "#,##0");
  calcStyle(dcf.getRange("B25"), "#,##0");
  fit(dcf, { A: 28, B: 15, C: 15, D: 15, E: 15, F: 15, G: 3, H: 3 });

  title(sources, "A1:H1", "Sources & Valuation Rationale", "Separate observed data from analyst assumptions and record why each multiple is used");
  sources.getRange("A4:H4").values = [["Item", "Source", "URL / File", "As-of", "Unit", "Type", "Owner", "Rationale / update trigger"]];
  header(sources.getRange("A4:H4"));
  sources.getRange("A5:H10").values = [
    ["Segment EBIT", "SK hynix IR / analyst split", "https://news.skhynix.com/category/ir/", "", "KRW bn", "Estimate", "Analyst", "Update after results"],
    ["HBM multiple", "Micron anchor + HBM bridge", "", "", "x", "Assumption", "Analyst", "Revisit on visibility/ROE change"],
    ["DRAM multiple", "Mid-cycle memory comps", "", "", "x", "Assumption", "Analyst", "Revisit through cycle"],
    ["NAND multiple", "Kioxia / SanDisk", "", "", "x", "Assumption", "Analyst", "Revisit on margin normalization"],
    ["Net cash", "Balance sheet", "", "", "KRW bn", "Reported", "Analyst", "Quarterly update"],
    ["Shares", "Filing", "", "", "mn", "Reported", "Analyst", "Capital action"],
  ];
  inputStyle(sources.getRange("B5:H10"));
  sources.getRange("A5:H10").format.wrapText = true;
  fit(sources, { A: 24, B: 27, C: 38, D: 13, E: 13, F: 14, G: 13, H: 32 });

  await finalizeWorkbook(wb, "SOTP_model.xlsx", ["Summary", "Segment Inputs", "DCF Check", "Sources"], [
    { sheet: "Summary", range: "A6:E22" },
    { sheet: "DCF Check", range: "A20:B25" },
  ]);
}

async function buildPeerModel() {
  const wb = Workbook.create();
  const summary = wb.worksheets.add("Summary");
  const peers = wb.worksheets.add("Peer Framework");
  const bridge = wb.worksheets.add("PER Bridge");
  const sources = wb.worksheets.add("Sources");
  [summary, peers, bridge, sources].forEach(baseSheet);

  title(summary, "A1:H1", "SK hynix Peer PER Framework", "Micron is the direct anchor; premium/discount is decomposed into observable business drivers");
  summary.getRange("A4:B4").values = [["Selected Scenario", null]];
  summary.getRange("B4").formulas = [["='PER Bridge'!B3"]];
  linkedStyle(summary.getRange("B4"));
  summary.getRange("A6:B11").values = [["Metric", "Result"], ["Micron Cycle-adjusted PER", null], ["Net Premium / (Discount)", null], ["Target PER", null], ["Normalized EPS", null], ["Implied Price", null]];
  header(summary.getRange("A6:B6"));
  summary.getRange("B7").formulas = [["='PER Bridge'!B6"]];
  summary.getRange("B8").formulas = [["='PER Bridge'!E16"]];
  summary.getRange("B9").formulas = [["='PER Bridge'!B18"]];
  summary.getRange("B10").formulas = [["='PER Bridge'!B20"]];
  summary.getRange("B11").formulas = [["='PER Bridge'!B21"]];
  linkedStyle(summary.getRange("B7:B9"), "0.0x");
  linkedStyle(summary.getRange("B10:B11"), "#,##0");
  summary.getRange("A14:D14").values = [["Rule", "Use", "Do not use", "Reason"]];
  header(summary.getRange("A14:D14"));
  summary.getRange("A15:D18").values = [
    ["Primary anchor", "Micron cycle-adjusted PER", "Raw peer average", "Closest listed memory economics"],
    ["Samsung", "Memory segment reference", "Company-wide PER", "Conglomerate and mobile/foundry mix"],
    ["NAND", "Kioxia / SanDisk", "HBM multiple", "Segment-specific cycle"],
    ["AI ecosystem", "Qualitative demand check", "NVIDIA/TSMC direct PER", "Different margin and capital models"],
  ];
  summary.getRange("A15:D18").format = { wrapText: true, borders: { preset: "all", style: "thin", color: COLORS.border } };
  fit(summary, { A: 26, B: 28, C: 25, D: 35, E: 3 });

  title(peers, "A1:H1", "Peer Framework", "Peer inclusion follows business overlap and economic comparability, not thematic similarity");
  peers.getRange("A4:H4").values = [["Company", "Role", "Overlap", "Status", "Valuation Use", "Why Included / Excluded", "Key Caveat", "Owner"]];
  header(peers.getRange("A4:H4"));
  peers.getRange("A5:H11").values = [
    ["Micron", "Primary anchor", "DRAM + NAND", "Included", "Cycle-adjusted forward PER", "Closest listed memory comparator", "HBM position and customer mix differ", "Analyst"],
    ["Samsung Electronics", "Secondary reference", "DRAM + HBM + NAND", "Reference only", "Memory margins / implied value", "Technology and CAPEX benchmark", "Company PER includes many businesses", "Analyst"],
    ["Kioxia", "NAND check", "NAND", "Segment use", "EV / EBIT", "NAND cycle comparator", "Different leverage and mix", "Analyst"],
    ["SanDisk", "NAND check", "NAND", "Segment use", "PER or EV / EBIT", "NAND market cross-check", "Different product mix", "Analyst"],
    ["NVIDIA", "AI ecosystem", "AI demand", "Excluded", "Qualitative only", "Demand signal", "Fabless GPU economics", "Analyst"],
    ["TSMC", "AI ecosystem", "Foundry", "Excluded", "Qualitative only", "Advanced node / packaging signal", "Foundry economics", "Analyst"],
    ["Broadcom", "AI ecosystem", "ASIC / networking", "Excluded", "Qualitative only", "Custom AI demand signal", "Asset-light design model", "Analyst"],
  ];
  peers.getRange("A5:H11").format = { wrapText: true, borders: { preset: "all", style: "thin", color: COLORS.border } };
  fit(peers, { A: 20, B: 20, C: 20, D: 16, E: 26, F: 34, G: 30, H: 13 });

  title(bridge, "A1:H1", "PER Premium / Discount Bridge", "Every adjustment needs a reason, a magnitude, and a condition that would remove it");
  bridge.getRange("A3:B3").values = [["Selected Scenario", "Base"]];
  inputStyle(bridge.getRange("B3"));
  bridge.getRange("B3").dataValidation = { rule: { type: "list", values: ["Base", "Bull", "Bear"] } };
  bridge.getRange("A5:B6").values = [["Anchor", "Input"], ["Micron Cycle-adjusted PER", 9.0]];
  header(bridge.getRange("A5:B5"));
  inputStyle(bridge.getRange("B6"), "0.0x");
  bridge.getRange("A8:F8").values = [["Adjustment", "Base", "Bull", "Bear", "Active", "Evidence / removal condition"]];
  header(bridge.getRange("A8:F8"));
  bridge.getRange("A9:F15").values = [
    ["HBM Profit Mix", 1.5, 2.5, 0.5, null, "Premium falls if HBM EBIT share or margin declines"],
    ["EPS Growth", 1.0, 1.5, -0.5, null, "Use normalized 2–3 year growth"],
    ["ROE Quality", 0.5, 1.0, 0.0, null, "Require sustained ROE above memory peers"],
    ["Earnings Visibility", 0.5, 1.0, -0.5, null, "Backlog/qualification visibility must persist"],
    ["Customer Concentration", -0.5, -0.25, -1.0, null, "Discount narrows with broader customer mix"],
    ["CAPEX Intensity", -0.5, -0.25, -1.0, null, "Discount narrows if FCF conversion improves"],
    ["Cycle Volatility", -1.0, -0.5, -2.0, null, "Discount narrows only with supply discipline"],
  ];
  inputStyle(bridge.getRange("B9:D15"), "0.0x");
  for (let row = 9; row <= 15; row++) {
    bridge.getRange(`E${row}`).formulas = [[scenarioFormula(`B${row}`, `C${row}`, `D${row}`, "$B$3")]];
  }
  calcStyle(bridge.getRange("E9:E15"), "0.0x");
  bridge.getRange("A16:E16").values = [["Net Premium / (Discount)", null, null, null, null]];
  bridge.getRange("E16").formulas = [["=SUM(E9:E15)"]];
  calcStyle(bridge.getRange("E16"), "0.0x");
  bridge.getRange("A18:B21").values = [["Target PER", null], ["", null], ["Normalized EPS", 40000], ["Implied Price", null]];
  bridge.getRange("B18").formulas = [["=B6+E16"]];
  inputStyle(bridge.getRange("B20"), "#,##0");
  bridge.getRange("B21").formulas = [["=B18*B20"]];
  calcStyle(bridge.getRange("B18"), "0.0x");
  calcStyle(bridge.getRange("B21"), "#,##0");
  fit(bridge, { A: 28, B: 13, C: 13, D: 13, E: 13, F: 46, G: 3, H: 3 });

  title(sources, "A1:H1", "Peer Data Sources", "Use the same as-of date for price and earnings; retain the source and normalization method");
  sources.getRange("A4:H4").values = [["Company", "Metric", "Source", "URL / File", "As-of", "Normalization", "Status", "Owner"]];
  header(sources.getRange("A4:H4"));
  sources.getRange("A5:H9").values = [
    ["Micron", "PER / earnings", "Micron IR", "https://investors.micron.com/quarterly-results", "", "Cycle-adjusted EPS", "To source", "Analyst"],
    ["Samsung Electronics", "Memory margin / CAPEX", "Samsung IR", "https://www.samsung.com/global/ir/", "", "Segment only", "To source", "Analyst"],
    ["Kioxia", "NAND EBIT / multiple", "Kioxia IR", "https://www.kioxia-holdings.com/en-jp/ir.html", "", "Normalize cycle", "To source", "Analyst"],
    ["SanDisk", "NAND earnings / multiple", "SanDisk IR", "https://investor.sandisk.com/", "", "Normalize cycle", "To source", "Analyst"],
    ["SK hynix", "Normalized EPS", "SK hynix IR", "https://news.skhynix.com/category/ir/", "", "2–3 year probability weighted", "To source", "Analyst"],
  ];
  inputStyle(sources.getRange("C5:H9"));
  sources.getRange("A5:H9").format.wrapText = true;
  fit(sources, { A: 22, B: 24, C: 24, D: 42, E: 13, F: 27, G: 14, H: 13 });

  await finalizeWorkbook(wb, "Peer_PER_model.xlsx", ["Summary", "Peer Framework", "PER Bridge", "Sources"], [
    { sheet: "Summary", range: "A6:D18" },
    { sheet: "PER Bridge", range: "A5:F21" },
  ]);
}

await buildHbmModel();
await buildSotpModel();
await buildPeerModel();
console.log("Created three spreadsheet models and rendered all sheets.");
