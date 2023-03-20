using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.Services;
using backend.Models;
using backend.DTOs.CartItem;
using backend.DTOs.Category;

namespace backend.Controllers;

[Route("[controller]")]
public class CartItemController : ControllerBase
{
  private readonly ICartItemService _cartItemService;

  public CartItemController(ICartItemService cartItemService)
  {
    _cartItemService = cartItemService;
  }

    [HttpGet("GetAll")]
    public async Task<ActionResult<ServiceResponse<List<CartItemDTO>>>> Get()
    {
        return Ok(await _cartItemService.GetCartItems());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ServiceResponse<CartItemDTO>>> DeleteCartItem(int id)
    {
        var response = await _cartItemService.DeleteCartItem(id);
        if (response.Data is null)
        {
            return NotFound(response);
        }

        return Ok(response);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<List<CartItemDTO>>>> GetSingle(int id)
    {
        return Ok(await _cartItemService.GetCartItemById(id));
    }


    [HttpPost]
    public async Task<ActionResult<ServiceResponse<List<CartItemDTO>>>> AddCategory(AddCartItemDTO newCartItem)
    {
        return Ok(await _cartItemService.AddCartItem(newCartItem));
    }

}
