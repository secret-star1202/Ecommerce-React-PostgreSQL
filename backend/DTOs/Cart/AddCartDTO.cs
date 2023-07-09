using System;
using backend.DTOs.CartItem;
using backend.DTOs.User;
using backend.Models;

namespace backend.DTOs.Cart;

public class AddCartDTO:BaseModel
{
    public int UserId { get; set; }
    public int CartItemId { get; set; }
}