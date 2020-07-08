import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import SortingVisualiser from "./SortingVisualiser/SortingVisualiser";
import "./SortingVisualiser/SortingVisualiser.css";
import PathfindingVisualiser from "./PathfindingVisualiser/PathfindingVisualiser";
import { NavigationBar } from "./components/NavigationBar";

export default function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Router>
        <Switch>
          <Route
            path="/algo-visualiser/sorting"
            component={SortingVisualiser}
          />
          <Route
            path="/algo-visualiser/pathfinding"
            component={PathfindingVisualiser}
          />
        </Switch>
      </Router>
    </React.Fragment>
  );
}
