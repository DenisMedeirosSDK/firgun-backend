interface ConfigProps {
  JWT_SECRET: string
}

export const CONFIGS: ConfigProps = {
  JWT_SECRET: process.env.JWT_SECRET as string | '4y44M^rtpU1#iYnp'
}
