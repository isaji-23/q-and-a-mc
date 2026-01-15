export default async function (context, req) {
    const question = req.body?.question;

    if (!question) {
        context.res = {
            status: 400,
            body: { error: "Question is required" },
        };
        return;
    }

    const endpoint = process.env.AZURE_LANGUAGE_ENDPOINT;
    const apiKey = process.env.AZURE_LANGUAGE_KEY;
    const project = process.env.PROJECT_NAME;
    const deployment = process.env.DEPLOYMENT_NAME;

    const url =
        `${endpoint}/language/:query-knowledgebases` +
        `?projectName=${project}` +
        `&deploymentName=${deployment}` +
        `&api-version=2021-10-01`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": apiKey,
        },
        body: JSON.stringify({
            question,
            top: 1,
        }),
    });

    const data = await response.json();

    context.res = {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
    };
}
