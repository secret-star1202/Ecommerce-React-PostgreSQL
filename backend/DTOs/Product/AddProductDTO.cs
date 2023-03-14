using System;
using backend.Models;

namespace backend.DTOs.Product;

public class AddProductDTO
{
    public string? Name { get; set; }
    public float? Price { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
}


