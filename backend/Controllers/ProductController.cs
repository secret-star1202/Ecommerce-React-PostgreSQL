using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using backend.DTOs.Product;

namespace backend.Controllers;

[ApiController]
[Route("api/v1/[controller]s")]
public class ProductController : ControllerBase
{

    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet()]
    public async Task<ActionResult<ServiceResponse<List<GetProductDTO>>>> GetAllProducts()
    {
        var products = await _productService.GetAllProducts();
        return Ok(products.Data);
    }

    [HttpGet("sort-by")]
    public async Task<ActionResult<ServiceResponse<List<GetProductDTO>>>> GetAllProductsSort(string sortBy)
    {
        var products = await _productService.GetAllProductsSort(sortBy);
        return Ok(products.Data);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<List<GetProductDTO>>>> GetSingle(int id)
    {
        return Ok(await _productService.GetProductById(id));
    }


    [HttpPost()]
    public async Task<ActionResult<ServiceResponse<List<AddProductDTO>>>> AddProduct(GetProductDTO newProduct)
    {
        return Ok(await _productService.AddProduct(newProduct));
    }


    [HttpPut()]
    public async Task<ActionResult<ServiceResponse<List<GetProductDTO>>>> UpdateProduct(UpdateProductDTO updatedProduct)
    {
        var response = await _productService.UpdateProduct(updatedProduct);
        if (response.Data is null)
        {
            return NotFound(response);
        }

        return Ok(response);
    }


    [HttpDelete("{id}")]
    public async Task<ActionResult<ServiceResponse<GetProductDTO>>> DeleteProduct(int id)
    {
        var response = await _productService.DeleteProduct(id);
        if (response.Data is null)
        {
            return NotFound(response);
        }

        return Ok(response);
    }

    [HttpGet("{categoryId}/products")]
    public async Task<ActionResult<ServiceResponse<List<GetProductDTO>>>> GetProductsByCategory(int categoryId)
    {
        return Ok(await _productService.GetProductsByCategory(categoryId));
    }


    [HttpGet("pagination")]
    public async Task<ActionResult<ServiceResponse<List<GetProductDTO>>>> Pagination(int pageNumber, int pageSize)
    {
        return Ok(await _productService.Pagination(pageNumber,pageSize));
    }
}
