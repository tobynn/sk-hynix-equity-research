# SK hynix Equity Research

SK하이닉스의 HBM 세대 전환을 중심에 둔 기업분석 포트폴리오입니다. **HBM 빈티지 → 사업부 SOTP → DCF·RIM·PER 교차검증**의 순서로 적정가치와 하방을 점검합니다.

> 기준일: 2026-10-07 종가. 모든 밸류에이션은 교육·포트폴리오 목적의 분석이며 투자 권유가 아닙니다. 모델의 가정과 결과는 `model/SK_hynix_equity_research_final.xlsx`와 `report/`에서 확인할 수 있습니다.

## 분석 프레임워크

| 단계 | 핵심 질문 | 주 모델 | 역할 |
|---|---|---|---|
| 1. HBM 빈티지 | HBM3E·HBM4·HBM4E의 매출과 이익 기여는 언제 이동하는가? | Final workbook `HBM Build` | 성장의 질과 세대 전환 리스크 분석 |
| 2. 부문 가치 | HBM/AI DRAM, 범용 DRAM, NAND/Solidigm, 기타의 가치가 얼마나 다른가? | Final workbook `SOTP` | 주된 적정가치 산출 |
| 3. 시장 교차검증 | 어떤 peer를 왜 쓰고, 프리미엄·할인은 무엇으로 설명되는가? | Final workbook `Peer PER` | 사이클 조정 PER 검증 |
| 4. 현금흐름·자본 검증 | CAPEX와 초과이익이 가치에 반영되는가? | Final workbook `DCF`, `RIM` | 현금전환·하방 점검 |

최종 의견은 모델 결과의 기계적 평균이 아닙니다. SOTP를 중심값으로 두고 DCF·PER가 이를 지지하는지, RIM이 자본비용 및 초과이익의 지속 가능성 측면에서 하방을 어디까지 허용하는지 확인합니다.

## 결론 요약

| 항목 | Base | 해석 |
|---|---:|---|
| 기준 주가 | 1,723,000원 | 2026-10-07 종가 |
| SOTP 중심값 | 2,139,000원 | HBM/AI DRAM·범용 DRAM·NAND를 분리 평가 |
| DCF 교차검증 | 1,679,000원 | CAPEX·운전자본을 반영한 현금흐름 가치 |
| Cycle-adjusted PER | 1,829,000원 | Micron 직접 앵커 + 명시적 조정 |
| RIM 하방 점검 | 997,000원 | ROE가 빠르게 정상화되는 보수적 경우 |
| 결론 | 조건부 검증 | SOTP는 상승 여지를 보이지만, DCF·RIM과의 차이가 커서 HBM4 수율·CAPEX·현금전환 확인이 필요 |

숫자는 2026년 2분기까지의 공식 공시와 이후 전망 가정을 결합한 결과입니다. SOTP와 나머지 모델 사이 차이를 평균으로 숨기지 않았습니다. 민감도와 업데이트 조건은 [Investment Case](research/INVESTMENT_CASE.md)에 적었습니다.

## Peer 원칙

PER peer는 **(1) 매출의 70% 이상이 범용·고대역폭 메모리, (2) 자체 웨이퍼 생산과 CAPEX 부담, (3) DRAM 가격 사이클 노출, (4) DRAM/NAND 혼합에 따른 이익 변동성**을 동시에 충족해야 합니다. 이 네 조건을 모두 충족하는 상장 순수 메모리 기업은 Micron뿐이어서, PER의 직접 앵커는 Micron 한 곳입니다.

- **Micron**: 직접 앵커. DRAM·NAND 자체 생산, 메모리 가격 사이클, 대규모 CAPEX라는 경제적 특성이 SK하이닉스와 일치합니다.
- **Samsung Electronics DS**: 메모리 사업부의 수율·HBM·CAPEX 비교용. 전사 PER는 모바일·가전·파운드리 가치가 섞여 있어 직접 비교에서 제외합니다.
- **Kioxia·SanDisk**: NAND/Solidigm 사업부에만 적용하는 부분 peer. DRAM/HBM 멀티플에는 사용하지 않습니다.
- **NVIDIA·TSMC·Broadcom**: 고객 투자·AI 수요의 방향을 읽는 질적 지표. 자본집약도와 사업모델이 달라 직접 PER 표본에서 제외합니다.

세부 판정표와 제외 사유는 [Peer Selection Scorecard](research/PEER_SELECTION_SCORECARD.md)를 확인하세요.

## 저장소 구조

```text
.
├── data/
│   ├── raw/                 # 원문 보존
│   ├── processed/           # 정규화한 데이터
│   └── templates/           # 입력용 CSV 스키마
├── documents/               # 공시·IR·콜 메모
├── figures/                 # 차트 및 보고서용 이미지
├── model/                   # 엑셀 밸류에이션 모델
├── notebooks/               # 재현 가능한 분석 노트북
├── report/                  # 최종 보고서 골격
├── research/                # 방법론·peer·출처 정책
├── scripts/                 # 모델 생성·자동화 스크립트
└── src/                     # 입력 검증 코드
```

## 빠른 시작

1. [`START_HERE_KR.md`](START_HERE_KR.md)를 읽습니다.
2. `data/raw/`에 공식 공시·IR 원문을 저장합니다.
3. `data/templates/`의 CSV 스키마에 실제 데이터를 입력합니다.
4. `model/SK_hynix_equity_research_final.xlsx`에서 Actuals·SOTP·DCF·RIM·Peer PER를 순서대로 검토합니다.
5. `research/INVESTMENT_CASE.md`에서 가정 변경 시 다시 볼 조건을 확인합니다.
6. `report/SK_hynix_equity_research_report.pdf`로 최종 보고서를 읽습니다.

## 품질 기준

- 모든 핵심 가정에는 출처·기준일·단위가 있어야 합니다.
- HBM 프리미엄은 매출 성장 자체가 아니라 **이익 믹스·ROE·가시성**으로 설명합니다.
- 고객 집중도·CAPEX·세대 전환·메모리 사이클은 할인 요인으로 명시합니다.
- 회사 전체와 사업부 peer를 섞지 않습니다.
- 실적 추정치와 시장가격은 기준일을 고정합니다.

## 상태

- [x] 2025 연간·2026년 2분기 공식 실적 반영
- [x] HBM 빈티지·SOTP·DCF·RIM·PER 통합 모델
- [x] 출처·기준일·단위 기록
- [x] Peer 선정 점수표와 제외 논리
- [x] 최종 투자 포인트·리스크·업데이트 트리거
- [x] PDF 보고서

