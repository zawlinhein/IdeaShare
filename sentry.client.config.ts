import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://70ad8967aba1411f3906bc502f490b3d@o4509355294851072.ingest.us.sentry.io/4509355312611328",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});
