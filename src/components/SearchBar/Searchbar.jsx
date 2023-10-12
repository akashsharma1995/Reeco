import React from 'react';
import styles from './searchbar.module.css';
import searchIcon from '../../searchIcon.svg';

const Searchbar = () => {
  return (
    <div className={styles.container}>
      <input placeholder='Search...' className={styles.input}/>
      <img src={searchIcon} className={styles.icon} alt="search"/>
    </div>
    
  )
}

export default Searchbar