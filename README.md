# [SK하이닉스 기업분석 포트폴리오]

**2026년 3분기 잠정실적 반영 | 수정일 2026.11.03**

| 읽기 | 파일 | 기준 |
| --- | --- | --- |
| 최신 리포트 | [산업·기업·실적·PER·DCF·RIM](report/FINAL_REPORT.md) | 2026년 3분기 잠정실적 |
| 최신 계산 | [Q3 valuation JSON](data/q3_valuation.json) | 재현 가능한 입력·결과 |
| 최신 실제치 | [CSV](data/latest_actuals.csv) · [원문·상태 JSON](data/latest_earnings.json) | 3분기·9개월 누적 잠정 |
| 입력 검증 | [검증 스크립트](scripts/validate_q3_update.py) | 값·기간·주당가치 점검 |
| Excel·PDF | [Excel](model/Equity_Research_Model.xlsx) · [PDF](report/Equity_Research_Report.pdf) | 2026.10.18 과거 버전 |

## [투자의견과 목표주가]

- 투자의견: **BUY**
- 목표주가: **2,200,000원**
- 기준주가: 2026.10.16 종가
- 평가 기준: 2026년 3분기 잠정실적과 2026년 말 조건부 가정

목표주가는 확정적인 미래 가격이 아니다. 실적, 주주환원, 주식수, 투자자산의 처리가 바뀌면 다시 계산한다.

## [자동화 범위]

새 공시를 확인하는 알림은 실적 발표 여부와 수정할 입력을 확인하는 용도다. GitHub 파일과 목표주가를 자동으로 변경하지 않는다. 하이닉스 저장소의 GitHub Actions는 push와 pull request 때 템플릿을 검사한다. [검증 workflow](https://github.com/tobynn/sk-hynix-equity-research/blob/main/.github/workflows/validate.yml)

## [과거 파일]

Excel과 PDF는 2026.10.18 모델 버전이다. 최신 리포트와 동일한 결과로 사용하지 않는다. 기존 계산 경로는 Git 커밋 이력과 기존 파일에 보관한다.
