using System.Globalization;
using InfoTerraTerra_Library;
using InfoTerraTerra_Library.Users;
using InfoTerraTerra.Middlewares;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.DataProtection.KeyManagement;

var builder = WebApplication.CreateBuilder(args);

var connectionStringProvider = new JsonConfigInfrastructureConfigurationProvider(builder.Configuration);
builder.Services.AddSingleton<IUsersRepository, InMemoryUsersRepository>();
builder.Services
    .AddControllersWithViews()
    .AddNewtonsoftJson();

// Provider custom di storage delle chiavi di crittazione per la data protection
// usato in particolare la crittografia dei cookie, che non va correttamente sulle macchine virtuali o shared
// perché le chiavi vengono pulite dal sistema
builder.Services.Configure<KeyManagementOptions>(options =>
{
    options.XmlRepository = new SqlServerDataEncryptionXmlRepository(connectionStringProvider);
    // Non lo posso settare perché quelli che ci sono in regalo sono basati su cose di Windows 
    // che possono cambiare sulle macchine shared di produzione, inoltre se si scala in orizzontale, same problem
    options.XmlEncryptor = null;
});

builder.Services.AddHealthChecks();
builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options =>
    {
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.Cookie.SameSite = SameSiteMode.Strict;
        options.LoginPath = "/auth/login";
        options.SlidingExpiration = true;
    });

builder.Services.AddAuthentication(BasicAuthenticationHandler.DefaultScheme).
    AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>
        (BasicAuthenticationHandler.DefaultScheme, null);

var cultureInfo = new CultureInfo("it-iT");
cultureInfo.NumberFormat.CurrencySymbol = "€";
CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.MapHealthChecks("/healthz");
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();