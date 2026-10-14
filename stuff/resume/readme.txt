# Resume Analyzer — ATS Score & Role-Fit Feedback

An offline NLP tool that scores a resume's ATS (Applicant Tracking System) fit for a
target job role, and gives actionable, role-specific improvement suggestions.

Runs fully locally — no API keys, no paid services. Uses a small pretrained sentence
embedding model (`all-MiniLM-L6-v2`) for semantic skill matching.

## Features

- **Resume parsing** — extracts text from PDF (including multi-column/sidebar layouts,
  via block-aware PyMuPDF extraction) and DOCX
- **Personal detail extraction** — name, email, current profession
- **Experience-level detection** — classifies resume as student / early-career / professional
- **Section detection** — identifies standard resume sections (Summary, Skills, Experience,
  Education, Projects, etc.)
- **Flexible role matching** — supports 30 predefined roles; free-text role input (e.g.
  "junior python developer") is semantically matched to the closest known role
- **ATS scoring (0–100)** — weighted combination of skill match (40%), section completeness
  (20%), quantified-achievement ratio (20%), and formatting (20%)
- **Per-skill effectiveness scoring** — each matched/missing skill gets a relevance
  percentage for the target role, not just a binary present/absent flag
- **Adaptive suggestions** — varied phrasing on repeat runs, plus targeted follow-up
  responses (project ideas, skill priorities, formatting, quantification tips) based on
  what the user asks for if unsatisfied with the first answer

## How it works

1. Upload a resume (PDF/DOCX)
2. Text is extracted and split into sections
3. You specify a target role
4. The tool computes an ATS score and shows:
   - Skills you have, with effectiveness % for that role
   - Skills you're missing, with potential effectiveness % if added
   - Section/formatting issues
5. Optionally, ask for suggestions — and refine them interactively if the first pass
   isn't specific enough

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/resume-analyzer.git
cd resume-analyzer
pip install -r requirements.txt
python main.py
```

### Or in Google Colab

Open `resume_analyzer_colab.ipynb` in Colab and run all cells — no local setup needed.

## Project structure

```
resume-analyzer/
├── main.py                     # Entry point / interactive loop
├── src/
│   ├── extraction.py           # PDF/DOCX text extraction, personal details
│   ├── sections.py             # Section splitting, completeness/quantification checks
│   ├── roles.py                # Role taxonomy + semantic role matching
│   ├── scoring.py               # Skill matching, effectiveness scoring, ATS score
│   └── suggestions.py          # Suggestion generation (initial + targeted follow-up)
├── resume_analyzer_colab.ipynb # Ready-to-run Colab notebook
├── requirements.txt
└── README.md
```

## Known limitations

- **Section detection is heuristic** (keyword/regex-based), not a trained parser.
  Unusual section headers (e.g. "Core Competencies" instead of "Skills") may not be
  recognized.
- **Role taxonomy is manually curated**, not learned from job posting data — 30 roles
  are covered; extending to more roles means adding entries to `src/roles.py`.
- **Scanned/image-only PDFs are not supported** (no OCR step) — text must be selectable
  in the PDF.
- The ATS score is a heuristic approximation, not a reproduction of any specific
  commercial ATS's actual scoring algorithm.

## Tech stack

- `pymupdf` — PDF text extraction (block/layout-aware)
- `python-docx` — DOCX parsing
- `sentence-transformers` (`all-MiniLM-L6-v2`) — semantic skill/role matching
- Pure Python for scoring/suggestion logic (no external ML training required)

## License

MIT
