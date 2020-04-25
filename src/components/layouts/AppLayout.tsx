import React, { FC } from "react";
import { Layout } from "./AppLayout.styled";
// import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'style/style.scss';
export const AppLayout: FC = ({ children }) => {
  return (
    <Layout>
      {children}
    </Layout>
  )
}

export default AppLayout;