# SK hynix Equity Research Starter

SK하이닉스 기업분석 포트폴리오를 위한 GitHub-ready 스타터 저장소입니다. 핵심은 **HBM 세대별 빈티지 분석 → 부문별 SOTP → 근거가 드러나는 Peer PER 브리지**를 하나의 투자 판단 체계로 연결하는 것입니다.

> 현재 버전은 구조와 계산 논리를 검증하기 위한 템플릿입니다. 엑셀의 파란색 글씨/연한 노란색 셀은 교체 가능한 예시 입력값이며 투자 판단에 바로 사용하면 안 됩니다.

## 분석 프레임워크

| 단계 | 핵심 질문 | 주 모델 | 역할 |
|---|---|---|---|
| 1. HBM 빈티지 | HBM3E·HBM4·HBM4E의 매출과 이익 기여는 언제 이동하는가? | `HBM_generation_model.xlsx` | 성장의 질과 세대 전환 리스크 분석 |
| 2. 부문 가치 | HBM/AI DRAM, 범용 DRAM, NAND/Solidigm, 기타의 가치가 얼마나 다른가? | `SOTP_model.xlsx` | 주된 적정가치 산출 |
| 3. 시장 교차검증 | 어떤 peer를 왜 쓰고, 프리미엄·할인은 무엇으로 설명되는가? | `Peer_PER_model.xlsx` | 사이클 조정 PER 검증 |
| 4. 현금흐름 검증 | CAPEX와 운전자본을 감안해 가치가 버티는가? | `SOTP_model.xlsx`의 `DCF Check` | downside·현금전환 검증 |

최종 의견은 네 결과의 기계적 평균이 아닙니다. SOTP를 중심값으로 두고, DCF와 PER가 그 중심값을 지지하거나 반박하는지 확인합니다.

## Peer 원칙

- **Micron**: 가장 직접적인 메모리 수익성·사이클 앵커. 기본 PER의 출발점입니다.
- **Samsung Electronics 메모리 부문**: DRAM/HBM 경쟁력과 CAPEX 강도를 비교하는 보조 기준입니다. 회사 전체 PER는 직접 쓰지 않습니다.
- **Kioxia·SanDisk**: NAND/Solidigm 부문의 마진·멀티플 검증용입니다.
- **NVIDIA·TSMC·Broadcom**: AI 노출은 크지만 사업모델과 자본구조가 달라 직접 PER peer에서 제외합니다.

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
4. 엑셀 모델의 예시값을 실제값으로 교체하고 Base/Bull/Bear 논리를 검증합니다.
5. `python src/validate_templates.py`로 기본 입력 오류를 확인합니다.
6. `report/REPORT_OUTLINE.md` 순서로 결론을 작성합니다.

## 품질 기준

- 모든 핵심 가정에는 출처·기준일·단위가 있어야 합니다.
- HBM 프리미엄은 매출 성장 자체가 아니라 **이익 믹스·ROE·가시성**으로 설명합니다.
- 고객 집중도·CAPEX·세대 전환·메모리 사이클은 할인 요인으로 명시합니다.
- 회사 전체와 사업부 peer를 섞지 않습니다.
- 실적 추정치와 시장가격은 기준일을 고정합니다.

## 상태

- [x] 저장소 구조
- [x] HBM 세대별 모델 템플릿
- [x] SOTP + DCF 교차검증 템플릿
- [x] Peer PER 브리지 템플릿
- [x] 분석 문서와 데이터 스키마
- [ ] 공식 실적·컨센서스 입력
- [ ] 최종 투자 포인트·리스크 작성
- [ ] PDF 보고서 제작
