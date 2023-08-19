using Cafihsa.Data;
using Cafihsa.Dto;
using Cafihsa.Enums;
using Cafihsa.Interfaces;
using Cafihsa.Models;

namespace Cafihsa.Services;

public class AuthService : IAuthService
{
    private readonly CafihsaContext _db;

    public AuthService(CafihsaContext db)
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