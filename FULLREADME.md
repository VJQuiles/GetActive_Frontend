# GetActive Full Project Overview

This is the readme for the full stack project GetActive. For readme's on the front end or backend particular, please either check the other readme in this file, or refer to the one of the following links(whichever repo you're not in):

https://github.com/VJQuiles/GetActive_Backend

https://github.com/VJQuiles/GetActive_Frontend

## How to use

Head over to the front end deployment site to be able to use both the frontend and the backend:

https://getactive-frontend.onrender.com/

If you would like to see the backend deployment, head to this link: 

https://getactive-backend.onrender.com

NOTE: SOmetimes it can take the backend some time to warmup. Please give it a few minutes when you first launch it.


## Planning

I went old school on this project, and used a notepad and pen for the planning process. I think the simplicity of planning withthose instruments, made the visioning for the project simple as well. 

I started with what I knew would be my strong suit: the backend. Essentially I just had to take what I had done in my backend development, and change little parts here and there, while also dealing with the stock exercises I wanted included. That wasn't dealt with until the actual project though, as I had not really fleshed that out throughly beforehand.

The mapping I did was the file structure, and mapping of the data models. 

From there I dug in. 


For the frontend, I decided to wait on my approach there until I had completed my backedn. I wanted to ensure the backend and middle tier was set up before diverting all my attention to the front end. 

The preparation for this was mostly visualizing how pages would be structured and where components would lie. The importance of this was more about mapping the data out to it's respective places, as I have learned about myself is that I may plan out one layout style, only to decide something else looks better. But what helps to stay anchored is knowing WHAT you want in your pages and components. 

Trying to look ahead to where state would live was also important, as well as how i woud need to leverage context to avoid prop drilling. 

It felt like more thank anything, the notepad helped as a space to "think out loud" and try and center my focus on what to work on next. 

## Development

The readmes for each section discuss what roadblocks I hit, but I can bear to repeat them here. 

In the backend, considering how to handle the coreExercises model took a bit of reflection and research. I largely had the backend working and added the exercises at the end. Originally i intended to protect those workouts, but after consideration, I felt the time to figure out how to make a distinction between those exercises and custom exercises would be too better spent on the front end. So i decided to create a new model, that only I could access on the backend and handle additions through postman.

In the front end, I had to dedicate a good amount of time to refreshing myself on React. Thankfully our IA also did a fullstack speedrun, with a focus on CI/CD that also served as a bit of a react review. That, paired with youtube and a lot of reading helped to get me going. 

From there, handling the tokens gave me a good run for my money. Mostly because we had't really dealt with api requests with headers since covering typescript and advanced javascript about 2 months ago. But between some research I did, as well as seeing the implementation of one of my classmates, Dennis, on another assigned project, helped to give me an understanding in how to handle the tokens. And from there it was a matter of learning how to best use axios vs fetch.

## Reflection

All in all, I feel this was great practice in understanding how a fullstack application works from front end to backedn. ANd to be honest, it's pretty awesome to gain insight into things we use everyday, but don't always take the time to engage with. 

I know i look at applications I use differently, I find myself researching errors i encounter in applications I use, and i ponder a lot about some of the features I find the coolest. 
