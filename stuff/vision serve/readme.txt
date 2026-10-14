<div align="center">

# 🔭 VisionServe

### Production-style computer vision inference service

**Upload an image → get detections as JSON → every prediction stored in PostgreSQL.**
Switch between **PyTorch** and **ONNX Runtime** with one environment variable.

<br>

![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.142-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![ONNX Runtime](https://img.shields.io/badge/ONNX-Runtime_1.30-005CED?style=for-the-badge&logo=onnx&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-2.14_CPU-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)

![Tests](https://img.shields.io/badge/tests-73_passed_·_1_skipped-2ea44f?style=flat-square)
![Backend](https://img.shields.io/badge/ONNX_vs_native-1.43×_faster-ff6f00?style=flat-square)
![CPU only](https://img.shields.io/badge/hardware-CPU_only-blueviolet?style=flat-square)
![Model licence](https://img.shields.io/badge/model-YOLOv8n_(AGPL--3.0)-lightgrey?style=flat-square)

</div>

---

## ✨ Why this project exists

Most computer-vision portfolios stop at "the model detects things." **VisionServe is about everything around the model**: validated uploads, a clean API, a relational schema, model versioning, containers, tests, and a reproducible benchmark that answers a real engineering question:

> *Is ONNX Runtime actually faster than native PyTorch on a normal CPU?*

Software-only. No GPU, cameras, or hardware needed.

---

## 🏗️ Architecture

```mermaid
flowchart LR
    C([🧑‍💻 Client]) -->|multipart image| A[⚡ FastAPI]
    A --> V{🛡️ Validation<br/>MIME · size · decode · pixels}
    V -->|rejected 4xx| C
    V --> S[🧠 InferenceService]
    S --> D[🔍 Detector<br/>letterbox → model → NMS]
    D --> B{{Backend<br/>MODEL_BACKEND}}
    B -->|native| N[🔥 PyTorch]
    B -->|onnx| O[⚙️ ONNX Runtime]
    S --> P[(🐘 PostgreSQL)]
    S -->|JSON| C

    style A fill:#009688,color:#fff
    style P fill:#4169E1,color:#fff
    style N fill:#EE4C2C,color:#fff
    style O fill:#005CED,color:#fff
    style V fill:#FFB300,color:#000
```

Images are processed **in memory** and never written to disk. Only structured results are stored.

---

## 🚀 Features

| | |
|---|---|
| 🔌 **Pluggable backends** | Native PyTorch and ONNX Runtime behind one interface, with identical pre/post-processing |
| 🛡️ **Upload validation** | MIME type, extension, size limit, decodability, pixel limit, sanitised filenames |
| 🐘 **PostgreSQL persistence** | Normalised schema, Alembic migration, failed inferences recorded with their error |
| 🏷️ **Model identity** | Every prediction stores model name, version, backend, weight-file SHA-256 and thresholds |
| 📜 **Structured logs** | JSON logs carrying a request ID on every line |
| 📈 **Metrics endpoint** | Request counts, successes, failures, rejected uploads, backend usage, latency summaries |
| 🐳 **Docker Compose** | App + PostgreSQL, persistent volume, health checks |
| 🧪 **Tests** | Unit, API and integration tests, including a live PostgreSQL end-to-end test |
| ⏱️ **Benchmark** | Reproducible native-vs-ONNX comparison with machine-readable output |

---

## ⚡ Quick start

**Requirements:** Docker Desktop.

```bash
docker compose up --build
```

Then send an image:

```bash
curl -F "file=@benchmarks/images/bus.jpg;type=image/jpeg" http://localhost:8000/predict
```

Interactive API docs: **http://localhost:8000/docs**

Compose starts PostgreSQL 16 with a named volume, waits for its health check, applies the migration, then starts the API. The image downloads the weights, verifies their checksum, and exports the ONNX model at build time. Switch backend with `MODEL_BACKEND=native`.

### Example response

```json
{
  "request_id": "a9cc78be-3298-4568-ac85-c1088f08e559",
  "status": "success",
  "model_name": "yolov8n",
  "model_version": "yolov8n-assets-v8.3.0",
  "backend": "onnx",
  "image_width": 810,
  "image_height": 1080,
  "detection_count": 5,
  "classes": ["bus", "person"],
  "detections": [
    { "class_name": "person", "confidence": 0.890,
      "bbox": { "x1": 670.4, "y1": 380.6, "x2": 809.9, "y2": 879.7 } }
  ]
}
```

*(Shortened. The real response also includes timestamps and per-stage timings.)*

---

## 🔌 API

| Method | Endpoint | Purpose |
|:-:|---|---|
| `POST` | `/predict` | Upload one image (multipart field `file`), receive detections and timings |
| `GET` | `/predictions/{request_id}` | Fetch a stored prediction (404 unknown, 422 not a UUID) |
| `GET` | `/health` | 200 when model loaded and database reachable, otherwise 503 |
| `GET` | `/models` | Active model, versions, backends, file size, SHA-256 |
| `GET` | `/metrics` | In-process JSON metrics (reset on restart) |

**Status codes:** `400` empty file · `413` too large (bytes or pixels) · `415` unsupported type · `422` unreadable image or invalid request · `404` not found · `500` inference failure · `503` database unavailable. Every error body includes a `request_id`.

---

## 🧠 Model

| | |
|---|---|
| **Model** | YOLOv8n, COCO-pretrained, 80 classes |
| **Task** | Object detection |
| **Input** | 640×640, 3.15 M parameters (fused) |
| **Version** | `yolov8n-assets-v8.3.0` (Ultralytics assets release v8.3.0) |
| **Weights SHA-256** | `f59b3d833e2ff32e194b5bb8e08d211dc7c5bdf144b90d2c8412c47ccfc83b36` |
| **ONNX export** | opset 17, static 640×640 input, one output tensor (1×84×8400) |

**Why this model:** small (6.5 MB), fast on CPU, clean ONNX export, human-checkable output. MobileNet-SSD-style detectors and RT-DETR were considered but not built; that choice was a design judgement, not a measured one.

> ⚖️ **Licence note:** Ultralytics code and YOLOv8 weights are AGPL-3.0. Check this before any commercial use.

---

## 🐘 Database

```mermaid
erDiagram
    predictions ||--o{ detections : has
    predictions {
        uuid request_id PK
        timestamptz created_at
        string status
        text error
        string model_name
        string model_version
        string backend
        string model_sha256
        string input_filename
        int input_bytes
        int image_width
        int image_height
        float preprocess_ms
        float inference_ms
        float postprocess_ms
        float total_ms
        int detection_count
        jsonb parameters
    }
    detections {
        int id PK
        uuid request_id FK
        int rank
        int class_id
        string class_name
        float confidence
        float x1
        float y1
        float x2
        float y2
    }
```

- **Normalised detections** (not a JSON blob), so they can be queried by class or confidence.
- **Thresholds as `jsonb`**, since they are small and schema-flexible.
- **Indexes:** `predictions(created_at)`, `predictions(status)`, `detections(request_id)`, `detections(class_name)`.
- Validation failures (4xx) are not stored. Inference failures (500) are stored with `status='failed'`.

---

## ⏱️ Benchmark: native PyTorch vs ONNX Runtime

> Measured on **Windows 10**, Intel64 Family 6 Model 78 Stepping 3 (as reported by Windows), **4 logical cores**, 8.5 GB RAM, **CPU only**, Python 3.12.9, torch 2.14.1+cpu, onnxruntime 1.30.0.
> 2 fixed images · 10 warm-up + 100 timed runs per image per round · 2 rounds per backend in fresh processes · **400 samples per backend** · batch size 1 · in-process (no HTTP or database).

```
Mean latency (ms, lower is better)

PyTorch       ████████████████████████████████████████  195.9
ONNX Runtime  ████████████████████████████              137.2
```

| Backend | Mean (ms) | Median (ms) | P95 (ms) | Throughput (FPS) | Load (s) | Model file | Process RSS (MB) |
|---|--:|--:|--:|--:|--:|--:|--:|
| 🔥 Native (PyTorch) | 195.9 | 194.7 | 225.6 | 5.09 | 3.75 | 6.5 MB | 300 |
| ⚙️ **ONNX Runtime** | **137.2** | **136.1** | **171.6** | **7.31** | **0.43** | 12.7 MB | **142** |

**Stage breakdown (mean ms):**

| Backend | Preprocess | Model inference | Postprocess | Total |
|---|--:|--:|--:|--:|
| Native | 10.0 | 182.8 | 3.1 | 195.9 |
| ONNX | 10.1 | 124.0 | 3.1 | 137.2 |

### 📌 Takeaways

- ONNX Runtime was **about 30% lower latency (1.43× faster)** end to end, and **about 1.47× faster** on the model step alone.
- Preprocessing and postprocessing are identical code, so the gain comes entirely from the model runtime.
- ONNX starts faster (0.43 s vs 3.75 s) and uses less memory (142 MB vs 300 MB) because it does not import PyTorch.
- **Output parity:** identical classes and order, with 0.0 confidence difference and 0.0 px box difference on both benchmark images at the report's rounding (4 decimals, 0.1 px).

**Caveats:** one machine, two images, two rounds per backend. The two ONNX rounds differed noticeably (mean 125.9 ms vs 148.5 ms) and the cause was not investigated; the native rounds were close (195.2 vs 196.6 ms). Accuracy (mAP) was not measured. Absolute numbers will differ on other hardware.

📄 Full report: [`docs/BENCHMARKS.md`](docs/BENCHMARKS.md) · Raw data: `results/benchmark.json`, `results/benchmark.csv`

Reproduce:

```bash
python benchmarks/run_benchmark.py --iterations 100 --warmup 10 --rounds 2
```

---

## 🧪 Testing

```bash
python -m pytest tests -q -W ignore
```

| Environment | Result |
|---|---|
| Windows 10, no PostgreSQL test database | **73 passed, 1 skipped** |
| Linux, local PostgreSQL 16, `TEST_DATABASE_URL` set | **74 passed** |

The skipped test is the PostgreSQL end-to-end test, which runs only when `TEST_DATABASE_URL` is set. It **drops and recreates the tables** in that database, so use a dedicated test database. Model-dependent tests are skipped if `model_store/` has no weights.

**What is covered:** image validation and filenames · preprocessing · postprocessing and NMS · config · metrics · repository · service (success and failure persistence) · every endpoint and error path · native-vs-ONNX agreement on real model files · migration, persistence, indexes and retrieval on PostgreSQL.

---

## 🛠️ Local development (Windows cmd)

```bat
python -m venv .venv
.venv\Scripts\activate
pip install torch==2.14.1 torchvision==0.29.1 --index-url https://download.pytorch.org/whl/cpu
pip install -r requirements-dev.txt
pip install --no-deps -e .
python scripts\download_model.py
python scripts\export_onnx.py
python -m pytest tests -q -W ignore
```

> 💡 On a slow connection, add `--default-timeout=300 --retries 10` to the `pip install` commands.

### ⚙️ Configuration

Environment variables (see `.env.example`):

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | SQLAlchemy URL for PostgreSQL |
| `MODEL_BACKEND` | `native` or `onnx` |
| `MODEL_DIR`, `MODEL_VERSION` | Model location and recorded version |
| `CONF_THRESHOLD`, `IOU_THRESHOLD` | Detection thresholds |
| `MAX_UPLOAD_BYTES`, `MAX_IMAGE_PIXELS` | Upload limits |
| `NUM_THREADS` | Inference threads (empty = library default) |
| `LOG_LEVEL` | Logging level |

---

## ✅ Verified status

| Area | Status |
|---|---|
| FastAPI, validation, error handling | ✅ Tested (API tests) |
| Native and ONNX inference | ✅ Tested, outputs agree |
| PostgreSQL 16 migration and persistence | ✅ Tested on Linux (integration test) |
| `docker compose build` | ✅ Built on Windows 10, Docker 29.7.2 |
| Containers start and report healthy | ✅ API and DB healthy |
| `POST /predict` and `GET /predictions/{id}` via Docker | ✅ 5 detections for `bus.jpg`, retrieval matched |
| Persistence across `docker compose down` and `up` | ✅ Same prediction returned after containers were recreated |
| Benchmark | ✅ Run on Windows 10 (results above) |

---

## ⚠️ Limitations

- No authentication, rate limiting, or request queue; not hardened for public exposure
- Single model, static 640×640 input, batch size 1; dynamic shapes and batching not exported or tested
- ONNX path is CPU only; other execution providers and GPU were not tested
- Inference runs inside the API process; scaling with multiple workers was not tested
- Metrics are in-memory JSON, reset on restart, not Prometheus format
- Upload size is enforced in the handler; a reverse proxy should enforce limits earlier in production
- Running the API directly on the Windows host against the Compose database was not tested
- No CI configured

## 🔮 Future improvements

- Dynamic-batch ONNX export and a batching benchmark
- INT8-quantised ONNX variant benchmarked against FP32
- mAP check on a COCO validation subset for native vs ONNX
- GitHub Actions running the non-PostgreSQL tests
- Prometheus-format metrics if a monitoring stack is added

---

## 📁 Repository layout

```
visionserve/
├── src/visionserve/   api · core (config, logging, metrics) · database · inference · schemas · services · utils
├── alembic/           database migrations
├── tests/             unit · api · integration
├── scripts/           download_model.py · export_onnx.py
├── benchmarks/        run_benchmark.py · images/
├── results/           benchmark.json · benchmark.csv
├── docs/              BENCHMARKS.md
├── Dockerfile
└── docker-compose.yml
```

---

<div align="center">

**Built by [Babar Khan Durrani (BKD)](https://github.com/BabarKhanD)**

*Pretrained model, serious engineering around it.*

</div>