import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';

export default function App() {
  const [display, setDisplay] = useState("0");
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = (value) => {
    animatePress();
    if (value === 'C') {
      setDisplay("0");
    } else if (value === '=') {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay((prev) => (prev === "0" ? value : prev + value));
    }
  };

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
    ['C']
  ];

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.display, { transform: [{ scale: scaleAnim }] }]}>
        {display}
      </Animated.Text>
      <View style={styles.buttonContainer}>
        {buttons.flat().map((btn, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={() => handlePress(btn)}>
            <Text style={styles.buttonText}>{btn}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  display: {
    color: '#fff',
    fontSize: 60,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#333',
    width: '22%',
    margin: '2%',
    aspectRatio: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
  },
});
