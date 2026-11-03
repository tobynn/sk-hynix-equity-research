#!/usr/bin/env python3
"""Validate the 2026 Q3 update values without changing assumptions."""
from pathlib import Path
import json, math
ROOT=Path(__file__).resolve().parents[1]
p=json.loads((ROOT/"data/q3_valuation.json").read_text(encoding="utf-8"))
for key in ("DCF","RIM","PER"):
    assert p[key]["price"] > 0, key
assert len(p["rows"]) == 5
assert all(p["rows"][i]["year"] == 2027+i for i in range(5))
assert p["DCF"]["equity"] > p["DCF"]["pv_fcff"] + p["DCF"]["pv_tv"] - 1
print("Q3 valuation update: PASS")
