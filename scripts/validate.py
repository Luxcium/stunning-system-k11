import sys, yaml, re

def load_yaml(path):
    with open(path, 'r') as f:
        return yaml.safe_load(f)

def check_required(oas):
    errors = []
    for k in ["openapi","info","paths"]:
        if k not in oas:
            errors.append(f"Missing top-level '{k}'")
    if "components" not in oas:
        errors.append("Missing 'components'")
    else:
        if "schemas" not in oas["components"]:
            errors.append("Missing 'components.schemas'")
    return errors

def check_paths(oas):
    errors = []
    for p, item in oas.get("paths",{}).items():
        if not p.startswith("/"):
            errors.append(f"Path must start with '/': {p}")
        ops = set(item.keys())
        unknown = ops - {"get","post","put","patch","delete","options","head","trace","parameters"}
        if unknown:
            errors.append(f"Unknown operations in {p}: {', '.join(sorted(unknown))}")
    return errors

def check_refs(oas):
    errors = []
    # rudimentary $ref check
    text = yaml.safe_dump(oas)
    for m in re.finditer(r"\$ref: ['\"](#/[^'\"]+)['\"]", text):
        ref = m.group(1)
        # we only check that component refs exist for components.*
        if ref.startswith("#/components/"):
            parts = ref.split("/")[2:]
            node = oas.get("components", {})
            for part in parts:
                if part not in node:
                    errors.append(f"Broken $ref {ref}")
                    break
                node = node[part]
    return errors

def main():
    path = sys.argv[1] if len(sys.argv) > 1 else "openapi.yaml"
    oas = load_yaml(path)
    errors = []
    errors += check_required(oas)
    errors += check_paths(oas)
    errors += check_refs(oas)
    if errors:
        print("VALIDATION ERRORS:")
        for e in errors:
            print(f"- {e}")
        sys.exit(1)
    print("OK: basic validation passed.")

if __name__ == "__main__":
    main()
