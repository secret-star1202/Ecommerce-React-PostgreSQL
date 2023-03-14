using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.Models;
using backend.DTOs.Product;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<ServiceResponse<List<Category>>>> Get()
    {
        return Ok(await _categoryService.GetAllCategories());
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<List<Category>>>> GetSingle(int id)
    {
        return Ok(await _categoryService.GetCategoryById(id));
    }


    [HttpPost]
    public async Task<ActionResult<ServiceResponse<List<Category>>>> AddCategory(Category newCategory)
    {
        return Ok(await _categoryService.AddCategory(newCategory));
    }


    [HttpPut]
    public async Task<ActionResult<ServiceResponse<List<Category>>>> UpdateProduct(Category updatedCategory)
    {
        var response = await _categoryService.UpdateCategory(updatedCategory);
        if (response.Data is null)
        {
            return NotFound(response);
        }

        return Ok(response);
    }


    [HttpDelete("{id}")]
    public async Task<ActionResult<ServiceResponse<Category>>> DeleteCategory(int id)
    {
        var response = await _categoryService.DeleteCategory(id);
        if (response.Data is null)
        {
            return NotFound(response);
        }

        return Ok(response);
    }


}