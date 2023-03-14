using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
    private static List<Category> categories = new List<Category>();
    [HttpGet]
    public ActionResult<List<Category>> Get()
    {
      return Ok(categories);
    }

    }
}