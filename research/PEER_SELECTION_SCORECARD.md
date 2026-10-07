# Peer Selection Scorecard

## 1. 직접 PER peer 판정 규칙

전사 PER을 직접 적용하려면 아래 네 조건을 모두 충족해야 한다. 조건을 하나라도 충족하지 못하면 직접 표본에서 제외하고, 사업부 비교 또는 수요 지표로만 사용한다.

| 기준 | 확인 항목 | 이유 |
|---|---|---|
| 제품 경제성 | DRAM이 이익의 핵심이며 HBM·서버 DRAM이 실적에 반영됨 | AI 노출만 같은 기업을 섞지 않기 위해 |
| 생산 구조 | 자체 웨이퍼 생산·후공정·재고를 보유 | 고정비·감가상각·CAPEX의 성격을 맞추기 위해 |
| 사이클 민감도 | DRAM 공급·가격 변화가 매출과 EBIT에 직접 반영 | 정상화 EPS의 의미를 같게 만들기 위해 |
| 자본집약도 | 대규모 설비투자와 FCF 변동이 존재 | 높은 마진이 곧 현금전환을 뜻하지 않기 때문에 |

## 2. 기업별 판정

| 기업 | 제품 경제성 | 생산 구조 | 사이클 민감도 | 자본집약도 | 사용 위치 | 결론 |
|---|---|---|---|---|---|---|
| Micron | 충족: DRAM·NAND 순수 메모리 | 충족 | 충족 | 충족 | 전사 Cycle-adjusted PER | 유일한 직접 앵커 |
| Samsung Electronics | 부분 충족: DS는 유사 | 부분 충족: 전사 혼합 | 부분 충족 | 충족 | DS 수익성·CAPEX·기술 비교 | 전사 PER 제외 |
| Kioxia | 불충족: NAND 중심 | 충족 | NAND에 한정 | 충족 | NAND/Solidigm EV/EBIT | 사업부 peer |
| SanDisk | 불충족: NAND·스토리지 중심 | 부분 충족 | NAND에 한정 | 부분 충족 | NAND/Solidigm 교차검증 | 사업부 peer |
| NVIDIA | 불충족: GPU·플랫폼 | 불충족: 팹리스 | 불충족: 메모리 가격 비연동 | 불충족 | 고객 CAPEX·수요 신호 | 직접 peer 제외 |
| TSMC | 불충족: 파운드리 | 충족 | 불충족: 파운드리 가동률 | 충족 | 첨단 패키징 병목 확인 | 직접 peer 제외 |
| Broadcom | 불충족: ASIC·네트워킹 | 불충족 | 불충족 | 불충족 | Custom HBM 수요의 질적 확인 | 직접 peer 제외 |

## 3. Micron 앵커를 그대로 쓰지 않는 이유

Micron을 기계적으로 단독 적용하지 않는다. SK하이닉스의 목표 PER은 Micron의 정상화 PER에서 시작한 뒤, 아래 항목을 근거와 함께 조정한다.

`Micron 정상화 PER + HBM 이익 믹스 + ROE의 질 + 장기 공급 가시성 - 고객 집중 - CAPEX 강도 - 메모리 가격 변동성`

| 조정 | Base | 확인할 지표 | 프리미엄/할인 소멸 조건 |
|---|---:|---|---|
| HBM 이익 믹스 | +0.8x | HBM4 출하·수율·ASP | HBM4 램프 지연 또는 마진 하락 |
| ROE의 질 | +0.4x | 현금흐름을 동반한 ROE | 순이익이 환율·일회성 이익에 의존 |
| 장기 공급 가시성 | +0.3x | LTA·고객 인증 | 계약 물량·인증 일정이 후퇴 |
| 고객 집중 | -0.4x | 상위 고객 의존도 | 고객 다변화 확인 |
| CAPEX 강도 | -0.5x | CAPEX/매출·FCF 전환 | FCF 전환 개선 |
| 사이클 변동성 | -0.6x | DRAM·NAND 가격·재고 | 공급 규율과 재고 안정 확인 |

## 4. 출처

- SK hynix 2Q26 실적발표: https://news.skhynix.com/en/q2-2026-business-results/
- Micron FY26 4Q 실적 자료: https://investors.micron.com/events-and-presentations/default.aspx
- Samsung Electronics IR: https://www.samsung.com/global/ir/
- Kioxia IR: https://www.kioxia-holdings.com/en-jp/ir.html
- SanDisk IR: https://investor.sandisk.com/

