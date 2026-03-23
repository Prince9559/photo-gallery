import React, { useState } from "react";
import Upload from "./components/Upload";
import Gallery from "./components/Gallery";
import Login from "./components/Login";
import Logout from"./components/Logout";

function App() {

  return(
    <div>
      <Upload></Upload>
      <hr />
      <Gallery></Gallery>
      <Login></Login>
      <Logout></Logout>
    </div>
  )

}
export default App;