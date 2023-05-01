namespace InfoTerraTerra_Library.Users;

public class InMemoryUsersRepository : IUsersRepository
{
    private readonly User[] _users = {
        new()
        {
            Username = "francesco-ionico",
            Name = "Francesco",
            Password = "Tail Chair Despair Trial-The-Detail Most-Tend Too-Minister-0"
        },
        new()
        {
            Username = "cristina-tazzina",
            Name = "Caterina",
            Password = "Choose Then-Rotten Monkey-Hollow-Only Queen Messenger-Remark Highway-6"
        }
    };

    public Task<User> Login(string username, string password)
    {
        var user = _users.FirstOrDefault(u => u.Username == username && u.Password == password);
        if (user == null)
            throw new UnhautorizedException();

        return Task.FromResult(user);
    }
}