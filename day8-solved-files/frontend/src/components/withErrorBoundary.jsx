<<<<<<< HEAD
<<<<<<< HEAD
// withErrorBoundary HOC: wraps a component in an error boundary.
=======
// TICKET-ADV113 — withErrorBoundary HOC: wraps a component in an error boundary.
>>>>>>> c2757038 (daywise-files)
=======
// withErrorBoundary HOC: wraps a component in an error boundary.
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
<<<<<<< HEAD
<<<<<<< HEAD
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // In real prod we'd ship this to Sentry / a browser-side logger.
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught', error, info);
  }

  handleReset() {
    this.setState({ error: null });
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" className="error-fallback">
          <h2>Something went wrong</h2>
          <pre>{String(this.state.error.message || this.state.error)}</pre>
          <button type="button" onClick={this.handleReset}>Try again</button>
        </div>
      );
    }
=======
=======
    this.handleReset = this.handleReset.bind(this);
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // In real prod we'd ship this to Sentry / a browser-side logger.
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught', error, info);
  }

  handleReset() {
    this.setState({ error: null });
  }

  render() {
<<<<<<< HEAD
    // TODO(TICKET-ADV113): if this.state.error is set, render an
    //                     accessible fallback with a "Try again" button that
    //                     clears the error state. Otherwise render children.
>>>>>>> c2757038 (daywise-files)
=======
    if (this.state.error) {
      return (
        <div role="alert" className="error-fallback">
          <h2>Something went wrong</h2>
          <pre>{String(this.state.error.message || this.state.error)}</pre>
          <button type="button" onClick={this.handleReset}>Try again</button>
        </div>
      );
    }
>>>>>>> a48c151f (checkpoint: staged reverts + solved-file writes + WHERE-TO-PASTE updates before build verification)
    return this.props.children;
  }
}

export function withErrorBoundary(Component) {
  function WithErrorBoundary(props) {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  }
  WithErrorBoundary.displayName = `withErrorBoundary(${Component.displayName || Component.name || 'Component'})`;
  return WithErrorBoundary;
}
