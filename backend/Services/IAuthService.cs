using System;
using backend.DTOs.Auth;
using backend.DTOs.CartItem;
using backend.DTOs.User;
using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Services;

public interface IAuthService
{
    //Task<ServiceResponse<AuthUserRespDTO>> Register(AuthUserReqDTO request);
    Task<ServiceResponse<AddUserDTO>> Register(GetUserDTO request);
    Task<ServiceResponse<AuthUserRespDTO>> Login(AuthUserReqDTO request);
}

