namespace NetCoreSignalR.Api.Hubs;

using Microsoft.AspNetCore.SignalR;
using NetCoreSignalR.Api.Dtos;
using NetCoreSignalR.Api.Interfaces;

public class ChatHub : Hub<IChatClient>
{
    public async Task JoinChat(UserConnection connection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

        await Clients
            .Group(connection.ChatRoom)
            .ReceiveMessage("Admin", $"{connection.UserName} joined to the chat!");
    }
}
