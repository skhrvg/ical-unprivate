# iCal Unprivate Proxy

This is a simple proxy that will make your private iCal events public. It just rewrites the `CLASS` property of the 
iCal events from `PRIVATE` to `PUBLIC`.

## Why?
My new employer uses Yandex Calendar, but I prefer Google Calendar on my Android phone and watch. Yandex Calendar 
allows you to export your calendar as an iCal feed, but it marks all events as private, even if event details are 
provided. Google Calendar does not show private event summaries, so I created this proxy to make all events public.

## Usage
Run docker container with the following command:
```bash
docker run -d -p 80:80 -e ical-unprivate
```
Then you can use the proxy by passing the URL of the private iCal feed as a query parameter:
```
http://localhost/?endpoint=https://example.com/calendar.ics
```
The proxy will then return the iCal feed with all events set to public.

### docker-compose example
```yaml
version: '3.7'
services:
  ical-unprivate:
    image: ical-unprivate:latest
    ports:
      - 80:80
```

### No Docker example
```bash
git clone skhrvg/ical-unprivate
cd ical-unprivate
pnpm install
pnpm start
```
You can specify the port by setting the `ICAL_UNPRIVATE_PORT` environment variable. The default port is `80`.

## Try it out
You can try it out by using the following URL:
```
https://skhr.vg/ical-unprivate?endpoint=<your-private-ical-feed-url>
```
