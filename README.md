Repo for https://andrewxie.github.io/

Based on Jon Barron's website: https://jonbarron.info/.

## Calendar

`/calendar` serves `calendar/index.html` (GitHub Pages redirects to `/calendar/`).
It embeds the Harvard calendar directly in a Google Calendar weekly view.
Edits in Google Calendar appear without rebuilding the site. The page does not
need a JavaScript loader or a separate configuration request.

**Calendar IDs in the embed URL are public.** For a primary calendar,
the ID is the account's email address, and the browser sends it in the embed URL.
Free/busy sharing hides event details, but does not conceal that address. Only
the Harvard calendar is included for now. A private intermediary that returns
only busy time ranges is needed before adding a calendar whose ID must stay
private; encoding or hiding the ID in JavaScript does not protect it.

To configure sharing, open Google Calendar on desktop:

1. Go to **Settings → the calendar → Access permissions for events**.
2. Enable **Make available to public** and select **See only free/busy (hide
   details)**. Do not select **See all event details**.
3. Under **Integrate calendar**, confirm the **Calendar ID** matches the `src`
   parameter in both Google URLs in `calendar/index.html`. An account email is
   normally its primary calendar ID; secondary calendars have separate IDs.
4. Check `/calendar/` in a signed-out/private browser window. Confirm the
   calendar appears and events show only **Busy**, without titles,
   locations, descriptions, or guest lists. Check an event from each calendar.

The iframe cannot override Google sharing permissions. Visitors already signed
in with additional calendar permissions may see more detail than anonymous
visitors. Hiding Google controls is cosmetic,
not an event privacy setting. This setup exposes free/busy times publicly.

Harvard/Google Workspace administrators may restrict public sharing. If a
calendar cannot be shared as free/busy, this embed cannot show that source to
anonymous visitors; a backend using authorized Calendar API free/busy access
would be needed instead. Never publish private iCal feed URLs or OAuth tokens.

To preview locally, run `python3 -m http.server 8000` from the repository root,
then open `http://localhost:8000/calendar/`.
