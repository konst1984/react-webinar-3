import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function List({list, render}) {
  return (
    <div className='List'>
      {list.map(render)}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  render: PropTypes.func,
};

List.defaultProps = {
  render: () => {
  }
}

export default List;
