import React, { Component } from 'react'
import NavBar from './component/NavBar'
import News from './component/News'
import ErrorBoundary from './component/ErrorBoundary'

export default class App extends Component {
    render() {
        return (
            <div>
                <ErrorBoundary>
                    <NavBar />
                    <News />
                </ErrorBoundary>
            </div>
        )
    }
}
