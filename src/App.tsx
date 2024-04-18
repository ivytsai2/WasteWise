import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SetOutTips from './pages/WasteSetOutTips';
import ScanAndSort from './pages/ScanAndSort';
import CollectionSechdule from './pages/CollectionSechdule';
import DropOffDepots from './pages/DropOffDepots';
import Chatbot from './pages/Chatbot';
import List from './pages/List';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/wastewise">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/wastewise" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route component={Register} path={"/register"} exact />
        <Route component={SetOutTips} path={"/wastewise/recycle"} exact />
        <Route component={SetOutTips} path={"/wastewise/compost"} exact />
        <Route component={SetOutTips} path={"/wastewise/garbage"} exact />
        <Route component={SetOutTips} path={"/wastewise/yard"} exact />
        <Route component={ScanAndSort} path={"/wastewise/scan&sort"} exact />
        <Route component={CollectionSechdule} path={"/wastewise/collection-schedule"} exact />
        <Route component={DropOffDepots} path={"/wastewise/drop-off-location"} exact />
        <Route component={Chatbot} path={"/wastewise/chatbot"} exact />
        <Route component={List} path={"/wastewise/list"} exact />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
