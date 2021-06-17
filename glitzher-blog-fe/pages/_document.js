import Document, { Html, Head, Main, NextScript, Script } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Google Ads */}
          <script
            data-ad-client='ca-pub-6370718788461527'
            async
            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
          ></script>

          {/* Onesignal notifcations */}
          <script type='text/javascript'>
            var subscribersSiteId = 'c5ce9151-7f56-4fc0-b5e4-0d82b4528ff6';
          </script>
          <script
            type='text/javascript'
            src='https://cdn.subscribers.com/assets/subscribers.js'
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
