using CreditBoss.Dto;

namespace CreditBoss.Interfaces;

public interface IAuthService
{ 
    Task RegisterAdminUser(RegistrationDto registrationDto);
}