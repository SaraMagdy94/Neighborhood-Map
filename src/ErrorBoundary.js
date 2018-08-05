import React, { Component } from 'react';


class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ haveError: true });
        console.log(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <p className="error">Something went wrong with Google Maps</p>
        }
        return this.props.children;
    }
}

export default ErrorBoundary