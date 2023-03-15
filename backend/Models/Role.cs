using System;
using System.Text.Json.Serialization;

namespace backend.Models;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Role
{
    Customer=1,
    Admin=2
}

