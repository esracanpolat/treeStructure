import { Provider } from 'react-redux';
import './App.css';
import Home from './redux/components/Home';
import configureStore from './redux/store';

function App() {
  const store = configureStore();
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

export default App;
