using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class DeathlyHallowsHub : Hub
    {

        //public async override Task<string> OnConnectedAsync()
        //{
        //    var deathlyHallows = GetStatucRace();
        //    await Clients.All.SendAsync("UpdateDeathlyHallowsCount",
        //        deathlyHallows[SD.Cloak],
        //        deathlyHallows[SD.Stone],
        //        deathlyHallows[SD.Wand]);
        //    //return base.OnConnectedAsync();
        //    return "hey bboy welcome back";
        //}

        public Dictionary<string, int> GetStatucRace()
        {
            return SD.DeathlyHallowRace;
        }

    }
}
