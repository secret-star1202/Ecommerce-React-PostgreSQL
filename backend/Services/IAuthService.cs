using System;
using backend.DTOs.Auth;
using backend.DTOs.CartItem;
using backend.Models;

namespace backend.Services;

public interface IAuthService
{
    Task<ServiceResponse<AuthUserRespDTO>> Login(AuthUserReqDTO request);
}

