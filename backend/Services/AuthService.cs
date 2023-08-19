using CreditBoss.Data;
using CreditBoss.Dto;
using CreditBoss.Enums;
using CreditBoss.Interfaces;
using CreditBoss.Models;

namespace CreditBoss.Services;

public class AuthService : IAuthService
{
    private readonly CreditBossContext _db;

    public AuthService(CreditBossContext db)
    {
        _db = db;
    }
    
    public async Task RegisterAdminUser(RegistrationDto registrationDto)
    {
        var userToCreate = new User()
        {
            Username = registrationDto.Username,
            Email = registrationDto.Email,
            PasswordHash = registrationDto.Password,
            PasswordSalt = registrationDto.Password,
            UserType = UserType.Admin
        };
        await _db.User.AddAsync(userToCreate);
    }
}