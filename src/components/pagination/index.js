import React from 'react';
import PropTypes from "prop-types";
import usePagination from "./use-pagination";
import {cn as bem} from "@bem-react/classname";
import './style.css';

const Pagination = (props) => {

  const cn = bem('Pagination');

  const slidingWindowPages = usePagination(props.currentPage,props.totalPages)

  return (
    <div className={cn()}>
        {slidingWindowPages.map(props.renderItem)}
    </div>
  );
};

Pagination.propTypes ={
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  renderItem: PropTypes.func
}

Pagination.defaultProps = {
  currentPage: 1,
  totalPages: 0,
  renderItem: () => {}
}

export default React.memo(Pagination);
