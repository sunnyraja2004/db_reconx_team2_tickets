package com.dbtraining.reconx.controller;

import com.dbtraining.reconx.dto.ReconRunRequest;
import com.dbtraining.reconx.repository.ReconBreakRepository;
import com.dbtraining.reconx.repository.entity.ReconBreak;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.dbtraining.reconx.dto.PagedResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

import java.net.URI;
import java.util.Map;
import java.util.UUID;

/**
 * TICKET-ADV068 — POST /api/v1/recon/run — returns 202 + jobId
 * TICKET-ADV069 — GET  /api/v1/recon/jobs/{jobId}/results
 * TICKET-ADV070 — PUT  /api/v1/recon/results/{id}/resolve
 */
@RestController
@RequestMapping("/v1/recon")
@Tag(name = "recon", description = "Reconciliation operations")
@SecurityRequirement(name = "bearerAuth")
public class ReconController {

    private final ReconBreakRepository breaks;

    public ReconController(ReconBreakRepository breaks) {
        this.breaks = breaks;
    }

    @PostMapping("/run")
    @Operation(summary = "Trigger a reconciliation job (async)")
    public ResponseEntity<Map<String, String>> runRecon(
            @Valid @RequestBody ReconRunRequest req) {

        String jobId = UUID.randomUUID().toString();

        // Day-0 implementation: simulate dispatching the job.
        System.out.println("recon job dispatched: jobId=" + jobId);

        URI location = URI.create("/api/v1/recon/jobs/" + jobId + "/results");

        return ResponseEntity
                .accepted()
                .location(location)
                .body(Map.of(
                        "jobId", jobId,
                        "status", "QUEUED"
                ));
    }

    @GetMapping("/jobs/{jobId}/results")
@Operation(summary = "Get results for a recon job")
public ResponseEntity<PagedResponse<ReconBreak>> results(
        @PathVariable String jobId,
        @PageableDefault(size = 50) Pageable pageable) {

    // Day-0 implementation: jobId is ignored until the database
    // contains recon job relationships.
    Page<ReconBreak> page = breaks.findAll(pageable);

    return ResponseEntity.ok(
            PagedResponse.from(page, rb -> rb)
    );
}

    @PutMapping("/results/{id}/resolve")
    @Operation(summary = "Mark a recon break as RESOLVED with a note")
    public ResponseEntity<ReconBreak> resolve(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        // TODO(TICKET-ADV070): load the ReconBreak, call rb.resolve(note), save,
        // and return 200 with the updated entity. Throw TradeNotFoundException
        // when the id is unknown.
        throw new UnsupportedOperationException("TICKET-ADV070");
    }
}