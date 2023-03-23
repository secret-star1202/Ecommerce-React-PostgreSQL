using System;
using backend.DTOs.CartItem;
using backend.DTOs.User;


namespace backend.DTOs.Cart;

public class AddCartDTO
{
    // public int Id { get; set; }
   public int UserId { get; set; }
    //public AddUserDTO? User { get; set; }
    public int CartItemId { get; set; }
    public decimal TotalPrice { get; set; }
    //public List<CartItemDTO>? CartItems { get; set; }
    //public List<CartItemDTO>? CartItems { get; set; }
}

