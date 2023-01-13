using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class HouseGroupHub : Hub
    {
        public static List<string> GroupsJoines { get; set; } = new List<string>();

        public async Task JoinHouse(string houseName)
        {
            if (!GroupsJoines.Contains(Context.ConnectionId + ":" + houseName))
            {
                GroupsJoines.Add(Context.ConnectionId + ":" + houseName);

                string houseList = "";
                foreach (var item in GroupsJoines)
                {
                    if (item.Contains(Context.ConnectionId))
                    {
                        houseList += item.Split(":")[1] + " ";
                    }
                }
                await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName, true);

                await Clients.Others.SendAsync("newMemberAddedToGroup", houseName);

                await Groups.AddToGroupAsync(Context.ConnectionId, houseName);
            }
        }
        public async Task LeaveHouse(string houseName)
        {
            if (GroupsJoines.Contains(Context.ConnectionId + ":" + houseName))
            {
                GroupsJoines.Remove(Context.ConnectionId + ":" + houseName);

                string houseList = "";
                foreach (var item in GroupsJoines)
                {
                    if (item.Contains(Context.ConnectionId))
                    {
                        houseList += item.Split(":")[1];
                    }
                }
                await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName, false);

                await Clients.Others.SendAsync("MemeberRemovedFromGroup", houseName);

                await Groups.RemoveFromGroupAsync(Context.ConnectionId, houseName);
            }
        }

        public async Task TriggerHouseNotify(string houseName)
        {
            await Clients.Group(houseName).SendAsync("notificationTriggered");
        }
    }
}
