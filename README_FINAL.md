# ReconX — Enterprise Trade Reconciliation Platform

## Introduction

ReconX is an enterprise-grade trade reconciliation platform built to automate the matching, validation, and monitoring of financial trades. It demonstrates a modern event-driven architecture using Spring Boot, Apache Kafka, PostgreSQL, React, Prometheus, Grafana, and Docker. The platform provides real-time trade processing, reconciliation workflows, monitoring dashboards, and production-ready deployment practices, making it suitable as both a learning project and a showcase of enterprise software engineering.


## Quick start (3 commands, < 60 s on a warm laptop)
```bash
echo $GHCR_PAT | docker login ghcr.io -u <user> --password-stdin
docker compose pull
docker compose up -d
```

Open **http://localhost:5173** — login as:

- **Email:** `trader@db.com`
- **Password:** `trader123`

## Table of contents
- [Architecture](#architecture) 
- [Tech stack](#tech-stack)
- [API documentation](#api-documentation)
- [Monitoring](#monitoring)
- [Kafka topics](#kafka-topics)
- [Load test results](#load-test-results)
- [CI/CD pipeline](#cicd-pipeline)
- [Deploy runbook](#deploy-runbook)
- [Default credentials](#default-credentials)
- [Troubleshooting](#troubleshooting)
- [Team](#team)

## Architecture



---

## Tech Stack



---

## API Documentation



---

## Monitoring



---

## Kafka Topics



---

## Load Test Results



---

## CI/CD Pipeline



---

## Deploy Runbook



---

## Default Credentials



---

## Troubleshooting
- **SSE: disconnected (403 Forbidden):** The Server-Sent Events stream may fail due to JWT authentication not being propagated to the stream request.
- **Status:** The issue has been identified through browser console debugging and is currently under investigation.


---

## Team

- Aditya A A
- Kruti Newalkar
- Saloni Pawar
- Sunny Raja Prasad