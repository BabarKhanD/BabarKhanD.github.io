const GH = 'https://github.com/BabarKhanD/'
export const repo = (name) => GH + name

export const AI = [
  {
    repo: 'bone-scan-metastasis-detection',
    title: 'Bone Metastasis Detection',
    credit: 'with Haleema Rehman · Bahria University',
    desc: 'Dual-view (anterior + posterior) CNN for detecting bone metastasis in nuclear medicine bone scans. Uses Focal Loss for class imbalance, Grad-CAM heatmaps, automatic hotspot detection, a Vision Transformer comparison and an interactive single-image analyzer.',
    metric: '15/15 metastasis cases caught at threshold 0.25',
    note: 'Baseline CNN 8/15 · Augmented CNN 11/15 · Focal Loss CNN 15/15 · ViT 4/15. Research prototype, not for clinical use.',
    tags: ['PyTorch', 'CNN', 'Focal Loss', 'Grad-CAM', 'ViT'],
    accent: '#f472b6',
  },
  {
    repo: 'visual-anomaly-inspection',
    title: 'Visual Anomaly Inspection',
    desc: 'Unsupervised industrial anomaly detection trained on normal products only. ImageNet-pretrained ResNet-50 features with nearest-neighbor scoring, plus patch-level and ROI-aware experiments on MVTec AD 2.',
    metric: 'Sheet Metal 0.847 ROC-AUC · 0.969 AP',
    note: 'Mean over Vial, Fruit Jelly and Sheet Metal: 0.740 ROC-AUC, 0.914 AP.',
    tags: ['PyTorch', 'ResNet-50', 'OpenCV', 'Scikit-learn'],
    accent: '#22d3ee',
  },
  {
    repo: 'football-ai-tactical-analysis',
    title: 'Football AI Tactical Analysis',
    desc: 'Football video analytics with a custom-trained YOLO model for players, goalkeepers, referees and ball. K-Means jersey clustering splits teams, ByteTrack tracks players, and the pipeline estimates possession, possession streaks and player activity (standing, walking, jogging, running).',
    metric: 'Detection · Team ID · Possession · Activity',
    tags: ['YOLO', 'ByteTrack', 'OpenCV', 'K-Means'],
    accent: '#34d399',
  },
  {
    repo: 'local-ai-research-assistant',
    title: 'Local AI Research Assistant',
    desc: 'Fully local RAG assistant for research papers: Q&A with source and chunk tracking, structured summaries and two-paper comparison. Built as an n8n workflow (workflow file in the repo) with BGE embeddings, ChromaDB retrieval with relevance filtering, and Gemma 3 1B served locally through LM Studio.',
    metric: '100% local · no API keys',
    tags: ['n8n', 'RAG', 'ChromaDB', 'BGE', 'LM Studio', 'Gemma 3'],
    accent: '#a78bfa',
  },
  {
    repo: 'resume-analyzer',
    title: 'Resume Analyzer',
    desc: 'Offline NLP tool that scores a resume\'s ATS fit for a target role (0-100) and suggests role-specific improvements. Block-aware PDF parsing, section detection, experience-level classification and per-skill relevance scoring with MiniLM sentence embeddings.',
    metric: '30 job roles · runs fully offline',
    tags: ['Sentence Transformers', 'NLP', 'PyMuPDF'],
    accent: '#60a5fa',
  },
  {
    repo: 'f1-track-limits-ambiguous-classification',
    title: 'F1 Track Limits: Ambiguous Cases',
    desc: 'Telemetry-based classifier separating clear F1 track limit violations from "no advantage" cases, the ambiguous class the FIA\'s AI system still routes to human stewards. Built from public FastF1 data with five compared models, SHAP explanations and an ablation study.',
    metric: 'Test F1-macro 0.887 · ROC-AUC 0.942 · 4,254 incidents',
    note: 'Random Forest, race-level held-out split, seasons 2018-2025.',
    tags: ['FastF1', 'Random Forest', 'XGBoost', 'SHAP'],
    accent: '#fb923c',
  },
  {
    repo: 'AUV-Confidence-Weighting',
    title: 'AUV Navigation: Confidence Weighting',
    desc: 'GPS-denied AUV position estimation with a Kalman filter that scores each sensor (DVL, vision, sonar SLAM) by windowed normalized innovation squared and inflates its measurement covariance as it degrades, instead of dropping it. Compared against chi-square gating, a Sage-Husa adaptive filter, a per-sensor IMM and hard sensor selection.',
    metric: '0.316 m RMSE vs 0.370 m gated (Scenario A) · about 15% lower',
    note: '100 held-out Monte Carlo seeds. Comparable to IMM at about 7.6× lower runtime; IMM is more accurate in Scenario B (0.425 m vs 0.445 m).',
    tags: ['Kalman filter', 'Sensor fusion', 'State estimation', 'Monte Carlo', 'Python'],
    accent: '#38bdf8',
  },
]

// Removed from the portfolio (kept as empty lists so existing imports still work)
export const BUSINESS = []
export const FOUNDATIONS = []