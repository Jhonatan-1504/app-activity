import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ActivitiesProvider } from "../context/Activities";
import { ConfigProvider } from "../context/Configuration";

import Activities from "../page/Activities/Activities";
import ConfigurationComponent from "../page/Configuration";
import List from "../page/List/List";
import Layout from "../page/Layout";
import { FormProvider } from "../context/FormActivity";

const ActivitiesRouter = () => {
  return (
    <ConfigProvider>
      <ActivitiesProvider>
        <BrowserRouter>
          <Switch>
            <Layout>
              <FormProvider>
                <Route path="/" exact component={Activities} />
              </FormProvider>
              <Route path="/config" exact component={ConfigurationComponent} />
              <Route path="/list" component={List} />
            </Layout>
          </Switch>
        </BrowserRouter>
      </ActivitiesProvider>
    </ConfigProvider>
  );
};

export default ActivitiesRouter;
