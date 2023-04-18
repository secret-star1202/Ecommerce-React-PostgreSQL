using backend.DTOs.Auth;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using backend.Services;
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
