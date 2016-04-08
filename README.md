## Routing Number Search

As the manager of a check processing area in a fairly large institution, we have a lot of requests to move check images associated with certain routing numbers (RTs) from one clearing partner to another at a pretty regular clip.  What I'm usually missing from these requests is the actual bank associated with the RT.  It's important because some RT's are sent directly to the bank that owns the RT, and we don't want to inadvertently move an RT from a free bucket to a paid one.

That said, this is my little helpmate to determine who owns each RT being requested.  The data comes directly from the Fed.  RT's can be updated pretty frequently, with bank mergers, closings, etc.  I don't plan on making this a tedious request, so updates to the data file won't come on any particular frequency.

Thanks to Joe Fearnley's [Slow Carb Search](https://github.com/joefearnley/slow-carb-search) code for providing the base for this project.  Most of the code is his; I just tinkered with it a bit and loaded an obscene amount of bank data onto the back-end.