namespace Cafihsa.Utils;

public static class StringUtils
{
    public static bool IsMatch(string? value, string query)
    {
        return value != null && value.Contains(query, StringComparison.OrdinalIgnoreCase);
    }
}