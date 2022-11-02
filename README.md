<p align=center>
<img src="https://i.postimg.cc/DwC2dXv3/Group-1.png" height=400 alt="UNS Flights logo"/>
</p>

## General info

This is a project made for **Databases** subject at Universidad Nacional del Sur. I did this together with [Franco Sacomani](https://github.com/franco1fs)

The main goal was to create a Java application that interacts with a MySQL database to display and reserve flights. The UI was supposed to be made with the Swing Java library, but we wanted to do it with **React**.

So we develop a static React app, and to be able to communicate the Java backend with the Javascript frontend, we use **the JavaFX web module**. This module loads the webapp in an HTML container and allows us to attach a Java object to the global _window_ object in Javascript.

## Backend - MySQL

Another part of the project was to create _triggers_ and _stored procedures_ in MySQL that will **execute transactions** and keep all tables in sync whenever a user made a reservation.

Then in Java, we provide an interface to Javascript so it can access the database and show all the info to the user.

## Gradle

Since the app needs the static HTML files, before running the app one has to install the dependencies with **npm** and export the web files, then copy the output files to a specific folder where Java will read them.

To make this process easier, **we add new tasks to Gradle that will take care of everything**, so now if you clone the repo and build the project, all the necessary setup will be made automatically

**We also add tasks for exporting the project as a JAR**. JavaFX has different packages for Windows, MacOS, and Linux, so there are three different tasks one for each os. We had to create different Gradle configurations to do this.

[![Gradle export tasks](https://i.postimg.cc/Twn193Nj/Annotation-2020-08-01-210920.png)](https://postimg.cc/ftTMWDNk)

## Demo

To run the app you'll need to have installed MySQL, but also a database filled with information about users, flights, and reservations.
I separate the frontend from this project and uploaded to **Vercel** so you can test it with fake information. To do this I've also had to re-implement the Java backend in Node so it can also be hosted in Vercel. **Note that there might be some bugs because of this re-implementation as it was done quickly**.

Also, since I'm using **PlanetScale** to host the database, **store procedures are not allowed**, so reservation will fail.

Link to demo: [UNS Flights](https://uns-flights-nicoverali.vercel.app/)


