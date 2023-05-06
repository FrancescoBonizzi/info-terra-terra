namespace InfoTerraTerra_Library.Newsletter;

public static class EmailValidator
{
    public static bool IsValidEmailAddress(string emailAddress)
    {
        try
        {
            _ = new System.Net.Mail.MailAddress(emailAddress);
            return true;
        }
        catch
        {
            return false;
        }
    }
}