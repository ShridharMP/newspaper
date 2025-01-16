import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {

    static defaultProps = {
        country: 'us',
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        category:PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            pageSize: 6,
            totalResults: 0
        };
    }

    async fetchNews(pageNo) {
        this.setState({ loading: true });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0bc2e6540ffb47ac837386f9e1e9eb35&page=${pageNo}&pageSize=${this.state.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            loading: false,
            page: pageNo,
            totalResults: parsedData.totalResults
        });
    }

    async componentDidMount() {
        this.fetchNews(this.state.page);
    }

    handlePrevPage = async () => {
        if (this.state.page > 1) {
            this.fetchNews(this.state.page - 1);
        }
    }

    handleNextPage = async () => {
        if (this.state.page < Math.ceil(this.state.totalResults / this.state.pageSize)) {
            this.fetchNews(this.state.page + 1);
        }
    }

    render() {
        return (
            <div className='container my-3'>
                {this.state.loading && <Spinner />}
                <h1 className='text-center'>News Monkey Top Headlines</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevPage}>&larr; Previous</button>
                    <button disabled={this.state.page >= Math.ceil(this.state.totalResults / this.state.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextPage}>Next &rarr;</button>
                </div>
            </div>
        );
    }
}

export default News;
