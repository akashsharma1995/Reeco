import React from 'react';
import styles from './orderDetails.module.css';
import { useSelector } from 'react-redux';
import { isEmpty, months } from '../../utils/common';

const OrderDetail = ({ item }) => {
  return (
    <div className={styles.detail}>
      <div className={styles.label}>{item.label}</div>
      <div className={styles.value}>{item.value}</div>
    </div>
  )
}

const getDate = (dateString) => {
  const d = new Date(dateString);
  return ` ${d.toString().split(' ')[0]}, ${months[d.getMonth()]} ${d.getDate()}`
}

const OrderDetails = () => {
  const { orderData } = useSelector(state => state.order);

  if(isEmpty(orderData)) {
    return;
  }

  const data = [
    {
      label: "Supplier",
      value: orderData.supplier
    },
    {
      label: "Shipping Date",
      value: getDate(orderData.shippingDate)
    },
    {
      label: "Total",
      value: `${orderData.currency}${orderData.total}`
    },
    {
      label: "Category",
      value: orderData.category
    },
    {
      label: "Department",
      value: orderData.department
    },
    {
      label: "Status",
      value: orderData.approved ? "Approved" : "Awaiting your approval"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {
          data.map((item) => <OrderDetail key={item.label} item={item}/>)
        }
      </div>
    </div>
  )
}

export default OrderDetails;