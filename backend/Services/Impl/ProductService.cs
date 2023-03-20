using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.DTOs.Product;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class ProductService : IProductService

{
    private readonly IMapper _mapper;
    private readonly DataContext _context;

    public ProductService(IMapper mapper, DataContext context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<ServiceResponse<List<GetProductDTO>>> AddProduct(AddProductDTO newProduct)
    {
        var serviceResponse = new ServiceResponse<List<GetProductDTO>>();
        var product = _mapper.Map<Product>(newProduct);

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        serviceResponse.Data = await _context.Products
                    .Select(p => _mapper.Map<GetProductDTO>(p))
                    .ToListAsync();
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetProductDTO>>> GetAllProducts()
    {
        var serviceResponse = new ServiceResponse<List<GetProductDTO>>();
        var dbProducts = await _context.Products.ToListAsync();
        serviceResponse.Data = dbProducts.Select(p => _mapper.Map<GetProductDTO>(p)).ToList();
        return serviceResponse;
    }

    public async Task<ServiceResponse<GetProductDTO>> GetProductById(int id)
    {
        var serviceResponse = new ServiceResponse<GetProductDTO>();
        var dbProduct = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == id);
        serviceResponse.Data = _mapper.Map<GetProductDTO>(dbProduct);
        return serviceResponse;
    }

    public async Task<ServiceResponse<GetProductDTO>> UpdateProduct(UpdateProductDTO updatedProduct)
    {
        var serviceResponse = new ServiceResponse<GetProductDTO>();

        try
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == updatedProduct.Id);
            if (product is null)
                throw new Exception($"Product with Id '{updatedProduct.Id}' not found.");

            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            product.Description = updatedProduct.Description;
            product.Image = updatedProduct.Image;
            product.CategoryId = updatedProduct.CategoryId;
           // product.Category = updatedProduct.Category;

            await _context.SaveChangesAsync();
            serviceResponse.Data = _mapper.Map<GetProductDTO>(product);
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;

    }

    public async Task<ServiceResponse<List<GetProductDTO>>> DeleteProduct(int id)
    {
        var serviceResponse = new ServiceResponse<List<GetProductDTO>>();

        try
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product is null)
                throw new Exception($"Product with Id '{id}' not found.");

            _context.Products.Remove(product);

            await _context.SaveChangesAsync();

            serviceResponse.Data = await _context.Products.Select(p => _mapper.Map<GetProductDTO>(p)).ToListAsync();

        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }

        return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetProductDTO>>> GetProductsByCategory(int categoryId)
    {
        var serviceResponse = new ServiceResponse<List<GetProductDTO>>();
        var dbProducts = await _context.Products.Where(p => p.CategoryId== categoryId).ToListAsync();
        serviceResponse.Data = dbProducts.Select(p => _mapper.Map<GetProductDTO>(p)).ToList();
        return serviceResponse;
    }



    public async Task<ServiceResponse<List<GetProductDTO>>> SortAZ()
    {
        var serviceResponse = new ServiceResponse<List<GetProductDTO>>();
        var dbProducts = await _context.Products.OrderBy(p => p.Name).ToListAsync();
        serviceResponse.Data = dbProducts.Select(p => _mapper.Map<GetProductDTO>(p)).ToList();
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetProductDTO>>> SortZA()
    {
        var serviceResponse = new ServiceResponse<List<GetProductDTO>>();
        var dbProducts = await _context.Products.OrderByDescending(p => p.Name).ToListAsync();
        serviceResponse.Data = dbProducts.Select(p => _mapper.Map<GetProductDTO>(p)).ToList();
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetProductDTO>>> SortPriceASC()
    {
        var serviceResponse = new ServiceResponse<List<GetProductDTO>>();
        var dbProducts = await _context.Products.OrderBy(p => p.Price).ToListAsync();
        serviceResponse.Data = dbProducts.Select(p => _mapper.Map<GetProductDTO>(p)).ToList();
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetProductDTO>>> SortPriceDESC()
    {
        var serviceResponse = new ServiceResponse<List<GetProductDTO>>();
        var dbProducts = await _context.Products.OrderByDescending(p => p.Price).ToListAsync();
        serviceResponse.Data = dbProducts.Select(p => _mapper.Map<GetProductDTO>(p)).ToList();
        return serviceResponse;
    }
}
