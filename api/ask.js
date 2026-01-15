export default async function handler(req, res) {
    try {
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method not allowed" });
        }

        const { question } = req.body || {};
        if (!question) {
            return res.status(400).json({ error: "Question is required" });
        }

        const endpoint = process.env.AZURE_LANGUAGE_ENDPOINT; // sin "/" final
        const apiKey = process.env.AZURE_LANGUAGE_KEY;
        const project = process.env.PROJECT_NAME;
        const deployment = process.env.DEPLOYMENT_NAME;

        if (!endpoint || !apiKey || !project || !deployment) {
            return res
                .status(500)
                .json({ error: "Server misconfigured (missing env vars)" });
        }

        const url =
            `${endpoint}/language/:query-knowledgebases` +
            `?projectName=${encodeURIComponent(project)}` +
            `&deploymentName=${encodeURIComponent(deployment)}` +
            `&api-version=2021-10-01`;

        const r = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Ocp-Apim-Subscription-Key": apiKey,
            },
            body: JSON.stringify({ question, top: 1 }),
        });

        const data = await r.json().catch(() => ({}));
        return res.status(r.ok ? 200 : r.status).json(data);
    } catch (e) {
        return res.status(500).json({ error: "Internal server error" });
    }
}
