import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import "@/styles/globals.css";

NProgress.configure({ showSpinner: false }) //show spinner: false
Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
