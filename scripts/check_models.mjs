import path from "node:path";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

const cases = [
  {
    file: "HBM_generation_model.xlsx",
    selectorSheet: "Scenario Inputs",
    selectorCell: "B3",
    outputSheet: "Summary",
    outputCell: "B10",
  },
  {
    file: "SOTP_model.xlsx",
    selectorSheet: "Segment Inputs",
    selectorCell: "B3",
    outputSheet: "Summary",
    outputCell: "D16",
  },
  {
    file: "Peer_PER_model.xlsx",
    selectorSheet: "PER Bridge",
    selectorCell: "B3",
    outputSheet: "Summary",
    outputCell: "B11",
  },
];

for (const item of cases) {
  const blob = await FileBlob.load(path.join(root, "model", item.file));
  const wb = await SpreadsheetFile.importXlsx(blob);
  const selector = wb.worksheets.getItem(item.selectorSheet).getRange(item.selectorCell);
  const output = wb.worksheets.getItem(item.outputSheet).getRange(item.outputCell);
  const values = {};
  for (const scenario of ["Base", "Bull", "Bear"]) {
    selector.values = [[scenario]];
    wb.recalculate();
    values[scenario] = output.values[0][0];
  }
  if (new Set(Object.values(values)).size !== 3) {
    throw new Error(`${item.file}: scenario outputs are not distinct: ${JSON.stringify(values)}`);
  }
  const errors = await wb.inspect({
    kind: "match",
    searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
    options: { useRegex: true, maxResults: 20 },
    maxChars: 2000,
  });
  const errorText = errors.ndjson ?? String(errors);
  if (!errorText.includes("matched 0 entries")) {
    throw new Error(`${item.file}: formula error scan failed: ${errorText}`);
  }
  console.log(`${item.file}: ${JSON.stringify(values)}`);
}

console.log("Scenario and formula checks passed.");
