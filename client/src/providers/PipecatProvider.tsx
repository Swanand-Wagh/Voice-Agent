'use client';

import { type PropsWithChildren } from 'react';
import { PipecatClient } from '@pipecat-ai/client-js';
import { SmallWebRTCTransport } from '@pipecat-ai/small-webrtc-transport';
import { PipecatClientProvider } from '@pipecat-ai/client-react';
import { PipecatClientAudio } from '@pipecat-ai/client-react';

export const client = new PipecatClient({
  transport: new SmallWebRTCTransport({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  }),
  enableMic: true,
  enableCam: false,
  callbacks: {},
});

export function PipecatProvider({ children }: PropsWithChildren) {
  return (
    <PipecatClientProvider client={client}>
      {children}
      <PipecatClientAudio />
    </PipecatClientProvider>
  );
}
