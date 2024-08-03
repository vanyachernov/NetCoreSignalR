namespace NetCoreSignalR.Api.Hubs;

using System.Text.Json;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Caching.Distributed;
using NetCoreSignalR.Api.Dtos;
using NetCoreSignalR.Api.Interfaces;

public class ChatHub(IDistributedCache cache) : Hub<IChatClient>
{
    private readonly IDistributedCache _cache = cache;

    public async Task JoinChat(UserConnection connection)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

        var stringConnection = JsonSerializer.Serialize(connection);

        await _cache.SetStringAsync(Context.ConnectionId, stringConnection);
    }

    public async Task SendMessage(string message)
    {
        var stringConnection = await _cache.GetStringAsync(Context.ConnectionId);

        var connection = JsonSerializer.Deserialize<UserConnection>(stringConnection);

        if(connection is not null)
        {
            await Clients
                .Group(connection.ChatRoom)
                .ReceiveMessage(connection.UserName, message);
        }
    }
}
