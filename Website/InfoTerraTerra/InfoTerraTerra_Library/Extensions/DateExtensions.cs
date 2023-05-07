namespace InfoTerraTerra_Library.Extensions;

public static class DateExtensions
{
    private static readonly TimeZoneInfo ItalianTimeZoneInfo =
        TimeZoneInfo.FindSystemTimeZoneById("W. Europe Standard Time");

    public static DateTime ToItalianTimezoneFromUtc(this DateTime utcTime)
        => TimeZoneInfo.ConvertTimeFromUtc(utcTime, ItalianTimeZoneInfo);
}