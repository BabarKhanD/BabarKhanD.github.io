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
    desc: 'Fully local RAG assistant for research papers: Q&A with source and chunk tracking, structured summaries and two-paper comparison. BGE embeddings, ChromaDB retrieval with relevance filtering, and Gemma 3 1B served locally through LM Studio.',
    metric: '100% local · no API keys',
    tags: ['RAG', 'ChromaDB', 'BGE', 'LM Studio', 'Gemma 3'],
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
    repo: 'adaptive-sensor-selection-auv-navigation',
    title: 'Adaptive Sensor Selection for AUV Navigation',
    desc: 'Confidence-driven sensor selection for position estimation in GPS-denied autonomous underwater vehicle navigation, compared against sensor fusion and INS-only baselines in simulation.',
    metric: '0.168 m error vs 0.224 m (fusion) · 24.8% lower',
    note: 'Simulation study over 30 seeds; full results and figures in the repo.',
    image: '/projects/auv-fig4.png',
    tags: ['Robotics', 'Sensor fusion', 'Simulation', 'SciPy'],
    accent: '#22d3ee',
  },
]

export const BUSINESS = [
  {
    repo: 'property-doc-intelligence',
    title: 'Property Document Intelligence',
    desc: 'Upload property PDFs, extract text and ask questions with page-cited answers using RAG.',
    tags: ['RAG', 'FastAPI', 'SQLite'],
    accent: '#34d399',
  },
  {
    repo: 'maintenance-ai',
    title: 'Maintenance AI',
    desc: 'Turns maintenance requests into AI-triaged work orders with vendor matching.',
    tags: ['Python', 'SQLite', 'LLM'],
    accent: '#fbbf24',
  },
  {
    repo: 'property-ops-assistant',
    title: 'Property Ops Assistant',
    desc: 'AI assistant demo for day-to-day property operations.',
    tags: ['AI automation', 'Python'],
    accent: '#a78bfa',
  },
  {
    repo: 'tenant-followup',
    title: 'Tenant Follow-up',
    desc: 'Automated tenant follow-up workflow demo.',
    tags: ['AI automation', 'Python'],
    accent: '#f472b6',
  },
]

export const FOUNDATIONS = [
  { repo: 'heart-disease-prediction-ml', title: 'Heart Disease Prediction', desc: 'ML model predicting heart disease on the UCI dataset.', tags: ['Scikit-learn', 'Jupyter'], accent: '#f472b6' },
  { repo: 'House-Price-Prediction-', title: 'House Price Prediction', desc: 'Linear Regression and Gradient Boosting with MAE/RMSE evaluation and multiple visualizations.', tags: ['Scikit-learn', 'Pandas'], accent: '#60a5fa' },
  { repo: 'stock_price_apple', title: 'Apple Stock Price Prediction', desc: 'Next-day closing price prediction with Linear Regression and Random Forest using yfinance data.', tags: ['yfinance', 'Random Forest'], accent: '#34d399' },
  { repo: 'python-job-scraper-task6-elevvo', title: 'Python Job Scraper', desc: 'Extracts Python job listings from a saved Indeed HTML page.', tags: ['Web scraping', 'Python'], accent: '#fbbf24' },
]