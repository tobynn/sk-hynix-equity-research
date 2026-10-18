# 시작 가이드

이 저장소는 “숫자를 채우는 파일”보다 “왜 그 숫자를 썼는지 설명할 수 있는 분석”을 목표로 합니다.

## 현재 버전 읽는 순서

최종 결과는 `model/SK_hynix_equity_research_final.xlsx`와 `report/SK_hynix_equity_research_report.pdf`에 있습니다. 실제치, 출처, DCF·RIM·PER·SOTP 연결을 모두 담았으며, 기존 세 개의 모델 파일은 구조 참고용 템플릿입니다. 피어 선정 근거는 `research/PEER_SELECTION_SCORECARD.md`를 먼저 확인합니다.

방법론은 다음 순서로 확인합니다: `research/VALUATION_VINTAGE_POLICY.md` → `research/COMPANY_SPECIFIC_FRAMEWORK.md` → `research/PEER_SELECTION_SCORECARD.md` → `research/VALUATION_FRAMEWORK.md`. 첫 파일은 정보 시점을 고정하고, 두 번째는 하이닉스의 제품·투자 흐름을 분해하며, 뒤의 두 파일은 비교기업과 배수·가치 산출 규칙을 설명합니다.

## 1. 먼저 고정할 것

- 기준일: 주가·환율·순현금·발행주식수의 동일 시점
- 통화와 단위: 원화, KRW bn, 원/주를 혼용하지 않도록 모델별 상단에 표기
- 회계연도: 실제치(A), 추정치(E)를 구분
- 출처 우선순위: 사업보고서 → 실적발표 자료 → 컨퍼런스콜 → 보조 데이터

## 2. 입력 순서

1. `Actuals & Sources`에서 평가일·정보 컷오프·최신 실제치·주가·주식수 일자를 확인합니다.
2. `Forecast`에서 실제치와 분석가 Base/Bull/Bear 가정을 구분하고, 각 전망의 기준일을 기록합니다.
3. `HBM Build`에서 세대별 상업화 단계와 공급·수율·ASP 가정을 확인합니다. 비공개 입력은 분석가 가정으로 표시합니다.
4. `SOTP`에서 HBM/AI DRAM, 범용 DRAM, NAND/eSSD의 이익과 배수를 분리합니다. 공개되지 않은 부문 이익을 실제치로 취급하지 않습니다.
5. `DCF`와 `RIM`에서 CAPEX·운전자본·순현금·장부가치·ROE 경로를 검토합니다.
6. `Peer PER`에서 peer 통과 조건과 정규화 EPS를 확인합니다. 역사적 보정이 없는 배수 조정은 시나리오 입력으로만 해석합니다.
7. `Audit`에서 단위, 주식수, EV-to-equity bridge와 모델 간 연결을 확인합니다.
8. 모델 간 결과가 다르면 평균하지 말고 어떤 가정이 차이를 만들었는지 설명합니다.

## 3. HBM 세대와 상업화 단계

세대 이름만으로 출하를 확정하지 않습니다. 개발/샘플 → 고객 인증 → 초기 양산 램프 → 수율·공급 안정 → 성숙·세대 전환 순서로 상태를 기록합니다. 공시되지 않은 출하량·ASP·수율은 analyst assumption으로 표시하고 범위와 민감도를 둡니다. 이 분석의 목적은 다음을 드러내는 것입니다.

- 구세대 가격 하락이 신세대 램프업으로 상쇄되는가
- 고객 인증과 패키징 capacity가 실제 출하를 제한하는가
- 신세대 수율이 매출보다 늦게 이익·현금흐름에 반영되는가
- 구세대 ASP 하락과 신세대 초기 원가가 동시에 발생하는가
- 동일 DRAM die가 HBM과 범용 DRAM 양쪽에 중복 계상되지 않았는가

## 4. Peer와 배수 적용

Micron은 전사 직접 경제성 앵커 후보로 사용하고, Samsung Electronics DS는 운영 비교, Kioxia·SanDisk는 NAND 비교, AI 고객/공급망은 수요 신호로 분리합니다. 적격 직접 peer가 하나라면 peer 평균을 만들지 않습니다. cycle EPS·회계 기준·현금과 주식수를 동일 기준일에 맞추고, 고정 배수 프리미엄은 과거 상대 multiple로 보정할 수 있을 때만 확정합니다. 절차는 `research/PEER_SELECTION_SCORECARD.md`에 있습니다.

## 5. 최종 결론 규칙

- SOTP: 주된 적정가치
- DCF: 현금흐름과 CAPEX 부담의 검증
- Cycle-adjusted PER: 시장이 지불할 수 있는 범위의 검증
- RIM/PBR-ROE: 자본비용과 초과이익 지속기간을 통한 하방 점검

모델이 같은 방향을 가리킬 때만 확신도를 높입니다.

