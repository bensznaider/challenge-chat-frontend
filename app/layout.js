"use client";
import { Providers } from "./providers";
import { Provider } from "react-redux";
import store from "./state/store.js";
import "./globals.css";
import Bar from "./components/Bar";

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Challenge Chat</title>
      </head>
      <body>
        <Provider store={store}>
          <Providers>
            <Bar />
            {children}
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
