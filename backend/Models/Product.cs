using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models;

public class Product : BaseModel
{
  public string? Name { get; set; }
  public decimal? Price { get; set; } 
  public string? Description { get; set; } 
  public string? Image { get; set; }
  public int CategoryId { get; set; }
  public Category? Category { get; set; } 
}
