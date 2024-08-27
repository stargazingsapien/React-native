import React, { useState } from 'react';
import {View, Text, Button} from 'react-native'

const App = () => {
  interface User {
    id: number;
    firstName: string;
  }


  const [message, setMessage] = useState('Hello! This is nisarg here.');
  const [userData, setUserData] = useState<User[] | null>(null);

  const handlePress = () => {
    setMessage('The text has been updated!');
  };

  const fetchUserData = async () => {
    try {
      const url = 'https://dummyjson.com/users';
      let response = await fetch(url);
      let result = await response.json();
      console.log("This is try!!");
      setUserData(result.users); 
      
    } catch (error) {
      console.log("Error" , error);
      setMessage("Something went wrong!")    
      
    }
    
  };
  return (
      <View>
        <Text>{message}</Text>
        <Button title="Update Text" onPress={handlePress} />
        <Button title="Fetch User Data" onPress={fetchUserData} />
        {userData && (
          <View>
            <Text>Users:</Text>
            {userData.map((user) => (
              <Text key={user.id}>{user.firstName}</Text>
            ))}
          </View>
        )}
      </View>
  );
}

export default App;
