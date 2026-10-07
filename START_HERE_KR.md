# 시작 가이드

이 저장소는 “숫자를 채우는 파일”보다 “왜 그 숫자를 썼는지 설명할 수 있는 분석”을 목표로 합니다.

## 현재 버전 읽는 순서

최종 결과는 `model/SK_hynix_equity_research_final.xlsx`와 `report/SK_hynix_equity_research_report.pdf`에 있습니다. 실제치, 출처, DCF·RIM·PER·SOTP 연결을 모두 담았으며, 기존 세 개의 모델 파일은 구조 참고용 템플릿입니다. 피어 선정 근거는 `research/PEER_SELECTION_SCORECARD.md`를 먼저 확인합니다.

## 1. 먼저 고정할 것

- 기준일: 주가·환율·순현금·발행주식수의 동일 시점
- 통화와 단위: 원화, KRW bn, 원/주를 혼용하지 않도록 모델별 상단에 표기
- 회계연도: 실제치(A), 추정치(E)를 구분
- 출처 우선순위: 사업보고서 → 실적발표 자료 → 컨퍼런스콜 → 보조 데이터

## 2. 입력 순서

1. `data/templates/hbm_assumptions.csv`에 세대별 출하·ASP·수율·마진 가정을 입력합니다.
2. `model/HBM_generation_model.xlsx`에서 세대별 매출·EBIT 이동을 확인합니다.
3. `data/templates/sotp_segments.csv`에 부문별 EBIT와 멀티플을 입력합니다.
4. `model/SOTP_model.xlsx`에서 SOTP를 중심값으로 산출하고 DCF로 교차검증합니다.
5. `data/templates/peer_universe.csv`와 `model/Peer_PER_model.xlsx`에서 peer 포함·제외 논리를 검토합니다.
6. 모델 간 결론이 충돌하면 평균하지 말고 충돌 원인을 설명합니다.

## 3. HBM 빈티지 해석

세대별 매출은 `출하 지수 × ASP 지수 × 수율/램프 계수`로 구성합니다. 이 모델의 목적은 정밀한 생산량 예측이 아니라 다음을 드러내는 것입니다.

- 구세대 가격 하락이 신세대 램프업으로 상쇄되는가
- 신세대 수율 정상화가 매출보다 이익에 더 늦게 반영되는가
- 세대 전환이 특정 고객 인증 일정에 과도하게 의존하는가

## 4. 최종 결론 규칙

- SOTP: 주된 적정가치
- DCF: 현금흐름과 CAPEX 부담의 검증
- Cycle-adjusted PER: 시장이 지불할 수 있는 범위의 검증
- PBR-ROE: 하방·사이클 저점 점검

모델이 같은 방향을 가리킬 때만 확신도를 높입니다.

