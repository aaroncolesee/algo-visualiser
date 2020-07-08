import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import SortingVisualiser from "./SortingVisualiser/SortingVisualiser";
import "./SortingVisualiser/SortingVisualiser.css";
import PathfindingVisualiser from "./PathfindingVisualiser/PathfindingVisualiser";
import { NavigationBar } from "./components/NavigationBar";

export default function App() {
  return (
    <React.Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={SortingVisualiser} />
          <Route path="/sorting" component={SortingVisualiser} />
          <Route path="/pathfinding" component={PathfindingVisualiser} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}
