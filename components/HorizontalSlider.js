import React from "react";
import PropTypes from "prop-types";
import Title from "./Title";
import { ScrollView } from "react-native";
import Horizontal from "./Horizontal";

const HorizontalSlider = ({title, children}) => (
    <>
        <Title title={title} />
        <ScrollView
            style={{ marginTop: 20, marginBottom: 40}}
            contentContainerStyle={{paddingLeft: 20}}
            horizontal 
            showsHorizontalScrollIndicator={false}>
            {children}
        </ScrollView>
    </>
);

Horizontal.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default HorizontalSlider;