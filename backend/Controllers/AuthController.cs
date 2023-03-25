using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Auth;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using BCrypt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using backend.Services;
using backend.Services.Impl;
using backend.DTOs.User;

namespace backend.Controllers;

[Route("api/[controller]")]
public class AuthController : ControllerBase
{

    public static AuthUserRespDTO user = new AuthUserRespDTO();

    private readonly IConfiguration _configuration;
    private readonly IAuthService _authService;

    public AuthController(IConfiguration configuration, IAuthService authService)
    {
        _configuration = configuration;
        _authService = authService;
    }

    //[HttpPost("signup")]
    //public ActionResult<AuthUserRespDTO> Signup(AuthUserReqDTO request)
    //{
    //    string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

    //    user.Email = request.Email;
    //    user.Password = passwordHash;

    //    return Ok(user);
    //}

  //[HttpPost("login")]
  //public ActionResult<AuthUserRespDTO>Login(AuthUserReqDTO request)
  //{
  //      if (user.Email != request.Email)
  //      {
  //          return BadRequest("Email not found.");
  //      }

  //      if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
  //      {
  //          return BadRequest("Wrong password.");
  //      }
  //      string token = CreateToken(user);

  //      return Ok(token);
  //  }

   //private string CreateToken(AuthUserRespDTO user)
   //     {
   //         List<Claim> claims = new List<Claim> {
   //             new Claim(ClaimTypes.Email, user.Email),
   //             new Claim(ClaimTypes.Role, "Admin"),
   //             //new Claim(ClaimTypes.Role, "Customer"),
   //         };

   //         var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
   //             _configuration.GetSection("AppSettings:Token").Value!));

   //         var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

   //         var token = new JwtSecurityToken(
   //                claims: claims,
   //                expires: DateTime.Now.AddDays(1),
   //                signingCredentials: creds
   //            );

   //         var jwt = new JwtSecurityTokenHandler().WriteToken(token);

   //         return jwt;
   //     }

    [HttpPost("register")]
    public async Task<ActionResult<ServiceResponse<AddUserDTO>>> Register(GetUserDTO request)
    {
        return Ok(await _authService.Register(request));
    }

    [HttpPost("login")]
    public async Task<ActionResult<ServiceResponse<AuthUserRespDTO>>> Login(AuthUserReqDTO request)
    {
        return Ok(await _authService.Login(request));
    }
}
