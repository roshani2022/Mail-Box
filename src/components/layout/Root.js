import { Fragment } from "react";
import Welcome from "../Pages/WelCome";

const Root = (props) => {
  return (
    <Fragment>
        <Welcome/>
        <main>
        {props.children}
        </main>
    </Fragment>
  )
}

export default Root;