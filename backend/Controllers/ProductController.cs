using System.Runtime.ExceptionServices;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.Models;
using System.Dynamic;
using System.Security;
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
    public async Task<ActionResult<ServiceResponse<List<GetProductDTO>>>> Get(string sortBy)
    {
        return Ok(await _productService.GetAllProducts(sortBy));
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
