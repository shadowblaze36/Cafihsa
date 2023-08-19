using Cafihsa.Data;
using Cafihsa.Interfaces;
using Cafihsa.Models;

namespace Cafihsa.Services;

public class UserService: CrudService<User>, IUserService
{
    public UserService(CafihsaContext db) : base(db)
    {
    }
    
}