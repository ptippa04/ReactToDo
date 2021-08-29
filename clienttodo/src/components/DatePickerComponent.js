import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

const DatePickerComponent = React.forwardRef((props,ref) => {

    return (
      //  <button onClick={props.onClick} ref={ref}>
      //    {props.value || props.placeholder}
      //  </button>
<>
      <label style={{backgroundColor:"White",color:"black",marginLeft:"50px", paddingInlineEnd: "5px",paddingInlineStart:"5px"}} onClick={props.onClick} ref={ref}>
      {props.value || props.placeholder}

      <FontAwesomeIcon icon={faCalendarAlt} onClick={props.onClick} />
    </label>
    
    </>
    )

})

export default DatePickerComponent;