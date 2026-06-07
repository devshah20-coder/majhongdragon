# Render Deployment

Use `render.yaml` for a Render Blueprint deploy.

## Steps

1. Push this project to GitHub.
2. In Render, choose **New > Blueprint**.
3. Select the repo.
4. Render reads `render.yaml`.
5. Add every secret from `.env.render.template` in the Render dashboard.
6. Deploy.

## Service Settings

- Runtime: Node
- Build command: `npm ci && npm run build`
- Start command: `npm run start`
- Health check path: `/`

The app uses Next.js standalone output so Render runs the production server cleanly.
