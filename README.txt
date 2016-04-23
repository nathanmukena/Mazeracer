README CSC309 A3

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
LIVE VERSION:

for a live version visit cs.utm.utoronto.ca/~singhdi1/mazeracer
It may be up if the servers are running.

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
GROUP MEMBERS:

Kamal Aslam aslamkam
Nathan Mukena 
Dilraj Singh 994837637 singhdi1
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
ABOUT THE GAME:

    - Every page has a favicon shaped as a labyrinth which we believe is most
      appropriate for this game.
    - in total there are four pages numbered below with features highlighted
    - we used wss which Larry recommended to us

1) Main Page
    - Simple HTML page that uses hashtags to move down the page

2) Game Page
    - Pop up box that indicates that you have successfully connected or disconnected
    - Pop up box that indicates if there was some sort of disconnection with the server. This
      ensures that users are aware of any backend issues.	
	- gif title 
	- Chat room so players can talk to each other
	- Game that uses HTML5 canvas
	        - uses keyboard to move, can press two keys at once
		- We added a prevent scroll feature so that the page doesn't go down when you
		  move the ball.
		- Balls can collide with one another
		- Maze tunnels are usually large enough to avoid players blocking one another. 
		- Five unique mazes, some of which have multiple routes, some which have one 
		  route to victory. They are randomly chosen. Variety we believe keeps it 
                  interesting and fun!
	- Music that loops forever unless you pause it.
	- Music Play / Pause Button that uses hover effect
	- CSS Media Query used to create appropriate looking page for mobile
	- Mobile phone controls use X & Y directions, if the phone is held horizontally the ball
	  stop moving allowing the player to stop the ball and think.

3) Win Page
    - HTML5 canvas graphics displayed
    - Play Again Button that uses hover effect
4) Lose Page
    - Play Again Button that uses hover effect

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
IMPORTANT NOTES:

    - we tested the game on various mobile phones. For best results please use the latests phones.
      The game for example worked well on the Samsung Galaxy S4 phone but not on a Nexus 4. On
      iPhone's the polarity of the mobile controls oddly reversed.
