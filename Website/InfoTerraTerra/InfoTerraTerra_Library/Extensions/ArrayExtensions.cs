namespace InfoTerraTerra_Library.Extensions;

public static class ArrayExtensions
{
    public static bool TryGetValue<TValue>(
        this TValue?[] array, 
        int index,
        out TValue? value)
    {
        if (array.Length > index)
        {
            value = array[index];
            return true;
        }

        value = default;
        return false;
    }
}