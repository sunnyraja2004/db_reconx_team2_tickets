package com.dbtraining.reconx.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record StatusUpdate(

        @NotBlank
        @Pattern(
                regexp = "PENDING|MATCHED|UNMATCHED|DISPUTED|CANCELLED",
                message = "Invalid trade status"
        )
        String status
) {}