import * as React from "react";

interface IProps {
  name: string;
}

class Hello extends React.Component<IProps> {
  render () {
    const {name} = this.props;

    return (
      <React.Fragment>
        <span>Hello {name}!</span>
      </React.Fragment>
    );
  }
}

export default Hello;
