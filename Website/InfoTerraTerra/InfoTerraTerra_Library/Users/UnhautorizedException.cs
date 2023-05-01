namespace InfoTerraTerra_Library.Users;

public class UnhautorizedException : Exception
{
    public UnhautorizedException()
        : base("Autenticazione fallita")
    {
    }
}