using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.DTOs.User
{
    public class AddUserDTO
    {
	public string Name { get; set; } = string.Empty;
	public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Avatar { get; set; } = string.Empty;
    public Role Role { get; set; } = Role.Admin;
    }
}