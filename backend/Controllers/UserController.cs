using System.Runtime.ExceptionServices;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.Models;
using System.Dynamic;
using System.Security;
using backend.Services;
using backend.DTOs.User;

namespace backend.Controllers;


[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{

    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> Get()
    {
        return Ok(await _userService.GetAllUsers());
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> GetSingle(int id)
    {
        return Ok(await _userService.GetUserById(id));
    }


    [HttpPost]
    public async Task<ActionResult<ServiceResponse<List<GetUserDTO>>>> AddUser(AddUserDTO newUser)
    {
        return Ok(await _userService.AddUser(newUser));
    }


    [HttpPut]
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