namespace InfoTerraTerra.AspNetCore;

public static class HttpContextExtensions
{
     public static string? GetUserAgent(this HttpContext httpContext) =>
         httpContext.Request.Headers["User-Agent"].FirstOrDefault();
     
        public static string? GetReferer(this HttpContext httpContext) =>
            httpContext.Request.Headers["Referer"].FirstOrDefault();
        
        public static string? GetRemoteIpAddress(this HttpContext httpContext) =>
            httpContext.Connection.RemoteIpAddress?.ToString();
        
        public static string? GetOs(this HttpContext httpContext)
        {
            var userAgent = httpContext.GetUserAgent();
            if (userAgent == null)
                return null;
            
            if (userAgent.Contains("Android", StringComparison.InvariantCultureIgnoreCase))
                return "Android";
            
            if (userAgent.Contains("iPhone", StringComparison.InvariantCultureIgnoreCase))
                return "iOS";
            
            if (userAgent.Contains("iPad", StringComparison.InvariantCultureIgnoreCase))
                return "iOS";
            
            if (userAgent.Contains("Macintosh", StringComparison.InvariantCultureIgnoreCase))
                return "Mac";
            
            if (userAgent.Contains("Windows", StringComparison.InvariantCultureIgnoreCase))
                return "Windows";
            
            if (userAgent.Contains("Linux", StringComparison.InvariantCultureIgnoreCase))
                return "Linux";
            
            return "Other";
        }
}

