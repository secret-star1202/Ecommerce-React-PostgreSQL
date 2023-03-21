using System;
using backend.DTOs.Cart;
using backend.DTOs.Product;

namespace backend.DTOs.CartItem;

public class AddCartItemDTO
{    
    public int ItemQuantity { get; set; }
    public int ProductId { get; set; }
    public GetProductDTO? Product { get; set; }
    public int CartId { get; set; }
    public CartDTO? Cart { get; set; }
    public float? Price { get; set; } 

}