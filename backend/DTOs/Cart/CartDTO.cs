using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.User;
using backend.DTOs.CartItem;
namespace backend.DTOs.Cart;
public class CartDTO
{
    public int UserId { get; set; }
    public int CartItemId { get; set; }
}
