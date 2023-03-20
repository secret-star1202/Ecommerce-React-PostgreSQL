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
[Route("api/[controller]")]
public class ProductController : ControllerBase
{

    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<ServiceResponse<List<GetProductDTO>>>> Get()
    {
        return Ok(await _productService.GetAllProducts());
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<ServiceResponse<List<GetProductDTO>>>> GetSingle(int id)
    {
        return Ok(await _productService.GetProductById(id));
    }


    [HttpPost]
    public async Task<ActionResult<ServiceResponse<List<GetProductDTO>>>> AddProduct(AddProductDTO newProduct)
    {
        return Ok(await _productService.AddProduct(newProduct));
    }


    [HttpPut]
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

    [HttpGet("GetAll/AZ")]
    public async Task<ActionResult<ServiceResponse<List<GetProductDTO>>>> SortAZ()
    {
        return Ok(await _productService.SortAZ());
    }

    [HttpGet("GetAll/ZA")]
    public async Task<ActionResult<ServiceResponse<List<GetProductDTO>>>> SortZA()
    {
        return Ok(await _productService.SortZA());
    }

    [HttpGet("GetAll/price-asc")]
    public async Task<ActionResult<ServiceResponse<List<GetProductDTO>>>> SortPriceASC()
    {
        return Ok(await _productService.SortPriceASC());
    }

    [HttpGet("GetAll/price-desc")]
    public async Task<ActionResult<ServiceResponse<List<GetProductDTO>>>> SortPriceDESC()
    {
        return Ok(await _productService.SortPriceDESC());
    }

}
