using System;
using backend.Models;

namespace backend.DTOs.Auth;

public class AuthUserRespDTO: BaseModel
{
	public string Email { get; set; } = string.Empty;
	public string Password { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;

}

