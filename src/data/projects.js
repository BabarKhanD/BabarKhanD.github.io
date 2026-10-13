const GH = 'https://github.com/BabarKhanD/'
export const repo = (name) => GH + name

export const FEATURED = [
  {
    repo: 'bone-scan-metastasis-detection',
    title: 'Bone Metastasis Detection',
    desc: 'AI pipeline for bone metastasis detection from nuclear medicine bone scans. Dual-view CNN with Focal Loss, Grad-CAM explainability, automatic hotspot detection, Vision Transformer comparison and an interactive single-image analyzer.',
    metric: '100% recall · zero missed cases',
    tags: ['PyTorch', 'CNN', 'Focal Loss', 'Grad-CAM', 'ViT'],
    accent: '#f472b6',
  },
  {
    repo: 'visual-anomaly-inspection',
    title: 'Visual Anomaly Inspection',
    desc: 'Unsupervised industrial anomaly detection with ImageNet-pretrained ResNet-50 features and nearest-neighbor scoring. Compared global, patch-level and ROI-aware approaches on MVTec AD 2.',
    metric: '0.847 ROC-AUC · 0.969 AP (Sheet Metal)',
    tags: ['PyTorch', 'ResNet-50', 'OpenCV', 'Scikit-learn'],
    accent: '#22d3ee',
  },
  {
    repo: 'football-ai-tactical-analysis',
    title: 'Football AI Tactical Analysis',
    desc: 'YOLO-based football video analytics: player, ball, goalkeeper and referee detection, team classification, ball possession analysis and real-time player activity recognition.',
    metric: 'Detection · Teams · Possession',
    tags: ['YOLO', 'OpenCV', 'Tracking', 'Python'],
    accent: '#34d399',
  },
  {
    repo: 'local-ai-research-assistant',
    title: 'Local AI Research Assistant',
    desc: 'Fully local RAG research assistant for paper Q&A, automated summarization and two-paper comparison. BGE embeddings, ChromaDB retrieval, relevance filtering and source tracking with a locally hosted LLM.',
    metric: '100% local · no API keys',
    tags: ['RAG', 'ChromaDB', 'BGE', 'Ollama'],
    accent: '#a78bfa',
  },
  {
    repo: 'resume-analyzer',
    title: 'Resume Analyzer',
    desc: 'Offline NLP tool that scores resume ATS fit for a target role and gives semantic, role-specific suggestions. Sentence-BERT matching against 30+ roles, PDF parsing, section detection and skill-gap analysis.',
    metric: '30+ job roles · fully offline',
    tags: ['Sentence-BERT', 'NLP', 'PDF parsing'],
    accent: '#60a5fa',
  },
]

export const RESEARCH = [
  {
    repo: 'f1-track-limits-ambiguous-classification',
    title: 'F1 Track Limits: Ambiguous Classification',
    desc: 'Telemetry-based ML classifier separating clear F1 track limit violations from "no advantage" cases, the ambiguous class that FIA\'s AI system still routes to human stewards. Built on FastF1.',
    metric: 'F1-macro 0.887 · 4,254 incidents (2018–2025)',
    tags: ['FastF1', 'Random Forest', 'Telemetry'],
    accent: '#fb923c',
  },
  {
    repo: 'adaptive-sensor-selection-auv-navigation',
    title: 'Adaptive Sensor Selection for AUV Navigation',
    desc: 'Confidence-driven adaptive sensor selection for GPS-denied AUV position estimation.',
    metric: 'GPS-denied navigation',
    tags: ['Robotics', 'Sensor fusion', 'Estimation'],
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