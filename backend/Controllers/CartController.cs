using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.Models;
using backend.DTOs.Cart;
using backend.Services;

namespace backend.Controllers
{
    [Route("[controller]")]
    public class CartController : ControllerBase
    {
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<ServiceResponse<List<CartDTO>>>> Get()
    {
        return Ok(await _cartService.GetCart());
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<List<CartDTO>>>> GetSingle(int id)
    {
        return Ok(await _cartService.GetCartById(id));
    }
    }
}