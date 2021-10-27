import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ActivitiesProvider } from "../context/Activities";
import { ConfigProvider } from "../context/Configuration";
import Activities from "../page/Activities";

import Home from "../page/Home";
import Layout from "../page/Layout";
import List from "../page/List";

const ActivitiesRouter = () => {
  return (
    <ConfigProvider>
      <ActivitiesProvider>
        <BrowserRouter>
          <Switch>
            <Layout>
              <Route path="/" exact component={Home} />
              <Route path="/Acitivity" exact component={Activities} />
              <Route path="/List" component={List} />
            </Layout>
          </Switch>
        </BrowserRouter>
      </ActivitiesProvider>
    </ConfigProvider>
  );
};

export default ActivitiesRouter;
