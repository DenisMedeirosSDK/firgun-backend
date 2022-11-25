interface ConfigProps {
  JSON_SECRET: string
}

export const CONFIGS: ConfigProps = {
  JSON_SECRET: process.env.JSON_SECRET as string | '4y44M^rtpU1#iYnp'
}
