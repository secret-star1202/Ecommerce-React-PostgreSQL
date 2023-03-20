using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Cart;
using backend.DTOs.Product;
using backend.Models;

namespace backend.DTOs.CartItem;

public class CartItemDTO
{
    public int Id { get; set; }
    public int ItemQuantity { get; set; }
    public int ProductId { get; set; }
    public GetProductDTO? Product { get; set; }
    public int CartId { get; set; }
    public CartDTO? Cart { get; set; }
    public float? Price { get; set; } 

}