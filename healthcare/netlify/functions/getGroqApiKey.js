exports.handler = async () => {
    const apiKey = process.env.GROQ_API_KEY;
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ apiKey: apiKey || "API Key Not Found" })
    };
};