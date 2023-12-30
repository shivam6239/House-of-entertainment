import React, { Component } from 'react';
import axios from 'axios';
import { CircularProgress, Rating, Typography } from '@mui/material';

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
const POSTER_ROOT = process.env.REACT_APP_TMDB_POSTER;

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
    };
    this.getTodos = this.getTodos.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  async getTodos() {
    let data;
    const link = `https://api.themoviedb.org/3/find/${this.props.movie[1]}?api_key=172856b2ece7e944afe4b095011305f2&external_source=imdb_id`;
    let js; let title; let rating; let
      poster_path;
    await axios.get(link).then((r) => (js = r.data));
    for (const jsKey in js) {
      if (js[jsKey].length !== 0) {
        if (jsKey === 'movie_results') {
          // release_date = js[jsKey][0]["release_date"]
          title = js[jsKey][0].title;
        } else if (jsKey === 'tv_results') {
          // release_date = js[jsKey][0]["first_air_date"]
          title = js[jsKey][0].name;
        }
        // overview = js[jsKey][0]["overview"]
        rating = js[jsKey][0].vote_average;
        poster_path = js[jsKey][0].poster_path;
        // if (js[jsKey][0]["backdrop_path"] !== null) {
        //   backdrop_path = js[jsKey][0]["backdrop_path"]
        // }
      }
    }
    data = [title, rating, poster_path];
    this.setState({ arr: data });
    console.log("dbfhdhsnbfh",POSTER_ROOT);
  }

  render() {
    const { arr } = this.state;
    return (
      <div style={{ width: 'inherit' }}>
        {arr ? (
          <div style={{ width: 'inherit' }}>
            {/**/}
            <div style={{ width: 'inherit' }}>
              {/* POSTER_ROOT + arr[2] */}
              <img
                src={"https://image.tmdb.org/t/p/original" + arr[2]}
                style={{ width: 'inherit' }}
                alt="poster"
              />
            </div>

            <div align="left" style={{ position: 'relative' }}>
              <Rating
                name="half-rating-read"
                defaultValue={(arr[1] * 1.0) / 2}
                precision={0.5}
                readOnly
              />
              <Typography
                component="h6"
                color="whitesmoke"
                width="auto"
                variant="body2"
              >
                {arr[0]}
              </Typography>
            </div>
          </div>
        ) : (
          <div>
            <CircularProgress />
          </div>
        )}
      </div>
    );
  }
}

export default MovieList;
