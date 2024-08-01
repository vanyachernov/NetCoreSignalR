namespace NetCoreSignalR.Api.Interfaces;

public interface IChatClient
{
    public Task ReceiveMessage(string userName, string message);
}
