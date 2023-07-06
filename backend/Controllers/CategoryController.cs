using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.DTOs.Category;
using backend.Services;
using backend.DTOs.Product;
namespace backend.Controllers;
[ApiController]
[Route("api/v1/Categories")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet()]
    public async Task<ActionResult<ServiceResponse<List<GetCategoryDTO>>>> GetAll()
    {
        var categories = await _categoryService.GetAllCategories();
        return Ok(categories.Data);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<List<GetCategoryDTO>>>> GetSingle(int id)
    {
        return Ok(await _categoryService.GetCategoryById(id));
    }

    [HttpPost()]
    public async Task<ActionResult<ServiceResponse<List<AddCategoryDTO>>>> AddCategory(GetCategoryDTO newCategory)
    {
        return Ok(await _categoryService.AddCategory(newCategory));
    }

    [HttpPut()]
    public async Task<ActionResult<ServiceResponse<List<GetCategoryDTO>>>> UpdateProduct(UpdateCategoryDTO updatedCategory)
    {
        var response = await _categoryService.UpdateCategory(updatedCategory);
        if (response.Data is null)
        {
            return NotFound(response);
        }

        return Ok(response);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ServiceResponse<GetCategoryDTO>>> DeleteCategory(int id)
    {
        var response = await _categoryService.DeleteCategory(id);
        if (response.Data is null)
        {
            return NotFound(response);
        }

        return Ok(response);
    }


}