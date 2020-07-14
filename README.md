## Purpose and Goal

I decided to make QuickTV so I would have a quick way to see only new shows that were airing today or tomorrow. I typically have my shows set to record, but had recently made a switch to a new service and knew I wouldn't remember to set shows in the future. This was a good opportunity for me to not only practice vanilla ES6 JavaScript, but to have a place to go to quickly check on new shows coming out.

## How it works

The app fetches from an API and stores the data in a couple of variables. All filtering is then done through the variables so we don't continually hit the API. Your local time zone is converted from GMT the API provides and then filters all of the shows into their respective air times. You can filter through show types as well as primetime or daytime and today or tomorrow airings.
