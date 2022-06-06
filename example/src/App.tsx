import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import {
  Connections,
  // deauthTerra,
  getBody,
  initTerra,
  Permissions,
} from 'terra-react';

export default function App() {
  // can also use a .env file
  const devID = 'dev-id';
  const apiKey = 'api-key';

  // after showing the widget to the users
  // initialise accordingle which connection / reference_id
  // example if user wants connect Google using SDK
  // you can have multiple connections in the array
  function initThings() {
    initTerra(
      devID,
      apiKey,
      'refid',
      60,
      [Connections.GOOGLE],
      [Permissions.BODY, Permissions.DAILY]
    ).then((d) => {
      console.log(d); // returns details such as success and user id

      // make a backfill request
      getBody(Connections.GOOGLE, new Date(), new Date())
        .then((d) => console.log(d))
        .catch((e) => console.log(e));
    });

    // deauth example
    // deauthTerra(Connections.GOOGLE);
  }

  React.useEffect(() => {
    initThings();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Hello from Terra</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
