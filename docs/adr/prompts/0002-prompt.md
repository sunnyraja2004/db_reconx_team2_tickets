Write an ADR in Michael Nygard format.

System: ReconX trade reconciliation platform.

Stack:
PostgreSQL 16, Spring Boot 3, Kafka, React.

Scale:
50,000 trades/day, 5-year retention.

Decision:
Use JSONB column for instruments.metadata.

Alternatives considered:
1. Create separate metadata tables.
2. Store metadata as plain text JSON.
3. Add many nullable columns.

Constraints:
- Instrument metadata fields change frequently.
- Need flexible schema evolution.
- Need querying inside metadata.

Requirements:
- Markdown format.
- Michael Nygard ADR format.
- Include Title, Status, Context, Decision, Consequences.
- Status must be Accepted.
- Mention ReconX-specific details.
- Keep under 300 words.