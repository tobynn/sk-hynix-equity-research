# Peer Selection

## 원칙

Peer는 “같은 테마”가 아니라 **수익의 원천, 사이클, 자본집약도, 회계 단위**가 비슷한 기업을 우선합니다.

| 기업 | 역할 | 사용 방식 | 판단 |
|---|---|---|---|
| Micron | Primary anchor | Cycle-adjusted forward PER, EBITDA/EBIT margin | 직접 포함 |
| Samsung Electronics | Secondary reference | 메모리 부문 수익성·CAPEX·기술 격차 | 전사 PER 제외 |
| Kioxia | NAND check | NAND 사이클·마진·EV/EBIT | NAND 부문에만 사용 |
| SanDisk | NAND check | NAND 시장·수익성 교차검증 | NAND 부문에만 사용 |
| NVIDIA | AI ecosystem | AI 수요와 고객 투자 방향 | 직접 멀티플 제외 |
| TSMC | AI ecosystem | 첨단 공정·패키징 병목 | 직접 멀티플 제외 |
| Broadcom | AI ecosystem | ASIC·네트워크 수요 | 직접 멀티플 제외 |

## PER 브리지

목표 PER는 다음 항목을 명시적으로 더하고 빼서 산출합니다.

`Micron cycle-adjusted PER + HBM 이익 믹스 + EPS 성장 + ROE + 실적 가시성 - 고객 집중 - CAPEX - 사이클 변동성`

각 조정치는 0.5x 단위 등으로 제한하고, 한 줄마다 근거와 만료 조건을 기록합니다. “AI 프리미엄”처럼 검증 불가능한 단일 항목은 사용하지 않습니다.

## 금지사항

- peer 평균을 계산한 뒤 임의의 10~30% 프리미엄 부여
- Samsung Electronics 전사 PER를 메모리 사업 peer로 직접 사용
- 음수 또는 비정상 저점 EPS의 PER를 그대로 평균
- 기준일이 다른 주가와 추정 EPS를 혼합

