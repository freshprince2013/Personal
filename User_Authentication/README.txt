 ____ ___                        _____          __  .__                   __  .__               __  .__               
|    |   \______ ___________    /  _  \  __ ___/  |_|  |__   ____   _____/  |_|__| ____ _____ _/  |_|__| ____   ____  
|    |   /  ___// __ \_  __ \  /  /_\  \|  |  \   __\  |  \_/ __ \ /    \   __\  |/ ___\\__  \\   __\  |/  _ \ /    \ 
|    |  /\___ \\  ___/|  | \/ /    |    \  |  /|  | |   Y  \  ___/|   |  \  | |  \  \___ / __ \|  | |  (  <_> )   |  \
|______//____  >\___  >__|    \____|__  /____/ |__| |___|  /\___  >___|  /__| |__|\___  >____  /__| |__|\____/|___|  /
             \/     \/                \/                 \/     \/     \/             \/     \/                    \/ 

Overview:

This mini project demonstrates user authentication using bash shell scripts and then saves his info onto a friends.txt file.

Details:

The system first prompts the user whether he currently has an account with us?

1) If the user inputs "y" or "Y" (Yes), the system prompts the user to enter his credentials. If the user credentials are correct, the user 
   is authenticated to the system. The system then asks the user whether he would like to edit his info?

	a) If the user inputs "y" or "Y" (Yes) again, the system prompts the user to edit his info (like name, age, gender, background etc) and 
	   saves his updated info onto the "friends.txt" file.
	
	b) If the user inputs "n" or "N" (No), the system prints a message saying he can change his account info at anytime by logging again and
	   terminates the program.
	
	c) If the user inputs anything other than Yes/No, the system prints a message saying "Invalid input" and terminates from the program.

2) If the user inputs "n" or "N" (No), then system prompts the user to choose his credentials and registers him onto the system. While the user
   chooses his credentials, each field (username and password) is validated. Also, the username is checked against the "friends.txt" file to determine 
   uniqueness. If username is NOT unique, the system prompts the user to re-create his username.
   
   Once all the user credentials are created, the system registers the user and asks him whether he would like to add more info?
   
   a) If the user inputs "y" or "Y" (Yes), the system prompts the user to add his info (like name, age, gender, background etc) and 
	   saves his new info with credentials onto the "friends.txt" file.
	   
   b) If the user inputs "n" or "N" (No), the system saves his credentials only onto "friends.txt" file and terminates the program.
   
   c) If the user inputs anything other than Yes/No, the system prints a message saying "Invalid input" and terminates from the program.
   
3) If the user inputs anything other than Yes/No, the system prints a message saying "Invalid input" and terminates from the program.
   
Code Sample: 
Please check authenticate.sh and friends.txt file.

Technology Stack:
Bash Shell Scripting on Linux UBuntu 12.04 Operating System