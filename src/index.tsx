import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { store } from './store';

const theme = extendTheme({
  colors: {
        
    main:{
      50: "rgba(56, 88, 152, 0.04)",
      100: "rgba(56, 88, 152, 0.06)",
      200: "rgba(56, 88, 152, 0.08)",
      300: "rgba(56, 88, 152, 0.16)",
      400: "rgba(56, 88, 152, 0.24)",
      500: "rgba(56, 88, 152, 0.99)",
      600: "rgba(56, 88, 152, 0.98)",
      700: "rgba(56, 88, 152, 0.64)",
      800: "rgba(56, 88, 152, 0.80)",
      900: "rgba(56, 88, 152, 0.92)",
    },

    error:{
      50: "rgba(241, 81, 37, 0.04)",
      100: "rgba(241, 81, 37, 0.06)",
      200: "rgba(241, 81, 37, 0.08)",
      300: "rgba(241, 81, 37, 0.16)",
      400: "rgba(241, 81, 37, 0.24)",
      500: "rgba(241, 81, 37, 0.36)",
      600: "rgba(241, 81, 37, 0.98)",
      700: "rgba(241, 81, 37, 0.64)",
      800: "rgba(241, 81, 37, 0.80)",
      900: "rgba(241, 81, 37, 0.92)",
    },
    
    info:{
      50: "rgba(94, 102, 114, 0.04)",
      100: "rgba(94, 102, 114, 0.06)",
      200: "rgba(94, 102, 114, 0.08)",
      300: "rgba(94, 102, 114, 0.16)",
      400: "rgba(94, 102, 114, 0.24)",
      500: "rgba(94, 102, 114, 0.36)",
      600: "rgba(94, 102, 114, 0.98)",
      700: "rgba(94, 102, 114, 0.64)",
      800: "rgba(94, 102, 114, 0.80)",
      900: "rgba(94, 102, 114, 0.92)",
    },
    
    warn:{
      50: "rgba(233, 169, 30, 0.04)",
      100: "rgba(233, 169, 30, 0.06)",
      200: "rgba(233, 169, 30, 0.08)",
      300: "rgba(233, 169, 30, 0.16)",
      400: "rgba(233, 169, 30, 0.24)",
      500: "rgba(233, 169, 30, 0.36)",
      600: "rgba(233, 169, 30, 0.98)",
      700: "rgba(233, 169, 30, 0.64)",
      800: "rgba(233, 169, 30, 0.80)",
      900: "rgba(233, 169, 30, 0.92)",
    },
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Provider>
)
