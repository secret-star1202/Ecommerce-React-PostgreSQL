using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.DTOs.Category;

public class AddCategoryDTO:BaseModel
{
  public string? Name { get; set; } 
}
