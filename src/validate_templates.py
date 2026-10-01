from __future__ import annotations

from pathlib import Path
import sys

import pandas as pd


ROOT = Path(__file__).resolve().parents[1]

SCHEMAS = {
    "data/templates/hbm_assumptions.csv": {
        "scenario", "generation", "year", "volume_index", "asp_index",
        "yield_ramp", "ebit_margin", "source", "as_of_date", "notes",
    },
    "data/templates/peer_universe.csv": {
        "company", "ticker", "role", "business_overlap", "inclusion_status",
        "reason", "valuation_basis", "as_of_date", "source",
    },
    "data/templates/sotp_segments.csv": {
        "segment", "forecast_year", "ebit_krw_bn", "selected_multiple",
        "valuation_basis", "source", "as_of_date", "notes",
    },
}


def validate() -> list[str]:
    errors: list[str] = []
    for relative_path, required in SCHEMAS.items():
        path = ROOT / relative_path
        if not path.exists():
            errors.append(f"Missing file: {relative_path}")
            continue
        frame = pd.read_csv(path)
        missing = required.difference(frame.columns)
        if missing:
            errors.append(f"{relative_path}: missing columns {sorted(missing)}")
        if frame.empty:
            errors.append(f"{relative_path}: no data rows")

    hbm = pd.read_csv(ROOT / "data/templates/hbm_assumptions.csv")
    if not hbm["yield_ramp"].between(0, 1).all():
        errors.append("hbm_assumptions.csv: yield_ramp must be between 0 and 1")
    if not hbm["ebit_margin"].between(-1, 1).all():
        errors.append("hbm_assumptions.csv: ebit_margin must be between -1 and 1")

    return errors


if __name__ == "__main__":
    problems = validate()
    if problems:
        print("Template validation failed:")
        for problem in problems:
            print(f"- {problem}")
        sys.exit(1)
    print("Template validation passed.")

