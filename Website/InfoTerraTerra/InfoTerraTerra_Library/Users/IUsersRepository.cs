namespace InfoTerraTerra_Library.Users;

public interface IUsersRepository
{
    public Task<User> Login(string username, string password);
}