Write an ADR in Michael Nygard format.

System: ReconX trade reconciliation platform.

Stack:
PostgreSQL 16, Spring Boot 3, Kafka.

Scale:
50,000 trades/day, 5-year retention.

Decision:
Use GIN jsonb_path_ops index instead of btree index for JSONB metadata queries.

Alternatives considered:
1. Use btree indexes.
2. Use no index.
3. Create many expression indexes.

Constraints:
- Metadata queries use JSON path operators.
- Need fast analyst searches.
- Avoid excessive index maintenance.

Requirements:
- Markdown format.
- Michael Nygard ADR format.
- Include Title, Status, Context, Decision, Consequences.
- Status must be Accepted.
- Mention ReconX-specific details.
- Keep under 300 words.