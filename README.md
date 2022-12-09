Project Name & Pitch
TMBD Movie&TV Show App
An application used to display the top 10 most popular TV Shows and movies from TMDB, search data by keyword and see details about shows and movies built with React, TypeScript, HTML, and CSS
 
Testing the app

 I created a demo website that you can visit and test all the functionalities that were required. 

The demo website can be found at this link: <a href='react-movie-test.42web.io'>Here</a>


**NOTE: In the test assignment, there was a requirement that said if a TV/Movie had a trailer, the trailer should be displayed in detail view instead of an image. However, TMDB does not return any data about the TV Show’s trailer at all, as for the movies, it returns only a boolean value for the property ‘video’, but there is still no URL to the video that should be displayed. Therefore, I set it up so it always shows wallpaper in detail view.**


If you want to test the app locally, you need to clone down this repository. You will need node and npm installed globally on your machine.
Then, you should run a command to install serve
npm install -g serve
After that, you should run the following command to serve the build folder on localhost: 
serve -s build
This command will serve the app on localhost:3000 if it is available, if not it will choose a random port. 
