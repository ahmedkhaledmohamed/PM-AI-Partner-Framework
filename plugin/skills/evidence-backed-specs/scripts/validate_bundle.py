#!/usr/bin/env python3
"""Check record links and completeness against an explicitly declared example scope."""

import json
import sys
from pathlib import Path


LINKS = {
    "feature": {"sourceUnitIds": "sourceUnit", "relatedRequirementIds": "requirement", "relatedNeedIds": "need"},
    "observation": {"relatedRequirementIds": "requirement"},
    "requirement": {"relatedObservationIds": "observation"},
    "gap": {"needId": "need", "relatedRequirementIds": "requirement", "relatedObservationIds": "observation"},
    "sourceReview": {"unitId": "sourceUnit"},
    "deliverable": {"candidateFeatureIds": "feature", "relatedRequirementIds": "requirement"},
    "sourceAssessment": {"relatedNeedIds": "need", "relatedRequirementIds": "requirement"},
    "verificationEvidence": {"claimId": ("observation", "requirement", "need")},
    "changeReview": {"unitId": "sourceUnit"},
}


def validate(bundle):
    errors = []
    records = bundle.get("records")
    scope = bundle.get("scope")
    if not isinstance(records, list) or not isinstance(scope, dict):
        return ["bundle requires records array and scope object"]

    by_id = {}
    for index, record in enumerate(records):
        if not isinstance(record, dict) or not isinstance(record.get("id"), str) or not isinstance(record.get("kind"), str):
            errors.append(f"records[{index}]: missing string id or kind")
            continue
        if record["id"] in by_id:
            errors.append(f"duplicate id: {record['id']}")
        by_id[record["id"]] = record

    for record in records:
        if not isinstance(record, dict) or "id" not in record or "kind" not in record:
            continue
        for field, expected in LINKS.get(record["kind"], {}).items():
            values = record.get(field, [])
            values = values if isinstance(values, list) else [values]
            for value in values:
                target = by_id.get(value) if isinstance(value, str) else None
                if target is None or target.get("kind") not in ((expected,) if isinstance(expected, str) else expected):
                    errors.append(f"{record['id']}.{field}: unresolved or wrong-kind id {value}")

    declarations = {
        "sourceUnitIds": "sourceUnit",
        "featureIds": "feature",
        "assessedNeedIds": "need",
    }
    for field, kind in declarations.items():
        declared = scope.get(field)
        if not isinstance(declared, list) or not all(isinstance(item, str) for item in declared) or len(declared) != len(set(declared)):
            errors.append(f"scope.{field}: expected unique ID array")
            continue
        for item in declared:
            if by_id.get(item, {}).get("kind") != kind:
                errors.append(f"scope.{field}: missing {kind} {item}")

    source_units = scope.get("sourceUnitIds", [])
    if isinstance(source_units, list):
        for unit_id in source_units:
            if not any(r.get("kind") == "sourceReview" and r.get("unitId") == unit_id for r in records if isinstance(r, dict)):
                errors.append(f"{unit_id}: no sourceReview")
            if not any(r.get("kind") == "feature" and unit_id in r.get("sourceUnitIds", []) for r in records if isinstance(r, dict)):
                errors.append(f"{unit_id}: no feature home")

    assessed_needs = scope.get("assessedNeedIds", [])
    if isinstance(assessed_needs, list):
        for need_id in assessed_needs:
            if not any(r.get("kind") == "gap" and r.get("needId") == need_id for r in records if isinstance(r, dict)):
                errors.append(f"{need_id}: no gap assessment")
    return errors


def main():
    if len(sys.argv) != 2:
        print("usage: validate_bundle.py BUNDLE.json", file=sys.stderr)
        return 2
    try:
        bundle = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        print(error, file=sys.stderr)
        return 2
    errors = validate(bundle)
    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    print(f"Valid links and declared scope for {len(bundle['records'])} records.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
