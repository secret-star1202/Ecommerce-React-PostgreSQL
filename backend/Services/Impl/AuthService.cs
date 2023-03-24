using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using backend.Data;
using backend.DTOs.Auth;
using backend.DTOs.CartItem;
using backend.DTOs.Product;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services.Impl;

public class AuthService : IAuthService
{
    private readonly IMapper _mapper;
    private readonly DataContext _context;
    private readonly IConfiguration _configuration;

    public AuthService(IMapper mapper, DataContext context, IConfiguration configuration)
    {
        _mapper = mapper;
        _context = context;
        _configuration = configuration;
    }
    public async Task<ServiceResponse<AuthUserRespDTO>> Login(AuthUserReqDTO request)
    {
        var serviceResponse = new ServiceResponse<AuthUserRespDTO>();
        try
        {
            var user = _mapper.Map<User>(request);

            if (user.Email != request.Email)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Email not found.";
                return serviceResponse;
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Wrong password.";
                return serviceResponse;
            }

        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;

    }
    private string CreateToken(AuthUserRespDTO user)
    {
        List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, "Admin"),
                new Claim(ClaimTypes.Role, "Customer"),
            };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration.GetSection("AppSettings:Token").Value!));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
               claims: claims,
               expires: DateTime.Now.AddDays(1),
               signingCredentials: creds
           );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return jwt;
    }

}
