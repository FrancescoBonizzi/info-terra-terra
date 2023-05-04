namespace InfoTerraTerra.AspNetCore;

/// <summary>
/// Redirects /www to /
/// </summary>
public class WwwRedirect : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        if (context.Request.Path.StartsWithSegments(
                "/www", 
                StringComparison.OrdinalIgnoreCase))
        {
            context.Response.Redirect(context.Request.Path.Value!.Replace("/www", ""));
            return;
        }
        
        await next(context);
    }
}

