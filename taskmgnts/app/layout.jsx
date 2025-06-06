"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ToastContainer } from "react-toastify";


export default function RootLayout({ children }) {

  
 
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ToastContainer/>
            {children}
        </Provider>
      </body>
    </html>
  );
}
