using System;
namespace backend.DTOs.Auth;

public class AuthUserRespDTO
{
	public string Email { get; set; } = string.Empty;
	public string Password { get; set; } = string.Empty;
}

