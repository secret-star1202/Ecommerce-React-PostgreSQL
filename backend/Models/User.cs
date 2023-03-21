using System;
using System.Diagnostics.CodeAnalysis;

namespace backend.Models;

public class User : BaseModel
{
    public string Name { get; set; } = string.Empty;
	public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public Role Role { get; set; } = Role.Admin;
    public List<Cart> Carts { get; set; }
}

