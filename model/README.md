# Model Guide

## 현재 포트폴리오 모델

`SK_hynix_equity_research_final.xlsx`가 기준일 2026-10-07의 실제치·가정·결과를 연결한 최종 모델입니다. `Actuals & Sources`에서 출처와 기준일을 확인하고, `Forecast` → `HBM Build` → `SOTP`·`DCF`·`RIM`·`Peer PER` 순서로 읽으면 됩니다. `Audit`에는 핵심 연결 점검을 남겼습니다.

- 최종 결과: SOTP 2,139,000원, DCF 1,679,000원, Peer PER 1,829,000원, RIM 997,000원
- 노란색 셀: 분석가 가정 또는 갱신 입력값
- `HBM Build`: HBM3E → HBM4 → HBM4E의 매출·마진 전환을 별도 점검
- `Peer PER`: Micron 단일 직접 앵커와 프리미엄·할인 브리지를 사용하며, 단순 peer 평균을 사용하지 않음

## 참조 템플릿

아래 세 파일은 재사용 가능한 구조를 보존한 템플릿입니다. `ILLUSTRATIVE` 입력값이 있으므로 최종 투자 판단에는 사용하지 않습니다.

## 파일

- `HBM_generation_model.xlsx`: HBM3E·HBM4·HBM4E의 세대별 볼륨, ASP, 수율/램프, EBIT 기여
- `SOTP_model.xlsx`: 부문별 가치 합산과 DCF 현금흐름 교차검증
- `Peer_PER_model.xlsx`: peer 포함·제외 논리와 프리미엄·할인 브리지

## 색상

- 파란색 글씨 + 연한 노란색 배경: 사용자 입력
- 검은색 글씨: 공식 데이터 또는 고정 라벨
- 초록색 글씨: 다른 시트에서 연결된 값
- 회색 배경: 계산 셀

모든 예시 입력은 `ILLUSTRATIVE`이며 실제 데이터로 교체해야 합니다.

