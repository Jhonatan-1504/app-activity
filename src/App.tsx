import { ThemeProvider } from "@fluentui/react";
import ActivitiesRouter from "./routes/ActivitiesRouter";
import { Colors } from "./theme/Theme";

function App() {
  return (
    <ThemeProvider theme={Colors}>
      <ActivitiesRouter />
    </ThemeProvider>
  );
}

export default App;
