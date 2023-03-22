using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.DTOs.Product;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
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
        try
        {
            var product = _mapper.Map<Product>(newProduct);

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            serviceResponse.Data = await _context.Products
                    .Select(p => _mapper.Map<GetProductDTO>(p))
                    .ToListAsync();
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetProductDTO>>> GetAllProducts(string sortBy)
    {
        var serviceResponse = new ServiceResponse<List<GetProductDTO>>();
        try
        {
            IQueryable<Product> query =_context.Products;

            switch (sortBy)
            {
                case "name_desc":
                    query = query.OrderByDescending(p => p.Name);
                    break;
                case "price":
                    query = query.OrderBy(p => p.Price);
                    break;
                case "price_desc":
                    query = query.OrderByDescending(p => p.Price);
                    break;
                default:
                    query = query.OrderBy(p => p.Name);
                    break;
        }
            serviceResponse.Data = await query.Select(p => _mapper.Map<GetProductDTO>(p)).ToListAsync();
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
        return serviceResponse;
    }

    public async Task<ServiceResponse<GetProductDTO>> GetProductById(int id)
    {
        var serviceResponse = new ServiceResponse<GetProductDTO>();
        try
        {
            var dbProduct = await _context.Products
            .FirstOrDefaultAsync(p => p.Id == id);
            serviceResponse.Data = _mapper.Map<GetProductDTO>(dbProduct);
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
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
        try
        {
            var dbProducts = await _context.Products.Where(p => p.CategoryId== categoryId).ToListAsync();
            serviceResponse.Data = dbProducts.Select(p => _mapper.Map<GetProductDTO>(p)).ToList();
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
        return serviceResponse;
    }

    public async Task<ServiceResponse<List<GetProductDTO>>> Pagination(int pageNumber, int pageSize)
    {
        var serviceResponse = new ServiceResponse<List<GetProductDTO>>();
        try
        {
            var dbProducts = await _context.Products
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
            serviceResponse.Data = dbProducts.Select(p => _mapper.Map<GetProductDTO>(p)).ToList();
        }
        catch (Exception ex)
        {
            serviceResponse.Success = false;
            serviceResponse.Message = ex.Message;
        }
        return serviceResponse;
    }
}
