'use client';

import { type PropsWithChildren, useRef } from 'react';
import { PipecatClient } from '@pipecat-ai/client-js';
import { SmallWebRTCTransport } from '@pipecat-ai/small-webrtc-transport';
import { PipecatClientProvider } from '@pipecat-ai/client-react';
import { PipecatClientAudio } from '@pipecat-ai/client-react';

function createClient() {
  return new PipecatClient({
    transport: new SmallWebRTCTransport({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    }),
    enableMic: true,
    enableCam: false,
    callbacks: {},
  });
}

export function PipecatProvider({ children }: PropsWithChildren) {
  const clientRef = useRef<PipecatClient | null>(null);
  if (!clientRef.current) {
    clientRef.current = createClient();
  }

  return (
    <PipecatClientProvider client={clientRef.current}>
      {children}
      <PipecatClientAudio />
    </PipecatClientProvider>
  );
}
