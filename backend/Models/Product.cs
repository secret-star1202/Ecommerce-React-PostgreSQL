using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models;

public class Product
{
  public int Id { get; set; }
  public string? Name { get; set; }
  public float? Price { get; set; } 
  public string? Description { get; set; } 
  public string? Image { get; set; }
  public Category? Category { get; set; } 
}
