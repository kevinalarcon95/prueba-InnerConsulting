type envConfig = {
    apiBaseUrl: string | undefined;
}

export  const env: envConfig = {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_URL,
}