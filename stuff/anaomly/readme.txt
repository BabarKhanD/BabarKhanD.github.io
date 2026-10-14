# Visual Anomaly Inspection using Deep Feature Representations

An unsupervised computer vision system for detecting visually anomalous industrial products using deep feature representations from an ImageNet-pretrained ResNet-50 model.

The system learns the visual characteristics of **normal products only** and identifies previously unseen test conditions by measuring their distance from the learned normal feature space.

## Overview

Traditional industrial inspection systems often require defective examples for supervised training. This project explores a different approach:

> **Learn what normal looks like, then identify observations that deviate from it.**

The system was developed using the **MVTec AD 2** industrial anomaly detection benchmark and evaluated on three object categories:

- Vial
- Fruit Jelly
- Sheet Metal

The project also includes experimental comparisons between global feature representations, patch-level representations, and ROI-aware representations.

---

## Key Features

- Unsupervised / normal-only anomaly detection
- ImageNet-pretrained ResNet-50 feature extraction
- 1024-dimensional deep visual representations
- Nearest-neighbor anomaly scoring
- Public test-set evaluation
- ROC-AUC evaluation
- Average Precision evaluation
- Patch-level anomaly detection experiment
- ROI-aware anomaly detection experiment
- Feature activation visualization
- Reproducible Google Colab workflow
- No paid API or cloud AI service required

---

## System Architecture

```text
                 MVTec AD 2
                     |
                     v
          Normal Training Images
                     |
                     v
              ResNet-50
        ImageNet Pretrained Model
                     |
                     v
          Deep Feature Extraction
                     |
                     v
            1024-D Feature Vector
                     |
                     v
          Normal Feature Memory
                     |
                     v
          Nearest-Neighbor Search
                     |
                     v
             Anomaly Score
                     |
             +-------+-------+
             |               |
             v               v
          Normal          Anomalous

PROJECT 3 — VISUAL ANOMALY INSPECTION

Project Type:
Unsupervised visual anomaly detection

Dataset:
MVTec AD 2

Categories:
Vial
Fruit Jelly
Sheet Metal

Training Strategy:
Normal-only training data

Final Selected Approach:
ImageNet-pretrained ResNet-50 feature extraction
with nearest-neighbor comparison against normal
training representations.

No supervised defect classifier was trained.

Experiments:
1. Global ResNet feature baseline
2. Patch-level anomaly detection
3. ROI-aware anomaly detection

Final Selected Model:
Global ResNet feature baseline

FINAL RESULTS
-------------

Vial:
ROC-AUC = 0.7292
Average Precision = 0.9467

Fruit Jelly:
ROC-AUC = 0.645
Average Precision = 0.8276

Sheet Metal:
ROC-AUC = 0.8471
Average Precision = 0.9687

Mean ROC-AUC:
0.7404

Mean Average Precision:
0.9143

PROJECT COMPONENTS
------------------

- MVTec AD 2 dataset
- PyTorch
- Torchvision
- ResNet-50
- ImageNet pretrained weights
- Nearest-neighbor anomaly scoring
- ROI preprocessing experiment
- Patch-level anomaly experiment
- Anomaly visualization
- Evaluation using ROC-AUC
- Evaluation using Average Precision

STATUS
------

Model development: COMPLETE
Model evaluation: COMPLETE
Visualization: COMPLETE
Documentation: IN PROGRESS
GitHub packaging: PENDING
CV integration: PENDING

Generated:
2026-08-10