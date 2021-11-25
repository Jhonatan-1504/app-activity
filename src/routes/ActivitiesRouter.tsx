import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ActivitiesProvider } from "../context/Activities";

import List from "../page/List/List";
import ActivitiesPage from "../page/Activities/ActivitiesPage";
import ConfigPage from "../page/Configuration/ConfigPage";
import Layout from "../page/Layout";
import { FormProvider } from "../context/FormActivity";
import { ConfigurationProvider } from "../context/FormConfig";

const ActivitiesRouter = () => {
  return (
    <ConfigurationProvider>
      <ActivitiesProvider>
        <BrowserRouter>
          <Switch>
            <Layout>
              <FormProvider>
                <Route path="/" exact component={ActivitiesPage} />
              </FormProvider>
              <Route path="/config" exact component={ConfigPage} />
              <Route path="/list" component={List} />
            </Layout>
          </Switch>
        </BrowserRouter>
      </ActivitiesProvider>
    </ConfigurationProvider>
  );
};

export default ActivitiesRouter;
