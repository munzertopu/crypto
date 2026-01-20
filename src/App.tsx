import React from "react";
import Application from "./Application";
import RouteManager from "./RouteManager";
import "./App.css";

interface AppProps {
  app: Application;
}

const App: React.FC<AppProps> = ({ app }) => {
  return (
    <div className="App">
      <RouteManager app={app} />
    </div>
  );
};

export default App;
