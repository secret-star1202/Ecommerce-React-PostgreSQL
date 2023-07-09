using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using backend.DTOs.User;

namespace backend.Controllers;

[ApiController]
[Route("api/v1/[controller]s")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet()]
    public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> Get()
    {
        var users = await _userService.GetAllUsers();
        return Ok(users.Data);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> GetSingle(int id)
    {
        return Ok(await _userService.GetUserById(id));
    }

    [HttpPost()]
    public async Task<ActionResult<ServiceResponse<List<AddUserDTO>>>> Register(GetUserDTO newUser)
    {
        return Ok(await _userService.Register(newUser));
    }

    [HttpPut()]
    public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> UpdateUser(UpdateUserDTO updatedUser)
    {
        var response = await _userService.UpdateUser(updatedUser);
        if (response.Data is null)
        {
            return NotFound(response);
        }

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ServiceResponse<GetUserDTO>>> DeleteUser(int id)
    {
        var response = await _userService.DeleteUser(id);
        if (response.Data is null)
        {
            return NotFound(response);
        }

        return Ok(response);
    }
}