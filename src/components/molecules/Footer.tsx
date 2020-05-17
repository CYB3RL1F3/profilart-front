import React, { FC } from "react";
import { Link } from "react-router-dom";
import paths from "paths";

export const Footer: FC = () => (
  <footer>© Profilart - {(new Date()).getFullYear()} - <span className="rights">All rights reserved. - </span><Link to={paths.support} >Contact support</Link> - <a href="https://profilart.fr/swagger" >Swagger API</a></footer>
);

export default Footer;