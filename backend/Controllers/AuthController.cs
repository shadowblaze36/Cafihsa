using CreditBoss.Dto;
using CreditBoss.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CreditBoss.Controllers;

[ApiController]
[Route("admin/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register(RegistrationDto request)
    {
        await _authService.RegisterAdminUser(request);
        return Ok();
    }
}