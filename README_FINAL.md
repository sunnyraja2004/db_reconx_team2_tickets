# ReconX — Enterprise Trade Reconciliation Platform

## Quick start (3 commands, < 60 s on a warm laptop)
\`\`\`bash
echo $GHCR_PAT | docker login ghcr.io -u <user> --password-stdin
docker compose pull
docker compose up -d
\`\`\`
Open http://localhost:5173 — login as `trader@db.com / trader123`.

## Table of contents
- [Architecture](#architecture) — mermaid runtime + CI/CD diagrams
- [Tech stack](#tech-stack) — Java 25, Spring Boot 3, Kafka, Postgres, React, Vite
- [API documentation](#api-documentation) — Swagger UI at /swagger-ui.html
- [Monitoring](#monitoring) — Prometheus scrape, Grafana dashboards (screenshots)
- [Kafka topics](#kafka-topics) — trade-events, recon-results, system-alerts, DLQ
- [Load test results](#load-test-results) — k6 200 VUs, p95 latency, throughput
- [CI/CD pipeline](#cicd-pipeline) — lint → test → coverage 85% → docker → GHCR
- [Deploy runbook](#deploy-runbook) — exactly 3 commands
- [Default credentials](#default-credentials) — dev profile only
- [Troubleshooting](#troubleshooting) — port conflicts, GHCR auth, Kafka listener
- [Team](#team) — who built what