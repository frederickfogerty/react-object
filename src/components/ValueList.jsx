/* eslint no-unused-vars: 0 */
import React from "react";
import Radium from "radium";
import Ellipsis from "./Ellipsis";
import { css, PropTypes } from "./util";
import Text from "./Text";
let Value; // NB: Lazily required to prevent circular-reference.

export const ELLIPSIS = Symbol("ellipsis");


/**
 * A list of <Value>'s.
 */
class ValueList extends React.Component {
  static propTypes = {
    inline: PropTypes.bool,
    italic: Text.propTypes.italic,
    size: Text.propTypes.size,
    items: PropTypes.array,
    level: PropTypes.number,
    collapsedTotal: PropTypes.number // The number of {object} properties to show when not expanded.
  };
  static defaultProps = {
    inline: false,
    italic: Text.defaultProps.italic,
    size: Text.defaultProps.size,
    items: [],
    level: 0
  };

  constructor(props) {
    super(props);
    if (!Value) {
      Value = require("./Value").default; // NB: Lazily required to prevent circular-reference.
    }
  }

  styles() {
    const { inline } = this.props;
    return css({
      base: {
        display: inline ? "inline-block" : null,
        listStyleType: "none",
        margin: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: inline ? 0 : "0.2em",
        fontSize: this.props.size,
        fontStyle: this.props.italic ? "italic" : "normal"
      },
      li: {
        display: this.props.inline ? "inline" : null
      }
    });
  }

  render() {
    const styles = this.styles();
    const { inline, size, italic } = this.props;
    const textStyles = { italic, size };
    const total = this.props.items.length;
    const items = [];
    this.props.items.forEach((item, i) => {
        // Insert the <Value>.
        const isLast = i === total - 1;
        const isEllipsis = item === ELLIPSIS;
        const isNextEllipsis = this.props.items[i + 1] === ELLIPSIS;
        const el = (isEllipsis)
            ? <Ellipsis
                  { ...textStyles }
                  marginLeft={ inline ? (isLast ? 0 : 6) : 12 }
                  marginRight={ (inline && !isLast) ? 6 : 0 }/>
            : <Value
                  { ...textStyles }
                  label={ item.label }
                  value={ item.value }
                  level={ this.props.level + 1 }
                  isExpanded={ false }
                  inline={ this.props.inline }
                  showTwisty={ !inline }
                  collapsedTotal={ this.props.collapsedTotal }/>;
        items.push(<li key={i} style={ styles.li }>{ el }</li>);

        // Inert dividing comma.
        if (inline && !isLast && !isEllipsis && !isNextEllipsis) {
          items.push(
            <Text
                key={ `${ i }-comma` }
                { ...textStyles }
                color="darkGrey"
                marginRight={8}>,</Text>
            );
        }
    });

    return <ul style={ styles.base }>{ items }</ul>;
  }
}

export default Radium(ValueList);
