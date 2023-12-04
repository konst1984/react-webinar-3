import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Item from "../item";

function List(props) {
  return (
    <div className='List'>
      {props.renderItems(props.list)}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string
  })).isRequired,
  renderItems: PropTypes.func,
};

List.defaultProps = {
  renderItems: () => {}
}

export default List;
