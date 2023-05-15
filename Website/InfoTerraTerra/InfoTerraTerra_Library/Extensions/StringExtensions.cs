using System.Text.RegularExpressions;

namespace InfoTerraTerra_Library.Extensions;

public static partial class StringExtensions
{
    public static string CapitalizeFirstLetter(this string s)
    {
        if (string.IsNullOrWhiteSpace(s))
            return string.Empty;

        return char.ToUpper(s[0]) + s[1..];
    }
    
    public static string CollapseSpaces(this string value)
    {
        return CollapseSpacesRegex().Replace(value, " ");
    }

    [GeneratedRegex("\\s+")]
    private static partial Regex CollapseSpacesRegex();
}