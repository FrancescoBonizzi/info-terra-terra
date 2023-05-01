namespace InfoTerraTerra.Requests;

public class LoginRequest
{
    public required string Username { get; init; }
    public required string PlainTextPassword { get; init; }
}