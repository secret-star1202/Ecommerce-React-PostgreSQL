using System;
namespace backend.DTOs.Auth;

public class AuthUserReqDTO
{
    public required string Email { get; set; } = string.Empty;
    public required string Password { get; set; } = string.Empty;
}

