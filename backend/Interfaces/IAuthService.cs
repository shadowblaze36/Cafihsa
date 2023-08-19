using Cafihsa.Dto;

namespace Cafihsa.Interfaces;

public interface IAuthService
{ 
    Task RegisterAdminUser(RegistrationDto registrationDto);
}