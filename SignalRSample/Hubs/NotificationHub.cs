using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class NotificationHub : Hub
    {
        public static int NotificationCounter { get; set; }
        public static List<string> Notifications { get; set; } = new List<string>();

        public async Task SendMessage(string message)
        {
            if (!string.IsNullOrWhiteSpace(message))
            {
                NotificationCounter++;
                Notifications.Add(message);
                await LoadMessages();
            }
        }

        public async Task LoadMessages()
        {
            await Clients.All.SendAsync("LoadNotifications", Notifications, NotificationCounter);
        }
    }
}
