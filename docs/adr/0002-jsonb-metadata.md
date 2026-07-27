# ADR-002: Use JSONB for `instruments.metadata`

## Status
Accepted

## Context
ReconX is a trade reconciliation platform built on PostgreSQL 16, Spring Boot 3, Kafka, and React, processing approximately 50,000 trades/day with a 5-year retention requirement. Instruments carry metadata (e.g., issuer details, risk flags, product-specific attributes) that varies significantly across instrument types and changes frequently as new asset classes and reporting requirements are onboarded.

A rigid schema would require frequent migrations to accommodate new or changing fields, risking downtime and slowing delivery. At the same time, analysts and downstream services need to query inside this metadata (e.g., filtering trades by a specific instrument attribute), so plain unstructured storage is insufficient.

## Decision
We will store instrument metadata in a `JSONB` column (`instruments.metadata`) in PostgreSQL 16, with GIN indexing to support efficient querying of nested fields.

Alternatives considered:
1. **Separate metadata tables** (EAV-style) — supports structured querying but adds significant join complexity and operational overhead as new instrument attributes are introduced.
2. **Plain text JSON column** — flexible for schema evolution but does not support indexed querying inside the payload, forcing full-column scans or application-side parsing.
3. **Many nullable columns** — simple to query but does not scale with frequently changing metadata; each new field requires a schema migration and results in sparse, hard-to-maintain tables.

JSONB was selected because it provides schema flexibility for evolving instrument attributes while still supporting indexed, in-database querying via GIN indexes and PostgreSQL's native JSONB operators.

## Consequences
- New or changed instrument metadata fields can be introduced without schema migrations, supporting ReconX's frequent onboarding of new instrument types.
- GIN-indexed JSONB queries allow analysts to filter/search within metadata without full scans, even as trade volume grows toward multi-year retention (~90M+ trades).
- Application code must enforce metadata validation/consistency, since PostgreSQL does not strictly type JSONB contents.
- Complex analytical queries across metadata fields may require careful index design and periodic review as usage patterns evolve.