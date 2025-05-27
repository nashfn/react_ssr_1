
# react_ssr_1


## Adding typescript to the project

`
npm install --save-dev typescript @types/node 
npx tsc --init
`

Set "checkJs to false" in tsconfig.json so that typescript does not check JS files.

The lovable hint project:
- Typescript https://github.com/nashfn/talk-to-the-scribe/blob/main/src/components/AudioRecorder.tsx
- Javascript 


## References
- OAI Realtime taxi service demo: https://github.com/qaware/openai-realtime-taxi-service-demo
- OAI Realtime API beta: https://github.com/openai/openai-realtime-api-beta
- OAI Realtime console: https://github.com/openai/openai-realtime-console/tree/main
- Vite SSR: https://vite.dev/guide/ssr.html
- Create-vite-app SSR template: https://github.com/bluwy/create-vite-extra/tree/master/template-ssr-react
- OAI realtime agents architecture (supervisor agent): https://github.com/openai/openai-realtime-agents
- Realtime app example using OAI: https://github.com/bigsk1/openai-realtime-ui
- OAI beta api examples: https://github.com/openai/openai-realtime-api-beta/blob/main/examples/node_devenv.mjs


To configure the @ alias correctly:
`
To configure the @ alias in TypeScript, add this to your tsconfig.json:
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}

And if you're using Vite, also add this to vite.config.js/ts:
import path from 'path'

export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}
This will make the @ imports work correctly.
`