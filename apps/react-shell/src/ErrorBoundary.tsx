import React, {ErrorInfo, Component} from "react";

export default class ErrorBoundary extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error: any) {
    return {hasError: true};
  }

  componentDidCatch(error:Error, errorInfo:ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>Render Error.</div>
      )
    }
    return this.props.children;
  }
}
