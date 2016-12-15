# Fall16-Team27


Project Abstract

Together

Current Scenario:

Ever wonder why large sports teams outperform small ones? Aren't all atheletes equal? The answer lies in Performance Analysis and smart training.

Big Sports clubs are able to have their own sports analyst teams who personally train each athelete, send them on a strict diet and monitor their physical activity. This requires a lot of financial investment and infrastructure.

Small teams cannot afford this.

Proposed Scenario:

Using Fitness IOT devices such as Jawbone, Garmin Vivofit, FitBit etc, a small team can have their own Smart Training management system to store, analyse and visualize the fitness activity data of their players with a minimal investment of just the IOT device cost.

This web based system can allow coaches to explore player's activity and with enough data they can have their own Analytics dashboards using opensource technologies like R and Shiny to build smart dashboards for team management.

This can also be possibly extended with a mobile app to allow the coaches to monitor the progress on the go

![architecture diagram](https://cloud.githubusercontent.com/assets/17165443/19755925/01385132-9bce-11e6-8efb-71baef59b0cf.png)



Live URL : http://together.mybluemix.net


Configuring Together 

================================================


To get started working with the FitBit API, you need to register at dev.fitbit.com. 

Upon account registration, create a new App. You can choose to create a personal, research or Commercial App. It is advisable to create a personal app if you need access to time series data. 


Upon App Registration, do the following steps:

1) Note the Client Id and Client Secret keys provided by FitBit.com

2) Perform npm install and install the fitbit-client npm package. Configure your API keys as provided by fitbit. 

3) copy your fit-bit-client file and replace the one in the "Together" project package to start accessing your own dashboards.

4) Create the database with Mongoose schema and replace the connection Url 

5) Use the app.js and bin/www files to configure the port for starting server on localhost or cloud.

6) Run node bin/www


Enhancing Together
==============================

You can contribute to together with the following enhancement suggestions:

1) Conceptualize a fourth KPI "Effectiveness" that complements the Intensity and Frequency. THis would help trainers to let the players know when to stop doing certain exercise drills and focus on the drills that they are lacking

2) Create a Team Module which can allow coaches to a) compare historical performances b)compare players against players of other clubs
