import React from 'react'
import classes from "./Header.module.css";

const Header = () => {
  return (
    // using header tag for better semantics
    <header className={classes["header-container"]}>
      <h1 className={classes["header-title"]}>Rick and Morty</h1>
    </header>
  )
}

export default Header