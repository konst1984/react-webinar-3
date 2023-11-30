import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {
    onClick: () => {
      props.onClick(props.item.code);
    },
  }

  return (
    <div className='Item'>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>{props.item.price} ₽</div>
      {props.children}
      <div className='Item-actions'>
        <button onClick={callbacks.onClick}>
          {props.actionTitle}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  actionTitle: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

Item.defaultProps = {
  onClick: () => {
  },
}

export default React.memo(Item);
