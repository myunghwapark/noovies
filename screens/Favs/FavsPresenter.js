import React, { useState } from "react";
import { PanResponder, Dimensions, Animated } from "react-native";
import styled from "styled-components/native";
import { apiImage } from "../../api";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Container = styled.View`
  flex: 1;
  background-color: black;
  align-items: center;
`;

const styles = {
  top: 40,
  height: HEIGHT / 1.5,
  width: "90%",
  position: "absolute"
};

const Poster = styled.Image`
  border-radius: 20px;
  width: 100%;
  height: 100%;
`;

export default ({ results }) => {
    const [topIndex, setTopIndex] = useState(0);
    const lastCardAction = () => {
        if(topIndex === results.length -1) {
            results.map((result, index) => {
                position.setValue({x: 0, y: 0});
            })
            setTopIndex(0);
        }
    }
    const nextCard = () => {
        setTopIndex(currentValue => currentValue + 1);
        lastCardAction();
    }
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        // dx is the drag distance to x
        onPanResponderMove: (evt, {dx, dy}) => {
            position.setValue({x: dx, y: dy})
        },
        onPanResponderRelease: (evt, {dx, dy}) => {
            // discard to the right
            if(dx >= 200) {
                Animated.spring(position, {
                    toValue: {
                        x: WIDTH + 100,
                        y: dy
                    }
                }).start(nextCard);
            } 
            // discard to the left
            else if(dx <= -200) {
                Animated.spring(position, {
                    toValue: {
                        x: -WIDTH - 100,
                        y: dy
                    }
                }).start(nextCard);
            }
            else {
                Animated.spring(position, {
                    toValue: {
                        x: 0,
                        y: 0
                    },
                    bounciness: 10
                    /*
                    friction:1
                    */
                }).start();
            }

        }
    });

    /* 
        Must write Range like if you start negative, end positive
        When x value is -100, change the angle to -5deg, (0 -> 0deg, 100 -> 5deg)
    */
    const rotationValues = position.x.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ["-5deg", "0deg", "5deg"],
        extrapolate: "clamp"    // limitation
    });

    const secondCardOpacity = position.x.interpolate({
        inputRange: [-255, 0, 255],
        outputRange: [1, 0.5, 1],
        extrapolate: "clamp"
    });

    const secondCardScale = position.x.interpolate({
        inputRange: [-255, 0, 255],
        outputRange: [1, 0.8, 1],
        extrapolate: "clamp"
    });
    
  return (
    <Container>
      {results.map((result, index) => {
          
          if(index < topIndex) {
              return null;
          }
          
          if(index === topIndex) {
              return (
                <Animated.View 
                    style={{
                        ...styles,
                        zIndex: 1,
                        transform: [ {rotate: rotationValues}, ...position.getTranslateTransform() ]
                    }}
                    key={result.id} 
                    {...panResponder.panHandlers}>
                <Poster source={{ uri: apiImage(result.poster_path) }} />
                </Animated.View>
              )
          }
          else if(index === topIndex +1) {
              return (
                <Animated.View 
                    style={{
                        ...styles,
                        zIndex: -index,
                        opacity: secondCardOpacity,
                        transform: [
                            {scale: secondCardScale}
                        ]
                    }}
                    key={result.id} 
                    {...panResponder.panHandlers}>
                  <Poster source={{ uri: apiImage(result.poster_path) }} />
                </Animated.View>
              )
          } else {
            return (
                <Animated.View 
                    style={{
                        ...styles,
                        zIndex: -index,
                        opacity: 0
                    }}
                    key={result.id} 
                    {...panResponder.panHandlers}>
                <Poster source={{ uri: apiImage(result.poster_path) }} />
                </Animated.View>
            )
        }
      })}
    </Container>
  );
};