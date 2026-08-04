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
- [Kafka topics](#kafka-topics)
- [Deploy runbook](#deploy-runbook)
- [Default credentials](#default-credentials)
- [Troubleshooting](#troubleshooting)
- [Team](#team)

## Architecture
ReconX follows an event-driven architecture designed for reliable and scalable trade reconciliation. The React frontend communicates with the Spring Boot backend through REST APIs, while Apache Kafka enables asynchronous event-driven processing. PostgreSQL serves as the primary database for persistent storage, and Prometheus with Grafana provide real-time monitoring and observability of the system.


---

## Tech Stack
### Backend
- Java 25
- Spring Boot
- Maven

### Frontend
- React
- Vite
- React Router

### Database
- PostgreSQL

### Monitoring & Observability
- Prometheus
- Grafana
- Spring Boot Actuator

### DevOps & CI/CD
- Docker
- Docker Compose
- GitHub Actions
- GitHub Container Registry (GHCR)


---

## API Documentation

ReconX exposes RESTful APIs for trade management, authentication, reconciliation, and system monitoring. Interactive API documentation is generated automatically using **SpringDoc OpenAPI** and can be accessed through the Swagger UI.

**Swagger UI:**  
http://localhost:8081/swagger-ui.html

The Swagger interface allows developers to:
- Explore all available REST endpoints.
- View request and response models.
- Execute API calls directly from the browser.
- Test endpoints without using external API clients.


## Kafka Topics

ReconX uses Apache Kafka to enable reliable, asynchronous communication between different services. Trade events are published to Kafka and consumed by dedicated services for reconciliation, auditing, and alert processing. Failed messages are routed to a Dead Letter Queue (DLQ) for troubleshooting and recovery.

| Topic | Consumer Group | Purpose |
|--------|----------------|---------|
| `trade-events` | `recon-service` | Consumes trade events and performs reconciliation processing. |
| `trade-events` | `audit-service` | Consumes trade events and records audit information for compliance and traceability. |
| `system-alerts` | `alert-service` | Processes system alerts and operational notifications. |
| `trade-events-dlq` | Dead Letter Queue | Stores messages that could not be processed successfully after the configured retry attempts. |


## Deploy Runbook
Follow the steps below to deploy the ReconX application using Docker Compose.

```bash
echo $GHCR_PAT | docker login ghcr.io -u <YOUR_GITHUB_USERNAME> --password-stdin
docker compose pull
docker compose up -d
```

After the containers are up, access the application using the following URLs:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8080
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **Grafana:** http://localhost:3000
- **Prometheus:** http://localhost:9090

---

## Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Trader | `trader@db.com` | `trader123` |

---

## Troubleshooting
- **SSE: disconnected (403 Forbidden):** The Server-Sent Events stream may fail due to JWT authentication not being propagated to the stream request.
- **Status:** The issue has been identified through browser console debugging and is currently under investigation.


---


## Team

This project was developed collaboratively by the following team members. Tasks were completed sequentially, with each member picking up the next available ticket to ensure continuous progress and balanced ownership throughout the development lifecycle.

- Aditya A A
- Kruti Newalkar
- Saloni Pawar
- Sunny Raja Prasad
