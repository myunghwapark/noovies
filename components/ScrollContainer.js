import React, { useState } from "react";
import PropTypes from "prop-types";
import { ScrollView, ActivityIndicator, RefreshControl } from "react-native";

const ScrollContainer = ({loading, children, contentContainerStyle, refreshFn}) => {

  const [refreshing, setRefresing] = useState(false);
  const onRefrech = async () => {
      setRefresing(true);
      await refreshFn();
      setRefresing(false);
  }
  return (
    <ScrollView 
        refreshControl=
            {<RefreshControl 
                onRefresh={onRefrech}
                refreshing={refreshing}
                enabled={false}
                tintColor={"white"} 
            />}
        style={{ backgroundColor: "black" }}
            contentContainerStyle={{
                flex: loading ? 1 : "auto",
                justifyContent: loading ? "center" : "flex-start",
                ...contentContainerStyle
            }}>
        {loading ? 
        <ActivityIndicator color="white" size="small" />
         : children}
    </ScrollView>
)};

ScrollContainer.propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    contentContainerStyle: PropTypes.object,
    refreshFn: PropTypes.func
};

export default ScrollContainer;