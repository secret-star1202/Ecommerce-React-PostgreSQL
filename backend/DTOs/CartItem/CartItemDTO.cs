using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Product;
using backend.Models;

namespace backend.DTOs.CartItem;

public class CartItemDTO
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public AddProductDTO? Product { get; set; }

}