using System;
using System.Diagnostics.CodeAnalysis;

namespace backend.Models;

public class User : BaseModel
{
    public string Name { get; set; } = string.Empty;
	public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Initials { get; set; }
    public Cart? Cart { get; set; }
}

