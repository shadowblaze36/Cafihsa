using System.ComponentModel.DataAnnotations;

namespace Cafihsa.Dto;

public class RegistrationDto
{
    [Required]
    public string Email { get; set; } = null!;
    [Required]
    public string Username { get; set; } = null!;
    [Required]
    public string Password { get; set; } = null!;
}