import { moviesApi, tvApi } from "api";
import React from "react";
import DetailPresenter from "./DetailPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;

    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie")
    };
  }


  async componentDidMount() {

    const {
      match: {
        params: { id }
      },
      history: { push },
    } = this.props;

    const parseId = parseInt(id);
    if (isNaN(parseId)) {
      return push("/");
    }

    const { isMovie } = this.state;
    let result;

    try {
      if (isMovie) {
        ({data: result} = await moviesApi.movieDetail(parseId));
      } else {
        ({data: result} = await tvApi.showDetail(parseId));
      }
    } catch (error) {
      this.setState({
        error: "Can't find",
      })
    } finally {
      this.setState({
        loading: false,
        result: result
      })
    }
  }

  render() {
    const { result, error, loading } = this.state;
    console.log(this.state);
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
      />
    );
  }
}