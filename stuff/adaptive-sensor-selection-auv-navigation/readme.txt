# Confidence-Driven Adaptive Sensor Selection for AUV Navigation

Adaptive sensor-selection framework for position estimation in GPS-denied Autonomous Underwater Vehicle (AUV) navigation. The method switches between navigation sources (e.g. INS, acoustic fusion) based on a confidence metric, rather than relying on a single fixed sensor pipeline.

**Author:** Babar Khan Durrani — Department of Electrical Engineering, Bahria School of Applied & Engineering Sciences (H-11), Islamabad
**Paper:** submitted to FIT 2026, COMSATS

## Results (30-seed evaluation)

| Method | Mean Position Error | Std Dev |
|---|---|---|
| Adaptive (proposed) | 0.168 | 0.097 |
| Sensor Fusion (baseline) | 0.224 | 0.048 |
| INS-only (baseline) | 0.202 | 0.083 |

- **24.8% improvement** over fusion baseline (p = 4.2e-06)
- **16.8% improvement** over INS-only baseline (p = 7.4e-13)

Full numeric results: [`data/summary.json`](data/summary.json), per-seed results: [`data/multiseed_results.csv`](data/multiseed_results.csv)

## Repository structure

```
├── auv_navigation_sim.py   # Full simulation + evaluation code
├── paper.pdf                # Submitted paper (FIT 2026)
├── figures/                  # Result figures used in the paper
└── data/                     # Multiseed results (CSV) and summary metrics (JSON)
```

## Figures
- `fig1_environment.png` — simulation environment / visibility profile
- `fig2_single_run.png` — single-run trajectory comparison
- `fig3_boxplot.png` — error distribution across seeds
- `fig4_bar.png` — mean error comparison across methods
- `fig5_switches.png` — sensor-switching behavior
- `fig6_ins_drift.png` — INS drift over distance

## Running

```bash
pip install numpy pandas matplotlib scipy
python auv_navigation_sim.py
```

Note: the script originally targeted a Colab output path (`/content/auv_outputs`) — update `OUTPUT_DIR` in the script if running locally.

## Citation

If you use this work, please cite the paper (see `paper.pdf`).
