import React from "react";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlider from "../../components/HorizontalSlider";
import Vertical from "../../components/Vertical";
import styled from "styled-components/native";
import List from "../../components/List";
import Horizontal from "../../components/Horizontal";
import MainSlider from "../../components/MainSlider";
import Slide from "../../components/Movies/Slide";

const Container = styled.View`
    margin-top: 30px;
`;


export default ({ refreshFn, loading, popular, topRated, today, thisWeek }) => (
    <ScrollContainer refreshFn={refreshFn} loading={loading}>
        <Container>
            <HorizontalSlider title="Popular Shows">
                {popular.map(show => 
                    <Vertical 
                        id={show.id}
                        key={show.id} 
                        poster={show.poster_path} 
                        title={show.name} 
                        votes={show.vote_average} />
                    )}
            </HorizontalSlider>
            <MainSlider>
                {thisWeek.map(show =>(
                    <Slide 
                        key={show.id}
                        id={show.id}
                        title={show.name}
                        overview={show.overview}
                        votes={show.vote_average}
                        backgroundImage={show.backdrop_path}
                        poster={show.poster_path}
                    />
                ))}
            </MainSlider>
            <HorizontalSlider title="Top Rated Shows">
                {topRated.map(show => 
                    <Vertical 
                        id={show.id}
                        key={show.id} 
                        poster={show.poster_path} 
                        title={show.name} 
                        votes={show.vote_average} />
                    )}
            </HorizontalSlider>
            <List title="Airing Today">
                {today.map(show => 
                    <Horizontal 
                        key={show.id} 
                        id={show.id} 
                        title={show.name} 
                        poster={show.poster_path} 
                        overview={show.overview}
                    />
                )}
            </List>
        </Container>
    </ScrollContainer>
);