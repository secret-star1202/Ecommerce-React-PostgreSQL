using System;
using backend.DTOs.CartItem;

namespace backend.DTOs.Cart;

public class AddCartDTO
{
    public int UserId { get; set; }
    public int CartItemId { get; set; }
    //public List<CartItemDTO>? CartItems { get; set; }
}

