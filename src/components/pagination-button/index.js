import React from 'react';
import 'style.css'
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

const PaginationButton = (props) => {

  const cn = bem('PagButton');
  const callbacks = {
    setPage: () => props.switchCurrentPage(props.item)
  }

  return (
    <button
      className={cn(props.currentPage === props.item ? { '': "active" } : "")}
      disabled={isNaN(props.item)}
      onClick={callbacks.setPage}
    >
      {props.item}
    </button>
  );
};

PaginationButton.propTypes ={
  currentPage: PropTypes.number,
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  switchCurrentPage: PropTypes.func
}

PaginationButton.defaultProps = {
  currentPage: 1,
  item: 1,
  switchCurrentPage: () => {}
}

export default PaginationButton;
