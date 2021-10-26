import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ConfigProvider } from "../context/Configuration";
import Activities from "../page/Activities";

import Home from "../page/Home";
import Layout from "../page/Layout";

const ActivitiesRouter = () => {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <Switch>
          <Layout>
            <Route path="/" exact component={Home} />
            <Route path="/Acitivity" exact component={Activities} />
          </Layout>
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default ActivitiesRouter;
