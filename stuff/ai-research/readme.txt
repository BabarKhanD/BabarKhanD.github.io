# Local AI Research Assistant

A fully local AI research assistant built with Retrieval-Augmented Generation (RAG) for working with research papers — index papers, ask questions, generate summaries, and compare papers, all without any cloud API.

Uses a local embedding model, ChromaDB as the vector store, and a locally running Gemma 3 1B model via LM Studio. No paid AI API, OpenAI key, or cloud LLM required.

## Features

### Research Paper Q&A
Ask questions about indexed papers, e.g. `What is Dense Passage Retrieval?`

The system:
1. Converts the question into an embedding
2. Searches the ChromaDB vector database
3. Retrieves the most relevant chunks
4. Applies a relevance threshold
5. Sends the retrieved context to the local Gemma model
6. Generates an answer with source paper and chunk numbers

If no relevant content is found, it responds:
> I could not find this information in the indexed papers.

### Paper Summarization
```
summarize: Paper Title
```
Example:
```
summarize: Dense Passage Retrieval for Open-Domain Question Answering
```
Generates a structured summary: Main Contribution, Methodology, Dataset/Data, Results, Limitations.

### Paper Comparison
```
compare: Paper A | Paper B
```
Example:
```
compare: Dense Passage Retrieval for Open-Domain Question Answering | A Benchmark Study of Machine Learning Models for Online Fake News Detection
```
Generates a comparison covering: Main Objective, Methodology, Models/Approaches, Dataset/Data, Results, Key Differences, Overall Comparison.

### Source Tracking
Every answer lists the papers and chunks used:
```
========== SOURCES ==========
- Dense Passage Retrieval for Open-Domain Question Answering | Chunk 4
- Dense Passage Retrieval for Open-Domain Question Answering | Chunk 14
```

### Continuous Questioning
Runs as a session — ask multiple questions without restarting the script. Type `exit` to quit.

## System Architecture

```
                 Research Papers
                       │
                       ▼
                PDF Text Extraction
                       │
                       ▼
                   Chunking
                       │
                       ▼
             BGE Embedding Model
                       │
                       ▼
                  ChromaDB
              Vector Database
                       │
                User Question
                       │
                       ▼
             Query Embedding
                       │
                       ▼
             Similarity Search
                       │
                       ▼
              Relevant Chunks
                       │
                       ▼
                 RAG Prompt
                       │
                       ▼
              Gemma 3 1B Model
                  via LM Studio
                       │
                       ▼
                  AI Answer
                       │
                       ▼
              Sources + Chunks
```

## Technology Stack

| Component | Technology |
|---|---|
| Programming Language | Python |
| Embedding Model | BAAI/bge-small-en-v1.5 |
| Vector Database | ChromaDB |
| Local LLM Runtime | LM Studio |
| Local Language Model | Gemma 3 1B |
| HTTP Client | Requests |
| Research Paper Source | arXiv |
| Workflow Automation | n8n |

## Project Structure

```
local-ai-research-assistant/
│
├── scripts/
│   ├── ask_pdf.py
│   ├── rag_api.py
│   └── store_pdf.py
│
├── README.md
├── requirements.txt
└── .gitignore
```

`data/` and `database/` are intentionally excluded from the repo — they hold locally generated research data and the ChromaDB vector database.

## How the RAG System Works

1. **Paper Collection** — Research papers are collected from arXiv and downloaded as PDFs.
2. **Text Extraction** — PDF text is extracted into machine-readable form.
3. **Chunking** — Extracted text is split into smaller chunks so only relevant sections are retrieved per question, reducing context load on the local model.
4. **Embedding Generation** — Each chunk is converted into a vector using `BAAI/bge-small-en-v1.5`.
5. **Vector Storage** — Embeddings are stored in ChromaDB for semantic similarity search.
6. **Query Retrieval** — The user's question is embedded with the same model and compared against stored vectors to retrieve the closest chunks.
7. **Relevance Filtering** — Only chunks passing a similarity threshold are used. If none qualify, the system reports the information wasn't found.
8. **Local LLM Generation** — Retrieved content is inserted into a RAG prompt and sent to the local Gemma 3 1B model via LM Studio, which returns the generated answer.

## Installation

### Requirements
- Python 3.10+
- LM Studio
- Git
- Sufficient RAM for the selected local language model

### 1. Clone the Repository
```
git clone https://github.com/BabarKhanD/local-ai-research-assistant.git
cd local-ai-research-assistant
```

### 2. Create a Virtual Environment (Windows)
```
python -m venv venv
venv\Scripts\activate
```

### 3. Install Dependencies
```
pip install -r requirements.txt
```
Main dependencies:
- `sentence-transformers`
- `chromadb`
- `requests`

### 4. Local LLM Setup
This project uses LM Studio to run the language model locally.

1. Download and install [LM Studio](https://lmstudio.ai/)
2. Download a compatible Gemma 3 1B GGUF model — development used `gemma-3-it-1B-Q8_0.gguf`
3. Load the model inside LM Studio
4. Start the local OpenAI-compatible server

The application expects the LM Studio server at:
```
http://127.0.0.1:8080
```
Requests are sent to:
```
http://127.0.0.1:8080/v1/chat/completions
```
No OpenAI API key is required.

### 5. Build the Vector Database
The project requires research-paper chunks to be stored in ChromaDB before questions can be answered. The ChromaDB database is not included in the repo — after cloning, run your own paper-ingestion workflow to build it locally.

```
Research Paper PDF
        ↓
Text Extraction
        ↓
Text Chunks
        ↓
BGE Embeddings
        ↓
ChromaDB
```

## Running the Research Assistant

```
cd scripts
python ask_pdf.py
```

The application loads the embedding model, connects to ChromaDB, and shows:
```
Database contains X chunks
Ask a question (type 'exit' to quit):
```

## Usage

**Question Answering**
```
What is Dense Passage Retrieval?
```

**Paper Summarization**
```
summarize: Dense Passage Retrieval for Open-Domain Question Answering
```

**Paper Comparison**
```
compare: Dense Passage Retrieval for Open-Domain Question Answering | A Benchmark Study of Machine Learning Models for Online Fake News Detection
```

**Exit**
```
exit
```

## Example Output

**Q&A**

Query: `What is the main contribution of Dense Passage Retrieval?`

```
========== ANSWER ==========

Dense Passage Retrieval uses dense learned representations
to improve passage retrieval for open-domain question answering.

========== SOURCES ==========

- Dense Passage Retrieval for Open-Domain Question Answering | Chunk 4
- Dense Passage Retrieval for Open-Domain Question Answering | Chunk 14
```

**Summarization**

Query: `summarize: Dense Passage Retrieval for Open-Domain Question Answering`

```
========== PAPER SUMMARY ==========

Title: Dense Passage Retrieval for Open-Domain Question Answering

1. Main Contribution
2. Methodology
3. Dataset / Data
4. Results
5. Limitations
```

**Comparison**

Query: `compare: Dense Passage Retrieval for Open-Domain Question Answering | A Benchmark Study of Machine Learning Models for Online Fake News Detection`

```
========== PAPER COMPARISON ==========

Paper A: Dense Passage Retrieval for Open-Domain Question Answering
Paper B: A Benchmark Study of Machine Learning Models for Online Fake News Detection

1. Main Objective
2. Methodology
3. Models / Approaches
4. Dataset / Data
5. Results
6. Key Differences
7. Overall Comparison
```

## Project Files

| File | Description |
|---|---|
| `scripts/ask_pdf.py` | Main interactive research assistant — handles user questions, query embeddings, ChromaDB retrieval, relevance filtering, RAG prompt generation, local LLM requests, summarization, comparison, and source tracking |
| `scripts/store_pdf.py` | Takes processed research-paper chunks, generates embeddings, and stores them in ChromaDB |
| `scripts/rag_api.py` | API component used as part of the RAG system |
| `requirements.txt` | Python dependencies |
| `.gitignore` | Prevents local/generated files (database, downloaded papers, local models, Python cache) from being uploaded |

## What's Not Included in the Repository

- Research PDFs
- ChromaDB database
- Local language model (GGUF files)
- Generated data (e.g. `chunks.json`)
- Python virtual environment (`venv`)

## Privacy and Local Processing

This project follows a local-first architecture. Research papers, extracted text, embeddings, the vector database, user questions, retrieved context, and generated answers can all remain on the local machine. The language model runs locally through LM Studio — no research documents are sent to a cloud-based LLM.

## Current Limitations

- Uses a relatively small local language model, so long responses may be truncated
- Very large papers cannot be sent to the model in their entirety
- Retrieval quality depends on the embedding and chunking strategy
- Local inference can be slower than cloud-based models
- The ChromaDB database must be created locally before use

## Future Improvements

- Improved document chunking
- Reranking retrieved chunks
- Better citation generation
- Larger local language models
- Automatic research-paper metadata extraction
- Multi-paper literature review
- Research-paper recommendation
- Research trend analysis
- Web interface
- RAG evaluation metrics (precision/recall)

## Project Status

**Completed Development Prototype**

Currently provides: research paper ingestion, text chunking, semantic embeddings, vector database storage, RAG, paper Q&A, summarization, comparison, source tracking, and local LLM inference.

## Author

**Babar Khan Durrani**
BS Robotics & Intelligent Systems, Bahria University Islamabad
GitHub: [@BabarKhanD](https://github.com/BabarKhanD)
