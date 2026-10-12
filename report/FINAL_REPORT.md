# SK hynix Equity Research Report

## [기준일 2026-10-07 | HBM4의 가치가 유지되려면]

### 한 줄 결론

SOTP는 2,139,000원을 가리키지만, DCF와 RIM은 CAPEX와 ROE 정상화에 민감하다. 따라서 이 보고서는 HBM4의 수율·고객 인증·현금전환이 이어진다는 확인이 있을 때만 SOTP 중심값의 신뢰도가 높아진다고 본다.

| 기준 주가 | SOTP | DCF | Peer PER | RIM |
|---:|---:|---:|---:|---:|
| 1,723,000원 | 2,139,000원 | 1,679,000원 | 1,829,000원 | 997,000원 |

## 1. 실적 출발점

SK하이닉스는 FY2025에 매출 97.1조원, 영업이익 47.2조원, 순이익 42.9조원을 기록했다. 2026년 2분기에는 매출 79.3조원, 영업이익 60.5조원, 순이익 93.9조원을 기록했고, 6월 말 순현금은 69.4조원이었다. 회사는 HBM4 양산 출하, 약 10개 고객과의 장기 공급계약, 321단 NAND 생산 확대를 언급했다. [FY25 실적](https://news.skhynix.com/en/sk-hynix-announces-fy25-financial-results/) · [2Q26 실적](https://news.skhynix.com/en/q2-2026-business-results/) · [반기보고서](https://opendart.fss.or.kr/xbrl/viewer/main.do?lang=en&rcpNo=20260814003509)

## 2. HBM 세대별 이익이 만들어지는 단계

세대별 제품은 개발·샘플 → 고객 인증 → 초기 양산 → 수율·공급 안정 → 성숙·세대 전환 단계로 분류한다. 제품 발표와 샘플 출하는 고객 인증·양산 물량과 구분한다. 실제 수익 반영은 출하 stack, ASP, die·적층·패키징 원가, 초기 램프 비용을 확인해 판단한다. HBM의 DRAM die를 범용 DRAM 출하량에 중복 계상하지 않는다.

HBM4·HBM4E 일정과 제품 계획은 전망 정보다. 공시된 실적과 고객 인증 상태가 확인되기 전에는 세대별 물량·수율·ASP를 analyst assumption으로 표시한다. 평가일 컷오프와 단계 변경 근거는 [Valuation Vintage Policy](../research/VALUATION_VINTAGE_POLICY.md)에 기록한다.

## 3. Peer group: 왜 Micron만 직접 PER peer인가

직접 앵커는 자체 메모리 제조가 이익의 중심인지, 메모리 가격과 재고가 실적에 전달되는지, 팹·감가상각·CAPEX를 직접 부담하는지, 완전한 업황을 포함하는 정상화 자료가 있는지, 평가일·회계 기준을 맞출 수 있는지로 판정한다. Micron은 직접 경제성 앵커 후보다. 삼성은 메모리 부문 운영 비교, Kioxia·SanDisk는 NAND 부문 비교에만 쓴다. NVIDIA·TSMC·Broadcom은 수요·병목 확인 자료다. 직접 표본이 하나면 평균 peer multiple을 만들지 않고 단일 앵커의 cycle-normalized 범위와 회사별 차이를 제시한다.

## 4. 밸류에이션

SOTP는 HBM/AI DRAM 70조원 EBIT에 11.0배, 범용 DRAM 80조원에 6.5배, NAND/Solidigm 25조원에 4.0배를 적용했다. 이익의 경제성이 같은 메모리 안에서도 다르기 때문에 전체 EBIT에 하나의 멀티플을 곱하지 않았다.

DCF는 2026E CAPEX 55조원에서 2028E 68조원까지의 투자를 반영했다. 9.5% WACC와 2.5% terminal growth를 적용한 주당가치는 1,679,000원이다. SOTP보다 낮은 이유는 높은 회계이익이 그대로 자유현금흐름으로 전환된다는 가정을 두지 않았기 때문이다.

현재 PER 브리지의 8.0배 Micron anchor와 요인별 조정치는 Base/Bull/Bear **분석가 시나리오 입력값**이다. 공개된 역사적 상대 multiple로 계수를 보정하지 않았으므로 실증된 프리미엄으로 읽으면 안 된다. 조정 요인은 세대별 HBM 이익 믹스, 초과수익 지속기간, 현금전환, 고객 집중, CAPEX 강도, DRAM·NAND 사이클이다. 같은 요인을 Forecast 성장률과 multiple에 중복 반영하지 않는다. 역사적 짝지은 데이터와 표본 수·오차 범위가 마련되기 전까지는 숫자 프리미엄을 확정하지 않고 Micron의 정상화 배수 범위 민감도로 해석해야 한다. 현재 2027E EPS 228,571원과 8.0배를 적용한 표시값은 1,829,000원 수준의 **가정 결과**다. 피어 판정과 보정 절차는 [Peer scorecard](../research/PEER_SELECTION_SCORECARD.md)를 참고한다.

RIM은 terminal ROE가 14%로 수렴한다고 보아 997,000원을 계산한다. 이 값은 목표주가가 아니라, 초과 ROE의 지속 기간이 짧아지는 상황에서 시장이 감수할 수 있는 하방을 보여준다.

## 5. 무엇이 결론을 바꾸는가

| 확인 항목 | 좋아질 때 | 나빠질 때 | 반영 모델 |
|---|---|---|---|
| HBM4 수율·인증 | HBM 프리미엄 유지 | HBM EBIT·PER 하향 | HBM Build, SOTP, PER |
| 고객 다변화 | 집중 할인 축소 | 계약 지연·집중 할인 확대 | PER |
| CAPEX/FCF | DCF와 SOTP 차이 축소 | 현금전환 악화 | DCF, PER |
| DRAM 가격·재고 | 범용 DRAM 멀티플 유지 | mid-cycle multiple 하향 | SOTP |
| NAND eSSD 믹스 | NAND 가치 상승 | 회복 지연 | SOTP NAND |

## 6. 한계

공시로 확인할 수 없는 고객별 HBM 물량·단가·수율은 analyst assumption이다. 사업부별 HBM/일반 DRAM 이익 분할과 개별 SOTP multiple도 공개 자료와 historical calibration이 보강될 때까지 시나리오 가정으로 읽어야 한다. 컨센서스 데이터는 라이선스 제약상 저장소에 포함하지 않았다. 기준일·정보 컷오프·전망 vintage는 `Actuals & Sources`에 고정하고 다음 실적 발표 후 `Actuals & Sources`, `Forecast`, `HBM Build`, `SOTP`, `DCF`, `RIM`, `Peer PER` 순서로 갱신한다.

## 7. 출처

1. SK hynix FY25 Financial Results, 2026-01-28.
2. SK hynix 2Q26 Financial Results, 2026-07-29.
3. SK hynix Half-year Report, 2026-08-14, DART.
4. SK hynix 000660 price history, 2026-10-07 close, StockAnalysis.
5. Micron Technology, FY26 results materials and events page.
