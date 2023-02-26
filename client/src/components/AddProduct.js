import React, { useEffect } from "react";

const AddProduct = (props) => {

  useEffect(() => {
    props.setShowNav(false);
  })
  
  return (
    <div class="container">
      <form action="" method="POST">
        <div class="input">
          <input type="text" name="Username" placeholder="Username" />
          <span></span>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
