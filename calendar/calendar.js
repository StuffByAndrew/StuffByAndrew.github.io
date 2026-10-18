// Event privacy is enforced by Google Calendar sharing permissions, not this URL.
// Every source must use public "See only free/busy (hide details)" permissions.
// Never put a private iCal URL, password, or access token in this public config.
(async function () {
  const status = document.getElementById('calendar-status');
  status.textContent = 'Loading availability…';

  try {
    const response = await fetch('/calendar/config.json');
    if (!response.ok) throw new Error('Calendar configuration unavailable');
    const config = await response.json();
    if (config.notice) {
      const notice = document.getElementById('calendar-notice');
      notice.textContent = config.notice;
      notice.hidden = false;
    }
    const calendarIds = [...new Set(config.calendarIds.map(id => id.trim()).filter(Boolean))];
    if (!calendarIds.length) throw new Error('No calendars configured');

    const url = new URL('https://calendar.google.com/calendar/embed');
    url.search = new URLSearchParams({
      mode: 'WEEK',
      ctz: config.timeZone || 'America/New_York',
      title: 'Availability',
      showTitle: '0',
      showPrint: '0',
      showCalendars: '0',
      showTabs: '1',
      showNav: '1',
      showDate: '1',
      showTz: '1',
      wkst: '2',
      bgcolor: '#ffffff',
      height: '650'
    }).toString();

    for (const calendarId of calendarIds) {
      url.searchParams.append('src', calendarId);
      url.searchParams.append('color', '#1772d0');
    }

    document.getElementById('calendar-frame').src = url.href;
    document.getElementById('calendar-link').href = url.href;
    document.getElementById('calendar-container').hidden = false;
    status.hidden = true;
  } catch {
    status.textContent = 'Calendar availability is currently unavailable.';
  }
})();
