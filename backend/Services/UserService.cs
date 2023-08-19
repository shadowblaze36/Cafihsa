using CreditBoss.Data;
using CreditBoss.Interfaces;
using CreditBoss.Models;

namespace CreditBoss.Services;

public class UserService: CrudService<User>, IUserService
{
    public UserService(CreditBossContext db) : base(db)
    {
    }
    
}