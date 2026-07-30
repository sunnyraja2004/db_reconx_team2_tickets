package com.dbtraining.reconx.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
<<<<<<< HEAD
<<<<<<< HEAD
import org.springframework.kafka.annotation.KafkaListener;
=======
>>>>>>> c2757038 (daywise-files)
=======
import org.springframework.kafka.annotation.KafkaListener;
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
import org.springframework.stereotype.Component;

/**
 * ============================================================================
 * TICKET-ADV133 — AlertConsumer
 *
 * WHAT:    Subscribes to `system-alerts` and (for the training project) logs
 *          the payload. In a real environment this is where Slack / PagerDuty
 *          / e-mail fan-out would happen.
 * HOW:     @KafkaListener on the `system-alerts` topic, groupId
 *          `alert-service`.
 * WHY:     Decouples alert producers (any service) from alert sinks
 *          (notification channels).
 * OBSERVE: Publish a string to `system-alerts` via Kafdrop -> a WARN line
 *          appears in the app log.
 * ============================================================================
<<<<<<< HEAD
<<<<<<< HEAD
=======
 *
 *  TODO(TICKET-ADV133):
 *    @KafkaListener(topics = "system-alerts", groupId = "alert-service")
 *    public void onAlert(String payload) {
 *        log.warn("ALERT: {}", payload);
 *    }
 * ============================================================================
>>>>>>> c2757038 (daywise-files)
=======
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
 */
@Component
public class AlertConsumer {

    private static final Logger log = LoggerFactory.getLogger(AlertConsumer.class);

<<<<<<< HEAD
<<<<<<< HEAD
    @KafkaListener(topics = "system-alerts", groupId = "alert-service")
    public void onAlert(String payload) {
        log.warn("ALERT: {}", payload);
=======
    public void onAlert(String payload) {
        throw new UnsupportedOperationException("TICKET-ADV133");
>>>>>>> c2757038 (daywise-files)
=======
    @KafkaListener(topics = "system-alerts", groupId = "alert-service")
    public void onAlert(String payload) {
        log.warn("ALERT: {}", payload);
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
    }
}
