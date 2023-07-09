using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.DTOs.Cart;
using backend.Services;

namespace backend.Controllers
{
    [Route("api/v1/[controller]s")]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<List<CartDTO>>>> GetSingle(int id)
        {
            return Ok(await _cartService.GetCartById(id));
        }

        [HttpGet("{userId}/cart")]
        public async Task<ActionResult<ServiceResponse<List<CartDTO>>>> GetCartByUserId(int userId)
        {
            return Ok(await _cartService.GetCartByUserId(userId));
        }

        [HttpPost()]
        public async Task<ActionResult<ServiceResponse<List<AddCartDTO>>>> AddProductToCart(CartDTO newCart)
        {
            return Ok(await _cartService.AddProductToCart(newCart));
        }
        
    }
}