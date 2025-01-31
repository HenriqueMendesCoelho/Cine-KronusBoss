import axios from 'axios';
import StringUtils from 'src/core/utils/StringUtils';
import {
  MovieResultResponseTmdb,
  MovieNoteType,
  MoviePageableType,
  MovieRequestType,
  MovieSummaryTypeKit,
} from 'src/core/types/movie/MovieType';
import Movie from 'src/core/domain/movie/movie';

const BASE_URL = process.env.VUE_APP_KB_CINE_API;
const API_MOVIE = `${BASE_URL}/movie`;

export default {
  //Movie TMDB
  async getMovieSummary(movieIdTmdb: string): Promise<MovieSummaryTypeKit> {
    try {
      const res = await axios.get(`${API_MOVIE}/tmdb/${movieIdTmdb}/summary`);
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getMoviesByName(payload: { query: string }): Promise<MovieResultResponseTmdb> {
    const params = StringUtils.getStringParams(payload);
    try {
      const res = await axios.get(`${API_MOVIE}/tmdb?${params}`);
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  //Movie Cine
  async getMovie(movieId: string): Promise<Movie> {
    try {
      const res = await axios.get(`${API_MOVIE}/${movieId}`);
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async listMoviesPageable({
    title,
    sort,
    page = 1,
    size = 30,
    withGenres,
  }: {
    title?: string;
    sort?: string;
    page?: number;
    size?: number;
    withGenres?: string;
  }): Promise<MoviePageableType> {
    let queryParams = `?sort=${sort || 'portugueseTitle,asc'}`;
    queryParams += title ? `&title=${encodeURIComponent(title)}` : '';
    queryParams += page ? `&page=${page}` : '';
    queryParams += size ? `&size=${size}` : '';
    queryParams += withGenres ? `&withGenres=${withGenres}` : '';

    try {
      const res = await axios.get(`${API_MOVIE}${queryParams}`);
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async createMovie(payload: MovieRequestType): Promise<Movie> {
    try {
      const res = await axios.post(`${API_MOVIE}`, payload);
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateMovie(payload: MovieRequestType): Promise<Movie> {
    try {
      const res = await axios.put(`${API_MOVIE}/${payload.id}/update`, payload);
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteMovie(movieId: string): Promise<Movie> {
    try {
      const res = await axios.delete(`${API_MOVIE}/${movieId}/delete`);
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },

  //Genres
  async getMoviesGenres(): Promise<Array<{ id: number; name: string; tmdb_id: number }>> {
    try {
      const res = await axios.get(`${API_MOVIE}/genres`);
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getMoviesGenresWithMovies(): Promise<Array<{ id: number; name: string; tmdb_id: number }>> {
    try {
      const res = await axios.get(`${API_MOVIE}/genres-with-movies`);
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  //Movie Notes
  async createMovieNote(note: number, movieId?: string | Array<string>) {
    try {
      const res = await axios.post(`${API_MOVIE}/note`, { movie_id: movieId, note });
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getMovieNotes(movieId?: string | Array<string>): Promise<Array<MovieNoteType>> {
    try {
      const res = await axios.get(`${API_MOVIE}/note/${movieId}`);
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async updateMovieNotes(note: number, movieId?: string | Array<string>): Promise<Array<MovieNoteType>> {
    try {
      const res = await axios.patch(`${API_MOVIE}/note/${movieId}/update`, { note });
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async deleteMovieNotes(movieId?: string | Array<string>): Promise<Array<MovieNoteType>> {
    try {
      const res = await axios.delete(`${API_MOVIE}/note/${movieId}/delete`);
      return res.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
