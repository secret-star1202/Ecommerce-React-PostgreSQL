using System;
using backend.DTOs.CartItem;

namespace backend.DTOs.Cart;

public class AddCartDTO
{
    public decimal TotalPrice { get; set; }
    public int UserId { get; set; }
    public List<CartItemDTO>? CartItems { get; set; } 
}

