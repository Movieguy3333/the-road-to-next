function gdtBaseUrl() {
  const environment = process.env.NODE_ENV;
  const baseUrl =
    environment === "production"
      ? "https://localhost:3000"
      : `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
}

export { gdtBaseUrl };

/*
Note: these are environment variables arre are not in the .env file. They are in the environment of the machine where the application is running. The environment variables are set by the operating system and can be accessed using process.env. Here are some examples of environment variables:
 VERCEL_
 NEXT_
 NODE_ENV
*/
