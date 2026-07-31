
@PutMapping("/{id}")
@Operation(summary = "Full update of a trade")
public TradeResponse update(@PathVariable Long id, @Valid @RequestBody TradeRequest req,
                            @AuthenticationPrincipal Object principal) {
    return mapper.toResponse(service.update(id, req, String.valueOf(principal)));
}