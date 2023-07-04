using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using backend.Data;
using backend.DTOs.Auth;
using backend.DTOs.Cart;
using backend.DTOs.CartItem;
using backend.DTOs.Product;
using backend.DTOs.User;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using BCrypt;

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

    // public async Task<ServiceResponse<AddUserDTO>> Register(GetUserDTO request)
    // {
    //     var serviceResponse = new ServiceResponse<AddUserDTO>();
    //     try
    //     {
    //         var user = _mapper.Map<User>(request);

    //         string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

    //         user.Email = request.Email;
    //         user.Password = passwordHash;

    //         _context.Users.Add(user);
    //         await _context.SaveChangesAsync();

    //         var dbUser = await _context.Users
    //          .FirstOrDefaultAsync(u => u.Email == request.Email);
    //         serviceResponse.Data = _mapper.Map<AddUserDTO>(dbUser);
    //     }
    //     catch (Exception ex)
    //     {
    //         serviceResponse.Success = false;
    //         serviceResponse.Message = ex.Message;
    //     }
    //     return serviceResponse;
    // }

    public async Task<ServiceResponse<AuthUserRespDTO>> Login(AuthUserReqDTO request)
    {
        var serviceResponse = new ServiceResponse<AuthUserRespDTO>();
        try
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (dbUser == null)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Email not found.";
                return serviceResponse;
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, dbUser.Password))
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Wrong password.";
                return serviceResponse;
            }
           
            string token = CreateToken(dbUser);
            var authResponse = new AuthUserRespDTO { Token = token };
            serviceResponse.Data = authResponse;
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
       
        

        return serviceResponse;
    }

    private string CreateToken(User user)
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

