import React, { useMemo, useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LightTheme from 'themes/light';
import DarkTheme from 'themes/dark';
import Home from 'components/pages/Home';
import About from 'components/pages/About';
import SubmitForm from 'components/pages/SubmitForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const GlobalStyle = createGlobalStyle`
html{
  box-sizing:border-box;
}
*, *:before, *:after{
box-sizing:inherit;
}
body{
  background:${(p) => p.theme.bodyBackgroundColor};
  color:${(p) => p.theme.bodyFontColor};
  min-height:100vh;
  margin:0;
  font-family:"Kaushan Script"
}
`;

function App() {
  const [theme, setTheme] = useState(LightTheme);
  const providerValue = useMemo(
    () => ({
      ...theme,
      switchTheme: () => {
        setTheme((s) => (s.id === 'light' ? DarkTheme : LightTheme));
      },
    }),
    [theme, setTheme]
  );

  return (
    <ThemeProvider theme={providerValue}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/form' component={SubmitForm} />
          <Route exact path='/about' component={About} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
