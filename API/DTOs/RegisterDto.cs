using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    public string Username { get; set; } = string.Empty;
    [Required]
    public string? KnownAs { get; set; }
    public string? Gender { get; set; }
    public string? DateOfBirth { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    [Required]
    [StringLength(8, MinimumLength = 4)]
    public string Password { get; set; } = string.Empty;
}
