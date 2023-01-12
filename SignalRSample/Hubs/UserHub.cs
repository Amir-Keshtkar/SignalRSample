using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class UserHub : Hub
    {
        public static int TotalViews { get; set; } = 0;
        public static int TotalUsers { get; set; } = 0;

        public async override Task<string> OnConnectedAsync()
        {
            TotalUsers += 1;
            await Clients.All.SendAsync("UpdateTotalUsers", TotalUsers);
            //return base.OnConnectedAsync();
            return "Hey Welcome boy!";
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers -= 1;
            Clients.All.SendAsync("UpdateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }

        public async Task<string> NewWindowsLoaded(string name)
        {
            TotalViews += 1;
            await Clients.All.SendAsync("UpdateTotalViews", TotalViews);
            return $"total views from {name} is: {TotalViews}";
        }
    }
}
