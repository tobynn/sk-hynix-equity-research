> **이전 버전 참고 자료**: 2026-10-18 통합 보고서가 현재 기준입니다. 아래의 과거 숫자는 현재 목표가로 사용하지 않습니다. [현재 보고서](../report/FINAL_REPORT.md) · [이전 원본](../archive/pre-v2/research/ANALYSIS_REVIEW.md)

# Analysis Review - SK hynix

**Review date:** 2026-10-18

**Valuation vintage:** 2026-10-07 close

**Latest reported quarter in this vintage:** 2Q2026

**Model status:** integrated workbook and report; scenario values require the evidence checks below before they are treated as a current investment view.

## Checks completed

| Area | Check | Result |
|---|---|---|
| 2Q26 reported results | Compared revenue, operating profit and net income with the company's 2026-07-29 release | Values match the release: KRW 79.3187tn, KRW 60.5426tn and KRW 93.9226tn. The release labels the information preliminary. |
| Balance sheet bridge | Cash KRW 88.0tn less debt KRW 18.6tn | KRW 69.4tn net cash, matching the company's rounded disclosure. |
| RIM opening equity | Uses reported 2026-06-30 equity rather than a January opening balance | KRW 169.4tn opening book value; 2H26 earnings are forecast FY26 net income less reported 1Q26 and 2Q26 net income. |
| RIM terminal value | Applies next-period residual income growth before capitalization | Terminal RI includes `(1+g)`; model output is KRW 862,520 per share. |
| PER premium bridge | Reviewed analyst-assigned multiple adjustments | Removed uncalibrated factor turns. The active 6x / 8x / 9x Bear / Base / Bull values are scenario anchors, not statistically calibrated premiums. |
| Workbook linkage | Compared headline outputs with workbook cached results | SOTP KRW 2,138,571; DCF KRW 1,678,520; PER KRW 1,828,571; RIM KRW 862,520 per share. Rounded headline values in the README and report agree. |

Primary result source: [SK hynix 2Q26 Financial Results, 2026-07-29](https://news.skhynix.com/en/q2-2026-business-results/). The release reports KRW 79.3187tn revenue, KRW 60.5426tn operating profit and KRW 93.9226tn net income, and states that the figures were preliminary at publication. The workbook preserves the company's reported number; it does not infer a correction from the unusually high net margin.

## Remaining evidence gates

These items remain open and are shown as assumptions or limitations in the report. They limit confidence in the valuation outputs.

| Gate | Why it matters | Required evidence before changing the case |
|---|---|---|
| Final 2Q26 figures | The earnings release is preliminary and its 118% net margin is unusual | Reconcile the final interim filing and any later audited/reviewed restatement to the July release. Update actuals and RIM if values differ. |
| HBM operating-to-financial bridge | Generation stages alone do not establish revenue or profit | Connect qualified stacks, realized ASP and shipment volume to HBM revenue and incremental EBIT; show packaging cost and prevent DRAM die double counting. |
| Diluted share count | Per-share estimates scale directly with shares | Reconcile the 700mn model input to the filing's issued shares, treasury shares, options and potential dilution as of the valuation date. |
| Forward net cash | Forecast cash depends on CAPEX, working capital and capital returns | Build the forecast bridge from reported cash/debt through investment, dividends, acquisitions and other financing flows. |
| Cycle-normalized peer earnings | A single forward year can sit near a memory-cycle peak | Use a consistent multi-year up/down-cycle window for SK hynix and Micron, disclose adjustments and verify the 8x Base anchor against dated market data. |
| DCF inputs | Terminal value and reinvestment drive a large share of DCF value | Support WACC with valuation-date risk-free rate, beta, market premium and debt cost; separate maintenance from growth CAPEX and stress terminal reinvestment. |
| Segment EBIT and SOTP multiples | HBM/DRAM/NAND profit splits are not disclosed in the same granularity as the model | Label segment EBIT and multiples as analyst scenarios until supported by operating disclosures or a transparent allocation bridge. |

## Company-specific thesis to test

SK hynix's earnings streams differ by product. HBM depends on customer qualification, yield, advanced packaging, customer breadth and realized margins. Server DRAM depends on high-capacity modules, demand durability and supply discipline. Conventional DRAM remains exposed to ASP and inventory cycles. NAND / Solidigm depends on enterprise SSD mix, NAND cost curves and supply elasticity. HBM growth creates value only after packaging and yield costs, CAPEX, customer concentration and the opportunity cost of DRAM wafer allocation are included.

The HBM generation worksheet is a capacity and commercialization diagnostic. The SOTP EBIT pool is a separate analyst forecast. One must not be used as evidence for the other without the shipment-to-revenue-to-profit bridge.

## Peer rule

Micron is the only direct company-level PER anchor because it has listed DRAM/NAND manufacturing economics, own-fab capital intensity and memory price-cycle exposure. Samsung is an operating reference at memory-segment level; group PER includes other businesses. Kioxia and SanDisk are NAND-only operating references. NVIDIA, Broadcom and TSMC are demand or technology context. These roles are kept separate; no blended peer average is used.

## Refresh sequence

After the next reported results, update `Actuals & Sources` and `Forecast`, then rebuild `HBM Build`, `SOTP`, `DCF`, `RIM` and `Peer PER`. Recheck the valuation date, source cutoff, share count and cash bridge before changing the headline case. The price vintage remains 2026-10-07 until all market inputs are refreshed together.

### Primary source links

- [SK hynix IR results](https://news.skhynix.com/en/q2-2026-business-results/)
- [DART filings](https://dart.fss.or.kr/)
- [Micron Investor Relations](https://investors.micron.com/)
