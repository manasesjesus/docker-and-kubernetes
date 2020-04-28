import React from "react";
import { Link } from "react-router-dom";

export default () => {
    return (
        <div>
            <p>This is a second page!</p>
            <Link to="/">Go back ;)</Link>
        </div>
    );
};
