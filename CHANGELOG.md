# [변경 이력]

## [2026-10-18 | 공통 보고서 v2]

- 5개 기업 동일 14개 목차, 실적·전망·PER·RIM·DCF·투자위험 본문 작성
- 2026H1 공시 원문에서 자본·이익·주식수·금융자산 대사
- 2026년 말 현금·자본 연결 및 3개 시나리오 재계산
- 정상화 EPS, 이론 PER, 성장기간·요구수익률 민감도 추가
- Excel 3개 시나리오를 Python 독립 결과와 대조
- 이전 보고서·모델 원본 archive/pre-v2 보존

# Changelog

## 1.2.0 — 2026-10-18

- Added a cover page and compact valuation summary to the downloadable PDF.
- Refreshed the public-facing README with direct links to the report and integrated workbook.
- Updated the review log after checking the 2Q26 figures against the company release; remaining evidence gates are stated explicitly.
- Clarified that the 2026-10-07 value set is a scenario vintage and that the 2Q26 release reports preliminary figures.

## 1.1.0 — 2026-10-12

- Added a dated valuation vintage policy for price, information cutoff, actuals, forecasts, cash, FX and share count.
- Expanded SK hynix-specific analysis across HBM commercialization stages, server/client DRAM, NAND/eSSD and capital recovery.
- Replaced the short peer rule with role-based peer eligibility, cycle EPS normalization, accounting comparability and a calibration protocol.
- Marked current PER bridge adjustments as scenario assumptions pending historical peer-relative calibration; added the same evidence controls to the final workbook.

## 1.0.0 — 2026-10-07

- Added a source-backed final workbook with linked SOTP, DCF, RIM and cycle-adjusted PER outputs.
- Added FY2025 and 2Q2026 actuals, current share-price reference and an explicit actuals/assumptions dataset.
- Added a complete Korean PDF report and a portfolio-ready investment case.
- Rebuilt peer selection around product economics, own manufacturing/CAPEX, memory-cycle exposure and earnings volatility; Micron is the sole direct PER anchor.

## 0.1.0

- Created SK hynix equity research starter structure.
- Added HBM vintage, SOTP/DCF, and Peer PER templates.
- Added peer selection, valuation, source, and report frameworks.
