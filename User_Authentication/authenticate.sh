#!\bin\bash
# Mini Project #2 - User Authentication and adding them into friends list using bash scripts

echo -e "Do you currently have an account with us? (y/n) \c"
read -n 1 input

Register()
{ 
	echo -e "\nChoose your username: \c"
	read username1;
	Validate $username1 "user"
	
	echo -e "Choose your password: \c"
	read -s password1;
	Validate $password1 "pass"
	
	echo -e "Confirm your password: \c"
	read -s confirm1;
	Validate $confirm1 "conf"
	
	echo -e "Would you like to add more info? (y/n) \c"
	read -n 1 more;
	
	if [[ $more == "y" ]] || [[ $more == "Y" ]]; then 
		addInfo
		sleep 1
		StoreInfo $username1 $password1 "new"
	elif [[ $more == "n" ]] || [[ $more == "N" ]]; then 
		StoreInfo $username1 $password1 "new"
	else 
		echo "Invalid input!"
		exit 1;
	fi
}

Validate()
{ 
	export field=$1;
	export type=$2;
	export flag1=0;
	
	case $type in 
		"user") while read line; do 
				cred=$(echo "$line" | cut -d ";" -f 1 -s);
				user=$(echo "$cred" | cut -d " " -f 1 -s);
				
				if [[ $user == $1 ]]; then 
					flag1=1;
					echo "This username already exists in our database!";
					echo "Please choose a unique username.";
				fi
			done < "friends.txt"
			
			if [[ $flag1 -eq 1 ]]; then 
				echo -e "\nChoose your username: \c"
			        read username1;
			        Validate $username1 "user"
			else 
				if [[ $field =~ ^[a-zA-Z0-9]+$ ]] && [[ ${#field} -ge 2 ]]; then 
					echo "Valid username!"
				else 
					echo "Invalid username!"
					exit 1;
				fi
			fi
			;;
		"pass") if [[ $field =~ "$strong_pw_regex" ]] && [[ ${#field} -ge 8 ]]; then 
				echo -e "\nValid password!"
			else 
				echo -e "\nInvalid password!"
				exit 1;
			fi
			;;
		"conf") if [[ $field == $password1 ]]; then 
				echo -e "\nPasswords match!"
			else
				echo -e "\nPasswords DO NOT match!"
				exit 1;
			fi
			;;
		"name") if [[ $field =~ ^[a-zA-Z]+$ ]] && [[ ${#field} -ge 2 ]]; then 
				echo -e "Valid name!"
			else 
				echo -e "Invalid name!"
				exit 1;
			fi
			;;
		"gender") if [[ $field == "m" ]] || [[ $field == "M" ]] || [[ $field == "f" ]] || [[ $field == "F" ]]; then 
				echo -e "\nValid gender!"
			  else 
				echo -e "\nInvalid gender!"
				exit 1;
			  fi
			;;
		"age") if [[ $field -ge 5 ]] || [[ $field -le 100 ]]; then 
				echo -e "Valid age!"
		       else 
				echo -e "Invalid age!"
				exit 1;
		       fi
			;;
		*) echo -e "\nCannot validate field for this type!"
		   exit 1;
			;;
	esac
}

StoreInfo()
{ 
	export COUNTER=0;
	export action=$3;
	
	if [[ $action == "old" ]]; then 
		export flag=0;
		while read line; do 
			cred=$(echo "$line" | cut -d ";" -f 1 -s);
			user=$(echo "$cred" | cut -d " " -f 1 -s);
			pass=$(echo "$cred" | cut -d " " -f 2 -s);
			
			if [[ $user == $1 ]]; then 
				flag=1;
				if [[ $pass == $2 ]]; then 
					flag=2;
					break;
				else
					echo -e "\nWrong credentials! Please try again later ..."
					exit 1;
				fi
			fi
			
			(( COUNTER++ ));
		done < "friends.txt"
		
		if [[ $flag -eq 2 ]]; then 
			echo -e "\nWould you like to edit your info? \c";
			read -n 1 input1;
			
			if [[ $input1 == "y" ]] || [[ $input1 == "Y" ]]; then
				addInfo;
				sleep 1;
				sed -i "/$1 $2;/d" "friends.txt";
				echo "$1 $2; $name $gender $age $background" >> "friends.txt"
			else 
				echo -e "\nYou may edit your profile at any time. See you soon!"
			fi
		fi
		
		if [[ flag -eq 0 ]]; then 
			echo -e "\nNo records for that username present in database!"
			exit 1;
		fi
	else 
		if [[ $more == "y" ]] || [[ $more == "Y" ]]; then
                        echo "$1 $2; $name $gender $age $background" >> "friends.txt"
                else
			echo "";
                        echo "$1 $2;" >> "friends.txt"
                fi
	fi
}

addInfo()
{ 
	echo -e "\nEnter your first name: \c"
	read name;
	Validate $name "name"
	
	echo -e "Enter your gender (M/F): \c"
	read -n 1 gender;
	Validate $gender "gender"
	
	echo -e "Enter your age: \c"
	read age
	Validate $age "age"
	
	echo -e "Enter your background: \c"
	read background
}

if [[ $input == "y" ]] || [[ $input == "Y" ]]; then 
	echo -e "\nEnter your username: \c"
	read username1;
	
	echo -e "Enter your password: \c"
	read -s password1;
	
	echo "";
	StoreInfo $username1 $password1 "old"
elif [[ $input == "n" ]] || [[ $input == "N" ]]; then 
	Register
else 
	echo "Invalid Input!"
	exit 1;
fi
