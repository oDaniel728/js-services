// @ts-check
import * as services from "./toolkit/services.js";

const EventService = services.GetService("EventService");
const LocalStorageService = services.GetService("LocalStorageService");
const Element = services.GetService("HtmlService").Element;

const Session=
{
    running: false,
    time: 0,

    stop() 
    {
        this.running = false;
    },
    step()
    {
        this.time += 1;
    }
};
const SessionStorage = LocalStorageService.new("session-storage", Session);
SessionStorage.hook();

const onStart = EventService.Event.new();
const onLoop  = EventService.Event.new();
const onExit  = EventService.Event.new();

onStart.connect(() => {
    console.log("Started!");
});

const text1 = Element.getByQueryForce("p#text1");
onLoop.connect(() => {
    Session.stop();
});
onExit.connect(() => {
    console.log("Ended!");
});
function main()
{
    onStart.emit();

    Session.running = true;
    while(Session.running)
    {
        onLoop.emit();
    }

    onExit.emit();
}

main();