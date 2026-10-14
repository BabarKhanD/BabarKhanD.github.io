# 🦴 Bone Scan Metastasis Detection

AI pipeline for detecting bone metastasis from nuclear medicine bone scans using deep learning.

This project implements a **dual-view CNN framework (Anterior + Posterior)** with advanced techniques like **Focal Loss**, **Grad-CAM explainability**, and **automatic hotspot detection**, along with a comparison against a **Vision Transformer (ViT)**.

---

## 👨‍💻 Authors
- **Babar Khan Durrani**
- **Haleema Rehman**

**Institution:** Bahria University, BSEAS

---

## 📊 Results

| Model | Recall | Caught | mAP |
|------|--------|--------|------|
| Baseline CNN | 53% | 8/15 | 0.149 |
| Augmented CNN | 73% | 11/15 | 0.221 |
| ⭐ **Focal Loss CNN** | **100%** | **15/15** | **0.279** |
| Vision Transformer | 27% | 4/15 | 0.184 |

---

## 🏆 Key Insight

The **Focal Loss CNN** achieves **100% recall at threshold = 0.25**, meaning:

➡️ **Zero missed cancer cases**

---

## 🚀 Features

- ✅ Dual-view learning (ANT + POST scans)  
- ✅ Focal Loss for class imbalance  
- ✅ Grad-CAM heatmaps for explainability  
- ✅ Automatic hotspot (lesion) detection  
- ✅ Interactive image analysis tool  
- ✅ Vision Transformer comparison  

---

## 🔍 Outputs

- Prediction (Metastasis / Non-metastasis)  
- Confidence score  
- Grad-CAM heatmap  
- Detected hotspots  

---

## ⚖️ Responsible AI

- Threshold **0.25** ensures **zero missed cancer cases**  
- Grad-CAM used for **model transparency**  
- Designed as a **decision support system**, not a replacement  

---

## ⚠️ Important

This project is **not approved for clinical use** and should only be used for **research and educational purposes**.

---

## 📌 Future Work

- Improve dataset size and diversity  
- Clinical validation with radiologists  
- Deployment as a web-based diagnostic tool  
- Improve Vision Transformer performance  

---

## ⭐ Contribution

Feel free to fork, improve, and contribute to this project.  
Pull requests are welcome!
