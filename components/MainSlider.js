import React from "react";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import { Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const SliderContainer = styled.View`
    width: 100%
    height: ${HEIGHT / 3.5}px;
    margin-bottom: 50px;
`;

const MainSlider = ({children}) => (
    <SliderContainer>
        <Swiper controlsEnabled={false} loop timeout={3}>
            {children}
        </Swiper>
    </SliderContainer>
);

export default MainSlider;