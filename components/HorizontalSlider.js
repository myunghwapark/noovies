import React from "react";
import PropTypes from "prop-types";
import Title from "./Title";
import { ScrollView, View } from "react-native";
import Horizontal from "./Horizontal";

const HorizontalSlider = ({title, children}) => (
    <View>
        <Title title={title} />
        <ScrollView
            style={{ marginTop: 20, marginBottom: 40}}
            contentContainerStyle={{paddingLeft: 20}}
            horizontal 
            showsHorizontalScrollIndicator={false}>
            {children}
        </ScrollView>
    </View>
);

Horizontal.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
}

export default HorizontalSlider;