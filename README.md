# BookMyShow System Design

A high-throughput, distributed movie ticket booking system built with **Fastify v5**, **TypeScript 7**, **MongoDB**, **Redis**, and **Elasticsearch**.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Runtime** | Node.js 22+ (LTS) | Native TypeScript type-stripping via `--experimental-strip-types` |
| **Framework** | Fastify v5 | High-performance, low-overhead HTTP web framework |
| **Language** | TypeScript 7 | Type safety and domain modeling |
| **Primary Database** | MongoDB 7 | Document store for cities, cinemas, shows, and bookings |
| **Cache & Locks** | Redis 7 | Sub-millisecond caching and seat concurrency locking |
| **Search Engine** | Elasticsearch 8.15 | Full-text search for movies, cinemas, and shows |
| **Validation** | Zod | Request params, body validation, and environment safety |
| **API Docs** | Swagger / OpenAPI | Interactive UI documentation at `/docs` |
| **Linter** | Oxlint | High-performance Rust-based JavaScript/TypeScript linter |
| **Load Testing** | Grafana k6 | Performance and stress testing |
| **Package Manager** | pnpm | Fast, disk-space-efficient package manager |

---

## Architecture & Design Highlights

* **Feature-Based Modular Architecture**: Organized into domain modules (`cities`, `cinemas`, `shows`) with clear boundaries (routes, services, repositories, schemas, caches).
* **Graceful Degradation**: If MongoDB, Redis, or Elasticsearch is down, the server does not crash. It automatically degrades to in-memory fallback repositories.
* **Cache-Aside Pattern**: Multi-tiered caching with Redis to reduce primary database load.
* **Observability & Logging**: Structured logging via Pino with human-readable, colorized output in development using `pino-pretty`.
* **Containerized Infrastructure**: Ready-to-use Docker Compose environment with custom configs for MongoDB and Redis.

---

## Project Structure

```
book-my-show/
├── src/
│   ├── server.ts                        # Entry point (graceful shutdown + startup banner)
│   ├── app.ts                           # App factory (Fastify instance for testing & server)
│   ├── bootstrap/                       # Lifecycle orchestrators (logger, cors, helmet, swagger, db)
│   ├── config/                          # Zod-validated environment config
│   ├── lib/                             # Infrastructure client singletons (MongoDB, Redis, Elasticsearch)
│   ├── integrations/                    # Third-party integrations (JWT, Email, WhatsApp, Payments)
│   ├── modules/                         # Domain feature modules
│   │   ├── cities/                      # Cities routes, service, repo, cache, schema
│   │   ├── cinemas/                     # Cinemas routes, service, repo, cache, schema
│   │   └── shows/                       # Shows routes, service, repo, search, schema
│   └── shared/                          # Cross-module errors and types
├── seeds/                               # Standalone database seed data files
├── docker/                              # Compose files, MongoDB init, and Redis configs
├── scripts/                             # Seed runners and load testing scripts
│   └── load-testing/                    # k6 performance test scripts
├── test/                                # Integration and smoke tests
├── .env.example                         # Safe template environment variables
├── .env                                 # Local development environment (gitignored)
├── .dockerignore                        # Docker build ignore rules
├── .oxlintrc.json                       # Oxlint configuration
├── package.json                         # Dependencies and scripts
└── tsconfig.json                        # TypeScript configuration
```

---

## Quickstart Guide

### 1. Prerequisites
* Node.js 22.6.0+
* Docker Desktop
* pnpm (`npm install -g pnpm` or `npx pnpm`)

### 2. Installation
```powershell
# Clone the repository
git clone https://github.com/ritesh-builds/book-my-show.git
cd book-my-show

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env
```

### 3. Start Infrastructure Services
```powershell
pnpm docker:up
```

### 4. Seed the Database
```powershell
pnpm seed
```

### 5. Start Development Server
```powershell
pnpm dev
```

The server will listen at `http://127.0.0.1:3000`.

---

## API Documentation

Interactive Swagger documentation is available out of the box:

* **Swagger UI**: [http://localhost:3000/docs](http://localhost:3000/docs)
* **OpenAPI JSON**: [http://localhost:3000/docs/json](http://localhost:3000/docs/json)

### Key Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check endpoint |
| `GET` | `/docs` | Swagger interactive documentation UI |
| `GET` | `/api/v1/cities` | List all available cities |
| `GET` | `/api/v1/cities/:id` | Get details for a specific city |
| `GET` | `/api/v1/cities/:cityId/cinemas` | List all cinemas within a city |
| `GET` | `/api/v1/cinemas/:id` | Get details for a specific cinema |
| `GET` | `/api/v1/cinemas/:cinemaId/shows` | List shows running in a cinema |
| `GET` | `/api/v1/shows/:id` | Get show details, pricing, and availability |

---

## Available Scripts

| Script | Command | Purpose |
|---|---|---|
| **dev** | `pnpm dev` | Run development server with watch mode |
| **start** | `pnpm start` | Run production entry point |
| **typecheck** | `pnpm typecheck` | Run TypeScript type checking without emit |
| **lint** | `pnpm lint` | Run fast code linting via Oxlint |
| **test** | `pnpm test` | Run native Node.js test runner |
| **seed** | `pnpm seed` | Populate MongoDB with initial seed data |
| **docker:up** | `pnpm docker:up` | Spin up MongoDB, Redis, and Elasticsearch containers |
| **docker:down** | `pnpm docker:down` | Stop and remove local containers |

---

## Load Testing

Load testing scripts are written using [k6](https://k6.io/):

```powershell
# Run API load test (50 VUs, 45 seconds)
k6 run scripts/load-testing/1.api-test.js
```

---

## License

ISC License. Built for System Design & High-Throughput Engineering demonstrations.
