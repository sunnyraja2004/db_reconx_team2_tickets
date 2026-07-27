# ADR-001: Partition Trades Table by Trade Date

## Status
Accepted

## Context
ReconX is a near-production trade reconciliation platform built on PostgreSQL 16, Spring Boot 3, Kafka, and React. It ingests approximately 50,000 trades/day, retains data for 5 years (~90M+ rows at steady state), and serves 10 concurrent recon analysts running interactive queries.

Most analyst queries filter by `trade_date`. The system must sustain high insert throughput from Kafka consumers, and old data must be archived or dropped efficiently once it ages past the 5-year retention window. A single unpartitioned table would force full-table scans or large index traversals as data grows, and archival would require slow, lock-heavy `DELETE` operations.

## Decision
We will partition the `trades` table using native PostgreSQL RANGE partitioning on `trade_date`, with one partition per month (60 partitions across the 5-year retention window, growing over time).

Alternatives considered:
1. **Single unpartitioned table** — simplest, but query performance degrades as row count grows toward 90M+, and archival requires costly bulk deletes.
2. **Hash partitioning by `trade_id`** — improves insert distribution but doesn't align with the dominant date-range query pattern, forcing cross-partition scans for most analyst workloads.
3. **Partition by transaction status** — status is mutable (trades move through recon states), which would require row migration between partitions, adding complexity and write overhead.

RANGE partitioning by `trade_date` aligns directly with query patterns, since most filters are date-based, and enables archival via `DETACH PARTITION` instead of row-by-row deletes.

## Consequences
- Analyst queries filtering by `trade_date` benefit from partition pruning, avoiding scans across all ~90M rows.
- Archival of trades older than 5 years becomes a fast metadata operation (`DETACH PARTITION` + drop), not a bulk `DELETE`.
- Insert throughput for 50,000 trades/day is maintained, since inserts route to a single active monthly partition.
- Requires automated partition creation (e.g., monthly cron/job) to avoid insert failures from missing future partitions.
- Cross-partition queries (e.g., trade lifecycle spanning date boundaries) require slightly more planning care.