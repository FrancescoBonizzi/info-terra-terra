namespace InfoTerraTerra_Library.Tracking;

public class QrOpen
{
    public required string? Ip { get; init; }
    public required string? Os { get; init; }
    public required string? Referer { get; init; }
    public required TrackingSlug TrackingSlug { get; init; }
}