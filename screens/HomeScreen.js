import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Location, Permissions } from "expo";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Today"
  };

  state = { data: null, location: null };

  // componentDidMount() {
  //   this.getWeatherData();
  // }

  getWeatherData = async () => {
    const location = await this.getLocationAsync();
    if (location) {
      const { latitude, longitude } = location.coords;
      const data = await fetch(
        `https://api.darksky.net/forecast/bb14c0a3ab50cea1374f560ff25bdae0/${latitude},${longitude}/?units=auto`
      ).then(res => res.json());
      this.setState({ data });
    } else {
      this.setState({ error: "Unable to get device location" });
    }
  };

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      return null;
    }
    return await Location.getCurrentPositionAsync({});
  };

  render() {
    const { error, data } = this.state;
    return (
      <View style={styles.container}>
        {error && <Text>{error}</Text>}
        <Button title="Reload" onPress={this.getWeatherData} />
        {data && (
          <View>
            <Text>{data.currently.summary}</Text>
            <Text>{data.currently.temperature}</Text>
          </View>
        )}
        <Text>Weather: {JSON.stringify(data)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
