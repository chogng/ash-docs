"""Recompute the accompanying Ash SCM latency measurements (Python 3.9+)."""

import json
import math
from pathlib import Path
import random
import statistics
import sys


def quantile(values, fraction):
    ordered = sorted(values)
    return ordered[math.ceil(fraction * len(ordered)) - 1]


def describe(values):
    return {
        "n": len(values),
        "median": statistics.median(values),
        "p95": quantile(values, 0.95),
        "p99": quantile(values, 0.99),
        "max": max(values),
    }


def verify(actual, expected, location):
    # Exported durations were rounded to 0.001 ms. Differences can therefore
    # move by up to 0.001 ms; compare with the original report at that precision.
    if isinstance(expected, dict):
        for key, value in expected.items():
            verify(actual[key], value, f"{location}.{key}")
    elif isinstance(expected, list):
        for index, value in enumerate(expected):
            verify(actual[index], value, f"{location}[{index}]")
    elif isinstance(expected, bool) or isinstance(expected, int):
        if actual != expected:
            raise ValueError(f"{location}: {actual} != {expected}")
    elif not math.isclose(actual, expected, abs_tol=0.002, rel_tol=0):
        raise ValueError(f"{location}: {actual} != {expected}")


def analyze(experiment, rules, columns):
    windows = experiment["windows"]
    variants = experiment["variants"]
    size = experiment["clusterSize"]
    if len(windows) % size or "".join(w["variant"] for w in windows) != experiment["order"]:
        raise ValueError("Window order or cluster size does not match the experiment")
    clusters = []
    for start in range(0, len(windows), size):
        group = windows[start:start + size]
        if len({w["variant"] for w in group}) != size or set(w["variant"] for w in group) != set(variants):
            raise ValueError("Each adjacent cluster must contain every variant once")
        clusters.append({w["variant"]: w for w in group})
    for window in windows:
        if len(window["cold"]) != rules["coldClicksPerWindow"] or len(window["warm"]) != rules["warmClicksPerWindow"]:
            raise ValueError("Unexpected click count")
        for row in window["cold"] + window["warm"]:
            if len(row) != len(columns) or any(not isinstance(v, (int, float)) or not math.isfinite(v) or v < 0 for v in row):
                raise ValueError("Expected finite, nonnegative durations")

    pooled = {
        variant: {
            metric: describe([row[column] for window in windows if window["variant"] == variant for row in window["warm"]])
            for column, metric in enumerate(columns)
        }
        for variant in variants
    }
    rng = random.Random(rules["seed"])
    selections = [rng.choices(range(len(clusters)), k=len(clusters)) for _ in range(rules["bootstrapResamples"])]
    comparisons = {}
    for candidate, control in experiment["comparisons"]:
        comparison = {}
        for column, metric in enumerate(columns):
            # Resample whole adjacent window pairs/triplets, retaining all warm
            # clicks within a selected window. Reuse draws for every comparison.
            differences = {"p95": [], "p99": []}
            for selected in selections:
                values = {
                    variant: [row[column] for index in selected for row in clusters[index][variant]["warm"]]
                    for variant in (candidate, control)
                }
                for name, fraction in (("p95", 0.95), ("p99", 0.99)):
                    differences[name].append(quantile(values[candidate], fraction) - quantile(values[control], fraction))
            comparison[metric] = {}
            for name, fraction in (("p95", 0.95), ("p99", 0.99)):
                wins = sum(
                    quantile([row[column] for row in cluster[candidate]["warm"]], fraction)
                    < quantile([row[column] for row in cluster[control]["warm"]], fraction)
                    for cluster in clusters
                )
                interval = [quantile(differences[name], 0.025), quantile(differences[name], 0.975)]
                comparison[metric][name] = {
                    "delta": pooled[candidate][metric][name] - pooled[control][metric][name],
                    "ci95": interval,
                    "improvedClusters": wins,
                    "stable": interval[1] < 0 and wins >= rules["minimumImprovedClusters"],
                }
        comparison["primaryStable"] = all(value["stable"] for value in comparison[columns[0]].values())
        comparisons[f"{candidate}_minus_{control}"] = comparison
    result = {"pooled": pooled, "comparisons": comparisons}
    verify(result, experiment["reported"], experiment["id"])
    return result


def main():
    source = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).with_name("scm-diff-latency-data.json")
    data = json.loads(source.read_text(encoding="utf-8"))
    if data["schemaVersion"] != 1:
        raise ValueError("Unsupported data schema")
    for experiment in data["experiments"]:
        result = analyze(experiment, data["rules"], data["columns"])
        print(f"\n{experiment['id']} ({experiment['order']})")
        for variant, metrics in result["pooled"].items():
            print(f"  {variant}: " + "; ".join(
                f"{name} n={values['n']} p95={values['p95']:.1f} p99={values['p99']:.1f} max={values['max']:.1f} ms"
                for name, values in metrics.items()
            ))
        for name, comparison in result["comparisons"].items():
            print(f"  {name}: primary stable={comparison['primaryStable']}")
            for metric in data["columns"]:
                for percentile, values in comparison[metric].items():
                    low, high = values["ci95"]
                    print(f"    {metric} {percentile}: delta={values['delta']:+.1f} ms, CI=[{low:+.1f}, {high:+.1f}], improved={values['improvedClusters']}/8, stable={values['stable']}")
    print("\nAll exported statistics match the original reports within rounding tolerance.")


if __name__ == "__main__":
    main()
