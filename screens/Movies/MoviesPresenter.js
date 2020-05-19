import React from "react";
import styled from "styled-components/native";
import { Dimensions, ScrollView } from "react-native";
import Slide from "../../components/Slide";
import Title from "../../components/Title";
import Vertical from "../../components/Vertical";
import Horizontal from "../../components/Horizontal";
import ScrollContainer from "../../components/ScrollContainer";
import HorizontalSlider from "../../components/HorizontalSlider";
import List from "../../components/List";
import MainSlider from "../../components/MainSlider";



const Container = styled.View``;


export default ({ refreshFn, loading, nowPlaying, popular, upcoming }) => (
    <ScrollContainer refreshFn={refreshFn} loading={loading}>
        <>
            <MainSlider>
                    {nowPlaying.map(movie => (
                        <Slide 
                            key={movie.id}
                            id={movie.id}
                            title={movie.original_title}
                            overview={movie.overview}
                            votes={movie.vote_average}
                            backgroundImage={movie.backdrop_path}
                            poster={movie.poster_path}
                        />
                    ))}
                </MainSlider>
            <Container>
                <HorizontalSlider title={"Popular Movies"}>
                    {popular.map(movie => 
                    <Vertical 
                        id={movie.id}
                        key={movie.id} 
                        poster={movie.poster_path} 
                        title={movie.original_title} 
                        votes={movie.vote_average} />
                    )}
                </HorizontalSlider>
                 <List title="Coming Soon">
                    {upcoming.map(movie => (
                        <Horizontal
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            releaseDate={movie.release_date}
                            poster={movie.poster_path}
                            overview={movie.overview}
                        />
                    ))}
                </List>
            </Container>
        </>
    </ScrollContainer>
    
)