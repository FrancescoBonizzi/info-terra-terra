namespace InfoTerraTerra_Library;

public class FrontendException : Exception
{
    public string FrontendMessage { get; set; }

    public FrontendException(
        string messageToLog,
        string frontendMessage)
        : base(messageToLog)
    {
        FrontendMessage = frontendMessage;
    }

    public FrontendException(
        string message)
        : this(
            message,
            message)
    {
    }
}