namespace InfoTerraTerra_Library.Extensions;

public static class StringExtensions
{
    public static string CapitalizeFirstLetter(this string s)
    {
        if (string.IsNullOrWhiteSpace(s))
            return string.Empty;

        return char.ToUpper(s[0]) + s[1..];
    }
}