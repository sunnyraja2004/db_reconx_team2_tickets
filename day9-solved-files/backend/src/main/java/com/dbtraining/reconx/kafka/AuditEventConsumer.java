package com.dbtraining.reconx.kafka;

import com.dbtraining.reconx.dto.TradeEvent;
import com.dbtraining.reconx.repository.AuditLogRepository;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
import com.dbtraining.reconx.repository.entity.AuditLogEntry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
<<<<<<< HEAD
=======
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
>>>>>>> c2757038 (daywise-files)
=======
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
import org.springframework.stereotype.Component;

/**
 * ============================================================================
 * TICKET-ADV132 — AuditEventConsumer
 *
 * WHAT:    Persists every TradeEvent flowing through `trade-events` into the
 *          audit_log table.
 * HOW:     @KafkaListener on `trade-events`, groupId `audit-service`. Maps
 *          the TradeEvent DTO -> AuditLogEntry entity -> repo.save(...).
 * WHY:     Together with ADV137 this powers event-sourced replay — every
 *          domain change is captured immutably.
 * OBSERVE: After a POST /api/v1/trades, query audit_log -> one new row with
 *          the same eventId.
<<<<<<< HEAD
<<<<<<< HEAD
 *
 * HINT:    The consumer is on a DIFFERENT groupId from ReconciliationConsumer
 *          so Kafka delivers each message to both groups independently.
=======
 * ============================================================================
 *
 *  TODO(TICKET-ADV132):
 *    @KafkaListener(topics = "trade-events", groupId = "audit-service")
 *    public void onTradeEvent(TradeEvent e) {
 *        repo.save(new AuditLogEntry(
 *            e.eventId().toString(),
 *            e.tradeRef(),
 *            e.eventType().name(),
 *            e.timestamp(),
 *            e.actor(),
 *            e.before(),
 *            e.after()));
 *        log.debug("Audit row persisted for eventId={}", e.eventId());
 *    }
 *
 *  HINT: The consumer is on a DIFFERENT groupId from ReconciliationConsumer
 *        so Kafka delivers each message to both groups independently.
>>>>>>> c2757038 (daywise-files)
=======
 *
 * HINT:    The consumer is on a DIFFERENT groupId from ReconciliationConsumer
 *          so Kafka delivers each message to both groups independently.
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
 * ============================================================================
 */
@Component
public class AuditEventConsumer {

    private static final Logger log = LoggerFactory.getLogger(AuditEventConsumer.class);
    private final AuditLogRepository repo;

<<<<<<< HEAD
<<<<<<< HEAD
    public AuditEventConsumer(AuditLogRepository repo) {
        this.repo = repo;
    }

    @KafkaListener(topics = "trade-events", groupId = "audit-service")
    public void onTradeEvent(TradeEvent e) {
        repo.save(new AuditLogEntry(
                e.eventId().toString(),
                e.tradeRef(),
                e.eventType().name(),
                e.timestamp(),
                e.actor(),
                e.before(),
                e.after()));
        log.debug("Audit row persisted for eventId={}", e.eventId());
=======
    public AuditEventConsumer(AuditLogRepository repo) { this.repo = repo; }
=======
    public AuditEventConsumer(AuditLogRepository repo) {
        this.repo = repo;
    }
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)

    @KafkaListener(topics = "trade-events", groupId = "audit-service")
    public void onTradeEvent(TradeEvent e) {
<<<<<<< HEAD
        throw new UnsupportedOperationException("TICKET-ADV132");
>>>>>>> c2757038 (daywise-files)
=======
        repo.save(new AuditLogEntry(
                e.eventId().toString(),
                e.tradeRef(),
                e.eventType().name(),
                e.timestamp(),
                e.actor(),
                e.before(),
                e.after()));
        log.debug("Audit row persisted for eventId={}", e.eventId());
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
    }
}
